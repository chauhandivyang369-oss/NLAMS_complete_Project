import React from 'react';
import { 
  BarChart3, 
  Inbox, 
  UserPlus, 
  Compass, 
  Scale, 
  Users, 
  Megaphone, 
  Award, 
  CheckCircle2, 
  Map, 
  AlertCircle,
  X
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function CollectorSidebar() {
  const { 
    activeMenuId, 
    setActiveMenuId, 
    formIInwards, 
    objections, 
    claims, 
    activeProject,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed
  } = useDistrictCollector();

  // Dynamic badges
  const pendingInwardsCount = formIInwards.filter(f => f.status === 'INQUIRY_IN_PROGRESS').length;
  const pendingObjectionsCount = objections.filter(o => o.status === 'SCHEDULED_FOR_HEARING').length;
  const pendingClaimsCount = claims.filter(c => c.scrutinyStatus === 'BANK_NOC_REQUIRED_BEFORE_DISBURSEMENT').length;

  const menuItems = [
    {
      id: 'executive-dashboard',
      number: '1',
      title: 'Executive Dashboard & Parcel Matrix',
      subtitle: 'District KPIs, SLA Watchdog & Cadastral Sync',
      icon: BarChart3
    },
    {
      id: 'form-i-inward',
      number: '2',
      title: 'Form-I Inward & Field Inquiry Hub',
      subtitle: 'Preliminary Revenue Check & Sec 4 Recommendation',
      icon: Inbox,
      badge: pendingInwardsCount > 0 ? `${pendingInwardsCount}` : null,
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'rbac-delegation',
      number: '3',
      title: 'RBAC Sub-Delegation Manager',
      subtitle: 'Section 3(g) Powers: SDM, CALA & Tahsildar DSC',
      icon: UserPlus
    },
    {
      id: 'sec12-survey',
      number: '4',
      title: 'Section 12 & 13 Survey & Damage Desk',
      subtitle: '7-Day Entry Notice, Soundings & Spot Tender',
      icon: Compass
    },
    {
      id: 'sec15-objections',
      number: '5',
      title: 'Section 15 Objections Hearing Engine',
      subtitle: '60-Day Gateway, Quasi-Judicial Bench & RoR Freeze',
      icon: Scale,
      badge: pendingObjectionsCount > 0 ? `${pendingObjectionsCount}` : null,
      badgeColor: 'bg-rose-500'
    },
    {
      id: 'rnr-scheme-review',
      number: '6',
      title: 'R&R Draft Scheme Review Desk',
      subtitle: 'Sec 16/17 DLRRC Bench, Gram Sabha & 2nd Schedule',
      icon: Users
    },
    {
      id: 'sec21-claims-notice',
      number: '7',
      title: 'Section 21 Public Claims & Sec 22 Desk',
      subtitle: '30-60 Day Claims Window & Statements of Interest',
      icon: Megaphone,
      badge: pendingClaimsCount > 0 ? `${pendingClaimsCount}` : null,
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'sec23-award-engine',
      number: '8',
      title: 'Section 23–30 Award Engine',
      subtitle: 'Market Value, 100% Solatium & Sec 25 12-Mo Limit',
      icon: Award
    },
    {
      id: 'sec38-possession-disbursement',
      number: '9',
      title: 'Sec 37 Notice & Sec 38 Possession Desk',
      subtitle: 'DBT Escrow Credit, Sec 77 Deposit & HOTO Panchnama',
      icon: CheckCircle2
    },
    {
      id: 'cadastral-mutation-audit',
      number: '10',
      title: 'Cadastral GIS, Mutation & Audit Vault',
      subtitle: 'Form VI Mutation, ULPIN Bhu-Aadhaar & Hash Logs',
      icon: Map
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/70 z-40 backdrop-blur-xs transition-opacity cursor-pointer"
          title="Close Navigation"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-10 h-full
        bg-[#1B365D] text-slate-100 border-r border-blue-900/40 flex flex-col shrink-0 select-none shadow-2xl lg:shadow-md
        transition-all duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarCollapsed ? 'w-16' : 'w-72 sm:w-80'}
      `}>
        {/* Sidebar Top Header */}
        <div className="p-3 border-b border-blue-900/50 bg-[#142947] flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
              <span className="truncate">STATUTORY MENUS (10)</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            {!isSidebarCollapsed && (
              <span className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-blue-100 border border-white/20">
                CALA
              </span>
            )}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-blue-200 hover:text-white rounded hover:bg-white/10 cursor-pointer"
              title="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menus List */}
        <nav className="flex-1 overflow-y-auto py-2.5 px-2 space-y-1 scrollbar-thin scrollbar-thumb-blue-800/40">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenuId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenuId(item.id);
                  if (isSidebarOpen) setIsSidebarOpen(false);
                }}
                title={isSidebarCollapsed ? `${item.number}. ${item.title}` : undefined}
                className={`w-full text-left p-2 sm:p-2.5 rounded-xl flex items-start gap-2.5 transition-all cursor-pointer border-l-4 ${
                  isActive
                    ? 'bg-[#12243F] border-[#C5A059] text-white shadow-xs'
                    : 'border-transparent text-blue-100 hover:bg-[#234575] hover:text-white'
                } ${isSidebarCollapsed ? 'justify-center px-1' : ''}`}
              >
                {/* Menu Number / Icon */}
                <div className="shrink-0 mt-0.5">
                  <span
                    className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold font-mono rounded-md ${
                      isActive ? 'bg-[#C5A059] text-slate-950 font-black' : 'bg-white/10 text-blue-200'
                    }`}
                  >
                    {item.number}
                  </span>
                </div>

                {/* Titles (Hidden in icon-only collapsed mode) */}
                {!isSidebarCollapsed && (
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold truncate ${
                          isActive ? 'text-white' : 'text-blue-50'
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.badge && (
                        <span
                          className={`ml-1.5 text-[9px] font-black text-slate-950 px-1.5 py-0.5 rounded font-mono shrink-0 ${
                            item.badgeColor || 'bg-[#C5A059]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-blue-200/90 truncate mt-0.5 leading-tight">
                      {item.subtitle}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collector Footnote Ribbon */}
        {!isSidebarCollapsed && (
          <div className="p-3 bg-[#142947] border-t border-blue-900/50 text-[10px] text-blue-100 font-sans">
            <div className="flex items-center justify-between text-blue-100 font-bold mb-0.5">
              <span>TIMELINE STATUS</span>
              <span className="text-emerald-300 font-mono font-bold">100% AUDITED</span>
            </div>
            <div className="text-[9px] text-blue-200/80 leading-normal truncate">
              Digitally counter-signed under Section 3(g) RFCTLARR.
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
