import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  Send,
  PhoneCall,
  Mail,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export default function HelpDeskModal() {
  const { isHelpDeskOpen, setIsHelpDeskOpen, activeCitizen, activeProject, showToast } = useCitizen();
  const [category, setCategory] = useState('SECTION_15_HEARING');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isHelpDeskOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Grievance ticket created. CALA Citizen Cell will respond within 48 hours.');
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      setIsHelpDeskOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsHelpDeskOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden z-10 border border-slate-300 animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-3 bg-[#1B365D] text-white border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#C5A059]" />
            <div>
              <div className="font-bold text-sm text-white">CALA Citizen Grievance &amp; Helpdesk</div>
              <div className="text-[10px] text-[#E6CA85]">Statutory Assistance &amp; Technical Support</div>
            </div>
          </div>
          <button
            onClick={() => setIsHelpDeskOpen(false)}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="font-bold text-base text-slate-900">Grievance Registered Successfully</div>
            <p className="text-xs text-slate-600">
              Ticket ID: <span className="font-mono font-bold text-blue-900">GRV-2026-ANAND-8492</span>
            </p>
            <p className="text-[11px] text-slate-500">
              An SMS confirmation has been sent to {activeCitizen.maskedMobile}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs text-slate-800">
            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Affected Landowner Context</div>
              <div className="font-bold text-slate-900">{activeCitizen.name} • {activeCitizen.maskedMobile}</div>
              <div className="text-[11px] text-slate-600">Project: {activeProject?.name || 'All Projects'}</div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Grievance Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="SECTION_15_HEARING">Section 15 Objection Hearing Date / Venue Inquiry</option>
                <option value="SURVEY_DISCREPANCY">Section 12/13 Field Survey Boundary / Area Discrepancy</option>
                <option value="COMPENSATION_CLARIFICATION">Compensation Calculation / Solatium Clarification</option>
                <option value="PFMS_DBT_PAYMENT">PFMS DBT Payment Not Credited / Account Issue</option>
                <option value="RNR_SCHEME">R&amp;R Entitlement &amp; Resettlement Housing Assistance</option>
                <option value="TECHNICAL_PORTAL">Technical Issue / Document Download Error</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Description of Issue / Request *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your query with Khasra number or objection reference if applicable..."
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-800">
              Note: Formal statutory objections against acquisition must be filed via <span className="font-bold">Menu 05 (Section 15 Objections)</span> to satisfy statutory limitation periods.
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsHelpDeskOpen(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white font-bold rounded flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
