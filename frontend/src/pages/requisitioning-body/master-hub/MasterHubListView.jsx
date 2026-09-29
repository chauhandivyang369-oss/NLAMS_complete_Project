import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  Download, 
  Plus, 
  RefreshCw, 
  Grid, 
  List, 
  Maximize2, 
  FileText, 
  AlertTriangle,
  Clock,
  Compass,
  Building,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  X
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';
import StatutoryAuditSidebar from './StatutoryAuditSidebar.jsx';

export default function MasterHubListView({ onSelectProposal }) {
  const { setActiveModule, showToast } = useWorkspace();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [stateFilter, setStateFilter] = useState('All States');
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [scopeFilter, setScopeFilter] = useState('All Scopes');
  const [slaFilter, setSlaFilter] = useState('All Risk Levels');
  const [activeFilters, setActiveFilters] = useState([
    { id: 'fy', label: 'Fiscal Year: 2026–27' },
    { id: 'agency', label: 'Agency: NHAI & Allied PIA' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  // Proposals matching Screenshot 1
  const proposals = [
    {
      id: 'NLAMS-RB-2026-00124',
      name: 'National Highway Corridor - Sec 4A',
      desc: 'Widening to 6-lane bypass connecting NH-48 link',
      state: 'Gujarat',
      districts: 'Ahmedabad, Mehsana, Patan, Banaskantha',
      status: 'UNDER ENQUIRY',
      statusColor: 'amber',
      isOverdue: false
    },
    {
      id: 'NLAMS-RB-2026-00131',
      name: 'Rail Infrastructure Corridor',
      desc: 'Dedicated freight bypass line spanning Palanpur-Abu Ro...',
      state: 'Gujarat / Raj.',
      districts: 'Palanpur, Sirohi, Abu Road',
      status: 'SUBMITTED',
      statusColor: 'blue',
      isOverdue: false
    },
    {
      id: 'NLAMS-RB-2026-00138',
      name: 'Industrial Connectivity Project',
      desc: 'Multi-modal logistics node linking MIDC zone...',
      state: 'Maharashtra',
      districts: 'Pune, Raigad, Thane',
      status: 'AT RISK (SLA)',
      statusColor: 'red',
      isOverdue: true
    },
    {
      id: 'NLAMS-RB-2026-00142',
      name: 'Irrigation Infrastructure Link',
      desc: 'Narmada feeder canal distribution channel segment 8',
      state: 'Madhya Pradesh',
      districts: 'Dhar, Khargone, Barwani',
      status: 'UNDER SCRUTINY',
      statusColor: 'purple',
      isOverdue: false
    },
    {
      id: 'NLAMS-RB-2026-00149',
      name: 'Dedicated Freight Corridor Feeder',
      desc: 'Eastern spine connection terminal at Chandauli Yard...',
      state: 'Uttar Pradesh',
      districts: 'Varanasi, Chandauli, Mirzapur',
      status: 'UNDER SCRUTINY',
      statusColor: 'purple',
      isOverdue: false
    },
    {
      id: 'NLAMS-RB-2026-00155',
      name: 'Greenfield Energy Corridor',
      desc: '765 kV sub-station and renewable evacuation cluster...',
      state: 'Rajasthan',
      districts: 'Bikaner, Jaisalmer, Jodhpur',
      status: 'SUBMITTED',
      statusColor: 'blue',
      isOverdue: false
    },
    {
      id: 'NLAMS-RB-2026-00160',
      name: 'Port Coastal Highway Connectivity',
      desc: '4-lane port access spur from Paradip Outer Ring...',
      state: 'Odisha',
      districts: 'Jagatsinghpur, Kendrapara',
      status: 'DRAFTS',
      statusColor: 'slate',
      isOverdue: false
    }
  ];

  const removeFilter = (id) => {
    setActiveFilters(prev => prev.filter(f => f.id !== id));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setStatusFilter('All Statuses');
    setStateFilter('All States');
    setDistrictFilter('All Districts');
    setTypeFilter('All Types');
    setScopeFilter('All Scopes');
    setSlaFilter('All Risk Levels');
    setSearchTerm('');
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-[#f1f5f9] min-h-full flex flex-col xl:flex-row text-slate-800 font-sans select-none">
      
      {/* Center Left Main Area */}
      <div className="flex-1 p-5 space-y-4 overflow-x-hidden">
        
        {/* Breadcrumb, Title & Top Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              <span>NLAMS</span>
              <span>/</span>
              <span>REQUISITIONING BODY</span>
              <span>/</span>
              <span className="text-slate-700 font-bold">MASTER REQUISITION HUB</span>
              <span className="bg-slate-200 text-slate-700 font-mono text-[9px] px-1.5 py-0.2 rounded font-semibold ml-1">
                V4.2 PROD
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Master Requisition Hub
            </h2>
            <p className="text-xs text-slate-500">
              Central repository of land acquisition requisitions and proposal workflow status under RFCTLARR Act 2013.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => showToast('Refreshed Master Requisitions portfolio cache')}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refresh</span>
            </button>

            <button 
              onClick={() => showToast('Exporting portfolio report (CSV/PDF)...')}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV/PDF</span>
            </button>

            <button 
              onClick={() => setActiveModule('form-i-wizard')}
              className="bg-[#e5a93b] hover:bg-[#d6992f] text-slate-950 px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>+ New Requisition</span>
            </button>
          </div>
        </div>

        {/* 6 Top KPI Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* 1. Total Requisitions */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-[#0b1b36] rounded-md p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <span>TOTAL REQUISITIONS</span>
              <FileText className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans my-1 flex items-baseline gap-1">
              24 <span className="text-xs font-normal text-slate-500">Proposals</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">
              ↑ 8% vs. last fiscal Qtr
            </div>
          </div>

          {/* 2. Drafts */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-slate-400 rounded-md p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <span>DRAFTS</span>
              <span className="text-slate-400 text-xs">≡</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans my-1 flex items-baseline gap-1">
              04 <span className="text-[10px] font-normal text-slate-500">Form-I Prep</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              2 pending survey GIS
            </div>
          </div>

          {/* 3. Submitted */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-blue-600 rounded-md p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <span>SUBMITTED</span>
              <span className="text-blue-500 text-xs">►</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans my-1 flex items-baseline gap-1">
              08 <span className="text-[10px] font-normal text-slate-500">Awaiting Intake</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              District Collectorates
            </div>
          </div>

          {/* 4. Under Scrutiny */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-amber-600 rounded-md p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <span>UNDER SCRUTINY</span>
              <span className="text-amber-500 text-xs">🔍</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans my-1 flex items-baseline gap-1">
              05 <span className="text-[10px] font-normal text-slate-500">Sec. 4 / SIA</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              3 scheduled for hearings
            </div>
          </div>

          {/* 5. Under Enquiry */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-amber-500 rounded-md p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <span>UNDER ENQUIRY</span>
              <span className="text-amber-500 text-xs">⚖</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans my-1 flex items-baseline gap-1">
              03 <span className="text-[10px] font-normal text-slate-500">JMV &amp; Hearing</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              Sec. 15 claims review
            </div>
          </div>

          {/* 6. At Risk (SLA) */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-rose-600 rounded-md p-3 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-bold text-rose-700 uppercase tracking-wider">
              <span>AT RISK (SLA)</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-600 font-sans my-1 flex items-baseline gap-1">
              04 <span className="text-[10px] font-normal text-rose-700">Critical Limits</span>
            </div>
            <div className="text-[10px] text-rose-600 font-medium truncate">
              Expiring in &lt; 15 days
            </div>
          </div>

        </div>

        {/* Filter and Search Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
          
          {/* Row 1: Search and Filter Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Proposal ID / Project / ULPIN / Khasra"
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => showToast('Applied search and filter parameters')}
                className="bg-[#0b1b36] hover:bg-[#152a4f] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Filter className="w-3 h-3 text-amber-400" />
                <span>Apply Filters</span>
              </button>
              
              <button 
                onClick={clearAllFilters}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              >
                Reset
              </button>

              <button 
                onClick={() => showToast('Opened Advanced Geo-Spatial & RFCTLARR Filter Matrix')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <SlidersHorizontal className="w-3 h-3 text-slate-500" />
                <span>Advanced Filters</span>
              </button>
            </div>
          </div>

          {/* Row 2: 6 Dropdown Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {/* 1. Status */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                STATUS
              </label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-slate-400"
              >
                <option>All Statuses</option>
                <option>Drafts</option>
                <option>Submitted</option>
                <option>Under Scrutiny</option>
                <option>Under Enquiry</option>
                <option>At Risk (SLA)</option>
              </select>
            </div>

            {/* 2. State */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                STATE
              </label>
              <select 
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-slate-400"
              >
                <option>All States</option>
                <option>Gujarat</option>
                <option>Maharashtra</option>
                <option>Madhya Pradesh</option>
                <option>Rajasthan</option>
                <option>Uttar Pradesh</option>
                <option>Odisha</option>
              </select>
            </div>

            {/* 3. District */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                DISTRICT
              </label>
              <select 
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-slate-400"
              >
                <option>All Districts</option>
                <option>Ahmedabad</option>
                <option>Mehsana</option>
                <option>Pune</option>
                <option>Dhar</option>
                <option>Varanasi</option>
              </select>
            </div>

            {/* 4. Project Type */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                PROJECT TYPE
              </label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-slate-400"
              >
                <option>All Types</option>
                <option>National Highway (NHAI)</option>
                <option>Dedicated Freight Corridor</option>
                <option>Industrial Logistics Node</option>
                <option>Irrigation Canal Channel</option>
                <option>Greenfield Energy Power</option>
              </select>
            </div>

            {/* 5. Scope */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                SCOPE
              </label>
              <select 
                value={scopeFilter}
                onChange={(e) => setScopeFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-slate-400"
              >
                <option>All Scopes</option>
                <option>Linear Corridor</option>
                <option>Area Bound Node</option>
                <option>Inter-State</option>
              </select>
            </div>

            {/* 6. SLA Risk */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                SLA RISK
              </label>
              <select 
                value={slaFilter}
                onChange={(e) => setSlaFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-slate-400"
              >
                <option>All Risk Levels</option>
                <option>Optimal</option>
                <option>Medium (&lt;30 days)</option>
                <option>Critical (&lt;15 days)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Active Filters Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100 text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE FILTERS:
            </span>
            {activeFilters.map(f => (
              <span 
                key={f.id}
                className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] flex items-center gap-1.5"
              >
                <span>{f.label}</span>
                <button 
                  onClick={() => removeFilter(f.id)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {activeFilters.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-xs text-blue-700 hover:text-blue-800 font-medium ml-1"
              >
                Clear All
              </button>
            )}
          </div>

        </div>

        {/* Registered Land Proposals Table Section */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          
          {/* Header of Table */}
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                REGISTERED LAND PROPOSALS
              </h3>
              <span className="bg-[#0b1b36] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                24 Active
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <button className="p-1 hover:text-slate-600 rounded">
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 text-slate-800 bg-slate-100 rounded">
                <List className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-slate-600 rounded">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b1b36] text-white text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 w-52">PROPOSAL ID</th>
                  <th className="py-2.5 px-4">PROJECT NAME &amp; DESCRIPTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProposals.map((item) => (
                  <tr 
                    key={item.id}
                    onClick={() => onSelectProposal(item.id)}
                    className="hover:bg-amber-50/40 cursor-pointer transition-colors group"
                  >
                    {/* Proposal ID */}
                    <td className="py-3 px-4 font-mono font-bold whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs ${item.isOverdue ? 'text-rose-600 font-bold' : 'text-slate-900'}`}>
                          {item.id}
                        </span>
                        {item.isOverdue && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        )}
                      </div>
                    </td>

                    {/* Name & Description */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-bold text-xs ${item.isOverdue ? 'text-slate-900' : 'text-slate-900'} group-hover:text-blue-700 transition-colors`}>
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                        <div className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 ml-4 flex items-center gap-1 text-[11px] font-medium">
                          <span>Open Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div>
              Showing <span className="font-semibold text-slate-800">1-7</span> of <span className="font-semibold text-slate-800">24</span> Requisitions
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Rows per page:</span>
                <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  disabled
                  className="px-2 py-0.5 border border-slate-200 rounded text-slate-400 cursor-not-allowed text-xs"
                >
                  &lt; Prev
                </button>
                <button className="px-2.5 py-0.5 bg-[#0b1b36] text-white font-bold rounded text-xs">
                  1
                </button>
                <button className="px-2.5 py-0.5 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 text-xs">
                  2
                </button>
                <button className="px-2.5 py-0.5 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 text-xs">
                  3
                </button>
                <button className="px-2 py-0.5 border border-slate-200 hover:bg-slate-100 rounded text-slate-700 text-xs">
                  Next &gt;
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Right Statutory Audit Sidebar */}
      <StatutoryAuditSidebar onSelectProposal={onSelectProposal} />

    </div>
  );
}
