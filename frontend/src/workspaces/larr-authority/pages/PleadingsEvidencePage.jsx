import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  FolderOpen, 
  Map, 
  FileText, 
  Upload, 
  Eye, 
  CheckCircle2, 
  Layers, 
  Download, 
  ShieldCheck, 
  Hash, 
  ExternalLink,
  Users,
  Search,
  Filter
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function PleadingsEvidencePage() {
  const { selectedCase, exhibits, setExhibits, showToast } = useLarrAuthority();

  const [activeTab, setActiveTab] = useState('exhibits'); // 'exhibits', 'spatial', 'witnesses'
  const [selectedExhibit, setSelectedExhibit] = useState(exhibits[0]);
  const [isLcrPdfOpen, setIsLcrPdfOpen] = useState(false);
  const [isExhibitPdfOpen, setIsExhibitPdfOpen] = useState(false);
  const [recordTypeFilter, setRecordTypeFilter] = useState('ALL');

  // Section 13 Supported Records:
  // Written Statements, Counter-Affidavits, Claim Applications, Valuation Reports, Sale Deeds, Land Records, Collector Award, R&R Documents, SIA Documents, IEG Documents, GIS Evidence, Photographs, Expert Reports, Other Exhibits.
  const RECORD_CATEGORIES = [
    'ALL',
    'Written Statements',
    'Counter-Affidavits',
    'Claim Applications',
    'Valuation Reports',
    'Sale Deeds',
    'Land Records',
    'Collector Award',
    'R&R Documents',
    'SIA Documents',
    'IEG Documents',
    'GIS Evidence',
    'Photographs',
    'Expert Reports',
    'Other Exhibits'
  ];

  // Spatial Evidence Overlay toggle states
  const [spatialLayers, setSpatialLayers] = useState({
    projectCorridor: true,
    cadastralBoundary: true,
    severedCanal: true,
    exemplarSalePlots: true
  });

  // Expert Witness Grid State (Section 13 Fields: Witness Name, Expertise, Organization, Report, Date, Evidence Submitted, Testimony Date, Status)
  const [witnesses] = useState([
    {
      id: 'WIT-01',
      name: 'Er. K.M. Shah, F.I.V.',
      expertise: 'Registered Government Valuer (Immovable Assets & Boreholes)',
      organization: 'Institution of Valuers (India) / CCIT Vadodara Reg.',
      reportDoc: 'Valuation Report on 45 Trees & Tubewell (Doc Ex. P-2)',
      date: '18/06/2026',
      evidenceSubmitted: 'Physical Borehole Boring Log, Core Samples, Electric Motor Invoice',
      testimonyDate: '22/07/2026',
      status: 'EXAMINED & CROSS-EXAMINED'
    },
    {
      id: 'WIT-02',
      name: 'Shri B.K. Patel, Advocate',
      expertise: 'Advocate Court Commissioner appointed under Order XXVI CPC',
      organization: 'District Bar Association, Anand',
      reportDoc: 'Spot Inspection & Soil Bisection Report (Doc Ex. C-1)',
      date: '02/08/2026',
      evidenceSubmitted: 'Photographic Album with GPS tags, Panchnama, Irrigation Route Map',
      testimonyDate: '05/08/2026',
      status: 'REPORT ADMITTED AS COURT EXHIBIT'
    },
    {
      id: 'WIT-03',
      name: 'Shri D.K. Rathva, GAS',
      expertise: 'Special Land Acquisition Officer (Collector Anand Representative)',
      organization: 'Collectorate Anand (Land Acquisition Branch)',
      reportDoc: 'Section 65 Valuation Justification Note',
      date: '14/08/2026',
      evidenceSubmitted: 'Jantar Reckoner 2024 Schedule, Taluka Average Sale Return 2021-2024',
      testimonyDate: '28/08/2026',
      status: 'OFFICIAL TESTIMONY RECORDED'
    }
  ]);

  const handleUploadExhibit = () => {
    showToast('New exhibit uploaded to Lower Court Record (LCR) with SHA-256 hash!', 'success');
  };

  const filteredExhibits = exhibits.filter(ex => {
    if (recordTypeFilter === 'ALL') return true;
    return ex.documentType.toLowerCase().includes(recordTypeFilter.toLowerCase());
  });

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-mono text-[10px] font-bold border border-indigo-300">
              IMMUTABLE COURT RECORD (LCR)
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Pleadings &amp; Spatial Evidence Vault
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Custody and verification of written statements, registered sale exemplars, government valuation reports, witness depositions, and DILRMP cadastral overlays.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLcrPdfOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Exhibit Inventory (LCR)</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-4 text-xs font-bold overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('exhibits')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'exhibits'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Exhibits &amp; Pleadings Index ({exhibits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('spatial')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'spatial'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>DILRMP / GIS Spatial Evidence Panel</span>
        </button>

        <button
          onClick={() => setActiveTab('witnesses')}
          className={`py-2 border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'witnesses'
              ? 'border-[#1B365D] text-[#1B365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Expert Witnesses &amp; Court Valuers ({witnesses.length})</span>
        </button>
      </div>

      {/* 3. TAB 1: EXHIBIT INDEX & VIEWER (Section 13 exact Columns: Exhibit No., Document ID, Document Type, Submitted By, Date Submitted, Verification Status, Page Count, Digital Signature, Remarks) */}
      {activeTab === 'exhibits' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          
          {/* Left 2 Cols: Table of Exhibits */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                Marked Court Exhibits &amp; Pleadings (Case: {selectedCase?.caseId})
              </h3>
              
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={recordTypeFilter}
                  onChange={(e) => setRecordTypeFilter(e.target.value)}
                  className="p-1 border border-slate-300 rounded bg-white text-[11px]"
                >
                  {RECORD_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <button
                  onClick={handleUploadExhibit}
                  className="px-2.5 py-1 bg-[#1B365D] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Upload className="w-3 h-3 text-[#C5A059]" />
                  <span>Upload Exhibit</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[850px]">
                <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                  <tr>
                    <th className="p-2.5">Exhibit No.</th>
                    <th className="p-2.5">Document ID</th>
                    <th className="p-2.5">Document Type</th>
                    <th className="p-2.5">Submitted By</th>
                    <th className="p-2.5">Date Submitted</th>
                    <th className="p-2.5">Verification</th>
                    <th className="p-2.5">Pages</th>
                    <th className="p-2.5">Digital Sign</th>
                    <th className="p-2.5">Remarks</th>
                    <th className="p-2.5 text-center">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExhibits.map((ex) => (
                    <tr 
                      key={ex.documentId}
                      onClick={() => setSelectedExhibit(ex)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedExhibit?.documentId === ex.documentId ? 'bg-indigo-50/70 border-l-4 border-indigo-700' : ''
                      }`}
                    >
                      {/* 1. Exhibit No */}
                      <td className="p-2.5 font-mono font-bold text-indigo-900 whitespace-nowrap">
                        {ex.exhibitNo}
                      </td>

                      {/* 2. Document ID */}
                      <td className="p-2.5 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                        {ex.documentId}
                      </td>

                      {/* 3. Document Type */}
                      <td className="p-2.5 font-medium text-slate-800">
                        {ex.documentType}
                      </td>

                      {/* 4. Submitted By */}
                      <td className="p-2.5 text-[11px] text-slate-700 whitespace-nowrap">
                        {ex.submittedBy}
                      </td>

                      {/* 5. Date Submitted */}
                      <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        {ex.dateSubmitted}
                      </td>

                      {/* 6. Verification Status */}
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          {ex.verificationStatus || 'VERIFIED'}
                        </span>
                      </td>

                      {/* 7. Page Count */}
                      <td className="p-2.5 font-mono text-center text-slate-600">
                        {ex.pageCount}
                      </td>

                      {/* 8. Digital Signature */}
                      <td className="p-2.5 font-mono text-[10px] text-blue-700 whitespace-nowrap truncate max-w-[100px]" title={ex.digitalSignature}>
                        {ex.digitalSignature?.split('(')[0] || 'Class-3 DSC'}
                      </td>

                      {/* 9. Remarks */}
                      <td className="p-2.5 text-[10px] text-slate-500 truncate max-w-[120px]" title={ex.relevance}>
                        {ex.relevance || 'Admitted on record'}
                      </td>

                      {/* 10. Inspect */}
                      <td className="p-2.5 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedExhibit(ex);
                            setIsExhibitPdfOpen(true);
                          }}
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#1B365D]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Col: Exhibit Detail & Cryptographic Hash Preview */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
                DOCUMENT VIEWER &amp; CUSTODY
              </span>
              <h4 className="font-extrabold text-[#1B365D] text-sm mt-0.5">
                {selectedExhibit ? selectedExhibit.exhibitNo : 'Ex. P-1'} Inspection
              </h4>
            </div>

            {selectedExhibit && (
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Document Title</div>
                  <div className="font-bold text-slate-900">{selectedExhibit.title}</div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Judicial Relevance / Grounds</div>
                  <div className="text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed font-serif">
                    {selectedExhibit.relevance}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-slate-600">
                  <div><strong>UPLOAD DATE:</strong> {selectedExhibit.dateSubmitted}</div>
                  <div><strong>UPLOADED BY:</strong> {selectedExhibit.submittedBy}</div>
                  <div><strong>EXHIBIT NO:</strong> {selectedExhibit.exhibitNo}</div>
                  <div><strong>CASE ASSOC:</strong> {selectedCase?.caseId}</div>
                  <div><strong>PAGES:</strong> {selectedExhibit.pageCount} Pages</div>
                  <div><strong>VERSION:</strong> v1.0 (Signed)</div>
                </div>

                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-950 text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Digital Signature &amp; Cryptographic Hash</span>
                  </div>
                  <div className="text-[10px] font-mono text-blue-900">{selectedExhibit.digitalSignature}</div>
                  <div className="text-[9px] font-mono text-slate-500 break-all">{selectedExhibit.hash}</div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setIsExhibitPdfOpen(true)}
                    className="flex-1 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer text-center"
                  >
                    View Certified Exhibit PDF
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 4. TAB 2: DILRMP / GIS SPATIAL EVIDENCE PANEL (Section 13 Display: ULPIN, parcel boundary, survey number, project boundary, acquisition area, disputed area, land use, linked evidence) */}
      {activeTab === 'spatial' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-extrabold text-[#1B365D] text-sm">
                DILRMP / GIS Spatial Evidence Panel: Survey {selectedCase?.surveyNumber} (ULPIN: {selectedCase?.ulpin})
              </h3>
              <p className="text-[11px] text-slate-600">
                Spatial evidence showing railway alignment bisection of parcel {selectedCase?.surveyNumber}, severance of irrigation borehole, and proximity to exemplar sale deed parcel 109/2.
              </p>
            </div>

            {/* Spatial Layer Toggles */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-mono text-slate-500">Overlays:</span>
              <label className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={spatialLayers.projectCorridor}
                  onChange={(e) => setSpatialLayers(prev => ({ ...prev, projectCorridor: e.target.checked }))}
                />
                <span className="text-[10px] font-mono">Freight Corridor</span>
              </label>
              <label className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={spatialLayers.cadastralBoundary}
                  onChange={(e) => setSpatialLayers(prev => ({ ...prev, cadastralBoundary: e.target.checked }))}
                />
                <span className="text-[10px] font-mono">Cadastral Boundary</span>
              </label>
              <label className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={spatialLayers.severedCanal}
                  onChange={(e) => setSpatialLayers(prev => ({ ...prev, severedCanal: e.target.checked }))}
                />
                <span className="text-[10px] font-mono">Severed Canal</span>
              </label>
              <label className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={spatialLayers.exemplarSalePlots}
                  onChange={(e) => setSpatialLayers(prev => ({ ...prev, exemplarSalePlots: e.target.checked }))}
                />
                <span className="text-[10px] font-mono">Exemplar Sale 109/2</span>
              </label>
            </div>
          </div>

          {/* Section 13 Spatial Metadata Grid: ULPIN, parcel boundary, survey number, project boundary, acquisition area, disputed area, land use, linked evidence */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
            <div><span className="text-slate-400 block text-[10px]">ULPIN:</span> <strong className="text-blue-700">{selectedCase?.ulpin}</strong></div>
            <div><span className="text-slate-400 block text-[10px]">SURVEY NO:</span> <strong>{selectedCase?.surveyNumber}</strong></div>
            <div><span className="text-slate-400 block text-[10px]">PARCEL BOUNDARY:</span> <span>Cadastral RoR Verified</span></div>
            <div><span className="text-slate-400 block text-[10px]">PROJECT BOUNDARY:</span> <span>Chainage 42+100 to 42+950</span></div>

            <div><span className="text-slate-400 block text-[10px]">ACQUISITION AREA:</span> <strong>{selectedCase?.acquiredAreaHectares} Ha ({selectedCase?.acquiredAreaSqM} sq.m)</strong></div>
            <div><span className="text-slate-400 block text-[10px]">DISPUTED AREA:</span> <strong className="text-rose-700">Severed Tubewell Well Zone (1,200 sq.m)</strong></div>
            <div><span className="text-slate-400 block text-[10px]">LAND USE:</span> <span>Perennial Tobacco / Banana</span></div>
            <div><span className="text-slate-400 block text-[10px]">LINKED EVIDENCE:</span> <span className="text-indigo-700 font-bold">Exhibit P-1 &amp; C-1</span></div>
          </div>

          {/* GIS Interactive Spatial Canvas Container (Leaflet-compatible layout) */}
          <div className="h-96 w-full rounded-xl bg-slate-900 border border-slate-700 relative overflow-hidden flex items-center justify-center text-white">
            
            {/* Background Satellite Grid Representation */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Simulated Cadastral Parcels Graphic */}
            <div className="relative z-10 w-full max-w-lg p-6 bg-slate-950/80 rounded-2xl border border-slate-700 backdrop-blur-xs space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="font-mono text-[#E6CA85] font-bold">GIS EVIDENCE LAYER: DILRMP GUJARAT</span>
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40">
                  EPSG: 4326 (WGS84)
                </span>
              </div>

              {/* Graphic Representation of Survey 108/1-P and Alignment */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">PARCEL: Sy 108/1-P (8,500 sq.m Acquired)</span>
                  <span className="text-amber-300">ULPIN: {selectedCase?.ulpin}</span>
                </div>

                <div className="h-28 w-full bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-700">
                  {/* Freight alignment band */}
                  <div className="absolute inset-x-0 h-10 bg-amber-500/30 border-y-2 border-amber-400 -rotate-12 flex items-center justify-center text-[10px] font-mono font-bold text-amber-200">
                    &bull;&bull;&bull; PROPOSED RAILWAY ALIGNMENT (DFCCIL) &bull;&bull;&bull;
                  </div>

                  {/* Severed borehole marker */}
                  <div className="absolute top-4 left-1/3 p-1 rounded bg-red-600 text-white font-mono text-[9px] font-bold shadow-md">
                    Severed Tubewell Well &amp; Pump
                  </div>

                  {/* Adjoining Exemplar 109/2 */}
                  <div className="absolute bottom-2 right-4 p-1 rounded bg-blue-600 text-white font-mono text-[9px] font-bold shadow-md">
                    Exemplar 109/2 (Sale @ ₹3,150)
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 flex justify-between">
                  <span>Severance Impact: <strong>100% Irrigation Conduit Cut</strong></span>
                  <span className="text-emerald-300 font-mono">Distance to SH-188: <strong>140m</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Spatial validation matches Ground Inspection Report Ex. C-1</span>
                <button
                  onClick={() => showToast('Opening Fullscreen Leaflet GIS Canvas in NLAMS...', 'info')}
                  className="px-2.5 py-1 bg-[#1B365D] hover:bg-slate-800 text-white rounded text-xs font-bold transition-colors cursor-pointer border border-[#C5A059]"
                >
                  Open in NLAMS Master GIS Canvas &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 5. TAB 3: EXPERT WITNESS GRID (Section 13 Fields: Witness Name, Expertise, Organization, Report, Date, Evidence Submitted, Testimony Date, Status) */}
      {activeTab === 'witnesses' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
              EXPERT WITNESS GRID &amp; JUDICIAL COMMISSIONERS
            </h3>
            <p className="text-[11px] text-slate-500">
              Depositions recorded under oath pursuant to Section 61 of the RFCTLARR Act 2013 and Order XVIII CPC.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[800px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-2.5">Witness Name</th>
                  <th className="p-2.5">Expertise</th>
                  <th className="p-2.5">Organization</th>
                  <th className="p-2.5">Report Tendered</th>
                  <th className="p-2.5">Date Submitted</th>
                  <th className="p-2.5">Evidence Submitted</th>
                  <th className="p-2.5">Testimony Date</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {witnesses.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                    {/* Witness Name */}
                    <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">
                      {w.name}
                      <div className="text-[10px] text-slate-400 font-mono">{w.id}</div>
                    </td>

                    {/* Expertise */}
                    <td className="p-2.5 text-slate-800">
                      {w.expertise}
                    </td>

                    {/* Organization */}
                    <td className="p-2.5 text-[11px] text-slate-600">
                      {w.organization}
                    </td>

                    {/* Report */}
                    <td className="p-2.5 text-blue-700 font-semibold text-[11px]">
                      {w.reportDoc}
                    </td>

                    {/* Date */}
                    <td className="p-2.5 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                      {w.date}
                    </td>

                    {/* Evidence Submitted */}
                    <td className="p-2.5 text-[11px] text-slate-700 max-w-xs">
                      {w.evidenceSubmitted}
                    </td>

                    {/* Testimony Date */}
                    <td className="p-2.5 font-mono text-slate-800 text-[11px] whitespace-nowrap font-bold">
                      {w.testimonyDate}
                    </td>

                    {/* Status */}
                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Indexed Lower Court Record (LCR) Inventory Modal (Section 13) */}
      <OfficialDocumentViewerModal
        isOpen={isLcrPdfOpen}
        onClose={() => setIsLcrPdfOpen(false)}
        title={`Indexed Lower Court Record (LCR) — Case ${selectedCase?.caseId}`}
        documentType="LCR_RECORD"
        caseData={selectedCase}
        metadata={{
          docId: `LCR-INDEX-2026-${selectedCase?.caseId?.replace(/\//g, '-')}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              INDEX OF LOWER COURT RECORD (LCR) ASSEMBLED UNDER ORDER XIII CPC
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px]">
              <div><strong>CASE NUMBER:</strong> {selectedCase?.caseId}</div>
              <div><strong>REVENUE PARCEL:</strong> Survey {selectedCase?.surveyNumber} (ULPIN: {selectedCase?.ulpin})</div>
              <div><strong>TOTAL NUMBER OF MARKED EXHIBITS:</strong> {exhibits.length}</div>
            </div>
            <table className="w-full text-left text-xs border border-slate-300 mt-2 font-sans">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Ex. No.</th>
                  <th className="p-2 border-r border-slate-300">Description</th>
                  <th className="p-2 border-r border-slate-300">Tendered By</th>
                  <th className="p-2 border-r border-slate-300">Pages</th>
                  <th className="p-2">Hash (SHA-256)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {exhibits.map(ex => (
                  <tr key={ex.documentId}>
                    <td className="p-2 border-r border-slate-200 font-mono font-bold">{ex.exhibitNo}</td>
                    <td className="p-2 border-r border-slate-200">{ex.title}</td>
                    <td className="p-2 border-r border-slate-200">{ex.submittedBy}</td>
                    <td className="p-2 border-r border-slate-200 font-mono text-center">{ex.pageCount}</td>
                    <td className="p-2 font-mono text-[10px] text-slate-600 truncate max-w-[120px]">{ex.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />

      {/* Individual Exhibit Certified PDF Modal */}
      <OfficialDocumentViewerModal
        isOpen={isExhibitPdfOpen}
        onClose={() => setIsExhibitPdfOpen(false)}
        title={`Certified Court Exhibit: ${selectedExhibit?.exhibitNo} — ${selectedExhibit?.title}`}
        documentType="EXHIBIT_VIEWER"
        caseData={selectedCase}
        metadata={{
          docId: selectedExhibit?.documentId || 'DOC-EX-001',
          date: selectedExhibit?.dateSubmitted || '04/02/2026',
          hash: selectedExhibit?.hash
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              CERTIFIED EXHIBIT COPY: {selectedExhibit?.exhibitNo}
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px]">
              <div><strong>TITLE:</strong> {selectedExhibit?.title}</div>
              <div><strong>TENDERED BY:</strong> {selectedExhibit?.submittedBy} ON {selectedExhibit?.dateSubmitted}</div>
              <div><strong>CRYPTOGRAPHIC HASH:</strong> {selectedExhibit?.hash}</div>
            </div>
            <p className="text-justify font-serif text-sm">
              <strong>JUDICIAL RELEVANCE &amp; FINDINGS ON RECORD:</strong><br />
              {selectedExhibit?.relevance}
            </p>
          </div>
        }
      />

    </div>
  );
}
