// Vercel backend Node.js deployment
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRouter = require('../src/routes/user.route');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/', userRouter);

// Database connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    serverSelectionTimeoutMS: 20000, // Timeout for server selection
    socketTimeoutMS: 45000, // Timeout for socket connections
  }
)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Export the app
module.exports = app;
