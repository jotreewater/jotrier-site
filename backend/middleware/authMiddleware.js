// external imports
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// internal imports
const User = require('../models/userModel');

const private = asyncHandler(async (req, res, next) => {
  let token;

  // check if authorization header is present and has the Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if no token, respond with an error
  if (!token) {
    return res.status(401).json({ message: 'Missing Bearer Token' });
  }

  try {
    // verify the token and decode the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user from the database and attach to the request object
    req.user = await User.findById(decoded.id).select('-password');

    // check if user exists
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT error:', error);
    // handle specific error cases
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { private };
