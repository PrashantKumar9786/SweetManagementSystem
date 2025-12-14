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

// In-memory storage for sweets
const sweets: MockSweet[] = [
  {
    _id: new Types.ObjectId(),
    name: 'Chocolate Truffle',
    category: 'Chocolate',
    description: 'Rich chocolate truffle with a smooth ganache center',
    price: 2.50,
    quantity: 100,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: 'Vanilla Fudge',
    category: 'Fudge',
    description: 'Creamy vanilla fudge',
    price: 1.75,
    quantity: 75,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: new Types.ObjectId(),
    name: 'Strawberry Candy',
    category: 'Hard Candy',
    description: 'Sweet strawberry flavored hard candy',
    price: 0.99,
    quantity: 200,
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
