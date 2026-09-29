import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Users, 
  CheckCircle, 
  Clock, 
  IndianRupee, 
  Layers, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

export default function NationalMetricsSection() {
  const [selectedState, setSelectedState] = useState('ALL');

  const stateData = {
    ALL: {
      projects: '428',
      hectares: '1,84,250',
      compensation: '₹48,920 Cr',
      families: '96,480',
      slaCompliance: '98.4%',
      avgDaysSaved: '142 Days'
    },
    GUJ: {
      projects: '68',
      hectares: '32,450',
      compensation: '₹12,480 Cr',
      families: '18,920',
      slaCompliance: '99.1%',
      avgDaysSaved: '168 Days'
    },
    MAH: {
      projects: '84',
      hectares: '41,200',
      compensation: '₹14,910 Cr',
      families: '24,150',
      slaCompliance: '97.8%',
      avgDaysSaved: '135 Days'
    },
    UP: {
      projects: '92',
      hectares: '46,800',
      compensation: '₹11,850 Cr',
      families: '28,400',
      slaCompliance: '98.0%',
      avgDaysSaved: '140 Days'
    },
    HAR: {
      projects: '42',
      hectares: '18,600',
      compensation: '₹5,120 Cr',
      families: '8,210',
      slaCompliance: '98.9%',
      avgDaysSaved: '150 Days'
    }
  };

  const current = stateData[selectedState] || stateData.ALL;

  return (
    <section className="bg-[#FAF8F5] py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#C5A059]" />
              <span>National Land Acquisition Monitor • Real-Time Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B365D] font-serif mt-1">
              National Transparency &amp; Progress Metrics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Public statutory statistics compiled from District Collectorates (CALA), Requisitioning Bodies, and PFMS DBT Portals.
            </p>
          </div>

          {/* State Filter Selector */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-xs self-start md:self-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-medium">State Scope:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent font-bold text-[#1B365D] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All India (National)</option>
              <option value="GUJ">Gujarat</option>
              <option value="MAH">Maharashtra</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="HAR">Haryana</option>
            </select>
          </div>
        </div>

        {/* 6 Grid Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Metric 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A059] transition-all">
            <div className="text-slate-500 text-[11px] font-medium flex items-center justify-between">
              <span>National Projects</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1B365D] font-serif mt-2">
              {current.projects}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">
              Linear &amp; Industrial Corridors
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A059] transition-all">
            <div className="text-slate-500 text-[11px] font-medium flex items-center justify-between">
              <span>Cadastral Area</span>
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1B365D] font-serif mt-2">
              {current.hectares} <span className="text-xs font-sans font-normal text-slate-500">Ha</span>
            </div>
            <div className="text-[10px] text-slate-600 mt-1">
              100% Georeferenced on GIS
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A059] transition-all">
            <div className="text-slate-500 text-[11px] font-medium flex items-center justify-between">
              <span>Direct Benefit Transfer</span>
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-800 font-serif mt-2">
              {current.compensation}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">
              Credited via PFMS DBT
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A059] transition-all">
            <div className="text-slate-500 text-[11px] font-medium flex items-center justify-between">
              <span>R&amp;R Beneficiaries</span>
              <Users className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1B365D] font-serif mt-2">
              {current.families}
            </div>
            <div className="text-[10px] text-blue-700 font-semibold mt-1">
              2nd Schedule Passbooks
            </div>
          </div>

          {/* Metric 5 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A059] transition-all">
            <div className="text-slate-500 text-[11px] font-medium flex items-center justify-between">
              <span>Statutory SLA Compliance</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1B365D] font-serif mt-2">
              {current.slaCompliance}
            </div>
            <div className="text-[10px] text-slate-600 mt-1">
              Sec 4 to Sec 19 Timers
            </div>
          </div>

          {/* Metric 6 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A059] transition-all">
            <div className="text-slate-500 text-[11px] font-medium flex items-center justify-between">
              <span>Efficiency Gain</span>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1B365D] font-serif mt-2">
              {current.avgDaysSaved}
            </div>
            <div className="text-[10px] text-amber-800 font-semibold mt-1">
              Faster than Manual SLA
            </div>
          </div>

        </div>

        {/* Real-time Transparency Guarantees Strip */}
        <div className="mt-6 bg-[#1B365D] text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-amber-300 uppercase tracking-wide">
              Zero Leakage Architecture:
            </span>
            <span className="text-slate-200 hidden sm:inline">
              Every Khatedar payout is validated against Cadastral Survey Land Title + Aadhaar e-KYC + PFMS Core Banking Integration.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300 font-mono">
            <span>CERT-In Audited</span>
            <span>•</span>
            <span>CCA 2048-bit DSC</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
