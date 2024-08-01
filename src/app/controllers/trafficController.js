
import traffic from '../models/trafficModel.js';
import { fetchTrafficData } from '../services/trafficService.js';

export const getTrafficUpdates = async (req, res) => {
  const { origin, destination } = req.query;

  // Validate input
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  try {
    // Fetch traffic data using the service
    const travelInfo = await fetchTrafficData(origin, destination);
    return res.status(200).json(travelInfo);
  } catch (error) {
    console.error('Error fetching traffic data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch traffic data' });
  }
};
