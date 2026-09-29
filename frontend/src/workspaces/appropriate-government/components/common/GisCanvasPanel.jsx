import React from 'react';
import { Compass } from 'lucide-react';
import LeafletGisMap from '../../../../components/gis/LeafletGisMap.jsx';

export default function GisCanvasPanel({
  jurisdiction = 'CENTRAL',
  project = null,
  parcels = [],
  onSelectParcel,
  showLandBank = false
}) {
  const isCentral = jurisdiction === 'CENTRAL';

  return (
    <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-xs space-y-3">
      {/* GIS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
        <div>
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#C5A059]" />
            {isCentral ? 'National Spatial GIS Canvas (Multi-State Alignment)' : 'State Bhu-Naksha Cadastral Spatial Canvas'}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {isCentral
              ? 'Multi-state corridor segmentation, geo-referenced alignment & inter-state CALA mapping'
              : 'Cadastral parcel boundaries, Jamabandi RoR integration & Section 101 Land Bank tracking'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
            PostGIS Connected
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200">
            EPSG: 4326
          </span>
        </div>
      </div>

      {/* Cadastral Interactive GIS Studio */}
      <LeafletGisMap
        onSelectParcel={(p) => {
          if (onSelectParcel) {
            onSelectParcel(p.id || p.ulpin);
          }
        }}
        onConfirmSelection={(ulpins, selectedList) => {
          if (onSelectParcel && selectedList?.[0]) {
            onSelectParcel(selectedList[0].id || selectedList[0].ulpin);
          }
        }}
      />
    </div>
  );
}
