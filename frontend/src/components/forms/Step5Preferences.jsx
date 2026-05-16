import React from 'react';
import { Heart, XCircle, Palette, Accessibility, History, UserPlus, Check } from 'lucide-react';

export default function Step5Preferences({ data, updateData }) {
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    updateData({ [e.target.name]: value });
  };

  return (
    <div className="space-y-8">
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 rounded-2xl p-5 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-0"></div>
        <div className="relative z-10 flex items-start">
          <div className="shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 text-white mr-4 mt-1">
            <span className="font-bold text-lg">!</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 tracking-tight">Almost done!</h3>
            <p className="text-sm text-blue-800 mt-1 leading-relaxed">
              These detailed preferences help our AI fine-tune your matches. All fields here are <strong className="font-extrabold text-blue-900">optional</strong>. Feel free to skip anything that doesn't matter to you.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center">
            <Heart size={16} className="mr-2 text-pink-500" /> Preferred Brands
          </label>
          <input 
            type="text" 
            name="preferredBrands"
            value={data.preferredBrands}
            onChange={handleChange}
            placeholder="e.g. Toyota, Honda, Kia"
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm"
          />
        </div>

        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center text-red-600">
            <XCircle size={16} className="mr-2 text-red-500" /> Dealbreaker Brands
          </label>
          <input 
            type="text" 
            name="dealbreakerBrands"
            value={data.dealbreakerBrands}
            onChange={handleChange}
            placeholder="e.g. Suzuki, Changan"
            className="w-full px-5 py-4 rounded-2xl border-2 border-red-100 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all bg-red-50/50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm placeholder-red-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center">
            <Palette size={16} className="mr-2 text-indigo-500" /> Color Preferences
          </label>
          <input 
            type="text" 
            name="color"
            value={data.color}
            onChange={handleChange}
            placeholder="e.g. White, Black, Silver"
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm"
          />
        </div>

        <div className="relative group">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center">
            <Accessibility size={16} className="mr-2 text-green-500" /> Physical Needs
          </label>
          <input 
            type="text" 
            name="physicalNeeds"
            value={data.physicalNeeds}
            onChange={handleChange}
            placeholder="e.g. Easy entry/exit, high seating"
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm"
          />
        </div>
      </div>

      <div className="relative group">
        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center">
          <History size={16} className="mr-2 text-orange-500" /> Previous Car Experience
        </label>
        <textarea 
          name="previousCar"
          value={data.previousCar}
          onChange={handleChange}
          rows="3"
          placeholder="e.g. I had a Civic but it was too low for speed breakers. Loved the power though."
          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium text-slate-900 shadow-sm resize-none"
        ></textarea>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <label className="flex items-center cursor-pointer group bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl border border-gray-100 transition-colors w-max">
          <input 
            type="checkbox" 
            name="firstCar"
            checked={data.firstCar}
            onChange={handleChange}
            className="hidden"
          />
          <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${data.firstCar ? 'bg-brand border-brand text-white' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
            {data.firstCar && <Check size={16} />}
          </div>
          <UserPlus size={20} className={`ml-4 ${data.firstCar ? 'text-brand' : 'text-slate-400'}`} />
          <span className={`ml-2 font-bold tracking-tight ${data.firstCar ? 'text-brand' : 'text-slate-700'}`}>I am a first-time car buyer</span>
        </label>
      </div>

    </div>
  );
}
