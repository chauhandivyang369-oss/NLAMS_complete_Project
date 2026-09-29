import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  FileSpreadsheet,
  FileCheck2,
  ArrowRight
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalLandCadastreTab() {
  const { setActiveModule, showToast } = useWorkspace();
  const [selectedTehsil, setSelectedTehsil] = useState('All Tehsils');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchParcel, setSearchParcel] = useState('');

  const parcels = [
    { ulpin: 'GJ-AMD-042-88192', khasra: '142/2A', village: 'Sanand Rural', tehsil: 'Sanand, Ahmedabad', area: '0.420', class: 'Agri - Irrigated', status: 'Acquired' },
    { ulpin: 'GJ-AMD-042-88193', khasra: '142/2B', village: 'Sanand Rural', tehsil: 'Sanand, Ahmedabad', area: '0.680', class: 'Agri - Non-Irrig', status: 'Acquired' },
    { ulpin: 'GJ-AMD-019-45012', khasra: '189/1', village: 'Bavla Gamtal', tehsil: 'Bavla, Ahmedabad', area: '1.150', class: 'NA - Commercial', status: 'In Process' },
    { ulpin: 'GJ-MEH-108-98214', khasra: '204', village: 'Kadi West', tehsil: 'Kadi, Mehsana', area: '0.930', class: 'Agri - Irrigated', status: 'Objection' },
    { ulpin: 'GJ-MEH-108-99215', khasra: '218/P', village: 'Kadi West', tehsil: 'Kadi, Mehsana', area: '0.310', class: 'Govt Waste (Sarkari)', status: 'Acquired' },
    { ulpin: 'GJ-AMD-077-11209', khasra: '302/1', village: 'Detroj Ext.', tehsil: 'Detroj, Ahmedabad', area: '1.840', class: 'Agri - Irrigated', status: 'In Process' },
    { ulpin: 'GJ-AMD-077-11210', khasra: '302/2', village: 'Detroj Ext.', tehsil: 'Detroj, Ahmedabad', area: '0.760', class: 'Agri - Irrigated', status: 'In Process' },
  ];

  return (
    <div className="flex flex-col xl:flex-row">
      
      {/* Main Column */}
      <div className="flex-1 p-5 space-y-5">
        
        {/* Top 6 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Total Proposed */}
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL PROPOSED</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">324.50 Ha</div>
            <div className="text-[10px] text-slate-500">100% baseline req.</div>
          </div>

          {/* Total Acquired */}
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL ACQUIRED</div>
            <div className="text-xl font-bold text-emerald-700 font-sans mt-0.5">218.40 Ha</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full w-[67.3%]"></div>
            </div>
          </div>

          {/* Remaining Land */}
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">REMAINING LAND</div>
            <div className="text-xl font-bold text-amber-700 font-sans mt-0.5">106.10 Ha</div>
            <div className="text-[10px] text-slate-500">32.7% pending award</div>
          </div>

          {/* Total Parcels */}
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL PARCELS</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">1,842 Plots</div>
            <div className="text-[10px] text-emerald-600 font-medium">100% ULPIN assigned</div>
          </div>

          {/* Affected Villages */}
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AFFECTED VILLAGES</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">17 Villages</div>
            <div className="text-[10px] text-slate-500">Gram Sabhas notified</div>
          </div>

          {/* Total Districts */}
          <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL DISTRICTS</div>
            <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">4 Districts</div>
            <div className="text-[10px] text-slate-500">AMD, MEH, PAT, BAN</div>
          </div>

        </div>

        {/* GIS Canvas & Cadastre Integrity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Corridor Cadastral Canvas (2 cols) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Corridor Cadastral Canvas
                </h3>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200">
                  LGD VECTOR EPSG:4326
                </span>
              </div>

              <button 
                onClick={() => setActiveModule('gis-canvas')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Open in GIS Spatial Canvas</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Vector GIS Simulation */}
            <div className="relative h-64 bg-[#0a192f] rounded-lg border border-slate-300 overflow-hidden flex flex-col justify-between p-3">
              
              {/* Map Controls */}
              <div className="flex items-center justify-between z-10">
                <div className="bg-slate-900/80 backdrop-blur-xs text-white border border-slate-700 px-2 py-1 rounded text-[10px] font-mono">
                  SCALE: 1:5,000 • GUJARAT SURVEY GRID
                </div>

                <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs border border-slate-700 rounded p-0.5 text-white">
                  <button className="p-1 hover:bg-slate-800 rounded"><ZoomIn className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:bg-slate-800 rounded"><ZoomOut className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:bg-slate-800 rounded"><Maximize2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {/* Vector Alignment SVG Graphic */}
              <svg className="absolute inset-0 w-full h-full opacity-90" viewBox="0 0 600 240">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Highway corridor buffer */}
                <path d="M 30 180 Q 200 120, 320 150 T 570 60" fill="none" stroke="#2563eb" strokeWidth="24" strokeOpacity="0.25" strokeLinecap="round" />
                <path d="M 30 180 Q 200 120, 320 150 T 570 60" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="6,4" />

                {/* Cadastral Polygon Boundaries */}
                <polygon points="120,130 160,115 175,145 130,160" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
                <polygon points="160,115 210,100 225,130 175,145" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
                <polygon points="210,100 260,110 270,140 225,130" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="260,110 310,130 320,165 270,140" fill="#ef4444" fillOpacity="0.5" stroke="#ef4444" strokeWidth="1.5" />
                <polygon points="310,130 370,135 375,170 320,165" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
                <polygon points="370,135 430,110 435,140 375,170" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="430,110 490,75 500,105 435,140" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />

                {/* Village Markers */}
                <circle cx="150" cy="140" r="4" fill="#10b981" />
                <text x="150" y="165" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Sanand</text>

                <circle cx="280" cy="145" r="4" fill="#ef4444" />
                <text x="280" y="180" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Kadi West [Stay]</text>

                <circle cx="420" cy="130" r="4" fill="#f59e0b" />
                <text x="420" y="155" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Detroj</text>

                <circle cx="500" cy="80" r="4" fill="#10b981" />
                <text x="500" y="70" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Bavla</text>
              </svg>

              {/* Map Footer & Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 z-10 pt-2 border-t border-slate-700/60 text-[10px]">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Acquired (1,240)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>In Process (562)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>Objection / Stay (40)</span>
                  </div>
                </div>

                <div className="text-slate-400 font-mono">
                  High-Res CartoSat-3 Baseline • Span: CH 12+400 to CH 74+250 (61.85 Km)
                </div>
              </div>

            </div>
          </div>

          {/* Statutory Cadastre Integrity (1 col) */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Statutory Cadastre Integrity
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                98.4% VERIFIED
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">GIS Geometry &amp; Topo-Clean</span>
                  <span className="text-[10px] font-bold text-emerald-700">PASSED</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Zero self-intersections or sliver polygons found across 1,842 parcels.
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">Revenue Cadastral Cross-Referencing</span>
                  <span className="text-[10px] font-bold text-emerald-700">PASSED</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Cross-checked with Gujarat Revenue Village Cadastral maps Form 7/12.
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">ULPIN Mapping (14-Digit Geo-Tag)</span>
                  <span className="font-mono font-bold text-slate-800 text-[10px]">1,842 / 1,842</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  All requisition parcels mapped to National Bhu-Aadhaar registry.
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">RoR Area Reconciliation</span>
                  <span className="text-[10px] font-bold text-amber-700">2 Discrepancies</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  99.89% area match; 2 parcels in Kadi tehsil undergoing SDM joint survey.
                </div>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">LGD Boundary Compliance</span>
                  <span className="text-[10px] font-bold text-emerald-700">COMPLIANT</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Aligned with Local Government Directory boundary definitions.
                </div>
              </div>
            </div>

            <button 
              onClick={() => showToast('Downloading SLA Joint Survey Form-4 Certified PDF')}
              className="w-full bg-[#0b1b36] hover:bg-[#16294a] text-white py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>SLA Joint Survey Form-4 [Download Sign-off]</span>
            </button>
          </div>

        </div>

        {/* Cadastral Parcels Register Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Cadastral Parcels Register
              </h3>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                1,842 Plots
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="relative">
                <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter Khasra / ULPIN"
                  value={searchParcel}
                  onChange={(e) => setSearchParcel(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded pl-7 pr-2 py-1 text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <select 
                value={selectedTehsil}
                onChange={(e) => setSelectedTehsil(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option>All Tehsils</option>
                <option>Sanand</option>
                <option>Kadi</option>
                <option>Detroj</option>
                <option>Bavla</option>
              </select>

              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option>All Statuses</option>
                <option>Acquired</option>
                <option>In Process</option>
                <option>Objection</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b1b36] text-white text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-mono">ULPIN</th>
                  <th className="py-2.5 px-4">SURVEY / KHASRA</th>
                  <th className="py-2.5 px-4">VILLAGE</th>
                  <th className="py-2.5 px-4">TEHSIL / DISTRICT</th>
                  <th className="py-2.5 px-4">AREA (HA)</th>
                  <th className="py-2.5 px-4">CLASSIFICATION</th>
                  <th className="py-2.5 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parcels.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-800">{p.ulpin}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{p.khasra}</td>
                    <td className="py-2.5 px-4 text-slate-700">{p.village}</td>
                    <td className="py-2.5 px-4 text-slate-600">{p.tehsil}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{p.area}</td>
                    <td className="py-2.5 px-4 text-slate-600">{p.class}</td>
                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === 'Acquired' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : p.status === 'In Process'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
            <span>Showing 1-7 of 1,842 Parcels • Total Register Area: 324.500 Ha</span>
            <button 
              onClick={() => showToast('Exporting Cadastral Land Register (Excel/CSV)...')}
              className="text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1 text-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Full Cadastre</span>
            </button>
          </div>

        </div>

      </div>

      {/* Cadastre Right Sidebar */}
      <div className="w-full xl:w-[320px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-4 space-y-4 shrink-0 shadow-xs text-slate-800">
        
        {/* Action Required */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Action Required</span>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 rounded">2 Pending</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-900 text-[11px]">Boundary Overlap Resolved</div>
              <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                Survey #142/2A and adjacent irrigation canal buffer overlap resolved via DGPS drone GCP adjustment.
              </p>
              <div className="text-[9px] text-slate-400 mt-1">Approved by: Land Acq Officer</div>
            </div>

            <div className="p-2 rounded bg-rose-50/70 border border-rose-200">
              <div className="font-bold text-rose-900 text-[11px]">2 Discrepancies Flagged</div>
              <p className="text-[10px] text-rose-800 mt-0.5 leading-snug">
                Kadi Tehsil [Khasra 204 &amp; 205]: 0.12 Ha variance between e-Dhara RoR record and geo-referenced boundary.
              </p>
              <button 
                onClick={() => showToast('Triggered SDM joint verification survey order')}
                className="text-[10px] font-bold text-rose-700 underline mt-1 hover:text-rose-900"
              >
                Trigger SDM Re-Survey
              </button>
            </div>
          </div>
        </div>

        {/* RFCTLARR Milestones */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              RFCTLARR Milestones
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Stage 5 of 8</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {[
              { name: 'Sec 4 SIA Mandate', state: 'Complied' },
              { name: 'Sec 11 Preliminary Notif.', state: 'Complied' },
              { name: 'Sec 15 Hearing Inquiry', state: 'Active' },
              { name: 'Sec 19 Declaration', state: 'Pending' },
            ].map((m, i) => (
              <div key={i} className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">{m.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  m.state === 'Complied' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : m.state === 'Active'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {m.state}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Land Audit Stream */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Land Audit Stream
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div>
              <div className="font-bold text-slate-800">ULPIN Batch Verification</div>
              <div className="text-[10px] text-slate-500">14:15 IST • DGPS Ground Control #4</div>
            </div>
            <div>
              <div className="font-bold text-slate-800">Objection Docket #OBJ-188</div>
              <div className="text-[10px] text-slate-500">11:30 IST • Revenue Court Kadi</div>
            </div>
            <div>
              <div className="font-bold text-slate-800">Shapefile Uploaded v3.2</div>
              <div className="text-[10px] text-slate-500">Yesterday • DLR Geo-Portal Sync</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
