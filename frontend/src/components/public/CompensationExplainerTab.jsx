import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  IndianRupee, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Download, 
  Scale, 
  Layers, 
  Info,
  Calendar
} from 'lucide-react';

export default function CompensationExplainerTab() {
  // Input parameters for calculation
  const [landAreaHa, setLandAreaHa] = useState(0.5); // Hectares
  const [landCategory, setLandCategory] = useState('rural'); // 'rural' | 'urban'
  const [distanceKm, setDistanceKm] = useState(15); // Distance from urban boundary in km
  const [circleRatePerHa, setCircleRatePerHa] = useState(3000000); // ₹30 Lakh / Ha
  const [avgSaleDeedPerHa, setAvgSaleDeedPerHa] = useState(3500000); // ₹35 Lakh / Ha
  const [assetValuation, setAssetValuation] = useState(350000); // ₹3.5 Lakh (trees, well, structure)
  const [siaToAwardMonths, setSiaToAwardMonths] = useState(14); // Months elapsed

  // Statutory Calculations under RFCTLARR Act 2013
  // 1. Base Market Value under Section 26: Higher of Circle Rate or Sale Deeds Average
  const baseRatePerHa = Math.max(circleRatePerHa, avgSaleDeedPerHa);
  const unmultipliedLandValue = baseRatePerHa * landAreaHa;

  // 2. Rural Multiplier Factor under First Schedule
  // Distance-based multiplier in rural areas: 1.0x to 2.0x
  let multiplierFactor = 1.0;
  if (landCategory === 'rural') {
    if (distanceKm <= 10) multiplierFactor = 1.25;
    else if (distanceKm <= 20) multiplierFactor = 1.5;
    else if (distanceKm <= 30) multiplierFactor = 1.75;
    else multiplierFactor = 2.0;
  }

  // 3. Adjusted Market Value = Base Land Value x Multiplier
  const multipliedLandValue = unmultipliedLandValue * multiplierFactor;

  // 4. Total Value under Section 26 & 29 (Land + Assets)
  const totalBasePlusAssets = multipliedLandValue + Number(assetValuation);

  // 5. Solatium under Section 30(1) = 100% of Total Base + Assets
  const solatiumAmount = totalBasePlusAssets * 1.0;

  // 6. Additional Compensation under Section 30(3) = 12% per annum on multiplied land value from Sec 4 to Award
  const additionalInterestYears = siaToAwardMonths / 12;
  const additionalInterest12 = multipliedLandValue * 0.12 * additionalInterestYears;

  // 7. Total Statutory Compensation Package under First Schedule
  const grandTotalCompensation = totalBasePlusAssets + solatiumAmount + additionalInterest12;

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(val));
  };

  return (
    <div className="py-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#C5A059]" />
                <span>Statutory Entitlement Engine • First Schedule RFCTLARR Act 2013</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1B365D] font-serif mt-1">
                Statutory Compensation Calculator (Sections 26 to 30)
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Simulate legally guaranteed compensation under the Right to Fair Compensation Act, 2013. The formula mandates multiplying market value up to 2.0x for rural land, adding 100% Solatium, and paying 12% additional annual interest.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs shrink-0 max-w-xs">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Legal Guarantee</span>
              </div>
              <div className="text-[11px] text-amber-800 mt-0.5">
                Compensation cannot be reduced below this formula by any administrative circular.
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Inputs & Statutory Result Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wider border-b border-slate-100 pb-2">
              Parcel &amp; Valuation Parameters
            </h3>

            {/* Land Area Input */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Land Area to be Acquired:</span>
                <span className="font-mono font-bold text-[#1B365D]">{landAreaHa} Hectare ({Math.round(landAreaHa * 2.471 * 100) / 100} Acres)</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.05"
                value={landAreaHa}
                onChange={(e) => setLandAreaHa(parseFloat(e.target.value))}
                className="w-full accent-[#1B365D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0.1 Ha</span>
                <span>2.5 Ha</span>
                <span>5.0 Ha</span>
              </div>
            </div>

            {/* Category: Rural vs Urban */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                Geographic Classification:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setLandCategory('rural')}
                  className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                    landCategory === 'rural'
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Rural Area (1.25x – 2.0x)
                </button>
                <button
                  type="button"
                  onClick={() => setLandCategory('urban')}
                  className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                    landCategory === 'urban'
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Urban Area (1.0x)
                </button>
              </div>
            </div>

            {/* Rural Distance Slider (if Rural) */}
            {landCategory === 'rural' && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Distance from Urban Boundary:</span>
                  <span className="font-mono font-bold text-[#1B365D]">{distanceKm} KM ({multiplierFactor}x Multiplier)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(parseInt(e.target.value))}
                  className="w-full accent-[#C5A059] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0-10 KM (1.25x)</span>
                  <span>10-20 KM (1.5x)</span>
                  <span>20-30 KM (1.75x)</span>
                  <span>&gt;30 KM (2.0x)</span>
                </div>
              </div>
            )}

            {/* Circle Rate vs Registered Sale Deed Average */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Circle Rate (₹/Ha):
                </label>
                <input
                  type="number"
                  value={circleRatePerHa}
                  onChange={(e) => setCircleRatePerHa(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-2 rounded border border-slate-300 bg-slate-50 font-mono text-slate-900 focus:outline-none focus:border-[#1B365D]"
                />
                <span className="text-[10px] text-slate-400">Stamp Act ready reckoner</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Avg Sale Deed (₹/Ha):
                </label>
                <input
                  type="number"
                  value={avgSaleDeedPerHa}
                  onChange={(e) => setAvgSaleDeedPerHa(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-2 rounded border border-slate-300 bg-slate-50 font-mono text-slate-900 focus:outline-none focus:border-[#1B365D]"
                />
                <span className="text-[10px] text-slate-400">Top 50% sale deeds average</span>
              </div>
            </div>

            {/* Assets on Land (Section 29) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Value of Assets on Land (Section 29):
              </label>
              <input
                type="number"
                value={assetValuation}
                onChange={(e) => setAssetValuation(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full p-2 rounded border border-slate-300 bg-slate-50 font-mono text-slate-900 text-xs focus:outline-none focus:border-[#1B365D]"
              />
              <span className="text-[10px] text-slate-400">Valuation of residential structures, wells, tube wells, fruit trees, standing crops</span>
            </div>

            {/* Elapsed Months from Sec 4 SIA to Award */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Time from Sec 4 SIA to Award:</span>
                <span className="font-mono font-bold text-[#1B365D]">{siaToAwardMonths} Months</span>
              </div>
              <input
                type="range"
                min="1"
                max="36"
                step="1"
                value={siaToAwardMonths}
                onChange={(e) => setSiaToAwardMonths(parseInt(e.target.value))}
                className="w-full accent-[#1B365D] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Section 30(3) entitles landowner to 12% p.a. interest during this statutory period</span>
            </div>

          </div>

          {/* Right Column: Mathematical Breakdown under RFCTLARR Act (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Grand Total Hero Box */}
            <div className="bg-[#1B365D] text-white p-6 rounded-xl border-2 border-[#C5A059] shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between text-xs text-amber-200/90 font-mono mb-2">
                <span>TOTAL STATUTORY AWARD (FIRST SCHEDULE)</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/40 font-bold">
                  DIRECT BENEFIT TRANSFER
                </span>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight">
                {formatINR(grandTotalCompensation)}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700/80 text-xs text-slate-200 flex flex-wrap items-center justify-between gap-2">
                <span>Total Multiplied Package for {landAreaHa} Hectare ({landCategory.toUpperCase()})</span>
                <span className="font-bold text-[#C5A059]">
                  Effective Multiplier: {(grandTotalCompensation / unmultipliedLandValue).toFixed(2)}x
                </span>
              </div>
            </div>

            {/* Step-by-Step Statutory Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider border-b border-slate-100 pb-2">
                Detailed Legal Calculation Breakdown
              </h4>

              {/* Step 1: Base Market Value */}
              <div className="flex items-start justify-between text-xs pb-3 border-b border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-mono">1</span>
                    <span>Base Market Value (Section 26)</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5 pl-6">
                    Max(Circle Rate: {formatINR(circleRatePerHa)}, Avg Sale: {formatINR(avgSaleDeedPerHa)}) × {landAreaHa} Ha
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-900 text-sm">
                  {formatINR(unmultipliedLandValue)}
                </div>
              </div>

              {/* Step 2: Multiplier Application */}
              <div className="flex items-start justify-between text-xs pb-3 border-b border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-mono">2</span>
                    <span>Rural / Urban Multiplier (First Schedule)</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5 pl-6">
                    Factor of <strong className="text-slate-700">{multiplierFactor}x</strong> applied for {landCategory === 'rural' ? `${distanceKm} KM rural radial distance` : 'urban area'}
                  </div>
                </div>
                <div className="font-mono font-bold text-[#1B365D] text-sm">
                  {formatINR(multipliedLandValue)}
                </div>
              </div>

              {/* Step 3: Assets on Land */}
              <div className="flex items-start justify-between text-xs pb-3 border-b border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-mono">3</span>
                    <span>Assets &amp; Improvements (Section 29)</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5 pl-6">
                    Valuation of residential structures, wells, tube wells, fruit trees, standing crops
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-900 text-sm">
                  {formatINR(assetValuation)}
                </div>
              </div>

              {/* Step 4: 100% Solatium Guarantee */}
              <div className="flex items-start justify-between text-xs pb-3 border-b border-slate-100 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                <div>
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-mono font-bold">4</span>
                    <span>100% Solatium Guarantee (Section 30(1))</span>
                  </div>
                  <div className="text-amber-800 text-[11px] mt-0.5 pl-6">
                    Mandatory 100% solatium added on total base land + assets value
                  </div>
                </div>
                <div className="font-mono font-bold text-amber-900 text-sm">
                  +{formatINR(solatiumAmount)}
                </div>
              </div>

              {/* Step 5: 12% Additional Interest */}
              <div className="flex items-start justify-between text-xs pb-3 border-b border-slate-100 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200/60">
                <div>
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[10px] font-mono font-bold">5</span>
                    <span>12% p.a. Additional Compensation (Section 30(3))</span>
                  </div>
                  <div className="text-emerald-800 text-[11px] mt-0.5 pl-6">
                    12% per annum on multiplied land value for {siaToAwardMonths} months ({additionalInterestYears.toFixed(2)} years)
                  </div>
                </div>
                <div className="font-mono font-bold text-emerald-900 text-sm">
                  +{formatINR(additionalInterest12)}
                </div>
              </div>

              {/* Statutory Note */}
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-700">Notice to Khatedars:</strong> The compensation determined under Section 23 cannot be reduced under any circumstances. If a landowner is dissatisfied with the determination of market value by the Collector, they have the statutory right under Section 64 to request a reference to the Land Acquisition, Rehabilitation and Resettlement (LARR) Authority within 6 weeks.
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
