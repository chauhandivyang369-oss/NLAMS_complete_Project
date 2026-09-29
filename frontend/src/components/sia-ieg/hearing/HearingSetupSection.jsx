import React, { useState } from 'react';
import { 
  DEFAULT_HEARING_SETUP, 
  NOTICE_PUBLICITY_RECORDS, 
  NOTICE_DOCUMENTS,
  PROJECT_CONTEXT 
} from '../../../services/siaHearingService.js';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Globe, 
  Layers, 
  Users, 
  Download,
  Plus,
  Info,
  ShieldCheck,
  Languages
} from 'lucide-react';

export default function HearingSetupSection() {
  const [setup, setSetup] = useState(DEFAULT_HEARING_SETUP);
  const [noticeRecords, setNoticeRecords] = useState(NOTICE_PUBLICITY_RECORDS);
  const [noticeDocs, setNoticeDocs] = useState(NOTICE_DOCUMENTS);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showUploadDocModal, setShowUploadDocModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [newNotice, setNewNotice] = useState({
    method: 'Local Public Notice',
    language: 'Gujarati',
    location: '',
    remarks: '',
    documentName: 'Notice_Proof.pdf'
  });

  const [newDoc, setNewDoc] = useState({
    documentType: 'Hearing Notice',
    fileName: '',
    language: 'Gujarati & English',
    version: '1.0'
  });

  const handleSaveSetup = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    const id = `NOT-PUB-0${noticeRecords.length + 1}`;
    setNoticeRecords([
      ...noticeRecords,
      {
        noticeId: id,
        hearingId: setup.hearingId,
        publicationDate: '10/02/2026',
        language: newNotice.language,
        method: newNotice.method,
        location: newNotice.location || 'Taluka Office Notice Board',
        documentName: newNotice.documentName,
        fileSize: '1.4 MB',
        uploadedBy: 'SIA Documentation Officer',
        uploadedAt: 'Today, 10:30 AM',
        remarks: newNotice.remarks || 'Affixing record logged'
      }
    ]);
    setShowAddNoticeModal(false);
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    const id = `DOC-HN-00${noticeDocs.length + 1}`;
    setNoticeDocs([
      ...noticeDocs,
      {
        documentId: id,
        documentType: newDoc.documentType,
        fileName: newDoc.fileName || 'Publicity_Proof_Gazette.pdf',
        language: newDoc.language,
        fileSize: '2.8 MB',
        uploadedBy: 'Collectorate LA Branch',
        uploadedAt: 'Today, 11:00 AM',
        version: newDoc.version
      }
    ]);
    setShowUploadDocModal(false);
  };

  return (
    <div className="space-y-4">
      {/* 1. Read-Only Linked Project Context Baseline */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              Linked Project Baseline (Read-Only from Form-I &amp; Requiring Body)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#1B365D] border border-blue-200 font-bold">
            Project Ref: {PROJECT_CONTEXT.projectId}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Project Name:</span>
            <span className="font-bold text-slate-900 leading-snug">{PROJECT_CONTEXT.projectName}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">District &amp; Taluka:</span>
            <span className="font-bold text-slate-900">{PROJECT_CONTEXT.district}, {PROJECT_CONTEXT.taluka} Taluka</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Affected Villages (5):</span>
            <span className="font-bold text-slate-900">{PROJECT_CONTEXT.villages.join(', ')}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <span className="text-slate-500 text-[10px] font-mono block">Proposed Acquisition Area:</span>
            <span className="font-bold font-mono text-[#1B365D]">{PROJECT_CONTEXT.proposedAcquisitionAreaHa} Hectares</span>
          </div>
        </div>
      </div>

      {/* 2. Public Hearing Parameters Setup Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1B365D]" />
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Section 5 Statutory Public Hearing Schedule &amp; Venue
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Hearing ID: <strong className="font-mono text-slate-800">{setup.hearingId}</strong> • Statutory advance notice window: 3 weeks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Current Status:</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-900 border border-purple-300">
              {setup.status}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveSetup} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hearing ID (Statutory Ref)</label>
              <input
                type="text"
                readOnly
                value={setup.hearingId}
                className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 font-mono text-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hearing Date *</label>
              <input
                type="date"
                value={setup.scheduledDate}
                onChange={(e) => setSetup({ ...setup, scheduledDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hearing Time *</label>
              <input
                type="text"
                value={setup.scheduledTime}
                onChange={(e) => setSetup({ ...setup, scheduledTime: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Hearing Venue (Accessible Public Location) *</label>
              <input
                type="text"
                value={setup.venue}
                onChange={(e) => setSetup({ ...setup, venue: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Notice Publication Date *</label>
              <input
                type="date"
                value={setup.publicityDate}
                onChange={(e) => setSetup({ ...setup, publicityDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Notice Language(s)</label>
              <input
                type="text"
                value={setup.noticeLanguage}
                onChange={(e) => setSetup({ ...setup, noticeLanguage: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hearing Workflow Status</label>
              <select
                value={setup.status}
                onChange={(e) => setSetup({ ...setup, status: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-1 focus:ring-[#1B365D]"
              >
                {/* Strictly permitted statuses only: Planned, Notice Published, Scheduled, Conducted, Record Compilation, Completed */}
                <option value="Planned">Planned</option>
                <option value="Notice Published">Notice Published</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Conducted">Conducted</option>
                <option value="Record Compilation">Record Compilation</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Conducting Authority</label>
              <input
                type="text"
                readOnly
                value={setup.conductingAuthority}
                className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] text-slate-600">
                Statutory 21-day public notice requirement met (Published: {setup.publicityDate} → Hearing: {setup.scheduledDate}).
              </span>
            </div>
            <div className="flex items-center gap-2">
              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Setup Saved!
                </span>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg font-semibold cursor-pointer shadow-xs"
              >
                Save Hearing Setup
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Notice & Publicity Distribution Evidence */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1B365D]" />
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Statutory Notice &amp; Publicity Records (Section 5)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Proof of village-level affixing, megaphone announcements (dhandhera), and digital publications
            </p>
          </div>

          <button
            onClick={() => setShowAddNoticeModal(true)}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Add Publicity Evidence</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <th className="py-2.5 px-3">Notice ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Language</th>
                <th className="py-2.5 px-3">Location / Coverage</th>
                <th className="py-2.5 px-3">Document</th>
                <th className="py-2.5 px-3">Uploaded By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {noticeRecords.map((r) => (
                <tr key={r.noticeId} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">{r.noticeId}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{r.publicationDate}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      {r.method}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">{r.language}</td>
                  <td className="py-2.5 px-3 text-slate-700 max-w-xs">{r.location}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1 font-mono text-[11px] text-[#1B365D] hover:underline cursor-pointer">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate max-w-[140px]">{r.documentName}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px]">{r.uploadedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Official Notice Supporting Documents */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1B365D]" />
              <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Hearing Notice Documents &amp; Gazette Copies
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Signed Form-V notifications, geo-tagged photo bundles, and summary booklets distributed to villagers
            </p>
          </div>

          <button
            onClick={() => setShowUploadDocModal(true)}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Upload Notice Document</span>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {noticeDocs.map((doc) => (
            <div key={doc.documentId} className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 hover:bg-white hover:border-[#1B365D]/40 transition-all space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-[#1B365D] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  {doc.documentType}
                </span>
                <span className="font-mono text-[10px] text-slate-500">{doc.version}</span>
              </div>
              <div className="font-bold text-slate-900 text-xs truncate" title={doc.fileName}>
                {doc.fileName}
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Language: <strong className="text-slate-700">{doc.language}</strong></div>
                <div>Size: <strong className="text-slate-700">{doc.fileSize}</strong></div>
                <div>By: <span className="text-slate-700">{doc.uploadedBy}</span></div>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">{doc.uploadedAt}</span>
                <button className="flex items-center gap-1 text-[11px] font-semibold text-[#1B365D] hover:underline cursor-pointer">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add Notice Publicity Record */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Notice &amp; Publicity Evidence</h3>
              <button onClick={() => setShowAddNoticeModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleAddNotice} className="p-4 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Publication Method</label>
                <select
                  value={newNotice.method}
                  onChange={(e) => setNewNotice({ ...newNotice, method: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                >
                  <option value="Local Public Notice">Local Public Notice</option>
                  <option value="Village-level Publicity">Village-level Publicity</option>
                  <option value="Digital Publication">Digital Publication</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Language</label>
                <select
                  value={newNotice.language}
                  onChange={(e) => setNewNotice({ ...newNotice, language: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                >
                  <option value="Gujarati">Gujarati</option>
                  <option value="English">English</option>
                  <option value="Gujarati & English">Gujarati &amp; English</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Coverage Area *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chavdi Notice Board, Sunav"
                  value={newNotice.location}
                  onChange={(e) => setNewNotice({ ...newNotice, location: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Witnesses present, panchnama details..."
                  value={newNotice.remarks}
                  onChange={(e) => setNewNotice({ ...newNotice, remarks: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Upload Notice Document */}
      {showUploadDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Upload Notice Document</h3>
              <button onClick={() => setShowUploadDocModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleAddDoc} className="p-4 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Type</label>
                <select
                  value={newDoc.documentType}
                  onChange={(e) => setNewDoc({ ...newDoc, documentType: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                >
                  <option value="Hearing Notice">Hearing Notice</option>
                  <option value="Publicity Evidence">Publicity Evidence</option>
                  <option value="Supporting Document">Supporting Document</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Form_V_Notice_Signed_Anand.pdf"
                  value={newDoc.fileName}
                  onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Language</label>
                <input
                  type="text"
                  value={newDoc.language}
                  onChange={(e) => setNewDoc({ ...newDoc, language: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadDocModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
