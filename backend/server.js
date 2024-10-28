// env setup
const dotenv = require('dotenv').config();
//console.log(`Server is in mode: ${process.env.NODE_ENV}`);
//console.log(`Server will run on port: ${process.env.PORT}`);

// express setup
const express = require('express');
const app = express();
app.use(express.json()); // to allow requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // Uses querystring node library to parse form data

// routes

// middleware

// default response
app.get('/', (req, res) => {
  res.status(200).json({ message: `You've hit the jotrier API` });
});

// entrypoint
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
