import { Types } from 'mongoose';
import { SweetResponse, CreateSweetInput, UpdateSweetInput } from '../types';

// Custom type for mock Sweet
type MockSweet = {
  _id: Types.ObjectId;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
};

// In-memory storage for sweets - Indian sweets data
const sweets: MockSweet[] = [
  {
    _id: new Types.ObjectId(),
    name: "Gulab Jamun",
    category: "MILK_BASED",
    description: "Gulab Jamun - ₹420/kg includes 5% GST.",
    price: 420,
    quantity: 25,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Rasgulla",
    category: "BENGALI",
    description: "Rasgulla - ₹380/kg includes 5% GST.",
    price: 380,
    quantity: 18,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Kaju Katli",
    category: "DRY_FRUIT",
    description: "Kaju Katli - ₹980/kg includes 5% GST.",
    price: 980,
    quantity: 12,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Motichoor Ladoo",
    category: "NORTH_INDIAN",
    description: "Motichoor Ladoo - ₹520/kg includes 5% GST.",
    price: 520,
    quantity: 20,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Mysore Pak",
    category: "FESTIVE",
    description: "Mysore Pak - ₹640/kg includes 5% GST.",
    price: 640,
    quantity: 10,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Gajar Halwa",
    category: "HALWA",
    description: "Gajar Halwa - ₹480/kg includes 5% GST.",
    price: 480,
    quantity: 15,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Moong Dal Halwa",
    category: "HALWA",
    description: "Moong Dal Halwa - ₹720/kg includes 5% GST.",
    price: 720,
    quantity: 8,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Rasmalai",
    category: "MILK_BASED",
    description: "Rasmalai - ₹520/kg includes 5% GST.",
    price: 520,
    quantity: 10,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Sugar-Free Kaju Katli",
    category: "SUGAR_FREE",
    description: "Sugar-Free Kaju Katli - ₹1150/kg includes 5% GST. Sugar-free option.",
    price: 1150,
    quantity: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: "Sugar-Free Badam Barfi",
    category: "SUGAR_FREE",
    description: "Sugar-Free Badam Barfi - ₹1080/kg includes 5% GST. Sugar-free option.",
    price: 1080,
    quantity: 4,
    created_at: new Date(),
    updated_at: new Date()
  }
];

class MockSweetModel {
  /**
   * Create a new sweet
   */
  async create(sweetData: CreateSweetInput): Promise<SweetResponse> {
    // Create new sweet with an ObjectId
    const newSweetId = new Types.ObjectId();
    const newSweet: MockSweet = {
      _id: newSweetId,
      ...sweetData,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    // Add to in-memory storage
    sweets.push(newSweet);
    
    // Return formatted response
    return {
      id: newSweetId.toString(),
      ...sweetData,
      created_at: newSweet.created_at,
      updated_at: newSweet.updated_at
    };
  }
  
  /**
   * Get all sweets
   */
  async findAll(): Promise<SweetResponse[]> {
    return sweets.map(sweet => ({
      id: sweet._id.toString(),
      name: sweet.name,
      category: sweet.category,
      description: sweet.description,
      price: sweet.price,
      quantity: sweet.quantity,
      created_at: sweet.created_at,
      updated_at: sweet.updated_at
    }));
  }
  
  /**
   * Get sweet by ID
   */
  async findById(id: string): Promise<SweetResponse | null> {
    const sweet = sweets.find(sweet => sweet._id.toString() === id);
    
    if (!sweet) {
      return null;
    }
    
    return {
      id: sweet._id.toString(),
      name: sweet.name,
      category: sweet.category,
      description: sweet.description,
      price: sweet.price,
      quantity: sweet.quantity,
      created_at: sweet.created_at,
      updated_at: sweet.updated_at
    };
  }
  
  /**
   * Search sweets by various criteria
   */
  async search(params: { 
    name?: string; 
    category?: string; 
    minPrice?: number; 
    maxPrice?: number 
  }): Promise<SweetResponse[]> {
    const { name, category, minPrice, maxPrice } = params;
    
    // Filter sweets based on criteria
    const filteredSweets = sweets.filter(sweet => {
      // Name filter (case insensitive)
      if (name && !sweet.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      
      // Category filter (case insensitive)
      if (category && !sweet.category.toLowerCase().includes(category.toLowerCase())) {
        return false;
      }
      
      // Price range filter
      if (minPrice !== undefined && sweet.price < minPrice) {
        return false;
      }
      
      if (maxPrice !== undefined && sweet.price > maxPrice) {
        return false;
      }
      
      return true;
    });
    
    // Format response
    return filteredSweets.map(sweet => ({
      id: sweet._id.toString(),
      name: sweet.name,
      category: sweet.category,
      description: sweet.description,
      price: sweet.price,
      quantity: sweet.quantity,
      created_at: sweet.created_at,
      updated_at: sweet.updated_at
    }));
  }
  
  /**
   * Update a sweet
   */
  async update(id: string, sweetData: UpdateSweetInput): Promise<SweetResponse | null> {
    // Find sweet index
    const sweetIndex = sweets.findIndex(sweet => sweet._id.toString() === id);
    
    if (sweetIndex === -1) {
      return null;
    }
    
    // Update the sweet
    sweets[sweetIndex] = {
      ...sweets[sweetIndex],
      ...sweetData,
      updated_at: new Date()
    };
    
    const updatedSweet = sweets[sweetIndex];
    
    // Format response
    return {
      id: updatedSweet._id.toString(),
      name: updatedSweet.name,
      category: updatedSweet.category,
      description: updatedSweet.description,
      price: updatedSweet.price,
      quantity: updatedSweet.quantity,
      created_at: updatedSweet.created_at,
      updated_at: updatedSweet.updated_at
    };
  }
  
  /**
   * Delete a sweet
   */
  async delete(id: string): Promise<boolean> {
    const initialLength = sweets.length;
    const sweetIndex = sweets.findIndex(sweet => sweet._id.toString() === id);
    
    if (sweetIndex === -1) {
      return false;
    }
    
    sweets.splice(sweetIndex, 1);
    return initialLength > sweets.length;
  }
  
  /**
   * Purchase a sweet (decrease quantity)
   */
  async purchase(id: string, quantity: number): Promise<SweetResponse | null> {
    // Find sweet
    const sweetIndex = sweets.findIndex(sweet => sweet._id.toString() === id);
    
    if (sweetIndex === -1 || sweets[sweetIndex].quantity < quantity) {
      return null;
    }
    
    // Update the sweet quantity
    sweets[sweetIndex].quantity -= quantity;
    sweets[sweetIndex].updated_at = new Date();
    
    const updatedSweet = sweets[sweetIndex];
    
    // Format response
    return {
      id: updatedSweet._id.toString(),
      name: updatedSweet.name,
      category: updatedSweet.category,
      description: updatedSweet.description,
      price: updatedSweet.price,
      quantity: updatedSweet.quantity,
      created_at: updatedSweet.created_at,
      updated_at: updatedSweet.updated_at
    };
  }
  
  /**
   * Restock a sweet (increase quantity)
   */
  async restock(id: string, quantity: number): Promise<SweetResponse | null> {
    // Find sweet
    const sweetIndex = sweets.findIndex(sweet => sweet._id.toString() === id);
    
    if (sweetIndex === -1) {
      return null;
    }
    
    // Update the sweet quantity
    sweets[sweetIndex].quantity += quantity;
    sweets[sweetIndex].updated_at = new Date();
    
    const updatedSweet = sweets[sweetIndex];
    
    // Format response
    return {
      id: updatedSweet._id.toString(),
      name: updatedSweet.name,
      category: updatedSweet.category,
      description: updatedSweet.description,
      price: updatedSweet.price,
      quantity: updatedSweet.quantity,
      created_at: updatedSweet.created_at,
      updated_at: updatedSweet.updated_at
    };
  }
}

export default new MockSweetModel();
