// A script to test the Sweet endpoints
const axios = require('axios');

// API base URL
const API_URL = 'http://localhost:3000/api';

// Test data
let authToken = null;
let adminToken = null;
let testSweetId = null;

// Helper function for authenticated requests
const authRequest = async (method, url, data = null) => {
  try {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const config = { headers };
    
    if (method === 'get') {
      return await axios.get(url, config);
    } else if (method === 'post') {
      return await axios.post(url, data, config);
    } else if (method === 'put') {
      return await axios.put(url, data, config);
    } else if (method === 'delete') {
      return await axios.delete(url, config);
    }
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// Helper function for admin requests
const adminRequest = async (method, url, data = null) => {
  try {
    const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};
    const config = { headers };
    
    if (method === 'get') {
      return await axios.get(url, config);
    } else if (method === 'post') {
      return await axios.post(url, data, config);
    } else if (method === 'put') {
      return await axios.put(url, data, config);
    } else if (method === 'delete') {
      return await axios.delete(url, config);
    }
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// Test functions
async function login() {
  console.log('Logging in as regular user...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    authToken = response.data.token;
    console.log('✅ Login successful');
    return true;
  } catch (error) {
    console.error('❌ Login failed. Creating test user...');
    
    // Create test user
    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      authToken = registerResponse.data.token;
      console.log('✅ Registration and login successful');
      return true;
    } catch (registerError) {
      console.error('❌ Registration failed:', registerError);
      return false;
    }
  }
}

async function loginAsAdmin() {
  console.log('\nLogging in as admin...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    adminToken = response.data.token;
    console.log('✅ Admin login successful');
    return true;
  } catch (error) {
    console.error('❌ Admin login failed');
    console.error(error);
    return false;
  }
}

async function createSweet() {
  console.log('\nCreating a new sweet...');
  try {
    const sweetData = {
      name: 'Test Sweet',
      category: 'Test Category',
      description: 'A test sweet for API testing',
      price: 3.99,
      quantity: 50
    };
    
    const response = await authRequest('post', `${API_URL}/sweets`, sweetData);
    testSweetId = response.data.sweet.id;
    
    console.log('✅ Sweet created successfully');
    console.log('Sweet ID:', testSweetId);
    return true;
  } catch (error) {
    console.error('❌ Sweet creation failed');
    console.error(error);
    return false;
  }
}

async function getAllSweets() {
  console.log('\nGetting all sweets...');
  try {
    const response = await axios.get(`${API_URL}/sweets`);
    
    console.log('✅ Successfully retrieved all sweets');
    console.log(`Found ${response.data.sweets.length} sweets`);
    return true;
  } catch (error) {
    console.error('❌ Failed to get sweets');
    console.error(error);
    return false;
  }
}

async function searchSweets() {
  console.log('\nSearching for sweets by category...');
  try {
    const response = await axios.get(`${API_URL}/sweets/search?category=Test`);
    
    console.log('✅ Search successful');
    console.log(`Found ${response.data.sweets.length} sweets matching category 'Test'`);
    return true;
  } catch (error) {
    console.error('❌ Search failed');
    console.error(error);
    return false;
  }
}

async function getSweetById() {
  console.log('\nGetting sweet by ID...');
  try {
    if (!testSweetId) {
      console.error('❌ No sweet ID available for testing');
      return false;
    }
    
    const response = await axios.get(`${API_URL}/sweets/${testSweetId}`);
    
    console.log('✅ Successfully retrieved sweet by ID');
    console.log('Sweet:', response.data.sweet.name);
    return true;
  } catch (error) {
    console.error('❌ Failed to get sweet by ID');
    console.error(error);
    return false;
  }
}

async function updateSweet() {
  console.log('\nUpdating sweet...');
  try {
    if (!testSweetId) {
      console.error('❌ No sweet ID available for testing');
      return false;
    }
    
    const updateData = {
      name: 'Updated Test Sweet',
      price: 4.99
    };
    
    const response = await authRequest('put', `${API_URL}/sweets/${testSweetId}`, updateData);
    
    console.log('✅ Sweet updated successfully');
    console.log('Updated sweet:', response.data.sweet.name);
    return true;
  } catch (error) {
    console.error('❌ Sweet update failed');
    console.error(error);
    return false;
  }
}

async function purchaseSweet() {
  console.log('\nPurchasing sweet...');
  try {
    if (!testSweetId) {
      console.error('❌ No sweet ID available for testing');
      return false;
    }
    
    const purchaseData = {
      quantity: 5
    };
    
    const response = await authRequest('post', `${API_URL}/sweets/${testSweetId}/purchase`, purchaseData);
    
    console.log('✅ Sweet purchased successfully');
    console.log(`Remaining quantity: ${response.data.sweet.quantity}`);
    return true;
  } catch (error) {
    console.error('❌ Sweet purchase failed');
    console.error(error);
    return false;
  }
}

async function restockSweet() {
  console.log('\nRestocking sweet (admin only)...');
  try {
    if (!testSweetId) {
      console.error('❌ No sweet ID available for testing');
      return false;
    }
    
    const restockData = {
      quantity: 10
    };
    
    const response = await adminRequest('post', `${API_URL}/sweets/${testSweetId}/restock`, restockData);
    
    console.log('✅ Sweet restocked successfully');
    console.log(`New quantity: ${response.data.sweet.quantity}`);
    return true;
  } catch (error) {
    console.error('❌ Sweet restock failed');
    console.error(error);
    return false;
  }
}

async function deleteSweet() {
  console.log('\nDeleting sweet (admin only)...');
  try {
    if (!testSweetId) {
      console.error('❌ No sweet ID available for testing');
      return false;
    }
    
    const response = await adminRequest('delete', `${API_URL}/sweets/${testSweetId}`);
    
    console.log('✅ Sweet deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Sweet deletion failed');
    console.error(error);
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log('==================================');
  console.log('RUNNING SWEET API ENDPOINT TESTS');
  console.log('==================================\n');
  
  // Login first
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.error('Cannot proceed with tests without authentication');
    return;
  }
  
  // Also login as admin for admin-only endpoints
  const adminLoginSuccess = await loginAsAdmin();
  
  // Test creating a sweet
  await createSweet();
  
  // Test getting all sweets
  await getAllSweets();
  
  // Test searching sweets
  await searchSweets();
  
  // Test getting sweet by ID
  await getSweetById();
  
  // Test updating a sweet
  await updateSweet();
  
  // Test purchasing a sweet
  await purchaseSweet();
  
  // Test restocking a sweet (admin only)
  if (adminLoginSuccess) {
    await restockSweet();
    
    // Test deleting a sweet (admin only)
    await deleteSweet();
  }
  
  console.log('\n==================================');
  console.log('SWEET API TESTS COMPLETED');
  console.log('==================================');
}

// Execute the tests
runTests();
