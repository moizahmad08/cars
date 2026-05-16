const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  variant: { type: String },
  engineSpecs: {
    capacityCc: { type: Number },
    horsepower: { type: Number }
  },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Hybrid', 'EV', 'CNG'] },
  transmission: { type: String, enum: ['Manual', 'Automatic'] },
  seating: { type: Number },
  bootSpace: { type: Number }, // in Liters
  safetyRatings: { type: Number }, // Out of 5
  features: [{ type: String }],
  reliabilityScore: { type: Number }, // Out of 10
  maintenanceCost: { type: String }, // e.g., 'Low', 'Medium', 'High'
  fuelEconomy: { type: Number }, // km/l
  resaleValue: { type: Number }, // Out of 10
  knownIssues: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
