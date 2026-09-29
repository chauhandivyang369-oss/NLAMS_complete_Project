import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  CloudRain, 
  Plus, 
  FileText, 
  Info, 
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const SEED_CROPS = [
  {
    id: 'CROP-01',
    village: 'Petlad',
    surveyNo: '140/A',
    cropName: 'Tobacco (Calcutti / Anand Special)',
    season: 'Rabi (Oct–Mar)',
    irrigationType: 'Canal Irrigated (Mahi Network)',
    areaAffectedHa: 1.20,
    annualYieldQuintals: 32,
    estimatedAnnualLoss: '₹2,40,000',
    tenantsInvolved: '2 Sharecropper families',
    evidenceDoc: 'crop_survey_140A_rabi.pdf'
  },
  {
    id: 'CROP-02',
    village: 'Petlad',
    surveyNo: '141',
    cropName: 'Banana (Grand Naine Plantation)',
    season: 'Perennial (14-Month Cycle)',
    irrigationType: 'Drip & Borewell Irrigated',
    areaAffectedHa: 2.10,
    annualYieldQuintals: 580,
    estimatedAnnualLoss: '₹5,80,000',
    tenantsInvolved: 'Owner cultivated + 4 seasonal labourers',
    evidenceDoc: 'banana_orchard_inspection.jpg'
  },
  {
    id: 'CROP-03',
    village: 'Sunav',
    surveyNo: '143/2',
    cropName: 'Paddy (Gurjari / Gujarat-17)',
    season: 'Kharif (Jun–Nov)',
    irrigationType: 'Rainfed & Canal Supplemental',
    areaAffectedHa: 1.85,
    annualYieldQuintals: 65,
    estimatedAnnualLoss: '₹1,95,000',
    tenantsInvolved: '1 Tenant family',
    evidenceDoc: 'paddy_kharif_yield.pdf'
  },
  {
    id: 'CROP-04',
    village: 'Nar',
    surveyNo: '146',
    cropName: 'Wheat (GW-496) & Mustard Intercrop',
    season: 'Rabi (Nov–Apr)',
    irrigationType: 'Tube-well Irrigated',
    areaAffectedHa: 1.40,
    annualYieldQuintals: 48,
    estimatedAnnualLoss: '₹1,44,000',
    tenantsInvolved: 'Family labour',
    evidenceDoc: 'wheat_field_nar.jpg'
  }
];

export default function AgricultureSection() {
  const [crops, setCrops] = useState(SEED_CROPS);
  const [isAdding, setIsAdding] = useState(false);
  const [newCrop, setNewCrop] = useState({
    village: 'Petlad',
    surveyNo: '',
    cropName: '',
    season: 'Kharif (Monsoon)',
    irrigationType: 'Canal Irrigated',
    areaAffectedHa: '',
    annualYieldQuintals: '',
    estimatedAnnualLoss: '',
    tenantsInvolved: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCrop.cropName || !newCrop.surveyNo) return;

    setCrops([
      ...crops,
      {
        ...newCrop,
        id: `CROP-0${crops.length + 1}`,
        areaAffectedHa: Number(newCrop.areaAffectedHa) || 1.0,
        annualYieldQuintals: Number(newCrop.annualYieldQuintals) || 20,
        evidenceDoc: 'field_crop_record.pdf'
      }
    ]);

    setIsAdding(false);
    setNewCrop({
      village: 'Petlad',
      surveyNo: '',
      cropName: '',
      season: 'Kharif (Monsoon)',
      irrigationType: 'Canal Irrigated',
      areaAffectedHa: '',
      annualYieldQuintals: '',
      estimatedAnnualLoss: '',
      tenantsInvolved: ''
    });
  };

  return (
    <div className="space-y-4">
      {/* Statutory Guidance */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-start gap-2">
        <Info className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">Section 4(4)(e) Agricultural Assessment: </strong>
          Captures seasonal multi-crop cycles, perennial plantations, and dependent tenant cultivators. 
          Information feeds into SIMP livelihood compensation and mandatory food security compliance assessments.
        </div>
      </div>

      {/* Header and Add Action */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 text-sm">Agricultural Cropping &amp; Land-Use Inventory</div>
          <div className="text-xs text-slate-500">Repeatable seasonal crop entries mapped to surveyed parcels</div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Crop Season</span>
        </button>
      </div>

      {/* Add Crop Inline Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3 text-xs">
          <div className="font-bold text-emerald-950 text-sm">Add Crop &amp; Seasonal Yield Record</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Crop Name *</label>
              <input
                type="text"
                required
                value={newCrop.cropName}
                onChange={(e) => setNewCrop({ ...newCrop, cropName: e.target.value })}
                placeholder="e.g. Cotton (Bt-Hybrid)"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Survey Number *</label>
              <input
                type="text"
                required
                value={newCrop.surveyNo}
                onChange={(e) => setNewCrop({ ...newCrop, surveyNo: e.target.value })}
                placeholder="e.g. 144/A"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Season</label>
              <select
                value={newCrop.season}
                onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              >
                <option value="Kharif (Jun–Nov)">Kharif (Monsoon)</option>
                <option value="Rabi (Nov–Apr)">Rabi (Winter)</option>
                <option value="Zaid (Mar–Jun)">Zaid (Summer)</option>
                <option value="Perennial / Orchard">Perennial / Orchard</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Irrigation Source</label>
              <select
                value={newCrop.irrigationType}
                onChange={(e) => setNewCrop({ ...newCrop, irrigationType: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              >
                <option value="Canal Irrigated">Canal Irrigated (Mahi Network)</option>
                <option value="Tube-well / Borewell">Tube-well / Borewell</option>
                <option value="Rainfed (Non-Irrigated)">Rainfed (Non-Irrigated)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Affected Area (ha)</label>
              <input
                type="number"
                step="0.01"
                value={newCrop.areaAffectedHa}
                onChange={(e) => setNewCrop({ ...newCrop, areaAffectedHa: e.target.value })}
                placeholder="1.20"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Est. Annual Value Loss</label>
              <input
                type="text"
                value={newCrop.estimatedAnnualLoss}
                onChange={(e) => setNewCrop({ ...newCrop, estimatedAnnualLoss: e.target.value })}
                placeholder="₹1,80,000"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-emerald-700 text-white rounded font-semibold hover:bg-emerald-800"
            >
              Save Crop Record
            </button>
          </div>
        </form>
      )}

      {/* Cropping Records Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
              <th className="py-2.5 px-3">Record ID</th>
              <th className="py-2.5 px-3">Survey No.</th>
              <th className="py-2.5 px-3">Crop Variety</th>
              <th className="py-2.5 px-3">Cropping Season</th>
              <th className="py-2.5 px-3">Irrigation Regime</th>
              <th className="py-2.5 px-3 text-right">Area (ha)</th>
              <th className="py-2.5 px-3 text-right">Annual Yield Loss</th>
              <th className="py-2.5 px-3">Dependent Cultivators</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {crops.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">{c.id}</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">{c.surveyNo} ({c.village})</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">{c.cropName}</td>
                <td className="py-2.5 px-3 text-slate-700">{c.season}</td>
                <td className="py-2.5 px-3 text-slate-700">{c.irrigationType}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{c.areaAffectedHa} ha</td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-semibold">{c.estimatedAnnualLoss}</td>
                <td className="py-2.5 px-3 text-slate-600 text-[11px]">{c.tenantsInvolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
