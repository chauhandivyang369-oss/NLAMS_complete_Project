import React from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  FileCheck, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  Key
} from 'lucide-react';
import DemoDataBadge from './DemoDataBadge.jsx';

export default function ExecutiveActionVault() {
  const { 
    isRightDrawerOpen, 
    setIsRightDrawerOpen,
    openProjectIntelligence,
    setActiveModule,
    setActiveSubPage,
    setSelectedProjectId,
    slaAlerts,
    directives,
    bottlenecks
  } = usePolicyMaker();

  const alerts = slaAlerts || [];
  const allDirectives = directives || [];
  const allBottlenecks = bottlenecks || [];

  if (!isRightDrawerOpen) {
    return (
      <aside className="hidden lg:flex w-10 bg-[#0b1325] border-l border-slate-800 flex-col items-center py-4 select-none shrink-0">
        <button
          onClick={() => setIsRightDrawerOpen(true)}
          className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
          title="Expand Executive Action Vault"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="mt-8 [writing-mode:vertical-lr] text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
          <span>EXECUTIVE ACTION VAULT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
        </div>
      </aside>
    );
  }

  const vaultContent = (
    <div className="flex flex-col h-full overflow-hidden select-none bg-white">
      {/* Vault Top Header */}
      <div className="p-3.5 bg-[#0b1325] text-white border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span>Executive Action Vault</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </h3>
            <span className="text-[10px] text-slate-400">Real-Time Oversight Triggers</span>
          </div>
        </div>

        <button
          onClick={() => setIsRightDrawerOpen(false)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          title="Close Action Vault"
        >
          <X className="w-4 h-4 lg:hidden" />
          <ChevronRight className="w-4 h-4 hidden lg:block" />
        </button>
      </div>

      {/* Vault Body Scrollable */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs bg-[#f8fafc]">
        
        {/* Section 1: Statutory SLA Alerts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 font-mono uppercase">
            <span className="flex items-center gap-1 text-rose-700">
              <Clock className="w-3 h-3 text-rose-600" />
              <span>Statutory SLA Triggers</span>
            </span>
            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
              {alerts.filter(a => a.status === 'CRITICAL').length} Critical
            </span>
          </div>

          <div className="space-y-2">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                onClick={() => {
                  setSelectedProjectId(alert.projectId);
                  openProjectIntelligence(alert.projectId);
                }}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all hover:shadow-xs ${
                  alert.status === 'CRITICAL'
                    ? 'bg-rose-50/70 border-rose-200 hover:border-rose-400'
                    : 'bg-amber-50/50 border-amber-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[10px] text-slate-800">
                    {alert.projectId}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                    alert.status === 'CRITICAL' 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-amber-500 text-white'
                  }`}>
                    {alert.daysRemaining} DAYS REMAINING
                  </span>
                </div>
                <div className="font-semibold text-slate-900 mt-1 line-clamp-1">
                  {alert.projectName}
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5">
                  {alert.stage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Inter-Department Bottlenecks */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 font-mono uppercase">
            <span className="flex items-center gap-1 text-amber-800">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>Inter-Dept Bottlenecks</span>
            </span>
            <button 
              onClick={() => setActiveModule('bottleneck-resolver')}
              className="text-[10px] text-blue-700 hover:underline font-sans normal-case cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="space-y-2">
            {allBottlenecks.slice(0, 2).map(btn => (
              <div 
                key={btn.id}
                onClick={() => setActiveModule('bottleneck-resolver')}
                className="p-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-400 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-800 font-mono">{btn.id}</span>
                  <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                    {btn.category}
                  </span>
                </div>
                <div className="font-semibold text-slate-900 mt-1 text-[11px] line-clamp-2">
                  {btn.issue}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                  <span>{btn.department}</span>
                  <span className="font-mono text-rose-700 font-bold">{btn.ageDays}d old</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Pending Committee Actions & MoM Signatures */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 font-mono uppercase">
            <span className="flex items-center gap-1 text-blue-900">
              <FileCheck className="w-3 h-3 text-blue-700" />
              <span>Committee Governance</span>
            </span>
            <button 
              onClick={() => setActiveModule('meetings-mom')}
              className="text-[10px] text-blue-700 hover:underline font-sans normal-case cursor-pointer"
            >
              Meetings →
            </button>
          </div>

          <div className="p-2.5 bg-blue-50/50 border border-blue-200 rounded-lg space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-blue-900">
                MoM Awaiting Signature
              </span>
              <span className="text-[9px] bg-amber-100 text-amber-900 px-1 py-0.2 rounded font-bold border border-amber-300">
                Action Required
              </span>
            </div>
            <div className="text-[11px] font-semibold text-slate-800">
              6th Monthly Project R&R Review (PRJ-2026-GJ05)
            </div>
            <div className="text-[10px] text-slate-500 flex items-center justify-between">
              <span>Date: 08-Sep-2026</span>
              <button 
                onClick={() => {
                  setActiveModule('meetings-mom');
                  setActiveSubPage('mom');
                }}
                className="font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Sign MoM (DSC) →
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Directives Overdue */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 font-mono uppercase">
            <span className="text-purple-900">Directives in Progress</span>
            <span className="text-[10px] font-mono text-slate-500">{directives.length} Total</span>
          </div>

          <div className="space-y-1.5">
            {directives.slice(0, 2).map(dir => (
              <div key={dir.id} className="p-2 bg-white border border-slate-200 rounded text-[11px]">
                <div className="flex justify-between font-mono text-[9px] text-slate-500 font-bold">
                  <span>{dir.id}</span>
                  <span className="text-rose-700">Due: {dir.targetDate}</span>
                </div>
                <div className="font-medium text-slate-800 mt-0.5 line-clamp-1">
                  {dir.issue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Security / Session Audit Card */}
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-[10px] text-slate-600 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-slate-700 flex items-center gap-1">
              <Key className="w-3 h-3 text-amber-600" /> Session Security
            </span>
            <span className="text-emerald-700 font-bold font-mono">DSC-LEVEL 3 ACTIVE</span>
          </div>
          <div>Audit Hash: <span className="font-mono">sha256:9f482a...</span></div>
        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Pane */}
      <aside className="hidden lg:flex w-80 xl:w-88 bg-white border-l border-slate-200 flex-col h-full overflow-hidden shrink-0 shadow-xs select-none">
        {vaultContent}
      </aside>

      {/* Mobile Slide-over Overlay */}
      <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsRightDrawerOpen(false)}
        />
        <aside className="relative w-80 max-w-[85vw] bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden shrink-0 shadow-2xl z-10 animate-in slide-in-from-right duration-200">
          {vaultContent}
        </aside>
      </div>
    </>
  );
}
