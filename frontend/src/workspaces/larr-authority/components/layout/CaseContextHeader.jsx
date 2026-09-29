import React from 'react';
import { useLarrAuthority } from '../../context/LarrAuthorityContext.jsx';
import { 
  Building2, 
  MapPin, 
  User, 
  Calendar, 
  Clock, 
  FileCheck2, 
  Scale, 
  Coins, 
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  Gavel
} from 'lucide-react';

export default function CaseContextHeader() {
  const { selectedCase, setActiveMenu } = useLarrAuthority();

  if (!selectedCase) {
    return (
      <div className="bg-amber-50 border-b border-amber-200 p-2.5 text-xs text-amber-800">
        No active judicial case selected. Please select a case from the top bar or cause list.
      </div>
    );
  }

  const {
    caseId,
    referenceNumber,
    referenceDate,
    collectorName,
    district,
    state,
    projectCode,
    projectName,
    requiringBody,
    claimantName,
    ulpin,
    surveyNumber,
    parcelId,
    acquiredAreaHectares,
    collectorAward,
    stage,
    status,
    slaDaysElapsed,
    slaDaysRemaining,
    slaStatus,
    nextHearingDate,
    presidingOfficer
  } = selectedCase;

  // SLA Status badge colors
  const slaBadge = {
    NORMAL: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    WARNING: 'bg-amber-100 text-amber-800 border-amber-300',
    CRITICAL: 'bg-red-100 text-red-800 border-red-300',
    BREACHED: 'bg-rose-900 text-white border-rose-950 font-bold animate-pulse'
  }[slaStatus] || 'bg-slate-100 text-slate-800 border-slate-300';

  return (
    <section className="bg-white border-b-2 border-slate-300 shadow-2xs px-3 sm:px-4 py-2.5 shrink-0 z-10">
      
      {/* Top Row: Case Identification, Stage, SLA Countdown */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
        
        {/* Case ID & Reference */}
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#24548A] text-[#E6CA85] font-mono text-xs font-bold px-2.5 border border-[#C5A059] shadow-xs">
            CASE: {caseId}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-slate-500 font-semibold">{referenceNumber}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-mono text-[11px]">Ref Date: <strong>{referenceDate}</strong></span>
          </div>

          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-blue-100 text-blue-900 border border-blue-300">
            {stage.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Right SLA Progress Countdown (Statutory 180 Days) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">180-Day SLA:</span>
            <span className="font-bold text-slate-900">{slaDaysElapsed}d elapsed</span>
            <span className="text-slate-400">/</span>
            <span className={`px-2 py-0.5 rounded font-bold border text-[11px] ${slaBadge}`}>
              {slaDaysRemaining}d remaining ({slaStatus})
            </span>
          </div>

          {nextHearingDate && (
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono bg-purple-50 text-purple-900 px-2 py-0.5 rounded border border-purple-200">
              <Gavel className="w-3 h-3 text-purple-700" />
              <span>Next: <strong>{nextHearingDate}</strong></span>
            </div>
          )}
        </div>

      </div>

      {/* Middle Row: Project, Landowner, ULPIN, Collector Award */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        
        {/* 1. Claimant / Landowner */}
        <div className="bg-slate-50/80 p-1.5 sm:p-2 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-600 font-bold truncate">Claimant</div>
          <div className="font-bold text-[#24548A] truncate text-[11px] sm:text-xs" title={claimantName}>
            {claimantName}
          </div>
          <div className="text-[10px] text-slate-700 truncate">
            {selectedCase.claimantCategory?.split(' ')[0] || 'Landowner'}
          </div>
        </div>

        {/* 2. Project & Requiring Body */}
        <div className="bg-slate-50/80 p-1.5 sm:p-2 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-600 font-bold truncate">Project</div>
          <div className="font-semibold text-slate-900 truncate text-[11px] sm:text-xs" title={projectName}>
            {projectCode}
          </div>
          <div className="text-[10px] text-slate-700 truncate" title={requiringBody}>
            {requiringBody}
          </div>
        </div>

        {/* 3. ULPIN & Survey Parcel */}
        <div className="bg-slate-50/80 p-1.5 sm:p-2 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-600 font-bold truncate">ULPIN &amp; Parcel</div>
          <div className="font-mono font-bold text-blue-700 truncate text-[11px] sm:text-xs" title={ulpin}>
            {ulpin}
          </div>
          <div className="text-[10px] font-mono text-slate-700 truncate">
            Sy: <strong>{surveyNumber}</strong> ({acquiredAreaHectares} Ha)
          </div>
        </div>

        {/* 4. Jurisdiction & Collector */}
        <div className="bg-slate-50/80 p-1.5 sm:p-2 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-600 font-bold truncate">District &amp; Collector</div>
          <div className="font-semibold text-slate-800 truncate text-[11px] sm:text-xs" title={collectorName}>
            {district}, {state}
          </div>
          <div className="text-[10px] text-slate-700 truncate">
            {collectorName}
          </div>
        </div>

        {/* 5. Original Collector Award */}
        <div className="bg-slate-50/80 p-1.5 sm:p-2 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-600 font-bold truncate">Collector Award</div>
          <div className="font-mono font-bold text-slate-900 text-[11px] sm:text-xs">
            ₹{(collectorAward.totalCollectorAwardAmount / 10000000).toFixed(3)} Cr
          </div>
          <div className="text-[10px] font-mono text-slate-700 truncate">
            ₹{collectorAward.basicLandRatePerSqM}/sq.m (&times;{collectorAward.ruralMultiplier})
          </div>
        </div>

        {/* 6. Current Bench / Presiding Officer */}
        <div className="bg-slate-50/80 p-1.5 sm:p-2 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono uppercase text-slate-600 font-bold truncate">Presiding Officer</div>
          <div className="font-semibold text-slate-900 truncate text-[11px]" title={presidingOfficer}>
            {presidingOfficer.split('(')[0]}
          </div>
          <div className="text-[10px] text-slate-700 font-mono truncate">
            {selectedCase.courtName?.split(',')[1] || 'Court Hall 1'}
          </div>
        </div>

      </div>

    </section>
  );
}
