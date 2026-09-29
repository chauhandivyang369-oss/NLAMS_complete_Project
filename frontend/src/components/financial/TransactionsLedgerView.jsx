import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  RotateCcw, 
  Printer, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  Download, 
  Lock, 
  Network, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
  Users,
  BadgeAlert,
  Send
} from 'lucide-react';
import FinancialEscrowSubNav from './FinancialEscrowSubNav.jsx';

export default function TransactionsLedgerView({ onNavigateTab, onShowToast }) {
  const [selectedTxnId, setSelectedTxnId] = useState('TXN-NLAMS-ESC-00126');
  const [filterQuery, setFilterQuery] = useState('TXN-NLAMS-ESC');
  const [txnType, setTxnType] = useState('all');
  const [cashDirection, setCashDirection] = useState('all');

  const transactions = [
    {
      id: 'TXN-NLAMS-ESC-00126',
      dateTime: '14 Sep 2026 11:20',
      type: 'Compensation Provision',
      typeBadge: 'slate',
      direction: 'debit',
      description: 'Direct payment to Sanand Tehsil CALA account for Khasra 140/A to 142/B titleholders',
      value: '₹14,20,00,000.00',
      head: 'Land Compensation under RFCTLARR Sec 26/30',
      origin: 'SBI Escrow #0098231002931',
      beneficiary: 'Sanand SLAO CALA Account',
      utr: 'UTR-SBIN2026091448',
      pfmsScroll: 'SC-2026-09-02',
      dscSigner: 'Digitally Signed by SLAO with DSC Class 3',
      dscDetails: 'Cert SN: 4920-FB29-0182-AA11 | Validity: Oct 2027',
      attachment: 'Sanand_Challan.pdf',
      attachmentSize: '2.4 MB'
    },
    {
      id: 'TXN-NLAMS-ESC-00125',
      dateTime: '09 Sep 2026 16:45',
      type: 'R&R Grant',
      typeBadge: 'slate',
      direction: 'debit',
      description: 'Livelihood grant batch #12 for PAF families in Viramgam sector',
      value: '₹3,45,00,000.00',
      head: 'R&R Second Schedule Entitlement',
      origin: 'SBI Escrow #0098231002931',
      beneficiary: 'State R&R Commissionerate DBT Gateway',
      utr: 'UTR-SBIN2026090912',
      pfmsScroll: 'SC-2026-08-98',
      dscSigner: 'Digitally Signed by R&R Officer with DSC Class 3',
      dscDetails: 'Cert SN: 3102-CA88-9901-BC22 | Validity: Dec 2027',
      attachment: 'RR_Grant_Schedule.pdf',
      attachmentSize: '1.8 MB'
    },
    {
      id: 'TXN-NLAMS-ESC-00124',
      dateTime: '04 Sep 2026 10:15',
      type: 'Escrow Deposit',
      typeBadge: 'amber',
      direction: 'credit',
      description: 'Tranche 4 credit from NHAI capital account to project dedicated escrow pool',
      value: '₹45,00,00,000.00',
      head: 'Capital Escrow Remittance Section 77',
      origin: 'RBI Gov Pool / NHAI Head Office',
      beneficiary: 'SBI Dedicated Escrow #0098231002931',
      utr: 'UTR-SBIN2026090401',
      pfmsScroll: 'SC-2026-08-77',
      dscSigner: 'Digitally Signed by Financial Advisor MoRTH',
      dscDetails: 'Cert SN: 1029-DD44-5512-EE90 | Validity: Jan 2028',
      attachment: 'Tranche4_Treasury_Ack.pdf',
      attachmentSize: '3.1 MB'
    },
    {
      id: 'TXN-NLAMS-ESC-00123',
      dateTime: '28 Aug 2026 14:10',
      type: 'Admin Fee',
      typeBadge: 'slate',
      direction: 'debit',
      description: 'SLAO administrative establishment charges (5% statutory share)',
      value: '₹4,66,00,000.00',
      head: 'Establishment & Revenue Charges',
      origin: 'SBI Escrow #0098231002931',
      beneficiary: 'Collectorate Revenue Dept, Ahmedabad',
      utr: 'UTR-SBIN2026082855',
      pfmsScroll: 'SC-2026-08-62',
      dscSigner: 'Digitally Signed by Treasury Officer Ahmedabad',
      dscDetails: 'Cert SN: 7741-BA21-6609-FA33 | Validity: Nov 2026',
      attachment: 'Admin_Charges_Challan.pdf',
      attachmentSize: '1.2 MB'
    },
    {
      id: 'TXN-NLAMS-ESC-00122',
      dateTime: '15 Aug 2026 10:05',
      type: 'Compensation Provision',
      typeBadge: 'slate',
      direction: 'debit',
      description: 'Disbursement to Mehsana Kadi sector titleholders (Phase-1 awards)',
      value: '₹8,40,00,000.00',
      head: 'Land Compensation under RFCTLARR Sec 26/30',
      origin: 'SBI Escrow #0098231002931',
      beneficiary: 'Kadi CALA Sub-Divisional Account',
      utr: 'UTR-SBIN2026081599',
      pfmsScroll: 'SC-2026-08-41',
      dscSigner: 'Digitally Signed by SLAO Mehsana',
      dscDetails: 'Cert SN: 8820-CC11-0091-EA88 | Validity: Aug 2027',
      attachment: 'Kadi_Phase1_Disbursement.pdf',
      attachmentSize: '2.9 MB'
    },
    {
      id: 'TXN-NLAMS-ESC-00121',
      dateTime: '02 Aug 2026 09:30',
      type: 'SIA Deposit',
      typeBadge: 'slate',
      direction: 'debit',
      description: 'Settlement of social impact assessment agency professional fee',
      value: '₹2,40,00,000.00',
      head: 'SIA & Expert Group Cost Sec 4(1)',
      origin: 'SBI Escrow #0098231002931',
      beneficiary: 'Gujarat Institute of Development Research',
      utr: 'UTR-SBIN2026080211',
      pfmsScroll: 'SC-2026-08-10',
      dscSigner: 'Digitally Signed by Project Director PIU',
      dscDetails: 'Cert SN: 9912-EE77-4401-CA10 | Validity: Sep 2027',
      attachment: 'SIA_Final_Clearance.pdf',
      attachmentSize: '4.5 MB'
    }
  ];

  const selectedTxn = transactions.find(t => t.id === selectedTxnId) || transactions[0];

  return (
    <div className="space-y-4">
      {/* Top Banner Strip */}
      <div className="bg-[#0a2540] text-white px-4 py-2.5 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-amber-500 text-slate-950 font-mono font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
            STATUTORY MODULE 05
          </span>
          <span className="font-mono text-slate-300">
            PROPOSAL ID: <strong className="text-white">NLAMS-RB-2026-00124</strong>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-200 font-medium">Sanand Bypass &amp; Multimodal Logistics Feeder Corridor</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Escrow A/c:</span>
            <strong className="text-white">SBI-ND-0098231002931</strong>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PFMS Gateway: <strong>ONLINE (v2.4)</strong></span>
          </div>
          <button
            onClick={() => onShowToast('Exporting Complete Ledger CSV...')}
            className="flex items-center gap-1 text-sky-300 hover:text-white underline underline-offset-2"
          >
            <Download className="w-3 h-3" />
            <span>Export Ledger CSV</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span>Requisitioning Body</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Financial Escrow Ledger</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Financial Transactions</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Financial Transactions / Payment Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Searchable chronological registry of all statutory escrow credits, sub-account disbursements, and administrative transfers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onShowToast('Printing Voucher Roll for FY 2026-Q2...')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Voucher Roll</span>
            </button>
            <button
              onClick={() => onShowToast('Initiating Statutory Transfer via PFMS Bridge...')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Initiate Statutory Transfer</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Tab Sub Navigation */}
      <FinancialEscrowSubNav activeTab="transactions-ledger" setActiveTab={onNavigateTab} />

      {/* Enterprise Statutory Filter Console */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-600" />
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              ENTERPRISE STATUTORY FILTER CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-[11px] font-semibold">
              Filtered: 6 of 28 Records
            </span>
            <button 
              onClick={() => {
                setFilterQuery('');
                setTxnType('all');
                setCashDirection('all');
              }}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button 
              onClick={() => onShowToast('Filter view saved to profile.')}
              className="text-slate-600 hover:text-slate-900 text-[11px] underline underline-offset-2"
            >
              Save Filter View
            </button>
          </div>
        </div>

        {/* 5 Filter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              TXN ID / REFERENCE / KHASRA NO.
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="TXN-NLAMS-ESC"
                className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono text-slate-900 focus:outline-hidden focus:border-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              TRANSACTION TYPE
            </label>
            <select
              value={txnType}
              onChange={(e) => setTxnType(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-hidden focus:border-slate-500"
            >
              <option value="all">All Types</option>
              <option value="compensation">Compensation Provision</option>
              <option value="rr">R&amp;R Grant</option>
              <option value="escrow">Escrow Deposit</option>
              <option value="admin">Admin Fee</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              STATUTORY PERIOD
            </label>
            <select className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-hidden focus:border-slate-500">
              <option>01 Jan - 15 Sep 2026</option>
              <option>Q1 FY 2026-27</option>
              <option>Q2 FY 2026-27</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              STATUS STAGE
            </label>
            <select className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-hidden focus:border-slate-500">
              <option>All (Verified)</option>
              <option>Pending Verification</option>
              <option>Settled</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              CASH DIRECTION
            </label>
            <select 
              value={cashDirection}
              onChange={(e) => setCashDirection(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-hidden focus:border-slate-500"
            >
              <option value="all">All (Credit &amp; Debit)</option>
              <option value="credit">Credit Inflow (Escrow Deposit)</option>
              <option value="debit">Debit Outflow (Disbursements)</option>
            </select>
          </div>
        </div>

        {/* Sub-bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[11px]">
            <span>Active Escrow Cap: <strong className="text-slate-700">₹150.00 Cr</strong></span>
            <span>•</span>
            <span>SLA Turnaround: <strong className="text-slate-700">1.8 days avg</strong></span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">✓ Sec 77(2) Reserve Allocation compliant</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Filters reset')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-300 rounded text-xs font-semibold hover:bg-slate-50"
            >
              Reset Filters
            </button>
            <button
              onClick={() => onShowToast('Filters applied')}
              className="px-3 py-1 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded text-xs font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">TOTAL ESCROW CREDITS</span>
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            ₹140.00 <span className="text-xs font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 mt-1.5">
            <span>2 Statutory Tranches</span>
            <span>•</span>
            <span className="font-semibold">100% Reconciled</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">TOTAL DISBURSEMENTS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            ₹93.72 <span className="text-xs font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1.5">
            <span>26 Payment Orders</span>
            <span>•</span>
            <span>66.94% Utilized</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">AVAILABLE ESCROW LIQUIDITY</span>
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            ₹46.28 <span className="text-xs font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 mt-2">
            <div className="h-full bg-slate-900 rounded-full" style={{ width: '33.05%' }} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">STATUTORY ESCROW HEALTH</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-sans">
            AUDIT CLEAN
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1.5">
            <span>1 Pending PFMS Batch</span>
            <span>•</span>
            <span className="font-semibold text-slate-700">DSC Auto-Signed</span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Left Table & Right Inspected Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Master Financial Ledger (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-lg shadow-2xs flex flex-col justify-between overflow-hidden">
          <div>
            <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Master Financial Ledger
                </h3>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  BATCH FY 2026-Q2
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Showing records 1 - 6</span>
                <span>•</span>
                <span className="font-semibold text-slate-700">Sort: Descending (Date)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-600 font-bold border-b border-slate-200 text-[10px] tracking-wider uppercase">
                    <th className="py-2.5 px-3">TXN ID</th>
                    <th className="py-2.5 px-3">DATE &amp; TIME</th>
                    <th className="py-2.5 px-3">TYPE</th>
                    <th className="py-2.5 px-3">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {transactions.map((t) => {
                    const isSelected = t.id === selectedTxnId;
                    return (
                      <tr 
                        key={t.id} 
                        onClick={() => setSelectedTxnId(t.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-sky-50/80 border-l-4 border-l-[#0a2540]' 
                            : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-slate-900 text-[11px] whitespace-nowrap">
                          {t.id}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {t.dateTime}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {t.typeBadge === 'amber' ? (
                            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                              {t.type}
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                              {t.type}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-xs line-clamp-2 max-w-xs">
                          {t.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer of Table */}
          <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ledger immutable seal: Cryptographically anchored on National e-Governance Ledger</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-500 hover:bg-slate-50 text-xs">
                &lt;
              </button>
              <button className="px-2.5 py-1 rounded bg-[#0a2540] text-white font-bold text-xs">
                1
              </button>
              <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 text-xs">
                2
              </button>
              <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 text-xs">
                3
              </button>
              <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-500 hover:bg-slate-50 text-xs">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Inspected Transaction & Audit Trail (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Inspected Transaction Card */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    INSPECTED TRANSACTION
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    {selectedTxn.id}
                  </span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                selectedTxn.direction === 'credit'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {selectedTxn.direction === 'credit' ? 'CREDIT INFLOW' : 'DEBIT OUTFLOW'}
              </span>
            </div>

            {/* Statutory Value Large Callout */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                STATUTORY VALUE
              </span>
              <div className={`text-2xl font-bold font-mono ${
                selectedTxn.direction === 'credit' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {selectedTxn.value}
              </div>
            </div>

            {/* Particulars */}
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  LEGAL PURPOSE / STATUTORY HEAD
                </span>
                <span className="font-semibold text-slate-800 text-xs">
                  {selectedTxn.head}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    ORIGIN SOURCE
                  </span>
                  <span className="font-mono text-[11px] text-slate-700 block truncate">
                    {selectedTxn.origin}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    BENEFICIARY TARGET
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px] block truncate">
                    {selectedTxn.beneficiary}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    BANK UTR / REFERENCE
                  </span>
                  <span className="font-mono text-[11px] text-slate-800 font-bold block truncate">
                    {selectedTxn.utr}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    PFMS SCROLL ID
                  </span>
                  <span className="font-mono text-[11px] text-slate-700 block truncate">
                    {selectedTxn.pfmsScroll}
                  </span>
                </div>
              </div>

              {/* Statutory Verification Seal */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded p-2.5 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedTxn.dscSigner}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-800">
                  {selectedTxn.dscDetails}
                </div>
              </div>

              {/* Attachment Preview */}
              <div className="border border-slate-200 rounded p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-500" />
                  <div>
                    <span className="font-semibold text-slate-800 block text-[11px]">
                      {selectedTxn.attachment}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Size: {selectedTxn.attachmentSize}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onShowToast(`Previewing voucher ${selectedTxn.attachment}`)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-2 py-1 rounded bg-slate-50 hover:bg-slate-100"
                >
                  Preview
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => onShowToast(`Downloading Voucher PDF for ${selectedTxn.id}...`)}
                className="w-full py-2 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Statutory Voucher PDF</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onNavigateTab('compensation-disbursement')}
                  className="py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Beneficiary List</span>
                </button>
                <button
                  onClick={() => onShowToast(`Raised audit query for ${selectedTxn.id}`)}
                  className="py-1.5 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 rounded text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <BadgeAlert className="w-3.5 h-3.5 text-rose-500" />
                  <span>Audit Query</span>
                </button>
              </div>
            </div>
          </div>

          {/* Ledger Audit Trail Card */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-slate-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  LEDGER AUDIT TRAIL
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Vol: 28 TXNs</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Recorded Credits</span>
                <span className="font-mono font-bold text-slate-900">₹140.00 Cr</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Debits Settled</span>
                <span className="font-mono font-bold text-rose-600">₹93.72 Cr</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-800">Net Unencumbered Balance</span>
                <span className="font-mono font-bold text-emerald-600">₹46.28 Cr</span>
              </div>
            </div>

            {/* Pending Webhook Clearance Alert */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded p-2.5 text-xs space-y-1">
              <div className="font-bold text-amber-900 text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>PENDING WEBHOOK CLEARANCE (1)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-snug">
                Batch 44 ex-gratia awaiting PFMS direct-credit acknowledgment. Timeout in 3h 12m.
              </p>
              <button 
                onClick={() => onShowToast('Triggering force ping to State Treasury Gateway...')}
                className="text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1"
              >
                <span>Force Ping Treasury Gateway</span>
                <span>→</span>
              </button>
            </div>

            {/* Real-time Statutory Events */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                REAL-TIME STATUTORY EVENTS
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Disbursement Batch 4 Released</span>
                      <span className="font-mono text-[10px] text-slate-400">11:20:18</span>
                    </div>
                    <p className="text-[10px] text-slate-500">e-Sign DSC authenticated by SLAO Sanand</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">PFMS Scroll Acknowledged</span>
                      <span className="font-mono text-[10px] text-slate-400">11:22:04</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Bank UTR SBIN2026091448 generated</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">SIA Invoice Audit Closed</span>
                      <span className="font-mono text-[10px] text-slate-400">Yesterday</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Settled through PIU Director authorization</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <button 
                onClick={() => onShowToast('Opening Full CAG Audit Log...')}
                className="text-slate-700 font-semibold hover:underline"
              >
                View Full CAG Audit Log
              </button>
              <span className="font-mono text-slate-400">Hash: 8f9a2...3b</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip: Statutory Escrow Flow & Head-Wise Allocation Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Statutory Escrow Flow &amp; Head-Wise Allocation Matrix
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0a2540]" />
              <span className="text-slate-600">Disbursed (₹93.72 Cr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-600">Remaining Escrow (₹46.28 Cr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-600">Unallocated Cap (₹10.00 Cr)</span>
            </div>
          </div>
        </div>

        {/* Stacked Flow Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
          <div className="h-full bg-[#0a2540]" style={{ width: '62.5%' }} title="Disbursed ₹93.72 Cr" />
          <div className="h-full bg-amber-400" style={{ width: '30.8%' }} title="Remaining Escrow ₹46.28 Cr" />
          <div className="h-full bg-slate-200" style={{ width: '6.7%' }} title="Unallocated Cap ₹10.00 Cr" />
        </div>

        {/* 4 Heads Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              SEC 26 LAND SOLATIUM
            </span>
            <div className="text-sm font-bold text-slate-900 font-mono">₹78.60 Cr Settled</div>
            <div className="text-[11px] text-slate-500">84.2% of target awarded</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              R&amp;R SECOND SCHEDULE
            </span>
            <div className="text-sm font-bold text-slate-900 font-mono">₹8.06 Cr Settled</div>
            <div className="text-[11px] text-slate-500">44 Families completed</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              ADMIN &amp; SURVEY EXPENSES
            </span>
            <div className="text-sm font-bold text-slate-900 font-mono">₹7.06 Cr Settled</div>
            <div className="text-[11px] text-slate-500">Within 5% statutory ceiling</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              ESCROW SURPLUS FLOAT
            </span>
            <div className="text-sm font-bold text-emerald-600 font-mono">₹46.28 Cr Available</div>
            <div className="text-[11px] text-slate-500">Yielding SBI Escrow Int.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
