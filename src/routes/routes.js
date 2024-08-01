

import express from 'express';
import { getUserRoutes, createRoute, deleteRoute } from '../app/controllers/routeController.js';

const router = express.Router();

// Middleware to authenticate user (placeholder, implement your own authentication)
const authenticateUser = (req, res, next) => {
  // Assume req.user is set after authentication
  req.user = { id: 'some-user-id' }; // Replace with actual user ID
  next();
};

router.use(authenticateUser); // Apply authentication middleware to all routes

// Route to get user routes
router.get('/', getUserRoutes);

// Route to create a new route
router.post('/', createRoute);

// Route to delete a route
router.delete('/:id', deleteRoute);

export default router;
