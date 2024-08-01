
import express from 'express';
import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: String,
  duration: String,
  start_address: String,
  end_address: String,
  steps: [
    {
      instruction: String,
      distance: String,
      duration: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Route = mongoose.model('Route', routeSchema);
export default Route;
