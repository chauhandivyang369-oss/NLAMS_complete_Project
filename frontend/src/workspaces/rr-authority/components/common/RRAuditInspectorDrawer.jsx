import React from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { X, ShieldCheck, Clock, User, Layers, FileText, CheckCircle2, Lock } from 'lucide-react';

export default function RRAuditInspectorDrawer() {
  const { auditDrawer, setAuditDrawer } = useRRAuthority();

  if (!auditDrawer.isOpen || !auditDrawer.record) return null;

  const log = auditDrawer.record;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-300 flex flex-col text-slate-800 text-xs animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-bold text-sm">Statutory Audit Event Inspector</h3>
              <p className="text-[10px] font-mono text-[#E6CA85]">{log.auditId}</p>
            </div>
          </div>

          <button
            onClick={() => setAuditDrawer({ isOpen: false, record: null })}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Status Badge Banner */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Immutable Statutory Audit Record
              </span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-200 text-emerald-950">
                VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-emerald-800">
              This transaction is cryptographically sealed in the NLAMS append-only audit stream.
            </p>
          </div>

          {/* Action Details */}
          <div className="space-y-3 font-mono text-[11px]">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div>
                <span className="text-slate-400 text-[10px] block">ACTION EXECUTED</span>
                <strong className="text-slate-900 font-sans text-xs">{log.action}</strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">TARGET ENTITY</span>
                <strong className="text-[#1B365D]">{log.entity}</strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">TIMESTAMP (IST)</span>
                <span className="text-slate-700">{log.timestamp}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">IP ADDRESS &amp; NETWORK</span>
                <span className="text-slate-700">{log.ip}</span>
              </div>
            </div>

            {/* Officer Info */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
              <div className="font-bold text-slate-800 font-sans text-xs">Executing Officer</div>
              <div className="font-sans font-semibold text-slate-900">{log.user}</div>
              <div className="text-slate-500 font-sans">{log.role}</div>
              <div className="pt-1 border-t border-slate-200 text-[10px] text-emerald-700 font-bold">
                {log.signatureStatus}
              </div>
            </div>

            {/* State Transition (Old vs New) */}
            <div className="space-y-2 font-sans">
              <div className="font-bold text-slate-800 text-xs">State Mutation Record</div>
              
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg">
                <span className="text-[10px] font-bold text-rose-800 uppercase block font-mono">Prior State (Old Value)</span>
                <div className="text-slate-800 text-[11px] mt-0.5">{log.oldValue}</div>
              </div>

              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block font-mono">Committed State (New Value)</span>
                <div className="text-slate-800 text-[11px] mt-0.5">{log.newValue}</div>
              </div>
            </div>

            {/* Linked Document */}
            {log.document && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between font-sans">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1B365D]" />
                  <div>
                    <div className="font-bold text-slate-900 text-[11px]">{log.document}</div>
                    <div className="text-[9px] font-mono text-slate-500">SHA256 Token Attached</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setAuditDrawer({ isOpen: false, record: null })}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
