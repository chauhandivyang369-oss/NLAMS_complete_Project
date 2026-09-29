import React, { useState } from 'react';
import { 
  Send, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Building2, 
  AlertCircle 
} from 'lucide-react';
import { REPORT_PROJECT_CONTEXT } from '../../../services/siaReportService.js';

export default function ReportSubmissionModal({ 
  isOpen, 
  onClose, 
  onSubmitComplete, 
  reportState 
}) {
  const [remarks, setRemarks] = useState('Final SIA Report and SIMP formally submitted for statutory evaluation by the Independent Expert Group (IEG) under Section 7 of RFCTLARR Act 2013.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitComplete({
        submittedAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        submittedBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
        iegReference: 'IEG/ANAND/2026/SIA-REV-01',
        submissionReceipt: 'REC-NLAMS-2026-9841'
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="text-sm font-bold">SUBMIT REPORT TO INDEPENDENT EXPERT GROUP</h3>
              <p className="text-[10px] font-mono text-slate-300">
                Statutory Appraisal under Section 7 RFCTLARR Act 2013
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Statutory Pre-Submission Verification Passed</span>
            </div>
            <ul className="space-y-1 text-[11px] text-emerald-800 list-disc list-inside">
              <li>All 22 Report Chapters compiled and validated</li>
              <li>Section 5 Public Hearing minutes (318 attendees) sealed</li>
              <li>Section 6 SIMP budget of ₹42.74 Cr cross-referenced</li>
              <li>e-Signature applied by GIDR Authorized Evaluator</li>
              <li>9 Primary Evidence Annexures indexed in Vault</li>
            </ul>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 block">Recipient Evaluation Body</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
              <strong>Independent Expert Group (IEG) — Anand District Cell</strong>
              <div className="text-[11px] text-slate-500">Constituted vide Notification RD/SIA/IEG/2026/09 under Section 7(1)</div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 block">Submission Transmittal Note</label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#C5A059]" />
            <span>{isSubmitting ? 'Transmitting to IEG Portal...' : 'Submit Official Report'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
