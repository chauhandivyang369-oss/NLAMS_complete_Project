import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  FileCheck2, 
  SearchCheck, 
  Scale, 
  Users, 
  Award, 
  PenTool, 
  Send 
} from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'step-1', name: 'SIA Report Received', status: 'COMPLETED', date: '02 Sep 2026', icon: FileCheck2 },
  { id: 'step-2', name: 'Initial Review', status: 'COMPLETED', date: '08 Sep 2026', icon: SearchCheck },
  { id: 'step-3', name: 'Evidence Review', status: 'COMPLETED', date: '15 Sep 2026', icon: SearchCheck },
  { id: 'step-4', name: 'Statutory Appraisal', status: 'CURRENT', date: 'Active Phase', icon: Scale },
  { id: 'step-5', name: 'Committee Consolidation', status: 'IN_PROGRESS', date: 'Scheduled 20 Sep', icon: Users },
  { id: 'step-6', name: 'Final Recommendation', status: 'PENDING', date: 'Draft v1.0', icon: Award },
  { id: 'step-7', name: 'e-Sign', status: 'PENDING', date: '5/7 Signed', icon: PenTool },
  { id: 'step-8', name: 'Submit to Govt', status: 'PENDING', date: 'Target 25 Sep', icon: Send }
];

export default function IegReviewPipeline({ onNavigateStage }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="font-bold text-slate-900 text-xs">
          IEG Statutory Review &amp; Recommendation Pipeline
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Current Stage: <strong className="text-[#1B365D]">Statutory Appraisal (Section 7)</strong>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'COMPLETED';
          const isCurrent = step.status === 'CURRENT';
          const isInProgress = step.status === 'IN_PROGRESS';

          return (
            <div
              key={step.id}
              className={`p-2.5 rounded-lg border flex flex-col justify-between transition-all ${
                isCurrent 
                  ? 'bg-blue-50/80 border-[#1B365D] ring-2 ring-[#1B365D]/20 shadow-xs' 
                  : isCompleted 
                    ? 'bg-slate-50 border-slate-200' 
                    : isInProgress
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-slate-50/40 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isCurrent && <span className="w-2 h-2 rounded-full bg-[#1B365D] animate-ping" />}
                {isInProgress && <Clock className="w-3.5 h-3.5 text-amber-600" />}
              </div>

              <div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 leading-tight">
                  <Icon className="w-3.5 h-3.5 shrink-0 text-[#1B365D]" />
                  <span>{step.name}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">
                  {step.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
