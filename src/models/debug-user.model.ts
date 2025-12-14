import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { User, UserResponse, RegisterUserInput } from '../types';

// Create admin password hash for testing
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

// In-memory storage for users with consistent debug output
const users: MockUser[] = [
  {
    _id: new Types.ObjectId(),
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

// Log the admin details on startup for debugging
console.log('Debug user model loaded');
console.log('Admin email:', users[0].email);
console.log('Admin ID:', users[0]._id.toString());
console.log('Admin is_admin:', users[0].is_admin);

class DebugUserModel {
  /**
   * Register a new user with debug output
   */
  async register(userData: RegisterUserInput): Promise<UserResponse> {
    console.log('Registering new user:', userData.email);
    
    const { username, email, password } = userData;
    
    // Check if user already exists
    const userExists = users.find(user => user.username === username || user.email === email);
    
    if (userExists) {
      console.log('User already exists with this email/username');
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
    
    console.log('New user created with ID:', newUserId.toString());
    
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
   * Find user by email with debug output
   */
  async findByEmail(email: string): Promise<MockUser | null> {
    console.log('Looking for user by email:', email);
    const user = users.find(user => user.email === email);
    console.log('User found?', !!user);
    if (user) {
      console.log('User ID:', user._id.toString());
      console.log('Is admin?', user.is_admin);
    }
    return user || null;
  }
  
  /**
   * Find user by ID with debug output
   */
  async findById(id: string): Promise<UserResponse | null> {
    console.log('Looking for user by ID:', id);
    const user = users.find(user => user._id.toString() === id);
    
    console.log('User found?', !!user);
    
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
   * Get all users (for debugging)
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

export default new DebugUserModel();
