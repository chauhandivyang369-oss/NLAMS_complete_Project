import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  User,
  ShieldCheck,
  Globe,
  Clock,
  Menu,
  ChevronDown,
  Layers,
  ArrowRight,
  LogOut,
  UserCheck,
  Check
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export default function CitizenHeader() {
  const {
    activeCitizen,
    citizenKey,
    setCitizenKey,
    setIsGlobalSearchOpen,
    setIsNotificationDrawerOpen,
    setIsProfileDrawerOpen,
    setIsHelpDeskOpen,
    setIsMobileSidebarOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    language,
    setLanguage,
    onSwitchWorkspace,
    activeProject,
    navigateToAction
  } = useCitizen();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCitizenMenuOpen, setIsCitizenMenuOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  // Active statutory timer concept
  const activeTimer = activeProject?.statutoryTimers?.[0];

  return (
    <header className="bg-[#1B365D] text-white border-b-2 border-[#C5A059] sticky top-0 z-40 shadow-md">
      {/* Top micro banner for official notice */}
      <div className="bg-[#142947] px-3 sm:px-6 py-1.5 flex items-center justify-between text-[11px] border-b border-blue-900/50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-blue-100">
            Government of India • Ministry of Rural Development &amp; Land Resources • RFCTLARR Act 2013
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-blue-100">
          <span>Official Digital Public Infrastructure</span>
          <span className="text-blue-300/40">|</span>
          <span className="text-[#E6CA85] font-semibold">Toll Free Citizen CALA Helpdesk: 1800-11-2013</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 min-h-[64px] flex items-center justify-between gap-4">
        {/* Left: Branding & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-[#142947] hover:bg-[#203D66] text-white border border-blue-900/60 cursor-pointer shadow-xs"
            title="Open Menu"
          >
            <Menu className="w-5 h-5 text-[#C5A059]" />
          </button>

          <div className="flex items-center gap-3">
            {/* National Emblem Placeholder / Shield */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E6CA85] font-black text-sm shadow-md shrink-0 border border-[#C5A059]/70">
              <span className="tracking-tighter">🏛️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-white">NLAMS</span>
                <span className="text-[10px] bg-[#C5A059] text-slate-950 font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  CITIZEN
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-blue-100 leading-tight">
                National Land Acquisition &amp; Management System • <span className="text-[#E6CA85] font-medium">Citizen Transparency Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            type="button"
            onClick={() => setIsGlobalSearchOpen(true)}
            className="w-full bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 rounded-xl px-3.5 py-2 text-xs text-left text-blue-200 flex items-center justify-between transition-colors shadow-inner cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#C5A059]" />
              <span className="truncate">Search ULPIN / Project ID / Survey No. / Award ID...</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-[#12243F] text-blue-200 rounded border border-blue-900/60 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Active Statutory Countdown Pill */}
          {activeTimer && (
            <button
              onClick={() => navigateToAction('05', activeProject.id)}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 rounded-lg text-[11px] text-amber-200 transition-colors cursor-pointer"
              title="Click to view Section 15 Objection details"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-semibold">Sec 15 Objection:</span>
              <span className="font-bold text-amber-300">{activeTimer.remainingDays} Days Left</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsCitizenMenuOpen(false);
                setIsWorkspaceMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 rounded-lg text-xs text-blue-100 cursor-pointer"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] uppercase font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-[#142947] border border-blue-900/60 rounded-xl shadow-xl z-50 py-1 text-xs">
                <button
                  onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#203D66] flex items-center justify-between ${language === 'en' ? 'text-[#E6CA85] font-bold' : 'text-slate-100'}`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                </button>
                <button
                  onClick={() => { setLanguage('hi'); setIsLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#203D66] flex items-center justify-between ${language === 'hi' ? 'text-[#E6CA85] font-bold' : 'text-slate-100'}`}
                >
                  <span>हिन्दी</span>
                  {language === 'hi' && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                </button>
                <button
                  onClick={() => { setLanguage('gu'); setIsLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#203D66] flex items-center justify-between ${language === 'gu' ? 'text-[#E6CA85] font-bold' : 'text-slate-100'}`}
                >
                  <span>ગુજરાતી</span>
                  {language === 'gu' && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="p-2 bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 rounded-lg text-blue-100 relative cursor-pointer"
            title="Statutory Notifications & Alerts"
          >
            <Bell className="w-4 h-4 text-blue-100" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Action / Context Panel Toggle for Mobile / Tablet (< xl) */}
          <button
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className={`xl:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
              isRightPanelOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-[#142947] hover:bg-[#203D66] text-[#C5A059] border-blue-900/60'
            }`}
            title="Toggle Context & Action Panel"
          >
            <Clock className="w-4 h-4" />
          </button>

          {/* Aadhaar e-KYC Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-[11px] text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">Aadhaar e-KYC:</span>
            <span className="font-mono text-[10px] text-white">Verified</span>
          </div>

          {/* Demo Citizen Switcher (A / B) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCitizenMenuOpen(!isCitizenMenuOpen);
                setIsLangDropdownOpen(false);
                setIsWorkspaceMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 rounded-lg text-xs text-left cursor-pointer"
              title="Switch Demo Citizen Account"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <div className="hidden sm:block text-left">
                <div className="text-[9px] text-blue-200 leading-none">Citizen Profile</div>
                <div className="text-xs font-bold text-white truncate max-w-[130px]">
                  {activeCitizen?.name?.split(' ')[0]} {activeCitizen?.name?.split(' ')[1]?.[0]}.
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {isCitizenMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-[#142947] border border-blue-900/60 rounded-xl shadow-2xl z-50 p-2 text-xs">
                <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider pb-1.5 mb-1.5 border-b border-blue-900/50">
                  Switch Citizen Persona (Demo Sandbox)
                </div>
                <button
                  onClick={() => {
                    setCitizenKey('citizenA');
                    setIsCitizenMenuOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg mb-1 transition-colors flex items-start justify-between cursor-pointer ${
                    citizenKey === 'citizenA' ? 'bg-[#12243F] text-white border border-[#C5A059]' : 'text-slate-100 hover:bg-[#203D66]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-white">Rameshchandra M. Patel</div>
                    <div className="text-[10px] text-blue-200">Anand, Gujarat • 2 Projects • 3 Parcels</div>
                    <div className="text-[10px] text-amber-300 font-semibold mt-0.5">Stage: Sec 15 Objections &amp; Award</div>
                  </div>
                  {citizenKey === 'citizenA' && <Check className="w-4 h-4 text-[#C5A059] shrink-0" />}
                </button>

                <button
                  onClick={() => {
                    setCitizenKey('citizenB');
                    setIsCitizenMenuOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start justify-between cursor-pointer ${
                    citizenKey === 'citizenB' ? 'bg-[#12243F] text-white border border-[#C5A059]' : 'text-slate-100 hover:bg-[#203D66]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-white">Smt. Sunita Devi Sharma</div>
                    <div className="text-[10px] text-blue-200">Bharuch, Gujarat • 1 Project • 1 Parcel</div>
                    <div className="text-[10px] text-emerald-300 font-semibold mt-0.5">Stage: SIA Public Hearing</div>
                  </div>
                  {citizenKey === 'citizenB' && <Check className="w-4 h-4 text-[#C5A059] shrink-0" />}
                </button>
              </div>
            )}
          </div>

          {/* Profile Drawer Trigger */}
          <button
            onClick={() => setIsProfileDrawerOpen(true)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 cursor-pointer"
            title="Open Citizen Profile"
          >
            <User className="w-4 h-4 text-[#C5A059]" />
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

          {/* Mobile Right Action Drawer Toggle */}
          <button
            onClick={() => setIsRightPanelOpen(true)}
            className="xl:hidden p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer"
            title="Open Action & Alerts Drawer"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
