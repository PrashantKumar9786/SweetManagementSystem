import { Request, Response } from 'express';
import SweetModel from '../models/mock-sweet.model'; // Using mock model for testing
import TransactionModel from '../models/mock-transaction.model'; // Using mock model for testing
import { CreateSweetInput, UpdateSweetInput } from '../types';

class SweetController {
  /**
   * Create a new sweet
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const sweetData: CreateSweetInput = req.body;
      
      // Validate sweet data
      if (!sweetData.name || !sweetData.category || sweetData.price === undefined || sweetData.quantity === undefined) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide all required fields' 
        });
      }
      
      // Validate price and quantity
      if (sweetData.price < 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Price cannot be negative' 
        });
      }
      
      if (sweetData.quantity < 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Quantity cannot be negative' 
        });
      }
      
      // Create sweet
      const newSweet = await SweetModel.create(sweetData);
      
      return res.status(201).json({
        success: true,
        message: 'Sweet created successfully',
        sweet: newSweet
      });
    } catch (error) {
      console.error('Create sweet error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create sweet'
      });
    }
  }
  
  /**
   * Get all sweets
   */
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const sweets = await SweetModel.findAll();
      
      return res.status(200).json({
        success: true,
        sweets
      });
    } catch (error) {
      console.error('Get sweets error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get sweets'
      });
    }
  }
  
  /**
   * Get a sweet by ID
   */
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      
      const sweet = await SweetModel.findById(id);
      
      if (!sweet) {
        return res.status(404).json({
          success: false,
          message: 'Sweet not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        sweet
      });
    } catch (error) {
      console.error('Get sweet by ID error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get sweet'
      });
    }
  }
  
  /**
   * Search sweets by various criteria
   */
  async search(req: Request, res: Response): Promise<Response> {
    try {
      const { name, category, minPrice, maxPrice } = req.query;
      
      // Build search params
      const searchParams: any = {};
      
      if (name) searchParams.name = name.toString();
      if (category) searchParams.category = category.toString();
      if (minPrice) searchParams.minPrice = parseFloat(minPrice.toString());
      if (maxPrice) searchParams.maxPrice = parseFloat(maxPrice.toString());
      
      const sweets = await SweetModel.search(searchParams);
      
      return res.status(200).json({
        success: true,
        sweets
      });
    } catch (error) {
      console.error('Search sweets error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to search sweets'
      });
    }
  }
  
  /**
   * Update a sweet
   */
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const sweetData: UpdateSweetInput = req.body;
      
      // Validate data
      if (sweetData.price !== undefined && sweetData.price < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price cannot be negative'
        });
      }
      
      if (sweetData.quantity !== undefined && sweetData.quantity < 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity cannot be negative'
        });
      }
      
      // Update sweet
      const updatedSweet = await SweetModel.update(id, sweetData);
      
      if (!updatedSweet) {
        return res.status(404).json({
          success: false,
          message: 'Sweet not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Sweet updated successfully',
        sweet: updatedSweet
      });
    } catch (error) {
      console.error('Update sweet error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update sweet'
      });
    }
  }
  
  /**
   * Delete a sweet
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      
      // Delete sweet
      const deleted = await SweetModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Sweet not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Sweet deleted successfully'
      });
    } catch (error) {
      console.error('Delete sweet error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete sweet'
      });
    }
  }
  
  /**
   * Purchase a sweet (decrease quantity)
   */
  async purchase(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { quantity } = req.body;
      const userId = req.user?.userId;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }
      
      // Validate quantity
      if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid quantity'
        });
      }
      
      // Purchase sweet
      const updatedSweet = await SweetModel.purchase(id, quantity);
      
      if (!updatedSweet) {
        return res.status(404).json({
          success: false,
          message: 'Sweet not found or insufficient quantity'
        });
      }
      
      // Record the transaction
      await TransactionModel.recordPurchase(userId, id, quantity);
      
      return res.status(200).json({
        success: true,
        message: 'Sweet purchased successfully',
        sweet: updatedSweet
      });
    } catch (error) {
      console.error('Purchase sweet error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to purchase sweet'
      });
    }
  }
  
  /**
   * Restock a sweet (increase quantity)
   */
  async restock(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { quantity } = req.body;
      const userId = req.user?.userId;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }
      
      // Validate quantity
      if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid quantity'
        });
      }
      
      // Restock sweet
      const updatedSweet = await SweetModel.restock(id, quantity);
      
      if (!updatedSweet) {
        return res.status(404).json({
          success: false,
          message: 'Sweet not found'
        });
      }
      
      // Record the transaction
      await TransactionModel.recordRestock(userId, id, quantity);
      
      return res.status(200).json({
        success: true,
        message: 'Sweet restocked successfully',
        sweet: updatedSweet
      });
    } catch (error) {
      console.error('Restock sweet error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to restock sweet'
      });
    }
  }
}

export default new SweetController();
