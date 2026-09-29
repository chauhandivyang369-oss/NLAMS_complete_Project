import React, { useState } from 'react';
import { useLarrAuthority, LARR_ROLES } from '../../context/LarrAuthorityContext.jsx';
import { 
  Scale, 
  Search, 
  Bell, 
  ChevronDown, 
  ArrowRightLeft, 
  UserCheck, 
  ShieldAlert, 
  FileText,
  Clock,
  Landmark,
  Building2,
  ExternalLink,
  Layers,
  Menu,
  X,
  LogOut
} from 'lucide-react';

export default function LarrHeader({ onSwitchWorkspace }) {
  const { 
    currentRole, 
    setCurrentRole, 
    selectedCase, 
    cases, 
    selectCaseById,
    setIsSearchOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    showToast
  } = useLarrAuthority();

  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  const roleMeta = LARR_ROLES[currentRole] || LARR_ROLES.PRESIDING_OFFICER;

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] shadow-md z-30 shrink-0 select-none">
      <div className="px-3 sm:px-5 py-2 min-h-[64px] flex items-center justify-between gap-2 sm:gap-4 md:gap-5">
        
        {/* LEFT: Universal 3-lines Hamburger, Government Logo, NLAMS Title, Judicial Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          
          {/* Universal Hamburger Toggle */}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(!isSidebarOpen);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            className="p-2 rounded-lg bg-[#142947] text-white hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer shrink-0 shadow-xs"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#C5A059]" />
          </button>

          {/* Emblem / Court Scales Icon */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-[#C5A059] flex items-center justify-center text-[#E6CA85] shadow-xs shrink-0">
            <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-[#E6CA85]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase font-sans">
                NLAMS
              </span>
              <span className="hidden md:inline text-[11px] text-blue-100 font-medium">
                National Land Acquisition &amp; Management System
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold">
                TRIBUNAL
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
              <span className="text-[10px] sm:text-[11px] font-bold font-mono text-[#E6CA85] uppercase tracking-wide truncate max-w-[150px] sm:max-w-none">
                LARR AUTHORITY (SEC 51–74)
              </span>
              <span className="hidden xl:inline text-[10px] text-blue-100 font-mono">
                • {selectedCase?.courtName?.split(',')[1] || 'Central Gujarat Bench'}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: Active Case Selector + Global Search */}
        <div className="flex-1 max-w-xl mx-2 flex items-center gap-2">
          
          {/* Quick Case Switcher */}
          <div className="relative hidden sm:block shrink-0">
            <button
              onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#142947] hover:bg-[#203D66] text-slate-100 border border-blue-900/60 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors max-w-xs shadow-xs"
              title="Change active judicial case"
            >
              <span className="text-[10px] font-mono text-[#C5A059] font-bold">CASE:</span>
              <span className="truncate max-w-[130px] font-mono font-bold text-white">
                {selectedCase?.caseId || 'LARR/2026/GJ/001'}
              </span>
              <ChevronDown className="w-3 h-3 text-blue-200 shrink-0" />
            </button>

            {isCaseDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-84 bg-[#183A62] border border-blue-400/40 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-1.5 border-b border-blue-400/25 text-[10px] font-mono uppercase text-blue-200 font-bold flex justify-between">
                  <span>Switch Judicial Case</span>
                  <span className="text-amber-300">{cases.length} Active Matters</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                  {cases.map((c) => (
                    <button
                      key={c.caseId}
                      onClick={() => {
                        selectCaseById(c.caseId);
                        setIsCaseDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                        c.caseId === selectedCase?.caseId
                          ? 'bg-[#24548A] border border-[#C5A059] text-white font-bold'
                          : 'hover:bg-[#1C4472] text-slate-100'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-mono text-[11px] text-[#E6CA85]">{c.caseId}</div>
                        <div className="text-[11px] truncate text-slate-100">{c.claimantName}</div>
                        <div className="text-[10px] text-blue-200 font-mono">ULPIN: {c.ulpin}</div>
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                        c.slaStatus === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                        c.slaStatus === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {c.slaDaysRemaining}d SLA
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Global Search Bar */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 flex items-center justify-between bg-[#1C4472] hover:bg-[#285A94] border border-blue-300/30 text-white px-3.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="truncate text-blue-100">Search Case ID, ULPIN, Survey No, Claimant, Award...</span>
            </div>
            <kbd className="hidden md:inline font-mono text-[10px] bg-white/10 border border-white/20 px-1.5 py-0.5 rounded text-blue-200">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* RIGHT: Role Switcher, Context Drawer Toggle, Workspace Switcher */}
        <div className="flex items-center gap-2">
          
          {/* RBAC Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-1.5 bg-[#1C4472] hover:bg-[#285A94] border border-blue-300/30 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
              title="Switch RBAC Persona"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-bold text-white text-[11px] truncate max-w-[120px]">
                {roleMeta.label}
              </span>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="p-2 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Select Judicial Role (RBAC)
                </div>
                <div className="space-y-1 py-1">
                  {Object.values(LARR_ROLES).map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setCurrentRole(role.id);
                        setIsRoleMenuOpen(false);
                        showToast(`Switched active role to ${role.label}`, 'info');
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-colors cursor-pointer ${
                        currentRole === role.id
                          ? 'bg-[#183A62] border border-[#C5A059]/60 text-white font-bold'
                          : 'hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{role.label}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                          {role.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5 leading-tight">
                        {role.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Drawer Toggle */}
          <button
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className={`p-2 px-3 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
              isRightPanelOpen 
                ? 'bg-[#C5A059] border-[#C5A059] text-slate-950 font-bold shadow-md' 
                : 'bg-[#1C4472] border-blue-300/30 text-[#E6CA85] hover:text-white hover:border-[#C5A059]'
            }`}
            title={isRightPanelOpen ? "Close Judicial Action Panel" : "Open Judicial Action Panel"}
          >
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-bold font-mono">Actions</span>
          </button>

          {/* Logout Button -> Landing Page */}
          <button
            onClick={() => {
              if (onSwitchWorkspace) onSwitchWorkspace('landing');
            }}
            title="Logout & Return to NLAMS Public Portal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>
    </header>
  );
}
