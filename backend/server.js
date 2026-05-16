require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Placeholder Routes
const carRoutes = require('./routes/cars');
const listingRoutes = require('./routes/listings');

app.use('/api/cars', carRoutes);
app.use('/api/listings', listingRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('PakAuto API is running...');
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pakauto')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    // For development, we can still run the server even if MongoDB fails to connect initially
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (without DB connection)`);
    });
  });
