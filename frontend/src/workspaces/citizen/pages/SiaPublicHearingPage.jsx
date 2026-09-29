import React, { useState } from 'react';
import {
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  Video,
  Download,
  Send,
  Clock,
  ShieldCheck,
  Building,
  Check,
  AlertCircle
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';

export default function SiaPublicHearingPage() {
  const { activeProject, setActiveDocModal, showToast } = useCitizen();

  const [rsvpRegistered, setRsvpRegistered] = useState(false);
  const [preHearingQuery, setPreHearingQuery] = useState('');
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const handleRsvp = () => {
    setRsvpRegistered(true);
    showToast('RSVP Confirmed. Entry pass SMS sent to your registered mobile.');
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!preHearingQuery.trim()) return;
    setQuerySubmitted(true);
    showToast('Pre-hearing representation submitted to SIA Unit.');
    setTimeout(() => {
      setPreHearingQuery('');
      setQuerySubmitted(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-[#C5A059]" />
            <span>Social Impact Assessment (SIA) &amp; Public Hearing Portal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent public appraisal under Section 4, 5, 6 &amp; 7 of RFCTLARR Act 2013.
          </p>
        </div>

        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>IEG Appraised (Sec 7 Approved)</span>
        </span>
      </div>

      {/* 2. SIA Overview Dossier Card */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            SIA Study Scope &amp; Bare-Minimum Assessment
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
            Agency Reg: SIA-GUJ-CAT-A-019
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Authorized SIA Agency</span>
              <div className="font-bold text-slate-900 text-sm">
                Center for Social Impact &amp; Rural Research (CSIRR), Ahmedabad
              </div>
              <div className="text-[11px] text-slate-600">Category-A Accredited Agency under State Revenue Rules</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Survey Period &amp; Public Consultations</span>
              <div className="font-semibold text-slate-800">
                01 April 2026 – 30 June 2026 (90 Days Field Survey)
              </div>
              <div className="text-[11px] text-slate-600">14 Gram Sabhas &amp; 48 Focused Group Discussions (FGD) conducted</div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Public Purpose Determination</span>
              <div className="font-semibold text-slate-800">
                Infrastructure Project under Section 2(1)(b) — High-Speed National Highway Corridor
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Bare Minimum Land Requirement Assessment</span>
              <div className="font-bold text-emerald-800 text-xs">
                324.50 Hectares (Optimized from initial Requiring Body proposal of 380.00 Ha)
              </div>
              <div className="text-[11px] text-slate-600">
                Estimated Affected Families: <span className="font-bold text-slate-900">142</span> (Displaced Families: <span className="font-bold text-slate-900">48</span>)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Public Hearing Notice & RSVP Card */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded">
                SECTION 5 STATUTORY NOTICE
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                3 Weeks Advance Notice Served
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Public Hearing on Draft SIA Report &amp; SIMP
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {rsvpRegistered ? (
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>RSVP REGISTERED (PASS #PH-892)</span>
              </span>
            ) : (
              <button
                onClick={handleRsvp}
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white font-bold text-xs rounded transition-colors shadow-xs cursor-pointer"
              >
                CONFIRM ATTENDANCE (RSVP)
              </button>
            )}
          </div>
        </div>

        {/* Schedule & Venue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Date &amp; Time</span>
            <div className="font-bold text-slate-900 mt-0.5">18 October 2026 at 11:00 AM</div>
            <div className="text-[10px] text-slate-500 font-mono">Presiding: CALA / District Magistrate</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Hearing Venue</span>
            <div className="font-bold text-slate-900 mt-0.5">Prant Office &amp; Chavadi Hall, Anand</div>
            <div className="text-[10px] text-slate-500">Opposite Collectorate Complex, Anand</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Jurisdiction Covered</span>
            <div className="font-bold text-slate-900 mt-0.5">Petlad &amp; Borsad Talukas</div>
            <div className="text-[10px] text-slate-500">Live Video Recording Enabled</div>
          </div>
        </div>

        {/* Pre-Hearing Query Submission Form */}
        <form onSubmit={handleQuerySubmit} className="pt-2 border-t border-slate-200 space-y-2 text-xs">
          <label className="block font-bold text-slate-800 text-[11px] uppercase tracking-wider">
            Submit Pre-Hearing Query / Representation to SIA Panel:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={preHearingQuery}
              onChange={(e) => setPreHearingQuery(e.target.value)}
              placeholder="State your question regarding environmental impact, irrigation channel diversion, or livelihood protection..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={querySubmitted}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#d6b268] text-[#1B365D] font-bold rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{querySubmitted ? 'Submitted' : 'Submit Query'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. SIA Published Reports & IEG Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Report 1: SIA Draft & Final */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs space-y-2 text-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
              SECTION 4 / 5
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              Comprehensive SIA Study Report
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Complete socio-economic baseline, demographic impact, livelihood assessment, and public hearing proceedings.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveDocModal({
                title: 'Comprehensive SIA Study Report (Section 4/5)',
                authority: 'Center for Social Impact & Rural Research',
                date: '30/06/2026',
                section: 'Section 4(4) Final SIA',
                qrVerified: true
              })}
              className="text-blue-700 hover:text-blue-900 font-bold"
            >
              View Summary →
            </button>
            <button
              onClick={() => showToast('Downloading SIA Report (8.4 MB)...')}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report 2: SIMP */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs space-y-2 text-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
              SECTION 6
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              Social Impact Management Plan (SIMP)
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Mandatory mitigation measures for noise, dust, irrigation severance, and environmental safeguards during construction.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveDocModal({
                title: 'Social Impact Management Plan (SIMP) — Section 6',
                authority: 'SIA Committee & State Revenue Dept',
                date: '15/07/2026',
                section: 'Section 6 SIMP',
                qrVerified: true
              })}
              className="text-blue-700 hover:text-blue-900 font-bold"
            >
              View Summary →
            </button>
            <button
              onClick={() => showToast('Downloading SIMP Report (4.2 MB)...')}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report 3: IEG Recommendation */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs space-y-2 text-xs flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
              SECTION 7
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              IEG Appraisal &amp; Recommendations
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Independent Expert Group recommendation confirming that project serves bona-fide public purpose with minimum adverse impact.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveDocModal({
                title: 'Independent Expert Group (IEG) Recommendation — Section 7',
                authority: 'Independent Expert Group, Govt of Gujarat',
                date: '28/07/2026',
                section: 'Section 7(4) Appraisal',
                qrVerified: true
              })}
              className="text-blue-700 hover:text-blue-900 font-bold"
            >
              View Summary →
            </button>
            <button
              onClick={() => showToast('Downloading IEG Report (3.1 MB)...')}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
