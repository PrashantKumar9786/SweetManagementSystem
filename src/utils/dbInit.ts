import fs from 'fs';
import path from 'path';
import db from '../config/db';

/**
 * Initialize database schema by executing SQL file
 */
export async function initializeDatabase() {
  try {
    console.log('Initializing database schema...');
    
    const schemaPath = path.join(__dirname, '..', 'config', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    await db.query(schemaSQL);
    
    console.log('Database schema initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database schema:', error);
    return false;
  }
}

/**
 * Seed database with test data
 */
export async function seedTestData() {
  try {
    console.log('Seeding test data...');
    
    // Create admin user if it doesn't exist
    await db.query(`
      INSERT INTO users (username, email, password, is_admin) 
      VALUES ('admin', 'admin@example.com', '$2b$10$FvWoiMm5HJCnNvgNhzVnJeh0xmQoHgY6hPnQYrD5wdQUCvVURKPzW', true)
      ON CONFLICT (email) DO NOTHING;
    `);
    
    // Add some sample sweets
    await db.query(`
      INSERT INTO sweets (name, category, description, price, quantity) 
      VALUES 
        ('Chocolate Truffle', 'Chocolate', 'Rich chocolate truffle with a smooth ganache center', 2.50, 100),
        ('Vanilla Fudge', 'Fudge', 'Creamy vanilla fudge', 1.75, 75),
        ('Strawberry Candy', 'Hard Candy', 'Sweet strawberry flavored hard candy', 0.99, 200)
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('Test data seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding test data:', error);
    return false;
  }
}
