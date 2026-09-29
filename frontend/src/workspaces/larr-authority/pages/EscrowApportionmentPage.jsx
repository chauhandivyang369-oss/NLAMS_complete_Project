import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  PieChart, 
  Coins, 
  Landmark, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  Percent, 
  Download, 
  Building2,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function EscrowApportionmentPage() {
  const { escrowAccounts, selectedCase, showToast, permissions } = useLarrAuthority();

  // Active Escrow context (defaults to Case 3 or 2 with title contest)
  const activeEscrow = escrowAccounts[0]; // Case LARR/2026/GJ/003

  const [shares, setShares] = useState(activeEscrow.claimantsShares);
  const [activeOutputModal, setActiveOutputModal] = useState(null); // 'DECREE' | 'BANK_AUTH' | 'PFMS'

  // Section 16 Disputed Title Claimant Matrix State
  const [disputedClaimants] = useState([
    {
      claimant: 'Shri Rameshwar Laljibhai Patel',
      claimType: 'Co-Sharer & Cultivating Heir',
      ownershipBasis: 'Registered Will of Late Laljibhai Patel (Doc 441/2012)',
      evidence: 'Pedigree Table / Varsai Extract No. 492 & Revenue 8-A',
      shareClaimed: '50.0%',
      shareAdmitted: '50.0%',
      shareDisputed: '0.0%',
      status: 'Admitted on Oath'
    },
    {
      claimant: 'Smt. Shardaben Laljibhai Patel (Widow)',
      claimType: 'Class-I Statutory Legal Heir',
      ownershipBasis: 'Hindu Succession Act 1956 (Sec 8)',
      evidence: 'Death Certificate, Family Ration Card & RoR 7/12',
      shareClaimed: '25.0%',
      shareAdmitted: '25.0%',
      shareDisputed: '0.0%',
      status: 'Admitted on Oath'
    },
    {
      claimant: 'Shri Dineshbhai Laljibhai Patel (Brother)',
      claimType: 'Disputed Coparcener',
      ownershipBasis: 'Ancestral Title Claim / Challenge to Will',
      evidence: 'RCS No. 89/2023 pending in Senior Civil Court, Anand',
      shareClaimed: '25.0%',
      shareAdmitted: '25.0%',
      shareDisputed: 'Subject to Civil Suit',
      status: 'Escrow Directed'
    }
  ]);

  // Calculate total share % validation (Section 16: Total share must equal 100%)
  const totalAllocatedPercent = shares.reduce((sum, s) => sum + (Number(s.claimedSharePercent) || 0), 0);
  const is100PercentValid = Math.abs(totalAllocatedPercent - 100) < 0.01;

  const handleShareChange = (index, newPercent) => {
    const updated = [...shares];
    updated[index].claimedSharePercent = Number(newPercent);
    // Recalculate amount from current escrow balance
    updated[index].tentativeAwardShareInr = Math.round((activeEscrow.currentBalanceInr * Number(newPercent)) / 100);
    setShares(updated);
  };

  const handleApproveApportionment = () => {
    if (!permissions.canApproveApportionment) {
      showToast('Only the Hon\'ble Presiding Officer can approve statutory apportionment decrees!', 'warning');
      return;
    }
    if (!is100PercentValid) {
      showToast('Validation failed: Total claimant shares must equal exactly 100%!', 'warning');
      return;
    }
    setActiveOutputModal('DECREE');
    showToast('Section 77 Apportionment Decree approved and e-Signed. PFMS direct transfer instruction generated!', 'success');
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] font-bold border border-blue-300">
              RFCTLARR SECTION 77
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Section 77 Escrow Management &amp; Title Apportionment Desk
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Adjudication of disputed title, ancestral co-parcenary partition among legal heirs, treasury escrow sweep interest tracking, and direct bank disbursement mandates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveOutputModal('DECREE')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Apportionment Decree Order</span>
          </button>

          <button
            onClick={() => setActiveOutputModal('BANK_AUTH')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <Building2 className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Bank Transfer Authorization</span>
          </button>

          <button
            onClick={() => setActiveOutputModal('PFMS')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <Send className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>PFMS / NPCI Instruction</span>
          </button>

          <button
            onClick={handleApproveApportionment}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve &amp; e-Sign Apportionment</span>
          </button>
        </div>
      </div>

      {/* 2. DISPUTED TITLE CLAIMANT MATRIX (Section 16 exact Columns: Claimant, Claim Type, Ownership Basis, Evidence, Share Claimed, Share Admitted, Share Disputed, Status) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#1B365D] text-xs sm:text-sm">
              Disputed Title Claimant Matrix (Case Context: {selectedCase?.caseId})
            </h3>
            <p className="text-[11px] text-slate-500">
              Cross-examination of competing title claimants under Section 77(1) for land parcel {selectedCase?.surveyNumber} (ULPIN: {selectedCase?.ulpin})
            </p>
          </div>
          <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-300 font-bold">
            SECTION 77 JURISDICTION
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
              <tr>
                <th className="p-2.5">Claimant</th>
                <th className="p-2.5">Claim Type</th>
                <th className="p-2.5">Ownership Basis</th>
                <th className="p-2.5">Evidence Relied</th>
                <th className="p-2.5 text-center">Share Claimed</th>
                <th className="p-2.5 text-center">Share Admitted</th>
                <th className="p-2.5 text-center">Share Disputed</th>
                <th className="p-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {disputedClaimants.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">
                    {c.claimant}
                  </td>
                  <td className="p-2.5 text-slate-700">
                    {c.claimType}
                  </td>
                  <td className="p-2.5 text-slate-700 max-w-xs">
                    {c.ownershipBasis}
                  </td>
                  <td className="p-2.5 text-blue-700 text-[11px] max-w-xs">
                    {c.evidence}
                  </td>
                  <td className="p-2.5 font-mono text-center font-bold text-slate-900">
                    {c.shareClaimed}
                  </td>
                  <td className="p-2.5 font-mono text-center font-bold text-emerald-700">
                    {c.shareAdmitted}
                  </td>
                  <td className="p-2.5 font-mono text-center font-bold text-amber-700">
                    {c.shareDisputed}
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. APPORTIONMENT SHARE SPLIT GRID (Section 16: Claimant, Legal Heir, Share %, Fraction, Award Amount, Interest, Total. Allow Percentage, Fraction, Amount. Validation: Total share must equal 100%) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
              APPORTIONMENT SHARE SPLIT GRID
            </div>
            <h3 className="font-extrabold text-[#1B365D] text-sm">
              Legal Heir Proportional Allocation
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 border ${
              is100PercentValid 
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                : 'bg-red-100 text-red-900 border-red-300 animate-pulse'
            }`}>
              {is100PercentValid ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>TOTAL ALLOCATED: {totalAllocatedPercent.toFixed(1)}% (100% VALID)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>TOTAL ALLOCATED: {totalAllocatedPercent.toFixed(1)}% (MUST EQUAL 100%)</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
              <tr>
                <th className="p-2.5">Claimant / Legal Heir</th>
                <th className="p-2.5">Relationship / Legal Heir Category</th>
                <th className="p-2.5 w-32">Share (%)</th>
                <th className="p-2.5 text-center">Fraction</th>
                <th className="p-2.5">Principal Award Share</th>
                <th className="p-2.5">Accrued Bank Interest</th>
                <th className="p-2.5">Total Net Payable</th>
                <th className="p-2.5">Bank Account &amp; IFSC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shares.map((s, index) => {
                const interestShare = Math.round((activeEscrow.accruedInterestInr * (Number(s.claimedSharePercent) || 0)) / 100);
                const totalShareAmount = (s.tentativeAwardShareInr || 0) + interestShare;
                const fraction = s.claimedSharePercent === 50 ? '1/2' : s.claimedSharePercent === 25 ? '1/4' : `${s.claimedSharePercent}/100`;

                return (
                  <tr key={index} className="hover:bg-slate-50">
                    {/* Claimant */}
                    <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">
                      {s.name}
                    </td>

                    {/* Legal Heir */}
                    <td className="p-2.5 text-slate-700">
                      {s.relation}
                    </td>

                    {/* Share % Input */}
                    <td className="p-2.5">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.5"
                          value={s.claimedSharePercent}
                          onChange={(e) => handleShareChange(index, e.target.value)}
                          className="w-16 p-1 border border-slate-300 rounded font-mono font-bold text-slate-900 text-xs bg-slate-50"
                        />
                        <span className="text-slate-500 font-mono">%</span>
                      </div>
                    </td>

                    {/* Fraction */}
                    <td className="p-2.5 font-mono text-center font-bold text-[#1B365D]">
                      {fraction}
                    </td>

                    {/* Award Amount */}
                    <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      ₹{s.tentativeAwardShareInr?.toLocaleString('en-IN')}
                    </td>

                    {/* Accrued Interest */}
                    <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">
                      +₹{interestShare.toLocaleString('en-IN')}
                    </td>

                    {/* Total Net Payable */}
                    <td className="p-2.5 font-mono font-extrabold text-[#1B365D] whitespace-nowrap">
                      ₹{totalShareAmount.toLocaleString('en-IN')}
                    </td>

                    {/* Bank Account */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {s.bankAccount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ESCROW ACCOUNT LEDGER & BANK INTEREST ACCRUAL TRACKER (Section 16 Fields: Escrow Account, Deposit Date, Principal, Interest Rate, Accrued Interest, Withdrawal, Balance, Status) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
              ESCROW ACCOUNT LEDGER &amp; BANK INTEREST ACCRUAL TRACKER
            </div>
            <h3 className="font-extrabold text-[#1B365D] text-sm">
              State Bank of India Treasury Court Deposit Sweep Account
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 font-bold">
            6.85% SBI AUTO-SWEEP FD ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 block text-[10px]">ESCROW ACCOUNT:</span>
            <strong className="text-slate-900">{activeEscrow.escrowAccountNo}</strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">DEPOSIT DATE:</span>
            <span className="text-slate-800 font-bold">{activeEscrow.depositDate}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">PRINCIPAL DEPOSIT:</span>
            <strong className="text-slate-900">₹{activeEscrow.depositedPrincipalInr.toLocaleString('en-IN')}</strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">ANNUAL INTEREST RATE:</span>
            <span className="text-emerald-700 font-bold">{activeEscrow.interestRatePercent}% p.a. (Sweep)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">ACCRUED INTEREST:</span>
            <strong className="text-emerald-700">+₹{activeEscrow.accruedInterestInr.toLocaleString('en-IN')}</strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">WITHDRAWAL / DISBURSED:</span>
            <span className="text-slate-500">₹0 (Held under Section 77)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">CURRENT LEDGER BALANCE:</span>
            <strong className="text-blue-900 text-sm">₹{activeEscrow.currentBalanceInr.toLocaleString('en-IN')}</strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">ESCROW STATUS:</span>
            <span className="text-emerald-800 font-bold">{activeEscrow.status}</span>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#1B365D]" />
            <span className="text-slate-800 font-medium">
              API-Ready Integration with PFMS &amp; NPCI e-Kuber Portal for Direct Treasury Sweep Transfer
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-bold">
            PFMS ADAPTER READY
          </span>
        </div>
      </div>

      {/* Output Artifact Modal (Section 16: Apportionment Decree Order, Bank Direct Transfer Authorization, PFMS/NPCI-ready payment instruction) */}
      <OfficialDocumentViewerModal
        isOpen={Boolean(activeOutputModal)}
        onClose={() => setActiveOutputModal(null)}
        title={
          activeOutputModal === 'DECREE' ? `Section 77 Apportionment Decree — Case ${selectedCase?.caseId}` :
          activeOutputModal === 'BANK_AUTH' ? `Bank Direct Transfer Authorization — ${activeEscrow.bankName}` :
          `PFMS / NPCI-Ready Direct Benefit Transfer Directive`
        }
        documentType="APPORTIONMENT_ARTIFACT"
        caseData={selectedCase}
        metadata={{
          docId: `APPORT-SEC77-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              {activeOutputModal === 'DECREE' ? 'APPORTIONMENT DECREE ORDER UNDER SECTION 77 OF ACT 30 OF 2013' :
               activeOutputModal === 'BANK_AUTH' ? 'AUTHORIZATION FOR DIRECT TREASURY DISBURSEMENT TO BENEFICIARIES' :
               'PFMS / NPCI DIRECT BENEFIT MANDATE INSTRUCTION'}
            </h4>
            
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div><strong>ESCROW LEDGER REF:</strong> {activeEscrow.courtDepositRef}</div>
              <div><strong>TOTAL ADJUDICATED FUNDS:</strong> ₹{activeEscrow.currentBalanceInr.toLocaleString('en-IN')}</div>
              <div><strong>TOTAL ALLOCATED FRACTION:</strong> {totalAllocatedPercent.toFixed(1)}% (100% VALIDATED)</div>
            </div>

            <p className="text-justify">
              In exercise of the judicial powers conferred under Section 77 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, the Authority hereby orders that the compensation deposited by Western Railway / Collector Anand in the aforesaid Escrow Account be apportioned among the registered legal heirs as detailed below:
            </p>

            <table className="w-full text-left text-xs border border-slate-300 font-sans">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Beneficiary</th>
                  <th className="p-2 border-r border-slate-300">Share %</th>
                  <th className="p-2 border-r border-slate-300">Net Amount (₹)</th>
                  <th className="p-2">Bank Account &amp; IFSC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {shares.map((s, i) => (
                  <tr key={i}>
                    <td className="p-2 border-r border-slate-200 font-sans font-bold">{s.name}</td>
                    <td className="p-2 border-r border-slate-200">{s.claimedSharePercent}%</td>
                    <td className="p-2 border-r border-slate-200 font-bold">₹{s.tentativeAwardShareInr?.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-[11px]">{s.bankAccount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-3 bg-emerald-50 border-l-4 border-emerald-600 font-mono text-xs my-2 text-emerald-950">
              <strong>MANDATE:</strong> The Chief Manager, State Bank of India, District Court Complex Branch is directed to release the payments through RTGS/PFMS within 7 working days.
            </div>
          </div>
        }
      />

    </div>
  );
}
