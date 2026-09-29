import React, { useState } from 'react';
import { 
  MapPin, 
  RotateCcw, 
  Save, 
  Download, 
  Plus, 
  Minus, 
  Ruler, 
  Share2, 
  Maximize2,
  Navigation,
  Compass,
  Check
} from 'lucide-react';

export default function LayerControlsView({ onShowToast }) {
  // Base map raster selection
  const [baseMap, setBaseMap] = useState('satellite'); // 'street', 'satellite', 'bhuvan', 'dark'
  
  // Cadastral & boundary overlays
  const [overlayParcels, setOverlayParcels] = useState(true);
  const [overlayDistricts, setOverlayDistricts] = useState(true);
  const [overlayVillages, setOverlayVillages] = useState(false);
  const [overlayRow, setOverlayRow] = useState(true);
  const [overlayLandClass, setOverlayLandClass] = useState(false);
  const [overlayAcqStatus, setOverlayAcqStatus] = useState(false);

  // Labels & annotations
  const [labelKhasra, setLabelKhasra] = useState(true);
  const [labelVillage, setLabelVillage] = useState(false);
  const [labelChainage, setLabelChainage] = useState(true);

  const handleSave = () => {
    if (onShowToast) {
      onShowToast('Cartographic layer preferences saved successfully');
    }
  };

  const handleReset = () => {
    setBaseMap('satellite');
    setOverlayParcels(true);
    setOverlayDistricts(true);
    setOverlayVillages(false);
    setOverlayRow(true);
    setOverlayLandClass(false);
    setOverlayAcqStatus(false);
    setLabelKhasra(true);
    setLabelVillage(false);
    setLabelChainage(true);
    if (onShowToast) onShowToast('Layer configuration reset to defaults');
  };

  return (
    <div className="space-y-3.5">
      {/* Sub-header Metadata Row */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">ACTIVE PROPOSAL:</span>
            <span className="font-bold text-slate-900 font-mono">NLAMS-RB-2026-00124</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">NH-44 Express Corridor Bypass</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Ahmedabad District (LGD: 474) &gt; Sanand Taluka</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="text-slate-600">
            <span className="font-semibold text-slate-800">Chainage:</span> Ch. 12+400 to 76+600
          </div>
        </div>

        <button 
          onClick={() => onShowToast?.('Alignment recentered to Ch. 28+500')}
          className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <Navigation className="w-3.5 h-3.5 text-blue-600 rotate-45" />
          <span>Recenter Alignment</span>
        </button>
      </div>

      {/* Main Map & Left Configuration Flyout Container */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left 4.5 Cols: Map Layers & Cartography Controls Drawer */}
        <div className="lg:col-span-4 2xl:col-span-3.5 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-3.5 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4 text-xs">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs"></span>
                  <span>Map Layers &amp; Cartography</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Cadastre &amp; Boundary Overlays</div>
              </div>
              <button 
                onClick={handleReset}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-[11px] font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Section 1: Base Map Raster Layer */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>1. BASE MAP RASTER LAYER</span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">Mutually Exclusive</span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="basemap" 
                      checked={baseMap === 'street'}
                      onChange={() => setBaseMap('street')}
                      className="text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">Street Map (OpenStreetMap)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Vector</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="basemap" 
                      checked={baseMap === 'satellite'}
                      onChange={() => setBaseMap('satellite')}
                      className="text-blue-600 focus:ring-0" 
                    />
                    <div>
                      <div className="text-slate-900 font-semibold">Satellite Imagery</div>
                      <div className="text-[10px] text-slate-500">High-Res Orthomosaic (CartoSat-3)</div>
                    </div>
                  </div>
                  <span className="bg-[#0a2540] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Active
                  </span>
                </label>

                <label className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="basemap" 
                      checked={baseMap === 'bhuvan'}
                      onChange={() => setBaseMap('bhuvan')}
                      className="text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">Government Imagery (ISRO Bhuvan WMS)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">WMS</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="basemap" 
                      checked={baseMap === 'dark'}
                      onChange={() => setBaseMap('dark')}
                      className="text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">Dark Cartographic Map</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Monochrome</span>
                </label>
              </div>
            </div>

            {/* Section 2: Cadastral & Boundary Overlays */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>2. CADASTRAL &amp; BOUNDARY OVERLAYS</span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">Multi-Select</span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={overlayParcels}
                      onChange={(e) => setOverlayParcels(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">Parcel Boundaries (Cadastral Plots)</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 font-bold">
                    <span className="w-2.5 h-2.5 bg-[#0a2540] rounded-xs"></span>
                    <span>1,842</span>
                  </span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={overlayDistricts}
                      onChange={(e) => setOverlayDistricts(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">District Boundaries (SoI / LGD)</span>
                  </div>
                  <span className="w-4 h-0.5 bg-amber-500"></span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={overlayVillages}
                      onChange={(e) => setOverlayVillages(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-700">Village Boundaries (Revenue Cadastre)</span>
                  </div>
                  <span className="w-4 h-0.5 bg-slate-400"></span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={overlayRow}
                      onChange={(e) => setOverlayRow(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <div>
                      <div className="text-slate-900 font-medium">Project Alignment &amp; RoW</div>
                      <div className="text-[10px] text-slate-500">60m Direct Impact Corridor</div>
                    </div>
                  </div>
                  <span className="w-3 h-3 bg-rose-600 rounded-xs"></span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={overlayLandClass}
                      onChange={(e) => setOverlayLandClass(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-700">Land Classification (Multi-Crop / Waste)</span>
                  </div>
                  <span className="w-3 h-3 bg-amber-800 rounded-xs"></span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={overlayAcqStatus}
                      onChange={(e) => setOverlayAcqStatus(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-700">Acquisition Status (Acquired / In-Progress)</span>
                  </div>
                  <span className="w-3 h-3 bg-emerald-600 rounded-xs"></span>
                </label>
              </div>
            </div>

            {/* Section 3: Labels & Annotations */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>3. LABELS &amp; ANNOTATIONS</span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">Text Rendering</span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={labelKhasra}
                      onChange={(e) => setLabelKhasra(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">Survey / Khasra Numbers (e.g. 142/2)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Bold Monospace</span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={labelVillage}
                      onChange={(e) => setLabelVillage(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-700">Village &amp; Tehsil Names</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Toponym</span>
                </label>

                <label className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={labelChainage}
                      onChange={(e) => setLabelChainage(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span className="text-slate-800 font-medium">Road Chainage Markers (Ch. 0+000 to 64+200)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Every 500m</span>
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Save Preferences Button */}
          <div className="pt-3 border-t border-slate-200 mt-4">
            <button 
              onClick={handleSave}
              className="w-full bg-[#0a2540] hover:bg-[#07192c] text-white py-2.5 rounded text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>

        {/* Right 7.5 Cols: Live Map Viewport with Cartographic Overlays */}
        <div className="lg:col-span-8 2xl:col-span-8.5 relative bg-[#eef4f8] flex flex-col justify-between overflow-hidden select-none">
          
          {/* Top Floating SPATIAL SESSION INFO Card */}
          <div className="absolute top-3 left-4 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 rounded p-3 shadow-md text-xs w-64">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
              <span className="font-bold text-slate-800 tracking-wider text-[11px]">SPATIAL SESSION INFO</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                OPTIMAL
              </span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Proposal:</span>
                <span className="font-bold text-slate-900 font-mono">00124-NHAI</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Basemap:</span>
                <span className="font-medium text-slate-800">Satellite (Orthorectified)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Overlays:</span>
                <span className="font-bold text-blue-700 font-mono">3 of 6 Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Cadastral Sync:</span>
                <span className="font-medium text-emerald-700">Bhuvan Live (0.28m GSD)</span>
              </div>
            </div>
            <button 
              onClick={() => onShowToast?.('Exporting Cadastral KML/SHP archive...')}
              className="mt-2.5 w-full bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 py-1.5 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3 h-3 text-slate-500" />
              <span>Export Cadastral KML/SHP</span>
            </button>
          </div>

          {/* Floating Right Map Tools */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 bg-white border border-slate-200 rounded shadow-xs p-1 text-slate-600">
            <button className="p-1 hover:bg-slate-100 rounded" title="Zoom In"><Plus className="w-3.5 h-3.5" /></button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Zoom Out"><Minus className="w-3.5 h-3.5" /></button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Measure"><Ruler className="w-3.5 h-3.5" /></button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Share View"><Share2 className="w-3.5 h-3.5" /></button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Fullscreen"><Maximize2 className="w-3.5 h-3.5" /></button>
          </div>

          {/* SVG Map Canvas with Geographic Backdrop & Highway Corridor */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center p-6">
            <svg viewBox="0 0 800 550" className="w-full h-full max-h-[520px]">
              <defs>
                {/* Roads background pattern */}
                <pattern id="roadPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 0,50 L 100,50 M 50,0 L 50,100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                </pattern>
              </defs>

              <rect width="800" height="550" fill="#f1f5f9" />
              <rect width="800" height="550" fill="url(#roadPattern)" opacity="0.6" />

              {/* Major Highway / Expressway Vector Lines */}
              <path d="M 100,320 C 300,310 500,280 750,230" fill="none" stroke="#f87171" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
              <path d="M 100,320 C 300,310 500,280 750,230" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              
              {/* Secondary Roads */}
              <path d="M 280,100 L 320,500" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
              <path d="M 150,450 L 650,480" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 520,120 L 560,400" fill="none" stroke="#94a3b8" strokeWidth="2" />

              {/* Cadastral Polygon Boundaries on map */}
              {overlayParcels && (
                <g>
                  {/* Parcel 142/1 */}
                  <polygon points="340,160 480,130 500,240 360,260" fill="rgba(220, 252, 231, 0.5)" stroke="#15803d" strokeWidth="1.2" />
                  <text x="355" y="150" fill="#334155" fontSize="10" fontFamily="monospace">Kh. 142/1</text>

                  {/* Parcel 142/2 */}
                  <polygon points="360,260 500,240 520,340 380,360" fill="rgba(254, 243, 199, 0.5)" stroke="#b45309" strokeWidth="1.2" />
                  <text x="375" y="275" fill="#334155" fontSize="10" fontFamily="monospace">Kh. 142/2</text>

                  {/* Parcel 143 (Affected) */}
                  <polygon points="500,240 640,210 660,310 520,340" fill="rgba(254, 226, 226, 0.6)" stroke="#b91c1c" strokeWidth="1.5" />
                  <rect x="525" y="222" width="95" height="18" rx="3" fill="#0a2540" />
                  <text x="572" y="234" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Kh. 143 (Affected)
                  </text>
                </g>
              )}

              {/* Highway Alignment Pin & Marker: Ch. 28+500 */}
              <g transform="translate(480, 275)">
                <rect x="-4" y="-12" width="76" height="20" rx="4" fill="#0f172a" />
                <circle cx="3" cy="-2" r="3" fill="#38bdf8" />
                <text x="12" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  Ch. 28+500
                </text>
              </g>

              {/* Geographic Landmarks */}
              {/* Krishna Shalby Multi-Specialty Hospital */}
              <g transform="translate(500, 150)">
                <circle cx="16" cy="16" r="14" fill="#ef4444" opacity="0.9" />
                <text x="16" y="21" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
                <text x="35" y="16" fill="#be123c" fontSize="10" fontWeight="bold">Krishna Shalby</text>
                <text x="35" y="27" fill="#be123c" fontSize="8">Multi-Specialty Hospital</text>
              </g>

              {/* Gulmohar Greens Golf & Country Club */}
              <g transform="translate(180, 360)">
                <circle cx="16" cy="16" r="14" fill="#15803d" opacity="0.9" />
                <text x="16" y="20" fill="#ffffff" fontSize="11" textAnchor="middle">⛳</text>
                <text x="35" y="16" fill="#166534" fontSize="10" fontWeight="bold">Gulmohar Greens</text>
                <text x="35" y="27" fill="#166534" fontSize="8">Golf &amp; Country Club</text>
              </g>

              {/* Village / Town Toponyms */}
              <text x="640" y="140" fill="#475569" fontSize="11" fontWeight="600">Bopal</text>
              <text x="640" y="155" fill="#64748b" fontSize="9">બોપલ</text>

              <text x="630" y="260" fill="#475569" fontSize="11" fontWeight="600">Shela</text>
              <text x="630" y="275" fill="#64748b" fontSize="9">શેલા</text>

              <text x="360" y="320" fill="#475569" fontSize="11" fontWeight="600">Gibpura</text>
              <text x="360" y="335" fill="#64748b" fontSize="9">ગીબપુરા</text>

              <text x="490" y="440" fill="#475569" fontSize="11" fontWeight="600">Changodar</text>
              <text x="490" y="455" fill="#64748b" fontSize="9">ચાંગોદર</text>

              <text x="610" y="480" fill="#475569" fontSize="11" fontWeight="600">Tajpur</text>
              <text x="610" y="495" fill="#64748b" fontSize="9">તાજપુર</text>

              <text x="320" y="520" fill="#475569" fontSize="11" fontWeight="600">Matoda</text>

              {/* Highway Route Shields */}
              <g transform="translate(420, 310)">
                <rect x="0" y="0" width="20" height="15" rx="3" fill="#ef4444" />
                <text x="10" y="11" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">17</text>
              </g>
              <g transform="translate(620, 430)">
                <rect x="0" y="0" width="20" height="15" rx="3" fill="#eab308" />
                <text x="10" y="11" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">47</text>
              </g>

              {/* Bottom Scale & Compass */}
              <g transform="translate(480, 500)">
                <line x1="0" y1="10" x2="120" y2="10" stroke="#000000" strokeWidth="2" />
                <line x1="0" y1="5" x2="0" y2="15" stroke="#000000" strokeWidth="2" />
                <line x1="60" y1="5" x2="60" y2="15" stroke="#000000" strokeWidth="2" />
                <line x1="120" y1="5" x2="120" y2="15" stroke="#000000" strokeWidth="2" />
                <text x="0" y="0" fill="#000000" fontSize="8" textAnchor="middle">0</text>
                <text x="60" y="0" fill="#000000" fontSize="8" textAnchor="middle">250m</text>
                <text x="120" y="0" fill="#000000" fontSize="8" textAnchor="middle">500m</text>
              </g>

              {/* North Arrow */}
              <g transform="translate(640, 500)">
                <path d="M 0,-15 L 5,5 L 0,0 L -5,5 Z" fill="#ef4444" />
                <text x="0" y="-18" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">N</text>
              </g>
            </svg>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="bg-slate-50 border-t border-slate-200 px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-medium text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Satellite Imagery: CartoSat-3 (0.28m GSD)</span>
              </span>
              <span className="text-slate-300">•</span>
              <span>Spatial Provider: Bhuvan Cadastre Sync Active</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-800">Parcels Mapped: 1,842 Parcels Detected</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
              <span>Cursor: 22°59'48.2"N 72°23'11.4"E</span>
              <span>Elevation: 54 m MSL</span>
              <span className="text-slate-400">NIC/ISRO Geo-Server</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
