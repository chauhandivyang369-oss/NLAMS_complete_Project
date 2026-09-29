import React, { useState } from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Download, 
  Search, 
  ChevronRight, 
  FileCheck, 
  Printer, 
  Upload, 
  Info,
  Network,
  ArrowLeft,
  PenTool
} from 'lucide-react';
import FinancialEscrowSubNav from './FinancialEscrowSubNav.jsx';

export default function EscrowAccountDepositsView({ onNavigateTab, onShowToast }) {
  const [searchQuery, setSearchQuery] = useState('');

  const tranches = [
    {
      ref: 'TR-DEP-2026-01',
      date: '14 Jan 2026',
      amount: '₹ 2.40 Cr',
      mode: 'RTGS / Core Transfer',
      utr: 'UTR-SBIN26014491',
      status: 'VERIFIED (SIA FUND)',
      statusType: 'green',
      challan: 'e-Challan #401.pdf',
      action: 'View'
    },
    {
      ref: 'TR-DEP-2026-02',
      date: '18 Feb 2026',
      amount: '₹ 9.32 Cr',
      mode: 'PFMS Inter-Gov Transfer',
      utr: 'PFMS-BT-2026-8902',
      status: 'VERIFIED (ADMIN FEE)',
      statusType: 'green',
      challan: 'Treas_Order_510.pdf',
      action: 'View'
    },
    {
      ref: 'TR-DEP-2026-03',
      date: '12 Jun 2026',
      amount: '₹ 83.28 Cr',
      mode: 'RBI NEFT Gov Pool',
      utr: 'RBI-SETTL-991204',
      status: 'VERIFIED (SEC 19 DEPOSIT)',
      statusType: 'green',
      challan: 'SBI_Ack_99812.pdf',
      action: 'View'
    },
    {
      ref: 'TR-DEP-2026-04',
      date: '04 Sep 2026',
      amount: '₹ 45.00 Cr',
      mode: 'Treasury Clearance',
      utr: 'GJ-TREAS-441098',
      status: 'VERIFIED (TRANCHE 2)',
      statusType: 'green',
      challan: 'Bank_Stmt_Sep26.pdf',
      action: 'View'
    },
    {
      ref: 'TR-DEP-2026-05',
      date: 'Scheduled (Q4)',
      amount: '₹ 46.40 Cr',
      mode: 'Direct Treasury Mandate',
      utr: 'Mandate Draft #551',
      status: 'PENDING CALA DEMAND',
      statusType: 'orange',
      challan: 'Draft Voucher',
      action: 'Upload Proof'
    }
  ];

  const filteredTranches = tranches.filter(t => 
    t.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.utr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.mode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <span>Requisitioning Body</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>Financial Escrow Ledger</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Escrow Account &amp; Deposits</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
            <Network className="w-3 h-3 text-sky-600" />
            <span>PFMS BRIDGE LINKED • SEC 77 COMPLIANT ESCROW</span>
          </div>
        </div>

        {/* Title and Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-100 border border-slate-200 rounded-lg shrink-0 mt-0.5">
              <Landmark className="w-5 h-5 text-slate-800" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Escrow Account &amp; Deposit Particulars
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
                Statutory bank account registration, PFMS integration reference, and tranche deposit records under RFCTLARR Act, 2013.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-300 text-slate-700 rounded-md text-xs font-mono font-semibold">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>MANDATE: G.O.I.-GJ-NHAI-2026-F1</span>
            </div>
            <button
              onClick={() => onShowToast('Downloading official Ledger Transcript...')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-200" />
              <span>Ledger Transcript</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Tab Sub Navigation */}
      <FinancialEscrowSubNav activeTab="escrow-deposits" setActiveTab={onNavigateTab} />

      {/* Metadata Strip */}
      <div className="bg-slate-50/90 border border-slate-200/80 px-4 py-2.5 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">STATUTORY PROPOSAL ID</span>
          <span className="font-mono font-bold text-slate-800">NLAMS-RB-2026-00124</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">REQUISITIONING BODY</span>
          <span className="font-semibold text-slate-800">NHAI / PIU-Ahmedabad</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">PROJECT CORRIDOR</span>
          <span className="text-slate-700">National Highway Corridor (Sec 4B–9A)</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">STATE / JURISDICTION</span>
          <span className="text-slate-700">Gujarat (Ahmedabad, Mehsana, Patan, Banaskantha)</span>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">TOTAL SANCTIONED REQUIREMENT</span>
            <FileText className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            ₹ 186.40 <span className="text-xs font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Approved under Section 19(2)
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">TOTAL AMOUNT DEPOSITED</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600 font-mono">
            ₹ 140.00 <span className="text-xs font-semibold text-emerald-700 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            75.1% of Capital Pool Realized
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">PENDING TRANCHE BALANCE</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-amber-700 font-mono">
            ₹ 46.40 <span className="text-xs font-semibold text-amber-800 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Mandate Tranche-05 Payable
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">LAST TREASURY CREDIT</span>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono">
            04 Sep 2026
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Tranche 4 (₹45.00 Cr) Credited
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">BATCH RECONCILIATION</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono">
            100% Batched
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            4 of 4 Tranches PFMS Sealed
          </div>
        </div>
      </div>

      {/* Designated Escrow Account Particulars Card */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-start gap-2.5">
            <Landmark className="w-4 h-4 text-slate-700 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Designated Escrow Account Particulars
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Validated through Centralized Public Financial Management System (PFMS) Government Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded text-[11px] font-bold">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>ACCOUNT LOCKED &amp; VALIDATED</span>
          </div>
        </div>

        {/* 6 Particulars Form Inputs in 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Item 1 */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              ACCOUNT HOLDER / DESIGNATED OFFICER *
            </label>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-semibold text-slate-800 flex items-center justify-between">
              <span>Competent Authority for Land Acquisition (CALA) &amp; DM, Ahmedabad</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500">
              Statutory signatory empowered under Section 3G(1) of NH Act
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              DESIGNATED SCHEDULED ESCROW BANK *
            </label>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-semibold text-slate-800 flex items-center justify-between">
              <span>State Bank of India (Government Business Branch)</span>
              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                PUBLIC SECTOR
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              MoRTH Designated Schedule-A Financial Institution
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              ESCROW ACCOUNT NUMBER (MASKED) *
            </label>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-mono font-bold text-slate-900 flex items-center justify-between">
              <span>************02931</span>
              <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded text-[10px] font-bold font-sans">
                SBI GOV ESCROW SCHEME
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Direct linkage with Calamity &amp; Special Land Head 8443
            </p>
          </div>

          {/* Item 4 */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              IFSC CODE &amp; BRANCH IDENTIFICATION *
            </label>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-semibold text-slate-800 flex items-center justify-between">
              <span className="font-mono font-bold text-slate-900">SBIN0001234</span>
              <span className="text-slate-600 text-xs">Main Capital Branch, Gandhinagar</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Clearing through Reserve Bank of India, Ahmedabad Hub
            </p>
          </div>

          {/* Item 5 */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              PFMS VIRTUAL ACCOUNT / TREASURY CODE *
            </label>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-mono font-bold text-slate-900 flex items-center justify-between">
              <span>TR-GJ-2026-901 / PFMS-CALA-04</span>
              <Network className="w-4 h-4 text-sky-600" />
            </div>
            <p className="text-[11px] text-slate-500">
              Synchronized with State Cyber Treasury Portal (IFMS Gujarat)
            </p>
          </div>

          {/* Item 6 */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              OPENING DATE &amp; OFFICIAL VERIFICATION *
            </label>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-semibold text-slate-800 flex items-center justify-between">
              <span className="font-mono">12 Jan 2026</span>
              <span className="flex items-center gap-1 text-emerald-700 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                e-Signed &amp; Treasury Verified (Finance Dept, GoG)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Joint signatory order issued by District Collector Ahmedabad
            </p>
          </div>
        </div>

        {/* Notice line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Account parameters can only be altered via Competent Authority resolution gazetted by Department of Revenue.</span>
          </div>
          <button 
            onClick={() => onShowToast('Mandate revision history: 0 amendments recorded.')}
            className="text-slate-700 font-semibold hover:underline"
          >
            Mandate Revision History
          </button>
        </div>
      </div>

      {/* Tranche Deposit & Remittance Ledger */}
      <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="px-4 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Tranche Deposit &amp; Remittance Ledger
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory record of capital advances credited into the project escrow pool
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter UTR / Tranche ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-500 w-44"
              />
            </div>
            <button 
              onClick={() => onShowToast('Exporting Tranche Ledger (XLS)...')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export XLS</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 text-slate-600 font-bold border-b border-slate-200 text-[11px] tracking-wider uppercase">
                <th className="py-2.5 px-4">TRANCHE REF</th>
                <th className="py-2.5 px-3">DEPOSIT DATE</th>
                <th className="py-2.5 px-3 text-right">AMOUNT (₹ CR)</th>
                <th className="py-2.5 px-4">MODE / UTR REFERENCE</th>
                <th className="py-2.5 px-4 text-center">VERIFICATION STATUS</th>
                <th className="py-2.5 px-4">SUPPORTING CHALLAN</th>
                <th className="py-2.5 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredTranches.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    <span className={item.statusType === 'orange' ? 'text-amber-800' : ''}>
                      {item.ref}
                    </span>
                  </td>
                  <td className={`py-3 px-3 font-mono ${item.statusType === 'orange' ? 'text-amber-800 font-semibold' : 'text-slate-600'}`}>
                    {item.date}
                  </td>
                  <td className={`py-3 px-3 text-right font-mono font-bold text-sm ${item.statusType === 'orange' ? 'text-amber-800' : 'text-slate-900'}`}>
                    {item.amount}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{item.mode}</div>
                    <div className="font-mono text-[11px] text-slate-500">{item.utr}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.statusType === 'green' ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {item.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 cursor-pointer">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span className="underline decoration-slate-300">{item.challan}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.action === 'Upload Proof' ? (
                      <button
                        onClick={() => onShowToast(`Open upload challan modal for ${item.ref}`)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded text-xs transition-colors"
                      >
                        Upload Proof
                      </button>
                    ) : (
                      <button
                        onClick={() => onShowToast(`Viewing deposit challan: ${item.challan}`)}
                        className="text-xs font-semibold text-slate-700 hover:text-slate-950 underline underline-offset-2 hover:bg-slate-100 px-2 py-1 rounded transition-colors"
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 font-medium">
            Showing 5 of 5 statutory tranches (Cumulative Remitted: <span className="font-bold text-slate-900">₹ 140.00 Cr</span> / ₹ 186.40 Cr)
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ledger Status: Escrow Reconciliation Matched with State AG Audit</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('overview')}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Back to Overview</span>
          </button>
          <button
            onClick={() => onShowToast('Generating Account Certificate...')}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Account Certificate</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onShowToast('Submitting New Deposit Voucher to Treasury...')}
            className="px-4 py-2 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-bold shadow-xs flex items-center gap-2 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Submit New Deposit Voucher</span>
          </button>
          <button
            onClick={() => onShowToast('e-Sign Remittance Batch: Prompting DSC Token...')}
            className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-white rounded-md text-xs font-bold shadow-xs flex items-center gap-2 transition-colors"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>e-Sign Remittance Batch</span>
          </button>
        </div>
      </div>

      {/* Statutory Regulatory Notice */}
      <div className="bg-slate-100/90 border border-slate-200 rounded-lg p-3.5 text-[11px] text-slate-600 leading-relaxed">
        <span className="font-bold text-slate-900">Statutory Regulatory Notice:</span> In accordance with Section 77 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, all funds deposited by the Requisitioning Body (NHAI) in this escrow pool are irrevocably committed for disbursement to identified title-holders and affected families. Unspent balances, if any upon final determination of compensation awards, shall only be repatriated under an express executive decree countersigned by the Finance Secretariat and District Collector.
      </div>
    </div>
  );
}
