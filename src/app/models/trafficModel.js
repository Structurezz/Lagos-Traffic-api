
import mongoose from 'mongoose';

const trafficSchema = new mongoose.Schema({
  origin: String,
  destination: String,
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

const Traffic = mongoose.model('Traffic', trafficSchema);
export default Traffic;
