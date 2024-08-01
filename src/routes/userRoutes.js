// src/app/routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  changePassword,
  resetPassword,
  deleteUser
} from '../app/controllers/userController.js';
import auth from '../app/middleware/auth.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);            // Register a new user
userRoutes.post('/login', loginUser);                  // Login a user
userRoutes.post('/logout', auth, logoutUser);          // Logout a user
userRoutes.get('/profile', auth, getProfile);          // Get user profile
userRoutes.put('/profile', auth, updateProfile);       // Update user profile
userRoutes.put('/change-password', auth, changePassword); // Change user password
userRoutes.post('/reset-password', resetPassword);     // Reset user password
userRoutes.delete('/delete', auth, deleteUser);        // Delete user account

export default userRoutes
