import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  FileText, 
  Scale, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Hash, 
  ExternalLink 
} from 'lucide-react';

export default function OfficialDocumentViewerModal({ 
  isOpen, 
  onClose, 
  title = 'Judicial Document Record', 
  documentType = 'JUDICIAL_ORDER', 
  caseData, 
  customContent, 
  metadata = {} 
}) {
  if (!isOpen) return null;

  const currentCase = caseData || {
    caseId: 'LARR/2026/GJ/001',
    caseNumber: 'LARR Ref. No. 01 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0042',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla (Retd. Principal District & Sessions Judge)',
    claimantName: 'Rameshwar Laljibhai Patel & 3 Ors',
    collectorName: 'Collector & District Magistrate, Anand',
    requiringBody: 'Ministry of Railways / Western Railway (Vadodara Division)',
    projectName: 'Western Regional Dedicated Freight & Multimodal Logistics Corridor (Petlad-Sunav Segment)',
    ulpin: 'GJ24ANDPET010189',
    surveyNumber: '108/1-P',
    district: 'Anand',
    state: 'Gujarat'
  };

  const docId = metadata.docId || `DOC-LARR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = metadata.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const hash = metadata.hash || `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`.toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Top Action Bar */}
        <div className="bg-[#1B365D] text-white px-4 py-3 flex items-center justify-between border-b-2 border-[#C5A059] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#E6CA85]">
              <Scale className="w-4 h-4 text-[#E6CA85]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#E6CA85] uppercase font-bold tracking-wider">
                National Judicial e-Vault • Official Certified Copy
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-md">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-md border border-slate-600 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={() => alert(`Downloading Certified PDF: ${docId}.pdf`)}
              className="flex items-center gap-1 px-3 py-1 bg-[#C5A059] hover:bg-[#b08d47] text-slate-950 text-xs font-bold rounded-md cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body (Government Letterhead Style) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100/70 font-serif text-slate-900 select-text">
          
          <div className="max-w-3xl mx-auto bg-white border border-slate-300 shadow-sm p-6 sm:p-10 rounded-sm relative overflow-hidden">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <Scale className="w-96 h-96 text-slate-900" />
            </div>

            {/* Official Indian Judiciary Header */}
            <div className="text-center border-b-2 border-slate-800 pb-5 mb-6 space-y-1 relative">
              <div className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                GOVERNMENT OF INDIA • NATIONAL LAND ACQUISITION TRIBUNAL
              </div>
              <h1 className="text-base sm:text-xl font-bold font-serif text-slate-900 uppercase tracking-wide">
                {currentCase.courtName || 'IN THE COURT OF THE LARR AUTHORITY, BENCH GUJARAT'}
              </h1>
              <div className="text-xs text-slate-600 font-sans">
                Constitutional Bench under Sections 51–74 of RFCTLARR Act 2013 (Act No. 30 of 2013)
              </div>
              <div className="text-xs font-mono font-semibold text-slate-700 pt-1">
                Before: {currentCase.presidingOfficer || 'Hon\'ble Presiding Officer'}
              </div>
            </div>

            {/* Reference & Case Identifier Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-slate-200 pb-3 mb-6 gap-2">
              <div>
                <span className="text-slate-500">CASE NUMBER:</span>{' '}
                <strong className="text-slate-900">{currentCase.caseId}</strong> ({currentCase.caseNumber})
              </div>
              <div>
                <span className="text-slate-500">REF NO:</span>{' '}
                <strong className="text-slate-900">{currentCase.referenceNumber}</strong>
              </div>
              <div>
                <span className="text-slate-500">DATE:</span>{' '}
                <strong className="text-slate-900">{dateStr}</strong>
              </div>
            </div>

            {/* Cause Title (Parties) */}
            <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-6 font-sans text-xs space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block">CLAIMANT(S):</span>
                  <span className="font-bold text-slate-900 text-sm">{currentCase.claimantName}</span>
                  <div className="text-slate-600 text-[11px] mt-0.5">{currentCase.claimantAddress || 'Station Road, Petlad, District Anand - 388450'}</div>
                </div>
                <span className="font-bold text-slate-400 font-serif italic text-sm">... CLAIMANT(S)</span>
              </div>

              <div className="text-center font-serif italic text-slate-500 font-bold my-1 text-xs">
                — VERSUS —
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block">RESPONDENT(S):</span>
                  <div className="font-semibold text-slate-900">1. {currentCase.collectorName}</div>
                  <div className="font-semibold text-slate-900">2. {currentCase.requiringBody}</div>
                </div>
                <span className="font-bold text-slate-400 font-serif italic text-sm">... RESPONDENT(S)</span>
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                <div><span className="text-slate-500">ULPIN:</span> <strong>{currentCase.ulpin}</strong></div>
                <div><span className="text-slate-500">SURVEY:</span> <strong>{currentCase.surveyNumber}</strong></div>
                <div><span className="text-slate-500">DISTRICT:</span> <strong>{currentCase.district}</strong></div>
                <div><span className="text-slate-500">PROJECT:</span> <strong>{currentCase.projectCode || 'WRC-PETLAD'}</strong></div>
              </div>
            </div>

            {/* Custom Content Body */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 font-serif min-h-[180px]">
              {customContent || (
                <div>
                  <h4 className="font-bold text-center text-slate-900 uppercase underline mb-3">
                    {title}
                  </h4>
                  <p className="mb-2 text-justify">
                    1. The present matter arises out of a statutory reference transmitted under Section 64 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 by the Collector and District Magistrate, Anand.
                  </p>
                  <p className="mb-2 text-justify">
                    2. Having perused the Form-VIII reference memorandum, Section 65 statement of grounds, certified registered exemplar sale deeds produced on behalf of the Claimants, and the report of the Court Commissioner regarding severance of tube-well irrigation conduits:
                  </p>
                  <p className="mb-2 text-justify">
                    3. The Authority hereby observes that the circle rate applied by the Special Land Acquisition Officer did not reflect the true potential value of the perennial irrigated soil. The exemplar sale deeds of contiguous parcels substantiate market enhancement under Section 26 and Section 69.
                  </p>
                  <div className="p-3 bg-slate-50 border-l-4 border-[#1B365D] font-mono text-xs my-4 space-y-1">
                    <div><strong>STATUTORY DIRECTIVE:</strong> Notice is issued to Western Railway and Collector Anand to deposit the enhanced compensation within 90 days from the date of this order.</div>
                    <div className="text-[11px] text-slate-600">Compliance shall be audited under Section 70 and Order XXI CPC.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Signature & Cryptographic Seal Footer */}
            <div className="mt-10 pt-6 border-t-2 border-slate-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 font-sans text-xs">
              
              {/* QR Code and Audit Info */}
              <div className="flex items-center gap-3">
                <div className="p-2 border border-slate-300 rounded bg-white shrink-0">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
                <div className="space-y-0.5 font-mono text-[10px] text-slate-500">
                  <div><strong>DOC ID:</strong> {docId}</div>
                  <div><strong>CRYPTOGRAPHIC HASH:</strong></div>
                  <div className="text-[9px] text-slate-700 font-bold">{hash}</div>
                  <div className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>e-Signed via National Judicial DSC Token (Class-3)</span>
                  </div>
                </div>
              </div>

              {/* Presiding Officer / Registrar Signature Block */}
              <div className="text-right space-y-1">
                <div className="font-serif italic font-bold text-slate-900 text-sm">
                  {currentCase.presidingOfficer?.split('(')[0] || 'Hon\'ble Presiding Officer'}
                </div>
                <div className="text-[11px] font-semibold text-slate-700">
                  Presiding Officer, LARR Authority
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Digital Sign Timestamp: {dateStr} 16:42:10 IST
                </div>
                <div className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-[9px] font-bold">
                  IMMUTABLE JUDICIAL RECORD
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Certified Judicial Record • Tamper-Evident • Section 68 RFCTLARR Act 2013</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold text-xs cursor-pointer transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
