import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  X, 
  Building2, 
  MapPin, 
  ShieldAlert, 
  FileText, 
  Clock, 
  Coins, 
  Users, 
  FolderCheck, 
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import StatutoryTimeline from './StatutoryTimeline.jsx';
import DemoDataBadge from './DemoDataBadge.jsx';

export default function ProjectIntelligenceDrawer() {
  const { 
    isProjectIntelligenceOpen, 
    closeProjectIntelligence, 
    intelligenceProject,
    meetings,
    directives,
    bottlenecks
  } = usePolicyMaker();

  const [activeTab, setActiveTab] = useState('overview');

  if (!isProjectIntelligenceOpen || !intelligenceProject) return null;

  const project = intelligenceProject;
  const projectMeetings = (meetings || []).filter(m => m.agendas?.some(a => a.projectId === project.id));
  const projectDirectives = (directives || []).filter(d => d.projectId === project.id);
  const projectBottlenecks = (bottlenecks || []).filter(b => b.projectId === project.id);

  const tabs = [
    { id: 'overview', label: 'Overview & Form-I', icon: Building2 },
    { id: 'jurisdiction', label: 'Jurisdiction & GIS', icon: MapPin },
    { id: 'timeline', label: 'Statutory Timeline', icon: Clock },
    { id: 'finance', label: 'Compensation & Escrow', icon: Coins },
    { id: 'rnr', label: 'R&R & Affected Families', icon: Users },
    { id: 'governance', label: 'Meetings & Directives', icon: FolderCheck },
    { id: 'bottlenecks', label: 'Bottlenecks', icon: AlertTriangle }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl h-full shadow-2xl flex flex-col border-l border-slate-300 text-slate-800">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#0b1325] text-white border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-mono">
              AIC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-600/40">
                  {project.id}
                </span>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase ${
                  project.slaRisk === 'critical'
                    ? 'bg-rose-950 text-rose-300 border-rose-700 animate-pulse'
                    : project.slaRisk === 'warning'
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                }`}>
                  {project.slaRiskLabel}
                </span>
                <DemoDataBadge />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white mt-1">
                {project.name}
              </h2>
            </div>
          </div>

          <button
            onClick={closeProjectIntelligence}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Subnav */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-1 overflow-x-auto shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-3 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#1B365D] text-[#1B365D] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#f8fafc]">
          
          {/* TAB 1: OVERVIEW & FORM-I */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-3 text-blue-900">
                  Form-I Requisition & Sponsoring Authority
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      Appropriate Government
                    </span>
                    <span className="font-bold text-slate-900">{project.appropriateGovernment}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      Executing Ministry / Department
                    </span>
                    <span className="font-bold text-slate-900">{project.ministry}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      Requisitioning Body (RB)
                    </span>
                    <span className="font-bold text-slate-900">{project.requiringBody}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      Project Implementing Agency (PIA)
                    </span>
                    <span className="font-bold text-slate-900">{project.executingAgency}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Total Extent</span>
                  <span className="text-base font-bold text-slate-900 mt-1 block">{project.totalAreaHa} Ha</span>
                  <span className="text-[10px] text-slate-500 font-mono">({project.totalAreaAcres} Acres)</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Acquired So Far</span>
                  <span className="text-base font-bold text-emerald-700 mt-1 block">{project.acquiredAreaHa} Ha</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {project.totalAreaHa ? ((project.acquiredAreaHa / project.totalAreaHa) * 100).toFixed(1) : '0.0'}% Possession
                  </span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Sanctioned Budget</span>
                  <span className="text-base font-bold text-blue-900 mt-1 block">₹{project.financialSanctionCr} Cr</span>
                  <span className="text-[10px] text-slate-500 font-mono">₹{project.escrowDepositedCr} Cr in Escrow</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Affected Families</span>
                  <span className="text-base font-bold text-purple-900 mt-1 block">{project.beneficiariesCount}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{project.displacedFamiliesCount} Displaced</span>
                </div>
              </div>

              {/* Data Lineage Card */}
              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-900 block">
                  Authoritative Data Lineage & Freshness
                </span>
                <p className="text-slate-700">
                  <strong>Source Stream:</strong> {project.sourceLineage}
                </p>
                <p className="text-slate-600 font-mono text-[11px]">
                  <strong>Last Updated:</strong> {project.lastUpdated} • Certified via DSC Key
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: JURISDICTION & GIS */}
          {activeTab === 'jurisdiction' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-3 text-blue-900">
                  Administrative Jurisdiction & District Breakup
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">State</span>
                    <span className="font-bold text-slate-900 text-sm">{project.state}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">Districts</span>
                    <span className="font-bold text-slate-900 text-sm">{project.districts?.join(', ')}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">Tehsils / Talukas</span>
                    <span className="font-bold text-slate-900 text-sm">{project.tehsils?.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Sample Cadastral Parcels Linked to ULPIN */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider text-blue-900">
                    Sample Geo-Referenced Cadastral Parcels (ULPIN Stack)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">
                    DILRMP 3.0 Standard
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <th className="p-2 font-mono">14-Digit ULPIN</th>
                        <th className="p-2">Khasra / Survey</th>
                        <th className="p-2">Village</th>
                        <th className="p-2">Owner Name</th>
                        <th className="p-2 text-right">Extent (Ha)</th>
                        <th className="p-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {project.parcels?.map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2 font-mono font-bold text-blue-900">{p.ulpin}</td>
                          <td className="p-2 font-bold">{p.khasra}</td>
                          <td className="p-2">{p.village}</td>
                          <td className="p-2 text-slate-700">{p.owner}</td>
                          <td className="p-2 text-right font-mono">{p.areaHa}</td>
                          <td className="p-2 text-center">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-semibold border border-blue-200">
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STATUTORY TIMELINE */}
          {activeTab === 'timeline' && (
            <StatutoryTimeline project={project} />
          )}

          {/* TAB 4: FINANCE & ESCROW */}
          {activeTab === 'finance' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Sanctioned Estimate</span>
                  <span className="text-xl font-bold text-slate-900 mt-1 block">₹{project.financialSanctionCr} Cr</span>
                  <span className="text-[11px] text-slate-500 mt-1 block">100% Compensation + 10% SIA Charges</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Deposited in CALA Escrow</span>
                  <span className="text-xl font-bold text-emerald-700 mt-1 block">₹{project.escrowDepositedCr} Cr</span>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">PFMS Account Verified</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Disbursed via DBT</span>
                  <span className="text-xl font-bold text-blue-900 mt-1 block">₹{project.disbursedCr} Cr</span>
                  <span className="text-[11px] text-slate-500 mt-1 block">{project.dbtStatus}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                <strong>PFMS Banking Notice:</strong> This executive view aggregates live CALA district treasury credit feeds. Statutory rule: Physical possession under Section 38 is legally barred until 100% compensation award is credited to the beneficiary's bank account.
              </div>
            </div>
          )}

          {/* TAB 5: R&R & FAMILIES */}
          {activeTab === 'rnr' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider text-blue-900">
                    RFCTLARR Second Schedule R&R Progress
                  </h3>
                  <span className="text-xs font-bold text-emerald-700">
                    Scheme Approved: {project.rrApprovedPercent}%
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Resettlement Housing Allotted</span>
                      <span>{project.housesAllottedPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.housesAllottedPercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Livelihood Grant & Skill Restored</span>
                      <span>{project.livelihoodRestoredPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${project.livelihoodRestoredPercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Resettlement Colony Civic Infrastructure (Sec 32)</span>
                      <span>{project.infrastructurePercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${project.infrastructurePercent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GOVERNANCE & MEETINGS */}
          {activeTab === 'governance' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 text-blue-900">
                  Associated Committee Review Meetings
                </h3>
                {projectMeetings.length > 0 ? (
                  <div className="space-y-2">
                    {projectMeetings.map(m => (
                      <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{m.meetingNo}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-100 text-blue-900 rounded font-bold">
                              {m.committeeType}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            {m.committeeName} • Date: {m.date}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                          {m.momStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-500 italic p-3">No direct committee hearings scheduled for this project.</div>
                )}
              </div>

              {/* Directives */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 text-blue-900">
                  Active Directives Dispatched
                </h3>
                {projectDirectives.length > 0 ? (
                  <div className="space-y-2">
                    {projectDirectives.map(d => (
                      <div key={d.id} className="p-3 bg-rose-50/50 border border-rose-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-rose-900">{d.id}</span>
                          <span className="text-[10px] font-mono text-slate-500 font-bold">Target: {d.targetDate}</span>
                        </div>
                        <p className="font-semibold text-slate-900 mt-1">{d.issue}</p>
                        <div className="text-[11px] text-slate-600 mt-1">
                          <strong>Assigned to:</strong> {d.assignedAuthority}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-500 italic p-3">No active directives pending for this project.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: BOTTLENECKS */}
          {activeTab === 'bottlenecks' && (
            <div className="space-y-3 text-xs">
              {projectBottlenecks.length > 0 ? (
                projectBottlenecks.map(btn => (
                  <div key={btn.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{btn.id}</span>
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px] border border-rose-300">
                          {btn.category}
                        </span>
                        {btn.slaBreached && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white font-bold text-[9px]">
                            SLA Breached ({btn.ageDays} days)
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{btn.status}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{btn.issue}</h4>
                    <div className="text-[11px] text-slate-600">
                      <strong>Agency:</strong> {btn.department} • <strong>Owner:</strong> {btn.owner}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500">
                  No open inter-departmental bottlenecks registered for this project corridor.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-[11px] text-slate-500 font-mono">
            NLAMS Unified Master Intelligence System • Sec 48/50 Review
          </span>
          <button
            onClick={closeProjectIntelligence}
            className="px-4 py-1.5 rounded-lg bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            Close Intelligence View
          </button>
        </div>

      </div>
    </div>
  );
}
