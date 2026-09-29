import React, { useState } from 'react';
import { PolicyMakerProvider, usePolicyMaker } from '../contexts/PolicyMakerContext.jsx';
import PolicyMakerHeader from '../components/policy-maker/PolicyMakerHeader.jsx';
import PolicyMakerSidebar from '../components/policy-maker/PolicyMakerSidebar.jsx';
import ExecutiveActionVault from '../components/policy-maker/ExecutiveActionVault.jsx';
import ProjectIntelligenceDrawer from '../components/policy-maker/ProjectIntelligenceDrawer.jsx';
import GlobalSearchModal from '../components/policy-maker/GlobalSearchModal.jsx';

import ExecutiveOverviewPage from '../pages/policy-maker/ExecutiveOverviewPage.jsx';
import PipelinePage from '../pages/policy-maker/PipelinePage.jsx';
import RiskEnginePage from '../pages/policy-maker/RiskEnginePage.jsx';
import FinanceOversightPage from '../pages/policy-maker/FinanceOversightPage.jsx';
import MeetingsMoMPage from '../pages/policy-maker/MeetingsMoMPage.jsx';
import BottleneckResolverPage from '../pages/policy-maker/BottleneckResolverPage.jsx';
import RnRSocialAuditPage from '../pages/policy-maker/RnRSocialAuditPage.jsx';
import MisReportsPage from '../pages/policy-maker/MisReportsPage.jsx';

import { CheckCircle2, AlertCircle } from 'lucide-react';

function PolicyMakerShell({ onSwitchToRequiringBody, onSwitchToSiaIeg, onSwitchWorkspace }) {
  const { activeModule, toastMessage } = usePolicyMaker();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Render current module page
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'executive-overview':
        return <ExecutiveOverviewPage />;
      case 'pipeline':
        return <PipelinePage />;
      case 'risk-engine':
        return <RiskEnginePage />;
      case 'finance-oversight':
        return <FinanceOversightPage />;
      case 'meetings-mom':
        return <MeetingsMoMPage />;
      case 'bottleneck-resolver':
        return <BottleneckResolverPage />;
      case 'rr-social-audit':
        return <RnRSocialAuditPage />;
      case 'mis-reports':
        return <MisReportsPage />;
      default:
        return <ExecutiveOverviewPage />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f1f5f9] overflow-hidden text-slate-900 font-sans">
      
      {/* Institutional GOI Header */}
      <PolicyMakerHeader 
        onSwitchToRequiringBody={onSwitchToRequiringBody} 
        onSwitchToSiaIeg={onSwitchToSiaIeg}
        onSwitchWorkspace={onSwitchWorkspace}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 animate-in slide-in-from-top-3 fade-in duration-200">
          <div className={`px-4 py-2.5 rounded-xl shadow-lg border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'warning'
              ? 'bg-amber-900 text-amber-100 border-amber-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 3-Pane Government Master Shell */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Pane 1: 8-Module Institutional Sidebar */}
        <PolicyMakerSidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Pane 2: Primary Content Workspace Canvas */}
        <main className="flex-1 min-w-0 overflow-y-auto p-3 sm:p-4 lg:p-5 bg-[#f8fafc]">
          <div className="w-full max-w-7xl mx-auto space-y-4">
            {renderActiveModule()}
          </div>
        </main>

        {/* Pane 3: Executive Action Vault (Contextual Right Drawer) */}
        <ExecutiveActionVault />

      </div>

      {/* Multi-Tab Project Intelligence Modal / Drawer */}
      <ProjectIntelligenceDrawer />

      {/* Ctrl+K Global Search Modal */}
      <GlobalSearchModal />

    </div>
  );
}

export default function PolicyMakerLayout({ onSwitchToRequiringBody, onSwitchToSiaIeg, onSwitchWorkspace }) {
  return (
    <PolicyMakerProvider>
      <PolicyMakerShell 
        onSwitchToRequiringBody={onSwitchToRequiringBody} 
        onSwitchToSiaIeg={onSwitchToSiaIeg}
        onSwitchWorkspace={onSwitchWorkspace}
      />
    </PolicyMakerProvider>
  );
}
