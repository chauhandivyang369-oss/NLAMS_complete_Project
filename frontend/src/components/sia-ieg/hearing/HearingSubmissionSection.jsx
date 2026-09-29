import React, { useState } from 'react';
import { 
  DEFAULT_HEARING_SETUP, 
  HEARING_COMPLETION_VALIDATION, 
  PROJECT_CONTEXT 
} from '../../../services/siaHearingService.js';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileCheck, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  Layers, 
  Save, 
  CheckSquare, 
  Send,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function HearingSubmissionSection({ onNavigateToSimp }) {
  const [hearingStatus, setHearingStatus] = useState('Conducted');
  const [recordStatus, setRecordStatus] = useState('Record Compilation');
  const [validation] = useState(HEARING_COMPLETION_VALIDATION);
  const [actionSuccess, setActionSuccess] = useState('');

  const handleMarkConducted = () => {
    setHearingStatus('Conducted');
    setActionSuccess('Physical Hearing marked as officially Conducted in presence of SDM.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleCompleteRecord = () => {
    setRecordStatus('Completed');
    setActionSuccess('Statutory Hearing Record completed and locked for IEG Review.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleSaveDraft = () => {
    setActionSuccess('Hearing proceedings and validation checklist draft saved.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  return (
    <div className="space-y-4">
      {/* 1. Clarification Callout on Physical Hearing vs Record Completion */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-[#1B365D] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-[#1B365D]">
            Statutory Distinction: Physical Hearing vs. Record Compilation
          </h4>
          <p className="leading-relaxed">
            Under Section 5 of the RFCTLARR Act 2013, <strong>Mark Hearing Conducted</strong> records that the mandatory 
            physical assembly and oral proceedings have taken place at the notified venue. 
            <strong> Complete Hearing Record</strong> is an administrative milestone certifying that all verbatim minutes, 
            attendance registries, multi-media recordings, and objections have been fully compiled and verified by the SIA Agency.
          </p>
        </div>
      </div>

      {/* 2. Compact Hearing Summary Dashboard */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Section 5 Statutory Hearing Summary &amp; Lifecycle
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Record Status:</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-900 border border-purple-300">
              {recordStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Hearing Status:</span>
            <span className="font-bold font-mono text-emerald-700 text-sm">{hearingStatus}</span>
            <span className="text-[10px] text-slate-500 block">Venue: Petlad Town Hall</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Scheduled Date:</span>
            <span className="font-bold font-mono text-slate-900 text-sm">28/02/2026</span>
            <span className="text-[10px] text-slate-500 block">Notice: 06/02/2026 (22 Days)</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Verified Attendees:</span>
            <span className="font-bold font-mono text-[#1B365D] text-sm">318 Registered</span>
            <span className="text-[10px] text-emerald-600 block">127% of Quorum (250)</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Logged Objections:</span>
            <span className="font-bold font-mono text-red-600 text-sm">5 Formal Oral</span>
            <span className="text-[10px] text-slate-500 block">+ 4 Citizen Submissions</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Mitigation Linkage:</span>
            <span className="font-bold font-mono text-blue-700 text-sm">5 of 6 Addressed</span>
            <span className="text-[10px] text-slate-500 block">Mapped to SIMP (Menu 4)</span>
          </div>
        </div>
      </div>

      {/* 3. Validation Matrix Checklist */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Statutory Compliance &amp; Record Verification Matrix
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700">
            6 of 7 Rules Complete
          </span>
        </div>

        <div className="divide-y divide-slate-200 text-xs">
          {Object.entries(validation).map(([key, val]) => {
            const isComplete = val.status === 'Complete';
            const isReview = val.status === 'Needs Review';

            return (
              <div key={key} className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="text-slate-600 text-[11px]">{val.details}</div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 border ${
                  isComplete 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : isReview
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}>
                  {val.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          {actionSuccess ? (
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionSuccess}</span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-500">
              Actions will update Section 5 audit trail and unlock SIMP builder dependencies.
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handleMarkConducted}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mark Hearing Conducted</span>
          </button>

          <button
            onClick={handleCompleteRecord}
            className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Complete Hearing Record</span>
          </button>
        </div>
      </div>
    </div>
  );
}
