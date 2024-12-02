import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import zionLogo from '../assets/icons/logo.png'; // Replace with actual path to the ZionAI logo

// Import your PNG icons for address, phone, and email
import AddressIcon from '../assets/icons/address-icon.svg';
import PhoneIcon from '../assets/icons/phone-icon.svg';
import EmailIcon from '../assets/icons/email-icon.svg';

const Footer = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #205BF3, #89CDA9)',
        color: 'white',
        py: 5,
        px: 3,
      }}
    >
      <Grid container spacing={4}>
        {/* Logo and Description Section */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* ZionAI Logo */}
            <img src={zionLogo} alt="ZionAI Logo" style={{ width: '150px', marginBottom: '10px' }} />

            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
            </Box>

            {/* Footer Text */}
            <Typography variant="body2" sx={{ maxWidth: '400px', mt: 1 }}>
              © 2024, Zion Cloud Solutions. All Rights Reserved
            </Typography>
          </Box>
        </Grid>

        {/* Service Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Service
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography component={Link} to="/staffing" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Staffing Solution
            </Typography>
            <Typography component={Link} to="/ai-ml" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              AI & ML
            </Typography>
            <Typography component={Link} to="/data-analytics" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Data Analytics
            </Typography>
            <Typography component={Link} to="/security-solutions" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Security Solutions
            </Typography>
            <Typography component={Link} to="/digital-transformation" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Digital Transformation
            </Typography>
            <Typography component={Link} to="/cloud-services" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Cloud Services
            </Typography>
          </Box>
        </Grid>

        {/* About Us Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            About Us
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography component={Link} to="/company" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Company
            </Typography>
            <Typography component={Link} to="/clients" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Clients
            </Typography>
            <Typography component={Link} to="/diversity-inclusion" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Diversity and Inclusion
            </Typography>
            <Typography component={Link} to="/iphec-services" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              IPHEC Services
            </Typography>
            <Typography component={Link} to="/contact" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              Contact Us
            </Typography>
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Contact
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <img src={AddressIcon} alt="Address Icon" style={{ width: '20px', height: '20px' }} />
            <Typography variant="body2">
              2640 Patriot BLVD, Suite 130 <br />
              Glenview, IL, 60026
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <img src={PhoneIcon} alt="Phone Icon" style={{ width: '20px', height: '20px' }} />
            <Typography variant="body2">224-904-4901</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={EmailIcon} alt="Email Icon" style={{ width: '20px', height: '20px' }} />
            <Typography component="a" href="mailto:sales@zionclouds.com" variant="body2" sx={{ textDecoration: 'none', color: 'white' }}>
              sales@zionclouds.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
