import { Document, Types } from 'mongoose';

// MongoDB ObjectId type
export type ObjectId = Types.ObjectId;

// User types
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserResponse {
  id: string;
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
export interface Sweet extends Document {
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface SweetResponse {
  id: string;
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
export interface Transaction extends Document {
  user_id: ObjectId;
  sweet_id: ObjectId;
  quantity: number;
  type: 'purchase' | 'restock';
  created_at: Date;
}

export interface TransactionResponse {
  id: string;
  user_id: string;
  sweet_id: string;
  quantity: number;
  type: 'purchase' | 'restock';
  created_at: Date;
}

// JWT payload type
export interface JwtPayload {
  userId: string;
  username: string;
  isAdmin: boolean;
}
