import React from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Receipt, 
  RefreshCw, 
  Download, 
  Sliders, 
  FileText, 
  Filter, 
  Users, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import FinancialEscrowSubNav from './FinancialEscrowSubNav.jsx';

export default function EscrowOverviewView({ onNavigateTab, onShowToast }) {
  const components = [
    {
      name: 'Land Compensation & Solatium',
      mandate: 'Sec 26 & 30',
      required: '174.68',
      deposited: '128.28',
      utilized: '84.40',
      balance: '43.88',
      status: 'Partially Funded',
      statusType: 'blue',
      action: 'View Ledger',
      targetTab: 'transactions-ledger'
    },
    {
      name: 'R&R Entitlements & Resettlement',
      mandate: 'Sec 31 & 32',
      required: '12.40',
      deposited: '9.00',
      utilized: '6.50',
      balance: '2.50',
      status: 'Partially Funded',
      statusType: 'blue',
      action: 'View Ledger',
      targetTab: 'transactions-ledger'
    },
    {
      name: 'Administrative & Establishment Charges (5%)',
      mandate: 'State Rules',
      required: '9.32',
      deposited: '9.32',
      utilized: '9.32',
      balance: '0.00',
      status: 'Fully Remitted',
      statusType: 'green',
      action: 'View Challan',
      targetTab: 'escrow-deposits'
    },
    {
      name: 'SIA Cost & Expert Group Deposit',
      mandate: 'Sec 4(1)',
      required: '2.40',
      deposited: '2.40',
      utilized: '2.40',
      balance: '0.00',
      status: 'Settled',
      statusType: 'slate',
      action: 'View Receipt',
      targetTab: 'escrow-deposits'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span>Requisitioning Body</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Financial Escrow Ledger</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Overview</span>
        </div>

        {/* Title and Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-start gap-3">
            <div className="bg-[#0a2540] text-white text-[11px] font-bold px-2.5 py-1 rounded font-mono shrink-0 uppercase tracking-wider mt-0.5">
              MODULE 05
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Financial Escrow Ledger — Overview
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
                Statutory escrow allocation, treasury deposit verification, and fund drawdown monitoring under RFCTLARR Act 2013.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigateTab('escrow-deposits')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs transition-colors"
            >
              <Landmark className="w-3.5 h-3.5 text-slate-600" />
              <span>View Account Particulars</span>
            </button>
            <button
              onClick={() => onNavigateTab('transactions-ledger')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-200" />
              <span>View Full Transactions</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Tab Sub Navigation */}
      <FinancialEscrowSubNav activeTab="overview" setActiveTab={onNavigateTab} />

      {/* Metadata Strip */}
      <div className="bg-slate-50/90 border border-slate-200/80 px-4 py-2.5 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">PROPOSAL ID:</span>
            <span className="font-mono font-bold text-slate-800">NLAMS-RB-2026-00124</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">PROJECT:</span>
            <span className="font-semibold text-slate-800">National Highway Corridor (NH-48 Extn)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">AUTHORITY:</span>
            <span className="text-slate-700">NHAI / PIU-Ahmedabad</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">TARGET DISTRICTS:</span>
          <span className="font-semibold text-slate-800">4 (Ahmedabad, Mehsana, Patan, Banaskantha)</span>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {/* Card 1: TOTAL ESCROW REQUIREMENT */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase">TOTAL ESCROW REQUIREMENT</span>
            <Landmark className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            ₹186.40 <span className="text-sm font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
            <FileText className="w-3 h-3 text-slate-400" />
            <span>Sanctioned under Sec 19(2)</span>
          </div>
        </div>

        {/* Card 2: AMOUNT DEPOSITED */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase">AMOUNT DEPOSITED</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            ₹140.00 <span className="text-sm font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
            <Landmark className="w-3 h-3 text-emerald-600" />
            <span>Treasury verified in CALA A/c</span>
          </div>
        </div>

        {/* Card 3: AMOUNT UTILIZED / RELEASED */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase">AMOUNT UTILIZED / RELEASED</span>
            <Upload className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            ₹93.72 <span className="text-sm font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
            <Users className="w-3 h-3 text-slate-400" />
            <span>Disbursed to landholders/admin</span>
          </div>
        </div>

        {/* Card 4: BALANCE AVAILABLE */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase">BALANCE AVAILABLE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 tracking-tight font-mono">
            ₹46.28 <span className="text-sm font-semibold text-emerald-700 font-sans">Cr</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>In dedicated SBI CALA escrow</span>
          </div>
        </div>
      </div>

      {/* Badges / Status Strip */}
      <div className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">FUNDING STATUS:</span>
            <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded text-[11px] font-bold">
              Partially Funded (75.1%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">DEPOSIT STATUS:</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">RECONCILIATION:</span>
            <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Pending (2 mismatches)
            </span>
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          <span className="font-semibold text-slate-600">LAST UPDATE:</span> 15 Sep 2026, 11:30 IST
        </div>
      </div>

      {/* Financial Component Breakdown Table */}
      <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="px-4 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Financial Component Breakdown
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onShowToast('Exporting Financial Breakdown (CSV)...')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3 h-3 text-slate-500" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => onShowToast('Component filters active: All 4 heads')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Filter className="w-3 h-3 text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 text-slate-600 font-bold border-b border-slate-200 text-[11px] tracking-wider uppercase">
                <th className="py-2.5 px-4">COMPONENT NAME</th>
                <th className="py-2.5 px-3">STATUTORY MANDATE</th>
                <th className="py-2.5 px-3 text-right">REQUIRED (₹ CR)</th>
                <th className="py-2.5 px-3 text-right">DEPOSITED (₹ CR)</th>
                <th className="py-2.5 px-3 text-right">UTILIZED (₹ CR)</th>
                <th className="py-2.5 px-3 text-right">BALANCE (₹ CR)</th>
                <th className="py-2.5 px-4 text-center">STATUS</th>
                <th className="py-2.5 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {components.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <div className={`w-1.5 h-6 rounded-xs ${
                      item.statusType === 'green' ? 'bg-emerald-500' :
                      item.statusType === 'blue' ? 'bg-sky-500' : 'bg-slate-400'
                    }`} />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                    {item.mandate}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {item.required}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {item.deposited}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {item.utilized}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">
                    {item.balance}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.statusType === 'blue' && (
                      <span className="inline-block bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                        {item.status}
                      </span>
                    )}
                    {item.statusType === 'green' && (
                      <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                        {item.status}
                      </span>
                    )}
                    {item.statusType === 'slate' && (
                      <span className="inline-block bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onNavigateTab(item.targetTab)}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-950 underline underline-offset-2 hover:bg-slate-100 px-2 py-1 rounded transition-colors"
                    >
                      {item.action}
                    </button>
                  </td>
                </tr>
              ))}

              {/* CONSOLIDATED TOTAL Row */}
              <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-300 text-slate-900">
                <td className="py-3 px-4 tracking-wider uppercase text-[11px]">
                  CONSOLIDATED TOTAL
                </td>
                <td className="py-3 px-3"></td>
                <td className="py-3 px-3 text-right font-mono text-sm">198.80</td>
                <td className="py-3 px-3 text-right font-mono text-sm">149.00</td>
                <td className="py-3 px-3 text-right font-mono text-sm">102.62</td>
                <td className="py-3 px-3 text-right font-mono text-sm text-emerald-700">46.38</td>
                <td colSpan={2} className="py-3 px-4 text-center text-slate-600 uppercase tracking-wider text-[10px]">
                  STATUTORY NET RESERVE
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons Row below Table */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('escrow-deposits')}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Landmark className="w-3.5 h-3.5 text-slate-500" />
            <span>View Account Particulars</span>
          </button>
          <button
            onClick={() => onNavigateTab('transactions-ledger')}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-500" />
            <span>View Full Transactions</span>
          </button>
          <button
            onClick={() => onNavigateTab('compensation-disbursement')}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Review Disbursements</span>
          </button>
        </div>

        <div>
          <button
            onClick={() => onNavigateTab('reconciliation-audit')}
            className="px-4 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run Reconciliation</span>
          </button>
        </div>
      </div>

      {/* Financial Compliance & Audit Section */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Financial Compliance &amp; Audit
            </h3>
          </div>
          <span className="text-slate-500 text-xs font-medium">
            CAG &amp; Finance Dept Oversight Rule 14B
          </span>
        </div>

        {/* 4 Compliance Cards in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* Item 1 */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900 leading-snug">
                Dedicated SBI CALA Escrow A/c #0098231002931 verified
              </div>
              <p className="text-[11px] text-slate-500">
                Validated via PFMS &amp; RBI e-Kuber portal on 02 Sep 2026.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900 leading-snug">
                Tranche-2 ₹45.00 Cr treasury receipt e-signed
              </div>
              <p className="text-[11px] text-slate-500">
                Acknowledged by Gujarat State Finance Dept (Treasury Ref #GTR-88219).
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-amber-50/50 border border-amber-200/70 rounded-lg p-3 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-900 leading-snug">
                Tranche-3 ₹46.40 Cr pending treasury counter-signature
              </div>
              <p className="text-[11px] text-amber-700">
                Requisition raised on 10 Sep 2026; pending approval with CALA Banaskantha.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-rose-50/50 border border-rose-200/70 rounded-lg p-3 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-rose-900 leading-snug">
                2 transaction mismatches detected in Tehsil Sanand ledger
              </div>
              <p className="text-[11px] text-rose-700">
                Difference of ₹14,20,000 between bank debit and physical disbursement muster.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions Footer */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <button
          onClick={() => onShowToast('Generating official Financial Dossier PDF...')}
          className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-2 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Financial Dossier (PDF)</span>
        </button>

        <button
          onClick={() => onShowToast('Escrow Re-balancing Workflow Initiated')}
          className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-white rounded-md text-xs font-bold shadow-xs flex items-center gap-2 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Initiate Escrow Re-balancing</span>
        </button>
      </div>
    </div>
  );
}
