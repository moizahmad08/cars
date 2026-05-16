const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  // User Form Data
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  variant: { type: String },
  registrationCity: { type: String },
  registeredOwner: { type: String },
  registrationType: { type: String, enum: ['Local', 'Imported', 'Unregistered'] },
  color: {
    exterior: { type: String },
    interior: { type: String }
  },
  mileageKm: { type: Number, required: true },
  engineCapacityCc: { type: Number },
  fuelType: { type: String },
  transmission: { type: String },
  driveType: { type: String, enum: ['2WD', '4WD', 'AWD'] },
  previousOwners: { type: Number },
  condition: {
    engine: { type: String },
    chassis: { type: String },
    tyre: { type: String },
    ac: { type: String },
    battery: { type: String } // For Hybrid/EV
  },
  accidentHistory: {
    hasAccident: { type: Boolean },
    details: { type: String }
  },
  electronicsWorking: { type: Boolean },
  serviceHistory: {
    available: { type: Boolean },
    lastServiceDate: { type: Date }
  },
  askingPrice: { type: Number, required: true },
  isNegotiable: { type: Boolean },
  contact: {
    bestTime: { type: String },
    method: { type: String, enum: ['WhatsApp', 'Call', 'Both'] },
    sellerType: { type: String, enum: ['Owner', 'Dealer'] }
  },
  locationForViewing: { type: String },
  photos: [{ type: String }], // Cloudinary URLs
  
  // AI Generated Data
  aiDescription: { type: String },
  priceBenchmark: {
    status: { type: String, enum: ['Too High', 'Fair', 'Great Deal', 'Pending'] },
    minListed: { type: Number },
    avgListed: { type: Number },
    maxListed: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
