import dotenv from 'dotenv';
dotenv.config();

import { sampleSweets } from './sample-sweets';
import axios from 'axios';

// URL where the backend API is running
const API_URL = 'http://localhost:3000/api';

// Admin credentials for authentication
const adminCredentials = {
  email: 'admin@example.com',
  password: 'admin123'
};

/**
 * Seeds the database with sample sweet items
 */
async function seedSweets() {
  try {
    console.log('🍬 Starting to seed sample sweets...');
    
    // Login as admin to get auth token
    console.log('👤 Logging in as admin...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, adminCredentials);
    const token = loginResponse.data.token;
    
    if (!token) {
      throw new Error('Failed to authenticate. Make sure admin user exists.');
    }
    
    console.log('✅ Logged in successfully!');
    
    // Set auth header for subsequent requests
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    // Add each sweet to the database
    console.log(`🍭 Adding ${sampleSweets.length} sample sweets...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const sweet of sampleSweets) {
      try {
        // Convert price from INR to appropriate format if needed
        const sweetData = {
          ...sweet,
          // Add any additional conversions if needed
        };
        
        await axios.post(`${API_URL}/sweets`, sweetData, config);
        successCount++;
        console.log(`✅ Added: ${sweet.name}`);
      } catch (error: any) {
        errorCount++;
        console.error(`❌ Failed to add ${sweet.name}:`, error.response?.data?.message || error.message);
      }
    }
    
    console.log('\n🎉 Seeding completed!');
    console.log(`✅ Successfully added: ${successCount} sweets`);
    
    if (errorCount > 0) {
      console.log(`❌ Failed to add: ${errorCount} sweets`);
    }
    
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
  }
}

// Run the seeding function
seedSweets();
