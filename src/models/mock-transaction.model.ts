import { Types } from 'mongoose';
import { TransactionResponse } from '../types';

// Type for mock transaction
type MockTransaction = {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  sweet_id: Types.ObjectId;
  quantity: number;
  type: 'purchase' | 'restock';
  created_at: Date;
};

// In-memory storage for transactions
const transactions: MockTransaction[] = [];

class MockTransactionModel {
  /**
   * Record a purchase transaction
   */
  async recordPurchase(userId: string, sweetId: string, quantity: number): Promise<TransactionResponse> {
    const transaction: MockTransaction = {
      _id: new Types.ObjectId(),
      user_id: new Types.ObjectId(userId),
      sweet_id: new Types.ObjectId(sweetId),
      quantity,
      type: 'purchase',
      created_at: new Date()
    };
    
    transactions.push(transaction);
    
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
    const transaction: MockTransaction = {
      _id: new Types.ObjectId(),
      user_id: new Types.ObjectId(userId),
      sweet_id: new Types.ObjectId(sweetId),
      quantity,
      type: 'restock',
      created_at: new Date()
    };
    
    transactions.push(transaction);
    
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
    const userTransactions = transactions.filter(
      t => t.user_id.toString() === userId
    ).sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    
    return userTransactions.map(t => ({
      id: t._id.toString(),
      user_id: t.user_id.toString(),
      sweet_id: t.sweet_id.toString(),
      quantity: t.quantity,
      type: t.type,
      created_at: t.created_at
    }));
  }
  
  /**
   * Get transactions by sweet ID
   */
  async getBySweetId(sweetId: string): Promise<TransactionResponse[]> {
    const sweetTransactions = transactions.filter(
      t => t.sweet_id.toString() === sweetId
    ).sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    
    return sweetTransactions.map(t => ({
      id: t._id.toString(),
      user_id: t.user_id.toString(),
      sweet_id: t.sweet_id.toString(),
      quantity: t.quantity,
      type: t.type,
      created_at: t.created_at
    }));
  }
}

export default new MockTransactionModel();
