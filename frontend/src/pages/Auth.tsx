import React from 'react';
import { Box, Paper, Tabs, Tab, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = React.useState(
    location.pathname === '/register' ? 1 : 0
  );

  // If already authenticated, redirect to homepage
  React.useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    navigate(newValue === 0 ? '/login' : '/register');
  };

  if (authState.loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '50vh' 
        }}
      >
        <Typography>Checking authentication...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Paper 
        elevation={3}
        sx={{ 
          maxWidth: 500, 
          mx: 'auto', 
          mt: 4, 
          mb: 4
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <LoginForm />}
          {activeTab === 1 && <RegisterForm />}
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
