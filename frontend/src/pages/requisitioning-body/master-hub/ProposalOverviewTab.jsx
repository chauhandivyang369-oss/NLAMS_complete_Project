import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Building, 
  ExternalLink,
  Layers,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Activity,
  Mail
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalOverviewTab({ onSwitchTab }) {
  const { showToast, setActiveModule } = useWorkspace();

  return (
    <div className="p-5 space-y-5">
      
      {/* Top Section: Metric Performance & Immediate Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left: Acquisition Metric Performance (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                ACQUISITION METRIC PERFORMANCE
              </h3>
              <p className="text-[11px] text-slate-500">
                Gazetted Baseline: 324.50 Ha (Phase-I)
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Phase 1 On Track
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            {/* Land Proposed */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">LAND PROPOSED</div>
              <div className="text-lg font-bold text-slate-900 font-sans mt-0.5">324.50 Ha</div>
              <div className="text-[10px] text-slate-500">Total Alignment Corridor</div>
            </div>

            {/* Land Acquired */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">LAND ACQUIRED</div>
              <div className="text-lg font-bold text-emerald-700 font-sans mt-0.5">218.40 Ha</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[67.3%]"></div>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">67.3% Progress</div>
            </div>

            {/* Affected Families */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">AFFECTED FAMILIES</div>
              <div className="text-lg font-bold text-slate-900 font-sans mt-0.5">8,412 PAF</div>
              <div className="text-[10px] text-slate-500">Census baseline locked</div>
            </div>

            {/* Displaced Families */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">DISPLACED FAMILIES</div>
              <div className="text-lg font-bold text-slate-900 font-sans mt-0.5">2,184 PDF</div>
              <div className="text-[10px] text-slate-500">Relocation township</div>
            </div>

            {/* Assessed Award */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">ASSESSED AWARD</div>
              <div className="text-lg font-bold text-slate-900 font-sans mt-0.5">₹186.40 Cr</div>
              <div className="text-[10px] text-emerald-600 font-medium">Escrow funded: 100% SBI</div>
            </div>

            {/* R&R Progress */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">R&amp;R PROGRESS</div>
              <div className="text-lg font-bold text-blue-700 font-sans mt-0.5">68%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-[68%]"></div>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">5,720 Assisted</div>
            </div>

            {/* Physical Possession (2 cols span) */}
            <div className="col-span-2 bg-slate-50/80 border border-slate-200/80 rounded-md p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase">
                <span>PHYSICAL POSSESSION</span>
                <span className="text-emerald-700 font-bold">197.94 Ha Cleared</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1">
                <div className="bg-emerald-600 h-full rounded-full w-[61%]"></div>
              </div>
              <div className="text-[10px] text-slate-600">
                Phase Handover: 61% • Section 16 Demarcation in Chhatral &amp; Kadi Sectors
              </div>
            </div>

          </div>
        </div>

        {/* Right: Immediate Actions Required */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                IMMEDIATE ACTIONS REQUIRED
              </h3>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              3 PENDING
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Action 1 */}
            <div className="bg-rose-50/50 border border-rose-200/80 rounded-lg p-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-900 text-[11px]">LEGAL REBUTTAL DUE</span>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                  T-5 Days
                </span>
              </div>
              <p className="text-[11px] text-slate-700 leading-snug">
                Submit counter-rebuttal for Objection #OBJ-441 (Multiplier factor claim at Kadi Tehsil).
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500">SLAO Notice Ref: #229-L</span>
                <button 
                  onClick={() => showToast('Opening Form-IV Rebuttal Draft')}
                  className="text-[11px] bg-[#0b1b36] hover:bg-[#192f58] text-white px-2 py-0.5 rounded font-semibold transition-colors"
                >
                  Draft Form-IV
                </button>
              </div>
            </div>

            {/* Action 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11px]">DOCUMENT VERIFICATION</span>
                <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                  Pending Seal
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                2 Khasra mutation extracts await RB Nodal Officer verification countersign.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500">ULPIN: 24-009-8831</span>
                <button 
                  onClick={() => showToast('Initialising Digital Signature Certificate (DSC Class 3)...')}
                  className="text-[11px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-semibold transition-colors"
                >
                  e-Sign File
                </button>
              </div>
            </div>

            {/* Action 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11px]">HEARING CONFIRMATION</span>
                <span className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                  Bench 2
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Confirm attendance of NHAI Senior Survey Officer for Sanand Public Hearing on 24 Sep.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500">Sanand Tehsil Hall</span>
                <button 
                  onClick={() => showToast('Confirmed representative attendance at Sanand SDM Bench')}
                  className="text-[11px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-semibold transition-colors"
                >
                  Confirm Rep
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Section: Stage 5 Highlight Card & 10-Stage Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Yellow Statutory Stage Card (2 cols) */}
        <div className="lg:col-span-2 bg-[#fffbeb] border-2 border-[#fcd34d] rounded-lg p-4.5 shadow-xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-950 uppercase tracking-wide">
                STATUTORY STAGE 5 OF 10: Section 15 — Objections &amp; Public Hearings
              </h3>
            </div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded w-fit">
              [UNDER ACTIVE INQUIRY]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-amber-50/60 p-3 rounded-lg border border-amber-200/70">
            <div>
              <div className="text-[10px] font-bold text-amber-900 uppercase">RESPONSIBLE CALA</div>
              <div className="font-bold text-slate-900 mt-0.5">Competent Authority / LAO</div>
              <div className="text-[11px] text-slate-600">District Revenue Collectorate Bench</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-amber-900 uppercase">COMMENCED &amp; DEADLINE</div>
              <div className="font-bold text-slate-900 mt-0.5">08 Sep 2026 → 07 Nov 2026</div>
              <div className="text-[11px] text-amber-800 font-semibold">54 Days statutory window left</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-amber-900 uppercase">REQUISITIONING BODY ROLE</div>
              <div className="font-bold text-slate-900 mt-0.5">Monitoring &amp; Legal Rebuttal</div>
              <div className="text-[11px] text-slate-600">Form-IV responses pending submit</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
            <p className="text-[11px] text-slate-800 leading-relaxed max-w-xl">
              <span className="font-bold">Current Tehsil Hearing Schedule:</span> 18 public hearings scheduled across 4 Tehsils (Kadi, Mehsana, Kalol, Sanand). 2 formal legal objections regarding compensation multiplier factor require NHAI Project Director counter-affidavit within 7 business days.
            </p>
            <button 
              onClick={() => onSwitchTab('workflow')}
              className="bg-[#0b1b36] hover:bg-[#192f58] text-white px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shadow-xs"
            >
              View 18 Hearing Dockets
            </button>
          </div>
        </div>

        {/* 10-Stage Pipeline Stepper Card (1 col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              10-STAGE STATUTORY PIPELINE
            </h3>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
              Stage 5 / 10
            </span>
          </div>

          <div className="space-y-1.5 text-xs max-h-[220px] overflow-y-auto pr-1">
            {[
              { num: '1', name: 'Form-I Smart Wizard', date: '04 Jun', state: 'done' },
              { num: '2', name: 'Admin & Financial Sanction', date: '18 Jun', state: 'done' },
              { num: '3', name: 'SIA Study & Expert Clearance', date: '28 Jul', state: 'done' },
              { num: '4', name: 'Sec 11 Preliminary Gazette', date: '15 Aug', state: 'done' },
              { num: '5', name: 'Sec 15 Objections & Inquiry', date: '07 Nov', state: 'active' },
              { num: '6', name: 'Sec 19 Declaration of Acquisition', date: 'Pending', state: 'pending' },
              { num: '7', name: 'Sec 21 Public Notices', date: 'Pending', state: 'pending' },
              { num: '8', name: 'Sec 23 & 30 Award Formulation', date: 'Pending', state: 'pending' },
              { num: '9', name: 'DBT & Escrow Disbursement', date: 'Pending', state: 'pending' },
              { num: '10', name: 'Sec 38 Physical Possession', date: "Target '27", state: 'pending' },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-1.5 rounded transition-colors ${
                  step.state === 'active' 
                    ? 'bg-amber-100/70 border border-amber-300 font-semibold text-slate-950' 
                    : step.state === 'done'
                    ? 'text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {step.state === 'done' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : step.state === 'active' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0b1b36] text-amber-400 text-[9px] font-bold flex items-center justify-center shrink-0">
                      {step.num}
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 text-[9px] font-medium flex items-center justify-center shrink-0">
                      {step.num}
                    </span>
                  )}
                  <span className="text-[11px] truncate max-w-[150px]">{step.name}</span>
                </div>
                <span className="text-[10px] font-mono shrink-0">{step.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lower Section: Administrative Dossier & Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Project Administrative Dossier (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Project Administrative Dossier
              </h3>
              <p className="text-[11px] text-slate-500">
                Central Scheme: BHARATMALA-NHAI-CORR-IV
              </p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-mono font-medium">
              MoRTH Sanction Ref: #2025/110
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* Box 1: Strategic Public Purpose */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1">
              <div className="text-[10px] font-bold text-slate-600 uppercase">STRATEGIC PUBLIC PURPOSE</div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                National Highway Connectivity &amp; Freight Logistics Expansion under Bharatmala Pariyojana Phase-I. Eliminates critical bottlenecks between multimodal freight nodes and Mundra/Kandla port expressway extensions.
              </p>
              <div className="text-[10px] text-slate-500 pt-1">
                Project Category: Linear Highway Infra • Spec: 8-Lane Access Controlled
              </div>
            </div>

            {/* Box 2: Approvals & Competent Authority */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1">
              <div className="text-[10px] font-bold text-slate-600 uppercase">APPROVALS &amp; COMPETENT AUTHORITY</div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ownership Model:</span>
                  <span className="font-semibold">Central Govt (100% MoRTH)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Admin Approval / Sanction:</span>
                  <span className="font-mono">MoRTH/NHAI/TECH/2025/110</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sanction Date:</span>
                  <span>12 Jan 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CALA Designation:</span>
                  <span>SLAO Ahmedabad &amp; Mehsana Div.</span>
                </div>
              </div>
            </div>

            {/* Box 3: Project Lifecycle Schedule */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-600 uppercase">PROJECT LIFECYCLE SCHEDULE</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 rounded">
                  On Track
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gestation Period:</span>
                  <span className="font-semibold">36 Months (Elapsed: 09 Months)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Final Handover Target:</span>
                  <span className="font-semibold text-blue-700">Mar '27 (Milestone IV)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">EPC Concessionaire:</span>
                  <span>EPC Package 04 (L&amp;T Infrastructure)</span>
                </div>
              </div>
            </div>

            {/* Box 4: Cadastral Survey Alignment */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1">
              <div className="text-[10px] font-bold text-slate-600 uppercase">CADASTRAL SURVEY ALIGNMENT</div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Spanning Villages:</span>
                  <span className="font-semibold">44 Villages across 4 Tehsils</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ULPIN Parcels Mapped:</span>
                  <span className="font-mono font-semibold">1,940 Plots geo-tagged</span>
                </div>
                <div className="pt-1">
                  <button 
                    onClick={() => setActiveModule('gis-canvas')}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Open in GIS Spatial Canvas</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Immutable Audit Stream (1 col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                IMMUTABLE AUDIT STREAM
              </h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-3 text-xs pt-1">
            <div className="border-l-2 border-emerald-500 pl-2.5 space-y-0.5">
              <div className="font-bold text-slate-900 text-[11px]">SLAO Mehsana issued docket OBJ-441</div>
              <p className="text-[10px] text-slate-500">14 Sep 2026, 14:12 IST • Revenue Collectorate</p>
            </div>

            <div className="border-l-2 border-blue-500 pl-2.5 space-y-0.5">
              <div className="font-bold text-slate-900 text-[11px]">PFMS Escrow tranche deposited</div>
              <p className="text-[10px] text-slate-500">13 Sep 2026, 11:45 IST • Tranche-II ₹42.50 Cr</p>
            </div>

            <div className="border-l-2 border-slate-400 pl-2.5 space-y-0.5">
              <div className="font-bold text-slate-900 text-[11px]">Geo-spatial Cadastre Layer Re-synced</div>
              <p className="text-[10px] text-slate-500">11 Sep 2026, 16:30 IST • DLR Cadastral Sync</p>
            </div>

            <div className="border-l-2 border-slate-400 pl-2.5 space-y-0.5">
              <div className="font-bold text-slate-900 text-[11px]">Gazette Ext No. 448 Notified</div>
              <p className="text-[10px] text-slate-500">15 Aug 2026, 09:00 IST • State E-Gazette</p>
            </div>
          </div>

          <button 
            onClick={() => showToast('Opening immutable forensic audit logs for RB-00124')}
            className="w-full text-center text-xs font-semibold text-blue-700 hover:text-blue-800 pt-2 border-t border-slate-100 flex items-center justify-center gap-1"
          >
            <span>View Complete 128 Audit Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Bottom Section: RFCTLARR Compliance Register */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              RFCTLARR Statutory Compliance Register
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            5 OF 6 PRE-REQUISITES SECURED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            { title: 'Form-I Proposal submitted & countersigned', date: '04 Jun 2026', status: 'COMPLIED', color: 'emerald' },
            { title: 'Administrative & Financial Sanction Verified', date: '18 Jun 2026', status: 'COMPLIED', color: 'emerald' },
            { title: 'GIS Parcel Alignment validated via NIC-LGD', date: '12 Jul 2026', status: 'COMPLIED', color: 'emerald' },
            { title: 'SIA Report & Expert Evaluation Committee Clearance', date: '28 Jul 2026', status: 'COMPLIED', color: 'emerald' },
            { title: 'Section 11 Preliminary Notification Gazette Published', date: '15 Aug 2026', status: 'GAZETTED', color: 'blue' },
            { title: 'Section 15 Hearing: 2 Formal Objections Require RB Response', date: 'Due 22 Sep 2026', status: 'ACTION REQUIRED', color: 'amber' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="font-semibold text-slate-800 text-[11px] leading-snug">{item.title}</div>
                <div className="text-[10px] text-slate-500 font-mono">{item.date}</div>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${
                item.color === 'emerald'
                  ? 'bg-emerald-100 text-emerald-800'
                  : item.color === 'blue'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Contact Liaison Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Nodal CALA Liaison Desk:</span>
            <span className="font-mono text-slate-700 font-medium">cala-support.ahmedabad@gov.in</span>
          </div>
          <button 
            onClick={() => showToast('Opening secure liaison communication channel')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Contact Desk</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
}
