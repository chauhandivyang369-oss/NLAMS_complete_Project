import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  UploadCloud, 
  Plus, 
  Trash2, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle,
  Maximize2,
  Building,
  Globe,
  Check
} from 'lucide-react';
import LeafletGisMap from '../../../components/gis/LeafletGisMap.jsx';
import { 
  SEED_CADASTRAL_PARCELS, 
  resolveSelectedParcels, 
  getParcelsForJurisdiction 
} from '../../../services/gisService.js';
import { validateUlpin } from '../../../validators/form1Validators.js';

export default function Step5LandParcelUlpin({ formData, updateFormData, errors }) {
  const [newUlpinInput, setNewUlpinInput] = useState('');
  const [activeTab, setActiveTab] = useState('GIS_STUDIO'); // 'GIS_STUDIO' or 'ULPIN_GRID'

  const selectedUlpins = formData.selectedParcels || ['24051234567890', '24051234567891', '24051234567892', '24051234567893'];

  // All available parcels for selected jurisdiction
  const availableParcels = getParcelsForJurisdiction(
    formData.selectedStates || [formData.selectedState || 'Gujarat'],
    formData.selectedDistricts || ['Anand']
  );

  // Compute live parcel resolution
  const liveResolution = resolveSelectedParcels(selectedUlpins);

  const syncParcels = (updatedUlpins) => {
    const resolved = resolveSelectedParcels(updatedUlpins);
    updateFormData({
      selectedParcels: updatedUlpins,
      ulpinsList: updatedUlpins,
      gisSummary: {
        selectedParcels: resolved.totalCount,
        totalAreaAcres: resolved.totalAreaAcres,
        totalAreaHa: resolved.totalAreaHa,
        affectedVillages: resolved.affectedVillages,
        affectedDistricts: resolved.affectedDistricts,
        affectedStates: resolved.affectedStates,
        alignmentMatchPct: 100
      }
    });
  };

  // Handle map selection confirmation
  const handleMapConfirm = (confirmedUlpins) => {
    syncParcels(confirmedUlpins);
  };

  // Add individual ULPIN
  const handleAddUlpin = (e) => {
    e.preventDefault();
    const clean = newUlpinInput.trim();
    if (!clean) return;

    if (!validateUlpin(clean)) {
      alert('ULPIN must be exactly 14 digits numeric code compliant with Department of Land Resources (DoLR) standard.');
      return;
    }

    if (selectedUlpins.includes(clean)) {
      alert('ULPIN is already included in active acquisition list.');
      return;
    }

    const updated = [...selectedUlpins, clean];
    syncParcels(updated);
    setNewUlpinInput('');
  };

  const handleRemoveUlpin = (ulpinToRemove) => {
    const updated = selectedUlpins.filter(u => u !== ulpinToRemove);
    syncParcels(updated);
  };

  const handleToggleParcel = (ulpin) => {
    const exists = selectedUlpins.includes(ulpin);
    const updated = exists 
      ? selectedUlpins.filter(u => u !== ulpin)
      : [...selectedUlpins, ulpin];
    syncParcels(updated);
  };

  const handleSelectAllAvailable = () => {
    const allUlpins = availableParcels.map(p => p.ulpin);
    const merged = [...new Set([...selectedUlpins, ...allUlpins])];
    syncParcels(merged);
  };

  const handleClearAll = () => {
    syncParcels([]);
  };

  return (
    <div className="space-y-4 text-slate-800">
      {/* Header with Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-700" />
            Step 5: Land Parcel & ULPIN (Cadastral GIS Studio)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingest project corridor, select authoritative cadastral parcels across aligned districts & states, and generate statutory 14-digit ULPIN schedule.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('GIS_STUDIO')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              activeTab === 'GIS_STUDIO'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Interactive GIS Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ULPIN_GRID')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              activeTab === 'ULPIN_GRID'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ULPIN Schedule & Khasra Grid ({selectedUlpins.length})
          </button>
        </div>
      </div>

      {/* Live Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-3 text-xs">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Selected Parcels</span>
          <span className="text-base font-bold text-blue-950">{liveResolution.totalCount} Parcels</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total Land Extent</span>
          <span className="text-base font-bold text-emerald-800">
            {liveResolution.totalAreaAcres} Acres <span className="text-xs font-normal text-slate-600">({liveResolution.totalAreaHa} Ha)</span>
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Districts Covered</span>
          <span className="text-xs font-bold text-slate-800">
            {liveResolution.affectedDistricts.join(', ') || 'Anand'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Jurisdiction States</span>
          <span className="text-xs font-bold text-slate-800">
            {liveResolution.affectedStates.join(', ') || 'Gujarat'}
          </span>
        </div>
      </div>

      {errors?.selectedParcels && (
        <div className="bg-red-50 border border-red-200 rounded-md p-2.5 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errors.selectedParcels}</span>
        </div>
      )}

      {/* VIEW 1: FULL INTERACTIVE GIS STUDIO */}
      {activeTab === 'GIS_STUDIO' && (
        <div className="space-y-3">
          <LeafletGisMap
            initialSelectedUlpins={selectedUlpins}
            onConfirmSelection={handleMapConfirm}
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-md">
            <span>
              💡 <strong>Cadastral Interaction:</strong> Click any cadastral polygon to view RoR 7/12 ownership dossier, statutory status, and buffer overlap. Use checkboxes in bottom table to update parcels.
            </span>
            <span className="font-mono text-slate-700">
              Corridor Alignment • Cadastre Layer Synced
            </span>
          </div>
        </div>
      )}

      {/* VIEW 2: ULPIN SCHEDULE & KHASRA GRID */}
      {activeTab === 'ULPIN_GRID' && (
        <div className="space-y-5 bg-white border border-slate-200 rounded-lg p-4">
          {/* Add ULPIN bar */}
          <form onSubmit={handleAddUlpin} className="flex flex-wrap items-center gap-2">
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                maxLength={14}
                value={newUlpinInput}
                onChange={(e) => setNewUlpinInput(e.target.value)}
                placeholder="Enter 14-Digit Standard ULPIN (e.g. 24051234567890)"
                className="w-full text-xs font-mono border border-slate-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="text-xs px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add ULPIN
            </button>
            <button
              type="button"
              onClick={handleSelectAllAvailable}
              className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-blue-700" /> Select All Aligned Cadastral Parcels
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-semibold rounded-md border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" /> Clear All
            </button>
          </form>

          {/* Active ULPIN Tag Cloud */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Authoritative ULPIN Identifiers ({selectedUlpins.length})</span>
              <span className="text-slate-500 font-normal">Click &times; to remove any parcel from acquisition schedule</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedUlpins.map((ulpin) => {
                const p = liveResolution.resolvedParcels.find(x => x.ulpin === ulpin);
                return (
                  <div
                    key={ulpin}
                    className="bg-blue-50 border border-blue-200 text-blue-900 px-2.5 py-1 rounded-md text-xs font-mono font-semibold flex items-center gap-2 shadow-2xs"
                  >
                    <span>{ulpin}</span>
                    {p && (
                      <span className="bg-blue-200 text-blue-800 text-[10px] px-1 rounded font-sans">
                        {p.district} ({p.surveyNo})
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveUlpin(ulpin)}
                      className="text-slate-400 hover:text-red-600 transition-colors font-bold text-sm cursor-pointer"
                      title="Remove ULPIN"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Master Available Parcels Selection Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Available Cadastral Parcels in Selected Jurisdiction ({availableParcels.length})</span>
              <span className="text-[11px] text-slate-500 font-normal">Toggle checkboxes to include/exclude parcels in statutory docket</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 w-8">Select</th>
                    <th className="py-2.5 px-3">State / District</th>
                    <th className="py-2.5 px-3">ULPIN</th>
                    <th className="py-2.5 px-3">Survey / Khasra No.</th>
                    <th className="py-2.5 px-3">Village</th>
                    <th className="py-2.5 px-3 text-right">Extent (Acres)</th>
                    <th className="py-2.5 px-3 text-right">Extent (Ha)</th>
                    <th className="py-2.5 px-3">Land Classification</th>
                    <th className="py-2.5 px-3">Primary Owner / RoR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {availableParcels.map((p) => {
                    const isChecked = selectedUlpins.includes(p.ulpin);
                    return (
                      <tr key={p.ulpin} className={`hover:bg-slate-50 transition-colors ${isChecked ? 'bg-blue-50/40' : ''}`}>
                        <td className="py-2 px-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleParcel(p.ulpin)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900">{p.district}</div>
                          <div className="text-[10px] text-slate-500">{p.state}</div>
                        </td>
                        <td className="py-2 px-3 font-mono font-semibold text-slate-900">{p.ulpin}</td>
                        <td className="py-2 px-3 font-bold text-blue-900">{p.surveyNo}</td>
                        <td className="py-2 px-3 text-slate-700">{p.village}</td>
                        <td className="py-2 px-3 text-right font-medium">{p.totalAreaAcre}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600">{p.areaHa}</td>
                        <td className="py-2 px-3 text-slate-700">{p.landUse}</td>
                        <td className="py-2 px-3 text-slate-800 text-[11px]">
                          {p.owners?.[0]?.name || 'Recorded Landowner'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
