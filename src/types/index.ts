// User types
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: Date;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

// Sweet types
export interface Sweet {
  id: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSweetInput {
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface UpdateSweetInput {
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

// Transaction types
export interface Transaction {
  id: number;
  user_id: number;
  sweet_id: number;
  quantity: number;
  type: 'purchase' | 'restock';
  created_at: Date;
}

// JWT payload type
export interface JwtPayload {
  userId: number;
  username: string;
  isAdmin: boolean;
}
