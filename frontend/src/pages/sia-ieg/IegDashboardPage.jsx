import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import ProjectContextBar from '../../components/sia-ieg/common/ProjectContextBar.jsx';
import ContextualActionDrawer from '../../components/sia-ieg/common/ContextualActionDrawer.jsx';

import IegKpiGrid from '../../components/sia-ieg/ieg-dashboard/IegKpiGrid.jsx';
import IegCommitteePanel from '../../components/sia-ieg/ieg-dashboard/IegCommitteePanel.jsx';
import IegReviewPipeline from '../../components/sia-ieg/ieg-dashboard/IegReviewPipeline.jsx';
import IegPendingActions from '../../components/sia-ieg/ieg-dashboard/IegPendingActions.jsx';
import IegProjectQueueTable from '../../components/sia-ieg/ieg-dashboard/IegProjectQueueTable.jsx';

import { 
  Award, 
  FolderOpen, 
  FileText, 
  Play, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2 
} from 'lucide-react';
import { IEG_PROJECT_CONTEXT } from '../../services/iegService.js';

export default function IegDashboardPage() {
  const { setActiveMenu } = useSiaIeg();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('EVIDENCE');
  const [drawerData, setDrawerData] = useState(null);

  // Status message toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenMemberDrawer = (member) => {
    setDrawerType('MEMBER');
    setDrawerData(member);
    setDrawerOpen(true);
  };

  const handleOpenActionDrawer = (actionItem) => {
    if (actionItem.category === 'Missing Evidence') {
      setDrawerType('EVIDENCE');
      setDrawerData({
        evidenceId: 'EV-1021',
        type: 'Interview Evidence',
        sourceModule: 'Menu 2 (Census)',
        relatedRecord: 'FAM-004 & 37 Tenant Families',
        description: actionItem.action,
        uploadedBy: 'SIA Survey Team',
        uploadedAt: '14/02/2026',
        gps: '22.4731° N, 72.8021° E',
        fileSize: '4.2 MB'
      });
    } else {
      setDrawerType('CLARIFICATION');
      setDrawerData({
        requestId: 'CLAR-001',
        module: 'GIS & Land Requirement',
        recordId: 'PARCEL-CAD-PETLAD-01',
        question: actionItem.action,
        reason: 'Statutory verification prior to Section 7 appraisal conclusion.',
        status: actionItem.status,
        requestedBy: actionItem.assignedTo
      });
    }
    setDrawerOpen(true);
  };

  return (
    <div id="page-ieg-dashboard" className="w-full h-full min-h-full bg-slate-100 flex-1 flex flex-col font-sans">
      
      {/* 1. Universal Project Context Bar */}
      <ProjectContextBar activeMenuTitle="IEG Appraisal Dashboard" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-800 text-white px-6 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white font-bold">✕</button>
        </div>
      )}

      {/* 2. Menu 6 Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#1B365D]" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              IEG Appraisal Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Expert Group Review, Evidence Monitoring &amp; Statutory Appraisal
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast(`Project ${IEG_PROJECT_CONTEXT.projectId} is already loaded.`)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Open Project</span>
          </button>

          <button
            onClick={() => setActiveMenu('sia-review')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View SIA Report</span>
          </button>

          <button
            onClick={() => setActiveMenu('sia-review')}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
            <span>Start Review</span>
          </button>
        </div>
      </div>

      {/* 3. Main Dashboard Workspace Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
        
        {/* Exactly 7 Primary KPIs */}
        <IegKpiGrid 
          onOpenProjectList={() => {
            const el = document.getElementById('ieg-project-table-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenMissingEvidence={() => setActiveMenu('sia-review')}
        />

        {/* Review Pipeline */}
        <IegReviewPipeline />

        {/* Committee Panel (7 Members) */}
        <IegCommitteePanel onSelectMember={handleOpenMemberDrawer} />

        {/* Pending Actions & Workload Grid */}
        <div className="grid grid-cols-1 gap-5">
          <IegPendingActions onSelectAction={handleOpenActionDrawer} />
        </div>

        {/* Main Assigned Projects Table */}
        <div id="ieg-project-table-section">
          <IegProjectQueueTable />
        </div>

      </div>

      {/* 4. Contextual Action Drawer */}
      <ContextualActionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerType={drawerType}
        data={drawerData}
      />

    </div>
  );
}
