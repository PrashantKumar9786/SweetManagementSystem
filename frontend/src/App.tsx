import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import SweetsPage from './pages/SweetsPage';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingScreen from './components/common/LoadingScreen';
import './App.css';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b8b', // Sweet pink color
    },
    secondary: {
      main: '#8b65e0', // Purple
    },
  },
});

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { authState } = useAuth();
  
  if (authState.loading) {
    return <div>Loading...</div>;
  }
  
  return authState.isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

// Admin route component
const AdminRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { authState } = useAuth();
  
  if (authState.loading) {
    return <div>Loading...</div>;
  }
  
  return authState.isAuthenticated && authState.user?.isAdmin ? 
    <>{element}</> : 
    <Navigate to="/" />;
};

// App container with routes
const AppContainer: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/sweets" element={<SweetsPage />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Suspense fallback={<LoadingScreen message="Loading Application..." />}>
            <AppContainer />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
