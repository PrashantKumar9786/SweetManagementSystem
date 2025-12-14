import { Types } from 'mongoose';
import { TransactionResponse } from '../types';
import TransactionSchema from './schemas/transaction.schema';

class TransactionModel {
  /**
   * Record a purchase transaction
   */
  async recordPurchase(userId: string, sweetId: string, quantity: number): Promise<TransactionResponse> {
    // Create transaction
    const transaction = new TransactionSchema({
      user_id: new Types.ObjectId(userId),
      sweet_id: new Types.ObjectId(sweetId),
      quantity,
      type: 'purchase'
    });
    
    // Save transaction
    await transaction.save();
    
    // Return formatted response
    return {
      id: transaction._id.toString(),
      user_id: userId,
      sweet_id: sweetId,
      quantity,
      type: 'purchase',
      created_at: transaction.created_at
    };
  }
  
  /**
   * Record a restock transaction
   */
  async recordRestock(userId: string, sweetId: string, quantity: number): Promise<TransactionResponse> {
    // Create transaction
    const transaction = new TransactionSchema({
      user_id: new Types.ObjectId(userId),
      sweet_id: new Types.ObjectId(sweetId),
      quantity,
      type: 'restock'
    });
    
    // Save transaction
    await transaction.save();
    
    // Return formatted response
    return {
      id: transaction._id.toString(),
      user_id: userId,
      sweet_id: sweetId,
      quantity,
      type: 'restock',
      created_at: transaction.created_at
    };
  }
  
  /**
   * Get transactions by user ID
   */
  async getByUserId(userId: string): Promise<TransactionResponse[]> {
    const transactions = await TransactionSchema.find({ user_id: new Types.ObjectId(userId) })
      .sort({ created_at: -1 });
    
    // Format response
    return transactions.map(transaction => ({
      id: transaction._id.toString(),
      user_id: transaction.user_id.toString(),
      sweet_id: transaction.sweet_id.toString(),
      quantity: transaction.quantity,
      type: transaction.type,
      created_at: transaction.created_at
    }));
  }
  
  /**
   * Get transactions by sweet ID
   */
  async getBySweetId(sweetId: string): Promise<TransactionResponse[]> {
    const transactions = await TransactionSchema.find({ sweet_id: new Types.ObjectId(sweetId) })
      .sort({ created_at: -1 });
    
    // Format response
    return transactions.map(transaction => ({
      id: transaction._id.toString(),
      user_id: transaction.user_id.toString(),
      sweet_id: transaction.sweet_id.toString(),
      quantity: transaction.quantity,
      type: transaction.type,
      created_at: transaction.created_at
    }));
  }
}

export default new TransactionModel();
