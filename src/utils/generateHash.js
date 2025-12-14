// A simple utility to generate a bcrypt hash for testing
const bcrypt = require('bcrypt');

async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log(`Hash for password "${password}":`, hash);
  
  // Verify the hash
  const isValid = await bcrypt.compare(password, hash);
  console.log('Verification:', isValid);
  
  return hash;
}

// Generate hash for admin123
generateHash('admin123');
