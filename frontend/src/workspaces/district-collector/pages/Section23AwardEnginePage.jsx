import React, { useState } from 'react';
import { 
  Award, 
  Clock, 
  Coins, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';
import { calculateRfctlarrCompensation, formatIndianCurrency } from '../services/compensationCalculator.js';

export default function Section23AwardEnginePage() {
  const {
    awards,
    activeProject,
    setAwardModalData,
    setIsAwardModalOpen
  } = useDistrictCollector();

  // Interactive Calculator State
  const [calcAreaHa, setCalcAreaHa] = useState(1.25);
  const [calcCircleRate, setCalcCircleRate] = useState(4500000);
  const [calcSalesAvg, setCalcSalesAvg] = useState(4800000);
  const [calcConsentedRate, setCalcConsentedRate] = useState(0);
  const [calcDistanceKm, setCalcDistanceKm] = useState(16);
  const [calcStructureVal, setCalcStructureVal] = useState(1200000);
  const [calcTreesVal, setCalcTreesVal] = useState(450000);
  const [calcCropsVal, setCalcCropsVal] = useState(120000);

  // Real-time calculation
  const computed = calculateRfctlarrCompensation({
    areaHectares: parseFloat(calcAreaHa) || 0,
    circleRatePerHa: parseFloat(calcCircleRate) || 0,
    salesAvgPerHa: parseFloat(calcSalesAvg) || 0,
    consentedRatePerHa: parseFloat(calcConsentedRate) || 0,
    isRural: true,
    distanceFromUrbanKm: parseFloat(calcDistanceKm) || 0,
    structureValue: parseFloat(calcStructureVal) || 0,
    treesValue: parseFloat(calcTreesVal) || 0,
    cropsValue: parseFloat(calcCropsVal) || 0,
    sec11Date: activeProject?.sec11Date || '2024-04-10',
    awardDate: new Date().toISOString().substring(0, 10)
  });

  const handleOpenFormVII = (award) => {
    setAwardModalData(award);
    setIsAwardModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              STATUTORY AWARD DIRECTORATE
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sections 23, 26, 27, 28, 29, 30 &amp; Section 25 12-Month Lapsing Limit
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Section 23–30 Land Acquisition Award &amp; Compensation Engine
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Determine highest market value under Section 26(1), apply rural sliding scale under Section 26(2), appraise attached assets under Section 29, add 100% Solatium &amp; 12% additional amount under Section 30, and enforce Form VII.
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 font-bold uppercase">SECTION 25 WATCHDOG</div>
          <div className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 border border-amber-300">
            {activeProject?.daysRemainingSec25} Days Remaining Before Lapse
          </div>
        </div>
      </div>

      {/* Active Statutory Awards Form VII Roll */}
      <div className="bg-white border border-slate-200 shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span>Statutory Land Acquisition Awards Form VII Registry ({activeProject?.code})</span>
          </div>
          <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-2 py-0.5 font-bold">
            {awards.length} Awards Formulated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="p-3">Award Case No.</th>
                <th className="p-3">Village / Taluka</th>
                <th className="p-3">Sec 19 Date</th>
                <th className="p-3">Sec 25 Deadline</th>
                <th className="p-3 text-right">Acquired Area (Ha)</th>
                <th className="p-3 text-right">Total Award (INR)</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {awards.map((award) => (
                <tr key={award.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">
                    <div>{award.awardNumber}</div>
                    <div className="text-[10px] text-slate-400 font-normal">By: {award.awardingOfficer}</div>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {award.village} ({award.taluka})
                  </td>
                  <td className="p-3 font-mono text-slate-600">{award.sec19DeclarationDate}</td>
                  <td className="p-3 font-mono font-bold text-emerald-800">{award.sec25DeadlineDate}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-800">{award.totalAcquiredHa}</td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-800 text-sm">
                    {formatIndianCurrency(award.totalCompensationAmount)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 ${
                        award.status === 'AWARD_ENFORCED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {award.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleOpenFormVII(award)}
                      className="px-3 py-1 bg-[#142642] hover:bg-slate-800 text-[#C5A059] text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Form VII</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive RFCTLARR Statutory Compensation Calculator Desk */}
      <div className="bg-white border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h2 className="font-bold text-slate-900 text-sm">
                Interactive RFCTLARR First Schedule Compensation Simulator
              </h2>
              <div className="text-[11px] text-slate-500">
                Calculates Section 26 Market Value, Section 29 Assets, Section 30(1) 100% Solatium &amp; Section 30(3) 12% Additional Amount
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 text-slate-800 px-2.5 py-1 font-bold">
            Live Math Engine
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Parameters (2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Land Area to Acquire (Hectares):
              </label>
              <input
                type="number"
                step="0.01"
                value={calcAreaHa}
                onChange={(e) => setCalcAreaHa(e.target.value)}
                className="w-full border border-slate-300 p-2 font-mono font-bold focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Circle Rate / Ready Reckoner (Per Ha):
              </label>
              <input
                type="number"
                value={calcCircleRate}
                onChange={(e) => setCalcCircleRate(e.target.value)}
                className="w-full border border-slate-300 p-2 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                3-Year Highest 50% Sales Avg (Per Ha):
              </label>
              <input
                type="number"
                value={calcSalesAvg}
                onChange={(e) => setCalcSalesAvg(e.target.value)}
                className="w-full border border-slate-300 p-2 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Distance from Urban Boundary (Km):
              </label>
              <input
                type="number"
                value={calcDistanceKm}
                onChange={(e) => setCalcDistanceKm(e.target.value)}
                className="w-full border border-slate-300 p-2 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                PWD Certified Structures Value (Sec 29):
              </label>
              <input
                type="number"
                value={calcStructureVal}
                onChange={(e) => setCalcStructureVal(e.target.value)}
                className="w-full border border-slate-300 p-2 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Horticulture Trees / Wells Value (Sec 29):
              </label>
              <input
                type="number"
                value={calcTreesVal}
                onChange={(e) => setCalcTreesVal(e.target.value)}
                className="w-full border border-slate-300 p-2 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Computed Statutory Outputs (1 col) */}
          <div className="bg-slate-50 border border-slate-200 p-4 space-y-3 text-xs">
            <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider border-b border-slate-200 pb-1">
              STATUTORY APPORTIONMENT COMPUTATION
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Adopted Market Rate (Sec 26(1)):</span>
                <span className="font-mono font-bold text-slate-900">{formatIndianCurrency(computed.highestRatePerHa)}/Ha</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Rural Multiplier (Sec 26(2)):</span>
                <span className="font-mono font-bold text-blue-900">{computed.ruralFactor}x</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Multiplied Land Value:</span>
                <span className="font-mono font-semibold">{formatIndianCurrency(computed.multipliedMarketValue)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Attached Assets (Sec 29):</span>
                <span className="font-mono font-semibold">{formatIndianCurrency(computed.totalAssetsValue)}</span>
              </div>

              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="font-bold text-slate-800">100% Solatium (Sec 30(1)):</span>
                <span className="font-mono font-bold text-blue-900">{formatIndianCurrency(computed.solatium)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">12% Addl Amount ({computed.diffYears} yrs):</span>
                <span className="font-mono font-semibold">{formatIndianCurrency(computed.additionalCompensation)}</span>
              </div>

              <div className="pt-2 border-t-2 border-slate-300 flex justify-between items-center bg-slate-100 p-2">
                <span className="font-bold text-slate-950 text-xs">Total Compensation:</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  {formatIndianCurrency(computed.totalCompensation)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
