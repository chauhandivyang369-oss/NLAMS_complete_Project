import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Home, 
  Coins, 
  Building,
  Check,
  Search,
  Filter,
  Eye,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import { MOCK_OBJECTIONS_AND_RNR } from '../services/appropriateGovMockData.js';

export default function RnRReviewObjectionsPage() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    onSwitchWorkspace,
    jurisdiction,
    config
  } = useAppropriateGovernment();

  const isCentral = jurisdiction === 'CENTRAL';

  // Find objection and R&R data for current project or fallback
  const activeObjRnR = MOCK_OBJECTIONS_AND_RNR.find(o => o.projectId === selectedProjectId) || MOCK_OBJECTIONS_AND_RNR[0];
  const objectionsList = activeObjRnR?.objectionsList || [];
  const rnrScheme = activeObjRnR?.rnrSchemeSummary || {};

  const [selectedObjectionId, setSelectedObjectionId] = useState(objectionsList[0]?.id || 'OBJ-041-01');
  const [detailTab, setDetailTab] = useState('summary');
  // 'summary' | 'collector-response' | 'evidence' | 'gis' | 'rnr-scheme' | 'family' | 'entitlements' | 'decision' | 'audit'

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [recordedSatisfaction, setRecordedSatisfaction] = useState(true);

  // Clarification / Reason Modal
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalActionType, setModalActionType] = useState('ACCEPT'); // 'ACCEPT' | 'CLARIFY' | 'RETURN'
  const [actionReason, setActionReason] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const selectedObjection = objectionsList.find(o => o.id === selectedObjectionId) || objectionsList[0];

  // Counts
  const totalObj = activeObjRnR?.totalObjectionsReceived || 48;
  const resolvedObj = activeObjRnR?.objectionsResolved || 37;
  const pendingObj = activeObjRnR?.objectionsPending || 11;
  const clarificationObj = 2;
  const disposedObj = resolvedObj;

  const filteredObjections = objectionsList.filter(o => {
    const matchesSearch = o.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.ulpin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleTriggerAction = (type) => {
    setModalActionType(type);
    if (type === 'ACCEPT') {
      setActionReason('Statutory satisfaction affirmed under Section 19(1). Collector recommendations and R&R scheme found compliant with RFCTLARR Act 2013 Second Schedule.');
    } else if (type === 'CLARIFY') {
      setActionReason('Seek clarification from District Collector regarding valuation of industrial cold storage asset.');
    } else {
      setActionReason('Returned to Collector for fresh personal hearing regarding realignment.');
    }
    setShowActionModal(true);
  };

  const handleConfirmAction = () => {
    setShowActionModal(false);
    if (modalActionType === 'ACCEPT') {
      setRecordedSatisfaction(true);
      setActionSuccessMsg('Statutory satisfaction recorded successfully and registered in audit trail.');
    } else {
      setActionSuccessMsg(`Action [${modalActionType}] dispatched to District Collector office.`);
    }
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral 
                ? 'Central R&R Review & Section 15 Objections Portal' 
                : 'State R&R Review & Section 15 Objections Portal'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isCentral
              ? 'Review District Collector Section 15(2) hearing reports, Commissioner approved R&R schemes and record Central Government statutory satisfaction'
              : 'Review District Collector Section 15(2) reports, Divisional Commissioner R&R schemes and State Monitoring Committee (SMC) compliance'}
          </p>
        </div>

        {/* Project Selector & Workspace Deep Link */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedProjectId || ''}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-slate-300 bg-white font-semibold text-slate-800 outline-none cursor-pointer max-w-xs truncate"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} — {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => onSwitchWorkspace && onSwitchWorkspace('rr-authority')}
            className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Inspect complete census and allotment in R&R Authority Workspace"
          >
            <span>Open R&amp;R Authority</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Success Banner if action performed */}
      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold">{actionSuccessMsg}</span>
        </div>
      )}

      {/* 2. Top Objection Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">TOTAL OBJECTIONS</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">{totalObj}</div>
          <div className="text-[10px] text-slate-400 font-mono">Sec 15(1) Filings</div>
        </div>
        <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-blue-700 font-bold">NEW / UNDER REVIEW</div>
          <div className="text-lg font-bold font-mono text-blue-900 mt-0.5">3</div>
          <div className="text-[10px] text-slate-400 font-mono">Collector Bench</div>
        </div>
        <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-amber-700 font-bold">PENDING DISPOSAL</div>
          <div className="text-lg font-bold font-mono text-amber-900 mt-0.5">{pendingObj}</div>
          <div className="text-[10px] text-slate-400 font-mono">Hearings Scheduled</div>
        </div>
        <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-purple-700 font-bold">CLARIFICATION REQ.</div>
          <div className="text-lg font-bold font-mono text-purple-900 mt-0.5">{clarificationObj}</div>
          <div className="text-[10px] text-slate-400 font-mono">Returned to Collector</div>
        </div>
        <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">DISPOSED / SETTLED</div>
          <div className="text-lg font-bold font-mono text-emerald-900 mt-0.5">{disposedObj}</div>
          <div className="text-[10px] text-emerald-700 font-mono">Sec 15(2) Report OK</div>
        </div>
      </div>

      {/* 3. Statutory Satisfaction Affirmation Banner */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded border border-emerald-300 text-xs flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-200 text-emerald-900 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <div className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
              <span>Appropriate Government Statutory Satisfaction Gate (Section 19 Pre-Condition)</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 font-bold">
                {recordedSatisfaction ? 'AFFIRMED' : 'PENDING'}
              </span>
            </div>
            <p className="text-emerald-800 text-[11px] mt-0.5 leading-relaxed">
              Having examined Collector&apos;s recommendations under Section 15(2) and R&amp;R Commissioner approved scheme under Section 18, 
              satisfaction is recorded that public purpose is established and R&amp;R scheme is adequate.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTriggerAction('ACCEPT')}
            className={`px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors ${
              recordedSatisfaction
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{recordedSatisfaction ? 'Satisfaction Affirmed' : 'Record Satisfaction'}</span>
          </button>
        </div>
      </div>

      {/* 4. Main Two-Column Layout: Left (Objections Desk) & Right (R&R Scheme Gateway) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Section 15 Objections Register & Workbench (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Objections Table Panel */}
          <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                  Section 15 Objections Register
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hearings conducted by Collector/LAO within 60 days of Section 11 publication
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-2 text-xs">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2 top-2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search Owner, ULPIN..."
                    className="pl-7 pr-2 py-1 rounded border border-slate-300 text-xs outline-none focus:border-[#1B365D]"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="px-2 py-1 rounded border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="DISPOSED_WITH_RR_RELIEF">Disposed with Relief</option>
                  <option value="DISPOSED_FORWARDED_TO_AWARD">Forwarded to Award</option>
                  <option value="RESOLVED_BY_DESIGN_MODIFICATION">Resolved by Realignment</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 min-w-[550px]">
                <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono tracking-wider">
                  <tr>
                    <th className="py-2 px-2.5">Objection ID &amp; Date</th>
                    <th className="py-2 px-2.5">Landowner &amp; ULPIN</th>
                    <th className="py-2 px-2.5">Ground of Objection</th>
                    <th className="py-2 px-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {filteredObjections.map(obj => {
                    const isSelected = obj.id === selectedObjectionId;
                    return (
                      <tr
                        key={obj.id}
                        onClick={() => setSelectedObjectionId(obj.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-2.5">
                          <div className="font-mono font-bold text-slate-900">{obj.id}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{obj.filingDate}</div>
                        </td>
                        <td className="py-2.5 px-2.5">
                          <div className="font-bold text-slate-900">{obj.ownerName}</div>
                          <div className="text-[10px] font-mono text-blue-700">{obj.ulpin}</div>
                        </td>
                        <td className="py-2.5 px-2.5 max-w-xs">
                          <div className="text-[11px] text-slate-800 line-clamp-1 font-serif italic">
                            &ldquo;{obj.ground}&rdquo;
                          </div>
                        </td>
                        <td className="py-2.5 px-2.5 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono">
                            {obj.status?.replace(/_/g, ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Objection In-Page Detail Tabs */}
          {selectedObjection && (
            <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                      {selectedObjection.id}
                    </span>
                    <h4 className="font-bold text-[#1B365D] text-xs sm:text-sm">
                      {selectedObjection.ownerName}
                    </h4>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    ULPIN: {selectedObjection.ulpin} • Filed: {selectedObjection.filingDate}
                  </div>
                </div>

                {/* Statutory Actions on Selected Objection */}
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => handleTriggerAction('ACCEPT')}
                    className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold cursor-pointer"
                  >
                    Accept Recommendation
                  </button>
                  <button
                    onClick={() => handleTriggerAction('CLARIFY')}
                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-[11px] font-semibold cursor-pointer"
                  >
                    Seek Clarification
                  </button>
                  <button
                    onClick={() => handleTriggerAction('RETURN')}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded text-[11px] font-semibold cursor-pointer"
                  >
                    Return
                  </button>
                </div>
              </div>

              {/* In-Page Detail Tabs (NOT sidebar menus) */}
              <div className="flex border-b border-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap">
                {[
                  { id: 'summary', label: '1. Objection Summary' },
                  { id: 'collector-response', label: '2. Collector Response' },
                  { id: 'evidence', label: '3. Evidence' },
                  { id: 'gis', label: '4. Cadastral GIS' },
                  { id: 'decision', label: '5. Decision Record' },
                  { id: 'audit', label: '6. Audit Trail' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setDetailTab(t.id)}
                    className={`py-1.5 px-2.5 border-b-2 cursor-pointer transition-colors ${
                      detailTab === t.id
                        ? 'border-[#1B365D] text-[#1B365D] font-bold bg-slate-50'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Detail Content */}
              {detailTab === 'summary' && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-700">Ground of Objection:</div>
                  <p className="text-slate-800 italic bg-white p-2 rounded border border-slate-200 font-serif leading-relaxed">
                    &ldquo;{selectedObjection.ground}&rdquo;
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1">
                    Filing Channel: Written petition submitted to District Collectorate / SDO Office.
                  </div>
                </div>
              )}

              {detailTab === 'collector-response' && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
                  <div className="font-semibold text-[#1B365D]">District Collector Section 15(2) Finding:</div>
                  <p className="text-slate-800 bg-white p-2.5 rounded border border-slate-200 font-serif leading-relaxed">
                    &ldquo;{selectedObjection.collectorFinding}&rdquo;
                  </p>
                  <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Personal hearing conducted in presence of titleholder and Requiring Body engineers.
                  </div>
                </div>
              )}

              {detailTab === 'evidence' && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
                  <div className="font-semibold text-slate-800">Attached Hearing Evidence:</div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="font-medium text-slate-900">{selectedObjection.evidenceDoc}</div>
                        <div className="text-[10px] text-slate-400">Hearing transcript, site photograph &amp; Collector order</div>
                      </div>
                    </div>
                    <button className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-[11px] font-semibold cursor-pointer">
                      Download
                    </button>
                  </div>
                </div>
              )}

              {detailTab === 'gis' && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                  <div className="font-semibold text-slate-800">Spatial Geometry Verification:</div>
                  <p className="text-slate-600 text-[11px]">
                    Cadastral polygon for ULPIN <span className="font-mono text-blue-700">{selectedObjection.ulpin}</span> verified against project alignment buffer. 
                    Realignment shift of 14 meters westward validated in vector cadastre.
                  </p>
                </div>
              )}

              {detailTab === 'decision' && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-800">Appropriate Government Recorded Reason:</div>
                  <p className="text-slate-700 text-[11px] bg-white p-2 rounded border border-slate-200 font-mono">
                    STATUTORY_SATISFACTION_ACCORDED: Collector recommendation for R&amp;R housing plot grant confirmed. Accepted for Section 19 declaration inclusion.
                  </p>
                </div>
              )}

              {detailTab === 'audit' && (
                <div className="space-y-1 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900">SEC_15_HEARING_COMPLETED</span>
                      <div className="text-[10px] text-slate-500 font-sans">Collectorate Staff</div>
                    </div>
                    <span className="text-[10px] text-slate-400">{selectedObjection.filingDate}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <div>
                      <span className="font-bold text-emerald-800">RECOMMENDATION_FORMULATED</span>
                      <div className="text-[10px] text-slate-500 font-sans">District Collector</div>
                    </div>
                    <span className="text-[10px] text-slate-400">2025-11-04</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: R&R Commissioner Scheme Gateway (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                  R&amp;R Commissioner Scheme (Sec 18)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Approved scheme submitted to Appropriate Government
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                {rnrScheme.status || 'SANCTIONED'}
              </span>
            </div>

            {/* Committee Context (Central vs State) */}
            <div className={`p-2.5 rounded border text-xs space-y-1 ${
              isCentral ? 'bg-blue-50 border-blue-200 text-blue-950' : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="font-bold flex items-center justify-between">
                <span>{isCentral ? 'NMC Monitoring Mandate' : 'SMC Monitoring Mandate'}</span>
                <span className="text-[9px] font-mono px-1 rounded bg-white font-bold">
                  {isCentral ? 'Section 48' : 'State Rules'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {isCentral 
                  ? 'National Monitoring Committee oversight active. Fund flow verified across Inter-State segments.'
                  : 'State Monitoring Committee quarterly audit verified. All taluk allotments certified.'}
              </p>
            </div>

            {/* Scheme Details Table */}
            <div className="space-y-2 divide-y divide-slate-100 text-slate-700">
              <div className="pt-1.5 flex justify-between">
                <span className="text-slate-500">Scheme ID:</span>
                <span className="font-mono font-bold text-[#1B365D]">{rnrScheme.schemeId}</span>
              </div>
              <div className="pt-1.5 flex justify-between">
                <span className="text-slate-500">R&amp;R Administrator:</span>
                <span className="font-semibold text-slate-900">{rnrScheme.administratorName}</span>
              </div>
              <div className="pt-1.5 flex justify-between">
                <span className="text-slate-500">R&amp;R Commissioner:</span>
                <span className="font-semibold text-slate-900">{rnrScheme.commissionerName}</span>
              </div>
              <div className="pt-1.5 flex justify-between">
                <span className="text-slate-500">Sanction Order:</span>
                <span className="font-mono text-slate-800 font-medium">{rnrScheme.approvalOrderNo}</span>
              </div>
            </div>

            {/* Census Numbers */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Affected Families</div>
                <div className="text-base font-bold font-mono text-slate-900">{rnrScheme.affectedFamiliesCount}</div>
                <div className="text-[10px] text-slate-400">Total Census</div>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Displaced Families</div>
                <div className="text-base font-bold font-mono text-amber-800">{rnrScheme.displacedFamiliesCount}</div>
                <div className="text-[10px] text-amber-700">Physical Relocation</div>
              </div>
            </div>

            {/* Resettlement Area */}
            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Resettlement Colony Demarcation:</span>
              </div>
              <div className="text-[11px] text-slate-700 font-medium">
                {rnrScheme.resettlementAreaLocation}
              </div>
              <div className="text-[10px] text-slate-500 pt-1">
                Civic Amenities: {rnrScheme.civicAmenitiesProvided?.join(', ')}
              </div>
            </div>

            {/* SC/ST Plan where applicable */}
            {(rnrScheme.scheduledCastesFamilies > 0 || rnrScheme.scheduledTribesFamilies > 0) && (
              <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 space-y-1 text-[11px]">
                <div className="font-bold text-emerald-900">
                  Section 41 &amp; 42 Scheduled Castes / Scheduled Tribes Plan:
                </div>
                <p className="text-emerald-800">
                  SC Families: {rnrScheme.scheduledCastesFamilies || 0} • ST Families: {rnrScheme.scheduledTribesFamilies || 0}
                  <br />
                  Special development plan sanctioned: 20% additional land allotment and 1/3rd advance compensation escrow funded.
                </p>
              </div>
            )}

            {/* Actions on R&R Scheme */}
            <div className="pt-2 border-t flex flex-col gap-2">
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('rr-authority')}
                className="w-full py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Examine Scheme in R&amp;R Authority Workspace</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Query Memo Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-xl max-w-md w-full p-4 space-y-3 text-xs">
            <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2 border-b pb-2">
              <AlertCircle className="w-4 h-4 text-[#C5A059]" />
              {modalActionType === 'ACCEPT' && 'Affirm Statutory Satisfaction (Sec 19 Gate)'}
              {modalActionType === 'CLARIFY' && 'Seek Clarification from District Collector'}
              {modalActionType === 'RETURN' && 'Return to Collector for Re-Hearing'}
            </div>
            <p className="text-slate-600">
              Record formal statutory reasons for the decision. This entry is non-repudiable and will be registered in the immutable audit log.
            </p>
            <textarea
              rows={4}
              value={actionReason}
              onChange={e => setActionReason(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 outline-none focus:border-[#1B365D] text-xs font-serif"
            />
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-800 rounded font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold cursor-pointer"
              >
                Confirm &amp; Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
