import React from 'react';
import { DistrictCollectorProvider, useDistrictCollector } from './context/DistrictCollectorContext.jsx';
import CollectorHeader from './components/layout/CollectorHeader.jsx';
import CollectorProjectContextBar from './components/layout/CollectorProjectContextBar.jsx';
import CollectorSidebar from './components/layout/CollectorSidebar.jsx';
import CollectorActionDrawer from './components/layout/CollectorActionDrawer.jsx';
import AwardFormVIIModal from './components/common/AwardFormVIIModal.jsx';
import NoticeGeneratorModal from './components/common/NoticeGeneratorModal.jsx';
import DelegationModal from './components/common/DelegationModal.jsx';
import CollectorSearchModal from './components/common/CollectorSearchModal.jsx';

// 10 Statutory Pages
import ExecutiveDashboardPage from './pages/ExecutiveDashboardPage.jsx';
import FormIInwardInquiryPage from './pages/FormIInwardInquiryPage.jsx';
import RbacSubDelegationPage from './pages/RbacSubDelegationPage.jsx';
import Section12SurveyValuationPage from './pages/Section12SurveyValuationPage.jsx';
import Section15ObjectionsHearingPage from './pages/Section15ObjectionsHearingPage.jsx';
import RnrSchemeReviewPage from './pages/RnrSchemeReviewPage.jsx';
import Section21ClaimsNoticePage from './pages/Section21ClaimsNoticePage.jsx';
import Section23AwardEnginePage from './pages/Section23AwardEnginePage.jsx';
import Section38PossessionDisbursementPage from './pages/Section38PossessionDisbursementPage.jsx';
import CadastralMutationAuditPage from './pages/CadastralMutationAuditPage.jsx';

function DistrictCollectorInner() {
  const { activeMenuId } = useDistrictCollector();

  const renderActivePage = () => {
    switch (activeMenuId) {
      case 'executive-dashboard':
        return <ExecutiveDashboardPage />;
      case 'form-i-inward':
        return <FormIInwardInquiryPage />;
      case 'rbac-delegation':
        return <RbacSubDelegationPage />;
      case 'sec12-survey':
        return <Section12SurveyValuationPage />;
      case 'sec15-objections':
        return <Section15ObjectionsHearingPage />;
      case 'rnr-scheme-review':
        return <RnrSchemeReviewPage />;
      case 'sec21-claims-notice':
        return <Section21ClaimsNoticePage />;
      case 'sec23-award-engine':
        return <Section23AwardEnginePage />;
      case 'sec38-possession-disbursement':
        return <Section38PossessionDisbursementPage />;
      case 'cadastral-mutation-audit':
        return <CadastralMutationAuditPage />;
      default:
        return <ExecutiveDashboardPage />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F8F9FA] flex flex-col font-sans text-slate-900 select-none overflow-hidden">
      {/* Top Header */}
      <CollectorHeader />

      {/* Persistent Project Context & Lapsing Watchdog Bar */}
      <CollectorProjectContextBar />

      {/* Main 2-Pane Workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* 10-Menu Sidebar */}
        <CollectorSidebar />

        {/* Dynamic Content Pane */}
        <main className="flex-1 overflow-y-auto min-h-0 min-w-0">
          {renderActivePage()}
        </main>
      </div>

      {/* Right Action Drawer */}
      <CollectorActionDrawer />

      {/* Statutory Modals */}
      <AwardFormVIIModal />
      <NoticeGeneratorModal />
      <DelegationModal />
      <CollectorSearchModal />
    </div>
  );
}

export default function DistrictCollectorWorkspace({ onSwitchWorkspace }) {
  return (
    <DistrictCollectorProvider onSwitchWorkspace={onSwitchWorkspace}>
      <DistrictCollectorInner />
    </DistrictCollectorProvider>
  );
}
