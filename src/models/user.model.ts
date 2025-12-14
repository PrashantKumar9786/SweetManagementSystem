import bcrypt from 'bcrypt';
import { User, UserResponse, RegisterUserInput } from '../types';
import UserSchema from './schemas/user.schema';

class UserModel {
  /**
   * Register a new user
   */
  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const { username, email, password } = userData;
    
    // Check if user already exists
    const existingUser = await UserSchema.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      throw new Error('User with this username or email already exists');
    }
    
    // Create new user (password will be hashed by the pre-save hook)
    const user = new UserSchema({ 
      username, 
      email, 
      password,
      is_admin: false
    });
    
    // Save user to database
    await user.save();
    
    // Convert to response format (without password)
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      created_at: user.created_at
    };
  }
  
  /**
   * Find user by email (for login)
   */
  async findByEmail(email: string): Promise<User | null> {
    return await UserSchema.findOne({ email });
  }
  
  /**
   * Find user by ID
   */
  async findById(id: string): Promise<UserResponse | null> {
    const user = await UserSchema.findById(id).select('-password');
    
    if (!user) {
      return null;
    }
    
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      created_at: user.created_at
    };
  }
  
  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const user = await UserSchema.findById(userId).select('is_admin');
    return user ? user.is_admin : false;
  }
  
  /**
   * Make a user an admin (for testing purposes)
   */
  async makeAdmin(userId: string): Promise<boolean> {
    const result = await UserSchema.updateOne(
      { _id: userId },
      { is_admin: true }
    );
    
    return result.modifiedCount > 0;
  }
}

export default new UserModel();
