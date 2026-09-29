import React, { useState } from 'react';
import { STRUCTURES_INVENTORY } from '../../../services/siaSurveyService.js';
import { 
  Building2, 
  Plus, 
  Home, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  X,
  Check
} from 'lucide-react';

export default function StructuresSection() {
  const [structures, setStructures] = useState(STRUCTURES_INVENTORY);
  const [isAdding, setIsAdding] = useState(false);
  const [newStructure, setNewStructure] = useState({
    parcelUlpin: '24051234567890',
    surveyNo: '143/A',
    ownerName: '',
    type: 'Pucca Residential House',
    areaSqFt: '',
    condition: 'Good',
    impactStatus: 'Fully Affected',
    gps: '22.5401° N, 72.9288° E',
    enumeratorRemarks: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newStructure.ownerName || !newStructure.areaSqFt) return;

    const assetId = `STR-${String(structures.length + 1).padStart(3, '0')}`;
    setStructures([...structures, {
      ...newStructure,
      assetId,
      areaSqFt: Number(newStructure.areaSqFt),
      constructionYear: 2018,
      estimatedLoss: 'Structural acquisition & compensation under Schedule I'
    }]);

    setIsAdding(false);
    setNewStructure({
      parcelUlpin: '24051234567890',
      surveyNo: '143/A',
      ownerName: '',
      type: 'Pucca Residential House',
      areaSqFt: '',
      condition: 'Good',
      impactStatus: 'Fully Affected',
      gps: '22.5401° N, 72.9288° E',
      enumeratorRemarks: ''
    });
  };

  return (
    <div className="space-y-4">
      {/* Header & Add Button */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 text-sm">Housing &amp; Immovable Structures Inventory</div>
          <div className="text-xs text-slate-500">Record all built structures, residential houses, cattle sheds, and private water borewells</div>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Structure</span>
        </button>
      </div>

      {/* Add Structure Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden">
            <div className="bg-[#1B365D] text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold text-sm">Add Built Structure to Inventory</span>
              <button onClick={() => setIsAdding(false)} className="text-white hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Owner / Possessor *</label>
                  <input
                    type="text"
                    required
                    value={newStructure.ownerName}
                    onChange={(e) => setNewStructure({ ...newStructure, ownerName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Structure Type *</label>
                  <select
                    value={newStructure.type}
                    onChange={(e) => setNewStructure({ ...newStructure, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Pucca Residential House">Pucca Residential House</option>
                    <option value="Semi-Pucca House">Semi-Pucca House</option>
                    <option value="Kutcha Hut / Dwelling">Kutcha Hut / Dwelling</option>
                    <option value="Cattle Shed & Store">Cattle Shed &amp; Store</option>
                    <option value="Commercial Shop / Kiosk">Commercial Shop / Kiosk</option>
                    <option value="Irrigation Borewell & Pump">Irrigation Borewell &amp; Pump</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Plinth Area (Sq Ft) *</label>
                  <input
                    type="number"
                    required
                    value={newStructure.areaSqFt}
                    onChange={(e) => setNewStructure({ ...newStructure, areaSqFt: e.target.value })}
                    placeholder="e.g. 1200"
                    className="w-full border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Impact Extent</label>
                  <select
                    value={newStructure.impactStatus}
                    onChange={(e) => setNewStructure({ ...newStructure, impactStatus: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Fully Affected">Fully Affected (100%)</option>
                    <option value="Partially Affected">Partially Affected</option>
                    <option value="To Be Verified">To Be Verified</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Field Observations / Materials</label>
                <textarea
                  rows={2}
                  value={newStructure.enumeratorRemarks}
                  onChange={(e) => setNewStructure({ ...newStructure, enumeratorRemarks: e.target.value })}
                  placeholder="e.g. Brick walls with tin roof; overhead 1000L water tank..."
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded-lg font-semibold"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of Structures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {structures.map((s) => (
          <div key={s.assetId} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {s.assetId}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{s.type}</h4>
                <div className="text-[11px] text-slate-500 font-mono">
                  Survey No. {s.surveyNo} • ULPIN: {s.parcelUlpin}
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                s.impactStatus === 'Fully Affected'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                {s.impactStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg">
              <div>
                <span className="text-slate-500 text-[10px]">Owner / Occupant:</span>
                <div className="font-semibold text-slate-800">{s.ownerName}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Plinth Area:</span>
                <div className="font-mono font-bold text-slate-900">{s.areaSqFt} sq.ft</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Condition &amp; Year:</span>
                <div className="text-slate-800">{s.condition} ({s.constructionYear})</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">GPS Coordinates:</span>
                <div className="font-mono text-slate-700">{s.gps}</div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-white border border-slate-100 p-2 rounded">
              <span className="font-bold text-slate-700">Observation: </span>
              {s.enumeratorRemarks}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
