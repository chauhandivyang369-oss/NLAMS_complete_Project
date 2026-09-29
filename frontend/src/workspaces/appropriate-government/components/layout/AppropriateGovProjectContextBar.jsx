import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { useAppropriateGovernment } from '../../context/AppropriateGovernmentContext.jsx';
import StatutoryTimerBadge from '../common/StatutoryTimerBadge.jsx';

export default function AppropriateGovProjectContextBar() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    openProjectDrawer,
    onSwitchWorkspace,
    jurisdiction
  } = useAppropriateGovernment();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  if (!selectedProject) return null;

  const timer = selectedProject.statutoryTimers || {};

  return (
    <div className="bg-[#FAF8F5] border-b border-[#C5A059]/40 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs shrink-0 relative z-30">
      {/* Left: Active Project Selector & Core Identity */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded font-bold text-[#1B365D] cursor-pointer shadow-xs transition-colors"
          >
            <FolderOpen className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono text-xs">{selectedProject.id}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-[calc(100vw-32px)] sm:w-96 max-w-sm bg-white border border-slate-300 rounded shadow-2xl py-1 z-50 text-xs">
              <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-[10px] uppercase">
                Select Active Statutory Project ({jurisdiction})
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {projects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setIsProjectDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 hover:bg-slate-50 flex items-start justify-between cursor-pointer ${
                      selectedProjectId === p.id ? 'bg-amber-50/80 font-bold' : ''
                    }`}
                  >
                    <div>
                      <div className="text-slate-900 font-semibold">{p.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {p.id} • {p.executingAgency}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {p.states?.join(', ')} • {p.districts?.join(', ')}
                      </div>
                    </div>
                    {selectedProjectId === p.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Name & Agency */}
        <div className="space-y-0.5 max-w-md truncate">
          <div className="font-bold text-slate-900 truncate" title={selectedProject.name}>
            {selectedProject.name}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span className="font-semibold text-slate-700">{selectedProject.executingAgency}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {selectedProject.states?.join(', ')} ({selectedProject.districts?.join(', ')})
            </span>
          </div>
        </div>
      </div>

      {/* Center: Statutory Stage & Timers */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded">
          <span className="text-[10px] uppercase font-bold text-slate-400">STAGE:</span>
          <span className="font-bold text-[#1B365D]">{selectedProject.stageLabel}</span>
        </div>

        {timer.daysRemaining !== undefined && (
          <StatutoryTimerBadge
            daysRemaining={timer.daysRemaining}
            daysElapsed={299}
            status={timer.status}
            stayExclusionDays={selectedProject.stayExclusionDays}
            extensionDays={selectedProject.extensionDays}
            compact={true}
          />
        )}

        <button
          onClick={() => openProjectDrawer(selectedProject.id)}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-2.5 py-1 rounded font-semibold cursor-pointer shadow-xs text-xs"
          title="Open complete statutory project dossier"
        >
          <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Dossier</span>
        </button>
      </div>
    </div>
  );
}
