import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Upload, 
  FileText, 
  Eye, 
  Download, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Calendar,
  Layers,
  History,
  Hash
} from 'lucide-react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';

export default function DocumentsAuditView({ onNavigateTab }) {
  const { showToast } = useWorkspace();
  const [docSearch, setDocSearch] = useState('');

  const documents = [
    {
      id: 'doc-1',
      name: 'Gazette of India Ext. No. 448',
      ref: 'Ref: SO-2026-MoRTH-3A-448',
      stage: 'Stage 04: Preliminary Notification',
      type: 'Notification Gazette',
      date: '15 Aug 2026',
      issuing: 'State Gazette Press / MoRTH',
      status: 'STATUTORILY VERIFIED',
      statusType: 'verified',
      dsc: 'Valid (MoRTH DSC)',
      icon: FileText,
    },
    {
      id: 'doc-2',
      name: 'Form-I Statutory Master Requisition Dossier',
      ref: 'Ref: FORM-I-NHAI-AMD-2026-88',
      stage: 'Stage 01: Proposal Submission',
      type: 'Requisition Filing',
      date: '12 Jun 2026',
      issuing: 'RB Manager (NHAI)',
      status: 'VERIFIED & ACCEPTED',
      statusType: 'verified',
      dsc: 'Valid (NHAI Class 3 DSC)',
      icon: FileText,
    },
    {
      id: 'doc-3',
      name: 'Tehsil Sanand Public Hearing Notice & Schedule',
      ref: 'Ref: MEMO-OBJ-229-CALA',
      stage: 'Stage 05: Objections (Sec 15)',
      type: 'Hearing Notice',
      date: '08 Sep 2026',
      issuing: 'SLAO / CALA Ahmedabad',
      status: 'ACTIVE STATUTORY NOTICE',
      statusType: 'warning',
      dsc: 'Valid (CALA DSC)',
      icon: FileText,
    },
    {
      id: 'doc-4',
      name: 'Newspaper Publication Proofs (Divya Bhaskar & Gujarat Samachar)',
      ref: 'Ref: CERT-MEDIA-PUB-09',
      stage: 'Stage 04: Preliminary Notification',
      type: 'Compliance Record',
      date: '18 Aug 2026',
      issuing: 'RB Manager (NHAI)',
      status: 'VERIFIED',
      statusType: 'verified',
      dsc: 'Valid (RB DSC)',
      icon: FileText,
    },
    {
      id: 'doc-5',
      name: 'Rebuttal Memo #RB-REB-04 for Khasra 142/B Union Claim',
      ref: 'Ref: RB-LEGAL-REB-04',
      stage: 'Stage 05: Objections (Sec 15)',
      type: 'Legal Rebuttal / Submission',
      date: '12 Sep 2026',
      issuing: 'NHAI Legal Advocate',
      status: 'UNDER REVIEW BY SLAO',
      statusType: 'warning',
      dsc: 'Digitally Signed',
      icon: FileText,
    },
    {
      id: 'doc-6',
      name: 'SIA Exemption Determination Order under Section 105',
      ref: 'Ref: REV-SIA-EXEMP-401',
      stage: 'Stage 03: SIA Exemption',
      type: 'Statutory Exemption Order',
      date: '28 Jul 2026',
      issuing: 'State Revenue Department',
      status: 'VERIFIED',
      statusType: 'verified',
      dsc: 'Valid (Revenue Dept DSC)',
      icon: FileText,
    },
  ];

  const auditEvents = [
    {
      id: 'ev-1',
      timestamp: '14 Sep 2026, 14:32 IST',
      description: 'SLA warning recalculated; 54 days remaining in Section 15 window',
      stage: 'Stage 05: Objections & Hearings',
      actor: 'NLAMS Statutory SLA Engine',
      outcome: 'SYSTEM ALERT (NORMAL)',
      outcomeType: 'neutral',
      hash: 'SHA256: 7f8a9...',
    },
    {
      id: 'ev-2',
      timestamp: '12 Sep 2026, 10:45 IST',
      description: 'Counter-affidavit rebuttal batch #04 filed for 4 Khasra claims',
      stage: 'Stage 05: Objections & Hearings',
      actor: 'RB Legal Officer (NHAI PIU - Ahmedabad)',
      outcome: 'SUBMISSION LOGGED',
      outcomeType: 'info',
      hash: 'SHA256: 3c2d1...',
    },
    {
      id: 'ev-3',
      timestamp: '08 Sep 2026, 09:30 IST',
      description: '60-day inquiry window officially commenced; CALA hearing memo issued',
      stage: 'Stage 05: Objections & Hearings',
      actor: 'SLAO & District Collectorate Sanand',
      outcome: 'STAGE COMMENCED',
      outcomeType: 'warning',
      hash: 'SHA256: 9b4e6...',
    },
    {
      id: 'ev-4',
      timestamp: '18 Aug 2026, 16:15 IST',
      description: 'Vernacular newspaper publication clipping evidence uploaded',
      stage: 'Stage 04: Preliminary Notification',
      actor: 'RB Manager (NHAI Project Division)',
      outcome: 'COMPLIANCE VERIFIED',
      outcomeType: 'success',
      hash: 'SHA256: 1a8c4...',
    },
    {
      id: 'ev-5',
      timestamp: '15 Aug 2026, 11:00 IST',
      description: 'Section 11 / 3A Extraordinary Gazette published & notified in system',
      stage: 'Stage 04: Preliminary Notification',
      actor: 'Directorate of Printing & Stationery',
      outcome: 'GAZETTE SEALED',
      outcomeType: 'success',
      hash: 'SHA256: 4f7e2...',
    },
    {
      id: 'ev-6',
      timestamp: '28 Jul 2026, 15:40 IST',
      description: 'Section 105 Fourth Schedule statutory exemption approved',
      stage: 'Stage 03: SIA Exemption Gate',
      actor: 'State SIA Appraisal Directorate',
      outcome: 'APPROVED',
      outcomeType: 'success',
      hash: 'SHA256: 6e9b8...',
    },
  ];

  const filteredDocs = documents.filter((doc) => {
    if (!docSearch) return true;
    const q = docSearch.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) ||
      doc.ref.toLowerCase().includes(q) ||
      doc.stage.toLowerCase().includes(q) ||
      doc.issuing.toLowerCase().includes(q)
    );
  });

  return (
    <div id="documents-audit-view-root" className="space-y-4">
      {/* Sub-Header Banner */}
      <div 
        id="documents-audit-top-header"
        className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white text-[10px] font-bold font-mono">
              MODULE 06
            </span>
            <span className="font-bold text-slate-900 text-sm">Statutory Timeline Tracker</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">Sub-Module: Timeline Documents & Audit History</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-500 mt-1">
            <span>Proposal ID: <strong className="font-mono text-slate-700">NLAMS-RB-2026-00124</strong></span>
            <span>•</span>
            <span>Project: <strong className="text-slate-700">NH-48 National Corridor (Sanand Bypass Augmentation)</strong></span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Preservation Seal: NIC-CERT ISO 27001 Compliant
            </span>
          </div>
        </div>

        {/* Right Immutable Ledger Root Hash */}
        <div className="border border-amber-200 rounded-lg p-2.5 bg-amber-50/70 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">IMMUTABLE LEDGER</div>
            <div className="font-mono font-bold text-slate-800 text-[11px] mt-0.5">
              Root Hash: 8fbc4...6e109d
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Evidence Guarantee Banner */}
      <div 
        id="statutory-evidence-guarantee-banner"
        className="bg-white border-l-4 border-l-amber-500 border border-slate-200 rounded-lg p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-slate-700 leading-relaxed">
            <strong>Statutory Evidence Guarantee:</strong> All instruments deposited within this repository are cryptographically stamped under the Information Technology Act, 2000 and Section 11/15 of RFCTLARR Act, 2013.
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600 shrink-0">
          <span>Active Records: <strong className="text-slate-900">6 Instruments</strong></span>
          <span>•</span>
          <span>Audit Blocks: <strong className="text-slate-900">1,482</strong></span>
        </div>
      </div>

      {/* Table 1: Stage Documents & Statutory Filings */}
      <div 
        id="stage-documents-table-card"
        className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden"
      >
        <div className="p-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-slate-900 text-sm">
                Stage Documents & Statutory Filings
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Authenticated primary evidentiary records deposited across statutory stages
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter documents..."
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="pl-8 pr-3 py-1 border border-slate-200 rounded text-xs w-44 sm:w-56 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>
            <button
              onClick={() => showToast('Opened Document Upload & Cryptographic Seal modal')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-slate-600" />
              <span>UPLOAD INSTRUMENT</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f172a] text-white text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3 font-semibold">DOCUMENT NAME & REF #</th>
                <th className="py-2.5 px-3 font-semibold">STATUTORY STAGE</th>
                <th className="py-2.5 px-3 font-semibold">DOCUMENT TYPE</th>
                <th className="py-2.5 px-3 font-semibold">DATE ISSUED / UPLOADED</th>
                <th className="py-2.5 px-3 font-semibold">ISSUING AUTHORITY</th>
                <th className="py-2.5 px-3 font-semibold">VERIFICATION STATUS</th>
                <th className="py-2.5 px-3 font-semibold">DIGITAL SIGNATURE (DSC)</th>
                <th className="py-2.5 px-3 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{doc.ref}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    {doc.stage}
                  </td>

                  <td className="py-2.5 px-3 text-slate-600">
                    {doc.type}
                  </td>

                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {doc.date}
                  </td>

                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    {doc.issuing}
                  </td>

                  <td className="py-2.5 px-3">
                    {doc.statusType === 'verified' && (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{doc.status}</span>
                      </span>
                    )}
                    {doc.statusType === 'warning' && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-700" />
                        <span>{doc.status}</span>
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc.dsc}</span>
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => showToast(`Previewing ${doc.name}`)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>View PDF</span>
                      </button>
                      <button
                        onClick={() => showToast(`Downloading ${doc.name}`)}
                        className="px-2.5 py-1 rounded bg-[#0f172a] hover:bg-slate-800 text-white text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Chronological Audit History & Cryptographic Trail */}
      <div 
        id="chronological-audit-history-table-card"
        className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden"
      >
        <div className="p-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-slate-900 text-sm">
                Chronological Audit History & Cryptographic Trail
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tamper-evident statutory state transitions and legal actor interactions
            </p>
          </div>

          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>LEDGER NODE: SYNCED</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f172a] text-white text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3 font-semibold">TIMESTAMP (IST)</th>
                <th className="py-2.5 px-3 font-semibold">EVENT DESCRIPTION</th>
                <th className="py-2.5 px-3 font-semibold">STATUTORY STAGE</th>
                <th className="py-2.5 px-3 font-semibold">PERFORMED BY (ACTOR & DESIGNATION)</th>
                <th className="py-2.5 px-3 font-semibold">SYSTEM OUTCOME</th>
                <th className="py-2.5 px-3 font-semibold text-right">INTEGRITY HASH (SHA256)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {auditEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {ev.timestamp}
                  </td>

                  <td className="py-2.5 px-3 text-slate-800 font-medium max-w-sm">
                    {ev.description}
                  </td>

                  <td className="py-2.5 px-3 text-blue-700 font-medium">
                    {ev.stage}
                  </td>

                  <td className="py-2.5 px-3 text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ev.actor}</span>
                  </td>

                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ev.outcomeType === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : ev.outcomeType === 'warning'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ev.outcome}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 text-right flex items-center justify-end gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>{ev.hash}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab && onNavigateTab('overview')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Timeline Overview</span>
          </button>
          <button
            onClick={() => showToast('Exporting complete audit trail ledger in CSV/PDF format')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Full Audit Dossier (CSV/PDF)</span>
          </button>
        </div>

        <button
          onClick={() => showToast('Cryptographic Ledger Verification Passed: All 1,482 blocks intact. SHA-256 root hash verified against NIC-CERT registry.')}
          className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 shadow-xs transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verify Cryptographic Ledger Integrity</span>
        </button>
      </div>
    </div>
  );
}
