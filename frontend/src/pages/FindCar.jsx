import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Step1Basics from '../components/forms/Step1Basics';
import Step2Performance from '../components/forms/Step2Performance';
import Step3Features from '../components/forms/Step3Features';
import Step4Ownership from '../components/forms/Step4Ownership';
import Step5Preferences from '../components/forms/Step5Preferences';

const initialFormData = {
  // Step 1
  minBudget: '', maxBudget: '', city: '', purpose: '', passengers: 4, newVsUsed: 'no_preference',
  // Step 2
  fuelType: [], fuelBudget: '', transmission: 'automatic', driveType: 'no_preference', engineSize: '', yearRange: '',
  // Step 3
  safetyFeatures: [], comfortFeatures: [], techFeatures: [], bootSpace: 'medium',
  // Step 4
  parking: 'garage', ownershipDuration: '3_to_5_years', resaleValue: 5, maintenanceBudget: '', insurancePriority: 'medium',
  // Step 5
  preferredBrands: '', dealbreakerBrands: '', color: '', physicalNeeds: '', previousCar: '', firstCar: false
};

const steps = [
  { id: 1, title: 'Basics & Budget' },
  { id: 2, title: 'Performance' },
  { id: 3, title: 'Features' },
  { id: 4, title: 'Ownership' },
  { id: 5, title: 'Preferences' }
];

export default function FindCar() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const updateData = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/cars/recommend`, formData);
      setIsSubmitting(false);
      navigate('/results', { state: { recommendations: response.data.recommendations } });
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setIsSubmitting(false);
      alert('Failed to get recommendations. Ensure the backend server is running and the Grok API Key is valid.');
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1: return <Step1Basics data={formData} updateData={updateData} />;
      case 2: return <Step2Performance data={formData} updateData={updateData} />;
      case 3: return <Step3Features data={formData} updateData={updateData} />;
      case 4: return <Step4Ownership data={formData} updateData={updateData} />;
      case 5: return <Step5Preferences data={formData} updateData={updateData} />;
      default: return null;
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 bg-brand rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-8"
        >
          <Search size={40} className="text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Claude is analyzing your profile...</h2>
        <p className="text-slate-500 text-lg">Scanning 10,000+ vehicles to find your perfect match.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-brand/10 to-transparent blur-3xl -z-10 rounded-full"></div>
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-6 animate-fade-in-up">
            <Search size={16} className="text-brand" />
            <span className="text-sm font-semibold text-slate-700">AI Matchmaker</span>
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600">Perfect Match</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Answer a few questions and our AI will search 10,000+ vehicles to find the absolute best car for your lifestyle.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden relative min-h-[500px]">
          
          {/* Progress Bar Header inside the Card */}
          <div className="bg-slate-900/5 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
              <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-brand to-purple-500 rounded-full -z-10 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>
              
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 shadow-sm ${
                    step.id < currentStep ? 'bg-gradient-to-br from-brand to-brand-dark text-white shadow-brand/30' : 
                    step.id === currentStep ? 'bg-white border-2 border-brand text-brand ring-4 ring-brand/10 scale-110' : 
                    'bg-white border border-gray-200 text-gray-400'
                  }`}>
                    {step.id < currentStep ? <Check size={20} /> : step.id}
                  </div>
                  <span className={`mt-3 text-xs font-semibold uppercase tracking-wider hidden sm:block transition-colors duration-300 ${step.id <= currentStep ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-8 sm:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">{steps[currentStep-1].title}</h2>
                <p className="text-slate-500 mt-2">Help us understand exactly what you are looking for.</p>
              </div>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between items-center max-w-4xl mx-auto px-4 sm:px-0">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-4 rounded-2xl font-bold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-slate-700 shadow-md border border-gray-100 hover:shadow-lg hover:scale-105'}`}
          >
            <ChevronLeft size={20} className="mr-2" /> Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/30 transform hover:scale-105"
            >
              Continue <ChevronRight size={20} className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-10 py-4 bg-gradient-to-r from-brand to-purple-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] transform hover:-translate-y-1 hover:scale-105"
            >
              Find My Perfect Car <Search size={20} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
