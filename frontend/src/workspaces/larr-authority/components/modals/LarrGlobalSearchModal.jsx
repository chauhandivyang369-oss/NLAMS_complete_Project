import React, { useState } from 'react';
import { useLarrAuthority } from '../../context/LarrAuthorityContext.jsx';
import { Search, X, Scale, FileText, ArrowRight, MapPin, Building2, User, Clock } from 'lucide-react';

export default function LarrGlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, cases, selectCaseById, setActiveMenu } = useLarrAuthority();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const filtered = cases.filter(c => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.caseId.toLowerCase().includes(term) ||
      c.referenceNumber.toLowerCase().includes(term) ||
      c.claimantName.toLowerCase().includes(term) ||
      c.ulpin.toLowerCase().includes(term) ||
      c.surveyNumber.toLowerCase().includes(term) ||
      c.collectorName.toLowerCase().includes(term) ||
      c.projectCode.toLowerCase().includes(term) ||
      c.projectName.toLowerCase().includes(term) ||
      c.district.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-3 bg-[#1B365D] text-white flex items-center justify-between border-b border-[#C5A059]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#E6CA85]" />
            <span className="font-bold text-sm tracking-wide">
              NLAMS Unified Judicial &amp; Land Search
            </span>
          </div>
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#1B365D] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Case ID, ULPIN, Survey Number, Claimant, Project, Collector..."
            className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 focus:outline-hidden placeholder:text-slate-400 font-sans"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-slate-700 font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold px-1 flex justify-between">
            <span>Search Results ({filtered.length} matches)</span>
            <span>Click to switch context</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching judicial reference, ULPIN, or claimant found.
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.caseId}
                onClick={() => {
                  selectCaseById(c.caseId);
                  setIsSearchOpen(false);
                }}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#1B365D] hover:bg-blue-50/50 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#1B365D] group-hover:underline">
                      {c.caseId}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                      ULPIN: {c.ulpin}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Sy: {c.surveyNumber}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-900">
                    {c.claimantName}
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {c.projectCode}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {c.district}, {c.state}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      SLA: {c.slaDaysRemaining}d remaining
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    {c.stage.replace(/_/g, ' ')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-[10px] text-slate-500 font-mono flex items-center justify-between px-4">
          <span>Search scope: All 12 Judicial references across Gujarat, Punjab, Maharashtra, Karnataka, UP, TN</span>
          <span>ESC to exit</span>
        </div>

      </div>
    </div>
  );
}
