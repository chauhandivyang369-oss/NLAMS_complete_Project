import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export default function MapLayerPanel({ 
  baseMap, 
  setBaseMap, 
  layers, 
  toggleLayer, 
  isCollapsed, 
  setIsCollapsed,
  isSidebarMode = false
}) {
  return (
    <div className={
      isSidebarMode
        ? 'w-full h-full bg-white flex flex-col overflow-hidden select-none'
        : `bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg select-none max-h-[380px] flex flex-col overflow-hidden transition-all z-20 ${
            isCollapsed ? 'w-36' : 'w-48'
          }`
    }>
      {/* Header */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 text-xs ${
          isSidebarMode ? 'py-2.5 px-3' : 'py-1.5 px-2.5'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
          <Layers className="w-4 h-4 text-blue-700 shrink-0" />
          <span className="truncate">{isSidebarMode ? 'Map Layers' : 'Layers & Overlays'}</span>
        </div>
        {isCollapsed ? <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
      </div>

      {(!isCollapsed || isSidebarMode) && (
        <div className={`overflow-y-auto divide-y divide-slate-100 text-xs scrollbar-thin flex-1 ${
          isSidebarMode ? 'p-3 space-y-3' : 'p-2 space-y-2.5 max-h-[340px]'
        }`}>
          {/* 1. BASE MAP */}
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
              BASE MAP
            </span>
            <div className="space-y-0.5 pl-0.5">
              {[
                { id: 'osm', label: 'OpenStreetMap' },
                { id: 'esri', label: 'Esri Satellite' },
                { id: 'bhuvan', label: 'ISRO Bhuvan' },
                { id: 'carto', label: 'CARTO Dark' }
              ].map(bm => (
                <label key={bm.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 text-[11px]">
                  <input
                    type="radio"
                    name="baseMap"
                    checked={baseMap === bm.id}
                    onChange={() => setBaseMap(bm.id)}
                    className="w-2.5 h-2.5 text-blue-600 focus:ring-blue-500 shrink-0"
                  />
                  <span className="truncate">{bm.label}</span>
                </label>
              ))}
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 pt-0.5 text-[11px]">
                <input
                  type="checkbox"
                  checked={layers.esriLabels}
                  onChange={() => toggleLayer('esriLabels')}
                  className="w-2.5 h-2.5 text-blue-600 rounded shrink-0"
                />
                <span className="truncate">Esri Labels</span>
              </label>
            </div>
          </div>

          {/* 2. REFERENCE */}
          <div className="pt-2 space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
              REFERENCE
            </span>
            <div className="space-y-0.5 pl-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 text-[10.5px]">
                <input
                  type="checkbox"
                  checked={layers.adminBoundaries}
                  onChange={() => toggleLayer('adminBoundaries')}
                  className="w-2.5 h-2.5 text-blue-600 rounded"
                />
                <span className="truncate">Administrative Boundaries</span>
              </label>
            </div>
          </div>

          {/* 3. CADASTRAL */}
          <div className="pt-2 space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
              CADASTRAL
            </span>
            <div className="space-y-0.5 pl-0.5">
              {[
                { id: 'landParcels', label: 'Land Parcels' },
                { id: 'surveyBoundaries', label: 'Survey Boundaries' },
                { id: 'parcelLabels', label: 'Parcel Labels' },
                { id: 'villageBoundaries', label: 'Village Boundaries' },
                { id: 'tehsilBoundaries', label: 'Tehsil Boundaries' },
                { id: 'districtBoundaries', label: 'District Boundaries' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 text-[10.5px]">
                  <input
                    type="checkbox"
                    checked={layers[item.id]}
                    onChange={() => toggleLayer(item.id)}
                    className="w-2.5 h-2.5 text-blue-600 rounded"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. LAND RECORDS */}
          <div className="pt-2 space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
              LAND RECORDS
            </span>
            <div className="space-y-0.5 pl-0.5">
              {[
                { id: 'ulpinLabels', label: 'ULPIN Labels' },
                { id: 'surveyNumbers', label: 'Survey Numbers' },
                { id: 'landUse', label: 'Land Use' },
                { id: 'landownerInfo', label: 'Landowner Info' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 text-[10.5px]">
                  <input
                    type="checkbox"
                    checked={layers[item.id]}
                    onChange={() => toggleLayer(item.id)}
                    className="w-2.5 h-2.5 text-blue-600 rounded"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. BHUVAN THEMATIC */}
          <div className="pt-2 space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
              BHUVAN THEMATIC
            </span>
            <div className="space-y-0.5 pl-0.5">
              {[
                { id: 'bhuvanLulc', label: 'LULC' },
                { id: 'waterBodies', label: 'Water Bodies' },
                { id: 'floodHazard', label: 'Flood Hazard' },
                { id: 'floodAnnual', label: 'Flood Annual' },
                { id: 'wasteland', label: 'Wasteland' },
                { id: 'landDegradation', label: 'Degradation' },
                { id: 'geomorphology', label: 'Geomorphology' },
                { id: 'lineament', label: 'Lineament' },
                { id: 'urbanLandUse', label: 'Urban Land' },
                { id: 'erosion', label: 'Erosion' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 text-[10.5px]">
                  <input
                    type="checkbox"
                    checked={layers[item.id]}
                    onChange={() => toggleLayer(item.id)}
                    className="w-2.5 h-2.5 text-blue-600 rounded"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. NLAMS PROJECT */}
          <div className="pt-2 space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
              NLAMS PROJECT
            </span>
            <div className="space-y-0.5 pl-0.5">
              {[
                { id: 'projectBoundary', label: 'Project Boundary' },
                { id: 'acquisitionBoundary', label: 'Acquisition Boundary' },
                { id: 'corridorAlignment', label: 'Corridor Alignment' },
                { id: 'rowBuffer', label: 'RoW Buffer' },
                { id: 'affectedParcels', label: 'Affected Parcels' },
                { id: 'acquisitionStatus', label: 'Acquisition Status' },
                { id: 'compensationStatus', label: 'Compensation' },
                { id: 'rnrStatus', label: 'R&R Status' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 text-[10.5px]">
                  <input
                    type="checkbox"
                    checked={layers[item.id]}
                    onChange={() => toggleLayer(item.id)}
                    className="w-2.5 h-2.5 text-blue-600 rounded"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
