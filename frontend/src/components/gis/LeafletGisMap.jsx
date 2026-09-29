import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Defensive monkey patch for Leaflet to guard against unmounted DOM elements & animation frames
if (typeof window !== 'undefined' && L && L.DomUtil) {
  const originalGetPosition = L.DomUtil.getPosition;
  L.DomUtil.getPosition = function (el) {
    if (!el) {
      return new L.Point(0, 0);
    }
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
import * as turf from '@turf/turf';
import { 
  Search, 
  X, 
  UploadCloud, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Minus, 
  Compass, 
  Crosshair, 
  Navigation, 
  PenTool, 
  Maximize, 
  Scissors, 
  Move, 
  Trash2, 
  Ruler, 
  Layers, 
  Play, 
  Check, 
  ChevronDown,
  Bell,
  User,
  MapPin,
  Type,
  Square,
  Triangle,
  Slash,
  MousePointer,
  Eraser,
  Circle,
  Pencil
} from 'lucide-react';
import MapLayerPanel from './MapLayerPanel.jsx';
import ParcelDetailsDrawer from './ParcelDetailsDrawer.jsx';
import SelectedParcelTable from './SelectedParcelTable.jsx';
import GISLegend from './GISLegend.jsx';
import { 
  SEED_CADASTRAL_PARCELS, 
  DEFAULT_CORRIDOR_LINE, 
  STATUTORY_COLORS,
  simulateCorridor,
  uploadCorridorFile 
} from '../../services/gisService.js';
import { universalSearch } from '../../services/geocodingService.js';

export default function LeafletGisMap({ 
  onConfirmSelection,
  initialSelectedUlpins = ['24051234567890', '24051234567891', '24051234567892', '24051234567893'],
  showSaveButton = false,
  onSelectParcel = null,
  height = null,
  className = '',
  initialParcels = null,
  showTools = true,
  showTableDefault = true
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polygonLayersRef = useRef({});
  const parcelsLayerGroupRef = useRef(null);
  const corridorLayerRef = useRef(null);
  const bufferLayerRef = useRef(null);
  const tileLayerRef = useRef(null);
  const labelsLayerRef = useRef(null);

  // Safe wrapper for map.invalidateSize
  const safeInvalidateSize = () => {
    const map = mapInstanceRef.current;
    if (map && map._container && map._mapPane && !map._unloaded) {
      try {
        map.invalidateSize();
      } catch (err) {
        // Suppress transient layout calculation during transitions
      }
    }
  };

  const [parcels, setParcels] = useState(initialParcels || SEED_CADASTRAL_PARCELS);
  const [selectedUlpins, setSelectedUlpins] = useState(initialSelectedUlpins);
  const [activeParcel, setActiveParcel] = useState(initialParcels?.[0] || SEED_CADASTRAL_PARCELS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(showTableDefault);
  const [isLayersCollapsed, setIsLayersCollapsed] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTool, setActiveTool] = useState('select');
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [movingParcel, setMovingParcel] = useState(null);
  const [annotations, setAnnotations] = useState([
    { id: 'ann-init', lat: 22.5412, lng: 72.9295, text: 'NH-48 Proposed RoW Boundary Marker' }
  ]);
  const [annotationPrompt, setAnnotationPrompt] = useState(null);

  const drawingLayerRef = useRef(null);
  const activeToolRef = useRef(activeTool);
  const onSelectParcelRef = useRef(onSelectParcel);

  useEffect(() => {
    onSelectParcelRef.current = onSelectParcel;
  }, [onSelectParcel]);
  const drawingPointsRef = useRef(drawingPoints);
  const movingParcelRef = useRef(null);
  const vertexHandlesLayerRef = useRef(null);
  const annotationsLayerRef = useRef(null);
  const fullscreenContainerRef = useRef(null);

  useEffect(() => {
    drawingPointsRef.current = drawingPoints;
  }, [drawingPoints]);

  useEffect(() => {
    movingParcelRef.current = movingParcel;
  }, [movingParcel]);

  const isInitialMountRef = useRef(true);
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }
    if (onConfirmSelection) {
      const selectedList = parcels.filter(p => selectedUlpins.includes(p.ulpin));
      onConfirmSelection(selectedUlpins, selectedList);
    }
  }, [selectedUlpins]);

  // Toggle fullscreen with staged resize recalculations
  const toggleFullscreen = () => {
    setIsFullscreen(prev => {
      const next = !prev;
      [30, 100, 250, 450].forEach(delay => {
        setTimeout(() => {
          safeInvalidateSize();
        }, delay);
      });
      return next;
    });
  };

  // Handle ESC key to exit fullscreen or cancel tool
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (annotationPrompt) {
          setAnnotationPrompt(null);
          return;
        }
        if (drawingPoints.length > 0) {
          setDrawingPoints([]);
          return;
        }
        if (isFullscreen) {
          setIsFullscreen(false);
          [50, 150, 300].forEach(delay => {
            setTimeout(() => {
              safeInvalidateSize();
            }, delay);
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, annotationPrompt, drawingPoints]);

  // Fullscreen effect on body overflow & map recalculation
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const timers = [30, 80, 180, 350, 500].map(delay =>
      setTimeout(() => {
        safeInvalidateSize();
      }, delay)
    );
    return () => {
      timers.forEach(t => clearTimeout(t));
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  useEffect(() => {
    activeToolRef.current = activeTool;
    if (mapContainerRef.current) {
      if (['polygon', 'rect', 'point', 'line', 'text', 'move', 'node_edit'].includes(activeTool)) {
        mapContainerRef.current.style.cursor = 'crosshair';
      } else if (activeTool === 'delete') {
        mapContainerRef.current.style.cursor = 'not-allowed';
      } else {
        mapContainerRef.current.style.cursor = '';
      }
    }
  }, [activeTool]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [isSearching, setIsSearching] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Layer toggles
  const [baseMap, setBaseMap] = useState('esri');
  const [layers, setLayers] = useState({
    esriLabels: true,
    adminBoundaries: true,
    landParcels: true,
    surveyBoundaries: true,
    parcelLabels: true,
    villageBoundaries: true,
    tehsilBoundaries: false,
    districtBoundaries: false,
    ulpinLabels: true,
    surveyNumbers: true,
    landUse: false,
    landownerInfo: false,
    bhuvanLulc: false,
    waterBodies: true,
    floodHazard: false,
    floodAnnual: false,
    wasteland: false,
    landDegradation: false,
    geomorphology: false,
    lineament: false,
    urbanLandUse: false,
    erosion: false,
    projectBoundary: true,
    acquisitionBoundary: true,
    corridorAlignment: true,
    rowBuffer: true,
    affectedParcels: true,
    acquisitionStatus: true,
    compensationStatus: false,
    rnrStatus: false
  });

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Trigger map size recalculation on layout changes, fullscreen toggle, or container resize
  useEffect(() => {
    const timer = setTimeout(() => {
      safeInvalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullscreen, isDrawerOpen, isTableOpen]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const ro = new ResizeObserver(() => {
      safeInvalidateSize();
    });
    ro.observe(mapContainerRef.current);
    return () => ro.disconnect();
  }, []);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    // Center on Petlad, Anand, Gujarat
    const map = L.map(mapContainerRef.current, {
      center: [22.5398, 72.9288],
      zoom: 16,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Persistent LayerGroup for parcels
    const parcelsGroup = L.layerGroup().addTo(map);
    parcelsLayerGroupRef.current = parcelsGroup;

    // Default Esri World Imagery Satellite Base Layer
    const esriTile = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 }
    ).addTo(map);
    tileLayerRef.current = esriTile;

    // Esri Labels Reference Layer
    const labelsTile = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 }
    ).addTo(map);
    labelsLayerRef.current = labelsTile;

    // Render Corridor Alignment (Orange/Gold Line)
    const corridorLine = L.polyline(DEFAULT_CORRIDOR_LINE, {
      color: '#f97316',
      weight: 4,
      dashArray: '8, 6',
      lineCap: 'round',
      opacity: 0.95
    }).addTo(map);
    corridorLayerRef.current = corridorLine;

    // Render 50m RoW Buffer (Translucent Yellow/Gold band)
    // Approximate buffer polygon along corridor
    const bufferPolyCoords = [
      [22.5443, 72.9226],
      [22.5418, 72.9271],
      [22.5388, 72.9306],
      [22.5343, 72.9346],
      [22.5337, 72.9354],
      [22.5382, 72.9314],
      [22.5412, 72.9279],
      [22.5437, 72.9234]
    ];
    const bufferPoly = L.polygon(bufferPolyCoords, {
      color: '#eab308',
      fillColor: '#facc15',
      fillOpacity: 0.22,
      weight: 1.5,
      dashArray: '4, 4'
    }).addTo(map);
    bufferLayerRef.current = bufferPoly;

    // Petlad Town Label Marker
    const petladIcon = L.divIcon({
      className: 'custom-town-marker',
      html: `<div class="bg-black/80 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap flex items-center gap-1 border border-white/40">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Petlad Town
      </div>`,
      iconSize: [80, 20],
      iconAnchor: [40, 10]
    });
    L.marker([22.5450, 72.9250], { icon: petladIcon }).addTo(map);

    // River Waterway Label Marker (Sabarmati Tributary)
    const riverIcon = L.divIcon({
      className: 'custom-river-marker',
      html: `<div class="text-cyan-300 font-serif italic text-xs tracking-wider font-semibold drop-shadow-md flex items-center gap-1">
        〰 Sabarmati Tributary
      </div>`,
      iconSize: [130, 20],
      iconAnchor: [65, 10]
    });
    L.marker([22.5360, 72.9230], { icon: riverIcon }).addTo(map);

    return () => {
      const map = mapInstanceRef.current;
      mapInstanceRef.current = null;
      if (map) {
        try {
          map.stop();
          map.remove();
        } catch (e) {
          // suppress
        }
      }
    };
  }, []);

  // 2. Update Basemap Tiles
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let maxZoom = 19;

    if (baseMap === 'osm') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    } else if (baseMap === 'carto') {
      url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else if (baseMap === 'bhuvan') {
      // Use standard imagery or proxy endpoint
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }

    const newTile = L.tileLayer(url, { maxZoom }).addTo(map);
    tileLayerRef.current = newTile;
    newTile.bringToBack();
  }, [baseMap]);

  // 3. Render and Update Cadastral Parcels
  useEffect(() => {
    if (!mapInstanceRef.current || !mapInstanceRef.current._mapPane) return;
    const map = mapInstanceRef.current;

    if (!parcelsLayerGroupRef.current) {
      parcelsLayerGroupRef.current = L.layerGroup().addTo(map);
    }
    parcelsLayerGroupRef.current.clearLayers();

    parcels.forEach(parcel => {
      const isSelected = selectedUlpins.includes(parcel.ulpin);
      const isActive = activeParcel?.ulpin === parcel.ulpin;

      // Determine polygon styling matching map image.png
      let fillColor = parcel.color || STATUTORY_COLORS.hearing;
      let strokeColor = isSelected ? '#0284c7' : '#ffffff';
      let strokeWidth = isSelected ? 3 : 1.5;
      let fillOpacity = isSelected ? 0.65 : 0.45;

      const polygon = L.polygon(parcel.coordinates, {
        color: strokeColor,
        weight: strokeWidth,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        className: `cadastral-parcel-${parcel.surveyNo}`
      });

      // Label Marker at Polygon Centroid
      const centroid = [
        (parcel.coordinates[0][0] + parcel.coordinates[2][0]) / 2,
        (parcel.coordinates[0][1] + parcel.coordinates[2][1]) / 2
      ];

      const labelIcon = L.divIcon({
        className: 'custom-parcel-label',
        html: `<div class="text-center font-bold text-[10px] text-white select-none pointer-events-none drop-shadow-md">
          <div class="px-1 py-0.5 rounded bg-black/60 border border-white/50 backdrop-blur-xs font-mono inline-block">
            ${parcel.surveyNo}
          </div>
        </div>`,
        iconSize: [40, 20],
        iconAnchor: [20, 10]
      });
      const marker = L.marker(centroid, { icon: labelIcon });

      // Active Callout for 142/A as in map image.png
      if (parcel.surveyNo === '142/A' && isSelected) {
        const calloutIcon = L.divIcon({
          className: 'custom-ulpin-callout',
          html: `<div class="bg-blue-900/90 text-white border border-cyan-400 px-2.5 py-1 rounded shadow-lg font-mono text-[10px] font-bold whitespace-nowrap flex items-center gap-1 -translate-y-4">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            ULPIN: ${parcel.ulpin}
          </div>`,
          iconSize: [140, 24],
          iconAnchor: [70, 24]
        });
        const calloutMarker = L.marker([parcel.coordinates[0][0], parcel.coordinates[0][1]], { icon: calloutIcon });
        parcelsLayerGroupRef.current.addLayer(calloutMarker);
      }

      // Click event on parcel
      polygon.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        const currentTool = activeToolRef.current;

        if (currentTool === 'delete') {
          handleDeleteSpecificParcel(parcel);
          return;
        }
        if (currentTool === 'cut') {
          handleCutSpecificParcel(parcel);
          return;
        }
        if (currentTool === 'move') {
          setMovingParcel(parcel);
          setUploadStatus(`Survey ${parcel.surveyNo} selected for move. Click anywhere on the map to shift its position.`);
          return;
        }
        if (currentTool === 'node_edit') {
          setActiveParcel(parcel);
          setIsDrawerOpen(true);
          setUploadStatus(`Survey ${parcel.surveyNo} nodes active. Drag corner handles to reshape boundary.`);
          return;
        }

        // Default selection & inspection
        setActiveParcel(parcel);
        setIsDrawerOpen(true);
        if (onSelectParcelRef.current) {
          onSelectParcelRef.current(parcel);
        }
        // Toggle selection status so user has full power to select or deselect any parcel
        setSelectedUlpins(prev => 
          prev.includes(parcel.ulpin) 
            ? prev.filter(id => id !== parcel.ulpin) 
            : [...prev, parcel.ulpin]
        );
      });

      parcelsLayerGroupRef.current.addLayer(polygon);
      parcelsLayerGroupRef.current.addLayer(marker);
    });
  }, [parcels, selectedUlpins, activeParcel]);

  // Map click handler for drawing and interaction tools
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const onMapClick = (e) => {
      const tool = activeToolRef.current;
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      if (tool === 'polygon' || tool === 'line') {
        const currentPts = drawingPointsRef.current;
        if (currentPts.length >= 3) {
          const startPt = currentPts[0];
          const dLat = Math.abs(lat - startPt[0]);
          const dLng = Math.abs(lng - startPt[1]);
          // If clicked near starting point, auto-convert directly to parcel polygon!
          if (dLat < 0.0012 && dLng < 0.0012) {
            finishPolygon(currentPts);
            return;
          }
        }
        setDrawingPoints(prev => [...prev, [lat, lng]]);
      } else if (tool === 'rect') {
        createRectParcel(lat, lng);
      } else if (tool === 'point') {
        createLandmarkPoint(lat, lng);
      } else if (tool === 'text') {
        createAnnotation(lat, lng);
      } else if (tool === 'move') {
        if (movingParcelRef.current) {
          shiftParcelToLocation(movingParcelRef.current, lat, lng);
        }
      }
    };

    const onMapDblClick = (e) => {
      const tool = activeToolRef.current;
      if ((tool === 'line' || tool === 'polygon') && drawingPointsRef.current.length >= 3) {
        L.DomEvent.stopPropagation(e);
        finishPolygon(drawingPointsRef.current);
      }
    };

    map.on('click', onMapClick);
    map.on('dblclick', onMapDblClick);
    return () => {
      map.off('click', onMapClick);
      map.off('dblclick', onMapDblClick);
    };
  }, []);

  // Live preview for drawing polygon/line
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (drawingLayerRef.current) {
      map.removeLayer(drawingLayerRef.current);
      drawingLayerRef.current = null;
    }

    if (drawingPoints.length > 0) {
      const group = L.layerGroup();
      
      drawingPoints.forEach((pt, idx) => {
        const isStartNode = idx === 0 && drawingPoints.length >= 3;
        const marker = L.circleMarker(pt, {
          radius: isStartNode ? 7 : 5,
          color: isStartNode ? '#10b981' : '#2563eb',
          fillColor: isStartNode ? '#34d399' : '#ffffff',
          fillOpacity: 1,
          weight: isStartNode ? 3 : 2
        });

        if (isStartNode) {
          marker.bindTooltip('Click to close & create parcel', { permanent: false, direction: 'top' });
          marker.on('click', (ev) => {
            L.DomEvent.stopPropagation(ev);
            finishPolygon(drawingPointsRef.current);
          });
        }

        group.addLayer(marker);
      });

      if (drawingPoints.length >= 3) {
        // Render polygon preview with fill
        const polygonPreview = L.polygon(drawingPoints, {
          color: '#2563eb',
          weight: 2.5,
          dashArray: '5, 5',
          fillColor: '#3b82f6',
          fillOpacity: 0.25
        });
        group.addLayer(polygonPreview);
      } else if (drawingPoints.length === 2) {
        const line = L.polyline(drawingPoints, {
          color: '#3b82f6',
          weight: 2.5,
          dashArray: '5, 5'
        });
        group.addLayer(line);
      }

      group.addTo(map);
      drawingLayerRef.current = group;
    }

    return () => {
      if (drawingLayerRef.current && mapInstanceRef.current && mapInstanceRef.current._mapPane) {
        try {
          mapInstanceRef.current.removeLayer(drawingLayerRef.current);
        } catch (e) {
          // suppress
        }
        drawingLayerRef.current = null;
      }
    };
  }, [drawingPoints]);

  // Persistent annotations layer on map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (annotationsLayerRef.current && map._mapPane) {
      try {
        map.removeLayer(annotationsLayerRef.current);
      } catch (e) {}
      annotationsLayerRef.current = null;
    }

    if (annotations.length > 0) {
      const group = L.layerGroup();
      annotations.forEach((item) => {
        const icon = L.divIcon({
          className: 'custom-annotation-pin',
          html: `<div class="bg-amber-100 text-amber-900 border border-amber-400 px-2 py-0.5 rounded shadow-md text-[10px] font-bold whitespace-nowrap flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer">
            <span>📌</span>
            <span>${item.text}</span>
          </div>`,
          iconSize: [120, 24],
          iconAnchor: [60, 12]
        });

        const marker = L.marker([item.lat, item.lng], { icon });
        const popupContent = document.createElement('div');
        popupContent.className = 'text-xs p-1 font-sans';
        popupContent.innerHTML = `
          <div class="font-bold text-slate-800 text-xs">📌 ${item.text}</div>
          <div class="text-slate-500 text-[10px] mt-0.5">GPS: ${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}</div>
          <button class="mt-2 px-2 py-0.5 bg-red-50 text-red-700 hover:bg-red-100 rounded text-[10px] font-semibold border border-red-200 cursor-pointer">
            Delete Annotation
          </button>
        `;
        const delBtn = popupContent.querySelector('button');
        if (delBtn) {
          delBtn.onclick = () => {
            setAnnotations(prev => prev.filter(a => a.id !== item.id));
            map.closePopup();
          };
        }

        marker.bindPopup(popupContent);
        group.addLayer(marker);
      });

      group.addTo(map);
      annotationsLayerRef.current = group;
    }

    return () => {
      if (annotationsLayerRef.current && mapInstanceRef.current && mapInstanceRef.current._mapPane) {
        try {
          mapInstanceRef.current.removeLayer(annotationsLayerRef.current);
        } catch (e) {
          // suppress
        }
        annotationsLayerRef.current = null;
      }
    };
  }, [annotations]);

  // Finish polygon and compute real-time area with Turf.js
  const finishPolygon = (pts = drawingPointsRef.current) => {
    if (!pts || pts.length < 3) {
      alert('A cadastral parcel polygon requires at least 3 boundary vertices. Click on the map to add more points.');
      return;
    }

    try {
      // Turf expects [lng, lat]
      const closedRing = [...pts, pts[0]].map(p => [p[1], p[0]]);
      const poly = turf.polygon([closedRing]);
      const areaSqM = turf.area(poly);
      const totalAreaAcre = Number((areaSqM * 0.000247105).toFixed(2)) || 1.45;
      const areaHa = Number((areaSqM / 10000).toFixed(2)) || 0.58;

      const newUlpin = `2405${Date.now().toString().slice(-10)}`;
      const newSurveyNo = `${Math.floor(Math.random() * 80 + 170)}/P`;

      const newParcel = {
        ulpin: newUlpin,
        surveyNo: newSurveyNo,
        village: selectedVillage !== 'ALL' ? selectedVillage : 'Petlad',
        taluka: 'Petlad',
        district: 'Anand',
        state: 'Gujarat',
        totalAreaAcre,
        areaHa,
        requiredAreaAcre: totalAreaAcre,
        affectedAreaAcre: totalAreaAcre,
        impactPct: 100,
        landUse: 'Agricultural (Irrigated)',
        soilType: 'Goradu (Sandy Loam)',
        marketValuePerAcre: 1850000,
        solatiumPct: 100,
        statutoryStatus: 'Section 11 Notification Published',
        compensationStatus: 'Assessment in Progress',
        rnrStatus: 'Eligible (Category-1)',
        color: '#10b981',
        coordinates: pts,
        owners: [
          { name: 'Surveyor Field Ingest / Self-Drawn Parcel', share: '100%', relation: 'Self' }
        ],
        treesCount: 2,
        structuresCount: 0,
        encumbrance: 'Nil (Clean Title)'
      };

      setParcels(prev => [newParcel, ...prev]);
      setSelectedUlpins(prev => [...prev, newParcel.ulpin]);
      setActiveParcel(newParcel);
      setIsDrawerOpen(true);
      setDrawingPoints([]);
      setActiveTool('select');
      setUploadStatus(`Drawn parcel Survey ${newSurveyNo} created: ${totalAreaAcre} Acres (calculated via Turf.js)`);
      setTimeout(() => setUploadStatus(null), 5000);
    } catch (err) {
      console.error('Turf area calculation error:', err);
    }
  };

  const createRectParcel = (lat, lng) => {
    const dLat = 0.0006;
    const dLng = 0.0009;
    const pts = [
      [lat + dLat, lng - dLng],
      [lat + dLat, lng + dLng],
      [lat - dLat, lng + dLng],
      [lat - dLat, lng - dLng]
    ];
    finishPolygon(pts);
  };

  const createLandmarkPoint = (lat, lng) => {
    if (!mapInstanceRef.current) return;
    const icon = L.divIcon({
      className: 'custom-pin-marker',
      html: `<div class="bg-red-600 text-white p-1 rounded-full shadow-lg border-2 border-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        <div class="w-2 h-2 bg-white rounded-full"></div>
      </div>`,
      iconSize: [20, 20]
    });
    L.marker([lat, lng], { icon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`<div class="text-xs font-sans"><b>Survey Reference Station</b><br>GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}</div>`)
      .openPopup();
    setActiveTool('select');
    setUploadStatus(`Survey Reference Station placed at ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    setTimeout(() => setUploadStatus(null), 4000);
  };

  const createAnnotation = (lat, lng) => {
    setAnnotationPrompt({
      lat,
      lng,
      text: 'Proposed RoW Marker',
      category: 'RoW Marker'
    });
  };

  const handleSaveAnnotation = () => {
    if (!annotationPrompt || !annotationPrompt.text.trim()) {
      setAnnotationPrompt(null);
      return;
    }
    const newAnn = {
      id: `ann-${Date.now()}`,
      lat: annotationPrompt.lat,
      lng: annotationPrompt.lng,
      text: annotationPrompt.text.trim(),
      category: annotationPrompt.category || 'RoW Marker'
    };
    setAnnotations(prev => [...prev, newAnn]);
    setAnnotationPrompt(null);
    setActiveTool('select');
    setUploadStatus(`Annotation "📌 ${newAnn.text}" placed on map`);
    setTimeout(() => setUploadStatus(null), 4000);
  };

  const finishLineCorridor = () => {
    const pts = drawingPointsRef.current;
    if (pts.length < 2) {
      alert('A corridor alignment line requires at least 2 points. Click on map to place points.');
      return;
    }
    // If user drew 3 or more points and it closed or forms a polygon:
    if (pts.length >= 3) {
      const startPt = pts[0];
      const endPt = pts[pts.length - 1];
      const dLat = Math.abs(endPt[0] - startPt[0]);
      const dLng = Math.abs(endPt[1] - startPt[1]);
      if (dLat < 0.0012 && dLng < 0.0012) {
        finishPolygon(pts);
        return;
      }
    }
    try {
      const lineGeo = turf.lineString(pts.map(p => [p[1], p[0]]));
      const lengthKm = turf.length(lineGeo, { units: 'kilometers' }).toFixed(2);
      const lengthM = Math.round(turf.length(lineGeo, { units: 'meters' }));

      if (mapInstanceRef.current) {
        const line = L.polyline(pts, {
          color: '#f59e0b',
          weight: 4,
          dashArray: '8, 4'
        }).addTo(mapInstanceRef.current);
        line.bindPopup(`<b>Proposed Corridor Alignment</b><br>Length: ${lengthKm} km (${lengthM} m)<br>RoW: 30m Buffer`).openPopup();
      }

      setDrawingPoints([]);
      setActiveTool('select');
      setUploadStatus(`Corridor alignment of ${lengthKm} km (${lengthM} m) created!`);
      setTimeout(() => setUploadStatus(null), 5000);
    } catch (err) {
      console.error('Error creating corridor line:', err);
    }
  };

  const shiftParcelToLocation = (targetParcel, targetLat, targetLng) => {
    if (!targetParcel || !targetParcel.coordinates || targetParcel.coordinates.length === 0) return;
    const coords = targetParcel.coordinates;
    const avgLat = coords.reduce((acc, c) => acc + c[0], 0) / coords.length;
    const avgLng = coords.reduce((acc, c) => acc + c[1], 0) / coords.length;
    const deltaLat = targetLat - avgLat;
    const deltaLng = targetLng - avgLng;

    const shiftedCoords = coords.map(([lat, lng]) => [lat + deltaLat, lng + deltaLng]);
    const updatedParcel = {
      ...targetParcel,
      coordinates: shiftedCoords
    };

    setParcels(prev => prev.map(p => p.ulpin === targetParcel.ulpin ? updatedParcel : p));
    setActiveParcel(updatedParcel);
    setMovingParcel(null);
    setActiveTool('select');
    setUploadStatus(`Survey ${targetParcel.surveyNo} shifted to GPS ${targetLat.toFixed(4)}, ${targetLng.toFixed(4)}.`);
    setTimeout(() => setUploadStatus(null), 4000);
  };

  // Vertex handles draggable layer effect for node_edit
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (vertexHandlesLayerRef.current) {
      map.removeLayer(vertexHandlesLayerRef.current);
      vertexHandlesLayerRef.current = null;
    }

    if (activeTool === 'node_edit' && activeParcel && activeParcel.coordinates) {
      const group = L.layerGroup();
      activeParcel.coordinates.forEach((pt, index) => {
        const marker = L.marker(pt, {
          draggable: true,
          icon: L.divIcon({
            className: 'custom-vertex-node',
            html: `<div class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg hover:scale-125 transition-transform cursor-grab active:cursor-grabbing flex items-center justify-center text-[9px] text-white font-bold">${index + 1}</div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        });

        marker.on('dragend', (e) => {
          const newPos = e.target.getLatLng();
          handleVertexDragEnd(index, [newPos.lat, newPos.lng]);
        });

        group.addLayer(marker);
      });

      group.addTo(map);
      vertexHandlesLayerRef.current = group;
    }

    return () => {
      if (vertexHandlesLayerRef.current && mapInstanceRef.current && mapInstanceRef.current._mapPane) {
        try {
          mapInstanceRef.current.removeLayer(vertexHandlesLayerRef.current);
        } catch (e) {
          // suppress
        }
        vertexHandlesLayerRef.current = null;
      }
    };
  }, [activeTool, activeParcel]);

  const handleVertexDragEnd = (index, newCoord) => {
    if (!activeParcel || !activeParcel.coordinates) return;
    const newCoords = [...activeParcel.coordinates];
    newCoords[index] = newCoord;

    try {
      const closedRing = [...newCoords, newCoords[0]].map(p => [p[1], p[0]]);
      const poly = turf.polygon([closedRing]);
      const areaSqM = turf.area(poly);
      const newAcres = Number((areaSqM * 0.000247105).toFixed(2)) || activeParcel.totalAreaAcre;
      const newHa = Number((areaSqM / 10000).toFixed(2)) || activeParcel.areaHa;

      const updatedParcel = {
        ...activeParcel,
        coordinates: newCoords,
        totalAreaAcre: newAcres,
        areaHa: newHa,
        requiredAreaAcre: newAcres,
        affectedAreaAcre: newAcres
      };

      setParcels(prev => prev.map(p => p.ulpin === activeParcel.ulpin ? updatedParcel : p));
      setActiveParcel(updatedParcel);
      setUploadStatus(`Survey ${activeParcel.surveyNo} Node #${index + 1} adjusted. New Area: ${newAcres} Acres.`);
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err) {
      console.error('Turf area recalculation error:', err);
    }
  };

  const handleCutSpecificParcel = (targetParcel = activeParcel) => {
    if (!targetParcel) {
      alert('Please click on a parcel on the map to split / subdivide.');
      return;
    }
    const coords = targetParcel.coordinates;
    if (!coords || coords.length < 4) {
      alert('Selected parcel cannot be split (insufficient vertices).');
      return;
    }

    const midTop = [
      (coords[0][0] + coords[1][0]) / 2,
      (coords[0][1] + coords[1][1]) / 2
    ];
    const midBottom = [
      (coords[2][0] + coords[3][0]) / 2,
      (coords[2][1] + coords[3][1]) / 2
    ];

    const part1Coords = [coords[0], midTop, midBottom, coords[3]];
    const part2Coords = [midTop, coords[1], coords[2], midBottom];

    // Calculate areas with Turf
    const poly1 = turf.polygon([[...part1Coords, part1Coords[0]].map(p => [p[1], p[0]])]);
    const poly2 = turf.polygon([[...part2Coords, part2Coords[0]].map(p => [p[1], p[0]])]);
    const area1 = Number((turf.area(poly1) * 0.000247105).toFixed(2)) || Number((targetParcel.totalAreaAcre / 2).toFixed(2));
    const area2 = Number((turf.area(poly2) * 0.000247105).toFixed(2)) || Number((targetParcel.totalAreaAcre / 2).toFixed(2));

    const parcel1 = {
      ...targetParcel,
      ulpin: `2405${Date.now().toString().slice(-9)}1`,
      surveyNo: `${targetParcel.surveyNo}/1`,
      totalAreaAcre: area1,
      areaHa: Number((area1 * 0.404686).toFixed(2)),
      requiredAreaAcre: area1,
      affectedAreaAcre: area1,
      coordinates: part1Coords,
      color: '#0ea5e9'
    };
    const parcel2 = {
      ...targetParcel,
      ulpin: `2405${Date.now().toString().slice(-9)}2`,
      surveyNo: `${targetParcel.surveyNo}/2`,
      totalAreaAcre: area2,
      areaHa: Number((area2 * 0.404686).toFixed(2)),
      requiredAreaAcre: area2,
      affectedAreaAcre: area2,
      coordinates: part2Coords,
      color: '#8b5cf6'
    };

    setParcels(prev => [parcel1, parcel2, ...prev.filter(p => p.ulpin !== targetParcel.ulpin)]);
    setSelectedUlpins(prev => [...prev.filter(u => u !== targetParcel.ulpin), parcel1.ulpin, parcel2.ulpin]);
    setActiveParcel(parcel1);
    setActiveTool('select');
    setUploadStatus(`Parcel Survey ${targetParcel.surveyNo} subdivided into ${parcel1.surveyNo} (${area1} Acres) & ${parcel2.surveyNo} (${area2} Acres).`);
    setTimeout(() => setUploadStatus(null), 5000);
  };

  const handleDeleteSpecificParcel = (targetParcel = activeParcel) => {
    if (!targetParcel) {
      alert('Please click on a parcel to erase/delete.');
      return;
    }
    const targetUlpin = targetParcel.ulpin;
    const targetSurvey = targetParcel.surveyNo;
    setParcels(prev => prev.filter(p => p.ulpin !== targetUlpin));
    setSelectedUlpins(prev => prev.filter(u => u !== targetUlpin));
    if (activeParcel && activeParcel.ulpin === targetUlpin) {
      setActiveParcel(null);
      setIsDrawerOpen(false);
    }
    setActiveTool('select');
    setUploadStatus(`Parcel Survey ${targetSurvey} erased.`);
    setTimeout(() => setUploadStatus(null), 4000);
  };

  const handleToolbarAction = (toolId) => {
    if (toolId === 'cut') {
      if (activeParcel) {
        handleCutSpecificParcel(activeParcel);
      } else {
        setActiveTool('cut');
        setUploadStatus('Click any parcel on the map to split / subdivide it.');
        setTimeout(() => setUploadStatus(null), 4000);
      }
    } else if (toolId === 'delete') {
      if (activeParcel) {
        handleDeleteSpecificParcel(activeParcel);
      } else {
        setActiveTool('delete');
        setUploadStatus('Click any parcel on the map to erase it.');
        setTimeout(() => setUploadStatus(null), 4000);
      }
    } else if (toolId === 'move') {
      setActiveTool('move');
      if (activeParcel) {
        setMovingParcel(activeParcel);
        setUploadStatus(`Survey ${activeParcel.surveyNo} selected. Click on map to shift its position.`);
      } else {
        setUploadStatus('Click on any parcel to select it for moving.');
      }
      setTimeout(() => setUploadStatus(null), 4000);
    } else if (toolId === 'node_edit') {
      setActiveTool('node_edit');
      if (activeParcel) {
        setUploadStatus(`Drag corner handles on Survey ${activeParcel.surveyNo} to reshape boundary.`);
      } else {
        setUploadStatus('Click any parcel on the map to edit its vertices.');
      }
      setTimeout(() => setUploadStatus(null), 4000);
    } else if (toolId === 'simulate') {
      handleSimulateCorridor();
    } else if (toolId === 'measure') {
      setActiveTool('measure');
      setUploadStatus('Click any two points on the map to measure geodesic distance.');
      setTimeout(() => setUploadStatus(null), 4000);
    } else if (toolId === 'buffer') {
      setActiveTool('buffer');
      setUploadStatus('50m Right-of-Way (RoW) buffer corridor actively generated along NH-48 alignment.');
      setTimeout(() => setUploadStatus(null), 4000);
    } else {
      setActiveTool(toolId);
      setDrawingPoints([]);
    }
  };

  // Handle Universal Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    try {
      const result = await universalSearch(searchQuery, parcels);
      if (result) {
        if (result.type === 'PARCEL') {
          setActiveParcel(result.data);
          setIsDrawerOpen(true);
          if (mapInstanceRef.current && result.center) {
            mapInstanceRef.current.setView(result.center, 18, { animate: true });
          }
        } else if (result.type === 'VILLAGE_LOCAL') {
          if (mapInstanceRef.current && result.center) {
            mapInstanceRef.current.setView(result.center, 16, { animate: true });
          }
        } else if (result.lat && result.lon && mapInstanceRef.current) {
          mapInstanceRef.current.setView([result.lat, result.lon], 15, { animate: true });
        }
      } else {
        alert(`No spatial cadastral records found for "${searchQuery}". Try "142/A" or "Petlad".`);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Village Filter Change
  const handleVillageChange = (vil) => {
    setSelectedVillage(vil);
    if (vil === 'ALL') {
      if (mapInstanceRef.current) mapInstanceRef.current.setView([22.5398, 72.9288], 16);
      return;
    }
    const matched = parcels.filter(p => p.village.toLowerCase() === vil.toLowerCase());
    if (matched.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.setView(matched[0].coordinates[0], 17, { animate: true });
    }
  };

  // Corridor File Upload Trigger
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('Uploading & clipping corridor...');
    try {
      const result = await uploadCorridorFile(file);
      setUploadStatus(`Corridor loaded: ${result.fileName} (${result.corridorLengthKm} km)`);
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err) {
      setUploadStatus('Upload failed');
    }
  };

  // Simulate Corridor Trigger
  const handleSimulateCorridor = async () => {
    setActiveTool('simulate');
    const result = await simulateCorridor(DEFAULT_CORRIDOR_LINE, 50);
    if (result && result.parcels) {
      setSelectedUlpins(result.parcels.map(p => p.ulpin));
    }
  };

  // Toggle Single Parcel in Selection
  const handleToggleSelect = (ulpin) => {
    setSelectedUlpins(prev => 
      prev.includes(ulpin) ? prev.filter(id => id !== ulpin) : [...prev, ulpin]
    );
  };

  const handleSelectAll = () => {
    setSelectedUlpins(parcels.map(p => p.ulpin));
  };

  const handleClearAll = () => {
    setSelectedUlpins([]);
  };

  const handleLocateParcel = (parcel) => {
    setActiveParcel(parcel);
    if (mapInstanceRef.current && parcel.coordinates) {
      mapInstanceRef.current.setView(parcel.coordinates[0], 18, { animate: true });
    }
  };

  // Calculate Aggregated Selected Metrics
  const selectedParcelsList = parcels.filter(p => selectedUlpins.includes(p.ulpin));
  const totalAreaAcres = selectedParcelsList.reduce((acc, p) => acc + (p.totalAreaAcre || 0), 0);
  const affectedVillages = [...new Set(selectedParcelsList.map(p => p.village))];

  const mapContent = (
    <div 
      ref={fullscreenContainerRef}
      className={
        isFullscreen 
          ? 'fixed inset-0 z-[99999] w-screen h-screen m-0 p-0 rounded-none overflow-hidden bg-slate-100 flex flex-col select-none' 
          : `w-full relative rounded-lg bg-slate-900 border border-slate-700/80 shadow-xl flex flex-col select-none ${className}`
      }
    >
      {/* 1. TOP SEARCH & ACTION BAR */}
      <div className={`bg-white border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 select-none shadow-2xs shrink-0 ${
        isFullscreen ? 'z-30' : 'z-20'
      }`}>
        {/* Search Input */}
        <form onSubmit={handleSearch} className="w-full sm:flex-1 min-w-[150px] sm:min-w-[240px] max-w-md relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Survey No, Village, Boundary, ULPIN, Owner..."
            className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs pl-7 pr-6 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </form>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Village Filter */}
          <div className="relative">
            <select
              value={selectedVillage}
              onChange={(e) => handleVillageChange(e.target.value)}
              className="bg-white text-slate-700 text-[11px] sm:text-xs border border-slate-300 rounded px-2 py-1 appearance-none pr-5 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Villages</option>
              <option value="Petlad">Petlad</option>
              <option value="Sunav">Sunav</option>
              <option value="Bandhani">Bandhani</option>
              <option value="Agas">Agas</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 top-2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={handleSelectAll}
            className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-300 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-300 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          >
            Clear
          </button>

          {/* Upload Corridor File */}
          <label className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 border border-blue-400 text-blue-800 text-[11px] sm:text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
            <UploadCloud className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div className="text-left">
              <span className="block leading-tight text-[11px] sm:text-xs">Upload<span className="hidden sm:inline"> Corridor KML / GeoJSON / Shapefile</span></span>
              <span className="text-[9px] text-blue-600/80 block font-normal hidden md:block">Supports .kml, .geojson, .shp (max 50 MB)</span>
            </div>
            <input
              type="file"
              accept=".kml,.kmz,.geojson,.json,.shp,.zip"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Maximize / Exit Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded font-bold text-[11px] sm:text-xs border transition-colors shadow-xs cursor-pointer ${
              isFullscreen 
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-700 shadow-md' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Maximize Map to Fullscreen'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-white" />
                <span className="hidden xs:inline">Exit (Esc)</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden xs:inline">Maximize</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. GIS TOOLS BAR */}
      {showTools && (
        <div className="bg-white border-b border-slate-200 px-2 sm:px-3 py-1 flex items-center justify-between text-xs select-none shadow-2xs z-20 shrink-0 gap-1 sm:gap-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 touch-pan-x">
            <span className="text-[11px] font-extrabold text-slate-700 mr-1.5 uppercase tracking-wider shrink-0">
              TOOLS:
            </span>
            {[
              { id: 'polygon', label: 'Polygon', icon: Triangle, iconColor: 'text-amber-500' },
              { id: 'line', label: 'Line / Corridor', icon: Slash, iconColor: 'text-blue-500' },
              { id: 'rect', label: 'Rectangle', icon: Square, iconColor: 'text-emerald-500' },
              { id: 'circle', label: 'Circle', icon: Circle, iconColor: 'text-purple-500' },
              { id: 'cut', label: 'Cut', icon: Scissors },
              { id: 'node_edit', label: 'Edit', icon: Pencil },
              { id: 'move', label: 'Move', icon: Move },
              { id: 'delete', label: 'Delete', icon: Trash2 },
              { id: 'measure', label: 'Measure', icon: Ruler },
              { id: 'buffer', label: 'Buffer', icon: Layers },
              { id: 'simulate', label: 'Simulate Corridor', icon: Play, highlight: true }
            ].map(tool => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleToolbarAction(tool.id)}
                  title={tool.label}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer relative group shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : tool.highlight
                      ? 'bg-orange-50 text-orange-600 border border-orange-300 hover:bg-orange-100 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${tool.iconColor && !isActive ? tool.iconColor : ''}`} />
                  <span className={isFullscreen ? 'inline' : 'hidden xl:inline'}>{tool.label}</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-medium rounded shadow-xl whitespace-nowrap hidden group-hover:block xl:group-hover:hidden pointer-events-none z-50">
                    {tool.label}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsTableOpen(!isTableOpen)}
            className="text-[11px] text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 transition-colors shrink-0 ml-2 cursor-pointer font-medium whitespace-nowrap"
          >
            {isTableOpen ? 'Hide Table' : 'Show Table'}
          </button>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      <div className={isFullscreen ? 'flex-1 min-h-0 flex overflow-hidden bg-slate-100' : 'w-full flex flex-col'}>
        {/* LEFT COLUMN: Map Layers Panel (Sidebar Mode in Fullscreen) */}
        {isFullscreen && (
          <div className={`shrink-0 bg-white border-r border-slate-200 h-full flex flex-col overflow-hidden z-10 transition-all ${
            isLayersCollapsed ? 'w-12' : 'w-60 xl:w-64'
          }`}>
            <MapLayerPanel
              baseMap={baseMap}
              setBaseMap={setBaseMap}
              layers={layers}
              toggleLayer={toggleLayer}
              isCollapsed={isLayersCollapsed}
              setIsCollapsed={setIsLayersCollapsed}
              isSidebarMode={true}
            />
          </div>
        )}

        {/* CENTER COLUMN: Map Canvas + Selected Parcels Table */}
        <div className={isFullscreen ? 'flex-1 min-w-0 h-full flex flex-col overflow-hidden' : 'w-full flex flex-col'}>
          {/* MAP CANVAS VIEWPORT */}
          <div 
            style={height && !isFullscreen ? { height } : undefined}
            className={`relative w-full overflow-hidden ${
              isFullscreen 
                ? 'flex-1 min-h-[260px]' 
                : height
                ? 'shrink-0'
                : 'h-[360px] sm:h-[460px] lg:h-[490px] shrink-0'
            }`}
          >
            {/* THE ONE AND ONLY LEAFLET CONTAINER DIV */}
            <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-950" />

            {/* Floating Map Layers (ONLY in minimized mode) */}
            {!isFullscreen && (
              <div className="absolute top-3 left-3 z-10">
                <MapLayerPanel
                  baseMap={baseMap}
                  setBaseMap={setBaseMap}
                  layers={layers}
                  toggleLayer={toggleLayer}
                  isCollapsed={isLayersCollapsed}
                  setIsCollapsed={setIsLayersCollapsed}
                />
              </div>
            )}

            {/* Top Center KPI Metric Pill */}
            <div className={`absolute top-2 z-20 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg shadow-md px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center gap-2 sm:gap-3.5 text-xs select-none pointer-events-auto transition-all ${
              isFullscreen 
                ? 'left-1/2 -translate-x-1/2' 
                : isDrawerOpen ? 'left-2 sm:left-[190px]' : 'left-1/2 -translate-x-1/2'
            } max-w-[calc(100%-20px)] sm:max-w-[calc(100%-120px)] overflow-x-auto scrollbar-none`}>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[9px] text-slate-500 font-bold uppercase whitespace-nowrap">Selected</span>
                <span className="font-bold text-blue-700 text-xs sm:text-sm">
                  {selectedParcelsList.length} / {parcels.length}
                </span>
              </div>
              <div className="w-px h-5 sm:h-6 bg-slate-200 shrink-0" />
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[9px] text-slate-500 font-bold uppercase whitespace-nowrap">Total Area</span>
                <span className="font-bold text-emerald-700 text-xs sm:text-sm whitespace-nowrap">
                  {totalAreaAcres.toFixed(1)} Acres
                </span>
              </div>
              <div className="w-px h-5 sm:h-6 bg-slate-200 shrink-0" />
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[9px] text-slate-500 font-bold uppercase whitespace-nowrap">Villages</span>
                <span className="font-bold text-purple-700 text-xs max-w-[120px] sm:max-w-[160px] truncate" title={affectedVillages.join(', ') || 'Petlad, Sunav, Bandhani, Agas'}>
                  {affectedVillages.join(', ') || 'Petlad, Sunav, Bandhani, Agas'}
                </span>
              </div>
              <div className="w-px h-5 sm:h-6 bg-slate-200 shrink-0 hidden xs:block" />
              <div className="flex flex-col items-center shrink-0 hidden xs:flex">
                <span className="text-[9px] text-slate-500 font-bold uppercase whitespace-nowrap">Alignment</span>
                <span className="font-bold text-emerald-600 text-xs whitespace-nowrap">
                  100% Clipped
                </span>
              </div>
            </div>

            {/* Floating Plot Status Legend (Top Right of Map) */}
            {(isFullscreen || !isDrawerOpen) && (
              <div className="absolute top-3 right-3 z-20">
                <GISLegend />
              </div>
            )}

            {/* Map Nav Zoom Controls */}
            <div className={`absolute z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-md shadow-md p-1 pointer-events-auto ${
              isFullscreen ? 'top-3 left-3' : 'bottom-12 left-3'
            }`}>
              <button
                type="button"
                onClick={() => mapInstanceRef.current?.zoomIn()}
                className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                title="Zoom In"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => mapInstanceRef.current?.zoomOut()}
                className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                title="Zoom Out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => mapInstanceRef.current?.setView([22.5398, 72.9288], 16)}
                className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                title="Center Alignment"
              >
                <Crosshair className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => mapInstanceRef.current?.setView([22.5398, 72.9288], 16)}
                className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                title="North Navigation"
              >
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scale & North Compass Needle (Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-20 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-3 border border-white/20 select-none">
              <div className="flex items-center gap-1 font-bold text-amber-400">
                <Compass className="w-3.5 h-3.5" /> N
              </div>
              <div className="border-l border-white/30 pl-2">
                22.5421° N, 72.9281° E
              </div>
              <div className="border-l border-white/30 pl-2 flex items-center gap-1">
                <div className="w-12 h-1 bg-white/80 border-b border-black" />
                <span>400 m</span>
              </div>
            </div>

            {/* ACTIVE TOOL FLOATING BANNERS */}
            {activeTool === 'line' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex flex-wrap items-center gap-2.5 text-xs backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${drawingPoints.length >= 3 ? 'bg-emerald-400' : 'bg-amber-400'} animate-ping`}></span>
                  <span className="font-semibold">
                    {drawingPoints.length === 0
                      ? 'Click on map to draw alignment or polygon parcel'
                      : drawingPoints.length >= 3
                      ? `Shape: ${drawingPoints.length} points (polygon formed)`
                      : `Line: ${drawingPoints.length} points placed`}
                  </span>
                </div>
                {drawingPoints.length >= 3 && (
                  <button
                    type="button"
                    onClick={() => finishPolygon()}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 font-bold rounded text-white shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                    title="Convert this drawn line shape into a cadastral parcel with full details and area"
                  >
                    <Check className="w-3.5 h-3.5" /> Convert to Parcel (Turf.js)
                  </button>
                )}
                {drawingPoints.length >= 2 && (
                  <button
                    type="button"
                    onClick={finishLineCorridor}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 font-bold rounded text-slate-950 shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Line Corridor
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDrawingPoints([]);
                    setActiveTool('select');
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'polygon' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-semibold">
                    {drawingPoints.length === 0 
                      ? 'Click on map to place boundary vertices' 
                      : `Boundary: ${drawingPoints.length} vertices added`}
                  </span>
                </div>
                {drawingPoints.length >= 3 && (
                  <button
                    type="button"
                    onClick={() => finishPolygon()}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 font-bold rounded text-white shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Complete & Calculate (Turf.js)
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDrawingPoints([]);
                    setActiveTool('select');
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'rect' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">Click anywhere on the map to place a cadastral parcel rectangle.</span>
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'point' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">Click anywhere on the map to place a Reference GPS Station / Cadastral Peg.</span>
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'text' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">Click anywhere on the map to place a Text Annotation label.</span>
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'cut' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">Click on any parcel on the map to split / subdivide into 2 sub-parcels.</span>
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'node_edit' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">
                  {activeParcel 
                    ? `Reshaping Survey ${activeParcel.surveyNo} | Drag numbered node handles to adjust boundary vertices.` 
                    : 'Click any parcel on the map to activate boundary nodes.'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 font-bold rounded text-white shadow-xs transition-colors cursor-pointer"
                >
                  Done Reshaping
                </button>
              </div>
            )}

            {activeTool === 'move' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white border border-blue-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">
                  {movingParcel 
                    ? `Survey ${movingParcel.surveyNo} selected. Click anywhere on the map to shift its position.` 
                    : 'Click any parcel on the map to select it for shifting position.'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMovingParcel(null);
                    setActiveTool('select');
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {activeTool === 'delete' && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-red-950/95 text-white border border-red-500/60 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
                <span className="font-semibold">Erase Mode: Click any parcel on the map to delete it.</span>
                <button
                  type="button"
                  onClick={() => setActiveTool('select')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Floating Drawer: Parcel Details (ONLY in Minimized Mode) */}
            {!isFullscreen && isDrawerOpen && activeParcel && (
              <ParcelDetailsDrawer
                parcel={activeParcel}
                isSelected={selectedUlpins.includes(activeParcel.ulpin)}
                onToggleSelect={handleToggleSelect}
                onClose={() => setIsDrawerOpen(false)}
                onConfirmNext={() => {
                  if (onConfirmSelection) {
                    onConfirmSelection(selectedUlpins, parcels.filter(p => selectedUlpins.includes(p.ulpin)));
                  }
                }}
              />
            )}
          </div>

          {/* 4. BOTTOM SELECTED PARCELS TABLE */}
          {isTableOpen && (
            <div className={
              isFullscreen 
                ? 'h-56 xl:h-64 shrink-0 bg-white border-t border-slate-200 flex flex-col overflow-hidden' 
                : 'w-full shrink-0 bg-white border-t-2 border-slate-300 shadow-xl'
            }>
              <SelectedParcelTable
                parcels={parcels}
                selectedIds={selectedUlpins}
                onToggleSelect={handleToggleSelect}
                onSelectAll={handleSelectAll}
                onClearAll={handleClearAll}
                onLocateParcel={(p) => {
                  handleLocateParcel(p);
                }}
                onViewDetails={(p) => {
                  setActiveParcel(p);
                  setIsDrawerOpen(true);
                }}
                onClose={() => setIsTableOpen(false)}
                isFullscreen={isFullscreen}
              />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Parcel Details (Sidebar Mode in Fullscreen) */}
        {isFullscreen && isDrawerOpen && activeParcel && (
          <div className="w-72 xl:w-80 shrink-0 bg-white border-l border-slate-200 h-full flex flex-col overflow-hidden z-10">
            <ParcelDetailsDrawer
              parcel={activeParcel}
              isSelected={selectedUlpins.includes(activeParcel.ulpin)}
              onToggleSelect={handleToggleSelect}
              onClose={() => setIsDrawerOpen(false)}
              onConfirmNext={() => {
                if (onConfirmSelection) {
                  onConfirmSelection(selectedUlpins, parcels.filter(p => selectedUlpins.includes(p.ulpin)));
                }
              }}
              isSidebarMode={true}
            />
          </div>
        )}
      </div>

      {/* 5. TEXT ANNOTATION INPUT MODAL */}
      {annotationPrompt && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-300 max-w-md w-full p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm">Add Map Text Annotation</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAnnotationPrompt(null);
                  setActiveTool('select');
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Annotation Text / Label *</label>
                <input
                  type="text"
                  autoFocus
                  value={annotationPrompt.text}
                  onChange={(e) => setAnnotationPrompt(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="e.g., Proposed RoW Corridor Junction, Benchmark Peg..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-slate-900 text-xs"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveAnnotation();
                    if (e.key === 'Escape') {
                      setAnnotationPrompt(null);
                      setActiveTool('select');
                    }
                  }}
                />
              </div>

              <div>
                <label className="block text-slate-500 text-[11px] mb-1 font-semibold">Quick Presets:</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Proposed Junction RoW',
                    'Survey Benchmark Peg',
                    'High Tension Tower',
                    'Irrigation Canal Crossing',
                    'Culvert / Underpass'
                  ].map(chip => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setAnnotationPrompt(prev => ({ ...prev, text: chip }))}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-[11px] border border-slate-200 transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-mono">
                <span>Coordinates:</span>
                <span className="font-semibold text-slate-800">
                  {annotationPrompt.lat.toFixed(5)}° N, {annotationPrompt.lng.toFixed(5)}° E
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => {
                  setAnnotationPrompt(null);
                  setActiveTool('select');
                }}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAnnotation}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-xs cursor-pointer"
              >
                Place Annotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return mapContent;
}
