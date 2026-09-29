import React from 'react';
import { AppropriateGovernmentProvider, useAppropriateGovernment } from './context/AppropriateGovernmentContext.jsx';
import AppropriateGovHeader from './components/layout/AppropriateGovHeader.jsx';
import AppropriateGovSidebar from './components/layout/AppropriateGovSidebar.jsx';
import AppropriateGovProjectContextBar from './components/layout/AppropriateGovProjectContextBar.jsx';
import ContextualActionDrawer from './components/layout/ContextualActionDrawer.jsx';
import GlobalSearchModal from './components/common/GlobalSearchModal.jsx';
import NotificationCenterDrawer from './components/common/NotificationCenterDrawer.jsx';
import GazettePreviewModal from './components/common/GazettePreviewModal.jsx';

// 8 Main Pages
import ExecutiveDashboardPage from './pages/ExecutiveDashboardPage.jsx';
import CollectorProposalInboxPage from './pages/CollectorProposalInboxPage.jsx';
import SiaSurveyLaunchHubPage from './pages/SiaSurveyLaunchHubPage.jsx';
import Section11NotificationHubPage from './pages/Section11NotificationHubPage.jsx';
import RnRReviewObjectionsPage from './pages/RnRReviewObjectionsPage.jsx';
import Section19DeclarationEnginePage from './pages/Section19DeclarationEnginePage.jsx';
import RbacAccessControlHubPage from './pages/RbacAccessControlHubPage.jsx';
import GazetteBroadcastVaultPage from './pages/GazetteBroadcastVaultPage.jsx';

function AppropriateGovernmentInner() {
  const {
    activeMenuId,
    setActiveMenuId,
    projects,
    proposals,
    parcels,
    setSelectedProjectId,
    openParcelDrawer,
    isSearchOpen,
    setIsSearchOpen,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    gazetteModalDoc,
    setGazetteModalDoc
  } = useAppropriateGovernment();

  // Render the current page (strictly 1 of 8)
  const renderCurrentPage = () => {
    switch (activeMenuId) {
      case 'executive-dashboard':
        return <ExecutiveDashboardPage />;
      case 'collector-proposal-inbox':
        return <CollectorProposalInboxPage />;
      case 'sia-survey-launch':
        return <SiaSurveyLaunchHubPage />;
      case 'sec11-notification':
        return <Section11NotificationHubPage />;
      case 'rnr-review-objections':
        return <RnRReviewObjectionsPage />;
      case 'sec19-declaration':
        return <Section19DeclarationEnginePage />;
      case 'rbac-access-control':
        return <RbacAccessControlHubPage />;
      case 'gazette-vault':
        return <GazetteBroadcastVaultPage />;
      default:
        return <ExecutiveDashboardPage />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F8F9FA] flex flex-col font-sans text-slate-900 select-none overflow-hidden">
      {/* Top Header */}
      <AppropriateGovHeader />

      {/* Persistent Project Context Bar */}
      <AppropriateGovProjectContextBar />

      {/* Main Workspace 2-Pane Body */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Primary 8-Menu Sidebar */}
        <AppropriateGovSidebar />

        {/* Active Content Area */}
        <main className="flex-1 overflow-y-auto min-h-0 min-w-0">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Contextual Action Drawer (Right Slide-over) */}
      <ContextualActionDrawer />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        proposals={proposals}
        parcels={parcels}
        onSelectProject={(id) => setSelectedProjectId(id)}
        onSelectParcel={(id) => openParcelDrawer(id)}
      />

      {/* Notification Center Drawer */}
      <NotificationCenterDrawer
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onNavigateMenu={(menuId) => setActiveMenuId(menuId)}
      />

      {/* Gazette Official Preview Modal */}
      <GazettePreviewModal
        doc={gazetteModalDoc}
        isOpen={!!gazetteModalDoc}
        onClose={() => setGazetteModalDoc(null)}
      />
    </div>
  );
}

export default function AppropriateGovernmentWorkspace({ initialJurisdiction = 'CENTRAL', onSwitchWorkspace }) {
  return (
    <AppropriateGovernmentProvider
      initialJurisdiction={initialJurisdiction}
      onSwitchWorkspace={onSwitchWorkspace}
    >
      <AppropriateGovernmentInner />
    </AppropriateGovernmentProvider>
  );
}
