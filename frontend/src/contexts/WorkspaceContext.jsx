import React, { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_PROJECTS, MOCK_PARCELS, MOCK_OBJECTIONS, MOCK_RNR_FAMILIES, MOCK_DOCUMENTS, MOCK_AUDIT_LOGS } from '../mock/requisitions.js';
import { USER_OFFICER_PROFILE } from '../constants/index.js';
import { PiaDelegationService } from '../services/piaDelegationService.js';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState('REQ-2025-NHAI-041');
  const [selectedParcelId, setSelectedParcelId] = useState('PARCEL-002');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiDrawerPrompt, setAiDrawerPrompt] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  
  // Dynamic collections that can be updated in state
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [parcels, setParcels] = useState(MOCK_PARCELS);
  const [objections, setObjections] = useState(MOCK_OBJECTIONS);
  const [rnrFamilies, setRnrFamilies] = useState(MOCK_RNR_FAMILIES);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [auditLogs, setAuditLogs] = useState(MOCK_AUDIT_LOGS);

  // Form-I Draft state
  const [formIDraft, setFormIDraft] = useState({
    executingAgency: 'National Highways Authority of India (NHAI)',
    projectName: 'Delhi-Amritsar-Katra Expressway (Chainage 84.5 to 142.2)',
    purpose: 'National Highway Corridor - 6-Lane Access-Controlled Expressway',
    state: 'Punjab',
    district: 'Patiala',
    tehsil: 'Rajpura',
    villages: ['Sultanpur Khurd', 'Fatehpur Gujran', 'Bahadurgarh Patti'],
    extentRequiredHa: 342.85,
    publicPurposeClause: 'Sec 2(1)(a) - Strategic, Infrastructure & Transportation Corridors',
    isLinearProject: true,
    isUrgencyInvoked: false,
    multiCropRestrictionCheck: 'Less than 15% net cultivated area of district - Compliant under Sec 10(2)',
    estimatedCostCr: 685.50,
    administrativeChargeCr: 68.55,
    pfmsAccountNo: 'PFMS-NHAI-ESCROW-00982',
    currentWizardStep: 1,
    status: 'Draft in Progress'
  });

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  const selectedParcel = useMemo(() => {
    return parcels.find(p => p.id === selectedParcelId) || parcels[0];
  }, [parcels, selectedParcelId]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const openAiAssistant = (initialPrompt = '') => {
    setAiDrawerPrompt(initialPrompt);
    setIsAiDrawerOpen(true);
  };

  const closeAiAssistant = () => {
    setIsAiDrawerOpen(false);
  };

  const depositEscrow = (amountCr) => {
    const updated = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          escrowDepositedCr: p.escrowDepositedCr + Number(amountCr)
        };
      }
      return p;
    });
    setProjects(updated);
    
    const newLog = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      officer: USER_OFFICER_PROFILE.name,
      action: 'Escrow Replenishment',
      details: `Deposited ₹${amountCr} Cr into CALA District Treasury Account for ${activeProject.code}`,
      status: 'PFMS Synced',
      hash: 'sha256:' + Math.random().toString(36).substring(2, 10)
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast(`Successfully deposited ₹${amountCr} Cr in CALA statutory escrow via PFMS`);
  };

  const resolveObjection = (objectionId, resolutionNote) => {
    setObjections(prev => prev.map(obj => {
      if (obj.id === objectionId) {
        return {
          ...obj,
          status: 'Resolved by CALA Order',
          officerRemarks: resolutionNote || 'Speaking order entered by Requisitioning Body and CALA.'
        };
      }
      return obj;
    }));
    showToast(`Objection ${objectionId} updated with speaking order.`);
  };

  const registerForm1Submission = (formData, receipt) => {
    const docketId = receipt?.docketId || `NLAMS-REQ-2026-FORM1-${Date.now().toString().slice(-5)}`;
    
    // Register in PiaDelegationService to persist PIA configuration and audit trail
    const piaConfig = PiaDelegationService.registerSubmittedForm1Pia(formData, {
      ...receipt,
      docketId
    });

    const primaryDistrict = formData.selectedDistricts?.[0] || 'Anand';
    const cleanDistCode = primaryDistrict.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);

    const newProject = {
      id: docketId,
      code: `REQ-2026-${cleanDistCode}-${Date.now().toString().slice(-3)}`,
      name: formData.projectTitle || formData.projectName || 'Petlad-Sunav Bypass & Freight Corridor',
      executingAgency: formData.requisitioningBodyName || 'Roads & Buildings Department, Govt of Gujarat',
      ministry: formData.departmentMinistry || 'Ministry of Road Transport & Highways / State PWD',
      state: formData.selectedState || 'Gujarat',
      districts: formData.selectedDistricts && formData.selectedDistricts.length > 0 ? formData.selectedDistricts : [primaryDistrict],
      tehsils: [formData.tehsil || 'Petlad'],
      villagesCount: formData.selectedParcels?.length ? Math.min(formData.selectedParcels.length, 6) : 4,
      totalAreaHa: formData.gisSummary?.totalAreaHa || 4.71,
      acquiredAreaHa: 0,
      currentStage: 'sec_4',
      stageLabel: 'Section 4(1) Form-I Transmitted to CALA',
      statutoryDeadline: '2026-12-31',
      daysRemaining: 104,
      lapseRisk: 'low',
      financialSanctionCr: Number(formData.estCompensationBudgetCr) || 12.50,
      escrowDepositedCr: 0,
      disbursedCr: 0,
      beneficiariesCount: formData.estLandownerFamilies || 4,
      displacedFamiliesCount: formData.estDisplacedFamilies || 1,
      objectionsTotal: 0,
      objectionsResolved: 0,
      gazetteStatus: 'Draft Form-I Docket Transmitted',
      gazetteNo: docketId,
      gazetteDate: new Date().toLocaleDateString('en-GB'),
      formIStatus: 'Submitted via DSC',
      surveyCadastralStatus: '100% Geo-referenced',
      isFromForm1Submission: true,
      isPiaDifferent: Boolean(formData.isPiaDifferent),
      pias: piaConfig.pias
    };

    setProjects(prev => {
      const filtered = prev.filter(p => p.id !== docketId);
      return [newProject, ...filtered];
    });

    setSelectedProjectId(docketId);

    const newLog = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      officer: USER_OFFICER_PROFILE.name,
      action: 'Form-I Sovereign Submission',
      details: `Transmitted Form-I Docket ${docketId} to CALA. Synchronized ${formData.isPiaDifferent ? (formData.pias?.length || 1) + ' PIA Entity to Menu 9' : 'Direct RB Execution'}.`,
      status: 'CALA Transmitted',
      hash: receipt?.qrSignatureSha256 || 'sha256:' + Math.random().toString(36).substring(2, 10)
    };
    setAuditLogs(prev => [newLog, ...prev]);

    if (formData.isPiaDifferent) {
      showToast(`Form-I submitted & PIA details synchronized with Menu 9 (PIA Delegation & RBAC)!`);
    } else {
      showToast(`Form-I submitted successfully to CALA.`);
    }

    return newProject;
  };

  const value = {
    activeModule,
    setActiveModule,
    selectedProjectId,
    setSelectedProjectId,
    activeProject,
    projects,
    parcels,
    selectedParcelId,
    setSelectedParcelId,
    selectedParcel,
    objections,
    resolveObjection,
    rnrFamilies,
    documents,
    auditLogs,
    formIDraft,
    setFormIDraft,
    isAiDrawerOpen,
    openAiAssistant,
    closeAiAssistant,
    aiDrawerPrompt,
    toastMessage,
    showToast,
    depositEscrow,
    registerForm1Submission,
    language,
    setLanguage,
    officer: USER_OFFICER_PROFILE
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
