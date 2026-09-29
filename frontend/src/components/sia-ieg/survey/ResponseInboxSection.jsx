import React, { useState } from 'react';
import { RESPONSE_INBOX_SAMPLE } from '../../../services/siaSurveyService.js';
import { 
  Inbox, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Copy, 
  GitMerge, 
  X, 
  Eye, 
  Check, 
  Smartphone, 
  Users,
  ShieldAlert
} from 'lucide-react';

export default function ResponseInboxSection() {
  const [responses, setResponses] = useState(RESPONSE_INBOX_SAMPLE);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDuplicate, setSelectedDuplicate] = useState(null);

  const filtered = responses.filter(r => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      r.responseId.toLowerCase().includes(term) ||
      r.respondentName.toLowerCase().includes(term) ||
      r.linkedFamilyId.toLowerCase().includes(term) ||
      r.village.toLowerCase().includes(term);

    const matchesMode = filterMode === 'All' || r.responseMode === filterMode;
    const matchesStatus = filterStatus === 'All' || r.verificationStatus === filterStatus;

    return matchesSearch && matchesMode && matchesStatus;
  });

  const handleResolveDuplicate = (responseId, action) => {
    setResponses(prev => prev.map(r => {
      if (r.responseId === responseId) {
        return {
          ...r,
          isPotentialDuplicate: false,
          verificationStatus: action === 'merge' ? 'Verified' : 'Needs Clarification'
        };
      }
      return r;
    }));
    setSelectedDuplicate(null);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-start gap-2">
        <Inbox className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">Response Consolidation &amp; Deduplication Engine: </strong>
          Incoming community responses are automatically mapped against known ULPIN and Family registry records. 
          Potential duplicate submissions (e.g. both mobile self-survey and enumerator visit recorded) must be manually reviewed 
          to ensure data integrity.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Response ID / Respondent / Family / ULPIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Response Modes</option>
            <option value="SELF">Citizen Self-Response (QR)</option>
            <option value="ENUMERATOR_ASSISTED">Enumerator Assisted</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Under Review">Under Review</option>
            <option value="Needs Clarification">Needs Clarification (Duplicates)</option>
          </select>
        </div>
      </div>

      {/* Response Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-slate-800">
            CITIZEN RESPONSES INBOX ({filtered.length} submissions)
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Showing sample from 500-submission pool
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <th className="py-2.5 px-3">Response ID</th>
                <th className="py-2.5 px-3">Respondent</th>
                <th className="py-2.5 px-3">Village</th>
                <th className="py-2.5 px-3">Linked Family &amp; ULPIN</th>
                <th className="py-2.5 px-3">Response Mode</th>
                <th className="py-2.5 px-3">Submitted At</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((resp) => {
                const isVerified = resp.verificationStatus === 'Verified';
                const isDuplicate = resp.isPotentialDuplicate;

                return (
                  <tr key={resp.responseId} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                      {resp.responseId}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {resp.respondentName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {resp.village}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      <div className="font-semibold text-[#1B365D]">{resp.linkedFamilyId}</div>
                      <div className="text-[10px] text-slate-500">{resp.linkedUlpin}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        resp.responseMode === 'SELF'
                          ? 'bg-purple-100 text-purple-800 border-purple-300'
                          : 'bg-blue-100 text-blue-800 border-blue-300'
                      }`}>
                        {resp.responseMode === 'SELF' ? <Smartphone className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                        {resp.responseMode === 'SELF' ? 'Self (QR)' : 'Enumerator'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">
                      {resp.submittedAt}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {isDuplicate ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          <AlertTriangle className="w-3 h-3" />
                          Potential Duplicate
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          isVerified ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {isVerified ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {resp.verificationStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {isDuplicate ? (
                        <button
                          onClick={() => setSelectedDuplicate(resp)}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                        >
                          Review Match
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">Linked</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deduplication Side-by-Side Review Modal */}
      {selectedDuplicate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-2xl overflow-hidden">
            <div className="bg-rose-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-bold text-sm">Potential Duplicate Submission Detected</h3>
                  <div className="text-[11px] text-rose-200">Matching ULPIN and Household Identity</div>
                </div>
              </div>
              <button onClick={() => setSelectedDuplicate(null)} className="text-white hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                {/* Record A: Current Response */}
                <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                    Record A: Incoming Response ({selectedDuplicate.responseId})
                  </div>
                  <div>
                    <span className="text-slate-500">Respondent Name:</span>
                    <div className="font-bold text-slate-900">{selectedDuplicate.respondentName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Mode:</span>
                    <div className="font-mono text-purple-800 font-semibold">{selectedDuplicate.responseMode}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Displacement Declared:</span>
                    <div className="font-semibold text-slate-900">{selectedDuplicate.displacementReported}</div>
                  </div>
                </div>

                {/* Record B: Prior Record */}
                <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                    Record B: Prior Enumerator Record ({selectedDuplicate.duplicateMatchId})
                  </div>
                  <div>
                    <span className="text-slate-500">Respondent Name:</span>
                    <div className="font-bold text-slate-900">{selectedDuplicate.respondentName} (Field Visit)</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Mode:</span>
                    <div className="font-mono text-blue-800 font-semibold">ENUMERATOR_ASSISTED</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Displacement Declared:</span>
                    <div className="font-semibold text-slate-900">{selectedDuplicate.displacementReported}</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] leading-relaxed">
                <strong>Action Required: </strong>
                Review the two records. Merging will preserve the verified enumerator GPS while appending citizen self-notes. 
                Selecting "Keep Separate" will treat them as distinct sub-tenancies.
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedDuplicate(null)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleResolveDuplicate(selectedDuplicate.responseId, 'keep')}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-800 rounded-lg font-semibold hover:bg-slate-100"
                >
                  Keep Separate
                </button>
                <button
                  onClick={() => handleResolveDuplicate(selectedDuplicate.responseId, 'merge')}
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg font-semibold flex items-center gap-1.5"
                >
                  <GitMerge className="w-4 h-4" />
                  <span>Merge &amp; Verify Record</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
