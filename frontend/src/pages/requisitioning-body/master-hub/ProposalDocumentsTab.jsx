import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Download, 
  Search, 
  ShieldCheck, 
  KeyRound, 
  History, 
  QrCode, 
  FileCheck2, 
  ExternalLink,
  ArrowRight,
  Filter,
  Eye
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalDocumentsTab() {
  const { showToast } = useWorkspace();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDocId, setSelectedDocId] = useState('DOC-2026-F1-0089');

  const categories = [
    { id: 'All', label: 'All (42)' },
    { id: 'Form-I', label: 'Form-I (4)' },
    { id: 'Admin', label: 'Admin Approvals (8)' },
    { id: 'GIS', label: 'GIS / Cadastre (12)' },
    { id: 'Gazette', label: 'Gazette Notifications (6)' },
    { id: 'Financial', label: 'Financial Records (8)' },
    { id: 'R&R', label: 'R&R Records (4)' },
  ];

  const documents = [
    {
      id: 'DOC-2026-F1-0089',
      category: 'FORM-I',
      title: 'Form-I Requisition Form - Sign-Off',
      version: 'v3.1',
      uploader: 'Rajesh V. Patel, Project Dir, NHAI',
      status: 'VERIFIED & SEALED',
      statusColor: 'emerald',
      date: '14 Sep 2026'
    },
    {
      id: 'DOC-2026-AS-0104',
      category: 'APPROVAL',
      title: 'Administrative Sanction Order (MoRTH)',
      version: 'v1.0',
      uploader: 'Under Secretary (Land) MoRTH',
      status: 'STATUTORY VERIFIED',
      statusColor: 'emerald',
      date: '18 Jun 2026'
    },
    {
      id: 'DOC-2026-CAD-0412',
      category: 'GIS / MAP',
      title: 'Village Cadastral Revenue Map (Mehsana Sector)',
      version: 'v2.1',
      uploader: 'K. R. Solanki, DLR Dist. Revenue Dept',
      status: 'REVISION REQUIRED',
      statusColor: 'rose',
      date: '12 Sep 2026'
    },
    {
      id: 'DOC-2026-SIA-0220',
      category: 'SIA',
      title: 'SIA Final Report & SIMP Recommendation',
      version: 'v2.2',
      uploader: 'State SIA Unit SPIPA',
      status: 'VERIFIED & APPROVED',
      statusColor: 'emerald',
      date: '28 Jul 2026'
    },
    {
      id: 'DOC-2026-GZ-0033',
      category: 'NOTIFICATION',
      title: 'Sec. 11 Preliminary Gazette Notification',
      version: 'v1.2',
      uploader: 'State Gazette Press',
      status: 'GAZETTED & PUBLISHED',
      statusColor: 'blue',
      date: '15 Aug 2026'
    },
    {
      id: 'DOC-2026-FIN-0914',
      category: 'FINANCIAL',
      title: 'Preliminary Cost Estimation & Escrow Deposit Ack',
      version: 'v1.0',
      uploader: 'Accounts Officer NHAI HQ',
      status: 'RECONCILED & RECORDED',
      statusColor: 'emerald',
      date: '13 Sep 2026'
    },
    {
      id: 'DOC-2026-RR-0044',
      category: 'R&R RECORD',
      title: 'Draft Rehabilitation & Resettlement Scheme (Form-IV)',
      version: 'v1.1',
      uploader: 'Admin (R&R Directorate)',
      status: 'PUBLIC NOTICE ISSUED',
      statusColor: 'blue',
      date: '08 Sep 2026'
    }
  ];

  return (
    <div className="flex flex-col xl:flex-row">
      
      {/* Main Content Area */}
      <div className="flex-1 p-5 space-y-5">
        
        {/* Top 5 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL DOCUMENTS</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">42</div>
            <div className="text-[10px] text-slate-500">All Categories</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">VERIFIED &amp; ACCEPTED</div>
            <div className="text-xl font-bold text-emerald-700 font-sans mt-0.5">38</div>
            <div className="text-[10px] text-emerald-600 font-medium">90.5% Ratio</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PENDING VERIFICATION</div>
            <div className="text-xl font-bold text-amber-700 font-sans mt-0.5">3</div>
            <div className="text-[10px] text-slate-500">Survey &amp; Collectorate</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">REVISION REQUIRED</div>
            <div className="text-xl font-bold text-rose-600 font-sans mt-0.5">1</div>
            <div className="text-[10px] text-rose-600 font-medium">Action Urgent</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">E-SIGNED / SEALED</div>
            <div className="text-xl font-bold text-blue-700 font-sans mt-0.5">31</div>
            <div className="text-[10px] text-slate-500">DSC Class-3</div>
          </div>

        </div>

        {/* Action Header & Categories Filter Strip */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                STATUTORY DOCUMENT VAULT &amp; REPOSITORY
              </h3>
              <p className="text-[11px] text-slate-500">
                Official encrypted documents with cryptographic SHA-256 integrity and DSC legal binding under IT Act 2000.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={() => showToast('Opening new document upload modal...')}
                className="bg-[#e5a93b] hover:bg-[#d6992f] text-slate-950 font-bold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Upload Document</span>
              </button>

              <button 
                onClick={() => showToast('Opening revision increment dialog')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload New Revision</span>
              </button>

              <button 
                onClick={() => showToast('Exporting Document Master Index (CSV/PDF)...')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Index</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 border-t border-slate-100 pt-2 overflow-x-auto text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === c.id 
                    ? 'bg-[#0b1b36] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

        </div>

        {/* Documents Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b1b36] text-white text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-mono w-44">DOC ID &amp; CATEGORY</th>
                  <th className="py-2.5 px-4">DOCUMENT TITLE &amp; PURPOSE</th>
                  <th className="py-2.5 px-4">VERSION</th>
                  <th className="py-2.5 px-4">UPLOADED BY &amp; ENTITY</th>
                  <th className="py-2.5 px-4">STATUTORY STATUS</th>
                  <th className="py-2.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((d) => (
                  <tr 
                    key={d.id}
                    onClick={() => setSelectedDocId(d.id)}
                    className={`hover:bg-amber-50/40 cursor-pointer transition-colors ${
                      selectedDocId === d.id ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4">
                      <div className="font-mono font-bold text-slate-900">{d.id}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{d.category}</div>
                    </td>

                    <td className="py-2.5 px-4">
                      <div className="font-bold text-slate-900">{d.title}</div>
                      <div className="text-[10px] text-slate-500">{d.date}</div>
                    </td>

                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-700">
                      {d.version}
                    </td>

                    <td className="py-2.5 px-4 text-slate-600 text-[11px]">
                      {d.uploader}
                    </td>

                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        d.statusColor === 'emerald'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : d.statusColor === 'blue'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200 font-bold'
                      }`}>
                        {d.status}
                      </span>
                    </td>

                    <td className="py-2.5 px-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Viewing document ${d.id}`);
                        }}
                        className="text-blue-700 hover:text-blue-800 font-semibold text-[11px] inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Selected Record Inspection & Statutory Chain */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-mono">
                  Form-I_Requisition_Final_Signed.pdf
                </h4>
                <div className="text-[10px] text-slate-500">
                  SHA-256: 8a91f4c718b9e0234acfe1882001bbcf9912048aaef88102
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded ml-2">
                E-SEALED
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button 
                onClick={() => showToast('Downloading digitally signed and verified PDF...')}
                className="bg-[#0b1b36] hover:bg-[#182d52] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Verifiable PDF</span>
              </button>

              <button 
                onClick={() => showToast('Opening replacement document wizard')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded text-xs font-medium"
              >
                Upload Replacement
              </button>

              <button 
                onClick={() => showToast('Validating SHA-256 hash against blockchain timestamp authority...')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded text-xs font-medium"
              >
                Verify Hash
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            {/* DSC Metadata */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-blue-600" />
                <span>DSC DIGITAL SIGNATURE METADATA</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-snug">
                Digitally signed by <span className="font-bold text-slate-900">Rajesh V. Patel</span>, Project Director, NHAI on <span className="font-mono">14 Sep 2026 14:10:22 IST</span>.
              </p>
              <div className="text-[10px] text-slate-500">
                Certifying Authority: CCA-India e-Mudhra Class 3 • Token ID: eToken-PRO-8812903
              </div>
            </div>

            {/* Version Lifecycle Trail */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                <History className="w-3 h-3 text-amber-600" />
                <span>VERSION LIFECYCLE TRAIL</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <span className="line-through text-slate-400">v1.0 (04 Jun)</span>
                <span>→</span>
                <span className="line-through text-slate-400">v2.0 (18 Jun)</span>
                <span>→</span>
                <span className="font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                  v3.1 (Current, Approved 14 Sep 2026)
                </span>
              </div>
              <div className="text-[10px] text-slate-500">
                Approved by Competent Authority CALA Mehsana Bench.
              </div>
            </div>
          </div>

          {/* Standards Compliance Strip */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>GIGW 3.0 COMPLIANCE</span>
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
              <QrCode className="w-3 h-3 text-blue-600" />
              <span>VERIFIABLE QR CODE</span>
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>TIME-STAMP AUTHORITY (TSA C-DAC)</span>
            </span>
          </div>

        </div>

      </div>

      {/* Right Sidebar for Documents */}
      <div className="w-full xl:w-[320px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-4 space-y-4 shrink-0 shadow-xs text-slate-800">
        
        {/* Statutory Actions Required */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Statutory Actions Required</span>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 rounded">2 Tasks</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-rose-50/70 border border-rose-200">
              <div className="font-bold text-rose-900 text-[11px]">REVENUE MAP DISCREPANCY</div>
              <p className="text-[10px] text-rose-800 mt-0.5 leading-snug">
                Mehsana Collectorate Land Records unit requested realignment on Khasra #142 to #158.
              </p>
              <button 
                onClick={() => showToast('Opening Map Revision v2.2 uploader')}
                className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold px-2 py-1 rounded mt-1.5 transition-colors"
              >
                Upload Map v2.2
              </button>
            </div>

            <div className="p-2 rounded bg-amber-50/70 border border-amber-200">
              <div className="font-bold text-amber-900 text-[11px]">PENDING COUNTER-SIGNATURES</div>
              <p className="text-[10px] text-amber-800 mt-0.5 leading-snug">
                2 documents awaiting Nodal Officer DSC endorsement.
              </p>
              <button 
                onClick={() => showToast('Transmitted reminder notification to Nodal Officer')}
                className="text-[10px] text-amber-900 font-bold underline mt-1"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Statutory Milestones */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Statutory Milestones
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Stage 5 of 8</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Form-I Digitally Signed</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">Complied</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Administrative Sanction</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">Complied</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">SIA Final Clearance</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">Complied</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">Sec 11 Gazette Issued</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">Complied</span>
            </div>
          </div>
        </div>

        {/* Immutable Audit Stream */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Immutable Audit Stream
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div>
              <div className="font-bold text-slate-800">e-Sign Generated</div>
              <div className="text-[10px] text-slate-500">DOC-2026-F1-0089 sealed with Class 3 DSC</div>
            </div>
            <div>
              <div className="font-bold text-slate-800">Discrepancy Logged</div>
              <div className="text-[10px] text-slate-500">DOC-2026-CAD-0412 flagged by Land Records</div>
            </div>
            <div>
              <div className="font-bold text-slate-800">New Version Upload</div>
              <div className="text-[10px] text-slate-500">DOC-2026-SIA-0220 revised to v2.2</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
