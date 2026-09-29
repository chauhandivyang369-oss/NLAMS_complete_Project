import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  X, 
  ShieldCheck, 
  ExternalLink, 
  RotateCw,
  HelpCircle,
  FileText
} from 'lucide-react';
import { REPORT_VALIDATION_RULES, VALIDATION_ISSUES_LIST } from '../../../services/siaReportService.js';

export default function ReportValidationDrawer({ 
  isOpen, 
  onClose, 
  onResolveIssue, 
  onRevalidate,
  onNavigateToRecord
}) {
  if (!isOpen) return null;

  const passCount = REPORT_VALIDATION_RULES.filter(r => r.status === 'PASS').length;
  const warnCount = REPORT_VALIDATION_RULES.filter(r => r.status === 'WARNING').length;
  const failCount = REPORT_VALIDATION_RULES.filter(r => r.status === 'FAIL').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1B365D]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Statutory Pre-Generation Audit &amp; Data Integrity
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                13 Configurable Rules pursuant to RFCTLARR Act 2013 Section 4–7
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRevalidate}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Re-run Audit</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audit Scorecard Summary */}
        <div className="p-4 border-b border-slate-100 grid grid-cols-3 gap-3 bg-slate-50/50 text-center">
          <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
            <span className="text-[10px] font-mono text-emerald-800 uppercase block font-semibold">Passed Rules</span>
            <span className="text-lg font-bold font-mono text-emerald-900">{passCount} / 13</span>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
            <span className="text-[10px] font-mono text-amber-800 uppercase block font-semibold">Non-Blocking Warnings</span>
            <span className="text-lg font-bold font-mono text-amber-900">{warnCount}</span>
          </div>
          <div className="bg-red-50 p-2 rounded-lg border border-red-200">
            <span className="text-[10px] font-mono text-red-800 uppercase block font-semibold">Blocking Failures</span>
            <span className="text-lg font-bold font-mono text-red-900">{failCount}</span>
          </div>
        </div>

        {/* Content Tabs / Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
          
          {/* 1. Missing Data / Issues Panel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Detected Discrepancies &amp; Missing Data ({VALIDATION_ISSUES_LIST.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-500">Traceable to authoritative source</span>
            </div>

            <div className="space-y-2">
              {VALIDATION_ISSUES_LIST.map((issue) => (
                <div key={issue.issueId} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#1B365D]">{issue.issueId} • {issue.module}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {issue.severity} Priority
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">{issue.description}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                    <span className="font-mono text-slate-500">Record: <strong>{issue.recordId}</strong></span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToRecord(issue)}
                        className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-semibold text-[#1B365D] flex items-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Record</span>
                      </button>
                      <button
                        onClick={() => onResolveIssue(issue.issueId)}
                        className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold cursor-pointer"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. All 13 Pre-Generation Rules */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2">
              All 13 Statutory Verification Checks
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {REPORT_VALIDATION_RULES.map((rule) => (
                <div key={rule.id} className="p-3 bg-white hover:bg-slate-50 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{rule.code}: {rule.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({rule.module})</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{rule.description}</p>
                    <div className="text-[10px] font-mono text-slate-500">{rule.details}</div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                    rule.status === 'PASS'
                      ? 'bg-emerald-100 text-emerald-900'
                      : rule.status === 'WARNING'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-red-100 text-red-900'
                  }`}>
                    {rule.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            {failCount === 0 ? '✓ Ready for Official Report Generation' : '⚠️ Resolve blocking failures'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-semibold rounded-lg cursor-pointer"
          >
            Close Audit
          </button>
        </div>

      </div>
    </div>
  );
}
