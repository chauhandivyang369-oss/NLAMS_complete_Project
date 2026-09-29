import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  ChevronRight, 
  Layers, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { REPORT_SECTIONS_LIST } from '../../../services/siaReportService.js';

export default function ReportOutlineSection({ 
  activeSectionId, 
  onSelectSection, 
  validationSummary 
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Complete':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Needs Review':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Missing Data':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      {/* Outline Header */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#1B365D]" />
          <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            22 Statutory Report Sections (RFCTLARR Sec. 4–7)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          22 of 22 Chapters Assembled
        </span>
      </div>

      {/* Grid of Sections */}
      <div className="divide-y divide-slate-100 max-h-[calc(100vh-22rem)] overflow-y-auto">
        {REPORT_SECTIONS_LIST.map((sec) => {
          const isActive = activeSectionId === sec.id;

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`w-full text-left p-2.5 px-3 flex items-center justify-between gap-2 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-blue-50/80 border-l-3 border-[#1B365D] pl-2.5' 
                  : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded shrink-0 ${
                  isActive 
                    ? 'bg-[#1B365D] text-white' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {sec.number}
                </span>

                <div className="truncate">
                  <div className={`text-xs font-semibold truncate ${isActive ? 'text-[#1B365D]' : 'text-slate-800'}`}>
                    {sec.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    Source: {sec.source}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${getStatusBadge(sec.status)}`}>
                  {sec.status}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#1B365D]' : 'text-slate-300'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
