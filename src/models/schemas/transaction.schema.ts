import mongoose from 'mongoose';
import { Transaction } from '../../types';

// Define the transaction schema
const transactionSchema = new mongoose.Schema<Transaction>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sweet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sweet',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ['purchase', 'restock'],
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Convert _id to id in JSON responses
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    // Enable timestamps (createdAt only)
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  }
);

// Create indexes for efficient querying
transactionSchema.index({ user_id: 1 });
transactionSchema.index({ sweet_id: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ created_at: -1 });

// Create and export the Transaction model
export default mongoose.model<Transaction>('Transaction', transactionSchema);
