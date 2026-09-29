import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  Gavel, 
  Video, 
  Mic, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  Download, 
  PenTool, 
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Plus,
  Coins
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function VirtualCourtroomPage() {
  const { selectedCase, orderSheets, recordOrderSheet, showToast, permissions } = useLarrAuthority();

  const [isHearingActive, setIsHearingActive] = useState(false);
  const [presenceClaimant, setPresenceClaimant] = useState(true);
  const [presenceCollector, setPresenceCollector] = useState(true);
  const [presenceRequiringBody, setPresenceRequiringBody] = useState(true);

  // Hearing Management Actions State (Section 14: Start Hearing, Mark Presence, Record Proceedings, Add Submission, Adjourn, Pass Interim Order, Complete Hearing)
  const [submissions, setSubmissions] = useState([
    { by: 'Adv. Hiren Brahmbhatt (Claimant)', text: 'Produced certified exemplar sale deed No. 1422/2024 showing market rate of ₹3,150/sq.m. Prayed for 100% solatium and 12% additional interest.' },
    { by: 'Shri P.C. Trivedi, AGP (Collector)', text: 'Contended that exemplar plot was smaller residential parcel; requested 20% statutory deduction for agricultural development.' }
  ]);
  const [newSubmissionBy, setNewSubmissionBy] = useState('');
  const [newSubmissionText, setNewSubmissionText] = useState('');

  // Order Sheet Editor Form
  const [orderType, setOrderType] = useState('Final Hearing Order / Judgment Reserved');
  const [proceedingsText, setProceedingsText] = useState(
    'Matter called for final arguments. Learned Advocate Shri Hiren Brahmbhatt for Claimants present. Learned AGP Shri P.C. Trivedi for Collector Anand present. Learned Standing Counsel Shri Rajiv Mehta for Western Railway present. Arguments heard on exemplar sale deed Ex. P-1 and court commissioner report Ex. C-1 regarding severance of irrigation tube-well. Records perused.'
  );
  const [directionsText, setDirectionsText] = useState(
    'Heard both sides. Written arguments submitted on record. Judgment reserved under Section 69 of RFCTLARR Act 2013 for pronouncement on 26/09/2026 at 10:30 AM.'
  );
  const [nextHearingDate, setNextHearingDate] = useState('26/09/2026');

  // Adjournment Management State (Section 14: Previous Hearing, Requested By, Reason, Allowed / Rejected, Cost, Next Hearing Date, Remarks)
  const [isAdjournmentModalOpen, setIsAdjournmentModalOpen] = useState(false);
  const [adjournmentForm, setAdjournmentForm] = useState({
    previousHearing: '10/08/2026',
    requestedBy: 'Standing Counsel for Western Railway',
    reason: 'Awaiting formal financial approval from Railway Board for enhanced compensation deposit',
    allowedRejected: 'Allowed',
    cost: '₹5,000 (To be deposited in District Legal Services Authority)',
    nextHearingDate: '12/10/2026',
    remarks: 'Last opportunity granted to produce sanction letter.'
  });

  // Output Artifact Modals (Section 14: Daily Order Sheet PDF, e-Signed Order, Interlocutory Order, Adjournment Notice)
  const [isOrderSheetPdfOpen, setIsOrderSheetPdfOpen] = useState(false);
  const [activeModalArtifact, setActiveModalArtifact] = useState('Daily Order Sheet');

  const handleStartHearing = () => {
    setIsHearingActive(true);
    showToast(`Bench commenced for Case ${selectedCase?.caseId}. Virtual courtroom stream active!`, 'info');
  };

  const handleAddSubmission = () => {
    if (!newSubmissionText.trim()) return;
    setSubmissions(prev => [...prev, { by: newSubmissionBy || 'Learned Counsel', text: newSubmissionText }]);
    setNewSubmissionText('');
    setNewSubmissionBy('');
    showToast('Counsel submission recorded on live transcript!', 'success');
  };

  const handleSaveAndSignOrder = () => {
    if (!permissions.canPassOrders) {
      showToast('Only the Hon\'ble Presiding Officer is authorized to pass and e-Sign judicial orders!', 'warning');
      return;
    }

    recordOrderSheet({
      orderType,
      presence: `Claimants: ${presenceClaimant ? 'Present' : 'Absent'}, Collector: ${presenceCollector ? 'Present' : 'Absent'}, Requiring Body: ${presenceRequiringBody ? 'Present' : 'Absent'}`,
      proceedingsSummary: proceedingsText,
      directions: directionsText,
      nextHearingDate
    });
    setIsHearingActive(false);
  };

  const handleOpenArtifactModal = (artifactType) => {
    setActiveModalArtifact(artifactType);
    setIsOrderSheetPdfOpen(true);
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-[10px] font-bold border border-purple-300">
              COURT HALL NO. 1
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Digital Cause List &amp; Virtual Courtroom
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Conduct virtual and hybrid judicial hearings under e-Courts Phase-III, record counsel appearance, voice-to-text proceedings, and pass immutable e-Signed order sheets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isHearingActive ? (
            <button
              onClick={handleStartHearing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Hearing Session</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 border border-red-300 font-mono font-bold text-xs rounded-lg flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>HEARING IN PROGRESS</span>
              </span>

              <button
                onClick={() => {
                  setIsHearingActive(false);
                  showToast('Hearing session concluded by Presiding Officer.', 'info');
                }}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Complete Hearing
              </button>
            </div>
          )}

          <button
            onClick={() => setIsAdjournmentModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Adjournment Desk</span>
          </button>
        </div>
      </div>

      {/* 2. Virtual Courtroom Placeholder (Section 14 API-Ready Component) */}
      <div className="bg-slate-900 text-white rounded-xl border border-slate-700 shadow-lg p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-400" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wide">
              Secure Judicial Video Conference Link (NIC Virtual Courtroom)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div><span className="text-slate-400">Provider:</span> <strong className="text-blue-300">NIC BharatVC / Webex Gov</strong></div>
            <div><span className="text-slate-400">Meeting ID:</span> <span className="text-[#E6CA85] font-bold">{selectedCase?.virtualMeetingId || 'LARR-VCOURT-GUJ-01'}</span></div>
            <div><span className="text-slate-400">Start:</span> <span className="text-emerald-400">10:30 AM IST</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Left: Video Stream Box */}
          <div className="md:col-span-2 h-56 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Encrypted Gov Stream (AES-256) • Recording Ref: REC-2026-GJ001-BENCH1</span>
            </div>

            <Video className="w-12 h-12 text-slate-600 mb-2" />
            <div className="text-xs font-bold text-slate-300">
              Virtual Hearing Bridge Connected
            </div>
            <div className="text-[11px] text-slate-500 max-w-sm mt-1">
              Parties may join using NIC / e-Courts video bridge credentials. High Court approved recording protocol enabled.
            </div>

            <div className="mt-3 flex gap-2">
              <a
                href={selectedCase?.virtualMeetingLink || 'https://vcourt.gov.in'}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Join Virtual Courtroom</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Real-time Counsel Attendance Register */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 space-y-2 text-xs">
            <div className="font-bold text-[#E6CA85] font-mono text-[11px] uppercase border-b border-slate-800 pb-1 flex justify-between">
              <span>Counsel Appearance Record</span>
              <span className="text-[10px] text-slate-400">Order III CPC</span>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between p-1.5 rounded bg-slate-900 cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-200 text-[11px]">Adv. Hiren Brahmbhatt</div>
                  <div className="text-[9px] text-slate-400">Learned Counsel for Claimants</div>
                </div>
                <input
                  type="checkbox"
                  checked={presenceClaimant}
                  onChange={(e) => setPresenceClaimant(e.target.checked)}
                  className="rounded text-purple-600"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 rounded bg-slate-900 cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-200 text-[11px]">Shri P.C. Trivedi, AGP</div>
                  <div className="text-[9px] text-slate-400">Government Pleader for Collector</div>
                </div>
                <input
                  type="checkbox"
                  checked={presenceCollector}
                  onChange={(e) => setPresenceCollector(e.target.checked)}
                  className="rounded text-purple-600"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 rounded bg-slate-900 cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-200 text-[11px]">Adv. Rajiv Mehta</div>
                  <div className="text-[9px] text-slate-400">Standing Counsel for Western Railway</div>
                </div>
                <input
                  type="checkbox"
                  checked={presenceRequiringBody}
                  onChange={(e) => setPresenceRequiringBody(e.target.checked)}
                  className="rounded text-purple-600"
                />
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Submissions & Hearing Management Section */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <h4 className="font-extrabold text-[#1B365D] text-sm flex items-center justify-between border-b border-slate-200 pb-2">
          <span>Oral Arguments &amp; Submissions On Record</span>
          <span className="text-[10px] font-mono text-slate-500">{submissions.length} Submissions Logged</span>
        </h4>

        <div className="space-y-2">
          {submissions.map((sub, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-[#1B365D] block mb-0.5">{sub.by}:</span>
              <p className="text-slate-700 font-serif leading-relaxed">{sub.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newSubmissionBy}
            onChange={(e) => setNewSubmissionBy(e.target.value)}
            placeholder="Submitting Counsel / Party..."
            className="w-full sm:w-1/3 p-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
          />
          <input
            type="text"
            value={newSubmissionText}
            onChange={(e) => setNewSubmissionText(e.target.value)}
            placeholder="Record submission / contention..."
            className="flex-1 p-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
          />
          <button
            onClick={handleAddSubmission}
            className="px-3 py-2 bg-[#1B365D] hover:bg-[#0F2342] text-white text-xs font-bold rounded-lg cursor-pointer shrink-0"
          >
            Add Submission
          </button>
        </div>
      </div>

      {/* 4. Daily Order Sheet Editor (Section 14 Features: text editor, hearing events, submissions, directions, next date, costs) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
              DIGITAL ORDER SHEET DESK
            </div>
            <h3 className="font-extrabold text-[#1B365D] text-sm">
              Record Proceedings &amp; Judicial Directions (Case: {selectedCase?.caseId})
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenArtifactModal('Daily Order Sheet')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs border border-slate-300 cursor-pointer"
            >
              Preview Daily Order Sheet PDF
            </button>
            <button
              onClick={() => handleOpenArtifactModal('Interlocutory Order')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs border border-slate-300 cursor-pointer"
            >
              Preview Interlocutory Order
            </button>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Order Classification
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-medium"
              >
                <option value="Final Hearing Order / Judgment Reserved">Final Hearing Order / Judgment Reserved</option>
                <option value="Interlocutory Order / Commission Appointment">Interlocutory Order / Commission Appointment</option>
                <option value="Adjournment with Costs / Next Date Notice">Adjournment with Costs / Next Date Notice</option>
                <option value="Directions to Requiring Body for Deposit">Directions to Requiring Body for Deposit</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Next Date of Listing / Pronouncement
              </label>
              <input
                type="text"
                value={nextHearingDate}
                onChange={(e) => setNextHearingDate(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Proceedings &amp; Counsel Arguments Summary
            </label>
            <textarea
              rows={3}
              value={proceedingsText}
              onChange={(e) => setProceedingsText(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 font-serif leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Judicial Directions &amp; Next Steps
            </label>
            <textarea
              rows={2}
              value={directionsText}
              onChange={(e) => setDirectionsText(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 font-serif leading-relaxed"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200">
            <span className="text-[10px] font-mono text-slate-500">
              Presiding Officer Class-3 DSC Token will be affixed upon signing.
            </span>

            <button
              onClick={handleSaveAndSignOrder}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>e-Sign &amp; Issue Order Sheet</span>
            </button>
          </div>

        </div>
      </div>

      {/* Adjournment Management Modal (Section 14: Previous Hearing, Requested By, Reason, Allowed / Rejected, Cost, Next Hearing Date, Remarks) */}
      {isAdjournmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-lg w-full overflow-hidden p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-sm text-[#1B365D] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>ADJOURNMENT MANAGEMENT (Section 14)</span>
              </h4>
              <button onClick={() => setIsAdjournmentModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                &times;
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500">Previous Hearing</label>
                  <input
                    type="text"
                    value={adjournmentForm.previousHearing}
                    onChange={(e) => setAdjournmentForm({ ...adjournmentForm, previousHearing: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500">Requested By</label>
                  <input
                    type="text"
                    value={adjournmentForm.requestedBy}
                    onChange={(e) => setAdjournmentForm({ ...adjournmentForm, requestedBy: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500">Reason for Adjournment</label>
                <textarea
                  rows={2}
                  value={adjournmentForm.reason}
                  onChange={(e) => setAdjournmentForm({ ...adjournmentForm, reason: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500">Allowed / Rejected</label>
                  <select
                    value={adjournmentForm.allowedRejected}
                    onChange={(e) => setAdjournmentForm({ ...adjournmentForm, allowedRejected: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-slate-50 font-bold"
                  >
                    <option value="Allowed">Allowed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500">Costs Imposed</label>
                  <input
                    type="text"
                    value={adjournmentForm.cost}
                    onChange={(e) => setAdjournmentForm({ ...adjournmentForm, cost: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500">Next Hearing Date</label>
                <input
                  type="text"
                  value={adjournmentForm.nextHearingDate}
                  onChange={(e) => setAdjournmentForm({ ...adjournmentForm, nextHearingDate: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-slate-50 font-mono text-purple-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500">Remarks</label>
                <input
                  type="text"
                  value={adjournmentForm.remarks}
                  onChange={(e) => setAdjournmentForm({ ...adjournmentForm, remarks: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-slate-50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setIsAdjournmentModalOpen(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAdjournmentModalOpen(false);
                  handleOpenArtifactModal('Adjournment Notice');
                  showToast('Adjournment Notice generated and scheduled!', 'success');
                }}
                className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded shadow-xs"
              >
                Pass Adjournment Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Output Artifact Modal (Section 14: Daily Order Sheet PDF, e-Signed Order, Interlocutory Order, Adjournment Notice) */}
      <OfficialDocumentViewerModal
        isOpen={isOrderSheetPdfOpen}
        onClose={() => setIsOrderSheetPdfOpen(false)}
        title={`${activeModalArtifact} — Case ${selectedCase?.caseId}`}
        documentType="ORDER_SHEET"
        caseData={selectedCase}
        metadata={{
          docId: `ORD-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              {activeModalArtifact.toUpperCase()} (ORDER XX CPC / SEC 68 RFCTLARR ACT)
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div><strong>ORDER TYPE:</strong> {orderType}</div>
              <div><strong>BENCH:</strong> {selectedCase?.presidingOfficer}</div>
              <div><strong>NEXT DATE OF LISTING:</strong> {nextHearingDate}</div>
            </div>
            <p className="text-justify font-serif text-sm">
              <strong>PROCEEDINGS:</strong><br />
              {proceedingsText}
            </p>
            <div className="p-3 bg-blue-50 border-l-4 border-[#1B365D] font-mono text-xs my-2">
              <strong>DIRECTIONS:</strong> {directionsText}
            </div>
          </div>
        }
      />

    </div>
  );
}
