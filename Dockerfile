# # Use the official Python image as the base image
# FROM python:3.12-slim

# # Set environment variables
# ENV PYTHONUNBUFFERED=1

# # Set the working directory
# WORKDIR /app

# # Copy the current directory contents into the container
# COPY . /app

# # Install any necessary system dependencies
# RUN apt-get update && apt-get install -y \
#     gcc \
#     && rm -rf /var/lib/apt/lists/*

# # Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Expose the port Flask runs on
# EXPOSE 8080

# # Define environment variable for Cloud Run
# ENV PORT 8080

# # Run the Flask app
# CMD ["python", "main.py"]

# Stage 1: Build React Frontend
FROM node:18 as frontend

# Set working directory to build the frontend
WORKDIR /app/frontend

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code and build it
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend and Serve Both Frontend and Backend
FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# Set the working directory
WORKDIR /app

# Copy the backend files into the container
COPY . /app

# Copy the built frontend from the previous stage
COPY --from=frontend /app/frontend/build /app/build

# Install system dependencies for Python and build tools
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that Flask will run on
EXPOSE 8080

# Run Flask
CMD ["python", "main.py"]
