import React, { useState } from 'react';
import { 
  Banknote, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Landmark, 
  RotateCcw, 
  Download, 
  RefreshCw, 
  Filter, 
  Search, 
  FileText, 
  ExternalLink, 
  Eye, 
  Send, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  Scale,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import FinancialEscrowSubNav from './FinancialEscrowSubNav.jsx';

export default function CompensationDisbursementView({ onNavigateTab, onShowToast }) {
  const [district, setDistrict] = useState('Ahmedabad');
  const [selectedCaseId, setSelectedCaseId] = useState('CASE-AMD-2026-0814');

  const cases = [
    {
      id: 'CASE-AMD-2026-0812',
      district: 'Ahmedabad / Sanand',
      village: 'Sanand Rural',
      category: 'Agriculture Multi-Crop',
      award: '42,50,000',
      status: 'Disbursed',
      statusType: 'green',
      beneficiary: 'Shri Rameshwar Patel',
      khata: 'Khata No: 312/1 • Survey: 18/4',
      allocation: '₹42,50,000',
      reason: 'Direct DBT transfer completed to Aadhaar linked account.'
    },
    {
      id: 'CASE-AMD-2026-0813',
      district: 'Ahmedabad / Sanand',
      village: 'Sanand Rural',
      category: 'Joint Title (3 Owners)',
      award: '88,00,000',
      status: 'In Process',
      statusType: 'blue',
      beneficiary: 'Smt. Kamlaben & Brothers',
      khata: 'Khata No: 401/C • Survey: 18/9',
      allocation: '₹88,00,000',
      reason: 'Apportionment deed submitted, pending joint biometric e-sign.'
    },
    {
      id: 'CASE-AMD-2026-0814',
      district: 'Ahmedabad / Sanand',
      village: 'Sanand Rural',
      category: 'Disputed / Injunction',
      award: '65,00,000',
      status: 'On Hold (Stay)',
      statusType: 'red',
      beneficiary: 'Shri P. K. Patel & Co-sharers',
      khata: 'Khata No: 482/A • Survey: 19/2',
      allocation: '₹65,00,000',
      reason: 'Status quo order issued by District Civil Court (Memo Ref: DCC/SAN/2026/891 dated 08 Sep).'
    },
    {
      id: 'CASE-MEH-2026-0419',
      district: 'Mehsana / Kadi',
      village: 'Kadi West',
      category: 'Single Crop Irrigated',
      award: '31,20,000',
      status: 'Disbursed',
      statusType: 'green',
      beneficiary: 'Shri Dashrathbhai Thakor',
      khata: 'Khata No: 204/B • Survey: 104/1',
      allocation: '₹31,20,000',
      reason: 'Disbursed via PFMS credit batch #09.'
    },
    {
      id: 'CASE-MEH-2026-0420',
      district: 'Mehsana / Kadi',
      village: 'Kadi West',
      category: 'Agro-Forestry Assets',
      award: '18,40,000',
      status: 'In Process',
      statusType: 'blue',
      beneficiary: 'Shri Kanubhai Prajapati',
      khata: 'Khata No: 205/A • Survey: 104/2',
      allocation: '₹18,40,000',
      reason: 'Tree valuation certificate validated by DFO Mehsana.'
    },
    {
      id: 'CASE-PAT-2026-0104',
      district: 'Patan / Sidhpur',
      village: 'Sidhpur Extn',
      category: 'Commercial Godown Plinth',
      award: '95,00,000',
      status: 'Disbursed',
      statusType: 'green',
      beneficiary: 'M/s Sidhpur Warehousing Corp',
      khata: 'Khata No: 911/X • Survey: 220/3',
      allocation: '₹95,00,000',
      reason: 'Structural compensation settled as per PWD rates schedule.'
    }
  ];

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[2];

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
            <span className="text-slate-800 font-semibold">Compensation &amp; Disbursement</span>
          </div>

          <div className="text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
            PROPOSAL REF: <strong className="text-slate-900">NLAMS-RB-2026-00124</strong>
          </div>
        </div>

        {/* Title and Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Compensation &amp; Disbursement Monitoring
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time tracking of CALA disbursement batches, PFMS bank integration, and DBT beneficiary payout progress.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onShowToast('Exporting PFMS Batch CSV...')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>PFMS Batch CSV</span>
            </button>
            <button
              onClick={() => onShowToast('Re-syncing with National Public Gateway...')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-Sync Public Gateway</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Tab Sub Navigation */}
      <FinancialEscrowSubNav activeTab="compensation-disbursement" setActiveTab={onNavigateTab} />

      {/* GOVERNMENT MONITORING NOTICE */}
      <div className="bg-amber-50/70 border-l-4 border-l-amber-500 border-y border-r border-amber-200/80 p-3 rounded-r-lg flex items-start gap-2.5 text-xs text-amber-950">
        <Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold text-amber-900">GOVERNMENT MONITORING NOTICE:</strong> Requisitioning Body monitors financial execution and funds escrow accounts. Statutory award determination and beneficiary apportionment are exclusively adjudicated by the Competent Authority (CALA / District Collector) in accordance with RFCTLARR Act statutory mandate.
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">TOTAL PROVISION</span>
            <Landmark className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            ₹174.68 <span className="text-xs font-semibold text-slate-600 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            100% Escrow Deposited
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">DISBURSED TO DATE</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600 font-mono">
            ₹84.40 <span className="text-xs font-semibold text-emerald-700 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            <strong className="text-slate-800">48.3%</strong> of committed sum credited
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">IN PROCESS (CALA / BANK)</span>
            <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-sky-700 font-mono">
            ₹43.88 <span className="text-xs font-semibold text-sky-800 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            14 validation batches active
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">EXCEPTIONS / ON HOLD</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-600 font-mono">
            ₹6.40 <span className="text-xs font-semibold text-rose-700 font-sans">Cr</span>
          </div>
          <div className="text-[11px] text-rose-700 mt-1.5 font-semibold">
            3 Judicial Stays • Retained in sub-pool
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">DISTRICT:</span>
            <select 
              value={district} 
              onChange={(e) => setDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 font-semibold"
            >
              <option>Ahmedabad</option>
              <option>Mehsana</option>
              <option>Patan</option>
              <option>Banaskantha</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">VILLAGE:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900">
              <option>All Villages</option>
              <option>Sanand Rural</option>
              <option>Kadi West</option>
              <option>Sidhpur Extn</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">CATEGORY:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900">
              <option>All Categories</option>
              <option>Agriculture Multi-Crop</option>
              <option>Joint Title</option>
              <option>Disputed / Injunction</option>
              <option>Commercial</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">PAYMENT STATUS:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900">
              <option>All Payment Statuses</option>
              <option>Disbursed</option>
              <option>In Process</option>
              <option>On Hold (Stay)</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => onShowToast('Filters reset')}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 border border-slate-300 rounded px-2.5 py-1 text-xs hover:bg-slate-50"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* 2-Column Split: Registry Table (Left) + Progress Gauge & Quicklinks (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Registry Table & Dossier (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Compensation Disbursement Registry */}
          <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Compensation Disbursement Registry
                </h3>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">
                  6 shown of 5,420 entries
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>AUTO-SYNC: PFMS 10m ago</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-600 font-bold border-b border-slate-200 text-[10px] tracking-wider uppercase">
                    <th className="py-2.5 px-3">DISTRICT &amp; TEHSIL</th>
                    <th className="py-2.5 px-3">VILLAGE</th>
                    <th className="py-2.5 px-3">CASE / KHATA REF</th>
                    <th className="py-2.5 px-3">CATEGORY</th>
                    <th className="py-2.5 px-3 text-right">AWARD (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {cases.map((item) => {
                    const isSelected = item.id === selectedCaseId;
                    return (
                      <tr 
                        key={item.id} 
                        onClick={() => setSelectedCaseId(item.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-sky-50/80 border-l-4 border-l-[#0a2540]' 
                            : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          {item.district}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {item.village}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                          {item.id}
                        </td>
                        <td className="py-3 px-3">
                          {item.statusType === 'red' ? (
                            <span className="font-bold text-rose-600">
                              {item.category}
                            </span>
                          ) : (
                            <span className="text-slate-700">
                              {item.category}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {item.award}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-600">
                Showing records 1 - 6 of 5,420
              </span>
              <div className="flex items-center gap-1 text-slate-700 font-medium">
                <button className="p-1 hover:bg-slate-200 rounded">&lt;</button>
                <span>Page 1 of 904</span>
                <button className="p-1 hover:bg-slate-200 rounded">&gt;</button>
              </div>
            </div>
          </div>

          {/* Inspection Dossier: Selected Case (Default: CASE-AMD-2026-0814) */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-slate-700" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Inspection Dossier: Case #{selectedCase.id}
                </h4>
              </div>

              {selectedCase.statusType === 'red' ? (
                <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  TEMPORARY JUDICIAL STAY
                </span>
              ) : (
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {selectedCase.status}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  REGISTERED BENEFICIARY
                </span>
                <div className="font-bold text-slate-900">{selectedCase.beneficiary}</div>
                <div className="text-[11px] text-slate-500 font-mono">{selectedCase.khata}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  ESCROW SUB-POOL ALLOCATION
                </span>
                <div className="text-base font-bold text-slate-900 font-mono">{selectedCase.allocation}</div>
                <div className="text-[11px] text-slate-500">Retained in CALA interest-bearing pool</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  REASON FOR DISBURSEMENT HOLD
                </span>
                <div className={`text-[11px] font-semibold ${selectedCase.statusType === 'red' ? 'text-rose-700' : 'text-slate-800'}`}>
                  {selectedCase.reason}
                </div>
              </div>
            </div>

            {/* Bottom Actions of Dossier */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Requisitioning Body mandatory action required to avoid project corridor delay.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast(`Downloading court memo for ${selectedCase.id}...`)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Court Memo</span>
                </button>
                <button
                  onClick={() => onShowToast(`Composing legal query to CALA regarding ${selectedCase.id}...`)}
                  className="px-3.5 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Legal Query to CALA</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Progress Gauge & Quicklinks (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Disbursement Progress Card with Donut Chart */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Disbursement Progress
              </h4>
              <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded text-[10px] font-bold">
                31.7% Complete
              </span>
            </div>

            {/* Circular Donut Visual */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Circle (31.7%) */}
                  <path
                    className="text-[#0a2540]"
                    strokeDasharray="31.7, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                {/* Center Content */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold font-mono text-slate-900">1,721</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DISBURSED</span>
                </div>
              </div>

              {/* Stats beneath circle */}
              <div className="w-full space-y-1.5 pt-3 border-t border-slate-100 text-xs mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Disbursed Titleholders:</span>
                  <span className="font-mono font-bold text-slate-900">1,721</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Target Holders:</span>
                  <span className="font-mono font-semibold text-slate-700">5,420</span>
                </div>
                <div className="text-[11px] text-slate-400 text-center pt-1">
                  Target completion Dec 2026
                </div>
              </div>
            </div>
          </div>

          {/* PFMS GATEWAY TURNAROUND */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  PFMS GATEWAY TURNAROUND
                </span>
                <span className="text-sm font-bold text-slate-900">4.2 Business Days</span>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
              OPTIMAL
            </span>
          </div>

          {/* SLA PRIORITY FLAG Card */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-lg p-3.5 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>SLA PRIORITY FLAG</span>
            </div>
            <div className="font-semibold text-rose-900 text-xs">
              3 stayed cases
            </div>
            <p className="text-[11px] text-rose-800 leading-snug">
              currently require Requisitioning Body legal counter-affidavit filing before High Court vacation bench to release frozen corridor alignment.
            </p>
            <button
              onClick={() => onShowToast('Navigating to Legal Response Desk...')}
              className="text-xs font-bold text-rose-900 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Open Legal Response Desk</span>
              <span>→</span>
            </button>
          </div>

          {/* SETTLEMENT PROTOCOL QUICKLINKS */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              SETTLEMENT PROTOCOL QUICKLINKS
            </h4>

            <div className="space-y-2.5 text-xs">
              <div 
                onClick={() => onShowToast('Opening DBT Aadhaar Seeding Register (98.4% Matched)...')}
                className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span className="font-medium text-slate-800">DBT Aadhaar Seeding Register</span>
                </div>
                <span className="text-[11px] font-semibold text-sky-700">98.4% Matched</span>
              </div>

              <div 
                onClick={() => onShowToast('Opening Bank Reconciliation Ledger...')}
                className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">Bank Reconciliation Ledger (SBI Escrow)</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">Audited</span>
              </div>

              <div 
                onClick={() => onShowToast('Viewing CALA Award Determination Notices...')}
                className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-800">CALA Award Determination Notices</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
