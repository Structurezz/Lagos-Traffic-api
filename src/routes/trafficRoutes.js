
import express from 'express';
import { getTrafficUpdates } from '../app/controllers/trafficController.js';

const router = express.Router();

// Route to get traffic updates
router.get('/traffic', getTrafficUpdates);

export default router;
