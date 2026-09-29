import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  Search, 
  Download, 
  RotateCcw, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Link as LinkIcon, 
  Send, 
  PenTool, 
  ChevronRight, 
  ChevronLeft,
  AlertCircle,
  RefreshCw,
  CornerDownRight
} from 'lucide-react';
import FinancialEscrowSubNav from './FinancialEscrowSubNav.jsx';

export default function ReconciliationAuditView({ onNavigateTab, onShowToast }) {
  const [selectedRef, setSelectedRef] = useState('REC-DISC-003');
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    {
      ref: 'REC-DISC-001',
      ledgerAmt: '14,20,00,000.00',
      sourceAmt: '14,20,00,000.00',
      variance: '0.00',
      varianceType: 'match',
      date: '14 Sep 2026',
      entity: 'SBI CALA Escrow'
    },
    {
      ref: 'REC-DISC-002',
      ledgerAmt: '45,00,00,000.00',
      sourceAmt: '45,00,00,000.00',
      variance: '0.00',
      varianceType: 'match',
      date: '04 Sep 2026',
      entity: 'CyberTreasury GJ'
    },
    {
      ref: 'REC-DISC-003',
      ledgerAmt: '4,66,00,000.00',
      sourceAmt: '4,61,80,000.00',
      variance: '+4,20,000.00',
      varianceType: 'mismatch',
      date: '28 Aug 2026',
      entity: 'SLAO Sanand'
    },
    {
      ref: 'REC-DISC-004',
      ledgerAmt: '8,40,00,000.00',
      sourceAmt: '8,40,00,000.00',
      variance: '0.00',
      varianceType: 'match',
      date: '15 Aug 2026',
      entity: 'SBI CALA Escrow'
    },
    {
      ref: 'REC-DISC-005',
      ledgerAmt: '65,00,000.00',
      sourceAmt: '0.00 (Hold)',
      variance: 'Pending',
      varianceType: 'pending',
      date: '12 Sep 2026',
      entity: 'Sanand Civil Court'
    }
  ];

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
            <span className="text-slate-800 font-semibold">Financial Reconciliation &amp; Verification</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-600 text-[11px]">NLAMS-RB-2026-00124</span>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
              AUDIT ACTIVE
            </span>
          </div>
        </div>

        {/* Title and Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Financial Reconciliation &amp; Statutory Verification
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Cross-matching treasury challans, bank escrow passbook, and CALA disbursement scroll records.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onShowToast('Loading Audit History records...')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-md text-xs font-semibold shadow-2xs transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>Audit History</span>
            </button>
            <button
              onClick={() => onShowToast('Initiating Statutory Sign with DSC token...')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Initiate Statutory Sign</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Tab Sub Navigation */}
      <FinancialEscrowSubNav activeTab="reconciliation-audit" setActiveTab={onNavigateTab} />

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">RECORDS COMPARED</span>
            <FileCheck className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            1,842 <span className="text-xs font-semibold text-slate-600 font-sans">Total Scanned</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            100% Core Scope Analyzed
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">MATCHED &amp; RECONCILED</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600 font-mono">
            1,838 <span className="text-xs font-semibold text-emerald-700 font-sans">(99.8%)</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            PFMS &amp; RBI Core Settlement Verified
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">VARIANCE EXCEPTIONS</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-600 font-mono">
            2 Mismatches <span className="text-xs font-semibold text-rose-700 font-sans">(₹4,20,000)</span>
          </div>
          <div className="text-[11px] text-rose-700 mt-1.5 font-semibold">
            Requires SLAO Administrative Memo
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase">PENDING TREASURY VERIFICATION</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-amber-700 font-mono">
            2 Records <span className="text-xs font-semibold text-amber-800 font-sans">Awaiting Sign</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Inter-account clearing in transit
          </div>
        </div>
      </div>

      {/* 2-Column Split: Left Table & Mismatch Card + Right Audit Authority (8 cols + 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Discrepancy Table + Mismatch Dossier + Audit Cert Status (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Discrepancy & Variance Registry Table */}
          <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Reconciliation Discrepancy &amp; Variance Registry
                </h3>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">
                  5 Active Logs
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter references..."
                    className="pl-8 pr-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden w-40"
                  />
                </div>
                <button
                  onClick={() => onShowToast('Exporting Discrepancy Registry...')}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-300 rounded hover:bg-slate-50"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-600 font-bold border-b border-slate-200 text-[10px] tracking-wider uppercase">
                    <th className="py-2.5 px-3">RECONCILIATION REF</th>
                    <th className="py-2.5 px-3 text-right">LEDGER AMOUNT (₹)</th>
                    <th className="py-2.5 px-3 text-right">SOURCE / TREASURY (₹)</th>
                    <th className="py-2.5 px-3 text-right">VARIANCE (₹)</th>
                    <th className="py-2.5 px-3">TXN DATE</th>
                    <th className="py-2.5 px-3">ENTITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {records.map((r) => {
                    const isSelected = r.ref === selectedRef;
                    return (
                      <tr 
                        key={r.ref} 
                        onClick={() => setSelectedRef(r.ref)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-rose-50/70 border-l-4 border-l-rose-500' 
                            : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-slate-900 flex items-center gap-1.5">
                          {r.varianceType === 'mismatch' && (
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          )}
                          <span>{r.ref}</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-900 font-semibold">
                          {r.ledgerAmt}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {r.sourceAmt}
                        </td>
                        <td className={`py-3 px-3 text-right font-mono font-bold ${
                          r.varianceType === 'mismatch' ? 'text-rose-600' :
                          r.varianceType === 'pending' ? 'text-amber-600' : 'text-slate-400'
                        }`}>
                          {r.variance}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                          {r.date}
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-medium">
                          {r.entity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-600">
                Showing 5 of 1,842 total cross-reconciled records
              </span>
              <div className="flex items-center gap-2">
                <button className="text-slate-500 hover:text-slate-900 text-xs">Previous</button>
                <button className="text-slate-700 hover:text-slate-900 text-xs font-bold">Next</button>
              </div>
            </div>
          </div>

          {/* Mismatch Detected Dossier (Selected: REC-DISC-003) */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Mismatch Detected: Reconciliation Ref #{selectedRef}
                </h4>
              </div>
              <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">
                AUDIT VARIANCE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1 bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  REQUISITIONING REMITTANCE
                </span>
                <div className="text-base font-bold text-slate-900 font-mono">₹4,66,00,000.00</div>
                <div className="text-[11px] text-slate-500 font-mono">Challan Ref: GoG-CH-2026-98112</div>
              </div>

              <div className="space-y-1 bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  SANAND TEHSIL CLAIM VOUCHER
                </span>
                <div className="text-base font-bold text-slate-900 font-mono">₹4,61,80,000.00</div>
                <div className="text-[11px] text-slate-500 font-mono">Voucher Ref: ADM/EST/SAN/401</div>
              </div>

              <div className="space-y-1 bg-rose-50/60 p-2.5 rounded border border-rose-200/80">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                  NET EXCESSIVE REMITTANCE
                </span>
                <div className="text-base font-bold text-rose-600 font-mono">+₹4,20,000.00</div>
                <div className="text-[11px] text-rose-800">Unmatched surplus in SLAO Holding Pool</div>
              </div>
            </div>

            {/* Commentary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1">
              <span className="font-bold text-slate-800 block">
                Statutory Auditor Commentary &amp; Root Cause:
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Requisitioning Body remittance of ₹4,66,00,000 for administrative charges exceeds the Tehsil Sanand assessed claim voucher of ₹4,61,80,000 by ₹4,20,000 due to revised 5% formula adjustments applied retrospectively under Section 19(1) schedule norms.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast('Attaching official Correction Memo...')}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Attach Correction Memo</span>
                </button>
                <button
                  onClick={() => onShowToast('Initiated refund request back to project escrow pool...')}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Request Refund to Escrow Pool</span>
                </button>
              </div>

              <button
                onClick={() => onShowToast('Marked REC-DISC-003 as Reconciled with Statutory Note')}
                className="px-3.5 py-1.5 bg-[#0a2540] hover:bg-[#071a2e] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark as Reconciled with Note</span>
              </button>
            </div>
          </div>

          {/* Statutory Audit Signature Status Banner */}
          <div className="bg-[#0a2540] text-white rounded-lg p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                  CONDITIONALLY CERTIFIED
                </span>
                <span className="text-xs text-slate-300">
                  Last Reconciliation Run: 15 Sep 2026, 11:30 IST • Reconciled By: System Automated Rule Engine v4.2 &amp; RB Finance Cell
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                IMMUTABLE INTEGRITY HASH: <span className="text-white font-bold">SHA256-4c91a08e13d5089fec01047db91bc47ef3a0937c89f5</span>
              </div>
            </div>

            <button
              onClick={() => onShowToast('Opening Immutable Audit Ledger Chain view...')}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Audit Ledger Chain</span>
            </button>
          </div>
        </div>

        {/* Right Column: Statutory Financial Audit Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                CONTROLLER OF ACCOUNTS AUDIT
              </h4>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                In 42 Days
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-900 block">
                Mandatory Certification:
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                Sec 19(2) Escrow Certificate Verified by District Treasury Officer. (DTO-GNR-CER-99104 / ACTIVE)
              </p>
            </div>

            {/* AUDIT TRAIL LOG */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                AUDIT TRAIL LOG
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Automated Engine</span>
                      <span className="font-mono text-[10px] text-slate-400">11:30 IST</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Automated rule engine completed 1,842 line comparison.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">CyberTreasury Gujarat</span>
                      <span className="font-mono text-[10px] text-slate-400">09:15 IST</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Transaction log synced from RBI Gov Pool.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">CALA Ledger Feed</span>
                      <span className="font-mono text-[10px] text-slate-400">08:00 IST</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Disbursement scrolls from Sanand Land Acq. Office ingested.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DIGITAL ASSURANCE SEAL */}
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                DIGITAL ASSURANCE SEAL
              </span>
              <div className="font-mono font-bold text-xs text-slate-900">
                NIC-GOV-CERT-2026-X41
              </div>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Class III DSC Signature Applied</span>
              </div>
            </div>

            {/* STATUTORY REQUISITES (RFCTLARR 2013) */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                STATUTORY REQUISITES (RFCTLARR 2013)
              </span>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Sec 77 Deposit Compliance</span>
                  <span className="font-bold text-emerald-700">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Solatium 100% Matching</span>
                  <span className="font-bold text-emerald-700">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Administrative Charge (5%)</span>
                  <span className="font-bold text-amber-700">VARIANCE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Sync cycle operational. System automatically reconciles records on daily treasury closing (18:00 IST).</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onShowToast('Running Full Ledger Re-Sync with RBI & State Treasury...')}
            className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Run Full Ledger Re-Sync</span>
          </button>
          <button
            onClick={() => onShowToast('Exporting Statutory Audit Certificate (PDF)...')}
            className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Audit Certificate (PDF)</span>
          </button>
          <button
            onClick={() => onShowToast('Reconciliation Dossier submitted to District Magistrate.')}
            className="px-4 py-1.5 bg-[#d97706] hover:bg-[#b45309] text-white rounded-md text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit to District Magistrate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
