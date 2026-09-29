import React from 'react';
import { Phone, Volume2, Globe, Sparkles, AlertCircle } from 'lucide-react';

export default function PublicTopUtilityBar({
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  selectedLanguage,
  setSelectedLanguage
}) {
  return (
    <div className="bg-[#142947] text-slate-100 border-b border-blue-900/50 text-[11px] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Indian Flag Colors & Government Identification */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-2.5 rounded-2xs overflow-hidden shadow-2xs border border-white/20">
              <span className="block h-1/3 bg-[#FF9933]"></span>
              <span className="block h-1/3 bg-white relative flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#000080]"></span>
              </span>
              <span className="block h-1/3 bg-[#138808]"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">भारत सरकार</span>
            <span className="text-blue-300/40">|</span>
            <span className="text-blue-100 font-medium">Government of India</span>
          </div>

          <span className="hidden md:inline text-blue-300/40">·</span>

          <span className="hidden md:inline text-blue-100">
            Ministry of Rural Development • Department of Land Resources (DoLR)
          </span>
        </div>

        {/* Right: Accessibility Controls, Emergency Helpline & Language */}
        <div className="flex items-center gap-4">
          
          {/* Toll-free Statutory Helpline */}
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-medium">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Toll-Free Helpline:</span>
            <a href="tel:1800116526" className="hover:underline font-mono font-bold text-amber-200">
              1800-11-NLAMS (6526)
            </a>
          </div>

          <span className="hidden sm:inline text-blue-300/40">·</span>

          {/* Text Size Accessibility Controls */}
          <div className="flex items-center gap-1 bg-[#1B365D] px-1.5 py-0.5 rounded border border-blue-800/40">
            <span className="text-blue-200 text-[10px] mr-1 hidden lg:inline">Text Size:</span>
            <button
              onClick={() => setTextSize('small')}
              title="Decrease Font Size"
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                textSize === 'small' ? 'bg-[#C5A059] text-slate-900' : 'text-blue-100 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setTextSize('normal')}
              title="Default Font Size"
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                textSize === 'normal' ? 'bg-[#C5A059] text-slate-900' : 'text-blue-100 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setTextSize('large')}
              title="Increase Font Size"
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                textSize === 'large' ? 'bg-[#C5A059] text-slate-900' : 'text-blue-100 hover:text-white'
              }`}
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle High Contrast Display"
            className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] cursor-pointer transition-colors ${
              highContrast
                ? 'bg-amber-400 text-slate-900 font-bold border-amber-300'
                : 'bg-[#1B365D] text-blue-100 border-blue-800/40 hover:text-white'
            }`}
          >
            <span>Contrast</span>
          </button>

          {/* Screen Reader Access Indicator */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded"
          >
            Skip to Main Content
          </a>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-[#1B365D] px-2 py-0.5 rounded border border-blue-800/40">
            <Globe className="w-3 h-3 text-blue-200" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Select Official Language"
              className="bg-transparent text-blue-100 text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-[#1B365D] text-white">English</option>
              <option value="hi" className="bg-[#1B365D] text-white">हिन्दी (Hindi)</option>
              <option value="gu" className="bg-[#1B365D] text-white">ગુજરાતી (Gujarati)</option>
              <option value="mr" className="bg-[#1B365D] text-white">मराठी (Marathi)</option>
              <option value="ta" className="bg-[#1B365D] text-white">தமிழ் (Tamil)</option>
              <option value="te" className="bg-[#1B365D] text-white">తెలుగు (Telugu)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Statutory Urgent Notice / Gazette Ticker */}
      <div className="bg-[#10233D] border-t border-blue-900/60 px-4 py-1 text-[11px] flex items-center justify-between text-blue-100">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-2 overflow-hidden">
          <div className="flex items-center gap-1 text-amber-400 shrink-0 font-semibold uppercase text-[10px]">
            <AlertCircle className="w-3 h-3" />
            <span>Statutory Notification Ticker:</span>
          </div>
          <div className="truncate text-slate-300">
            <span className="text-emerald-400 font-semibold">● SEC 11(1) GAZETTE:</span> Ahmedabad–Vadodara Rapid Transit Corridor 48.20 Ha published in Extra Ordinary Gazette No. 412 
            <span className="mx-2 text-slate-600">|</span> 
            <span className="text-amber-400 font-semibold">● SLA ALERT:</span> Section 19 Declaration statutory SLA deadline active for 14 National Highway projects (12-month limit under Sec 19(7))
            <span className="mx-2 text-slate-600">|</span> 
            <span className="text-cyan-400 font-semibold">● PFMS DBT:</span> ₹1,240 Cr direct compensation credited this week to 3,420 Khatedars.
          </div>
        </div>
      </div>
    </div>
  );
}
