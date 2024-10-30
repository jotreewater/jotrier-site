// internal imports
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { private } = require('./middleware/authMiddleware');
const connectDB = require('./config/db');

// env setup
const dotenv = require('dotenv').config();
if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error('Missing environment variables');
  process.exit(1);
}

connectDB();

// express setup
const express = require('express');
const app = express();
app.use(express.json()); // to allow requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // parse form data

// routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));

// middleware
app.use(errorMiddleware);

// default response
app.get('/api', (req, res) => {
  res.status(200).json({ message: `You've hit the jotrier API` });
});

// private test
app.get('/api/private', private, (req, res) => {
  res.status(200).json({ message: `You've hit the private endpoint` });
});

// entrypoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
