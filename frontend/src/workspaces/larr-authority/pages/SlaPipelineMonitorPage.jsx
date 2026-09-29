import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  Send, 
  Download, 
  Filter, 
  Building2, 
  Calendar, 
  ShieldAlert, 
  ChevronRight,
  User,
  ExternalLink
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function SlaPipelineMonitorPage() {
  const { cases, selectCaseById, setActiveMenu, showToast, statutoryRuleConfig } = useLarrAuthority();

  const [filterSla, setFilterSla] = useState('ALL'); // 'ALL', 'NORMAL', 'WARNING', 'CRITICAL', 'BREACHED'
  const [selectedCaseForEscalation, setSelectedCaseForEscalation] = useState(null);
  const [isEscalationPdfOpen, setIsEscalationPdfOpen] = useState(false);
  const [selectedDelayReason, setSelectedDelayReason] = useState('Evidence Pending');

  // Section 17 Delay Reason Tagging Options:
  // Awaiting Documents, Party Absent, Evidence Pending, Expert Report Pending, Order Reserved, Administrative Delay, Technical Issue, Other.
  const DELAY_REASONS = [
    'Awaiting Documents',
    'Party Absent',
    'Evidence Pending',
    'Expert Report Pending',
    'Order Reserved',
    'Administrative Delay',
    'Technical Issue',
    'Other'
  ];

  // Summary counts
  const normalCases = cases.filter(c => c.slaStatus === 'NORMAL');
  const warningCases = cases.filter(c => c.slaStatus === 'WARNING');
  const criticalCases = cases.filter(c => c.slaStatus === 'CRITICAL');
  const breachedCases = cases.filter(c => c.slaStatus === 'BREACHED');

  const filteredCases = cases.filter(c => {
    if (filterSla === 'ALL') return true;
    return c.slaStatus === filterSla;
  });

  const handleEscalationNotice = (caseItem) => {
    setSelectedCaseForEscalation(caseItem);
    setIsEscalationPdfOpen(true);
    showToast(`Statutory Delay Escalation Notice generated and transmitted to Appropriate Government for ${caseItem.caseId}!`, 'info');
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono text-[10px] font-bold border border-rose-300">
              SECTION 60 &amp; STATUTORY TIMELINES
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Statutory 180-Day SLA &amp; Pipeline Monitor
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Mandatory 180-day countdown tracking from the date of receipt of Section 64 reference to final award pronouncement under Rule Config: <strong>{statutoryRuleConfig.slaTimeline.ruleCode}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exporting High Court & Chief Secretary SLA Compliance MIS Report...', 'info')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Statutory SLA Report</span>
          </button>
        </div>
      </div>

      {/* 2. STATUTORY SLA VISUAL THRESHOLDS & COUNT CARDS (Section 17: GREEN <90d, YELLOW 90-150d, RED >150d) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Normal Threshold: <90 Days (GREEN) */}
        <div 
          onClick={() => setFilterSla('NORMAL')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterSla === 'NORMAL' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'bg-white border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 uppercase font-mono text-[10px]">Normal (&lt; 90 Days)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-emerald-800 mt-1">
            {normalCases.length} Cases
          </div>
          <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
            Green • On-track within schedule
          </div>
        </div>

        {/* Warning Threshold: 90 - 150 Days (YELLOW) */}
        <div 
          onClick={() => setFilterSla('WARNING')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterSla === 'WARNING' ? 'ring-2 ring-amber-500 bg-amber-50' : 'bg-white border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-800 uppercase font-mono text-[10px]">Warning (90–150 Days)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-amber-800 mt-1">
            {warningCases.length} Cases
          </div>
          <div className="text-[10px] text-amber-700 font-mono mt-0.5">
            Yellow • Expedited hearing needed
          </div>
        </div>

        {/* Critical Threshold: >150 Days (RED) */}
        <div 
          onClick={() => setFilterSla('CRITICAL')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterSla === 'CRITICAL' ? 'ring-2 ring-red-500 bg-red-50' : 'bg-white border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-red-800 uppercase font-mono text-[10px]">Critical (&gt; 150 Days)</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-red-800 mt-1">
            {criticalCases.length} Cases
          </div>
          <div className="text-[10px] text-red-700 font-mono mt-0.5">
            Red • Lapsing risk within 30 days
          </div>
        </div>

        {/* Statutory Breached: >180 Days (RED/ALERT) */}
        <div 
          onClick={() => setFilterSla('BREACHED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterSla === 'BREACHED' ? 'ring-2 ring-rose-700 bg-rose-50' : 'bg-white border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-950 uppercase font-mono text-[10px]">Breached (&gt; 180 Days)</span>
            <ShieldAlert className="w-4 h-4 text-rose-700" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-rose-900 mt-1">
            {breachedCases.length} Cases
          </div>
          <div className="text-[10px] text-rose-700 font-mono mt-0.5">
            Escalation transmitted to Govt
          </div>
        </div>

      </div>

      {/* 3. LAPSING RISK CASE TABLE (Section 17 exact Columns: Case ID, Reference Date, Days Elapsed, Days Remaining, Current Stage, Delay Reason, Next Hearing, Risk Level) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
              Lapsing Risk Case Table ({filteredCases.length} References Tracked)
            </h3>
            <p className="text-[11px] text-slate-500">
              Statutory 180-day countdown pursuant to Section 60 of RFCTLARR Act 2013.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 font-bold">Filter View:</span>
            <select
              value={filterSla}
              onChange={(e) => setFilterSla(e.target.value)}
              className="p-1 border border-slate-300 rounded bg-white text-xs font-mono"
            >
              <option value="ALL">ALL ({cases.length})</option>
              <option value="NORMAL">Normal (&lt;90d)</option>
              <option value="WARNING">Warning (90-150d)</option>
              <option value="CRITICAL">Critical (&gt;150d)</option>
              <option value="BREACHED">Breached (&gt;180d)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
              <tr>
                <th className="p-2.5">Case ID</th>
                <th className="p-2.5">Reference Date</th>
                <th className="p-2.5 text-center">Days Elapsed</th>
                <th className="p-2.5 text-center">Days Remaining</th>
                <th className="p-2.5">Current Stage</th>
                <th className="p-2.5">Delay Reason Tagging</th>
                <th className="p-2.5">Next Hearing</th>
                <th className="p-2.5 text-center">Risk Level</th>
                <th className="p-2.5 text-center">Escalation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => {
                const isBreached = c.slaStatus === 'BREACHED';
                const isCritical = c.slaStatus === 'CRITICAL';
                const isWarning = c.slaStatus === 'WARNING';

                const progressPercent = Math.min(100, Math.round((c.slaDaysElapsed / 180) * 100));

                return (
                  <tr key={c.caseId} className="hover:bg-slate-50 transition-colors">
                    {/* 1. Case ID */}
                    <td className="p-2.5 whitespace-nowrap">
                      <button
                        onClick={() => selectCaseById(c.caseId)}
                        className="font-mono font-bold text-[#1B365D] hover:underline cursor-pointer block text-left"
                      >
                        {c.caseId}
                      </button>
                      <div className="text-[10px] text-slate-500 truncate max-w-[130px]">{c.claimantName}</div>
                    </td>

                    {/* 2. Reference Date */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {c.referenceDate}
                    </td>

                    {/* 3. Days Elapsed */}
                    <td className="p-2.5 font-mono text-center font-bold text-slate-900">
                      {c.slaDaysElapsed}d
                      <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mt-1 overflow-hidden">
                        <div 
                          className={`h-full ${
                            isBreached ? 'bg-rose-700' :
                            isCritical ? 'bg-red-500' :
                            isWarning ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </td>

                    {/* 4. Days Remaining */}
                    <td className={`p-2.5 font-mono text-center font-extrabold ${
                      isBreached ? 'text-rose-900' :
                      isCritical ? 'text-red-700' :
                      isWarning ? 'text-amber-800' :
                      'text-emerald-700'
                    }`}>
                      {c.slaDaysRemaining}d
                    </td>

                    {/* 5. Current Stage */}
                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                        {c.stage.replace(/_/g, ' ')}
                      </span>
                    </td>

                    {/* 6. Delay Reason Tagging */}
                    <td className="p-2.5 text-[11px] text-slate-700">
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                        {c.delayReason || 'Evidence Pending'}
                      </span>
                    </td>

                    {/* 7. Next Hearing */}
                    <td className="p-2.5 font-mono text-[11px] font-bold text-purple-900 whitespace-nowrap">
                      {c.nextHearingDate || 'Reserved'}
                    </td>

                    {/* 8. Risk Level */}
                    <td className="p-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                        isBreached ? 'bg-rose-900 text-white font-extrabold animate-pulse' :
                        isCritical ? 'bg-red-100 text-red-900 border border-red-300 font-bold' :
                        isWarning ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' :
                        'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {c.slaStatus}
                      </span>
                    </td>

                    {/* 9. Escalation Action */}
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {(isCritical || isBreached) ? (
                        <button
                          onClick={() => handleEscalationNotice(c)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] font-bold rounded cursor-pointer transition-colors shadow-xs"
                          title="Generate Delay Escalation Notice to Govt"
                        >
                          Escalate &rarr;
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">On Schedule</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Delay Escalation Notice Modal (Section 17) */}
      <OfficialDocumentViewerModal
        isOpen={isEscalationPdfOpen}
        onClose={() => setIsEscalationPdfOpen(false)}
        title={`Statutory Delay Escalation Notice — Case ${selectedCaseForEscalation?.caseId}`}
        documentType="ESCALATION_NOTICE"
        caseData={selectedCaseForEscalation}
        metadata={{
          docId: `ESCAL-SEC60-${selectedCaseForEscalation?.caseId?.replace(/\//g, '-')}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-rose-900 uppercase underline text-sm">
              STATUTORY DELAY ESCALATION NOTICE UNDER SECTION 60 OF RFCTLARR ACT, 2013
            </h4>
            
            <div className="p-3 bg-red-50 border border-red-300 rounded font-mono text-[11px] space-y-1 text-red-950">
              <div><strong>TO:</strong> {statutoryRuleConfig.slaTimeline.escalationAuthority}</div>
              <div><strong>CASE NUMBER:</strong> {selectedCaseForEscalation?.caseId}</div>
              <div><strong>REFERENCE DATE:</strong> {selectedCaseForEscalation?.referenceDate}</div>
              <div><strong>DAYS ELAPSED:</strong> {selectedCaseForEscalation?.slaDaysElapsed} Days (Statutory Threshold: 180 Days)</div>
              <div><strong>DELAY CLASSIFICATION:</strong> {selectedCaseForEscalation?.delayReason || selectedDelayReason}</div>
            </div>

            <p className="text-justify">
              <strong>TAKE FORMAL JUDICIAL NOTICE</strong> that the above-numbered reference received from the Collector under Section 64 of the RFCTLARR Act 2013 has exceeded or is within imminent danger of exceeding the mandatory statutory 180-day disposal ceiling prescribed by Section 60.
            </p>

            <p className="text-justify">
              The primary reasons for the protracted delay on record are: <em>{selectedCaseForEscalation?.delayReason || 'Failure of Requiring Body to deposit enhanced compensation sanction and delay in production of certified exemplar sale deeds.'}</em>
            </p>

            <div className="p-3 bg-slate-50 border-l-4 border-rose-700 font-mono text-xs my-2">
              <strong>ESCALATION DIRECTIVE:</strong> The Appropriate Government and Inspecting High Court Registry are hereby formally apprised for administrative facilitation under Rule 24 of the State LARR Rules.
            </div>
          </div>
        }
      />

    </div>
  );
}
