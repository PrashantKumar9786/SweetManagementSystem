// A simple script to test admin authentication
const axios = require('axios');

// API base URL
const API_URL = 'http://localhost:3000/api';

// Admin credentials
const adminUser = {
  email: 'admin@example.com',
  password: 'admin123'
};

// Test functions
async function testAdminLogin() {
  console.log('Testing admin login...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, adminUser);
    console.log('✅ Admin login successful');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Admin login failed');
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
}

async function testAdminProfile(token) {
  console.log('\nTesting admin profile access...');
  if (!token) {
    console.error('❌ No token available for authorization');
    return;
  }
  
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Access to admin profile successful');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Access to admin profile failed');
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the tests
async function runTests() {
  console.log('==================================');
  console.log('RUNNING ADMIN AUTHENTICATION TESTS');
  console.log('==================================\n');
  
  // Test admin login
  const loginResult = await testAdminLogin();
  
  // Test admin profile access
  if (loginResult && loginResult.token) {
    await testAdminProfile(loginResult.token);
  }
  
  console.log('\n==================================');
  console.log('ADMIN AUTHENTICATION TESTS COMPLETED');
  console.log('==================================');
}

// Execute the tests
runTests();
