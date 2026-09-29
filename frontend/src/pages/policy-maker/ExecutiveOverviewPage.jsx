import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import PolicyMakerMap from '../../components/policy-maker/PolicyMakerMap.jsx';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';
import { 
  BarChart3, 
  Map, 
  Layers, 
  Coins, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Filter, 
  TrendingUp,
  Building,
  Shield,
  Eye,
  RefreshCw,
  ExternalLink,
  Users2,
  FileText,
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function ExecutiveOverviewPage() {
  const { 
    kpis, 
    scopedProjects, 
    effectiveScope, 
    currentRoleConfig,
    activeSubPage,
    setActiveSubPage,
    openProjectIntelligence,
    setSelectedProjectId,
    selectedProjectId,
    setActiveModule,
    slaAlerts,
    bottlenecks,
    meetings,
    directives
  } = usePolicyMaker();

  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('ALL');

  // Filtered projects for table
  const displayedProjects = (scopedProjects || []).filter(p => {
    if (selectedStateFilter !== 'ALL' && !p.state.includes(selectedStateFilter)) return false;
    if (selectedSectorFilter !== 'ALL' && p.sector !== selectedSectorFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* 1. Header & Authority Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 01
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
            Executive Overview &amp; GIS Command Center
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            National / State / Project macro-level oversight across RFCTLARR 2013 statutory pipelines, capital outlays, and lapsing risks.
          </p>
        </div>

        {/* Sub-view switcher tabs - Dedicated full-width horizontal bar */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'gis-explorer', label: 'GIS Explorer', icon: Map },
              { id: 'project-intelligence', label: 'Project Intelligence', icon: Compass }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeSubPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubPage(tab.id);
                    if (tab.id === 'project-intelligence') {
                      openProjectIntelligence(selectedProjectId);
                    }
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. 6 Executive KPI Cards (Section 01 & Section 46) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Active Projects */}
        <div 
          onClick={() => {
            setActiveModule('pipeline');
            setActiveSubPage('project-repository');
          }}
          className="bg-white border border-slate-200 rounded p-3 shadow-xs hover:border-[#C5A059] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">Active Projects</span>
            <Building className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans">
            {kpis?.activeProjects || 128}
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
            Across 14 Ministries / States
          </div>
        </div>

        {/* Land Under Acquisition */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">Land Under Acquisition</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans">
            {Number(kpis?.landUnderAcquisitionHa || 42845).toLocaleString()} <span className="text-xs font-normal text-slate-500">Ha</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
            Sec 11 to Sec 19 pipeline
          </div>
        </div>

        {/* Total Land Acquired */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">Land Acquired</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-800 font-sans">
            {Number(kpis?.totalLandAcquiredHa || 18240).toLocaleString()} <span className="text-xs font-normal text-slate-500">Ha</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
            Sec 38 Possession Handover
          </div>
        </div>

        {/* Affected Families */}
        <div 
          onClick={() => {
            setActiveModule('rr-social-audit');
            setActiveSubPage('rnr-dashboard');
          }}
          className="bg-white border border-slate-200 rounded p-3 shadow-xs hover:border-[#C5A059] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">Affected Families</span>
            <Users2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans">
            {Number(kpis?.affectedFamilies || 32480).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
            Second &amp; Third Schedule R&amp;R
          </div>
        </div>

        {/* Compensation Expenditure */}
        <div 
          onClick={() => {
            setActiveModule('finance-oversight');
            setActiveSubPage('financial-dashboard');
          }}
          className="bg-white border border-slate-200 rounded p-3 shadow-xs hover:border-[#C5A059] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">Compensation</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans">
            ₹{Number(kpis?.compensationEscrowCr || 8420).toLocaleString()} <span className="text-xs font-normal text-slate-500">Cr</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
            78.4% Disbursed via PFMS
          </div>
        </div>

        {/* At-Risk Projects */}
        <div 
          onClick={() => {
            setActiveModule('risk-engine');
            setActiveSubPage('critical-projects');
          }}
          className="bg-white border-l-4 border-rose-600 rounded p-3 shadow-xs hover:border-[#C5A059] transition-colors cursor-pointer group bg-rose-50/30"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold text-rose-700">At-Risk Projects</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-800 font-sans">
            {kpis?.atRiskProjects || 17}
          </div>
          <div className="text-[10px] text-rose-700 font-bold mt-0.5">
            12 Critical (&lt; 30d Section 19)
          </div>
        </div>
      </div>

      {/* 3. Conditional Sub-view Rendering */}
      {activeSubPage === 'gis-explorer' ? (
        /* GIS Explorer Full View */
        <div className="space-y-3">
          <PolicyMakerMap height="580px" />
        </div>
      ) : (
        /* Complete 5-Row Executive Dashboard Layout (Section 46) */
        <div className="space-y-4">
          
          {/* ROW 2: GIS MAP + PROJECT RISK SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* GIS Map (Left 7/12 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded p-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-[#1B365D]" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Statutory GIS Map &amp; Alignment Corridor
                  </span>
                </div>
                <button
                  onClick={() => setActiveSubPage('gis-explorer')}
                  className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
                >
                  <span>Expand GIS Canvas</span>
                  <ExternalLink className="w-3 h-3 text-[#C5A059]" />
                </button>
              </div>
              <PolicyMakerMap height="360px" />
            </div>

            {/* Project Risk Summary (Right 4/12 cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                      Statutory Risk Summary
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded">
                    Sec 19(7) SLA
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-rose-900 font-mono text-[11px]">
                      <span>PRJ-2026-GJ05 (Dholera Corridor)</span>
                      <span className="bg-rose-600 text-white px-1.5 py-0.2 rounded text-[10px]">14 Days Left</span>
                    </div>
                    <p className="text-[11px] text-rose-800 mt-1">
                      Declaration under Section 19 due on 09-Oct-2026. Awaiting final Collector R&amp;R sanction.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-amber-900 font-mono text-[11px]">
                      <span>PRJ-2026-NH04 (Delhi-Katra Expwy)</span>
                      <span className="bg-amber-600 text-white px-1.5 py-0.2 rounded text-[10px]">28 Days Left</span>
                    </div>
                    <p className="text-[11px] text-amber-800 mt-1">
                      Section 15 objections scrutiny underway at Patiala CALA office.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono text-[11px]">
                      <span>PRJ-2025-DFCCIL (WDFC Bypass)</span>
                      <span className="bg-emerald-600 text-white px-1.5 py-0.2 rounded text-[10px]">On Track</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Section 23 Form-VI award passed. Possession handover at 84%.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModule('risk-engine');
                  setActiveSubPage('risk-dashboard');
                }}
                className="w-full mt-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>OPEN FULL RISK ENGINE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>

          {/* ROW 3: PROJECT PIPELINE + R&R PROGRESS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Project Pipeline Snippet (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1B365D]" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Project Pipeline ({displayedProjects.length} Projects in Scope)
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveModule('pipeline');
                    setActiveSubPage('project-repository');
                  }}
                  className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
                >
                  <span>View All Projects</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="p-2">Project ID</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Sector</th>
                      <th className="p-2">State</th>
                      <th className="p-2">Land Area</th>
                      <th className="p-2">Current Stage</th>
                      <th className="p-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedProjects.slice(0, 4).map(proj => (
                      <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 font-mono font-bold text-[#1B365D]">{proj.id}</td>
                        <td className="p-2 font-semibold text-slate-900 max-w-[180px] truncate">{proj.name}</td>
                        <td className="p-2 text-slate-600">{proj.sector}</td>
                        <td className="p-2 text-slate-600">{proj.state}</td>
                        <td className="p-2 font-mono">{proj.totalAreaHa} Ha</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            proj.slaRisk === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : proj.slaRisk === 'warning'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {proj.stageLabel ? proj.stageLabel.slice(0, 20) : proj.currentStage}...
                          </span>
                        </td>
                        <td className="p-2 text-right">
                          <button
                            onClick={() => openProjectIntelligence(proj.id)}
                            className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-700 text-[10px] font-bold rounded transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* R&R Progress (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-purple-700" />
                    <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                      R&amp;R Implementation Status
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 font-mono">SCHED II &amp; III</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">Form-V Scheme Approval</span>
                      <span className="font-bold text-slate-900">82%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">Housing Plots Allotted</span>
                      <span className="font-bold text-slate-900">68%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">Livelihood Restored</span>
                      <span className="font-bold text-slate-900">74%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">Schedule III Amenities</span>
                      <span className="font-bold text-slate-900">60%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModule('rr-social-audit');
                  setActiveSubPage('rnr-dashboard');
                }}
                className="w-full mt-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded flex items-center justify-center gap-1 transition-colors"
              >
                <span>View R&amp;R Oversight Matrix</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>

          {/* ROW 4: FINANCIAL OVERVIEW + BOTTLENECKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Financial Overview (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Financial Escrow &amp; PFMS Outlays
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                  ₹8,420 Cr Capital Pool
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Sanctioned Outlay</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">₹14,250 Cr</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Escrow Deposited</div>
                  <div className="text-sm font-bold text-blue-900 mt-0.5">₹8,420 Cr</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">DBT Disbursed</div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5">₹6,602 Cr</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                78.4% of awarded compensation deposited into verified bank accounts through NPCI Aadhaar DBT gateway with Section 96 tax exemption.
              </p>
            </div>

            {/* Bottlenecks (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Inter-Department Bottlenecks ({bottlenecks.length} Active)
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveModule('bottleneck-resolver');
                    setActiveSubPage('dashboard');
                  }}
                  className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
                >
                  <span>Resolve Issues</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {bottlenecks.slice(0, 2).map(b => (
                  <div key={b.id} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 font-mono text-[11px]">{b.projectId} • {b.category}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        b.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.severity} ({b.ageDays}d old)
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700 mt-1 font-medium">{b.issue}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Assigned to: {b.assignedAuthority}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 5: RECENT MEETINGS + DIRECTIVES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Recent Meetings (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1B365D]" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    NMC / SMC Statutory Meetings
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveModule('meetings-mom');
                    setActiveSubPage('meetings');
                  }}
                  className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
                >
                  <span>All Meetings</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {meetings.slice(0, 2).map(m => (
                  <div key={m.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{m.title}</div>
                      <div className="text-[11px] text-slate-500">Date: {m.date} • Mode: {m.mode}</div>
                      <div className="text-[10px] text-slate-400">Chair: {m.chairperson}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directives (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Statutory Directives &amp; Action Orders
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveModule('meetings-mom');
                    setActiveSubPage('directives');
                  }}
                  className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
                >
                  <span>View Directives</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {directives.slice(0, 2).map(d => (
                  <div key={d.id} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#1B365D] text-[11px]">{d.id}</span>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                        Target: {d.targetDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-900 mt-1">{d.issue}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Assigned to: {d.assignedAuthority}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
