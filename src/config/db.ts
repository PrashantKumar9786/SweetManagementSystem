import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URL (from environment variables)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet_management';

// Configure mongoose
mongoose.set('strictQuery', true);

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB database');
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;
  }
};

// Function to test database connection
export const testConnection = async () => {
  try {
    // Check if mongoose is already connected
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB connection already established');
      return true;
    }

    // Try to connect
    await connectDB();
    return true;
  } catch (error) {
    console.error('Error testing MongoDB connection:', error);
    return false;
  }
};

// Function to close the database connection
export const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    return true;
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    return false;
  }
};

// Export mongoose for direct access
export default {
  mongoose,
  testConnection,
  connectDB,
  closeConnection
};
