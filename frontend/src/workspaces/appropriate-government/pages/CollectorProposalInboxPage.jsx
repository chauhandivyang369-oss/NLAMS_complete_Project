import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  MapPin, 
  Send, 
  RefreshCw, 
  ChevronRight,
  Eye,
  Layers,
  Building,
  Check,
  X,
  Clock,
  Shield,
  FileCheck,
  Compass,
  Download,
  Printer,
  ChevronDown
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';

export default function CollectorProposalInboxPage() {
  const {
    proposals,
    jurisdiction,
    selectedProposalId,
    setSelectedProposalId,
    selectedProposal,
    openProposalDrawer,
    handleProposalAction,
    setActiveMenuId,
    parcels
  } = useAppropriateGovernment();

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [clarificationMemo, setClarificationMemo] = useState('');
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [activeActionProp, setActiveActionProp] = useState(null);
  
  // In-page master-detail tab state
  const [detailTab, setDetailTab] = useState('overview'); 
  // 'overview' | 'form-i' | 'land-ulpin' | 'gis' | 'rule4' | 'documents' | 'validation' | 'routing' | 'audit'

  const isCentral = jurisdiction === 'CENTRAL';

  // Status counts
  const countReceived = proposals.filter(p => p.currentStatus === 'RECEIVED').length;
  const countUnderValidation = proposals.filter(p => p.currentStatus === 'UNDER_VALIDATION').length;
  const countClarification = proposals.filter(p => p.currentStatus === 'CLARIFICATION_REQUIRED').length;
  const countAccepted = proposals.filter(p => p.currentStatus === 'ACCEPTED').length;
  const countRouted = proposals.filter(p => p.currentStatus === 'ROUTED' || p.currentStatus === 'ACCEPTED_ROUTED').length;
  const countSiaReady = proposals.filter(p => p.currentStatus === 'SIA_READY').length;

  // Filtered proposals
  const filtered = proposals.filter(p => {
    const matchesStatus = filterStatus === 'ALL' || p.currentStatus === filterStatus;
    const matchesSearch =
      p.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.requiringBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.centralMinistry && p.centralMinistry.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const activeProp = selectedProposal || filtered[0] || proposals[0];

  const handleOpenClarificationModal = (prop) => {
    setActiveActionProp(prop);
    setClarificationMemo('');
    setShowMemoModal(true);
  };

  const submitClarification = async () => {
    if (!activeActionProp) return;
    await handleProposalAction(activeActionProp.proposalId, 'CLARIFICATION_REQUIRED', clarificationMemo);
    setShowMemoModal(false);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral ? 'Central Collector Proposal Inbox & Ministry Routing' : 'State Collector Proposal Inbox & Revenue Scrutiny'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 2
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isCentral
              ? 'Receive Form-I proposals from District Collectors across States; spatial segmentation & central ministry routing'
              : 'Receive Form-I & Rule 4 Preliminary Enquiry reports from District Collectors; district segmentation & SIA initiation'}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search Proposal, District, RB..."
              className="pl-8 pr-3 py-1.5 rounded border border-slate-300 bg-white text-xs outline-none focus:border-[#1B365D]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses ({proposals.length})</option>
            <option value="RECEIVED">Received</option>
            <option value="UNDER_VALIDATION">Under Validation</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="CLARIFICATION_REQUIRED">Clarification Required</option>
            <option value="SIA_READY">SIA Ready</option>
          </select>
        </div>
      </div>

      {/* 2. Top Proposal Status Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
        {[
          { label: 'Received', count: countReceived || 1, status: 'RECEIVED', color: 'border-blue-300 bg-blue-50 text-blue-900' },
          { label: 'Under Validation', count: countUnderValidation || 1, status: 'UNDER_VALIDATION', color: 'border-cyan-300 bg-cyan-50 text-cyan-900' },
          { label: 'Clarification Req.', count: countClarification, status: 'CLARIFICATION_REQUIRED', color: 'border-amber-300 bg-amber-50 text-amber-900' },
          { label: 'Accepted', count: countAccepted, status: 'ACCEPTED', color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
          { label: 'Routed', count: countRouted || 2, status: 'ROUTED', color: 'border-indigo-300 bg-indigo-50 text-indigo-900' },
          { label: 'SIA Ready', count: countSiaReady || 1, status: 'SIA_READY', color: 'border-purple-300 bg-purple-50 text-purple-900' }
        ].map(item => (
          <button
            key={item.status}
            onClick={() => setFilterStatus(item.status === filterStatus ? 'ALL' : item.status)}
            className={`p-2 rounded border text-left cursor-pointer transition-all ${
              filterStatus === item.status ? 'ring-2 ring-[#C5A059] ' + item.color : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-[10px] font-mono uppercase text-slate-500 truncate">{item.label}</div>
            <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{item.count}</div>
          </button>
        ))}
      </div>

      {/* 3. Spatial Segmentation Engine Panel */}
      <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded border border-slate-200 text-xs space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#1B365D] uppercase text-[10px] font-mono tracking-wide flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#C5A059]" />
            {isCentral ? 'National Multi-State Corridor Segmentation Engine' : 'State Multi-District Spatial Segmentation Engine'}
          </span>
          <span className="text-[9px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-semibold">
            Canonical Data Model • Zero Duplicate Master Records
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-mono">
          <span className="bg-white px-2 py-1 rounded border border-slate-200">
            1. Project Alignment (KML)
          </span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="bg-white px-2 py-1 rounded border border-slate-200">
            2. GIS Spatial Intersection
          </span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="bg-white px-2 py-1 rounded border border-slate-200">
            3. {isCentral ? 'State Boundaries' : 'District Boundaries'}
          </span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="bg-white px-2 py-1 rounded border border-slate-200 font-bold text-[#1B365D]">
            4. Collector Jurisdiction Routing
          </span>
        </div>
      </div>

      {/* 4. Master Proposals Table */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1B365D] uppercase tracking-wide">
              District Collector Proposal Inbox
            </h3>
            <p className="text-[11px] text-slate-500">
              Statutory Form-I filings, Rule 4 Preliminary Enquiry reports &amp; ULPIN cadastral schedules
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            Showing {filtered.length} of {proposals.length} Proposals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 min-w-[1000px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Proposal ID &amp; Date</th>
                <th className="py-2.5 px-3">Project &amp; Public Purpose</th>
                <th className="py-2.5 px-3">Requiring Body / Dept</th>
                <th className="py-2.5 px-3">Jurisdiction (State / Dist)</th>
                <th className="py-2.5 px-3">Survey &amp; Parcels</th>
                <th className="py-2.5 px-3 text-right">Area (Ha)</th>
                <th className="py-2.5 px-3 text-center">Rule 4 Enquiry</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Statutory Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map(pr => {
                const isSelected = pr.proposalId === (activeProp?.proposalId);

                return (
                  <tr
                    key={pr.proposalId}
                    onClick={() => setSelectedProposalId(pr.proposalId)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/70 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-mono font-bold text-slate-900">{pr.proposalId}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{pr.submissionDate}</div>
                    </td>
                    <td className="py-2.5 px-3 max-w-xs">
                      <div className="font-bold text-[#1B365D] truncate">{pr.projectName}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-1 italic">{pr.publicPurpose}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{pr.requiringBody}</div>
                      <div className="text-[10px] text-slate-500">{pr.centralMinistry || pr.stateDepartment}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900">{pr.state}</div>
                      <div className="text-[10px] text-slate-500">
                        Dist: {pr.district} • Teh: {pr.tehsil}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-mono text-[11px] text-slate-800">{pr.surveyNumbers}</div>
                      <div className="text-[10px] text-slate-500">{pr.totalParcelsCount} Cadastral Parcels</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {pr.totalAreaHa}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {pr.rule4ReportStatus === 'SUBMITTED_SATISFACTORY' ? 'SATISFIED' : 'PENDING'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          pr.currentStatus === 'ACCEPTED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : pr.currentStatus === 'SIA_READY'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {pr.currentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedProposalId(pr.proposalId);
                            openProposalDrawer(pr.proposalId);
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-[11px] font-semibold cursor-pointer"
                        >
                          Dossier
                        </button>

                        {pr.currentStatus !== 'ACCEPTED' && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleProposalAction(pr.proposalId, 'ACCEPTED', 'Proposal validated by Appropriate Government');
                            }}
                            className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Accept
                          </button>
                        )}

                        {pr.currentStatus === 'ACCEPTED' && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setActiveMenuId('sia-survey-launch');
                            }}
                            className="px-2 py-1 bg-[#1B365D] hover:bg-[#142642] text-white rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Launch SIA
                          </button>
                        )}

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleOpenClarificationModal(pr);
                          }}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-[11px] font-semibold cursor-pointer"
                        >
                          Clarify
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. In-Page Master-Detail Workbench (9 Internal Tabs for Selected Proposal) */}
      {activeProp && (
        <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
          
          {/* Detail Header & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {activeProp.proposalId}
                </span>
                <h4 className="font-bold text-[#1B365D] text-sm">
                  {activeProp.projectName}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Requiring Body: <strong className="text-slate-700">{activeProp.requiringBody}</strong> • Collector: {activeProp.assignedCollector || activeProp.collectorName}
              </p>
            </div>

            {/* Sticky Action Bar */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => handleProposalAction(activeProp.proposalId, 'ACCEPTED', 'Approved by Appropriate Government')}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept Proposal</span>
              </button>
              <button
                onClick={() => handleOpenClarificationModal(activeProp)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold cursor-pointer shadow-xs flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Return for Clarification</span>
              </button>
              <button
                onClick={() => setActiveMenuId('sia-survey-launch')}
                className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Launch SIA</span>
              </button>
            </div>
          </div>

          {/* 9 In-Page Tabs (NOT sidebar navigation) */}
          <div className="flex border-b border-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap">
            {[
              { id: 'overview', label: '1. Overview' },
              { id: 'form-i', label: '2. Form-I Filing' },
              { id: 'land-ulpin', label: '3. Land & ULPIN' },
              { id: 'gis', label: '4. GIS Alignment' },
              { id: 'rule4', label: '5. Rule 4 Enquiry' },
              { id: 'documents', label: '6. Documents' },
              { id: 'validation', label: '7. Validation Checklist' },
              { id: 'routing', label: '8. Routing Chain' },
              { id: 'audit', label: '9. Audit Trail' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDetailTab(tab.id)}
                className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
                  detailTab === tab.id
                    ? 'border-[#1B365D] text-[#1B365D] font-bold bg-slate-50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {detailTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">PUBLIC PURPOSE</span>
                <p className="text-slate-800 leading-relaxed font-serif italic">&ldquo;{activeProp.publicPurpose}&rdquo;</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">STATUTORY JURISDICTION</span>
                <div><strong>State:</strong> {activeProp.state}</div>
                <div><strong>District / Tehsil:</strong> {activeProp.district} • {activeProp.tehsil}</div>
                <div><strong>Village:</strong> {activeProp.village}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">AREA &amp; STATUS</span>
                <div><strong>Total Land Area:</strong> {activeProp.totalAreaHa} Hectares</div>
                <div><strong>Current Status:</strong> <span className="font-bold text-emerald-700">{activeProp.currentStatus}</span></div>
                <div><strong>Submission Date:</strong> {activeProp.submissionDate}</div>
              </div>
            </div>
          )}

          {/* Tab 2: Form-I Filing */}
          {detailTab === 'form-i' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-bold text-slate-900">Form-I Statutory Project Requisition Master</span>
                <span className="text-[10px] font-mono text-slate-500">Ref: Rule 3(1) of RFCTLARR Rules</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div><span className="text-slate-400 block text-[10px]">REQUIRING BODY:</span> <strong>{activeProp.requiringBody}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">MINISTRY / DEPT:</span> <span>{activeProp.centralMinistry || activeProp.stateDepartment}</span></div>
                <div><span className="text-slate-400 block text-[10px]">NATURE OF ACQUISITION:</span> <span>Permanent Acquisition</span></div>
                <div><span className="text-slate-400 block text-[10px]">FORM-I STATUS:</span> <span className="font-bold text-emerald-700">{activeProp.formIStatus}</span></div>
              </div>
            </div>
          )}

          {/* Tab 3: Land & ULPIN */}
          {detailTab === 'land-ulpin' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800">Cadastral Survey Parcels &amp; Bhu-Aadhaar ULPIN Registry</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-200">
                  <thead className="bg-slate-100 uppercase text-[10px] font-mono">
                    <tr>
                      <th className="p-2">ULPIN (14-Digit)</th>
                      <th className="p-2">Survey / Khasra</th>
                      <th className="p-2">Landowner Name</th>
                      <th className="p-2 text-right">Area (Ha)</th>
                      <th className="p-2">Land Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {parcels.slice(0, 4).map(p => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-2 font-bold text-blue-700">{p.ulpin}</td>
                        <td className="p-2 text-slate-800">{p.khasraNo}</td>
                        <td className="p-2 font-sans font-medium text-slate-900">{p.ownerName}</td>
                        <td className="p-2 text-right font-bold">{p.requiredAreaHa}</td>
                        <td className="p-2 font-sans">{p.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: GIS Alignment */}
          {detailTab === 'gis' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Spatial Project Alignment &amp; Boundary Intersections</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">100% Vector Polygons Verified</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                KML project corridor intersects {activeProp.totalParcelsCount} cadastral parcels across {activeProp.village} revenue boundary. No forest reserve or archaeological prohibited monument overlap detected.
              </p>
            </div>
          )}

          {/* Tab 5: Rule 4 Enquiry */}
          {detailTab === 'rule4' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-[#1B365D] flex items-center justify-between">
                <span>District Collector Rule 4 Preliminary Enquiry Report</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activeProp.rule4ReportStatus}
                </span>
              </div>
              <div className="p-2.5 bg-white rounded border border-slate-200 italic text-[11px] text-slate-700">
                &ldquo;{activeProp.rule4Finding}&rdquo;
              </div>
            </div>
          )}

          {/* Tab 6: Documents */}
          {detailTab === 'documents' && (
            <div className="space-y-1.5 text-xs">
              {[
                { name: 'Form-I Statutory Project Requisition.pdf', size: '2.4 MB', date: '10/01/2026', type: 'Signed Requisition' },
                { name: 'Collector Preliminary Enquiry Report (Rule 4).pdf', size: '4.8 MB', date: '18/01/2026', type: 'Official Report' },
                { name: 'Cadastral Land Schedule & ULPIN Manifest.xlsx', size: '890 KB', date: '12/01/2026', type: 'Spatial Manifest' }
              ].map((doc, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-semibold text-slate-800">{doc.name}</div>
                      <div className="text-[10px] text-slate-400">{doc.type} • {doc.size} • Uploaded {doc.date}</div>
                    </div>
                  </div>
                  <button className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] font-medium hover:bg-slate-100 cursor-pointer">
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 7: Validation Checklist */}
          {detailTab === 'validation' && (
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'Public Purpose Legitimacy under Section 2(1)', status: 'SATISFIED', note: 'Public infrastructure corridor established' },
                { label: 'Rule 4 Preliminary Enquiry Report Available', status: 'SATISFIED', note: 'Collector verification concluded satisfactorily' },
                { label: 'Land Schedule & ULPIN Integrity Check', status: 'SATISFIED', note: 'All survey numbers mapped to Bhu-Naksha' },
                { label: 'Multi-Crop Agricultural Ceiling Check', status: 'SATISFIED', note: 'Within Section 10 permissible limit' },
                { label: 'Financial Escrow Commitment Accorded', status: 'SATISFIED', note: 'Requiring body deposit resolution verified' }
              ].map((chk, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{chk.label}</div>
                    <div className="text-[10px] text-slate-500">{chk.note}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                    {chk.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 8: Routing Chain */}
          {detailTab === 'routing' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">Statutory Jurisdictional Routing Chain</div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-700">
                <span className="bg-white p-2 rounded border border-slate-300">
                  Appropriate Government ({jurisdiction})
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="bg-white p-2 rounded border border-slate-300">
                  {isCentral ? (activeProp.centralMinistry || 'MoRTH') : (activeProp.stateDepartment || 'State Revenue Dept')}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="bg-white p-2 rounded border border-slate-300">
                  {activeProp.state} • District {activeProp.district}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="bg-white p-2 rounded border border-slate-300 font-bold text-emerald-800">
                  Collector ({activeProp.assignedCollector || activeProp.collectorName})
                </span>
              </div>
            </div>
          )}

          {/* Tab 9: Audit Trail */}
          {detailTab === 'audit' && (
            <div className="space-y-1.5 text-xs font-mono">
              {[
                { time: '2026-01-10 10:14', actor: 'Collectorate Desk', action: 'PROPOSAL_SUBMITTED_TO_APPROPRIATE_GOVT' },
                { time: '2026-01-14 15:30', actor: 'Statutory Reviewer', action: 'RULE_4_PRELIMINARY_REPORT_ATTACHED' },
                { time: '2026-01-20 12:45', actor: 'Authorized Officer', action: 'PROPOSAL_VALIDATED_FOR_SIA_LAUNCH' }
              ].map((a, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{a.action}</span>
                    <div className="text-[10px] text-slate-500 font-sans">By {a.actor}</div>
                  </div>
                  <span className="text-[10px] text-slate-400">{a.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Clarification Request Modal */}
      {showMemoModal && activeActionProp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-xl max-w-md w-full p-4 space-y-3">
            <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2 border-b pb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Return for Clarification: {activeActionProp.proposalId}
            </div>
            <p className="text-xs text-slate-600">
              Formulate statutory query memo to District Collector ({activeActionProp.district})
            </p>
            <textarea
              rows={4}
              value={clarificationMemo}
              onChange={e => setClarificationMemo(e.target.value)}
              placeholder="State precise statutory deficiencies, land schedule ambiguities, or Rule 4 enquiry queries..."
              className="w-full text-xs p-2.5 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowMemoModal(false)}
                className="px-3 py-1.5 text-xs bg-slate-200 text-slate-800 rounded font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitClarification}
                className="px-3 py-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded font-bold cursor-pointer"
              >
                Dispatch Query Memo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
