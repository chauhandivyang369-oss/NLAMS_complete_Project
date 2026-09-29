import React from 'react';
import { SiaIegProvider, useSiaIeg } from '../contexts/SiaIegContext.jsx';
import SiaIegTopNavbar from '../components/sia-ieg/SiaIegTopNavbar.jsx';
import SiaIegSidebar from '../components/sia-ieg/SiaIegSidebar.jsx';

// 9 Blank Menu Pages
import SiaOverviewPage from '../pages/sia-ieg/SiaOverviewPage.jsx';
import SurveyImpactCensusPage from '../pages/sia-ieg/SurveyImpactCensusPage.jsx';
import PublicHearingPage from '../pages/sia-ieg/PublicHearingPage.jsx';
import SimpBuilderPage from '../pages/sia-ieg/SimpBuilderPage.jsx';
import FinalSiaReportPage from '../pages/sia-ieg/FinalSiaReportPage.jsx';
import IegDashboardPage from '../pages/sia-ieg/IegDashboardPage.jsx';
import SiaReviewEvidencePage from '../pages/sia-ieg/SiaReviewEvidencePage.jsx';
import StatutoryAppraisalPage from '../pages/sia-ieg/StatutoryAppraisalPage.jsx';
import FinalRecommendationAuditPage from '../pages/sia-ieg/FinalRecommendationAuditPage.jsx';

function SiaIegWorkspaceInner({ onSwitchWorkspace }) {
  const { activeMenu } = useSiaIeg();

  // Router for the 9 menus
  const renderPage = () => {
    switch (activeMenu) {
      case 'sia-overview':
        return <SiaOverviewPage />;
      case 'survey-impact-census':
        return <SurveyImpactCensusPage />;
      case 'public-hearing':
        return <PublicHearingPage />;
      case 'simp-builder':
        return <SimpBuilderPage />;
      case 'final-sia-report':
        return <FinalSiaReportPage />;
      case 'ieg-dashboard':
        return <IegDashboardPage />;
      case 'sia-review':
        return <SiaReviewEvidencePage />;
      case 'statutory-appraisal':
        return <StatutoryAppraisalPage />;
      case 'final-recommendation':
        return <FinalRecommendationAuditPage />;
      default:
        return <SiaOverviewPage />;
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-white overflow-hidden text-slate-900 font-sans">
      {/* Top Navbar */}
      <SiaIegTopNavbar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 3-Pane Ready Layout Shell */}
      <div className="flex-1 flex flex-row overflow-hidden bg-white">
        {/* Left: Fixed / Collapsible Sidebar */}
        <SiaIegSidebar />

        {/* Center: Main Workspace Content Area (Completely Blank White) */}
        <main 
          id="sia-ieg-main-workspace"
          className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto bg-white"
        >
          {renderPage()}
        </main>

        {/* Right: Reserved Slot for future Contextual Action / Evidence Drawer */}
        <div id="sia-ieg-contextual-drawer-slot" className="hidden" />
      </div>
    </div>
  );
}

export default function SiaIegLayout({ onSwitchWorkspace }) {
  return (
    <SiaIegProvider>
      <SiaIegWorkspaceInner onSwitchWorkspace={onSwitchWorkspace} />
    </SiaIegProvider>
  );
}
