import React from 'react';
import { MapPin, Briefcase, Users, DollarSign, Sparkles, Car, Search } from 'lucide-react';

export default function Step1Basics({ data, updateData }) {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">City</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <MapPin size={20} />
            </div>
            <input 
              type="text" 
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="e.g. Lahore, Karachi"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 placeholder:font-normal shadow-sm hover:border-gray-200"
            />
          </div>
        </div>
        
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Primary Purpose</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors z-10">
              <Briefcase size={20} />
            </div>
            <select 
              name="purpose"
              value={data.purpose}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 appearance-none shadow-sm hover:border-gray-200 cursor-pointer"
            >
              <option value="">Select Purpose</option>
              <option value="daily_commute">Daily Commute</option>
              <option value="family">Family Usage</option>
              <option value="off_road">Off-Road / Adventure</option>
              <option value="business">Business / Executive</option>
              <option value="long_trips">Highway / Long Trips</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Min Budget (PKR)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <span className="font-bold">Rs.</span>
            </div>
            <input 
              type="number" 
              name="minBudget"
              value={data.minBudget}
              onChange={handleChange}
              placeholder="e.g. 2000000"
              className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm hover:border-gray-200"
            />
          </div>
        </div>
        
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Max Budget (PKR)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <span className="font-bold">Rs.</span>
            </div>
            <input 
              type="number" 
              name="maxBudget"
              value={data.maxBudget}
              onChange={handleChange}
              placeholder="e.g. 5000000"
              className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm hover:border-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Daily Passengers</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
              <Users size={20} />
            </div>
            <input 
              type="number" 
              name="passengers"
              value={data.passengers}
              onChange={handleChange}
              min="1"
              max="15"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-bold text-slate-900 shadow-sm hover:border-gray-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Condition Preference</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'new', label: 'Brand New', icon: Sparkles },
              { id: 'used', label: 'Used', icon: Car },
              { id: 'no_preference', label: 'Any', icon: Search }
            ].map((opt) => {
              const Icon = opt.icon;
              const isSelected = data.newVsUsed === opt.id;
              return (
                <label key={opt.id} className="relative cursor-pointer group h-full">
                  <input 
                    type="radio" 
                    name="newVsUsed" 
                    value={opt.id}
                    checked={isSelected}
                    onChange={handleChange}
                    className="hidden" 
                  />
                  <div className={`flex flex-col items-center justify-center h-full p-4 rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'border-brand bg-brand/5 shadow-[0_0_15px_rgba(37,99,235,0.1)] scale-[1.02]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-slate-50'}`}>
                    <Icon size={24} className={`mb-2 ${isSelected ? 'text-brand' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span className={`text-sm font-bold text-center ${isSelected ? 'text-brand' : 'text-slate-600'}`}>{opt.label}</span>
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
