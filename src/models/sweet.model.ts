import { Sweet, SweetResponse, CreateSweetInput, UpdateSweetInput } from '../types';
import SweetSchema from './schemas/sweet.schema';

class SweetModel {
  /**
   * Create a new sweet
   */
  async create(sweetData: CreateSweetInput): Promise<SweetResponse> {
    // Create new sweet
    const sweet = new SweetSchema(sweetData);
    
    // Save to database
    await sweet.save();
    
    // Return formatted response
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
   * Get all sweets
   */
  async findAll(): Promise<SweetResponse[]> {
    const sweets = await SweetSchema.find().sort({ name: 1 });
    
    // Format response
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
    const sweet = await SweetSchema.findById(id);
    
    if (!sweet) {
      return null;
    }
    
    // Format response
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
    
    // Build query
    const query: any = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      
      if (minPrice !== undefined) {
        query.price.$gte = minPrice;
      }
      
      if (maxPrice !== undefined) {
        query.price.$lte = maxPrice;
      }
    }
    
    // Execute query
    const sweets = await SweetSchema.find(query).sort({ name: 1 });
    
    // Format response
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
   * Update a sweet
   */
  async update(id: string, sweetData: UpdateSweetInput): Promise<SweetResponse | null> {
    // Check if sweet exists
    const existingSweet = await SweetSchema.findById(id);
    
    if (!existingSweet) {
      return null;
    }
    
    // Update the sweet
    const updatedSweet = await SweetSchema.findByIdAndUpdate(
      id,
      {
        ...sweetData,
        updated_at: new Date()
      },
      { new: true } // Return the updated document
    );
    
    if (!updatedSweet) {
      return null;
    }
    
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
    const result = await SweetSchema.findByIdAndDelete(id);
    return !!result;
  }
  
  /**
   * Purchase a sweet (decrease quantity)
   */
  async purchase(id: string, quantity: number): Promise<SweetResponse | null> {
    // Check if sweet exists and has enough quantity
    const sweet = await SweetSchema.findById(id);
    
    if (!sweet || sweet.quantity < quantity) {
      return null;
    }
    
    // Update the sweet quantity
    sweet.quantity -= quantity;
    sweet.updated_at = new Date();
    await sweet.save();
    
    // Format response
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
   * Restock a sweet (increase quantity)
   */
  async restock(id: string, quantity: number): Promise<SweetResponse | null> {
    // Check if sweet exists
    const sweet = await SweetSchema.findById(id);
    
    if (!sweet) {
      return null;
    }
    
    // Update the sweet quantity
    sweet.quantity += quantity;
    sweet.updated_at = new Date();
    await sweet.save();
    
    // Format response
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
}

export default new SweetModel();
