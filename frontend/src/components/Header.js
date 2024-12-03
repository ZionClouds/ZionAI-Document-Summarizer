import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import zionLogo from '../assets/icons/logo.png'; // Replace with actual path to logo

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #205BF3, #89CDA9)' }}>
      <Toolbar>
        {/* Mobile Burger Menu */}
        <IconButton
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu Items */}
        <Menu
          anchorEl={mobileMenuAnchorEl}
          open={Boolean(mobileMenuAnchorEl)}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleMobileMenuClose}>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Link to="/help" style={{ textDecoration: 'none', color: 'black' }}>Help</Link>
          </MenuItem>
        </Menu>

        {/* Logo and App Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={zionLogo} alt="ZionAI Logo" style={{ width: '120px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Document Summarizer
            </Link>
          </Typography>
        </Box>

        {/* Desktop Navigation Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Button color="inherit" sx={{ mx: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          </Button>
          <Button color="inherit" sx={{ mx: 1 }} onClick={handleMenuOpen}>Projects</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ 'aria-labelledby': 'projects-button' }}
          >
            <MenuItem onClick={handleMenuClose}><Link to="https://knowledge-base-app-848342910896.us-central1.run.app/" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>Knowledge Base</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="https://zionai-knowledge-assistant.kindpond-7b48492d.eastus.azurecontainerapps.io/" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>Knowledge Assistant</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="https://zionai-web-app-848342910896.us-central1.run.app/" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>Zion UI</Link></MenuItem>
          </Menu>
          <Button color="inherit" sx={{ mx: 1 }}>
            <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>About Us</Link>
          </Button>
          <Button color="inherit" sx={{ mx: 1 }}>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</Link>
          </Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{ ml: 2, backgroundColor: 'white', borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// const Header = () => (
//   <header style={{ padding: "10px", background: "#205BF3", color: "#fff" }}>
//     <h1>My Header</h1>
//   </header>
// );

// export default Header;

