import React, { useState } from 'react';
import { HEARING_CONCERN_ITEMS } from '../../../services/siaHearingService.js';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  Layers, 
  ArrowRight, 
  Building, 
  User, 
  Tag, 
  Edit3, 
  Plus, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function ConcernTrackerSection({ onNavigateToSimp }) {
  const [concerns, setConcerns] = useState(HEARING_CONCERN_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedConcern, setSelectedConcern] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editResponse, setEditResponse] = useState('');
  const [editAction, setEditAction] = useState('');

  const filtered = concerns.filter((c) => {
    const matchesSearch = 
      c.issueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizenOrParticipant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const criticalCount = concerns.filter(c => c.priority === 'Critical').length;
  const addressedCount = concerns.filter(c => c.status === 'Addressed').length;
  const actionProposedCount = concerns.filter(c => c.status === 'Action Proposed').length;
  const openCount = concerns.filter(c => c.status === 'Open').length;

  const handleUpdateConcern = (e) => {
    e.preventDefault();
    if (!selectedConcern) return;

    setConcerns(concerns.map(c => {
      if (c.issueId === selectedConcern.issueId) {
        return {
          ...c,
          status: editStatus,
          siaResponse: editResponse,
          action: editAction
        };
      }
      return c;
    }));

    setSelectedConcern(null);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] font-mono text-slate-500 block">Total Logged Concerns:</span>
          <span className="text-lg font-bold font-mono text-[#1B365D]">{concerns.length} Items</span>
          <span className="text-[10px] text-slate-500 block">Tracked from Section 5 Hearing</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] font-mono text-slate-500 block">Critical Priority:</span>
          <span className="text-lg font-bold font-mono text-red-600">{criticalCount} Critical</span>
          <span className="text-[10px] text-red-700 block font-medium">Access &amp; Canal Severance</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] font-mono text-slate-500 block">Action Proposed:</span>
          <span className="text-lg font-bold font-mono text-blue-700">{actionProposedCount} Items</span>
          <span className="text-[10px] text-blue-700 block font-medium">Escrow deposits scheduled</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
          <span className="text-[10px] font-mono text-slate-500 block">Addressed in SIMP:</span>
          <span className="text-lg font-bold font-mono text-emerald-700">{addressedCount} Addressed</span>
          <span className="text-[10px] text-emerald-700 block font-medium">Mapped to Section 6 measures</span>
        </div>
      </div>

      {/* 2. Seamless Traceability Callout */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-900">
              Cross-Module Linkage: Hearing Concerns → SIMP Builder (Section 6)
            </div>
            <p className="text-[11px] text-slate-600">
              Each hearing objection (e.g. cart road severance, canal choking, water well demolition) seamlessly feeds into the SIMP Mitigation Register as an authoritative statutory source.
            </p>
          </div>
        </div>

        {onNavigateToSimp && (
          <button
            onClick={onNavigateToSimp}
            className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
          >
            <span>Open SIMP Builder (Menu 4)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3. Search and Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Concern ID / Topic / Village / Asset..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="Action Proposed">Action Proposed</option>
            <option value="Addressed">Addressed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* 4. Concerns Detailed Cards List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isCritical = item.priority === 'Critical';
          const isHigh = item.priority === 'High';
          const isAddressed = item.status === 'Addressed';
          const isProposed = item.status === 'Action Proposed';

          return (
            <div 
              key={item.issueId} 
              className="bg-white border border-slate-200 hover:border-[#1B365D]/50 rounded-xl p-4 shadow-2xs space-y-3 transition-all"
            >
              {/* Header line */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {item.issueId}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    isCritical 
                      ? 'bg-red-100 text-red-900 border-red-300' 
                      : isHigh
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    Priority: {item.priority}
                  </span>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    isAddressed 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : isProposed
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {item.status}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedConcern(item);
                      setEditStatus(item.status);
                      setEditResponse(item.siaResponse);
                      setEditAction(item.action);
                    }}
                    className="p-1 text-slate-500 hover:text-[#1B365D] hover:bg-slate-100 rounded cursor-pointer"
                    title="Update Status / Action"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtitle meta */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                <div>Source: <strong className="text-slate-800">{item.citizenOrParticipant}</strong></div>
                <span className="text-slate-300">•</span>
                <div>Village: <strong className="text-slate-800">{item.village}</strong></div>
                <span className="text-slate-300">•</span>
                <div>Domain: <span className="font-semibold text-[#1B365D]">{item.category}</span></div>
                <span className="text-slate-300">•</span>
                <div>Family / ULPIN: <span className="font-mono text-slate-700">{item.familyId} ({item.ulpin})</span></div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                {item.description}
              </p>

              {/* SIA Official Response & Mitigation Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-900 block uppercase">
                    SIA Official Response:
                  </span>
                  <p className="text-[11px] text-blue-950 leading-snug">
                    {item.siaResponse}
                  </p>
                </div>

                <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-900 block uppercase">
                    Mitigation Action Formulated:
                  </span>
                  <p className="text-[11px] text-emerald-950 leading-snug">
                    {item.action}
                  </p>
                </div>
              </div>

              {/* SIA Master Data Linkage Footer */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-mono text-[10px] text-slate-400">Linked SIA Asset:</span>
                  <span className="font-mono font-bold text-[#1B365D] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {item.linkedAssetId} ({item.linkedAssetType})
                  </span>
                  <span className="font-mono text-slate-500">File: {item.evidenceFile}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[#1B365D] font-mono text-[10px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mapped to SIMP Mitigation Matrix</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Edit Concern Status & Action */}
      {selectedConcern && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Update Hearing Concern: {selectedConcern.issueId}</h3>
                <span className="text-[10px] font-mono opacity-80">{selectedConcern.title}</span>
              </div>
              <button onClick={() => setSelectedConcern(null)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleUpdateConcern} className="p-4 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold"
                >
                  <option value="Open">Open</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Action Proposed">Action Proposed</option>
                  <option value="Addressed">Addressed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">SIA Official Technical Response</label>
                <textarea
                  rows={2}
                  required
                  value={editResponse}
                  onChange={(e) => setEditResponse(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Mitigation Action &amp; Budget Allocation</label>
                <textarea
                  rows={2}
                  required
                  value={editAction}
                  onChange={(e) => setEditAction(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedConcern(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
