import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Save, 
  Send, 
  Clock, 
  FileText, 
  Lock, 
  Check,
  Info
} from 'lucide-react';

export default function SurveyValidationSection() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [saveTime, setSaveTime] = useState('Today, 11:42 AM');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSaveDraft = () => {
    setDraftSaved(true);
    const now = new Date();
    setSaveTime(`Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);
  };

  return (
    <div className="space-y-4">
      {/* Statutory Guidance */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">Section 4(5) Dataset Submission Gate: </strong>
          Prior to publishing the draft Social Impact Assessment report and conducting the mandatory Section 5 Public Hearing, 
          the field survey dataset must undergo automated schema validation, duplicate clearance, and official verification sign-off.
        </div>
      </div>

      {/* Pre-Submission Comprehensive Inventory Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
          Consolidated Field Survey Aggregates
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Total Parcels</span>
            <div className="font-mono text-base font-bold text-slate-900 mt-0.5">742 Parcels</div>
            <span className="text-[10px] text-emerald-700 font-medium">694 Surveyed • 48 Pending</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Landowners</span>
            <div className="font-mono text-base font-bold text-slate-900 mt-0.5">628 Owners</div>
            <span className="text-[10px] text-emerald-700 font-medium">591 Verified • 37 Pending</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Affected Families</span>
            <div className="font-mono text-base font-bold text-[#1B365D] mt-0.5">500 Families</div>
            <span className="text-[10px] text-emerald-700 font-medium">463 Verified • 37 Pending</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Co-residing Members</span>
            <div className="font-mono text-base font-bold text-slate-900 mt-0.5">2,148 Persons</div>
            <span className="text-[10px] text-slate-600">Avg 4.3 members/family</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Physical Displacement</span>
            <div className="font-mono text-base font-bold text-rose-700 mt-0.5">186 Families</div>
            <span className="text-[10px] text-slate-600">314 Land-Only Affected</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Structures Inventoried</span>
            <div className="font-mono text-base font-bold text-slate-900 mt-0.5">142 Structures</div>
            <span className="text-[10px] text-slate-600">86 Houses • 56 Farm Sheds</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Community Assets</span>
            <div className="font-mono text-base font-bold text-slate-900 mt-0.5">84 Assets</div>
            <span className="text-[10px] text-slate-600">CPR mitigation in SIMP</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 text-[10px] font-mono">Citizen Survey Forms</span>
            <div className="font-mono text-base font-bold text-purple-700 mt-0.5">486 Responses</div>
            <span className="text-[10px] text-emerald-700 font-medium">97.2% Quorum</span>
          </div>
        </div>
      </div>

      {/* Validation Checklist Box */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-slate-800">
            PRE-SUBMISSION STATUTORY VALIDATION CHECKLIST
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            45 Open Validation Items
          </span>
        </div>

        <div className="p-4 space-y-2.5 text-xs">
          {[
            {
              status: 'warning',
              title: '37 Household field census visits pending ground verification',
              desc: 'Enumerator visit scheduled for Sunav and Demol outlying hamlets by 25/02/2026.',
              blocking: true
            },
            {
              status: 'warning',
              title: '8 Parcels require unmutated RoR succession verification',
              desc: 'Observed legal heirs differ from e-Dhara record; notice generated for Section 5 hearing.',
              blocking: true
            },
            {
              status: 'success',
              title: '100% Cadastral spatial alignment overlay validated without geometry gaps',
              desc: 'All 742 parcels intersect Railway ROW with valid Turf.js polygon topology.',
              blocking: false
            },
            {
              status: 'success',
              title: 'Livelihood & crop impact schedules verified by Agricultural Extension Officer',
              desc: 'Tobacco, banana and paddy crop loss rates mapped to Gujarat state schedule of rates.',
              blocking: false
            },
            {
              status: 'success',
              title: 'Alternative alignment comparison matrix completed under Section 4(4)(d)',
              desc: 'Option A established as bare-minimum corridor with least residential displacement.',
              blocking: false
            },
            {
              status: 'info',
              title: '4 Duplicate responses awaiting final merge approval in Response Inbox',
              desc: 'Responses tagged as potential duplicates should be confirmed before final submission.',
              blocking: false
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className={`p-3 rounded-lg border flex items-start justify-between gap-3 ${
                item.status === 'success' 
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-800' 
                  : item.status === 'warning'
                  ? 'bg-amber-50/60 border-amber-200 text-slate-800'
                  : 'bg-blue-50/40 border-blue-200 text-slate-800'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {item.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                {item.status === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                <div>
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{item.desc}</div>
                </div>
              </div>

              {item.blocking ? (
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shrink-0">
                  BLOCKING
                </span>
              ) : (
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                  PASSED
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submission Gate Warning when attempted */}
      {submitAttempted && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-950">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>Cannot Submit Survey Dataset — Mandatory Blocking Validation Issues Exist</span>
          </div>
          <p className="leading-relaxed">
            Statutory submission under Section 4(5) cannot proceed while <strong>37 incomplete household visits</strong> and 
            <strong> 8 unverified RoR mismatches</strong> remain open. The dataset remains safely preserved in draft state. 
            Field teams must complete the census visits or record formal exceptions.
          </p>
        </div>
      )}

      {/* Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Draft autosaved: <strong className="text-slate-800">{saveTime}</strong></span>
          {draftSaved && (
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Saved successfully!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Save className="w-4 h-4 text-slate-600" />
            <span>Save Draft Dataset</span>
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 text-[#C5A059]" />
            <span>Submit Survey Dataset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
