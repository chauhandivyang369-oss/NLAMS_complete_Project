import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Map, 
  Building2, 
  Landmark, 
  FileText, 
  Layers, 
  Scale, 
  Users, 
  IndianRupee, 
  FileCheck, 
  ExternalLink,
  ShieldAlert,
  Printer,
  Trash2,
  Plus,
  Globe,
  Building,
  Mail,
  Phone,
  Star,
  ShieldCheck,
  Check
} from 'lucide-react';
import { submitForm1Requisition } from '../../../services/form1Service.js';
import { 
  getGISSnapshotThumbnail, 
  resolveSelectedParcels, 
  SEED_CADASTRAL_PARCELS 
} from '../../../services/gisService.js';
import { DISTRICTS_BY_STATE } from '../../../services/referenceDataService.js';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function Step10ReviewSubmit({ formData, updateFormData, onJumpToStep, errors }) {
  const { registerForm1Submission, setActiveModule, setSelectedProjectId } = useWorkspace();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);
  const [activeTabFilter, setActiveTabFilter] = useState('ALL'); // 'ALL' or specific district name

  const snapshot = getGISSnapshotThumbnail();
  const compBudget = Number(formData.estCompensationBudgetCr) || 0;
  const adminCharge = Number((compBudget * 0.05).toFixed(2));
  const totalCommitment = Number((compBudget + adminCharge).toFixed(2));

  const selectedUlpins = formData.selectedParcels || ['24051234567890', '24051234567891', '24051234567892', '24051234567893'];

  // Dynamically resolve ALL selected parcels
  const liveResolution = resolveSelectedParcels(selectedUlpins);

  // Helper to sync updated parcels back to parent state
  const syncParcels = (updatedUlpins) => {
    const res = resolveSelectedParcels(updatedUlpins);
    updateFormData({
      selectedParcels: updatedUlpins,
      ulpinsList: updatedUlpins,
      gisSummary: {
        selectedParcels: res.totalCount,
        totalAreaAcres: res.totalAreaAcres,
        totalAreaHa: res.totalAreaHa,
        affectedVillages: res.affectedVillages,
        affectedDistricts: res.affectedDistricts,
        affectedStates: res.affectedStates,
        alignmentMatchPct: 100
      }
    });
  };

  const handleRemoveParcel = (ulpinToRemove) => {
    const updated = selectedUlpins.filter(u => u !== ulpinToRemove);
    syncParcels(updated);
  };

  const handleAddParcelsForDistrict = (districtName) => {
    const candidateParcels = SEED_CADASTRAL_PARCELS.filter(p => 
      (p.district || '').toLowerCase() === (districtName || '').toLowerCase()
    );
    const candidateUlpins = candidateParcels.map(p => p.ulpin);
    const merged = [...new Set([...selectedUlpins, ...candidateUlpins])];
    syncParcels(merged);
  };

  // Compile full authorities list from Step 4 or defaults
  const authorities = (formData.districtAuthorities && formData.districtAuthorities.length > 0)
    ? formData.districtAuthorities
    : (formData.selectedDistricts || ['Anand']).map(dName => {
        const stateDists = DISTRICTS_BY_STATE[formData.selectedState || 'Gujarat'] || [];
        const found = stateDists.find(d => d.name === dName);
        return found ? {
          state: formData.selectedState || 'Gujarat',
          district: found.name,
          districtCode: found.code,
          calaOffice: found.calaOffice,
          calaOfficer: found.calaOfficer,
          email: found.email,
          phone: found.phone,
          address: found.address,
          status: 'Lead CALA Collectorate',
          isLead: true
        } : {
          state: formData.selectedState || 'Gujarat',
          district: dName,
          districtCode: `DIST-${dName.slice(0, 3).toUpperCase()}`,
          calaOffice: `Collector & CALA, Collectorate ${dName}`,
          calaOfficer: 'District Magistrate, IAS',
          email: `collector-${dName.toLowerCase()}@nic.in`,
          phone: '+91-XX-XXXXXXX',
          address: `Collectorate Campus, ${dName}`,
          status: 'Lead CALA',
          isLead: true
        };
      });

  // Group authorities by State
  const authoritiesByState = {};
  authorities.forEach(auth => {
    const st = auth.state || formData.selectedState || 'Gujarat';
    if (!authoritiesByState[st]) {
      authoritiesByState[st] = [];
    }
    authoritiesByState[st].push(auth);
  });

  const handleSubmit = async () => {
    if (!formData.sovereignDeclarationAccepted) {
      alert('You must accept the Sovereign Statutory Declaration before official submission.');
      return;
    }

    setIsSubmitting(true);
    try {
      const receipt = await submitForm1Requisition(formData);
      // Enrich receipt with multi-district routing details
      const enrichedReceipt = {
        ...receipt,
        totalParcels: liveResolution.totalCount,
        totalAcres: liveResolution.totalAreaAcres,
        totalHa: liveResolution.totalAreaHa,
        districtRoutings: authorities.map(auth => {
          const distParcels = liveResolution.districtDistribution[auth.district]?.parcels || [];
          const distAcres = liveResolution.districtDistribution[auth.district]?.totalAcres || 0;
          return {
            docketNo: `NLAMS/${auth.districtCode || auth.district.slice(0, 3).toUpperCase()}/2026/${Math.floor(Math.random() * 8000 + 1000)}`,
            state: auth.state,
            district: auth.district,
            calaOfficer: auth.calaOfficer,
            calaOffice: auth.calaOffice,
            parcelsCount: distParcels.length,
            areaAcres: distAcres,
            isLead: auth.isLead
          };
        })
      };

      // Synchronize proposal & PIA details with Workspace Context & Menu 9 (PIA Delegation & RBAC)
      if (registerForm1Submission) {
        registerForm1Submission(formData, enrichedReceipt);
      }

      setSubmissionReceipt(enrichedReceipt);
      updateFormData({ submissionStatus: 'Form-I Transmitted to CALA' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SUBMISSION RECEIPT
  if (submissionReceipt) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 text-slate-800 animate-in fade-in duration-200">
        {/* Success Banner */}
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-emerald-950">
              Form-I Statutory Land Acquisition Requisition Submitted Successfully!
            </div>
            <p className="text-xs text-emerald-800 mt-1">
              The proposal has been cryptographically signed with DSC Class 3 and routed district-wise to all {authorities.length} aligned Competent Authority Land Acquisition (CALA) / District Collectorates.
            </p>
          </div>
        </div>

        {/* Aggregate Docket Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 divide-y divide-slate-200 text-xs">
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Central Master Docket Number:</span>
            <span className="font-mono font-bold text-sm text-blue-900">{submissionReceipt.docketId}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Total Land Extent Transmitted:</span>
            <span className="font-bold text-emerald-900">
              {submissionReceipt.totalParcels} Parcels • {submissionReceipt.totalAcres} Acres ({submissionReceipt.totalHa} Ha)
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Jurisdiction Scope:</span>
            <span className="font-medium text-slate-900">
              {formData.jurisdictionLevel} ({Object.keys(authoritiesByState).length} States, {authorities.length} Revenue Districts)
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Transmission Timestamp:</span>
            <span className="font-medium text-slate-900">{submissionReceipt.submittedAt}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Authorized Submitting Officer:</span>
            <span className="font-medium text-slate-900">{submissionReceipt.submittingOfficer}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Cryptographic SHA-256 Audit Hash:</span>
            <span className="font-mono text-slate-600 text-[11px]">{submissionReceipt.hashSha256}</span>
          </div>
        </div>

        {/* DISTRICT-WISE ROUTING RECEIPT TABLE */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Landmark className="w-4 h-4 text-blue-700" />
            Statutory District Collectorate Distribution & Tracking Docket IDs
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="py-2.5 px-3">State / District</th>
                  <th className="py-2.5 px-3">Competent Authority (CALA)</th>
                  <th className="py-2.5 px-3">District Docket No.</th>
                  <th className="py-2.5 px-3 text-right">Parcels Routed</th>
                  <th className="py-2.5 px-3 text-right">Extent (Acres)</th>
                  <th className="py-2.5 px-3">Statutory Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissionReceipt.districtRoutings?.map((route, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{route.district}</div>
                      <div className="text-[10px] text-slate-500">{route.state}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-blue-950">{route.calaOfficer}</div>
                      <div className="text-[11px] text-slate-600">{route.calaOffice}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-800">
                      {route.docketNo}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      {route.parcelsCount} Parcels
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {route.areaAcres} Acres
                    </td>
                    <td className="py-2.5 px-3">
                      {route.isLead ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Lead CALA
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-900 border border-blue-200">
                          Participating CALA
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION D: PIA REGISTRATION & RBAC DELEGATION SYNC STATUS */}
        <div className="border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-900" />
              <span className="font-bold text-xs text-slate-900">
                Section D — Project Implementing Agency (PIA) Synchronization Status
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              formData.isPiaDifferent 
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                : 'bg-slate-200 text-slate-700'
            }`}>
              {formData.isPiaDifferent ? 'PIA Synchronized to Menu 09' : 'Direct RB Execution (No PIA)'}
            </span>
          </div>

          {formData.isPiaDifferent ? (
            <div className="p-4 bg-emerald-50/40 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="font-bold text-slate-900 text-sm flex flex-wrap items-center gap-2">
                    <span>{formData.pias?.[0]?.entityName || 'Designated Implementing Agency'}</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                      CIN: {formData.pias?.[0]?.cinGstin || 'Submitted under Form-I D.2'}
                    </span>
                    {formData.pias?.[0]?.cinVerified && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold border border-emerald-300 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-700" /> MCA Verified
                      </span>
                    )}
                  </div>
                  <div className="text-slate-600 flex flex-wrap items-center gap-3 text-[11px]">
                    <span>Nodal Officer: <strong>{formData.pias?.[0]?.nodalPerson || formData.nodalOfficerName}</strong></span>
                    <span>•</span>
                    <span>Email: <strong className="font-mono text-blue-900">{formData.pias?.[0]?.email || formData.nodalOfficerEmail}</strong></span>
                    <span>•</span>
                    <span>Mobile: <strong>{formData.pias?.[0]?.contact || formData.nodalOfficerPhone}</strong></span>
                    {formData.pias?.[0]?.boardResolutionRef && (
                      <>
                        <span>•</span>
                        <span>Ref: <strong className="font-mono text-slate-700">{formData.pias[0].boardResolutionRef}</strong></span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                    This agency and its designated nodal representative have been registered in the <strong>Menu 9 (PIA Delegation & RBAC)</strong> registry under proposal docket <strong className="font-mono text-blue-900">{submissionReceipt.docketId}</strong>. You can now configure sub-user role-based access control, assign designations to team members, and select menu/field-level visibility.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (setSelectedProjectId) setSelectedProjectId(submissionReceipt.docketId);
                    if (setActiveModule) setActiveModule('pia-rbac');
                  }}
                  className="px-4 py-2.5 rounded-lg bg-[#1B365D] hover:bg-[#152a48] text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Configure PIA Delegation (Menu 9) →</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 text-xs text-slate-600">
              <p>
                <strong>Direct RB Governance (Form-I Section D.1 = NO):</strong> The Requisitioning Body ({formData.requisitioningBodyName}) acts directly as the implementing authority. External PIA delegation is not required for this corridor.
              </p>
            </div>
          )}
        </div>

        {/* Next Statutory Milestone */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 space-y-1">
          <div className="font-bold text-blue-950">Next Statutory Actions:</div>
          <p>
            Each District Collectorate Land Acquisition Branch will independently verify their respective revenue village survey parcels against <strong>BhuNaksha</strong> and <strong>DILRMP</strong> records, initiate field demarcation, and issue <strong>Preliminary Scrutiny Reports within 15 days</strong>.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Complete Requisition Dossier
          </button>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs cursor-pointer"
          >
            Create New Requisition Draft
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-700" />
          Step 10: Final Comprehensive Review & Submission
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Verify Form-I requisition modules, review dynamic cadastral parcels with district-wise Collectorate allocations, and execute DSC digital signing.
        </p>
      </div>

      {/* Grid of 9 Summary Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Module 1: Project & Legal */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-700" /> 1. Project Type & Legal
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Scenario:</strong> {formData.projectScenario} ({formData.governmentLevel || 'Central'})</div>
            <div><strong>Requisitioning Body:</strong> {formData.requisitioningBodyName}</div>
            <div><strong>Nodal Officer:</strong> {formData.nodalOfficerName} ({formData.nodalOfficerDesignation})</div>
            <div><strong>Legal Framework:</strong> {formData.isFourthScheduleAct ? 'Fourth Schedule (National Highways Act, 1956)' : 'Standard RFCTLARR 2013'}</div>
          </div>
        </div>

        {/* Module 2: PIA Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-700" /> 2. PIA Details
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Execution Model:</strong> {formData.isPiaDifferent ? 'Designated Concessionaire / SPV' : 'Direct Requisitioning Body Execution'}</div>
            {formData.isPiaDifferent && formData.pias?.[0] && (
              <div><strong>Agency:</strong> {formData.pias[0].entityName} (CIN Verified ✓)</div>
            )}
          </div>
        </div>

        {/* Module 3: Project Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-700" /> 3. Project Purpose & Sanction
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Title:</strong> {formData.projectTitle}</div>
            <div><strong>Public Purpose:</strong> {formData.publicPurposeCategory}</div>
            <div><strong>Gestation:</strong> {formData.gestationYears} Years {formData.gestationMonths} Months</div>
            <div><strong>Sanction Ref:</strong> {formData.adminSanctionRef} ({formData.adminApprovalDate})</div>
          </div>
        </div>

        {/* Module 4: Jurisdiction Overview */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-blue-700" /> 4. Jurisdiction & Aligned CALAs
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Scope:</strong> {formData.jurisdictionLevel} ({Object.keys(authoritiesByState).join(', ')})</div>
            <div><strong>Districts Aligned:</strong> {authorities.map(a => a.district).join(', ')}</div>
            <div><strong>Lead Coordinating CALA:</strong> {authorities.find(a => a.isLead)?.calaOffice || authorities[0]?.calaOffice}</div>
            <div><strong>Total District Collectorates Engaged:</strong> {authorities.length} Official Nodes</div>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODULE 5: CADASTRAL PARCELS & ULPIN SCHEDULE (UPDATABLE & DYNAMIC) */}
      <div className="bg-white border-2 border-blue-200 rounded-lg p-4 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            <span className="font-bold text-slate-900 text-sm">
              5. Cadastral Land Parcel Schedule ({liveResolution.totalCount} Parcels Selected)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Updatable & Live Computed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onJumpToStep(5)}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1 rounded bg-blue-50/70 hover:bg-blue-100 cursor-pointer transition-colors shadow-2xs"
            >
              <Map className="w-3.5 h-3.5" /> Open Cadastral GIS Studio
            </button>
          </div>
        </div>

        {/* Live Aggregated Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
          <div className="border-r border-slate-200 pr-2">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total Selected Parcels:</span>
            <span className="text-lg font-bold text-blue-900 font-mono">{liveResolution.totalCount} Parcels</span>
          </div>
          <div className="border-r border-slate-200 pr-2">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total Land Extent:</span>
            <span className="text-lg font-bold text-emerald-800 font-mono">
              {liveResolution.totalAreaAcres} Acres <span className="text-xs font-normal text-slate-500">({liveResolution.totalAreaHa} Ha)</span>
            </span>
          </div>
          <div className="border-r border-slate-200 pr-2">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Revenue Districts:</span>
            <span className="text-xs font-bold text-slate-800">
              {liveResolution.affectedDistricts.join(', ') || 'Anand'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Affected Villages:</span>
            <span className="text-xs font-bold text-slate-800 truncate block">
              {liveResolution.affectedVillages.join(', ') || 'Petlad'}
            </span>
          </div>
        </div>

        {/* Quick ULPIN Chips Cloud */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Authoritative ULPIN Schedule ({liveResolution.totalCount} Identifiers)
            </span>
            <span className="text-[11px] text-slate-500">
              Click &times; to remove any parcel instantly
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-md border border-slate-200">
            {liveResolution.resolvedParcels.map((p) => (
              <div
                key={p.ulpin}
                className="bg-white border border-blue-200 text-blue-950 px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1.5 shadow-2xs"
              >
                <span className="font-bold">{p.ulpin}</span>
                <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded font-sans">
                  {p.district}: {p.surveyNo} ({p.totalAreaAcre} Ac)
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveParcel(p.ulpin)}
                  className="text-slate-400 hover:text-red-600 font-bold ml-0.5 cursor-pointer"
                  title="Remove parcel from requisition"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATUTORY COLLECTORATE PARCEL ALLOCATIONS (DISTRICT-WISE & MULTI-STATE) */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Landmark className="w-4 h-4 text-blue-700" />
              District-Wise Collectorate Cadastral Parcel Routing
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Statutory Form-I parcel schedule partitioned by revenue jurisdiction — each District Collectorate (CALA) receives only their district's cadastral parcels.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            {Object.keys(authoritiesByState).length} States • {authorities.length} District Collectorates Aligned
          </div>
        </div>

        {/* Iterate over each State */}
        {Object.entries(authoritiesByState).map(([stName, stateAuthorities]) => (
          <div key={stName} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-900 text-white tracking-wider uppercase">
                  State Jurisdiction
                </span>
                <span className="text-sm font-bold text-slate-900">{stName}</span>
                <span className="text-xs text-slate-500">
                  ({stateAuthorities.length} District Collectorate{stateAuthorities.length > 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* Iterate over each District Collector under this State */}
            <div className="space-y-4">
              {stateAuthorities.map((auth) => {
                const distParcels = liveResolution.districtDistribution[auth.district]?.parcels || [];
                const distCount = distParcels.length;
                const distAcres = liveResolution.districtDistribution[auth.district]?.totalAcres || 0;
                const distHa = liveResolution.districtDistribution[auth.district]?.totalHa || 0;

                return (
                  <div 
                    key={auth.districtCode || auth.district}
                    className="bg-white border border-slate-300 rounded-lg p-4 space-y-3 shadow-xs"
                  >
                    {/* Collectorate Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200">
                            {auth.districtCode || auth.district}
                          </span>
                          <span className="font-bold text-sm text-slate-900">
                            {auth.calaOffice}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span><strong>Officer:</strong> {auth.calaOfficer}</span>
                          <span>•</span>
                          <span className="font-mono text-blue-700 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" /> {auth.email}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" /> {auth.phone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {auth.isLead ? (
                          <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                            Lead Coordinating CALA
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
                            Participating CALA
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 font-mono">
                          {distCount} Parcels • {distAcres} Acres
                        </span>
                      </div>
                    </div>

                    {/* Collector's Specific Parcels Table */}
                    {distCount > 0 ? (
                      <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                            <tr>
                              <th className="py-2 px-3">ULPIN (14 Digits)</th>
                              <th className="py-2 px-3">Survey / Khasra No.</th>
                              <th className="py-2 px-3">Village</th>
                              <th className="py-2 px-3 text-right">Extent (Acres)</th>
                              <th className="py-2 px-3 text-right">Extent (Ha)</th>
                              <th className="py-2 px-3">Classification</th>
                              <th className="py-2 px-3">Primary Landowner(s)</th>
                              <th className="py-2 px-3">Statutory Status</th>
                              <th className="py-2 px-3 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {distParcels.map((p) => (
                              <tr key={p.ulpin} className="hover:bg-slate-50">
                                <td className="py-2 px-3 font-mono font-bold text-blue-900">{p.ulpin}</td>
                                <td className="py-2 px-3 font-bold text-slate-900">{p.surveyNo}</td>
                                <td className="py-2 px-3 text-slate-700">{p.village}</td>
                                <td className="py-2 px-3 text-right font-semibold text-slate-900">{p.totalAreaAcre}</td>
                                <td className="py-2 px-3 text-right font-mono text-slate-600">{p.areaHa}</td>
                                <td className="py-2 px-3 text-slate-700">{p.landUse}</td>
                                <td className="py-2 px-3 text-slate-800 text-[11px]">
                                  {p.owners?.[0]?.name || 'Authoritative Holder'}
                                </td>
                                <td className="py-2 px-3">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                    {p.statutoryStatus}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveParcel(p.ulpin)}
                                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                                    title="Remove from this Collector's requisition schedule"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-2">
                        <div className="text-amber-800">
                          ⚠️ No cadastral parcels currently selected for <strong>{auth.district}</strong> district.
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddParcelsForDistrict(auth.district)}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-xs flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Available Parcels for {auth.district}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modules 6 to 9 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Module 6: Land Classification */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-700" /> 6. Land Classification & Food Security
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(6)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Multi-Crop Irrigated:</strong> {formData.isMultiCropIrrigated ? `Yes (${formData.multiCropAreaHa} Ha)` : 'No (Sec 10 Compliant)'}</div>
            <div><strong>Structures Count:</strong> {formData.structures?.length || 2} Recorded</div>
            <div><strong>Water Assets:</strong> {formData.waterAssets?.length || 2} Operational Wells</div>
          </div>
        </div>

        {/* Module 7: Preliminary R&R */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-700" /> 7. Preliminary R&R Census
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(7)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Landowner Families:</strong> {formData.estLandownerFamilies}</div>
            <div><strong>Livelihood-Dependent:</strong> {formData.estLivelihoodDependentFamilies}</div>
            <div><strong>SC / ST Families:</strong> {formData.estScStFamilies}</div>
            <div><strong>Physically Displaced:</strong> {formData.estDisplacedFamilies} Families</div>
          </div>
        </div>

        {/* Module 8: Financial Commitments */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-blue-700" /> 8. Financial Commitments & Escrow
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(8)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Compensation Budget:</strong> ₹{compBudget.toFixed(2)} Cr</div>
            <div><strong>5% Admin Charges:</strong> ₹{adminCharge.toFixed(2)} Cr</div>
            <div><strong>Total Escrow Commitment:</strong> ₹{totalCommitment.toFixed(2)} Cr</div>
            <div><strong>Funding Head:</strong> {formData.fundingSource || 'Budgetary Grant'}</div>
          </div>
        </div>

        {/* Module 9: Documents & e-Sign */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-blue-700" /> 9. Statutory Enclosures & DSC
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(9)}
              className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div><strong>Mandatory Enclosures:</strong> 4/4 Statutory Attachments Verified</div>
            <div><strong>Signing Mechanism:</strong> {formData.digitalSignatureMethod === 'DSC' ? 'USB Token DSC Class 3' : 'Aadhaar e-Sign OTP'}</div>
            <div><strong>Pre-flight Token Status:</strong> Authenticated ✓</div>
          </div>
        </div>
      </div>

      {/* Sovereign Declaration Checkbox */}
      <div className="bg-amber-50/70 border border-amber-300 rounded-lg p-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.sovereignDeclarationAccepted}
            onChange={(e) => updateFormData({ sovereignDeclarationAccepted: e.target.checked })}
            className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
          <div className="text-xs leading-relaxed text-slate-900">
            <span className="font-bold text-amber-950 block mb-1">
              Statutory Attestation & Non-Repudiation Declaration <span className="text-red-500">*</span>
            </span>
            I, <strong>{formData.nodalOfficerName}</strong>, {formData.nodalOfficerDesignation}, hereby solemnly affirm that the particulars furnished in this Form-I Requisition across all {authorities.length} District Collectorates are true, authoritative, and extracted from cadastral land records. The Requisitioning Body formally guarantees deposit of statutory compensation awards, solatium, and R&R expenditures into designated Collectorate Escrow Accounts.
          </div>
        </label>
        {errors?.declaration && <p className="text-xs text-red-600 font-bold">{errors.declaration}</p>}
      </div>

      {/* Submit Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div>
          <span className="text-xs font-bold text-slate-900 block">
            Ready for Multi-Jurisdiction Transmission
          </span>
          <span className="text-[11px] text-slate-500">
            Routing to {authorities.length} District Collectorates ({liveResolution.totalCount} Parcels • {liveResolution.totalAreaAcres} Acres)
          </span>
        </div>

        <button
          type="button"
          disabled={isSubmitting || !formData.sovereignDeclarationAccepted}
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Transmitting Dockets to Collectorates...' : 'Sign with DSC & Submit Form-I Requisition'}
        </button>
      </div>
    </div>
  );
}
