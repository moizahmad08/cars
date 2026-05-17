const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Car = require('../models/Car');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pakauto';

const csvFilePath = path.join(__dirname, '../../scraper/output/pakauto_master_db.csv');

async function importCars() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for import...');

    if (!fs.existsSync(csvFilePath)) {
      console.error('CSV file not found at:', csvFilePath);
      process.exit(1);
    }

    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Map CSV fields to schema
        // This is a dynamic mapping based on common PakWheels keys
        const car = {
          make: data['Make'],
          model: data['Model'],
          variant: data['Variant'],
          year: parseInt(data['Model Year']) || 2024,
          engineSpecs: {
            capacityCc: parseInt(data['Engine Displacement (cc)']) || parseInt(data['Displacement']) || 0,
            horsepower: parseInt(data['Horse Power']) || 0
          },
          fuelType: data['Fuel Type'] || 'Petrol',
          transmission: data['Transmission'] || 'Automatic',
          seating: parseInt(data['Seating Capacity']) || 5,
          bootSpace: parseInt(data['Boot Space']) || 0,
          features: [],
          maintenanceCost: 'Medium',
          reliabilityScore: 8,
          fuelEconomy: parseInt(data['Mileage (City)']) || 12,
          resaleValue: 8
        };

        // Collect features
        const featureKeys = ['Air Conditioner', 'Anti-Lock Braking System', 'Airbags', 'Sunroof', 'Alloy Wheels'];
        featureKeys.forEach(f => {
          if (data[f] === 'Yes') car.features.push(f);
        });

        results.push(car);
      })
      .on('end', async () => {
        console.log(`Parsed ${results.length} cars from CSV. Starting database insertion...`);
        
        for (const car of results) {
          try {
            await Car.findOneAndUpdate(
              { make: car.make, model: car.model, variant: car.variant, year: car.year },
              car,
              { upsert: true, new: true }
            );
          } catch (err) {
            console.error(`Error importing ${car.make} ${car.model}:`, err.message);
          }
        }
        
        console.log('Import completed successfully!');
        mongoose.connection.close();
      });

  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
}

importCars();
