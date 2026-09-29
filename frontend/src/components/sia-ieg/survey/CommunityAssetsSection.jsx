import React, { useState } from 'react';
import { COMMUNITY_ASSETS } from '../../../services/siaSurveyService.js';
import { 
  Building, 
  MapPin, 
  Droplets, 
  AlertTriangle, 
  Plus, 
  X, 
  FileText, 
  Check, 
  ShieldAlert,
  Zap,
  Info
} from 'lucide-react';

export default function CommunityAssetsSection() {
  const [assets, setAssets] = useState(COMMUNITY_ASSETS);
  const [isAdding, setIsAdding] = useState(false);
  const [newAsset, setNewAsset] = useState({
    category: 'Drinking Water',
    name: '',
    village: 'Petlad',
    location: '',
    communityServed: '',
    impactType: 'Access Impact',
    severity: 'Medium',
    alternativeAvailability: '',
    enumeratorRemarks: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAsset.name) return;

    const assetId = `COMM-00${assets.length + 1}`;
    setAssets([...assets, {
      ...newAsset,
      assetId,
      gps: '22.5350° N, 72.9300° E',
      currentCondition: 'Functional',
      evidenceFile: 'comm_asset_photo.jpg'
    }]);

    setIsAdding(false);
    setNewAsset({
      category: 'Drinking Water',
      name: '',
      village: 'Petlad',
      location: '',
      communityServed: '',
      impactType: 'Access Impact',
      severity: 'Medium',
      alternativeAvailability: '',
      enumeratorRemarks: ''
    });
  };

  return (
    <div className="space-y-4">
      {/* Statutory Guidance */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-amber-900 font-semibold">Community &amp; Common Property Resources (CPR) Safeguard: </strong>
          Under Section 4(4)(f) of RFCTLARR Act 2013, all communal grazing lands, cremation grounds, drinking water networks, 
          and Anganwadi health centres severed or displaced must have concrete replacement infrastructure designed into the 
          Social Impact Management Plan (SIMP) prior to Section 7 IEG appraisal.
        </div>
      </div>

      {/* Header and Add Action */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 text-sm">Community Assets &amp; Public Infrastructure Registry</div>
          <div className="text-xs text-slate-500">Inventory of common property resources, public utilities, and community services</div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Community Asset</span>
        </button>
      </div>

      {/* Add Asset Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden">
            <div className="bg-[#1B365D] text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold text-sm">Record Public / Community Asset</span>
              <button onClick={() => setIsAdding(false)} className="text-white hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Asset Category *</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5"
                  >
                    <option value="Drinking Water">Drinking Water (Borewell / GLSR)</option>
                    <option value="Anganwadi">Anganwadi / ICDS Centre</option>
                    <option value="Cremation Ground">Cremation / Burial Ground</option>
                    <option value="Grazing Land">Gauchar / Grazing Land</option>
                    <option value="School">Primary / Secondary School</option>
                    <option value="Road / Access">Village Approach Road / Culvert</option>
                    <option value="Electricity">HT / LT Power Distribution Line</option>
                    <option value="Place of Worship">Place of Worship / Shrine</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Asset Name *</label>
                  <input
                    type="text"
                    required
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    placeholder="e.g. Ward 4 Community Tubewell"
                    className="w-full border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village &amp; Location</label>
                  <input
                    type="text"
                    value={newAsset.location}
                    onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })}
                    placeholder="e.g. Near Railway Crossing Ch. 12+400"
                    className="w-full border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Impact Type</label>
                  <select
                    value={newAsset.impactType}
                    onChange={(e) => setNewAsset({ ...newAsset, impactType: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5"
                  >
                    <option value="Full Impact">Full Impact (Demolition / Relocation)</option>
                    <option value="Partial Impact">Partial Impact (Boundary affected)</option>
                    <option value="Access Impact">Access Severance (Underpass needed)</option>
                    <option value="Service Disruption Risk">Service Disruption Risk</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Community Served / Beneficiaries</label>
                <input
                  type="text"
                  value={newAsset.communityServed}
                  onChange={(e) => setNewAsset({ ...newAsset, communityServed: e.target.value })}
                  placeholder="e.g. Approx 180 families in Demol South ward"
                  className="w-full border border-slate-300 rounded p-1.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Proposed Relocation / Mitigation Alternative</label>
                <textarea
                  rows={2}
                  value={newAsset.alternativeAvailability}
                  onChange={(e) => setNewAsset({ ...newAsset, alternativeAvailability: e.target.value })}
                  placeholder="e.g. Gaothan parcel available 200m north; cost to be included in SIMP budget"
                  className="w-full border border-slate-300 rounded p-1.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {assets.map((asset) => (
          <div key={asset.assetId} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {asset.assetId} • {asset.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{asset.name}</h4>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{asset.village} — {asset.location}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                asset.impactType.includes('Full') 
                  ? 'bg-rose-100 text-rose-800 border-rose-300' 
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                {asset.impactType}
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 text-xs space-y-1.5">
              <div>
                <span className="text-slate-500 text-[11px]">Community Served: </span>
                <span className="text-slate-800 font-medium">{asset.communityServed}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Severity: </span>
                <span className="text-rose-700 font-semibold">{asset.severity}</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5">
                <span className="text-slate-500 text-[11px]">Relocation / Mitigation Strategy: </span>
                <div className="text-slate-900 font-medium mt-0.5">{asset.alternativeAvailability}</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 bg-white border border-slate-100 p-2 rounded flex items-start gap-1.5">
              <span className="font-bold text-slate-700 shrink-0">SIA Note:</span>
              <span>{asset.enumeratorRemarks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
