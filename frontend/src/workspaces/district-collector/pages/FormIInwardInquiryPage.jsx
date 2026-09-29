import React, { useState } from 'react';
import { 
  Inbox, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Send, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';

export default function FormIInwardInquiryPage() {
  const {
    formIInwards,
    handleUpdateFormI,
    activeDistrict,
    activeRole
  } = useDistrictCollector();

  const [selectedInwardId, setSelectedInwardId] = useState(formIInwards[0]?.id || null);
  const [recommendation, setRecommendation] = useState('RECOMMENDED_FOR_SEC4_SIA');
  const [inquiryNotes, setInquiryNotes] = useState(
    'Preliminary field inquiry confirmed minimum land assessment is justified. Recommended for issuance of Section 4(1) SIA notification.'
  );

  const selectedInward = formIInwards.find(f => f.id === selectedInwardId) || formIInwards[0];

  const handleForwardToGovt = async () => {
    if (!selectedInward) return;
    await handleUpdateFormI(selectedInward.id, recommendation, inquiryNotes);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Page Header */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              STATUTORY INWARD DESK
            </span>
            <span className="text-xs text-slate-500 font-medium">
              RFCTLARR Rules • Form-I Preliminary Revenue Scrutiny
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Form-I Inward &amp; Preliminary Field Inquiry Hub
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Receive proposals from Requisitioning Bodies, conduct field inspections, verify Section 10 multi-crop limits, and forward Collector's report to Appropriate Government.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 font-bold">
            {formIInwards.length} Proposals Inwarded
          </span>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Proposals Inward List */}
        <div className="bg-white border border-slate-200 shadow-xs p-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            INWARD PROPOSALS ({formIInwards.length})
          </div>

          <div className="space-y-2">
            {formIInwards.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedInwardId(item.id)}
                className={`w-full text-left p-3 border transition-all cursor-pointer ${
                  selectedInward?.id === item.id
                    ? 'border-[#C5A059] bg-slate-50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono font-bold text-slate-500">{item.id}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 ${
                      item.status === 'FORWARDED_TO_STATE_APPROPRIATE_GOVT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status === 'FORWARDED_TO_STATE_APPROPRIATE_GOVT' ? 'FORWARDED' : 'INQUIRY ACTIVE'}
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-xs mt-1 line-clamp-2">
                  {item.proposalTitle}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Requiring Body: <span className="font-semibold text-slate-700">{item.requiringBody}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100 font-mono">
                  <span>Req Area: {item.totalRequiredHa} Ha</span>
                  <span>Villages: {item.villagesCount}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Inquiry Checklist & Collector Recommendation */}
        {selectedInward && (
          <div className="lg:col-span-2 space-y-4">
            {/* Proposal Details Card */}
            <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">REQUISITION METADATA</span>
                  <h2 className="font-bold text-slate-900 text-sm">{selectedInward.proposalTitle}</h2>
                </div>
                <span className="text-xs bg-slate-100 font-mono text-slate-800 px-2 py-1 font-bold">
                  {selectedInward.publicPurposeCategory}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">REQUIRED AREA</div>
                  <div className="font-bold text-slate-900 font-mono text-sm">{selectedInward.totalRequiredHa} Ha</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">EST. KHATEDARS</div>
                  <div className="font-bold text-slate-900 font-mono text-sm">{selectedInward.tentativeKhatedars}</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">TALUKAS</div>
                  <div className="font-bold text-slate-900 text-xs">{selectedInward.talukasCovered?.join(', ')}</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">INQUIRY OFFICER</div>
                  <div className="font-bold text-blue-900 text-xs">{selectedInward.inquiryOfficer}</div>
                </div>
              </div>
            </div>

            {/* Field Inquiry Statutory Findings Checklist */}
            <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Statutory Field Inquiry Checklist (Collector's Verification)</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">1. Minimum Land Assessment Examined</div>
                    <div className="text-[11px] text-slate-600">
                      Verified alignment is strictly optimized to avoid excess land requisition.
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED OK
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">2. Section 10 Multi-Crop / Irrigated Land Compliance</div>
                    <div className="text-[11px] text-slate-600">
                      Confirmed proposed acquisition does not exceed district ceiling limits for multi-cropped land.
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED OK
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">3. Scheduled / Tribal Area Protection</div>
                    <div className="text-[11px] text-slate-600">
                      No Scheduled Tribes land or PESA village impacted without requisite prior consent procedures.
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED OK
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">4. RoR (7/12 &amp; Khasra) Land Title Consistency</div>
                    <div className="text-[11px] text-slate-600">
                      Cadastral records cross-matched against DILRMP revenue land records.
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED OK
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation & Forwarding Box */}
            <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Collector's Statutory Recommendation to Appropriate Government
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-xs mb-1">
                  Recommendation Status:
                </label>
                <select
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full border border-slate-300 p-2 text-xs font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="RECOMMENDED_FOR_SEC4_SIA">
                    Recommended — Issue Section 4(1) SIA Notification
                  </option>
                  <option value="CLARIFICATION_REQUIRED_FROM_REQUIRING_BODY">
                    Clarification Required — Requisitioning Body to Amend Alignment
                  </option>
                  <option value="REJECTED_EXCESS_LAND">
                    Returned — Excess Land / Multi-crop Violation
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-xs mb-1">
                  Inquiry Notes &amp; Findings:
                </label>
                <textarea
                  rows={3}
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  className="w-full border border-slate-300 p-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleForwardToGovt}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Collector's Report to Appropriate Govt</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
