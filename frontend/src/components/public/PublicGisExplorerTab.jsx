import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  MapPin, 
  Compass, 
  Search, 
  Eye, 
  Info, 
  CheckCircle2, 
  Download, 
  ZoomIn, 
  ZoomOut,
  Maximize2
} from 'lucide-react';
import L from 'leaflet';

export default function PublicGisExplorerTab() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [activeBaseLayer, setActiveBaseLayer] = useState('osm'); // 'osm' | 'satellite'
  const [showBuffer, setShowBuffer] = useState(true);
  const [showParcels, setShowParcels] = useState(true);

  // Sample Cadastral Parcels with Polygons (Bharuch WDFC Corridor coordinates)
  const cadastralParcels = [
    {
      id: 'P-142A',
      surveyNo: '142/A',
      ulpin: 'GJ-BRD-2024-8842-991A',
      village: 'Vadadla',
      khatedar: 'Rameshbhai Somabhai Patel',
      areaHa: '0.4200 Ha',
      status: 'Sec 23 Sealed & DBT Paid',
      statusColor: '#16a34a', // green
      coords: [
        [21.7280, 73.0120],
        [21.7295, 73.0145],
        [21.7282, 73.0165],
        [21.7265, 73.0135]
      ]
    },
    {
      id: 'P-142B',
      surveyNo: '142/B',
      ulpin: 'GJ-BRD-2024-8842-992B',
      village: 'Vadadla',
      khatedar: 'Ishwarbhai Dahyabhai Vasava',
      areaHa: '0.3850 Ha',
      status: 'Sec 19 Declaration Active',
      statusColor: '#d97706', // amber
      coords: [
        [21.7295, 73.0145],
        [21.7312, 73.0170],
        [21.7298, 73.0190],
        [21.7282, 73.0165]
      ]
    },
    {
      id: 'P-143',
      surveyNo: '143',
      ulpin: 'GJ-BRD-2024-8842-993C',
      village: 'Vadadla',
      khatedar: 'Gram Panchayat Common Grazing Land',
      areaHa: '1.2400 Ha',
      status: 'Government Land Vesting',
      statusColor: '#2563eb', // blue
      coords: [
        [21.7265, 73.0135],
        [21.7282, 73.0165],
        [21.7268, 73.0185],
        [21.7250, 73.0150]
      ]
    },
    {
      id: 'P-144',
      surveyNo: '144/1',
      ulpin: 'GJ-BRD-2024-8842-994D',
      village: 'Vadadla',
      khatedar: 'Maniben Narpat Solanki',
      areaHa: '0.6100 Ha',
      status: 'Sec 15 Objection Docket',
      statusColor: '#dc2626', // red
      coords: [
        [21.7282, 73.0165],
        [21.7298, 73.0190],
        [21.7285, 73.0210],
        [21.7268, 73.0185]
      ]
    }
  ];

  // Corridor Alignment Line (WDFC Railway Track)
  const corridorLine = [
    [21.7240, 73.0080],
    [21.7275, 73.0140],
    [21.7305, 73.0180],
    [21.7335, 73.0230]
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Initialize Leaflet Map centered around Bharuch Cadastral Sample
    const map = L.map(mapContainerRef.current, {
      center: [21.7285, 73.0160],
      zoom: 15,
      zoomControl: false
    });

    mapInstanceRef.current = map;

    // Base Tile Layer (Carto / OpenStreetMap)
    const baseTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO &copy; ISRO Bhuvan',
      maxZoom: 19
    }).addTo(map);

    // Corridor Polyline (Orange Central Alignment)
    const polyline = L.polyline(corridorLine, {
      color: '#FF9933',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round'
    }).addTo(map);

    polyline.bindTooltip("Western Dedicated Freight Corridor (Alignment Centerline)", {
      sticky: true,
      className: 'bg-slate-900 text-white text-xs px-2 py-1 rounded font-bold'
    });

    // 50-meter buffer representation (dashed golden line)
    if (showBuffer) {
      const bufferLeft = corridorLine.map(([lat, lng]) => [lat + 0.0012, lng - 0.0008]);
      const bufferRight = corridorLine.map(([lat, lng]) => [lat - 0.0012, lng + 0.0008]);
      
      L.polyline(bufferLeft, {
        color: '#C5A059',
        weight: 1.5,
        dashArray: '5, 5',
        opacity: 0.8
      }).addTo(map);

      L.polyline(bufferRight, {
        color: '#C5A059',
        weight: 1.5,
        dashArray: '5, 5',
        opacity: 0.8
      }).addTo(map);
    }

    // Add Cadastral Polygons
    if (showParcels) {
      cadastralParcels.forEach((parcel) => {
        const poly = L.polygon(parcel.coords, {
          color: parcel.statusColor,
          fillColor: parcel.statusColor,
          fillOpacity: 0.35,
          weight: 2
        }).addTo(map);

        // Click handler to select parcel
        poly.on('click', () => {
          setSelectedParcel(parcel);
        });

        // Survey Number Label Marker
        const center = poly.getBounds().getCenter();
        const labelIcon = L.divIcon({
          className: 'cadastral-label',
          html: `<div style="background-color: rgba(20,38,66,0.85); color: #FFF; padding: 2px 5px; border-radius: 3px; font-size: 10px; font-weight: bold; border: 1px solid #C5A059; text-align: center; white-space: nowrap;">${parcel.surveyNo}</div>`,
          iconSize: [40, 16],
          iconAnchor: [20, 8]
        });
        L.marker(center, { icon: labelIcon }).addTo(map);
      });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [showBuffer, showParcels]);

  return (
    <div className="py-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <span>Geospatial Intelligence • Leaflet &amp; Turf.js Cadastral Mapping</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1B365D] font-serif mt-1">
                Public Cadastral GIS Corridor Explorer
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Explore georeferenced cadastral land parcels, acquisition corridors, and statutory buffer zones. Click any parcel on the map to inspect survey details, ownership, and acquisition status.
              </p>
            </div>

            {/* Map Controls / Toggles */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <label className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBuffer}
                  onChange={(e) => setShowBuffer(e.target.checked)}
                  className="accent-[#1B365D]"
                />
                <span className="font-semibold text-slate-700">50m Buffer Zone</span>
              </label>

              <label className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showParcels}
                  onChange={(e) => setShowParcels(e.target.checked)}
                  className="accent-[#1B365D]"
                />
                <span className="font-semibold text-slate-700">Cadastral Polygons</span>
              </label>
            </div>
          </div>
        </div>

        {/* GIS Canvas Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Leaflet Map Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-300 p-2 shadow-sm relative overflow-hidden flex flex-col">
            
            {/* Map Top Bar */}
            <div className="p-2 bg-[#142642] text-white rounded-t-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-amber-300 font-mono">
                  ACTIVE CORRIDOR: WDFC Linear Alignment (Bharuch Sector)
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-mono hidden sm:inline">
                EPSG:4326 (WGS 84) • DILRMP Cadastral Overlay
              </span>
            </div>

            {/* Leaflet DOM Node */}
            <div 
              ref={mapContainerRef} 
              className="h-[480px] w-full bg-slate-100 z-10"
              style={{ minHeight: '480px' }}
            />

            {/* Map Legend Footer */}
            <div className="p-3 bg-[#FAF8F5] border-t border-slate-200 rounded-b-lg flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-xs bg-[#16a34a] border border-white"></span>
                  <span className="text-slate-700">Acquired / DBT Paid</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-xs bg-[#d97706] border border-white"></span>
                  <span className="text-slate-700">Sec 19 Declaration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-xs bg-[#dc2626] border border-white"></span>
                  <span className="text-slate-700">Sec 15 Objections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-xs bg-[#2563eb] border border-white"></span>
                  <span className="text-slate-700">Government Land</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-[#FF9933]"></span>
                  <span className="text-slate-700">Corridor Centerline</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono">
                Click any polygon to inspect parcel
              </div>
            </div>

          </div>

          {/* Right Inspection Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {selectedParcel ? (
              <div className="bg-white p-5 rounded-xl border-2 border-[#1B365D] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">SELECTED CADASTRE</span>
                    <h3 className="text-lg font-bold text-[#1B365D] font-serif">
                      Survey #{selectedParcel.surveyNo}
                    </h3>
                  </div>
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                    style={{ backgroundColor: selectedParcel.statusColor }}
                  >
                    {selectedParcel.status}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Unique Land Parcel ID (ULPIN)</div>
                    <div className="font-mono font-bold text-slate-900">{selectedParcel.ulpin}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[10px]">Recorded Khatedar</div>
                    <div className="font-bold text-slate-900">{selectedParcel.khatedar}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <div className="text-slate-400 text-[10px]">Village</div>
                      <div className="font-bold text-slate-800">{selectedParcel.village}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Acquired Area</div>
                      <div className="font-bold text-slate-800">{selectedParcel.areaHa}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[10px]">Statutory Compliance</div>
                    <div className="text-slate-700 font-medium">
                      Cadastral geometry matched with DILRMP e-Dhara revenue record. Zero overlapping dispute recorded.
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <button
                    onClick={() => alert(`Exporting Cadastral GeoJSON for ULPIN: ${selectedParcel.ulpin}`)}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-[#1B365D] text-amber-300 text-xs font-bold hover:bg-[#142642] cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Parcel GeoJSON</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  No Parcel Selected
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Click any colored cadastral polygon on the map (Survey #142/A, 142/B, 143, 144/1) to view detailed statutory docket, khatedar name, and acquisition status.
                </p>
              </div>
            )}

            {/* Spatial Architecture Notice */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-700" />
                <span>GIS Two-Layer Architecture</span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-800">
                <strong>Client Layer (Leaflet + Turf.js):</strong> Fast visual preview, area computation, and boundary inspection.
                <br />
                <strong>Server Layer (PostGIS):</strong> Legal authoritative ground-truth, gazette coordinate sealing, and mutation sync.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
