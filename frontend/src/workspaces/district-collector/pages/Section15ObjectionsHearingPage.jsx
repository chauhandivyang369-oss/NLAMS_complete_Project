import React, { useState } from 'react';
import { 
  Scale, 
  Clock, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Gavel,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';

export default function Section15ObjectionsHearingPage() {
  const {
    objections,
    handleSection15Decision,
    activeProject,
    setNoticeModalData,
    setIsNoticeModalOpen
  } = useDistrictCollector();

  const [selectedObjectionId, setSelectedObjectionId] = useState(objections[0]?.id || null);
  const [decision, setDecision] = useState('PARTIALLY_ACCEPTED');
  const [orderSummary, setOrderSummary] = useState(
    'Spot inspection conducted. Residual parcel found to be economically unviable. Ordered acquisition of residual unviable strip under Section 94(1) of RFCTLARR Act.'
  );

  const selectedObjection = objections.find(o => o.id === selectedObjectionId) || objections[0];

  const handleSaveDecision = async () => {
    if (!selectedObjection) return;
    await handleSection15Decision(selectedObjection.id, decision, orderSummary);
  };

  const handleIssueHearingNotice = () => {
    if (!selectedObjection) return;
    setNoticeModalData({
      title: 'SECTION 15(2) STATUTORY NOTICE OF PERSONAL HEARING',
      refNo: `REV/LAQ/SEC15/${selectedObjection.id}`,
      recipient: `${selectedObjection.objectorName}, Landowner of ${selectedObjection.khasra}`,
      subject: `Notice of Quasi-Judicial Personal Hearing under Section 15(2) RFCTLARR Act, 2013`,
      bodyText: `Take notice that an objection under Section 15(1) was submitted by you in respect of acquisition of land in ${selectedObjection.khasra}, Village ${selectedObjection.village}.
      You are hereby called upon to appear in person or by an authorized pleader before the Presiding Officer on ${selectedObjection.hearingDateScheduled} at 11:00 AM in the Collectorate Hearing Bench, along with all original title deeds, revenue extracts, and evidence in support of your grounds.`,
      statutoryClause: 'Section 15(2): "The Collector shall give the objector an opportunity of being heard in person or by any person authorized by him in this behalf or by an Advocate and shall, after hearing all such objections and after making such further inquiry, make a report in respect of the land."'
    });
    setIsNoticeModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              QUASI-JUDICIAL BENCH
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Section 15 RFCTLARR Act • 60-Day Hearing Gateway &amp; Collector's Report
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Section 15 Objections Hearing &amp; Land Record Updating Engine
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Adjudicate statutory objections within 60 days of Section 11 notification, conduct personal hearings, issue Section 15(2) reports to Govt, and enforce Section 11(4) mutation freeze.
          </p>
        </div>

        <button
          onClick={handleIssueHearingNotice}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#142642] hover:bg-slate-800 text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          <Gavel className="w-4 h-4 text-[#C5A059]" />
          <span>Issue Sec 15(2) Hearing Summons</span>
        </button>
      </div>

      {/* 2-Column: Objections Docket List & Quasi-Judicial Bench Order */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Objections Docket */}
        <div className="bg-white border border-slate-200 shadow-xs p-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            OBJECTION DOCKETS ({objections.length})
          </div>

          <div className="space-y-2">
            {objections.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelectedObjectionId(obj.id)}
                className={`w-full text-left p-3 border transition-all cursor-pointer ${
                  selectedObjection?.id === obj.id
                    ? 'border-[#C5A059] bg-slate-50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono font-bold text-slate-500">{obj.id}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 ${
                      obj.status === 'RECOMMENDATION_SUBMITTED_TO_GOVT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {obj.status === 'RECOMMENDATION_SUBMITTED_TO_GOVT' ? 'DISPOSED & REPORTED' : 'HEARING PENDING'}
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs mt-1">
                  {obj.objectorName}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {obj.khasra} • {obj.village}
                </div>

                <div className="text-[10px] text-blue-900 font-mono mt-1 font-semibold">
                  Ground: {obj.groundsCategory}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100 font-mono">
                  <span>Filed: {obj.daysFromSec11}d after Sec 11</span>
                  <span className="text-emerald-700 font-bold">Within 60 Days</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Hearing Examination & Order Formulation */}
        {selectedObjection && (
          <div className="lg:col-span-2 space-y-4">
            {/* Case Details */}
            <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">CASE DOSSIER</span>
                  <h2 className="font-bold text-slate-900 text-sm">{selectedObjection.id}: {selectedObjection.objectorName}</h2>
                </div>
                <span className="text-xs bg-slate-100 font-mono text-slate-800 px-2 py-1 font-bold">
                  Khasra: {selectedObjection.khasra}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">PRESIDING OFFICER</div>
                  <div className="font-bold text-slate-900 text-xs">{selectedObjection.presidingOfficer}</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">HEARING DATE</div>
                  <div className="font-bold text-slate-900 font-mono text-xs">{selectedObjection.hearingDateScheduled}</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">REQUIRING BODY REP</div>
                  <div className="font-bold text-blue-900 text-xs">{selectedObjection.requiringBodyPresent}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-800 uppercase text-[10px]">Objection Grounds Submitted:</div>
                <p className="text-slate-700 leading-relaxed italic">
                  "{selectedObjection.objectionSummary}"
                </p>
              </div>
            </div>

            {/* Quasi-Judicial Order Formulation Box */}
            <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Gavel className="w-4 h-4 text-[#C5A059]" />
                <span>Record Quasi-Judicial Hearing Order &amp; Collector Recommendation</span>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-xs mb-1">
                  Hearing Outcome &amp; Recommendation:
                </label>
                <select
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  className="w-full border border-slate-300 p-2 text-xs font-semibold focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="PARTIALLY_ACCEPTED">
                    Partially Accepted — Order Acquisition of Unviable Residual Strip (Sec 94)
                  </option>
                  <option value="ACCEPTED_LAND_CLASS_CORRECTED">
                    Accepted — Land Classification Corrected to NA / Commercial
                  </option>
                  <option value="REJECTED_PUBLIC_PURPOSE_OVERRIDING">
                    Rejected — Alignment Technologically Constrained / Public Purpose Overriding
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-xs mb-1">
                  Hearing Order Summary / Spot Inspection Findings:
                </label>
                <textarea
                  rows={4}
                  value={orderSummary}
                  onChange={(e) => setOrderSummary(e.target.value)}
                  className="w-full border border-slate-300 p-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Section 11(4) RoR Mutation Freeze Active</span>
                </div>

                <button
                  onClick={handleSaveDecision}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
                >
                  Pass Order &amp; Submit Section 15(2) Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
