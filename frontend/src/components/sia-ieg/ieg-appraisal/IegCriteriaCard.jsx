import React from 'react';
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  ExternalLink 
} from 'lucide-react';

export default function IegCriteriaCard({ 
  criterion, 
  onUpdateStatus, 
  onViewEvidence 
}) {
  const getRatingBadge = (rating) => {
    switch (rating) {
      case 'Confirmed':
      case 'Confirmed (Bare Minimum)':
      case 'Feasible & Justified':
      case 'Validated':
      case 'Adequate':
      case 'Benefits Outweigh Costs':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Partially Confirmed':
      case 'Needs Reduction':
      case 'Partially Validated':
      case 'Needs Revision':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-red-100 text-red-900 border-red-300';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      
      {/* Header: Title & Statutory Reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded text-[10px]">
              {criterion.code}
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              {criterion.title}
            </h4>
          </div>
          <p className="text-[11px] font-mono text-[#C5A059] font-bold mt-0.5">
            {criterion.statutoryReference}
          </p>
        </div>

        {/* Current Committee Rating Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">Committee Consensus:</span>
          <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs border ${getRatingBadge(criterion.committeeRating)}`}>
            {criterion.committeeRating} ({criterion.consensusPercentage}%)
          </span>
        </div>
      </div>

      {/* Description & Key Findings */}
      <div className="space-y-1">
        <label className="font-bold text-slate-800 block text-[11px]">Statutory Assessment &amp; Findings</label>
        <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
          {criterion.keyFindings}
        </p>
      </div>

      {/* Specific Extent Comparison (Only for Minimum Land Criterion) */}
      {criterion.code === 'CRIT-02' && (
        <div className="grid grid-cols-3 gap-2 font-mono p-2.5 bg-blue-50/70 border border-blue-200 rounded">
          <div>
            <span className="text-slate-500 block text-[10px]">Proposed Acquisition:</span>
            <strong className="text-slate-900">{criterion.proposedExtentHa} Ha</strong>
          </div>
          <div>
            <span className="text-blue-800 block text-[10px]">Recommended Minimum:</span>
            <strong className="text-blue-900">{criterion.recommendedExtentHa} Ha</strong>
          </div>
          <div>
            <span className="text-emerald-800 block text-[10px]">Recommended Reduction:</span>
            <strong className="text-emerald-900">-{criterion.reductionExtentHa} Ha (Railway Land)</strong>
          </div>
        </div>
      )}

      {/* Footer: Evidence References & Quick Action */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-400 text-[10px]">Evidence Basis:</span>
          {(criterion.evidenceReferences || []).map((evId) => (
            <button
              key={evId}
              onClick={() => onViewEvidence && onViewEvidence(evId)}
              className="px-2 py-0.5 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded font-mono font-bold text-[10px] text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{evId}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateStatus && onUpdateStatus(criterion)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold cursor-pointer"
          >
            Edit Criteria Appraisal
          </button>
        </div>
      </div>

    </div>
  );
}
