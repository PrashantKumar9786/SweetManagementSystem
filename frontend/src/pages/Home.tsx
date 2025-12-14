import React from 'react';
import { Typography, Box, Button, Container, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Cake, ShoppingCart, Login } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { GridContainer, GridItem } from '../components/common/GridWrapper';

const Home: React.FC = () => {
  const { authState } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          py: 8, 
          px: 2,
          mb: 4,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Cake sx={{ fontSize: 60 }} />
          </Box>

          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Sweet Management System
          </Typography>
          
          <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
            A delightful place to explore and manage your favorite sweets!
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/sweets"
              sx={{ 
                mr: 2, 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                }
              }}
              startIcon={<ShoppingCart />}
            >
              Browse Sweets
            </Button>
            
            {!authState.isAuthenticated && (
              <Button 
                variant="outlined" 
                size="large"
                component={RouterLink}
                to="/login"
                sx={{ 
                  borderColor: 'white', 
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
                startIcon={<Login />}
              >
                Login
              </Button>
            )}
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Our Features
          </Typography>
          
          <GridContainer spacing={4}>
            <GridItem xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ p: 1, mb: 2 }}>
                  <ShoppingCart color="primary" sx={{ fontSize: 50 }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  Browse Catalog
                </Typography>
                <Typography>
                  Explore our extensive catalog of delicious sweets from various categories.
                </Typography>
              </Paper>
            </GridItem>
            
            <GridItem xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ p: 1, mb: 2 }}>
                  <Cake color="primary" sx={{ fontSize: 50 }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  Purchase Sweets
                </Typography>
                <Typography>
                  Easily purchase your favorite sweets with our simple checkout process.
                </Typography>
              </Paper>
            </GridItem>
            
            <GridItem xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ p: 1, mb: 2 }}>
                  <Login color="primary" sx={{ fontSize: 50 }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  User Account
                </Typography>
                <Typography>
                  Create an account to track your purchases and manage your favorite sweets.
                </Typography>
              </Paper>
            </GridItem>
          </GridContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
