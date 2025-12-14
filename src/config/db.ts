import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Set a connection timeout
  connectionTimeoutMillis: 5000,
  // Add a retry strategy
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
});

// Handle pool connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Function to test database connection
export const testConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database');
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return false;
  } finally {
    if (client) client.release();
  }
};

// Export the query method for use in models
export default {
  query: async (text: string, params?: any[]) => {
    try {
      return await pool.query(text, params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },
  testConnection
};
