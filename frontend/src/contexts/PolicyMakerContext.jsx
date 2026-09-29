import React, { createContext, useContext, useState, useMemo } from 'react';
import { COMMITTEE_ROLES, hasPolicyMakerPermission } from '../permissions/policyMakerPermissions.js';
import {
  POLICY_MAKER_PROJECTS,
  POLICY_MAKER_KPIS,
  MOCK_SLA_ALERTS,
  MOCK_COMMITTEE_MEETINGS,
  MOCK_DIRECTIVES,
  MOCK_BOTTLENECKS,
  MOCK_RNR_DATA,
  MOCK_EXECUTIVE_REPORTS
} from '../mock/policyMakerData.js';

const PolicyMakerContext = createContext(null);

export function PolicyMakerProvider({ children }) {
  // Master active module in 8-module sidebar
  const [activeModule, setActiveModule] = useState('executive-overview');
  const [activeSubPage, setActiveSubPage] = useState('dashboard');

  // RBAC Committee Sub-role simulation (APEX, NMC, SMC, PROJECT_RR)
  const [committeeRole, setCommitteeRole] = useState('APEX');

  // Active Project (Anchor: PRJ-2026-GJ05)
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-2026-GJ05');
  const [selectedMeetingId, setSelectedMeetingId] = useState('MTG-2026-NMC-03');
  const [selectedDirectiveId, setSelectedDirectiveId] = useState('DIR-2026-NMC-014');
  const [selectedBottleneckId, setSelectedBottleneckId] = useState('BTN-2026-081');

  // Drawers and Modals
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(true);
  const [isProjectIntelligenceOpen, setIsProjectIntelligenceOpen] = useState(false);
  const [intelligenceProjectId, setIntelligenceProjectId] = useState('PRJ-2026-GJ05');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic Data Lists (can be filtered/modified in-memory for demo)
  const [projects, setProjects] = useState(POLICY_MAKER_PROJECTS);
  const [meetings, setMeetings] = useState(MOCK_COMMITTEE_MEETINGS);
  const [directives, setDirectives] = useState(MOCK_DIRECTIVES);
  const [bottlenecks, setBottlenecks] = useState(MOCK_BOTTLENECKS);
  const [reports, setReports] = useState(MOCK_EXECUTIVE_REPORTS);

  // Role Configuration
  const currentRoleConfig = useMemo(() => {
    return COMMITTEE_ROLES[committeeRole] || COMMITTEE_ROLES.APEX;
  }, [committeeRole]);

  // Current scope based on role
  const effectiveScope = useMemo(() => {
    if (committeeRole === 'SMC') return 'STATE (Gujarat)';
    if (committeeRole === 'PROJECT_RR') return 'PROJECT (PRJ-2026-GJ05)';
    if (committeeRole === 'NMC') return 'NATIONAL / INTER-STATE';
    return 'NATIONAL (All States)';
  }, [committeeRole]);

  // Selected project object
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // Selected project for intelligence drawer
  const intelligenceProject = useMemo(() => {
    return projects.find(p => p.id === intelligenceProjectId) || selectedProject;
  }, [projects, intelligenceProjectId, selectedProject]);

  // Selected meeting object
  const selectedMeeting = useMemo(() => {
    return meetings.find(m => m.id === selectedMeetingId) || meetings[0];
  }, [meetings, selectedMeetingId]);

  // Filtered projects according to scope
  const scopedProjects = useMemo(() => {
    if (committeeRole === 'SMC') {
      return projects.filter(p => p.state.includes('Gujarat'));
    }
    if (committeeRole === 'PROJECT_RR') {
      return projects.filter(p => p.id === 'PRJ-2026-GJ05');
    }
    return projects;
  }, [projects, committeeRole]);

  // Toast Notification helper
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Open Project Intelligence Drawer for any project
  const openProjectIntelligence = (projId = null) => {
    if (projId) {
      setIntelligenceProjectId(projId);
      setSelectedProjectId(projId);
    }
    setIsProjectIntelligenceOpen(true);
  };

  const closeProjectIntelligence = () => {
    setIsProjectIntelligenceOpen(false);
  };

  // Change Committee Role
  const switchCommitteeRole = (roleKey) => {
    if (COMMITTEE_ROLES[roleKey]) {
      setCommitteeRole(roleKey);
      if (roleKey === 'PROJECT_RR') {
        setSelectedProjectId('PRJ-2026-GJ05');
      }
      showToast(`Switched to ${COMMITTEE_ROLES[roleKey].name} (${COMMITTEE_ROLES[roleKey].scope} Scope)`);
    }
  };

  // Check permission helper
  const canAccess = (permissionKey) => {
    return hasPolicyMakerPermission(committeeRole, permissionKey);
  };

  // Add directive / escalate bottleneck handlers for simulation
  const addDirective = (newDirective) => {
    setDirectives(prev => [newDirective, ...prev]);
    showToast(`Directive ${newDirective.id} successfully recorded and dispatched.`);
  };

  const updateBottleneckStatus = (btnId, newStatus, note = '') => {
    setBottlenecks(prev => prev.map(btn => {
      if (btn.id === btnId) {
        return {
          ...btn,
          status: newStatus,
          notes: note ? [note, ...btn.notes] : btn.notes
        };
      }
      return btn;
    }));
    showToast(`Bottleneck ${btnId} updated to: ${newStatus}`);
  };

  const value = {
    activeModule,
    setActiveModule,
    activeSubPage,
    setActiveSubPage,
    committeeRole,
    setCommitteeRole,
    switchCommitteeRole,
    currentRoleConfig,
    effectiveScope,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    intelligenceProjectId,
    intelligenceProject,
    openProjectIntelligence,
    closeProjectIntelligence,
    isProjectIntelligenceOpen,
    selectedMeetingId,
    setSelectedMeetingId,
    selectedMeeting,
    selectedDirectiveId,
    setSelectedDirectiveId,
    selectedBottleneckId,
    setSelectedBottleneckId,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    searchTerm,
    setSearchTerm,
    isNotificationOpen,
    setIsNotificationOpen,
    toastMessage,
    showToast,
    scopedProjects,
    projects: scopedProjects,
    allProjects: projects,
    meetings,
    setMeetings,
    directives,
    addDirective,
    bottlenecks,
    updateBottleneckStatus,
    reports,
    slaAlerts: MOCK_SLA_ALERTS,
    kpis: POLICY_MAKER_KPIS,
    rnrData: MOCK_RNR_DATA,
    canAccess
  };

  return (
    <PolicyMakerContext.Provider value={value}>
      {children}
    </PolicyMakerContext.Provider>
  );
}

export function usePolicyMaker() {
  const context = useContext(PolicyMakerContext);
  if (!context) {
    throw new Error('usePolicyMaker must be used within a PolicyMakerProvider');
  }
  return context;
}
