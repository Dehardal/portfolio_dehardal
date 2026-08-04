const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDb } = require('../config/db');
const Admin = require('../models/Admin');

const generateToken = (id, username) => {
  const secret = process.env.JWT_SECRET || 'super_secret_portfolio_key';
  return jwt.sign({ id, username }, secret, { expiresIn: '30d' });
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please provide credentials' });
  }

  try {
    const dbInfo = getDb();

    if (dbInfo.isMock) {
      // Mock Login flow
      const mockAdmin = dbInfo.data.admins.find(a => a.username === username);
      if (!mockAdmin) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }

      // Allow either direct match or basic mock validation
      if (password !== mockAdmin.password) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }

      const token = generateToken(mockAdmin._id, mockAdmin.username);
      return res.status(200).json({
        success: true,
        token,
        admin: { id: mockAdmin._id, username: mockAdmin.username }
      });
    } else {
      // Live database validation
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }

      const token = generateToken(admin._id, admin.username);
      return res.status(200).json({
        success: true,
        token,
        admin: { id: admin._id, username: admin.username }
      });
    }
  } catch (error) {
    console.error('🔒 Login Controller Error:', error);
    res.status(500).json({ success: false, message: 'Server Authentication Error' });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id || req.admin.id,
      username: req.admin.username
    }
  });
};

module.exports = { login, getMe };
