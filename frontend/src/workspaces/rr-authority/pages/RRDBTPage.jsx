import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { pfmsAdapter } from '../services/pfmsAdapter.js';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Download, 
  RefreshCw, 
  FileText, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  Banknote
} from 'lucide-react';

export default function RRDBTPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    dbtRecords, 
    setDbtRecords, 
    families,
    setDocumentModal,
    setESignModal,
    addAuditLog 
  } = useRRAuthority();

  const [filterGrant, setFilterGrant] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  // Stats
  const totalDisbursedInr = (dbtRecords || [])
    .filter(r => r.status === 'CREDITED')
    .reduce((sum, r) => sum + r.amountInr, 0);

  const pendingDisbursementInr = (dbtRecords || [])
    .filter(r => r.status !== 'CREDITED')
    .reduce((sum, r) => sum + r.amountInr, 0);

  const filteredRecords = (dbtRecords || []).filter(r => {
    const matchesGrant = filterGrant === 'ALL' || r.grantCategory === filterGrant;
    const matchesStatus = filterStatus === 'ALL' || r.status === filterStatus;
    return matchesGrant && matchesStatus;
  });

  // Run PFMS Batch Disbursement
  const handleRunBatchDisbursement = () => {
    setESignModal({
      isOpen: true,
      context: {
        title: 'Authorize PFMS Electronic Payment Order (EPO)',
        actionTitle: 'PFMS_EPO_DISBURSEMENT_BATCH_AUTHORIZED',
        entityName: `Project ${selectedProject.code} DBT Batch (₹3.42 Lakhs)`,
        documentName: 'PFMS_SANCTION_SCROLL_OCT_2026.pdf'
      },
      onSignComplete: async (signHash) => {
        setIsProcessingBatch(true);
        setBatchProgress(20);

        setTimeout(() => setBatchProgress(50), 600);
        setTimeout(() => setBatchProgress(80), 1200);

        setTimeout(async () => {
          setBatchProgress(100);
          setIsProcessingBatch(false);

          // Update non-credited records to CREDITED with fresh UTRs
          const updated = dbtRecords.map(r => {
            if (r.status !== 'CREDITED') {
              return {
                ...r,
                status: 'CREDITED',
                utrNumber: `RBI2026${Math.floor(10000000 + Math.random() * 90000000)}`,
                disbursementDate: new Date().toLocaleDateString('en-GB')
              };
            }
            return r;
          });

          setDbtRecords(updated);

          addAuditLog(
            'PFMS_DBT_BATCH_CREDITED',
            'PFMS Electronic Payment Order',
            'Status: Pending Push to NPCI',
            `Status: 100% Batched to APB (Hash: ${signHash})`,
            'PFMS_SETTLEMENT_REPORT.pdf'
          );

          alert('PFMS DBT Batch executed successfully! NPCI settlement reports confirmed.');
        }, 1800);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Actions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                PFMS Direct Bank Transfer (DBT) Disbursement Desk
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                Aadhaar Payment Bridge (APB)
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Automated electronic payment orders, PFMS sanction rolls, NPCI Aadhaar-mapper verification, and RBI UTR ledger.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'PFMS Sanction Scroll & Bank Scroll Summary',
                    code: 'PFMS-SCROLL-2026-0922.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sanction Scroll</span>
            </button>

            <button
              onClick={handleRunBatchDisbursement}
              disabled={isProcessingBatch}
              className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>{isProcessingBatch ? `Pushing to PFMS (${batchProgress}%)...` : 'Execute DBT Batch (DSC)'}</span>
            </button>
          </div>
        </div>

        {/* 3. Financial Metrics & Gateways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Total Disbursed (Credited)</span>
            <div className="text-xl font-bold font-mono text-emerald-700">
              ₹{(totalDisbursedInr / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[10px] text-emerald-800 font-sans">Settled via RBI / NEFT / APB</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Pending Disbursement Queue</span>
            <div className="text-xl font-bold font-mono text-amber-600">
              ₹{(pendingDisbursementInr / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[10px] text-amber-800 font-sans">Ready for EPO Transmission</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">NPCI Mapper Seeding Status</span>
            <div className="text-xl font-bold font-mono text-[#1B365D]">98.4% Seeded</div>
            <div className="text-[10px] text-slate-500 font-sans">Aadhaar Enabled Accounts</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">PFMS Protocol Status</span>
            <div className="text-xs font-bold text-emerald-700 leading-tight">PFMS-DBT-2.0 Active</div>
            <div className="text-[10px] text-slate-500 font-mono">Token: VALID (Secured VPN)</div>
          </div>
        </div>

        {/* 4. Filter & Search Controls */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-semibold text-xs">Filter by Grant:</span>
            <select
              value={filterGrant}
              onChange={(e) => setFilterGrant(e.target.value)}
              className="py-1 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Statutory Grants</option>
              <option value="Resettlement Allowance">Resettlement Allowance (₹50,000)</option>
              <option value="Transportation Cost Allowance">Transportation Cost (₹50,000)</option>
              <option value="Subsistence Allowance (First Tranche)">Subsistence Allowance (₹36,000)</option>
              <option value="Cattle Shed Construction Grant">Cattle Shed Grant (₹25,000)</option>
              <option value="Artisan / Trader One-Time Grant">Artisan / Trader Grant (₹25,000)</option>
            </select>

            <span className="text-slate-500 font-semibold text-xs ml-2">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-1 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Statuses</option>
              <option value="CREDITED">CREDITED</option>
              <option value="INITIATED">INITIATED</option>
            </select>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Total {filteredRecords.length} Electronic Payment Orders in Current Ledger
          </div>
        </div>

        {/* 5. DBT Transactions Ledger Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#1B365D]" />
              <span>STATUTORY SECOND SCHEDULE DIRECT BANK DISBURSEMENTS (PFMS / APB ROLL)</span>
            </div>

            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Exported PFMS Payment Scroll (CSV/PDF)',
                    code: 'PFMS_EXPORT_ALL.csv'
                  }
                });
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded border border-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Export DBT Scroll</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100 text-[10px] text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Txn ID / EPO Ref</th>
                  <th className="p-2.5">Beneficiary &amp; Family ID</th>
                  <th className="p-2.5">Statutory Grant Category</th>
                  <th className="p-2.5">Amount (INR)</th>
                  <th className="p-2.5">Bank &amp; Account</th>
                  <th className="p-2.5">RBI UTR Number</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(filteredRecords || []).map((r) => (
                  <tr key={r.transactionId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#1B365D]">
                      {r.transactionId}
                      <div className="text-[10px] text-slate-400 font-normal">{r.pfmsBatchId}</div>
                    </td>

                    <td className="p-2.5 font-sans">
                      <div className="font-semibold text-slate-900">{r.beneficiaryName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{r.familyId}</div>
                    </td>

                    <td className="p-2.5 font-sans text-slate-800">
                      {r.grantCategory}
                    </td>

                    <td className="p-2.5 font-bold text-slate-900">
                      ₹{r.amountInr.toLocaleString()}
                    </td>

                    <td className="p-2.5 text-slate-700">
                      <div>{r.bankName}</div>
                      <div className="text-[10px] text-slate-400">{r.accountMasked} ({r.ifsc})</div>
                    </td>

                    <td className="p-2.5 text-slate-600 font-bold">
                      {r.utrNumber}
                    </td>

                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === 'CREDITED' 
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {r.status}
                      </span>
                    </td>

                    <td className="p-2.5 text-slate-500">
                      {r.disbursementDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
