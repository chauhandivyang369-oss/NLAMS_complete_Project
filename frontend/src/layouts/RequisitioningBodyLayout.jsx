import React, { useState } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext.jsx';
import GovernmentHeader from '../components/layout/GovernmentHeader.jsx';
import Sidebar from '../components/navigation/Sidebar.jsx';
import BhumiMitraDrawer from '../components/drawers/BhumiMitraDrawer.jsx';
import Toast from '../components/notifications/Toast.jsx';

// 10 Requisitioning Body Module Pages
import ExecutiveDashboard from '../pages/requisitioning-body/ExecutiveDashboard.jsx';
import MasterRequisitionHub from '../pages/requisitioning-body/MasterRequisitionHub.jsx';
import FormISmartWizard from '../pages/requisitioning-body/FormISmartWizard.jsx';
import GisSpatialCanvas from '../pages/requisitioning-body/GisSpatialCanvas.jsx';
import FinancialEscrowLedger from '../pages/requisitioning-body/FinancialEscrowLedger.jsx';
import StatutoryTimelineTracker from '../pages/requisitioning-body/StatutoryTimelineTracker.jsx';
import ObjectionsHearings from '../pages/requisitioning-body/ObjectionsHearings.jsx';
import RnrOversightDbt from '../pages/requisitioning-body/RnrOversightDbt.jsx';
import PiaDelegationRbac from '../pages/requisitioning-body/PiaDelegationRbac.jsx';
import DocumentGazetteVault from '../pages/requisitioning-body/DocumentGazetteVault.jsx';

export default function RequisitioningBodyLayout({ onSwitchToPolicyMaker, onSwitchToSiaIeg, onSwitchWorkspace }) {
  const { activeModule } = useWorkspace();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Render the corresponding module component
  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'requisition-hub':
      case 'master-hub':
        return <MasterRequisitionHub />;
      case 'form-i-wizard':
        return <FormISmartWizard />;
      case 'gis-canvas':
        return <GisSpatialCanvas />;
      case 'escrow-ledger':
        return <FinancialEscrowLedger />;
      case 'timeline-tracker':
        return <StatutoryTimelineTracker />;
      case 'objections-hearings':
        return <ObjectionsHearings />;
      case 'rnr-dbt':
        return <RnrOversightDbt />;
      case 'pia-rbac':
        return <PiaDelegationRbac />;
      case 'document-vault':
        return <DocumentGazetteVault />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  const isLightShell = true; // All Requisitioning Body modules use the crisp official institutional light background

  return (
    <div className="h-screen w-screen bg-[#0b1325] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 overflow-hidden">
      {/* Top National Government Header */}
      <GovernmentHeader 
        onSwitchToPolicyMaker={onSwitchToPolicyMaker} 
        onSwitchToSiaIeg={onSwitchToSiaIeg}
        onSwitchWorkspace={onSwitchWorkspace}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Main Workspace Body with Sidebar and Content Viewport */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left 10-Menu Statutory Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Dynamic Module Content Viewport */}
        <main className="flex-1 overflow-y-auto min-h-0 min-w-0 bg-[#f8fafc] text-slate-900 p-3 sm:p-5 lg:p-6">
          <div className="max-w-[1720px] mx-auto w-full">
            {renderModule()}
          </div>
        </main>
      </div>

      {/* Bhumi Mitra Legal AI Drawer */}
      <BhumiMitraDrawer />

      {/* Action Toast Notifications */}
      <Toast />
    </div>
  );
}
