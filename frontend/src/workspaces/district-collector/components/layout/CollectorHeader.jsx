import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  MapPin, 
  UserCheck, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Check, 
  FileText,
  Clock,
  ExternalLink,
  LogOut,
  Menu
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function CollectorHeader() {
  const {
    districts,
    selectedDistrictId,
    setSelectedDistrictId,
    activeDistrict,
    roles,
    selectedRoleId,
    setSelectedRoleId,
    activeRole,
    setIsSearchOpen,
    openAuditDrawer,
    onSwitchWorkspace,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed
  } = useDistrictCollector();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isDistrictMenuOpen, setIsDistrictMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] shadow-md sticky top-0 z-40 select-none">
      {/* Top Banner Ribbon */}
      <div className="bg-[#142947] px-4 py-1.5 text-[11px] text-blue-100 flex items-center justify-between border-b border-blue-900/50 font-sans">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden truncate">
          <span className="font-bold tracking-wider text-[#C5A059] uppercase shrink-0">
            GOVERNMENT OF INDIA • DISTRICT REVENUE ADMINISTRATION
          </span>
          <span className="text-blue-300 hidden sm:inline">•</span>
          <span className="text-blue-100 hidden md:inline truncate">
            Office of the District Magistrate &amp; Competent Authority Land Acquisition (CALA)
          </span>
          <span className="text-blue-300 hidden lg:inline">•</span>
          <span className="text-blue-200 font-mono text-[10px] hidden lg:inline">
            RFCTLARR ACT, 2013 (CENTRAL ACT 30 OF 2013)
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-[10px] shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">District Revenue Cloud •</span> Live &amp; Encrypted
          </span>
          <span className="text-amber-300/90 font-mono hidden md:inline">DILRMP • ULPIN v3.4</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-3 sm:px-6 py-2 min-h-[64px] flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        {/* Left: Hamburger (3 lines) + Emblem & National Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          {/* Hamburger toggle button with 3 lines */}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(!isSidebarOpen);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            className="p-2 rounded-lg bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 text-white cursor-pointer transition-colors shadow-xs shrink-0"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#C5A059]" />
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-[#C5A059]/70 flex items-center justify-center text-[#E6CA85] font-serif font-black text-lg sm:text-xl shadow-xs shrink-0">
            🏛️
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                NLAMS
              </span>
              <span className="text-[10px] bg-[#C5A059] text-slate-950 font-bold px-1.5 py-0.5 rounded font-mono shrink-0 hidden xs:inline">
                PILLAR 8
              </span>
              <span className="text-xs text-amber-200 font-semibold tracking-wide truncate">
                DISTRICT COLLECTORATE
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-blue-100 font-medium tracking-tight truncate hidden sm:block">
              Statutory Land Acquisition, Compensation &amp; R&amp;R Directorate
            </div>
          </div>

          {/* District Switcher Dropdown */}
          <div className="relative ml-1 sm:ml-3 pl-1 sm:pl-3 border-l border-blue-900/60 hidden md:block">
            <button
              onClick={() => {
                setIsDistrictMenuOpen(!isDistrictMenuOpen);
                setIsWorkspaceMenuOpen(false);
                setIsRoleMenuOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#142947] hover:bg-[#203D66] border border-blue-800/40 rounded-lg text-left transition-all cursor-pointer shadow-xs"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <div>
                <div className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
                  DISTRICT
                </div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{activeDistrict?.name || 'Thane District'}</span>
                  <span className="text-[10px] text-blue-200 font-normal">({activeDistrict?.state})</span>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200 ml-1" />
                </div>
              </div>
            </button>

            {isDistrictMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-[#142947] border border-slate-700 shadow-xl z-50 p-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold text-[#C5A059] uppercase tracking-wider border-b border-slate-800">
                  Select Revenue District
                </div>
                {districts.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDistrictId(d.id);
                      setIsDistrictMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      selectedDistrictId === d.id ? 'bg-[#1B365D] text-[#E6CA85] font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-[10px] text-slate-400">{d.state} • {d.collectorName}</div>
                    </div>
                    {selectedDistrictId === d.id && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Search, Role Switcher, Cross-Workspace Switcher, Audit */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#142947] hover:bg-[#203D66] border border-blue-800/40 rounded-lg text-xs text-slate-100 hover:text-white transition-colors cursor-pointer shadow-xs"
            title="Search Khasra / Survey / ULPIN"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden xl:inline">Search Khasra / ULPIN...</span>
            <kbd className="text-[10px] bg-slate-900 px-1 py-0.5 text-slate-400 font-mono hidden sm:inline">⌘K</kbd>
          </button>

          {/* Officer Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsRoleMenuOpen(!isRoleMenuOpen);
                setIsWorkspaceMenuOpen(false);
                setIsDistrictMenuOpen(false);
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-[#142947] hover:bg-[#203D66] border border-blue-800/40 rounded-lg text-left transition-all cursor-pointer shadow-xs"
            >
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left hidden lg:block">
                <div className="text-[9px] uppercase tracking-wider text-blue-200 font-medium">
                  {activeRole?.jurisdictionLevel || 'District Officer'}
                </div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{activeRole?.title?.split('(')[0] || 'District Collector'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-blue-200 lg:hidden" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 sm:w-80 bg-[#142947] border border-slate-700 shadow-xl z-50 p-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold text-[#C5A059] uppercase tracking-wider border-b border-slate-800">
                  Switch Presiding Officer Designation (Sec 3(g))
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRoleId(r.id);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-2 flex items-start justify-between hover:bg-slate-800 cursor-pointer border-b border-slate-800/50 ${
                      selectedRoleId === r.id ? 'bg-[#1B365D] text-[#E6CA85]' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{r.title}</div>
                      <div className="text-[10px] text-slate-400">{r.officerName} • {r.designation}</div>
                      <div className="text-[9px] text-emerald-400 font-mono mt-0.5">{r.dscStatus}</div>
                    </div>
                    {selectedRoleId === r.id && <Check className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audit Trail Shortcut */}
          <button
            onClick={openAuditDrawer}
            title="Statutory Immutable Audit Trail"
            className="p-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Logout Button -> Landing Page */}
          <button
            onClick={() => {
              if (onSwitchWorkspace) onSwitchWorkspace('landing');
            }}
            title="Logout & Return to NLAMS Public Portal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
