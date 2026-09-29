import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  FileText, 
  Calendar, 
  ArrowRight, 
  Download, 
  Shield, 
  AlertCircle, 
  Check, 
  Layers,
  ChevronRight,
  Sparkles,
  Printer,
  History
} from 'lucide-react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';

export default function TimelineOverviewView({ onNavigateTab }) {
  const { showToast, openAiAssistant } = useWorkspace();

  const stages = [
    {
      id: '01',
      num: 'STAGE 01',
      title: 'Requisition Submitted...',
      status: 'completed',
      dateLabel: 'Completed',
      date: '12 Jun 2026',
      icon: CheckCircle2,
    },
    {
      id: '02',
      num: 'STAGE 02',
      title: 'Preliminary Scrutiny &...',
      status: 'completed',
      dateLabel: 'Completed',
      date: '18 Jun 2026',
      icon: CheckCircle2,
    },
    {
      id: '03',
      num: 'STAGE 03',
      title: 'SIA / Statutory Exemption',
      status: 'completed',
      dateLabel: 'Completed',
      date: '28 Jul 2026',
      icon: CheckCircle2,
    },
    {
      id: '04',
      num: 'STAGE 04',
      title: 'Preliminary Notice (Sec...',
      status: 'completed',
      dateLabel: 'Completed',
      date: '15 Aug 2026',
      icon: CheckCircle2,
    },
    {
      id: '05',
      num: 'STAGE 05 • CURRENT',
      title: 'Objections & Hearings (Se...',
      status: 'current',
      dateLabel: 'Clock Running',
      date: '54d Remaining',
      icon: Clock,
    },
    {
      id: '06',
      num: 'STAGE 06',
      title: 'Final Declaration...',
      status: 'upcoming',
      dateLabel: 'Upcoming',
      date: 'Dec 2026',
      icon: Circle,
    },
    {
      id: '07',
      num: 'STAGE 07',
      title: 'Valuation & Award (Sec...',
      status: 'upcoming',
      dateLabel: 'Upcoming',
      date: 'Mar 2027',
      icon: Circle,
    },
    {
      id: '08',
      num: 'STAGE 08',
      title: 'Escrow & Compensation...',
      status: 'upcoming',
      dateLabel: 'Upcoming',
      date: 'May 2027',
      icon: Circle,
    },
  ];

  return (
    <div id="timeline-overview-root" className="space-y-4">
      {/* Proposal Summary Strip */}
      <div 
        id="timeline-proposal-summary-strip" 
        className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs text-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PROPOSAL ID</div>
          <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">NLAMS-RB-2026-00124</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PROJECT / REQUISITIONING BODY</div>
          <div className="font-semibold text-slate-900 truncate mt-0.5" title="NH Corridor (NH-48 Extn) • NHAI PIU">
            NH Corridor (NH-48 Extn) • NHAI PI...
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">JURISDICTION</div>
          <div className="font-semibold text-slate-900 mt-0.5">4 Districts</div>
          <div className="text-[10px] text-slate-500 truncate">(Ahmedabad, Mehsana, Patan, Banaskantha)</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CURRENT STATUTORY PHASE</div>
          <div className="font-semibold text-slate-900 mt-0.5">Sec 15 Objections & Inquiry</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">STATUTORY REGIME</div>
          <div className="font-semibold text-slate-900 mt-0.5">RFCTLARR 2013 r/w Sec 3A NH Act</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            TIMELINE STATUS: NORMAL
          </div>
          <div className="font-semibold text-slate-900 mt-0.5 text-[11px]">
            SLA Clock Running (54 Days Left)
          </div>
        </div>
      </div>

      {/* Statutory Acquisition Sequence (10-Stage Pipeline) */}
      <div id="timeline-stage-sequence-card" className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">
              Statutory Acquisition Sequence (10-Stage Pipeline)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Mandated under RFCTLARR Act 2013
          </span>
        </div>

        {/* 8 Horizontal Step Cards Grid */}
        <div 
          id="timeline-horizontal-stages-grid" 
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5"
        >
          {stages.map((stg) => {
            const isCompleted = stg.status === 'completed';
            const isCurrent = stg.status === 'current';
            const isUpcoming = stg.status === 'upcoming';

            return (
              <div
                key={stg.id}
                id={`timeline-stage-card-${stg.id}`}
                onClick={() => onNavigateTab && onNavigateTab('stage-details')}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                  isCurrent
                    ? 'bg-[#0f172a] text-white border-slate-900 shadow-md ring-2 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs text-slate-800'
                    : 'bg-slate-50/70 border-slate-200 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[9px] font-mono font-bold tracking-wider uppercase ${
                      isCurrent ? 'text-amber-400' : isCompleted ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {stg.num}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse"></span>
                    )}
                    {isUpcoming && (
                      <Circle className="w-3 h-3 text-slate-300 shrink-0" />
                    )}
                  </div>
                  <div className={`text-xs font-bold line-clamp-2 leading-snug ${
                    isCurrent ? 'text-white' : isCompleted ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {stg.title}
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-200/40 flex flex-col">
                  <span className={`text-[9px] ${
                    isCurrent ? 'text-slate-300' : 'text-slate-400'
                  }`}>
                    {stg.dateLabel}
                  </span>
                  <span className={`text-[10px] font-bold font-mono ${
                    isCurrent ? 'text-amber-300' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {stg.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Section: Left (Current Stage) & Right (Statutory Compliance Horizon) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 8 Cols: Current Statutory Stage */}
        <div 
          id="current-statutory-stage-container" 
          className="lg:col-span-8 bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                CURRENT STATUTORY STAGE
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Section 15 — Objections & Public Hearings
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold font-mono">
              IN PROGRESS • STAGE 05 OF 10
            </span>
          </div>

          {/* 4 Metric Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">NOTICE GAZETTE REF</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">GZ-EXT-2026-N44</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Published 08 Sep 2026</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">STATUTORY 60-DAY CLOCK</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-1.5">
                <span>07 Nov 2026</span>
                <span className="text-emerald-700 font-sans font-bold text-xs">(54 Days Left)</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Under Section 15(1) Rule</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">RESPONSIBLE STATUTORY AUTHORITY</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">SLAO / District Collectorate</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Ahmedabad & Mehsana Revenue Depts.</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">RB ROLE & STATUS</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Respondent Requisitioning Body</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Active Monitoring & Filing Rebuttals</div>
            </div>
          </div>

          {/* Next Critical Milestone Box */}
          <div 
            id="next-critical-milestone-box" 
            className="bg-slate-50/80 border border-slate-200 rounded-lg p-3.5 flex items-start gap-3"
          >
            <div className="p-2 rounded bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                NEXT CRITICAL MILESTONE
              </div>
              <p className="font-medium text-slate-800 mt-0.5">
                Submission of legal counter-affidavit & alignment compliance record for Tehsil Sanand hearing session.
              </p>
              <div className="font-bold text-rose-700 mt-1 font-mono text-[11px]">
                Statutory Due: 22 Sep 2026 (7 Days Remaining)
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              id="btn-view-stage-milestones"
              onClick={() => onNavigateTab && onNavigateTab('milestones')}
              className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>View Stage-wise Milestones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-view-pending-actions"
              onClick={() => onNavigateTab && onNavigateTab('pending-actions')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <span>View Pending Actions</span>
              <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                2 Required
              </span>
            </button>

            <button
              id="btn-statutory-gazette-pdf"
              onClick={() => showToast('Initiated Download: Statutory Gazette Notification S.O. 2381(E) PDF')}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors ml-auto"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Statutory Gazette PDF</span>
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Statutory Compliance Horizon */}
        <div 
          id="statutory-compliance-horizon-card" 
          className="lg:col-span-4 bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">Statutory Compliance Horizon</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                STATUTORY LIMITS
              </span>
            </div>

            {/* 3 Horizon Timeline Items */}
            <div className="divide-y divide-slate-100 text-xs mt-2">
              {/* Item 1 */}
              <div className="py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-800">1. Sec 15 Objection Closure</span>
                  <span className="font-mono font-bold text-rose-600 text-xs">07 Nov 2026</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">60-day window per gazette date</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">CA: SLAO / Collectorate</div>
              </div>

              {/* Item 2 */}
              <div className="py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-800">2. Sec 19 Declaration Deadline</span>
                  <span className="font-mono font-bold text-slate-900 text-xs">14 Aug 2027</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Lapsing clause: 12 months from Sec 11</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">CA: Revenue Dept (State)</div>
              </div>

              {/* Item 3 */}
              <div className="py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-slate-800">3. Sec 25 Award Pronouncement</span>
                  <span className="font-mono font-bold text-slate-900 text-xs">12 Mos. Post Sec 19</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Statutory lapse if unpronounced</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">CA: Land Acq Officer</div>
              </div>
            </div>
          </div>

          {/* Statutory Lapsing Risk Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-slate-600 font-medium">Statutory Lapsing Risk:</span>
              <span className="font-bold text-emerald-700">NIL (Compliant)</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Rules: RFCTLARR Sec 19(7) & 25
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Administrative Guidance Callout */}
      <div 
        id="statutory-administrative-guidance-callout" 
        className="bg-white border-l-4 border-l-amber-500 border border-slate-200 rounded-lg p-4 shadow-2xs flex items-start gap-3.5"
      >
        <div className="p-2 rounded bg-amber-50 text-amber-700 shrink-0 mt-0.5">
          <Shield className="w-4 h-4" />
        </div>
        <div className="text-xs text-slate-600 leading-relaxed">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">
            STATUTORY ADMINISTRATIVE GUIDANCE • RFCTLARR Act 2013 & National Highways Act 1956
          </div>
          <p>
            Under the statutory provisions of the RFCTLARR Act 2013, the Requisitioning Body (NHAI) exercises powers strictly related to project coordination, financial escrow provisioning, and the timely submission of departmental rebuttals. Adjudication of landowner objections, declaration publication, and final compensation determination remain sovereign statutory prerogatives vested in the Competent Authority for Land Acquisition (CALA) and the respective District Collectorates.
          </p>
        </div>
      </div>
    </div>
  );
}
