import React, { useState } from 'react';
import { X, Search, MapPin, User, FileText, ArrowRight } from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function CollectorSearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    parcels,
    projects,
    openParcelDrawer,
    setSelectedProjectId,
    setActiveMenuId
  } = useDistrictCollector();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredParcels = query.trim() === '' ? [] : parcels.filter(p => 
    p.khasraGat.toLowerCase().includes(query.toLowerCase()) ||
    p.ulpin.toLowerCase().includes(query.toLowerCase()) ||
    p.khatedarName.toLowerCase().includes(query.toLowerCase()) ||
    p.village.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = query.trim() === '' ? [] : projects.filter(pr => 
    pr.name.toLowerCase().includes(query.toLowerCase()) ||
    pr.code.toLowerCase().includes(query.toLowerCase()) ||
    pr.requiringBody.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white w-full max-w-xl shadow-2xl border border-slate-300 flex flex-col">
        {/* Search Input Header */}
        <div className="p-3 border-b border-slate-200 flex items-center gap-2.5 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search by Khasra/Gat, ULPIN, Khatedar name, Village, or Project code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-3 text-xs">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400">
              Type a Khasra number (e.g. "142/1A"), ULPIN, or Khatedar name to search records.
            </div>
          ) : (
            <>
              {filteredParcels.length === 0 && filteredProjects.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  No cadastral records found matching "{query}".
                </div>
              )}

              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">
                    PROJECT CORRIDORS ({filteredProjects.length})
                  </div>
                  <div className="space-y-1">
                    {filteredProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setIsSearchOpen(false);
                          setActiveMenuId('executive-dashboard');
                        }}
                        className="w-full text-left p-2 hover:bg-slate-100 flex items-center justify-between border border-slate-200 cursor-pointer"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.code} • {p.requiringBody}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Parcels */}
              {filteredParcels.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">
                    CADASTRAL PARCELS ({filteredParcels.length})
                  </div>
                  <div className="space-y-1">
                    {filteredParcels.map((parcel) => (
                      <button
                        key={parcel.id}
                        onClick={() => {
                          openParcelDrawer(parcel.id);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-100 flex items-center justify-between border border-slate-200 cursor-pointer"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{parcel.khasraGat} - {parcel.village}</div>
                          <div className="text-[10px] text-slate-500">
                            Khatedar: {parcel.khatedarName} • ULPIN: {parcel.ulpin}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-1.5 py-0.5">
                          {parcel.statutoryStage}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
