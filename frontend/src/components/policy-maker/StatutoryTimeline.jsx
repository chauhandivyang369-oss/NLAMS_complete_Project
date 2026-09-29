import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Landmark,
  Building,
  UserCheck
} from 'lucide-react';

export default function StatutoryTimeline({ project, className = '' }) {
  if (!project) return null;

  const stages = [
    {
      id: 'sia',
      title: 'SIA Study & SIMP',
      section: 'Sec 4 & 5',
      date: '15-Mar-2025',
      status: 'completed',
      authority: 'Accredited SIA Agency & Gram Sabha',
      documents: ['SIA-Report-Final.pdf', 'SIMP-Plan.pdf'],
      daysElapsed: 60,
      notes: 'Public hearing conducted; 88% public support recorded.'
    },
    {
      id: 'ieg',
      title: 'Expert Group Evaluation',
      section: 'Sec 7',
      date: '28-May-2025',
      status: 'completed',
      authority: 'Independent Expert Group (IEG)',
      documents: ['IEG-Evaluation-Recommendation.pdf'],
      daysElapsed: 45,
      notes: 'Project cleared as bona-fide public purpose with minimal displacement.'
    },
    {
      id: 'rr_scheme',
      title: 'R&R Scheme Formulation',
      section: 'Sec 16',
      date: '20-Jul-2025',
      status: 'completed',
      authority: 'Administrator R&R & Collector',
      documents: ['Draft-RR-Scheme-Census.pdf'],
      daysElapsed: 40,
      notes: 'Family census concluded for 4,820 affected families.'
    },
    {
      id: 'sec_11',
      title: 'Preliminary Notification',
      section: 'Sec 11(1)',
      date: project.sec11Date || '10-Oct-2025',
      status: 'completed',
      authority: 'Appropriate Government (Revenue Dept)',
      documents: ['Gazette-Sec11-Notification.pdf'],
      daysElapsed: 30,
      notes: `E-Gazette published (Ref: ${project.gazetteNo || 'GUJ-GAZ-2025-0941'}).`
    },
    {
      id: 'sec_15',
      title: 'Objections & Enquiry',
      section: 'Sec 15',
      date: '15-Jan-2026',
      status: project.currentStage === 'sec_11' ? 'current' : 'completed',
      authority: 'Competent Authority Land Acquisition (CALA)',
      documents: ['Speaking-Orders-Compilation.pdf'],
      daysElapsed: 60,
      notes: 'Hearing of objections from affected landowners and tenancy holders.'
    },
    {
      id: 'sec_19',
      title: 'Declaration of Acquisition',
      section: 'Sec 19(1)',
      date: project.sec19TargetDate || '09-Oct-2026',
      status: project.currentStage === 'sec_19' ? 'completed' : (project.currentStage === 'sec_11' ? 'critical_pending' : 'pending'),
      authority: 'Appropriate Government (Revenue Dept)',
      documents: ['Draft-Sec19-Declaration.pdf'],
      daysElapsed: project.daysRemainingSec19 !== undefined ? `${project.daysRemainingSec19} days remaining` : 'Pending',
      notes: 'Mandatory 12-month limit under Sec 19(7) applies from Sec 11 publication.',
      isCriticalSla: project.daysRemainingSec19 <= 30
    },
    {
      id: 'award',
      title: 'Land Award Determination',
      section: 'Sec 23 & 25',
      date: 'Est. Dec-2026',
      status: 'pending',
      authority: 'District Collector / CALA',
      documents: ['Award-Statement-Form-VI.pdf'],
      notes: 'Circle rate x multiplier + 100% Solatium + 12% statutory interest.'
    },
    {
      id: 'rr_award',
      title: 'R&R Award Sanction',
      section: 'Sec 31',
      date: 'Est. Jan-2027',
      status: 'pending',
      authority: 'R&R Commissioner / Collector',
      documents: ['Form-VII-R&R-Award.pdf'],
      notes: 'Second schedule rehabilitation and infrastructure entitlements.'
    },
    {
      id: 'possession',
      title: 'Possession & Site Handover',
      section: 'Sec 38',
      date: 'Est. Feb-2027',
      status: 'pending',
      authority: 'District Collector to Requiring Body',
      documents: ['Possession-Certificate-Form-VIII.pdf'],
      notes: 'Possession taken only after full compensation and R&R monetary credits.'
    },
    {
      id: 'completion',
      title: 'Project Civil Handover',
      section: 'Sec 101',
      date: 'Est. Mid-2027',
      status: 'pending',
      authority: 'Requiring Body / Implementing Agency',
      documents: ['Civil-Work-Commencement-Order.pdf'],
      notes: 'Handed over for highway/rail corridor civil construction.'
    }
  ];

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
              RFCTLARR ACT 2013 STATUTORY WORKFLOW
            </span>
            <span className="text-xs text-slate-500 font-sans">
              10-Stage Milestone Pipeline
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mt-1">
            Statutory Timeline for {project.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
            Current: {project.stageLabel || project.currentStage}
          </span>
        </div>
      </div>

      {/* Horizontal / Stepped Timeline Grid */}
      <div className="space-y-3">
        {stages.map((stage, idx) => {
          let statusBadge = null;
          if (stage.status === 'completed') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
              </span>
            );
          } else if (stage.status === 'critical_pending') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-300 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Critical Pending ({stage.daysElapsed})
              </span>
            );
          } else if (stage.status === 'current') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> In Progress
              </span>
            );
          } else {
            statusBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Pending
              </span>
            );
          }

          return (
            <div 
              key={stage.id} 
              className={`p-3 rounded-lg border transition-all ${
                stage.isCriticalSla 
                  ? 'bg-rose-50/40 border-rose-200' 
                  : stage.status === 'completed'
                    ? 'bg-slate-50/60 border-slate-200'
                    : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    stage.status === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : stage.isCriticalSla
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{stage.title}</h4>
                      <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                        {stage.section}
                      </span>
                      {statusBadge}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {stage.notes}
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right shrink-0 text-xs pl-8 sm:pl-0">
                  <div className="font-mono font-bold text-slate-800">{stage.date}</div>
                  <div className="text-[10px] text-slate-500 font-sans">{stage.authority}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
