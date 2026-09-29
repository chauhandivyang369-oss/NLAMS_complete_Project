import React from 'react';
import { 
  Building2, 
  Landmark, 
  FileText, 
  AlertTriangle, 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';
import { 
  CENTRAL_REQUISITIONING_BODIES, 
  STATE_REQUISITIONING_BODIES, 
  FOURTH_SCHEDULE_SPECIAL_ACTS,
  PPP_SECTORS,
  SPONSORING_PUBLIC_ENTITIES,
  PRIVATE_SECTOR_CATEGORIES,
  UNION_TERRITORIES 
} from '../../../services/referenceDataService.js';

export default function Step1ProjectTypeLegal({ formData, updateFormData, errors }) {
  const isGov = formData.projectScenario === 'GOVERNMENT';
  const isPpp = formData.projectScenario === 'PPP';
  const isPrivate = formData.projectScenario === 'PRIVATE';

  return (
    <div className="space-y-6 text-slate-800">
      {/* Step Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-700" />
          Step 1: Project Type & Legal Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Define statutory acquisition scenario under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR).
        </p>
      </div>

      {/* 1. Project Scenario Radio Selection */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Statutory Project Scenario <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              id: 'GOVERNMENT',
              title: 'Government Project',
              sec: 'Section 2(1)',
              desc: 'Public infrastructure, strategic, or direct government department projects.'
            },
            {
              id: 'PPP',
              title: 'Public-Private Partnership (PPP)',
              sec: 'Section 2(2)(a)',
              desc: 'Public-private partnership where ownership vests in Govt (70% Prior Consent).'
            },
            {
              id: 'PRIVATE',
              title: 'Private Company Project',
              sec: 'Section 2(2)(b)',
              desc: 'Private commercial entities for public purpose projects (80% Prior Consent).'
            }
          ].map(opt => {
            const isSelected = formData.projectScenario === opt.id;
            return (
              <label
                key={opt.id}
                className={`relative flex flex-col p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">{opt.title}</span>
                  <input
                    type="radio"
                    name="projectScenario"
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => updateFormData({ projectScenario: opt.id })}
                    className="w-3.5 h-3.5 text-blue-600"
                  />
                </div>
                <span className="text-[10px] font-mono font-semibold text-blue-700 mb-1">{opt.sec}</span>
                <span className="text-[11px] text-slate-500 leading-snug">{opt.desc}</span>
              </label>
            );
          })}
        </div>
        {errors?.projectScenario && (
          <p className="text-xs text-red-600">{errors.projectScenario}</p>
        )}
      </div>

      {/* 2. Conditional Fields Based on Scenario */}
      {isGov && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            <Landmark className="w-4 h-4 text-blue-700" />
            Government Tier & Requisitioning Body
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Government Level <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="governmentLevel"
                    value="CENTRAL"
                    checked={formData.governmentLevel === 'CENTRAL'}
                    onChange={() => updateFormData({ governmentLevel: 'CENTRAL' })}
                    className="text-blue-600"
                  />
                  <span>Central / National Body (NHAI, DFCCIL, NTPC...)</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="governmentLevel"
                    value="STATE"
                    checked={formData.governmentLevel === 'STATE'}
                    onChange={() => updateFormData({ governmentLevel: 'STATE' })}
                    className="text-blue-600"
                  />
                  <span>State Government Department (PWD, GIDC, MIDC...)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Pre-Approved Requisitioning Body
              </label>
              <select
                value={formData.requisitioningBodyName}
                onChange={(e) => updateFormData({ requisitioningBodyName: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white focus:ring-1 focus:ring-blue-500"
              >
                {formData.governmentLevel === 'CENTRAL' ? (
                  CENTRAL_REQUISITIONING_BODIES.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))
                ) : (
                  STATE_REQUISITIONING_BODIES.map(b => (
                    <option key={b.id} value={b.name}>{b.name} ({b.state})</option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>
      )}

      {isPpp && (
        <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 border-b border-amber-200 pb-2">
            <FileText className="w-4 h-4 text-amber-700" />
            Public-Private Partnership (PPP) Mandatory Configuration
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PPP Sector <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.pppSector}
                onChange={(e) => updateFormData({ pppSector: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
              >
                <option value="">-- Select Sector --</option>
                {PPP_SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors?.pppSector && <p className="text-xs text-red-600">{errors.pppSector}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sponsoring Public Entity <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sponsoringPublicEntity}
                onChange={(e) => updateFormData({ sponsoringPublicEntity: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
              >
                <option value="">-- Select Sponsoring Entity --</option>
                {SPONSORING_PUBLIC_ENTITIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors?.sponsoringPublicEntity && <p className="text-xs text-red-600">{errors.sponsoringPublicEntity}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Concessionaire Entity / SPV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.concessionaireEntity}
                onChange={(e) => updateFormData({ concessionaireEntity: e.target.value })}
                placeholder="e.g. Gujarat Expressway SPV Pvt Ltd"
                className="w-full text-xs border border-slate-300 rounded-md p-2"
              />
              {errors?.concessionaireEntity && <p className="text-xs text-red-600">{errors.concessionaireEntity}</p>}
            </div>
          </div>
        </div>
      )}

      {isPrivate && (
        <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-900 border-b border-purple-200 pb-2">
            <ShieldAlert className="w-4 h-4 text-purple-700" />
            Private Company Mandatory Requirements (80% Prior Consent)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Private Sector Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.privateSectorCategory}
                onChange={(e) => updateFormData({ privateSectorCategory: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
              >
                <option value="">-- Select Category --</option>
                {PRIVATE_SECTOR_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors?.privateSectorCategory && <p className="text-xs text-red-600">{errors.privateSectorCategory}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Private Entity Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.privateEntityName}
                onChange={(e) => updateFormData({ privateEntityName: e.target.value })}
                placeholder="Full Registered Name under Companies Act"
                className="w-full text-xs border border-slate-300 rounded-md p-2"
              />
              {errors?.privateEntityName && <p className="text-xs text-red-600">{errors.privateEntityName}</p>}
            </div>
          </div>
        </div>
      )}

      {/* 3. Submitting Nodal Officer Profile */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Submitting Nodal Officer Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nodal Officer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nodalOfficerName}
              onChange={(e) => updateFormData({ nodalOfficerName: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2"
            />
            {errors?.nodalOfficerName && <p className="text-xs text-red-600">{errors.nodalOfficerName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nodalOfficerDesignation}
              onChange={(e) => updateFormData({ nodalOfficerDesignation: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2"
            />
            {errors?.nodalOfficerDesignation && <p className="text-xs text-red-600">{errors.nodalOfficerDesignation}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.officialEmail}
              onChange={(e) => updateFormData({ officialEmail: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2"
            />
            {errors?.officialEmail && <p className="text-xs text-red-600">{errors.officialEmail}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => updateFormData({ mobile: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2"
            />
            {errors?.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Appropriate Government / Line Ministry <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.appropriateGovernment}
              onChange={(e) => updateFormData({ appropriateGovernment: e.target.value })}
              placeholder="e.g. Ministry of Road Transport and Highways (MoRTH)"
              className="w-full text-xs border border-slate-300 rounded-md p-2"
            />
            {errors?.appropriateGovernment && <p className="text-xs text-red-600">{errors.appropriateGovernment}</p>}
          </div>
        </div>
      </div>

      {/* 4. Statutory Special Provisions (Fourth Schedule, Sec 40, Temporary Occ) */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Statutory Special Provisions & Exemptions
        </h3>

        {/* Fourth Schedule Special Acts */}
        <div className="space-y-2 border-b border-slate-200 pb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFourthScheduleAct}
              onChange={(e) => updateFormData({ isFourthScheduleAct: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="font-semibold text-xs text-slate-900">
              Acquisition under Fourth Schedule Special Act (Section 105 Exemption)
            </span>
          </label>

          {formData.isFourthScheduleAct && (
            <div className="pl-6 pt-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Applicable Special Act (1 of 13 Acts) <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.fourthScheduleAct}
                onChange={(e) => updateFormData({ fourthScheduleAct: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
              >
                {FOURTH_SCHEDULE_SPECIAL_ACTS.map(act => (
                  <option key={act.id} value={act.id}>
                    {act.id}: {act.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Note: Compensation and R&R entitlements under First, Second, and Third Schedules remain mandatory even under Fourth Schedule Special Acts.
              </p>
            </div>
          )}
        </div>

        {/* Section 40 Urgency Clause */}
        <div className="space-y-2 border-b border-slate-200 pb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isSection40Urgency}
              onChange={(e) => updateFormData({ isSection40Urgency: e.target.checked })}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="font-semibold text-xs text-red-900 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              Invoke Section 40 Urgency Clause (Dispenses with Sec. 15 Hearings)
            </span>
          </label>

          {formData.isSection40Urgency && (
            <div className="pl-6 pt-2 space-y-3 bg-red-50/50 p-3 rounded border border-red-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Urgency Ground <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.urgencyGround}
                  onChange={(e) => updateFormData({ urgencyGround: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
                >
                  <option value="">-- Select Statutory Urgency Ground --</option>
                  <option value="DEFENSE">National Defence & Strategic Security</option>
                  <option value="CALAMITY">Natural Calamity or Emergency Rehabilitation</option>
                  <option value="EMERGENCY_RAIL_ROAD">Operational Rail/Corridor Emergency Threat</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Justification <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.urgencyJustification}
                  onChange={(e) => updateFormData({ urgencyJustification: e.target.value })}
                  rows={2}
                  placeholder="Record formal reasons why regular Section 15 inquiry cannot be held..."
                  className="w-full text-xs border border-slate-300 rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Temporary Occupation (Part IV / Section 81) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTemporaryOccupation}
              onChange={(e) => updateFormData({ isTemporaryOccupation: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="font-semibold text-xs text-slate-900">
              Temporary Occupation of Land (Part IV, Section 81) - Max 3 Years
            </span>
          </label>

          {formData.isTemporaryOccupation && (
            <div className="pl-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Purpose of Temporary Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.temporaryOccupationPurpose}
                  onChange={(e) => updateFormData({ temporaryOccupationPurpose: e.target.value })}
                  placeholder="e.g. Muck dumping, batching plant, contractor camp"
                  className="w-full text-xs border border-slate-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Occupation Term (Months/Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.temporaryOccupationTerm}
                  onChange={(e) => updateFormData({ temporaryOccupationTerm: e.target.value })}
                  placeholder="e.g. 24 Months (Max 36 Months)"
                  className="w-full text-xs border border-slate-300 rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
