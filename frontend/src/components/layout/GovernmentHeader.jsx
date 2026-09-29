import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Key, 
  Shield, 
  Settings, 
  CheckCircle2,
  ArrowRightLeft,
  LogOut
} from 'lucide-react';

export default function GovernmentHeader({ onSwitchToPolicyMaker, onSwitchToSiaIeg, onSwitchWorkspace, onToggleMobileSidebar }) {
  const { 
    officer,
    openAiAssistant,
    setActiveModule
  } = useWorkspace();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] sticky top-0 z-40 min-h-[64px] sm:min-h-[70px] flex items-center select-none shadow-md">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Left: Mobile Toggle + Gold Gear Emblem + Title & Subtitle */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Mobile Menu Hamburger Button */}
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-lg bg-[#142947] text-white hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer shadow-xs"
              title="Open Navigation Menu"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Golden Gear / Chakra Emblem */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-[#C5A059]/60 flex items-center justify-center text-amber-300 shadow-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-sans">
                National Land Acquisition &amp; Management System
              </h1>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/50">
                NLAMS
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-blue-100/90 mt-0.5">
              <span className="hidden sm:inline">Real-Time Digital Monitoring</span>
              <span className="text-amber-400 font-bold hidden sm:inline">•</span>
              <span className="text-amber-300 font-semibold tracking-wide uppercase">
                Requisitioning Body Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Input with Ctrl + K */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm xl:max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-blue-200/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ULPIN, Survey No, Project ID..."
              className="w-full bg-[#142947] border border-blue-400/30 rounded-lg pl-10 pr-16 py-2 text-xs text-white placeholder-blue-200/70 focus:outline-none focus:border-amber-400/60 transition-colors shadow-inner"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-200 bg-white/15 border border-white/25 px-2 py-0.5 rounded">
              Ctrl + K
            </div>
          </div>
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* SLA Monitor Pill */}
          <div className="hidden xl:flex items-center gap-2 bg-[#142947] border border-blue-400/30 px-3 py-1.5 rounded-lg text-xs shadow-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-slate-100 font-mono text-[11px] font-semibold">SLA MONITOR</span>
            </div>
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
              Optimal
            </span>
          </div>

          {/* e-Sign Verified Pill */}
          <div className="hidden 2xl:flex items-center gap-1.5 bg-[#142947] border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs shadow-xs">
            <Key className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-slate-100 text-[11px]">e-Sign:</span>
            <span className="text-emerald-300 font-bold font-mono text-[11px]">VERIFIED</span>
          </div>

          {/* Notification Bell with '7' badge */}
          <button 
            onClick={() => setActiveModule('objections-hearings')}
            className="relative p-2 text-blue-100 hover:text-white rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
            title="7 Action Required Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute 0.5 top-0.5 right-0.5 w-4 h-4 bg-amber-500 text-slate-950 font-mono font-black text-[9px] rounded-full flex items-center justify-center border border-[#1B365D]">
              7
            </span>
          </button>



          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 text-xs font-bold">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span>RB MANAGER</span>
                  <ChevronDown className="w-3 h-3 text-blue-200" />
                </div>
                <div className="text-[9px] text-blue-200 font-sans">
                  NHAI / Project Division
                </div>
              </div>
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="border-b border-slate-800 pb-2 mb-2">
                  <div className="font-bold text-white">RB MANAGER (Senior Scale)</div>
                  <div className="text-[11px] text-slate-400">NHAI / Project Division</div>
                  <div className="text-amber-400 font-mono text-[10px] mt-0.5">Level-3 DSC Token Verified</div>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Cadre:</span>
                    <span>Level-14 (SAG)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Clearance:</span>
                    <span className="text-emerald-400 font-mono">Statutory Signatory</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModule('pia-rbac');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full mt-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-semibold rounded text-center"
                >
                  Manage PIA Delegation & Roles
                </button>
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

