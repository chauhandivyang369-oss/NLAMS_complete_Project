import React from 'react';
import {
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  CreditCard,
  Bell,
  HelpCircle,
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export default function CitizenRightPanel() {
  const {
    isRightPanelOpen,
    setIsRightPanelOpen,
    activeProject,
    navigateToAction,
    setActiveDocModal,
    setIsHelpDeskOpen
  } = useCitizen();

  const content = (
    <div className="w-full h-full flex flex-col bg-white text-slate-800 border-l border-slate-200 overflow-y-auto select-none">
      {/* Right Panel Header */}
      <div className="p-3 bg-[#142642] text-white border-b border-[#C5A059] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C5A059]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
              CITIZEN CONTEXT PANEL
            </div>
            <div className="text-xs font-bold text-white">
              Actions, Hearings &amp; Alerts
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsRightPanelOpen(false)}
          className="xl:hidden p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 space-y-3.5 bg-[#F8F9FA] flex-1">
        {/* SECTION 1: ACTION REQUIRED */}
        <div className="bg-amber-50 border-l-4 border-amber-600 p-3 text-xs space-y-2 shadow-xs">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>1. ACTION REQUIRED</span>
          </div>
          <p className="text-amber-950 text-xs leading-relaxed">
            Section 15 objection window is actively running for <span className="font-bold">NHAI Expressway (Petlad Rural)</span>. 42 days remaining to file written objections against alignment and area severance.
          </p>
          <button
            onClick={() => navigateToAction('05', 'NLAMS-2026-NHAI-0089')}
            className="w-full mt-1 bg-[#1B365D] hover:bg-[#142642] text-white font-bold py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs shadow-xs"
          >
            <span>FILE WRITTEN OBJECTION</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

        {/* SECTION 2: UPCOMING HEARINGS */}
        <div className="bg-white border border-slate-200 p-3 text-xs space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>2. UPCOMING HEARINGS</span>
            </span>
            <span className="bg-blue-100 text-blue-900 text-[9px] px-1.5 py-0.2 font-mono font-bold border border-blue-200">
              SEC 15(2)
            </span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">CALA Public Hearing</span>
              <span className="text-[10px] text-amber-700 font-bold font-mono">18 Oct 2026</span>
            </div>
            <div className="text-[11px] text-slate-700">Time: 11:00 AM IST</div>
            <div className="text-[11px] text-slate-600">Venue: Prant Office, Anand Collectorate</div>
            <div className="text-[10px] text-slate-500 leading-tight">Presiding: Special Land Acquisition Officer (CALA)</div>
            <button
              onClick={() => navigateToAction('05', 'NLAMS-2026-NHAI-0089')}
              className="mt-1.5 text-[11px] text-[#1B365D] hover:underline font-bold flex items-center gap-1"
            >
              <span>View Hearing Docket &amp; Agenda</span>
              <ChevronRight className="w-3 h-3 text-[#C5A059]" />
            </button>
          </div>
        </div>

        {/* SECTION 3: STATUTORY COUNTDOWNS */}
        <div className="bg-white border border-slate-200 p-3 text-xs space-y-2.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>3. STATUTORY COUNTDOWNS</span>
          </div>

          {/* Timer 1: Section 15 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-800">Section 15 Objection Window</span>
              <span className="text-amber-700 font-bold font-mono">42 Days Left</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
              <div className="bg-amber-600 h-1.5" style={{ width: '30%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span>Opened: 12/08/2026</span>
              <span>Closes: 11/10/2026</span>
            </div>
          </div>

          {/* Timer 2: Section 64 */}
          <div className="space-y-1 pt-1.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-800">Section 64 Tribunal Reference</span>
              <span className="text-blue-700 font-bold font-mono">28 Days Left</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5" style={{ width: '33%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span>Opened: 10/09/2026</span>
              <span>Closes: 22/10/2026</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: NEW STATUTORY DOCUMENTS */}
        <div className="bg-white border border-slate-200 p-3 text-xs space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>4. NEW DOCUMENTS</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Gazette Vault</span>
          </div>

          <div className="space-y-2">
            <div
              onClick={() => setActiveDocModal({
                title: 'Section 11 Preliminary Gazette Notification No. 492',
                authority: 'Revenue Department, Government of Gujarat',
                date: '12/08/2026',
                section: 'Section 11(1)',
                qrVerified: true
              })}
              className="p-2 bg-slate-50 border border-slate-200 hover:border-[#C5A059] transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-900 text-xs truncate">E-Gazette Sec 11 Notification</div>
              <div className="text-[10px] text-slate-500 mt-0.5">E-Gazette No. 492 • Published 12/08/2026</div>
              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> QR Signed
                </span>
                <span className="text-[#1B365D] font-bold">View PDF →</span>
              </div>
            </div>

            <div
              onClick={() => setActiveDocModal({
                title: 'Form-VI Statutory Land Acquisition Award No. 042',
                authority: 'Office of the District Magistrate & CALA, Ahmedabad',
                date: '10/09/2026',
                section: 'Section 23 / 30',
                qrVerified: true
              })}
              className="p-2 bg-slate-50 border border-slate-200 hover:border-[#C5A059] transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-900 text-xs truncate">Form-VI Statutory Award</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Award No. 042 • Passed 10/09/2026</div>
              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> QR Signed
                </span>
                <span className="text-[#1B365D] font-bold">View PDF →</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: PAYMENT ALERTS */}
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 text-xs space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>5. PAYMENT ALERTS</span>
            </span>
            <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.2 font-bold font-mono">
              CREDITED
            </span>
          </div>
          <div className="text-emerald-900 font-mono font-bold text-base">
            ₹ 1,48,50,420
          </div>
          <div className="text-[11px] text-emerald-950 leading-relaxed">
            Form-VI Compensation &amp; 100% Solatium disbursed via PFMS DBT to Bank of Baroda *******7829.
          </div>
          <div className="text-[10px] text-emerald-800 font-mono">
            UTR: PFMS20260918883901 (18-09-2026)
          </div>
          <button
            onClick={() => navigateToAction('09')}
            className="w-full text-left text-[11px] text-[#1B365D] hover:underline font-bold flex items-center justify-between pt-1 border-t border-emerald-200"
          >
            <span>View Treasury Payment Receipt</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* SECTION 6: CITIZEN ASSISTANCE */}
        <div className="bg-white border border-slate-200 p-3 text-xs space-y-2 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>6. CITIZEN ASSISTANCE &amp; GRIEVANCE</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Inquiry related to Section 15 objection hearings, valuation, or PFMS DBT status:
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Toll Free: 1800-11-2013</span>
            </div>
            <div className="text-slate-500 font-mono text-[10px]">cala-support.anand@nic.in</div>
          </div>
          <button
            onClick={() => setIsHelpDeskOpen(true)}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-1.5 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Submit Grievance Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Right Panel (Right Pane on xl screens) */}
      <aside className="hidden xl:block w-80 shrink-0 h-[calc(100vh-73px)] sticky top-[73px] z-20">
        {content}
      </aside>

      {/* Mobile Drawer Right Panel */}
      {isRightPanelOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsRightPanelOpen(false)}
          />
          <div className="relative w-84 max-w-[90vw] h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
