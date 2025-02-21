import { verifyToken } from './utils.js';
import User from '../models/User.js';

// Middleware to check if the user is authenticated
export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Bearer token
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  // Add user info to request object
  req.userId = decoded.userId;
  next();
};

// Middleware to check if the user is an admin
export const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Error in authorization', error: err });
  }
};

// Middleware to validate user input for registration
export const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};
