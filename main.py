from flask import Flask, request, jsonify, render_template
from google.cloud import storage
from google.cloud import aiplatform
import os
import requests
import vertexai
from google.cloud import aiplatform
from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel
from itertools import groupby
from google.cloud import firestore
from vertexai.generative_models import GenerativeModel

app = Flask(__name__)

location = "us-central1"
index_endpoint_id = "123123312078356480"
deployed_index_id = "deploy_index_1730887436367"

vertexai.init(location=location)
aiplatform.init(location=location)

# Initialize Google Cloud services
storage_client = storage.Client()
bucket_name = "zionai-kb-docs-devops-team-nonprod-svc-hw9w-d1082e"#os.environ.get("BUCKET_NAME")
project_id = "devops-team-nonprod-svc-hw9w" #os.environ.get("PROJECT_ID")
vertex_endpoint = os.environ.get("VERTEX_ENDPOINT")  # Vertex AI endpoint

def get_text_embedding(text: str) -> list[float]:
    task = 'RETRIEVAL_DOCUMENT'
    model = TextEmbeddingModel.from_pretrained("textembedding-gecko")
    return model.get_embeddings([TextEmbeddingInput(text, task)])[0].values

def find_document1(question: str, endpoint_link: str) -> tuple[str, int]:
  # Get embeddings for the question.
  embedding = get_text_embedding(question)

  # Construct the request body
  request_body = {
      "queries": [embedding],
      "numNeighbors": 1
  }

  
  response = requests.post(endpoint_link, json=request_body)

  # Check for successful response
  if response.status_code == 200:
    data = response.json()
    point = data["results"][0][0]  # Assuming the response structure
    filename, page_number = point["id"].split(":", 1)
    return filename, int(page_number)
  else:
    print(f"Error: {response.status_code} - {response.text}")
    raise Exception("Failed to find document")

def find_document(question: str, index_endpoint_id: str, deployed_index_id: str) -> tuple[str, int]:
    # Get embeddings for the question.
    embedding = get_text_embedding(question)

    # Find the closest point from the Vector Search index endpoint.
    endpoint = aiplatform.MatchingEngineIndexEndpoint(index_endpoint_id)
    point = endpoint.find_neighbors(
        deployed_index_id=deployed_index_id,
        queries=[embedding],
        num_neighbors=1,
    )[0][0]

    # Get the document name and page number from the point ID.
    (filename, page_number) = point.id.split(':', 1)
    return (filename, int(page_number))



def get_document_text(filename: str, page_number: int) -> str:
    db = firestore.Client(database='zionai-kb-database-d1082e')
    doc = db.collection("documents").document(filename)
    return doc.get().get('pages')[page_number]

@app.route('/')
def index():
    # Render the HTML page
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        blob = storage_client.bucket(bucket_name).blob(file.filename)
        blob.upload_from_file(file, content_type='application/pdf')
        return jsonify({"message": f"File {file.filename} uploaded successfully"}), 200
    return jsonify({"error": "File upload failed"}), 400

@app.route('/delete', methods=['POST'])
def delete_file():
    data = request.get_json()
    filename = data.get("filename")
    if not filename:
        return jsonify({"error": "Filename not provided"}), 400
    
    try:
        blob = storage_client.bucket(bucket_name).blob(filename)
        blob.delete()
        return jsonify({"message": f"File {filename} deleted successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to delete file"}), 500


@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    # Convert the question into an embedding.
    print(question)
    # question_embedding = get_text_embedding(question)
    # print(f"Embedding dimensions: {len(question_embedding)}")
    link = "https://us-central1-devops-team-nonprod-svc-hw9w.aiplatform.googleapis.com/v1beta1/projects/devops-team-nonprod-svc-hw9w/locations/us-central1/endpoints/100042363988082688"
    (filename, page_number) = find_document(question, index_endpoint_id, deployed_index_id)
    print(f"{filename=} {page_number=}")
    context = get_document_text(filename, page_number)
    model = GenerativeModel(
        model_name="gemini-1.0-pro-002",
        system_instruction=context,
    )
    answer = model.generate_content(question).text
    return jsonify({"answer": answer}), 200

@app.route('/browse', methods=['GET'])
def browse_files():
    blobs = storage_client.list_blobs(bucket_name)
    files = [blob.name for blob in blobs]
    return jsonify(files), 200

def upload_to_storage(filename, content):
    blob = storage_client.bucket(bucket_name).blob(filename)
    blob.upload_from_string(content)
    print(f"Uploaded {filename} to {bucket_name}")

def fetch_files_from_github(repo_name, path=""):
    url = f"https://api.github.com/repos/{repo_name}/contents/{path}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

@app.route('/upload_from_github', methods=['POST'])
def upload_from_github():
    data = request.get_json()
    repo_url = data.get("repo_url")
    if not repo_url:
        return jsonify({"error": "GitHub repository URL not provided"}), 400
    
    # Extract repo name from the URL
    try:
        repo_name = repo_url.split("github.com/")[1]

        # Get contents at the root of the repo
        contents = fetch_files_from_github(repo_name)

        while contents:
            file_content = contents.pop(0)
            if file_content["type"] == "dir":
                contents.extend(fetch_files_from_github(repo_name, file_content["path"]))
            else:
                # Download and upload each file to Google Cloud Storage
                file_data = requests.get(file_content["download_url"]).text
                upload_to_storage(file_content["path"], file_data)

        return jsonify({"status": "Files uploaded successfully"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch files from GitHub"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
