import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  FileText, 
  Radio, 
  Layers, 
  QrCode,
  Clock,
  History,
  AlertCircle,
  RefreshCw,
  Share2
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import AuditTimeline from '../components/common/AuditTimeline.jsx';

export default function GazetteBroadcastVaultPage() {
  const {
    gazetteDocs,
    jurisdiction,
    setGazetteModalDoc,
    auditLogs
  } = useAppropriateGovernment();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedDocId, setSelectedDocId] = useState(gazetteDocs[0]?.id || 'GAZ-001');
  const [broadcastingId, setBroadcastingId] = useState(null);
  const [broadcastSuccess, setBroadcastSuccess] = useState({});

  const isCentral = jurisdiction === 'CENTRAL';

  const selectedDoc = gazetteDocs.find(d => d.id === selectedDocId) || gazetteDocs[0];

  const filteredDocs = gazetteDocs.filter(d => {
    const matchesSearch =
      d.notificationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.projectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'ALL' || d.section.includes(selectedSection) || (d.category && d.category.includes(selectedSection));
    return matchesSearch && matchesSection;
  });

  const handleBroadcast = (docId) => {
    setBroadcastingId(docId);
    setTimeout(() => {
      setBroadcastingId(null);
      setBroadcastSuccess(prev => ({ ...prev, [docId]: true }));
    }, 1000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral ? 'Central e-Gazette & Multi-Channel Broadcast Vault' : 'State e-Gazette & Multi-Channel Broadcast Vault'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 8
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isCentral
              ? 'Central repository of published Extraordinary Gazettes of India; cryptographic SHA-256 seal, version control & inter-agency broadcasting'
              : 'State e-Gazette repository of published Part I-A statutory notifications; version history, corrigendum & district dispatch'}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search Gazette No, Project..."
              className="pl-8 pr-3 py-1.5 rounded border border-slate-300 bg-white text-xs outline-none focus:border-[#1B365D]"
            />
          </div>

          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">All Statutory Categories</option>
            <option value="Section 11">Section 11(1) Preliminary Gazette</option>
            <option value="Section 19">Section 19(1) Final Declaration</option>
            <option value="Section 4">Section 4(1) SIA Start Notification</option>
            <option value="R&amp;R">R&amp;R Approved Scheme Gazette</option>
            <option value="Extension">Statutory Extension &amp; Corrigendum</option>
          </select>
        </div>
      </div>

      {/* 2. Broadcast Dispatcher Gateway Banner */}
      <div className="p-3.5 bg-gradient-to-r from-blue-900 via-[#1B365D] to-slate-900 text-white rounded shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10 shrink-0">
            <Radio className="w-5 h-5 text-[#E6CA85] animate-pulse" />
          </div>
          <div>
            <div className="font-bold tracking-wide text-sm flex items-center gap-2">
              <span>Statutory Multi-Channel Broadcast Gateway (8 Automated Recipient Channels)</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                ACTIVE
              </span>
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Published gazettes automatically dispatch cryptographic webhooks to District Collectors, Requiring Bodies, R&amp;R Authorities, SIA Units, LARR Tribunals, Policy Makers &amp; Citizen Portals.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] bg-white/10 px-2.5 py-1 rounded border border-white/20">
            Gateway Sync: <span className="text-emerald-400 font-bold">100% Operational (Mock Sync)</span>
          </span>
        </div>
      </div>

      {/* 3. Gazette Documents Master Table */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1B365D] uppercase tracking-wide">
              {isCentral ? 'Official Gazette of India Records' : 'State Official e-Gazette Records'}
            </h3>
            <p className="text-[11px] text-slate-500">
              Extraordinary notifications published by authority under RFCTLARR Act 2013
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">
            Showing {filteredDocs.length} of {gazetteDocs.length} Documents
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 min-w-[900px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Gazette Notification No</th>
                <th className="py-2.5 px-3">Statutory Title &amp; Project</th>
                <th className="py-2.5 px-3">Section &amp; Type</th>
                <th className="py-2.5 px-3 text-center">Publication Date</th>
                <th className="py-2.5 px-3">Version &amp; Cryptographic Hash</th>
                <th className="py-2.5 px-3 text-center">DSC e-Sign</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredDocs.map(doc => {
                const isBroadcasted = broadcastSuccess[doc.id] || doc.broadcastDispatched;
                const isBroadcasting = broadcastingId === doc.id;
                const isSelected = doc.id === selectedDocId;

                return (
                  <tr
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-mono font-bold text-slate-900">{doc.notificationNo}</div>
                      <div className="text-[10px] font-mono text-slate-500">{doc.id}</div>
                    </td>
                    <td className="py-2.5 px-3 max-w-sm">
                      <div className="font-bold text-[#1B365D] truncate">{doc.title}</div>
                      <div className="text-[10px] font-mono text-slate-500">Project: {doc.projectCode}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {doc.section}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                      {doc.publicationDate}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 font-mono font-bold text-[10px] border border-blue-200">
                          {doc.version}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[120px]" title={doc.sha256Hash}>
                          {doc.sha256Hash.slice(0, 16)}...
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        DSC VERIFIED
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setGazetteModalDoc(doc);
                          }}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-amber-700" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleBroadcast(doc.id);
                          }}
                          disabled={isBroadcasting}
                          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                            isBroadcasted
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : 'bg-[#1B365D] hover:bg-[#142642] text-white'
                          }`}
                        >
                          <Send className="w-3 h-3" />
                          <span>
                            {isBroadcasting
                              ? 'Broadcasting...'
                              : isBroadcasted
                              ? 'Broadcasted'
                              : 'Broadcast'}
                          </span>
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

      {/* 4. Selected Document Detail: Version History & 8-Channel Broadcast Matrix */}
      {selectedDoc && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Left: Document Metadata & Version History */}
          <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
                <History className="w-4 h-4 text-[#C5A059]" />
                Version History &amp; Integrity Chain
              </div>
              <span className="font-mono text-[10px] text-slate-500 font-semibold">
                Doc Ref: {selectedDoc.id}
              </span>
            </div>

            <div className="space-y-2 text-slate-700">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">{selectedDoc.title}</div>
                <div className="text-[11px] font-mono text-blue-800">
                  Notification: {selectedDoc.notificationNo} • Section: {selectedDoc.section}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  SHA-256 Checksum: {selectedDoc.sha256Hash}
                </div>
              </div>

              {/* Version History Steps */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Statutory Life Cycle Timeline:
                </div>

                <div className="border-l-2 border-slate-300 ml-2 pl-3 space-y-2.5 text-[11px]">
                  <div className="relative">
                    <span className="w-2 h-2 rounded-full bg-slate-400 absolute -left-[17px] top-1" />
                    <div className="font-bold text-slate-700">Version 1.0 — Initial Gazette Draft</div>
                    <div className="text-[10px] text-slate-400">Created by SDO / Collectorate desk</div>
                  </div>
                  <div className="relative">
                    <span className="w-2 h-2 rounded-full bg-blue-500 absolute -left-[17px] top-1" />
                    <div className="font-bold text-blue-900">Version 1.1 — Legal Scrutiny &amp; Verification</div>
                    <div className="text-[10px] text-slate-500">Approved by Appropriate Government Law Officer</div>
                  </div>
                  <div className="relative">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 absolute -left-[17px] top-1" />
                    <div className="font-bold text-emerald-900">Version 1.0 Final — Sealed &amp; Published</div>
                    <div className="text-[10px] text-emerald-700">Published in Official Gazette with DSC digital signature</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Broadcast Distribution Status (8 Channels) */}
          <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#C5A059]" />
                Event Distribution Matrix (8 Downstream Systems)
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% DISPATCHED
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {[
                { recipient: 'District Collector (CALA)', channel: 'Direct SRO & Land Registry Hook', status: 'Delivered', time: '14-Aug-2025 18:02' },
                { recipient: 'Requiring Body (NHAI / PWD)', channel: 'Executive Project Portal Dispatch', status: 'Delivered', time: '14-Aug-2025 18:02' },
                { recipient: 'SIA & IEG Workspace', channel: 'Section 4 / 7 Repository Hook', status: 'Delivered', time: '14-Aug-2025 18:03' },
                { recipient: 'R&R Authority Master Desk', channel: 'Administrator & Commissioner Stream', status: 'Delivered', time: '14-Aug-2025 18:03' },
                { recipient: isCentral ? 'Policy Makers & NMC Desk' : 'Policy Makers & SMC Desk', channel: 'Apex Statutory Monitor Feed', status: 'Delivered', time: '14-Aug-2025 18:04' },
                { recipient: 'LARR Authority Judicial Tribunal', channel: 'Notice to High Court / Reference Desk', status: 'Delivered', time: '14-Aug-2025 18:04' },
                { recipient: 'Citizen & Landholder Portal', channel: 'Bhu-Aadhaar ULPIN Public Feed', status: 'Delivered', time: '14-Aug-2025 18:05' },
                { recipient: 'NLAMS Public Landing Vault', channel: 'Open Government Data Archive', status: 'Delivered', time: '14-Aug-2025 18:05' }
              ].map((rc, idx) => (
                <div key={idx} className="py-1.5 flex items-center justify-between text-[11px]">
                  <div>
                    <div className="font-bold text-slate-800">{rc.recipient}</div>
                    <div className="text-[10px] text-slate-400">{rc.channel}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {rc.status}
                    </span>
                    <div className="text-[9px] text-slate-400 font-mono">{rc.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Immutable Audit Trail Component */}
      <AuditTimeline logs={auditLogs} />
    </div>
  );
}
