import React, { useState } from 'react';
import { X, AlertTriangle, Send, ShieldAlert } from 'lucide-react';

export default function IegDiscrepancyModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    module: 'Families',
    recordId: 'FAM-CENSUS-01',
    claim: '500 Affected Families reported in Chapter 4 Demographic Census',
    observedEvidence: '463 verified schedules with 37 landless tenant families pending panchnama verification',
    difference: '37 families (7.4%) pending documentary corroboration',
    severity: 'Medium',
    iegObservation: 'SIA team must furnish registered tenant declarations or Gram Panchayat certifications for the 37 agricultural labourer households.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.claim || !formData.observedEvidence) return;
    onSubmit({
      ...formData,
      discrepancyId: `DISC-00${Math.floor(Math.random() * 900) + 100}`,
      status: 'Open',
      flaggedAt: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        
        <div className="p-4 bg-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="font-bold text-sm">Flag Statutory Discrepancy</h3>
              <p className="text-[10px] font-mono text-amber-100">Independent Expert Group Review Audit</p>
            </div>
          </div>
          <button onClick={onClose} className="text-amber-100 hover:text-white cursor-pointer">
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
                <option value="Executive Summary">Executive Summary</option>
                <option value="Project">Project</option>
                <option value="GIS">GIS</option>
                <option value="Land">Land</option>
                <option value="Families">Families</option>
                <option value="Livelihood">Livelihood</option>
                <option value="Displacement">Displacement</option>
                <option value="Assets">Assets</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Public Hearing">Public Hearing</option>
                <option value="SIMP">SIMP</option>
                <option value="Alternatives">Alternatives</option>
                <option value="Evidence">Evidence</option>
                <option value="Documents">Documents</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Severity Level</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-semibold text-slate-800"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Related Record / Section ID</label>
            <input
              type="text"
              value={formData.recordId}
              onChange={(e) => setFormData({ ...formData, recordId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono text-xs"
              placeholder="e.g. FAM-001 or PARCEL-142"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">SIA Report Claim</label>
            <textarea
              rows={2}
              value={formData.claim}
              onChange={(e) => setFormData({ ...formData, claim: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900"
              placeholder="Statement or figure made in the submitted SIA report"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Observed Evidence / Fact from Verification</label>
            <textarea
              rows={2}
              value={formData.observedEvidence}
              onChange={(e) => setFormData({ ...formData, observedEvidence: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900"
              placeholder="Ground reality, verified RoR, or evidence observation"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Calculated Difference / Gap</label>
            <input
              type="text"
              value={formData.difference}
              onChange={(e) => setFormData({ ...formData, difference: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono text-xs"
              placeholder="e.g. 2.50 Ha or 37 families"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">IEG Statutory Observation</label>
            <textarea
              rows={2}
              value={formData.iegObservation}
              onChange={(e) => setFormData({ ...formData, iegObservation: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900"
              placeholder="Committee member commentary or recommendation to rectify"
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
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
              <span>Record Discrepancy</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
