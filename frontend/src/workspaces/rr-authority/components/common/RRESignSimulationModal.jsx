import React, { useState } from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { X, ShieldCheck, Key, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RRESignSimulationModal() {
  const { eSignModal, setESignModal, currentRole, selectedProject, addAuditLog } = useRRAuthority();
  const [pin, setPin] = useState('849201');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!eSignModal.isOpen) return null;

  const handleSign = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);

      const signHash = `SHA256:${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
      
      addAuditLog(
        eSignModal.context?.actionTitle || 'ELECTRONIC_SIGNATURE_AFFIXED',
        eSignModal.context?.entityName || 'STATUTORY_INSTRUMENT',
        'Status: Unsigned Draft',
        `Status: Authenticated with DSC (${signHash})`,
        eSignModal.context?.documentName || 'Signed_Statutory_Order.pdf'
      );

      setTimeout(() => {
        if (eSignModal.onSignComplete) {
          eSignModal.onSignComplete(signHash);
        }
        setESignModal({ isOpen: false, context: null, onSignComplete: null });
        setIsDone(false);
      }, 900);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-slate-800 text-xs animate-scaleIn">
        
        {/* Header */}
        <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#C5A059]" />
            <div>
              <h3 className="font-bold text-sm">Class-3 Digital Signature Authentication</h3>
              <p className="text-[10px] font-mono text-[#E6CA85]">
                Controller of Certifying Authorities (CCA) • IT Act 2000
              </p>
            </div>
          </div>

          <button
            onClick={() => setESignModal({ isOpen: false, context: null, onSignComplete: null })}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px]">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Signatory Certificate</span>
            <div className="font-bold text-slate-900 text-xs">
              {currentRole === 'COMMISSIONER' ? selectedProject.commissionerName : selectedProject.administratorName}
            </div>
            <div className="text-slate-600">
              Role: <strong>{currentRole === 'COMMISSIONER' ? 'R&R Commissioner (Sec 44)' : 'R&R Administrator (Sec 43)'}</strong>
            </div>
            <div className="text-[10px] font-mono text-emerald-700 font-bold">
              Token ID: DSC-CCA-NIC-GJ-2026-9481 (Valid till Dec 2028)
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-[11px]">
            <span className="text-[10px] font-mono text-blue-900 uppercase block font-bold">Target Statutory Instrument</span>
            <div className="font-semibold text-slate-900">
              {eSignModal.context?.title || 'Draft R&R Scheme Formulation (Section 16(2))'}
            </div>
            <div className="text-[10px] text-slate-600">
              Project: {selectedProject.name} ({selectedProject.code})
            </div>
          </div>

          {isDone ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-emerald-900 text-sm">
                Cryptographic Signature Affixed Successfully!
              </div>
              <p className="text-[11px] text-emerald-700 font-mono">
                SHA-256 Token Recorded in Audit Ledger
              </p>
            </div>
          ) : (
            <form onSubmit={handleSign} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Enter 6-Digit USB Hardware Token PIN / DSC Passphrase:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm tracking-widest font-mono text-slate-900 focus:bg-white focus:border-[#1B365D]"
                    placeholder="••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                  Demo Default Token PIN: 849201
                </span>
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-900 leading-snug">
                <strong>Legal Warning:</strong> Affixing your Digital Signature Certificate (DSC) commits this statutory instrument under the Indian Evidence Act and RFCTLARR Act 2013.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setESignModal({ isOpen: false, context: null, onSignComplete: null })}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>{isProcessing ? 'Authenticating Token...' : 'Affix Digital Signature'}</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
