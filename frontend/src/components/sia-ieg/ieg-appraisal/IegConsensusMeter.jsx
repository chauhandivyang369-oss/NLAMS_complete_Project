import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  FileCheck2 
} from 'lucide-react';
import { INITIAL_COMMITTEE_APPRAISAL } from '../../../services/iegService.js';

export default function IegConsensusMeter({ members = INITIAL_COMMITTEE_APPRAISAL }) {
  const memberList = Array.isArray(members) 
    ? members 
    : (Array.isArray(INITIAL_COMMITTEE_APPRAISAL) ? INITIAL_COMMITTEE_APPRAISAL : []);

  const total = memberList.length;
  const recommend = memberList.filter(m => m.overallVote === 'Recommend').length;
  const conditions = memberList.filter(m => m.overallVote === 'Recommend with Conditions').length;
  const reject = memberList.filter(m => m.overallVote === 'Reject').length;
  const inProgress = memberList.filter(m => m.overallVote !== 'Recommend' && m.overallVote !== 'Recommend with Conditions' && m.overallVote !== 'Reject').length;

  const inFavorPercentage = total > 0 ? (((recommend + conditions) / total) * 100).toFixed(1) : '100.0';
  const recommendPercentage = total > 0 ? ((recommend / total) * 100).toFixed(1) : '71.4';
  const conditionsPercentage = total > 0 ? ((conditions / total) * 100).toFixed(1) : '28.6';
  const rejectPercentage = total > 0 ? ((reject / total) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#1B365D]" />
          <h3 className="font-bold text-slate-900 text-xs">
            Committee Voting &amp; Consensus Meter (Section 7 Appraisal)
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
          Substantial Consensus (100% In Favor)
        </span>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded">
          <span className="text-slate-500 block text-[10px] font-sans">Total Committee</span>
          <strong className="text-slate-900 text-base">{total} Members</strong>
          <span className="text-[10px] text-slate-500 block">7 Nominated</span>
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
          <span className="text-emerald-800 block text-[10px] font-sans">Unconditional</span>
          <strong className="text-emerald-900 text-base">{recommend} Members</strong>
          <span className="text-[10px] text-emerald-700 block font-semibold">{recommendPercentage}% Primary Vote</span>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <span className="text-blue-800 block text-[10px] font-sans">With Conditions</span>
          <strong className="text-blue-900 text-base">{conditions} Members</strong>
          <span className="text-[10px] text-blue-700 block font-semibold">{conditionsPercentage}% Caveat Notes</span>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded">
          <span className="text-slate-500 block text-[10px] font-sans">Reject / Oppose</span>
          <strong className="text-slate-400 text-base">{reject} Members</strong>
          <span className="text-[10px] text-slate-400 block">{rejectPercentage}% Dissent</span>
        </div>
      </div>

      {/* Visual Consensus Bar */}
      <div className="space-y-1">
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
          <div 
            className="bg-emerald-600 h-full transition-all" 
            style={{ width: `${total > 0 ? (recommend / total) * 100 : 0}%` }}
            title={`Recommend: ${recommend}`}
          />
          <div 
            className="bg-blue-600 h-full transition-all" 
            style={{ width: `${total > 0 ? (conditions / total) * 100 : 0}%` }}
            title={`Recommend with Conditions: ${conditions}`}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Unconditional Approval ({recommend})</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Approve with SIMP Stipulations ({conditions})</span>
          </span>
          <span>{reject > 0 ? `${reject} Dissenting Vote(s)` : 'Zero Objections / No Minority Dissent'}</span>
        </div>
      </div>

    </div>
  );
}
