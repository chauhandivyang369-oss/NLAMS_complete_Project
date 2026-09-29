import React from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  ShieldAlert, 
  Megaphone, 
  Home, 
  CreditCard, 
  FileCheck2, 
  TrendingUp, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Shield,
  Layers
} from 'lucide-react';

const MENU_ICONS = {
  'rr-dashboard': LayoutDashboard,
  'affected-families': Users,
  'rr-scheme-builder': FileSpreadsheet,
  'sc-st-plan-builder': ShieldAlert,
  'public-hearing': Megaphone,
  'rr-allotment': Home,
  'rr-dbt': CreditCard,
  'commissioner-approval': FileCheck2,
  'rr-monitoring': TrendingUp,
  'rr-audit-vault': FileText
};

export default function RRSidebar() {
  const { 
    activeMenu, 
    setActiveMenu, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed,
    isMobileSidebarOpen, 
    setIsMobileSidebarOpen,
    visibleMenus,
    currentRole
  } = useRRAuthority();

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const adminMenus = visibleMenus.filter(m => m.roleCategory === 'ADMINISTRATOR');
  const commissionerMenus = visibleMenus.filter(m => m.roleCategory === 'COMMISSIONER');

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-[#1B365D] text-slate-100 border-r border-blue-900/40 transition-all duration-200 ease-in-out select-none shadow-md lg:shadow-none ${
          isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-72 xl:w-80'}`}
      >
        
        {/* Mobile/Tablet Drawer Header */}
        <div className="lg:hidden h-14 px-4 flex items-center justify-between border-b border-blue-900/50 bg-[#142947]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C5A059]" />
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              R&R Authority Navigation
            </span>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Slicing Header Badge */}
        {!isSidebarCollapsed && (
          <div className="hidden md:flex px-4 py-2.5 border-b border-blue-900/50 items-center justify-between bg-[#142947]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-100 font-semibold">
                {currentRole === 'DUAL_CHARGE' 
                  ? 'DUAL-CHARGE UNIFIED VIEW (1-10)' 
                  : currentRole === 'ADMINISTRATOR' 
                    ? 'ADMINISTRATOR DESK (1-7)' 
                    : 'COMMISSIONER DESK (8-10)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#C5A059] font-bold">
              {visibleMenus.length} Menus
            </span>
          </div>
        )}

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-4 text-xs scrollbar-thin scrollbar-thumb-blue-300/30">
          
          {/* Group 1: Administrator Menus (1 to 7) */}
          {adminMenus.length > 0 && (
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-wider flex items-center justify-between">
                  <span>Part I: Administrator Operations</span>
                  <span className="text-blue-200">Sec 43</span>
                </div>
              )}

              {(adminMenus || []).map((item) => {
                const IconComponent = MENU_ICONS[item.id] || LayoutDashboard;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    title={isSidebarCollapsed ? `${item.number} ${item.title}` : undefined}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                      isActive 
                        ? 'bg-[#183A62] text-white font-bold border-l-4 border-[#C5A059] shadow-inner' 
                        : 'text-blue-100 hover:bg-[#2E649E] hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#C5A059] scale-110' : 'text-blue-200 group-hover:text-white'
                    }`} />

                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 leading-snug">
                          <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#C5A059]' : 'text-blue-200'}`}>
                            {item.number}
                          </span>
                          <span className="truncate text-[11px] font-sans">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-blue-200/80 truncate mt-0.5">
                          {item.statutoryRef}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Group 2: Commissioner Menus (8 to 10) */}
          {commissionerMenus.length > 0 && (
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-wider flex items-center justify-between border-t border-blue-300/25 pt-3">
                  <span>Part II: Commissioner Oversight</span>
                  <span className="text-blue-200">Sec 44</span>
                </div>
              )}

              {(commissionerMenus || []).map((item) => {
                const IconComponent = MENU_ICONS[item.id] || LayoutDashboard;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    title={isSidebarCollapsed ? `${item.number} ${item.title}` : undefined}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                      isActive 
                        ? 'bg-[#12243F] text-white font-bold border-l-4 border-[#C5A059] shadow-inner' 
                        : 'text-blue-100 hover:bg-[#234575] hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#C5A059] scale-110' : 'text-blue-200 group-hover:text-white'
                    }`} />

                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 leading-snug">
                          <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#C5A059]' : 'text-blue-200'}`}>
                            {item.number}
                          </span>
                          <span className="truncate text-[11px] font-sans">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-blue-200/80 truncate mt-0.5">
                          {item.statutoryRef}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>

      </aside>
    </>
  );
}
