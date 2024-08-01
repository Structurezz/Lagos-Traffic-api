

import Route from '../models/routeModel.js';
import { fetchTrafficData } from '../services/trafficService.js';

export const getUserRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ userId: req.user.id });
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
};

export const createRoute = async (req, res) => {
  const { origin, destination } = req.body;

  // Validate input
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  try {
    const travelInfo = await fetchTrafficData(origin, destination);
    const newRoute = new Route({
      userId: req.user.id,
      origin,
      destination,
      ...travelInfo,
    });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create route' });
  }
};

export const deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    if (route.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this route' });
    }
    await route.remove();
    res.status(200).json({ message: 'Route deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete route' });
  }
};
