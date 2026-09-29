import React, { useState } from 'react';
import { 
  CheckCircle2, 
  FileText, 
  SlidersHorizontal
} from 'lucide-react';
import LeafletGisMap from './LeafletGisMap.jsx';

export default function GisOverviewView({ 
  onSelectParcel, 
  onOpenLayers, 
  onOpenValidation 
}) {
  const [selectedProposal, setSelectedProposal] = useState('NLAMS-RB-2026-00124 — National Highway Corridor');
  const [selectedDistrict, setSelectedDistrict] = useState('Ahmedabad');
  const [selectedVillage, setSelectedVillage] = useState('All Villages');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Layer visibility toggles
  const [layerBaseStreet, setLayerBaseStreet] = useState(true);
  const [layerCadastre, setLayerCadastre] = useState(true);
  const [layerRow, setLayerRow] = useState(true);
  const [layerDem, setLayerDem] = useState(false);

  return (
    <div className="space-y-3.5">
      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          <div className="lg:col-span-5">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              ACQUISITION PROPOSAL *
            </label>
            <select 
              value={selectedProposal}
              onChange={(e) => setSelectedProposal(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="NLAMS-RB-2026-00124 — National Highway Corridor">
                NLAMS-RB-2026-00124 — National Highway Corridor
              </option>
              <option value="NLAMS-RB-2026-00088 — Dedicated Freight Corridor">
                NLAMS-RB-2026-00088 — Dedicated Freight Corridor
              </option>
              <option value="NLAMS-RB-2026-00215 — Narmada Canal Extension">
                NLAMS-RB-2026-00215 — Narmada Canal Extension
              </option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              DISTRICT
            </label>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Anand">Anand</option>
              <option value="Kheda">Kheda</option>
              <option value="Vadodara">Vadodara</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              VILLAGE
            </label>
            <select 
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All Villages">All Villages (8 Villages)</option>
              <option value="Sanand Rural">Sanand Rural (LGD: 474)</option>
              <option value="Petlad">Petlad (LGD: 489)</option>
              <option value="Sunav">Sunav (LGD: 502)</option>
              <option value="Agas">Agas (LGD: 512)</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              STATUS
            </label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All Statuses">All Statuses (1,842)</option>
              <option value="Verified">Verified / Acquired (1,240)</option>
              <option value="Under Acquisition">Under Acquisition (562)</option>
              <option value="Issues">Validation Issues (40)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Side Controls Card */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12">
        {/* Left 9 Cols: Full Interactive Cadastral Leaflet GIS Studio */}
        <div className="lg:col-span-9 relative bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between overflow-hidden">
          <LeafletGisMap
            onSelectParcel={(parcel) => {
              if (onSelectParcel) {
                onSelectParcel(parcel.ulpin || parcel.surveyNo || '142/2');
              }
            }}
          />
        </div>

        {/* Right 3 Cols: Proposal Info, Validation & Layer Visibility Controls */}
        <div className="lg:col-span-3 p-4 bg-white flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header: Current Proposal */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  CURRENT PROPOSAL
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  VALIDATED
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                National Highway Corridor
              </h3>
            </div>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">PROPOSAL ID</span>
                <div className="font-bold text-slate-800 font-mono mt-0.5">RB-2026-00124</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">JURISDICTION</span>
                <div className="font-semibold text-slate-800 mt-0.5">Gujarat (4 Dist.)</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">LAND PROPOSED</span>
                <div className="font-bold text-slate-900 font-mono mt-0.5 text-sm">324.50 Ha</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">TOTAL PARCELS</span>
                <div className="font-bold text-slate-900 font-mono mt-0.5 text-sm">1,842</div>
              </div>
            </div>

            {/* Topological Check Card */}
            <div 
              onClick={onOpenValidation}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded p-2.5 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Topological Check</div>
                  <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    All cadastre polygons topologically verified against state revenue records (AnyRoR Gujarat).
                  </div>
                </div>
              </div>
            </div>

            {/* View Parcel Details Button */}
            <button 
              onClick={() => onSelectParcel('142/2')}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 py-2 rounded text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>View Parcel Details</span>
            </button>

            {/* Layer Visibility Section */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  LAYER VISIBILITY
                </span>
                <button onClick={onOpenLayers} className="text-slate-400 hover:text-slate-600" title="Configure layers">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900">
                    <span className="w-3 h-3 rounded-xs border border-slate-400 flex items-center justify-center text-[10px]">
                      🗺️
                    </span>
                    <span>Base Street (Bhuvan/OSM)</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={layerBaseStreet} 
                    onChange={(e) => setLayerBaseStreet(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer" 
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900">
                    <span className="w-3 h-3 bg-blue-900 rounded-xs"></span>
                    <span>Cadastre Parcels Layer</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={layerCadastre} 
                    onChange={(e) => setLayerCadastre(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer" 
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900">
                    <span className="w-3 h-0.5 bg-blue-600"></span>
                    <span>RoW Alignment Polyline</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={layerRow} 
                    onChange={(e) => setLayerRow(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer" 
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900">
                    <span className="w-3 h-3 border border-slate-400 rounded-xs"></span>
                    <span>Digital Elevation (DEM)</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={layerDem} 
                    onChange={(e) => setLayerDem(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer" 
                  />
                </label>
              </div>
            </div>

            {/* Spatial Audit Feed */}
            <div>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider pb-1.5 border-b border-slate-100 mb-2">
                SPATIAL AUDIT FEED
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">14:15 IST</span>
                    <p className="text-slate-700 text-[11px] leading-tight">
                      Survey Team synced 148 parcels in Sanand
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1"></span>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">11:30 IST</span>
                    <p className="text-slate-700 text-[11px] leading-tight">
                      Geometry anomaly flagged on KH-142/B
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">09:10 IST</span>
                    <p className="text-slate-700 text-[11px] leading-tight">
                      RoW corridor width confirmed at 60m
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
