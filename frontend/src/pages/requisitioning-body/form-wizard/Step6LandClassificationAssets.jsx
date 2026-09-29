import React from 'react';
import { 
  Sprout, 
  Wheat, 
  Home, 
  Droplets, 
  TreePine, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2 
} from 'lucide-react';

export default function Step6LandClassificationAssets({ formData, updateFormData, errors }) {
  const handleToggleMultiCrop = (val) => {
    updateFormData({ isMultiCropIrrigated: val });
  };

  const handleSensitiveCheck = (field, checked) => {
    updateFormData({
      sensitiveLandCheck: {
        ...(formData.sensitiveLandCheck || {}),
        [field]: checked
      }
    });
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-700" />
          Step 6: Land Classification, Food Security & Existing Assets
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Record statutory compliance under RFCTLARR Section 10 (Special Provisions to Safeguard Food Security) and inventory all immovable assets, structures, trees, and water bodies.
        </p>
      </div>

      {/* 1. Food Security & Section 10 Restrictions */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          <Wheat className="w-4 h-4 text-amber-600" />
          RFCTLARR Section 10: Multi-Cropped Irrigated Land Compliance
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Does the proposed acquisition involve Irrigated Multi-Cropped Agricultural Land? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="radio"
                name="isMultiCropIrrigated"
                checked={!formData.isMultiCropIrrigated}
                onChange={() => handleToggleMultiCrop(false)}
                className="text-blue-600"
              />
              <span className="font-medium">NO (Compliant - Exclusively single-crop / un-irrigated / waste land)</span>
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="radio"
                name="isMultiCropIrrigated"
                checked={formData.isMultiCropIrrigated}
                onChange={() => handleToggleMultiCrop(true)}
                className="text-blue-600"
              />
              <span className="font-medium">YES (Statutory Section 10(2) Limit & Justification Required)</span>
            </label>
          </div>

          {formData.isMultiCropIrrigated && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Multi-Crop Land Extent (Hectares) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.multiCropAreaHa}
                    onChange={(e) => updateFormData({ multiCropAreaHa: e.target.value })}
                    placeholder="e.g. 2.85"
                    className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
                  />
                  {errors?.multiCropAreaHa && <p className="text-xs text-red-600">{errors.multiCropAreaHa}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District Net Cultivated Area Limit Check
                  </label>
                  <div className="text-xs text-emerald-800 bg-emerald-100/70 border border-emerald-300 rounded p-2 font-medium">
                    ✓ Estimated acquisition is 0.08% of district net cultivated area (Statutory ceiling: Max 5%).
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Statutory Justification & Exceptional Circumstances <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.multiCropJustification}
                  onChange={(e) => updateFormData({ multiCropJustification: e.target.value })}
                  placeholder="State exceptional public infrastructure necessity justifying acquisition of multi-crop land..."
                  className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
                />
                {errors?.multiCropJustification && <p className="text-xs text-red-600">{errors.multiCropJustification}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Wasteland Alternatives */}
        <div className="border-t border-slate-100 pt-3 space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Have alternate wastelands or uncultivated lands been explored to minimize agricultural footprint?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={formData.alternateWastelandExplored}
              onChange={(e) => updateFormData({ alternateWastelandExplored: e.target.value })}
              placeholder="YES / NO"
              className="w-full text-xs font-bold border border-slate-300 rounded-md p-2"
            />
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.alternateWastelandDetails}
                onChange={(e) => updateFormData({ alternateWastelandDetails: e.target.value })}
                placeholder="Details of surveyed wasteland parcels..."
                className="w-full text-xs border border-slate-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Existing Structures & Buildings */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Home className="w-4 h-4 text-slate-600" />
            Existing Structures & Immovable Properties ({formData.structures?.length || 0})
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="py-2 px-3">Structure Type</th>
                <th className="py-2 px-3 text-center">Qty</th>
                <th className="py-2 px-3 text-right">Plinth Area (sq.m)</th>
                <th className="py-2 px-3">Construction Quality</th>
                <th className="py-2 px-3">Survey No.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {formData.structures && formData.structures.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-1.5 px-3 font-semibold text-slate-800">{s.type}</td>
                  <td className="py-1.5 px-3 text-center font-medium">{s.quantity}</td>
                  <td className="py-1.5 px-3 text-right font-mono">{s.plinthArea}</td>
                  <td className="py-1.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {s.quality}
                    </span>
                  </td>
                  <td className="py-1.5 px-3 font-bold text-blue-900">{s.surveyNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Water Assets & Trees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Water Assets */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Droplets className="w-4 h-4 text-blue-600" />
            Water Assets (Wells, Borewells, Ponds)
          </div>
          <div className="space-y-1.5 text-xs">
            {formData.waterAssets && formData.waterAssets.map((w, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                <span className="font-semibold text-slate-800">{w.type} ({w.count} nos)</span>
                <span className="text-slate-500 font-mono">Survey {w.surveyNo} • {w.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trees & Standing Crops */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <TreePine className="w-4 h-4 text-emerald-600" />
            Trees & Standing Crops
          </div>
          <div className="space-y-1.5 text-xs">
            {formData.fruitTrees && formData.fruitTrees.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                <span className="font-semibold text-slate-800">{t.species} ({t.count} trees)</span>
                <span className="text-slate-500 font-mono">Survey {t.surveyNo}</span>
              </div>
            ))}
            {formData.standingCrops && formData.standingCrops.map((c, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="font-semibold text-amber-800">Crops: {c.cropType}</span>
                <span className="text-slate-500 font-mono">{c.areaAcres} Acres</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Sensitive Lands & Heritage Checklist */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Sensitive Land & Heritage Verification
        </div>
        <p className="text-[11px] text-slate-500">
          Verify whether the corridor affects any protected monuments, scheduled tribe habitats, or religious premises:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { id: 'hasReligious', label: 'Religious Places / Temples / Mosques' },
            { id: 'hasHeritage', label: 'Ancient Monument / Heritage Site' },
            { id: 'hasForest', label: 'Forest / Eco-Sensitive Zone' },
            { id: 'hasScheduledTribe', label: 'Scheduled Tribe (Fifth/Sixth Schedule)' },
            { id: 'hasOther', label: 'Burial Ground / Crematorium' }
          ].map(item => (
            <label key={item.id} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded cursor-pointer hover:border-slate-300">
              <input
                type="checkbox"
                checked={Boolean(formData.sensitiveLandCheck?.[item.id])}
                onChange={(e) => handleSensitiveCheck(item.id, e.target.checked)}
                className="w-3.5 h-3.5 text-blue-600 rounded"
              />
              <span className="text-slate-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
