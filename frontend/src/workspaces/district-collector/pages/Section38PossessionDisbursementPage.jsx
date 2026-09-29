import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Coins, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Building, 
  ArrowRight,
  Printer,
  FileCheck
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../services/compensationCalculator.js';

export default function Section38PossessionDisbursementPage() {
  const {
    parcels,
    handleTakePossession,
    handleDepositAuthority,
    activeProject,
    setNoticeModalData,
    setIsNoticeModalOpen
  } = useDistrictCollector();

  const [selectedParcelId, setSelectedParcelId] = useState(parcels[0]?.id || null);
  const selectedParcel = parcels.find(p => p.id === selectedParcelId) || parcels[0];

  const handleExecuteHOTO = async () => {
    if (!selectedParcel) return;
    await handleTakePossession(selectedParcel.id, {
      officer: 'CALA & Tahsildar',
      witnesses: ['Talathi Anjur', 'Site Engineer NHSRCL'],
      panchnamaDate: new Date().toISOString().substring(0, 10)
    });
  };

  const handleDepositSec77 = async () => {
    if (!selectedParcel) return;
    await handleDepositAuthority(
      selectedParcel.id,
      selectedParcel.totalCompensation,
      'Title dispute / Apportionment conflict referred to LARR Authority under Section 64/77(2)'
    );
  };

  const handleGenerateSec37Notice = () => {
    if (!selectedParcel) return;
    setNoticeModalData({
      title: 'SECTION 37(2) STATUTORY NOTICE OF AWARD PASSED',
      refNo: `REV/LAQ/SEC37/${selectedParcel.khasraGat}`,
      recipient: `${selectedParcel.khatedarName} (${selectedParcel.khasraGat})`,
      subject: 'Immediate Notice of Land Acquisition Award passed under Section 23/37(2)',
      bodyText: `Take notice that the Collector has made an award under Section 23 of the RFCTLARR Act, 2013 on this date in respect of ${selectedParcel.khasraGat}, Village ${selectedParcel.village}.
      The total compensation awarded for your interest in the said land amounts to ${formatIndianCurrency(selectedParcel.totalCompensation)}.
      You are hereby called upon to present your bank account details and Aadhaar for Direct Benefit Transfer (DBT) credit or visit the Collectorate treasury to receive payment.
      Possession of the land shall be taken under Section 38 upon full payment or deposit thereof.`,
      statutoryClause: 'Section 37(2): "The Collector shall give immediate notice of the award to such of the persons interested as are not present personally or by their representatives when the award is made."'
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
              POSSESSION &amp; DISBURSEMENT GATEWAY
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sections 37, 38 &amp; Section 77(2) Reference Deposit
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Section 37 Notice, Section 38 Possession Handover &amp; Escrow Disbursement Desk
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Mandatory Statutory Bar: Collector shall take possession ONLY after full payment of compensation. Track DBT transfers, deposit disputed amounts into LARR Authority (Sec 77), and execute HOTO Panchnama.
          </p>
        </div>

        <button
          onClick={handleGenerateSec37Notice}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#142642] hover:bg-slate-800 text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#C5A059]" />
          <span>Generate Section 37(2) Award Notice</span>
        </button>
      </div>

      {/* Mandatory Statutory Bar Card */}
      <div className="bg-rose-50 border-l-4 border-rose-600 p-4 text-xs text-rose-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-sm">Section 38 Mandatory Statutory Rule:</div>
          <p className="text-rose-900 leading-relaxed">
            "The Collector shall take possession of land after ensuring that full payment of compensation as well as rehabilitation and resettlement entitlements are paid or tendered to the entitled persons within a period of three months for the compensation and a period of six months for the monetary part of rehabilitation and resettlement entitlements."
          </p>
        </div>
      </div>

      {/* Parcels Possession & Disbursement Table */}
      <div className="bg-white border border-slate-200 shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Parcel Possession Readiness &amp; Escrow Transfer Roll
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Click any parcel to execute Section 38 Possession or Section 77 Deposit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="p-3">Khasra / Gat No.</th>
                <th className="p-3">Khatedar Name</th>
                <th className="p-3 text-right">Compensation (INR)</th>
                <th className="p-3">Payment / Escrow Status</th>
                <th className="p-3">Sec 38 Possession Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parcels.map((p) => (
                <tr 
                  key={p.id} 
                  onClick={() => setSelectedParcelId(p.id)}
                  className={`hover:bg-slate-50 cursor-pointer ${
                    selectedParcel?.id === p.id ? 'bg-slate-50 font-semibold' : ''
                  }`}
                >
                  <td className="p-3 font-mono font-bold text-slate-900">{p.khasraGat}</td>
                  <td className="p-3 text-slate-800">{p.khatedarName}</td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-800">
                    {formatIndianCurrency(p.totalCompensation)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 ${
                        p.disbursementStatus === 'PAID_DBT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.disbursementStatus === 'DEPOSITED_IN_LARR_AUTHORITY'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.disbursementStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 ${
                        p.possessionStatus === 'HOTO_EXECUTED' || p.possessionStatus === 'POSSESSION_TAKEN_SEC38'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {p.possessionStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-[11px] text-blue-600 underline font-semibold">
                      Manage
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Parcel Action Execution Box */}
      {selectedParcel && (
        <div className="bg-white border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">SELECTED FOR POSSESSION PROTOCOL</span>
              <h2 className="font-bold text-slate-900 text-sm">
                {selectedParcel.khasraGat} — {selectedParcel.khatedarName} ({selectedParcel.village})
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800">
              Total Award: {formatIndianCurrency(selectedParcel.totalCompensation)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A: Full Payment Confirmed -> Execute Section 38 Possession */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-300 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Protocol A: Execute Section 38 Possession Handover (HOTO)</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Use when 100% compensation has been credited to Khatedar's bank account via PFMS/DBT.
                Generates Handing-Over / Taking-Over Panchnama and delivers vacant site to Requisitioning Body.
              </p>

              <button
                onClick={handleExecuteHOTO}
                disabled={selectedParcel.possessionStatus === 'HOTO_EXECUTED'}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                {selectedParcel.possessionStatus === 'HOTO_EXECUTED'
                  ? '✓ Possession Already Delivered to Requiring Body'
                  : 'Execute Section 38 Possession & HOTO Panchnama'}
              </button>
            </div>

            {/* Option B: Title Conflict / Refusal -> Deposit in LARR Authority (Sec 77) */}
            <div className="p-4 bg-purple-50/50 border border-purple-300 space-y-3">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Protocol B: Statutory Deposit into LARR Authority (Sec 77)</span>
              </div>
              <p className="text-[11px] text-purple-800 leading-relaxed">
                Under Section 77(2), if the Khatedar refuses to accept payment, or if there is a dispute as to apportionment or title,
                Collector shall deposit the compensation amount into the LARR Authority escrow, allowing lawful possession under Section 38.
              </p>

              <button
                onClick={handleDepositSec77}
                disabled={selectedParcel.disbursementStatus === 'DEPOSITED_IN_LARR_AUTHORITY'}
                className="w-full py-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                {selectedParcel.disbursementStatus === 'DEPOSITED_IN_LARR_AUTHORITY'
                  ? '✓ Deposited in LARR Authority (Sec 77(2))'
                  : 'Deposit into LARR Authority & Take Lawful Possession'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
