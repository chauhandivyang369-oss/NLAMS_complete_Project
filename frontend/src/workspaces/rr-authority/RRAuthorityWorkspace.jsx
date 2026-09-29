import React from 'react';
import { RRAuthorityProvider, useRRAuthority } from './context/RRAuthorityContext.jsx';
import RRTopbar from './components/layout/RRTopbar.jsx';
import RRSidebar from './components/layout/RRSidebar.jsx';
import RRRightPanel from './components/layout/RRRightPanel.jsx';
import GlobalULPINSearchModal from './components/layout/GlobalULPINSearchModal.jsx';
import RRDocumentViewerModal from './components/common/RRDocumentViewerModal.jsx';
import RRAuditInspectorDrawer from './components/common/RRAuditInspectorDrawer.jsx';
import RRESignSimulationModal from './components/common/RRESignSimulationModal.jsx';

// 10 Official Workspace Pages
import RRDashboardPage from './pages/RRDashboardPage.jsx';
import AffectedFamiliesPage from './pages/AffectedFamiliesPage.jsx';
import RRSchemeBuilderPage from './pages/RRSchemeBuilderPage.jsx';
import SCSTPlanBuilderPage from './pages/SCSTPlanBuilderPage.jsx';
import RRPublicHearingPage from './pages/RRPublicHearingPage.jsx';
import RRAllotmentPage from './pages/RRAllotmentPage.jsx';
import RRDBTPage from './pages/RRDBTPage.jsx';
import CommissionerApprovalPage from './pages/CommissionerApprovalPage.jsx';
import RRMonitoringPage from './pages/RRMonitoringPage.jsx';
import RRAuditVaultPage from './pages/RRAuditVaultPage.jsx';

function RRAuthorityContent({ onSwitchWorkspace }) {
  const { activeMenu } = useRRAuthority();

  const renderActiveMenu = () => {
    switch (activeMenu) {
      case 'rr-dashboard':
        return <RRDashboardPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'affected-families':
        return <AffectedFamiliesPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'rr-scheme-builder':
        return <RRSchemeBuilderPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'sc-st-plan-builder':
        return <SCSTPlanBuilderPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'public-hearing':
        return <RRPublicHearingPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'rr-allotment':
        return <RRAllotmentPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'rr-dbt':
        return <RRDBTPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'commissioner-approval':
        return <CommissionerApprovalPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'rr-monitoring':
        return <RRMonitoringPage onSwitchWorkspace={onSwitchWorkspace} />;
      case 'rr-audit-vault':
        return <RRAuditVaultPage onSwitchWorkspace={onSwitchWorkspace} />;
      default:
        return <RRDashboardPage onSwitchWorkspace={onSwitchWorkspace} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-800">
      {/* 1. Master Top Navigation */}
      <RRTopbar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Workspace Body (Sidebar + Active Page + Right Context Panel) */}
      <div className="flex flex-1 overflow-hidden relative">
        <RRSidebar />
        
        <main className="flex-1 overflow-y-auto min-w-0">
          {renderActiveMenu()}
        </main>

        <RRRightPanel />
      </div>

      {/* 3. Global Modals & Drawers */}
      <GlobalULPINSearchModal onSwitchWorkspace={onSwitchWorkspace} />
      <RRDocumentViewerModal />
      <RRAuditInspectorDrawer />
      <RRESignSimulationModal />
    </div>
  );
}

export default function RRAuthorityWorkspace({ onSwitchWorkspace }) {
  return (
    <RRAuthorityProvider>
      <RRAuthorityContent onSwitchWorkspace={onSwitchWorkspace} />
    </RRAuthorityProvider>
  );
}
