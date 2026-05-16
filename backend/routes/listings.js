const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// @route   GET /api/listings
// @desc    Get all listings (for Browse page)
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/listings
// @desc    Create a new listing (from Module 2 Form)
router.post('/', async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.json(savedListing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
