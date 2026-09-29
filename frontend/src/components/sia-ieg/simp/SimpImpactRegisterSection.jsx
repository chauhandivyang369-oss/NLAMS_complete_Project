import React, { useState } from 'react';
import { 
  SEED_SIMP_IMPACTS, 
  SIMP_CATEGORIES, 
  SEVERITY_LEVELS,
  PROJECT_CONTEXT 
} from '../../../services/siaSimpService.js';
import { HEARING_CONCERN_ITEMS } from '../../../services/siaHearingService.js';
import { 
  Layers, 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Link, 
  ArrowRight, 
  FileText, 
  Users, 
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function SimpImpactRegisterSection({ 
  impacts, 
  setImpacts, 
  mitigations, 
  onSelectImpactForMitigation,
  onNavigateToHearing 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [expandedImpactId, setExpandedImpactId] = useState(null);
  const [showAddImpactModal, setShowAddImpactModal] = useState(false);
  const [showImportHearingModal, setShowImportHearingModal] = useState(false);

  const [newImpact, setNewImpact] = useState({
    category: 'Roads',
    affectedComponent: '',
    affectedPopulation: '',
    affectedFamiliesCount: 50,
    affectedVillages: ['Petlad'],
    severity: 'High',
    description: '',
    evidence: 'field_survey_evidence.pdf',
    source: 'SIA Survey'
  });

  const filtered = impacts.filter((imp) => {
    const matchesSearch = 
      imp.impactId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imp.affectedComponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imp.affectedPopulation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = categoryFilter === 'All' || imp.category === categoryFilter;
    const matchesSev = severityFilter === 'All' || imp.severity === severityFilter;

    return matchesSearch && matchesCat && matchesSev;
  });

  const handleAddImpact = (e) => {
    e.preventDefault();
    if (!newImpact.affectedComponent || !newImpact.description) return;

    const id = `IMP-00${impacts.length + 1}`;
    setImpacts([
      ...impacts,
      {
        impactId: id,
        category: newImpact.category,
        affectedComponent: newImpact.affectedComponent,
        affectedPopulation: newImpact.affectedPopulation || 'Affected Community Members',
        affectedFamiliesCount: Number(newImpact.affectedFamiliesCount) || 25,
        affectedVillages: newImpact.affectedVillages,
        linkedParcelOrUlpin: 'Corridor Alignment',
        severity: newImpact.severity,
        description: newImpact.description,
        evidence: newImpact.evidence,
        source: newImpact.source,
        linkedHearingIssueId: null,
        status: 'Mitigation Required'
      }
    ]);

    setNewImpact({
      category: 'Roads',
      affectedComponent: '',
      affectedPopulation: '',
      affectedFamiliesCount: 50,
      affectedVillages: ['Petlad'],
      severity: 'High',
      description: '',
      evidence: 'field_survey_evidence.pdf',
      source: 'SIA Survey'
    });
    setShowAddImpactModal(false);
  };

  const handleImportHearingConcern = (concern) => {
    const id = `IMP-00${impacts.length + 1}`;
    setImpacts([
      ...impacts,
      {
        impactId: id,
        category: concern.category.includes('Road') ? 'Roads' : concern.category.includes('Water') ? 'Water' : 'Livelihood',
        affectedComponent: concern.title,
        affectedPopulation: concern.citizenOrParticipant,
        affectedFamiliesCount: 60,
        affectedVillages: [concern.village],
        linkedParcelOrUlpin: concern.ulpin,
        severity: concern.priority === 'Critical' ? 'Critical' : 'High',
        description: concern.description,
        evidence: concern.evidenceFile,
        source: `Public Hearing (${concern.issueId})`,
        linkedHearingIssueId: concern.issueId,
        linkedAssetId: concern.linkedAssetId,
        status: 'Mitigation Defined'
      }
    ]);
    setShowImportHearingModal(false);
  };

  return (
    <div className="space-y-4">
      {/* 1. Read-Only Project Context Baseline */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              Project Context &amp; Statutory SIA Reference (Read-Only)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#1B365D] border border-blue-200 font-bold">
            Project Ref: {PROJECT_CONTEXT.projectId} • SIA: {PROJECT_CONTEXT.siaReference}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Requiring Body:</span>
            <span className="font-bold text-slate-900 leading-snug">{PROJECT_CONTEXT.requiringBody}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Appropriate Government:</span>
            <span className="font-bold text-slate-900">{PROJECT_CONTEXT.appropriateGovernment}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Location &amp; Corridor:</span>
            <span className="font-bold text-slate-900">{PROJECT_CONTEXT.district}, {PROJECT_CONTEXT.taluka} ({PROJECT_CONTEXT.villages.length} Villages)</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Total Land to Acquire:</span>
            <span className="font-bold font-mono text-[#1B365D]">{PROJECT_CONTEXT.proposedAcquisitionAreaHa} Hectares</span>
          </div>
        </div>
      </div>

      {/* 2. Impact Register Action & Search Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Structured Impact Register (Section 6 SIMP)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500">
            Master repository of social, environmental, housing, and livelihood disruptions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowImportHearingModal(true)}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1B365D] border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Create Impact from Hearing Concern</span>
          </button>

          <button
            onClick={() => setShowAddImpactModal(true)}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Add Social Impact</span>
          </button>
        </div>
      </div>

      {/* 3. Search and Category Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Impact ID / Component / Description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Categories ({SIMP_CATEGORIES.length})</option>
            {SIMP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Severities</option>
            {SEVERITY_LEVELS.map(s => <option key={s} value={s}>Severity: {s}</option>)}
          </select>
        </div>
      </div>

      {/* 4. Main Impacts Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-slate-800">
            RECORDED SOCIAL IMPACTS ({filtered.length} of {impacts.length} Active Items)
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Mandatory Section 6 Mitigation Linkage
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <th className="py-2.5 px-3">Impact ID</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Affected Component &amp; Details</th>
                <th className="py-2.5 px-3">Affected Pop.</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Mitigations</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((imp) => {
                const isExpanded = expandedImpactId === imp.impactId;
                const isCritical = imp.severity === 'Critical';
                const isHigh = imp.severity === 'High';
                const matchedMitigations = mitigations.filter(m => m.impactId === imp.impactId);

                return (
                  <React.Fragment key={imp.impactId}>
                    <tr className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                        {imp.impactId}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                          {imp.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 max-w-sm">
                        <div className="font-bold text-slate-900 leading-snug">{imp.affectedComponent}</div>
                        <div className="text-[11px] text-slate-500 truncate">{imp.description}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800">{imp.affectedFamiliesCount} Families</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{imp.affectedPopulation}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          isCritical 
                            ? 'bg-red-100 text-red-900 border-red-300'
                            : isHigh
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}>
                          {imp.severity}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                          {matchedMitigations.length} Measure(s)
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectImpactForMitigation && onSelectImpactForMitigation(imp.impactId)}
                            className="px-2 py-1 bg-[#1B365D] hover:bg-[#152a48] text-white rounded font-semibold text-[11px] cursor-pointer"
                          >
                            + Mitigation
                          </button>
                          <button
                            onClick={() => setExpandedImpactId(isExpanded ? null : imp.impactId)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Row Details */}
                    {isExpanded && (
                      <tr className="bg-slate-50/80">
                        <td colSpan={7} className="p-4 border-t border-b border-slate-200 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1">
                              <span className="text-[10px] font-mono text-slate-500 block">Full Description:</span>
                              <p className="text-slate-700 leading-relaxed text-[11px]">{imp.description}</p>
                            </div>

                            <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1">
                              <span className="text-[10px] font-mono text-slate-500 block">Traceability &amp; Origin:</span>
                              <div className="text-[11px] text-slate-700">Source: <strong className="text-[#1B365D]">{imp.source}</strong></div>
                              {imp.linkedHearingIssueId && (
                                <div className="text-[11px] text-slate-700">
                                  Linked Hearing Issue: <strong className="font-mono text-purple-700">{imp.linkedHearingIssueId}</strong>
                                </div>
                              )}
                              {imp.linkedAssetId && (
                                <div className="text-[11px] text-slate-700">
                                  Survey Asset ID: <strong className="font-mono text-slate-900">{imp.linkedAssetId}</strong>
                                </div>
                              )}
                              <div className="text-[11px] text-slate-500">Evidence: {imp.evidence}</div>
                            </div>

                            <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1">
                              <span className="text-[10px] font-mono text-slate-500 block">Mapped Mitigation Measures ({matchedMitigations.length}):</span>
                              {matchedMitigations.length > 0 ? (
                                <ul className="space-y-1 text-[11px] text-slate-700">
                                  {matchedMitigations.map(m => (
                                    <li key={m.mitigationId} className="truncate">
                                      • <strong className="font-mono text-[#1B365D]">{m.mitigationId}</strong>: {m.measureDescription}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-amber-700 text-[11px] font-semibold">
                                  No mitigation measure attached yet! Click "+ Mitigation" above to add.
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Social Impact */}
      {showAddImpactModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Identified Social Impact</h3>
              <button onClick={() => setShowAddImpactModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleAddImpact} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Impact Category *</label>
                  <select
                    value={newImpact.category}
                    onChange={(e) => setNewImpact({ ...newImpact, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  >
                    {SIMP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Severity Level</label>
                  <select
                    value={newImpact.severity}
                    onChange={(e) => setNewImpact({ ...newImpact, severity: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold"
                  >
                    {SEVERITY_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Affected Component / Infrastructure *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Village Access Roads & Agricultural Cart Tracks"
                  value={newImpact.affectedComponent}
                  onChange={(e) => setNewImpact({ ...newImpact, affectedComponent: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Affected Population / Group</label>
                  <input
                    type="text"
                    placeholder="e.g. Displaced Residential Families"
                    value={newImpact.affectedPopulation}
                    onChange={(e) => setNewImpact({ ...newImpact, affectedPopulation: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Affected Families Count</label>
                  <input
                    type="number"
                    value={newImpact.affectedFamiliesCount}
                    onChange={(e) => setNewImpact({ ...newImpact, affectedFamiliesCount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Impact Description &amp; Disruptions *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide concrete details of physical displacement, livelihood loss, or access severance..."
                  value={newImpact.description}
                  onChange={(e) => setNewImpact({ ...newImpact, description: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Supporting Evidence Document</label>
                <input
                  type="text"
                  placeholder="e.g. severance_survey_report.pdf"
                  value={newImpact.evidence}
                  onChange={(e) => setNewImpact({ ...newImpact, evidence: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddImpactModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Record Impact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Import Hearing Concern into SIMP */}
      {showImportHearingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-2xl overflow-hidden text-xs max-h-[85vh] flex flex-col">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-sm">Create SIMP Impact from Section 5 Hearing Concern</h3>
                <span className="text-[10px] opacity-80 font-mono">Authoritative intake from Menu 3 Public Hearing</span>
              </div>
              <button onClick={() => setShowImportHearingModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              <p className="text-slate-600 text-[11px]">
                Select an unmitigated objection or representation recorded during the Section 5 Public Hearing to auto-populate a corresponding Social Impact item:
              </p>

              <div className="space-y-2">
                {HEARING_CONCERN_ITEMS.map((c) => (
                  <div key={c.issueId} className="border border-slate-200 rounded-lg p-3 hover:bg-blue-50/40 transition-colors flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#1B365D]">{c.issueId}</span>
                        <span className="font-bold text-slate-900">{c.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-red-100 text-red-800 border border-red-200 font-bold">
                          {c.priority}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] line-clamp-2">{c.description}</p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Source: {c.citizenOrParticipant} • Village: {c.village}
                      </div>
                    </div>

                    <button
                      onClick={() => handleImportHearingConcern(c)}
                      className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded font-semibold text-xs shrink-0 cursor-pointer"
                    >
                      Import as Impact
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowImportHearingModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
