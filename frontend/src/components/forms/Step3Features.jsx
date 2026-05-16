import React from 'react';
import { ShieldCheck, Coffee, Smartphone, Package, Check } from 'lucide-react';

export default function Step3Features({ data, updateData }) {
  const handleCheckboxChange = (e, field) => {
    const value = e.target.value;
    const currentArray = data[field] || [];
    if (e.target.checked) {
      updateData({ [field]: [...currentArray, value] });
    } else {
      updateData({ [field]: currentArray.filter(item => item !== value) });
    }
  };

  const renderCheckboxes = (field, options, Icon) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map(opt => {
        const isSelected = data[field].includes(opt);
        return (
          <label key={opt} className="relative cursor-pointer group h-full">
            <input 
              type="checkbox"
              value={opt}
              checked={isSelected}
              onChange={(e) => handleCheckboxChange(e, field)}
              className="hidden"
            />
            <div className={`flex items-start p-4 rounded-xl border-2 transition-all duration-300 h-full ${isSelected ? 'border-brand bg-brand/5 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-slate-50'}`}>
              <div className={`mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                {isSelected && <Check size={14} className="text-white" />}
              </div>
              <span className={`ml-3 text-sm font-semibold leading-tight ${isSelected ? 'text-brand' : 'text-slate-600'}`}>{opt}</span>
            </div>
          </label>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-10">
      
      <div>
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <label className="block text-lg font-bold text-slate-900 tracking-tight">Minimum Safety Features</label>
        </div>
        {renderCheckboxes('safetyFeatures', ['ABS', 'Airbags', 'ISOFIX', 'Traction Control', 'Blind Spot Monitor', 'Lane Assist'], ShieldCheck)}
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <Coffee size={20} />
          </div>
          <label className="block text-lg font-bold text-slate-900 tracking-tight">Must-Have Comfort Features</label>
        </div>
        {renderCheckboxes('comfortFeatures', ['Sunroof / Moonroof', 'Heated Seats', 'Ventilated Seats', 'Reverse Camera', 'Cruise Control', 'Climate Control'], Coffee)}
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Smartphone size={20} />
          </div>
          <label className="block text-lg font-bold text-slate-900 tracking-tight">Tech & Infotainment</label>
        </div>
        {renderCheckboxes('techFeatures', ['Android Auto', 'Apple CarPlay', 'Digital Cluster', '360 Camera', 'Premium Sound System', 'Push Start'], Smartphone)}
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <Package size={20} />
          </div>
          <label className="block text-lg font-bold text-slate-900 tracking-tight">Boot Space Needed</label>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['small', 'medium', 'large'].map((opt) => {
            const isSelected = data.bootSpace === opt;
            return (
              <label key={opt} className="relative cursor-pointer group h-full">
                <input 
                  type="radio" 
                  name="bootSpace" 
                  value={opt}
                  checked={isSelected}
                  onChange={(e) => updateData({ bootSpace: e.target.value })}
                  className="hidden" 
                />
                <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-green-500 bg-green-50 shadow-sm scale-[1.02]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-slate-50'}`}>
                  <span className={`text-base font-bold text-center ${isSelected ? 'text-green-700' : 'text-slate-600'}`}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}
