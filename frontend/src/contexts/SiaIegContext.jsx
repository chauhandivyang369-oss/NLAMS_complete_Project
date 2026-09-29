import React, { createContext, useContext, useState } from 'react';

const SiaIegContext = createContext(null);

export const SIA_IEG_MENUS = [
  // Group 1: SIA OPERATIONS
  {
    id: 'sia-overview',
    number: '01',
    title: 'SIA Executive Overview',
    route: '/sia-ieg/overview',
    group: 'SIA OPERATIONS',
    roleView: 'SIA'
  },
  {
    id: 'survey-impact-census',
    number: '02',
    title: 'Survey & Impact Census',
    route: '/sia-ieg/survey-impact-census',
    group: 'SIA OPERATIONS',
    roleView: 'SIA'
  },
  {
    id: 'public-hearing',
    number: '03',
    title: 'Section 5 — Public Hearing',
    route: '/sia-ieg/public-hearing',
    group: 'SIA OPERATIONS',
    roleView: 'SIA'
  },
  {
    id: 'simp-builder',
    number: '04',
    title: 'Section 6 — SIMP Builder',
    route: '/sia-ieg/simp',
    group: 'SIA OPERATIONS',
    roleView: 'SIA'
  },
  {
    id: 'final-sia-report',
    number: '05',
    title: 'Final SIA Report & Publication',
    route: '/sia-ieg/final-report',
    group: 'SIA OPERATIONS',
    roleView: 'SIA'
  },
  // Group 2: IEG EVALUATION
  {
    id: 'ieg-dashboard',
    number: '06',
    title: 'IEG Appraisal Dashboard',
    route: '/sia-ieg/ieg-dashboard',
    group: 'IEG EVALUATION',
    roleView: 'IEG'
  },
  {
    id: 'sia-review',
    number: '07',
    title: 'SIA Review & Evidence',
    route: '/sia-ieg/sia-review',
    group: 'IEG EVALUATION',
    roleView: 'IEG'
  },
  {
    id: 'statutory-appraisal',
    number: '08',
    title: 'Section 7 — Statutory Appraisal',
    route: '/sia-ieg/statutory-appraisal',
    group: 'IEG EVALUATION',
    roleView: 'IEG'
  },
  {
    id: 'final-recommendation',
    number: '09',
    title: 'Final Recommendation & Audit',
    route: '/sia-ieg/final-recommendation',
    group: 'IEG EVALUATION',
    roleView: 'IEG'
  }
];

export function SiaIegProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState('sia-overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRole, setCurrentRole] = useState('SIA_AGENCY'); // 'SIA_AGENCY' or 'IEG_EXPERT'
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const value = {
    activeMenu,
    setActiveMenu,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    currentRole,
    setCurrentRole,
    isNotificationOpen,
    setIsNotificationOpen,
    isHelpOpen,
    setIsHelpOpen,
    isProfileOpen,
    setIsProfileOpen,
    menus: SIA_IEG_MENUS
  };

  return (
    <SiaIegContext.Provider value={value}>
      {children}
    </SiaIegContext.Provider>
  );
}

export function useSiaIeg() {
  const context = useContext(SiaIegContext);
  if (!context) {
    throw new Error('useSiaIeg must be used within a SiaIegProvider');
  }
  return context;
}
