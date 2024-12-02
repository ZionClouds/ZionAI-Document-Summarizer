import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
// import DeleteIcon from '@mui/icons-material/Delete';
import deleteIconSvg from '../assets/icons/recycle-white-01.svg'; // Replace with the correct path to your SVG icon

const GradientDeleteButton = styled(Button)({
  background: 'linear-gradient(45deg, rgba(32, 91, 243, 0.8) 30%, rgba(137, 205, 169, 0.8) 90%)',
  color: 'white',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    background: 'linear-gradient(45deg, #205BF3 30%, #89CDA9 90%)',
    filter: 'brightness(1.1)',
  },
});

const BrowseFilesSection = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/browse');
        setFiles(response.data || []);
      } catch (error) {
        alert('Error fetching files.');
      }
    };

    fetchFiles();
  }, []);

  const handleDeleteFile = async () => {
    if (!selectedFile) {
      alert('Please select a file to delete.');
      return;
    }

    try {
      await axios.post('/delete', { filename: selectedFile }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setFiles((prevFiles) => prevFiles.filter((file) => file !== selectedFile));
      setSelectedFile(''); // Clear the selected file after deletion
    } catch (error) {
      alert('Error deleting file.');
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.value);
  };

  return (
    <Box sx={{ my: 4, textAlign: 'center', margin: 'auto' , mb: 3}}>
      {/* Title and Delete Button in a Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8, width: '80%', maxWidth: 900, margin: '0 auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Browse Files
        </Typography>
        <GradientDeleteButton
          variant="contained"
          onClick={handleDeleteFile}
          disabled={!selectedFile}
          endIcon={<img src={deleteIconSvg} alt="delete" style={{ width: '24px', height: '24px' }} />}
        >
          Delete
        </GradientDeleteButton>
      </Box>

      {/* Radio Group for Selecting a File */}
      <RadioGroup value={selectedFile} onChange={handleFileSelect}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {files.slice(0, 3).map((file, index) => (
            <Card key={index} sx={{ width: '80%', maxWidth: 900, textAlign: 'left', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  value={file}
                  control={<Radio />}
                  label={
                    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                      {file}
                    </Typography>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </RadioGroup>
    </Box>
  );
};

export default BrowseFilesSection;
