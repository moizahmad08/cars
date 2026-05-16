require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');

const mockCars = [
  {
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    variant: 'Oriel 1.5 CVT',
    engineSpecs: { capacityCc: 1500, horsepower: 170 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 400,
    safetyRatings: 4,
    features: ['ABS', 'Airbags', 'Sunroof / Moonroof', 'Push Start', 'Reverse Camera', 'Cruise Control', 'Climate Control'],
    reliabilityScore: 8,
    maintenanceCost: 'Medium',
    fuelEconomy: 13,
    resaleValue: 9,
    knownIssues: ['Low ground clearance']
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    variant: 'Grande 1.8 CVT',
    engineSpecs: { capacityCc: 1800, horsepower: 138 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 470,
    safetyRatings: 4,
    features: ['ABS', 'Airbags', 'Sunroof / Moonroof', 'Push Start', 'Reverse Camera', 'Cruise Control'],
    reliabilityScore: 9,
    maintenanceCost: 'Low',
    fuelEconomy: 12,
    resaleValue: 10,
    knownIssues: ['Slightly dated interior']
  },
  {
    make: 'Kia',
    model: 'Sportage',
    year: 2023,
    variant: 'AWD',
    engineSpecs: { capacityCc: 2000, horsepower: 155 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 800,
    safetyRatings: 5,
    features: ['ABS', 'Airbags', 'Sunroof / Moonroof', 'Push Start', 'Reverse Camera', 'Cruise Control', 'Apple CarPlay', 'Android Auto'],
    reliabilityScore: 8,
    maintenanceCost: 'Medium',
    fuelEconomy: 10,
    resaleValue: 8,
    knownIssues: ['Knocking issues on normal fuel']
  },
  {
    make: 'Suzuki',
    model: 'Alto',
    year: 2023,
    variant: 'VXL AGS',
    engineSpecs: { capacityCc: 660, horsepower: 39 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 4,
    bootSpace: 150,
    safetyRatings: 2,
    features: ['ABS', 'Airbags'],
    reliabilityScore: 7,
    maintenanceCost: 'Low',
    fuelEconomy: 18,
    resaleValue: 9,
    knownIssues: ['Poor build quality', 'Cabin noise']
  },
  {
    make: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    variant: 'AWD Ultimate',
    engineSpecs: { capacityCc: 2000, horsepower: 155 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 850,
    safetyRatings: 4,
    features: ['ABS', 'Airbags', 'Sunroof / Moonroof', 'Push Start', 'Reverse Camera', 'Cruise Control', 'Wireless Charging'],
    reliabilityScore: 8,
    maintenanceCost: 'Medium',
    fuelEconomy: 10,
    resaleValue: 8,
    knownIssues: ['Sluggish acceleration']
  },
  {
    make: 'Haval',
    model: 'H6',
    year: 2023,
    variant: 'HEV (Hybrid)',
    engineSpecs: { capacityCc: 1500, horsepower: 240 },
    fuelType: 'hybrid',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 600,
    safetyRatings: 5,
    features: ['ABS', 'Airbags', 'Sunroof / Moonroof', 'Push Start', '360 Camera', 'Lane Assist', 'Blind Spot Monitor', 'Apple CarPlay', 'Android Auto'],
    reliabilityScore: 7,
    maintenanceCost: 'High',
    fuelEconomy: 18,
    resaleValue: 7,
    knownIssues: ['Expensive spare parts']
  },
  {
    make: 'Toyota',
    model: 'Yaris',
    year: 2022,
    variant: 'Ativ X 1.5 CVT',
    engineSpecs: { capacityCc: 1500, horsepower: 106 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 476,
    safetyRatings: 4,
    features: ['ABS', 'Airbags', 'Push Start', 'Reverse Camera', 'Climate Control'],
    reliabilityScore: 9,
    maintenanceCost: 'Low',
    fuelEconomy: 14,
    resaleValue: 9,
    knownIssues: ['Unstable at high speeds']
  },
  {
    make: 'Honda',
    model: 'City',
    year: 2022,
    variant: '1.2L CVT',
    engineSpecs: { capacityCc: 1200, horsepower: 88 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 510,
    safetyRatings: 3,
    features: ['ABS', 'Reverse Camera'],
    reliabilityScore: 8,
    maintenanceCost: 'Low',
    fuelEconomy: 15,
    resaleValue: 8,
    knownIssues: ['Underpowered with AC']
  },
  {
    make: 'Changan',
    model: 'Alsvin',
    year: 2023,
    variant: '1.5L Lumiere',
    engineSpecs: { capacityCc: 1500, horsepower: 105 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 400,
    safetyRatings: 3,
    features: ['ABS', 'Airbags', 'Sunroof / Moonroof', 'Reverse Camera', 'Cruise Control'],
    reliabilityScore: 7,
    maintenanceCost: 'Medium',
    fuelEconomy: 13,
    resaleValue: 7,
    knownIssues: ['Transmission jerks']
  },
  {
    make: 'Peugeot',
    model: '2008',
    year: 2023,
    variant: 'Allure',
    engineSpecs: { capacityCc: 1200, horsepower: 130 },
    fuelType: 'petrol',
    transmission: 'automatic',
    seating: 5,
    bootSpace: 434,
    safetyRatings: 4,
    features: ['ABS', 'Airbags', 'Push Start', 'Reverse Camera', 'Cruise Control', 'Digital Cluster'],
    reliabilityScore: 7,
    maintenanceCost: 'High',
    fuelEconomy: 14,
    resaleValue: 6,
    knownIssues: ['Stiff suspension']
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pakauto')
.then(async () => {
  console.log('Connected to MongoDB');
  await Car.deleteMany({});
  console.log('Cleared existing cars');
  
  await Car.insertMany(mockCars);
  console.log(`Inserted ${mockCars.length} mock cars`);
  
  mongoose.connection.close();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
