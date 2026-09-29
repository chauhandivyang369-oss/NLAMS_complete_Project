import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Info, 
  Maximize2, 
  Eye, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { SEED_CADASTRAL_PARCELS } from '../../../services/gisService.js';
import { IEG_PROJECT_CONTEXT } from '../../../services/iegService.js';
import SiaOverviewMap from '../SiaOverviewMap.jsx';

export default function IegGisReviewTab({ 
  onInspectParcel, 
  onViewEvidence, 
  onFlagDiscrepancy 
}) {
  const [layers, setLayers] = useState({
    projectBoundary: true,
    affectedParcels: true,
    landowners: true,
    families: true,
    displacement: true,
    communityAssets: true,
    roads: true,
    water: true,
    schools: true,
    religiousSites: true,
    publicFacilities: true
  });

  const [selectedParcel, setSelectedParcel] = useState(SEED_CADASTRAL_PARCELS[0] || null);

  const toggleLayer = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 text-xs">
      
      {/* 1. Spatial Area Comparison & Potential Discrepancy Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1B365D]" />
            <h4 className="font-bold text-slate-900 text-xs">
              GIS Spatial Verification &amp; Cadastral Boundary Audit
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            PostGIS Post-Processed Boundary vs SIA Narrative
          </span>
        </div>

        {/* Spatial Comparison Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <span className="text-slate-500 block text-[10px]">SIA Reported Area:</span>
            <strong className="text-slate-900 text-sm">{IEG_PROJECT_CONTEXT.totalAcquisitionAreaHa} Ha</strong>
            <span className="text-[10px] text-slate-400 block font-sans">Chapter 1 Narrative</span>
          </div>

          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
            <span className="text-blue-700 block text-[10px]">GIS Cadastral Polygon Area:</span>
            <strong className="text-[#1B365D] text-sm">{IEG_PROJECT_CONTEXT.gisLinkedAreaHa} Ha</strong>
            <span className="text-[10px] text-blue-600 block font-sans">214 Polygons Digitized</span>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-300 rounded">
            <span className="text-amber-800 block text-[10px]">Spatial Difference:</span>
            <strong className="text-amber-900 text-sm">{IEG_PROJECT_CONTEXT.gisAreaDiscrepancyHa} Ha</strong>
            <span className="text-[10px] text-amber-700 block font-sans">Potential Discrepancy</span>
          </div>

          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
            <span className="text-emerald-800 block text-[10px]">Reconciliation Status:</span>
            <strong className="text-emerald-900 text-xs font-bold block">Resolved (Yard Land)</strong>
            <span className="text-[10px] text-emerald-700 block font-sans">Existing Railway Land</span>
          </div>
        </div>

        {/* Discrepancy Notice */}
        <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded flex items-start gap-2 text-[11px] text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>IEG Spatial Observation Note:</strong> The 2.50 Ha variance corresponds to existing operational railway yard buffers at Petlad Junction. Western Railway confirmed it is government land already in possession. Net private acquisition to be notified under Section 11 is strictly <strong>247.90 Ha</strong>.
          </div>
        </div>
      </div>

      {/* 2. Leaflet Spatial Canvas & Layer Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        
        {/* Layer Controls & Selection Panel (1 Col) */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-3">
          <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1.5 flex items-center justify-between">
            <span>Spatial Review Layers</span>
            <span className="text-[10px] font-mono text-slate-500">11 Active</span>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {[
              { id: 'projectBoundary', label: 'Project Right-of-Way (45m)', color: 'text-purple-700' },
              { id: 'affectedParcels', label: '214 Cadastral Parcels', color: 'text-blue-700' },
              { id: 'landowners', label: 'Registered Landowners', color: 'text-slate-800' },
              { id: 'families', label: 'Affected Families (500)', color: 'text-amber-700' },
              { id: 'displacement', label: 'Displacement Clusters (42)', color: 'text-red-700' },
              { id: 'communityAssets', label: 'Community Assets (28)', color: 'text-emerald-700' },
              { id: 'roads', label: 'Roads & Cart Tracks', color: 'text-slate-600' },
              { id: 'water', label: 'Canals & Water Bodies', color: 'text-cyan-700' },
              { id: 'schools', label: 'Schools & Anganwadis', color: 'text-indigo-700' },
              { id: 'religiousSites', label: 'Cremation & Religious Sites', color: 'text-rose-700' },
              { id: 'publicFacilities', label: 'Panchayat & Public Utilities', color: 'text-teal-700' }
            ].map((layer) => (
              <label 
                key={layer.id}
                className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer select-none text-[11px]"
              >
                <input
                  type="checkbox"
                  checked={layers[layer.id]}
                  onChange={() => toggleLayer(layer.id)}
                  className="rounded cursor-pointer"
                />
                <span className={`font-medium ${layer.color}`}>{layer.label}</span>
              </label>
            ))}
          </div>

          {/* Selected Parcel Inspector */}
          {selectedParcel && (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center font-mono">
                <span className="text-slate-500">Selected Parcel:</span>
                <strong className="text-[#1B365D]">{selectedParcel.surveyNo || '142/A'}</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">ULPIN:</span>
                <span className="text-slate-800">{selectedParcel.ulpin || '24051234567890'}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Village:</span>
                <span>{selectedParcel.village || 'Petlad'}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Affected Extent:</span>
                <strong>{selectedParcel.affectedAreaHa || '1.85'} Ha</strong>
              </div>

              <div className="pt-2 flex flex-col gap-1">
                <button
                  onClick={() => onInspectParcel && onInspectParcel(selectedParcel)}
                  className="w-full py-1 bg-[#1B365D] hover:bg-[#152a48] text-white rounded text-[10px] font-bold cursor-pointer"
                >
                  Inspect Parcel Dossier
                </button>
                <button
                  onClick={() => onViewEvidence && onViewEvidence('EV-1098')}
                  className="w-full py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded text-[10px] font-bold cursor-pointer"
                >
                  View 7/12 RoR Evidence
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Embedded Leaflet Map Stage (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex flex-col h-[520px]">
          <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Petlad-Sunav-Nar Spatial Alignment Map (PostGIS Engine)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 font-normal">
              Click parcel to inspect geometry &amp; family linkage
            </span>
          </div>

          <div className="flex-1 relative w-full h-full">
            <SiaOverviewMap />
          </div>
        </div>

      </div>

    </div>
  );
}
