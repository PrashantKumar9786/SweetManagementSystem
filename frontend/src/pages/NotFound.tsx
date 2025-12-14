import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { SentimentDissatisfied, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 600,
          borderRadius: 4,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <SentimentDissatisfied sx={{ fontSize: 80 }} />
        </Box>
        
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          404
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        
        <Button
          variant="contained"
          component={Link}
          to="/"
          startIcon={<Home />}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
