import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  Settings,
  Lock,
  Layers
} from 'lucide-react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';

export default function StageDetailsView({ onNavigateTab }) {
  const { showToast } = useWorkspace();
  const [selectedStage, setSelectedStage] = useState('stage04');

  return (
    <div id="stage-details-view-root" className="space-y-4">
      {/* Stage Sub-Header Info Banner */}
      <div 
        id="stage-details-top-header"
        className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white text-[10px] font-bold font-mono">
            MODULE 06
          </span>
          <span className="font-bold text-slate-900 text-sm">Statutory Timeline Tracker</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">Statutory Stage Compliance & Record Deep-Dive</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Statutory Authority: MoRTH & CALA</span>
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gazette Enforced</span>
          </span>
        </div>
      </div>

      {/* Active Proposal & Stage Selector Row */}
      <div 
        id="active-proposal-stage-selector"
        className="bg-[#0f172a] border border-slate-800 rounded-lg p-3.5 text-white shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
      >
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE PROPOSAL</div>
          <div className="font-mono font-bold text-white text-sm mt-0.5">
            NLAMS-RB-2026-00124
          </div>
          <div className="text-[11px] text-slate-400">
            NH-48 Corridor Expansion (Vadodara - Surat Section)
          </div>
        </div>

        <div className="flex-1 max-w-md mx-0 md:mx-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            STATUTORY STAGE
          </div>
          <div className="flex items-center gap-2">
            <select
              id="select-statutory-stage"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              <option value="stage04">Stage 04: Preliminary Notification (RFCTLARR Sec 11 / NH Act Sec 3A)</option>
              <option value="stage05">Stage 05: Objections, Inquiries & Hearings (Sec 15 / Sec 3C)</option>
              <option value="stage03">Stage 03: SIA Exemption / Appraisal Gate (Sec 105)</option>
            </select>
            <button 
              onClick={() => showToast('Stage configuration options')}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              title="Stage settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUTORY DISPOSITION</div>
          <div className="font-bold text-emerald-400 text-xs sm:text-sm mt-0.5 tracking-tight flex items-center justify-end gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>COMPLETED & STATUTORILY GAZETTED</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section 1: Statutory Stage Information */}
          <div 
            id="section-1-statutory-info"
            className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  SECTION 1: STATUTORY STAGE INFORMATION
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500">
                REF: MOR-NOTIF-448
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">STAGE LEGAL TITLE</div>
                <div className="font-bold text-slate-900 mt-0.5">
                  Preliminary Notification & Cadastral Intent Notice
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">STATUTORY ACT & CLAUSE</div>
                <div className="font-bold text-slate-900 mt-0.5">
                  RFCTLARR Act 2013 (Sec 11) r/w NH Act 1956 (Sec 3A)
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GAZETTE REGISTRATION</div>
                <div className="font-mono font-bold text-slate-900 mt-0.5">
                  Gazette of India No. 448 (Pt II, Sec 3(ii))
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CURRENT STATUTORY STATUS</div>
                <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Statutorily Completed & Sealed</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">INITIATION TIMESTAMP</div>
                <div className="font-mono font-bold text-slate-900 mt-0.5">01 Aug 2026</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">STATUTORY SLA DUE DATE</div>
                <div className="font-mono font-bold text-slate-900 mt-0.5">20 Aug 2026</div>
              </div>
            </div>

            {/* Final Gazette Enforcement Banner */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded p-2.5 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Final Gazette Enforcement Date: <strong>15 Aug 2026</strong></span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                Published 5 Days Ahead of SLA
              </span>
            </div>
          </div>

          {/* Section 2: Execution Sequence & Statutory Chain */}
          <div 
            id="section-2-execution-sequence"
            className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  SECTION 2: EXECUTION SEQUENCE & STATUTORY CHAIN
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold font-mono">
                ALL 5 SUB-MILESTONES CERTIFIED
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Stepper item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Stage Initiated</span>
                    <span className="text-[11px] font-mono text-slate-500">01 Aug 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Draft notification package prepared with cadastral boundaries and preliminary survey alignments.
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>

              {/* Stepper item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Required Data Submitted</span>
                    <span className="text-[11px] font-mono text-slate-500">04 Aug 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    1,842 parcel schedule & ULPIN verified map transmitted to State Gazette Press & Collectorate.
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>

              {/* Stepper item 3 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Authority Review & Vetting</span>
                    <span className="text-[11px] font-mono text-slate-500">09 Aug 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Legal division & Revenue Secretariat approved Hindi & English bilingual draft legal texts.
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>

              {/* Stepper item 4 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Notification Gazette Published</span>
                    <span className="text-[11px] font-mono text-slate-500">15 Aug 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Published in Gazette of India & 2 regional vernacular dailies (Divya Bhaskar & Gujarat Samachar).
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>

              {/* Stepper item 5 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  5
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Stage Completed & Downstream Clock Triggered</span>
                    <span className="text-[11px] font-mono text-slate-500">15 Aug 2026</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                    Section 15 60-day statutory objection window officially opened for affected titleholders.
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          {/* Section 3: Validity Gates */}
          <div 
            id="section-3-validity-gates"
            className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  SECTION 3: VALIDITY GATES
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 font-mono">
                4/4 Validated
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Land Parcel Data Verified</span>
                    <span className="font-mono font-bold text-emerald-700">100%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    1,842 of 1,842 Khasra parcels georeferenced to Bhuvan Cadastre with no polygon collisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Proposal Documents Available</span>
                    <span className="font-bold text-emerald-700">Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    MoRTH In-Principle Sanction #GJ-048 and revenue scheme maps verified by State Registrar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Previous Stage Completed</span>
                    <span className="font-bold text-emerald-700">Certified</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Stage 03 SIA Exemption Appraisal certified on 28 Jul 2026 under linear project exception.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Public Notice Affixation</span>
                    <span className="font-bold text-emerald-700">Served</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Local Gram Panchayat and Taluka office notice boards served across 14 affected revenue villages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: RB Action & Compliance */}
          <div 
            id="section-4-rb-compliance"
            className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  SECTION 4: RB ACTION & COMPLIANCE
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                COMPLIANT
              </span>
            </div>

            <div className="text-xs space-y-2">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">RB MANDATE & PROTOCOL</span>
                <p className="text-[11px] text-slate-700 mt-0.5">
                  Requisitioning Body must publish notification summary in local newspapers and ensure village Panchayat notices are attested with physical dispatch memos.
                </p>
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">COMPLIANCE STATUS</span>
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>COMPLETED • Newspaper cutting proofs & Gram Sevak acknowledgement receipts uploaded to vault.</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-[11px] text-slate-600 flex items-start gap-2 mt-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Pending RB Action:</strong> No pending action required from Requisitioning Body for Stage 04. All compliance records submitted and sealed in the National Land Registry.
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Statutory Authority Status */}
          <div 
            id="section-5-authority-status"
            className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-2.5 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  SECTION 5: STATUTORY AUTHORITY STATUS
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                Govt of Gujarat • MoRTH
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">RESPONSIBLE STATUTORY AUTHORITY</span>
              <p className="text-[11px] text-slate-800 font-medium mt-0.5">
                Appropriate Government (Ministry of Road Transport & Highways) & Government of Gujarat Gazette Press.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CURRENT AUTHORITY CUSTODY</span>
              <p className="text-[11px] text-slate-700 mt-0.5">
                Gazette Published; Authority Custody officially transferred to <strong>District Collectorate / CALA (Vadodara)</strong> for Section 15 inquiries.
              </p>
            </div>

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">LAST AUTHORITY ENDORSEMENT</span>
              <span className="text-[11px] text-slate-700 font-mono">
                Memo #REV-GJ-448 endorsed by Principal Secretary (Revenue) — 16 Aug 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Gazette Artifacts (3 Registered Files) */}
      <div 
        id="associated-gazette-artifacts-card"
        className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              Associated Gazette Artifacts (3 Registered Files)
            </h3>
          </div>
          <span className="text-[10px] font-mono font-medium text-slate-500">
            SHA-256 Digital Signatures Intact
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Gazette_No_448_Enacted.pdf</div>
                <div className="text-[10px] text-slate-500 mt-0.5">2.4 MB • 15 Aug 2026</div>
              </div>
            </div>
            <button 
              onClick={() => showToast('Downloading Gazette_No_448_Enacted.pdf')}
              className="p-1.5 text-slate-500 hover:text-slate-800"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Vernacular_Press_Affidavits.pdf</div>
                <div className="text-[10px] text-slate-500 mt-0.5">4.8 MB • 16 Aug 2026</div>
              </div>
            </div>
            <button 
              onClick={() => showToast('Downloading Vernacular_Press_Affidavits.pdf')}
              className="p-1.5 text-slate-500 hover:text-slate-800"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Khasra_Schedule_1842_Sealed.xlsx</div>
                <div className="text-[10px] text-slate-500 mt-0.5">1.1 MB • 04 Aug 2026</div>
              </div>
            </div>
            <button 
              onClick={() => showToast('Downloading Khasra_Schedule_1842_Sealed.xlsx')}
              className="p-1.5 text-slate-500 hover:text-slate-800"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab && onNavigateTab('overview')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Timeline</span>
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('documents-audit')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Associated Gazette Documents (3 Files)</span>
          </button>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab('pending-actions')}
          className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-xs transition-colors"
        >
          <span>View Section 15 Inquiries (Next Stage)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
