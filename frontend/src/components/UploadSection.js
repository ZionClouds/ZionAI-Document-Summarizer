import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Assuming you have these images in the src/assets/icons folder
import chooseFileIcon from '../assets/icons/browse-white-01.svg'; // Replace with your own SVG icon
import uploadIcon from '../assets/icons/upload-white-01.svg'; // Replace with your own SVG icon

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, rgba(32, 91, 243, 0.8) 30%, rgba(137, 205, 169, 0.8) 90%)',
  borderRadius: 12,
  color: 'white',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Add shadow to button
  '&:hover': {
    background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)', // Keep the gradient direction same
    filter: 'brightness(1.1)', // Subtle tint to make the button appear lighter on hover
  },
});

const CustomInput = styled('input')({
  display: 'none',
});

const LabelButton = styled('label')({
  background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)',
  borderRadius: 12,
  color: 'white',
  padding: '10px 20px',
  textTransform: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Add shadow to button
  '&:hover': {
    background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)',
    filter: 'brightness(1.1)', // Subtle tint effect
  },
});

const UploadSection = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message || response.data.error);
    } catch (error) {
      alert("Error uploading the file.");
    }
  };

  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Upload File
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3, // Set uniform spacing between the buttons
        }}
      >
        {/* Custom File Input */}
        <CustomInput
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />
        <LabelButton htmlFor="upload-file">
          <img src={chooseFileIcon} alt="choose file" style={{ width: '40px', height: '40px', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }} />
          {file ? file.name : 'Choose File'}
        </LabelButton>

        {/* Gradient Upload Button */}
        <GradientButton
          variant="contained"
          onClick={handleUpload}
          endIcon={<img src={uploadIcon} alt="upload" style={{ width: '40px', height: '40px', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }} />}
        >
          Upload
        </GradientButton>
      </Box>
    </Box>
  );
};

export default UploadSection;
