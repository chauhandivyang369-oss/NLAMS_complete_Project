import React, { useState } from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Users, 
  Calendar, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Shield,
  CreditCard,
  Home
} from 'lucide-react';

export default function RRProjectContextBar({ onSwitchWorkspace }) {
  const { selectedProject } = useRRAuthority();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2.5 shadow-2xs select-none">
      
      {/* Compact Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-0">
        
        {/* Left: Project Code + Name + Requiring Body */}
        <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
          <div className="w-7 h-7 rounded bg-[#1B365D] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs mt-0.5 sm:mt-0">
            RR
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-xs text-[#1B365D] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                {selectedProject.code}
              </span>
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                {selectedProject.name}
              </h2>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                {selectedProject.rrStatus}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-2 sm:gap-3 mt-1 font-medium flex-wrap">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{selectedProject.requiringBody}</span>
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{selectedProject.district}, {selectedProject.state}</span>
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="text-[#C5A059] font-bold font-mono">
                Acq. Area: {selectedProject.proposedAcquisitionAreaHa} Ha ({selectedProject.totalParcelsCount} Parcels)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Stats + Expand Details Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
            <div className="text-left sm:text-right">
              <div className="text-slate-400 text-[10px] whitespace-nowrap">AFFECTED FAMILIES</div>
              <strong className="text-slate-900 text-xs">{selectedProject.totalAffectedFamilies}</strong>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="text-left sm:text-right">
              <div className="text-slate-400 text-[10px] whitespace-nowrap">DISPLACED</div>
              <strong className="text-rose-600 text-xs">{selectedProject.displacedFamiliesCount}</strong>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="text-left sm:text-right">
              <div className="text-slate-400 text-[10px] whitespace-nowrap">R&amp;R BUDGET</div>
              <strong className="text-emerald-700 text-xs whitespace-nowrap">₹{selectedProject.budgetAllocatedCr} Cr</strong>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer shrink-0"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

        </div>

      </div>

      {/* Expanded Statutory Details Drawer */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700 space-y-2.5 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px]">
            <div>
              <span className="font-semibold text-slate-500 block">Appropriate Government:</span>
              <span className="font-medium text-slate-900">{selectedProject.appropriateGovernment}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">Public Purpose (Sec 2(1)):</span>
              <span className="font-medium text-slate-900">Linear Railway Freight Transport Corridor</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">Statutory Administrator (Sec 43):</span>
              <span className="font-medium text-slate-900">{selectedProject.administratorName}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">R&amp;R Commissioner (Sec 44):</span>
              <span className="font-medium text-slate-900">{selectedProject.commissionerName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono bg-blue-50/60 p-2.5 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <span>Target Villages: <strong>{selectedProject.villages.join(', ')}</strong></span>
              <span>•</span>
              <span>Resettlement Colony: <strong>{selectedProject.resettlementColony}</strong></span>
            </div>

            {/* Cross Workspace Quick Jump Links */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-sans text-[10px]">Cross-Workspace Links:</span>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('requiring-body')}
                className="text-[#1B365D] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <span>Requiring Body Form-I</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <span>•</span>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
                className="text-[#1B365D] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <span>SIA Census &amp; Report</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
