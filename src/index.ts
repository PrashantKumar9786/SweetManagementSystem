import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db, { testConnection } from './config/db';
import { initializeDatabase, seedTestData } from './utils/dbInit';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Status route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Sweet Management System API is running',
    timestamp: new Date()
  });
});

// API health check route
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    res.json({
      status: 'success',
      services: {
        api: true,
        database: dbConnected
      },
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      services: {
        api: true,
        database: false
      },
      message: 'Health check failed',
      timestamp: new Date()
    });
  }
});

// Initialize the database when the app starts
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (dbConnected) {
      // Initialize database schema
      await initializeDatabase();
      
      // Optionally seed test data (can be toggled with an env variable)
      if (process.env.NODE_ENV !== 'production') {
        await seedTestData();
      }
    } else {
      console.warn('Database connection failed - proceeding without database initialization');
      console.warn('API will run in limited mode - some endpoints may not function properly');
    }
    
    // Start the server (even if DB connection fails, as some routes might not need DB)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API is available at http://localhost:${PORT}`);
      console.log(`Health check is available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;
