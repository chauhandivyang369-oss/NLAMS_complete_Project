import React, { useState, useEffect } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Search, 
  X, 
  Building2, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export default function GlobalSearchModal() {
  const { 
    isGlobalSearchOpen, 
    setIsGlobalSearchOpen, 
    allProjects, 
    meetings,
    bottlenecks,
    directives,
    openProjectIntelligence,
    setActiveModule,
    setActiveSubPage,
    setSelectedProjectId
  } = usePolicyMaker();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProjects = (allProjects || []).filter(p => 
    !q ||
    p.name.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    p.code.toLowerCase().includes(q) ||
    p.state.toLowerCase().includes(q) ||
    p.districts.some(d => d.toLowerCase().includes(q)) ||
    p.parcels?.some(parcel => parcel.ulpin.toLowerCase().includes(q))
  );

  const matchedBottlenecks = (bottlenecks || []).filter(b => 
    !q ||
    b.id.toLowerCase().includes(q) ||
    b.issue.toLowerCase().includes(q) ||
    b.department.toLowerCase().includes(q)
  );

  const matchedMeetings = (meetings || []).filter(m => 
    !q ||
    m.id.toLowerCase().includes(q) ||
    m.meetingNo.toLowerCase().includes(q) ||
    m.committeeName.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-100">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Project ID, Name, ULPIN, State, District, Meeting, Bottleneck..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Projects Results */}
          <div>
            <div className="text-[10px] font-mono uppercase font-bold text-amber-400 mb-2 flex items-center justify-between">
              <span>National & State Projects ({matchedProjects.length})</span>
              <span className="text-slate-500">Press enter to select</span>
            </div>
            {matchedProjects.length > 0 ? (
              <div className="space-y-1.5">
                {matchedProjects.slice(0, 4).map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      openProjectIntelligence(proj.id);
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-xl flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-300 font-mono font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">{proj.id}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-300 font-semibold">{proj.state}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            proj.slaRisk === 'critical' ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
                          }`}>
                            {proj.slaRiskLabel}
                          </span>
                        </div>
                        <div className="text-white font-bold mt-0.5 group-hover:text-amber-300 transition-colors">
                          {proj.name}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 italic py-2">No projects matching query.</div>
            )}
          </div>

          {/* Bottlenecks Results */}
          {matchedBottlenecks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-rose-400 mb-2">
                Inter-Department Bottlenecks ({matchedBottlenecks.length})
              </div>
              <div className="space-y-1.5">
                {matchedBottlenecks.slice(0, 2).map(btn => (
                  <div
                    key={btn.id}
                    onClick={() => {
                      setActiveModule('bottleneck-resolver');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-2.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-300">{btn.id}</span>
                        <span className="text-[10px] px-1.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                          {btn.category}
                        </span>
                      </div>
                      <div className="text-slate-200 mt-0.5">{btn.issue}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Committee Meetings Results */}
          {matchedMeetings.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-blue-400 mb-2">
                Committee Meetings ({matchedMeetings.length})
              </div>
              <div className="space-y-1.5">
                {matchedMeetings.slice(0, 2).map(m => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setActiveModule('meetings-mom');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="p-2.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{m.meetingNo}</span>
                        <span className="font-mono text-slate-400">{m.committeeType}</span>
                      </div>
                      <div className="text-slate-300 mt-0.5">{m.committeeName}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Search across 42 National Land Acquisition Corridors</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
}
