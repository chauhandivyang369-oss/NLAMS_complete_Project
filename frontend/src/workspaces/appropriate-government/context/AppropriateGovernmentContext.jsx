/**
 * NLAMS - Appropriate Government Context Provider
 * Shared state management for Central Appropriate Government and State Appropriate Government
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AppropriateGovApi } from '../services/appropriateGovApi.js';
import { getStatutoryRules } from '../services/statutoryRulesConfig.js';
import { getAppropriateGovConfig } from '../services/appropriateGovConfig.js';
import { MOCK_PARCELS } from '../../../mock/requisitions.js';
import { MOCK_STATE_LAND_BANK_RECORDS } from '../services/appropriateGovMockData.js';

const AppropriateGovernmentContext = createContext(null);

export function AppropriateGovernmentProvider({ children, initialJurisdiction = 'CENTRAL', onSwitchWorkspace }) {
  // Jurisdiction state: 'CENTRAL' | 'STATE'
  const [jurisdiction, setJurisdiction] = useState(initialJurisdiction);

  useEffect(() => {
    setJurisdiction(initialJurisdiction);
  }, [initialJurisdiction]);

  // Active Menu Index (1-8 strictly)
  const [activeMenuId, setActiveMenuId] = useState('executive-dashboard');

  // Configuration for Central vs State
  const config = useMemo(() => getAppropriateGovConfig(jurisdiction), [jurisdiction]);

  const [activeRole, setActiveRole] = useState(config.primaryRoles[0]);

  // Keep active role aligned when switching jurisdiction
  useEffect(() => {
    setActiveRole(config.primaryRoles[0]);
  }, [jurisdiction, config]);

  // Data states
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [siaRecords, setSiaRecords] = useState([]);
  const [sec11Records, setSec11Records] = useState([]);
  const [sec19Declarations, setSec19Declarations] = useState([]);
  const [rbacAssignments, setRbacAssignments] = useState([]);
  const [gazetteDocs, setGazetteDocs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [parcels] = useState(MOCK_PARCELS);
  const [landBankRecords] = useState(MOCK_STATE_LAND_BANK_RECORDS);
  const [statutoryRules, setStatutoryRules] = useState([]);

  // Selected Entities
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [selectedSec11Id, setSelectedSec11Id] = useState(null);
  const [selectedSec19Id, setSelectedSec19Id] = useState(null);
  const [selectedRbacMember, setSelectedRbacMember] = useState(null);

  // Mobile navigation drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Contextual Right Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('project'); // 'project' | 'parcel' | 'proposal' | 'sec11' | 'sec19' | 'rbac' | 'audit' | 'notifications' | 'landbank'

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [gazetteModalDoc, setGazetteModalDoc] = useState(null); // When open, shows official gazette preview

  // Load initial data
  const loadData = async () => {
    const projList = await AppropriateGovApi.getProjects(jurisdiction);
    setProjects(projList);
    if (projList.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projList[0].id);
    }

    const propList = await AppropriateGovApi.getProposals(jurisdiction);
    setProposals(propList);

    const siaList = await AppropriateGovApi.getSiaRecords(jurisdiction);
    setSiaRecords(siaList);

    const s11List = await AppropriateGovApi.getSection11Records(jurisdiction);
    setSec11Records(s11List);

    const s19List = await AppropriateGovApi.getSection19Declarations(jurisdiction);
    setSec19Declarations(s19List);

    const rbacList = await AppropriateGovApi.getRbacAssignments(jurisdiction);
    setRbacAssignments(rbacList);

    const gazList = await AppropriateGovApi.getGazetteVault(jurisdiction);
    setGazetteDocs(gazList);

    const audList = await AppropriateGovApi.getAuditLogs();
    setAuditLogs(audList);

    setStatutoryRules(getStatutoryRules(jurisdiction));
  };

  useEffect(() => {
    loadData();
  }, [jurisdiction]);

  // Derived selected entities
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  const selectedProposal = useMemo(() => {
    return proposals.find(p => p.proposalId === selectedProposalId) || proposals[0] || null;
  }, [proposals, selectedProposalId]);

  const selectedParcel = useMemo(() => {
    return parcels.find(p => p.id === selectedParcelId) || parcels[0] || null;
  }, [parcels, selectedParcelId]);

  const selectedSec11 = useMemo(() => {
    return sec11Records.find(r => r.id === selectedSec11Id || r.projectId === selectedProjectId) || sec11Records[0] || null;
  }, [sec11Records, selectedSec11Id, selectedProjectId]);

  const selectedSec19 = useMemo(() => {
    return sec19Declarations.find(d => d.id === selectedSec19Id || d.projectId === selectedProjectId) || sec19Declarations[0] || null;
  }, [sec19Declarations, selectedSec19Id, selectedProjectId]);

  // Drawer Open Handlers
  const openProjectDrawer = (projId = null) => {
    if (projId) setSelectedProjectId(projId);
    setDrawerType('project');
    setIsDrawerOpen(true);
  };

  const openParcelDrawer = (parcelId) => {
    setSelectedParcelId(parcelId);
    setDrawerType('parcel');
    setIsDrawerOpen(true);
  };

  const openProposalDrawer = (propId) => {
    setSelectedProposalId(propId);
    setDrawerType('proposal');
    setIsDrawerOpen(true);
  };

  const openSec11Drawer = (sec11Id) => {
    setSelectedSec11Id(sec11Id);
    setDrawerType('sec11');
    setIsDrawerOpen(true);
  };

  const openSec19Drawer = (sec19Id) => {
    setSelectedSec19Id(sec19Id);
    setDrawerType('sec19');
    setIsDrawerOpen(true);
  };

  const openAuditDrawer = () => {
    setDrawerType('audit');
    setIsDrawerOpen(true);
  };

  const openLandBankDrawer = () => {
    setDrawerType('landbank');
    setIsDrawerOpen(true);
  };

  const openRbacDrawer = (member) => {
    setSelectedRbacMember(member);
    setDrawerType('rbac');
    setIsDrawerOpen(true);
  };

  // Actions
  const handleProposalAction = async (proposalId, status, memo) => {
    await AppropriateGovApi.updateProposalStatus(proposalId, status, memo);
    await loadData();
  };

  const handleIssueSiaStart = async (payload) => {
    await AppropriateGovApi.issueSiaStartNotification({
      ...payload,
      jurisdictionType: jurisdiction,
      officerName: activeRole.title
    });
    await loadData();
  };

  const handleVerifyPublicationEvidence = async (notifId, pubId) => {
    await AppropriateGovApi.verifyPublicationEvidence(notifId, pubId);
    await loadData();
  };

  const handleGrantFreezeExemption = async (payload) => {
    await AppropriateGovApi.grantFreezeExemption(payload);
    await loadData();
  };

  const handleRecordCourtStay = async (payload) => {
    await AppropriateGovApi.recordCourtStay(payload);
    await loadData();
  };

  const handleProvisionRbac = async (payload) => {
    await AppropriateGovApi.provisionRbacAssignment({
      ...payload,
      jurisdictionType: jurisdiction
    });
    await loadData();
  };

  const value = {
    jurisdiction,
    setJurisdiction,
    config,
    activeMenuId,
    setActiveMenuId,
    activeRole,
    setActiveRole,
    availableRoles: config.primaryRoles,

    projects,
    proposals,
    siaRecords,
    sec11Records,
    sec19Declarations,
    rbacAssignments,
    gazetteDocs,
    auditLogs,
    parcels,
    landBankRecords,
    statutoryRules,

    selectedProjectId,
    setSelectedProjectId,
    selectedProject,

    selectedProposalId,
    setSelectedProposalId,
    selectedProposal,

    selectedParcelId,
    setSelectedParcelId,
    selectedParcel,

    selectedSec11Id,
    setSelectedSec11Id,
    selectedSec11,

    selectedSec19Id,
    setSelectedSec19Id,
    selectedSec19,

    selectedRbacMember,
    setSelectedRbacMember,

    isSidebarOpen,
    setIsSidebarOpen,

    isDrawerOpen,
    setIsDrawerOpen,
    drawerType,
    setDrawerType,

    openProjectDrawer,
    openParcelDrawer,
    openProposalDrawer,
    openSec11Drawer,
    openSec19Drawer,
    openAuditDrawer,
    openLandBankDrawer,
    openRbacDrawer,

    isSearchOpen,
    setIsSearchOpen,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,

    gazetteModalDoc,
    setGazetteModalDoc,

    handleProposalAction,
    handleIssueSiaStart,
    handleVerifyPublicationEvidence,
    handleGrantFreezeExemption,
    handleRecordCourtStay,
    handleProvisionRbac,
    refreshData: loadData,
    onSwitchWorkspace
  };

  return (
    <AppropriateGovernmentContext.Provider value={value}>
      {children}
    </AppropriateGovernmentContext.Provider>
  );
}

export function useAppropriateGovernment() {
  const context = useContext(AppropriateGovernmentContext);
  if (!context) {
    throw new Error('useAppropriateGovernment must be used within an AppropriateGovernmentProvider');
  }
  return context;
}
