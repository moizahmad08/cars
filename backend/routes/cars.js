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
  { make: 'Honda', model: 'Civic', year: 2023, variant: 'Oriel 1.5 CVT', engineSpecs: { capacityCc: 1500, horsepower: 170 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 400, safetyRatings: 4, features: ['ABS', 'Airbags', 'Sunroof', 'Push Start'], reliabilityScore: 8, maintenanceCost: 'Medium', fuelEconomy: 13, resaleValue: 9, knownIssues: ['Low ground clearance'] },
  { make: 'Toyota', model: 'Corolla', year: 2023, variant: 'Grande 1.8 CVT', engineSpecs: { capacityCc: 1800, horsepower: 138 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 470, safetyRatings: 4, features: ['ABS', 'Airbags', 'Sunroof'], reliabilityScore: 9, maintenanceCost: 'Low', fuelEconomy: 12, resaleValue: 10, knownIssues: ['Dated interior'] },
  { make: 'Kia', model: 'Sportage', year: 2023, variant: 'AWD', engineSpecs: { capacityCc: 2000, horsepower: 155 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 800, safetyRatings: 5, features: ['ABS', 'Airbags', 'Sunroof', 'AWD'], reliabilityScore: 8, maintenanceCost: 'Medium', fuelEconomy: 10, resaleValue: 8, knownIssues: ['Fuel knocking'] },
  { make: 'Suzuki', model: 'Alto', year: 2023, variant: 'VXL AGS', engineSpecs: { capacityCc: 660, horsepower: 39 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 4, bootSpace: 150, safetyRatings: 2, features: ['ABS', 'Airbags'], reliabilityScore: 7, maintenanceCost: 'Low', fuelEconomy: 18, resaleValue: 9, knownIssues: ['Build quality'] },
  { make: 'Toyota', model: 'Yaris', year: 2023, variant: 'ATIV CVT', engineSpecs: { capacityCc: 1300, horsepower: 97 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 330, safetyRatings: 3, features: ['ABS', 'Airbags', 'Push Start'], reliabilityScore: 8, maintenanceCost: 'Low', fuelEconomy: 14, resaleValue: 8, knownIssues: ['Underpowered on highways'] },
  { make: 'Suzuki', model: 'Swift', year: 2023, variant: 'GL CVT', engineSpecs: { capacityCc: 1200, horsepower: 82 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 210, safetyRatings: 3, features: ['ABS', 'Airbags', 'Push Start'], reliabilityScore: 7, maintenanceCost: 'Low', fuelEconomy: 15, resaleValue: 7, knownIssues: ['Small boot space'] },
  { make: 'Hyundai', model: 'Tucson', year: 2023, variant: 'GLS Sport 2.0 FWD AT', engineSpecs: { capacityCc: 2000, horsepower: 156 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 620, safetyRatings: 5, features: ['ABS', 'Airbags', 'Sunroof', 'Ventilated Seats'], reliabilityScore: 8, maintenanceCost: 'Medium', fuelEconomy: 10, resaleValue: 7, knownIssues: ['Parts availability'] },
  { make: 'Changan', model: 'Alsvin', year: 2023, variant: 'DCT Lumiere', engineSpecs: { capacityCc: 1500, horsepower: 116 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 440, safetyRatings: 3, features: ['ABS', 'Airbags', 'Sunroof', 'Leather Seats'], reliabilityScore: 6, maintenanceCost: 'Medium', fuelEconomy: 12, resaleValue: 6, knownIssues: ['Lower resale value', 'DCT issues at low speed'] },
  { make: 'MG', model: 'HS', year: 2023, variant: '1.5T Luxury', engineSpecs: { capacityCc: 1500, horsepower: 162 }, fuelType: 'Petrol', transmission: 'Automatic', seating: 5, bootSpace: 1100, safetyRatings: 5, features: ['ABS', 'Airbags', 'Sunroof', 'ADAS'], reliabilityScore: 7, maintenanceCost: 'Medium', fuelEconomy: 11, resaleValue: 7, knownIssues: ['Long wait times for service'] },
  { make: 'Haval', model: 'H6', year: 2023, variant: 'HEV', engineSpecs: { capacityCc: 1500, horsepower: 243 }, fuelType: 'Hybrid', transmission: 'Automatic', seating: 5, bootSpace: 620, safetyRatings: 5, features: ['ABS', 'Airbags', 'Sunroof', 'Wireless Charging'], reliabilityScore: 8, maintenanceCost: 'Medium', fuelEconomy: 16, resaleValue: 8, knownIssues: ['Higher initial cost'] },
];

// Helper to ensure a value is an array
function ensureArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
  return [];
}

// Strip <think>...</think> reasoning blocks from model output
function stripThinkingTags(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

// Extract the first valid JSON object from a string
function extractJSON(text) {
  // Strip markdown code fences
  let cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  // Strip reasoning model think tags
  cleaned = stripThinkingTags(cleaned);
  // Find first { and last }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found in AI response');
  return JSON.parse(cleaned.substring(start, end + 1));
}

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
You MUST format your response as a valid JSON object matching the exact structure below.
Do NOT include any markdown formatting, code fences, or any text before or after the JSON.

{
  "recommendations": [
    {
      "make": "Honda",
      "model": "Civic",
      "variant": "Oriel 1.5 CVT",
      "matchScore": 95,
      "priceRange": "65-75 Lacs",
      "pros": ["Great styling", "Good resale value", "Fuel efficient"],
      "cons": ["Low ground clearance", "Expensive parts"],
      "maintenanceCost": "Medium",
      "fuelEconomy": 13,
      "reason": "Detailed explanation of why this car perfectly matches the user's specific needs, budget, lifestyle, and city..."
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: "grok-4.20-0309-reasoning",
      messages: [
        { role: "system", content: "You are a helpful AI assistant. You ONLY output valid JSON. Never output any text, markdown, or explanations outside the JSON object." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
    });

    const rawContent = completion.choices[0].message.content || '';
    const aiData = extractJSON(rawContent);

    // Sanitize the response to ensure pros/cons are always arrays
    if (aiData.recommendations && Array.isArray(aiData.recommendations)) {
      aiData.recommendations = aiData.recommendations.map(car => ({
        ...car,
        pros: ensureArray(car.pros),
        cons: ensureArray(car.cons),
      }));
    }

    res.json(aiData);

  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(500).json({ error: 'Failed to generate recommendations', details: err.message });
  }
});

module.exports = router;
