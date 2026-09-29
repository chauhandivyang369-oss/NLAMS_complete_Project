import React, { useState } from 'react';
import { CITIZEN_REVIEWS } from '../../../services/siaHearingService.js';
import { 
  Globe, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Eye, 
  ShieldCheck, 
  Clock, 
  User, 
  MapPin, 
  Filter, 
  Search,
  Plus,
  Send,
  HelpCircle
} from 'lucide-react';

export default function CitizenReviewSection() {
  const [reviews, setReviews] = useState(CITIZEN_REVIEWS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewRemark, setReviewRemark] = useState('');
  const [reviewNewStatus, setReviewNewStatus] = useState('Included in SIA');

  const [newSubmission, setNewSubmission] = useState({
    citizenName: '',
    village: 'Petlad',
    familyId: '',
    ulpin: '',
    submissionType: 'Concern',
    comment: '',
    evidenceFile: 'citizen_supporting_doc.pdf'
  });

  const filtered = reviews.filter((r) => {
    const matchesSearch = 
      r.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.responseStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmission = (e) => {
    e.preventDefault();
    if (!newSubmission.citizenName || !newSubmission.comment) return;

    const id = `CIT-REV-00${reviews.length + 1}`;
    setReviews([
      ...reviews,
      {
        submissionId: id,
        citizenName: newSubmission.citizenName,
        village: newSubmission.village,
        familyId: newSubmission.familyId || 'FAM-PENDING',
        ulpin: newSubmission.ulpin || 'N/A',
        surveyNo: 'N/A',
        submissionType: newSubmission.submissionType,
        comment: newSubmission.comment,
        evidenceFile: newSubmission.evidenceFile,
        submissionDate: 'Today, 02:15 PM',
        responseStatus: 'Submitted',
        reviewRemarks: 'Awaiting SIA officer preliminary review.'
      }
    ]);

    setNewSubmission({
      citizenName: '',
      village: 'Petlad',
      familyId: '',
      ulpin: '',
      submissionType: 'Concern',
      comment: '',
      evidenceFile: 'citizen_supporting_doc.pdf'
    });
    setShowSubmitModal(false);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!selectedReview) return;

    setReviews(reviews.map(r => {
      if (r.submissionId === selectedReview.submissionId) {
        return {
          ...r,
          responseStatus: reviewNewStatus,
          reviewRemarks: reviewRemark || r.reviewRemarks
        };
      }
      return r;
    }));

    setSelectedReview(null);
  };

  return (
    <div className="space-y-4">
      {/* 1. Mandatory Statutory Clarification Banner */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 shadow-2xs space-y-2">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 space-y-1">
            <h4 className="font-bold text-sm text-amber-900">
              Statutory Boundary: Supplementary Digital Citizen Participation
            </h4>
            <p className="leading-relaxed">
              This digital citizen review channel operates under the authority of the SIA Agency (GIDR) and District Collectorate 
              solely to <strong>supplement</strong> the physical Section 5 public hearing. 
              <strong> As per statutory mandate, digital review DOES NOT replace, dilute, or supersede physical public hearings</strong>. 
              All bona fide representations logged here are adjudicated by the SIA team for inclusion in the final report.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Public Portal Actions Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Citizen Digital Submissions &amp; Representation Portal
            </h3>
          </div>
          <p className="text-[11px] text-slate-500">
            Window open for 15 days following the Section 5 physical hearing (Deadline: 15/03/2026)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Submit Citizen Comment / Concern</span>
          </button>
        </div>
      </div>

      {/* 3. Search and Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Citizen Name / Village / Text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500 font-medium">Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Included in SIA">Included in SIA</option>
            <option value="Not Included">Not Included</option>
          </select>
        </div>
      </div>

      {/* 4. Submissions Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-slate-800">
            CITIZEN SUBMISSIONS LOG ({filtered.length} Records)
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Direct Public Intake &amp; Adjudication Matrix
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {filtered.map((item) => {
            const isIncluded = item.responseStatus === 'Included in SIA';
            const isReview = item.responseStatus === 'Under Review';
            const isRejected = item.responseStatus === 'Not Included';

            return (
              <div key={item.submissionId} className="p-4 hover:bg-slate-50/50 transition-colors space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#1B365D]">{item.submissionId}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-900">{item.citizenName}</span>
                    <span className="text-slate-500 font-mono text-[11px]">({item.village}, {item.familyId})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      {item.submissionType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      isIncluded 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : isReview 
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : isRejected
                        ? 'bg-red-100 text-red-800 border-red-300'
                        : 'bg-slate-100 text-slate-800 border-slate-300'
                    }`}>
                      {item.responseStatus}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedReview(item);
                        setReviewNewStatus(item.responseStatus);
                        setReviewRemark(item.reviewRemarks || '');
                      }}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#1B365D] rounded font-semibold text-[11px] cursor-pointer"
                    >
                      Adjudicate / Review
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed text-[11.5px]">
                  "{item.comment}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-3">
                    {item.evidenceFile ? (
                      <span>Evidence: <strong className="font-mono text-[#1B365D]">{item.evidenceFile}</strong></span>
                    ) : (
                      <span className="text-slate-400">No evidence attached</span>
                    )}
                    <span>ULPIN: <strong className="font-mono text-slate-700">{item.ulpin}</strong></span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">Logged: {item.submissionDate}</span>
                </div>

                {item.reviewRemarks && (
                  <div className="text-[11px] text-slate-600 bg-blue-50/50 p-2 rounded border border-blue-100 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900">SIA Adjudication Note: </strong>
                      {item.reviewRemarks}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Submit Citizen Comment */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Submit Citizen Post-Hearing Representation</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleCreateSubmission} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Citizen Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kiritbhai Patel"
                    value={newSubmission.citizenName}
                    onChange={(e) => setNewSubmission({ ...newSubmission, citizenName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village</label>
                  <select
                    value={newSubmission.village}
                    onChange={(e) => setNewSubmission({ ...newSubmission, village: e.target.value })}
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
                    placeholder="e.g. FAM-014"
                    value={newSubmission.familyId}
                    onChange={(e) => setNewSubmission({ ...newSubmission, familyId: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Submission Type</label>
                  <select
                    value={newSubmission.submissionType}
                    onChange={(e) => setNewSubmission({ ...newSubmission, submissionType: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  >
                    <option value="Concern">Concern</option>
                    <option value="Comment">Comment</option>
                    <option value="Suggestion">Suggestion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Comment / Concern Statement *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Clearly state your objection or concern regarding land, crop, structure, or rehabilitation..."
                  value={newSubmission.comment}
                  onChange={(e) => setNewSubmission({ ...newSubmission, comment: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Upload Supporting Evidence File</label>
                <input
                  type="text"
                  placeholder="e.g. electricity_bills_or_crop_passbook.pdf"
                  value={newSubmission.evidenceFile}
                  onChange={(e) => setNewSubmission({ ...newSubmission, evidenceFile: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Submit Representation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Adjudicate / Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Adjudicate Submission: {selectedReview.submissionId}</h3>
              <button onClick={() => setSelectedReview(null)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleSaveReview} className="p-4 space-y-3">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">{selectedReview.citizenName} ({selectedReview.village})</div>
                <p className="text-slate-600 text-[11px]">"{selectedReview.comment}"</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Adjudication Status</label>
                <select
                  value={reviewNewStatus}
                  onChange={(e) => setReviewNewStatus(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold"
                >
                  <option value="Included in SIA">Included in SIA</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Not Included">Not Included</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason / Statutory Remarks *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this representation is included in the SIA or why it is outside Section 5 scope..."
                  value={reviewRemark}
                  onChange={(e) => setReviewRemark(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Save Adjudication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
