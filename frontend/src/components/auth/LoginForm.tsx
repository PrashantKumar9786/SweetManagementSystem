import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const { login, authState } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {authState.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {authState.error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={authState.loading}
          />
          
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={authState.loading}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={authState.loading}
          >
            {authState.loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
