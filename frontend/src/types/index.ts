// User types
export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Sweet types
export interface Sweet {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSweetData {
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface UpdateSweetData {
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export interface SweetState {
  sweets: Sweet[];
  currentSweet: Sweet | null;
  loading: boolean;
  error: string | null;
}

// Search and filter types
export interface SweetFilters {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  [key: string]: any;
}
