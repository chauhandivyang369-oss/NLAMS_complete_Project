import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Key, 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Layers,
  ArrowRightLeft,
  X,
  Sparkles,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import DemoDataBadge from './DemoDataBadge.jsx';

export default function PolicyMakerHeader({ onSwitchToRequiringBody, onSwitchToSiaIeg, onSwitchWorkspace, onToggleMobileSidebar }) {
  const { 
    committeeRole, 
    switchCommitteeRole, 
    currentRoleConfig, 
    effectiveScope,
    slaAlerts,
    openProjectIntelligence,
    setIsGlobalSearchOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen
  } = usePolicyMaker();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  // Scope label formatting according to section 11
  const getScopeDisplay = () => {
    if (committeeRole === 'SMC') return 'STATE: GUJARAT';
    if (committeeRole === 'PROJECT_RR') return 'PROJECT: PRJ-2026-GJ05';
    if (committeeRole === 'NMC') return 'NATIONAL / INTER-STATE';
    return 'NATIONAL';
  };

  const getRoleDisplay = () => {
    if (committeeRole === 'APEX') return 'APEX EXECUTIVE';
    if (committeeRole === 'NMC') return 'NMC MEMBER';
    if (committeeRole === 'SMC') return 'SMC MEMBER';
    if (committeeRole === 'PROJECT_RR') return 'PROJECT R&R COMMITTEE';
    return 'APEX EXECUTIVE';
  };

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] sticky top-0 z-40 select-none shadow-md">
      
      {/* Top Level Master Bar */}
      <div className="min-h-[64px] px-3 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Emblem + Title + Role & Scope Badges */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          
          {/* Mobile Menu Toggle Button */}
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-lg bg-[#142947] text-white hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer shadow-xs"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#C5A059]" />
            </button>
          )}

          {/* National Emblem SVG */}
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-[#C5A059] flex items-center justify-center text-[#E6CA85] shadow-xs">
            🏛️
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase font-sans">
                NLAMS
              </span>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-[#C5A059] text-slate-950">
                PILLAR 5
              </span>
              <span className="hidden md:inline text-xs font-bold text-blue-100">
                POLICY MAKER &amp; EXECUTIVE OVERSIGHT
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] mt-0.5">
              {/* Dynamic Committee Role Badge */}
              <span className="px-1.5 py-0.2 rounded font-mono font-bold bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/40">
                {getRoleDisplay()}
              </span>
              <span className="text-blue-300/50">•</span>
              {/* Scope Badge */}
              <span className="font-mono text-cyan-300 font-bold">
                SCOPE: {getScopeDisplay()}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md mx-2">
          <button
            onClick={() => setIsGlobalSearchOpen(true)}
            className="w-full bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 rounded-xl px-3.5 py-2 text-xs text-blue-200 flex items-center justify-between transition-colors cursor-pointer shadow-inner"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="text-blue-100 truncate">Search Project ID, Name, ULPIN, State, District, Ministry...</span>
            </div>
            <span className="text-[10px] font-mono text-blue-200 bg-[#12243F] border border-blue-900/60 px-1.5 py-0.5 rounded-md shrink-0">
              Ctrl + K
            </span>
          </button>
        </div>

        {/* Right Status Controls & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          


          {/* e-Sign Verified Pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#142947] border border-blue-900/60 px-2.5 py-1.5 rounded-lg text-xs">
            <Key className="w-3 h-3 text-[#C5A059]" />
            <span className="text-blue-100 text-[10px]">DSC:</span>
            <span className="text-emerald-300 font-bold font-mono text-[10px]">VERIFIED</span>
          </div>

            {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-blue-100 hover:text-white rounded-lg bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer"
              title="Statutory Alerts & Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white font-mono font-bold text-[9px] rounded-full flex items-center justify-center border border-[#142947] animate-pulse">
                {slaAlerts.length}
              </span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#142947] border border-blue-900/60 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="flex items-center justify-between border-b border-blue-900/50 pb-2 mb-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Statutory &amp; Governance Alerts</span>
                  </div>
                  <button 
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-blue-200 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {slaAlerts.map(a => (
                    <div 
                      key={a.id} 
                      onClick={() => {
                        openProjectIntelligence(a.projectId);
                        setIsNotificationOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-[#12243F] hover:bg-[#203D66] border border-blue-900/60 cursor-pointer text-slate-100 space-y-1"
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="font-bold text-[#C5A059]">{a.projectId}</span>
                        <span className="bg-rose-950 text-rose-300 border border-rose-700 px-1 rounded font-bold">
                          {a.daysRemaining}d to Lapse
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-white">{a.projectName}</div>
                      <div className="text-[10px] text-blue-200">{a.statutoryProvision}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Vault Trigger for Mobile / Tablet (< lg) */}
          <button
            onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
            className={`lg:hidden relative p-2 rounded-lg border transition-colors cursor-pointer ${
              isRightDrawerOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-[#142947] hover:bg-[#203D66] text-amber-400 border-blue-900/60'
            }`}
            title="Toggle Executive Action Vault"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Role Switcher & Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059] text-slate-950 font-bold flex items-center justify-center text-xs">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-slate-100 flex items-center gap-1">
                  <span>{getRoleDisplay()}</span>
                  <ChevronDown className="w-3 h-3 text-blue-200" />
                </div>
                <div className="text-[9px] text-[#C5A059] font-sans truncate max-w-[120px]">
                  {currentRoleConfig.name}
                </div>
              </div>
            </button>

            {/* Role Switcher Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#142947] border border-blue-900/60 rounded-xl shadow-2xl z-50 p-3 text-xs">
                <div className="border-b border-blue-900/50 pb-2 mb-2">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>DEMO ROLE SWITCHER</span>
                    <span className="text-[10px] font-mono text-[#C5A059]">Pillar 5 Dynamic RBAC</span>
                  </div>
                  <div className="text-[10px] text-blue-200 mt-0.5 leading-tight">
                    Switch between authorized Policy Maker sub-roles to observe dynamic scope, menu gating, and project filtering.
                  </div>
                </div>

                {/* Sub-Role Selector Options */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      switchCommitteeRole('APEX');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      committeeRole === 'APEX'
                        ? 'bg-[#12243F] border-[#C5A059] text-white'
                        : 'bg-[#142947] border-blue-900/60 text-slate-100 hover:bg-[#203D66]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white text-xs">
                      <span>Apex Executive Bodies</span>
                      {committeeRole === 'APEX' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-blue-200">
                      NITI Aayog / PMO / Cabinet Sec / DoLR (National Scope)
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchCommitteeRole('NMC');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      committeeRole === 'NMC'
                        ? 'bg-[#12243F] border-[#C5A059] text-white'
                        : 'bg-[#142947] border-blue-900/60 text-slate-100 hover:bg-[#203D66]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white text-xs">
                      <span>National Monitoring Committee (NMC)</span>
                      {committeeRole === 'NMC' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-blue-200">
                      RFCTLARR Sec 48 • Inter-State &amp; Central Corridors
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchCommitteeRole('SMC');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      committeeRole === 'SMC'
                        ? 'bg-[#12243F] border-[#C5A059] text-white'
                        : 'bg-[#142947] border-blue-900/60 text-slate-100 hover:bg-[#203D66]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white text-xs">
                      <span>State Monitoring Committee (SMC)</span>
                      {committeeRole === 'SMC' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-blue-200">
                      RFCTLARR Sec 50 • Gujarat Multi-District Scope
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchCommitteeRole('PROJECT_RR');
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      committeeRole === 'PROJECT_RR'
                        ? 'bg-[#12243F] border-[#C5A059] text-white'
                        : 'bg-[#142947] border-blue-900/60 text-slate-100 hover:bg-[#203D66]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white text-xs">
                      <span>Project R&amp;R Committee (Sec 45)</span>
                      {committeeRole === 'PROJECT_RR' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </div>
                    <div className="text-[10px] text-blue-200">
                      Trigger: Acquisitions &gt;= 100 Acres (PRJ-2026-GJ05 Scope)
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

      {/* SLA Ticker Bar Underneath Header (Section 11 & 12) */}
      <div className="bg-[#142947] border-t border-blue-900/60 px-4 py-1.5 flex items-center justify-between text-[11px] overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[#C5A059] font-mono font-bold text-[10px] uppercase">
            <Clock className="w-3 h-3 text-[#C5A059]" />
            <span>STATUTORY MONITORING:</span>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pl-2 font-mono text-[10px]">
          {slaAlerts.map(alert => (
            <div 
              key={alert.id} 
              onClick={() => openProjectIntelligence(alert.projectId)}
              className="flex items-center gap-1.5 cursor-pointer hover:underline text-slate-100"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                alert.status === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'
              }`}></span>
              <span className="font-bold text-white">{alert.projectId}</span>
              <span className="text-blue-200">({alert.projectName.slice(0, 24)}...)</span>
              <span className={`px-1.5 py-0.2 rounded font-bold ${
                alert.status === 'CRITICAL' ? 'bg-rose-900/80 text-rose-300' : 'bg-amber-900/80 text-amber-300'
              }`}>
                {alert.daysRemaining} DAYS TO SECTION 19 DEADLINE
              </span>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[10px] text-blue-200 font-mono shrink-0 pl-2">
          <span>Sec 19(7) SLA Engine Active</span>
        </div>
      </div>

    </header>
  );
}
