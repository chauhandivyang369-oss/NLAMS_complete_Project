import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  Landmark, 
  ShieldAlert, 
  FileCheck2, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Gavel, 
  ShieldCheck, 
  Building2, 
  Coins,
  Send,
  RefreshCw,
  FileText
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function AppealExecutionPage() {
  const { cases, selectCaseById, showToast, permissions } = useLarrAuthority();

  const [activeTab, setActiveTab] = useState('appeals'); // 'appeals', 'stay-tracker', 'execution', 'attachment'
  const [activeModalArtifact, setActiveModalArtifact] = useState(null); // 'EXEC_CERT' | 'TREASURY_WARRANT' | 'ATTACHMENT_NOTICE' | 'HC_SYNC_LOG'

  // Section 18 High Court Appeal Status Grid State
  // Columns: Case ID, Appeal Number, High Court, Filing Date, Limitation Date, Appellant, Respondent, Stay Status, Current Stage, Next Date, Final Status
  const [appeals] = useState([
    {
      caseId: 'LARR/2026/MH/006',
      appealNumber: 'FA/2026/BOM/8841',
      highCourt: 'Hon\'ble High Court of Judicature at Bombay',
      filingDate: '15/07/2026',
      limitationDate: '24/07/2026 (Within 60d Limitation)',
      appellant: 'Maharashtra State Road Development Corp (MSRDC)',
      respondent: 'Vitthal Tukaram Gaikwad & Ors',
      stayStatus: 'Conditional Stay (50% Deposit Directed)',
      currentStage: 'Final Hearing on Stay Vacation',
      nextDate: '18/10/2026',
      finalStatus: 'PENDING ADJUDICATION'
    },
    {
      caseId: 'LARR/2026/PB/005',
      appealNumber: 'RFA/2026/PH/1120',
      highCourt: 'Hon\'ble High Court of Punjab & Haryana, Chandigarh',
      filingDate: '02/08/2026',
      limitationDate: '10/08/2026 (Within 60d Limitation)',
      appellant: 'National Highways Authority of India (NHAI)',
      respondent: 'Gurpreet Singh Brar & 5 Ors',
      stayStatus: 'No Stay Granted',
      currentStage: 'Notice Issued to Respondents',
      nextDate: '04/11/2026',
      finalStatus: 'PENDING ADJUDICATION'
    }
  ]);

  // Section 18 Stay Order Tracker State
  // Fields: Stay Application, Order Date, Stay Type, Scope, Effective From, Effective Until, Conditions, Document, Status
  const [stayOrders] = useState([
    {
      stayApplication: 'IA No. 01/2026 in FA/2026/BOM/8841',
      orderDate: '28/07/2026',
      stayType: 'Conditional Ad-Interim Stay',
      scope: 'Stay on disbursement of enhanced compensation differential',
      effectiveFrom: '28/07/2026',
      effectiveUntil: 'Till next date of listing (18/10/2026)',
      conditions: 'MSRDC to deposit 50% of enhanced award amount (₹1.85 Cr) in Registry within 4 weeks',
      document: 'HC_STAY_ORDER_8841_2026.pdf',
      status: 'ACTIVE CONDITIONAL'
    },
    {
      stayApplication: 'CM No. 4410/2026 in RFA/2026/PH/1120',
      orderDate: '10/08/2026',
      stayType: 'Interim Stay Application',
      scope: 'Stay on execution of Section 69 decree',
      effectiveFrom: 'N/A',
      effectiveUntil: 'N/A',
      conditions: 'Prayer rejected; NHAI directed to comply with Award Decree within 60 days',
      document: 'HC_ORDER_REJECTION_1120_2026.pdf',
      status: 'STAY REJECTED'
    }
  ]);

  // Section 18 Execution Petitions State
  // Fields: Award Number, Award Date, Amount, Paid Amount, Outstanding Amount, Execution Applicant, Respondent, Compliance Status
  const [executionPetitions] = useState([
    {
      caseId: 'LARR/2026/KA/007',
      awardNumber: 'LARR/SEC69/AWD/2026/007',
      awardDate: '12/03/2026',
      amount: '₹3,45,00,000',
      paidAmount: '₹1,20,00,000 (Original Collector Award)',
      outstandingAmount: '₹2,25,00,000 (Net Differential)',
      executionApplicant: 'K.V. Srinivasamurthy & 2 Ors',
      respondent: 'Bangalore Metro Rail Corp (BMRCL) & SLAO',
      complianceStatus: 'NON-COMPLIANT (>90 DAYS LAPSED)'
    }
  ]);

  const handleIssueAttachment = () => {
    setActiveModalArtifact('ATTACHMENT_NOTICE');
    showToast('Government Revenue / Bank Account Attachment Notice issued under CPC Order XXI & Section 70!', 'success');
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono text-[10px] font-bold border border-rose-300">
              RFCTLARR SECTION 74 &amp; EXECUTION
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Section 74 High Court Appeal &amp; Execution
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Tracking statutory 60-day limitation appeals in the Hon'ble High Court, conditional stay orders, and enforcement of unfulfilled award decrees via Treasury Warrants and Account Attachment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveModalArtifact('HC_SYNC_LOG')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>High Court Appeal Sync Log</span>
          </button>

          <button
            onClick={() => showToast('Exporting High Court Appeals & Execution Petitions Register...', 'info')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Appellate Registry</span>
          </button>
        </div>
      </div>

      {/* 2. Top Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-4 text-xs font-bold overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('appeals')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'appeals'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Section 74 High Court Appeal Status Grid ({appeals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('stay-tracker')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'stay-tracker'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Stay Order Tracker ({stayOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('execution')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'execution'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Gavel className="w-4 h-4" />
          <span>Execution Petitions (Order XXI CPC)</span>
        </button>

        <button
          onClick={() => setActiveTab('attachment')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'attachment'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Govt Revenue Account Attachment Desk</span>
        </button>
      </div>

      {/* 3. TAB 1: HIGH COURT APPEAL STATUS GRID (Section 18 exact Columns: Case ID, Appeal Number, High Court, Filing Date, Limitation Date, Appellant, Respondent, Stay Status, Current Stage, Next Date, Final Status) */}
      {activeTab === 'appeals' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-extrabold text-[#1B365D] text-xs sm:text-sm">
              Section 74 Statutory Appeals in High Court (60-Day Limitation)
            </h3>
            <p className="text-[11px] text-slate-500">
              Judicial sync with State High Courts under Section 74(1) of RFCTLARR Act 2013.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[900px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-2.5">Case ID</th>
                  <th className="p-2.5">Appeal Number</th>
                  <th className="p-2.5">High Court</th>
                  <th className="p-2.5">Filing Date</th>
                  <th className="p-2.5">Limitation Date</th>
                  <th className="p-2.5">Appellant</th>
                  <th className="p-2.5">Respondent</th>
                  <th className="p-2.5">Stay Status</th>
                  <th className="p-2.5">Current Stage</th>
                  <th className="p-2.5">Next Date</th>
                  <th className="p-2.5">Final Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appeals.map((a) => (
                  <tr key={a.appealNumber} className="hover:bg-slate-50 transition-colors">
                    {/* Case ID */}
                    <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                      {a.caseId}
                    </td>

                    {/* Appeal Number */}
                    <td className="p-2.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {a.appealNumber}
                    </td>

                    {/* High Court */}
                    <td className="p-2.5 text-slate-800">
                      {a.highCourt}
                    </td>

                    {/* Filing Date */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {a.filingDate}
                    </td>

                    {/* Limitation Date */}
                    <td className="p-2.5 font-mono text-[11px] text-emerald-800 font-bold whitespace-nowrap">
                      {a.limitationDate}
                    </td>

                    {/* Appellant */}
                    <td className="p-2.5 font-semibold text-slate-900 max-w-[140px] truncate" title={a.appellant}>
                      {a.appellant}
                    </td>

                    {/* Respondent */}
                    <td className="p-2.5 text-slate-700 max-w-[140px] truncate" title={a.respondent}>
                      {a.respondent}
                    </td>

                    {/* Stay Status */}
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {a.stayStatus}
                      </span>
                    </td>

                    {/* Current Stage */}
                    <td className="p-2.5 text-[11px] text-slate-700">
                      {a.currentStage}
                    </td>

                    {/* Next Date */}
                    <td className="p-2.5 font-mono text-[11px] font-bold text-purple-900 whitespace-nowrap">
                      {a.nextDate}
                    </td>

                    {/* Final Status */}
                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                        {a.finalStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 2: STAY ORDER TRACKER (Section 18 exact Fields: Stay Application, Order Date, Stay Type, Scope, Effective From, Effective Until, Conditions, Document, Status) */}
      {activeTab === 'stay-tracker' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-extrabold text-[#1B365D] text-xs sm:text-sm">
              High Court Stay Order Tracker
            </h3>
            <p className="text-[11px] text-slate-500">
              Tracking conditional and interim stay applications passed by the Appellate Court under Order XLI Rule 5 CPC.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-2.5">Stay Application</th>
                  <th className="p-2.5">Order Date</th>
                  <th className="p-2.5">Stay Type</th>
                  <th className="p-2.5">Scope of Stay</th>
                  <th className="p-2.5">Effective Period</th>
                  <th className="p-2.5">Statutory Conditions</th>
                  <th className="p-2.5">Document</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stayOrders.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {s.stayApplication}
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {s.orderDate}
                    </td>
                    <td className="p-2.5 font-semibold text-slate-800">
                      {s.stayType}
                    </td>
                    <td className="p-2.5 text-slate-700 max-w-xs">
                      {s.scope}
                    </td>
                    <td className="p-2.5 font-mono text-[10px] text-slate-600 whitespace-nowrap">
                      {s.effectiveFrom} to {s.effectiveUntil}
                    </td>
                    <td className="p-2.5 text-[11px] text-amber-900 bg-amber-50/50 p-2 rounded">
                      {s.conditions}
                    </td>
                    <td className="p-2.5 font-mono text-blue-700 font-bold text-[11px] whitespace-nowrap">
                      {s.document}
                    </td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                        s.status.includes('ACTIVE') ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        'bg-red-100 text-red-900 border border-red-300'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 3: EXECUTION PETITIONS (Section 18 exact Fields: Award Number, Award Date, Amount, Paid Amount, Outstanding Amount, Execution Applicant, Respondent, Compliance Status) */}
      {activeTab === 'execution' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#1B365D] text-xs sm:text-sm">
                Execution Petitions for Unfulfilled Judicial Awards (Order XXI CPC)
              </h3>
              <p className="text-[11px] text-slate-500">
                Enforcement of final Section 69 awards where Requiring Body failed to deposit compensation within 90 days.
              </p>
            </div>
            <button
              onClick={() => setActiveModalArtifact('EXEC_CERT')}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Generate Execution Certificate</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-2.5">Case ID &amp; Award No.</th>
                  <th className="p-2.5">Award Date</th>
                  <th className="p-2.5">Total Decreed Amount</th>
                  <th className="p-2.5">Amount Paid</th>
                  <th className="p-2.5">Outstanding Amount</th>
                  <th className="p-2.5">Execution Applicant</th>
                  <th className="p-2.5">Defaulting Respondent</th>
                  <th className="p-2.5">Compliance Status</th>
                  <th className="p-2.5 text-center">Warrant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {executionPetitions.map((e, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                      {e.caseId}
                      <div className="text-[10px] text-slate-500 font-mono">{e.awardNumber}</div>
                    </td>

                    <td className="p-2.5 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {e.awardDate}
                    </td>

                    <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {e.amount}
                    </td>

                    <td className="p-2.5 font-mono text-emerald-700 whitespace-nowrap">
                      {e.paidAmount}
                    </td>

                    <td className="p-2.5 font-mono font-extrabold text-rose-700 whitespace-nowrap">
                      {e.outstandingAmount}
                    </td>

                    <td className="p-2.5 font-bold text-slate-900 max-w-[130px] truncate" title={e.executionApplicant}>
                      {e.executionApplicant}
                    </td>

                    <td className="p-2.5 text-slate-700 max-w-[140px] truncate" title={e.respondent}>
                      {e.respondent}
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-red-100 text-red-900 border border-red-300">
                        {e.complianceStatus}
                      </span>
                    </td>

                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => setActiveModalArtifact('TREASURY_WARRANT')}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] font-bold rounded cursor-pointer transition-colors shadow-xs"
                      >
                        Issue Warrant
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB 4: GOVERNMENT REVENUE ACCOUNT ATTACHMENT DESK (Section 18) */}
      {activeTab === 'attachment' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <div className="text-[10px] font-mono uppercase text-rose-600 font-bold">
                ENFORCEMENT COERCIVE POWERS (SECTION 70 &amp; CPC ORDER XXI)
              </div>
              <h3 className="font-extrabold text-[#1B365D] text-sm">
                Government Revenue Account Attachment &amp; Garnishee Order Desk
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-red-100 text-red-900 px-2 py-0.5 rounded border border-red-300 font-bold">
              JUDICIAL DECREE ENFORCEMENT
            </span>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3 text-xs text-red-950">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm">Statutory Attachment of Bank &amp; Treasury Accounts</strong>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  Pursuant to Section 70 of the RFCTLARR Act 2013, the Authority has all the powers of a Civil Court under the Code of Civil Procedure, 1908. Where a Requiring Body fails to deposit enhanced compensation within the decreed period, this Authority can attach official treasury drawing accounts and freeze bank accounts via Garnishee Order.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-red-200 flex flex-wrap gap-2">
              <button
                onClick={handleIssueAttachment}
                className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-xs"
              >
                Issue Treasury Attachment Notice
              </button>

              <button
                onClick={() => setActiveModalArtifact('TREASURY_WARRANT')}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors"
              >
                Issue Treasury Warrant to District Collector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Output Artifact Modal (Section 18: Execution Certificate, Treasury Warrant, Attachment Notice, High Court Appeal Sync Log) */}
      <OfficialDocumentViewerModal
        isOpen={Boolean(activeModalArtifact)}
        onClose={() => setActiveModalArtifact(null)}
        title={
          activeModalArtifact === 'EXEC_CERT' ? `Execution Certificate (Order XXI Rule 6 CPC)` :
          activeModalArtifact === 'TREASURY_WARRANT' ? `Judicial Treasury Warrant of Recovery` :
          activeModalArtifact === 'ATTACHMENT_NOTICE' ? `Attachment Notice under Section 70 RFCTLARR Act` :
          `High Court Appeal National Judicial Data Grid Sync Log`
        }
        documentType="EXECUTION_ARTIFACT"
        caseData={cases.find(c => c.caseId === 'LARR/2026/KA/007') || selectedCase}
        metadata={{
          docId: `EXEC-CERT-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-rose-900 uppercase underline text-sm">
              {activeModalArtifact === 'EXEC_CERT' ? 'JUDICIAL CERTIFICATE OF EXECUTION (SECTION 70 & CPC ORDER XXI)' :
               activeModalArtifact === 'TREASURY_WARRANT' ? 'WARRANT FOR RECOVERY OF ENHANCED LAND COMPENSATION' :
               activeModalArtifact === 'ATTACHMENT_NOTICE' ? 'NOTICE OF ATTACHMENT OF GOVERNMENT TREASURY REVENUE ACCOUNT' :
               'NATIONAL HIGH COURT INTEROPERABILITY DATA SYNCHRONIZATION LOG'}
            </h4>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div><strong>DECREED CASE NO:</strong> LARR/2026/KA/007 (BMRCL Metro Acquisition)</div>
              <div><strong>TOTAL OUTSTANDING DECREED SUM:</strong> ₹2,25,00,000 (Two Crore Twenty-Five Lakhs)</div>
              <div><strong>DEFAULT PERIOD:</strong> 112 Days post statutory 90-day grace period</div>
            </div>

            <p className="text-justify">
              {activeModalArtifact === 'ATTACHMENT_NOTICE' ? (
                'WHEREAS the Requiring Body, Bangalore Metro Rail Corporation, has failed to satisfy the Section 69 Enhanced Award Decree pronounced on 12/03/2026: Notice is hereby served upon the Principal Secretary (Finance) and Treasury Officer to attach and freeze the designated project escrow account until full satisfaction of the decree.'
              ) : activeModalArtifact === 'TREASURY_WARRANT' ? (
                'TO THE DISTRICT COLLECTOR & MAGISTRATE: You are hereby commanded to seize, attach, and recover as arrears of land revenue the aforesaid sum of ₹2,25,00,000 from the movable and immovable assets of the Requiring Body, and deposit the proceeds into the LARR Authority Escrow Account.'
              ) : (
                'THIS IS TO CERTIFY that the decree pronounced in LARR Ref. No. 07 of 2026 remains unsatisfied and is transmitted for execution under Order XXI Rule 6 of the Code of Civil Procedure, 1908.'
              )}
            </p>
          </div>
        }
      />

    </div>
  );
}
