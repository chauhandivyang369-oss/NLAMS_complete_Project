import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Wrench, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  ArrowUpRight, 
  CheckCircle2, 
  Filter, 
  Building2,
  TreePine,
  Train,
  Shield,
  Layers,
  Send,
  FileText,
  Search,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';

export default function BottleneckResolverPage() {
  const { 
    bottlenecks, 
    updateBottleneckStatus, 
    openProjectIntelligence, 
    effectiveScope,
    currentRoleConfig,
    showToast,
    activeSubPage,
    setActiveSubPage
  } = usePolicyMaker();

  const currentTab = activeSubPage || 'dashboard';
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedBottleneck, setSelectedBottleneck] = useState((bottlenecks && bottlenecks[0]) || null);
  const [escalationNote, setEscalationNote] = useState('');

  const filteredBottlenecks = (bottlenecks || []).filter(b => {
    if (departmentFilter !== 'ALL' && b.category !== departmentFilter) return false;
    if (severityFilter !== 'ALL' && b.severity !== severityFilter) return false;
    return true;
  });

  const handleEscalateToApex = (btnId) => {
    updateBottleneckStatus(btnId, 'ESCALATED TO CABINET SEC', escalationNote || 'Escalated by Committee Chairperson for inter-ministerial resolution.');
    setEscalationNote('');
    showToast(`Bottleneck ${btnId} escalated to Cabinet Secretariat / PMO PRAGATI portal.`);
  };

  const tabs = [
    { id: 'dashboard', label: 'Bottlenecks Dashboard' },
    { id: 'issue-repository', label: `Issue Repository (${bottlenecks.length})` },
    { id: 'escalation', label: 'Apex & PMO Escalation' }
  ];

  return (
    <div className="space-y-4">
      
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 06
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${currentRoleConfig.badgeColor}`}>
              {currentRoleConfig.badgeText}
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SCOPE: {effectiveScope}
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Inter-Departmental Bottleneck &amp; Dispute Resolver
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Apex dispute resolution for Forest Clearances, Railway Crossings, Defence Lands, and High Court Injunctions.
          </p>
        </div>

        {/* Tab Controls - Dedicated full-width horizontal bar */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubPage(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-slate-200 rounded shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <TreePine className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Forest & Wildlife</div>
            <div className="text-base font-bold text-slate-900">14 Issues</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Train className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Railway GAD / ROB</div>
            <div className="text-base font-bold text-slate-900">8 Issues</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Defence Land NOC</div>
            <div className="text-base font-bold text-slate-900">5 Issues</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Court Stays</div>
            <div className="text-base font-bold text-slate-900">7 Injunctions</div>
          </div>
        </div>
      </div>

      {/* 3. Sub-page: DASHBOARD & ISSUE REPOSITORY */}
      {(currentTab === 'dashboard' || currentTab === 'issue-repository') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left: Issue Repository List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#C5A059]" />
                  <span>Inter-Departmental Bottlenecks Registry</span>
                </h3>

                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="Forest Clearance">Forest Clearance</option>
                    <option value="Railway GAD Approval">Railway GAD Approval</option>
                    <option value="Defence Land NOC">Defence Land NOC</option>
                    <option value="Court Injunction">Court Injunction</option>
                    <option value="Revenue Mismatch">Revenue Mismatch</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {filteredBottlenecks.map((btn) => {
                  const isSelected = selectedBottleneck?.id === btn.id;
                  return (
                    <div
                      key={btn.id}
                      onClick={() => setSelectedBottleneck(btn)}
                      className={`p-3 rounded border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/70 border-[#1B365D] ring-1 ring-[#1B365D]'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-slate-900">{btn.id}</span>
                            <span className="text-slate-400">•</span>
                            <span className="font-mono font-bold text-[#1B365D] text-xs">{btn.projectId}</span>
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                              {btn.category}
                            </span>
                            {btn.slaBreached && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold text-[9px] font-mono animate-pulse">
                                BREACHED ({btn.ageDays}d)
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 mt-1">{btn.issue}</h4>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            <strong>Department:</strong> {btn.department} • <strong>Owner:</strong> {btn.owner}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            btn.status === 'OPEN'
                              ? 'bg-rose-50 text-rose-700 border-rose-300'
                              : btn.status === 'RESOLVED'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-blue-50 text-blue-700 border-blue-300'
                          }`}>
                            {btn.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Selected Bottleneck Detail & Action Chamber */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
              {selectedBottleneck ? (
                <div className="space-y-3 text-xs">
                  <div className="border-b border-slate-200 pb-3">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-[#1B365D]">{selectedBottleneck.id}</span>
                      <span className="text-rose-700 font-bold">{selectedBottleneck.ageDays} days active</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {selectedBottleneck.issue}
                    </h3>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Target Project: {selectedBottleneck.projectId}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Assigned Department</span>
                      <span className="font-bold text-slate-900">{selectedBottleneck.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Nodal Officer</span>
                      <span className="font-bold text-slate-900">{selectedBottleneck.owner}</span>
                    </div>
                  </div>

                  {/* Deliberation Log */}
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">Deliberation History</span>
                    <div className="space-y-1">
                      {selectedBottleneck.notes?.map((note, i) => (
                        <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Escalation Control */}
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Apex Escalation Order</span>
                    <textarea
                      rows={3}
                      value={escalationNote}
                      onChange={(e) => setEscalationNote(e.target.value)}
                      placeholder="Enter urgent inter-ministerial resolution request for Cabinet Sec / PMO PRAGATI review..."
                      className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEscalateToApex(selectedBottleneck.id)}
                        className="flex-1 py-2 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Escalate to Apex</span>
                      </button>
                      <button
                        onClick={() => updateBottleneckStatus(selectedBottleneck.id, 'RESOLVED', 'Resolved following inter-department NOC grant.')}
                        className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded transition-colors cursor-pointer"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 italic text-center p-6">Select a bottleneck to review.</div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* 4. Sub-page: APEX & PMO ESCALATION CHAMBER */}
      {currentTab === 'escalation' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-700" />
                <span>Cabinet Secretariat & PMO PRAGATI Escalation Portal</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory fast-track inter-ministerial arbitration channel for projects delayed beyond 180 days.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-900 text-xs font-bold font-mono">
              APEX PROTOCOL ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">Cabinet Secretary CoS Arbitration</h4>
              <p className="text-xs text-slate-600">
                Committee of Secretaries (CoS) reviews inter-ministerial impasses between MoEFCC, Indian Railways, and Ministry of Defence.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-bold text-purple-900">4 Projects on Agenda</span>
                <button
                  onClick={() => showToast('Dispatched CoS Arbitration Dossier to Cabinet Secretariat')}
                  className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded cursor-pointer"
                >
                  Submit CoS Note
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">PMO PRAGATI Review Sync</h4>
              <p className="text-xs text-slate-600">
                Direct integration with Pro-Active Governance and Timely Implementation (PRAGATI) apex video monitoring dashboard.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800">API Gateway: Online</span>
                <button
                  onClick={() => showToast('Syncing flagged bottlenecks to PMO PRAGATI Server...')}
                  className="px-3 py-1 bg-[#1B365D] hover:bg-[#142642] text-white font-bold rounded cursor-pointer"
                >
                  Sync to PRAGATI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
