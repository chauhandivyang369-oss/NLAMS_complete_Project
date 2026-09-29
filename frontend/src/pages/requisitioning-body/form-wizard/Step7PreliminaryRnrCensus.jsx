import React from 'react';
import { Users, Home, HeartHandshake, Shield, Info } from 'lucide-react';

export default function Step7PreliminaryRnrCensus({ formData, updateFormData, errors }) {
  const totalImpacted = 
    (Number(formData.estLandownerFamilies) || 0) + 
    (Number(formData.estLivelihoodDependentFamilies) || 0);

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-700" />
          Step 7: Preliminary Rehabilitation & Resettlement (R&R) Census
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Establish baseline family counts for Project-Affected Families (PAF) under RFCTLARR Act Second and Third Schedules to prepare the statutory Social Impact Assessment (SIA) terms.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-center">
          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
            Total Impacted Families
          </span>
          <span className="text-2xl font-bold text-blue-900">{totalImpacted}</span>
          <span className="text-[10px] text-blue-600 block mt-0.5">Landowners + Livelihood</span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Titleholder Families
          </span>
          <span className="text-2xl font-bold text-slate-900">{formData.estLandownerFamilies || 0}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Recorded in 7/12 RoR</span>
        </div>

        <div className="bg-purple-50/70 border border-purple-200 rounded-lg p-3 text-center">
          <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
            SC / ST Families
          </span>
          <span className="text-2xl font-bold text-purple-900">{formData.estScStFamilies || 0}</span>
          <span className="text-[10px] text-purple-600 block mt-0.5">Special Safeguards (Sec 41/42)</span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-center">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Physically Displaced
          </span>
          <span className="text-2xl font-bold text-amber-900">{formData.estDisplacedFamilies || 0}</span>
          <span className="text-[10px] text-amber-600 block mt-0.5">Resettlement Colony Required</span>
        </div>
      </div>

      {/* Input Metrics Grid */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <HeartHandshake className="w-4 h-4 text-blue-700" />
          Preliminary Census Metric Inputs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Landowner Families Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={formData.estLandownerFamilies}
              onChange={(e) => updateFormData({ estLandownerFamilies: Number(e.target.value) })}
              className="w-full text-xs font-semibold border border-slate-300 rounded-md p-2"
            />
            {errors?.estLandownerFamilies && <p className="text-xs text-red-600 mt-1">{errors.estLandownerFamilies}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Livelihood-Dependent Families Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={formData.estLivelihoodDependentFamilies}
              onChange={(e) => updateFormData({ estLivelihoodDependentFamilies: Number(e.target.value) })}
              placeholder="Agricultural laborers, sharecroppers, village artisans"
              className="w-full text-xs font-semibold border border-slate-300 rounded-md p-2"
            />
            {errors?.estLivelihoodDependentFamilies && <p className="text-xs text-red-600 mt-1">{errors.estLivelihoodDependentFamilies}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Scheduled Caste / Scheduled Tribe Families <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={formData.estScStFamilies}
              onChange={(e) => updateFormData({ estScStFamilies: Number(e.target.value) })}
              className="w-full text-xs font-semibold border border-slate-300 rounded-md p-2"
            />
            {errors?.estScStFamilies && <p className="text-xs text-red-600 mt-1">{errors.estScStFamilies}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Displaced Families (Losing Residential Homestead) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={formData.estDisplacedFamilies}
              onChange={(e) => updateFormData({ estDisplacedFamilies: Number(e.target.value) })}
              className="w-full text-xs font-semibold border border-slate-300 rounded-md p-2"
            />
            {errors?.estDisplacedFamilies && <p className="text-xs text-red-600 mt-1">{errors.estDisplacedFamilies}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Data Estimation Methodology & Source
            </label>
            <select
              value={formData.rnrEstimateSource}
              onChange={(e) => updateFormData({ rnrEstimateSource: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
            >
              <option value="System Derived">
                System Derived (Calculated automatically from AnyRoR 7/12 khata co-sharers and satellite building footprints)
              </option>
              <option value="Joint Rapid Assessment">
                Joint Preliminary Reconnaissance Survey with District Administration
              </option>
              <option value="Detailed Pre-Feasibility DPR">
                Detailed Project Report (DPR) Socio-Economic Baseline Chapter
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Socio-Economic Profiling Notes for CALA Scrutiny
            </label>
            <textarea
              rows={2}
              value={formData.rnrNotes}
              onChange={(e) => updateFormData({ rnrNotes: e.target.value })}
              placeholder="Record any vulnerable groups, women-headed households, or community common property resources..."
              className="w-full text-xs border border-slate-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Statutory Advisory */}
      <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Mandatory Statutory Entitlements Notice:</strong> Under Second Schedule of the RFCTLARR Act, displaced families are entitled to constructed housing or financial allowance (min ₹1.5 Lakhs in rural areas), transportation allowance (₹50,000), subsistence grant for 12 months (₹3,000/month), and mandatory one-time resettlement grant (₹50,000).
        </p>
      </div>
    </div>
  );
}
