import dotenv from 'dotenv';
dotenv.config();

import SweetModel from './models/mock-sweet.model';
import { CreateSweetInput } from './types';

// Convert the provided data format to match our CreateSweetInput interface
const formatSweetData = (data: any): CreateSweetInput => {
  return {
    name: data.name,
    category: data.category,
    // Convert price from per kg to per unit and include description with price details
    price: data.price_per_kg,
    quantity: Math.round(data.stock_kg), // Convert kg to units
    description: `${data.is_sugar_free ? 'Sugar-free ' : ''}${data.name} - ₹${data.price_per_kg}/kg + ${data.gst_percent}% GST. ${data.is_available ? 'In stock' : 'Out of stock'}.`
  };
};

// Indian sweet data from JSON input
const indianSweets = [
  {
    "id": 1,
    "name": "Gulab Jamun",
    "category": "MILK_BASED",
    "price_per_kg": 420,
    "gst_percent": 5,
    "stock_kg": 25,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 2,
    "name": "Rasgulla",
    "category": "BENGALI",
    "price_per_kg": 380,
    "gst_percent": 5,
    "stock_kg": 18,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 3,
    "name": "Kaju Katli",
    "category": "DRY_FRUIT",
    "price_per_kg": 980,
    "gst_percent": 5,
    "stock_kg": 12,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 4,
    "name": "Motichoor Ladoo",
    "category": "NORTH_INDIAN",
    "price_per_kg": 520,
    "gst_percent": 5,
    "stock_kg": 20,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 5,
    "name": "Mysore Pak",
    "category": "FESTIVE",
    "price_per_kg": 640,
    "gst_percent": 5,
    "stock_kg": 10,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 6,
    "name": "Gajar Halwa",
    "category": "HALWA",
    "price_per_kg": 480,
    "gst_percent": 5,
    "stock_kg": 15,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 7,
    "name": "Moong Dal Halwa",
    "category": "HALWA",
    "price_per_kg": 720,
    "gst_percent": 5,
    "stock_kg": 8,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 8,
    "name": "Rasmalai",
    "category": "MILK_BASED",
    "price_per_kg": 520,
    "gst_percent": 5,
    "stock_kg": 10,
    "is_available": true,
    "is_sugar_free": false
  },
  {
    "id": 9,
    "name": "Sugar-Free Kaju Katli",
    "category": "SUGAR_FREE",
    "price_per_kg": 1150,
    "gst_percent": 5,
    "stock_kg": 5,
    "is_available": true,
    "is_sugar_free": true
  },
  {
    "id": 10,
    "name": "Sugar-Free Badam Barfi",
    "category": "SUGAR_FREE",
    "price_per_kg": 1080,
    "gst_percent": 5,
    "stock_kg": 4,
    "is_available": true,
    "is_sugar_free": true
  }
];

// Clear existing sweets and add new ones
const populateSweets = async () => {
  try {
    console.log('🍬 Adding Indian sweets to the database...');
    
    // Clear the existing mock data (sweets array is in memory)
    // This is a hack since there's no direct way to clear the array in the mock model
    const existingSweets = await SweetModel.findAll();
    for (const sweet of existingSweets) {
      await SweetModel.delete(sweet.id);
    }
    console.log(`✅ Cleared ${existingSweets.length} existing sweets`);
    
    // Add each sweet
    for (const sweetData of indianSweets) {
      const formattedData = formatSweetData(sweetData);
      const newSweet = await SweetModel.create(formattedData);
      console.log(`✅ Added: ${newSweet.name}`);
    }
    
    console.log('\n🎉 Sweet database populated successfully!');
    console.log(`✅ Added ${indianSweets.length} Indian sweets`);
    
    // Display all sweets
    const allSweets = await SweetModel.findAll();
    console.table(allSweets.map(sweet => ({
      id: sweet.id,
      name: sweet.name,
      category: sweet.category,
      price: `₹${sweet.price}`,
      quantity: sweet.quantity
    })));
    
  } catch (error) {
    console.error('❌ Error populating sweets:', error);
  }
};

// Run the script
populateSweets();
