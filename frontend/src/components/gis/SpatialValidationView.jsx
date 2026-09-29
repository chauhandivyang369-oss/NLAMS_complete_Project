import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Minus, 
  Maximize2, 
  Send, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  RotateCw,
  Compass
} from 'lucide-react';

export default function SpatialValidationView({ onInspectIssue, onShowToast }) {
  const [showIssuesModal, setShowIssuesModal] = useState(false);

  return (
    <div className="space-y-3.5">
      {/* Sub-bar Pipeline Info */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">PROPOSAL ID:</span>
            <span className="font-bold text-slate-900 font-mono">NLAMS-RB-2026-00124</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-500">STATUTORY PIPELINE:</span>{' '}
            <span className="font-semibold text-slate-800">RFCTLARR Section 3A / 4 Cadastre Sync</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-500">VALIDATION RUN:</span>{' '}
            <span className="font-mono text-slate-700">14 Sep 2026, 14:30 IST</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-slate-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>EPSG: 4326 (WGS84 / UTM 43N)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Map, Right Rules & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        
        {/* Left 5.5 Cols: Alignment Overlay & Cadastral Parcels Card */}
        <div className="lg:col-span-5 2xl:col-span-5 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs"></span>
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Alignment Overlay &amp; Cadastral Parcels
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-600" title="Zoom In">
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-600" title="Zoom Out">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-medium text-slate-700 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Fit Extents</span>
                </button>
              </div>
            </div>

            {/* SVG Stage */}
            <div className="relative bg-[#f8fafc] min-h-[460px] flex items-center justify-center p-3 select-none">
              {/* North Arrow */}
              <div className="absolute top-3 right-3 text-slate-400 font-mono text-[11px] flex flex-col items-center">
                <span className="text-slate-700 font-bold text-xs">N</span>
                <span className="text-sm">↑</span>
              </div>

              <svg viewBox="0 0 500 400" className="w-full h-full max-h-[420px]">
                {/* RoW Corridor */}
                <polygon 
                  points="20,180 480,140 480,210 20,250" 
                  fill="rgba(59, 130, 246, 0.08)" 
                  stroke="#3b82f6" 
                  strokeWidth="1.2" 
                  strokeDasharray="4 3" 
                />
                <line 
                  x1="20" y1="215" x2="480" y2="175" 
                  stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="6 3" 
                />

                {/* District boundary line */}
                <line 
                  x1="50" y1="200" x2="450" y2="200" 
                  stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" 
                />
                <text x="70" y="195" fill="#64748b" fontSize="7" fontFamily="monospace">
                  AHMEDABAD / MEHSANA DISTRICT BOUNDARY (LGD #472)
                </text>

                {/* Valid Green Parcels */}
                <polygon points="50,150 110,145 115,190 55,195" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="82" y="172" fill="#15803d" fontSize="7" fontWeight="bold" textAnchor="middle">KH 101</text>

                <polygon points="110,145 160,140 165,190 115,190" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="138" y="168" fill="#15803d" fontSize="7" fontWeight="bold" textAnchor="middle">KH 102</text>

                <polygon points="160,140 210,135 215,185 165,190" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="188" y="165" fill="#15803d" fontSize="7" fontWeight="bold" textAnchor="middle">KH 103</text>

                <polygon points="210,135 260,130 265,180 215,185" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="238" y="160" fill="#15803d" fontSize="7" fontWeight="bold" textAnchor="middle">KH 104</text>

                <polygon points="340,120 400,115 405,170 345,175" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="372" y="145" fill="#15803d" fontSize="7" fontWeight="bold" textAnchor="middle">KH 140</text>

                <polygon points="400,115 450,110 455,165 405,170" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="428" y="140" fill="#15803d" fontSize="7" fontWeight="bold" textAnchor="middle">KH 141</text>

                {/* Lower Row Parcels */}
                <polygon points="140,200 200,200 200,260 140,260" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="170" y="235" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">KH 201</text>

                <polygon points="200,200 260,200 260,260 200,260" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="230" y="235" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">KH 202</text>

                <polygon points="260,200 330,200 330,270 260,270" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="295" y="240" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">KH 206</text>

                <polygon points="330,200 400,200 400,270 330,270" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="365" y="240" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">KH 207</text>

                {/* Discrepancy / Overlap Red Parcels */}
                {/* 1. KH 142/B */}
                <polygon 
                  points="260,130 340,120 345,175 265,180" 
                  fill="#ffe4e6" 
                  stroke="#e11d48" 
                  strokeWidth="1.8" 
                  className="cursor-pointer hover:fill-rose-200"
                  onClick={() => onInspectIssue?.('142/B')}
                />
                <text x="302" y="150" fill="#be123c" fontSize="8" fontWeight="bold" textAnchor="middle">142/B [!]</text>

                {/* 2. KH 204 */}
                <polygon 
                  points="200,260 260,260 255,310 195,310" 
                  fill="#ffe4e6" 
                  stroke="#e11d48" 
                  strokeWidth="1.8" 
                  className="cursor-pointer hover:fill-rose-200"
                  onClick={() => onInspectIssue?.('204')}
                />
                <text x="228" y="288" fill="#be123c" fontSize="8" fontWeight="bold" textAnchor="middle">204 [!]</text>

                {/* 3. KH 218 */}
                <polygon 
                  points="320,270 370,270 365,320 315,320" 
                  fill="#ffe4e6" 
                  stroke="#e11d48" 
                  strokeWidth="1.8" 
                  className="cursor-pointer hover:fill-rose-200"
                  onClick={() => onInspectIssue?.('218')}
                />
                <text x="342" y="298" fill="#be123c" fontSize="8" fontWeight="bold" textAnchor="middle">218 [!]</text>

                <polygon points="265,270 315,270 310,320 260,320" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="287" y="298" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">KH 217</text>

                <polygon points="370,270 415,270 410,320 365,320" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                <text x="390" y="298" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">KH 219</text>
              </svg>

              {/* Bottom Scale Indicator */}
              <div className="absolute bottom-2 left-3 flex items-center gap-2 bg-white/90 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-mono text-slate-600">
                <span className="w-8 h-1 bg-slate-800 inline-block"></span>
                <span>100 m</span>
              </div>
            </div>
          </div>

          {/* Bottom Legend */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs"></span>
                  <span>Valid Parcels (1,839)</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 bg-rose-600 rounded-xs"></span>
                  <span className="text-rose-700 font-semibold">Discrepancy / Overlap (3)</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-0.5 bg-blue-600"></span>
                  <span>Corridor Centerline (RoW 45m)</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Bhu-Naksha Sync: Real-Time</span>
            </div>
          </div>
        </div>

        {/* Right 6.5 Cols: Engine Check, Intersection Table, Alert & Actions */}
        <div className="lg:col-span-7 2xl:col-span-7 space-y-3.5">
          
          {/* Spatial Validation & Topology Check Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Spatial Validation &amp; Topology Check
              </span>
              <span className="bg-[#0a2540] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                6 of 6 Engine Rules Run
              </span>
            </div>

            {/* 6 Engine Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-150">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Project Alignment Polyline</div>
                  <div className="text-[11px] text-slate-600">Continuous 64.2 km RoW geometry</div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-150">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Parcel Polygon Topology</div>
                  <div className="text-[11px] text-slate-600">Zero self-intersections or slivers</div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-150">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">14-Digit ULPIN Mapping</div>
                  <div className="text-[11px] text-slate-600">1,842 of 1,842 mapped to Bhu-Aadhaar</div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-150">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">District Boundary Integrity</div>
                  <div className="text-[11px] text-slate-600">LGD boundaries matched across 4 districts</div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-150">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Village Cadastre Boundary</div>
                  <div className="text-[11px] text-slate-600">Aligned with 17 village revenue sheets</div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-150">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Parcel Intersection Matrix</div>
                  <div className="text-[11px] text-slate-600">100% spatial intersection done</div>
                </div>
              </div>
            </div>
          </div>

          {/* District & Village Intersection Results Table */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                DISTRICT &amp; VILLAGE INTERSECTION RESULTS
              </span>
              <span className="text-blue-700 bg-blue-50 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">
                Spatial Overlay: Complete
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <th className="py-2 px-3">DISTRICT</th>
                    <th className="py-2 px-3">VILLAGE</th>
                    <th className="py-2 px-3 text-right">PARCELS</th>
                    <th className="py-2 px-3 text-right">AREA (HA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-semibold text-slate-900">Ahmedabad</td>
                    <td className="py-2 px-3 text-slate-600">Sanand</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">612</td>
                    <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">118.40 Ha</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-semibold text-slate-900">Mehsana</td>
                    <td className="py-2 px-3 text-slate-600">Kadi</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">428</td>
                    <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">76.20 Ha</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-semibold text-slate-900">Patan</td>
                    <td className="py-2 px-3 text-slate-600">Sidhpur</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">384</td>
                    <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">64.10 Ha</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-semibold text-slate-900">Banaskantha</td>
                    <td className="py-2 px-3 text-slate-600">Palanpur</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">418</td>
                    <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">65.80 Ha</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100/80 font-bold text-slate-900 border-t border-slate-300">
                    <td className="py-2 px-3">4 Districts</td>
                    <td className="py-2 px-3">17 Villages</td>
                    <td className="py-2 px-3 text-right font-mono text-sm">1,842</td>
                    <td className="py-2 px-3 text-right font-mono text-sm text-blue-900">324.50 Ha</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Warning Card: 3 Boundary Reconciliations Required */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">3 Boundary Reconciliations Required</span>
                <p className="text-[11px] text-slate-700 mt-0.5">
                  3 parcels require minor boundary reconciliation with Tehsil revenue records (<span className="font-semibold text-amber-900">Khasra 142/B, 204, 218</span>).
                </p>
              </div>
            </div>
            <button 
              onClick={() => onInspectIssue?.('142/B')}
              className="bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1.5 rounded text-xs font-bold shrink-0 transition-colors shadow-2xs"
            >
              View Issues
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button 
              onClick={() => onShowToast?.('Spatial validation approved and sealed with NIC-GIS engine')}
              className="bg-[#0a2540] hover:bg-[#07192c] text-white py-2.5 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Accept Spatial Validation</span>
            </button>

            <button 
              onClick={() => onShowToast?.('Dossier transmitted to Respective Revenue Officers')}
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 py-2.5 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-slate-500" />
              <span>Send for RO Review</span>
            </button>

            <button 
              onClick={() => onShowToast?.('Generating Official Intersection Report PDF...')}
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 py-2.5 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download Report (PDF)</span>
            </button>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">Authority Assigned:</span> Revenue Inspector &amp; SLAO Sanand
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              Audit Hash: 9f8c4e2b01... [NIC-GIS ENGINE SEALED]
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
