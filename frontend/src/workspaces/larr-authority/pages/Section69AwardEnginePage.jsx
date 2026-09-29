import React, { useState, useMemo } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  Calculator, 
  Coins, 
  Scale, 
  FileCheck2, 
  HelpCircle, 
  Download, 
  PenTool, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function Section69AwardEnginePage() {
  const { selectedCase, calculateSection69Award, signAndIssueAward, showToast, permissions, statutoryRuleConfig } = useLarrAuthority();

  // Section 15 Required Inputs:
  // Circle Rate, Applicable Multiplier, Recent Registered Sale Deeds, Average Sale Deed Value, Applicable Market Value, Collector Award Value, Land Value, Assets Value, Solatium, Notification Date, Award Date, Possession Date, Applicable Interest, R&R Monetary Entitlements, Previous Payments, Deposit Date
  const defaultLandRate = selectedCase?.enhancedAwardPreview?.adjudicatedMarketRatePerSqM || 2650;
  const defaultArea = selectedCase?.acquiredAreaSqM || 8500;
  const defaultMultiplier = selectedCase?.collectorAward?.ruralMultiplier || 1.5;
  const defaultAssets = selectedCase?.enhancedAwardPreview?.adjudicatedAssetsValue || 1250000;
  const defaultSolatium = statutoryRuleConfig.section69.solatiumPercent || 100;
  const defaultInterestDays = 666; // Sec 11 (15/03/2024) to Award (10/01/2026)
  const defaultCollectorAward = selectedCase?.collectorAward?.totalCollectorAwardAmount || 41514000;

  // Form Inputs
  const [circleRate, setCircleRate] = useState(selectedCase?.collectorAward?.basicLandRatePerSqM || 1400);
  const [ruralMultiplier, setRuralMultiplier] = useState(defaultMultiplier);
  const [recentSaleAvg, setRecentSaleAvg] = useState(3150);
  const [pppValue, setPppValue] = useState(2800);
  const [ratePerSqM, setRatePerSqM] = useState(defaultLandRate);
  const [acquiredArea, setAcquiredArea] = useState(defaultArea);
  const [assetsValue, setAssetsValue] = useState(defaultAssets);
  const [solatiumPercent, setSolatiumPercent] = useState(defaultSolatium);
  const [additionalInterestRate, setAdditionalInterestRate] = useState(statutoryRuleConfig.section69.additionalInterestPerAnnumPercent || 12);
  const [interestDays, setInterestDays] = useState(defaultInterestDays);
  const [excessInterestYr1Rate, setExcessInterestYr1Rate] = useState(statutoryRuleConfig.section72Interest.yearOneRatePercent || 9);
  const [rnrEntitlements, setRnrEntitlements] = useState(750000);
  const [previousPayments, setPreviousPayments] = useState(0);

  // Dates
  const [notificationDate, setNotificationDate] = useState('15/03/2024');
  const [awardDate, setAwardDate] = useState('10/01/2026');
  const [possessionDate, setPossessionDate] = useState('15/02/2026');
  const [depositDate, setDepositDate] = useState('28/01/2026');

  // Judicial Reasoning & Remarks (Section 15 Fields: Finding, Evidence Relied Upon, Calculation Basis, Applicable Provision, Reason for Enhancement, Other Directions)
  const [findingText, setFindingText] = useState(
    'Authority finds that the Collector erred in applying dry-crop circle rate of ₹1,400/sq.m. Open-market registered exemplar sale deed Ex. P-1 (Doc No. 1422/2024) of adjacent survey 109/2 executed prior to Section 11 preliminary notification establishes bona fide transactional market rate of ₹3,150/sq.m. Making statutory 15% deduction for large-tract development, reasonable market rate is determined at ₹2,650/sq.m.'
  );
  const [evidenceReliedUpon, setEvidenceReliedUpon] = useState(
    'Exhibit P-1 (Certified registered sale deed dated 04/02/2024 @ ₹3,150/sq.m); Exhibit P-2 (Approved Valuer report on borehole); Exhibit C-1 (Court Commissioner report confirming complete severance of irrigation channel); Hon\'ble Apex Court judgment in Ali Mohammad Beigh (2017) 4 SCC 717.'
  );
  const [calculationBasis, setCalculationBasis] = useState(
    'Configurable Statutory Formula: M = MAX(Circle_Rate * Multiplier, Sale_Deed_Avg, PPP_Valuation). Applying 1.5x rural factor, 100% Solatium under Section 69(2), 12% p.a. additional interest from Sec 11 notification date (15/03/2024) to Award date (10/01/2026) for 666 days, and 9% interest on excess under Section 72.'
  );
  const [applicableProvision, setApplicableProvision] = useState(
    'Sections 26, 27, 28, 29, 30, 69 & 72 of the RFCTLARR Act 2013 and First Schedule statutory multipliers.'
  );
  const [reasonForEnhancement, setReasonForEnhancement] = useState(
    'Severe bisection and complete severance of perennial irrigation tube-well conduit feeding commercial banana/tobacco crop, inadequate collector valuation based on outdated Jantar circle rates.'
  );
  const [otherDirections, setOtherDirections] = useState(
    'Western Railway / Collector Anand is directed to deposit the net differential enhanced compensation within 90 days from the date of this decree in the Authority Escrow Account.'
  );

  // Modal State
  const [isDecreePdfOpen, setIsDecreePdfOpen] = useState(false);

  // Enhanced Market Value Formula: M = MAX(Circle Rate * Multiplier, Recent Sale Deeds Avg, Agreed PPP)
  const maxStatutoryRate = useMemo(() => {
    return Math.max(circleRate * ruralMultiplier, recentSaleAvg, pppValue);
  }, [circleRate, ruralMultiplier, recentSaleAvg, pppValue]);

  // Live Statutory Calculation Engine Output
  const calculation = useMemo(() => {
    return calculateSection69Award({
      basicLandRatePerSqM: Number(ratePerSqM) || 0,
      acquiredAreaSqM: Number(acquiredArea) || 0,
      ruralMultiplier: Number(ruralMultiplier) || 1.0,
      immovableAssetsValue: Number(assetsValue) || 0,
      solatiumRatePercent: Number(solatiumPercent) || 100,
      additionalInterestRatePercent: Number(additionalInterestRate) || 12,
      interestDays: Number(interestDays) || 365,
      excessInterestYearOnePercent: Number(excessInterestYr1Rate) || 9,
      collectorAwardTotal: Number(defaultCollectorAward) || 0
    });
  }, [
    ratePerSqM, 
    acquiredArea, 
    ruralMultiplier, 
    assetsValue, 
    solatiumPercent, 
    additionalInterestRate, 
    interestDays, 
    excessInterestYr1Rate, 
    defaultCollectorAward, 
    calculateSection69Award
  ]);

  const handlePronounceAward = () => {
    if (!permissions.canSignAward) {
      showToast('Only the Hon\'ble Presiding Officer has statutory power to pronounce and e-Sign Section 69 award decrees!', 'warning');
      return;
    }

    signAndIssueAward(selectedCase.caseId, {
      adjudicatedMarketRatePerSqM: ratePerSqM,
      adjudicatedBasicLandValue: calculation.baseLandValue,
      ruralMultiplier,
      adjudicatedMultipliedLandValue: calculation.multipliedLandValue,
      adjudicatedAssetsValue: calculation.totalAssetsValue,
      adjudicatedSolatium: calculation.solatiumAmount,
      additionalInterest12Percent: calculation.additionalInterest,
      excessInterest9PercentYr1: calculation.excessInterestYr1,
      rnrEntitlements,
      totalJudicialAwardAmount: calculation.grandTotalAward + rnrEntitlements,
      collectorAwardDeduction: calculation.collectorAwardTotal,
      netDifferentialPayableCr: ((calculation.grandTotalAward + rnrEntitlements - calculation.collectorAwardTotal) / 10000000).toFixed(3),
      netDifferentialPayableExact: calculation.grandTotalAward + rnrEntitlements - calculation.collectorAwardTotal,
      paymentDeadlineDays: 90
    });

    setIsDecreePdfOpen(true);
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold border border-emerald-300">
              RFCTLARR SECTION 69 ENGINE
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Section 69 Enhanced Award Engine &amp; Decree Generator
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Configurable statutory determination of market value under Section 26 &amp; 69, 100% solatium, Section 69(1) 12% additional interest, Section 72 excess interest, and differential decree generation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsDecreePdfOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Export Decree Draft PDF</span>
          </button>

          <button
            onClick={handlePronounceAward}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>e-Sign &amp; Pronounce Award</span>
          </button>
        </div>
      </div>

      {/* 2. CIRCLE RATE VS MARKET VALUE COMPARATOR (Section 15: Circle Rate x Multiplier, Recent Sale Deed Average, Other statutory value, Selected Judicial Market Value) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
              STATUTORY COMPARATOR (SECTION 26 &amp; 69)
            </div>
            <h3 className="font-extrabold text-[#1B365D] text-sm">
              Circle Rate (Jantar) vs. Registered Sale Exemplars &amp; Bench Rate
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Formula: M = MAX(Circle_Rate * Multiplier, Sale_Deed_Avg, Agreed_PPP)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-xs">
          
          {/* Box 1: Circle Rate x Multiplier */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">1. Circle Rate &times; Factor</div>
            <div className="text-base font-mono font-bold text-slate-800">
              ₹{(circleRate * ruralMultiplier).toLocaleString('en-IN')}/sq.m
            </div>
            <div className="text-[10px] text-slate-500">
              ₹{circleRate} &times; {ruralMultiplier}x multiplier (Jantar 2024)
            </div>
          </div>

          {/* Box 2: Recent Sale Deeds Average */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <div className="text-[10px] font-mono uppercase text-blue-800 font-bold">2. Recent Sale Exemplar Avg</div>
            <div className="text-base font-mono font-bold text-blue-900">
              ₹{recentSaleAvg.toLocaleString('en-IN')}/sq.m
            </div>
            <div className="text-[10px] text-blue-700">
              Certified Sale Deed No. 1422/2024 (Ex. P-1)
            </div>
          </div>

          {/* Box 3: Other Applicable Statutory Value (Agreed PPP / Industrial) */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="text-[10px] font-mono uppercase text-amber-800 font-bold">3. Agreed PPP / Industrial Value</div>
            <div className="text-base font-mono font-bold text-amber-900">
              ₹{pppValue.toLocaleString('en-IN')}/sq.m
            </div>
            <div className="text-[10px] text-amber-700">
              GIDC Benchmark Rate for Freight Corridor
            </div>
          </div>

          {/* Box 4: Selected Judicial Market Value */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
            <div className="text-[10px] font-mono uppercase text-emerald-800 font-bold">4. Selected Judicial Market Value</div>
            <div className="text-base font-mono font-bold text-emerald-950">
              ₹{ratePerSqM.toLocaleString('en-IN')}/sq.m
            </div>
            <div className="text-[10px] text-emerald-700">
              Adjudicated under Section 69 with 15% tract deduction
            </div>
          </div>

        </div>
      </div>

      {/* 3. INTERACTIVE CALCULATION WORKSPACE (Section 15 Inputs & Itemized Breakdown) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        
        {/* Left 5 Cols: Configurable Inputs */}
        <div className="xl:col-span-5 bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
          <div className="border-b border-slate-200 pb-2">
            <h4 className="font-extrabold text-[#1B365D] text-sm">
              Judicial Valuation &amp; Statutory Rule Inputs
            </h4>
            <div className="text-[10px] text-slate-500 font-mono">
              Rule Config: {statutoryRuleConfig.ruleVersion}
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Adjudicated Basic Land Rate (₹ per sq.m)
              </label>
              <input
                type="number"
                value={ratePerSqM}
                onChange={(e) => setRatePerSqM(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Acquired Area (sq.m)
                </label>
                <input
                  type="number"
                  value={acquiredArea}
                  onChange={(e) => setAcquiredArea(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Rural Multiplier (x)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={ruralMultiplier}
                  onChange={(e) => setRuralMultiplier(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Revalued Immovable Assets (₹) (Tubewell, Trees, Structures)
              </label>
              <input
                type="number"
                value={assetsValue}
                onChange={(e) => setAssetsValue(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Solatium Rate (%) (Sec 69(2))
                </label>
                <input
                  type="number"
                  value={solatiumPercent}
                  onChange={(e) => setSolatiumPercent(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono font-bold text-amber-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Sec 69(1) Addl Interest (%)
                </label>
                <input
                  type="number"
                  value={additionalInterestRate}
                  onChange={(e) => setAdditionalInterestRate(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Interest Period (Days)
                </label>
                <input
                  type="number"
                  value={interestDays}
                  onChange={(e) => setInterestDays(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Sec 72 Excess Interest (%)
                </label>
                <input
                  type="number"
                  value={excessInterestYr1Rate}
                  onChange={(e) => setExcessInterestYr1Rate(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                R&amp;R Monetary Entitlements (₹) (Second Schedule)
              </label>
              <input
                type="number"
                value={rnrEntitlements}
                onChange={(e) => setRnrEntitlements(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
              />
            </div>

            {/* Statutory Dates Summary */}
            <div className="p-2.5 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-600 space-y-0.5">
              <div>Sec 11(1) Date: <strong>{notificationDate}</strong></div>
              <div>Collector Award: <strong>{awardDate}</strong> • Possession: <strong>{possessionDate}</strong></div>
              <div>Deposit Date: <strong>{depositDate}</strong></div>
            </div>

          </div>
        </div>

        {/* Right 7 Cols: Mathematical Breakdown & Comparison (Section 15 Exact Breakdown) */}
        <div className="xl:col-span-7 bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h4 className="font-extrabold text-[#1B365D] text-sm">
              Itemized Judicial Award Calculation Breakdown
            </h4>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold border border-emerald-300">
              SEC 26 + SEC 69 + SEC 72 DECREE
            </span>
          </div>

          <div className="space-y-2 text-xs">
            
            {/* 1. Base Market Value */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">1. Basic Market Value of Land</span>
                <div className="text-[10px] text-slate-500 font-mono">{acquiredArea} sq.m &times; ₹{ratePerSqM}/sq.m</div>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{calculation.baseLandValue.toLocaleString('en-IN')}</span>
            </div>

            {/* 2. Multiplied Land Value */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">2. Multiplied Land Value (First Schedule)</span>
                <div className="text-[10px] text-slate-500 font-mono">Factor {ruralMultiplier}x applicable for rural Anand taluka</div>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{calculation.multipliedLandValue.toLocaleString('en-IN')}</span>
            </div>

            {/* 3. Immovable Assets */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">3. Assets, Tubewell &amp; Tree Valuation</span>
                <div className="text-[10px] text-slate-500 font-mono">Revalued per Court Commissioner Report Ex. C-1</div>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{calculation.totalAssetsValue.toLocaleString('en-IN')}</span>
            </div>

            {/* 4. Solatium 100% */}
            <div className="flex items-center justify-between p-2 rounded bg-amber-50/60 border border-amber-200">
              <div>
                <span className="font-semibold text-amber-950">4. 100% Statutory Solatium (Section 69(2))</span>
                <div className="text-[10px] text-amber-800 font-mono">100% of (Multiplied Land Value + Assets)</div>
              </div>
              <span className="font-mono font-bold text-amber-950">₹{calculation.solatiumAmount.toLocaleString('en-IN')}</span>
            </div>

            {/* 5. Additional Interest 12% */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">5. Additional Interest @ 12% p.a. (Section 69(1))</span>
                <div className="text-[10px] text-slate-500 font-mono">{interestDays} days from Sec 11 notification to Award</div>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{calculation.additionalInterest.toLocaleString('en-IN')}</span>
            </div>

            {/* 6. Excess Interest 9% for Year 1 */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">6. Interest on Excess Compensation (Section 72)</span>
                <div className="text-[10px] text-slate-500 font-mono">9% p.a. on differential amount for first year</div>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{calculation.excessInterestYr1.toLocaleString('en-IN')}</span>
            </div>

            {/* 7. R&R Monetary Entitlements */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">7. R&amp;R Monetary Entitlements (Second Schedule)</span>
                <div className="text-[10px] text-slate-500 font-mono">Subsistence grant &amp; resettlement allowance</div>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{rnrEntitlements.toLocaleString('en-IN')}</span>
            </div>

            {/* Grand Total Comparison Box: Collector Award vs Judicial Enhanced Award */}
            <div className="p-3 bg-[#1B365D] text-white rounded-xl space-y-2 mt-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300">TOTAL JUDICIAL ENHANCED AWARD:</span>
                <span className="text-lg font-bold text-[#E6CA85]">₹{(calculation.grandTotalAward + rnrEntitlements).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-300 border-t border-slate-700 pt-1.5">
                <span>LESS: COLLECTOR AWARD PREVIOUSLY DEPOSITED:</span>
                <span className="text-slate-300">(-) ₹{calculation.collectorAwardTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-sm font-extrabold text-emerald-300 border-t border-slate-600 pt-1.5">
                <span>NET DIFFERENTIAL TO BE DEPOSITED BY RAILWAY:</span>
                <span>₹{(((calculation.grandTotalAward + rnrEntitlements) - calculation.collectorAwardTotal) / 10000000).toFixed(3)} Cr</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 4. STATUTORY FINDINGS & REASONING (Section 15 Fields: Finding, Evidence Relied Upon, Calculation Basis, Applicable Provision, Reason for Enhancement, Other Directions) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
            JUDICIAL REASONING (SECTION 69(1) DECREE FINDINGS)
          </div>
          <h4 className="font-extrabold text-[#1B365D] text-sm">
            Statutory Grounds for Award Enhancement
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              1. Primary Judicial Finding
            </label>
            <textarea
              rows={3}
              value={findingText}
              onChange={(e) => setFindingText(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:outline-hidden font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              2. Documentary Evidence &amp; Precedents Relied Upon
            </label>
            <textarea
              rows={3}
              value={evidenceReliedUpon}
              onChange={(e) => setEvidenceReliedUpon(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:outline-hidden font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              3. Calculation Basis &amp; Source Formula
            </label>
            <textarea
              rows={2}
              value={calculationBasis}
              onChange={(e) => setCalculationBasis(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:outline-hidden font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              4. Applicable Statutory Provisions
            </label>
            <textarea
              rows={2}
              value={applicableProvision}
              onChange={(e) => setApplicableProvision(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:outline-hidden font-sans"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              5. Payment Directive &amp; Compliance Instructions
            </label>
            <input
              type="text"
              value={otherDirections}
              onChange={(e) => setOtherDirections(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-sans"
            />
          </div>
        </div>
      </div>

      {/* Section 69 Judicial Award Decree PDF Modal (Section 15) */}
      <OfficialDocumentViewerModal
        isOpen={isDecreePdfOpen}
        onClose={() => setIsDecreePdfOpen(false)}
        title={`Section 69 Judicial Award Decree — Case ${selectedCase?.caseId}`}
        documentType="JUDICIAL_AWARD_DECREE"
        caseData={selectedCase}
        metadata={{
          docId: `DECREE-SEC69-2026-${selectedCase?.caseId?.replace(/\//g, '-')}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              JUDICIAL AWARD DECREE UNDER SECTION 69 OF RFCTLARR ACT, 2013
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div><strong>CASE NUMBER:</strong> {selectedCase?.caseId}</div>
              <div><strong>LAND PARCEL:</strong> Survey {selectedCase?.surveyNumber} (ULPIN: {selectedCase?.ulpin})</div>
              <div><strong>ACQUIRED AREA:</strong> {acquiredArea} sq.m ({selectedCase?.acquiredAreaHectares} Hectares)</div>
              <div><strong>ADJUDICATED RATE:</strong> ₹{ratePerSqM}/sq.m (Multiplier {ruralMultiplier}x)</div>
            </div>

            <p className="text-justify">
              <strong>JUDICIAL FINDINGS:</strong><br />
              {findingText}
            </p>

            <table className="w-full text-left text-xs border border-slate-300 mt-2 font-sans">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Statutory Item</th>
                  <th className="p-2 border-r border-slate-300">Legal Formula / Basis</th>
                  <th className="p-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-2 border-r border-slate-200">1. Basic Market Value</td>
                  <td className="p-2 border-r border-slate-200 font-sans">{acquiredArea} sq.m &times; ₹{ratePerSqM}</td>
                  <td className="p-2 text-right">₹{calculation.baseLandValue.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200">2. Multiplied Land Value</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Factor {ruralMultiplier}x applied</td>
                  <td className="p-2 text-right">₹{calculation.multipliedLandValue.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200">3. Immovable Assets</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Tubewell &amp; trees revalued</td>
                  <td className="p-2 text-right">₹{calculation.totalAssetsValue.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200">4. 100% Solatium (Sec 69(2))</td>
                  <td className="p-2 border-r border-slate-200 font-sans">100% of (Land + Assets)</td>
                  <td className="p-2 text-right font-bold">₹{calculation.solatiumAmount.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200">5. 12% Additional Interest</td>
                  <td className="p-2 border-r border-slate-200 font-sans">{interestDays} days from Sec 11 to Award</td>
                  <td className="p-2 text-right">₹{calculation.additionalInterest.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200">6. 9% Sec 72 Excess Interest</td>
                  <td className="p-2 border-r border-slate-200 font-sans">First year on differential</td>
                  <td className="p-2 text-right">₹{calculation.excessInterestYr1.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-100 font-bold">
                  <td className="p-2 border-r border-slate-300" colSpan={2}>TOTAL JUDICIAL AWARD</td>
                  <td className="p-2 text-right text-slate-900">₹{(calculation.grandTotalAward + rnrEntitlements).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200" colSpan={2}>LESS: Collector Award Deposited</td>
                  <td className="p-2 text-right text-rose-700">(-) ₹{calculation.collectorAwardTotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-emerald-50 font-extrabold text-emerald-950">
                  <td className="p-2 border-r border-slate-300" colSpan={2}>NET ENHANCED COMPENSATION TO BE DEPOSITED</td>
                  <td className="p-2 text-right">₹{(((calculation.grandTotalAward + rnrEntitlements) - calculation.collectorAwardTotal)).toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            <div className="p-3 bg-slate-50 border-l-4 border-emerald-600 font-mono text-xs my-3">
              <strong>PAYMENT DIRECTIVE:</strong> {otherDirections}
            </div>
          </div>
        }
      />

    </div>
  );
}
