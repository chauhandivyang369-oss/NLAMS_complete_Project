import React, { useState } from 'react';
import { 
  MITIGATION_STATUSES,
  SIMP_CATEGORIES 
} from '../../../services/siaSimpService.js';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  Calendar, 
  IndianRupee, 
  Layers, 
  FileText, 
  Edit3,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function SimpMitigationSection({ 
  impacts, 
  mitigations, 
  setMitigations, 
  preselectedImpactId 
}) {
  const [selectedImpactFilter, setSelectedImpactFilter] = useState(preselectedImpactId || 'All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMeasure, setSelectedMeasure] = useState(null);

  const [newMeasure, setNewMeasure] = useState({
    impactId: preselectedImpactId || (impacts[0]?.impactId || 'IMP-001'),
    measureDescription: '',
    responsibleAgency: 'Western Railway (Construction Organization)',
    department: 'Civil Engineering Division',
    officerOrContact: 'Executive Engineer (Const.)',
    supportingAgency: 'Collectorate Anand',
    responsibilityDescription: 'Execute engineering works under project escrow budget.',
    estimatedCost: 2500000,
    costBasis: 'PWD / Railway Schedule of Rates 2026',
    startDate: '2026-08-01',
    targetCompletionDate: '2027-04-30',
    milestone: 'Sub-structure & foundation completion',
    status: 'Planned',
    evidenceFile: 'mitigation_civil_estimate.pdf'
  });

  const filtered = mitigations.filter((m) => {
    const matchesImpact = selectedImpactFilter === 'All' || m.impactId === selectedImpactFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesSearch = 
      m.mitigationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.measureDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.responsibleAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.impactId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesImpact && matchesStatus && matchesSearch;
  });

  const handleAddMeasure = (e) => {
    e.preventDefault();
    if (!newMeasure.measureDescription) return;

    const id = `MIT-00${mitigations.length + 1}`;
    setMitigations([
      ...mitigations,
      {
        mitigationId: id,
        impactId: newMeasure.impactId,
        measureDescription: newMeasure.measureDescription,
        responsibleAgency: newMeasure.responsibleAgency,
        department: newMeasure.department,
        officerOrContact: newMeasure.officerOrContact,
        supportingAgency: newMeasure.supportingAgency,
        responsibilityDescription: newMeasure.responsibilityDescription,
        estimatedCost: Number(newMeasure.estimatedCost) || 0,
        costBasis: newMeasure.costBasis,
        startDate: newMeasure.startDate,
        targetCompletionDate: newMeasure.targetCompletionDate,
        milestone: newMeasure.milestone,
        status: newMeasure.status,
        evidenceFile: newMeasure.evidenceFile,
        monitoringIndicator: {
          indicator: 'Timely Execution & Functional Quality',
          baseline: 'Zero mitigation baseline',
          target: '100% completion within scheduled civil works window',
          measurementMethod: 'Independent engineer inspection and Gram Panchayat signoff',
          frequency: 'Quarterly',
          responsibleAgency: 'Third-Party Monitoring Agency',
          evidence: 'monitoring_inspection_memo.pdf'
        },
        remarks: 'Formulated in response to SIA identified impact.'
      }
    ]);

    setShowAddModal(false);
  };

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-4">
      {/* 1. Top Section Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Mitigation Measures Matrix (Section 6 SIMP)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            1-to-Many Architecture: Detailed engineering, resettlement, and community restoration measures
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Add Mitigation Measure</span>
        </button>
      </div>

      {/* 2. Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Measure ID / Description / Agency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedImpactFilter}
            onChange={(e) => setSelectedImpactFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none max-w-[220px]"
          >
            <option value="All">Filter by Impact: All ({impacts.length})</option>
            {impacts.map(i => (
              <option key={i.impactId} value={i.impactId}>
                {i.impactId}: {i.affectedComponent.slice(0, 24)}...
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {MITIGATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* 3. Mitigations Cards / Table */}
      <div className="space-y-3">
        {filtered.map((m) => {
          const parentImpact = impacts.find(i => i.impactId === m.impactId);
          const isOverdue = new Date(m.targetCompletionDate) < new Date() && m.status !== 'Completed';

          return (
            <div 
              key={m.mitigationId} 
              className="bg-white border border-slate-200 hover:border-[#1B365D]/50 rounded-xl p-4 shadow-2xs space-y-3 transition-all"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {m.mitigationId}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="font-mono font-bold text-xs text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Linked: {m.impactId}
                  </span>
                  <span className="font-semibold text-slate-700 text-xs">
                    ({parentImpact?.affectedComponent || 'Impact Record'})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    m.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : m.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : isOverdue
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {isOverdue ? 'Overdue' : m.status}
                  </span>

                  <button
                    onClick={() => setSelectedMeasure(m)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#1B365D] rounded font-semibold text-[11px] cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                {m.measureDescription}
              </p>

              {/* Administrative Responsibilities & Cost Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">Responsible Agency &amp; Dept:</span>
                  <strong className="text-slate-900 block leading-tight">{m.responsibleAgency}</strong>
                  <span className="text-[11px] text-slate-600 block">{m.department}</span>
                  <span className="text-[10px] text-slate-500 block">Nodal Officer: {m.officerOrContact}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">Estimated Mitigation Cost:</span>
                  <span className="text-base font-bold font-mono text-[#1B365D] block">
                    {formatINR(m.estimatedCost)}
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight">Basis: {m.costBasis}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">Civil Implementation Horizon:</span>
                  <span className="font-bold text-slate-900 block">{m.startDate} → {m.targetCompletionDate}</span>
                  <span className="text-[10px] text-slate-600 block">Milestone: {m.milestone}</span>
                </div>
              </div>

              {/* Monitoring Indicator Snippet */}
              {m.monitoringIndicator && (
                <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-950">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Verifiable Indicator: </strong>
                      {m.monitoringIndicator.indicator} (Target: {m.monitoringIndicator.target})
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-800 shrink-0">
                    Frequency: {m.monitoringIndicator.frequency}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Add Mitigation Measure */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs max-h-[85vh] flex flex-col">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-sm">Add Actionable Mitigation Measure</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleAddMeasure} className="p-4 space-y-3 overflow-y-auto flex-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Parent Social Impact Item *</label>
                <select
                  value={newMeasure.impactId}
                  onChange={(e) => setNewMeasure({ ...newMeasure, impactId: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold"
                >
                  {impacts.map(i => (
                    <option key={i.impactId} value={i.impactId}>
                      {i.impactId} ({i.category}): {i.affectedComponent}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Measure Description &amp; Technical Scope *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify concrete engineering solution, replacement facility, or financial rehabilitation grant..."
                  value={newMeasure.measureDescription}
                  onChange={(e) => setNewMeasure({ ...newMeasure, measureDescription: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Responsible Agency *</label>
                  <input
                    type="text"
                    required
                    value={newMeasure.responsibleAgency}
                    onChange={(e) => setNewMeasure({ ...newMeasure, responsibleAgency: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Division</label>
                  <input
                    type="text"
                    value={newMeasure.department}
                    onChange={(e) => setNewMeasure({ ...newMeasure, department: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nodal Contact Officer</label>
                  <input
                    type="text"
                    value={newMeasure.officerOrContact}
                    onChange={(e) => setNewMeasure({ ...newMeasure, officerOrContact: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Supporting Agency</label>
                  <input
                    type="text"
                    value={newMeasure.supportingAgency}
                    onChange={(e) => setNewMeasure({ ...newMeasure, supportingAgency: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Cost (INR)</label>
                  <input
                    type="number"
                    value={newMeasure.estimatedCost}
                    onChange={(e) => setNewMeasure({ ...newMeasure, estimatedCost: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cost Basis</label>
                  <input
                    type="text"
                    value={newMeasure.costBasis}
                    onChange={(e) => setNewMeasure({ ...newMeasure, costBasis: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newMeasure.startDate}
                    onChange={(e) => setNewMeasure({ ...newMeasure, startDate: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Completion Date</label>
                  <input
                    type="date"
                    value={newMeasure.targetCompletionDate}
                    onChange={(e) => setNewMeasure({ ...newMeasure, targetCompletionDate: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Save Measure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Details */}
      {selectedMeasure && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Measure Details: {selectedMeasure.mitigationId}</h3>
                <span className="text-[10px] font-mono opacity-80">Linked to {selectedMeasure.impactId}</span>
              </div>
              <button onClick={() => setSelectedMeasure(null)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-900 leading-snug">{selectedMeasure.measureDescription}</div>
                <div className="text-[11px] text-slate-600 mt-1">{selectedMeasure.responsibilityDescription}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 block">Responsible Body:</span>
                  <span className="font-bold text-slate-900">{selectedMeasure.responsibleAgency}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 block">Estimated Cost:</span>
                  <span className="font-bold font-mono text-[#1B365D]">{formatINR(selectedMeasure.estimatedCost)}</span>
                </div>
              </div>

              <div className="p-2 bg-blue-50/50 rounded border border-blue-200 text-[11px] text-blue-950">
                <strong>Monitoring Baseline &amp; Target: </strong>
                {selectedMeasure.monitoringIndicator?.baseline} → {selectedMeasure.monitoringIndicator?.target}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedMeasure(null)}
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
