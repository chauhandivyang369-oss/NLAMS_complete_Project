import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import ProjectContextBar from '../../components/sia-ieg/common/ProjectContextBar.jsx';
import ContextualActionDrawer from '../../components/sia-ieg/common/ContextualActionDrawer.jsx';

import IegClaimEvidenceChain from '../../components/sia-ieg/ieg-review/IegClaimEvidenceChain.jsx';
import IegGisReviewTab from '../../components/sia-ieg/ieg-review/IegGisReviewTab.jsx';
import IegDiscrepancyModal from '../../components/sia-ieg/ieg-review/IegDiscrepancyModal.jsx';
import IegClarificationModal from '../../components/sia-ieg/ieg-review/IegClarificationModal.jsx';
import IegObservationModal from '../../components/sia-ieg/ieg-review/IegObservationModal.jsx';

import { 
  FileText, 
  Layers, 
  Users, 
  Briefcase, 
  Home, 
  Building, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  ExternalLink,
  ShieldCheck,
  Send,
  MessageSquarePlus,
  Play,
  Download,
  Eye,
  Check,
  Building2,
  Trees,
  Scale
} from 'lucide-react';

import { 
  IEG_PROJECT_CONTEXT, 
  INITIAL_DISCREPANCIES, 
  INITIAL_CLARIFICATIONS,
  SEED_EVIDENCE_ITEMS
} from '../../services/iegService.js';

import { LANDOWNER_CENSUS_RECORDS } from '../../services/siaSurveyService.js';
import { HEARING_STATEMENTS } from '../../services/siaHearingService.js';
import { SEED_SIMP_MITIGATIONS } from '../../services/siaSimpService.js';
import { SEED_CADASTRAL_PARCELS } from '../../services/gisService.js';

export default function SiaReviewEvidencePage() {
  const { setActiveMenu } = useSiaIeg();

  // Active Tab out of exactly 14 internal tabs
  const [activeTab, setActiveTab] = useState('summary'); // summary, project, gis, land, families, livelihood, displacement, assets, infrastructure, hearing, simp, alternatives, evidence, documents

  // Discrepancies and Clarifications State
  const [discrepancies, setDiscrepancies] = useState(INITIAL_DISCREPANCIES);
  const [clarifications, setClarifications] = useState(INITIAL_CLARIFICATIONS);

  // Modals state
  const [discrepancyModalOpen, setDiscrepancyModalOpen] = useState(false);
  const [clarificationModalOpen, setClarificationModalOpen] = useState(false);
  const [observationModalOpen, setObservationModalOpen] = useState(false);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('EVIDENCE');
  const [drawerData, setDrawerData] = useState(null);

  // Review Status
  const [reviewStatus, setReviewStatus] = useState('Review In Progress');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenEvidence = (evId) => {
    const ev = SEED_EVIDENCE_ITEMS.find(e => e.evidenceId === evId) || {
      evidenceId: evId,
      type: 'Cadastral & Ground Evidence',
      sourceModule: 'SIA Survey & Census',
      relatedRecord: 'PARCEL-142',
      description: 'Signed panchnama and field schedule with verified GPS stamp.',
      uploadedBy: 'SIA Field Officer',
      uploadedAt: '12/02/2026',
      gps: '22.4812° N, 72.8091° E'
    };
    setDrawerType('EVIDENCE');
    setDrawerData(ev);
    setDrawerOpen(true);
  };

  const handleOpenDiscrepancy = (disc) => {
    setDrawerType('DISCREPANCY');
    setDrawerData(disc);
    setDrawerOpen(true);
  };

  const handleOpenClarification = (clar) => {
    setDrawerType('CLARIFICATION');
    setDrawerData(clar);
    setDrawerOpen(true);
  };

  const handleAddDiscrepancy = (newDisc) => {
    setDiscrepancies(prev => [newDisc, ...prev]);
    showToast(`Discrepancy ${newDisc.discrepancyId} recorded under ${newDisc.module}.`);
  };

  const handleAddClarification = (newClar) => {
    setClarifications(prev => [newClar, ...prev]);
    showToast(`Clarification ${newClar.requestId} transmitted to SIA Agency.`);
  };

  const handleAddObservation = (obs) => {
    showToast(`Observation recorded in committee notes for ${obs.section}.`);
  };

  const handleResolveDiscrepancy = (id) => {
    setDiscrepancies(prev => prev.map(d => d.discrepancyId === id ? {
      ...d,
      status: 'Resolved',
      resolution: 'Formal explanation accepted by Chairperson on review.',
      resolvedBy: 'Prof. (Dr.) Manisha N. Vyas',
      resolvedAt: new Date().toISOString().split('T')[0]
    } : d));
    showToast(`Discrepancy ${id} marked as resolved.`);
  };

  const TAB_ITEMS = [
    { id: 'summary', label: '1. Executive Summary' },
    { id: 'project', label: '2. Project' },
    { id: 'gis', label: '3. GIS Spatial' },
    { id: 'land', label: '4. Land' },
    { id: 'families', label: '5. Families' },
    { id: 'livelihood', label: '6. Livelihood' },
    { id: 'displacement', label: '7. Displacement' },
    { id: 'assets', label: '8. Assets' },
    { id: 'infrastructure', label: '9. Infrastructure' },
    { id: 'hearing', label: '10. Public Hearing' },
    { id: 'simp', label: '11. SIMP' },
    { id: 'alternatives', label: '12. Alternatives' },
    { id: 'evidence', label: '13. Evidence' },
    { id: 'documents', label: '14. Documents' }
  ];

  return (
    <div id="page-sia-review" className="w-full h-full min-h-full bg-slate-100 flex-1 flex flex-col font-sans">
      
      {/* 1. Universal Project Context Bar */}
      <ProjectContextBar activeMenuTitle="SIA Review & Evidence" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-800 text-white px-6 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* 2. Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1B365D]" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              SIA Review &amp; Evidence
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Independent Review of SIA Findings, Data, GIS &amp; Supporting Evidence
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setReviewStatus('Review In Progress (Active)');
              showToast('Review formally marked as Started and logged in Immutable Audit Trail.');
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
            <span>Mark Review Started</span>
          </button>

          <button
            onClick={() => setClarificationModalOpen(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Request Clarification</span>
          </button>

          <button
            onClick={() => setObservationModalOpen(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-purple-700" />
            <span>Add Observation</span>
          </button>

          <button
            onClick={() => setDiscrepancyModalOpen(true)}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Flag Discrepancy</span>
          </button>
        </div>
      </div>

      {/* 3. Main Workspace Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
        
        {/* AI-Assisted Evidence Verification Banner (Advisory Only — Human Decides) */}
        <div className="bg-gradient-to-r from-blue-900 to-[#1B365D] text-white p-4 rounded-xl shadow-xs border border-blue-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-[#C5A059] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs tracking-wide uppercase text-[#C5A059]">
                  AI Advisory Verification Assistant
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-white/10 text-slate-200">
                  Advisory Only — Human IEG Committee Decides
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed max-w-3xl">
                Cross-matching 500 SIA survey demographic records against 214 cadastral polygons in PostGIS detected a <strong>2.50 Ha variance</strong> in railway yard buffer land, and <strong>37 landless tenant families</strong> awaiting Gram Panchayat panchnama seals.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-300 pt-1">
                <span>Signal Confidence: <strong className="text-emerald-400">92% High</strong></span>
                <span>•</span>
                <span>Source Records: <strong className="text-slate-100">RoR 7/12 &amp; Schedule B</strong></span>
                <span>•</span>
                <span>Generated: <strong className="text-slate-100">19 Sep 2026, 09:30 IST</strong></span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={() => handleOpenEvidence('EV-1021')}
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-bold text-slate-100 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Inspect Evidence EV-1021</span>
            </button>
            <button
              onClick={() => setClarificationModalOpen(true)}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b08d48] text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clarify with SIA Agency</span>
            </button>
          </div>
        </div>

        {/* Claim ➔ Evidence Cross-Examination Chain */}
        <IegClaimEvidenceChain
          onInspectEvidence={handleOpenEvidence}
          onRequestClarification={() => setClarificationModalOpen(true)}
          onFlagDiscrepancy={() => setDiscrepancyModalOpen(true)}
        />

        {/* EXACT 14 INTERNAL TABS NAVIGATION */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          
          <div className="flex items-center overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-2 py-1 gap-1 text-[11px] font-medium scrollbar-thin">
            {TAB_ITEMS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1B365D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Chapter 1: Executive Summary &amp; Statutory Background
                </h3>
                <span className="font-mono text-[10px] text-slate-500">SIA Report v1.2 Certified</span>
              </div>

              <div className="prose max-w-none text-slate-700 leading-relaxed space-y-3">
                <p>
                  The Gujarat Rail Infrastructure Development Corporation (G-RIDE) has proposed the acquisition of <strong>250.40 Hectares</strong> of land across Petlad, Sunav, and Nar villages in Anand District for the Petlad-Bhadran Gauge Conversion and Rail-Link Project under Section 4(1) of the RFCTLARR Act 2013.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono my-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px]">Total Land Proposed</span>
                    <strong className="text-sm text-slate-900">250.40 Ha</strong>
                    <span className="text-slate-500 block text-[10px]">Private + Govt</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px]">Total Affected Families</span>
                    <strong className="text-sm text-slate-900">500 Families</strong>
                    <span className="text-slate-500 block text-[10px]">2,140 Individuals</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px]">Physical Displacement</span>
                    <strong className="text-sm text-rose-700">42 Families</strong>
                    <span className="text-slate-500 block text-[10px]">Resettlement in Village Abadi</span>
                  </div>
                </div>
                <p>
                  The Social Impact Management Plan (SIMP) establishes an estimated compensation &amp; R&amp;R outlay of <strong>₹48.20 Crores</strong>, with specific provisions for canal re-alignment, replacement borewells, and rehabilitation grants under the Second Schedule of the Act.
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-[11px] text-blue-900">
                <span>
                  <strong>IEG Review Note:</strong> Executive summary statements have been cross-indexed against census schedules and cadastral RoR records.
                </span>
                <button 
                  onClick={() => setObservationModalOpen(true)}
                  className="px-2.5 py-1 bg-blue-900 text-white rounded font-bold cursor-pointer"
                >
                  Record Summary Finding
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECT DESCRIPTION */}
          {activeTab === 'project' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 2: Project Justification &amp; Technical Alignment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-500">Project Name:</span><strong className="text-slate-900">{IEG_PROJECT_CONTEXT.projectName}</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">Requiring Body:</span><span>{IEG_PROJECT_CONTEXT.requiringBody}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Appropriate Govt:</span><span>{IEG_PROJECT_CONTEXT.appropriateGovt}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Public Purpose Tag:</span><strong className="text-blue-900">Infrastructure (Sec. 2(1)(b))</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">Right of Way (RoW):</span><span>45.00 Metres</span></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2 text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block">Alignment Justification &amp; Multi-Modal Connectivity</span>
                  <p>
                    The proposed line connects industrial dairy processing corridors in Anand with Western Dedicated Freight Corridor (WDFC) feeder junctions, eliminating heavy vehicle congestion across NH-48.
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Technical alignment engineered with minimum curve radius of 800m to minimize structural demolition in Petlad municipal outskirts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GIS SPATIAL CANVAS */}
          {activeTab === 'gis' && (
            <div className="p-5">
              <IegGisReviewTab 
                onInspectParcel={(p) => {
                  setDrawerType('PARCEL');
                  setDrawerData(p);
                  setDrawerOpen(true);
                }}
                onViewEvidence={handleOpenEvidence}
                onFlagDiscrepancy={() => setDiscrepancyModalOpen(true)}
              />
            </div>
          )}

          {/* TAB 4: LAND & CADASTRAL PARCELS */}
          {activeTab === 'land' && (
            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chapter 3: Land Assessment &amp; Cadastral Parcels Register
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    214 Parcels verified against Anand District e-Dhara Record of Rights (RoR)
                  </p>
                </div>
                <button 
                  onClick={() => setDiscrepancyModalOpen(true)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold cursor-pointer"
                >
                  Flag Land Discrepancy
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Survey No / ULPIN</th>
                      <th className="p-2.5">Village / Taluka</th>
                      <th className="p-2.5">Total Area (Ha)</th>
                      <th className="p-2.5">Affected Area (Ha)</th>
                      <th className="p-2.5">Impact %</th>
                      <th className="p-2.5">Land Classification</th>
                      <th className="p-2.5">Ownership Status</th>
                      <th className="p-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {SEED_CADASTRAL_PARCELS.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-[#1B365D]">
                          {p.surveyNo} <span className="text-[10px] text-slate-400 font-normal block">{p.ulpin}</span>
                        </td>
                        <td className="p-2.5 text-slate-800">{p.village}, Petlad</td>
                        <td className="p-2.5">{p.totalAreaHa || '2.40'}</td>
                        <td className="p-2.5 font-bold text-slate-900">{p.affectedAreaHa || '1.85'}</td>
                        <td className="p-2.5 text-amber-700 font-bold">{p.impactPercent || '77%'}</td>
                        <td className="p-2.5 text-slate-700">{p.landClass || 'Agricultural (Irrigated)'}</td>
                        <td className="p-2.5 text-emerald-700 font-semibold">{p.ownership || 'Private (Freehold)'}</td>
                        <td className="p-2.5 text-right font-sans">
                          <button
                            onClick={() => handleOpenEvidence('EV-1098')}
                            className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[10px] font-bold cursor-pointer"
                          >
                            View RoR
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: AFFECTED FAMILIES */}
          {activeTab === 'families' && (
            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chapter 4: Demographic Census &amp; Affected Families Register
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    Claim: 500 Families | Verified: 463 Schedules | Pending: 37 Labourer Panchnamas
                  </p>
                </div>
                <button
                  onClick={() => setClarificationModalOpen(true)}
                  className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded font-bold cursor-pointer"
                >
                  Clarify 37 Pending
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Family ID</th>
                      <th className="p-2.5">Household Head</th>
                      <th className="p-2.5">Village</th>
                      <th className="p-2.5">Social Category</th>
                      <th className="p-2.5">Displacement</th>
                      <th className="p-2.5">Livelihood Impact</th>
                      <th className="p-2.5">Verification</th>
                      <th className="p-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {LANDOWNER_CENSUS_RECORDS.slice(0, 8).map((f) => (
                      <tr key={f.id || f.familyId} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono font-bold text-[#1B365D]">{f.familyId || f.id || 'FAM-001'}</td>
                        <td className="p-2.5 font-semibold text-slate-900">{f.headName || f.ownerName || 'Rameshbhai Patel'}</td>
                        <td className="p-2.5 text-slate-700 font-mono">{f.village || 'Petlad'}</td>
                        <td className="p-2.5 font-mono">{f.socialCategory || 'OBC'}</td>
                        <td className="p-2.5 font-mono text-rose-700 font-bold">{f.displacementStatus || 'Economic'}</td>
                        <td className="p-2.5 text-slate-700">{f.primaryLivelihood || f.occupation || 'Agriculture & Dairy'}</td>
                        <td className="p-2.5 font-mono text-emerald-700 font-bold">
                          ✓ {f.verificationStatus || 'Aadhaar Verified'}
                        </td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => handleOpenEvidence('EV-1021')}
                            className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[10px] font-bold cursor-pointer"
                          >
                            Inspect Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: LIVELIHOOD IMPACTS */}
          {activeTab === 'livelihood' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 5: Livelihood Categorization &amp; Vulnerability Matrix
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                {[
                  { title: 'Cultivators (Titleholders)', count: '182 Families', pct: '36.4%' },
                  { title: 'Agricultural Labourers', count: '144 Families', pct: '28.8%' },
                  { title: 'Tenant Farmers / Sharecroppers', count: '68 Families', pct: '13.6%' },
                  { title: 'Dairy & Animal Husbandry', count: '52 Families', pct: '10.4%' },
                  { title: 'Artisans & Village Trades', count: '24 Families', pct: '4.8%' },
                  { title: 'Small Shops & Commercial', count: '18 Families', pct: '3.6%' },
                  { title: 'Daily Wage Transport Drivers', count: '12 Families', pct: '2.4%' },
                  { title: 'Total Economically Impacted', count: '500 Families', pct: '100%' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px] font-sans">{item.title}</span>
                    <strong className="text-slate-900 text-sm">{item.count}</strong>
                    <span className="text-[10px] text-blue-800 block font-semibold">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: DISPLACEMENT ASSESSMENT */}
          {activeTab === 'displacement' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 6: Physical Displacement &amp; Resettlement Housing Plan
              </h3>
              
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 space-y-1">
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-rose-600" />
                  <span>42 Families Identified for Physical Displacement</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Located in the railway approach corridor in Petlad Outer Ward 4. The Requiring Body has budgeted <strong>₹50,000 per family</strong> subsistence allowance plus <strong>Constructed House / ₹1.50 Lakh plot entitlement</strong> under Schedule II.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Family ID</th>
                      <th className="p-2.5">Head of Family</th>
                      <th className="p-2.5">Housing Impact Type</th>
                      <th className="p-2.5">Structure Construction</th>
                      <th className="p-2.5">Relocation Preference</th>
                      <th className="p-2.5">Special Vulnerability</th>
                      <th className="p-2.5 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#1B365D]">FAM-004</td>
                      <td className="p-2.5 font-sans font-semibold">Kantibhai Shankarbhai Vankar</td>
                      <td className="p-2.5 text-rose-700 font-bold">Complete House Demolition</td>
                      <td className="p-2.5 font-sans">Pucca (Brick &amp; RCC Slab)</td>
                      <td className="p-2.5 font-sans">Village Abadi Resettlement</td>
                      <td className="p-2.5 text-purple-700 font-bold">SC Vulnerable</td>
                      <td className="p-2.5 text-right font-sans">
                        <button onClick={() => handleOpenEvidence('EV-1021')} className="text-blue-700 hover:underline font-bold">
                          Inspect EV-1021
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: COMMUNITY ASSETS */}
          {activeTab === 'assets' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 7: Community &amp; Public Assets Register
              </h3>
              
              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Asset ID</th>
                      <th className="p-2.5">Asset Category</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5">Village</th>
                      <th className="p-2.5">Severity</th>
                      <th className="p-2.5">Reconstruction Plan</th>
                      <th className="p-2.5 text-right">Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#1B365D]">ASSET-001</td>
                      <td className="p-2.5 font-sans font-semibold">Irrigation Canal</td>
                      <td className="p-2.5 font-sans">Mahi Right Bank Minor Canal 3</td>
                      <td className="p-2.5 font-sans">Sunav</td>
                      <td className="p-2.5 text-amber-700 font-bold">Culvert Required</td>
                      <td className="p-2.5 font-sans">Reinforced Concrete Box Culvert (SIMP Item #4)</td>
                      <td className="p-2.5 text-right font-sans">
                        <button onClick={() => handleOpenEvidence('EV-4012')} className="text-blue-700 hover:underline font-bold">
                          Inspect EV-4012
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#1B365D]">ASSET-002</td>
                      <td className="p-2.5 font-sans font-semibold">Drinking Water Well</td>
                      <td className="p-2.5 font-sans">Gram Panchayat Community Tubewell</td>
                      <td className="p-2.5 font-sans">Nar</td>
                      <td className="p-2.5 text-rose-700 font-bold">Submerged / Lost</td>
                      <td className="p-2.5 font-sans">New Solar Deep Tubewell in Survey 18/B</td>
                      <td className="p-2.5 text-right font-sans">
                        <button onClick={() => handleOpenEvidence('EV-4012')} className="text-blue-700 hover:underline font-bold">
                          Inspect EV-4012
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 8: Public Infrastructure &amp; Utility Crossings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-sans">GETCO 66kV Transmission Lines</span>
                  <strong className="text-slate-900 text-sm">2 Tower Crossings</strong>
                  <span className="text-slate-500 block text-[10px] font-sans">Height raising clearance granted</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-sans">State Highway Crossings</span>
                  <strong className="text-slate-900 text-sm">1 Road Over Bridge (ROB)</strong>
                  <span className="text-slate-500 block text-[10px] font-sans">R&amp;B Dept approval submitted</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-sans">Panchayat Roads</span>
                  <strong className="text-slate-900 text-sm">3 Underpasses (RUB)</strong>
                  <span className="text-slate-500 block text-[10px] font-sans">Tractor access clearance 4.5m</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: PUBLIC HEARING */}
          {activeTab === 'hearing' && (
            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chapter 9: Section 5 Public Hearing Proceedings &amp; Video Audit
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    Physical Gram Sabha: 318 Participants | Supplementary Online Feedback: 28 Submissions
                  </p>
                </div>
                <button
                  onClick={() => handleOpenEvidence('EV-1032')}
                  className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded font-bold cursor-pointer"
                >
                  View Hearing Minutes EV-1032
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Issue ID</th>
                      <th className="p-2.5">Participant</th>
                      <th className="p-2.5">Village / Category</th>
                      <th className="p-2.5">Objection Raised</th>
                      <th className="p-2.5">SIA Team Response</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {HEARING_STATEMENTS.slice(0, 5).map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono font-bold text-[#1B365D]">{f.feedbackId || f.id}</td>
                        <td className="p-2.5 font-semibold text-slate-900">{f.speakerName || f.stakeholderName || 'Pravinbhai Parmar'}</td>
                        <td className="p-2.5 font-mono text-slate-600">{f.village || 'Sunav'}</td>
                        <td className="p-2.5 text-slate-800">{f.gist || f.feedbackText || 'Irrigation channel cut-off'}</td>
                        <td className="p-2.5 text-slate-600 font-sans">{f.officerResponse || f.agencyResponse || 'Siphon culvert budgeted'}</td>
                        <td className="p-2.5 font-mono text-emerald-700 font-bold">
                          ✓ Addressed in SIMP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: SOCIAL IMPACT MANAGEMENT PLAN (SIMP) */}
          {activeTab === 'simp' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 10: Social Impact Management Plan (SIMP) &amp; Financial Matrix
              </h3>
              
              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">SIMP Code</th>
                      <th className="p-2.5">Impact Category</th>
                      <th className="p-2.5">Mitigation Measure</th>
                      <th className="p-2.5">Responsible Agency</th>
                      <th className="p-2.5">Budget Allocation</th>
                      <th className="p-2.5">Target Completion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {SEED_SIMP_MITIGATIONS.slice(0, 5).map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-[#1B365D]">{m.code || m.id}</td>
                        <td className="p-2.5 font-sans font-semibold text-slate-900">{m.category}</td>
                        <td className="p-2.5 font-sans text-slate-700">{m.measure}</td>
                        <td className="p-2.5 font-sans text-slate-600">{m.responsibility}</td>
                        <td className="p-2.5 font-bold text-emerald-800">₹{m.budgetLakhs || 45.0} Lakhs</td>
                        <td className="p-2.5 text-slate-600">{m.timeline || 'Phase-1'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 12: ALTERNATIVE SITE ANALYSIS */}
          {activeTab === 'alternatives' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Chapter 11: Alternative Alignments Evaluation (Section 7(2)(a))
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 text-xs">Selected Alignment (Option A)</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-700 text-white text-[10px]">RECOMMENDED</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Utilizes existing defunct meter gauge railway embankment. Minimizes new private land take to 247.9 Ha, avoiding 140 additional households in Petlad town center.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 opacity-80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">Rejected Alignment (Option B - Bypass)</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-100 text-rose-900 text-[10px]">REJECTED</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Bypass route required 340 Ha of prime multi-crop irrigated tobacco farmland, impacting 820 families with heavy environmental disruption.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: EVIDENCE REPOSITORY */}
          {activeTab === 'evidence' && (
            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Certified Primary Evidence Repository
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    Geotagged photographs, Gram Sabha video minutes, signed schedules &amp; E-Dhara RoR
                  </p>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  SHA-256 Hash Integrity Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SEED_EVIDENCE_ITEMS.map((ev) => (
                  <div key={ev.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                        <span className="font-bold text-[#1B365D]">{ev.evidenceId}</span>
                        <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 font-semibold">{ev.type}</span>
                      </div>
                      <div className="font-semibold text-slate-900 text-xs line-clamp-2">{ev.description}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        Source: {ev.sourceModule} | Record: {ev.relatedRecord}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">{ev.uploadedAt}</span>
                      <button
                        onClick={() => handleOpenEvidence(ev.evidenceId)}
                        className="px-2 py-1 bg-[#1B365D] hover:bg-[#152a48] text-white rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#C5A059]" />
                        <span>Inspect Evidence</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 14: STATUTORY DOCUMENTS VAULT */}
          {activeTab === 'documents' && (
            <div className="p-5 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Certified Gazette &amp; Statutory Notifications
              </h3>
              
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {[
                  { id: 'DOC-01', title: 'Section 4(1) SIA Preliminary Notification', date: '10 Jan 2026', size: '2.4 MB', gazetteNo: 'G-74/2026' },
                  { id: 'DOC-02', title: 'Terms of Reference (ToR) for SIA Study', date: '22 Jan 2026', size: '1.8 MB', gazetteNo: 'ADM/SIA/04' },
                  { id: 'DOC-03', title: 'Section 5 Public Hearing Gazette Notice & Vernacular Ads', date: '15 Feb 2026', size: '3.1 MB', gazetteNo: 'GUJ-PUB-88' },
                  { id: 'DOC-04', title: 'Draft Social Impact Assessment (SIA) Report v1.0', date: '10 Aug 2026', size: '14.2 MB', gazetteNo: 'SIA-V1.0' },
                  { id: 'DOC-05', title: 'Final Social Impact Assessment Report v1.2 Certified', date: '01 Sep 2026', size: '16.8 MB', gazetteNo: 'SIA-V1.2-FINAL' }
                ].map((doc) => (
                  <div key={doc.id} className="p-3 hover:bg-slate-50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-[#1B365D]" />
                      <div>
                        <div className="font-bold text-slate-900">{doc.title}</div>
                        <div className="text-[10px] font-mono text-slate-500">
                          Ref: {doc.gazetteNo} | Gazette Date: {doc.date} | Size: {doc.size}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => showToast(`Downloading authenticated copy of ${doc.gazetteNo}...`)}
                      className="px-3 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODALS */}
      <IegDiscrepancyModal
        isOpen={discrepancyModalOpen}
        onClose={() => setDiscrepancyModalOpen(false)}
        onSubmit={handleAddDiscrepancy}
      />

      <IegClarificationModal
        isOpen={clarificationModalOpen}
        onClose={() => setClarificationModalOpen(false)}
        onSubmit={handleAddClarification}
      />

      <IegObservationModal
        isOpen={observationModalOpen}
        onClose={() => setObservationModalOpen(false)}
        onSubmit={handleAddObservation}
      />

      {/* CONTEXTUAL ACTION DRAWER */}
      <ContextualActionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerType={drawerType}
        data={drawerData}
        onResolveDiscrepancy={handleResolveDiscrepancy}
      />

    </div>
  );
}
