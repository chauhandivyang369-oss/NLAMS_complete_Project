import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Layers, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RefreshCw, 
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

// Defensive monkey patch for Leaflet to guard against unmounted DOM elements & animation frames
if (typeof window !== 'undefined' && L && L.DomUtil) {
  const originalGetPosition = L.DomUtil.getPosition;
  L.DomUtil.getPosition = function (el) {
    if (!el) return new L.Point(0, 0);
    try {
      return originalGetPosition ? originalGetPosition.call(L.DomUtil, el) : (el._leaflet_pos || new L.Point(0, 0));
    } catch {
      return (el && el._leaflet_pos) || new L.Point(0, 0);
    }
  };
  const originalSetPosition = L.DomUtil.setPosition;
  L.DomUtil.setPosition = function (el, point) {
    if (!el) return;
    try {
      if (originalSetPosition) {
        originalSetPosition.call(L.DomUtil, el, point);
      } else {
        el._leaflet_pos = point;
      }
    } catch {
      if (el) el._leaflet_pos = point;
    }
  };
}

export default function PolicyMakerMap({ height = '450px', onSelectProject }) {
  const { 
    scopedProjects, 
    selectedProjectId, 
    setSelectedProjectId,
    openProjectIntelligence,
    effectiveScope,
    committeeRole
  } = usePolicyMaker();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const parcelsLayerRef = useRef(null);

  // Active Layer Toggles
  const [layers, setLayers] = useState({
    projectLocations: true,
    acquisitionParcels: true,
    stateBoundaries: true,
    districtBoundaries: true,
    rrStatus: true,
    riskHeatmap: false,
    delayedProjects: true,
    completedProjects: true
  });

  const [isLayerControlOpen, setIsLayerControlOpen] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on India (or Gujarat if SMC)
    const initialCenter = committeeRole === 'SMC' ? [22.3850, 72.3120] : [23.5937, 78.9629];
    const initialZoom = committeeRole === 'SMC' ? 9 : 5;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false
    });

    // Clean government style CartoDB Positron / OSM tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      subdomains: ['a', 'b', 'c']
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    parcelsLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Safe resize invalidation
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.stop();
          mapInstanceRef.current.remove();
        } catch {
          // ignore cleanup race
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers and Layers when projects or toggles change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    parcelsLayerRef.current.clearLayers();

    const map = mapInstanceRef.current;
    const bounds = L.latLngBounds([]);

    (scopedProjects || []).forEach(proj => {
      if (!proj.lat || !proj.lng) return;

      const isDelayed = proj.slaRisk === 'critical';
      const isCompleted = proj.currentStage === 'possession' || proj.currentStage === 'completed';

      // Check filters
      if (!layers.delayedProjects && isDelayed) return;
      if (!layers.completedProjects && isCompleted) return;

      bounds.extend([proj.lat, proj.lng]);

      // Color coding: Critical (Rose), Warning (Amber), On Track (Emerald)
      const color = proj.slaRisk === 'critical' ? '#e11d48' : proj.slaRisk === 'warning' ? '#d97706' : '#059669';
      const isSelected = proj.id === selectedProjectId;

      // Custom SVG Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-pm-pin',
        html: `
          <div style="
            background: ${color};
            color: white;
            border: 2px solid ${isSelected ? '#C5A059' : '#ffffff'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            border-radius: 9999px;
            width: ${isSelected ? '32px' : '26px'};
            height: ${isSelected ? '32px' : '26px'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            font-family: monospace;
            transform: translate(-50%, -50%);
            transition: all 0.2s ease;
          ">
            ${proj.id.split('-')[2] || 'P'}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([proj.lat, proj.lng], { icon: customIcon });

      // Popup formatted to exact specifications
      const popupContent = `
        <div style="font-family: system-ui, sans-serif; min-width: 250px; padding: 2px;">
          <div style="background: #1B365D; color: #ffffff; padding: 8px 10px; margin: -10px -10px 8px -10px; border-radius: 4px 4px 0 0; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 10px; font-weight: 800; font-family: monospace; color: #C5A059; text-transform: uppercase;">PROJECT RECORD</span>
            <span style="font-size: 9px; background: rgba(255,255,255,0.2); padding: 1px 4px; border-radius: 3px;">${proj.id}</span>
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 6px; line-height: 1.3;">
            ${proj.name}
          </div>
          <div style="font-size: 11px; color: #475569; display: grid; grid-template-columns: 100px 1fr; row-gap: 3px; margin-bottom: 10px;">
            <span style="font-weight: 600; color: #64748b;">Requiring Body:</span>
            <span style="color: #0f172a;">${proj.requiringBody || 'NHAI / MoRTH'}</span>
            <span style="font-weight: 600; color: #64748b;">Jurisdiction:</span>
            <span style="color: #0f172a;">${proj.state} (${proj.districts?.join(', ') || proj.district || 'All'})</span>
            <span style="font-weight: 600; color: #64748b;">Land Extent:</span>
            <span style="color: #0f172a; font-weight: 700;">${proj.totalAreaHa} Ha (${proj.totalAreaAcres || Math.round(proj.totalAreaHa * 2.471)} Acres)</span>
            <span style="font-weight: 600; color: #64748b;">Current Stage:</span>
            <span style="color: #1e3a8a; font-weight: 600;">${proj.stageLabel || proj.currentStage}</span>
            <span style="font-weight: 600; color: #64748b;">R&R Status:</span>
            <span style="color: #0f172a;">${proj.rrApprovedPercent ? `${proj.rrApprovedPercent}% Scheme Complete` : 'Survey Underway'}</span>
            <span style="font-weight: 600; color: #64748b;">Statutory Risk:</span>
            <span style="color: ${color}; font-weight: 800; font-family: monospace;">${proj.slaRiskLabel || proj.slaRisk?.toUpperCase()}</span>
            <span style="font-weight: 600; color: #64748b;">Last Updated:</span>
            <span style="color: #64748b; font-size: 10px;">${proj.lastUpdated || '19 Sep 2026'}</span>
          </div>
          <button 
            id="btn-open-proj-${proj.id}" 
            style="width: 100%; background: #1B365D; color: #ffffff; border: 1px solid #C5A059; padding: 6px 12px; font-size: 11px; font-weight: 700; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;"
          >
            <span>OPEN PROJECT INTELLIGENCE</span>
            <span style="color: #C5A059;">→</span>
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 320 });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-open-proj-${proj.id}`);
        if (btn) {
          btn.onclick = () => {
            setSelectedProjectId(proj.id);
            openProjectIntelligence(proj.id);
          };
        }
      });

      marker.on('click', () => {
        setSelectedProjectId(proj.id);
        if (onSelectProject) onSelectProject(proj.id);
      });

      if (layers.projectLocations) {
        markersLayerRef.current.addLayer(marker);
      }

      // Draw simulated Cadastral Parcels polygon around anchor project
      if (layers.acquisitionParcels && proj.id === 'PRJ-2026-GJ05') {
        const parcelCoords = [
          [22.3850, 72.3120],
          [22.3920, 72.3250],
          [22.3880, 72.3380],
          [22.3780, 72.3320],
          [22.3750, 72.3180]
        ];

        const polygon = L.polygon(parcelCoords, {
          color: '#C5A059',
          weight: 2,
          fillColor: '#1B365D',
          fillOpacity: 0.25,
          dashArray: '4, 4'
        }).bindPopup(`
          <div style="font-size: 11px; padding: 2px;">
            <strong style="color: #1B365D;">Cadastral Acquisition Cluster</strong><br/>
            <span>Sunav-Ravalpura Alignment (28 Parcels)</span><br/>
            <span>Area: 1,480.50 Ha (DILRMP Verified)</span>
          </div>
        `);
        parcelsLayerRef.current.addLayer(polygon);
      }
    });

    // Auto-fit if multiple projects
    if (bounds.isValid() && scopedProjects.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [scopedProjects, layers, selectedProjectId]);

  const handleFitScope = () => {
    if (!mapInstanceRef.current) return;
    if (committeeRole === 'SMC') {
      mapInstanceRef.current.setView([22.3850, 72.3120], 9);
    } else if (committeeRole === 'PROJECT_RR') {
      mapInstanceRef.current.setView([22.3850, 72.3120], 12);
    } else {
      mapInstanceRef.current.setView([23.5937, 78.9629], 5);
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900 select-none">
      {/* Map Viewport Container */}
      <div 
        ref={mapContainerRef} 
        style={{ height }} 
        className="w-full relative z-0"
      />

      {/* Top Header Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm text-xs flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-bold text-[#1B365D] font-mono text-[11px] uppercase">
          GIS COMMAND OVERVIEW
        </span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-700 text-[11px] font-medium font-sans">
          Scope: <strong className="text-slate-900">{effectiveScope}</strong> ({scopedProjects.length} Projects)
        </span>
      </div>

      {/* Layer Control Panel (Top-Right) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end">
        <button
          onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
          className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Layers className="w-4 h-4 text-[#C5A059]" />
          <span>Spatial Layers</span>
        </button>

        {isLayerControlOpen && (
          <div className="mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 text-xs space-y-2 z-20 animate-in fade-in slide-in-from-top-2">
            <div className="font-bold text-slate-900 pb-1.5 border-b border-slate-100 flex items-center justify-between text-[11px]">
              <span>STATUTORY GIS LAYERS</span>
              <span className="text-[10px] text-slate-400 font-mono">WGS 84</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-700">
              {[
                { key: 'projectLocations', label: 'Project Locations (Centroids)' },
                { key: 'acquisitionParcels', label: 'Acquisition Parcels & Alignments' },
                { key: 'stateBoundaries', label: 'State Boundaries (SOI)' },
                { key: 'districtBoundaries', label: 'District Boundaries' },
                { key: 'rrStatus', label: 'R&R Resettlement Enclaves' },
                { key: 'riskHeatmap', label: 'Risk Heatmap Overlay' },
                { key: 'delayedProjects', label: 'Show Critical / Delayed Projects' },
                { key: 'completedProjects', label: 'Show Completed Projects' }
              ].map(item => (
                <label key={item.key} className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers[item.key]}
                    onChange={(e) => setLayers(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    className="rounded border-slate-300 text-[#1B365D] focus:ring-[#C5A059]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Tools (Zoom & Fit Scope) (Middle-Right) */}
      <div className="absolute right-3 top-16 z-10 flex flex-col gap-1.5 bg-white border border-slate-200 rounded-lg shadow-sm p-1">
        <button
          onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomIn()}
          className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomOut()}
          className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFitScope}
          className="p-1.5 hover:bg-slate-100 rounded text-[#1B365D] transition-colors border-t border-slate-100"
          title="Reset / Fit Scope"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 p-2.5 rounded-lg shadow-sm text-[11px] text-slate-800 space-y-1">
        <div className="font-bold text-[10px] text-slate-600 uppercase font-mono tracking-wider">
          MAP LEGEND & RISK TIERS
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
            <span>Critical (&lt; 30d / Breached)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Warning (&lt; 60d)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>On Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1.5 bg-[#C5A059] border border-slate-600"></span>
            <span>Cadastral Cluster</span>
          </div>
        </div>
      </div>
    </div>
  );
}
