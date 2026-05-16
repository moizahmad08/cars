const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// @route   GET /api/cars
// @desc    Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().limit(20);
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const mockCarsFallback = [
  { make: 'Honda', model: 'Civic', year: 2023, variant: 'Oriel 1.5 CVT', engineSpecs: { capacityCc: 1500, horsepower: 170 }, fuelType: 'petrol', transmission: 'automatic', seating: 5, bootSpace: 400, safetyRatings: 4, features: ['ABS', 'Airbags', 'Sunroof', 'Push Start'], reliabilityScore: 8, maintenanceCost: 'Medium', fuelEconomy: 13, resaleValue: 9, knownIssues: ['Low ground clearance'] },
  { make: 'Toyota', model: 'Corolla', year: 2023, variant: 'Grande 1.8 CVT', engineSpecs: { capacityCc: 1800, horsepower: 138 }, fuelType: 'petrol', transmission: 'automatic', seating: 5, bootSpace: 470, safetyRatings: 4, features: ['ABS', 'Airbags', 'Sunroof'], reliabilityScore: 9, maintenanceCost: 'Low', fuelEconomy: 12, resaleValue: 10, knownIssues: ['Dated interior'] },
  { make: 'Kia', model: 'Sportage', year: 2023, variant: 'AWD', engineSpecs: { capacityCc: 2000, horsepower: 155 }, fuelType: 'petrol', transmission: 'automatic', seating: 5, bootSpace: 800, safetyRatings: 5, features: ['ABS', 'Airbags', 'Sunroof', 'AWD'], reliabilityScore: 8, maintenanceCost: 'Medium', fuelEconomy: 10, resaleValue: 8, knownIssues: ['Fuel knocking'] },
  { make: 'Suzuki', model: 'Alto', year: 2023, variant: 'VXL AGS', engineSpecs: { capacityCc: 660, horsepower: 39 }, fuelType: 'petrol', transmission: 'automatic', seating: 4, bootSpace: 150, safetyRatings: 2, features: ['ABS', 'Airbags'], reliabilityScore: 7, maintenanceCost: 'Low', fuelEconomy: 18, resaleValue: 9, knownIssues: ['Build quality'] }
];

// @route   POST /api/cars/recommend
// @desc    Get AI recommendations based on user preferences
router.post('/recommend', async (req, res) => {
  try {
    const userPrefs = req.body;
    
    let cars;
    try {
      cars = await Car.find();
      if (!cars || cars.length === 0) {
        cars = mockCarsFallback;
      }
    } catch (dbErr) {
      console.log("DB not connected, using fallback cars.");
      cars = mockCarsFallback;
    }
    
    const prompt = `
You are an expert Pakistani automotive AI matchmaker.
The user has filled out a detailed questionnaire about their car preferences.
Here are the user's preferences:
${JSON.stringify(userPrefs, null, 2)}

Here is the database of available cars:
${JSON.stringify(cars, null, 2)}

Task:
Analyze the user's preferences against the available cars.
Return exactly the TOP 3 recommended cars from the database that best match the user's criteria.
You MUST format your response as a valid JSON object matching the exact structure below, without any markdown formatting, just the raw JSON.

{
  "recommendations": [
    {
      "make": "Honda",
      "model": "Civic",
      "variant": "Oriel 1.5 CVT",
      "matchScore": 95,
      "priceRange": "65-75 Lacs",
      "pros": ["Great styling", "Good resale"],
      "cons": ["Low ground clearance"],
      "maintenanceCost": "Medium",
      "fuelEconomy": 13,
      "reason": "Detailed explanation of why this matches their specific needs..."
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: "grok-4.20-0309-reasoning", // Updated to valid reasoning model
      messages: [
        { role: "system", content: "You are a helpful AI that strictly outputs valid JSON without markdown wrapping." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
    });

    let aiResponseStr = completion.choices[0].message.content.trim();
    
    // Clean up potential markdown wrapping
    if (aiResponseStr.startsWith('```json')) {
      aiResponseStr = aiResponseStr.substring(7);
      if (aiResponseStr.endsWith('```')) {
        aiResponseStr = aiResponseStr.substring(0, aiResponseStr.length - 3);
      }
    }
    
    const aiData = JSON.parse(aiResponseStr);
    res.json(aiData);

  } catch (err) {
    console.error("AI Error:", err.message);
    // If Grok model name is invalid, we might want to log it
    res.status(500).json({ error: 'Failed to generate recommendations', details: err.message });
  }
});

module.exports = router;
