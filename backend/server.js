require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
const carRoutes = require('./routes/cars');
const listingRoutes = require('./routes/listings');

app.use('/api/cars', carRoutes);
app.use('/api/listings', listingRoutes);

app.get('/', (req, res) => res.send('PakAuto API is running...'));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pakauto')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (without DB)`));
  });
