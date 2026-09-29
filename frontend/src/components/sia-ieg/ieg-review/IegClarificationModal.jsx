import React, { useState } from 'react';
import { X, HelpCircle, Send } from 'lucide-react';

export default function IegClarificationModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    module: 'Land',
    recordId: 'PARCEL-142',
    question: 'Clarify whether the 2.50 Ha railway yard buffer land in Petlad Junction is already in ownership of Indian Railways.',
    reason: 'Statutory verification under Section 7(1) to avoid redundant acquisition proceedings over government land.',
    evidenceRef: 'EV-1098 (7/12 RoR Cadastral)',
    urgency: 'Medium'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question) return;
    onSubmit({
      ...formData,
      requestId: `CLAR-00${Math.floor(Math.random() * 900) + 100}`,
      status: 'Sent to Requiring Body',
      requestedBy: 'IEG Committee Member',
      requestedAt: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        
        <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-bold text-sm">Issue Formal Statutory Clarification Request</h3>
              <p className="text-[10px] font-mono text-slate-300">Transmit to SIA Agency / Requiring Body</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Module</label>
              <select
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-semibold text-slate-800"
              >
                <option value="Land">Land &amp; Parcels</option>
                <option value="GIS">GIS &amp; Boundary</option>
                <option value="Families">Affected Families</option>
                <option value="Livelihood">Livelihood &amp; Labourers</option>
                <option value="Displacement">Displacement &amp; Housing</option>
                <option value="Assets">Assets &amp; Wells</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Public Hearing">Public Hearing Register</option>
                <option value="SIMP">SIMP Budget &amp; Feasibility</option>
                <option value="Alternatives">Alternative Site Analysis</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Record ID</label>
              <input
                type="text"
                value={formData.recordId}
                onChange={(e) => setFormData({ ...formData, recordId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono text-xs"
                placeholder="e.g. PARCEL-142 or FAM-001"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Formal Query / Question to SIA Agency</label>
            <textarea
              rows={3}
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900"
              placeholder="State clear, precise questions regarding findings, data gaps or methodologies..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Statutory Purpose / Legal Reference</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800"
              placeholder="e.g. RFCTLARR 2013 Section 7 appraisal requirement"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Evidence Reference (Optional)</label>
            <input
              type="text"
              value={formData.evidenceRef}
              onChange={(e) => setFormData({ ...formData, evidenceRef: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono text-xs text-slate-800"
              placeholder="e.g. EV-1098, EV-1021"
            />
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Transmit Clarification</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
