import React, { useState } from 'react';
import {
  Scale,
  FileText,
  Calculator,
  Download,
  CheckCircle2,
  AlertCircle,
  Building,
  CreditCard,
  Send,
  Upload,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { MOCK_COMPENSATION_CALCULATION } from '../services/citizenMockData.js';

export default function Section21ClaimsPage() {
  const { activeCitizen, activeProject, setActiveDocModal, showToast } = useCitizen();

  const compData = MOCK_COMPENSATION_CALCULATION;
  const breakdown = compData.breakdown;

  // Claim Form State
  const [marketValueClaim, setMarketValueClaim] = useState('6500000');
  const [structureClaim, setStructureClaim] = useState('350000');
  const [treeCropClaim, setTreeCropClaim] = useState('220000');
  const [severanceClaim, setSeveranceClaim] = useState('500000');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setClaimSubmitted(true);
    showToast('Section 22 Claim Dossier submitted to Collectorate Scrutiny Cell.');
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#C5A059]" />
            <span>Section 21/22 Claims &amp; Transparent Compensation Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory compensation computation under First Schedule of RFCTLARR Act 2013 with 100% Solatium &amp; 12% Interest.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDocModal({
              title: 'Form-IV Public Notice Inviting Claims under Section 21',
              authority: 'District Magistrate & CALA, Ahmedabad',
              date: '10/05/2026',
              section: 'Section 21 Form-IV',
              qrVerified: true
            })}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span>View Form-IV Notice Doc</span>
          </button>
        </div>
      </div>

      {/* 2. Transparent Compensation Matrix (RFCTLARR Schedule I Breakdown) */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#1B365D] text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                FIRST SCHEDULE COMPLIANT
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                Rule Engine: RFCTLARR (Gujarat Rules 2017)
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Transparent Statutory Compensation Computation Matrix
            </h3>
            <div className="text-xs text-slate-600">
              Holding: <span className="font-bold text-slate-900">Survey {compData.surveyNo} ({compData.khataNo})</span>, {compData.village} • Extent Acquired: <span className="font-bold text-amber-800 font-mono">{compData.areaAcquiredHa} Ha</span>
            </div>
          </div>

          <div className="text-right p-3 bg-emerald-50 border border-emerald-200 rounded">
            <span className="text-[10px] text-emerald-800 uppercase font-bold block">
              FINAL STATUTORY AWARD DETERMINATION
            </span>
            <span className="font-mono font-black text-xl text-emerald-900">
              ₹ {breakdown.totalAssessedCompensation.toLocaleString('en-IN')}
            </span>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              100% Tax-Exempt under Section 96
            </div>
          </div>
        </div>

        {/* Step-by-Step Calculation Formula Cards */}
        <div className="space-y-2.5 text-xs text-slate-800">
          {/* Component 1: Base Market Value */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">1</span>
                <span>Base Market Value (Section 26)</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Higher of registered sale deeds average for past 3 years or circle rate (Jantri Rate).
              </p>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 text-sm">
              ₹ {breakdown.totalBaseMarketValue.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Component 2: Rural Multiplication Factor */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-mono text-[10px]">2</span>
                <span>Rural Area Multiplication Factor (Section 26(2))</span>
              </div>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Multiplier of <span className="font-bold font-mono">1.50x</span> applied based on radial distance from urban local body limit.
              </p>
            </div>
            <div className="text-right font-mono font-bold text-blue-900 text-sm">
              ₹ {breakdown.marketValueAfterMultiplier.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Component 3: Assets & Attached Property */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">3</span>
                <span>Valuation of Attached Assets (Section 29)</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Structures (₹2,50,000) + Trees (₹1,80,000) + Well/Wall (₹50,000) assessed by authorized valuers.
              </p>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 text-sm">
              ₹ {breakdown.assetsValuation.totalAssets.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Component 4: Solatium (100%) */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-mono text-[10px]">4</span>
                <span>100% Mandatory Solatium (Section 30(1))</span>
              </div>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Equal to one hundred percent (100%) of total market value and asset valuation.
              </p>
            </div>
            <div className="text-right font-mono font-bold text-amber-900 text-sm">
              ₹ {breakdown.solatiumAmount.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Component 5: Additional Statutory Amount */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">5</span>
                <span>Additional Amount at 12% p.a. (Section 30(3))</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Calculated @ 12% p.a. on market value from Section 11 Notification (14/08/2025) to Award Date (10/09/2026) = 392 Days.
              </p>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 text-sm">
              ₹ {breakdown.additionalStatutoryInterest.calculatedAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Form-VI Award Reference Card */}
        <div className="p-3.5 bg-[#1B365D] text-white rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#E6CA85] uppercase font-bold tracking-wider">
              OFFICIAL STATUTORY RECORD
            </div>
            <div className="font-bold text-sm text-white">
              Form-VI Land Acquisition Award #{compData.awardDetails.awardNo}
            </div>
            <div className="text-[11px] text-slate-300">
              Passed on {compData.awardDetails.awardDate} by {compData.awardDetails.passedBy}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDocModal({
                title: `Form-VI Statutory Land Acquisition Award #${compData.awardDetails.awardNo}`,
                authority: compData.awardDetails.passedBy,
                date: compData.awardDetails.awardDate,
                section: 'Section 23 / 30 Award',
                qrVerified: true
              })}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#d6b268] text-[#1B365D] font-bold text-xs rounded transition-colors cursor-pointer"
            >
              VIEW SIGNED AWARD
            </button>
            <button
              onClick={() => showToast('Downloading Form-VI Signed Award PDF...')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-xs rounded transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section 22 Online Claim Submission Form */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
        <div className="pb-2 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Section 22 Online Statement of Claims Form
          </h3>
          <p className="text-xs text-slate-500">
            Submit your itemized compensation claims for market value, structures, crops, and severance damages before award inquiry.
          </p>
        </div>

        {claimSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-xs space-y-1">
            <div className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Section 22 Claim Statement Submitted to Collectorate Scrutiny Cell</span>
            </div>
            <p className="text-emerald-800 text-[11px]">
              Docket Reference: <span className="font-mono font-bold">CLM-2026-AHD-0419</span>. Recorded for inquiry under Section 23.
            </p>
          </div>
        ) : (
          <form onSubmit={handleClaimSubmit} className="space-y-3 text-xs text-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Market Value Claim (INR) *
                </label>
                <input
                  type="number"
                  value={marketValueClaim}
                  onChange={(e) => setMarketValueClaim(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Structure / Building Claim (INR)
                </label>
                <input
                  type="number"
                  value={structureClaim}
                  onChange={(e) => setStructureClaim(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Trees &amp; Standing Crops Claim (INR)
                </label>
                <input
                  type="number"
                  value={treeCropClaim}
                  onChange={(e) => setTreeCropClaim(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Severance &amp; Business Loss (INR)
                </label>
                <input
                  type="number"
                  value={severanceClaim}
                  onChange={(e) => setSeveranceClaim(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Remittance Account: <span className="font-semibold text-slate-800">{activeCitizen.bankName} ({activeCitizen.bankAccountMasked})</span>
              </span>

              <button
                type="submit"
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white font-bold rounded flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>SUBMIT SECTION 22 CLAIM</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
