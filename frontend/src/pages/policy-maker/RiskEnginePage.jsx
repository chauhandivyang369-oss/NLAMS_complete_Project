import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  AlertTriangle, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight,
  Filter,
  FileWarning,
  Scale,
  Calendar,
  FileText,
  UserCheck,
  ChevronRight,
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';
import StatutoryTimeline from '../../components/policy-maker/StatutoryTimeline.jsx';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';

export default function RiskEnginePage() {
  const { 
    slaAlerts, 
    scopedProjects, 
    openProjectIntelligence, 
    addDirective,
    showToast,
    effectiveScope,
    activeSubPage,
    setActiveSubPage,
    currentRoleConfig
  } = usePolicyMaker();

  const currentTab = activeSubPage || 'risk-dashboard';
  const [selectedAlert, setSelectedAlert] = useState(slaAlerts[0] || {});
  const [directiveNote, setDirectiveNote] = useState('');
  const [assignedCollector, setAssignedCollector] = useState('District Collector, Anand / Ahmedabad');

  const handleIssueDirective = (e) => {
    e.preventDefault();
    if (!directiveNote.trim()) {
      showToast('Please enter an action order for the statutory directive.', 'warning');
      return;
    }

    const newDirective = {
      id: `DIR-2026-URG-${Math.floor(100 + Math.random() * 900)}`,
      meetingId: 'EMERGENCY-CIRCULATION',
      committeeType: currentRoleConfig?.badgeText || 'NATIONAL COMMITTEE',
      projectId: selectedAlert.projectId || 'PRJ-2026-GJ05',
      projectName: selectedAlert.projectName || 'Ahmedabad Industrial Corridor',
      issue: directiveNote,
      assignedAuthority: assignedCollector,
      targetDate: 'Within 7 Calendar Days',
      status: 'DISPATCHED',
      complianceProof: null
    };

    addDirective(newDirective);
    showToast(`Urgent Directive ${newDirective.id} dispatched to ${assignedCollector}`, 'success');
    setDirectiveNote('');
  };

  const criticalAlerts = (slaAlerts || []).filter(a => a.status === 'CRITICAL' || a.daysRemaining <= 30);
  const displayedAlerts = currentTab === 'critical-projects' ? criticalAlerts : (slaAlerts || []);

  const activeProject = (scopedProjects || []).find(p => p.id === selectedAlert.projectId) || (scopedProjects || [])[0];

  return (
    <div className="space-y-4">
      
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-rose-600 p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-rose-400">
              MODULE 03
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SCOPE: {effectiveScope}
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Statutory Lapsing Risk Engine (Section 19(7) &amp; Section 25)
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Automated legal countdown monitor tracking lapse of Section 11 preliminary notifications after 12 statutory months.
          </p>
        </div>

        {/* Sub-view switcher - Dedicated full-width horizontal bar */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {[
              { id: 'risk-dashboard', label: `Risk Dashboard (${(slaAlerts || []).length})` },
              { id: 'critical-projects', label: `Critical (<30d) (${(criticalAlerts || []).length})` },
              { id: 'risk-details', label: 'Risk Details & Timeline' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubPage(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currentTab === tab.id
                    ? 'bg-[#1B365D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Summary Band (Section 03: CRITICAL 12, WARNING 28, ON TRACK 94) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div 
          onClick={() => setActiveSubPage('critical-projects')}
          className="bg-white border-l-4 border-rose-600 rounded p-3.5 shadow-xs cursor-pointer hover:bg-rose-50/20 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-mono font-bold text-rose-700">CRITICAL PROJECTS</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-800 font-sans">12 Projects</div>
          <div className="text-[10px] text-rose-700 font-medium mt-0.5">
            &le; 30 Days Remaining before Section 19(7) statutory lapse
          </div>
        </div>

        <div className="bg-white border-l-4 border-amber-500 rounded p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-700">WARNING PROJECTS</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-800 font-sans">28 Projects</div>
          <div className="text-[10px] text-amber-700 font-medium mt-0.5">
            31 to 60 Days Remaining (Objections &amp; SIMP Pending)
          </div>
        </div>

        <div className="bg-white border-l-4 border-emerald-600 rounded p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-700">ON TRACK PROJECTS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-800 font-sans">94 Projects</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
            Well within 12-month window / Form-IV Award completed
          </div>
        </div>
      </div>

      {/* Analytical / Legal Note */}
      <div className="bg-blue-50/70 border border-blue-200 rounded p-3 flex items-start gap-2 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Statutory Compliance Rule:</strong> Under Section 19(7) of the RFCTLARR Act 2013, if no declaration is made within twelve months from the date of publication of the preliminary notification under Section 11(1), the acquisition proceedings shall be deemed to have lapsed. The risk countdown represents an automated monitoring timer, not a judicial finding.
        </p>
      </div>

      {/* 3. Conditional Sub-view Rendering */}
      {currentTab === 'risk-details' ? (
        /* Risk Details & Timeline Sub-view */
        <div className="bg-white border border-slate-200 rounded p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                LAPSING RISK AUDIT: {activeProject.id}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">{activeProject.name}</h3>
              <p className="text-xs text-slate-500">
                Sec 11 Date: <strong>{activeProject.sec11Date}</strong> • Target Sec 19: <strong className="text-rose-700">{activeProject.sec19TargetDate}</strong> ({activeProject.daysRemainingSec19} days left)
              </p>
            </div>

            <button
              onClick={() => openProjectIntelligence(activeProject.id)}
              className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow-xs"
            >
              <span>Open Project Dossier</span>
              <ExternalLink className="w-3 h-3 text-[#C5A059]" />
            </button>
          </div>

          <StatutoryTimeline project={activeProject} />
        </div>
      ) : (
        /* Risk Table Sub-view (Exact Columns from Section 03) */
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#142642] text-white font-bold font-mono text-[10px] uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="p-3">Project</th>
                    <th className="p-3">Section 11 Date</th>
                    <th className="p-3">Section 19 Target</th>
                    <th className="p-3 text-center">Days Remaining</th>
                    <th className="p-3">Current Stage</th>
                    <th className="p-3">Risk Level</th>
                    <th className="p-3">Responsible Authority</th>
                    <th className="p-3">Last Update</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {displayedAlerts.map((alert) => {
                    const isSelected = selectedAlert.id === alert.id;
                    const isCritical = alert.status === 'CRITICAL' || alert.daysRemaining <= 30;

                    return (
                      <tr 
                        key={alert.id}
                        onClick={() => setSelectedAlert(alert)}
                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-amber-50/50 border-l-4 border-l-[#C5A059]' : ''
                        }`}
                      >
                        <td className="p-3">
                          <div className="font-mono font-bold text-[#1B365D]">{alert.projectId}</div>
                          <div className="font-semibold text-slate-900 max-w-[200px] truncate" title={alert.projectName}>
                            {alert.projectName}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-slate-700 whitespace-nowrap">
                          {alert.sec11PublishedDate || '10-Oct-2025'}
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {alert.deadline || '09-Oct-2026'}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <span className={`px-2 py-1 rounded font-mono font-black text-xs ${
                            isCritical 
                              ? 'bg-rose-600 text-white animate-pulse' 
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {alert.daysRemaining} DAYS
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                            {alert.statutoryProvision || 'Section 11(1)'}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isCritical ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {alert.status || 'CRITICAL'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 whitespace-nowrap">
                          {alert.collectorOffice || 'Collector & CALA, Ahmedabad'}
                        </td>
                        <td className="p-3 text-slate-500 font-mono text-[10px] whitespace-nowrap">
                          19 Sep 2026
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAlert(alert);
                                setActiveSubPage('risk-details');
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                            >
                              Timeline
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openProjectIntelligence(alert.projectId);
                              }}
                              className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#142642] text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-xs"
                            >
                              <span>Dossier</span>
                              <ArrowUpRight className="w-3 h-3 text-[#C5A059]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Urgent Directive Dispatch Box for Critical Alert */}
          {selectedAlert && (
            <div className="bg-white border-l-4 border-rose-600 rounded p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Issue Urgent Statutory Directive to CALA / District Collector
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Target: {selectedAlert.projectId} ({selectedAlert.daysRemaining} days left)
                </span>
              </div>

              <form onSubmit={handleIssueDirective} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      Assigned Responsible Authority
                    </label>
                    <input
                      type="text"
                      value={assignedCollector}
                      onChange={(e) => setAssignedCollector(e.target.value)}
                      className="w-full p-2 rounded border border-slate-300 text-xs bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      Enforcement Mechanism
                    </label>
                    <input
                      type="text"
                      disabled
                      value="RFCTLARR Act 2013 Section 19(7) / High Priority Cabinet Circulation"
                      className="w-full p-2 rounded border border-slate-200 text-xs bg-slate-100 text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                    Directive / Action Order Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={directiveNote}
                    onChange={(e) => setDirectiveNote(e.target.value)}
                    placeholder="E.g. Direct Collector Ahmedabad to expedite hearing of Section 15 objections and transmit Section 19 declaration draft within 7 calendar days to prevent statutory expiry."
                    className="w-full p-2.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Official Statutory Directive</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
