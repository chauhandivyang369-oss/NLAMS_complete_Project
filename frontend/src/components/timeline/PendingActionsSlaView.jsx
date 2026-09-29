import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Send, 
  Download, 
  ShieldCheck, 
  Filter, 
  RotateCcw,
  Hourglass,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';

export default function PendingActionsSlaView() {
  const { showToast } = useWorkspace();
  const [selectedActionId, setSelectedActionId] = useState('#ACT-SLA-088');
  const [ownershipFilter, setOwnershipFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const actions = [
    {
      id: '#ACT-SLA-088',
      ref: 'Ref: HC-WRIT-294/2026',
      title: 'Submit Legal Counter-Affidavit for Khasra 142/B Farmer Union Objection',
      ownershipType: 'rb',
      ownershipLabel: 'REQUISITIONING BODY',
      entity: 'NHAI Legal Cell (HQ)',
      stage: 'Stage 05: Objections',
      stageSub: 'Section 15 Hearing',
      district: 'Ahmedabad',
      tehsil: 'Sanand Tehsil',
      dueDate: '22 Sep 2026',
      dueCritical: false,
      slaDays: '8 Days',
      slaIcon: Hourglass,
      slaColor: 'text-amber-600',
      isOverdue: false,
      provision: 'RFCTLARR 2013 § 15(2) (Mandatory Hearing Reply)',
      officer: 'SLAO Sanand Sub-Division (Quasi-Judicial Bench #2)',
      responsibleWing: 'RB Legal Cell (HQ NHAI) • Lead Officer: Nodal Advocate',
      warningNotice: 'Failure to lodge the certified Counter-Affidavit prior to 22 Sep 2026 gives the Presiding Officer statutory discretion to decide parcel exclusions ex-parte under Rule 12(4), potentially requiring RoW corridor re-alignment.',
    },
    {
      id: '#ACT-SLA-089',
      ref: 'DILR Survey Report #88',
      title: 'Review Sanand Tehsil Boundary Variance & Confirm Reconciled RoW Cadastre',
      ownershipType: 'rb',
      ownershipLabel: 'REQUISITIONING BODY',
      entity: 'NHAI Spatial GIS Wing',
      stage: 'Stage 05: Objections',
      stageSub: 'Section 15 Verification',
      district: 'Ahmedabad',
      tehsil: 'Sanand Tehsil',
      dueDate: '18 Sep 2026',
      dueCritical: true,
      slaDays: '4 Days',
      slaIcon: AlertTriangle,
      slaColor: 'text-rose-600 font-bold',
      isOverdue: true,
      provision: 'RFCTLARR 2013 § 12 (Cadastral Re-verification)',
      officer: 'District Inspector of Land Records (DILR)',
      responsibleWing: 'NHAI Spatial GIS Wing • Lead: GIS Nodal Director',
      warningNotice: 'Boundary discrepancy in Sanand Tehsil Khasra #142/B must be validated before Gazette freezing deadline of 22 Sep 2026.',
    },
    {
      id: '#ACT-SLA-090',
      ref: 'Case No. LAO/SND/2026/18',
      title: 'Awaiting SLAO Sanand Final Hearing Order & Objection Disposal Gazette',
      ownershipType: 'external',
      ownershipLabel: 'EXTERNAL STATUTORY',
      entity: 'Competent Authority / SLAO',
      stage: 'Stage 05: Objections',
      stageSub: 'Sec 15 Order Disposal',
      district: 'Ahmedabad',
      tehsil: 'Sanand Sub-Div',
      dueDate: '07 Nov 2026',
      dueCritical: false,
      slaDays: '54 Days',
      slaIcon: Clock,
      slaColor: 'text-slate-600',
      isOverdue: false,
      provision: 'RFCTLARR 2013 § 15(3) (SLAO Statutory Report)',
      officer: 'SLAO Sanand Division',
      responsibleWing: 'Revenue Department Gujarat / SLAO',
      warningNotice: 'Quasi-judicial order determining validity of landowner objections. Requisitioning Body monitors compliance.',
    },
    {
      id: '#ACT-SLA-091',
      ref: 'Treasury Allocation §38',
      title: 'Upload Signed Tranche-3 Escrow Bank Deposit Receipt from SBI Escrow Pool',
      ownershipType: 'rb',
      ownershipLabel: 'REQUISITIONING BODY',
      entity: 'RB Finance Division',
      stage: 'Stage 05 / 06 Gate',
      stageSub: 'Pre-Declaration Escrow',
      district: 'Mehsana',
      tehsil: 'Kadi Tehsil',
      dueDate: '25 Sep 2026',
      dueCritical: false,
      slaDays: '11 Days',
      slaIcon: Clock,
      slaColor: 'text-slate-700 font-medium',
      isOverdue: false,
      provision: 'RFCTLARR 2013 § 77 & MoRTH Finance Mandate',
      officer: 'Controller of Accounts / Financial Advisor',
      responsibleWing: 'RB Finance Division • Lead: Deputy Financial Controller',
      warningNotice: 'Mandatory 100% deposit of estimated compensation required prior to gazetting Section 19 declaration.',
    },
    {
      id: '#ACT-SLA-092',
      ref: 'RoR Dispute #KD-44-A',
      title: 'Awaiting District Collector Mehsana Verification on 2 Disputed RoR Titles',
      ownershipType: 'external',
      ownershipLabel: 'EXTERNAL STATUTORY',
      entity: 'District Revenue Court',
      stage: 'Stage 05: Objections',
      stageSub: 'Section 15 Inquest',
      district: 'Mehsana',
      tehsil: 'Kadi Tehsil',
      dueDate: '30 Oct 2026',
      dueCritical: false,
      slaDays: '46 Days',
      slaIcon: Clock,
      slaColor: 'text-slate-600',
      isOverdue: false,
      provision: 'RFCTLARR 2013 § 15(2) Title Verification',
      officer: 'District Collector Mehsana',
      responsibleWing: 'District Revenue Court',
      warningNotice: 'Inquest into title partition deeds to avoid statutory compensation disputes under Section 76.',
    },
  ];

  const filteredActions = actions.filter((act) => {
    if (ownershipFilter === 'rb' && act.ownershipType !== 'rb') return false;
    if (ownershipFilter === 'external' && act.ownershipType !== 'external') return false;
    if (districtFilter === 'ahmedabad' && act.district !== 'Ahmedabad') return false;
    if (districtFilter === 'mehsana' && act.district !== 'Mehsana') return false;
    if (priorityFilter === 'critical' && !act.isOverdue) return false;
    return true;
  });

  const selectedAction = actions.find((a) => a.id === selectedActionId) || actions[0];

  return (
    <div id="pending-actions-sla-view-root" className="space-y-4">
      {/* Top Banner with Stats */}
      <div 
        id="pending-actions-top-banner"
        className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            STATUTORY TIMELINE ENFORCEMENT • RFCTLARR ACT 2013 / SECTION 15 & 19
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
            Statutory Pending Actions & SLA Monitor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
            Tracking time-critical submissions, inter-departmental hearings, and statutory lapse horizons across Requisitioning Body (NHAI) wings and District Revenue Courts.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Statutory Clock Running
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Next Gazette Freeze: <strong>22 Sep 2026</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Affected Districts: <strong>4 Jurisdictions</strong>
            </span>
          </div>
        </div>

        {/* Right Stats Block */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 min-w-[140px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL ACTIONS PENDING</span>
              <FileText className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">
              4 <span className="text-xs font-sans font-normal text-slate-500">Actions</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              RB Active: <strong>3</strong> External: <strong>1</strong>
            </div>
          </div>

          <div className="border border-rose-200 rounded-lg p-3 bg-rose-50/70 min-w-[140px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">OVERDUE / SLA CRITICAL</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <div className="text-xl font-bold font-mono text-rose-700 mt-1">
              1 <span className="text-xs font-sans font-normal text-rose-600">Action</span>
            </div>
            <div className="text-[10px] text-rose-600 font-semibold mt-0.5 flex items-center justify-between">
              <span>Attention Required</span>
              <span>&le; 4 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Procedural Compliance Notice */}
      <div 
        id="procedural-compliance-notice"
        className="bg-white border-l-4 border-l-slate-400 border border-slate-200 rounded-lg p-3.5 shadow-2xs flex items-start gap-3"
      >
        <div className="p-1.5 rounded bg-slate-100 text-slate-600 shrink-0 mt-0.5">
          <FileText className="w-4 h-4" />
        </div>
        <div className="text-xs text-slate-600 leading-relaxed">
          <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-0.5">
            PROCEDURAL COMPLIANCE NOTICE • RFCTLARR Sec 19(7) / Sec 25 Oversight
          </div>
          <p>
            <strong>Statutory Role Distinction:</strong> Actions tagged as <strong>REQUISITIONING BODY ACTION</strong> require direct submission, documentation, or legal appearance by NHAI officers. Actions marked as <strong>EXTERNAL STATUTORY AUTHORITY</strong> are quasi-judicial functions of the District Collector, SLAO, or State Revenue Court; the Requisitioning Body monitors their progress to ensure statutory timeframes do not lapse under Section 19(7) / Section 25.
          </p>
        </div>
      </div>

      {/* Filter Row */}
      <div 
        id="pending-actions-filter-row"
        className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">PROPOSAL ID</span>
            <select 
              className="border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 bg-white"
              defaultValue="NLAMS-RB-2026-00124"
            >
              <option value="NLAMS-RB-2026-00124">NLAMS-RB-2026-00124</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">ACTION OWNERSHIP</span>
            <select 
              value={ownershipFilter}
              onChange={(e) => setOwnershipFilter(e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">All Ownership</option>
              <option value="rb">Requisitioning Body</option>
              <option value="external">External Statutory</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">DISTRICT</span>
            <select 
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">All Districts</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="mehsana">Mehsana</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">STATUTORY STAGE</span>
            <select 
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">All Stages</option>
              <option value="stage05">Stage 05: Objections</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">PRIORITY</span>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical (&le; 4 Days)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 sm:pt-0">
          <button
            onClick={() => showToast('Applied statutory filters to actions register')}
            className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Apply Filters</span>
          </button>
          <button
            onClick={() => {
              setOwnershipFilter('all');
              setDistrictFilter('all');
              setStageFilter('all');
              setPriorityFilter('all');
            }}
            className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Consolidated Statutory Actions & SLA Register Table */}
      <div 
        id="actions-register-table-card"
        className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden"
      >
        <div className="p-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              Consolidated Statutory Actions & SLA Register
            </h3>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
              {filteredActions.length} Tracked Rows
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#0f172a]"></span>
              <span>RB Internal Task</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-300"></span>
              <span>External Authority Quasi-Judicial</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f172a] text-white text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3.5 font-semibold">ACTION ITEM & TASK DESCRIPTION</th>
                <th className="py-2.5 px-3.5 font-semibold">ACTION OWNERSHIP / ENTITY</th>
                <th className="py-2.5 px-3.5 font-semibold">STATUTORY STAGE</th>
                <th className="py-2.5 px-3.5 font-semibold">DISTRICT / TEHSIL</th>
                <th className="py-2.5 px-3.5 font-semibold">STATUTORY DUE DATE</th>
                <th className="py-2.5 px-3.5 font-semibold text-right">SLA DAYS REMAINING</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredActions.map((action) => {
                const isSelected = selectedActionId === action.id;
                const SlaIcon = action.slaIcon;

                return (
                  <tr
                    key={action.id}
                    id={`action-row-${action.id}`}
                    onClick={() => setSelectedActionId(action.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 hover:bg-blue-50'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-2.5 px-3.5 font-medium text-slate-900 max-w-sm">
                      <div className="flex items-start gap-2">
                        <span className={`w-1 h-8 rounded-full shrink-0 mt-0.5 ${
                          action.ownershipType === 'rb' ? 'bg-[#0f172a]' : 'bg-slate-400'
                        }`}></span>
                        <div>
                          <div className="font-bold text-slate-900 hover:text-blue-700">
                            {action.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            ID: {action.id} • {action.ref}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit ${
                        action.ownershipType === 'rb'
                          ? 'bg-[#0f172a] text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {action.ownershipLabel}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {action.entity}
                      </div>
                    </td>

                    <td className="py-2.5 px-3.5">
                      <div className="font-bold text-slate-800">{action.stage}</div>
                      <div className="text-[11px] text-slate-500">{action.stageSub}</div>
                    </td>

                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-slate-800">{action.district}</div>
                      <div className="text-[11px] text-slate-500">{action.tehsil}</div>
                    </td>

                    <td className="py-2.5 px-3.5 font-mono">
                      <span className={action.dueCritical ? 'font-bold text-rose-600' : 'text-slate-700'}>
                        {action.dueDate}
                      </span>
                    </td>

                    <td className="py-2.5 px-3.5 text-right">
                      <div className={`inline-flex items-center gap-1 font-mono font-bold ${action.slaColor}`}>
                        <SlaIcon className="w-3.5 h-3.5" />
                        <span>{action.slaDays}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing 1 to {filteredActions.length} of {filteredActions.length} statutory action milestones
          </div>
          <div className="flex items-center gap-1 font-medium">
            <button className="px-2 py-0.5 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Previous</button>
            <span className="px-2.5 py-0.5 bg-[#0f172a] text-white rounded font-bold">1</span>
            <button className="px-2 py-0.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>

      {/* Inspecting Action Selected Dossier */}
      <div 
        id="inspecting-action-dossier-card"
        className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#0f172a] rounded-xs"></span>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Inspecting Action {selectedAction.id}: {selectedAction.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white text-[10px] font-bold font-mono">
              ACTIVE DOCKET
            </span>
            <span className="text-xs font-mono font-bold text-rose-600">
              Target SLA: {selectedAction.slaDays} Remaining ({selectedAction.dueDate})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
          {/* Left Details 8 cols */}
          <div className="lg:col-span-8 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">STATUTORY PROVISION</div>
                <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedAction.provision}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PRESIDING OFFICER</div>
                <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedAction.officer}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">RESPONSIBLE WING</div>
                <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedAction.responsibleWing}</div>
              </div>
            </div>

            {/* Warning / Advisory alert */}
            <div className="bg-amber-50/70 border border-amber-200 rounded p-3 text-slate-700 leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px]">
                {selectedAction.warningNotice}
              </p>
            </div>
          </div>

          {/* Right Procedural Interventions 4 cols */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              <span>PROCEDURAL INTERVENTIONS</span>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <div className="space-y-2 pt-1">
              <button
                id="btn-transmit-nodal-advocate"
                onClick={() => showToast(`Transmitted Notice & Affidavit Brief for ${selectedAction.id} to Nodal Advocate`)}
                className="w-full bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit to Nodal Advocate</span>
              </button>

              <button
                id="btn-download-notice-memo"
                onClick={() => showToast(`Downloading Official Notice Memo PDF for ${selectedAction.id}`)}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Notice Memo</span>
              </button>

              <button
                id="btn-mark-compliance-complete"
                onClick={() => showToast(`Marked Compliance Completed for ${selectedAction.id}. Digital Seal Verified.`)}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Mark Compliance Complete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
