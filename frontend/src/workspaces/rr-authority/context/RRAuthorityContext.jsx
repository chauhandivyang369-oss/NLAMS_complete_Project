import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  RR_MASTER_PROJECTS, 
  SEED_AFFECTED_FAMILIES, 
  SECOND_SCHEDULE_RULES, 
  THIRD_SCHEDULE_FACILITIES, 
  SC_ST_DEVELOPMENT_PLAN_DATA, 
  SECTION_16_5_PUBLIC_HEARING, 
  RESETTLEMENT_PLOTS_MASTER, 
  DBT_DISBURSEMENT_RECORDS, 
  SECTION_18_APPROVAL_PACKAGE, 
  RR_IMMUTABLE_AUDIT_LOGS 
} from '../services/rrAuthorityService.js';
import { rrEventBus } from '../services/rrEventBus.js';

const RRAuthorityContext = createContext(null);

export const RR_ALL_MENUS = [
  // Administrator Menus (1 to 7)
  {
    id: 'rr-dashboard',
    number: '01',
    title: 'R&R Administrator Executive Dashboard',
    shortTitle: 'Executive Dashboard',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'Section 43 & Section 16'
  },
  {
    id: 'affected-families',
    number: '02',
    title: 'Affected Families Census & Digital Survey Manager',
    shortTitle: 'Families Census & Survey',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'Section 16(1) & Form IV'
  },
  {
    id: 'rr-scheme-builder',
    number: '03',
    title: 'Draft R&R Scheme Builder',
    shortTitle: 'Draft Scheme Builder',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'Section 16(2) & Sched II/III'
  },
  {
    id: 'sc-st-plan-builder',
    number: '04',
    title: 'SC / ST Specialized Development Plan Builder',
    shortTitle: 'SC / ST Development Plan',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'Section 41 Statutory Safeguards'
  },
  {
    id: 'public-hearing',
    number: '05',
    title: 'Section 16(5) Public Hearing & Objections Log',
    shortTitle: 'Public Hearing & Objections',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'Section 16(5) Gram Sabha Log'
  },
  {
    id: 'rr-allotment',
    number: '06',
    title: 'R&R Award Execution & Physical Allotment Desk',
    shortTitle: 'Allotment & Resettlement Desk',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'Section 31 & Colony GIS'
  },
  {
    id: 'rr-dbt',
    number: '07',
    title: 'PFMS Direct Bank Transfer (DBT) Disbursement Desk',
    shortTitle: 'PFMS DBT Disbursement',
    roleCategory: 'ADMINISTRATOR',
    statutoryRef: 'PFMS / APB Aadhaar Credit'
  },

  // Commissioner Menus (8 to 10)
  {
    id: 'commissioner-approval',
    number: '08',
    title: 'R&R Commissioner Master Approval & Sanction Desk',
    shortTitle: 'Commissioner Sanction Desk',
    roleCategory: 'COMMISSIONER',
    statutoryRef: 'Section 18 & Section 44'
  },
  {
    id: 'rr-monitoring',
    number: '09',
    title: 'State / Central R&R Monitoring & Compliance Dashboard',
    shortTitle: 'State Monitoring Dashboard',
    roleCategory: 'COMMISSIONER',
    statutoryRef: 'High-Level Oversight & GIS'
  },
  {
    id: 'rr-audit-vault',
    number: '10',
    title: 'Inter-Agency Audit & Statutory Reporting Vault',
    shortTitle: 'Audit & Statutory Reporting',
    roleCategory: 'COMMISSIONER',
    statutoryRef: 'NMC / SMC / Sec 45 Feeds'
  }
];

export function RRAuthorityProvider({ children }) {
  // Roles: 'ADMINISTRATOR', 'COMMISSIONER', or 'DUAL_CHARGE'
  const [currentRole, setCurrentRole] = useState('ADMINISTRATOR');
  const [activeMenu, setActiveMenu] = useState('rr-dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState('NLAMS-PRJ-2026-0042');

  // UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return true;
  });
  const [activeRightTab, setActiveRightTab] = useState('alerts'); // 'alerts', 'countdown', 'actions', 'checklist', 'audit'

  // Global ULPIN Search Modal state
  const [isUlpinSearchModalOpen, setIsUlpinSearchModalOpen] = useState(false);
  const [searchUlpinQuery, setSearchUlpinQuery] = useState('');
  const [searchedUlpinResult, setSearchedUlpinResult] = useState(null);

  // Reusable Modals
  const [documentModal, setDocumentModal] = useState({ isOpen: false, doc: null });
  const [evidenceModal, setEvidenceModal] = useState({ isOpen: false, evidence: null });
  const [eSignModal, setESignModal] = useState({ isOpen: false, context: null, onSignComplete: null });
  const [auditDrawer, setAuditDrawer] = useState({ isOpen: false, record: null });

  // Data state
  const [projects] = useState(RR_MASTER_PROJECTS);
  const [families, setFamilies] = useState(SEED_AFFECTED_FAMILIES);
  const [secondScheduleRules] = useState(SECOND_SCHEDULE_RULES);
  const [thirdScheduleFacilities, setThirdScheduleFacilities] = useState(THIRD_SCHEDULE_FACILITIES);
  const [scStPlan, setScStPlan] = useState(SC_ST_DEVELOPMENT_PLAN_DATA);
  const [publicHearing, setPublicHearing] = useState(SECTION_16_5_PUBLIC_HEARING);
  const [plots, setPlots] = useState(RESETTLEMENT_PLOTS_MASTER);
  const [dbtRecords, setDbtRecords] = useState(DBT_DISBURSEMENT_RECORDS);
  const [approvalPackage, setApprovalPackage] = useState(SECTION_18_APPROVAL_PACKAGE);
  const [auditLogs, setAuditLogs] = useState(RR_IMMUTABLE_AUDIT_LOGS);

  // Active Project Context
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // Dynamic Menus filtered strictly by RBAC
  const visibleMenus = useMemo(() => {
    if (currentRole === 'ADMINISTRATOR') {
      return RR_ALL_MENUS.filter(m => m.roleCategory === 'ADMINISTRATOR');
    }
    if (currentRole === 'COMMISSIONER') {
      return RR_ALL_MENUS.filter(m => m.roleCategory === 'COMMISSIONER');
    }
    // DUAL_CHARGE sees all 10 menus
    return RR_ALL_MENUS;
  }, [currentRole]);

  // Handler to switch role and set sensible default menu if needed
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'COMMISSIONER' && !['commissioner-approval', 'rr-monitoring', 'rr-audit-vault'].includes(activeMenu)) {
      setActiveMenu('commissioner-approval');
    } else if (newRole === 'ADMINISTRATOR' && ['commissioner-approval', 'rr-monitoring', 'rr-audit-vault'].includes(activeMenu)) {
      setActiveMenu('rr-dashboard');
    }
  };

  // Global ULPIN Search Handler
  const executeUlpinSearch = (ulpinQuery) => {
    const query = ulpinQuery ? ulpinQuery.trim().toUpperCase() : '';
    setSearchUlpinQuery(query);
    if (!query) {
      setSearchedUlpinResult(null);
      return;
    }

    const matchedFamily = families.find(f => 
      f.ulpin?.toUpperCase().includes(query) ||
      f.surveyNumber?.toUpperCase().includes(query) ||
      f.familyId?.toUpperCase().includes(query) ||
      f.headName?.toUpperCase().includes(query)
    ) || families[0];

    setSearchedUlpinResult({
      ulpin: matchedFamily.ulpin,
      surveyNumber: matchedFamily.surveyNumber,
      family: matchedFamily,
      project: selectedProject,
      plot: plots.find(p => p.allottedFamilyId === matchedFamily.familyId),
      dbtRecords: dbtRecords.filter(d => d.familyId === matchedFamily.familyId)
    });
    setIsUlpinSearchModalOpen(true);
  };

  // Add audit log helper
  const addAuditLog = (action, entity, oldValue, newValue, docName) => {
    const newRecord = {
      auditId: `AUD-RR-${String(auditLogs.length + 1).padStart(3, '0')}`,
      user: currentRole === 'COMMISSIONER' ? selectedProject.commissionerName : selectedProject.administratorName,
      role: currentRole === 'COMMISSIONER' ? 'R&R Commissioner' : 'R&R Administrator',
      action,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      ip: '10.24.88.12 (Govt Secured WAN)',
      entity,
      oldValue,
      newValue,
      document: docName || 'Certified_Record.pdf',
      signatureStatus: 'e-Signed (DSC Token Valid)'
    };
    setAuditLogs(prev => [newRecord, ...prev]);
    return newRecord;
  };

  const value = {
    currentRole,
    setCurrentRole: handleRoleChange,
    activeMenu,
    setActiveMenu,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    visibleMenus,
    allMenus: RR_ALL_MENUS,

    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    activeRightTab,
    setActiveRightTab,

    // Global Search
    isUlpinSearchModalOpen,
    setIsUlpinSearchModalOpen,
    searchUlpinQuery,
    searchedUlpinResult,
    executeUlpinSearch,

    // Modals
    documentModal,
    setDocumentModal,
    evidenceModal,
    setEvidenceModal,
    eSignModal,
    setESignModal,
    auditDrawer,
    setAuditDrawer,

    // Data Collections & Setters
    projects,
    families,
    setFamilies,
    secondScheduleRules,
    thirdScheduleFacilities,
    setThirdScheduleFacilities,
    scStPlan,
    setScStPlan,
    publicHearing,
    setPublicHearing,
    plots,
    setPlots,
    dbtRecords,
    setDbtRecords,
    approvalPackage,
    setApprovalPackage,
    auditLogs,
    addAuditLog,

    // Event Bus
    emitEvent: (eventType, payload) => rrEventBus.publish(eventType, {
      projectId: selectedProjectId,
      ...payload
    })
  };

  return (
    <RRAuthorityContext.Provider value={value}>
      {children}
    </RRAuthorityContext.Provider>
  );
}

export function useRRAuthority() {
  const context = useContext(RRAuthorityContext);
  if (!context) {
    throw new Error('useRRAuthority must be used within an RRAuthorityProvider');
  }
  return context;
}
