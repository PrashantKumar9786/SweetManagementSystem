import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Cake } from '@mui/icons-material';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Cake sx={{ fontSize: 60, color: 'primary.main', opacity: 0.5 }} />
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            position: 'absolute',
            top: -10,
            left: -10,
            zIndex: 1,
          }}
        />
      </Box>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
