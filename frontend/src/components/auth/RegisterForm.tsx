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

const RegisterForm: React.FC = () => {
  const { register, authState } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear form error when user starts typing again
    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    // Submit the registration
    const { username, email, password } = formData;
    await register({ username, email, password });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Register
        </Typography>

        {(authState.error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {authState.error || formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={authState.loading}
          />

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
            helperText="Password must be at least 6 characters"
            disabled={authState.loading}
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
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
            {authState.loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
