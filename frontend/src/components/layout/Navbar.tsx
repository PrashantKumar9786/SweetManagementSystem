import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar, 
  Divider 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  AccountCircle, 
  Dashboard, 
  Logout, 
  Person, 
  Cake 
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleDashboard = () => {
    handleClose();
    navigate('/admin/dashboard');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Cake sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            Sweet Management System
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
          >
            Home
          </Button>
          
          <Button 
            color="inherit" 
            component={Link} 
            to="/sweets"
          >
            Sweets
          </Button>

          {!authState.isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
              >
                Register
              </Button>
            </>
          ) : (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {authState.user?.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>
                  <Person fontSize="small" sx={{ mr: 1 }} /> Profile
                </MenuItem>
                
                {authState.user?.isAdmin && (
                  <MenuItem onClick={handleDashboard}>
                    <Dashboard fontSize="small" sx={{ mr: 1 }} /> Admin Dashboard
                  </MenuItem>
                )}
                
                <Divider />
                
                <MenuItem onClick={handleLogout}>
                  <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        {/* Mobile menu - will be implemented if needed */}
        {mobileMenuOpen && (
          <Box 
            sx={{ 
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              bgcolor: 'background.paper',
              boxShadow: 3,
              zIndex: 1000
            }}
          >
            {/* Mobile menu content */}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
