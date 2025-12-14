import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState((prev) => ({ ...prev, loading: false }));
        return;
      }
      
      try {
        // Decode token to get user info
        const decodedToken = jwtDecode<{ userId: string; username: string; isAdmin: boolean }>(token);
        
        // Check if token is expired
        const isExpired = (decodedToken as any).exp * 1000 < Date.now();
        
        if (isExpired) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState((prev) => ({ 
            ...prev, 
            isAuthenticated: false, 
            user: null, 
            token: null, 
            loading: false 
          }));
          return;
        }
        
        // Get user profile
        const userJson = localStorage.getItem('user');
        let user: User | null = null;
        
        if (userJson) {
          user = JSON.parse(userJson);
        } else {
          // If user info not in localStorage, fetch it from API
          user = await authService.getProfile();
          localStorage.setItem('user', JSON.stringify(user));
        }
        
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: 'Authentication failed',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: error.message || 'Login failed',
      });
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await authService.register(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: error.message || 'Registration failed',
      });
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
