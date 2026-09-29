import React, { useState, useEffect } from 'react';
import {
  Building2,
  Scale,
  Calendar,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Gavel,
  BookOpen,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { citizenService } from '../services/citizenService.js';

export default function LarrTribunalReferencePage() {
  const { setActiveDocModal, showToast, setIsHelpDeskOpen } = useCitizen();
  const [larrData, setLarrData] = useState(null);
  const [activeTab, setActiveTab] = useState('reference'); // 'reference' | 'causelist' | 'appeal'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    citizenService.getLarrReference().then(data => {
      if (mounted) {
        setLarrData(data);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  if (isLoading || !larrData) {
    return (
      <div className="bg-white border border-slate-200 p-8 text-center text-slate-500 rounded shadow-xs">
        <div className="inline-block animate-spin w-8 h-8 border-3 border-[#1B365D] border-t-transparent rounded-full mb-3"></div>
        <p className="text-xs font-semibold text-slate-600">Loading LARR Tribunal Reference Data...</p>
      </div>
    );
  }

  const { larrCase, highCourtAppeal } = larrData;

  return (
    <div className="space-y-4">
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase flex items-center gap-1">
              <Gavel className="w-3 h-3" /> PART VIII (SECTIONS 64 TO 74)
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Reference ID: <strong className="text-slate-800 font-mono">{larrData.referenceId}</strong>
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            LARR Authority Reference &amp; Judicial Appeal Tracker
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Track reference under Section 64 to the LARR Authority, cause lists, summons, and High Court appeals under Section 74.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHelpDeskOpen(true)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Legal Aid Helpdesk</span>
          </button>
          <button
            onClick={() => showToast('Downloading Section 64 Complete Case Dossier (PDF)...')}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Download Case Dossier</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">REGISTRATION NUMBER</div>
          <div className="font-mono font-bold text-blue-900 text-xs mt-0.5">{larrCase.registrationNo}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Ahmedabad Bench</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">NEXT HEARING DATE</div>
          <div className="font-bold text-amber-700 text-xs mt-0.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" /> {larrCase.hearingDate}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Item #14 on Cause List</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">PRESIDING JUDGE</div>
          <div className="font-bold text-slate-900 text-xs mt-0.5 truncate">{larrCase.presidingJudge}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Principal District &amp; Sessions</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">STATUTORY STATUS</div>
          <div className="font-bold text-emerald-700 text-xs mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Under Scrutiny / Active
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Referred {larrData.collectorRefDate}</div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded shadow-xs">
        <div className="border-b border-slate-200 flex space-x-1 px-3 pt-2">
          {[
            { id: 'reference', label: 'Section 64 Reference Dossier', icon: FileText, badge: 'Registered' },
            { id: 'causelist', label: 'Tribunal Cause List & Summons', icon: Calendar, badge: '24-Oct Hearing' },
            { id: 'appeal', label: 'Section 74 High Court Roadmap', icon: Scale, badge: 'Statutory 60d' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#1B365D] text-[#1B365D] bg-slate-50/80'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Section 64 Reference */}
        {activeTab === 'reference' && (
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  STATUTORY REFERENCE UNDER SECTION 64(1)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Application for Reference to LARR Authority</h3>
                <p className="text-xs text-slate-500">
                  Transmitted by District Collector (CALA) upon non-acceptance of Section 23/30 compensation determination.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Filed Within 6 Weeks (Timely)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <strong className="text-slate-900">{larrData.applicantName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Affected Parcel:</span>
                  <strong className="text-[#1B365D] font-mono">{larrData.ulpin} (Survey #{larrData.surveyNo})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date of Collector Reference:</span>
                  <strong className="text-slate-800">{larrData.collectorRefDate}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Presiding Officer:</span>
                  <strong className="text-slate-900">{larrCase.presidingJudge}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Courtroom Venue:</span>
                  <strong className="text-slate-800">{larrCase.courtroom}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Interim Stay Status:</span>
                  <strong className="text-slate-700">No Stay on Physical Possession</strong>
                </div>
              </div>
            </div>

            {/* Grounds of Reference */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Grounds of Dispute Submitted under Section 64:
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed bg-white p-3 rounded border border-slate-200 italic font-serif">
                &ldquo;{larrData.groundsSummary}&rdquo;
              </p>
            </div>

            {/* Case Dossier Documents */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Certified Judicial Dossier Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {larrCase.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded border border-slate-200 bg-white hover:border-[#C5A059] transition-all flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-[#1B365D] shrink-0" />
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 block truncate">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">{doc.size} • {doc.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDocModal({
                          title: doc.name,
                          docNumber: larrCase.registrationNo,
                          authority: 'Registrar, LARR Authority Bench Ahmedabad',
                          date: doc.date,
                          section: 'Judicial Dossier Record'
                        });
                      }}
                      className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                      title="View Document"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cause List & Summons */}
        {activeTab === 'causelist' && (
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Daily Cause List &amp; Official Summons</h3>
                <p className="text-xs text-slate-500">Electronic summons generated under Section 66 of the RFCTLARR Act.</p>
              </div>

              <button
                onClick={() => {
                  setActiveDocModal({
                    title: 'Digital Summons & Hearing Notice',
                    docNumber: larrCase.digitalSummonsNo,
                    authority: 'Registrar, LARR Authority Ahmedabad',
                    date: larrCase.causeListDate,
                    section: 'Judicial Summons Notice'
                  });
                }}
                className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>View Summons PDF</span>
              </button>
            </div>

            <div className="p-4 rounded border-l-4 border-amber-500 bg-amber-50/60 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 uppercase tracking-wide">Next Hearing Scheduled</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-amber-300">
                  Item No. 14 in Daily Cause List
                </span>
              </div>
              <div className="text-base font-bold text-slate-900">{larrCase.hearingDate}</div>
              <p className="text-slate-700">
                Venue: <span className="font-semibold text-slate-900">{larrCase.courtroom}</span>
              </p>
              <p className="text-slate-600 pt-1 leading-relaxed">
                Applicant may appear in person or through an authorized legal advocate. Physical presence of counsel is advised for arguments on circle rate revision.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Section 74 Appeal to High Court */}
        {activeTab === 'appeal' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="p-2.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                <Scale className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Section 74: Statutory Appeal to the Hon&apos;ble High Court</h3>
                <p className="text-xs text-slate-500">
                  Statutory judicial remedy available if aggrieved by the final award of the LARR Authority.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Judicial Jurisdiction:</span>
                <strong className="text-slate-900">Hon&apos;ble High Court of Gujarat, Sola, Ahmedabad</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Statutory Limitation Window:</span>
                <strong className="text-amber-800 font-bold">60 Days from Date of Tribunal Award (Sec 74(1))</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Condonation of Delay:</span>
                <strong className="text-slate-700">Maximum 60 days on showing sufficient cause (Sec 74(2))</strong>
              </div>
            </div>

            <div className="p-3.5 rounded bg-white border border-slate-200 text-xs text-slate-600 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900">Statutory Appeal Workflow:</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed">
                <li>Upon pronouncement of award by LARR Authority, a certified copy is automatically dispatched to the citizen portal.</li>
                <li>Citizen may file a First Appeal under Section 74 before the High Court on any question of law or fact.</li>
                <li>Free digital legal aid representation is facilitated under the State Legal Services Authority (SALSA) for eligible beneficiaries.</li>
              </ol>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsHelpDeskOpen(true)}
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                <span>Request Free High Court Legal Aid Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
