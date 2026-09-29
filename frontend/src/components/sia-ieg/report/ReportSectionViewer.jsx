import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Users, 
  Home, 
  Briefcase, 
  Landmark, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  IndianRupee, 
  Calendar, 
  Compass, 
  Edit3, 
  Save, 
  Eye, 
  Download, 
  ExternalLink,
  Sparkles,
  Map as MapIcon,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

import { 
  REPORT_SECTIONS_LIST, 
  REPORT_PROJECT_CONTEXT, 
  DEFAULT_REPORT_NARRATIVES,
  EVIDENCE_ANNEXURES_LIST 
} from '../../../services/siaReportService.js';

import { 
  COMMUNITY_ASSETS, 
  ALTERNATIVE_SITES, 
  MINIMUM_LAND_ASSESSMENT 
} from '../../../services/siaSurveyService.js';

import { 
  DEFAULT_HEARING_SETUP, 
  HEARING_CONCERN_ITEMS, 
  HEARING_MINUTES 
} from '../../../services/siaHearingService.js';

import { 
  SEED_SIMP_IMPACTS, 
  SEED_SIMP_MITIGATIONS 
} from '../../../services/siaSimpService.js';

import { SEED_CADASTRAL_PARCELS } from '../../../services/gisService.js';
import ReportMapsView from './ReportMapsView.jsx';

export default function ReportSectionViewer({ 
  activeSectionId, 
  language = 'en',
  onNavigateToSource 
}) {
  const [narratives, setNarratives] = useState(DEFAULT_REPORT_NARRATIVES);
  const [isEditingNarrative, setIsEditingNarrative] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const activeSection = REPORT_SECTIONS_LIST.find(s => s.id === activeSectionId) || REPORT_SECTIONS_LIST[0];
  const langNarrative = narratives[language] || narratives['en'];

  const handleSaveNarrative = () => {
    setIsEditingNarrative(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const formatINR = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
      {/* Section Header Bar with Data Lineage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-white bg-[#1B365D] px-2 py-0.5 rounded">
              CHAPTER {activeSection.number}
            </span>
            <span className="text-slate-300">/</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {activeSection.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
            <span>Authoritative Source: <strong className="text-[#1B365D]">{activeSection.source}</strong></span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Status: {activeSection.status}</span>
          </div>
        </div>

        {/* Action button to open source record */}
        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Narrative Updated
            </span>
          )}

          {onNavigateToSource && (
            <button
              onClick={() => onNavigateToSource(activeSection.key)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#1B365D] rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Inspect source records in respective module"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Source Records</span>
            </button>
          )}
        </div>
      </div>

      {/* RENDER BY ACTIVE SECTION ID (1 to 22) */}

      {/* ---------------- SECTION 1: EXECUTIVE SUMMARY ---------------- */}
      {activeSection.id === 1 && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span className="font-bold text-slate-900 text-sm">Consolidated Executive Summary</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#1B365D] border border-blue-200 font-semibold">
                AI-Assisted Draft (Reviewable)
              </span>
            </div>

            <button
              onClick={() => isEditingNarrative ? handleSaveNarrative() : setIsEditingNarrative(true)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#1B365D] rounded font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {isEditingNarrative ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditingNarrative ? 'Save Summary' : 'Edit Summary'}</span>
            </button>
          </div>

          {isEditingNarrative ? (
            <textarea
              rows={8}
              value={langNarrative.executiveSummary}
              onChange={(e) => setNarratives({
                ...narratives,
                [language]: { ...langNarrative, executiveSummary: e.target.value }
              })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 leading-relaxed font-sans focus:bg-white"
            />
          ) : (
            <p className="leading-relaxed text-slate-700 text-justify bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
              {langNarrative.executiveSummary}
            </p>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Total Acquisition:</span>
              <span className="text-base font-bold font-mono text-[#1B365D]">486.75 Ha</span>
              <span className="text-[10px] text-slate-500 block">742 Cadastral Parcels</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Affected Population:</span>
              <span className="text-base font-bold font-mono text-slate-900">500 Families</span>
              <span className="text-[10px] text-slate-500 block">2,410 Individuals</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Displaced Homesteads:</span>
              <span className="text-base font-bold font-mono text-purple-700">186 Families</span>
              <span className="text-[10px] text-purple-800 block">Gaothan Resettlement</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">SIMP Escrow Budget:</span>
              <span className="text-base font-bold font-mono text-emerald-700">₹42.74 Crore</span>
              <span className="text-[10px] text-emerald-800 block">8 Statutory Measures</span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 2: PROJECT DESCRIPTION ---------------- */}
      {activeSection.id === 2 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                Administrative Approval &amp; Authority
              </span>
              <div className="space-y-1.5 text-slate-800">
                <div><strong>Project Name:</strong> {REPORT_PROJECT_CONTEXT.projectName}</div>
                <div><strong>Project ID:</strong> <span className="font-mono">{REPORT_PROJECT_CONTEXT.projectId}</span></div>
                <div><strong>Project Type:</strong> {REPORT_PROJECT_CONTEXT.projectType}</div>
                <div><strong>Requiring Body:</strong> {REPORT_PROJECT_CONTEXT.requiringBody}</div>
                <div><strong>Approval Order:</strong> <span className="font-mono">{REPORT_PROJECT_CONTEXT.administrativeApprovalNo}</span> ({REPORT_PROJECT_CONTEXT.administrativeApprovalDate})</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                Geographical Corridor &amp; Extent
              </span>
              <div className="space-y-1.5 text-slate-800">
                <div><strong>State &amp; District:</strong> Gujarat / Anand</div>
                <div><strong>Taluka:</strong> Petlad</div>
                <div><strong>Revenue Villages (5):</strong> Petlad, Sunav, Nar, Demol, Rangaipura</div>
                <div><strong>Linear Alignment:</strong> Ch. 0+000 to Ch. 24+800 (24.8 km Dual Track)</div>
                <div><strong>Proposed Corridor Area:</strong> 486.75 Hectares (1,202.7 Acres)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Detailed Technical Alignment Scope</h4>
            <p className="text-slate-600 leading-relaxed text-justify">
              {REPORT_PROJECT_CONTEXT.projectDescription} The alignment avoids high-density urban residential wards of Petlad Municipality 
              by maintaining an average turning radius of 1,200m adhering to Indian Railways Schedule of Dimensions (IRS-SOD 2022).
            </p>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 3: PUBLIC PURPOSE ---------------- */}
      {activeSection.id === 3 && (
        <div className="space-y-4 text-xs">
          <div className="bg-blue-50/60 p-4 rounded-lg border border-blue-200 space-y-2">
            <span className="text-[10px] font-mono font-bold text-blue-900 uppercase block">
              Statutory Classification under RFCTLARR Act 2013
            </span>
            <div className="text-sm font-bold text-[#1B365D] leading-snug">
              Section 2(1)(b) — Infrastructure Projects for Railways &amp; National Freight Corridors
            </div>
            <p className="text-slate-700 leading-relaxed">
              The project is declared as a public infrastructure project providing crucial missing rail bypass links, 
              enhancing bulk freight logistics connectivity for agricultural and dairy produce between Kheda-Anand milk shed and Western ports.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-bold text-slate-900">Detailed Public Purpose Justification Narrative</h4>
              <button
                onClick={() => isEditingNarrative ? handleSaveNarrative() : setIsEditingNarrative(true)}
                className="text-[11px] text-[#1B365D] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> {isEditingNarrative ? 'Save' : 'Edit Narrative'}
              </button>
            </div>
            {isEditingNarrative ? (
              <textarea
                rows={5}
                value={langNarrative.publicPurposeJustification}
                onChange={(e) => setNarratives({
                  ...narratives,
                  [language]: { ...langNarrative, publicPurposeJustification: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white"
              />
            ) : (
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed text-justify">
                {langNarrative.publicPurposeJustification}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- SECTION 4: LAND REQUIREMENT ---------------- */}
      {activeSection.id === 4 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Total Corridor:</span>
              <strong className="text-sm font-mono text-[#1B365D]">1,250.40 Ha</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Proposed Acquisition:</span>
              <strong className="text-sm font-mono text-emerald-700">486.75 Ha</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Cadastral Parcels:</span>
              <strong className="text-sm font-mono text-slate-900">742 Numbers</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">ULPIN Records:</span>
              <strong className="text-sm font-mono text-slate-900">742 Verified</strong>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 font-bold text-slate-800 text-xs">
              Representative Cadastral Parcel Schedule (from Menu 2 Master)
            </div>
            <div className="overflow-x-auto max-h-60">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-2">ULPIN</th>
                    <th className="p-2">Survey No</th>
                    <th className="p-2">Village</th>
                    <th className="p-2">Total Area</th>
                    <th className="p-2">Affected Area</th>
                    <th className="p-2">Impact %</th>
                    <th className="p-2">Land Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SEED_CADASTRAL_PARCELS.slice(0, 8).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-[#1B365D] font-bold">{p.ulpin}</td>
                      <td className="p-2 font-mono">{p.surveyNo}</td>
                      <td className="p-2">{p.village}</td>
                      <td className="p-2 font-mono">{p.areaHa} Ha</td>
                      <td className="p-2 font-mono font-bold text-slate-900">{(p.areaHa * (p.impactPct / 100)).toFixed(2)} Ha</td>
                      <td className="p-2 font-mono font-semibold text-amber-800">{p.impactPct}%</td>
                      <td className="p-2">{p.landUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 5: AFFECTED AREA ---------------- */}
      {activeSection.id === 5 && (
        <div className="space-y-4 text-xs">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Land Category</th>
                  <th className="p-2.5">Total Corridor Area (Ha)</th>
                  <th className="p-2.5">Affected Acquisition Area (Ha)</th>
                  <th className="p-2.5">Percentage of Acquisition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-semibold text-slate-800">Agricultural (Irrigated Multi-Crop)</td>
                  <td className="p-2.5 font-mono">780.00</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">312.40</td>
                  <td className="p-2.5 font-mono">64.18%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-slate-800">Agricultural (Rainfed / Single-Crop)</td>
                  <td className="p-2.5 font-mono">210.40</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">72.80</td>
                  <td className="p-2.5 font-mono">14.96%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-slate-800">Gaothan / Residential Settlement</td>
                  <td className="p-2.5 font-mono">140.00</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">58.15</td>
                  <td className="p-2.5 font-mono">11.95%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-slate-800">Government Waste / Grazing (Gauchar)</td>
                  <td className="p-2.5 font-mono">120.00</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">43.40</td>
                  <td className="p-2.5 font-mono">8.91%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2.5">Total Consolidated Area</td>
                  <td className="p-2.5 font-mono">1,250.40 Ha</td>
                  <td className="p-2.5 font-mono text-[#1B365D]">486.75 Ha</td>
                  <td className="p-2.5 font-mono">100.00%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Spatial Intersection validated on Leaflet PostGIS layer with zero forest encroachment.
          </p>
        </div>
      )}

      {/* ---------------- SECTION 6: AFFECTED FAMILIES ---------------- */}
      {activeSection.id === 6 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Total Families:</span>
              <strong className="text-base font-mono text-slate-900">500</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Survey Completed:</span>
              <strong className="text-base font-mono text-emerald-700">500 (100%)</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Physically Displaced:</span>
              <strong className="text-base font-mono text-purple-700">186</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Vulnerable Households:</span>
              <strong className="text-base font-mono text-amber-700">88 (SC/ST/WHH)</strong>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 font-bold text-slate-800 text-xs">
              Affected Household Sample Registry (Masked for Privacy)
            </div>
            <div className="overflow-x-auto max-h-56">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-2">Family ID</th>
                    <th className="p-2">Household Head</th>
                    <th className="p-2">Village</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Displacement</th>
                    <th className="p-2">Livelihood</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-[#1B365D] font-bold">FAM-00{i + 1}</td>
                      <td className="p-2 font-medium">Head of Household #{i + 1}</td>
                      <td className="p-2">{['Petlad', 'Sunav', 'Nar', 'Demol'][i % 4]}</td>
                      <td className="p-2">{['General', 'OBC', 'SC', 'SEBC'][i % 4]}</td>
                      <td className="p-2 font-semibold text-purple-800">{i % 2 === 0 ? 'Displaced' : 'Non-Displaced'}</td>
                      <td className="p-2">{i % 2 === 0 ? 'Cultivator' : 'Agricultural Labour'}</td>
                      <td className="p-2 text-emerald-700 font-semibold">Verified</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 7: DISPLACEMENT ---------------- */}
      {activeSection.id === 7 && (
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200 text-purple-950">
            <strong>Resettlement Mandate (Second Schedule RFCTLARR): </strong>
            186 residential households will lose residential dwellings and qualify for mandatory constructed model housing 
            units at Sunav Gaothan or financial resettlement grants in lieu of house allotment.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Fully Displaced:</span>
              <span className="text-base font-bold font-mono text-purple-700">186 Families</span>
              <span className="text-[10px] text-slate-500 block">Pucca/Semi-pucca structures</span>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Potentially Displaced:</span>
              <span className="text-base font-bold font-mono text-amber-700">34 Families</span>
              <span className="text-[10px] text-slate-500 block">Within 15m safety corridor</span>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Non-Displaced (Only Agri):</span>
              <span className="text-base font-bold font-mono text-slate-800">280 Families</span>
              <span className="text-[10px] text-slate-500 block">Farmland severance only</span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 8: LIVELIHOOD IMPACT ---------------- */}
      {activeSection.id === 8 && (
        <div className="space-y-4 text-xs">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Livelihood Domain</th>
                  <th className="p-2.5">Affected Families</th>
                  <th className="p-2.5">Estimated Income Impact</th>
                  <th className="p-2.5">Severity</th>
                  <th className="p-2.5">Mitigation Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-semibold">Agricultural Cultivators</td>
                  <td className="p-2.5 font-mono">312</td>
                  <td className="p-2.5">40%–60% crop yield reduction</td>
                  <td className="p-2.5 font-bold text-red-700">Critical</td>
                  <td className="p-2.5 font-mono text-[#1B365D]">SIMP MIT-004</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Agricultural Labourers</td>
                  <td className="p-2.5 font-mono">94</td>
                  <td className="p-2.5">Loss of 75–110 annual man-days</td>
                  <td className="p-2.5 font-bold text-red-700">Critical</td>
                  <td className="p-2.5 font-mono text-[#1B365D]">SIMP MIT-005</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Animal Husbandry &amp; Dairy</td>
                  <td className="p-2.5 font-mono">68</td>
                  <td className="p-2.5">Grazing severance / fodder cost</td>
                  <td className="p-2.5 font-bold text-amber-700">Medium</td>
                  <td className="p-2.5 font-mono text-[#1B365D]">SIMP MIT-002</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 9: LANDOWNERS ---------------- */}
      {activeSection.id === 9 && (
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <strong>Recorded Landowners (Khatedars): </strong>
            Total 860 distinct titleholders across 742 parcels. RoR e-Dhara cross-referencing completed with 100% Khatedar consent verification underway.
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Note: SIA records baseline titleholder observations; final statutory title adjudication occurs under Section 11 &amp; Section 15 inquiries.
          </div>
        </div>
      )}

      {/* ---------------- SECTION 10: COMMUNITY ASSETS ---------------- */}
      {activeSection.id === 10 && (
        <div className="space-y-4 text-xs">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2">Asset ID</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Village</th>
                  <th className="p-2">Impact Type</th>
                  <th className="p-2">Severity</th>
                  <th className="p-2">Reconstruction Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMMUNITY_ASSETS.map(a => (
                  <tr key={a.assetId} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-bold text-[#1B365D]">{a.assetId}</td>
                    <td className="p-2 font-semibold">{a.category}</td>
                    <td className="p-2">{a.name}</td>
                    <td className="p-2">{a.village}</td>
                    <td className="p-2">{a.impactType}</td>
                    <td className="p-2 text-amber-800 font-bold">{a.severity.slice(0, 18)}...</td>
                    <td className="p-2 font-mono text-emerald-700 font-semibold">{a.alternativeAvailability.slice(0, 24)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 11: INFRASTRUCTURE ---------------- */}
      {activeSection.id === 11 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">Irrigation &amp; Water Lines (SSNNL Minor #4)</strong>
              <p className="text-slate-600 text-[11px]">
                Sub-canal intersects alignment at Ch. 11+600. Addressed through ₹1.45 Cr Inverted Syphon Aqueduct under track embankment.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">Rural Roads &amp; Cart Tracks</strong>
              <p className="text-slate-600 text-[11px]">
                Sunav-Petlad link severed. Addressed through 1 Vehicular Underpass (VUP) at Ch. 13+400 and 2 Cattle Underpasses (PUPs).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 12: ALTERNATIVES ---------------- */}
      {activeSection.id === 12 && (
        <div className="space-y-4 text-xs">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2">Comparative Parameter</th>
                  <th className="p-2 text-[#1B365D] font-bold">Proposed Alignment (Option A)</th>
                  <th className="p-2">Alternative 1 (Northern Arc)</th>
                  <th className="p-2">Alternative 2 (Via Dharmaj)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ALTERNATIVE_SITES.map((alt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 font-semibold text-slate-800">{alt.parameter}</td>
                    <td className="p-2 font-mono font-bold text-[#1B365D] bg-blue-50/30">{alt.proposedSite}</td>
                    <td className="p-2 font-mono text-slate-600">{alt.altSite1}</td>
                    <td className="p-2 font-mono text-slate-600">{alt.altSite2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 13: BARE MINIMUM ASSESSMENT ---------------- */}
      {activeSection.id === 13 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Required Project Area:</span>
              <strong className="text-base font-mono text-[#1B365D]">{MINIMUM_LAND_ASSESSMENT.requiredProjectArea}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Essential Track Area:</span>
              <strong className="text-base font-mono text-slate-900">{MINIMUM_LAND_ASSESSMENT.essentialArea.split('(')[0]}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Potentially Excess Area:</span>
              <strong className="text-base font-mono text-emerald-700">{MINIMUM_LAND_ASSESSMENT.potentiallyExcessArea}</strong>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded border border-emerald-200 space-y-1 text-emerald-950">
            <strong>Section 8(1)(a) Bare Minimum Conclusion:</strong>
            <p className="text-[11px] leading-relaxed">{MINIMUM_LAND_ASSESSMENT.siaObservation}</p>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 14: PUBLIC HEARING ---------------- */}
      {activeSection.id === 14 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded border border-slate-200 font-mono text-[11px]">
            <div>Hearing ID: <strong>{DEFAULT_HEARING_SETUP.hearingId}</strong></div>
            <div>Date: <strong>{DEFAULT_HEARING_SETUP.scheduledDate}</strong></div>
            <div>Venue: <strong>Town Hall, Petlad</strong></div>
            <div>Attendance: <strong className="text-emerald-700">{DEFAULT_HEARING_SETUP.quorumAchieved} ({DEFAULT_HEARING_SETUP.quorumPercentage}% Quorum)</strong></div>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 font-bold text-slate-800 text-xs">
              Key Hearing Concerns &amp; SIA Dispositions (RFCTLARR Sec. 5)
            </div>
            <div className="divide-y divide-slate-100">
              {HEARING_CONCERN_ITEMS.map((c) => (
                <div key={c.issueId} className="p-3 hover:bg-slate-50/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#1B365D]">{c.issueId}: {c.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-900">
                      {c.priority}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{c.description}</p>
                  <div className="text-[11px] text-emerald-800 font-medium">
                    <strong>Official Disposition: </strong>{c.siaResponse || c.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 15: SOCIAL IMPACT ANALYSIS ---------------- */}
      {activeSection.id === 15 && (
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-bold text-slate-900">Integrated Social Impact Analysis Narrative</h4>
              <button
                onClick={() => isEditingNarrative ? handleSaveNarrative() : setIsEditingNarrative(true)}
                className="text-[11px] text-[#1B365D] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> {isEditingNarrative ? 'Save' : 'Edit Narrative'}
              </button>
            </div>
            {isEditingNarrative ? (
              <textarea
                rows={6}
                value={langNarrative.socialImpactAnalysisNarrative}
                onChange={(e) => setNarratives({
                  ...narratives,
                  [language]: { ...langNarrative, socialImpactAnalysisNarrative: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white"
              />
            ) : (
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed text-justify">
                {langNarrative.socialImpactAnalysisNarrative}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- SECTION 16: SIMP ---------------- */}
      {activeSection.id === 16 && (
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-blue-50/60 rounded border border-blue-200 text-blue-950 font-medium">
            Section 6 SIMP links 7 identified impacts directly to 8 concrete mitigation measures with designated executing agencies.
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2">Measure ID</th>
                  <th className="p-2">Linked Impact</th>
                  <th className="p-2">Measure Scope</th>
                  <th className="p-2">Responsible Agency</th>
                  <th className="p-2">Cost (INR)</th>
                  <th className="p-2">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SEED_SIMP_MITIGATIONS.map((m) => (
                  <tr key={m.mitigationId} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-bold text-[#1B365D]">{m.mitigationId}</td>
                    <td className="p-2 font-mono text-purple-700">{m.impactId}</td>
                    <td className="p-2 max-w-xs truncate" title={m.measureDescription}>{m.measureDescription}</td>
                    <td className="p-2 truncate max-w-[140px]">{m.responsibleAgency}</td>
                    <td className="p-2 font-mono font-bold text-slate-900">{formatINR(m.estimatedCost)}</td>
                    <td className="p-2 font-mono text-[10px]">{m.targetCompletionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 17: COST OF SOCIAL IMPACT ---------------- */}
      {activeSection.id === 17 && (
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900">
            <strong>Statutory Accounting Boundary: </strong>
            This represents the Social Mitigation &amp; SIMP Escrow Outlay under Section 6. It does <em>not</em> represent 
            land compensation or final award amounts, which are separately computed by the Collector under Section 23 to 30.
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Mitigation Cost Domain</th>
                  <th className="p-2.5">Estimated Outlay</th>
                  <th className="p-2.5">Cost Basis</th>
                  <th className="p-2.5">Source Module</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-semibold">Model R&amp;R Housing (186 Families @ Sunav Gaothan)</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">₹37,20,00,000</td>
                  <td className="p-2.5">Schedule II Standard Model Norms</td>
                  <td className="p-2.5 font-mono">Menu 4 MIT-004</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Vehicular Underpass &amp; Cattle Ramps (VUP/PUP)</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">₹2,95,00,000</td>
                  <td className="p-2.5">Railway SOR 2026</td>
                  <td className="p-2.5 font-mono">Menu 4 MIT-001/002</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Canal Inverted Syphon Aqueduct (SSNNL Minor #4)</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">₹1,45,00,000</td>
                  <td className="p-2.5">SSNNL Standard Irrigation Schedule</td>
                  <td className="p-2.5 font-mono">Menu 4 MIT-003</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">Livelihood Rehabilitation Grants &amp; Skill Development</td>
                  <td className="p-2.5 font-mono font-bold text-[#1B365D]">₹1,13,00,000</td>
                  <td className="p-2.5">District Skill Committee Norms</td>
                  <td className="p-2.5 font-mono">Menu 4 MIT-005</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2.5 text-slate-900">Total Consolidated Social Impact Management Outlay</td>
                  <td className="p-2.5 font-mono text-base text-[#1B365D]">₹42,74,30,000</td>
                  <td className="p-2.5">Consolidated SIMP Escrow</td>
                  <td className="p-2.5 font-mono">Menu 4 Master</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 18: BENEFIT CONTEXT ---------------- */}
      {activeSection.id === 18 && (
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-bold text-slate-900">Project Benefit Context Summary</h4>
              <button
                onClick={() => isEditingNarrative ? handleSaveNarrative() : setIsEditingNarrative(true)}
                className="text-[11px] text-[#1B365D] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> {isEditingNarrative ? 'Save' : 'Edit Narrative'}
              </button>
            </div>
            {isEditingNarrative ? (
              <textarea
                rows={5}
                value={langNarrative.benefitContextSummary}
                onChange={(e) => setNarratives({
                  ...narratives,
                  [language]: { ...langNarrative, benefitContextSummary: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white"
              />
            ) : (
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed text-justify">
                {langNarrative.benefitContextSummary}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- SECTION 19: SURVEY METHODOLOGY ---------------- */}
      {activeSection.id === 19 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Enumeration Period:</span>
              <strong className="text-slate-900">15/01/2026 to 22/02/2026</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Field Investigating Agency:</span>
              <strong className="text-slate-900">GIDR, Ahmedabad (12 Investigators)</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Data Collection Modes:</span>
              <strong className="text-slate-900">68% Tablet Assisted / 32% e-Gram Kiosk</strong>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-bold text-slate-900">Methodology &amp; Quality Control Protocol</h4>
              <button
                onClick={() => isEditingNarrative ? handleSaveNarrative() : setIsEditingNarrative(true)}
                className="text-[11px] text-[#1B365D] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> {isEditingNarrative ? 'Save' : 'Edit Narrative'}
              </button>
            </div>
            {isEditingNarrative ? (
              <textarea
                rows={5}
                value={langNarrative.surveyMethodologyNarrative}
                onChange={(e) => setNarratives({
                  ...narratives,
                  [language]: { ...langNarrative, surveyMethodologyNarrative: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white"
              />
            ) : (
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed text-justify">
                {langNarrative.surveyMethodologyNarrative}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- SECTION 20: EVIDENCE ANNEXURES ---------------- */}
      {activeSection.id === 20 && (
        <div className="space-y-4 text-xs">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2">Annexure</th>
                  <th className="p-2">Document ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Title &amp; Statutory Subject</th>
                  <th className="p-2">Module</th>
                  <th className="p-2 text-right">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EVIDENCE_ANNEXURES_LIST.map((ann) => (
                  <tr key={ann.docId} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-bold text-[#1B365D]">{ann.annexureNo}</td>
                    <td className="p-2 font-mono text-slate-600">{ann.docId}</td>
                    <td className="p-2 font-semibold">{ann.type}</td>
                    <td className="p-2 max-w-sm">{ann.title}</td>
                    <td className="p-2 font-mono text-purple-800 font-semibold">{ann.module}</td>
                    <td className="p-2 font-mono text-right text-slate-500">{ann.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- SECTION 21: MAPS ---------------- */}
      {activeSection.id === 21 && (
        <div className="space-y-4 text-xs">
          <ReportMapsView />
        </div>
      )}

      {/* ---------------- SECTION 22: FINAL FINDINGS ---------------- */}
      {activeSection.id === 22 && (
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-bold text-slate-900">SIA Unit Statutory Final Findings Narrative</h4>
              <button
                onClick={() => isEditingNarrative ? handleSaveNarrative() : setIsEditingNarrative(true)}
                className="text-[11px] text-[#1B365D] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> {isEditingNarrative ? 'Save' : 'Edit Narrative'}
              </button>
            </div>
            {isEditingNarrative ? (
              <textarea
                rows={6}
                value={langNarrative.finalFindingsNarrative}
                onChange={(e) => setNarratives({
                  ...narratives,
                  [language]: { ...langNarrative, finalFindingsNarrative: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs focus:bg-white"
              />
            ) : (
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed text-justify">
                {langNarrative.finalFindingsNarrative}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="block text-slate-900">Dr. Sudhir K. Dave</strong>
              <span className="text-[10px] text-slate-500 font-mono">Lead Sociologist &amp; Evaluator, GIDR</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="block text-slate-900">Dr. R. K. Trivedi</strong>
              <span className="text-[10px] text-slate-500 font-mono">Director &amp; Chief SIA Evaluator, GIDR</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
