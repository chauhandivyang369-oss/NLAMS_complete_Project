import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';
import { validateCinGstin } from '../../../validators/form1Validators.js';

export default function Step2PiaDetails({ formData, updateFormData, errors }) {
  const [verifyingIdx, setVerifyingIdx] = useState(null);

  const handleTogglePia = (isDiff) => {
    updateFormData({ isPiaDifferent: isDiff });
  };

  const handleAddPia = () => {
    const newPia = {
      id: `PIA-0${(formData.pias?.length || 0) + 1}`,
      entityName: '',
      cinGstin: '',
      cinVerified: false,
      nodalPerson: '',
      email: '',
      contact: '',
      boardResolutionRef: '',
      documentUploaded: false
    };
    updateFormData({ pias: [...(formData.pias || []), newPia] });
  };

  const handleRemovePia = (idx) => {
    const updated = formData.pias.filter((_, i) => i !== idx);
    updateFormData({ pias: updated });
  };

  const handlePiaChange = (idx, field, value) => {
    const updated = [...(formData.pias || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    if (field === 'cinGstin') {
      updated[idx].cinVerified = false;
    }
    updateFormData({ pias: updated });
  };

  const verifyCin = (idx) => {
    setVerifyingIdx(idx);
    setTimeout(() => {
      const updated = [...(formData.pias || [])];
      updated[idx].cinVerified = true;
      updateFormData({ pias: updated });
      setVerifyingIdx(null);
    }, 800);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-700" />
          Step 2: Project Implementing Agency (PIA) Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Specify whether the infrastructure project is executed directly by the Requisitioning Body or delegated to a designated concessionaire, SPV, or contractor entity.
        </p>
      </div>

      {/* Execution Structure Radio */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Is Project Implementing Agency (PIA) different from Requisitioning Body? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label
            className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              !formData.isPiaDifferent
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="isPiaDifferent"
              checked={!formData.isPiaDifferent}
              onChange={() => handleTogglePia(false)}
              className="mt-0.5 w-3.5 h-3.5 text-blue-600"
            />
            <div>
              <span className="font-bold text-xs text-slate-900 block">
                NO - Direct Execution by Requisitioning Body
              </span>
              <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                The Requisitioning Body itself ({formData.requisitioningBodyName}) acts as the implementing agency and manages project delivery directly.
              </span>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              formData.isPiaDifferent
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="isPiaDifferent"
              checked={formData.isPiaDifferent}
              onChange={() => handleTogglePia(true)}
              className="mt-0.5 w-3.5 h-3.5 text-blue-600"
            />
            <div>
              <span className="font-bold text-xs text-slate-900 block">
                YES - Designated Implementing Agency / SPV
              </span>
              <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                Project delivery is delegated to a Special Purpose Vehicle (SPV), concessionaire, public corporation, or external executing entity.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Direct Execution Notice */}
      {!formData.isPiaDifferent && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-emerald-950 mb-0.5">
              Direct Agency Governance Confirmed
            </div>
            <p className="leading-relaxed">
              All statutory communications, hearing appearances, and compensation escrow obligations will be formally serviced by <strong>{formData.requisitioningBodyName}</strong> under the authority of Nodal Officer <strong>{formData.nodalOfficerName}</strong> ({formData.nodalOfficerDesignation}).
            </p>
          </div>
        </div>
      )}

      {/* Designated PIA Form Cards */}
      {formData.isPiaDifferent && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Designated Implementing Agencies ({formData.pias?.length || 0})
            </span>
            <button
              type="button"
              onClick={handleAddPia}
              className="text-xs px-2.5 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another PIA
            </button>
          </div>

          {formData.pias && formData.pias.map((pia, idx) => {
            const isCinValid = validateCinGstin(pia.cinGstin);
            return (
              <div key={pia.id || idx} className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>PIA Entity #{idx + 1}</span>
                  </div>
                  {formData.pias.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePia(idx)}
                      className="text-red-600 hover:text-red-800 p-1 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Entity Legal Registered Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pia.entityName}
                      onChange={(e) => handlePiaChange(idx, 'entityName', e.target.value)}
                      placeholder="e.g. Gujarat Expressway SPV Concessionaire Pvt Ltd"
                      className="w-full text-xs border border-slate-300 rounded-md p-2"
                    />
                    {errors?.[`pia_${idx}_name`] && <p className="text-xs text-red-600">{errors[`pia_${idx}_name`]}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CIN (21-digit) or GSTIN (15-digit) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={pia.cinGstin}
                        onChange={(e) => handlePiaChange(idx, 'cinGstin', e.target.value)}
                        placeholder="U45203GJ2023PTC140921"
                        className="w-full text-xs font-mono uppercase border border-slate-300 rounded-md p-2"
                      />
                      <button
                        type="button"
                        onClick={() => verifyCin(idx)}
                        disabled={!isCinValid || verifyingIdx === idx}
                        className={`text-xs px-2.5 py-1.5 rounded-md font-semibold whitespace-nowrap transition-colors ${
                          pia.cinVerified
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-800 hover:bg-slate-700 text-white disabled:bg-slate-300'
                        }`}
                      >
                        {verifyingIdx === idx ? 'Verifying...' : pia.cinVerified ? 'Verified ✓' : 'Verify MCA'}
                      </button>
                    </div>
                    {errors?.[`pia_${idx}_cin`] && <p className="text-xs text-red-600">{errors[`pia_${idx}_cin`]}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nodal Person Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pia.nodalPerson}
                      onChange={(e) => handlePiaChange(idx, 'nodalPerson', e.target.value)}
                      placeholder="Shri Amit V. Dave"
                      className="w-full text-xs border border-slate-300 rounded-md p-2"
                    />
                    {errors?.[`pia_${idx}_person`] && <p className="text-xs text-red-600">{errors[`pia_${idx}_person`]}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={pia.email}
                      onChange={(e) => handlePiaChange(idx, 'email', e.target.value)}
                      placeholder="amit.dave@spvconcession.in"
                      className="w-full text-xs border border-slate-300 rounded-md p-2"
                    />
                    {errors?.[`pia_${idx}_email`] && <p className="text-xs text-red-600">{errors[`pia_${idx}_email`]}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={pia.contact}
                      onChange={(e) => handlePiaChange(idx, 'contact', e.target.value)}
                      placeholder="9825102944"
                      className="w-full text-xs border border-slate-300 rounded-md p-2"
                    />
                    {errors?.[`pia_${idx}_contact`] && <p className="text-xs text-red-600">{errors[`pia_${idx}_contact`]}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Board Resolution / Concession Agreement Ref
                    </label>
                    <input
                      type="text"
                      value={pia.boardResolutionRef}
                      onChange={(e) => handlePiaChange(idx, 'boardResolutionRef', e.target.value)}
                      placeholder="BR/2024/NH48-BYPASS/09 or CA-MORTH-2024"
                      className="w-full text-xs border border-slate-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Delegation Letter
                    </label>
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handlePiaChange(idx, 'documentUploaded', true)}
                        className={`text-xs px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-colors ${
                          pia.documentUploaded
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {pia.documentUploaded ? <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Upload className="w-3.5 h-3.5" />}
                        {pia.documentUploaded ? 'Authorization Attached' : 'Attach Letter'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
