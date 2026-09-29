import React, { useState } from 'react';
import { 
  PenTool, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Key, 
  Lock 
} from 'lucide-react';
import { IEG_COMMITTEE_MEMBERS } from '../../../services/iegService.js';

export default function IegSignaturesPanel({ onMemberSigned }) {
  const [members, setMembers] = useState(
    IEG_COMMITTEE_MEMBERS.map((m, idx) => ({
      ...m,
      signed: idx < 5, // 5 already signed, 2 pending
      signedAt: idx < 5 ? `19/09/2026, 1${idx}:30 IST` : null,
      certHash: idx < 5 ? `SHA256:4f8e...9a${idx}b` : null
    }))
  );

  const [signingMemberId, setSigningMemberId] = useState(null);

  const handleSign = (memberId) => {
    setSigningMemberId(memberId);
    setTimeout(() => {
      setMembers(prev => prev.map(m => m.id === memberId ? {
        ...m,
        signed: true,
        signedAt: new Date().toLocaleString(),
        certHash: `SHA256:d82e...7b${Math.floor(Math.random()*90)+10}`
      } : m));
      setSigningMemberId(null);
      if (onMemberSigned) onMemberSigned(memberId);
    }, 800);
  };

  const signedCount = members.filter(m => m.signed).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 text-xs">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-[#1B365D]" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Committee Electronic Signatures &amp; DSC Authentication (7 Members)
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Mandatory Multi-Party Cryptographic Sign-Off (IT Act 2000 &amp; RFCTLARR 2013)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs flex items-center gap-1.5 ${
            signedCount === 7 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{signedCount} of 7 Members Signed</span>
          </span>
        </div>
      </div>

      {/* Statutory Legal Declaration Banner */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed text-[11px]">
        <strong>Statutory Declaration:</strong> <em>"I hereby declare that I have independently evaluated the Social Impact Assessment Report, examined primary ground evidence and public hearing records, and confirm that the recommendations and conditions recorded herein represent my considered professional appraisal under Section 7 of the RFCTLARR Act 2013."</em>
      </div>

      {/* 7 Members Signature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {members.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
              m.signed 
                ? 'bg-emerald-50/40 border-emerald-300' 
                : 'bg-amber-50/40 border-amber-300 shadow-2xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                <span>Member #{m.memberNumber}</span>
                {m.isChairperson ? (
                  <span className="px-1 py-0.2 rounded font-bold bg-[#C5A059] text-slate-900 text-[9px]">
                    CHAIR
                  </span>
                ) : (
                  <span className="text-slate-500 font-bold">{m.role}</span>
                )}
              </div>

              <div className="font-bold text-slate-900 text-xs line-clamp-1" title={m.name}>
                {m.name}
              </div>

              <div className="text-[10px] text-slate-600 line-clamp-2 mt-0.5">
                {m.designation}
              </div>
            </div>

            {/* Signature Status & Action */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              {m.signed ? (
                <div className="space-y-1 font-mono text-[10px]">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>e-Signed (DSC)</span>
                  </span>
                  <div className="text-slate-400 text-[9px] truncate" title={m.certHash}>
                    {m.certHash}
                  </div>
                  <div className="text-slate-500 text-[9px]">{m.signedAt}</div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <span className="text-amber-700 font-semibold font-mono text-[10px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>Awaiting Signature</span>
                  </span>
                  <button
                    onClick={() => handleSign(m.id)}
                    disabled={signingMemberId === m.id}
                    className="w-full py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Key className="w-3 h-3 text-[#C5A059]" />
                    <span>{signingMemberId === m.id ? 'Signing...' : 'Sign (DSC)'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
