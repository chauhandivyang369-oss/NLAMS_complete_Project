import React from 'react';
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export const PROJECT_CONTEXT_TABS = [
  { id: 'overview', label: 'Overview', menuId: '01' },
  { id: 'parcels', label: 'My Parcels', menuId: '02' },
  { id: 'timeline', label: 'Timeline', menuId: '01' },
  { id: 'notifications', label: 'Notifications', menuId: '03' },
  { id: 'hearings', label: 'Hearings', menuId: '04' },
  { id: 'objections', label: 'Objections', menuId: '05' },
  { id: 'survey', label: 'Survey & Valuation', menuId: '06' },
  { id: 'claims', label: 'Claims', menuId: '07' },
  { id: 'compensation', label: 'Compensation', menuId: '07' },
  { id: 'rnr', label: 'R&R Scheme', menuId: '08' },
  { id: 'payments', label: 'Payments', menuId: '09' },
  { id: 'legal', label: 'Legal Reference', menuId: '10' }
];

export default function CitizenProjectContextBar() {
  const {
    activeProject,
    setActiveProject,
    projects,
    isProjectWorkspaceOpen,
    closeProjectWorkspace,
    projectContextTab,
    setProjectContextTab,
    setActiveMenu
  } = useCitizen();

  if (!activeProject) return null;

  const handleTabClick = (tab) => {
    setProjectContextTab(tab.id);
    setActiveMenu(tab.menuId);
  };

  return (
    <div className="bg-[#102238] border-b border-slate-700/90 text-white shrink-0 shadow-sm">
      {/* Top Bar with Project Meta */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          {isProjectWorkspaceOpen ? (
            <button
              onClick={closeProjectWorkspace}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-xs text-slate-200 transition-colors cursor-pointer"
              title="Return to Multi-Project Container Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-semibold">All Projects Hub</span>
            </button>
          ) : (
            <span className="text-[11px] uppercase font-bold text-[#C5A059] tracking-wider">
              PROJECT CONTEXT
            </span>
          )}

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">{activeProject.name}</span>
            <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              {activeProject.id}
            </span>
          </div>
        </div>

        {/* Project Selector (Switch between Citizen's Projects) */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Building className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="truncate max-w-[200px]" title={activeProject.requiringBody}>
              {activeProject.requiringBody}
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeProject.districts?.join(', ')}, {activeProject.state}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded text-[11px] font-bold">
            {activeProject.currentStageName || activeProject.currentStage}
          </span>
        </div>
      </div>

      {/* Contextual Sub-Tabs (Active in Project Workspace Mode) */}
      {isProjectWorkspaceOpen && (
        <div className="px-4 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 bg-[#0B1728] text-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-2 shrink-0">
            PROJECT VIEW:
          </span>
          {PROJECT_CONTEXT_TABS.map((tab) => {
            const isTabActive = projectContextTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isTabActive
                    ? 'bg-[#1B365D] text-[#E6CA85] border border-[#C5A059] shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
