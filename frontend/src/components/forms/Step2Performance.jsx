import React from 'react';
import { Fuel, Settings, Activity, Zap, DollarSign, Calendar } from 'lucide-react';

export default function Step2Performance({ data, updateData }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, field) => {
    const value = e.target.value;
    const currentArray = data[field] || [];
    if (e.target.checked) {
      updateData({ [field]: [...currentArray, value] });
    } else {
      updateData({ [field]: currentArray.filter(item => item !== value) });
    }
  };

  return (
    <div className="space-y-10">
      
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Preferred Fuel Types</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {['Petrol', 'Diesel', 'Hybrid', 'EV', 'CNG'].map(fuel => {
            const isSelected = data.fuelType.includes(fuel.toLowerCase());
            return (
              <label key={fuel} className="relative cursor-pointer group h-full">
                <input 
                  type="checkbox"
                  value={fuel.toLowerCase()}
                  checked={isSelected}
                  onChange={(e) => handleCheckboxChange(e, 'fuelType')}
                  className="hidden"
                />
                <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'border-brand bg-brand/5 shadow-sm scale-[1.02]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-slate-50'}`}>
                  <Fuel size={24} className={`mb-2 ${isSelected ? 'text-brand' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className={`text-sm font-bold text-center ${isSelected ? 'text-brand' : 'text-slate-600'}`}>{fuel}</span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Monthly Fuel Budget</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <span className="font-bold">Rs.</span>
            </div>
            <input 
              type="number" 
              name="fuelBudget"
              value={data.fuelBudget}
              onChange={handleChange}
              placeholder="e.g. 30000"
              className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm"
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Preferred Year Range</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <Calendar size={20} />
            </div>
            <input 
              type="text" 
              name="yearRange"
              value={data.yearRange}
              onChange={handleChange}
              placeholder="e.g. 2018 - 2024"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Transmission</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'manual', label: 'Manual' },
              { id: 'automatic', label: 'Auto' },
              { id: 'no_preference', label: 'Any' }
            ].map((opt) => {
              const isSelected = data.transmission === opt.id;
              return (
                <label key={opt.id} className="relative cursor-pointer group h-full">
                  <input 
                    type="radio" 
                    name="transmission" 
                    value={opt.id}
                    checked={isSelected}
                    onChange={handleChange}
                    className="hidden" 
                  />
                  <div className={`flex items-center justify-center h-full p-4 rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'border-brand bg-brand/5 shadow-[0_0_15px_rgba(37,99,235,0.1)] scale-[1.02]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-slate-50'}`}>
                    <span className={`text-sm font-bold text-center ${isSelected ? 'text-brand' : 'text-slate-600'}`}>{opt.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Drive Type</label>
          <div className="grid grid-cols-4 gap-2">
            {['2WD', '4WD', 'AWD', 'Any'].map((opt) => {
              const val = opt === 'Any' ? 'no_preference' : opt;
              const isSelected = data.driveType === val;
              return (
                <label key={opt} className="relative cursor-pointer group h-full">
                  <input 
                    type="radio" 
                    name="driveType" 
                    value={val}
                    checked={isSelected}
                    onChange={handleChange}
                    className="hidden" 
                  />
                  <div className={`flex items-center justify-center h-full p-3 rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'border-brand bg-brand/5 shadow-[0_0_10px_rgba(37,99,235,0.1)] scale-[1.05]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-slate-50'}`}>
                    <span className={`text-xs sm:text-sm font-bold text-center ${isSelected ? 'text-brand' : 'text-slate-600'}`}>{opt}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative group">
        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Engine Size Preference</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors z-10">
            <Activity size={20} />
          </div>
          <select 
            name="engineSize"
            value={data.engineSize}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 appearance-none shadow-sm cursor-pointer"
          >
            <option value="">Any Size</option>
            <option value="under_1000">Under 1000cc (Economy Focus)</option>
            <option value="1000_1500">1000cc - 1500cc (Balanced)</option>
            <option value="1500_2000">1500cc - 2000cc (Power)</option>
            <option value="over_2000">Over 2000cc (Performance / SUV)</option>
          </select>
        </div>
      </div>

    </div>
  );
}
