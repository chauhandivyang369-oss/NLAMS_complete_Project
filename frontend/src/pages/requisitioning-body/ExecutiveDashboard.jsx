import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Compass, 
  Home, 
  ChevronDown, 
  RefreshCw, 
  AlertTriangle, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Check, 
  Shield, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  List,
  Layers
} from 'lucide-react';

export default function ExecutiveDashboard() {
  const { setActiveModule, openAiAssistant } = useWorkspace();
  const [filterText, setFilterText] = useState('');
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState('Current Portfolio (All Active Projects)');

  // Projects data matching the screenshot
  const projects = [
    {
      id: 'NLAMS-RB-2026-00124',
      name: 'National Highway Corridor',
      subtext: 'NHAI Ext. Sec-4A',
      state: 'Gujarat',
      districts: '4 Districts',
      proposed: '324.50 Ha',
      acquired: '218.40 Ha',
      compensation: '₹142.8 Cr',
      rnr: '72%',
      possession: '67%',
      slaRisk: 'Optimal',
      slaStatus: 'green',
      isWarning: false
    },
    {
      id: 'NLAMS-RB-2026-00131',
      name: 'Rail Infrastructure Corridor',
      subtext: 'DFCC Dedicated Link',
      state: 'Gujarat / Raj.',
      districts: '8 Districts',
      proposed: '842.20 Ha',
      acquired: '531.60 Ha',
      compensation: '₹286.4 Cr',
      rnr: '61%',
      possession: '54%',
      slaRisk: 'Medium',
      slaStatus: 'amber',
      isWarning: false
    },
    {
      id: 'NLAMS-RB-2026-00138',
      name: 'Industrial Connectivity Project',
      subtext: 'Objection review • SLA in 4 days',
      state: 'Maharashtra',
      districts: '3 Districts',
      proposed: '412.80 Ha',
      acquired: '188.20 Ha',
      compensation: '₹119.7 Cr',
      rnr: '49%',
      possession: '42%',
      slaRisk: 'High',
      slaStatus: 'red',
      isWarning: true
    },
    {
      id: 'NLAMS-RB-2026-00142',
      name: 'Irrigation Infrastructure',
      subtext: 'Narmada Basin Feeders',
      state: 'Madhya Pradesh',
      districts: '5 Districts',
      proposed: '628.40 Ha',
      acquired: '472.10 Ha',
      compensation: '₹231.5 Cr',
      rnr: '81%',
      possession: '76%',
      slaRisk: 'Optimal',
      slaStatus: 'green',
      isWarning: false
    }
  ];

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(filterText.toLowerCase()) ||
    p.id.toLowerCase().includes(filterText.toLowerCase()) ||
    p.state.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-[#f1f5f9] min-h-full flex flex-col xl:flex-row text-slate-800 font-sans select-none">
      
      {/* Center Main Dashboard Area */}
      <div className="flex-1 p-5 space-y-4 overflow-x-hidden">
        
        {/* Breadcrumb, Title & Top Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              NLAMS &gt; Requisitioning Body &gt; Executive Dashboard
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Executive Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Real-time overview of land acquisition requisitions, statutory progress and project delivery.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Scope Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setScopeDropdownOpen(!scopeDropdownOpen)}
                className="bg-white border border-slate-200 hover:border-slate-300 shadow-xs px-3 py-1.5 rounded-md text-xs flex items-center gap-2 text-slate-700 font-medium transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>Scope:</span>
                <span className="font-bold text-slate-900">{selectedScope}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {scopeDropdownOpen && (
                <div className="absolute right-0 mt-1 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-30 p-1 text-xs">
                  {[
                    'Current Portfolio (All Active Projects)',
                    'National Highway Projects (NHAI)',
                    'Railway Freight Corridors (DFCCIL)',
                    'Industrial & Energy Corridors'
                  ].map((scope) => (
                    <button
                      key={scope}
                      onClick={() => {
                        setSelectedScope(scope);
                        setScopeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedScope === scope ? 'bg-amber-50 text-amber-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Last updated box */}
            <div className="bg-white border border-slate-200 shadow-xs px-3 py-1.5 rounded-md text-xs flex items-center gap-2 text-slate-600">
              <span className="text-slate-400">Last updated:</span>
              <span className="font-semibold text-slate-800">14 Sep 2026, 14:32 IST</span>
              <button 
                title="Refresh Metrics" 
                className="text-slate-400 hover:text-slate-600 hover:rotate-180 transition-transform ml-0.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Core Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          
          {/* Card 1: Active Projects */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase truncate">
                Active Projects
              </span>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                Active
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 my-1 font-sans tracking-tight truncate">
              18
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              24 total requisitions
            </div>
          </div>

          {/* Card 2: Pending Requisitions */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase truncate">
                Pending
              </span>
              <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full shrink-0">
                Action Req.
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 my-1 font-sans tracking-tight truncate">
              6
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Requires RB action
            </div>
          </div>

          {/* Card 3: Land Proposed */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase truncate">
                Land Proposed
              </span>
              <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 my-1 font-sans tracking-tight truncate">
              4,825.40 <span className="text-xs font-normal text-slate-500">Ha</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Across active req.
            </div>
          </div>

          {/* Card 4: Land Acquired */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase truncate">
                Land Acquired
              </span>
              <span className="text-[9px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded shrink-0">
                60.7%
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 my-1 font-sans tracking-tight truncate">
              2,930.15 <span className="text-xs font-normal text-slate-500">Ha</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Target: 4,825.40 Ha
            </div>
          </div>

          {/* Card 5: Compensation */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase truncate">
                Compensation
              </span>
              <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1 rounded">INR</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 my-1 font-sans tracking-tight truncate" title="₹1,284.62 Cr">
              ₹1,284.62 <span className="text-xs font-normal text-slate-500">Cr</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Assessed &amp; in escrow
            </div>
          </div>

          {/* Card 6: Affected Families */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase truncate">
                Affected Families
              </span>
              <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 my-1 font-sans tracking-tight truncate">
              8,412
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Displaced: 2,184
            </div>
          </div>

        </div>

        {/* 5 Mini-Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* 1: R&R Progress */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                R&amp;R Progress
              </span>
              <span className="text-xs font-bold text-slate-900">68%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="text-[10px] text-slate-500">
              5,720 / 8,412 families
            </div>
          </div>

          {/* 2: Possession Status */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                Possession Status
              </span>
              <span className="text-xs font-bold text-slate-900">61%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '61%' }}></div>
            </div>
            <div className="text-[10px] text-slate-500">
              2,930.15 Ha acquired
            </div>
          </div>

          {/* 3: SLA At Risk */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                SLA At Risk
              </span>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">
                Critical
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 my-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>3 Projects</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Statutory milestone warning
            </div>
          </div>

          {/* 4: Pending Actions */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                Pending Actions
              </span>
              <span className="text-xs font-bold text-slate-900">11</span>
            </div>
            <div className="flex items-center gap-1 my-1">
              <span className="text-[9px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                5 High
              </span>
              <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                4 Med
              </span>
              <span className="text-[9px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                2 Low
              </span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              5 high priority requires sign-off
            </div>
          </div>

          {/* 5: Document Verification */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                Document Verification
              </span>
              <span className="text-xs font-bold text-slate-900">92%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="text-[10px] text-slate-500">
              24 documents pending review
            </div>
          </div>

        </div>

        {/* National Land Acquisition Lifecycle Stage Distribution */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                National Land Acquisition Lifecycle
              </h3>
              <span className="text-xs text-slate-500">
                (Statutory Portfolio Stage Distribution)
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-700"></span>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>At-Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span>Upcoming</span>
              </div>
            </div>
          </div>

          {/* 10 Lifecycle Stages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-2 mt-3 text-center">
            
            {/* 1. Requisition */}
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-emerald-900 truncate">1. REQUISITION</div>
              <div className="text-xs font-bold text-emerald-950 my-1 font-mono">24 / 24</div>
              <div className="text-[9px] text-emerald-700">100% Cleared</div>
            </div>

            {/* 2. SIA */}
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-emerald-900 truncate">2. SIA</div>
              <div className="text-xs font-bold text-emerald-950 my-1 font-mono">22 / 24</div>
              <div className="text-[9px] text-emerald-700">Reports Filed</div>
            </div>

            {/* 3. Expert Eval */}
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-emerald-900 truncate">3. EXPERT EVAL</div>
              <div className="text-xs font-bold text-emerald-950 my-1 font-mono">20 / 24</div>
              <div className="text-[9px] text-emerald-700">Evaluated</div>
            </div>

            {/* 4. Prelim Notif */}
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-emerald-900 truncate">4. PRELIM NOTIF</div>
              <div className="text-xs font-bold text-emerald-950 my-1 font-mono">18 / 24</div>
              <div className="text-[9px] text-emerald-700">Gazette Issued</div>
            </div>

            {/* 5. Objections (Active / Highlighted) */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-md p-2 flex flex-col justify-between shadow-xs">
              <div className="text-[10px] font-bold text-amber-900 truncate">5. OBJECTIONS</div>
              <div className="text-xs font-bold text-amber-950 my-1 font-mono">15 / 24</div>
              <div className="text-[9px] font-semibold text-amber-800">3 at SLA Risk</div>
            </div>

            {/* 6. Declaration */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-700 truncate">6. DECLARATION</div>
              <div className="text-xs font-bold text-slate-800 my-1 font-mono">12 / 24</div>
              <div className="text-[9px] text-slate-500">Sec 19 Issued</div>
            </div>

            {/* 7. Award */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-700 truncate">7. AWARD</div>
              <div className="text-xs font-bold text-slate-800 my-1 font-mono">9 / 24</div>
              <div className="text-[9px] text-slate-500">Awards Drafted</div>
            </div>

            {/* 8. Compensation */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-700 truncate">8. COMPENSATION</div>
              <div className="text-xs font-bold text-slate-800 my-1 font-mono">7 / 24</div>
              <div className="text-[9px] text-slate-500">DBT In-flight</div>
            </div>

            {/* 9. R&R */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-700 truncate">9. R&amp;R</div>
              <div className="text-xs font-bold text-slate-800 my-1 font-mono">6 / 24</div>
              <div className="text-[9px] text-slate-500">Resettlement</div>
            </div>

            {/* 10. Possession */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-700 truncate">10. POSSESSION</div>
              <div className="text-xs font-bold text-slate-800 my-1 font-mono">4 / 24</div>
              <div className="text-[9px] text-slate-500">Final Handover</div>
            </div>

          </div>
        </div>

        {/* Project Acquisition Progress Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          
          {/* Table Control Header */}
          <div className="p-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Project Acquisition Progress
              </h3>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                18 Active Projects
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Search filter input */}
              <div className="relative">
                <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter project..."
                  className="bg-slate-50 border border-slate-200 rounded-md pl-7 pr-3 py-1 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-400 w-36 sm:w-44"
                />
              </div>

              {/* Sort Button */}
              <button className="bg-white hover:bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-700 font-medium flex items-center gap-1 transition-colors">
                <ArrowUpDown className="w-3 h-3 text-slate-500" />
                <span>Sort</span>
              </button>

              {/* Export CSV Button */}
              <button className="bg-white hover:bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-700 font-medium flex items-center gap-1 transition-colors">
                <Download className="w-3 h-3 text-slate-500" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Project ID</th>
                  <th className="py-2.5 px-3">Project Name</th>
                  <th className="py-2.5 px-3">State</th>
                  <th className="py-2.5 px-3">Districts</th>
                  <th className="py-2.5 px-3">Proposed</th>
                  <th className="py-2.5 px-3">Acquired</th>
                  <th className="py-2.5 px-3">Compensation</th>
                  <th className="py-2.5 px-3">R&amp;R</th>
                  <th className="py-2.5 px-3">Possession</th>
                  <th className="py-2.5 px-3">SLA Risk / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Project ID */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {p.id}
                    </td>

                    {/* Project Name & Subtext */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 font-bold text-slate-900">
                        <span>{p.name}</span>
                        {p.isWarning && (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 inline" />
                        )}
                      </div>
                      <div className={`text-[11px] ${p.isWarning ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
                        {p.subtext}
                      </div>
                    </td>

                    {/* State */}
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                      {p.state}
                    </td>

                    {/* Districts */}
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                      {p.districts}
                    </td>

                    {/* Proposed */}
                    <td className="py-3 px-3 font-mono text-slate-800 whitespace-nowrap">
                      {p.proposed}
                    </td>

                    {/* Acquired */}
                    <td className="py-3 px-3 font-mono font-bold whitespace-nowrap">
                      <span className={p.isWarning ? 'text-rose-600' : 'text-emerald-600'}>
                        {p.acquired}
                      </span>
                    </td>

                    {/* Compensation */}
                    <td className="py-3 px-3 font-mono text-slate-900 whitespace-nowrap">
                      {p.compensation}
                    </td>

                    {/* R&R */}
                    <td className="py-3 px-3 font-mono text-slate-800 whitespace-nowrap">
                      {p.rnr}
                    </td>

                    {/* Possession */}
                    <td className="py-3 px-3 font-mono text-slate-800 whitespace-nowrap">
                      {p.possession}
                    </td>

                    {/* SLA Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {p.slaStatus === 'green' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Optimal
                        </span>
                      )}
                      {p.slaStatus === 'amber' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Medium
                        </span>
                      )}
                      {p.slaStatus === 'red' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                          Critical
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Right Compliance & Audit Sidebar (Fixed ~320px on XL screens) */}
      <div className="w-full xl:w-80 bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-4 space-y-4 shrink-0 shadow-xs">
        
        {/* Compliance Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Compliance &amp; Audit
            </span>
          </div>
          <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded">
            Live Sync
          </span>
        </div>

        {/* Box 1: Action Required */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Action Required
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">11 Total</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-rose-50 border border-rose-200 rounded-md p-2 text-center">
              <div className="text-xl font-bold text-rose-600 leading-tight">3</div>
              <div className="text-[9px] font-bold text-rose-700 tracking-wider uppercase">High</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-center">
              <div className="text-xl font-bold text-amber-600 leading-tight">5</div>
              <div className="text-[9px] font-bold text-amber-700 tracking-wider uppercase">Medium</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 text-center">
              <div className="text-xl font-bold text-slate-600 leading-tight">3</div>
              <div className="text-[9px] font-bold text-slate-600 tracking-wider uppercase">Low</div>
            </div>
          </div>

          <button 
            onClick={() => setActiveModule('objections-hearings')}
            className="w-full bg-[#0c1e3d] hover:bg-[#162d58] text-white py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>View All Pending Actions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Box 2: Portfolio Milestone Tracker */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Portfolio Milestone Tracker
            </span>
            <span className="text-xs font-mono text-slate-500">10 STAGES</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {/* Stage 1 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-700">
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1. Requisition</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">✔ Done</span>
            </div>

            {/* Stage 2 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-700">
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>2. SIA</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">✔ Done</span>
            </div>

            {/* Stage 3 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-700">
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3. Expert Evaluation</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">✔ Done</span>
            </div>

            {/* Stage 4 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-700">
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>4. Preliminary Notification</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">✔ Done</span>
            </div>

            {/* Stage 5 (Active Highlighted) */}
            <div className="flex items-center justify-between py-1.5 px-2 bg-amber-50/80 border border-amber-300 rounded font-semibold text-amber-950 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>5. Objections</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-white">
                • Active
              </span>
            </div>

            {/* Stage 6 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">○</span>
                <span>6. Declaration</span>
              </div>
              <span className="text-[11px]">○ Pending</span>
            </div>

            {/* Stage 7 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">○</span>
                <span>7. Award</span>
              </div>
              <span className="text-[11px]">○ Pending</span>
            </div>

            {/* Stage 8 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">○</span>
                <span>8. Compensation</span>
              </div>
              <span className="text-[11px]">○ Pending</span>
            </div>

            {/* Stage 9 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">○</span>
                <span>9. R&amp;R</span>
              </div>
              <span className="text-[11px]">○ Pending</span>
            </div>

            {/* Stage 10 */}
            <div className="flex items-center justify-between py-1 px-1.5 rounded text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">○</span>
                <span>10. Possession</span>
              </div>
              <span className="text-[11px]">○ Pending</span>
            </div>

          </div>
        </div>

        {/* Box 3: Audit Trail */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Audit Trail
            </span>
            <span className="text-[10px] font-mono text-slate-400">Immutable</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Event 1 */}
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-blue-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  14:32
                </span>
                <span className="text-slate-500 font-medium">RB Manager</span>
              </div>
              <div className="text-slate-800 font-medium mt-0.5">Updated GIS parcel dataset</div>
              <div className="text-[10px] text-slate-400 font-mono">Project: NLAMS-RB-2026-00124</div>
            </div>

            {/* Event 2 */}
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  13:48
                </span>
                <span className="text-slate-500 font-medium">System</span>
              </div>
              <div className="text-slate-800 font-medium mt-0.5">Payment verification completed (Escrow)</div>
              <div className="text-[10px] text-slate-400 font-mono">Project: NLAMS-RB-2026-00124</div>
            </div>

            {/* Event 3 */}
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-blue-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  12:20
                </span>
                <span className="text-slate-500 font-medium">District Authority</span>
              </div>
              <div className="text-slate-800 font-medium mt-0.5">Proposal accessed / Form-I viewed</div>
              <div className="text-[10px] text-slate-400 font-mono">Proposal: RB-00131</div>
            </div>

            {/* Event 4 */}
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-blue-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  11:04
                </span>
                <span className="text-slate-500 font-medium">RB Manager</span>
              </div>
              <div className="text-slate-800 font-medium mt-0.5">Uploaded supporting document</div>
              <div className="text-[10px] text-slate-400 font-mono">Proposal: RB-00138</div>
            </div>

            {/* Event 5 */}
            <div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-amber-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  10:42
                </span>
                <span className="text-slate-500 font-medium">System</span>
              </div>
              <div className="text-slate-800 font-medium mt-0.5">SLA risk recalculated (Amber Warning)</div>
              <div className="text-[10px] text-slate-400 font-mono">Project: NLAMS-RB-2026-00138</div>
            </div>
          </div>

          <button 
            onClick={() => setActiveModule('pia-rbac')}
            className="w-full mt-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 transition-colors text-center"
          >
            View Full Audit Trail
          </button>
        </div>

      </div>

    </div>
  );
}

