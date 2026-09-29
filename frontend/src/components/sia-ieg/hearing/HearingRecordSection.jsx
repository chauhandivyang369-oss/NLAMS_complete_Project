import React, { useState } from 'react';
import { 
  HEARING_MINUTES, 
  HEARING_MEDIA_EVIDENCE, 
  HEARING_STATEMENTS 
} from '../../../services/siaHearingService.js';
import { 
  FileText, 
  Video, 
  Camera, 
  Mic, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Play, 
  Eye, 
  Plus, 
  Layers, 
  Clock, 
  User, 
  MapPin, 
  ShieldAlert,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function HearingRecordSection() {
  const [minutes, setMinutes] = useState(HEARING_MINUTES);
  const [mediaList, setMediaList] = useState(HEARING_MEDIA_EVIDENCE);
  const [statements, setStatements] = useState(HEARING_STATEMENTS);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showAddStatementModal, setShowAddStatementModal] = useState(false);

  const [newStmt, setNewStmt] = useState({
    participant: '',
    familyId: '',
    village: 'Petlad',
    ulpin: '',
    category: 'Objection',
    description: '',
    evidenceFile: 'representation_signed.pdf',
    responseStatus: 'Recorded in Minutes & Forwarded to SIMP'
  });

  const handleAddStatement = (e) => {
    e.preventDefault();
    if (!newStmt.participant || !newStmt.description) return;

    const id = `STMT-00${statements.length + 1}`;
    setStatements([
      ...statements,
      {
        recordId: id,
        participantId: `PART-${String(statements.length + 10).padStart(3, '0')}`,
        participant: newStmt.participant,
        familyId: newStmt.familyId || 'FAM-PENDING',
        village: newStmt.village,
        ulpin: newStmt.ulpin || 'N/A',
        category: newStmt.category,
        description: newStmt.description,
        evidenceFile: newStmt.evidenceFile,
        submittedAt: 'Today, 11:30 AM',
        responseStatus: newStmt.responseStatus
      }
    ]);

    setNewStmt({
      participant: '',
      familyId: '',
      village: 'Petlad',
      ulpin: '',
      category: 'Objection',
      description: '',
      evidenceFile: 'representation_signed.pdf',
      responseStatus: 'Recorded in Minutes & Forwarded to SIMP'
    });
    setShowAddStatementModal(false);
  };

  return (
    <div className="space-y-4">
      {/* 1. Official Hearing Minutes Record Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1B365D]" />
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Official Proceedings &amp; Approved Minutes (Section 5)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Certified verbatim summary of proceedings countersigned by Presiding SDM and GIDR Evaluation Agency
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {minutes.status}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4 text-xs">
          {/* Minutes Meta Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">Meeting Date &amp; Time:</span>
              <span className="font-bold text-slate-900">{minutes.meetingDate} • 10:30 AM to 04:45 PM</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">Presiding Statutory Authority:</span>
              <span className="font-bold text-slate-900">{minutes.presidingAuthority}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">SIA Agency &amp; Requiring Body:</span>
              <span className="font-bold text-slate-900 leading-tight block">{minutes.siaAgency}</span>
              <span className="text-[11px] text-slate-600 block">{minutes.requiringBodyRep}</span>
            </div>
          </div>

          {/* Key Issues Raised */}
          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Key Issues Raised During Session (5 Critical Domains):</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px] pl-1">
              {minutes.keyIssuesRaised.map((issue, idx) => (
                <li key={idx} className="leading-relaxed">{issue}</li>
              ))}
            </ul>
          </div>

          {/* Major Suggestions vs Objections vs Responses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Suggestions */}
            <div className="border border-blue-200 bg-blue-50/40 rounded-lg p-3 space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Major Suggestions Recorded:</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-blue-900">
                {minutes.majorSuggestions.map((s, idx) => (
                  <li key={idx} className="leading-snug bg-white/70 p-1.5 rounded border border-blue-200/60">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Objections */}
            <div className="border border-red-200 bg-red-50/40 rounded-lg p-3 space-y-2">
              <div className="font-bold text-red-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span>Major Formal Objections:</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-red-900">
                {minutes.majorObjections.map((obj, idx) => (
                  <li key={idx} className="leading-snug bg-white/70 p-1.5 rounded border border-red-200/60">
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Clarifications / Responses */}
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-3 space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Official Responses Given by Panel:</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-emerald-900">
                {minutes.officialResponses.map((resp, idx) => (
                  <li key={idx} className="leading-snug bg-white/70 p-1.5 rounded border border-emerald-200/60">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resolutions & Official Minutes Document Bar */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-[11px] text-slate-700">
              <strong className="text-slate-900">Signed Minutes File: </strong>
              <span className="font-mono text-[#1B365D] font-semibold">{minutes.minutesDocument}</span>
              <span className="text-slate-400 block text-[10px]">Prepared by {minutes.preparedBy} on {minutes.preparedDate}</span>
            </div>
            <button className="px-3 py-1.5 bg-[#1B365D] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#152a48]">
              <Download className="w-3.5 h-3.5" />
              <span>Download Certified Minutes PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Audio/Video/Photo/Sign-in Evidence Vault */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#1B365D]" />
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Multi-Media Statutory Hearing Records (Audio / Video / Photos / Scans)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Tamper-proof digital recordings archived under RFCTLARR Gujarat Rules Rule 11
            </p>
          </div>

          <span className="font-mono text-xs text-slate-500">
            {mediaList.length} Archived Media Artifacts
          </span>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {mediaList.map((m) => (
            <div 
              key={m.mediaId} 
              className="border border-slate-200 rounded-lg p-3 bg-white hover:border-[#1B365D] hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    m.type === 'Video' 
                      ? 'bg-purple-100 text-purple-900 border-purple-300' 
                      : m.type === 'Audio'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : m.type === 'Photographs'
                      ? 'bg-sky-100 text-sky-900 border-sky-300'
                      : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    {m.type}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">{m.fileSize}</span>
                </div>
                <div className="font-bold text-slate-900 text-xs leading-snug">{m.title}</div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{m.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">{m.timestamp}</span>
                <button
                  onClick={() => setSelectedMedia(m)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#1B365D] rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Preview / Log</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Individual Hearing Statements & Objections Register */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#1B365D]" />
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Verbatim Oral Statements &amp; Written Representations Register
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Statements submitted by citizens, affected families, and sarpanches during the Section 5 Public Hearing
            </p>
          </div>

          <button
            onClick={() => setShowAddStatementModal(true)}
            className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Record Oral / Written Statement</span>
          </button>
        </div>

        <div className="divide-y divide-slate-200">
          {statements.map((stmt) => (
            <div key={stmt.recordId} className="p-4 hover:bg-slate-50/50 transition-colors space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#1B365D]">{stmt.recordId}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900">{stmt.participant}</span>
                  <span className="text-slate-500 font-mono text-[11px]">({stmt.village}, {stmt.familyId})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    stmt.category === 'Objection'
                      ? 'bg-red-100 text-red-900 border-red-300'
                      : stmt.category === 'Concern'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : stmt.category === 'Suggestion'
                      ? 'bg-blue-100 text-blue-900 border-blue-200'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    {stmt.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {stmt.responseStatus}
                  </span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-[11.5px] bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                "{stmt.description}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                <div className="flex items-center gap-3">
                  <span>ULPIN: <strong className="font-mono text-slate-700">{stmt.ulpin}</strong></span>
                  <span>Evidence: <strong className="font-mono text-[#1B365D]">{stmt.evidenceFile}</strong></span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Submitted: {stmt.submittedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Media Preview */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">{selectedMedia.title}</h3>
                <span className="text-[10px] font-mono opacity-80">{selectedMedia.fileName} ({selectedMedia.fileSize})</span>
              </div>
              <button onClick={() => setSelectedMedia(null)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-slate-900 rounded-lg p-6 flex flex-col items-center justify-center text-white space-y-3 min-h-[160px]">
                {selectedMedia.type === 'Video' ? (
                  <Video className="w-12 h-12 text-[#C5A059] animate-pulse" />
                ) : selectedMedia.type === 'Audio' ? (
                  <Mic className="w-12 h-12 text-emerald-400" />
                ) : (
                  <Camera className="w-12 h-12 text-blue-400" />
                )}
                <div className="text-center">
                  <div className="font-mono text-xs font-bold">SHA-256 Verified Digital Seal Active</div>
                  <div className="text-[11px] text-slate-400">Timestamp: {selectedMedia.timestamp}</div>
                </div>
              </div>
              <p className="text-slate-700">{selectedMedia.description}</p>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => alert(`Downloading verified stream: ${selectedMedia.fileName}`)}
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Media File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Statement */}
      {showAddStatementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Record Public Hearing Statement / Objection</h3>
              <button onClick={() => setShowAddStatementModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleAddStatement} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Participant Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arvindbhai Parmar"
                    value={newStmt.participant}
                    onChange={(e) => setNewStmt({ ...newStmt, participant: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village</label>
                  <select
                    value={newStmt.village}
                    onChange={(e) => setNewStmt({ ...newStmt, village: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  >
                    <option value="Petlad">Petlad</option>
                    <option value="Sunav">Sunav</option>
                    <option value="Nar">Nar</option>
                    <option value="Demol">Demol</option>
                    <option value="Rangaipura">Rangaipura</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Family ID / ULPIN</label>
                  <input
                    type="text"
                    placeholder="e.g. FAM-018"
                    value={newStmt.familyId}
                    onChange={(e) => setNewStmt({ ...newStmt, familyId: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Statement Category</label>
                  <select
                    value={newStmt.category}
                    onChange={(e) => setNewStmt({ ...newStmt, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  >
                    <option value="Objection">Objection</option>
                    <option value="Concern">Concern</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Statement">Statement</option>
                    <option value="Question">Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Statement / Objection Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record full verbal statement or summarized representation points..."
                  value={newStmt.description}
                  onChange={(e) => setNewStmt({ ...newStmt, description: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Evidence / Petition Attached</label>
                <input
                  type="text"
                  placeholder="e.g. written_objection_with_32_signatures.pdf"
                  value={newStmt.evidenceFile}
                  onChange={(e) => setNewStmt({ ...newStmt, evidenceFile: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStatementModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Record Statement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
