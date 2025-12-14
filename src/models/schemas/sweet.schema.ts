import mongoose from 'mongoose';
import { Sweet } from '../../types';

// Define the sweet schema
const sweetSchema = new mongoose.Schema<Sweet>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
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
    // Enable timestamps (createdAt, updatedAt)
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Create indexes for efficient querying
sweetSchema.index({ name: 'text', category: 'text' });
sweetSchema.index({ price: 1 });
sweetSchema.index({ category: 1 });

// Create and export the Sweet model
export default mongoose.model<Sweet>('Sweet', sweetSchema);
