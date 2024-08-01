// server.js
import express from 'express';
import mongoose from 'mongoose';
import trafficRoutes from './../routes/trafficRoutes.js';
import userRoutes from './../routes/userRoutes.js'; // Import userRoutes
import { MONGODB_URI, PORT } from '../lib/config/config.js'; // Import MONGODB_URI and PORT
import router from './../routes/routes.js';
import ErrorMiddleware from '../app/middleware/errorMiddleware.js';
import auth from '../app/middleware/auth.js'; 
import dotenv from 'dotenv';
import joi from 'joi';
import jest from 'jest';
import jwt from 'jsonwebtoken';



dotenv.config();

const jwtSecret = process.env.JWT_SECRET;




const app = express();

app.use(express.json());
app.use('/api/traffic', trafficRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };