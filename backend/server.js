// internal imports
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { private } = require('./middleware/authMiddleware');
const connectDB = require('./config/db');
const path = require('path');

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

// serve frontend
if (process.env.NODE_ENV === 'production') {
  console.log('Serving Production Build');
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    return res.sendFile(
      path.join(__dirname, '../frontend/build', 'index.html')
    );
  });
} else {
  console.log('Serving Dev Build');
}

// entrypoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
