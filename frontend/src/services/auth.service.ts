import api from './api';
import { LoginCredentials, RegisterCredentials, User, ApiResponse } from '../types';

interface AuthResponse extends ApiResponse<User> {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data.user;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};
