import React from 'react';
import { 
  BarChart3, 
  Inbox, 
  Compass, 
  FileText, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle,
  X
} from 'lucide-react';
import { useAppropriateGovernment } from '../../context/AppropriateGovernmentContext.jsx';

export default function AppropriateGovSidebar() {
  const { 
    activeMenuId, 
    setActiveMenuId, 
    jurisdiction, 
    proposals, 
    sec19Declarations,
    isSidebarOpen,
    setIsSidebarOpen
  } = useAppropriateGovernment();

  const isCentral = jurisdiction === 'CENTRAL';

  // Pending counts
  const pendingProposalsCount = proposals.filter(p => p.currentStatus === 'RECEIVED' || p.currentStatus === 'UNDER_VALIDATION' || p.currentStatus === 'CLARIFICATION_REQUIRED').length;
  const criticalSec19Count = sec19Declarations.filter(d => d.statutoryCountdown?.status === 'CRITICAL' || d.statutoryCountdown?.status === 'WARNING').length;

  // STRICTLY 8 MENUS - NO 9TH MENU - NO NESTED SUBMENUS
  const menuItems = [
    {
      id: 'executive-dashboard',
      number: '1',
      title: 'Executive Dashboard',
      description: isCentral ? 'National Projects, Land & SLA Radar' : 'State Projects & District Land Radar',
      icon: BarChart3
    },
    {
      id: 'collector-proposal-inbox',
      number: '2',
      title: 'Collector Proposal Inbox',
      description: isCentral ? 'Central Inward Proposals & Multi-State' : 'State Inward Proposals & Multi-District',
      icon: Inbox,
      badge: pendingProposalsCount > 0 ? `${pendingProposalsCount}` : null,
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'sia-survey-launch',
      number: '3',
      title: 'SIA & Survey Launch Hub',
      description: 'Sec 4(1) Launch, 6-Mo SLA & Broadcast',
      icon: Compass
    },
    {
      id: 'sec11-notification',
      number: '4',
      title: 'Section 11 Notification Hub',
      description: 'Eligibility, 12-Ch Pub, Freeze & RoR',
      icon: FileText
    },
    {
      id: 'rnr-review-objections',
      number: '5',
      title: 'R&R Review & Objections Portal',
      description: 'Sec 15 Objections & R&R Scheme Gate',
      icon: MessageSquare
    },
    {
      id: 'sec19-declaration',
      number: '6',
      title: 'Section 19 Declaration Engine',
      description: 'Deposit Check, Staged Decl & 12-Mo SLA',
      icon: Award,
      badge: criticalSec19Count > 0 ? `${criticalSec19Count}` : null,
      badgeColor: 'bg-rose-500'
    },
    {
      id: 'rbac-access-control',
      number: '7',
      title: 'RBAC Access Control Hub',
      description: 'Downstream Provisioning: NMC, SIA, R&R, LARR',
      icon: ShieldCheck
    },
    {
      id: 'gazette-vault',
      number: '8',
      title: isCentral ? 'Gazette & Broadcast Vault' : 'State Gazette & Broadcast Vault',
      description: isCentral ? 'Central e-Gazette, Versioning & Sync' : 'State e-Gazette, Versioning & Sync',
      icon: BookOpen
    }
  ];

  return (
    <>
      {/* Mobile Off-Canvas Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/70 z-40 backdrop-blur-xs transition-opacity cursor-pointer"
          title="Close Navigation Menu"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-10
        w-72 sm:w-80 lg:w-72 xl:w-80 h-full
        bg-[#1B365D] text-slate-100 border-r border-blue-900/40
        flex flex-col shrink-0 select-none shadow-2xl lg:shadow-md
        transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-blue-900/50 bg-[#142947] flex items-center justify-between">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>STATUTORY MENUS (EXACTLY 8)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-blue-100 border border-white/20">
              RFCTLARR ACT
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-blue-200 hover:text-white rounded hover:bg-white/10 cursor-pointer"
              title="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 8 Primary Sidebar Menu Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1.5 scrollbar-thin scrollbar-thumb-blue-800/40">
          {menuItems.map(item => {
            const isActive = activeMenuId === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenuId(item.id);
                  if (isSidebarOpen) setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer group relative ${
                  isActive
                    ? 'bg-[#12243F] text-white shadow-xs border-l-4 border-[#C5A059]'
                    : 'hover:bg-[#234575] text-blue-100 hover:text-white'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#E6CA85]' : 'text-blue-200 group-hover:text-white'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-blue-50'}`}>
                      {item.number}. {item.title}
                    </span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full font-mono shrink-0 ml-1.5 shadow-2xs ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-blue-200/90 truncate mt-0.5">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Authority Guarantee */}
        <div className="p-3.5 bg-[#142947] border-t border-blue-900/50 text-[10px] text-blue-100 space-y-1">
          <div className="flex items-center justify-between font-mono">
            <span>Rules Layer:</span>
            <span className="text-emerald-300 font-semibold">v3.1 Configured</span>
          </div>
          <div className="text-[9px] text-blue-200/80 leading-tight">
            Statutory decisions require digital DSC authorization under IT Act 2000.
          </div>
        </div>
      </aside>
    </>
  );
}
