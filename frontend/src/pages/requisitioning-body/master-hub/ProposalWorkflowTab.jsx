import React from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Building2, 
  Scale, 
  UserCheck, 
  FileText, 
  Download, 
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Send,
  Calendar
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalWorkflowTab() {
  const { showToast } = useWorkspace();

  const stages = [
    { code: 'ST-01', name: 'Form-I Req.', date: '04 Jun', state: 'done' },
    { code: 'ST-02', name: 'Admin Sanction', date: '18 Jun', state: 'done' },
    { code: 'ST-03', name: 'SIA Study', date: '28 Jul', state: 'done' },
    { code: 'ST-04', name: 'Sec 11 Notif', date: '15 Aug', state: 'done' },
    { code: 'ST-05', name: 'Sec 15 Inquiry', date: '07 Nov', state: 'active' },
    { code: 'ST-06', name: 'Sec 19 Decl.', date: 'Pending', state: 'pending' },
    { code: 'ST-07', name: 'Sec 21 Notices', date: 'Pending', state: 'pending' },
    { code: 'ST-08', name: 'Sec 23 Awards', date: 'Pending', state: 'pending' },
    { code: 'ST-09', name: 'Escrow DBT', date: 'Pending', state: 'pending' },
    { code: 'ST-10', name: 'Sec 38 Pos.', date: "Target '27", state: 'pending' },
  ];

  const workflowLogs = [
    {
      time: '14 Sep 2026, 14:12',
      actor: 'CALA SLAO Mehsana',
      action: 'Issued formal docket OBJ-441 to NHAI for counter-affidavit',
      stage: 'Sec. 15',
      status: 'REBUTTAL AWAITED',
      color: 'amber'
    },
    {
      time: '13 Sep 2026, 11:45',
      actor: 'NHAI Finance Division',
      action: 'Released Tranche-II Escrow ₹42.50 Cr into State SBI Account',
      stage: 'Sec. 23',
      status: 'DEPOSITED',
      color: 'emerald'
    },
    {
      time: '11 Sep 2026, 16:30',
      actor: 'DLR Gujarat Cadastre',
      action: 'Resynced 14 challenged Khasra boundaries via DGPS drone',
      stage: 'Sec. 15',
      status: 'VERIFIED',
      color: 'emerald'
    },
    {
      time: '08 Sep 2026, 09:30',
      actor: 'State Revenue Dept',
      action: 'Transmitted physical statutory inquiry custody to CALA Sanand',
      stage: 'Sec. 15',
      status: 'TRANSFERRED',
      color: 'blue'
    },
    {
      time: '15 Aug 2026, 09:00',
      actor: 'Gujarat Govt Press',
      action: 'Published Sec. 11 Preliminary Notification Gazette Ext #448',
      stage: 'Sec. 11',
      status: 'GAZETTED',
      color: 'blue'
    }
  ];

  return (
    <div className="flex flex-col xl:flex-row">
      
      {/* Main Workflow Viewport */}
      <div className="flex-1 p-5 space-y-5">
        
        {/* Top 10-Stage Horizontal Stepper */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                10-Stage Statutory RFCTLARR 2013 Workflow Lifecycle
              </h3>
              <p className="text-[11px] text-slate-500">
                End-to-end statutory sovereign timeline with strict Section 11(4) and Section 19(2) clock monitors.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#0b1b36] bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
              STAGE 5 OF 10 ACTIVE • 50% Completed
            </span>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-xs pt-1">
            {stages.map((st, i) => (
              <div 
                key={i}
                className={`p-2 rounded-md border text-center transition-all ${
                  st.state === 'active'
                    ? 'bg-[#0b1b36] text-white border-[#0b1b36] shadow-sm'
                    : st.state === 'done'
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="text-[9px] font-mono font-bold tracking-wider opacity-80">{st.code}</div>
                <div className="font-bold text-[11px] truncate mt-0.5">{st.name}</div>
                <div className={`text-[10px] mt-1 font-mono ${st.state === 'active' ? 'text-amber-400 font-bold' : ''}`}>
                  {st.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 05 In-Depth Statutory Inquiry Card */}
        <div className="bg-[#fffdf7] border-2 border-amber-300 rounded-lg p-4 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                Stage 05 In-Depth Statutory Inquiry: Section 15 Objections, Claim Disposals &amp; Public Hearings
              </h3>
            </div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
              [STATUTORY INQUIRY OPEN]
            </span>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-lg border border-amber-200">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">STATUTORY AUTHORITY</div>
              <div className="font-bold text-slate-900 mt-0.5">CALA / SLAO</div>
              <div className="text-[10px] text-slate-500">Competent Authority LA</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">RB STANDING</div>
              <div className="font-bold text-slate-900 mt-0.5">Respondent Body</div>
              <div className="text-[10px] text-slate-500">NHAI Legal &amp; Survey Cell</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">STATUTORY CLOCK (60D)</div>
              <div className="font-bold text-amber-700 mt-0.5">54 Days Left</div>
              <div className="text-[10px] text-slate-500">Closing: 07 Nov 2026</div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">SLA RISK ASSESSMENT</div>
              <div className="font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded w-fit mt-0.5">
                MEDIUM
              </div>
              <div className="text-[10px] text-slate-500">Critical hearing next week</div>
            </div>
          </div>

          {/* Active Docket & Next Action */}
          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-amber-100/50 rounded-md border border-amber-200">
              <div className="font-semibold text-slate-800 text-[11px]">
                Active Case Docket: <span className="font-bold text-slate-950">14 Objections Lodged</span> (12 Rebuttals Filed, 2 Pending Review, 85.7% Complied)
              </div>
              <button 
                onClick={() => showToast('Opening Objection Case Docket Registry')}
                className="text-xs font-bold text-blue-700 hover:text-blue-800"
              >
                Inspect All 14 Files →
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-white rounded-md border border-slate-200">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase">Next Statutory Action: CALA Joint Hearing Session</div>
                <div className="font-bold text-slate-900 text-xs mt-0.5">
                  22 September 2026, 11:00 AM IST at Sanand Tehsil Conference Hall
                </div>
              </div>
              <button 
                onClick={() => showToast('Opening Sanand Hearing Session Dossier')}
                className="bg-[#0b1b36] hover:bg-[#182d52] text-white px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap shadow-xs"
              >
                SESSION DOSSIER
              </button>
            </div>
          </div>

          {/* Two Visual Cards: Cadastral Alignment Map & Hearing Chamber */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Left Visual */}
            <div className="bg-white border border-slate-200 rounded-md p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11px]">Cadastral Survey Alignment Map</span>
                <span className="text-[10px] text-blue-700 font-semibold">14 Challenged Khasras Overlaid</span>
              </div>
              <div className="h-28 bg-[#0b192e] rounded border border-slate-300 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full opacity-80" viewBox="0 0 300 120">
                  <path d="M 10 90 Q 150 20 290 80" fill="none" stroke="#3b82f6" strokeWidth="8" strokeOpacity="0.4" />
                  <path d="M 10 90 Q 150 20 290 80" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,4" />
                  <circle cx="90" cy="55" r="5" fill="#ef4444" />
                  <circle cx="160" cy="40" r="5" fill="#ef4444" />
                  <circle cx="230" cy="65" r="5" fill="#10b981" />
                </svg>
                <div className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-mono">
                  Sanand Bypass Sector CH 22+100
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="bg-white border border-slate-200 rounded-md p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11px]">Tehsil Hearing Chamber Reference</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Room #2 Designated</span>
              </div>
              <div className="h-28 bg-slate-100 rounded border border-slate-200 p-2.5 flex flex-col justify-between">
                <div className="space-y-1 text-[11px]">
                  <div className="font-bold text-slate-800">Sanand Sub-District Magistrate Court</div>
                  <div className="text-slate-600">Presiding CALA: Shri K. M. Patel (SLAO)</div>
                  <div className="text-slate-500 text-[10px]">Stenographer &amp; Audio-Video Recording Scheduled</div>
                </div>
                <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Public Notice displayed at Tehsil Notice Board</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Multi-Authority Statutory Routing Architecture */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Multi-Authority Statutory Routing Architecture (INTER-DEPARTMENTAL CHAIN)
              </h3>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              6 Sovereign Authorities
            </span>
          </div>

          {/* 6 Step Inter-Departmental Chain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
            <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200">
              <div className="text-[9px] font-bold text-emerald-800 uppercase">STEP 1 • ORIGIN</div>
              <div className="font-bold text-slate-900 text-[11px] mt-0.5">Requisitioning Body</div>
              <div className="text-[10px] text-slate-500">NHAI HQ / PIU</div>
              <span className="inline-block text-[9px] font-bold text-emerald-700 mt-1">Approved</span>
            </div>

            <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200">
              <div className="text-[9px] font-bold text-emerald-800 uppercase">STEP 2 • MINISTRY</div>
              <div className="font-bold text-slate-900 text-[11px] mt-0.5">Approp. Gov.</div>
              <div className="text-[10px] text-slate-500">MoRTH / Rev. Dept</div>
              <span className="inline-block text-[9px] font-bold text-emerald-700 mt-1">Sanctioned</span>
            </div>

            <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200">
              <div className="text-[9px] font-bold text-emerald-800 uppercase">STEP 3 • SOCIAL</div>
              <div className="font-bold text-slate-900 text-[11px] mt-0.5">SIA &amp; Expert Unit</div>
              <div className="text-[10px] text-slate-500">State SIA Unit</div>
              <span className="inline-block text-[9px] font-bold text-emerald-700 mt-1">Cleared</span>
            </div>

            <div className="p-2.5 rounded bg-amber-100 border-2 border-amber-400">
              <div className="text-[9px] font-bold text-amber-900 uppercase">STEP 4 • DISTRICT (CURRENT)</div>
              <div className="font-bold text-slate-950 text-[11px] mt-0.5">Collectorate / SLAO</div>
              <div className="text-[10px] text-slate-700">CALA Ahmedabad</div>
              <span className="inline-block text-[9px] font-bold text-amber-900 mt-1 bg-amber-200 px-1 rounded">
                In Custody
              </span>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <div className="text-[9px] font-bold text-slate-400 uppercase">STEP 5 • TRIBUNAL</div>
              <div className="font-bold text-slate-700 text-[11px] mt-0.5">R&amp;R Authority</div>
              <div className="text-[10px] text-slate-400">Divisional Commnr</div>
              <span className="inline-block text-[9px] text-slate-400 mt-1">Pending</span>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <div className="text-[9px] font-bold text-slate-400 uppercase">STEP 6 • CLOSEOUT</div>
              <div className="font-bold text-slate-700 text-[11px] mt-0.5">Possession Officer</div>
              <div className="text-[10px] text-slate-400">Executing Engineer</div>
              <span className="inline-block text-[9px] text-slate-400 mt-1">Pending</span>
            </div>
          </div>

          {/* Official Custody Transfer Record */}
          <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-900 text-[11px]">Official Custody Transfer Record:</div>
              <div className="text-slate-600">
                Current Physical Custodian: <span className="font-semibold text-slate-800">Shri K. M. Patel, SLAO Sanand</span> • File Handoff Date: <span className="font-mono">08 Sep 2026, 09:30 AM</span>
              </div>
            </div>
            <span className="bg-[#0b1b36] text-amber-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded whitespace-nowrap">
              Statutory Return Limit: 07 Nov 2026 [Under Sec 15-2]
            </span>
          </div>
        </div>

        {/* Chronological Workflow Event Audit Log */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Chronological Workflow Event Audit Log
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Immutable Blockchain Record</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b1b36] text-white text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-mono">DATE TIME (IST)</th>
                  <th className="py-2.5 px-4">ACTOR &amp; AUTHORITY</th>
                  <th className="py-2.5 px-4">STATUTORY ACTION PERFORMED</th>
                  <th className="py-2.5 px-4">STAGE</th>
                  <th className="py-2.5 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workflowLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-slate-600 whitespace-nowrap">{log.time}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{log.actor}</td>
                    <td className="py-2.5 px-4 text-slate-700">{log.action}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-600">{log.stage}</td>
                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        log.color === 'emerald'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : log.color === 'amber'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Sidebar for Workflow */}
      <div className="w-full xl:w-[320px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-4 space-y-4 shrink-0 shadow-xs text-slate-800">
        
        {/* Statutory Risk Advisory */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Statutory Risk Advisory &amp; Guidance
            </span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
            <div className="font-bold text-amber-950 text-[11px]">SLA RISK LEVEL: MEDIUM (54 Days Left)</div>
            <p className="text-[10px] text-amber-900 leading-snug">
              Automated System Recommendation: Assign legal counsel to appear at Sanand Sub-District Magistrate court on 22 Sep. Multiplier factor dispute requires Form-IV filing.
            </p>
            <button 
              onClick={() => showToast('Assigned NHAI Senior Legal Officer to Sanand SDM Hearing Bench')}
              className="w-full bg-[#0b1b36] hover:bg-[#16294a] text-white py-1 rounded text-[10px] font-bold transition-colors mt-1"
            >
              ASSIGN LEGAL OFFICER TO HEARING
            </button>
          </div>
        </div>

        {/* Pending Actions Required (2) */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Pending Actions Required (2)
            </span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 rounded">Urgent</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-rose-50/70 border border-rose-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-900 text-[11px]">LEGAL REBUTTAL DRAFT</span>
                <span className="text-[10px] font-bold text-rose-700">DUE IN 48H</span>
              </div>
              <p className="text-[10px] text-rose-800 mt-0.5">Counter-affidavit for Kadi Tehsil Docket #441</p>
              <div className="flex items-center gap-2 mt-1.5">
                <button 
                  onClick={() => showToast('Transmitting digital signed rebuttal to SLAO Mehsana...')}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded"
                >
                  SIGN &amp; SUBMIT
                </button>
                <button 
                  onClick={() => showToast('Opening Form-IV rebuttal PDF draft')}
                  className="text-rose-800 text-[10px] underline"
                >
                  Review PDF
                </button>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-[11px]">HEARING CONFIRMATION</div>
              <p className="text-[10px] text-slate-600 mt-0.5">Submit representative nomination form for 22 Sep</p>
              <button 
                onClick={() => showToast('Transmitted acknowledgement to Sanand SDM')}
                className="text-blue-700 font-bold text-[10px] underline mt-1"
              >
                TRANSMIT ACKNOWLEDGEMENT
              </button>
            </div>
          </div>
        </div>

        {/* Key Statutory Milestones */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Key Statutory Milestones
            </span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Sec. 4 SIA Notif</span>
              <span className="text-[10px] font-mono font-semibold text-emerald-700">15 Jul 2026</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Sec. 11 Preliminary Gaz.</span>
              <span className="text-[10px] font-mono font-semibold text-emerald-700">28 Aug 2026</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-800 font-bold">Sec. 15 Inquiry Closure</span>
              <span className="text-[10px] font-mono font-bold text-amber-800">07 Nov 2026</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Sec. 19 Declaration Limit</span>
              <span className="text-[10px] font-mono text-slate-500">27 Aug 2027</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Sec. 25 Award Deadline</span>
              <span className="text-[10px] font-mono text-slate-500">26 Aug 2028</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
