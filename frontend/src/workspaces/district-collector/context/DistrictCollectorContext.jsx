/**
 * NLAMS - Master District Collector Context Provider
 * Comprehensive state management for District Collector, CALA, SDM, and Revenue Officers
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DistrictCollectorApi } from '../services/districtCollectorApi.js';

const DistrictCollectorContext = createContext(null);

export function DistrictCollectorProvider({ children, onSwitchWorkspace }) {
  // Navigation & Jurisdiction State
  const [activeMenuId, setActiveMenuId] = useState('executive-dashboard');
  const [selectedDistrictId, setSelectedDistrictId] = useState('DIST-THANE');
  const [selectedRoleId, setSelectedRoleId] = useState('ROLE-DC-DM');
  const [selectedProjectId, setSelectedProjectId] = useState('PROJ-MAHSR-001');

  // Datasets
  const [districts, setDistricts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [formIInwards, setFormIInwards] = useState([]);
  const [delegations, setDelegations] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [objections, setObjections] = useState([]);
  const [rnrSchemes, setRnrSchemes] = useState([]);
  const [claims, setClaims] = useState([]);
  const [awards, setAwards] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Selected Entities
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [selectedObjectionId, setSelectedObjectionId] = useState(null);
  const [selectedAwardId, setSelectedAwardId] = useState(null);

  // Drawers & Modals
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('parcel'); // 'parcel' | 'project' | 'objection' | 'delegation' | 'audit'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [awardModalData, setAwardModalData] = useState(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeModalData, setNoticeModalData] = useState(null);
  const [isDelegationModalOpen, setIsDelegationModalOpen] = useState(false);

  // Load static and district-filtered records
  const loadInitialData = async () => {
    const distList = await DistrictCollectorApi.getDistricts();
    setDistricts(distList);
    const roleList = await DistrictCollectorApi.getCollectorRoles();
    setRoles(roleList);
    const delList = await DistrictCollectorApi.getRbacDelegations();
    setDelegations(delList);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const loadDistrictData = async (distId) => {
    const projList = await DistrictCollectorApi.getProjects(distId);
    setProjects(projList);
    if (projList.length > 0 && (!selectedProjectId || !projList.find(p => p.id === selectedProjectId))) {
      setSelectedProjectId(projList[0].id);
    }
    const formList = await DistrictCollectorApi.getFormIInwards(distId);
    setFormIInwards(formList);
  };

  const loadProjectData = async (projId) => {
    const parcList = await DistrictCollectorApi.getParcels(projId);
    setParcels(parcList);
    const survList = await DistrictCollectorApi.getSection12Surveys(projId);
    setSurveys(survList);
    const objList = await DistrictCollectorApi.getSection15Objections(projId);
    setObjections(objList);
    const schList = await DistrictCollectorApi.getRnrDraftSchemes(projId);
    setRnrSchemes(schList);
    const clmList = await DistrictCollectorApi.getSection21Claims(projId);
    setClaims(clmList);
    const awdList = await DistrictCollectorApi.getSection23Awards(projId);
    setAwards(awdList);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      loadDistrictData(selectedDistrictId);
    }
  }, [selectedDistrictId]);

  useEffect(() => {
    if (selectedProjectId) {
      loadProjectData(selectedProjectId);
    }
  }, [selectedProjectId]);

  // Derived Objects
  const activeDistrict = useMemo(() => {
    return districts.find(d => d.id === selectedDistrictId) || districts[0] || null;
  }, [districts, selectedDistrictId]);

  const activeRole = useMemo(() => {
    return roles.find(r => r.id === selectedRoleId) || roles[0] || null;
  }, [roles, selectedRoleId]);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  const selectedParcel = useMemo(() => {
    return parcels.find(p => p.id === selectedParcelId) || parcels[0] || null;
  }, [parcels, selectedParcelId]);

  // Drawer Openers
  const openParcelDrawer = (parcelId) => {
    setSelectedParcelId(parcelId);
    setDrawerType('parcel');
    setIsDrawerOpen(true);
  };

  const openProjectDrawer = (projId = null) => {
    if (projId) setSelectedProjectId(projId);
    setDrawerType('project');
    setIsDrawerOpen(true);
  };

  const openAuditDrawer = () => {
    setDrawerType('audit');
    setIsDrawerOpen(true);
  };

  // Actions
  const handleUpdateFormI = async (id, recommendation, inquiryNotes) => {
    await DistrictCollectorApi.updateFormIRecommendation(id, recommendation, inquiryNotes, activeRole?.title);
    await loadDistrictData(selectedDistrictId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleCreateDelegation = async (delegationPayload) => {
    await DistrictCollectorApi.createRbacDelegation(delegationPayload, activeRole?.title);
    const delList = await DistrictCollectorApi.getRbacDelegations();
    setDelegations(delList);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
    setIsDelegationModalOpen(false);
  };

  const handleRecordSection13Damage = async (surveyId, damagePayload) => {
    await DistrictCollectorApi.recordSection13DamageTender(surveyId, damagePayload, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleSection15Decision = async (objectionId, decision, orderSummary) => {
    await DistrictCollectorApi.recordSection15HearingDecision(objectionId, decision, orderSummary, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleForwardRnrScheme = async (schemeId, recommendation) => {
    await DistrictCollectorApi.forwardRnrDraftScheme(schemeId, recommendation, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleVerifyClaim = async (claimId, status, notes) => {
    await DistrictCollectorApi.verifySection21Claim(claimId, status, notes, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleEnforceAward = async (awardId) => {
    await DistrictCollectorApi.enforceSection23Award(awardId, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleTakePossession = async (parcelId, panchnamaData) => {
    await DistrictCollectorApi.executeSection38Possession(parcelId, panchnamaData, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const handleDepositAuthority = async (parcelId, amount, reason) => {
    await DistrictCollectorApi.recordSection77AuthorityDeposit(parcelId, amount, reason, activeRole?.title);
    await loadProjectData(selectedProjectId);
    const audList = await DistrictCollectorApi.getAuditLogs();
    setAuditLogs(audList);
  };

  const value = {
    activeMenuId,
    setActiveMenuId,
    selectedDistrictId,
    setSelectedDistrictId,
    selectedRoleId,
    setSelectedRoleId,
    selectedProjectId,
    setSelectedProjectId,

    districts,
    roles,
    projects,
    parcels,
    formIInwards,
    delegations,
    surveys,
    objections,
    rnrSchemes,
    claims,
    awards,
    auditLogs,

    activeDistrict,
    activeRole,
    activeProject,
    selectedParcel,
    selectedParcelId,
    setSelectedParcelId,

    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,

    isDrawerOpen,
    setIsDrawerOpen,
    drawerType,
    setDrawerType,
    openParcelDrawer,
    openProjectDrawer,
    openAuditDrawer,

    isSearchOpen,
    setIsSearchOpen,
    isAwardModalOpen,
    setIsAwardModalOpen,
    awardModalData,
    setAwardModalData,
    isNoticeModalOpen,
    setIsNoticeModalOpen,
    noticeModalData,
    setNoticeModalData,
    isDelegationModalOpen,
    setIsDelegationModalOpen,

    handleUpdateFormI,
    handleCreateDelegation,
    handleRecordSection13Damage,
    handleSection15Decision,
    handleForwardRnrScheme,
    handleVerifyClaim,
    handleEnforceAward,
    handleTakePossession,
    handleDepositAuthority,

    onSwitchWorkspace
  };

  return (
    <DistrictCollectorContext.Provider value={value}>
      {children}
    </DistrictCollectorContext.Provider>
  );
}

export function useDistrictCollector() {
  const ctx = useContext(DistrictCollectorContext);
  if (!ctx) {
    throw new Error('useDistrictCollector must be used within a DistrictCollectorProvider');
  }
  return ctx;
}
