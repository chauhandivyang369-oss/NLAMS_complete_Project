import React, { useState, useMemo } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  Gavel, 
  Calendar, 
  Clock, 
  FileText, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  ExternalLink,
  ChevronRight,
  Filter,
  Download,
  Users,
  Coins,
  Eye,
  BarChart3,
  ShieldCheck,
  Building2,
  MapPin
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';
import CaseDetailModal from '../components/modals/CaseDetailModal.jsx';
import TribunalPerformanceModal from '../components/modals/TribunalPerformanceModal.jsx';

export default function JudicialDashboardPage() {
  const { cases, causeList, selectCaseById, setActiveMenu, showToast } = useLarrAuthority();

  // Filters for Cause List Viewer (Section 10 requirements: Date, District, Project, Case Type, Case Stage, Presiding Officer, Status)
  const [filterDate, setFilterDate] = useState('2026-09-23');
  const [filterDistrict, setFilterDistrict] = useState('ALL');
  const [filterProject, setFilterProject] = useState('ALL');
  const [filterCaseType, setFilterCaseType] = useState('ALL');
  const [filterStage, setFilterStage] = useState('ALL');
  const [filterOfficer, setFilterOfficer] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isCauseListPdfOpen, setIsCauseListPdfOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [inspectedCase, setInspectedCase] = useState(null);

  // 13 STATUTORY METRICS REQUIRED BY SECTION 10:
  const pendingCases = cases.length;
  const casesReceived = cases.filter(c => c.stage.includes('RECEIVED')).length;
  const casesUnderScrutiny = cases.filter(c => c.stage.includes('SCRUTINY')).length;
  const casesListedToday = causeList.length;
  const casesAwaitingPleadings = cases.filter(c => c.stage.includes('PLEADINGS') || c.stage.includes('REGISTERED')).length;
  const casesAwaitingEvidence = cases.filter(c => c.stage.includes('EVIDENCE')).length;
  const casesAwaitingHearing = cases.filter(c => c.stage.includes('HEARING')).length;
  const casesAwaitingAward = cases.filter(c => c.stage.includes('AWARD') || c.stage.includes('RESERVED')).length;
  const slaBreachedCases = cases.filter(c => c.slaStatus === 'BREACHED').length;
  const slaNearBreachCases = cases.filter(c => c.slaStatus === 'CRITICAL' || c.slaStatus === 'WARNING').length;
  const totalEnhancedAwardCr = cases
    .filter(c => c.enhancedAwardPreview)
    .reduce((sum, c) => sum + (c.enhancedAwardPreview.netDifferentialPayableExact || 0), 0) / 10000000;
  const appealsPending = cases.filter(c => c.stage.includes('APPEAL')).length;
  const executionPending = cases.filter(c => c.stage.includes('EXECUTION')).length;

  // Filtered cause list
  const filteredCauseList = useMemo(() => {
    return causeList.filter(item => {
      const matchesSearch = !searchTerm || 
        item.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parties.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ulpin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.project.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDistrict = filterDistrict === 'ALL' || item.district === filterDistrict;
      const matchesStage = filterStage === 'ALL' || item.stage === filterStage;
      const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;

      return matchesSearch && matchesDistrict && matchesStage && matchesStatus;
    });
  }, [causeList, searchTerm, filterDistrict, filterStage, filterStatus]);

  // Unique filter dropdown values
  const districts = ['ALL', ...new Set(causeList.map(c => c.district))];
  const stages = ['ALL', ...new Set(causeList.map(c => c.stage))];

  return (
    <div className="space-y-4">
      
      {/* 1. TOP TRIBUNAL OVERVIEW & STATUTORY BENCH HEADER */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1B365D] text-[#E6CA85] font-mono text-[10px] font-bold border border-[#C5A059]">
              COURT-1 APEX BENCH
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Judicial Dashboard &amp; Cause List Overview
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Section 51–74 RFCTLARR Act 2013 • Master judicial intake, digital cause list scheduling, Section 69 enhancement tracking, and tribunal SLA oversight.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPerformanceModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Tribunal Performance Snapshot</span>
          </button>

          <button
            onClick={() => setIsCauseListPdfOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Daily Cause List PDF</span>
          </button>
        </div>
      </div>

      {/* 2. COMPACT STATUTORY KPI TILES (13 Section 10 Metrics Organized in Clear Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5">
        
        {/* 1. Pending Cases */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Pending Cases</span>
            <Scale className="w-3.5 h-3.5 text-[#1B365D]" />
          </div>
          <div className="text-xl font-mono font-extrabold text-[#1B365D]">{pendingCases}</div>
          <div className="text-[9px] text-slate-500">Active References</div>
        </div>

        {/* 2. Cases Received */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Cases Received</span>
            <FileText className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-blue-700">{casesReceived}</div>
          <div className="text-[9px] text-blue-600">Fresh Sec 64 Inward</div>
        </div>

        {/* 3. Under Scrutiny */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Under Scrutiny</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-amber-700">{casesUnderScrutiny}</div>
          <div className="text-[9px] text-amber-600">Registry Defect Check</div>
        </div>

        {/* 4. Listed Today */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Listed Today</span>
            <Gavel className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <div className="text-xl font-mono font-extrabold text-purple-900">{casesListedToday}</div>
          <div className="text-[9px] text-purple-700">Cause List Matters</div>
        </div>

        {/* 5. Awaiting Pleadings */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Awaiting Pleadings</span>
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-indigo-800">{casesAwaitingPleadings}</div>
          <div className="text-[9px] text-indigo-600">WS / Counter-Affidavit</div>
        </div>

        {/* 6. Awaiting Evidence */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Awaiting Evidence</span>
            <Search className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-cyan-800">{casesAwaitingEvidence}</div>
          <div className="text-[9px] text-cyan-600">Exemplars &amp; Valuer</div>
        </div>

        {/* 7. Awaiting Hearing */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Awaiting Hearing</span>
            <Gavel className="w-3.5 h-3.5 text-slate-700" />
          </div>
          <div className="text-xl font-mono font-extrabold text-slate-800">{casesAwaitingHearing}</div>
          <div className="text-[9px] text-slate-500">Scheduled on Board</div>
        </div>

        {/* 8. Awaiting Award */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Awaiting Award</span>
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-emerald-800">{casesAwaitingAward}</div>
          <div className="text-[9px] text-emerald-700">Orders Reserved</div>
        </div>

        {/* 9. 180-Day SLA Breached */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>SLA Breached</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-rose-700">{slaBreachedCases}</div>
          <div className="text-[9px] text-rose-600">&gt; 180 Days (Escalated)</div>
        </div>

        {/* 10. Near SLA Breach */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Near SLA Breach</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-amber-700">{slaNearBreachCases}</div>
          <div className="text-[9px] text-amber-600">&gt; 90 Days Elapsed</div>
        </div>

        {/* 11. Enhanced Award Value */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Sec 69 Enhanced</span>
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-mono font-extrabold text-emerald-800">₹{totalEnhancedAwardCr.toFixed(1)}Cr</div>
          <div className="text-[9px] text-emerald-700">Differential Adjudicated</div>
        </div>

        {/* 12 & 13. Appeals & Execution Pending */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase font-bold">
            <span>Appeal / Exec</span>
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <div className="text-xl font-mono font-extrabold text-purple-900">{appealsPending + executionPending}</div>
          <div className="text-[9px] text-purple-700">{appealsPending} Appeal • {executionPending} Exec</div>
        </div>

      </div>

      {/* 3. TODAY'S CAUSE LIST VIEWER (With Section 10 exact Filters & Actions) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
        
        {/* Cause List Header & Comprehensive Filters Bar */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1B365D]" />
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                A. Today's Cause List — Court Hall No. 1 ({filterDate})
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                BENCH ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Case, Claimant, ULPIN..."
                  className="pl-8 pr-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden w-44 sm:w-60"
                />
              </div>

              <button
                onClick={() => {
                  showToast('Cause List generated & published to National Judicial Board!', 'success');
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Generate Cause List
              </button>
            </div>
          </div>

          {/* Section 10 Required Filters: Date, District, Project, Case Type, Case Stage, Presiding Officer, Status */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2 pt-2 border-t border-slate-200 text-xs">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">District</label>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white text-[11px]"
              >
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Project</label>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white text-[11px]"
              >
                <option value="ALL">ALL Projects</option>
                <option value="WRC">Freight Corridor</option>
                <option value="EXPRESSWAY">Delhi-Amritsar Expressway</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Case Type</label>
              <select
                value={filterCaseType}
                onChange={(e) => setFilterCaseType(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white text-[11px]"
              >
                <option value="ALL">ALL Types</option>
                <option value="SEC64">Sec 64 Valuation Reference</option>
                <option value="SEC77">Sec 77 Apportionment</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Case Stage</label>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white text-[11px]"
              >
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Presiding Officer</label>
              <select
                value={filterOfficer}
                onChange={(e) => setFilterOfficer(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white text-[11px]"
              >
                <option value="ALL">Hon'ble Bench 1</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Listing Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-1 border border-slate-300 rounded bg-white text-[11px]"
              >
                <option value="ALL">ALL Statuses</option>
                <option value="PENDING">PENDING</option>
                <option value="HEARING">IN PROGRESS</option>
                <option value="DISPOSED">DISPOSED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exact Section 10 Columns: Case ID, Claimant, Project, District, ULPIN, Reference Date, Hearing Date, Stage, Bench, Status */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[950px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
              <tr>
                <th className="p-2.5">Case ID</th>
                <th className="p-2.5">Claimant</th>
                <th className="p-2.5">Project</th>
                <th className="p-2.5">District</th>
                <th className="p-2.5">ULPIN</th>
                <th className="p-2.5">Reference Date</th>
                <th className="p-2.5">Hearing Date</th>
                <th className="p-2.5">Stage</th>
                <th className="p-2.5">Bench</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCauseList.map((item) => (
                <tr key={item.caseId} className="hover:bg-slate-50 transition-colors">
                  
                  {/* 1. Case ID */}
                  <td className="p-2.5 whitespace-nowrap">
                    <button
                      onClick={() => {
                        const targetCase = cases.find(c => c.caseId === item.caseId);
                        if (targetCase) setInspectedCase(targetCase);
                      }}
                      className="font-mono font-bold text-[#1B365D] hover:underline cursor-pointer block text-left"
                    >
                      {item.caseId}
                    </button>
                    <div className="text-[10px] text-slate-500 font-mono">{item.caseNumber}</div>
                  </td>

                  {/* 2. Claimant */}
                  <td className="p-2.5 max-w-[140px]">
                    <div className="font-semibold text-slate-900 truncate" title={item.parties}>
                      {item.parties.split('vs.')[0]}
                    </div>
                  </td>

                  {/* 3. Project */}
                  <td className="p-2.5 max-w-[140px]">
                    <div className="text-slate-800 text-[11px] truncate" title={item.project}>
                      {item.project}
                    </div>
                  </td>

                  {/* 4. District */}
                  <td className="p-2.5 whitespace-nowrap font-medium text-slate-700">
                    {item.district}
                  </td>

                  {/* 5. ULPIN */}
                  <td className="p-2.5 font-mono text-[11px] text-blue-700 whitespace-nowrap font-bold">
                    {item.ulpin}
                  </td>

                  {/* 6. Reference Date */}
                  <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {item.referenceDate}
                  </td>

                  {/* 7. Hearing Date */}
                  <td className="p-2.5 font-mono text-[11px] font-bold text-purple-900 whitespace-nowrap">
                    {item.hearingTime || '10:30 AM'}
                  </td>

                  {/* 8. Stage */}
                  <td className="p-2.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                      {item.stage}
                    </span>
                  </td>

                  {/* 9. Bench */}
                  <td className="p-2.5 whitespace-nowrap font-mono text-[11px] text-slate-700">
                    {item.bench || 'Bench 1'}
                  </td>

                  {/* 10. Status */}
                  <td className="p-2.5 whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800">
                      {item.status || 'LISTED'}
                    </span>
                  </td>

                  {/* 11. Actions: View Case, Open Hearing */}
                  <td className="p-2.5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          const targetCase = cases.find(c => c.caseId === item.caseId);
                          if (targetCase) setInspectedCase(targetCase);
                        }}
                        className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 cursor-pointer"
                        title="View Full Case Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          selectCaseById(item.caseId);
                          setActiveMenu('courtroom');
                        }}
                        className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#0F2342] text-white text-[11px] font-bold rounded cursor-pointer transition-colors"
                      >
                        Hear Case
                      </button>

                      {item.virtualLink && (
                        <a
                          href={item.virtualLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded border border-purple-300"
                          title="Join Virtual Courtroom"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. MASTER PENDING REFERENCE BREAKDOWN BY 11 EXACT STATUTORY CATEGORIES (Section 10.B) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
              B. Pending Reference Breakdown — 11 Statutory Lifecycle Categories
            </h3>
            <p className="text-[11px] text-slate-500">
              Mandatory statutory breakdown under RFCTLARR Act 2013 across registry intake, examination, trial, award, and execution.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Click any category to open relevant operational desk
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">
          {[
            { label: '1. New Reference', count: cases.filter(c => c.stage.includes('RECEIVED')).length, menu: 'inward', color: 'border-blue-300 bg-blue-50 text-blue-900' },
            { label: '2. Scrutiny', count: cases.filter(c => c.stage.includes('SCRUTINY')).length, menu: 'inward', color: 'border-cyan-300 bg-cyan-50 text-cyan-900' },
            { label: '3. Registered', count: cases.filter(c => c.stage.includes('REGISTERED')).length, menu: 'inward', color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
            { label: '4. Summons Pending', count: cases.filter(c => c.stage.includes('SUMMONS')).length, menu: 'summons', color: 'border-amber-300 bg-amber-50 text-amber-900' },
            { label: '5. Pleadings', count: cases.filter(c => c.stage.includes('PLEADINGS')).length, menu: 'pleadings', color: 'border-indigo-300 bg-indigo-50 text-indigo-900' },
            { label: '6. Evidence', count: cases.filter(c => c.stage.includes('EVIDENCE')).length, menu: 'pleadings', color: 'border-violet-300 bg-violet-50 text-violet-900' },
            { label: '7. Hearing', count: cases.filter(c => c.stage.includes('HEARING')).length, menu: 'courtroom', color: 'border-purple-300 bg-purple-50 text-purple-900' },
            { label: '8. Award', count: cases.filter(c => c.stage.includes('AWARD') || c.stage.includes('RESERVED')).length, menu: 'award-engine', color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
            { label: '9. Apportionment', count: cases.filter(c => c.stage.includes('APPORTIONMENT')).length, menu: 'escrow', color: 'border-teal-300 bg-teal-50 text-teal-900' },
            { label: '10. Appeal', count: cases.filter(c => c.stage.includes('APPEAL')).length, menu: 'appeal-execution', color: 'border-rose-300 bg-rose-50 text-rose-900' },
            { label: '11. Execution', count: cases.filter(c => c.stage.includes('EXECUTION')).length, menu: 'appeal-execution', color: 'border-red-300 bg-red-50 text-red-900' }
          ].map((st, i) => (
            <button
              key={i}
              onClick={() => setActiveMenu(st.menu)}
              className={`p-2.5 rounded-lg border text-left hover:brightness-95 transition-all cursor-pointer ${st.color}`}
            >
              <div className="text-[10px] font-mono uppercase font-bold truncate">{st.label}</div>
              <div className="text-xl font-mono font-extrabold mt-1">{st.count}</div>
              <div className="text-[9px] font-mono opacity-80 mt-0.5">Open Desk &rarr;</div>
            </button>
          ))}
        </div>
      </div>

      {/* Outbound Artifact: Daily Cause List PDF Viewer Modal */}
      <OfficialDocumentViewerModal
        isOpen={isCauseListPdfOpen}
        onClose={() => setIsCauseListPdfOpen(false)}
        title="Official Daily Cause List — Court Hall No. 1"
        documentType="CAUSE_LIST"
        metadata={{
          docId: `CAUSE-LIST-LARR-2026-09-23`,
          date: '23 September 2026'
        }}
        customContent={
          <div className="space-y-4">
            <h4 className="font-bold text-center text-slate-900 uppercase underline mb-3 text-sm">
              DAILY CAUSE LIST FOR WEDNESDAY, 23RD SEPTEMBER 2026
            </h4>
            <div className="text-center font-mono text-xs text-slate-600 mb-4">
              CORAM: HON'BLE SHRI JUSTICE M.D. SHUKLA, PRESIDING OFFICER<br />
              COURT HALL NO. 1 • COMMENCING AT 10:30 AM
            </div>
            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Item</th>
                  <th className="p-2 border-r border-slate-300">Case No.</th>
                  <th className="p-2 border-r border-slate-300">Parties</th>
                  <th className="p-2 border-r border-slate-300">Stage</th>
                  <th className="p-2">Advocates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {causeList.map(item => (
                  <tr key={item.serialNo}>
                    <td className="p-2 border-r border-slate-200 font-mono">{item.serialNo}</td>
                    <td className="p-2 border-r border-slate-200 font-mono font-bold">{item.caseId}</td>
                    <td className="p-2 border-r border-slate-200">{item.parties}</td>
                    <td className="p-2 border-r border-slate-200 font-mono">{item.stage}</td>
                    <td className="p-2 text-[11px]">{item.counsels}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />

      {/* Case Detail Workspace Modal (Section 27) */}
      <CaseDetailModal
        isOpen={Boolean(inspectedCase)}
        onClose={() => setInspectedCase(null)}
        caseItem={inspectedCase}
      />

      {/* Tribunal Performance Snapshot Modal */}
      <TribunalPerformanceModal
        isOpen={isPerformanceModalOpen}
        onClose={() => setIsPerformanceModalOpen(false)}
      />

    </div>
  );
}
