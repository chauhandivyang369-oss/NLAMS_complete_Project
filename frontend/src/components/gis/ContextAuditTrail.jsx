import React from 'react';
import { Info } from 'lucide-react';

export default function ContextAuditTrail() {
  return (
    <div className="w-full xl:w-72 2xl:w-80 shrink-0 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
        <span className="text-[11px] font-bold font-mono tracking-wider text-slate-600 uppercase">
          CONTEXT & AUDIT TRAIL
        </span>
        <button className="text-slate-400 hover:text-slate-600 p-0.5" title="Audit Information">
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Acquisition Scheme Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          ACTIVE ACQUISITION SCHEME
        </div>
        <div className="text-sm font-bold text-slate-800 leading-snug">
          NH-44 Corridor Expansion
        </div>
        <div className="text-xs text-slate-500 mt-0.5">
          Sector 4B to 9A (74.2 km)
        </div>
      </div>

      {/* Cadastral Checkpoint Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          CADASTRAL CHECKPOINT
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs text-slate-600 font-medium">Khasra Parcels Scanned</span>
          <span className="text-sm font-bold font-mono text-slate-900">1,482 / 1,510</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
          <div 
            className="h-full bg-[#0a2540] rounded-full transition-all duration-500" 
            style={{ width: '98.1%' }}
          />
        </div>
      </div>

      {/* Audit Timestamp Log Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          AUDIT TIMESTAMP LOG
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Sec 11(1) Draft Sealed</span>
            <span className="font-mono text-slate-500 text-[11px]">11:15 IST</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">SIA Report Verified</span>
            <span className="font-mono text-slate-500 text-[11px]">09:40 IST</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Escrow Deposit Confirmed</span>
            <span className="font-mono text-slate-500 text-[11px]">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
