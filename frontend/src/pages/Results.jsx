import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, XCircle, Gauge, PenTool, ExternalLink, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Results() {
  const location = useLocation();
  const recommendations = location.state?.recommendations;

  if (!recommendations || recommendations.length === 0) {
    return <Navigate to="/find-car" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Link to="/find-car" className="inline-flex items-center text-slate-500 hover:text-brand transition-colors mb-4 font-semibold">
              <ChevronLeft size={18} className="mr-1" /> Back to Questionnaire
            </Link>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">AI Matches</h1>
            <p className="text-slate-500 mt-2 text-lg">Here are your top 3 perfect matches, specifically tailored to your preferences.</p>
          </div>
        </div>

        <div className="space-y-12">
          {recommendations.map((car, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`bg-white rounded-[2rem] shadow-xl border overflow-hidden relative ${index === 0 ? 'border-brand/30 shadow-brand/10' : 'border-gray-100'}`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-brand to-brand-light text-white px-6 py-2 rounded-bl-3xl font-bold flex items-center shadow-md">
                  <Trophy size={18} className="mr-2" /> #1 Best Match
                </div>
              )}
              
              <div className="p-8 sm:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8 mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                      {car.make} <span className={index === 0 ? 'text-brand' : 'text-slate-700'}>{car.model}</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium">{car.variant} <span className="mx-2">•</span> {car.priceRange}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * car.matchScore) / 100} className={index === 0 ? "text-brand" : "text-blue-500"} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className={`text-2xl font-black ${index === 0 ? 'text-brand' : 'text-slate-800'}`}>{car.matchScore}%</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-wider">Match</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <CheckCircle2 className="text-green-500 mr-2" size={20} /> Why this fits you:
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-2xl border border-gray-100">
                    {car.reason}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center text-green-700">
                      <CheckCircle2 className="text-green-500 mr-2" size={18} /> Pros
                    </h4>
                    <ul className="space-y-3">
                      {(Array.isArray(car.pros) ? car.pros : [car.pros]).filter(Boolean).map((pro, i) => (
                        <li key={i} className="flex items-start text-slate-600 bg-green-50/50 p-3 rounded-xl">
                          <CheckCircle2 size={16} className="text-green-500 mr-3 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center text-red-700">
                      <XCircle className="text-red-500 mr-2" size={18} /> Cons
                    </h4>
                    <ul className="space-y-3">
                      {(Array.isArray(car.cons) ? car.cons : [car.cons]).filter(Boolean).map((con, i) => (
                        <li key={i} className="flex items-start text-slate-600 bg-red-50/50 p-3 rounded-xl">
                          <XCircle size={16} className="text-red-500 mr-3 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
                      <Gauge size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fuel Economy</div>
                      <div className="font-black text-slate-800 text-lg">{car.fuelEconomy} km/l</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600 mr-4">
                      <PenTool size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Maintenance</div>
                      <div className="font-black text-slate-800 text-lg">{car.maintenanceCost}</div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                    <a 
                      href={`https://www.pakwheels.com/used-cars/search/-/mk_${car.make.toLowerCase()}/md_${car.model.toLowerCase().replace(/ /g, '-')}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center py-4 sm:py-0"
                    >
                      Search Listings <ExternalLink size={18} className="ml-2 text-slate-400" />
                    </a>
                  </div>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
