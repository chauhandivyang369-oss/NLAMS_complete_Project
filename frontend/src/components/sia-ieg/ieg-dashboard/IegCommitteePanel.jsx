import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileCheck 
} from 'lucide-react';
import { IEG_COMMITTEE_MEMBERS, IEG_PROJECT_CONTEXT } from '../../../services/iegService.js';

export default function IegCommitteePanel({ onSelectMember }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 text-xs">
      
      {/* Panel Header & Committee Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#1B365D]/10 text-[#1B365D] rounded-lg">
            <Users className="w-5 h-5 text-[#1B365D]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              IEG Committee — 7 Members
            </h3>
            <p className="text-[11px] text-slate-500 font-mono">
              Constituted under Section 7(1) RFCTLARR Act 2013 | Ref: RD/SIA/IEG/2026/09
            </p>
          </div>
        </div>

        {/* Metadata Chips */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">
            <span className="text-slate-400">Chairperson: </span>
            <strong className="text-[#1B365D]">Prof. (Dr.) Manisha N. Vyas</strong>
          </div>
          <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">
            <span className="text-slate-400">Constitution: </span>
            <strong>01 Sep 2026</strong>
          </div>
          <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Conflict Declaration: 7/7 Cleared</span>
          </div>
        </div>
      </div>

      {/* 7 Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-3">
        {IEG_COMMITTEE_MEMBERS.map((m) => (
          <div 
            key={m.id}
            onClick={() => onSelectMember && onSelectMember(m)}
            className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
              m.isChairperson 
                ? 'bg-amber-50/40 border-amber-300 shadow-2xs hover:border-[#C5A059]' 
                : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                <span>Member #{m.memberNumber}</span>
                {m.isChairperson ? (
                  <span className="px-1.5 py-0.5 rounded font-bold bg-[#C5A059] text-slate-900 text-[9px]">
                    CHAIRPERSON
                  </span>
                ) : (
                  <span className="text-slate-500 font-bold">{m.role}</span>
                )}
              </div>

              <div className="font-bold text-slate-900 text-xs line-clamp-1" title={m.name}>
                {m.name}
              </div>

              <div className="text-[10px] font-semibold text-[#1B365D] mt-0.5 line-clamp-1" title={m.category}>
                {m.category}
              </div>

              <div className="text-[10px] text-slate-500 line-clamp-2 mt-1" title={m.designation + ' - ' + m.organization}>
                {m.designation}
              </div>
            </div>

            {/* Member Statuses */}
            <div className="pt-2 border-t border-slate-200/80 space-y-1 font-mono text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Appraisal:</span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${
                  m.assessmentStatus === 'Completed' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {m.assessmentStatus}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Signature:</span>
                <span className={`font-semibold ${
                  m.signatureStatus.includes('Confirmed') ? 'text-emerald-700' : 'text-slate-500'
                }`}>
                  {m.signatureStatus}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
