// external imports
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// internal imports
const User = require('../models/userModel');

// functions
const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3h' });
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Token generation failed');
  }
};

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include name, email, and password.');
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // create new user with hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error('Failed to create user');
  }
});

// email, password required
// returns JWT Token
const generateJWT = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // input validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required.');
  }

  // find user by email
  const user = await User.findOne({ email });
  if (!user) {
    // Generic message to prevent information leakage
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // respond with user info and token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const getUser = asyncHandler(async (req, res) => {
  // respond with user info
  const user = { id: req.user._id, email: req.user.email, name: req.user.name };
  res.status(200).json(req.user);
});

// exports
module.exports = {
  createUser,
  generateJWT,
  getUser,
};
