import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Award,
  AlertCircle 
} from 'lucide-react';

export default function IegMemberRegisterTable({ 
  members = [], 
  onInspectMember 
}) {
  const getVoteBadge = (vote) => {
    switch (vote) {
      case 'Recommend':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Recommend with Conditions':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Reject':
        return 'bg-red-100 text-red-900 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#1B365D]" />
          <h3 className="font-bold text-slate-900 text-xs">
            Individual Member Appraisal &amp; Voting Register (7 Members)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Section 7(1) Statutory Committee Quorum: 100% Present
        </span>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
            <tr>
              <th className="p-2.5">No.</th>
              <th className="p-2.5">Member Name &amp; Role</th>
              <th className="p-2.5">Category</th>
              <th className="p-2.5 text-center">Public Purpose</th>
              <th className="p-2.5 text-center">Minimum Land</th>
              <th className="p-2.5 text-center">SIMP Adequate</th>
              <th className="p-2.5">Overall Vote</th>
              <th className="p-2.5">Appraisal Date</th>
              <th className="p-2.5">Signature Status</th>
              <th className="p-2.5 text-right">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.memberNumber} className="hover:bg-slate-50 transition-colors">
                <td className="p-2.5 font-mono font-bold text-slate-500">#{m.memberNumber}</td>
                
                <td className="p-2.5">
                  <div className="font-bold text-slate-900 line-clamp-1">{m.memberName}</div>
                  <div className="text-[10px] font-mono text-[#1B365D]">{m.role}</div>
                </td>

                <td className="p-2.5 text-slate-600 font-medium">{m.category}</td>

                <td className="p-2.5 text-center font-mono font-bold text-emerald-700">
                  {m.criteriaEvaluation?.publicPurpose ? 'YES' : 'NO'}
                </td>

                <td className="p-2.5 text-center font-mono font-bold text-emerald-700">
                  {m.criteriaEvaluation?.minimumLand ? 'YES' : 'NO'}
                </td>

                <td className="p-2.5 text-center font-mono font-bold text-emerald-700">
                  {m.criteriaEvaluation?.simpAdequate ? 'YES' : 'NO'}
                </td>

                <td className="p-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getVoteBadge(m.overallVote)}`}>
                    {m.overallVote}
                  </span>
                </td>

                <td className="p-2.5 font-mono text-slate-600">{m.appraisalDate}</td>

                <td className="p-2.5 font-mono">
                  {m.signatureStatus.includes('Confirmed') ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{m.signatureStatus}</span>
                    </span>
                  ) : (
                    <span className="text-amber-700 font-semibold">{m.signatureStatus}</span>
                  )}
                </td>

                <td className="p-2.5 text-right">
                  <button
                    onClick={() => onInspectMember && onInspectMember(m)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[10px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-[#C5A059]" />
                    <span>View Note</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
