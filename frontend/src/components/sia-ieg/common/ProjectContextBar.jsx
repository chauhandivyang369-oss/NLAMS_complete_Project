import React from 'react';
import { 
  Building2, 
  Layers, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { IEG_PROJECT_CONTEXT } from '../../../services/iegService.js';
import { useSiaIeg } from '../../../contexts/SiaIegContext.jsx';

export default function ProjectContextBar({ 
  activeMenuTitle = 'IEG Appraisal',
  badgeText = null
}) {
  const { setActiveMenu, activeMenu } = useSiaIeg();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Clarification Required':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Ready for Appraisal':
      case 'Appraisal Complete':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Submitted':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <header className="bg-[#1B365D] text-white border-b border-slate-700/60 px-4 py-2.5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        
        {/* Left: Project Identity & Title */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/10 rounded-lg shrink-0 border border-white/15">
            <Building2 className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[#C5A059] font-bold text-xs">
                {IEG_PROJECT_CONTEXT.projectId}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-200 font-semibold truncate max-w-md" title={IEG_PROJECT_CONTEXT.projectName}>
                {IEG_PROJECT_CONTEXT.projectName}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {IEG_PROJECT_CONTEXT.monitoringImpactTag}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-300 font-mono mt-1">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>{IEG_PROJECT_CONTEXT.requiringBody.split('(')[0]}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{IEG_PROJECT_CONTEXT.district} ({IEG_PROJECT_CONTEXT.villages.join(', ')})</span>
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-400" />
                <span>{IEG_PROJECT_CONTEXT.totalParcelsCount} Parcels ({IEG_PROJECT_CONTEXT.gisLinkedAreaHa} Ha)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: SIA Report / IEG Review Status & Quick Navigation */}
        <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
          <div className="bg-black/25 px-2.5 py-1 rounded border border-white/10 text-right">
            <div className="text-[10px] text-slate-400 font-mono">SIA Report</div>
            <div className="font-mono font-bold text-[#C5A059] text-[11px]">
              {IEG_PROJECT_CONTEXT.siaReportId} ({IEG_PROJECT_CONTEXT.siaReportVersion})
            </div>
          </div>

          <div className="bg-black/25 px-2.5 py-1 rounded border border-white/10 text-right">
            <div className="text-[10px] text-slate-400 font-mono">IEG Committee</div>
            <div className="font-mono font-bold text-slate-100 text-[11px]">
              {IEG_PROJECT_CONTEXT.iegId} (7 Members)
            </div>
          </div>

          <div className={`px-2.5 py-1.5 rounded-lg border font-mono font-bold text-xs flex items-center gap-1.5 ${getStatusBadge(IEG_PROJECT_CONTEXT.iegReviewStatus)}`}>
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{IEG_PROJECT_CONTEXT.iegReviewStatus}</span>
          </div>

          {/* Quick Tab/Menu Switcher across IEG 6,7,8,9 */}
          <div className="hidden sm:flex items-center gap-1 bg-white/10 p-0.5 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveMenu('ieg-dashboard')}
              title="Menu 6: IEG Dashboard"
              className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                activeMenu === 'ieg-dashboard' ? 'bg-[#C5A059] text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              M6
            </button>
            <button
              onClick={() => setActiveMenu('sia-review')}
              title="Menu 7: SIA Review & Evidence"
              className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                activeMenu === 'sia-review' ? 'bg-[#C5A059] text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              M7
            </button>
            <button
              onClick={() => setActiveMenu('statutory-appraisal')}
              title="Menu 8: Statutory Appraisal"
              className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                activeMenu === 'statutory-appraisal' ? 'bg-[#C5A059] text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              M8
            </button>
            <button
              onClick={() => setActiveMenu('final-recommendation')}
              title="Menu 9: Final Recommendation & Audit"
              className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                activeMenu === 'final-recommendation' ? 'bg-[#C5A059] text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              M9
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
