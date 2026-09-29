import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  FileText,
  Upload,
  Send,
  Download,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  ChevronRight,
  Eye,
  HelpCircle
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { citizenService } from '../services/citizenService.js';
import { MOCK_OBJECTIONS } from '../services/citizenMockData.js';

export default function Section15ObjectionsPage() {
  const {
    activeCitizen,
    activeProject,
    activeParcel,
    setActiveDocModal,
    setIsHelpDeskOpen,
    showToast
  } = useCitizen();

  const selectedParcel = activeParcel || activeCitizen.linkedParcels[0];

  // Form State
  const [selectedGrounds, setSelectedGrounds] = useState([
    'Multi-Crop Protection Concern (Section 10)',
    'Feasible Alternate Land Available (Govt Gamtal Wasteland adjacent)'
  ]);
  const [detailedStatement, setDetailedStatement] = useState(
    'The proposed alignment cuts diagonally across canal-irrigated Survey 142/1, creating severe severance of remaining 0.70 Ha holding with loss of channel connectivity.'
  );
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'RoR_7_12_Extract_DigitallySigned.pdf', size: '1.2 MB' },
    { name: 'Canal_Irrigation_Water_Passbook.pdf', size: '890 KB' }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAck, setSubmittedAck] = useState(null);

  // Existing Objections list
  const [objectionsList, setObjectionsList] = useState(MOCK_OBJECTIONS);
  const [selectedObjection, setSelectedObjection] = useState(MOCK_OBJECTIONS[0] || null);

  const availableGrounds = [
    'Public Purpose Invalidity / Lack of statutory justification',
    'Area Exceeds Bare Minimum (Excessive land acquisition)',
    'Multi-Crop Protection Concern (Section 10 statutory bar)',
    'Feasible Alternate Land Available (Govt wasteland / uninhabited corridor)',
    'Severe Severance of Remaining Holding making balance land unviable',
    'Ownership Title Dispute / Co-sharer apportionment pending'
  ];

  const handleToggleGround = (ground) => {
    if (selectedGrounds.includes(ground)) {
      setSelectedGrounds(selectedGrounds.filter(g => g !== ground));
    } else {
      setSelectedGrounds([...selectedGrounds, ground]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles([...uploadedFiles, { name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` }]);
      showToast(`Uploaded ${file.name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGrounds.length === 0) {
      showToast('Please select at least one statutory ground of objection.');
      return;
    }
    setSubmitting(true);
    try {
      const newObj = await citizenService.submitObjection({
        projectId: activeProject?.id || 'NLAMS-2026-NHAI-0089',
        ulpin: selectedParcel.ulpin,
        surveyNo: selectedParcel.surveyNo,
        applicantName: activeCitizen.name,
        mobile: activeCitizen.maskedMobile,
        email: activeCitizen.email,
        grounds: selectedGrounds,
        detailedStatement: detailedStatement,
        documents: uploadedFiles
      });
      setObjectionsList([newObj, ...objectionsList]);
      setSelectedObjection(newObj);
      setSubmittedAck(newObj);
      showToast(`Objection ${newObj.id} filed successfully!`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Section 15 Objections &amp; Grievance Redressal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            File formal written objections against acquisition under Section 15(1) of RFCTLARR Act 2013 before District Collector / CALA.
          </p>
        </div>

        <button
          onClick={() => setIsHelpDeskOpen(true)}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Report Portal Issue / Contact CALA</span>
        </button>
      </div>

      {/* 2. Statutory Countdown Banner */}
      <div className="bg-[#0F1E33] border-l-4 border-amber-400 text-white p-4 rounded-r shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                STATUTORY LIMITATION WINDOW
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Project: {activeProject?.name || 'NHAI Expressway'}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-300 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
              <span>SECTION 15 OBJECTION WINDOW: 42 DAYS REMAINING</span>
            </div>
            <div className="text-xs text-slate-300">
              Notification Published: <span className="font-semibold text-white">12/08/2026</span> • Statutory Window Closes: <span className="font-semibold text-amber-300 font-mono">11/10/2026 at 23:59 IST</span>
            </div>
          </div>

          <div className="w-full md:w-56 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Time Elapsed</span>
              <span className="font-mono font-bold text-amber-300">18 / 60 Days (30%)</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-400 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Split: Left Form / Right Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left 7 Cols: Online Objection Form */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              File Written Objection under Section 15(1)
            </h3>
            <p className="text-xs text-slate-500">
              Enter your statutory grounds and upload supporting title deeds or survey maps.
            </p>
          </div>

          {/* Acknowledgement Alert after Submission */}
          {submittedAck && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Objection Successfully Submitted &amp; Logged!</span>
                </span>
                <span className="font-mono text-[11px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded">
                  {submittedAck.id}
                </span>
              </div>
              <p className="text-emerald-800 text-[11px]">
                An official acknowledgement has been recorded in the CALA Scrutiny Register. Public hearing date will be communicated via registered post and portal alert.
              </p>
              <button
                onClick={() => showToast(`Downloading official signed acknowledgement receipt for ${submittedAck.id}...`)}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Acknowledgement PDF</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-800">
            {/* Auto-Bound Landholding Details Strip */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Applicant Name:</span>
                <span className="font-bold text-slate-900">{activeCitizen.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Survey / Khasra:</span>
                <span className="font-bold text-blue-900 font-mono">Survey {selectedParcel.surveyNo} ({selectedParcel.khataNo})</span>
              </div>
              <div>
                <span className="text-slate-500 block">14-Digit ULPIN:</span>
                <span className="font-mono font-bold text-slate-900">{selectedParcel.ulpin}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Village &amp; Taluka:</span>
                <span className="font-bold text-slate-800">{selectedParcel.village}, {selectedParcel.taluka}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Affected Area:</span>
                <span className="font-bold text-amber-800 font-mono">{selectedParcel.proposedAreaHa} Ha / {selectedParcel.totalAreaHa} Ha</span>
              </div>
              <div>
                <span className="text-slate-500 block">Presiding Authority:</span>
                <span className="font-bold text-slate-800">CALA / Collector Anand</span>
              </div>
            </div>

            {/* Grounds of Objection Checkboxes */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Statutory Grounds of Objection *
              </label>
              <div className="space-y-2 bg-slate-50 p-3 rounded border border-slate-200">
                {availableGrounds.map((ground, idx) => {
                  const checked = selectedGrounds.includes(ground);
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-2.5 cursor-pointer text-slate-700 hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleGround(ground)}
                        className="mt-0.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs leading-tight">{ground}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Detailed Statement of Grounds */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Detailed Statement of Grounds &amp; Representation *
              </label>
              <textarea
                rows={4}
                required
                value={detailedStatement}
                onChange={(e) => setDetailedStatement(e.target.value)}
                placeholder="State in detail why the proposed acquisition should not proceed or why the alignment should be re-routed..."
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Document Upload Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Supporting Documents (RoR, Maps, Photos)
                </label>
                <label className="cursor-pointer text-blue-700 hover:text-blue-900 font-semibold text-xs flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Attach File</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* Uploaded Files Chips */}
              <div className="space-y-1.5">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{file.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({file.size})</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Attached
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Draft objection saved to local storage.')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer"
                >
                  SAVE DRAFT
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDocModal({
                    title: 'Preview Statement of Objection under Section 15(1)',
                    authority: 'Citizen Portal Preview',
                    date: 'Today',
                    section: 'Section 15(1) Draft',
                    qrVerified: false
                  })}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer"
                >
                  PREVIEW DRAFT
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-[#1B365D] hover:bg-[#142947] text-white font-bold rounded flex items-center gap-1.5 shadow transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#C5A059]" />
                <span>{submitting ? 'Submitting to CALA...' : 'SUBMIT SECTION 15 OBJECTION'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Active Objection Lifecycle Tracker */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                My Filed Objections &amp; Hearing Status
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded font-mono">
                {selectedObjection?.id}
              </span>
            </div>

            {/* Objection Summary Card */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Survey {selectedObjection?.surveyNo}</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[10px] border border-amber-300">
                  {selectedObjection?.statusBadge}
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                Submitted: <span className="font-mono text-slate-800">{selectedObjection?.submissionDate}</span>
              </div>
              <div className="text-[11px] text-slate-700 italic border-l-2 border-slate-300 pl-2 mt-1">
                "{selectedObjection?.detailedStatement?.slice(0, 140)}..."
              </div>
            </div>

            {/* 5-Step Vertical Lifecycle Progression */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Statutory Inquiry Progression:
              </span>

              <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 text-xs">
                {selectedObjection?.timeline?.map((step) => {
                  const isCurrent = step.step === selectedObjection.currentStep;
                  const isDone = step.step < selectedObjection.currentStep;

                  return (
                    <div key={step.step} className="relative">
                      {/* Node Bullet */}
                      <span
                        className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-600'
                            : isCurrent
                            ? 'bg-amber-400 border-amber-600 animate-pulse'
                            : 'bg-white border-slate-300'
                        }`}
                      />

                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>{step.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-normal">
                          {step.date}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        {step.authority}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {step.remarks}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scheduled Hearing Notice Box */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Summons for Personal Hearing: 18 Oct 2026</span>
              </div>
              <div className="text-[11px] text-slate-700 leading-tight">
                You are summoned to appear in person or through an authorized pleader before the SLAO at Prant Office, Anand at 11:00 AM.
              </div>
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => setActiveDocModal({
                    title: 'Summons Notice for Public Hearing under Section 15(2)',
                    authority: 'Office of the District Collector & CALA, Anand',
                    date: '15/09/2026',
                    section: 'Section 15(2) Summons',
                    qrVerified: true
                  })}
                  className="text-blue-800 hover:text-blue-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Summons Document →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
