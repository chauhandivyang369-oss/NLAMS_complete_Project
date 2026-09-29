import React from 'react';
import { FileText, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function Step3ProjectDetails({ formData, updateFormData, errors }) {
  // Check if approval date is more than 1 year old
  const isApprovalDelayed = (() => {
    if (!formData.adminApprovalDate) return false;
    const approvalDate = new Date(formData.adminApprovalDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return approvalDate < oneYearAgo;
  })();

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-700" />
          Step 3: Project Details & Public Purpose
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Record statutory project definition, RFCTLARR Act Section 2(1) public purpose classification, gestation schedule, and administrative sanction order.
        </p>
      </div>

      {/* Main Project Fields */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
        {/* Project Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Official Project Title <span className="text-red-500">*</span>
            <span className="text-[10px] text-slate-400 font-normal ml-1">
              ({(formData.projectTitle || '').length}/250 chars)
            </span>
          </label>
          <input
            type="text"
            maxLength={250}
            value={formData.projectTitle}
            onChange={(e) => updateFormData({ projectTitle: e.target.value })}
            placeholder="e.g. Petlad Railway Bypass Alignment Corridor (Chainage 12.40 to 19.24)"
            className="w-full text-xs font-medium border border-slate-300 rounded-md p-2.5 focus:ring-1 focus:ring-blue-500"
          />
          {errors?.projectTitle && <p className="text-xs text-red-600 mt-1">{errors.projectTitle}</p>}
        </div>

        {/* Public Purpose Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Public Purpose Category (RFCTLARR Sec. 2(1)) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.publicPurposeCategory}
              onChange={(e) => updateFormData({ publicPurposeCategory: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
            >
              <option value="Infrastructure (Clause b-i)">
                Infrastructure Projects listed under Section 2(1)(b)(i) (Roads, Railways, Ports, Energy)
              </option>
              <option value="Strategic / National Security (Clause a)">
                Strategic & National Security (Section 2(1)(a))
              </option>
              <option value="Project for Affected Families (Clause c)">
                Project for Project-Affected Families (Section 2(1)(c))
              </option>
              <option value="Residential Housing (Clause d)">
                Housing for Low-Income Groups / Urban Poor (Section 2(1)(d))
              </option>
              <option value="Planned Rural/Urban Development (Clause e)">
                Planned Development / Improvement of Village Sites / Towns (Section 2(1)(e))
              </option>
              <option value="Government Educational / Health Facilities">
                Public Educational, Research, or Healthcare Facilities (Section 2(1)(f))
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Gestation Period <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 flex-1">
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={formData.gestationYears}
                  onChange={(e) => updateFormData({ gestationYears: Number(e.target.value) })}
                  className="w-full text-xs border border-slate-300 rounded-md p-2"
                />
                <span className="text-xs text-slate-500">Years</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={formData.gestationMonths}
                  onChange={(e) => updateFormData({ gestationMonths: Number(e.target.value) })}
                  className="w-full text-xs border border-slate-300 rounded-md p-2"
                />
                <span className="text-xs text-slate-500">Months</span>
              </div>
            </div>
            {errors?.gestation && <p className="text-xs text-red-600 mt-1">{errors.gestation}</p>}
          </div>
        </div>

        {/* Public Purpose Detailed Justification */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Statutory Public Purpose Detailed Justification <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={formData.publicPurposeDetails}
            onChange={(e) => updateFormData({ publicPurposeDetails: e.target.value })}
            placeholder="Provide a comprehensive operational and socio-economic rationale describing why land acquisition is indispensable for public welfare..."
            className="w-full text-xs border border-slate-300 rounded-md p-2.5"
          />
          {errors?.publicPurposeDetails && <p className="text-xs text-red-600 mt-1">{errors.publicPurposeDetails}</p>}
        </div>
      </div>

      {/* Administrative Sanction & Order Ref */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-600" />
          Administrative Sanction & Competent Authority Approval
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Administrative Sanction Order / File Ref Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.adminSanctionRef}
              onChange={(e) => updateFormData({ adminSanctionRef: e.target.value })}
              placeholder="e.g. NHAI/BOT/GJ-ANAND/2024/REV-048"
              className="w-full text-xs font-mono border border-slate-300 rounded-md p-2 bg-white"
            />
            {errors?.adminSanctionRef && <p className="text-xs text-red-600 mt-1">{errors.adminSanctionRef}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sanction Order Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.adminApprovalDate}
              onChange={(e) => updateFormData({ adminApprovalDate: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
            />
            {errors?.adminApprovalDate && <p className="text-xs text-red-600 mt-1">{errors.adminApprovalDate}</p>}
          </div>
        </div>

        {/* Reason for Delay Warning & Input if > 1 year */}
        {isApprovalDelayed && (
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Administrative Sanction is over 1 year old
            </div>
            <p className="text-[11px] text-amber-800">
              Under RFCTLARR best practices, prolonged gaps between administrative sanction and Form-I requisition must include an official explanation of delay for the Collectorate scrutiny.
            </p>
            <textarea
              rows={2}
              value={formData.reasonForDelay}
              onChange={(e) => updateFormData({ reasonForDelay: e.target.value })}
              placeholder="State reasons for the gap (e.g. alignment redesign, state forest clearance, pre-requisition survey)..."
              className="w-full text-xs border border-amber-300 rounded-md p-2 bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
