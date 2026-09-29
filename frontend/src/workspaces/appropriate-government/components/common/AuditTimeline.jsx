import React from 'react';
import { Shield, Clock, FileCheck, UserCheck, ArrowRight } from 'lucide-react';

export default function AuditTimeline({ logs = [], filterProjectId = null }) {
  const displayLogs = filterProjectId
    ? logs.filter(l => l.project === filterProjectId || l.project === 'ALL_CENTRAL_PROJECTS')
    : logs;

  return (
    <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C5A059]" />
            Immutable Statutory Audit Trail
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically sealed and non-repudiable audit events for Appropriate Government orders
          </p>
        </div>
        <div className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {displayLogs.length} Events Recorded
        </div>
      </div>

      <div className="space-y-3">
        {displayLogs.map((log, index) => (
          <div
            key={log.id || index}
            className="p-3 rounded border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1B365D] font-mono text-[11px] bg-slate-200 px-1.5 py-0.5 rounded">
                  {log.action}
                </span>
                <span className="font-mono text-slate-500 text-[10px]">{log.entityId}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Clock className="w-3 h-3 text-slate-400" />
                {log.timestamp}
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-900">{log.actor}</span>
                <span className="text-slate-500">({log.role})</span>
              </div>
              {log.eSignStatus && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <FileCheck className="w-3 h-3 text-emerald-600" />
                  {log.eSignStatus}
                </span>
              )}
            </div>

            {log.oldValue && log.newValue && (
              <div className="flex items-center gap-2 text-[11px] font-mono bg-white p-1.5 rounded border border-slate-200 text-slate-600">
                <span className="text-slate-500">{log.oldValue}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="font-bold text-slate-800">{log.newValue}</span>
              </div>
            )}

            {log.reason && (
              <div className="text-[11px] text-slate-600 italic pt-0.5">
                Reason: {log.reason}
              </div>
            )}

            {log.reference && (
              <div className="text-[10px] font-mono text-slate-400">
                Ref: {log.reference}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
