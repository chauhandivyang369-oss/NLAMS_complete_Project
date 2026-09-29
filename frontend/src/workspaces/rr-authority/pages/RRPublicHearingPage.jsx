import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  Megaphone, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  FileText, 
  Video, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Plus, 
  Send,
  Eye,
  Filter
} from 'lucide-react';

export default function RRPublicHearingPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    publicHearing, 
    setPublicHearing, 
    setDocumentModal,
    setESignModal,
    addAuditLog 
  } = useRRAuthority();

  const [activeTab, setActiveTab] = useState('hearings'); // 'hearings', 'objections', 'videolog'
  const [selectedHearing, setSelectedHearing] = useState(publicHearing?.hearingSessions?.[0] || null);
  const [objectionsList, setObjectionsList] = useState(publicHearing?.registeredObjections || []);

  const [filterStatus, setFilterStatus] = useState('ALL');

  // Submit Hearing Report to Collector under Section 16(6)
  const handleSubmitFindingsToCollector = () => {
    setESignModal({
      isOpen: true,
      context: {
        title: 'Submit Section 16(6) Public Hearing Findings & Report',
        actionTitle: 'HEARING_REPORT_SUBMITTED_SECTION_16_6',
        entityName: `Project ${selectedProject?.code || 'NLAMS'} Hearing Proceedings`,
        documentName: 'SECTION_16_6_HEARING_FINDINGS_REPORT.pdf'
      },
      onSignComplete: (signHash) => {
        addAuditLog(
          'HEARING_FINDINGS_SUBMITTED_TO_COLLECTOR',
          'Section 16(6) Hearing Report',
          'Status: Hearing Concluded',
          `Status: Sealed & Transmitted to District Collector (Token: ${signHash})`,
          'SECTION_16_6_HEARING_FINDINGS_REPORT.pdf'
        );
        alert(`Section 16(6) Hearing Findings and Report authenticated with DSC and transmitted to District Collector!`);
      }
    });
  };

  const handleUpdateDisposition = (objId, newVerdict, newRemark) => {
    setObjectionsList(prev => (prev || []).map(o => {
      if (o.objectionId === objId) {
        return { ...o, disposition: newVerdict, administratorRemarks: newRemark };
      }
      return o;
    }));

    addAuditLog(
      'OBJECTION_DISPOSITION_COMMITTED',
      `Objection ${objId}`,
      'Status: Under Review',
      `Status: ${newVerdict}`,
      'Hearing_Dispositions_Log.pdf'
    );
  };

  const filteredObjections = (objectionsList || []).filter(o => 
    filterStatus === 'ALL' || o?.disposition?.includes(filterStatus)
  );

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Actions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                Section 16(5) Public Hearing &amp; Objections Log
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                Gram Sabha Consultation
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Statutory public hearings in affected areas, minimum 21-day notice enforcement, claims registry, and videographic logging.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Section 16(5) Bilingual Public Notice',
                    code: 'SEC16_5_NOTICE_GUJ_ENG.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Public Notice (Bilingual)</span>
            </button>

            <button
              onClick={handleSubmitFindingsToCollector}
              className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Submit Report to Collector (Sec 16(6))</span>
            </button>
          </div>
        </div>

        {/* 3. Statutory Notice Timeline Tracker */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1B365D]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs font-sans">
                Statutory 21-Day Advance Notice Compliance
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Notice Issued: <strong>{publicHearing?.noticePublicationDate || '18/09/2026'}</strong> • Hearing Scheduled: <strong>{publicHearing?.scheduledHearingDate || '12/10/2026'}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold text-[11px] border border-emerald-300">
              {publicHearing?.advanceNoticeDays || 24} Days Notice Period (Statutory Min: 21 Days)
            </span>
          </div>
        </div>

        {/* 4. Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 pt-2 rounded-t-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('hearings')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hearings'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>1. Scheduled Hearing Sessions ({(publicHearing?.hearingSessions || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('objections')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'objections'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>2. Registered Objections &amp; Dispositions ({(objectionsList || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videolog')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'videolog'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>3. Videographic &amp; Biometric Evidence Vault</span>
          </button>
        </div>

        {/* Tab 1: Scheduled Hearing Sessions */}
        {activeTab === 'hearings' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="space-y-3">
              {(publicHearing?.hearingSessions || []).map((session) => (
                <div key={session.sessionId} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1B365D] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {session.sessionId}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Village {session.village} Public Hearing Session
                      </h4>
                    </div>

                    <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      {session.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">DATE &amp; TIME</span>
                      <strong className="text-slate-900">{session.date} at {session.time}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">VENUE</span>
                      <strong className="text-slate-900">{session.venue}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">PRESIDING OFFICER</span>
                      <strong className="text-slate-900">{session.presidingOfficer}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">REGISTERED ATTENDEES</span>
                      <strong className="text-emerald-700">{session.attendeesRegistered} Persons</strong>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700">
                    <strong>Proceedings Summary:</strong> {session.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Registered Objections & Dispositions */}
        {activeTab === 'objections' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Section 16(5) Claims, Objections &amp; Suggestions Register
                </h3>
                <p className="text-[11px] text-slate-500">
                  Every objection must receive a reasoned speaking order by the Administrator before Section 18 submittal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Filter Verdict:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="py-1 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-800"
                >
                  <option value="ALL">All Dispositions</option>
                  <option value="Upheld">Upheld (Scheme Modified)</option>
                  <option value="Partially Upheld">Partially Upheld</option>
                  <option value="Clarified">Clarified</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {(filteredObjections || []).map((obj) => (
                <div key={obj.objectionId} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1B365D] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {obj.objectionId}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Objector: {obj.objectorName}
                      </h4>
                      <span className="text-slate-500 font-mono text-[10px]">
                        ({obj.village} • {obj.ulpin})
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                      obj.disposition.includes('Upheld') 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}>
                      {obj.disposition}
                    </span>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-800">
                    <span className="font-bold text-slate-900 block mb-0.5">Grievance / Contention:</span>
                    {obj.substance}
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[11px] text-slate-800">
                    <div className="font-bold text-emerald-900 mb-0.5 flex items-center justify-between">
                      <span>Reasoned Order / Scheme Modification:</span>
                      <span className="font-mono text-[10px] text-emerald-700">Passed by Administrator</span>
                    </div>
                    {obj.administratorRemarks}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Videographic Vault */}
        {activeTab === 'videolog' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                Videographic Recording &amp; Biometric Attendance Audit Vault
              </h3>
              <p className="text-[11px] text-slate-500">
                Rule 14(4) mandates complete end-to-end multi-angle videography of the entire public hearing session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#1B365D]" />
                  <span className="font-bold text-slate-900 text-xs">Petlad Session Recording (4K UHD)</span>
                </div>

                <div className="text-[11px] text-slate-600 font-mono space-y-1">
                  <div>Recording Date: <strong>12/10/2026 10:00 - 14:30 IST</strong></div>
                  <div>Camera Angles: <strong>3 Fixed + 1 Drone Aerial Feed</strong></div>
                  <div>Storage Hash: <strong>SHA256:7f920...318e</strong></div>
                  <div>Attendance Biometrics: <strong>164 Aadhaar Verified Sign-ins</strong></div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('Streaming authenticated videographic session preview (1080p)...')}
                    className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Video Evidence Reel</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#1B365D]" />
                  <span className="font-bold text-slate-900 text-xs">Sunav Tribal Enclave Session Recording</span>
                </div>

                <div className="text-[11px] text-slate-600 font-mono space-y-1">
                  <div>Recording Date: <strong>14/10/2026 11:00 - 15:00 IST</strong></div>
                  <div>Camera Angles: <strong>2 Fixed + Gram Panchayat Hall CCTV</strong></div>
                  <div>Storage Hash: <strong>SHA256:4a19b...8820</strong></div>
                  <div>Attendance Biometrics: <strong>148 Attendees Verified</strong></div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('Streaming authenticated videographic session preview (1080p)...')}
                    className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Video Evidence Reel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
