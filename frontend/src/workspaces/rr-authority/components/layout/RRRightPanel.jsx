import React, { useState } from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { 
  AlertTriangle, 
  Clock, 
  CheckSquare, 
  FileText, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  X,
  ExternalLink,
  Download,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Send,
  Eye
} from 'lucide-react';

export default function RRRightPanel() {
  const { 
    isRightPanelOpen, 
    setIsRightPanelOpen, 
    selectedProject, 
    activeRightTab, 
    setActiveRightTab,
    auditLogs,
    setAuditDrawer,
    setDocumentModal,
    setActiveMenu
  } = useRRAuthority();

  if (!isRightPanelOpen) return null;

  return (
    <>
      {/* Backdrop for screens below xl */}
      <div 
        onClick={() => setIsRightPanelOpen(false)}
        className="xl:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-40 transition-opacity"
        title="Click to dismiss panel"
      />

      <aside className="
        fixed xl:static inset-y-14 right-0 z-40 xl:z-auto
        w-80 sm:w-88 shrink-0 bg-slate-50 border-l border-slate-200 
        flex flex-col h-[calc(100vh-3.5rem)] select-none text-xs
        shadow-2xl xl:shadow-none transition-transform duration-200
      ">
      
      {/* Panel Top Header */}
      <div className="h-10 px-3 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
          <Activity className="w-3.5 h-3.5 text-[#1B365D]" />
          <span>Contextual Action &amp; Audit Stream</span>
        </div>
        
        <button
          onClick={() => setIsRightPanelOpen(false)}
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          title="Close Right Panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-slate-200/60 p-1 border-b border-slate-200 text-[10px] font-mono">
        <button
          onClick={() => setActiveRightTab('alerts')}
          className={`flex-1 py-1 text-center font-bold rounded transition-colors cursor-pointer ${
            activeRightTab === 'alerts' 
              ? 'bg-white text-rose-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Alerts
        </button>

        <button
          onClick={() => setActiveRightTab('actions')}
          className={`flex-1 py-1 text-center font-bold rounded transition-colors cursor-pointer ${
            activeRightTab === 'actions' 
              ? 'bg-white text-[#1B365D] shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Actions
        </button>

        <button
          onClick={() => setActiveRightTab('checklist')}
          className={`flex-1 py-1 text-center font-bold rounded transition-colors cursor-pointer ${
            activeRightTab === 'checklist' 
              ? 'bg-white text-emerald-800 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Checklist
        </button>

        <button
          onClick={() => setActiveRightTab('audit')}
          className={`flex-1 py-1 text-center font-bold rounded transition-colors cursor-pointer ${
            activeRightTab === 'audit' 
              ? 'bg-white text-indigo-900 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Live Audit
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        
        {/* TAB 1: ALERTS & STATUTORY COUNTDOWN */}
        {activeRightTab === 'alerts' && (
          <div className="space-y-3">
            
            {/* Statutory Countdown Box */}
            <div className="p-3 bg-blue-900 text-white rounded-xl shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#E6CA85]">
                <span className="flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  Section 16 to 18 Lapsing Clock
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[9px] border border-emerald-500/40">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {selectedProject.daysRemaining} <span className="text-xs font-normal text-slate-300">Days</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-sans">
                    Window to Section 18 Sanction
                  </div>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-300">
                  <div>Statutory Limit:</div>
                  <strong className="text-white">{selectedProject.statutoryDeadline}</strong>
                </div>
              </div>

              <div className="w-full bg-blue-950 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-1.5 rounded-full" 
                  style={{ width: `${Math.max(15, (selectedProject.daysRemaining / 90) * 100)}%` }} 
                />
              </div>
            </div>

            {/* High Priority Alerts List */}
            <div className="space-y-2">
              <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                <span>Statutory Compliance Alerts</span>
                <span className="font-mono text-rose-600 font-bold text-[10px]">3 Critical</span>
              </div>

              {/* Alert 1 */}
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg space-y-1">
                <div className="flex items-center gap-1 text-rose-800 font-bold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Section 16(5) Advance Notice Window</span>
                </div>
                <p className="text-[10px] text-rose-900 leading-snug">
                  Public notice for Sunav Gram Sabha hearing issued on 18/09/2026. Minimum 21-day statutory advance notice window active. Hearing scheduled for 12/10/2026.
                </p>
                <div className="pt-1 flex justify-end">
                  <button 
                    onClick={() => setActiveMenu('public-hearing')}
                    className="text-[10px] font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
                  >
                    View Hearing Notice →
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
                <div className="flex items-center gap-1 text-amber-800 font-bold text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Section 41 SC/ST 1/3rd Extra Grant</span>
                </div>
                <p className="text-[10px] text-amber-900 leading-snug">
                  68 Scheduled category families verified. Mandatory 33.33% additional compensation grant totaling ₹4.82 Cr must be earmarked in Escrow ledger.
                </p>
                <div className="pt-1 flex justify-end">
                  <button 
                    onClick={() => setActiveMenu('sc-st-plan-builder')}
                    className="text-[10px] font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                  >
                    Review Sec 41 Safeguards →
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
                <div className="flex items-center gap-1 text-blue-900 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>PFMS Aadhaar Seed Mapping Check</span>
                </div>
                <p className="text-[10px] text-blue-950 leading-snug">
                  NPCI Mapper returned 98.4% active Aadhaar-seeded accounts for Second Schedule DBT disbursement batch.
                </p>
                <div className="pt-1 flex justify-end">
                  <button 
                    onClick={() => setActiveMenu('rr-dbt')}
                    className="text-[10px] font-bold text-blue-800 hover:text-blue-950 underline cursor-pointer"
                  >
                    Open DBT Desk →
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PENDING ACTIONS */}
        {activeRightTab === 'actions' && (
          <div className="space-y-2">
            <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between pb-1 border-b border-slate-200">
              <span>Pending Officer Actions</span>
              <span className="font-mono text-slate-500 text-[10px]">5 Assigned</span>
            </div>

            <div className="space-y-1.5">
              {[
                { title: 'Sign Allotment Orders (Batch 2)', desc: '18 house plots in Sector-7 Gaothan ready for DSC sign-off', due: '25/09/2026', menu: 'rr-allotment' },
                { title: 'Review Objection OBJ-RR-003', desc: 'Western Railway irrigation sleeve pipeline crossing at Ch. 12+100', due: '26/09/2026', menu: 'public-hearing' },
                { title: 'Publish Bilingual Form IV Register', desc: 'Gazette notification of 500 affected families certified roll', due: '28/09/2026', menu: 'affected-families' },
                { title: 'Submit Draft Scheme to Commissioner', desc: 'Form V complete with Schedule II & III matrices', due: '30/09/2026', menu: 'rr-scheme-builder' },
                { title: 'DBT Annuity Payroll Run (Oct 2026)', desc: 'Generate monthly ₹2,500/mo automated credit scroll', due: '01/10/2026', menu: 'rr-dbt' }
              ].map((act, idx) => (
                <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs">{act.title}</div>
                  <p className="text-[10px] text-slate-600 leading-snug">{act.desc}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] font-mono">
                    <span className="text-slate-400">Due: {act.due}</span>
                    <button 
                      onClick={() => setActiveMenu(act.menu)}
                      className="text-[#1B365D] font-bold hover:underline cursor-pointer"
                    >
                      Execute →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STATUTORY DOCUMENT CHECKLIST */}
        {activeRightTab === 'checklist' && (
          <div className="space-y-2">
            <div className="font-bold text-slate-800 text-[11px] pb-1 border-b border-slate-200">
              Statutory R&amp;R Document Checklist
            </div>

            <div className="space-y-1.5">
              {[
                { name: 'Form IV (Affected Families Census Roll)', status: 'Certified', code: 'DOC-F4-001.pdf' },
                { name: 'Form V (Draft R&R Scheme)', status: 'Draft Ready', code: 'FORM-V-DRAFT-V1.2.pdf' },
                { name: 'Sec 16(5) Public Hearing Bilingual Notice', status: 'Published', code: 'SEC16_5_NOTICE.pdf' },
                { name: 'Public Hearing Minutes & Video Recording Hash', status: 'Sealed', code: 'HEARING-MINUTES.pdf' },
                { name: 'Gram Sabha Resolution (Scheduled Area Sec 41)', status: 'Verified', code: 'GS-RES-SUNAV-14.pdf' },
                { name: 'Third Schedule 25 Amenities Plan & Budget', status: 'Approved', code: 'SCHED3-PLAN-42CR.pdf' },
                { name: 'Section 18 Sanction Order (Commissioner)', status: 'Pending Sanction', code: 'SEC18-DRAFT-ORDER.pdf' },
                { name: 'Collector R&R Award (Section 31)', status: 'Pending Sec 18', code: 'SEC31-AWARD.pdf' }
              ].map((doc, idx) => (
                <div key={idx} className="p-2 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-[11px]">
                  <div className="min-w-0 pr-2">
                    <div className="font-medium text-slate-800 truncate text-[11px]">{doc.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{doc.code}</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5">
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      doc.status === 'Certified' || doc.status === 'Published' || doc.status === 'Verified' || doc.status === 'Approved' || doc.status === 'Sealed'
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status}
                    </span>
                    <button
                      onClick={() => setDocumentModal({ isOpen: true, doc })}
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Preview Document"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE IMMUTABLE AUDIT STREAM */}
        {activeRightTab === 'audit' && (
          <div className="space-y-2">
            <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between pb-1 border-b border-slate-200">
              <span>Inter-Agency Live Audit Stream</span>
              <span className="font-mono text-emerald-600 text-[10px]">Real-Time</span>
            </div>

            <div className="space-y-2">
              {(auditLogs || []).slice(0, 6).map((log) => (
                <div 
                  key={log.auditId} 
                  className="p-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-mono space-y-1 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-bold text-[#1B365D]">{log.auditId}</span>
                    <span>{log.timestamp.split(' ')[0]}</span>
                  </div>

                  <div className="font-sans font-bold text-slate-900 text-[11px]">
                    {log.action}
                  </div>

                  <div className="text-slate-600 truncate">
                    Entity: <span className="font-bold text-blue-900">{log.entity}</span>
                  </div>

                  <div className="text-slate-500 font-sans truncate">
                    Actor: {log.user} ({log.role})
                  </div>

                  <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                    <span className="text-emerald-700 text-[9px] font-bold">
                      {log.signatureStatus}
                    </span>
                    <button
                      onClick={() => setAuditDrawer({ isOpen: true, record: log })}
                      className="text-[#1B365D] font-bold hover:underline cursor-pointer text-[10px]"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </aside>
    </>
  );
}
