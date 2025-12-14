import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Use mock model for testing (switch to real model in production)
import UserModel from './models/mock-user.model';
import { RegisterUserInput, LoginUserInput } from './types';

class AuthController {
  /**
   * Register a new user
   */
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData: RegisterUserInput = req.body;
      
      // Validate user data
      if (!userData.username || !userData.email || !userData.password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide all required fields' 
        });
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }
      
      // Password strength validation
      if (userData.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
      
      // Register the user
      const newUser = await UserModel.register(userData);
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id.toString(), username: newUser.username, isAdmin: newUser.is_admin },
        process.env.JWT_SECRET || 'default_jwt_secret',
        { expiresIn: '24h' }
      );
      
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.is_admin
        },
        token
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      console.error('Registration error:', error);
      return res.status(400).json({ 
        success: false, 
        message: errorMessage 
      });
    }
  }
  
  /**
   * Login user
   */
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password }: LoginUserInput = req.body;
      
      // Validate login data
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide email and password' 
        });
      }
      
      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }
      
      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }
      
      // Generate JWT token - FIX: Ensure consistency with register method
      const token = jwt.sign(
        { userId: user._id.toString(), username: user.username, isAdmin: user.is_admin },
        process.env.JWT_SECRET || 'default_jwt_secret',
        { expiresIn: '24h' }
      );
      
      // Debug logging - remove in production
      console.log('Login successful for:', email);
      console.log('Generated token:', token);
      console.log('User ID format:', user._id.toString());
      
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          isAdmin: user.is_admin
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Login failed' 
      });
    }
  }
  
  /**
   * Get current user profile
   */
  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      // The user is added to the request by the auth middleware
      const userId = (req as any).user?.userId;
      
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Not authenticated' 
        });
      }
      
      // Get user details
      const user = await UserModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.is_admin
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to get user profile' 
      });
    }
  }
}

export default new AuthController();
