import React, { useState } from 'react';
import { 
  Award, 
  Clock, 
  Coins, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  Printer, 
  Eye, 
  Building, 
  ShieldCheck, 
  Layers, 
  Calendar,
  Plus,
  FileCheck
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import StatutoryChecklist from '../components/common/StatutoryChecklist.jsx';
import PublicationMatrix from '../components/common/PublicationMatrix.jsx';
import StatutoryTimerBadge from '../components/common/StatutoryTimerBadge.jsx';

export default function Section19DeclarationEnginePage() {
  const {
    sec19Declarations,
    selectedSec19,
    selectedSec19Id,
    setSelectedSec19Id,
    handleRecordCourtStay,
    setGazetteModalDoc,
    jurisdiction
  } = useAppropriateGovernment();

  const [activeTab, setActiveTab] = useState('eligibility');
  // 'eligibility' | 'financial-deposit' | 'rnr-summary' | 'builder' | 'lapsing-clock' | 'court-stay' | 'extension' | 'publication-matrix'

  // Court Stay Modal State
  const [showStayModal, setShowStayModal] = useState(false);
  const [stayCaseNo, setStayCaseNo] = useState('CWP No. 19283/2025');
  const [stayCourt, setStayCourt] = useState('High Court of Punjab & Haryana');
  const [stayStart, setStayStart] = useState('2025-09-10');
  const [stayEnd, setStayEnd] = useState('2025-10-25');
  const [excludedDays, setExcludedDays] = useState('45');
  const [stayDocName, setStayDocName] = useState('HighCourt_VacationOrder_CWP19283.pdf');

  // Staged Declaration Options
  const [declarationMode, setDeclarationMode] = useState('UNIFIED'); // 'UNIFIED' | 'STAGED_DISTRICT' | 'PARCEL_GROUPED'
  const [dscSigning, setDscSigning] = useState(false);
  const [dscSigned, setDscSigned] = useState(false);

  const current = selectedSec19 || sec19Declarations[0];
  const timer = current?.statutoryCountdown || {};
  const stay = current?.courtStayExclusion || {};

  const handleSaveCourtStay = async (e) => {
    e.preventDefault();
    await handleRecordCourtStay({
      declarationId: current.id,
      projectId: current.projectId,
      caseNumber: stayCaseNo,
      court: stayCourt,
      stayPeriodStart: stayStart,
      stayPeriodEnd: stayEnd,
      excludedDays: Number(excludedDays),
      vacationOrderDoc: stayDocName
    });
    setShowStayModal(false);
  };

  const executeDsc = () => {
    setDscSigning(true);
    setTimeout(() => {
      setDscSigning(false);
      setDscSigned(true);
    }, 1200);
  };

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              Section 19 Final Declaration Statutory Engine
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 6
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Section 19(1) declaration issuance gate, 12-month statutory lapsing countdown, court stay exclusions &amp; staged acquisition
          </p>
        </div>

        {/* Lapsing Timer Badge & View Gazette */}
        <div className="flex items-center gap-3">
          <StatutoryTimerBadge
            daysRemaining={timer.daysRemaining || 66}
            daysElapsed={timer.daysElapsed || 299}
            status={timer.status}
            stayExclusionDays={timer.stayExclusionDays}
            extensionDays={timer.extensionDays}
            compact={true}
          />

          <button
            onClick={() =>
              setGazetteModalDoc({
                id: current?.id,
                notificationNo: current?.declarationNo || 'S.O. 3120(E)',
                section: 'SECTION 19(1)',
                publicationDate: '2026-08-20',
                jurisdictionType: jurisdiction,
                projectCode: current?.projectId,
                signedBy: 'Joint Secretary to Govt of India',
                sha256Hash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
                version: 'V1.0 FINAL DECLARATION'
              })
            }
            className="px-3 py-1.5 rounded bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-amber-800" />
            <span>View Gazette Declaration</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs (8 Dedicated Sub-views) */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap pb-1">
        <button
          onClick={() => setActiveTab('eligibility')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'eligibility'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Statutory Eligibility Gate (12 Checks)
        </button>

        <button
          onClick={() => setActiveTab('financial-deposit')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'financial-deposit'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. RB Escrow Deposit Gate (Sec 19(2))
        </button>

        <button
          onClick={() => setActiveTab('rnr-summary')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'rnr-summary'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. R&amp;R Scheme Demarcation
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'builder'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          4. Staged Declaration Builder &amp; e-Sign
        </button>

        <button
          onClick={() => setActiveTab('lapsing-clock')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'lapsing-clock'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          5. 12-Month Lapsing Clock Monitor
        </button>

        <button
          onClick={() => setActiveTab('court-stay')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'court-stay'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          6. Court Stay Exclusion Calculator (Sec 19(7))
        </button>

        <button
          onClick={() => setActiveTab('extension')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'extension'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          7. Statutory Extension Workflow
        </button>

        <button
          onClick={() => setActiveTab('publication-matrix')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'publication-matrix'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          8. 12-Channel Publication Matrix
        </button>

        <button
          onClick={() => setActiveTab('output-artifacts')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'output-artifacts'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          9. Output Artifacts &amp; Broadcast Seal
        </button>
      </div>

      {/* ================= TAB 1: ELIGIBILITY CHECKLIST GATE ================= */}
      {activeTab === 'eligibility' && (
        <div className="space-y-4">
          <StatutoryChecklist
            title="Section 19(1) Mandatory 12-Point Statutory Eligibility Gate"
            items={current?.eligibilityChecklist || []}
          />
        </div>
      )}

      {/* ================= TAB 2: FINANCIAL DEPOSIT GATE (SEC 19(2)) ================= */}
      {activeTab === 'financial-deposit' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#C5A059]" />
                Section 19(2) Mandatory Requiring Body Deposit Gate
              </h3>
              <p className="text-xs text-slate-500">
                Statutory prerequisite: No declaration under sub-section (1) shall be made unless the Requiring Body has deposited the full amount
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              DEPOSIT SATISFIED IN FULL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Mandatory Deposit Required</div>
              <div className="text-xl font-bold font-mono text-slate-900">₹{current?.depositGate?.requiredCr} Cr</div>
              <div className="text-[10px] text-slate-500">Includes Land Compensation + R&amp;R Cost</div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Deposited into Escrow / CNA</div>
              <div className="text-xl font-bold font-mono text-emerald-700">₹{current?.depositGate?.depositedCr} Cr</div>
              <div className="text-[10px] text-emerald-700 font-semibold">100% Funded (Zero Deficit)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">PFMS Transaction Reference</div>
              <div className="text-sm font-bold font-mono text-[#1B365D]">{current?.depositGate?.pfmsTransactionRef}</div>
              <div className="text-[10px] text-slate-500">Escrow Acct: {current?.depositGate?.escrowAccount}</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: R&R SUMMARY ================= */}
      {activeTab === 'rnr-summary' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Summary of R&amp;R Scheme Published Along with Declaration
              </h3>
              <p className="text-xs text-slate-500">
                Mandatory under Section 19(2): Summary of rehabilitation and resettlement scheme must be published with Section 19 declaration
              </p>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-500">
              142 Families Covered
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800">
              Resettlement Area Demarcation: Village Payal Kalan (5.40 Hectares)
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              The Appropriate Government has approved the resettlement site identified by R&amp;R Administrator and Commissioner. 
              The layout includes 38 residential plots of 50 sq. mtrs each, community hall, internal paved roads, overhead water tank, 
              and primary health center sub-post per Third Schedule infrastructure benchmarks.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 4: DECLARATION BUILDER & e-SIGN ================= */}
      {activeTab === 'builder' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Staged Declaration Builder &amp; DSC e-Sign Engine
              </h3>
              <p className="text-xs text-slate-500">
                Form 5 statutory gazette declaration format with digital signature under IT Act 2000
              </p>
            </div>
            <div>
              {dscSigned ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  DSC SIGNATURE AFFIXED (SHA-256)
                </span>
              ) : (
                <button
                  onClick={executeDsc}
                  disabled={dscSigning}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <FileCheck className="w-4 h-4" />
                  {dscSigning ? 'Signing with Class 3 DSC...' : 'Execute Digital Signature (DSC)'}
                </button>
              )}
            </div>
          </div>

          {/* Staging Options */}
          <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center gap-4 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wide">Acquisition Declaration Mode:</span>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-800">
              <input
                type="radio"
                name="declMode"
                value="UNIFIED"
                checked={declarationMode === 'UNIFIED'}
                onChange={e => setDeclarationMode(e.target.value)}
                className="accent-[#1B365D]"
              />
              <span>Unified Master Corridor (Full Project)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-800">
              <input
                type="radio"
                name="declMode"
                value="STAGED_DISTRICT"
                checked={declarationMode === 'STAGED_DISTRICT'}
                onChange={e => setDeclarationMode(e.target.value)}
                className="accent-[#1B365D]"
              />
              <span>Staged / Phased District-wise Declaration</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-800">
              <input
                type="radio"
                name="declMode"
                value="PARCEL_GROUPED"
                checked={declarationMode === 'PARCEL_GROUPED'}
                onChange={e => setDeclarationMode(e.target.value)}
                className="accent-[#1B365D]"
              />
              <span>Grouped Parcels / Village Clusters</span>
            </label>
          </div>

          {/* Declaration Preview Box */}
          <div className="p-4 bg-slate-50 rounded border border-slate-300 font-serif text-xs leading-relaxed space-y-3 max-h-96 overflow-y-auto">
            <div className="text-center space-y-1 font-sans">
              <div className="font-bold text-sm tracking-wide text-slate-900 uppercase">
                {jurisdiction === 'CENTRAL' ? 'THE GAZETTE OF INDIA : EXTRAORDINARY' : 'STATE GOVERNMENT GAZETTE : EXTRAORDINARY'}
              </div>
              <div className="text-xs text-slate-600 uppercase font-semibold">
                PART II — SECTION 3 — SUB-SECTION (ii)
              </div>
              <div className="text-[11px] text-slate-500">
                Declaration No: <span className="font-mono font-bold text-slate-800">S.O. 3120(E)</span>
              </div>
            </div>

            <p className="pt-2 text-justify">
              <strong>S.O. 3120(E).—</strong> Whereas, by a preliminary notification of the Government of India in the Ministry of Road Transport and Highways, published under sub-section (1) of Section 11 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (30 of 2013) vide S.O. 2489(E) dated 14th August, 2025, it was notified that land specified in the Schedule was required for public purpose;
            </p>
            <p className="text-justify">
              And whereas, the District Collector has heard objections under sub-section (2) of Section 15 and submitted his report to the Appropriate Government;
            </p>
            <p className="text-justify">
              And whereas, the Administrator for Rehabilitation and Resettlement has prepared the Rehabilitation and Resettlement Scheme, which has been duly approved by the Commissioner for Rehabilitation and Resettlement under sub-section (2) of Section 19;
            </p>
            <p className="text-justify">
              And whereas, the Requiring Body has deposited the full estimated amount towards compensation and rehabilitation in terms of sub-section (2) of Section 19 of the Act;
            </p>
            <p className="text-justify">
              Now, therefore, in exercise of the powers conferred by sub-section (1) of Section 19 of the said Act, the Appropriate Government hereby declares that the land described in the Schedule hereto is required for public purpose: Construction of 6-lane access-controlled Delhi-Amritsar-Katra Expressway.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 5: 12-MONTH LAPSING CLOCK ================= */}
      {activeTab === 'lapsing-clock' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Section 19(7) Statutory 12-Month Lapsing Clock Monitor
              </h3>
              <p className="text-xs text-slate-500">
                Statutory mandate: Where no declaration is made within twelve months from the date of preliminary notification, the proceedings shall lapse
              </p>
            </div>
            <StatutoryTimerBadge
              daysRemaining={timer.daysRemaining || 66}
              daysElapsed={timer.daysElapsed || 299}
              totalWindowDays={365 + (timer.stayExclusionDays || 0)}
              status={timer.status}
              stayExclusionDays={timer.stayExclusionDays}
              extensionDays={timer.extensionDays}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Section 11 Date</div>
              <div className="text-sm font-bold font-mono text-slate-900">{timer.sec11LastPubDate}</div>
              <div className="text-[10px] text-slate-500">Last publication date</div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Standard 12-Mo Target</div>
              <div className="text-sm font-bold font-mono text-slate-900">{timer.statutoryDeadlineStandard}</div>
              <div className="text-[10px] text-slate-500">Base 365 calendar days</div>
            </div>
            <div className="p-3 bg-purple-50 rounded border border-purple-200 space-y-1">
              <div className="text-[10px] text-purple-700 uppercase font-semibold">Court Stay Excluded</div>
              <div className="text-sm font-bold font-mono text-purple-900">+{timer.stayExclusionDays || 45} Days</div>
              <div className="text-[10px] text-purple-700">Sec 19(7) First Proviso</div>
            </div>
            <div className="p-3 bg-amber-50 rounded border border-amber-200 space-y-1">
              <div className="text-[10px] text-amber-700 uppercase font-semibold">Effective Lapsing Deadline</div>
              <div className="text-sm font-bold font-mono text-amber-900">{timer.effectiveDeadline}</div>
              <div className="text-[10px] text-amber-700 font-semibold">{timer.daysRemaining} Days Left</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 6: COURT STAY EXCLUSION CALCULATOR ================= */}
      {activeTab === 'court-stay' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-700" />
                Section 19(7) First Proviso: Court Stay Exclusion Engine
              </h3>
              <p className="text-xs text-slate-500">
                Period of stay granted by any Court is excluded by law from the 12-month calculation window
              </p>
            </div>
            <button
              onClick={() => setShowStayModal(true)}
              className="px-3 py-1.5 rounded bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Court Injunction Order</span>
            </button>
          </div>

          {stay.hasActiveStay ? (
            <div className="p-3 bg-purple-50 rounded border border-purple-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-purple-950 text-sm">{stay.caseNumber}</span>
                <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-mono font-bold text-[11px]">
                  +{stay.excludedDays} CALENDAR DAYS EXCLUDED
                </span>
              </div>
              <div className="text-slate-700">
                <strong>Court:</strong> {stay.court}
              </div>
              <div className="text-slate-600 text-[11px] font-mono">
                Stay Period: {stay.stayPeriodStart} to {stay.stayPeriodEnd}
              </div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-purple-200 flex justify-between items-center">
                <span>Vacation Order Document: <span className="font-mono text-blue-700 underline">{stay.vacationOrderDoc}</span></span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified by Legal Officer
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400 text-xs italic bg-slate-50 rounded">
              No active court stay recorded for this project
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 7: STATUTORY EXTENSION WORKFLOW ================= */}
      {activeTab === 'extension' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Section 19(7) Second Proviso: Appropriate Government Extension Desk
              </h3>
              <p className="text-xs text-slate-500">
                Extension permitted where Appropriate Government records exceptional circumstances in writing (Max 12 additional months)
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              Proviso Applied: False
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800">
              Statutory Safeguard:
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              If the 12-month period expires without declaration and without a valid court stay exclusion, the acquisition lapses completely. 
              The Appropriate Government may only extend the period under the Second Proviso where circumstances exist justifying the delay, 
              which must be published in the Official Gazette as a corrigendum.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 8: PUBLICATION MATRIX ================= */}
      {activeTab === 'publication-matrix' && (
        <PublicationMatrix
          matrix={current?.publicationMatrix || []}
          notifTitle="Section 19(4) Mandatory 12-Channel Declaration Publication Checklist"
          onVerifyEvidence={() => {}}
          onViewGazette={() =>
            setGazetteModalDoc({
              id: current?.id,
              notificationNo: current?.declarationNo || 'S.O. 3120(E)',
              section: 'SECTION 19(1)',
              publicationDate: '2026-08-20',
              jurisdictionType: jurisdiction,
              projectCode: current?.projectId,
              signedBy: 'Joint Secretary to Govt of India',
              sha256Hash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
              version: 'V1.0 FINAL DECLARATION'
            })
          }
        />
      )}

      {/* ================= TAB 9: OUTPUT ARTIFACT STRIP & BROADCAST ================= */}
      {activeTab === 'output-artifacts' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Section 19 Statutory Output Artifacts &amp; Broadcast Seal
              </h3>
              <p className="text-xs text-slate-500">
                Official statutory artifacts generated upon Section 19 declaration execution
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
              NON-REPUDIABLE STATUTORY RECORDS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">DECLARATION ID</span>
              <div className="font-mono font-bold text-slate-900 text-sm">{current.id}</div>
              <div className="text-[10px] text-slate-400">Canonical statutory identity</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">NOTIFICATION NUMBER</span>
              <div className="font-mono font-bold text-blue-900 text-sm">{current.declarationNo || 'S.O. 3120(E)'}</div>
              <div className="text-[10px] text-slate-400">Extraordinary Gazette Issue</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">DSC e-SIGN STATUS</span>
              <div className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SHA-256 SEALED</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">a7b8c9d0e1f2a3...</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">BROADCAST STATUS</span>
              <div className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DISPATCHED (6/6)</span>
              </div>
              <div className="text-[10px] text-slate-400">Downstream workspaces alerted</div>
            </div>
          </div>

          {/* Artifact Rows */}
          <div className="space-y-2 pt-2 border-t">
            <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
              Available Statutory Documents &amp; Gazette Records:
            </div>

            <div className="p-2.5 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-red-600" />
                <div>
                  <div className="font-bold text-slate-900">
                    Official Section 19(1) Declaration Notification Gazette.pdf
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Government Printing Press Extraordinary Gazette • 3.2 MB • Version 1.0 Final
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setGazetteModalDoc({
                      id: current?.id,
                      notificationNo: current?.declarationNo || 'S.O. 3120(E)',
                      section: 'SECTION 19(1)',
                      publicationDate: '2026-08-20',
                      jurisdictionType: jurisdiction,
                      projectCode: current?.projectId,
                      signedBy: 'Joint Secretary to Govt of India',
                      sha256Hash: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
                      version: 'V1.0 FINAL DECLARATION'
                    })
                  }
                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  View Gazette
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  Print
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">
                    Consolidated Cadastral Schedule &amp; Land Plan Inspection Manifest.xlsx
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Complete ULPIN manifest, survey division boundaries &amp; titleholder list • 1.1 MB
                  </div>
                </div>
              </div>
              <button className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Court Stay Record Modal */}
      {showStayModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-xl max-w-md w-full p-4 space-y-3 text-xs">
            <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2 border-b pb-2">
              <Scale className="w-4 h-4 text-purple-700" />
              Register Court Injunction Order (Sec 19(7) First Proviso)
            </div>
            <form onSubmit={handleSaveCourtStay} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Court Case / Petition No:</label>
                <input
                  type="text"
                  value={stayCaseNo}
                  onChange={e => setStayCaseNo(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Court Name:</label>
                <input
                  type="text"
                  value={stayCourt}
                  onChange={e => setStayCourt(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">Stay Issued Date:</label>
                  <input
                    type="date"
                    value={stayStart}
                    onChange={e => setStayStart(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">Vacation Order Date:</label>
                  <input
                    type="date"
                    value={stayEnd}
                    onChange={e => setStayEnd(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Calculated Days Excluded:</label>
                <input
                  type="number"
                  value={excludedDays}
                  onChange={e => setExcludedDays(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none font-mono font-bold text-purple-900"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Vacation Order Attachment:</label>
                <input
                  type="text"
                  value={stayDocName}
                  onChange={e => setStayDocName(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none font-mono text-[11px]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowStayModal(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-800 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded font-bold"
                >
                  Register Stay &amp; Recalculate Deadline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
