import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Database, 
  Building2, 
  Scale, 
  Hash, 
  ExternalLink,
  Filter,
  Coins,
  TrendingUp
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function JudicialAuditVaultPage() {
  const { auditLogs, cases, showToast, statutoryRuleConfig, permissions } = useLarrAuthority();

  const [activeTab, setActiveTab] = useState('audit-ledger'); // 'audit-ledger', 'trends', 'ecourts', 'mis-builder', 'parliamentary'
  const [filterActor, setFilterActor] = useState('ALL');
  const [selectedAuditLog, setSelectedAuditLog] = useState(auditLogs[0]);
  const [isReportPdfOpen, setIsReportPdfOpen] = useState(false);
  const [reportFormat, setReportFormat] = useState('PDF');

  // Section 19 MIS Report Builder Filters: Year, State, District, Tribunal, Project, Case Category, Status
  const [misYear, setMisYear] = useState('2025-26');
  const [misState, setMisState] = useState('ALL');
  const [misDistrict, setMisDistrict] = useState('ALL');
  const [misTribunal, setMisTribunal] = useState('Central Gujarat Bench');
  const [misProject, setMisProject] = useState('ALL');
  const [misCategory, setMisCategory] = useState('ALL');
  const [misStatus, setMisStatus] = useState('ALL');

  // Section 19 e-Courts Interoperability Data Grid
  // Fields: Case ID, e-Courts Reference, Integration Status, Last Sync, Last Payload, Error Status
  const [ecourtsSyncGrid] = useState([
    {
      caseId: 'LARR/2026/GJ/001',
      ecourtsRef: 'CNR-GJ-ANAND-LARR-2026-0001',
      integrationStatus: 'SYNCED (e-Courts Phase-III)',
      lastSync: '23/09/2026 15:42:10 IST',
      lastPayload: 'CauseList_DailyOrder_Sec69Award_v1.json (24.8 KB)',
      errorStatus: 'NIL (HTTP 200 OK)'
    },
    {
      caseId: 'LARR/2026/MH/006',
      ecourtsRef: 'CNR-MH-PUNE-LARR-2026-0006',
      integrationStatus: 'SYNCED (Bombay HC NJDG)',
      lastSync: '23/09/2026 12:10:04 IST',
      lastPayload: 'HighCourt_AppealNotice_FA8841.json (18.2 KB)',
      errorStatus: 'NIL (HTTP 200 OK)'
    },
    {
      caseId: 'LARR/2026/KA/007',
      ecourtsRef: 'CNR-KA-BLR-LARR-2026-0007',
      integrationStatus: 'PENDING_ACK',
      lastSync: '22/09/2026 18:30:00 IST',
      lastPayload: 'ExecutionPetition_Warrant_Attachment.json (31.4 KB)',
      errorStatus: 'RETRY_SCHEDULED (Gateway Timeout 504)'
    }
  ]);

  const filteredLogs = auditLogs.filter(log => {
    if (filterActor === 'ALL') return true;
    return log.role === filterActor;
  });

  const handleExportMis = (format) => {
    setReportFormat(format);
    setIsReportPdfOpen(true);
    showToast(`Generating Annual Judicial Performance Report in ${format} format...`, 'info');
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold border border-emerald-300">
              AUDIT &amp; PERFORMANCE VAULT
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Judicial Audit &amp; Performance Vault
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Complete cryptographic audit log of all judicial acts, digital order sheets, Section 69 awards, and institutional performance reports for Parliamentary and Assembly oversight.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleExportMis('PDF')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Annual Performance Report (PDF)</span>
          </button>
          <button
            onClick={() => handleExportMis('Excel')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-slate-700" />
            <span>Export MIS Excel</span>
          </button>
        </div>
      </div>

      {/* 2. STATUTORY DISPOSAL & PERFORMANCE METRICS (Section 19: Annual Disposal, Pending Cases, Average Disposal Time, SLA Compliance, Compensation Enhancement, Appeal Rate, Execution Pending, Case Category Distribution) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2.5 text-xs">
        
        {/* 1. Annual Disposal */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Annual Disposal</div>
          <div className="text-xl font-mono font-extrabold text-[#1B365D]">84.2%</div>
          <div className="text-[9px] text-slate-500">48 / 57 references</div>
        </div>

        {/* 2. Pending Cases */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Pending Cases</div>
          <div className="text-xl font-mono font-extrabold text-[#1B365D]">{cases.length}</div>
          <div className="text-[9px] text-slate-500">Active In Board</div>
        </div>

        {/* 3. Average Disposal Time */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Avg Disposal Time</div>
          <div className="text-xl font-mono font-extrabold text-emerald-800">142 Days</div>
          <div className="text-[9px] text-emerald-700">&lt; 180-Day Limit</div>
        </div>

        {/* 4. SLA Compliance */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">SLA Compliance</div>
          <div className="text-xl font-mono font-extrabold text-emerald-800">89.4%</div>
          <div className="text-[9px] text-emerald-700">Sec 60 Adherence</div>
        </div>

        {/* 5. Compensation Enhancement */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Enhancement</div>
          <div className="text-xl font-mono font-extrabold text-amber-800">₹62.4 Cr</div>
          <div className="text-[9px] text-amber-700">Sec 69 Differential</div>
        </div>

        {/* 6. Appeal Rate */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Appeal Rate</div>
          <div className="text-xl font-mono font-extrabold text-purple-900">8.4%</div>
          <div className="text-[9px] text-purple-700">High Court Appeals</div>
        </div>

        {/* 7. Execution Pending */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-2xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Execution Pending</div>
          <div className="text-xl font-mono font-extrabold text-rose-700">1 Case</div>
          <div className="text-[9px] text-rose-600">Attachment Order</div>
        </div>

      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-4 text-xs font-bold overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('audit-ledger')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'audit-ledger'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Immutable Judicial Audit Log ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('trends')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'trends'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Annual Disposal &amp; Compensation Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab('mis-builder')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'mis-builder'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>MIS Report Builder</span>
        </button>

        <button
          onClick={() => setActiveTab('ecourts')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'ecourts'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>e-Courts Interoperability Grid</span>
        </button>

        <button
          onClick={() => setActiveTab('parliamentary')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'parliamentary'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Parliamentary / Assembly Summary</span>
        </button>
      </div>

      {/* 4. TAB 1: IMMUTABLE AUDIT LOG (Section 20: WHO, ROLE, WORKSPACE, CASE ID, PROJECT ID, ENTITY TYPE, ENTITY ID, ACTION, TIMESTAMP, OLD VALUE, NEW VALUE, DOCUMENT ID, DIGITAL SIGNATURE) */}
      {activeTab === 'audit-ledger' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-[#1B365D] text-xs sm:text-sm">
                Cryptographic Judicial Audit Trail (Immutable Ledger)
              </h3>
              <p className="text-[11px] text-slate-500">
                Guaranteed non-repudiation of all judicial orders, summons, award decrees, and registry scrutinies.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] font-mono text-slate-500 font-bold">Filter Actor:</span>
              <select
                value={filterActor}
                onChange={(e) => setFilterActor(e.target.value)}
                className="p-1 border border-slate-300 rounded bg-white text-xs font-mono"
              >
                <option value="ALL">ALL Roles ({auditLogs.length})</option>
                <option value="PRESIDING_OFFICER">Presiding Officer</option>
                <option value="REGISTRAR">Registrar</option>
                <option value="JUDICIAL_CLERK">Judicial Clerk</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-2.5">Audit Event ID</th>
                  <th className="p-2.5">Timestamp (IST)</th>
                  <th className="p-2.5">Actor &amp; Role</th>
                  <th className="p-2.5">Case ID</th>
                  <th className="p-2.5">Entity Type &amp; Action</th>
                  <th className="p-2.5">Description &amp; Record Hash</th>
                  <th className="p-2.5 text-center">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.auditId} className="hover:bg-slate-50 transition-colors">
                    {/* Event ID */}
                    <td className="p-2.5 font-mono text-[11px] font-bold text-slate-800 whitespace-nowrap">
                      {log.auditId}
                    </td>

                    {/* Timestamp */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* Actor */}
                    <td className="p-2.5 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{log.actorName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{log.role}</div>
                    </td>

                    {/* Case ID */}
                    <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                      {log.caseId}
                    </td>

                    {/* Action */}
                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {log.action}
                      </span>
                    </td>

                    {/* Description & Hash */}
                    <td className="p-2.5 max-w-sm">
                      <div className="text-slate-800 font-sans leading-tight">{log.description}</div>
                      <div className="text-[10px] font-mono text-blue-700 truncate mt-0.5">{log.dscHash}</div>
                    </td>

                    {/* Integrity */}
                    <td className="p-2.5 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        IMMUTABLE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 2: ANNUAL DISPOSAL TREND & COMPENSATION ENHANCEMENT ANALYSIS (Section 19) */}
      {activeTab === 'trends' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Disposal Trend Box */}
            <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
              <h4 className="font-extrabold text-[#1B365D] text-sm border-b border-slate-200 pb-2">
                Annual Reference Disposal Trend (FY 2021–2026)
              </h4>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { year: '2021–22', references: 38, disposed: 32, rate: '84.2%' },
                  { year: '2022–23', references: 44, disposed: 39, rate: '88.6%' },
                  { year: '2023–24', references: 51, disposed: 43, rate: '84.3%' },
                  { year: '2024–25', references: 58, disposed: 50, rate: '86.2%' },
                  { year: '2025–26 (YTD)', references: 57, disposed: 48, rate: '84.2%' }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">{row.year}</span>
                    <span>Received: {row.references}</span>
                    <span className="text-emerald-700 font-bold">Disposed: {row.disposed}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                      {row.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compensation Enhancement Analysis Box */}
            <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
              <h4 className="font-extrabold text-[#1B365D] text-sm border-b border-slate-200 pb-2">
                Section 69 Compensation Enhancement Analysis
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Total Enhanced Compensation (YTD)</div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-950 mt-1">₹62.40 Crore</div>
                  <div className="text-[11px] text-emerald-800 mt-1">Average 38.4% enhancement over initial Special Land Acquisition Officer awards</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between"><span>Top Ground for Enhancement:</span> <strong className="text-slate-900">Perennial Irrigation Severance (42%)</strong></div>
                  <div className="flex justify-between"><span>Registered Exemplar Discrepancy:</span> <strong className="text-slate-900">Jantar Under-Rate (35%)</strong></div>
                  <div className="flex justify-between"><span>Tree &amp; Structure Valuation:</span> <strong className="text-slate-900">Approved Valuer Overhaul (23%)</strong></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 6. TAB 3: MIS REPORT BUILDER (Section 19: Filters: Year, State, District, Tribunal, Project, Case Category, Status) */}
      {activeTab === 'mis-builder' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">STATUTORY REPORT GENERATOR</div>
              <h4 className="font-extrabold text-[#1B365D] text-sm">
                MIS Report Builder (Multi-Parameter Judicial Filters)
              </h4>
            </div>
            <button
              onClick={() => handleExportMis('PDF')}
              className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Generate Customized Dossier PDF
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Year</label>
              <select value={misYear} onChange={(e) => setMisYear(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="2025-26">2025–26</option>
                <option value="2024-25">2024–25</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">State</label>
              <select value={misState} onChange={(e) => setMisState(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="ALL">ALL States</option>
                <option value="GJ">Gujarat</option>
                <option value="MH">Maharashtra</option>
                <option value="PB">Punjab</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">District</label>
              <select value={misDistrict} onChange={(e) => setMisDistrict(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="ALL">ALL Districts</option>
                <option value="Anand">Anand</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Tribunal Bench</label>
              <select value={misTribunal} onChange={(e) => setMisTribunal(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="Central Gujarat Bench">Central Gujarat Bench</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Project</label>
              <select value={misProject} onChange={(e) => setMisProject(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="ALL">ALL Projects</option>
                <option value="Freight">Freight Corridor</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Case Category</label>
              <select value={misCategory} onChange={(e) => setMisCategory(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="ALL">ALL Categories</option>
                <option value="Agricultural">Agricultural Jirayat</option>
                <option value="Commercial">Commercial / Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Statutory Status</label>
              <select value={misStatus} onChange={(e) => setMisStatus(e.target.value)} className="w-full p-1.5 border border-slate-300 rounded bg-slate-50">
                <option value="ALL">ALL Statuses</option>
                <option value="DISPOSED">DISPOSED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB 4: e-COURTS INTEROPERABILITY DATA GRID (Section 19: Case ID, e-Courts Reference, Integration Status, Last Sync, Last Payload, Error Status) */}
      {activeTab === 'ecourts' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-extrabold text-[#1B365D] text-xs sm:text-sm">
              e-Courts Phase-III &amp; National Judicial Data Grid (NJDG) Interoperability
            </h3>
            <p className="text-[11px] text-slate-500">
              API integration gateway connecting LARR Authority orders to High Court registries and e-Courts Portal.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-2.5">Case ID</th>
                  <th className="p-2.5">e-Courts CNR Reference</th>
                  <th className="p-2.5">Integration Status</th>
                  <th className="p-2.5">Last Sync Timestamp</th>
                  <th className="p-2.5">Last Encrypted Payload</th>
                  <th className="p-2.5 text-center">HTTP Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ecourtsSyncGrid.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                      {row.caseId}
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-blue-700 font-bold whitespace-nowrap">
                      {row.ecourtsRef}
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {row.integrationStatus}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {row.lastSync}
                    </td>
                    <td className="p-2.5 font-mono text-[10px] text-slate-700 truncate max-w-xs" title={row.lastPayload}>
                      {row.lastPayload}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-800">
                        {row.errorStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. TAB 5: PARLIAMENTARY / ASSEMBLY MIS SUMMARY (Section 19: Reporting only) */}
      {activeTab === 'parliamentary' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
          <div className="border-b border-slate-200 pb-2">
            <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">CONSTITUTIONAL OVERSIGHT</div>
            <h4 className="font-extrabold text-[#1B365D] text-sm">
              Parliamentary &amp; Legislative Assembly Annual MIS Dossier (Read-Only)
            </h4>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-800 leading-relaxed font-serif">
            <p>
              In compliance with statutory reporting under Section 71 and Section 100 of the RFCTLARR Act 2013, this Authority places on record the complete statistical dossier of land acquisition references received, compensation enhanced, and appellate affirmation rates for the Union Ministry of Rural Development and the State Legislative Assembly.
            </p>
            <div className="p-3 bg-white border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div>• Total Land References Adjudicated (2025–26): <strong>48 Matters</strong></div>
              <div>• Total Acquired Land Area Settled: <strong>142.8 Hectares</strong></div>
              <div>• Average Disposal Duration: <strong>142 Days (Adheres to 180-Day Mandate)</strong></div>
              <div>• High Court Affirmation Rate: <strong>91.6% (Decisions Upheld)</strong></div>
            </div>
            <p className="text-[11px] text-slate-500 font-sans italic">
              Note: This administrative reporting layer is read-only and does not possess access to modify or reopen pronounced judicial orders.
            </p>
          </div>
        </div>
      )}

      {/* Annual Performance Report PDF Modal (Section 19) */}
      <OfficialDocumentViewerModal
        isOpen={isReportPdfOpen}
        onClose={() => setIsReportPdfOpen(false)}
        title={`Annual Judicial Performance Report (FY 2025–26)`}
        documentType="PERFORMANCE_REPORT"
        caseData={cases[0]}
        metadata={{
          docId: `REPORT-ANNUAL-2026-LARR`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              ANNUAL STATUTORY PERFORMANCE &amp; AUDIT REPORT (FY 2025–2026)
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div><strong>TRIBUNAL:</strong> Land Acquisition, Rehabilitation &amp; Resettlement Authority, Central Gujarat Bench</div>
              <div><strong>PRESIDING OFFICER:</strong> Hon'ble Shri Justice M.D. Shukla</div>
              <div><strong>REPORTING PERIOD:</strong> 01 April 2025 to 23 September 2026</div>
            </div>

            <table className="w-full text-left text-xs border border-slate-300 font-sans mt-2">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Statutory Performance Parameter</th>
                  <th className="p-2 border-r border-slate-300">National Standard</th>
                  <th className="p-2 text-right">Bench Achievement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-2 border-r border-slate-200 font-sans">Reference Disposal Clearance Rate</td>
                  <td className="p-2 border-r border-slate-200 font-sans">80.0%</td>
                  <td className="p-2 text-right font-bold text-emerald-800">84.2%</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200 font-sans">Average Disposal Duration (Section 60)</td>
                  <td className="p-2 border-r border-slate-200 font-sans">&le; 180 Days</td>
                  <td className="p-2 text-right font-bold text-emerald-800">142 Days</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200 font-sans">Appellate Affirmation by Hon'ble High Court</td>
                  <td className="p-2 border-r border-slate-200 font-sans">&ge; 85.0%</td>
                  <td className="p-2 text-right font-bold text-purple-900">91.6%</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200 font-sans">Total Enhanced Compensation Awarded</td>
                  <td className="p-2 border-r border-slate-200 font-sans">Section 69 Adjudication</td>
                  <td className="p-2 text-right font-bold text-amber-900">₹62.40 Crore</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      />

    </div>
  );
}
