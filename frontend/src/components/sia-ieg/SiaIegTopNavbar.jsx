import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Menu, 
  X,
  User,
  ArrowRightLeft,
  FileCheck2,
  FileText,
  LogOut
} from 'lucide-react';

export default function SiaIegTopNavbar({ onSwitchWorkspace }) {
  const { 
    currentRole, 
    setCurrentRole,
    searchQuery,
    setSearchQuery,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isNotificationOpen,
    setIsNotificationOpen,
    isHelpOpen,
    setIsHelpOpen,
    isProfileOpen,
    setIsProfileOpen
  } = useSiaIeg();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] sticky top-0 z-40 select-none shadow-md">
      
      {/* Top Navbar Row */}
      <div className="min-h-[64px] px-3 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* LEFT: Universal Toggle + Emblem + Title + Workspace Badge */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          
          {/* Universal Menu Toggle Button */}
          <button
            id="sia-ieg-mobile-menu-toggle"
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileSidebarOpen(!isMobileSidebarOpen);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            className="p-2 rounded-lg bg-[#142947] text-white hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer shadow-xs"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#C5A059]" />
          </button>

          {/* National Emblem / Government Seal */}
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-[#C5A059] flex items-center justify-center text-[#E6CA85] shadow-xs">
            🏛️
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-sans">
                NLAMS
              </span>
              <span className="hidden sm:inline text-[11px] text-blue-100 font-medium">
                National Land Acquisition &amp; Management System
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold font-mono px-2 py-0.2 rounded bg-[#C5A059]/25 text-[#E6CA85] border border-[#C5A059]/60">
                SIA &amp; IEG EVALUATION
              </span>
              <span className="hidden lg:inline text-[10px] text-blue-100 font-mono">
                RFCTLARR Act 2013 • Sec 4 to 9
              </span>
            </div>
          </div>

        </div>

        {/* CENTER / SEARCH AREA: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2 lg:mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-200">
              <Search className="w-4 h-4 text-[#C5A059]" />
            </div>
            <input
              id="sia-ieg-global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Project / ULPIN / Survey No. / Family ID"
              className="w-full bg-[#1C4472] text-xs text-white placeholder-blue-200/70 pl-9 pr-3 py-2 rounded-xl border border-blue-300/30 focus:outline-hidden focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all shadow-inner font-sans"
            />
          </div>
        </div>

        {/* RIGHT: SLA Area + Notifications + Help + Profile/Role */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Statutory SLA indicator area */}
          <div className="hidden xl:flex items-center gap-2 bg-[#1C4472] px-3 py-1.5 rounded-lg border border-blue-300/30 text-[11px] font-mono">
            <div className="flex items-center gap-1 text-[#E6CA85]">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-bold">SLA:</span>
            </div>
            <span className="text-blue-100">Sec 4(2) 6-Mo</span>
            <span className="text-blue-300/40">|</span>
            <span className="text-emerald-300 font-semibold">Sec 7(2) 60-Day Active</span>
          </div>



          {/* Notification Button */}
          <div className="relative">
            <button
              id="sia-ieg-notifications-button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Notifications & Statutory Reminders"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute 0 top-1 right-1 w-2 h-2 bg-[#C5A059] rounded-full"></span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#183A62] border border-blue-400/40 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="flex items-center justify-between border-b border-blue-400/25 pb-2 mb-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Statutory SIA/IEG Reminders</span>
                  </div>
                  <button 
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-blue-200 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 py-1">
                  <div className="p-2.5 rounded-lg bg-[#1C4472] border border-blue-300/25 text-slate-100">
                    <div className="text-[10px] font-mono text-[#E6CA85] font-bold">SECTION 5 STATUTORY HEARING</div>
                    <div className="text-[11px] font-semibold text-white mt-0.5">Sanand Industrial Corridor (Sec 5)</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Mandatory Gram Sabha hearing scheduled in 7 days</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#1C4472] border border-blue-300/25 text-slate-100">
                    <div className="text-[10px] font-mono text-emerald-300 font-bold">SECTION 7 APPRAISAL DUE</div>
                    <div className="text-[11px] font-semibold text-white mt-0.5">NHAI Western Ring Road Corridors</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">IEG appraisal timeline active (38 days remaining)</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            id="sia-ieg-help-button"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="p-2 text-blue-100 hover:text-white rounded-lg bg-[#1C4472] hover:bg-[#285A94] border border-blue-300/30 transition-colors cursor-pointer"
            title="Help & Statutory Guidelines"
            aria-label="Help & Guidelines"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Profile / Role Badge */}
          <div className="relative">
            <button
              id="sia-ieg-user-profile-button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 bg-[#1C4472] hover:bg-[#285A94] border border-blue-300/30 px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059]/25 border border-[#C5A059]/50 flex items-center justify-center text-[#E6CA85] text-[10px] font-bold">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span>{currentRole === 'SIA_AGENCY' ? 'SIA Agency' : 'IEG Expert'}</span>
                  <ChevronDown className="w-3 h-3 text-blue-200" />
                </div>
                <div className="text-[9px] text-[#E6CA85] font-mono">
                  {currentRole === 'SIA_AGENCY' ? 'Sec 4 Unit Lead' : 'Sec 7 Chairperson'}
                </div>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#183A62] border border-blue-400/40 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="border-b border-blue-400/25 pb-2 mb-2">
                  <div className="font-bold text-white">Dr. K. Swaminathan, IAS (Retd.)</div>
                  <div className="text-[10px] text-[#E6CA85] font-mono">Empanelled Social Scientist / IEG Member</div>
                  <div className="text-[10px] text-blue-200 mt-0.5">DSC Certificate: VERIFIED (Class III)</div>
                </div>

                <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold mb-1.5">
                  RBAC View Persona Switch:
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setCurrentRole('SIA_AGENCY');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      currentRole === 'SIA_AGENCY'
                        ? 'bg-[#24548A] border-[#C5A059] text-white'
                        : 'bg-[#1C4472] border-blue-300/25 text-slate-100 hover:bg-[#204c80]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>SIA Agency View</span>
                      {currentRole === 'SIA_AGENCY' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-blue-200">
                      Operations, Survey, Hearing &amp; SIMP
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRole('IEG_EXPERT');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      currentRole === 'IEG_EXPERT'
                        ? 'bg-[#24548A] border-[#C5A059] text-white'
                        : 'bg-[#1C4472] border-blue-300/25 text-slate-100 hover:bg-[#204c80]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>IEG Expert View</span>
                      {currentRole === 'IEG_EXPERT' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-blue-200">
                      Independent Appraisal &amp; Sec 7 Audit
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout Button -> Landing Page */}
          <button
            onClick={() => {
              if (onSwitchWorkspace) onSwitchWorkspace('landing');
            }}
            title="Logout & Return to NLAMS Public Portal"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>

    </header>
  );
}
