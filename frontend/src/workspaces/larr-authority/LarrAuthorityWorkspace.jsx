import React from 'react';
import { LarrAuthorityProvider, useLarrAuthority } from './context/LarrAuthorityContext.jsx';
import LarrHeader from './components/layout/LarrHeader.jsx';
import LarrSidebar from './components/layout/LarrSidebar.jsx';
import CaseContextHeader from './components/layout/CaseContextHeader.jsx';
import LarrRightPanel from './components/layout/LarrRightPanel.jsx';
import LarrGlobalSearchModal from './components/modals/LarrGlobalSearchModal.jsx';

// 10 PRIMARY PAGES
import JudicialDashboardPage from './pages/JudicialDashboardPage.jsx';
import Section64InwardPage from './pages/Section64InwardPage.jsx';
import DigitalSummonsPage from './pages/DigitalSummonsPage.jsx';
import PleadingsEvidencePage from './pages/PleadingsEvidencePage.jsx';
import VirtualCourtroomPage from './pages/VirtualCourtroomPage.jsx';
import Section69AwardEnginePage from './pages/Section69AwardEnginePage.jsx';
import EscrowApportionmentPage from './pages/EscrowApportionmentPage.jsx';
import SlaPipelineMonitorPage from './pages/SlaPipelineMonitorPage.jsx';
import AppealExecutionPage from './pages/AppealExecutionPage.jsx';
import JudicialAuditVaultPage from './pages/JudicialAuditVaultPage.jsx';

import { CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';

function LarrShell({ onSwitchWorkspace }) {
  const { activeMenu, toastMessage } = useLarrAuthority();

  // Render the exact page corresponding to activeMenu (1 of 10)
  const renderActiveMenuPage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <JudicialDashboardPage />;
      case 'inward':
        return <Section64InwardPage />;
      case 'summons':
        return <DigitalSummonsPage />;
      case 'pleadings':
        return <PleadingsEvidencePage />;
      case 'courtroom':
        return <VirtualCourtroomPage />;
      case 'award-engine':
        return <Section69AwardEnginePage />;
      case 'escrow':
        return <EscrowApportionmentPage />;
      case 'sla':
        return <SlaPipelineMonitorPage />;
      case 'appeal-execution':
        return <AppealExecutionPage />;
      case 'audit':
        return <JudicialAuditVaultPage />;
      default:
        return <JudicialDashboardPage />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f1f5f9] overflow-hidden text-slate-900 font-sans">
      
      {/* 1. Master Top Government Header */}
      <LarrHeader onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Global Toast Notification Banner */}
      {toastMessage && (
        <div className={`shrink-0 px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-xs border-b transition-all ${
          toastMessage.type === 'success' ? 'bg-emerald-50 text-emerald-950 border-emerald-300' :
          toastMessage.type === 'warning' ? 'bg-amber-50 text-amber-950 border-amber-300' :
          toastMessage.type === 'error' ? 'bg-red-50 text-red-950 border-red-300' :
          'bg-blue-50 text-blue-950 border-blue-300'
        }`}>
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            {toastMessage.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
            <span className="truncate">{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* 3. Global Persistent Case Context Header (Persistent Across All 10 Menus) */}
      <CaseContextHeader />

      {/* 4. Three-Pane Government Judicial Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT: Fixed Sidebar Navigation (Exact 10 Menus, No Submenus) */}
        <LarrSidebar />

        {/* CENTER: Main Judicial Working Area */}
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 md:p-4 bg-[#f8fafc] min-w-0">
          <div className="max-w-7xl mx-auto pb-10">
            {renderActiveMenuPage()}
          </div>
        </main>

        {/* RIGHT: Dynamic Contextual Action / Case Info Panel */}
        <LarrRightPanel />

      </div>

      {/* 5. Global Search Modal (Ctrl+K or Top Search Bar) */}
      <LarrGlobalSearchModal />

      {/* 6. Footer Ribbon */}
      <footer className="bg-[#0B1A31] text-slate-400 border-t border-slate-800 text-[10px] font-mono px-4 py-1 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300 font-bold">
            <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
            <span>NLAMS JUDICIAL PILLAR</span>
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">RFCTLARR Act 2013 (Act No. 30 of 2013)</span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-emerald-400 font-bold">DEMO MODE ACTIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <span>e-Courts CIS 3.2 Interoperable</span>
          <span className="text-slate-600">|</span>
          <span className="text-[#C5A059]">Government of India</span>
        </div>
      </footer>

    </div>
  );
}

export default function LarrAuthorityWorkspace({ onSwitchWorkspace }) {
  return (
    <LarrAuthorityProvider>
      <LarrShell onSwitchWorkspace={onSwitchWorkspace} />
    </LarrAuthorityProvider>
  );
}
