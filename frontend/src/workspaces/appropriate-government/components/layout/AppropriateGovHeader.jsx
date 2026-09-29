import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  HelpCircle, 
  UserCheck, 
  ChevronDown, 
  Layers, 
  Globe2, 
  ShieldCheck, 
  Check, 
  Landmark, 
  LogOut,
  Sparkles,
  Scale,
  Menu
} from 'lucide-react';
import { useAppropriateGovernment } from '../../context/AppropriateGovernmentContext.jsx';

export default function AppropriateGovHeader() {
  const {
    jurisdiction,
    setJurisdiction,
    activeRole,
    setActiveRole,
    availableRoles,
    setIsSearchOpen,
    setIsNotificationCenterOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    openProjectDrawer,
    onSwitchWorkspace
  } = useAppropriateGovernment();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const isCentral = jurisdiction === 'CENTRAL';

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] shadow-md sticky top-0 z-40 shrink-0">
      {/* Top Banner Ribbon */}
      <div className="bg-[#142947] px-4 sm:px-6 py-1 text-[11px] text-blue-100 flex items-center justify-between border-b border-blue-900/40 font-sans">
        <div className="flex items-center gap-2.5 truncate">
          <span className="font-bold tracking-wider text-amber-300 uppercase shrink-0">
            {isCentral ? 'GOVERNMENT OF INDIA' : 'STATE GOVERNMENT • REVENUE & FOREST DEPARTMENT'}
          </span>
          <span className="text-blue-300/40">•</span>
          <span className="text-blue-100/90 truncate text-[10px] sm:text-[11px]">
            RFCTLARR Act 2013 • Appropriate Government Central / State Directorate
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px] shrink-0 font-mono text-blue-200">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Statutory Gateway Active
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-3 sm:px-6 py-2 min-h-[64px] flex items-center justify-between gap-3 md:gap-5">
        {/* Left: Branding & National Seal */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Sidebar Hamburger Toggle - Available on ALL Screen Sizes */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center p-2 rounded-lg bg-[#142947] hover:bg-[#204373] text-[#E6CA85] hover:text-white border border-blue-400/30 cursor-pointer shrink-0 transition-colors shadow-xs"
            title="Toggle 8 Statutory Menus Sidebar"
            aria-label="Toggle Sidebar Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-[#C5A059]/60 flex items-center justify-center text-[#E6CA85] font-serif font-black text-lg sm:text-xl shadow-xs shrink-0">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                NLAMS
              </span>
              <span className="text-[10px] bg-[#C5A059] text-slate-950 font-bold px-1.5 py-0.5 rounded font-mono">
                PILLAR 6 &amp; 7
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-blue-100 font-medium tracking-tight truncate max-w-[150px] sm:max-w-xs md:max-w-none">
              {isCentral ? 'Central Appropriate Government' : 'State Appropriate Government'}
            </div>
          </div>
        </div>

        {/* Center: Quick Jurisdiction Switcher */}
        <div className="hidden xl:flex items-center bg-[#142947] p-1 rounded-xl border border-blue-400/30 gap-1 shadow-inner shrink-0">
          <button
            onClick={() => {
              setJurisdiction('CENTRAL');
              if (onSwitchWorkspace) onSwitchWorkspace('central-appropriate-gov');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isCentral
                ? 'bg-[#C5A059] text-slate-950 shadow-xs'
                : 'text-blue-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Central Jurisdiction</span>
          </button>
          <button
            onClick={() => {
              setJurisdiction('STATE');
              if (onSwitchWorkspace) onSwitchWorkspace('state-appropriate-gov');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              !isCentral
                ? 'bg-[#C5A059] text-slate-950 shadow-xs'
                : 'text-blue-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>State Jurisdiction</span>
          </button>
        </div>

        {/* Right: Actions, Global Search, Notifications, Switcher & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Action Drawer Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`p-2 px-2.5 sm:px-3 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              isDrawerOpen
                ? 'bg-[#C5A059] border-[#C5A059] text-slate-950 font-bold shadow-md'
                : 'bg-[#142947] border-blue-400/30 text-[#E6CA85] hover:text-white hover:border-[#C5A059]'
            }`}
            title={isDrawerOpen ? 'Close Action Drawer' : 'Open Contextual Action Drawer'}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-bold font-mono">Dossier</span>
          </button>

          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#142947] hover:bg-[#204373] text-slate-100 hover:text-white px-2.5 sm:px-3 py-2 rounded-lg border border-blue-400/30 text-xs cursor-pointer transition-colors shadow-xs"
            title="Search Project ID, Proposal ID, ULPIN, Notification"
          >
            <Search className="w-4 h-4 text-[#C5A059]" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] bg-slate-900 text-slate-300 px-1 rounded font-mono">⌘K</kbd>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative p-2 bg-[#142947] hover:bg-[#204373] text-slate-100 hover:text-white rounded-lg border border-blue-400/30 cursor-pointer transition-colors shadow-xs"
            title="Statutory Alerts &amp; Timers"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-2 bg-[#1C4472] hover:bg-[#285A94] border border-blue-300/30 px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059] text-slate-950 font-bold flex items-center justify-center text-xs">
                {activeRole.title.charAt(0)}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-white line-clamp-1 max-w-[130px]">
                  {activeRole.title}
                </div>
                <div className="text-[10px] text-blue-200 line-clamp-1 max-w-[130px]">
                  {activeRole.department}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-slate-900 border border-slate-700 rounded shadow-xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Statutory Persona ({jurisdiction})
                </div>
                {availableRoles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setActiveRole(role);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      activeRole.id === role.id ? 'bg-[#1B365D] text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{role.title}</div>
                      <div className="text-[10px] text-slate-400">{role.department}</div>
                    </div>
                    {activeRole.id === role.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

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
