import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  KeyRound, 
  Fingerprint, 
  AlertCircle 
} from 'lucide-react';

export default function Step9DocumentsEsign({ formData, updateFormData, errors }) {
  const [signingModal, setSigningModal] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const docs = formData.documents || {};

  const handleSimulateSign = () => {
    setIsSigned(true);
    setSigningModal(false);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-blue-700" />
          Step 9: Enclosures & Digital Signing Authentication
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Upload statutory orders, revenue survey maps, and legal undertakings, and configure your Digital Signature Certificate (DSC Class 3) or Aadhaar e-Sign token.
        </p>
      </div>

      {/* Mandatory Document Vault Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Mandatory Statutory Enclosures
          </span>
          <span className="text-[11px] text-slate-500">PDF, GeoJSON, ZIP (Max 50 MB)</span>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: 'adminSanction',
              title: 'Administrative Sanction / In-Principle Approval Order',
              sec: 'Mandatory',
              doc: docs.adminSanction
            },
            {
              id: 'surveyMap',
              title: 'Combined Cadastral Revenue Map / Digitized Village Sheets',
              sec: 'Mandatory (Cadastral Geo-Reference)',
              doc: docs.surveyMap
            },
            {
              id: 'legalUndertaking',
              title: 'Statutory Legal Undertaking (Sec. 10 & Sec. 40 Compliance)',
              sec: 'Mandatory Legal Document',
              doc: docs.legalUndertaking
            },
            {
              id: 'budgetSanction',
              title: 'Budget Allocation & Escrow Fund Availability Letter',
              sec: 'Financial Proof',
              doc: docs.budgetSanction
            }
          ].map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 gap-2 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-[260px]">
                <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{item.title}</span>
                  <span className="text-[10px] text-slate-500">{item.sec}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.doc ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {item.doc.name} ({item.doc.size})
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {item.doc.ocrStatus || 'Verified'}
                    </span>
                  </div>
                ) : (
                  <label className="text-xs px-3 py-1.5 rounded-md border border-dashed border-blue-400 bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Upload File
                    <input
                      type="file"
                      accept=".pdf,.geojson,.zip"
                      onChange={() => {
                        updateFormData({
                          documents: {
                            ...docs,
                            [item.id]: {
                              name: `${item.id}_Signed_Order.pdf`,
                              size: '2.4 MB',
                              status: 'Uploaded',
                              ocrStatus: 'OCR Matched ✓'
                            }
                          }
                        });
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
        {errors?.adminSanctionDoc && <p className="text-xs text-red-600">{errors.adminSanctionDoc}</p>}
      </div>

      {/* Digital Signature Configuration */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            Digital Signature Verification (IT Act 2000 Compliant)
          </span>
          <span className="text-[11px] text-slate-500">Legal Non-Repudiation Certificate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label
            className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
              formData.digitalSignatureMethod === 'DSC'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="digitalSignatureMethod"
              value="DSC"
              checked={formData.digitalSignatureMethod === 'DSC'}
              onChange={() => updateFormData({ digitalSignatureMethod: 'DSC' })}
              className="mt-0.5 text-blue-600"
            />
            <div>
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-700" /> USB Token DSC (Class 3 Signing)
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Hardware token certificate (ePass2003 / ProxKey) issued by CCA-approved certifying authority (eMudhra, Capricorn, NIC).
              </span>
            </div>
          </label>

          <label
            className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
              formData.digitalSignatureMethod === 'AADHAAR'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="digitalSignatureMethod"
              value="AADHAAR"
              checked={formData.digitalSignatureMethod === 'AADHAAR'}
              onChange={() => updateFormData({ digitalSignatureMethod: 'AADHAAR' })}
              className="mt-0.5 text-blue-600"
            />
            <div>
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-purple-700" /> Aadhaar OTP e-Sign (C-DAC ESP)
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Online paperless electronic signature powered by UIDAI Aadhaar e-KYC and C-DAC e-Sign 3.0 gateway.
              </span>
            </div>
          </label>
        </div>

        {/* Certificate Pre-Flight Check */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <span className="font-bold text-slate-900">
                {formData.digitalSignatureMethod === 'DSC' ? 'USB DSC Token Detected:' : 'Aadhaar Gateway Ready:'}
              </span>{' '}
              <span className="text-slate-600 font-mono">
                {formData.digitalSignatureMethod === 'DSC'
                  ? 'eMudhra Class 3 (Sign) • CN=RAJESH K SHARMA • Valid till 14-Oct-2027'
                  : 'UIDAI Linked Mobile: ******3210'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSigningModal(true)}
            className="text-xs px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-xs"
          >
            {isSigned ? 'Certificate Authenticated ✓' : 'Test Token Handshake'}
          </button>
        </div>
      </div>

      {/* Signing Test Modal */}
      {signingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full space-y-4 shadow-xl text-xs">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              DSC Class 3 Token PIN Prompt
            </div>
            <p className="text-slate-600">
              Enter User PIN for Token <strong>eMudhra PKI Client</strong>:
            </p>
            <input
              type="password"
              placeholder="••••••••"
              defaultValue="12345678"
              className="w-full text-center text-sm font-mono tracking-widest border border-slate-300 rounded p-2"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSigningModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulateSign}
                className="px-3 py-1.5 rounded bg-blue-700 text-white font-bold"
              >
                Authorize Token
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
