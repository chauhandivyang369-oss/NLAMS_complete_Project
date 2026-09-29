import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Layers, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  MapPin, 
  Building2, 
  Coins, 
  Calendar, 
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Compass
} from 'lucide-react';
import StatutoryTimeline from '../../components/policy-maker/StatutoryTimeline.jsx';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';

export default function PipelinePage() {
  const { 
    scopedProjects, 
    selectedProject, 
    setSelectedProjectId, 
    openProjectIntelligence, 
    effectiveScope,
    activeSubPage,
    setActiveSubPage,
    currentRoleConfig
  } = usePolicyMaker();

  // Active sub-page fallback
  const currentTab = activeSubPage || 'project-repository';

  // Filters from Section 02
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [ministryFilter, setMinistryFilter] = useState('ALL');
  const [requiringBodyFilter, setRequiringBodyFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [ownershipFilter, setOwnershipFilter] = useState('ALL'); // Govt / PPP / Private

  const activeProject = selectedProject || scopedProjects[0];

  const handleResetFilters = () => {
    setSearchQuery('');
    setStateFilter('ALL');
    setMinistryFilter('ALL');
    setRequiringBodyFilter('ALL');
    setSectorFilter('ALL');
    setStageFilter('ALL');
    setRiskFilter('ALL');
    setOwnershipFilter('ALL');
  };

  const filteredProjects = (scopedProjects || []).filter(p => {
    if (stateFilter !== 'ALL' && !p.state.includes(stateFilter)) return false;
    if (sectorFilter !== 'ALL' && p.sector !== sectorFilter) return false;
    if (stageFilter !== 'ALL' && p.currentStage !== stageFilter) return false;
    if (riskFilter !== 'ALL' && p.slaRisk !== riskFilter) return false;
    if (ministryFilter !== 'ALL' && !p.ministry?.toLowerCase().includes(ministryFilter.toLowerCase())) return false;
    if (requiringBodyFilter !== 'ALL' && !p.requiringBody?.toLowerCase().includes(requiringBodyFilter.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.code?.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.districts?.some(d => d.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 02
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SCOPE: {effectiveScope}
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            National / State Pipeline &amp; Project Repository
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Master filterable repository of ongoing and completed acquisitions under RFCTLARR Act 2013.
          </p>
        </div>

        {/* Sub-view switcher - Dedicated full-width horizontal bar */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {[
              { id: 'project-repository', label: `Repository (${(scopedProjects || []).length})` },
              { id: 'project-details', label: 'Project Details' },
              { id: 'statutory-timeline', label: 'Statutory Timeline' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubPage(tab.id);
                  if (tab.id === 'project-details') {
                    openProjectIntelligence(activeProject.id);
                  }
                }}
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

      {/* 2. Filter Toolbar (Section 02) */}
      <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-bold text-slate-800 uppercase font-mono">
              Oversight Filter Matrix
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              ({filteredProjects.length} of {scopedProjects.length} match)
            </span>
          </div>

          <button
            onClick={handleResetFilters}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {/* Search Input */}
          <div className="sm:col-span-2 relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Name, ULPIN, State..."
              className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-[#1B365D] focus:border-[#1B365D]"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full py-1.5 px-2 rounded border border-slate-300 text-xs bg-white focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="ALL">All States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Punjab">Punjab</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full py-1.5 px-2 rounded border border-slate-300 text-xs bg-white focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="ALL">All Sectors</option>
              <option value="Highways & Transport">Highways &amp; Transport</option>
              <option value="Industrial & Freight Corridors">Industrial Corridors</option>
              <option value="Railways & Dedicated Freight">Railways &amp; DFC</option>
              <option value="Energy & Power">Energy &amp; Power</option>
            </select>
          </div>

          {/* Statutory Stage Filter */}
          <div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full py-1.5 px-2 rounded border border-slate-300 text-xs bg-white focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="ALL">All Stages</option>
              <option value="sec_4">Sec 4 SIA Survey</option>
              <option value="sec_11">Sec 11 Preliminary Notification</option>
              <option value="sec_15">Sec 15 Hearing of Objections</option>
              <option value="sec_19">Sec 19 Declaration</option>
              <option value="award">Sec 23 Award</option>
              <option value="possession">Sec 38 Possession</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full py-1.5 px-2 rounded border border-slate-300 text-xs bg-white focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="critical">Critical (&lt; 30d Sec 19)</option>
              <option value="warning">Warning (&lt; 60d)</option>
              <option value="on_track">On Track</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Conditional Content Rendering */}
      {currentTab === 'statutory-timeline' ? (
        /* Statutory Timeline Sub-view */
        <div className="bg-white border border-slate-200 rounded p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                PROJECT: {activeProject.id}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">{activeProject.name}</h3>
              <p className="text-xs text-slate-500">
                RFCTLARR Act 2013 linear lifecycle stepper with statutory lapse dependencies.
              </p>
            </div>
            <button
              onClick={() => openProjectIntelligence(activeProject.id)}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow-xs"
            >
              <span>Full Project Dossier</span>
              <ExternalLink className="w-3 h-3 text-[#C5A059]" />
            </button>
          </div>

          <StatutoryTimeline project={activeProject} />
        </div>
      ) : currentTab === 'project-details' ? (
        /* Project Details Deep Dive Sub-view */
        <div className="bg-white border border-slate-200 rounded p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-white bg-[#1B365D] px-2 py-0.5 rounded">
                  {activeProject.id}
                </span>
                <span className="text-xs font-bold text-slate-600 font-mono">
                  {activeProject.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeProject.slaRisk === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {activeProject.slaRiskLabel}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{activeProject.name}</h3>
              <p className="text-xs text-slate-500">{activeProject.ministry} • {activeProject.appropriateGovernment}</p>
            </div>

            <button
              onClick={() => openProjectIntelligence(activeProject.id)}
              className="px-4 py-2 bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow-xs"
            >
              <span>Open 12-Tab Project Intelligence</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Jurisdiction &amp; Land</span>
              <div className="flex justify-between"><span className="text-slate-600">State:</span><strong className="text-slate-900">{activeProject.state}</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Districts:</span><strong className="text-slate-900">{activeProject.districts?.join(', ')}</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Land Required:</span><strong className="text-slate-900">{activeProject.totalAreaHa} Ha</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Acquired Area:</span><strong className="text-emerald-700">{activeProject.acquiredAreaHa} Ha</strong></div>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Financial Sanctions</span>
              <div className="flex justify-between"><span className="text-slate-600">Sanctioned Outlay:</span><strong className="text-slate-900">₹{activeProject.financialSanctionCr} Cr</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Escrow Deposited:</span><strong className="text-blue-900">₹{activeProject.escrowDepositedCr} Cr</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Disbursed via DBT:</span><strong className="text-emerald-700">₹{activeProject.disbursedCr} Cr</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Status:</span><span className="text-slate-700 font-semibold">{activeProject.financialStatus}</span></div>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">R&amp;R Status</span>
              <div className="flex justify-between"><span className="text-slate-600">Affected Families:</span><strong className="text-slate-900">{activeProject.beneficiariesCount}</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Displaced Families:</span><strong className="text-amber-800">{activeProject.displacedFamiliesCount}</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Scheme Approved:</span><strong className="text-emerald-700">{activeProject.rrApprovedPercent}%</strong></div>
              <div className="flex justify-between"><span className="text-slate-600">Social Audit:</span><span className="text-slate-700 font-semibold">{activeProject.socialAuditStatus}</span></div>
            </div>
          </div>
        </div>
      ) : (
        /* Master Table Sub-view (Exact Columns from Section 02) */
        <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#142642] text-white font-bold font-mono text-[10px] uppercase tracking-wider sticky top-0">
                <tr>
                  <th className="p-3">Project ID</th>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Sector</th>
                  <th className="p-3">Appropriate Govt</th>
                  <th className="p-3">Requiring Body</th>
                  <th className="p-3">State</th>
                  <th className="p-3">District</th>
                  <th className="p-3 text-right">Land Area</th>
                  <th className="p-3">Current Stage</th>
                  <th className="p-3">R&amp;R Status</th>
                  <th className="p-3">Financial Status</th>
                  <th className="p-3">Risk</th>
                  <th className="p-3">Last Updated</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProjects.map((proj, idx) => {
                  const isSelected = proj.id === activeProject.id;
                  return (
                    <tr 
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-amber-50/40 border-l-4 border-l-[#C5A059]' : ''
                      }`}
                    >
                      <td className="p-3 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                        {proj.id}
                      </td>
                      <td className="p-3 font-bold text-slate-900 max-w-[200px] truncate" title={proj.name}>
                        {proj.name}
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">{proj.sector}</td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">{proj.appropriateGovernment}</td>
                      <td className="p-3 text-slate-600 max-w-[150px] truncate" title={proj.requiringBody}>
                        {proj.requiringBody}
                      </td>
                      <td className="p-3 text-slate-800 whitespace-nowrap">{proj.state}</td>
                      <td className="p-3 text-slate-600 whitespace-nowrap">{proj.districts?.join(', ') || proj.district}</td>
                      <td className="p-3 font-mono font-bold text-slate-900 text-right whitespace-nowrap">
                        {proj.totalAreaHa} Ha
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                          {proj.stageLabel ? proj.stageLabel.slice(0, 22) : proj.currentStage}...
                        </span>
                      </td>
                      <td className="p-3 text-slate-700 max-w-[140px] truncate" title={proj.rrStatus}>
                        {proj.rrApprovedPercent ? `${proj.rrApprovedPercent}% Approved` : 'Survey'}
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">
                        ₹{proj.escrowDepositedCr} Cr Funded
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          proj.slaRisk === 'critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : proj.slaRisk === 'warning'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {proj.slaRiskLabel || proj.slaRisk}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-mono text-[10px] whitespace-nowrap">
                        {proj.lastUpdated || '19 Sep 2026'}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProjectId(proj.id);
                              setActiveSubPage('project-details');
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                            title="Quick View Details"
                          >
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProjectId(proj.id);
                              openProjectIntelligence(proj.id);
                            }}
                            className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#142642] text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-xs"
                            title="Open 12-Tab Intelligence Panel"
                          >
                            <span>Open</span>
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

          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredProjects.length} of {scopedProjects.length} projects in authorized scope</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-white border border-slate-300 font-bold text-slate-800">Page 1 of 1</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
