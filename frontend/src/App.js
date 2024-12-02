import React, { useState, useEffect } from 'react';
import styled from '@mui/material/styles/styled';
import { Box, Button, Typography, List, ListItem, ListItemText, Card, CircularProgress } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

// Icons
import uploadIcon from './assets/icons/upload-white-01.svg'; // Replace with your icon path
import chooseFileIcon from './assets/icons/browse-white-01.svg'; // Replace with your icon path

// Gradient Button Style
const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, rgba(32, 91, 243, 0.8) 30%, rgba(137, 205, 169, 0.8) 90%)',
  borderRadius: 12,
  color: 'white',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)',
    filter: 'brightness(1.1)',
  },
});

const WhiteButton = styled(Button)({
  background: 'white',
  borderRadius: 12,
  color: 'black',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  // '&:hover': {
  //   background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)',
  //   filter: 'brightness(1.1)',
  // },
});

// Custom Input and Card Styles
const CustomInput = styled('input')({
  display: 'none',
});

const StyledCard = styled(Card)({
  // padding: '5px',
  marginBottom: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  ":hover": {
    background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)',
    color: 'white'
  }
});

const GradientSectionCard = styled(Card)({
  padding: '20px',
  background: 'linear-gradient(45deg, rgba(32, 91, 243, 0.8) 30%, rgba(137, 205, 169, 0.8) 90%)',
  color: 'white',
  borderRadius: 12,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
});

const SummaryCard = styled(Card)({
  padding: '15px',
  // background: 'linear-gradient(45deg, rgba(32, 91, 243, 0.8) 30%, rgba(137, 205, 169, 0.8) 90%)',
  color: 'black',
  fontStyle: 'normal',
  borderRadius: 25,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  marginTop: '20px',
  textAlign: 'justify',
});

const SummarizerProject = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Fetch files from the backend
  const fetchFiles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/browse-summarizer');
      const data = await response.json();
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8080/upload-summarizer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setFile(null);
        fetchFiles(); // Refresh the file list
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Fetch summary for a selected file
  const fetchSummary = async (filename) => {
    setLoadingSummary(true);
    setSelectedSummary('');
    try {
      const response = await fetch(`http://127.0.0.1:8080/summary/${filename}`);
      const data = await response.json();
      setSelectedSummary(data.summary || 'No summary available.');
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSelectedSummary('Failed to fetch summary.');
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box sx={{ flex: 1, maxWidth: '1200px', margin: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          {/* Files in Bucket Section */}
          <GradientSectionCard sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Files in Bucket
              </Typography>
              <WhiteButton variant="contained" onClick={fetchFiles}>
                Refresh
              </WhiteButton>
            </Box>
            <Box
              sx={{
                maxHeight: '400px',
                overflowY: 'auto',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: 'white', // Contrast for list items
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <List>
                {files.map((file, index) => (
                  <StyledCard key={index} onClick={() => fetchSummary(file)}>
                    <ListItem button>
                      <ListItemText primary={file} />
                    </ListItem>
                  </StyledCard>
                ))}
              </List>
            </Box>
          </GradientSectionCard>

          {/* Upload Section */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upload a Document
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {/* Custom File Input */}
              <CustomInput
                id="upload-file"
                type="file"
                onChange={handleFileChange}
              />
              <GradientButton
                variant="contained"
                component="label"
                startIcon={
                  <img
                    src={chooseFileIcon}
                    alt="choose file"
                    style={{ width: '48px', height: '48px', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }}
                  />
                }
              >
                {file ? file.name : 'Choose File'}
                <input type="file" hidden onChange={handleFileChange} />
              </GradientButton>

              {/* Gradient Upload Button */}
              <GradientButton
                variant="contained"
                onClick={handleUpload}
                startIcon={
                  <img
                    src={uploadIcon}
                    alt="upload"
                    style={{ width: '48px', height: '48px', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }}
                  />
                }
              >
                Upload
              </GradientButton>
            </Box>
          </Box>
        </Box>

        {/* Summary Section */}
        {loadingSummary ? (
          <Box sx={{ mt: 4, textAlign: 'center', mb: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          selectedSummary && (
            <Box sx={{ mt: 4, mb: 8 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Document Summary
              </Typography>
              <SummaryCard>
                {selectedSummary}
              </SummaryCard>
            </Box>
          )
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default SummarizerProject;
