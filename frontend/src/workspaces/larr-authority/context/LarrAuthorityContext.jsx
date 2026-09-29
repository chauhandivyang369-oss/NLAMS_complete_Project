import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  MASTER_LARR_CASES, 
  MASTER_CAUSE_LIST_TODAY, 
  MASTER_EXHIBITS, 
  MASTER_ORDER_SHEETS, 
  MASTER_ESCROW_ACCOUNTS, 
  MASTER_LARR_AUDIT_LOGS,
  STATUTORY_RULE_CONFIG,
  larrAuthorityService 
} from '../services/larrAuthorityService.js';

const LarrAuthorityContext = createContext(null);

export const LARR_ROLES = {
  PRESIDING_OFFICER: {
    id: 'PRESIDING_OFFICER',
    label: 'Presiding Officer',
    badge: 'JUDICIAL APEX',
    color: 'bg-emerald-600',
    description: 'Hon\'ble Presiding Officer (District Judge rank) - Full judicial decision-making authority over all 10 menus under RFCTLARR Act 2013.'
  },
  REGISTRAR: {
    id: 'REGISTRAR',
    label: 'Registrar',
    badge: 'REGISTRY HEAD',
    color: 'bg-[#1B365D]',
    description: 'Registrar (Senior Judicial Service) - Inward scrutiny, summons, defect handling, cause list scheduling, appeal registry.'
  },
  JUDICIAL_CLERK: {
    id: 'JUDICIAL_CLERK',
    label: 'Judicial Clerk',
    badge: 'BENCH CLERK',
    color: 'bg-amber-600',
    description: 'Bench Clerk & Evidence Custodian - Exhibit indexing, order sheet recording, summons service tracking, witness log.'
  },
  APPROPRIATE_GOVERNMENT: {
    id: 'APPROPRIATE_GOVERNMENT',
    label: 'Appropriate Govt (Monitoring)',
    badge: 'READ-ONLY OVERSIGHT',
    color: 'bg-slate-700',
    description: 'Central / State Executive Oversight - Read-only monitoring of pendency, 180-day SLA compliance, and tribunal performance without judicial interference.'
  }
};

export function LarrAuthorityProvider({ children }) {
  // Current logged in judicial role
  const [currentRole, setCurrentRole] = useState('PRESIDING_OFFICER'); // 'PRESIDING_OFFICER' | 'REGISTRAR' | 'JUDICIAL_CLERK' | 'APPROPRIATE_GOVERNMENT'
  
  // Active primary menu (1 to 10 strictly)
  const [activeMenu, setActiveMenu] = useState('dashboard'); // 'dashboard', 'inward', 'summons', 'pleadings', 'courtroom', 'award-engine', 'escrow', 'sla', 'appeal-execution', 'audit'

  // Master cases list
  const [cases, setCases] = useState(MASTER_LARR_CASES);

  // Persistent Selected Case for Case Context Header across all 10 menus
  const [selectedCaseId, setSelectedCaseId] = useState('LARR/2026/GJ/001');

  // Currently selected case object
  const selectedCase = useMemo(() => {
    return cases.find(c => c.caseId === selectedCaseId) || cases[0] || null;
  }, [cases, selectedCaseId]);

  // Cause List, Exhibits, Orders, Escrow, Audit
  const [causeList, setCauseList] = useState(MASTER_CAUSE_LIST_TODAY);
  const [exhibits, setExhibits] = useState(MASTER_EXHIBITS);
  const [orderSheets, setOrderSheets] = useState(MASTER_ORDER_SHEETS);
  const [escrowAccounts, setEscrowAccounts] = useState(MASTER_ESCROW_ACCOUNTS);
  const [auditLogs, setAuditLogs] = useState(MASTER_LARR_AUDIT_LOGS);

  // UI state: Search modal, right panel, mobile sidebar, toast
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Global Toast Dispatcher
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Add Immutable Audit Log
  const addAuditLog = (logEntry) => {
    const newLog = {
      auditId: `AUD-LARR-2026-${String(auditLogs.length + 101).padStart(4, '0')}`,
      caseId: selectedCaseId,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actorName: LARR_ROLES[currentRole].label,
      role: currentRole,
      ipAddress: '10.14.88.22 (Judicial Secure Terminal)',
      dscHash: `SHA256: ${Math.random().toString(36).substring(2, 15)}...`,
      ...logEntry
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Switch Active Case
  const selectCaseById = (id) => {
    const found = cases.find(c => c.caseId === id);
    if (found) {
      setSelectedCaseId(id);
      showToast(`Active Case switched to ${found.caseId} (${found.claimantName.split(' ')[0]})`, 'info');
    }
  };

  // Register New Case (Registrar action)
  const registerCase = (caseId, registeredNumber) => {
    setCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          stage: 'CASE_REGISTERED',
          status: 'Case Registered on National Judicial Ledger; Summons Ready for Issuance',
          registrationDate: new Date().toLocaleDateString('en-GB')
        };
      }
      return c;
    }));
    addAuditLog({
      action: 'CASE_REGISTERED',
      entityType: 'LARR_CASE',
      entityId: caseId,
      description: `Case ${caseId} registered under Section 64 after scrutiny.`
    });
    showToast(`Case ${caseId} officially registered!`, 'success');
  };

  // Pass Judicial Order Sheet (Presiding Officer action)
  const recordOrderSheet = (orderData) => {
    const newOrder = {
      orderId: `ORD-LARR-GJ-2026-${String(orderSheets.length + 1).padStart(3, '0')}`,
      caseId: selectedCaseId,
      hearingDate: new Date().toLocaleDateString('en-GB'),
      presidingOfficer: selectedCase?.presidingOfficer || 'Hon\'ble Presiding Officer',
      isSigned: true,
      signedBy: 'Hon\'ble Presiding Officer',
      signedTimestamp: new Date().toLocaleString('en-IN') + ' IST',
      signatureHash: `DSC-GOV-IN-LARR-2026-${Math.floor(1000 + Math.random() * 9000)}-OK`,
      status: 'FINAL_IMMUTABLE',
      ...orderData
    };
    setOrderSheets(prev => [newOrder, ...prev]);
    addAuditLog({
      action: 'ORDER_RECORDED',
      entityType: 'ORDER_SHEET',
      entityId: newOrder.orderId,
      description: `Judicial Order sheet recorded for case ${selectedCaseId}: ${orderData.orderType}`
    });
    showToast(`Order sheet ${newOrder.orderId} recorded & e-Signed!`, 'success');
  };

  // Sign & Issue Section 69 Award Decree
  const signAndIssueAward = (caseId, awardDetails) => {
    setCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          stage: 'AWARD_SIGNED',
          status: 'Section 69 Award Decree Pronounced & e-Signed; Notice Issued to Collector for Deposit',
          enhancedAwardPreview: awardDetails
        };
      }
      return c;
    }));
    addAuditLog({
      action: 'AWARD_DECREE_PRONOUNCED',
      entityType: 'SECTION_69_AWARD',
      entityId: `AWARD-SEC69-${caseId.replace(/\//g, '-')}`,
      description: `Section 69 Enhanced Award Decree pronounced for ₹${awardDetails.netDifferentialCr} Cr differential.`
    });
    showToast(`Section 69 Award Decree for ${caseId} formally pronounced & e-Signed!`, 'success');
  };

  // RBAC permissions helper
  const permissions = useMemo(() => {
    return {
      canPassOrders: currentRole === 'PRESIDING_OFFICER',
      canSignAward: currentRole === 'PRESIDING_OFFICER',
      canApproveApportionment: currentRole === 'PRESIDING_OFFICER',
      canScrutinizeInward: currentRole === 'REGISTRAR' || currentRole === 'PRESIDING_OFFICER',
      canIssueSummons: currentRole === 'REGISTRAR' || currentRole === 'PRESIDING_OFFICER',
      canRegisterCase: currentRole === 'REGISTRAR' || currentRole === 'PRESIDING_OFFICER',
      canUploadEvidence: currentRole !== 'APPROPRIATE_GOVERNMENT',
      canManageEscrow: currentRole === 'PRESIDING_OFFICER' || currentRole === 'REGISTRAR',
      isMonitoringOnly: currentRole === 'APPROPRIATE_GOVERNMENT'
    };
  }, [currentRole]);

  const value = {
    currentRole,
    setCurrentRole,
    activeMenu,
    setActiveMenu,
    cases,
    setCases,
    selectedCaseId,
    setSelectedCaseId,
    selectedCase,
    selectCaseById,
    causeList,
    setCauseList,
    exhibits,
    setExhibits,
    orderSheets,
    setOrderSheets,
    escrowAccounts,
    setEscrowAccounts,
    auditLogs,
    addAuditLog,
    isSearchOpen,
    setIsSearchOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toastMessage,
    showToast,
    registerCase,
    recordOrderSheet,
    signAndIssueAward,
    permissions,
    statutoryRuleConfig: STATUTORY_RULE_CONFIG,
    calculateSection69Award: larrAuthorityService.calculateSection69Award
  };

  return (
    <LarrAuthorityContext.Provider value={value}>
      {children}
    </LarrAuthorityContext.Provider>
  );
}

export function useLarrAuthority() {
  const context = useContext(LarrAuthorityContext);
  if (!context) {
    throw new Error('useLarrAuthority must be used within a LarrAuthorityProvider');
  }
  return context;
}
