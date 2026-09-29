import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, ShieldAlert } from 'lucide-react';

export default function StatutoryChecklist({ items = [], title = 'Statutory Eligibility Verification Gate' }) {
  const hasBlockingRed = items.some(item => item.status === 'RED');

  return (
    <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C5A059]" />
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Validation engine checks mandatory statutory prerequisites before proceeding
          </p>
        </div>
        <div>
          {hasBlockingRed ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-50 text-rose-800 border border-rose-300 text-xs font-bold">
              <XCircle className="w-3.5 h-3.5" />
              BLOCKING CONDITION UNRESOLVED
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ALL STATUTORY PREREQUISITES SATISFIED
            </span>
          )}
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item, index) => {
          let statusBadge = (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              SATISFIED
            </span>
          );

          if (item.status === 'AMBER') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                CLARIFICATION
              </span>
            );
          } else if (item.status === 'RED') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                BLOCKING
              </span>
            );
          }

          return (
            <div key={item.id || index} className="py-2.5 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-800 flex items-center gap-2">
                  <span>{index + 1}.</span>
                  <span>{item.label}</span>
                </div>
                {item.rule && (
                  <div className="text-[11px] font-mono text-slate-500 pl-4">
                    Rule Ref: <span className="text-[#1B365D] font-medium">{item.rule}</span>
                  </div>
                )}
                {item.note && (
                  <div className="text-[11px] text-slate-600 pl-4 italic">
                    {item.note}
                  </div>
                )}
              </div>
              <div className="shrink-0">{statusBadge}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
