import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Archive, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Eye,
  FileCheck,
  Building2,
  Calendar,
  Lock,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Key,
  Shield,
  FileDown,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  DocumentVaultService, 
  MOCK_VAULT_DOCUMENTS 
} from '../../services/documentVaultService.js';

export default function DocumentGazetteVault() {
  const { activeProject, selectedProjectId, showToast } = useWorkspace();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('ALL'); // 'ALL' | 'Form VI / VII Award' | 'E-Gazette Notification' | 'e-Signed Certificate'
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL'); // 'ALL' | 'Certified' | 'Published' | 'Signed'
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('ALL'); // 'ALL' | specific project ID

  // Selection states
  const [selectedDocId, setSelectedDocId] = useState('DOC-00041');
  const [isViewerModalOpen, setIsViewerModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  // Document viewer internal states
  const [viewerPage, setViewerPage] = useState(1);
  const [viewerZoom, setViewerZoom] = useState(100); // 100%
  const [isFitWidth, setIsFitWidth] = useState(true);

  // Available documents from service layer
  const documents = MOCK_VAULT_DOCUMENTS;

  // Derive unique projects for filter dropdown
  const availableProjects = useMemo(() => {
    const prjs = new Set(documents.map(d => d.projectId));
    return Array.from(prjs);
  }, [documents]);

  // Filtered documents list
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Text search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        doc.documentId.toLowerCase().includes(q) ||
        doc.documentName.toLowerCase().includes(q) ||
        doc.projectId.toLowerCase().includes(q) ||
        doc.relatedStage.toLowerCase().includes(q);

      // Type filter
      const matchesType = selectedTypeFilter === 'ALL' || doc.documentType === selectedTypeFilter;

      // Status filter
      const matchesStatus = selectedStatusFilter === 'ALL' || doc.status === selectedStatusFilter;

      // Project filter
      const matchesProject = selectedProjectFilter === 'ALL' || doc.projectId === selectedProjectFilter;

      return matchesSearch && matchesType && matchesStatus && matchesProject;
    });
  }, [documents, searchQuery, selectedTypeFilter, selectedStatusFilter, selectedProjectFilter]);

  // Selected document instance
  const selectedDoc = useMemo(() => {
    return documents.find(d => d.documentId === selectedDocId) || filteredDocuments[0] || documents[0];
  }, [documents, selectedDocId, filteredDocuments]);

  const handleOpenViewer = (docId) => {
    setSelectedDocId(docId);
    setViewerPage(1);
    setIsViewerModalOpen(true);
  };

  const handleDownloadArchiveZip = (projectName) => {
    showToast(`Downloading statutory archive: NLAMS-${projectName || 'Corridor'}-Documents.zip`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6 shadow-sm min-h-[calc(100vh-140px)] font-sans text-slate-800">
      
      {/* 1. Top Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Menu 10 • Central Archive
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500">Statutory Vault</span>
            </div>
            <h1 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span>Document & Gazette Vault</span>
              <span className="text-xs font-medium text-slate-500 font-sans">
                (Central repository for certified awards, Gazette notifications and e-Signed certificates)
              </span>
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Permanent statutory repository storing verified Form VI/VII awards, published E-Gazette extraordinary notifications, and Level-3 DSC e-Signed certificates under RFCTLARR Act 2013.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Archive ZIP Action Button (Source Tool: Archive Zip) */}
            <button
              onClick={() => setIsArchiveModalOpen(true)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Archive className="w-4 h-4 text-[#1B365D]" />
              <span>Archive ZIP Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Compact Search & Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Main Search Input */}
          <div className="relative grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Document ID / Project ID / Document Name / Stage..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Document Type Filter */}
          <div className="w-full md:w-56 shrink-0">
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-700 font-medium"
            >
              <option value="ALL">All Document Types (Source 3)</option>
              <option value="Form VI / VII Award">1. Form VI / VII Awards</option>
              <option value="E-Gazette Notification">2. E-Gazette Notifications</option>
              <option value="e-Signed Certificate">3. e-Signed Certificates</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-44 shrink-0">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-700 font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="Certified">Certified</option>
              <option value="Published">Published</option>
              <option value="Signed">Signed</option>
            </select>
          </div>

          {/* Project Filter */}
          <div className="w-full md:w-48 shrink-0">
            <select
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-700 font-medium"
            >
              <option value="ALL">All Projects</option>
              {availableProjects.map(pid => (
                <option key={pid} value={pid}>{pid}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter tags & active record count */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-800">{filteredDocuments.length}</strong> statutory documents</span>
            {(selectedTypeFilter !== 'ALL' || selectedStatusFilter !== 'ALL' || selectedProjectFilter !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTypeFilter('ALL');
                  setSelectedStatusFilter('ALL');
                  setSelectedProjectFilter('ALL');
                }}
                className="text-blue-900 font-semibold hover:underline ml-2"
              >
                Reset all filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="flex items-center gap-1 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              All Records Digitally Signed & Verified
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace: Split View with Document Table & Contextual Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left / Center: Main Document Table (7 Cols on large screens) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Statutory Document Archive
                </h2>
                <p className="text-[11px] text-slate-500">
                  Click on any record to inspect metadata, verify digital signatures, or launch the Document Viewer
                </p>
              </div>

              <span className="text-[11px] font-mono text-slate-500 bg-white border border-slate-300 px-2 py-0.5 rounded">
                CCA Verified Repository
              </span>
            </div>

            {filteredDocuments.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">No documents found</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Try changing the project, document type or search criteria.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTypeFilter('ALL');
                    setSelectedStatusFilter('ALL');
                    setSelectedProjectFilter('ALL');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider font-mono">
                    <tr>
                      <th className="p-3">Document ID</th>
                      <th className="p-3">Document Type</th>
                      <th className="p-3">Document Title & Stage</th>
                      <th className="p-3">Project ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-center">Signature Status</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {filteredDocuments.map((doc) => {
                      const isSelected = selectedDoc.documentId === doc.documentId;
                      return (
                        <tr
                          key={doc.documentId}
                          onClick={() => setSelectedDocId(doc.documentId)}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-blue-50/70 text-slate-900 font-medium' 
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-3 font-mono font-bold text-[11px] text-blue-900">
                            {doc.documentId}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              doc.documentType.includes('Award')
                                ? 'bg-purple-50 text-purple-900 border-purple-200'
                                : doc.documentType.includes('Gazette')
                                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                                  : 'bg-blue-50 text-blue-900 border-blue-200'
                            }`}>
                              {doc.documentType}
                            </span>
                          </td>
                          <td className="p-3 max-w-xs">
                            <div className="font-semibold text-slate-900 line-clamp-1">{doc.documentName}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{doc.relatedStage}</div>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-600">
                            {doc.projectId}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                            {doc.documentDate}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                              doc.status === 'Certified'
                                ? 'bg-purple-50 text-purple-800 border-purple-200'
                                : doc.status === 'Published'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenViewer(doc.documentId);
                              }}
                              className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#152a48] text-white font-semibold rounded text-[11px] inline-flex items-center gap-1 shadow-2xs transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>
              All documents are archived in conformance with ISO 19005 (PDF/A) standard for long-term statutory preservation.
            </span>
            <span className="font-mono text-[11px]">Total Listed: {filteredDocuments.length}</span>
          </div>
        </div>

        {/* Right: Contextual Document Detail Drawer (4 Cols on large screens) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedDoc ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              {/* Drawer Header */}
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedDoc.documentId}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                    selectedDoc.status === 'Certified'
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : selectedDoc.status === 'Published'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {selectedDoc.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-950 mt-2 leading-snug">
                  {selectedDoc.documentName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Type: <strong className="text-slate-700">{selectedDoc.documentType}</strong>
                </p>
              </div>

              {/* Primary Action Button: Open Document Viewer */}
              <button
                onClick={() => handleOpenViewer(selectedDoc.documentId)}
                className="w-full py-2.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span>Open Document Viewer</span>
              </button>

              {/* Compact Metadata Grid */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                  Document Information
                </span>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Project Reference:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedDoc.projectId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Related Stage:</span>
                    <span className="text-slate-800 font-medium">{selectedDoc.relatedStage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Document Date:</span>
                    <span className="font-mono text-slate-800">{selectedDoc.documentDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Format & Pages:</span>
                    <span className="font-mono text-slate-700">{selectedDoc.fileFormat} ({selectedDoc.filePages} pp)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Dossier File Size:</span>
                    <span className="font-mono text-slate-700">{selectedDoc.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Digital Signature Verifier Section (Source Tool: Digital Signature Verifier) */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                    Digital Signature Verifier
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    ✓ Verified
                  </span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 p-3 rounded-lg space-y-1.5">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">Signer & Designation</span>
                    <span className="font-bold text-slate-900 block">{selectedDoc.signatureDetails.signerName}</span>
                    <span className="text-[11px] text-slate-600 block">{selectedDoc.signatureDetails.signerDesignation}</span>
                  </div>
                  <div className="pt-1 border-t border-emerald-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">Certificate Token:</span>
                    <span className="font-mono text-slate-800 font-semibold">{selectedDoc.signatureDetails.signatureReference}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Verified At:</span>
                    <span>{selectedDoc.signatureDetails.verificationTime}</span>
                  </div>
                </div>
              </div>

              {/* Archive ZIP Reference (Source Tool: Archive Zip) */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                  Archive File Reference
                </span>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Archive className="w-3.5 h-3.5 text-blue-900" />
                    <span className="font-mono text-[11px] text-slate-800 font-medium">
                      {selectedDoc.archiveReference}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    Available
                  </span>
                </div>
              </div>

              {/* Document History Trail */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                  Document Lifecycle History
                </span>
                <div className="space-y-1.5 border-l-2 border-slate-200 pl-3 ml-1 py-1">
                  {selectedDoc.history.map((h, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-[10px] font-mono text-slate-400">{h.date}</div>
                      <div className="text-[11px] text-slate-700">{h.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs shadow-sm">
              Select a document to inspect details.
            </div>
          )}
        </div>

      </div>

      {/* 4. MODAL / CENTER-STAGE DOCUMENT VIEWER (White / Institutional Light Theme) */}
      {isViewerModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-5xl h-[92vh] rounded-xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
            
            {/* Viewer Top Control Bar */}
            <div className="bg-slate-50 text-slate-800 p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-xs font-bold text-[#1B365D] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  {selectedDoc.documentId}
                </span>
                <span className="text-slate-400">•</span>
                <h3 className="text-xs font-bold truncate text-slate-900 max-w-md">
                  {selectedDoc.documentName}
                </h3>
              </div>

              {/* Viewer Tools: Page Navigation, Zoom, Fit Width */}
              <div className="flex items-center gap-2 text-xs">
                {/* Page Navigation */}
                <div className="flex items-center bg-white rounded border border-slate-200 shadow-2xs px-1 py-0.5">
                  <button
                    disabled={viewerPage <= 1}
                    onClick={() => setViewerPage(p => Math.max(1, p - 1))}
                    className="p-1 text-slate-600 hover:text-slate-900 disabled:text-slate-300 transition-colors"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono px-2 text-[11px] text-slate-700">
                    Page {viewerPage} of {selectedDoc.filePages}
                  </span>
                  <button
                    disabled={viewerPage >= selectedDoc.filePages}
                    onClick={() => setViewerPage(p => Math.min(selectedDoc.filePages, p + 1))}
                    className="p-1 text-slate-600 hover:text-slate-900 disabled:text-slate-300 transition-colors"
                    title="Next Page"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center bg-white rounded border border-slate-200 shadow-2xs px-1 py-0.5">
                  <button
                    onClick={() => setViewerZoom(z => Math.max(50, z - 15))}
                    className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono px-2 text-[11px] text-slate-700">
                    {viewerZoom}%
                  </span>
                  <button
                    onClick={() => setViewerZoom(z => Math.min(175, z + 15))}
                    className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Close Viewer */}
                <button
                  onClick={() => setIsViewerModalOpen(false)}
                  className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded border border-slate-200 shadow-2xs transition-colors ml-2"
                  title="Close Viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer Middle: Document Sheet Preview */}
            <div className="grow bg-slate-100/80 overflow-y-auto p-4 sm:p-8 flex justify-center">
              <div 
                style={{ width: `${Math.min(100, Math.max(65, viewerZoom))}%` }}
                className="bg-white text-slate-900 rounded shadow-md p-8 sm:p-12 font-serif text-xs leading-relaxed space-y-6 max-w-3xl border border-slate-200 transition-all"
              >
                {/* Simulated National Emblem / Official Seal Header */}
                <div className="text-center border-b-2 border-slate-900 pb-4 font-sans space-y-1">
                  <div className="font-bold text-slate-950 uppercase text-sm tracking-wider">
                    {selectedDoc.contentPreview.hindiHeader}
                  </div>
                  <div className="font-bold text-slate-800 uppercase text-xs tracking-wide">
                    {selectedDoc.contentPreview.englishHeader}
                  </div>
                  <div className="text-[11px] text-[#1B365D] font-bold mt-1">
                    {selectedDoc.contentPreview.subHeading}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 mt-1">
                    Gazette Docket / Award No: <strong>{selectedDoc.contentPreview.awardNumber}</strong>
                  </div>
                </div>

                {/* Statutory Date & Authority Details */}
                <div className="flex items-center justify-between text-xs font-sans border-b border-slate-200 pb-2 text-slate-700">
                  <span>Project ID: <strong className="font-mono">{selectedDoc.projectId}</strong></span>
                  <span>Date of Promulgation: <strong className="font-mono">{selectedDoc.documentDate}</strong></span>
                </div>

                {/* Legal Body Notice */}
                <div className="space-y-3 text-justify leading-relaxed text-slate-800">
                  <p className="indent-8">
                    {selectedDoc.contentPreview.legalNotice}
                  </p>
                  <p className="indent-8 text-[11px] text-slate-700">
                    The Competent Authority certifies that all statutory publications, objections under Section 15, and Joint Measurement Surveys have been conducted in strict compliance with the statutory provisions of the RFCTLARR Act 2013 and applicable state land rules.
                  </p>
                </div>

                {/* Statutory Schedule Table */}
                <div className="pt-2">
                  <span className="text-[11px] font-sans font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                    Schedule of Land & Compensation Particulars:
                  </span>
                  <div className="border border-slate-300 rounded overflow-hidden font-sans text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-300 text-[11px]">
                        <tr>
                          <th className="p-2 border-r border-slate-300">Statutory Metric</th>
                          <th className="p-2">Determined Particulars</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {selectedDoc.contentPreview.summaryStats.map((st, idx) => (
                          <tr key={idx}>
                            <td className="p-2 font-medium border-r border-slate-200 bg-slate-50/50 w-1/2">
                              {st.label}
                            </td>
                            <td className="p-2 font-mono font-bold text-slate-900">
                              {st.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Digital Signature Cryptographic Stamp on Document */}
                <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans bg-slate-50 p-3 rounded">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <span className="font-bold block">Digitally Signed & Certified</span>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        Signer: {selectedDoc.signatureDetails.signerName} ({selectedDoc.signatureDetails.signerDesignation})
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-[10px] font-mono text-slate-500">
                    <div>Token: {selectedDoc.signatureDetails.signatureReference}</div>
                    <div>Integrity: {selectedDoc.signatureDetails.integrityHash.slice(0, 24)}...</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Viewer Bottom Bar */}
            <div className="bg-slate-50 p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono text-[11px]">
                Official Statutory Docket • Certified under Section 3(u) & Section 23
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => showToast(`Downloaded certified PDF: ${selectedDoc.documentId}`)}
                  className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-semibold rounded text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Download PDF Copy</span>
                </button>
                <button
                  onClick={() => setIsViewerModalOpen(false)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded text-xs border border-slate-300 shadow-2xs transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. ARCHIVE ZIP MODAL (Source Requirement: Archive Zip) */}
      {isArchiveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-xs text-slate-800 space-y-4 p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4 text-[#1B365D]" />
                <h3 className="text-sm font-bold text-slate-950">
                  Statutory Archive ZIP Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsArchiveModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Consolidate all certified Form VI/VII awards, published e-Gazettes, and e-Signed requisition dockets for <strong>{activeProject.name}</strong> into an authoritative, encrypted archive package.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Archive Package Name:</span>
                <span className="font-mono font-bold text-slate-900">NLAMS-{activeProject.id}-Statutory-Archive.zip</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Included Documents:</span>
                <span className="font-bold text-slate-800">{documents.length} Authoritative Records</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Uncompressed Size:</span>
                <span className="font-mono text-slate-800">44.8 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Digital Checksum:</span>
                <span className="font-mono text-[10px] text-slate-600">SHA-256: e82f...a109</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Archive Status:</span>
                <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Archive Available
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed">
                Notice: All archived dockets preserve embedded X.509 Digital Signature Certificates (DSC) and timestamped cryptographic hashes for legal admissibility in LARR Tribunals and High Courts.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsArchiveModalOpen(false)}
                className="px-3.5 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDownloadArchiveZip(activeProject.id);
                  setIsArchiveModalOpen(false);
                }}
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>Download Archive ZIP</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
