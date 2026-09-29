import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck, FileText, Download } from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../../services/compensationCalculator.js';

export default function AwardFormVIIModal() {
  const {
    isAwardModalOpen,
    setIsAwardModalOpen,
    awardModalData,
    handleEnforceAward,
    activeRole,
    activeDistrict
  } = useDistrictCollector();

  if (!isAwardModalOpen || !awardModalData) return null;

  const handleSignAndEnforce = async () => {
    await handleEnforceAward(awardModalData.id);
    setIsAwardModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white w-full max-w-3xl shadow-2xl border border-slate-300 flex flex-col max-h-[90vh]">
        {/* Modal Bar */}
        <div className="bg-[#142642] text-white p-3 border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#C5A059]" />
            <h3 className="font-serif font-bold text-sm tracking-wide">
              FORM VII • STATUTORY LAND ACQUISITION AWARD
            </h3>
          </div>
          <button
            onClick={() => setIsAwardModalOpen(false)}
            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Official Sheet */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-slate-800 font-serif text-xs bg-[#FCFCF9] border m-3 border-slate-300 shadow-inner">
          {/* Official Letterhead */}
          <div className="text-center space-y-1 pb-3 border-b-2 border-slate-800">
            <div className="text-xl">🏛️</div>
            <div className="font-bold text-sm uppercase tracking-wider">
              GOVERNMENT OF MAHARASHTRA • REVENUE DEPARTMENT
            </div>
            <div className="font-semibold text-xs text-slate-700">
              OFFICE OF THE DISTRICT COLLECTOR &amp; DISTRICT MAGISTRATE, {activeDistrict?.name?.toUpperCase()}
            </div>
            <div className="text-[10px] text-slate-600 font-mono italic">
              (Under Sections 23, 26, 27, 28, 29 &amp; 30 of the RFCTLARR Act, 2013)
            </div>
          </div>

          {/* Award Reference Metadata */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-sans border-b border-slate-300 pb-3">
            <div>
              <span className="font-bold">Award Case No:</span> {awardModalData.awardNumber}
            </div>
            <div>
              <span className="font-bold">Date of Award:</span> {awardModalData.dateOfAward || new Date().toISOString().substring(0, 10)}
            </div>
            <div>
              <span className="font-bold">Sec 19 Declaration Date:</span> {awardModalData.sec19DeclarationDate}
            </div>
            <div>
              <span className="font-bold">Sec 25 Statutory Deadline:</span> {awardModalData.sec25DeadlineDate} (Within 12-Months)
            </div>
            <div>
              <span className="font-bold">Village &amp; Taluka:</span> {awardModalData.village}, {awardModalData.taluka}
            </div>
            <div>
              <span className="font-bold">Awarding Authority:</span> {awardModalData.awardingOfficer}
            </div>
          </div>

          {/* Legal Narrative */}
          <div className="space-y-2 text-[11px] leading-relaxed font-sans text-slate-700">
            <p>
              WHEREAS, the preliminary notification under Section 11(1) of the Right to Fair Compensation and
              Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 was published, and all objections
              filed under Section 15 have been duly heard and disposed of in accordance with the law;
            </p>
            <p>
              AND WHEREAS, the declaration under Section 19(1) of the said Act was published and claims under Section 21
              have been received and thoroughly scrutinized; the Collector, having examined all claims and records, hereby makes
              the following Award under Section 23 of the Act:
            </p>
          </div>

          {/* Financial Compensation Table */}
          <div className="font-sans">
            <div className="font-bold text-[11px] uppercase tracking-wider text-slate-900 mb-1">
              SUMMARY OF STATUTORY COMPENSATION APPORTIONED (FIRST SCHEDULE)
            </div>
            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead className="bg-slate-200">
                <tr>
                  <th className="border border-slate-400 p-1.5 text-left">Item No.</th>
                  <th className="border border-slate-400 p-1.5 text-left">Statutory Head &amp; RFCTLARR Section</th>
                  <th className="border border-slate-400 p-1.5 text-right">Computed Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr>
                  <td className="border border-slate-400 p-1.5 font-mono">1</td>
                  <td className="border border-slate-400 p-1.5">
                    Market Value of Land determined under Section 26(1) multiplied by Rural Factor (Sec 26(2))
                  </td>
                  <td className="border border-slate-400 p-1.5 text-right font-mono font-bold">
                    {formatIndianCurrency(awardModalData.totalCompensationAmount * 0.42)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-mono">2</td>
                  <td className="border border-slate-400 p-1.5">
                    Valuation of Attached Assets (Buildings, Trees, Wells) under Section 29
                  </td>
                  <td className="border border-slate-400 p-1.5 text-right font-mono">
                    {formatIndianCurrency(awardModalData.totalCompensationAmount * 0.08)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-mono">3</td>
                  <td className="border border-slate-400 p-1.5 font-bold">
                    100% Solatium Amount under Section 30(1)
                  </td>
                  <td className="border border-slate-400 p-1.5 text-right font-mono font-bold text-blue-900">
                    {formatIndianCurrency(awardModalData.solatium100PctAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-mono">4</td>
                  <td className="border border-slate-400 p-1.5">
                    12% p.a. Additional Compensation from Sec 11 to Award under Section 30(3)
                  </td>
                  <td className="border border-slate-400 p-1.5 text-right font-mono">
                    {formatIndianCurrency(awardModalData.additionalInterest12PctAmount)}
                  </td>
                </tr>
                <tr className="bg-slate-100 font-bold text-slate-950">
                  <td className="border border-slate-400 p-2 font-mono" colSpan="2">
                    GRAND TOTAL STATUTORY COMPENSATION (SECTION 23/30)
                  </td>
                  <td className="border border-slate-400 p-2 text-right font-mono text-emerald-800 text-xs">
                    {formatIndianCurrency(awardModalData.totalCompensationAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 flex justify-between items-end border-t border-slate-300 font-sans">
            <div className="space-y-1 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Compliance: Section 25 Adherence Confirmed</span>
              </div>
              <div>Digital Certificate: SHA-256 Validated</div>
              <div>Notice under Section 37(2) generated for dispatch</div>
            </div>

            <div className="text-right space-y-1">
              <div className="w-32 h-10 border-b border-dashed border-slate-400 ml-auto flex items-end justify-center text-blue-900 font-serif italic text-xs">
                [e-Signed with DSC]
              </div>
              <div className="font-bold text-xs">{awardModalData.awardingOfficer}</div>
              <div className="text-[10px] text-slate-600">District Collector &amp; District Magistrate</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-3 border-t border-slate-300 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Form VII</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAwardModalOpen(false)}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            {awardModalData.status !== 'AWARD_ENFORCED' ? (
              <button
                onClick={handleSignAndEnforce}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Sign with DSC &amp; Enforce Award (Sec 23)</span>
              </button>
            ) : (
              <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Award Enforced &amp; Sec 37 Notice Dispatched</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
