import React from 'react';
import { 
  Building2, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Globe, 
  Send, 
  CheckSquare, 
  Edit3, 
  Printer, 
  Eye, 
  PenTool, 
  Share2, 
  RotateCw,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { REPORT_PROJECT_CONTEXT } from '../../../services/siaReportService.js';

export default function ReportHeaderBar({
  reportState,
  onValidate,
  onGenerateReport,
  onOpenPreview,
  onOpenESign,
  onSubmitReport,
  onSaveDraft,
  onRefresh,
  currentLanguage,
  onChangeLanguage,
  validationSummary
}) {
  const isValidationPassed = validationSummary.failCount === 0;
  const isGenerated = ['Generated', 'Ready for Signature', 'Signed', 'Submitted', 'Published'].includes(reportState.reportStatus);
  const isSigned = ['Signed', 'Submitted', 'Published'].includes(reportState.reportStatus);
  const isSubmitted = ['Submitted', 'Published'].includes(reportState.reportStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Submitted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Signed':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Generated':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'Validation Required':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-2xs">
      {/* 1. Project Selector / Context Banner (Read-only master source) */}
      <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1B365D] text-[#C5A059] uppercase tracking-wider">
              Menu 05 • Section 6-7 Final Assembly
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-mono font-bold text-slate-800">
              Project ID: {REPORT_PROJECT_CONTEXT.projectId}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-mono text-slate-600">
              SIA Ref: {REPORT_PROJECT_CONTEXT.siaReference}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">Report Version:</span>
            <span className="font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {reportState.currentVersion}
            </span>
            <span className="text-slate-500 ml-2">Publication:</span>
            <span className={`px-2 py-0.5 rounded font-bold border ${getStatusBadge(reportState.publicationStatus)}`}>
              {reportState.publicationStatus}
            </span>
          </div>
        </div>

        {/* Dense Project Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2 text-[11px]">
          <div>
            <span className="text-slate-400 text-[10px] font-mono block">Project:</span>
            <span className="font-bold text-slate-900 truncate block" title={REPORT_PROJECT_CONTEXT.projectName}>
              {REPORT_PROJECT_CONTEXT.projectName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-mono block">Requiring Body:</span>
            <span className="font-bold text-slate-800 truncate block">
              Ministry of Railways / Western Rly
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-mono block">Appropriate Govt:</span>
            <span className="font-semibold text-slate-800 block">Central / Gujarat Revenue</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-mono block">Corridor &amp; Villages:</span>
            <span className="font-semibold text-slate-800 block">Anand (5 Villages, 486.75 Ha)</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-mono block">Last Generated:</span>
            <span className="font-mono text-slate-700 block">{reportState.lastGenerated}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-mono block">Assigned Agency:</span>
            <span className="font-semibold text-slate-800 truncate block">GIDR, Ahmedabad</span>
          </div>
        </div>
      </div>

      {/* 2. Top Title, Status & Sticky Action Bar */}
      <div className="px-6 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              FINAL SIA REPORT &amp; PUBLICATION
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getStatusBadge(reportState.reportStatus)}`}>
              Status: {reportState.reportStatus}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory Social Impact Assessment Assembly, 22-Section Verification, e-Signing &amp; Gazette Publication
          </p>
        </div>

        {/* Workflow Actions Toolbar (Strictly respects state) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs mr-1">
            <button
              onClick={() => onChangeLanguage('en')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                currentLanguage === 'en' 
                  ? 'bg-white text-[#1B365D] shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onChangeLanguage('gu')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                currentLanguage === 'gu' 
                  ? 'bg-white text-[#1B365D] shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ગુજરાતી (Local)
            </button>
          </div>

          <button
            onClick={onValidate}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-300"
            title="Execute 13-point pre-generation audit"
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Validate ({validationSummary.passCount}/13)</span>
          </button>

          <button
            onClick={onGenerateReport}
            disabled={!isValidationPassed}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all ${
              isValidationPassed
                ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title={isValidationPassed ? 'Compile full 22-chapter report snapshot' : 'Resolve blocking validation issues first'}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>

          <button
            onClick={onOpenPreview}
            disabled={!isGenerated}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isGenerated
                ? 'bg-white hover:bg-slate-50 text-[#1B365D] border-slate-300 cursor-pointer shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Preview Document</span>
          </button>

          <button
            onClick={onOpenESign}
            disabled={!isGenerated || isSigned}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all ${
              isGenerated && !isSigned
                ? 'bg-purple-700 hover:bg-purple-800 text-white cursor-pointer'
                : isSigned
                ? 'bg-purple-100 text-purple-900 border border-purple-300 cursor-default'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{isSigned ? 'Report Signed ✓' : 'e-Sign Report'}</span>
          </button>

          <button
            onClick={onSubmitReport}
            disabled={!isSigned || isSubmitted}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all ${
              isSigned && !isSubmitted
                ? 'bg-[#1B365D] hover:bg-[#152a48] text-white cursor-pointer'
                : isSubmitted
                ? 'bg-emerald-800 text-white cursor-default'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isSubmitted ? 'Submitted to IEG ✓' : 'Submit Final Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
