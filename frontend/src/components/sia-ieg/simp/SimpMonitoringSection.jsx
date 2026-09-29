import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Search, 
  Filter, 
  FileText, 
  Building2, 
  Clock, 
  Download,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SimpMonitoringSection({ mitigations }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('All');

  const filtered = mitigations.filter(m => {
    const ind = m.monitoringIndicator;
    if (!ind) return false;

    const matchesSearch = 
      m.mitigationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.responsibleAgency.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFreq = frequencyFilter === 'All' || ind.frequency.includes(frequencyFilter);

    return matchesSearch && matchesFreq;
  });

  return (
    <div className="space-y-4">
      {/* 1. Header Protocol Callout */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <Activity className="w-4 h-4 text-[#1B365D]" />
          <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            Quantitative Monitoring &amp; Evaluation Framework (Section 6 SIMP)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Statutory compliance under Section 6 requires that each mitigation action is paired with a verifiable, 
          empirically measurable indicator. The Sub-Divisional Magistrate (Petlad) and the Independent Monitoring Committee 
          conduct quarterly audits against the baseline conditions recorded during the SIA baseline survey.
        </p>
      </div>

      {/* 2. Search and Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Indicator / Agency / Measure ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500 font-medium">Audit Frequency:</span>
          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Frequencies</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Bi-annual">Bi-annual</option>
          </select>
        </div>
      </div>

      {/* 3. Detailed Monitoring Cards */}
      <div className="space-y-3">
        {filtered.map((m) => {
          const ind = m.monitoringIndicator;

          return (
            <div 
              key={m.mitigationId} 
              className="bg-white border border-slate-200 hover:border-[#1B365D]/50 rounded-xl p-4 shadow-2xs space-y-3 transition-all"
            >
              {/* Top Meta Line */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {m.mitigationId}
                  </span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {ind.indicator}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Frequency: {ind.frequency}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                    Measure: {m.status}
                  </span>
                </div>
              </div>

              {/* Baseline vs Target Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    Pre-Acquisition Baseline Condition:
                  </span>
                  <p className="text-slate-800 leading-snug font-medium text-[11px]">
                    {ind.baseline}
                  </p>
                </div>

                <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-900 uppercase block">
                    Statutory Target &amp; Acceptance Criteria:
                  </span>
                  <p className="text-emerald-950 leading-snug font-medium text-[11px]">
                    {ind.target}
                  </p>
                </div>
              </div>

              {/* Protocol Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Measurement Methodology:</span>
                  <span className="text-slate-800 font-medium leading-tight block text-[11px]">{ind.measurementMethod}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Auditing &amp; Monitoring Body:</span>
                  <span className="text-slate-800 font-bold leading-tight block text-[11px]">{ind.responsibleAgency}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Audit Proof / Evidence File:</span>
                  <span className="font-mono text-[#1B365D] font-semibold leading-tight block text-[11px]">{ind.evidence}</span>
                </div>
              </div>

              {/* Context Footnote */}
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                <span className="truncate max-w-lg">Scope: {m.measureDescription}</span>
                <span className="font-mono text-[10px] text-slate-400 shrink-0">Milestone: {m.targetCompletionDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
