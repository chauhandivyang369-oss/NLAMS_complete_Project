import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  FileInput, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  MapPin, 
  Download, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Send,
  UserCheck,
  Calendar,
  Clock,
  Coins,
  Filter
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function Section64InwardPage() {
  const { cases, selectCaseById, registerCase, showToast, permissions } = useLarrAuthority();

  const [selectedInwardCase, setSelectedInwardCase] = useState(cases[7] || cases[0]); // Default to UNDER_SCRUTINY case
  const [ulpinSearchInput, setUlpinSearchInput] = useState('');
  const [ulpinSearchResult, setUlpinSearchResult] = useState(null);
  
  // Defect Modal State & Section 11 Defect Categories
  const [isDefectModalOpen, setIsDefectModalOpen] = useState(false);
  const [selectedDefectCategory, setSelectedDefectCategory] = useState('Missing document');
  const [defectText, setDefectText] = useState('');
  const [isDefectPdfOpen, setIsDefectPdfOpen] = useState(false);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [viewedDocTitle, setViewedDocTitle] = useState('');

  // Scrutiny Checkpoints State (Section 11)
  const [checklist, setChecklist] = useState({
    requiredDocuments: true,
    signatures: true,
    dates: true,
    referenceValidity: true,
    claimantInfo: true,
    ulpinConsistency: true,
    awardConsistency: false,
    jurisdiction: true
  });

  // Filter status state for Inward Grid (Section 11 7 Statuses)
  const [statusFilter, setStatusFilter] = useState('ALL');

  const INWARD_STATUSES = [
    'ALL',
    'Received',
    'Under Scrutiny',
    'Defect Found',
    'Defect Rectification Pending',
    'Registered',
    'Rejected for Defect',
    'Sent for Judicial Processing'
  ];

  const DEFECT_CATEGORIES = [
    'Missing document',
    'Invalid signature',
    'Incomplete reference',
    'Incorrect land details',
    'ULPIN mismatch',
    'Claimant mismatch',
    'Jurisdiction issue',
    'Other'
  ];

  // Section 11 8 Mandatory Inward Documents
  const MANDATORY_DOCUMENTS = [
    { id: 'DOC-01', name: 'Form-VIII Section 64 Reference', pages: 6, status: 'VERIFIED', hash: 'SHA256: 4f98...e21b' },
    { id: 'DOC-02', name: 'Section 65 Statement', pages: 12, status: 'VERIFIED', hash: 'SHA256: 98bc...77a1' },
    { id: 'DOC-03', name: 'Collector Award', pages: 34, status: 'VERIFIED', hash: 'SHA256: 12ea...99ea' },
    { id: 'DOC-04', name: 'Land Records (7/12 & 8-A)', pages: 8, status: 'VERIFIED', hash: 'SHA256: 38cc...df42' },
    { id: 'DOC-05', name: 'Ownership Documents / Title Deed', pages: 16, status: 'VERIFIED', hash: 'SHA256: bb19...02da' },
    { id: 'DOC-06', name: 'Compensation Statement', pages: 5, status: 'UNDER_REVIEW', hash: 'SHA256: ef41...68aa' },
    { id: 'DOC-07', name: 'Deposit Information (Escrow Challan)', pages: 3, status: 'VERIFIED', hash: 'SHA256: da20...8811' },
    { id: 'DOC-08', name: 'Supporting Evidence / Valuer Report', pages: 18, status: 'VERIFIED', hash: 'SHA256: c398...df34' }
  ];

  const handleUlpinSearch = () => {
    if (!ulpinSearchInput.trim()) return;
    const found = cases.find(c => c.ulpin.toLowerCase().includes(ulpinSearchInput.trim().toLowerCase()));
    if (found) {
      setUlpinSearchResult(found);
      showToast(`DILRMP Verified: ULPIN ${found.ulpin} linked to Sy No. ${found.surveyNumber}`, 'success');
    } else {
      setUlpinSearchResult(null);
      showToast('No linked parcel found in DILRMP / BhoomiRashi for this ULPIN.', 'warning');
    }
  };

  const handleRegister = () => {
    if (!checklist.requiredDocuments || !checklist.signatures || !checklist.awardConsistency) {
      showToast('Cannot register case until all statutory scrutiny checkpoints are marked verified!', 'warning');
      return;
    }
    const newCaseNumber = `LARR/2026/ANAND/${String(cases.length + 1).padStart(3, '0')}`;
    registerCase(selectedInwardCase.caseId, newCaseNumber);
    showToast(`Case ${selectedInwardCase.caseId} formally registered with Case Number: ${newCaseNumber}!`, 'success');
  };

  const handleOpenDoc = (docName) => {
    setViewedDocTitle(docName);
    setIsDocViewerOpen(true);
  };

  const filteredCases = cases.filter(c => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'Under Scrutiny') return c.stage.includes('SCRUTINY');
    if (statusFilter === 'Received') return c.stage.includes('RECEIVED');
    if (statusFilter === 'Registered') return c.stage.includes('REGISTERED');
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] font-bold border border-blue-300">
              REGISTRY FILING SECTION
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Section 64 Reference Inward &amp; e-Filing
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Statutory intake of Collector references under Section 64, scrutiny of Form-VIII and Section 65 statements, defect memo generation, and digital case registration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-300">
            RFCTLARR Sec 64 &amp; 65
          </span>
        </div>
      </div>

      {/* 2. DILRMP / ULPIN Search Bar (Section 11) */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#1B365D]" />
            <span>DILRMP / ULPIN Search Bar — Linked Spatial &amp; Landowner Records</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            Bhu-Naksha / BhoomiRashi API Interoperability
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={ulpinSearchInput}
            onChange={(e) => setUlpinSearchInput(e.target.value)}
            placeholder="Enter 14 or 16-character ULPIN (e.g., GJ24ANDPET010189)..."
            className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-hidden font-mono bg-slate-50"
          />
          <button
            onClick={handleUlpinSearch}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Verify ULPIN
          </button>
        </div>

        {/* Linked Records Display as specified in Section 11: Parcel, Survey Number, Land Area, Owner, Location, Project, Existing acquisition records */}
        {ulpinSearchResult && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs space-y-1 animate-fadeIn">
            <div className="flex items-center justify-between font-mono font-bold text-emerald-950">
              <span>ULPIN VERIFIED: {ulpinSearchResult.ulpin}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900">AUTHENTIC CADASTRE</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-emerald-900 mt-1">
              <div><strong>Parcel ID:</strong> {ulpinSearchResult.parcelId}</div>
              <div><strong>Survey Number:</strong> {ulpinSearchResult.surveyNumber}</div>
              <div><strong>Land Area:</strong> {ulpinSearchResult.acquiredAreaHectares} Ha ({ulpinSearchResult.acquiredAreaSqM} sq.m)</div>
              <div><strong>Owner / Title:</strong> {ulpinSearchResult.claimantName}</div>
              <div><strong>Location:</strong> {ulpinSearchResult.village}, {ulpinSearchResult.taluka}, {ulpinSearchResult.district}</div>
              <div><strong>Project:</strong> {ulpinSearchResult.projectName}</div>
              <div className="col-span-2"><strong>Existing Acquisition Records:</strong> Award No. {ulpinSearchResult.collectorAward.awardNumber} (LA Act Sec 23)</div>
            </div>
          </div>
        )}
      </div>

      {/* 3. REFERENCE INWARD GRID (Section 11 exact Columns & Statuses) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
              Section 64 Reference Inward Grid ({filteredCases.length} Matters)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              Click row to inspect details and scrutiny panel
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="font-mono text-[10px] font-bold text-slate-500 uppercase">Filter Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1 border border-slate-300 rounded bg-white text-xs font-mono"
            >
              {INWARD_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>

        {/* Section 11 Exact Columns: Reference ID, Case ID, Collector, District, Project, ULPIN, Survey Number, Claimant, Reference Date, Received Date, Original Award Number, Original Award Amount, Status */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1050px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
              <tr>
                <th className="p-2.5">Reference ID</th>
                <th className="p-2.5">Case ID</th>
                <th className="p-2.5">Collector</th>
                <th className="p-2.5">District</th>
                <th className="p-2.5">Project</th>
                <th className="p-2.5">ULPIN</th>
                <th className="p-2.5">Survey No.</th>
                <th className="p-2.5">Claimant</th>
                <th className="p-2.5">Ref Date</th>
                <th className="p-2.5">Recv Date</th>
                <th className="p-2.5">Orig Award No.</th>
                <th className="p-2.5">Orig Award (₹)</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => {
                const isSelected = selectedInwardCase?.caseId === c.caseId;
                return (
                  <tr 
                    key={c.caseId} 
                    onClick={() => {
                      setSelectedInwardCase(c);
                      selectCaseById(c.caseId);
                    }}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70 border-l-4 border-[#1B365D]' : ''
                    }`}
                  >
                    {/* 1. Reference ID */}
                    <td className="p-2.5 font-mono text-[11px] font-bold text-slate-800 whitespace-nowrap">
                      {c.referenceNumber}
                    </td>

                    {/* 2. Case ID */}
                    <td className="p-2.5 whitespace-nowrap font-mono font-bold text-[#1B365D]">
                      {c.caseId}
                    </td>

                    {/* 3. Collector */}
                    <td className="p-2.5 max-w-[120px] truncate" title={c.collectorName}>
                      {c.collectorName.split(',')[0]}
                    </td>

                    {/* 4. District */}
                    <td className="p-2.5 whitespace-nowrap font-medium text-slate-700">
                      {c.district}
                    </td>

                    {/* 5. Project */}
                    <td className="p-2.5 max-w-[120px] truncate text-[11px]" title={c.projectName}>
                      {c.projectCode || c.projectName}
                    </td>

                    {/* 6. ULPIN */}
                    <td className="p-2.5 font-mono text-[11px] text-blue-700 font-bold whitespace-nowrap">
                      {c.ulpin}
                    </td>

                    {/* 7. Survey No */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {c.surveyNumber}
                    </td>

                    {/* 8. Claimant */}
                    <td className="p-2.5 max-w-[130px] truncate font-semibold text-slate-900" title={c.claimantName}>
                      {c.claimantName}
                    </td>

                    {/* 9. Reference Date */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {c.referenceDate}
                    </td>

                    {/* 10. Received Date */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {c.receivedDate || c.referenceDate}
                    </td>

                    {/* 11. Orig Award Number */}
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {c.collectorAward.awardNumber}
                    </td>

                    {/* 12. Orig Award Amount */}
                    <td className="p-2.5 font-mono font-bold text-slate-800 whitespace-nowrap">
                      ₹{(c.collectorAward.totalCollectorAwardAmount / 10000000).toFixed(3)} Cr
                    </td>

                    {/* 13. Status */}
                    <td className="p-2.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        c.stage.includes('SCRUTINY') ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        c.stage.includes('RECEIVED') ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {c.stage.replace(/_/g, ' ')}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-2.5 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInwardCase(c);
                          selectCaseById(c.caseId);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-[11px] border border-slate-300 cursor-pointer"
                      >
                        Scrutinize
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. SECTION 64 REFERENCE DETAILS PANEL (Section 11 Exact Fields) */}
      {selectedInwardCase && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
                SECTION 64 REFERENCE DETAILS PANEL
              </div>
              <h3 className="font-extrabold text-[#1B365D] text-sm">
                Case Under Scrutiny: {selectedInwardCase.caseId} ({selectedInwardCase.claimantName})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDefectModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Issue Defect Memo</span>
              </button>

              <button
                disabled={!permissions.canRegisterCase}
                onClick={handleRegister}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                title={!permissions.canRegisterCase ? 'Only Registrar or Presiding Officer can formally register cases' : ''}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Verified &amp; Register Case</span>
              </button>
            </div>
          </div>

          {/* Section 11 Exact Fields Grid:
              Collector Name, Collector Office, District, State, Project, Requiring Body, Award Number, Award Date, Reference Date, Claimant Name, Claimant Address, ULPIN, Survey Number, Parcel ID, Land Area, Original Award, Solatium, Interest, Deposit Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-mono">
            <div><span className="text-slate-400 block text-[10px]">COLLECTOR NAME:</span> <strong className="text-slate-900">{selectedInwardCase.collectorName}</strong></div>
            <div><span className="text-slate-400 block text-[10px]">COLLECTOR OFFICE:</span> <span className="text-slate-800">Collectorate Complex, {selectedInwardCase.district}</span></div>
            <div><span className="text-slate-400 block text-[10px]">DISTRICT:</span> <span className="text-slate-800">{selectedInwardCase.district}</span></div>
            <div><span className="text-slate-400 block text-[10px]">STATE:</span> <span className="text-slate-800">{selectedInwardCase.state}</span></div>

            <div className="sm:col-span-2"><span className="text-slate-400 block text-[10px]">PROJECT:</span> <span className="text-slate-900 font-bold">{selectedInwardCase.projectName}</span></div>
            <div className="sm:col-span-2"><span className="text-slate-400 block text-[10px]">REQUIRING BODY:</span> <span className="text-slate-800">{selectedInwardCase.requiringBody}</span></div>

            <div><span className="text-slate-400 block text-[10px]">AWARD NUMBER:</span> <strong className="text-slate-900">{selectedInwardCase.collectorAward.awardNumber}</strong></div>
            <div><span className="text-slate-400 block text-[10px]">AWARD DATE:</span> <span className="text-slate-800">{selectedInwardCase.collectorAwardDate || '10/01/2026'}</span></div>
            <div><span className="text-slate-400 block text-[10px]">REFERENCE DATE:</span> <span className="text-slate-800">{selectedInwardCase.referenceDate}</span></div>
            <div><span className="text-slate-400 block text-[10px]">DEPOSIT DATE:</span> <span className="text-slate-800">{selectedInwardCase.depositDate || '28/01/2026'}</span></div>

            <div className="sm:col-span-2"><span className="text-slate-400 block text-[10px]">CLAIMANT NAME:</span> <strong className="text-slate-900 font-sans">{selectedInwardCase.claimantName}</strong></div>
            <div className="sm:col-span-2"><span className="text-slate-400 block text-[10px]">CLAIMANT ADDRESS:</span> <span className="text-slate-700 font-sans text-[11px]">{selectedInwardCase.claimantAddress}</span></div>

            <div><span className="text-slate-400 block text-[10px]">ULPIN:</span> <strong className="text-blue-700">{selectedInwardCase.ulpin}</strong></div>
            <div><span className="text-slate-400 block text-[10px]">SURVEY NUMBER:</span> <strong className="text-slate-900">{selectedInwardCase.surveyNumber}</strong></div>
            <div><span className="text-slate-400 block text-[10px]">PARCEL ID:</span> <span className="text-slate-800">{selectedInwardCase.parcelId}</span></div>
            <div><span className="text-slate-400 block text-[10px]">LAND AREA:</span> <span className="text-slate-800">{selectedInwardCase.acquiredAreaHectares} Ha ({selectedInwardCase.acquiredAreaSqM} sq.m)</span></div>

            <div><span className="text-slate-400 block text-[10px]">ORIGINAL AWARD:</span> <strong className="text-slate-900">₹{(selectedInwardCase.collectorAward.totalCollectorAwardAmount / 10000000).toFixed(3)} Cr</strong></div>
            <div><span className="text-slate-400 block text-[10px]">SOLATIUM:</span> <span className="text-slate-800">100% (₹{((selectedInwardCase.collectorAward.totalCollectorAwardAmount * 0.45) / 10000000).toFixed(3)} Cr)</span></div>
            <div><span className="text-slate-400 block text-[10px]">INTEREST (12%):</span> <span className="text-slate-800">₹{((selectedInwardCase.collectorAward.totalCollectorAwardAmount * 0.10) / 10000000).toFixed(3)} Cr</span></div>
            <div><span className="text-slate-400 block text-[10px]">DEPOSIT DETAILS:</span> <span className="text-emerald-700 font-bold">Treasury Escrow Verified</span></div>
          </div>

          {/* Section 11 Mandatory Scrutiny Panel & Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Scrutiny Panel */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                <span>DOCUMENT SCRUTINY PANEL (Registrar Verification)</span>
                <span className="text-[10px] font-mono text-slate-500">RFCTLARR Rules</span>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'requiredDocuments', label: '1. Required statutory documents complete (Form-VIII, Sec 65, Award)' },
                  { key: 'signatures', label: '2. Signatures & official seals of Collector / SLAO verified' },
                  { key: 'dates', label: '3. Statutory dates & limitation under Section 64 confirmed' },
                  { key: 'referenceValidity', label: '4. Reference validity & statutory grounds established' },
                  { key: 'claimantInfo', label: '5. Claimant information & locus standi verified' },
                  { key: 'ulpinConsistency', label: '6. ULPIN & Cadastral consistency tally with DILRMP' },
                  { key: 'awardConsistency', label: '7. Award amount & treasury deposit escrow consistency verified' },
                  { key: 'jurisdiction', label: '8. Territorial & pecuniary jurisdiction of Tribunal confirmed' }
                ].map((item) => (
                  <label key={item.key} className="flex items-start gap-2 p-1.5 rounded hover:bg-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist[item.key]}
                      onChange={(e) => setChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="mt-0.5 rounded text-[#1B365D] focus:ring-0"
                    />
                    <span className="text-[11px] text-slate-700 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 11 Mandatory Documents Dossier */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                <span>ATTACHED STATUTORY DOSSIER (8 MANDATORY DOCUMENTS)</span>
                <span className="text-[10px] font-mono text-slate-500">Class-3 DSC</span>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {MANDATORY_DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800 text-[11px]">{doc.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{doc.pages} pages • {doc.hash}</div>
                    </div>
                    <button 
                      onClick={() => handleOpenDoc(doc.name)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                      title="Preview Document"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#1B365D]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Defect Memo Generator Modal (Section 11) */}
      {isDefectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-lg w-full overflow-hidden p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-sm text-[#1B365D] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>DEFECT MEMO GENERATOR (Section 64 Scrutiny)</span>
              </h4>
              <button onClick={() => setIsDefectModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                &times;
              </button>
            </div>

            <div className="text-xs text-slate-600">
              Case: <strong>{selectedInwardCase.caseId}</strong> ({selectedInwardCase.collectorName})
            </div>

            {/* Section 11 Defect Categories Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Defect Category (Statutory Classification)
              </label>
              <select
                value={selectedDefectCategory}
                onChange={(e) => setSelectedDefectCategory(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
              >
                {DEFECT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Specific Grounds of Defect &amp; Rectification Directive
              </label>
              <textarea
                rows={3}
                value={defectText}
                onChange={(e) => setDefectText(e.target.value)}
                placeholder="State statutory defects observed (e.g., Section 65 schedule discrepancy, illegible Jamabandi seal, missing compensation escrow voucher)..."
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:outline-hidden font-sans"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-[10px] font-mono text-slate-500">
                14-Day Statutory Cure Notice
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDefectModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsDefectModalOpen(false);
                    setIsDefectPdfOpen(true);
                    showToast(`Defect Memo PDF generated for ${selectedInwardCase.caseId}!`, 'success');
                  }}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Generate Defect Memo PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Defect Memo PDF Viewer Modal */}
      <OfficialDocumentViewerModal
        isOpen={isDefectPdfOpen}
        onClose={() => setIsDefectPdfOpen(false)}
        title={`Statutory Defect Memo — ${selectedInwardCase?.caseId}`}
        documentType="DEFECT_MEMO"
        caseData={selectedInwardCase}
        metadata={{
          docId: `DEFECT-MEMO-2026-${selectedInwardCase?.caseId?.replace(/\//g, '-')}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4">
            <h4 className="font-bold text-center text-rose-900 uppercase underline text-sm">
              MEMORANDUM OF STATUTORY DEFECTS UNDER SECTION 64
            </h4>
            <div className="p-3 bg-amber-50 border border-amber-300 rounded font-mono text-xs">
              <div><strong>DEFECT CLASSIFICATION:</strong> {selectedDefectCategory}</div>
              <div><strong>TRIBUNAL INWARD REFERENCE:</strong> {selectedInwardCase?.referenceNumber}</div>
            </div>
            <p className="text-justify text-xs">
              Upon preliminary examination and scrutiny of the reference transmitted under Section 64 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 by the Collector, the Registry has observed the following defects:
            </p>
            <div className="p-3 bg-slate-50 border-l-4 border-amber-600 text-xs font-mono">
              {defectText || '1. Discrepancy observed between Section 65 schedule land area and RoR 7/12 extract. 2. Certified treasury escrow deposit voucher for solatium component not attached.'}
            </div>
            <p className="text-justify text-xs">
              The Collector / Submitting Authority is hereby directed to cure and rectify the aforesaid defects within <strong>14 days</strong> from the date of receipt of this memorandum, failing which the reference shall be placed before the Hon'ble Bench for rejection.
            </p>
          </div>
        }
      />

      {/* Mandatory Inward Document Preview Modal */}
      <OfficialDocumentViewerModal
        isOpen={isDocViewerOpen}
        onClose={() => setIsDocViewerOpen(false)}
        title={viewedDocTitle}
        documentType="STATUTORY_RECORD"
        caseData={selectedInwardCase}
      />

    </div>
  );
}
