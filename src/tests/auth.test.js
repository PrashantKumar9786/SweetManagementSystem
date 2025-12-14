// A simple script to test the authentication endpoints
const axios = require('axios');

// API base URL
const API_URL = 'http://localhost:3000/api';

// Test user data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

// Test functions
async function testRegister() {
  console.log('Testing user registration...');
  try {
    const response = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registration successful');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Registration failed');
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
}

async function testLogin() {
  console.log('\nTesting user login...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Login failed');
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
}

async function testProtectedRoute(token) {
  console.log('\nTesting protected route (profile)...');
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
    console.log('✅ Access to protected route successful');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Access to protected route failed');
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
  console.log('RUNNING AUTHENTICATION ENDPOINT TESTS');
  console.log('==================================\n');
  
  // Test registration
  const registerResult = await testRegister();
  
  // Test login
  const loginResult = await testLogin();
  
  // Test protected route
  if (loginResult && loginResult.token) {
    await testProtectedRoute(loginResult.token);
  }
  
  console.log('\n==================================');
  console.log('AUTHENTICATION TESTS COMPLETED');
  console.log('==================================');
}

// Execute the tests
runTests();
