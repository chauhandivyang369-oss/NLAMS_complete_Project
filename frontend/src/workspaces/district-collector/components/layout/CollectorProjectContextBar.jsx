import React from 'react';
import { 
  Briefcase, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Coins, 
  ChevronDown 
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../../services/compensationCalculator.js';

export default function CollectorProjectContextBar() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    activeProject,
    openProjectDrawer
  } = useDistrictCollector();

  if (!activeProject) return null;

  // Sec 25 Countdown styling
  const isCritical = activeProject.daysRemainingSec25 < 60;
  const isWarning = activeProject.daysRemainingSec25 >= 60 && activeProject.daysRemainingSec25 < 150;

  return (
    <div className="bg-[#142947] text-white border-b border-blue-900/60 px-3 sm:px-4 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs select-none shadow-xs">
      {/* Left: Project Selector & Basic Details */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider shrink-0 hidden sm:inline">
            CORRIDOR:
          </span>
          <select
            value={selectedProjectId || ''}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-[#1B365D] text-white border border-blue-800/60 px-2 py-1 font-semibold text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer max-w-[200px] sm:max-w-xs truncate"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Requisitioning Body Tag */}
        <span className="bg-white/10 text-blue-100 px-2 py-0.5 border border-white/20 text-[11px] font-mono shrink-0 hidden md:inline">
          {activeProject.requiringBody}
        </span>

        {/* Statutory Stage */}
        <div className="flex items-center gap-1.5 bg-blue-950/80 text-blue-200 px-2 py-0.5 border border-blue-800/60 font-semibold text-[11px] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>{activeProject.currentStageLabel}</span>
        </div>
      </div>

      {/* Right: Section 25 Lapsing Clock & Acquisition Stats */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-auto">
        {/* Section 25 Award Countdown Watchdog */}
        <div
          title="Section 25 RFCTLARR Act: Award must be made within 12 months from Sec 19 Declaration, else proceedings lapse!"
          className={`flex items-center gap-1.5 px-2 py-0.5 sm:py-1 border text-[11px] font-mono font-bold shrink-0 ${
            isCritical
              ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
              : isWarning
              ? 'bg-amber-950/80 text-amber-300 border-amber-600'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
          }`}
        >
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">SEC 25 DEADLINE:</span>
          <span className="underline decoration-wavy">
            {activeProject.daysRemainingSec25 > 0 ? `${activeProject.daysRemainingSec25}D LEFT` : 'AWARD OK'}
          </span>
        </div>

        {/* Acquisition Ha Progress */}
        <div className="flex items-center gap-1 text-slate-300 bg-white/5 px-2 py-0.5 sm:py-1 border border-white/10 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          <span className="hidden sm:inline">Area:</span>
          <span className="font-bold text-white font-mono">
            {activeProject.acquiredAreaHa} / {activeProject.totalAreaHa} Ha
          </span>
        </div>

        {/* Khatedars Count */}
        <div className="flex items-center gap-1 text-slate-300 bg-white/5 px-2 py-0.5 sm:py-1 border border-white/10 shrink-0 hidden lg:flex">
          <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Khatedars:</span>
          <span className="font-bold text-white font-mono">{activeProject.totalKhatedars}</span>
        </div>

        {/* Escrow Disbursed */}
        <div className="flex items-center gap-1 text-slate-300 bg-white/5 px-2 py-0.5 sm:py-1 border border-white/10 shrink-0 hidden md:flex">
          <Coins className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Disbursed:</span>
          <span className="font-bold text-emerald-300 font-mono">
            ₹{activeProject.disbursedCrores} Cr
          </span>
        </div>

        {/* Drawer button */}
        <button
          onClick={() => openProjectDrawer(activeProject.id)}
          className="text-[#C5A059] hover:text-[#e4be6c] underline font-semibold cursor-pointer shrink-0 text-xs ml-1"
        >
          Details
        </button>
      </div>
    </div>
  );
}
