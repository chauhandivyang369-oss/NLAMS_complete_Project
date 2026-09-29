import React, { useState } from 'react';
import MasterHubListView from './master-hub/MasterHubListView.jsx';
import ProposalDetailHeader from './master-hub/ProposalDetailHeader.jsx';
import ProposalOverviewTab from './master-hub/ProposalOverviewTab.jsx';
import ProposalLandCadastreTab from './master-hub/ProposalLandCadastreTab.jsx';
import ProposalFinancialEscrowTab from './master-hub/ProposalFinancialEscrowTab.jsx';
import ProposalRnrTab from './master-hub/ProposalRnrTab.jsx';
import ProposalDocumentsTab from './master-hub/ProposalDocumentsTab.jsx';
import ProposalWorkflowTab from './master-hub/ProposalWorkflowTab.jsx';

export default function MasterRequisitionHub() {
  // Default to detail view so user immediately sees the multi-tier tab screens requested,
  // with full capability to toggle back to list view and drill down
  const [viewMode, setViewMode] = useState('detail'); // 'list' | 'detail'
  const [selectedProposalId, setSelectedProposalId] = useState('NLAMS-RB-2026-00124');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'cadastre' | 'financial' | 'rnr' | 'documents' | 'workflow'

  const handleSelectProposal = (id) => {
    setSelectedProposalId(id);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  if (viewMode === 'list') {
    return (
      <div className="w-full">
        <MasterHubListView onSelectProposal={handleSelectProposal} />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      {/* Proposal Detail Header with Multi-Tier Tab Navigation */}
      <ProposalDetailHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBackToList={handleBackToList}
      />

      {/* Render Current Active Tab Content */}
      <div className="w-full">
        {activeTab === 'overview' && (
          <ProposalOverviewTab onSwitchTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'cadastre' && (
          <ProposalLandCadastreTab />
        )}

        {activeTab === 'financial' && (
          <ProposalFinancialEscrowTab />
        )}

        {activeTab === 'rnr' && (
          <ProposalRnrTab />
        )}

        {activeTab === 'documents' && (
          <ProposalDocumentsTab />
        )}

        {activeTab === 'workflow' && (
          <ProposalWorkflowTab />
        )}
      </div>
    </div>
  );
}
