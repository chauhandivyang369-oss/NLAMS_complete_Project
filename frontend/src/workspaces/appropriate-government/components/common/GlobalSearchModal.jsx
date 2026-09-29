import React, { useState } from 'react';
import { Search, X, FileText, MapPin, Building, Shield, ChevronRight, Hash } from 'lucide-react';

export default function GlobalSearchModal({
  isOpen,
  onClose,
  projects = [],
  proposals = [],
  parcels = [],
  onSelectProject,
  onSelectParcel
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchedProjects = q
    ? projects.filter(
        p =>
          p.id.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.executingAgency?.toLowerCase().includes(q)
      )
    : [];

  const matchedProposals = q
    ? proposals.filter(
        p =>
          p.proposalId.toLowerCase().includes(q) ||
          p.projectName.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.surveyNumbers.toLowerCase().includes(q)
      )
    : [];

  const matchedParcels = q
    ? parcels.filter(
        p =>
          p.ulpin?.toLowerCase().includes(q) ||
          p.khasraNo?.toLowerCase().includes(q) ||
          p.ownerName?.toLowerCase().includes(q) ||
          p.village?.toLowerCase().includes(q)
      )
    : [];

  const totalMatches = matchedProjects.length + matchedProposals.length + matchedParcels.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-300 max-w-2xl w-full overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-300 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Project ID, Proposal ID, ULPIN, Khasra No, Owner Name, Notification..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-200 rounded text-slate-500">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded border border-slate-300"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 text-xs divide-y divide-slate-100">
          {!q ? (
            <div className="text-center py-8 text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">Unified NLAMS Master Search</div>
              <div className="text-[11px]">
                Search canonical projects, cadastral parcels, ULPINs, gazette orders, or collector proposals
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No statutory records found matching &ldquo;<span className="font-bold">{query}</span>&rdquo;
            </div>
          ) : (
            <div className="space-y-4">
              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Projects ({matchedProjects.length})
                  </div>
                  {matchedProjects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (onSelectProject) onSelectProject(p.id);
                        onClose();
                      }}
                      className="p-2.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#1B365D] text-[11px] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            PROJECT
                          </span>
                          <span className="font-semibold text-slate-900">{p.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {p.id} • {p.executingAgency} • {p.state}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Proposals */}
              {matchedProposals.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Collector Proposals ({matchedProposals.length})
                  </div>
                  {matchedProposals.map(pr => (
                    <div
                      key={pr.proposalId}
                      onClick={onClose}
                      className="p-2.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-900 text-[11px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            PROPOSAL
                          </span>
                          <span className="font-semibold text-slate-900">{pr.proposalId}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          District: {pr.district} • Survey: {pr.surveyNumbers} • Status: {pr.currentStatus}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Parcels */}
              {matchedParcels.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Cadastral Parcels &amp; ULPIN ({matchedParcels.length})
                  </div>
                  {matchedParcels.map(pc => (
                    <div
                      key={pc.id}
                      onClick={() => {
                        if (onSelectParcel) onSelectParcel(pc.id);
                        onClose();
                      }}
                      className="p-2.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-900 text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            ULPIN
                          </span>
                          <span className="font-mono font-bold text-slate-900">{pc.ulpin}</span>
                          <span className="text-slate-600 font-semibold">(Khasra {pc.khasraNo})</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Owner: {pc.ownerName} • {pc.village}, {pc.tehsil} • Area: {pc.areaHa} Ha
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with Arrow keys • Press Enter to view entity</span>
          <span>Powered by NLAMS Master Registry</span>
        </div>
      </div>
    </div>
  );
}
