import React from 'react';
import { useLarrAuthority } from '../../context/LarrAuthorityContext.jsx';
import {
  LayoutDashboard,
  FileInput,
  Send,
  FolderOpen,
  Gavel,
  Calculator,
  PieChart,
  Clock,
  Landmark,
  ShieldCheck,
  X
} from 'lucide-react';

// EXACT 10 SIDEBAR MENUS REQUIRED BY SPECIFICATION (NO SUBMENUS)
export const LARR_MENUS = [
  {
    id: 'dashboard',
    number: '1',
    label: 'Judicial Dashboard & Cause List Overview',
    shortLabel: '1. Judicial Dashboard',
    icon: LayoutDashboard,
    badge: 'DAILY'
  },
  {
    id: 'inward',
    number: '2',
    label: 'Section 64 Reference Inward & e-Filing',
    shortLabel: '2. Sec 64 Inward & e-Filing',
    icon: FileInput,
    badge: 'SCRUTINY'
  },
  {
    id: 'summons',
    number: '3',
    label: 'Digital Summons & Multi-Party Notice Desk',
    shortLabel: '3. Digital Summons Desk',
    icon: Send,
    badge: 'SERVICE'
  },
  {
    id: 'pleadings',
    number: '4',
    label: 'Pleadings & Spatial Evidence Vault',
    shortLabel: '4. Pleadings & Evidence',
    icon: FolderOpen,
    badge: 'EXHIBITS'
  },
  {
    id: 'courtroom',
    number: '5',
    label: 'Digital Cause List & Virtual Courtroom',
    shortLabel: '5. Virtual Courtroom',
    icon: Gavel,
    badge: 'LIVE BENCH'
  },
  {
    id: 'award-engine',
    number: '6',
    label: 'Section 69 Enhanced Award Engine',
    shortLabel: '6. Sec 69 Award Engine',
    icon: Calculator,
    badge: 'VALUATION'
  },
  {
    id: 'escrow',
    number: '7',
    label: 'Section 77 Escrow & Apportionment Desk',
    shortLabel: '7. Sec 77 Escrow & Shares',
    icon: PieChart,
    badge: 'TITLE SPLIT'
  },
  {
    id: 'sla',
    number: '8',
    label: 'Statutory 180-Day SLA & Pipeline Monitor',
    shortLabel: '8. 180-Day SLA Monitor',
    icon: Clock,
    badge: 'COUNTDOWN'
  },
  {
    id: 'appeal-execution',
    number: '9',
    label: 'Section 74 High Court Appeal & Execution',
    shortLabel: '9. Sec 74 Appeal & Execution',
    icon: Landmark,
    badge: 'APPELLATE'
  },
  {
    id: 'audit',
    number: '10',
    label: 'Judicial Audit & Performance Vault',
    shortLabel: '10. Judicial Audit Vault',
    icon: ShieldCheck,
    badge: 'IMMUTABLE'
  }
];

export default function LarrSidebar() {
  const { activeMenu, setActiveMenu, selectedCase, causeList, isSidebarOpen, setIsSidebarOpen, isSidebarCollapsed } = useLarrAuthority();

  return (
    <>
      {/* Mobile Off-Canvas Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/70 z-40 backdrop-blur-xs transition-opacity cursor-pointer animate-fadeIn"
          title="Close Navigation Menu"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-[#1B365D] text-slate-100 border-r border-blue-900/40
        flex flex-col shrink-0 select-none shadow-2xl lg:shadow-lg
        transition-all duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarCollapsed ? 'w-16' : 'w-72 sm:w-80 lg:w-72 xl:w-80'}
      `}>
        
        {/* Bench Identification Box */}
        <div className="p-3 border-b border-blue-900/50 bg-[#142947] flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold tracking-wider">
                Judicial Tribunal Bench
              </div>
              <div className="text-xs font-bold text-white truncate mt-0.5">
                Hon'ble Presiding Officer Court-1
              </div>
              <div className="text-[10px] text-blue-200 font-mono mt-0.5 truncate">
                RFCTLARR Act 2013 • Sec 51 Bench
              </div>
            </div>
          )}

          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg bg-white/10 text-blue-100 hover:text-white hover:bg-white/20 cursor-pointer shrink-0 ml-auto"
            title="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* EXACT 10 SIDEBAR ITEMS (Flat, No Submenus) */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-blue-800/40">
          {LARR_MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;

            return (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveMenu(menu.id);
                  if (isSidebarOpen) setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#12243F] border-l-4 border-[#C5A059] text-white shadow-xs'
                    : 'hover:bg-[#234575] text-blue-100 hover:text-white border-l-4 border-transparent'
                } ${isSidebarCollapsed ? 'justify-center px-1' : ''}`}
                title={isSidebarCollapsed ? `${menu.number}. ${menu.label}` : menu.label}
              >
                <div className={`p-1 rounded-md shrink-0 mt-0.5 ${
                  isActive ? 'bg-[#C5A059] text-slate-950 font-bold' : 'bg-white/10 text-blue-200 group-hover:text-amber-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {!isSidebarCollapsed && (
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-semibold leading-tight truncate ${
                        isActive ? 'text-[#E6CA85]' : 'text-blue-50 group-hover:text-white'
                      }`}>
                        {menu.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-blue-200 border border-white/20">
                        MENU {menu.number}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-[#C5A059]/20 text-[#E6CA85]' : 'bg-white/10 text-blue-200'
                      }`}>
                        {menu.badge}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info: Statutory Legal Framework Notice */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-t border-blue-900/50 bg-[#142947] text-[10px] text-blue-100 font-mono">
            <div className="flex items-center justify-between text-blue-100 font-bold">
              <span>RULE CONFIG:</span>
              <span className="text-[#C5A059]">RFCTLARR-v2.4</span>
            </div>
            <div className="text-[9px] text-blue-200/80 mt-0.5 truncate">
              Independent Tribunal Authority • MoRTH / MoR
            </div>
          </div>
        )}

      </aside>
    </>
  );
}
