
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Login a user
  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Logout a user
  export const logoutUser = (req, res) => {
    res.json({ message: 'Logged out successfully' });
  };
  
  // Get user profile
  export const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update user profile
  export const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        const updatedUser = await user.save();
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Change user password
  export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
      const user = await User.findById(req.user.id);
      if (!user || !await bcrypt.compare(currentPassword, user.password)) {
        return res.status(400).json({ message: 'Invalid current password' });
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Reset user password
  export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete user account
  export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.json({ message: 'User account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };