import React from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { X, FileText, Download, Printer, ShieldCheck, ExternalLink } from 'lucide-react';

export default function RRDocumentViewerModal() {
  const { documentModal, setDocumentModal } = useRRAuthority();

  if (!documentModal.isOpen || !documentModal.doc) return null;

  const doc = documentModal.doc;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-3xl flex flex-col overflow-hidden text-slate-800 text-xs">
        
        {/* Header */}
        <div className="bg-[#1B365D] text-white p-3.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5A059]" />
            <div>
              <div className="font-bold text-sm text-white font-sans truncate">
                {doc.name || doc.title || 'Official Statutory Document'}
              </div>
              <div className="text-[10px] font-mono text-[#E6CA85]">
                {doc.code || doc.documentId || 'NLAMS-DOC-SEC16-SEC18'} • Cryptographic Seal: Valid
              </div>
            </div>
          </div>

          <button
            onClick={() => setDocumentModal({ isOpen: false, doc: null })}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Body Preview */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 font-serif">
            
            {/* National Header in Document */}
            <div className="text-center border-b border-slate-200 pb-4 space-y-1">
              <div className="font-bold uppercase tracking-wider text-xs text-slate-800 font-sans">
                GOVERNMENT OF INDIA / STATE GOVERNMENT
              </div>
              <div className="font-bold text-sm text-[#1B365D] font-sans">
                OFFICE OF THE ADMINISTRATOR &amp; COMMISSIONER FOR REHABILITATION &amp; RESETTLEMENT
              </div>
              <div className="text-[11px] text-slate-600 font-sans">
                RFCTLARR Act, 2013 (Act No. 30 of 2013)
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-slate-500 font-sans">
              Document Ref: {doc.code || 'DOC-RR-2026-0941'} | Date: 20/09/2026
            </div>

            <div className="space-y-3 text-[12px] leading-relaxed text-slate-800">
              <h4 className="font-bold font-sans text-center text-slate-900 uppercase">
                {doc.name || 'Statutory R&R Compliance Record'}
              </h4>

              <p>
                In pursuance of the provisions of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, this official instrument certifies the completion and validation of the rehabilitation measures for the project <strong>Western Regional Dedicated Freight Corridor (Petlad-Sunav-Nar Segment)</strong>.
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] font-sans space-y-1">
                <div><strong>Statutory Mandate:</strong> Sections 16, 18, 31, 41, 43 &amp; 44 of RFCTLARR Act 2013</div>
                <div><strong>Beneficiary Family Count:</strong> 500 Affected Families (Form IV Certified)</div>
                <div><strong>Approved Resettlement Colony:</strong> Petlad Gaothan New Sector-7 Enclave</div>
                <div><strong>PFMS DBT Direct Bank Credit:</strong> Enabled via NPCI Aadhaar Payment Bridge</div>
              </div>

              <p>
                The Second Schedule entitlements and Third Schedule infrastructural amenities have been duly incorporated into the digital master scheme. Any claims, objections or requests for modification have been recorded in the statutory register.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end font-sans">
              <div className="text-[10px] font-mono text-slate-500 space-y-0.5">
                <div className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Digitally Signed via DSC</span>
                </div>
                <div>Hash: SHA256:d8a21e49b801a7c29e...991a</div>
                <div>Timestamp: 20/09/2026 16:30:12 IST</div>
              </div>

              <div className="text-right text-[11px]">
                <div className="font-bold text-slate-900">Competent R&amp;R Authority</div>
                <div className="text-slate-600">Appropriate Government / Revenue Department</div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-[10px] font-mono text-slate-500">
            Certified Copy from NLAMS Document Vault
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                alert(`Downloaded copy of ${doc.name || 'document'}`);
              }}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
