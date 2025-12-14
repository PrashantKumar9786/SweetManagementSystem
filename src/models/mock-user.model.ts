import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { User, UserResponse, RegisterUserInput } from '../types';

// Create admin password hash
const adminPasswordHash = '$2b$10$Jml1s8HAHH7gdbXiYwFYn.MF38L7AwotD4K8DQQeE3NLe28YbVxAu'; // 'admin123'

// Custom type for mock User
type MockUser = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
};

// Fixed admin ID for consistent authentication
const adminId = new Types.ObjectId('5f50c31e1234567890abcdef');

// In-memory storage for users - only one admin user
const users: MockUser[] = [
  {
    _id: adminId,
    username: 'admin',
    email: 'admin@example.com',
    password: adminPasswordHash,
    is_admin: true,
    created_at: new Date(),
    comparePassword: async function(candidatePassword: string): Promise<boolean> {
      return await bcrypt.compare(candidatePassword, this.password);
    }
  }
];

// Log admin credentials for easy reference
console.log('Admin credentials:');
console.log('Email: admin@example.com');
console.log('Password: admin123');
console.log('Admin ID:', adminId.toString());

class MockUserModel {
  /**
   * Register a new user
   */
  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const { username, email, password } = userData;
    
    // Check if user already exists
    const userExists = users.find(user => user.username === username || user.email === email);
    
    if (userExists) {
      throw new Error('User with this username or email already exists');
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUserId = new Types.ObjectId();
    const newUser: MockUser = {
      _id: newUserId,
      username,
      email,
      password: hashedPassword,
      is_admin: false,
      created_at: new Date(),
      comparePassword: async function(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
      }
    };
    
    // Add to in-memory storage
    users.push(newUser);
    console.log(`New user registered: ${username} (${email})`);
    
    // Return user data without password
    return {
      id: newUserId.toString(),
      username: newUser.username,
      email: newUser.email,
      is_admin: newUser.is_admin,
      created_at: newUser.created_at
    };
  }
  
  /**
   * Find user by email (for login)
   */
  async findByEmail(email: string): Promise<MockUser | null> {
    const user = users.find(user => user.email === email);
    return user || null;
  }
  
  /**
   * Find user by ID
   */
  async findById(id: string): Promise<UserResponse | null> {
    const user = users.find(user => user._id.toString() === id);
    
    if (!user) {
      return null;
    }
    
    // Return user data without password
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
    const user = users.find(user => user._id.toString() === userId);
    return user ? user.is_admin : false;
  }
  
  /**
   * Make a user an admin (for testing purposes)
   */
  async makeAdmin(userId: string): Promise<boolean> {
    const user = users.find(user => user._id.toString() === userId);
    
    if (!user) {
      return false;
    }
    
    user.is_admin = true;
    return true;
  }
  
  /**
   * Get all users (for testing purposes)
   */
  async getAllUsers(): Promise<UserResponse[]> {
    return users.map(user => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      created_at: user.created_at
    }));
  }
}

export default new MockUserModel();
