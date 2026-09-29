import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  FileText,
  Users,
  AlertTriangle,
  Compass,
  Scale,
  Home,
  CreditCard,
  Building2,
  X,
  ChevronRight
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export const CITIZEN_SIDEBAR_MENUS = [
  {
    id: '01',
    num: '01',
    title: 'Executive Dashboard & Project Container Hub',
    shortTitle: 'Executive Dashboard',
    icon: LayoutDashboard,
    badge: null,
    desc: 'Multi-Project Containers & Lifecycle Status'
  },
  {
    id: '02',
    num: '02',
    title: 'My Land Parcel & Bhu-Aadhaar (ULPIN)',
    shortTitle: 'My Land & ULPIN',
    icon: MapPin,
    badge: '3 Parcels',
    desc: 'Cadastral GIS, RoR & Section 11(4) Freeze'
  },
  {
    id: '03',
    num: '03',
    title: 'Public Notifications & Gazette Vault',
    shortTitle: 'Gazette & Notices',
    icon: FileText,
    badge: 'New',
    desc: 'Sec 4, 11, 19 & Form-IV Gazette Publications'
  },
  {
    id: '04',
    num: '04',
    title: 'SIA & Public Hearing Portal',
    shortTitle: 'SIA & Public Hearing',
    icon: Users,
    badge: null,
    desc: 'Social Impact Study, Gram Sabha RSVP & SIMP'
  },
  {
    id: '05',
    num: '05',
    title: 'Section 15 Objections & Grievance Redressal',
    shortTitle: 'Sec 15 Objections',
    icon: AlertTriangle,
    badge: '42d Left',
    badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    desc: 'Online Objection Filing & Hearing Scrutiny'
  },
  {
    id: '06',
    num: '06',
    title: 'Survey, Valuation & Field Activity Tracker',
    shortTitle: 'Survey & Valuation',
    icon: Compass,
    badge: null,
    desc: 'Sec 12 Field Entry & Sec 13 Damage Assessed'
  },
  {
    id: '07',
    num: '07',
    title: 'Section 21/22 Claims & Compensation',
    shortTitle: 'Claims & Compensation',
    icon: Scale,
    badge: null,
    desc: 'Form-IV Claims & Transparent Calculation Matrix'
  },
  {
    id: '08',
    num: '08',
    title: 'R&R Scheme Entitlements & Public Hearing',
    shortTitle: 'R&R Entitlements',
    icon: Home,
    badge: null,
    desc: 'Form-V Scheme, Housing Grant & Schedule III'
  },
  {
    id: '09',
    num: '09',
    title: 'PFMS DBT & Payment Ledger',
    shortTitle: 'PFMS DBT Ledger',
    icon: CreditCard,
    badge: '₹1.48 Cr',
    badgeColor: 'bg-emerald-600 text-white',
    desc: 'Aadhaar DBT Status & Official Bank Receipts'
  },
  {
    id: '10',
    num: '10',
    title: 'LARR Tribunal Reference & Legal Appeal Tracker',
    shortTitle: 'LARR Tribunal Reference',
    icon: Building2,
    badge: 'Sec 64',
    desc: 'Tribunal Cause List & High Court Appeal'
  }
];

export default function CitizenSidebar() {
  const {
    activeMenu,
    setActiveMenu,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isProjectWorkspaceOpen,
    activeProject
  } = useCitizen();

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setIsMobileSidebarOpen(false);
  };

  const sidebarContent = (
    <div className="w-full h-full flex flex-col bg-[#1B365D] text-slate-100 border-r border-blue-900/40 select-none">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-blue-900/50 bg-[#142947] flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          <span>STATUTORY MENUS (10)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-blue-100 border border-white/20">
            CITIZEN DOCKET
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md bg-white/10 text-blue-100 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Project Micro Context Indicator (if in Project Detail mode) */}
      {isProjectWorkspaceOpen && activeProject && (
        <div className="p-3 bg-[#142947] border-b border-blue-900/50 text-xs">
          <div className="flex items-center justify-between text-[10px] text-[#C5A059] font-bold uppercase tracking-wider">
            <span>ACTIVE PROJECT CONTEXT</span>
            <span className="bg-[#12243F] text-amber-300 px-2 py-0.5 rounded font-mono border border-blue-900/60">
              {activeProject.id}
            </span>
          </div>
          <div className="font-bold text-white text-xs truncate mt-1" title={activeProject.name}>
            {activeProject.name}
          </div>
        </div>
      )}

      {/* 10 Strictly Locked Sidebar Menus */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-blue-300/30">
        {CITIZEN_SIDEBAR_MENUS.map((menu) => {
          const Icon = menu.icon;
          const isActive = activeMenu === menu.id;

          return (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-start gap-2.5 transition-all cursor-pointer border-l-4 ${
                isActive
                  ? 'bg-[#12243F] border-[#C5A059] text-white shadow-xs'
                  : 'border-transparent text-blue-100 hover:bg-[#234575] hover:text-white'
              }`}
            >
              {/* Menu Number */}
              <span
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold font-mono rounded-md shrink-0 mt-0.5 ${
                  isActive ? 'bg-[#C5A059] text-slate-950 font-black' : 'bg-white/10 text-blue-200'
                }`}
              >
                {menu.num}
              </span>

              {/* Icon & Titles */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-white' : 'text-blue-50'
                    }`}
                  >
                    {menu.title}
                  </span>
                  {menu.badge && (
                    <span
                      className={`ml-1.5 text-[9px] font-black text-slate-950 px-1.5 py-0.5 rounded font-mono shrink-0 ${
                        menu.badgeColor || 'bg-[#C5A059]'
                      }`}
                    >
                      {menu.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-blue-200/90 truncate mt-0.5 leading-tight">
                  {menu.desc}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer: Legal Guarantee */}
      <div className="p-3.5 bg-[#142947] border-t border-blue-900/50 text-[10px] text-blue-100 font-sans">
        <div className="flex items-center justify-between text-blue-100 font-bold mb-1">
          <span>TRANSPARENCY GUARANTEE</span>
          <span className="text-emerald-300 font-mono font-bold">100% AUDITED</span>
        </div>
        <div className="text-[9px] text-blue-200/80 leading-normal">
          Enacted under RFCTLARR Act 2013 (Sec 11, 15, 19, 21, 23 &amp; 38). No citizen land acquired without statutory notice.
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Left Pane) */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 h-[calc(100vh-73px)] sticky top-[73px] z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
