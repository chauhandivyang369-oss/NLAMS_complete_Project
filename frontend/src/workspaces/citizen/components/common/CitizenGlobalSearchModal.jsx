import React, { useState } from 'react';
import {
  Search,
  X,
  MapPin,
  FileText,
  Building,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';
import { MOCK_PROJECTS, MOCK_NOTIFICATIONS } from '../../services/citizenMockData.js';

export default function CitizenGlobalSearchModal() {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    activeCitizen,
    openProjectWorkspace,
    navigateToAction,
    setActiveDocModal
  } = useCitizen();

  const [query, setQuery] = useState('');

  if (!isGlobalSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search in parcels
  const matchedParcels = activeCitizen.linkedParcels.filter(p =>
    !q ||
    p.ulpin.toLowerCase().includes(q) ||
    p.surveyNo.toLowerCase().includes(q) ||
    p.village.toLowerCase().includes(q) ||
    p.district.toLowerCase().includes(q) ||
    p.khataNo.toLowerCase().includes(q)
  );

  // Search in projects
  const matchedProjects = MOCK_PROJECTS.filter(p =>
    !q ||
    p.id.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.requiringBody.toLowerCase().includes(q) ||
    p.code.toLowerCase().includes(q)
  );

  // Search in notifications
  const matchedNotifs = MOCK_NOTIFICATIONS.filter(n =>
    !q ||
    n.notificationNo.toLowerCase().includes(q) ||
    n.title.toLowerCase().includes(q) ||
    n.section.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsGlobalSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-300 rounded-lg shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3 bg-[#1B365D] border-b border-[#C5A059] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by 14-digit ULPIN, Survey / Khasra No., Project ID, Gazette No..."
            className="w-full bg-slate-900/60 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A059]"
            autoFocus
          />
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs divide-y divide-slate-100">
          {/* Quick Suggestions / Shortcuts */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="font-semibold">Quick Search:</span>
            <button
              onClick={() => setQuery('24051234567890')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-blue-800 font-mono"
            >
              ULPIN: 24051234567890
            </button>
            <button
              onClick={() => setQuery('142/1')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Survey 142/1
            </button>
            <button
              onClick={() => setQuery('NHAI')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              NHAI Expressway
            </button>
          </div>

          {/* Matched Land Parcels */}
          {matchedParcels.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>My Land Parcels ({matchedParcels.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedParcels.map(p => (
                  <div
                    key={p.ulpin}
                    onClick={() => {
                      setIsGlobalSearchOpen(false);
                      navigateToAction('02');
                    }}
                    className="p-2.5 rounded bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Survey {p.surveyNo}</span>
                        <span className="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded font-semibold">
                          ULPIN: {p.ulpin}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                          Khata: {p.khataNo}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {p.village}, {p.taluka}, {p.district} • Acq. Area: {p.proposedAreaHa} Ha / {p.totalAreaHa} Ha • {p.classification}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Projects */}
          {matchedProjects.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                <Building className="w-3.5 h-3.5 text-[#1B365D]" />
                <span>Acquisition Projects ({matchedProjects.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setIsGlobalSearchOpen(false);
                      openProjectWorkspace(proj);
                    }}
                    className="p-2.5 rounded bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{proj.name}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                          {proj.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {proj.requiringBody} • {proj.districts?.join(', ')} • Stage: <span className="font-semibold text-amber-800">{proj.currentStageName}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Notifications & Gazette */}
          {matchedNotifs.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Gazette &amp; Statutory Notifications ({matchedNotifs.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedNotifs.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setIsGlobalSearchOpen(false);
                      setActiveDocModal({
                        title: n.title,
                        authority: n.issuingAuthority,
                        date: n.publishedDate,
                        section: n.section,
                        qrVerified: n.qrVerified
                      });
                    }}
                    className="p-2.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono">
                          {n.section}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {n.issuingAuthority} • Published: {n.publishedDate}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedParcels.length === 0 && matchedProjects.length === 0 && matchedNotifs.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <p className="font-semibold">No records found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by 14-digit ULPIN, Survey No, or Project ID.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <span>Press ESC or click outside to dismiss</span>
          <span className="font-semibold text-slate-700">DILRMP &amp; PostGIS Unified Search</span>
        </div>
      </div>
    </div>
  );
}
