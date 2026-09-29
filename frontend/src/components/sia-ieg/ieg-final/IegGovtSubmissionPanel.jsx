import React, { useState } from 'react';
import { 
  Send, 
  Building2, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download 
} from 'lucide-react';
import { IEG_PROJECT_CONTEXT } from '../../../services/iegService.js';

export default function IegGovtSubmissionPanel({ 
  isSubmitted = false, 
  onSubmitToGovt 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToFinality, setAgreedToFinality] = useState(false);

  const handleFinalSubmit = () => {
    if (!agreedToFinality) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitToGovt) onSubmitToGovt();
    }, 1000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 text-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#1B365D]" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Transmittal to Appropriate Government (Section 7(5) &amp; 7(6))
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Statutory Submission under Section 7(5) of the RFCTLARR Act 2013
            </p>
          </div>
        </div>

        {isSubmitted && (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-mono font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Formally Submitted to Govt</span>
          </span>
        )}
      </div>

      {isSubmitted ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>IEG Statutory Recommendation Formally Sealed &amp; Transmitted</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px] text-slate-700">
            <div>
              <span className="text-slate-500 block text-[10px]">Reference Number:</span>
              <strong className="text-slate-900">RD/SIA/IEG/2026/09-FINAL</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Destination:</span>
              <strong className="text-slate-900">Revenue Dept, Govt of Gujarat</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Transmission Timestamp:</span>
              <strong className="text-emerald-700">{new Date().toLocaleString()}</strong>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
            Under Section 7(6) of the Act, the Appropriate Government shall now examine these recommendations and take a final decision regarding publication of the Preliminary Notification under Section 11.
          </p>

          <div className="pt-2 flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Download Official Transmittal Copy (PDF)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="text-slate-500 block text-[10px]">Destination Department:</span>
              <strong className="text-slate-900 text-xs block">
                Revenue and Disaster Management Department, Government of Gujarat
              </strong>
              <span className="text-[10px] text-slate-500 block">Sachivalaya, Gandhinagar - 382010</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="text-slate-500 block text-[10px]">Statutory Deadline:</span>
              <strong className="text-emerald-700 text-xs block">
                {IEG_PROJECT_CONTEXT.statutoryAppraisalDeadline} (42 Days Remaining)
              </strong>
              <span className="text-[10px] text-slate-500 block">60 days from constitution</span>
            </div>
          </div>

          {/* Statutory Finality Lock Warning */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-2 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <strong>Confirmation of Statutory Finality:</strong> Under Section 7(5), once submitted to the Appropriate Government, this recommendation is locked and cannot be altered or retracted without a formal government remittal order under Section 7(6).
            </div>
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-center gap-2 text-[11px] font-medium text-slate-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToFinality}
              onChange={(e) => setAgreedToFinality(e.target.checked)}
              className="rounded text-[#1B365D] cursor-pointer"
            />
            <span>
              I confirm that all 7 committee member assessments have been reviewed and consolidated by the Chairperson.
            </span>
          </label>

          <button
            onClick={handleFinalSubmit}
            disabled={!agreedToFinality || isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#1B365D] hover:bg-[#152a48] disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
          >
            <Send className="w-4 h-4 text-[#C5A059]" />
            <span>
              {isSubmitting ? 'Transmitting to Appropriate Government...' : 'Submit Final Recommendation to Appropriate Government'}
            </span>
          </button>

        </div>
      )}

    </div>
  );
}
