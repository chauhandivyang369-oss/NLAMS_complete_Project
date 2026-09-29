import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  XCircle, 
  Scale, 
  Layers 
} from 'lucide-react';
import { RECOMMENDATION_CHOICES } from '../../../services/iegService.js';

export default function IegRecommendationSelector({ 
  selectedChoice = 'CONDITIONS',
  onSelectChoice,
  recommendationData,
  onUpdateData 
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 text-xs">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#1B365D]" />
          <h3 className="font-bold text-slate-900 text-sm">
            Statutory Recommendation Determination (Section 7(4) &amp; 7(5))
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Independent Expert Group Authoritative Finding
        </span>
      </div>

      {/* 4 Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {RECOMMENDATION_CHOICES.map((choice) => {
          const isSelected = selectedChoice === choice.id;

          return (
            <div
              key={choice.id}
              onClick={() => onSelectChoice && onSelectChoice(choice.id)}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 select-none ${
                isSelected 
                  ? 'border-[#1B365D] bg-blue-50/70 shadow-xs ring-2 ring-[#1B365D]/20' 
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    Option {choice.id === 'RECOMMEND' ? 'A' : choice.id === 'CONDITIONS' ? 'B' : choice.id === 'REVISE' ? 'C' : 'D'}
                  </span>
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1B365D]" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>

                <div className="font-bold text-slate-900 text-xs leading-tight">
                  {choice.title}
                </div>

                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {choice.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 font-mono text-[10px]">
                <span className="text-slate-500 font-sans">Statutory Reference: </span>
                <strong className="text-[#1B365D]">{choice.statutoryRef}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Statutory Land Area Extent: Proposed vs Recommended */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#1B365D]" />
          <span>Statutory Land Extent Determination (Section 7(2)(b))</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="p-2.5 bg-white border border-slate-200 rounded">
            <span className="text-slate-500 block text-[10px] font-sans">Proposed in SIA Report:</span>
            <strong className="text-slate-900 text-sm">
              {recommendationData.proposedLandAreaHa || 250.40} Ha
            </strong>
          </div>

          <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded">
            <span className="text-emerald-800 block text-[10px] font-sans">Recommended by Expert Group:</span>
            <strong className="text-emerald-900 text-sm">
              {recommendationData.recommendedLandAreaHa || 247.90} Ha
            </strong>
          </div>

          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
            <span className="text-blue-800 block text-[10px] font-sans">Extent of Reduction (Buffer Land):</span>
            <strong className="text-blue-900 text-sm">
              {recommendationData.reductionExtentHa || 2.50} Ha
            </strong>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Findings Narrative */}
      <div className="space-y-3">
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            Committee Justification &amp; Cost-Benefit Finding (Section 7(4))
          </label>
          <textarea
            rows={3}
            value={recommendationData.justificationNarrative || ''}
            onChange={(e) => onUpdateData && onUpdateData('justificationNarrative', e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white leading-relaxed"
            placeholder="Enter comprehensive statutory findings regarding public purpose, alternatives, and net social benefits..."
          />
        </div>
      </div>

    </div>
  );
}
