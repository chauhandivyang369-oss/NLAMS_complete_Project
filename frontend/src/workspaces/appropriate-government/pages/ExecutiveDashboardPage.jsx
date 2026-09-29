import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Coins, 
  Layers, 
  FileText, 
  Building, 
  Compass, 
  ArrowUpRight,
  ExternalLink,
  Users,
  Eye,
  Filter,
  Search,
  Download,
  Printer,
  ChevronRight,
  Shield,
  ShieldCheck,
  Activity,
  ArrowRight,
  RefreshCw,
  Landmark,
  FileCheck
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import GisCanvasPanel from '../components/common/GisCanvasPanel.jsx';
import StatutoryTimerBadge from '../components/common/StatutoryTimerBadge.jsx';

export default function ExecutiveDashboardPage() {
  const {
    projects,
    jurisdiction,
    selectedProjectId,
    setSelectedProjectId,
    openProjectDrawer,
    openParcelDrawer,
    openLandBankDrawer,
    parcels,
    onSwitchWorkspace
  } = useAppropriateGovernment();

  const isCentral = jurisdiction === 'CENTRAL';

  // State for active stage filter in the pipeline
  const [activeStageFilter, setActiveStageFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinistryOrDept, setFilterMinistryOrDept] = useState('ALL');
  const [utDirectOversight, setUtDirectOversight] = useState(false);

  // Grouped metrics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.currentStage !== 'completed').length;
  const pendingValidation = projects.filter(p => p.proposalStatus?.includes('VALIDATION')).length || 1;
  const underSia = projects.filter(p => p.currentStage?.includes('sia')).length || 2;
  const atSec11 = projects.filter(p => p.sec11Status === 'PUBLISHED').length;
  const underObjection = projects.filter(p => p.sec15Status?.includes('IN_PROGRESS') || p.sec15Status?.includes('HEARINGS')).length || 2;
  const sec19Awaiting = projects.filter(p => p.sec19Status === 'UNDER_PREPARATION' || p.sec19Status === 'AWAITING_RR_APPROVAL').length;
  const sec19Published = projects.filter(p => p.sec19Status === 'PUBLISHED').length;
  const inAcquisition = projects.filter(p => p.currentStage === 'acquisition' || p.sec19Status === 'PUBLISHED').length;

  const totalProposedHa = projects.reduce((acc, p) => acc + (p.totalAreaHa || 0), 0);
  const totalNotifiedHa = projects.filter(p => p.sec11Status === 'PUBLISHED').reduce((acc, p) => acc + (p.totalAreaHa || 0), 0);
  const totalDeclaredHa = projects.filter(p => p.sec19Status === 'PUBLISHED').reduce((acc, p) => acc + (p.totalAreaHa || 0), 0);
  const totalAcquiredHa = projects.reduce((acc, p) => acc + (p.acquiredAreaHa || 0), 0);
  const totalEscrowCr = projects.reduce((acc, p) => acc + (p.escrowDepositedCr || 0), 0);
  const totalDisbursedCr = projects.reduce((acc, p) => acc + (p.disbursedCr || 0), 0);

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.districts && p.districts.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesDept = filterMinistryOrDept === 'ALL' ||
      (p.ministryDept && p.ministryDept.includes(filterMinistryOrDept)) ||
      (p.stateDepartment && p.stateDepartment.includes(filterMinistryOrDept));
    const matchesStage = activeStageFilter === 'ALL' || p.stageLabel?.toLowerCase().includes(activeStageFilter.toLowerCase());
    return matchesSearch && matchesDept && matchesStage;
  });

  const exportTableCsv = () => {
    const headers = "Project ID,Project Name,Executing Agency,States,Districts,Proposed Area (Ha),Sec 11 Date,Stage,Escrow (Cr)\n";
    const rows = filteredProjects.map(p => 
      `"${p.id}","${p.name}","${p.executingAgency}","${p.states?.join(';') || ''}","${p.districts?.join(';') || ''}",${p.totalAreaHa},"${p.sec11Date || ''}","${p.stageLabel}",${p.escrowDepositedCr}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NLAMS_${jurisdiction}_Projects_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral ? 'Central Executive Oversight & National Statutory Radar' : 'State Executive Oversight & Land Administration Radar'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 1
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isCentral
              ? 'Apex national monitoring across Central Ministries, Inter-State Corridors & National Monitoring Committee (NMC)'
              : 'State-level land acquisition monitoring across District Collectors, State PWD, Irrigation & State Monitoring Committee (SMC)'}
          </p>
        </div>

        {/* Committee & Land Bank Badges & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {isCentral ? (
            <>
              <div className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-xs flex items-center gap-2 text-blue-900 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="font-bold">NMC Active:</span>
                <span className="text-slate-600 font-mono text-[11px]">DoLR Meeting 10-Aug-2026</span>
              </div>
              <button
                onClick={() => setUtDirectOversight(!utDirectOversight)}
                className={`px-2.5 py-1 rounded border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  utDirectOversight 
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
                title="Toggle Union Territory direct central statutory oversight"
              >
                <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{utDirectOversight ? 'UT Direct Mode: ON' : 'UT Direct Oversight'}</span>
              </button>
            </>
          ) : (
            <>
              <div className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-xs flex items-center gap-2 text-amber-900 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span className="font-bold">SMC Active:</span>
                <span className="text-slate-600 font-mono text-[11px]">ACS Rev Meeting 20-Aug-2026</span>
              </div>
              <button
                onClick={openLandBankDrawer}
                className="px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 border border-purple-300 text-xs font-bold text-purple-900 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Layers className="w-3.5 h-3.5 text-purple-700" />
                <span>Sec 101 Land Bank</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. Grouped Summary Panels (Compact Government Enterprise Metric Blocks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs min-w-0">
        
        {/* Panel 1: Projects Portfolio Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs space-y-1.5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 font-semibold border-b pb-1">
            <span className="uppercase text-[10px] tracking-wide font-mono font-bold truncate">PROJECT PORTFOLIO</span>
            <Building className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-lg font-bold font-mono text-[#1B365D] truncate">{totalProjects} Projects</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-mono shrink-0">{activeProjects} Active</span>
          </div>
          <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
            <div className="flex justify-between gap-1">
              <span className="truncate">SIA / Objections:</span>
              <span className="font-mono font-semibold text-slate-800 shrink-0">{underSia} / {underObjection}</span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="truncate">Sec 11 / Sec 19 Pub:</span>
              <span className="font-mono font-semibold text-blue-800 shrink-0">{atSec11} / {sec19Published}</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Land Quantum Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs space-y-1.5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 font-semibold border-b pb-1">
            <span className="uppercase text-[10px] tracking-wide font-mono font-bold truncate">LAND QUANTUM</span>
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-lg font-bold font-mono text-slate-900 truncate">{totalProposedHa.toFixed(1)} Ha</span>
            <span className="text-[10px] font-mono text-blue-700 font-semibold shrink-0">Total Proposed</span>
          </div>
          <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
            <div className="flex justify-between gap-1">
              <span className="truncate">Notified / Declared:</span>
              <span className="font-mono font-semibold text-slate-800 shrink-0">{totalNotifiedHa.toFixed(1)} / {totalDeclaredHa.toFixed(1)} Ha</span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="truncate">Vested / Acquired:</span>
              <span className="font-mono font-bold text-emerald-700 shrink-0">{totalAcquiredHa.toFixed(1)} Ha</span>
            </div>
          </div>
        </div>

        {/* Panel 3: Statutory Timers & Lapsing Radar */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs space-y-1.5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 font-semibold border-b pb-1">
            <span className="uppercase text-[10px] tracking-wide font-mono font-bold truncate">SECTION 19 12-MO RADAR</span>
            <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-lg font-bold font-mono text-amber-700 truncate">66d Left</span>
            <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono shrink-0">
              NHAI Alert
            </span>
          </div>
          <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
            <div className="flex justify-between gap-1">
              <span className="truncate">Stay Excluded Days:</span>
              <span className="font-mono font-semibold text-purple-700 shrink-0">+45 Days (HC)</span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="truncate">Lapse Risk Cases:</span>
              <span className="font-mono font-semibold text-rose-700 shrink-0">1 Critical Case</span>
            </div>
          </div>
        </div>

        {/* Panel 4: Financial Escrow & PFMS */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs space-y-1.5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 font-semibold border-b pb-1">
            <div className="flex items-center gap-1 min-w-0">
              <span className="uppercase text-[10px] tracking-wide font-mono font-bold truncate">FINANCIAL ESCROW &amp; DBT</span>
              <span className="text-[8px] font-mono px-1 rounded bg-amber-100 text-amber-900 font-bold shrink-0">MOCK</span>
            </div>
            <Coins className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-lg font-bold font-mono text-[#1B365D] truncate">₹{totalEscrowCr.toFixed(0)} Cr</span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold shrink-0">Escrow Funded</span>
          </div>
          <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
            <div className="flex justify-between gap-1">
              <span className="truncate">Disbursed via PFMS:</span>
              <span className="font-mono font-semibold text-slate-800 shrink-0">₹{totalDisbursedCr.toFixed(0)} Cr</span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="truncate">Treasury Balance:</span>
              <span className="font-mono font-semibold text-emerald-700 shrink-0">₹{(totalEscrowCr - totalDisbursedCr).toFixed(0)} Cr</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Statutory Workflow Stages Strip */}
      <div className="bg-white rounded border border-slate-200 p-2.5 shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1B365D] uppercase text-[10px] font-mono tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#C5A059]" />
            STATUTORY WORKFLOW RADAR (8 WORKFLOW GATES)
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Click gate to filter project records
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 text-center text-xs">
          {[
            { id: 'proposal', label: '1. Proposal', count: 3, color: 'border-blue-300 bg-blue-50 text-blue-900' },
            { id: 'validation', label: '2. Validation', count: pendingValidation, color: 'border-cyan-300 bg-cyan-50 text-cyan-900' },
            { id: 'sia', label: '3. SIA Launch', count: underSia, color: 'border-indigo-300 bg-indigo-50 text-indigo-900' },
            { id: 'sec11', label: '4. Section 11', count: atSec11, color: 'border-amber-300 bg-amber-50 text-amber-900' },
            { id: 'sec15', label: '5. Section 15', count: underObjection, color: 'border-orange-300 bg-orange-50 text-orange-900' },
            { id: 'rnr', label: '6. R&R Review', count: 2, color: 'border-purple-300 bg-purple-50 text-purple-900' },
            { id: 'sec19', label: '7. Section 19', count: sec19Published, color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
            { id: 'acquisition', label: '8. Acquisition', count: inAcquisition, color: 'border-slate-300 bg-slate-100 text-slate-800' }
          ].map(stage => {
            const isSelected = activeStageFilter === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageFilter(isSelected ? 'ALL' : stage.id)}
                className={`p-1.5 rounded border text-left cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-[#C5A059] shadow-xs ' + stage.color
                    : 'hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-[9px] font-mono font-bold uppercase truncate">{stage.label}</div>
                <div className="text-sm font-mono font-bold mt-0.5">{stage.count}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Jurisdiction-Specific Embedded Panels */}
      {isCentral ? (
        /* Central-Only Embedded Panels */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          {/* Panel A: National Monitoring Committee (NMC) Review */}
          <div className="bg-white p-3 rounded border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b pb-1">
              <span className="font-bold text-[#1B365D] uppercase text-[10px] font-mono tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                NATIONAL MONITORING COMMITTEE (SECTION 48)
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 font-bold">
                CENTRAL APEX
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><strong>NMC Mandate:</strong> Review and monitoring of implementation of rehabilitation and resettlement schemes or plans relating to Central projects.</div>
              <div><strong>Last Review:</strong> 10-Aug-2026 • <strong>Next Scheduled:</strong> 15-Oct-2026 (DoLR Krishi Bhawan)</div>
              <div><strong>R&amp;R Fund Disbursal Progress:</strong> ₹280.00 Cr sanctioned across NHAI &amp; DFCCIL corridors.</div>
            </div>
          </div>

          {/* Panel B: Special Central Enactment Engine (Section 105 / 4th Schedule) */}
          <div className="bg-white p-3 rounded border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b pb-1">
              <span className="font-bold text-[#1B365D] uppercase text-[10px] font-mono tracking-wider flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />
                SPECIAL CENTRAL ENACTMENT ENGINE (SEC 105)
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-100 text-purple-900 font-bold">
                4TH SCHEDULE
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><strong>Applicable Acts:</strong> National Highways Act 1956 • Railways Act 1989 • Coal Bearing Areas Act 1957.</div>
              <div><strong>Statutory Alignment:</strong> CALA designated under Central Enactment; Compensation &amp; R&amp;R determined per First, Second and Third Schedules of RFCTLARR Act 2013.</div>
              <div className="text-emerald-800 font-semibold">100% compliant with Central 2015 Ordinance &amp; Amendment Order.</div>
            </div>
          </div>
        </div>
      ) : (
        /* State-Only Embedded Panels */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          {/* Panel A: State Monitoring Committee (SMC) & Section 10 Food Security */}
          <div className="bg-white p-3 rounded border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b pb-1">
              <span className="font-bold text-[#1B365D] uppercase text-[10px] font-mono tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                STATE MONITORING COMMITTEE &amp; SEC 10 FOOD SECURITY
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold">
                STATE RULES
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><strong>SMC Chair:</strong> Additional Chief Secretary (Revenue) • <strong>Quarterly Audit:</strong> Verified</div>
              <div><strong>Section 10 Food Security Check:</strong> Multi-crop irrigated land in District Thane: 0.42% of net sown area (Statutory ceiling: &lt;1.0%). Verified compliant.</div>
              <div><strong>Equivalent Wasteland Development:</strong> 12.4 Ha identified in adjoining taluk for agricultural replenishment.</div>
            </div>
          </div>

          {/* Panel B: State Revenue Stack & PESA / Tribal Safeguards */}
          <div className="bg-white p-3 rounded border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b pb-1">
              <span className="font-bold text-[#1B365D] uppercase text-[10px] font-mono tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                STATE REVENUE STACK &amp; PESA SAFEGUARDS
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                MOCK API
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><strong>Revenue Stack Sync:</strong> Jamabandi RoR (Mock Active) • Bhu-Naksha GIS (Synced) • SRO NGDRS Registry (API Ready).</div>
              <div><strong>Tribal / PESA Section 41 Safeguards:</strong> 2 Scheduled Area villages intimation completed; Gram Sabha resolution passed with majority quorum.</div>
              <div><strong>Advance Compensation:</strong> Mandatory 1/3rd advance compensation escrow funded for ST titleholders.</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. GIS Spatial Canvas Component */}
      <GisCanvasPanel
        jurisdiction={jurisdiction}
        parcels={parcels}
        onSelectParcel={openParcelDrawer}
        showLandBank={!isCentral}
      />

      {/* 6. Master Projects Statutory Tracking Table */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
        
        {/* Table Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1B365D] uppercase tracking-wide">
              {isCentral ? 'Central Statutory Project Portfolio' : 'State Statutory Project Portfolio'}
            </h3>
            <p className="text-[11px] text-slate-500">
              Statutory milestones across Form-I, Section 11, Section 15 Objections, R&amp;R, and Section 19 Declarations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search Project, District..."
                className="pl-7 pr-2.5 py-1 rounded border border-slate-300 bg-white text-xs outline-none focus:border-[#1B365D]"
              />
            </div>

            {/* Ministry/Dept Filter */}
            <select
              value={filterMinistryOrDept}
              onChange={e => setFilterMinistryOrDept(e.target.value)}
              className="px-2 py-1 rounded border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              {isCentral ? (
                <>
                  <option value="MoRTH">MoRTH / NHAI</option>
                  <option value="Railways">Railways / DFCCIL</option>
                  <option value="Renewable">MNRE / SECI</option>
                </>
              ) : (
                <>
                  <option value="PWD">Public Works (PWD)</option>
                  <option value="Urban">CIDCO / Urban</option>
                  <option value="Irrigation">Water Resources</option>
                </>
              )}
            </select>

            {/* Export & Print */}
            <button
              onClick={exportTableCsv}
              className="p-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 flex items-center gap-1 cursor-pointer font-semibold text-xs"
              title="Export CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 flex items-center gap-1 cursor-pointer font-semibold text-xs"
              title="Print Table"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 min-w-[950px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Project ID &amp; Name</th>
                <th className="py-2.5 px-3">Executing Agency / Ministry</th>
                <th className="py-2.5 px-3">Jurisdiction / Districts</th>
                <th className="py-2.5 px-3 text-right">Area (Ha)</th>
                <th className="py-2.5 px-3 text-center">Sec 11 Date</th>
                <th className="py-2.5 px-3 text-center">Current Stage</th>
                <th className="py-2.5 px-3 text-center">Sec 19 SLA</th>
                <th className="py-2.5 px-3 text-right">Escrow (Cr)</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredProjects.map(p => {
                const isSelected = p.id === selectedProjectId;
                const timer = p.statutoryTimers || {};

                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/70 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{p.id}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{p.executingAgency}</div>
                      <div className="text-[10px] text-slate-500">{p.ministryDept || p.stateDepartment}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-slate-800">{p.states?.join(', ')}</div>
                      <div className="text-[10px] text-slate-500">{p.districts?.join(', ')}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold">
                      {p.totalAreaHa}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                      {p.sec11Date || 'Not Issued'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        {p.stageLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {timer.daysRemaining !== undefined ? (
                        <StatutoryTimerBadge
                          daysRemaining={timer.daysRemaining}
                          status={timer.status}
                          stayExclusionDays={p.stayExclusionDays}
                          extensionDays={p.extensionDays}
                          compact={true}
                        />
                      ) : (
                        <span className="text-slate-400 font-mono text-[10px]">N/A</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      ₹{p.escrowDepositedCr}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          openProjectDrawer(p.id);
                        }}
                        className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#142642] text-white rounded text-[11px] font-semibold cursor-pointer shadow-xs"
                      >
                        Dossier
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
