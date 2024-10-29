// external imports
const express = require('express');

// internal imports
const {
  createUser,
  generateJWT,
  getUser,
} = require('../controllers/userController');
const { private } = require('../middleware/authMiddleware');

// init routes
const userRoutes = express.Router();

// routes
userRoutes.post('/createUser', createUser);
userRoutes.post('/generateJWT', generateJWT);
userRoutes.get('/getUser', private, getUser);

// export
module.exports = userRoutes;
