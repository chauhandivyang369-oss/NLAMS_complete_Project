import React, { useState } from 'react';
import { X, MessageSquarePlus, Check } from 'lucide-react';

export default function IegObservationModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    section: 'Statutory Appraisal',
    observation: 'The public hearing was well attended (318 participants) and properly video recorded. Grievance regarding the canal diversion is satisfactorily provided for in SIMP Item #SIMP-004.',
    significance: 'Positive Concurrence'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.observation) return;
    onSubmit({
      ...formData,
      id: `OBS-${Date.now()}`,
      recordedBy: 'IEG Member',
      recordedAt: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-bold text-sm">Add IEG Expert Group Observation</h3>
              <p className="text-[10px] font-mono text-slate-300">Internal Committee Note &amp; Finding</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Module or Section</label>
            <input
              type="text"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Significance / Impact Assessment</label>
            <select
              value={formData.significance}
              onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-semibold text-slate-800"
            >
              <option value="Positive Concurrence">Positive Concurrence (Evidence Satisfactory)</option>
              <option value="Neutral Note">Neutral Note / Factual Finding</option>
              <option value="Caveat / Condition">Caveat / Statutory Condition Proposed</option>
              <option value="Major Concern">Major Concern / Negative Finding</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Observation Remarks</label>
            <textarea
              rows={4}
              value={formData.observation}
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900"
              placeholder="Enter detailed technical, environmental or socioeconomic observation..."
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
              <Check className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Record Observation</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
