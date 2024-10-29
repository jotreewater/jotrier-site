// external imports
const express = require('express');

// internal imports
const { createUser, getUser } = require('../controllers/userController');

// init routes
const userRoutes = express.Router();

// routes
userRoutes.post('/createUser', createUser);
userRoutes.post('/getUser', getUser);

// export
module.exports = userRoutes;
