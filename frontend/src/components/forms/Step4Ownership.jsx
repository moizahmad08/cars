import React from 'react';
import { Home, Clock, TrendingUp, Wrench, Shield } from 'lucide-react';

export default function Step4Ownership({ data, updateData }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Parking Situation</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors z-10">
              <Home size={20} />
            </div>
            <select 
              name="parking"
              value={data.parking}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 appearance-none shadow-sm cursor-pointer"
            >
              <option value="garage">Private Garage (Safe)</option>
              <option value="driveway">Driveway / Porch</option>
              <option value="street">Tight City Street</option>
              <option value="apartment">Apartment Complex Parking</option>
            </select>
          </div>
        </div>

        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Planned Ownership Duration</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors z-10">
              <Clock size={20} />
            </div>
            <select 
              name="ownershipDuration"
              value={data.ownershipDuration}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 appearance-none shadow-sm cursor-pointer"
            >
              <option value="under_1_year">Less than 1 Year</option>
              <option value="1_to_3_years">1 - 3 Years</option>
              <option value="3_to_5_years">3 - 5 Years</option>
              <option value="over_5_years">5+ Years (Long Term)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-gray-100 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-brand/5">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-lg font-bold text-slate-900 tracking-tight flex items-center">
              <TrendingUp size={24} className="mr-3 text-brand" />
              Resale Value Importance
            </label>
            <div className="text-3xl font-black text-brand drop-shadow-sm">{data.resaleValue} <span className="text-lg text-slate-400">/ 10</span></div>
          </div>
          <input 
            type="range" 
            name="resaleValue"
            value={data.resaleValue}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full h-3 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer accent-brand shadow-inner"
          />
          <div className="flex justify-between text-sm font-bold text-slate-500 mt-3 uppercase tracking-wider">
            <span>Not Important</span>
            <span>Crucial</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center">
            <Wrench size={18} className="mr-2 text-slate-400" /> Maintenance Budget / mo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <span className="font-bold">Rs.</span>
            </div>
            <input 
              type="number" 
              name="maintenanceBudget"
              value={data.maintenanceBudget}
              onChange={handleChange}
              placeholder="e.g. 10000"
              className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center">
            <Shield size={18} className="mr-2 text-slate-400" /> Insurance Priority
          </label>
          <div className="grid grid-cols-3 gap-2 h-[60px]">
            {['low', 'medium', 'high'].map((opt) => {
              const isSelected = data.insurancePriority === opt;
              return (
                <label key={opt} className="relative cursor-pointer group h-full">
                  <input 
                    type="radio" 
                    name="insurancePriority" 
                    value={opt}
                    checked={isSelected}
                    onChange={handleChange}
                    className="hidden" 
                  />
                  <div className={`flex items-center justify-center h-full rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'border-brand bg-brand/5 shadow-sm scale-[1.02]' : 'border-gray-100 bg-slate-50 hover:border-gray-300 hover:bg-white'}`}>
                    <span className={`text-sm font-bold ${isSelected ? 'text-brand' : 'text-slate-600'}`}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
