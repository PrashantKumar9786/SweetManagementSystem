import React, { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          mt: 'auto', 
          backgroundColor: (theme) => theme.palette.grey[100],
          textAlign: 'center'
        }}
      >
        © {new Date().getFullYear()} Sweet Management System
      </Box>
    </Box>
  );
};

export default Layout;
