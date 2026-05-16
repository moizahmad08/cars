import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PenTool, TrendingUp, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-900 py-24 sm:py-32 flex items-center justify-center min-h-[85vh]">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-brand-light/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-brand/30 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 text-brand-light animate-fade-in-up">
            <Sparkles size={16} />
            <span className="text-sm font-medium tracking-wide">Powered by Claude AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Find Your Next Car <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-blue-300">Intelligently.</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop searching blindly. Let our AI match you with the perfect car from over 10,000+ vehicles based on your lifestyle, budget, and needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/find-car" className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-light text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
              <Search size={20} />
              AI Car Matchmaker
            </Link>
            <Link to="/sell-car" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <PenTool size={20} />
              Smart Listing Creator
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">10K+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Cars Indexed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">Live</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Market Pricing</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">100%</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">AI Powered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Scraping Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How PakAuto Works</h2>
            <p className="mt-4 text-lg text-slate-600">Two powerful modules to transform how you buy and sell cars in Pakistan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Module 1 */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-[100px] -z-0"></div>
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <Search size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">AI Car Finder</h3>
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
                Answer a deep questionnaire about your lifestyle, family size, budget, and preferences. Our AI analyzes 10,000+ vehicles to find your top 3 perfect matches, explaining exactly why they fit.
              </p>
              <ul className="space-y-3 mb-8 text-slate-600 relative z-10">
                <li className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={18} /> Deep lifestyle analysis</li>
                <li className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={18} /> Cross-referenced database</li>
                <li className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={18} /> Ranked compatibility scores</li>
              </ul>
              <Link to="/find-car" className="inline-flex items-center text-brand font-semibold group-hover:text-brand-dark transition-colors relative z-10">
                Start the Questionnaire <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-[100px] -z-0"></div>
              <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Smart Listing Form</h3>
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
                List your car through a conversational AI assistant. It ensures you miss no details, benchmarks your price against live PakWheels & OLX data, and writes a compelling description for you.
              </p>
              <ul className="space-y-3 mb-8 text-slate-600 relative z-10">
                <li className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={18} /> Conversational input</li>
                <li className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={18} /> Live price benchmarking</li>
                <li className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={18} /> Auto-generated descriptions</li>
              </ul>
              <Link to="/sell-car" className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors relative z-10">
                Create a Listing <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
