import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FindCar from './pages/FindCar';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light">
                  PakAuto
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/find-car" className="text-gray-600 hover:text-brand font-medium transition-colors">AI Car Finder</Link>
                <Link to="/sell-car" className="text-gray-600 hover:text-brand font-medium transition-colors">Sell Your Car</Link>
                <Link to="/listings" className="text-gray-600 hover:text-brand font-medium transition-colors">Browse Listings</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-car" element={<FindCar />} />
            <Route path="/results" element={<Results />} />
            <Route path="/sell-car" element={<div className="min-h-[60vh] flex items-center justify-center text-3xl font-light text-gray-400">Sell Your Car with AI (Coming Soon)</div>} />
            <Route path="/listings" element={<div className="min-h-[60vh] flex items-center justify-center text-3xl font-light text-gray-400">Browse Listings (Coming Soon)</div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">PakAuto</span>
              <p className="mt-4 text-sm leading-relaxed">
                The most intelligent car portal in Pakistan. Find your dream car with AI, or sell it effortlessly.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/find-car" className="hover:text-white transition">AI Car Matchmaker</Link></li>
                <li><Link to="/sell-car" className="hover:text-white transition">Smart Listing Creator</Link></li>
                <li><Link to="/listings" className="hover:text-white transition">Live Market Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} PakAuto. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
