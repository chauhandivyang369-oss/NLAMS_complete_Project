import React from 'react';
import { 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Upload, 
  ExternalLink, 
  FileCheck2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalFinancialEscrowTab() {
  const { showToast, setActiveModule } = useWorkspace();

  const transactions = [
    {
      ref: 'TXN-NLAMS-ESC-00126',
      date: '13 Sep 2026, 16:40',
      purpose: 'Tranche 2 CALA Compensation',
      recipient: 'CALA Ahmedabad Escrow A/C',
      amount: '₹42,50,00,000',
      mode: 'RTGS Treasury',
      utr: 'SBI-UTR-99120934',
      status: 'SETTLED'
    },
    {
      ref: 'TXN-NLAMS-ESC-00125',
      date: '11 Sep 2026, 11:20',
      purpose: 'Landowner Direct DBT Batch #14',
      recipient: '42 Landholders (Sanand Rural)',
      amount: '₹3,18,50,000',
      mode: 'PFMS APBS',
      utr: 'PFMS-2026-88129',
      status: 'CREDITED'
    },
    {
      ref: 'TXN-NLAMS-ESC-00119',
      date: '28 Aug 2026, 14:15',
      purpose: 'Establishment Charges (5%)',
      recipient: 'Gujarat State Revenue Dept',
      amount: '₹9,32,00,000',
      mode: 'Treasury Transfer',
      utr: 'TR-GJ-REV-4401',
      status: 'SETTLED'
    },
    {
      ref: 'TXN-NLAMS-ESC-00112',
      date: '14 Aug 2026, 09:30',
      purpose: 'Landowner Direct DBT Batch #13',
      recipient: '118 Landholders (Bavla Sector)',
      amount: '₹8,45,20,000',
      mode: 'PFMS APBS',
      utr: 'PFMS-2026-77180',
      status: 'CREDITED'
    },
    {
      ref: 'TXN-NLAMS-ESC-00101',
      date: '04 Jun 2026, 10:00',
      purpose: 'SIA Study Deposit',
      recipient: 'State SIA Directorate SPIPA',
      amount: '₹2,40,00,000',
      mode: 'NEFT Corporate',
      utr: 'SBI/RB/2025/9981',
      status: 'SETTLED'
    }
  ];

  return (
    <div className="flex flex-col xl:flex-row">
      
      {/* Main Content */}
      <div className="flex-1 p-5 space-y-5">
        
        {/* Top PFMS Gateway Sync Banner */}
        <div className="bg-[#0b1b36] text-white p-3.5 rounded-lg shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Public Financial Management System (PFMS) Gateway: Live Sync
              </h3>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              SBI Central Escrow A/C #0098231002931 • Real-time DBT Settlement &amp; Sanction Tracking
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
              PFMS Status: ACTIVE
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
              Treasury Code: GJ-REV-0412
            </span>
            <span className="bg-blue-900/60 text-blue-200 border border-blue-700 px-2 py-0.5 rounded font-bold">
              PFMS Settlement: 99.4%
            </span>
          </div>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ACQUISITION BUDGET</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">₹186.40 Cr</div>
            <div className="text-[10px] text-slate-500">Total Sanctioned Approved</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SIA STUDY DEPOSIT</div>
            <div className="text-xl font-bold text-emerald-700 font-sans mt-0.5">₹2.40 Cr</div>
            <div className="text-[10px] text-emerald-600 font-medium">100% Cleared via SBI</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ESTABLISHMENT FEE</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">₹9.32 Cr</div>
            <div className="text-[10px] text-slate-500">5% State Admin Charge</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CALA ESCROW DEPOSIT</div>
            <div className="text-xl font-bold text-blue-700 font-sans mt-0.5">₹174.68 Cr</div>
            <div className="text-[10px] text-slate-500">Allocated for Compensation</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">DISBURSED VIA PFMS</div>
            <div className="text-xl font-bold text-emerald-700 font-sans mt-0.5">₹128.40 Cr</div>
            <div className="text-[10px] text-emerald-600 font-medium">73.5% (1,721 DBT Done)</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">REMAINING BALANCE</div>
            <div className="text-xl font-bold text-amber-700 font-sans mt-0.5">₹46.28 Cr</div>
            <div className="text-[10px] text-slate-500">Sec 23 Awards Reconcil.</div>
          </div>

        </div>

        {/* Escrow Liquidity Distribution Bar & Checkpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Liquidity Breakdown (2 cols) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Escrow Liquidity &amp; Statutory Appropriation Distribution
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">CALA A/C: #0098231002931</span>
            </div>

            {/* Multi-segment Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full" style={{ width: '68.8%' }} title="PFMS Disbursed: ₹128.40 Cr"></div>
                <div className="bg-amber-500 h-full" style={{ width: '24.8%' }} title="Escrow Balance: ₹46.28 Cr"></div>
                <div className="bg-blue-600 h-full" style={{ width: '5.0%' }} title="Admin Fee: ₹9.32 Cr"></div>
                <div className="bg-amber-300 h-full" style={{ width: '1.4%' }} title="SIA Remittance: ₹2.40 Cr"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <div>
                    <div className="text-slate-500 text-[10px]">PFMS Disbursed</div>
                    <div className="font-bold text-slate-900">₹128.40 Cr (68.8%)</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <div>
                    <div className="text-slate-500 text-[10px]">Escrow Balance</div>
                    <div className="font-bold text-slate-900">₹46.28 Cr (24.8%)</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <div>
                    <div className="text-slate-500 text-[10px]">Admin Fee (5%)</div>
                    <div className="font-bold text-slate-900">₹9.32 Cr (5.0%)</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
                  <div>
                    <div className="text-slate-500 text-[10px]">SIA Remittance</div>
                    <div className="font-bold text-slate-900">₹2.40 Cr (1.4%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
              <button 
                onClick={() => setActiveModule('escrow-ledger')}
                className="bg-[#0b1b36] hover:bg-[#182d52] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Receipt className="w-3.5 h-3.5 text-amber-400" />
                <span>View Full Escrow Ledger</span>
              </button>

              <button 
                onClick={() => showToast('Opening e-Challan payment evidence uploader')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload Payment Evidence (e-Challan)</span>
              </button>

              <button 
                onClick={() => showToast('Connecting to PFMS central batch settlement API')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                <span>View PFMS Batch Status</span>
              </button>

              <button 
                onClick={() => showToast('Exporting Financial Reconciliation Statement (Excel)...')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Financial Reconciliation Statement</span>
              </button>
            </div>

          </div>

          {/* Statutory Escrow Checkpoints (1 col) */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                MANDATORY STATUTORY ESCROW CHECKPOINTS
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                AUDIT COMPLIANT
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">1. SIA Cost Deposit</span>
                  <span className="text-[10px] font-bold text-emerald-700">VERIFIED</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                  UTR: SBI/RB/2025/9981 • ₹2.40 Cr
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">2. Establishment Fee</span>
                  <span className="text-[10px] font-bold text-emerald-700">RECORDED</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                  RevDept Order #GJ/LA/510 • ₹9.32 Cr
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">3. Award &amp; Solatium Deposit</span>
                  <span className="text-[10px] font-bold text-amber-700">PARTIALLY DEPOSITED</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Tranches: 2 of 3 Allocated, Tranche 3 Under Proc
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">4. PFMS / DBT Integration</span>
                  <span className="text-[10px] font-bold text-blue-700">IN PROGRESS</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  1,721 Beneficiaries Paid, 219 Seeding Pending
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Treasury & Escrow Ledger Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Statutory Treasury &amp; Escrow Ledger
              </h3>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                Live PFMS Feed
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Showing 5 Most Recent Requisition Disbursals
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b1b36] text-white text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-mono">TRANSACTION REF</th>
                  <th className="py-2.5 px-4">DATE &amp; TIME (IST)</th>
                  <th className="py-2.5 px-4">HEAD OF ACCOUNT / PURPOSE</th>
                  <th className="py-2.5 px-4">BENEFICIARY / RECIPIENT</th>
                  <th className="py-2.5 px-4">AMOUNT (INR)</th>
                  <th className="py-2.5 px-4">PAYMENT MODE</th>
                  <th className="py-2.5 px-4 font-mono">UTR / CHALLAN NO.</th>
                  <th className="py-2.5 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{t.ref}</td>
                    <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">{t.date}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">{t.purpose}</td>
                    <td className="py-2.5 px-4 text-slate-600">{t.recipient}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 font-sans">{t.amount}</td>
                    <td className="py-2.5 px-4 text-slate-600">{t.mode}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">{t.utr}</td>
                    <td className="py-2.5 px-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Sidebar for Financial */}
      <div className="w-full xl:w-[320px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-4 space-y-4 shrink-0 shadow-xs text-slate-800">
        
        {/* Action Required */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Action Required</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 rounded">1 Pending</span>
          </div>

          <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
            <div className="font-bold text-amber-950 text-[11px]">1 Pending Escrow Tranche Confirmation</div>
            <p className="text-[10px] text-amber-900 leading-snug">
              State Treasury reconciliation pending for Tranche 2 ₹65.78 Cr. Treasury Ref: TR-GJ-2026-901, Age: 4 Days.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button 
                onClick={() => showToast('Initialising Digital Signature for Treasury Release...')}
                className="bg-[#0b1b36] hover:bg-[#16294a] text-white px-2 py-1 rounded text-[10px] font-semibold"
              >
                Authorize &amp; e-Sign
              </button>
              <button 
                onClick={() => showToast('Opening Treasury Voucher Details')}
                className="text-slate-600 hover:text-slate-800 text-[10px] underline"
              >
                Details
              </button>
            </div>
          </div>
        </div>

        {/* RFCTLARR Statutory Stage */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              RFCTLARR Statutory Stage
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Stage 5 of 8</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">SIA Appraisal Deposit</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">100% Cleared</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Administration Fee (5%)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">Settled</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">CALA Escrow Tranche-1</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">Disbursed</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">CALA Escrow Tranche-2</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 rounded">Reconciliation</span>
            </div>
          </div>
        </div>

        {/* Cryptographic Audit Stream */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Cryptographic Audit Stream
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div>
              <div className="font-mono text-[10px] text-blue-700 font-bold">PFMS_GATEWAY_SYNC</div>
              <div className="text-[10px] text-slate-600">Ack Batch #88129 validated by NPCI APBS</div>
              <div className="text-[9px] text-slate-400">14 Sep 2026, 14:15 IST</div>
            </div>

            <div>
              <div className="font-mono text-[10px] text-slate-700 font-bold">ESCROW_RECON_INIT</div>
              <div className="text-[10px] text-slate-600">Automated daily ledger balance matched with SBI treasury</div>
              <div className="text-[9px] text-slate-400">14 Sep 2026, 11:30 IST</div>
            </div>

            <div>
              <div className="font-mono text-[10px] text-slate-700 font-bold">CHALLAN_MATCHED</div>
              <div className="text-[10px] text-slate-600">Challan GRN-GJ-2026-9022 verified with e-Treasury</div>
              <div className="text-[9px] text-slate-400">13 Sep 2026, 16:45 IST</div>
            </div>
          </div>

          <button 
            onClick={() => showToast('Opening immutable forensic log vault')}
            className="w-full text-center text-xs font-semibold text-blue-700 hover:text-blue-800 pt-2 border-t border-slate-100 flex items-center justify-center gap-1"
          >
            <span>OPEN FULL STATUTORY LOG VAULT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
