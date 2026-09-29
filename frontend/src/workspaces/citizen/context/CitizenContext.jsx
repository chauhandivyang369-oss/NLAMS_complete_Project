import React, { createContext, useContext, useState, useEffect } from 'react';
import { citizenService } from '../services/citizenService.js';
import { DEMO_CITIZENS, MOCK_PROJECTS } from '../services/citizenMockData.js';

const CitizenContext = createContext(null);

export function CitizenProvider({ children, onSwitchWorkspace }) {
  const [citizenKey, setCitizenKey] = useState('citizenA');
  const [activeCitizen, setActiveCitizen] = useState(DEMO_CITIZENS.citizenA);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [activeParcel, setActiveParcel] = useState(null);
  
  // Exactly 10 Menus: '01' to '10'
  const [activeMenu, setActiveMenu] = useState('01');
  
  // Project detail micro-universe mode
  const [isProjectWorkspaceOpen, setIsProjectWorkspaceOpen] = useState(false);
  const [projectContextTab, setProjectContextTab] = useState('overview');

  // Drawers and Modals
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [activeDocModal, setActiveDocModal] = useState(null);
  const [isHelpDeskOpen, setIsHelpDeskOpen] = useState(false);

  // Localization
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'gu'

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync citizen change
  useEffect(() => {
    citizenService.setCitizen(citizenKey);
    const citizen = DEMO_CITIZENS[citizenKey] || DEMO_CITIZENS.citizenA;
    setActiveCitizen(citizen);
    
    // Load projects for this citizen
    const matchedProjects = MOCK_PROJECTS.filter(p => citizen.linkedProjectIds.includes(p.id));
    setProjects(matchedProjects);
    
    // Default active project & parcel
    if (matchedProjects.length > 0) {
      setActiveProject(matchedProjects[0]);
    } else {
      setActiveProject(null);
    }
    
    if (citizen.linkedParcels?.length > 0) {
      setActiveParcel(citizen.linkedParcels[0]);
    } else {
      setActiveParcel(null);
    }
  }, [citizenKey]);

  // Open Project Workspace micro-universe
  const openProjectWorkspace = (project, tab = 'overview') => {
    setActiveProject(project);
    setIsProjectWorkspaceOpen(true);
    setProjectContextTab(tab);
    
    // Map project tab to corresponding menu if desired
    const tabToMenuMap = {
      overview: '01',
      parcels: '02',
      notifications: '03',
      hearings: '04',
      objections: '05',
      survey: '06',
      claims: '07',
      rnr: '08',
      compensation: '07',
      payments: '09',
      legal: '10'
    };
    if (tabToMenuMap[tab]) {
      setActiveMenu(tabToMenuMap[tab]);
    }
  };

  // Close Project Workspace (back to Container Hub)
  const closeProjectWorkspace = () => {
    setIsProjectWorkspaceOpen(false);
    setActiveMenu('01');
  };

  // Jump from right action panel or alert to target module
  const navigateToAction = (menuId, projectId = null, extraState = {}) => {
    if (projectId) {
      const proj = projects.find(p => p.id === projectId);
      if (proj) {
        setActiveProject(proj);
        setIsProjectWorkspaceOpen(true);
      }
    }
    setActiveMenu(menuId);
    if (extraState.tab) {
      setProjectContextTab(extraState.tab);
    }
    setIsRightPanelOpen(false);
  };

  return (
    <CitizenContext.Provider
      value={{
        citizenKey,
        setCitizenKey,
        activeCitizen,
        projects,
        activeProject,
        setActiveProject,
        activeParcel,
        setActiveParcel,
        activeMenu,
        setActiveMenu,
        isProjectWorkspaceOpen,
        setIsProjectWorkspaceOpen,
        projectContextTab,
        setProjectContextTab,
        openProjectWorkspace,
        closeProjectWorkspace,
        navigateToAction,
        isRightPanelOpen,
        setIsRightPanelOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isProfileDrawerOpen,
        setIsProfileDrawerOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        activeDocModal,
        setActiveDocModal,
        isHelpDeskOpen,
        setIsHelpDeskOpen,
        language,
        setLanguage,
        toastMessage,
        showToast,
        onSwitchWorkspace
      }}
    >
      {children}
    </CitizenContext.Provider>
  );
}

export function useCitizen() {
  const context = useContext(CitizenContext);
  if (!context) {
    throw new Error('useCitizen must be used within a CitizenProvider');
  }
  return context;
}
