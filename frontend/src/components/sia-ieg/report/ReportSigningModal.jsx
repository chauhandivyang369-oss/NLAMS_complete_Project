import React, { useState } from 'react';
import { 
  PenTool, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  KeyRound, 
  Lock, 
  FileCheck2, 
  AlertCircle 
} from 'lucide-react';
import { REPORT_PROJECT_CONTEXT } from '../../../services/siaReportService.js';

export default function ReportSigningModal({ 
  isOpen, 
  onClose, 
  onSignComplete, 
  reportState 
}) {
  const [signerPin, setSignerPin] = useState('123456');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSign = () => {
    if (!isAgreed) {
      setErrorMsg('Please confirm statutory authorization declaration before applying e-Signature.');
      return;
    }
    if (!signerPin || signerPin.length < 4) {
      setErrorMsg('Please enter your 6-digit DSC Cryptographic Token PIN.');
      return;
    }

    setIsSigning(true);
    setErrorMsg('');

    // Simulate DSC / e-Sign crypto timestamping
    setTimeout(() => {
      setIsSigning(false);
      onSignComplete({
        signedBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
        signedAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        certIssuer: 'eMudhra Class 3 Government Digital Signature CA',
        hash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="text-sm font-bold">DIGITAL SIGNATURE (e-Sign) CERTIFICATION</h3>
              <p className="text-[10px] font-mono text-slate-300">
                Statutory Endorsement under Section 4(1) RFCTLARR Act 2013
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono">Signer Name:</span>
              <strong className="text-slate-900">Dr. Sudhir K. Dave</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono">Designation:</span>
              <span className="text-slate-800">Lead Sociologist &amp; Evaluator</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono">Agency:</span>
              <span className="text-slate-800">Gujarat Institute of Development Research</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono">Document:</span>
              <span className="font-mono text-[#1B365D] font-bold">{REPORT_PROJECT_CONTEXT.reportId} ({reportState.currentVersion})</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 block">Certificate Provider (DSC Token)</label>
            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-medium">
              <option>eMudhra Class 3 Government Digital Signature (USB Token Detected)</option>
              <option>NIC-CA Government Public Key Infrastructure (GPKI)</option>
              <option>Aadhaar OTP-based e-Sign (C-DAC e-Hastakshar)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 block">Enter DSC Token PIN / Passphrase</label>
            <div className="relative">
              <input
                type="password"
                value={signerPin}
                onChange={(e) => setSignerPin(e.target.value)}
                placeholder="Enter 6-digit PIN"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 pl-8 font-mono text-xs text-slate-900"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Demo default PIN is filled: 123456</span>
          </div>

          <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start gap-2">
            <input
              type="checkbox"
              id="sign-consent"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-0.5 rounded cursor-pointer"
            />
            <label htmlFor="sign-consent" className="text-[11px] text-slate-700 leading-snug cursor-pointer select-none">
              I hereby solemnly affirm that the findings, census records, Section 5 hearing dispositions, and Section 6 SIMP contained in this 22-chapter report represent true and verifiable field assessments conducted in compliance with the RFCTLARR Act 2013.
            </label>
          </div>

          {errorMsg && (
            <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSign}
            disabled={isSigning}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold rounded-lg flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>{isSigning ? 'Cryptographically Signing...' : 'Apply Digital Signature'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
