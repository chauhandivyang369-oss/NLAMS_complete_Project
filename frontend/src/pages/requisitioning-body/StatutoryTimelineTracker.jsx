import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Printer, 
  History, 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  CheckCircle2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import TimelineSubNav from '../../components/timeline/TimelineSubNav.jsx';
import TimelineOverviewView from '../../components/timeline/TimelineOverviewView.jsx';
import StageMilestonesView from '../../components/timeline/StageMilestonesView.jsx';
import PendingActionsSlaView from '../../components/timeline/PendingActionsSlaView.jsx';
import StageDetailsView from '../../components/timeline/StageDetailsView.jsx';
import DocumentsAuditView from '../../components/timeline/DocumentsAuditView.jsx';

export default function StatutoryTimelineTracker() {
  const { activeProject, openAiAssistant, showToast } = useWorkspace();
  const [activeTab, setActiveTab] = useState('overview');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <TimelineOverviewView onNavigateTab={setActiveTab} />;
      case 'milestones':
        return <StageMilestonesView onNavigateTab={setActiveTab} />;
      case 'pending-actions':
        return <PendingActionsSlaView onNavigateTab={setActiveTab} />;
      case 'stage-details':
        return <StageDetailsView onNavigateTab={setActiveTab} />;
      case 'documents-audit':
        return <DocumentsAuditView onNavigateTab={setActiveTab} />;
      default:
        return <TimelineOverviewView onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div id="statutory-timeline-tracker-module" className="p-3 sm:p-5 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Top Header matching Government Portal Spec */}
      <div 
        id="statutory-timeline-header-bar" 
        className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3"
      >
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            <span>PORTAL</span>
            <span>/</span>
            <span>REQUISITION WORKFLOWS</span>
            <span>/</span>
            <span className="text-amber-700">MODULE 06: STATUTORY TIMELINE TRACKER</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-1">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
              Statutory Timeline Tracker & Legal Horizon
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-mono inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ACTIVE PIPELINE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Surveillance of 12-month statutory cutoffs under Section 19(7) and Section 25 (RFCTLARR Act 2013 r/w NH Act 1956)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            id="btn-print-status-brief"
            onClick={() => showToast('Printing Official Statutory Timeline & Status Brief PDF...')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Status Brief</span>
          </button>

          <button
            id="btn-statutory-audit-log"
            onClick={() => setActiveTab('documents-audit')}
            className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            <span>Statutory Audit Log</span>
          </button>

          <button
            id="btn-ai-delay-forecast"
            onClick={() => openAiAssistant(`Analyze timeline delay causes and project whether ${activeProject?.code || 'NLAMS-RB-2026-00124'} can publish Section 19 before lapse deadline`)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Delay Forecast</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation (5 Tabs) with Right Extra Sovereign Compliance Pill */}
      <TimelineSubNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rightExtra={
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono tracking-wider border border-slate-200">
            <ShieldCheck className="w-3 h-3 text-slate-500" />
            SOVEREIGN COMPLIANCE: RFCTLARR 2013 • NH Act 1956
          </span>
        }
      />

      {/* Active Sub-View Viewport */}
      <div id="timeline-active-subview-viewport" className="transition-all duration-150">
        {renderActiveView()}
      </div>
    </div>
  );
}
