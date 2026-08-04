const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'super_secret_portfolio_key';
      
      const decoded = jwt.verify(token, secret);
      const dbInfo = getDb();

      if (dbInfo.isMock) {
        // Mock mode validation
        const mockAdmin = dbInfo.data.admins.find(a => a._id === decoded.id || a.username === decoded.username);
        if (!mockAdmin) {
          return res.status(401).json({ success: false, message: 'Not authorized, mock admin invalid' });
        }
        req.admin = mockAdmin;
      } else {
        // Standard database validation
        req.admin = await Admin.findById(decoded.id).select('-password');
        if (!req.admin) {
          return res.status(401).json({ success: false, message: 'Not authorized, admin record not found' });
        }
      }

      next();
    } catch (error) {
      console.error('🔒 Auth Middleware Error:', error.message);
      res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
    }
  } else {
    res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
