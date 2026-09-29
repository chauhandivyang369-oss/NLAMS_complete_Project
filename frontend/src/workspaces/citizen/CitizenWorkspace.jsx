import React from 'react';
import { CitizenProvider, useCitizen } from './context/CitizenContext.jsx';
import CitizenHeader from './components/layout/CitizenHeader.jsx';
import CitizenSidebar from './components/layout/CitizenSidebar.jsx';
import CitizenRightPanel from './components/layout/CitizenRightPanel.jsx';
import CitizenProjectContextBar from './components/layout/CitizenProjectContextBar.jsx';

// Common Modals and Drawers
import CitizenGlobalSearchModal from './components/common/CitizenGlobalSearchModal.jsx';
import CitizenProfileDrawer from './components/common/CitizenProfileDrawer.jsx';
import NotificationDrawer from './components/common/NotificationDrawer.jsx';
import DocumentViewerModal from './components/common/DocumentViewerModal.jsx';
import HelpDeskModal from './components/common/HelpDeskModal.jsx';

// 10 Distinct Menu Pages
import ExecutiveDashboardPage from './pages/ExecutiveDashboardPage.jsx';
import MyLandParcelPage from './pages/MyLandParcelPage.jsx';
import PublicNotificationsPage from './pages/PublicNotificationsPage.jsx';
import SiaPublicHearingPage from './pages/SiaPublicHearingPage.jsx';
import Section15ObjectionsPage from './pages/Section15ObjectionsPage.jsx';
import SurveyValuationTrackerPage from './pages/SurveyValuationTrackerPage.jsx';
import Section21ClaimsPage from './pages/Section21ClaimsPage.jsx';
import RnREntitlementsPage from './pages/RnREntitlementsPage.jsx';
import PfmsDbtPaymentLedgerPage from './pages/PfmsDbtPaymentLedgerPage.jsx';
import LarrTribunalReferencePage from './pages/LarrTribunalReferencePage.jsx';

function CitizenWorkspaceInner() {
  const {
    activeMenu,
    isProjectWorkspaceOpen,
    toastMessage
  } = useCitizen();

  const renderActiveMenuPage = () => {
    switch (activeMenu) {
      case '01':
        return <ExecutiveDashboardPage />;
      case '02':
        return <MyLandParcelPage />;
      case '03':
        return <PublicNotificationsPage />;
      case '04':
        return <SiaPublicHearingPage />;
      case '05':
        return <Section15ObjectionsPage />;
      case '06':
        return <SurveyValuationTrackerPage />;
      case '07':
        return <Section21ClaimsPage />;
      case '08':
        return <RnREntitlementsPage />;
      case '09':
        return <PfmsDbtPaymentLedgerPage />;
      case '10':
        return <LarrTribunalReferencePage />;
      default:
        return <ExecutiveDashboardPage />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans select-none overflow-hidden">
      {/* Top Universal Citizen Header */}
      <CitizenHeader />

      {/* Main 3-Pane Body */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Left Sidebar (10 Menus) */}
        <CitizenSidebar />

        {/* Center Main Stage */}
        <main className="flex-1 overflow-y-auto min-h-0 min-w-0 bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
          {/* Project Micro-Universe Banner if drilling into a project */}
          {isProjectWorkspaceOpen && (
            <CitizenProjectContextBar />
          )}

          {/* Active Menu Content */}
          <div className="flex-1">
            {renderActiveMenuPage()}
          </div>
        </main>

        {/* Right Collapsible Statutory Action Panel */}
        <CitizenRightPanel />
      </div>

      {/* Overlays / Modals / Drawers */}
      <CitizenGlobalSearchModal />
      <CitizenProfileDrawer />
      <NotificationDrawer />
      <DocumentViewerModal />
      <HelpDeskModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#C5A059] text-slate-900 px-4 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 border-l-4 border-l-[#C5A059]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping"></div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function CitizenWorkspace({ onSwitchWorkspace }) {
  return (
    <CitizenProvider onSwitchWorkspace={onSwitchWorkspace}>
      <CitizenWorkspaceInner />
    </CitizenProvider>
  );
}
