import db from '../config/db';
import bcrypt from 'bcrypt';
import { User, UserResponse, RegisterUserInput } from '../types';

class UserModel {
  /**
   * Register a new user
   */
  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const { username, email, password } = userData;
    
    // Check if user already exists
    const userExists = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    
    if (userExists.rowCount && userExists.rowCount > 0) {
      throw new Error('User with this username or email already exists');
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert the new user
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, is_admin, created_at',
      [username, email, hashedPassword]
    );
    
    return result.rows[0];
  }
  
  /**
   * Find user by email (for login)
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    return result.rowCount && result.rowCount > 0 ? result.rows[0] : null;
  }
  
  /**
   * Find user by ID
   */
  async findById(id: number): Promise<UserResponse | null> {
    const result = await db.query(
      'SELECT id, username, email, is_admin, created_at FROM users WHERE id = $1',
      [id]
    );
    
    return result.rowCount && result.rowCount > 0 ? result.rows[0] : null;
  }
  
  /**
   * Check if user is admin
   */
  async isAdmin(userId: number): Promise<boolean> {
    const result = await db.query(
      'SELECT is_admin FROM users WHERE id = $1',
      [userId]
    );
    
    return result.rowCount && result.rowCount > 0 ? result.rows[0].is_admin : false;
  }
}

export default new UserModel();
