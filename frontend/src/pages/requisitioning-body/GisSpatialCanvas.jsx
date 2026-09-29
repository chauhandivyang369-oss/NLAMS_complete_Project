import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import ContextAuditTrail from '../../components/gis/ContextAuditTrail.jsx';
import GisOverviewView from '../../components/gis/GisOverviewView.jsx';
import ParcelSelectionView from '../../components/gis/ParcelSelectionView.jsx';
import LayerControlsView from '../../components/gis/LayerControlsView.jsx';
import SpatialValidationView from '../../components/gis/SpatialValidationView.jsx';
import { 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Settings2, 
  CheckCircle2, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function GisSpatialCanvas() {
  const { showToast } = useWorkspace();
  
  // 4 Modes corresponding directly to the 4 uploaded screenshots:
  // 1: 'overview' (Image 1: Main GIS Spatial Canvas Overview)
  // 2: 'parcel-selection' (Image 2: Individual Cadastral Parcel Inspection)
  // 3: 'layer-controls' (Image 3: Layer & Boundary Controls)
  // 4: 'spatial-validation' (Image 4: Spatial Validation & Topology Check)
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedParcelId, setSelectedParcelId] = useState('142/2');

  const handleSelectParcel = (khasraNo) => {
    setSelectedParcelId(khasraNo);
    setActiveTab('parcel-selection');
  };

  const handleInspectIssue = (issueKhasra) => {
    setSelectedParcelId(issueKhasra);
    setActiveTab('parcel-selection');
    showToast(`Navigated to flagged parcel: Khasra ${issueKhasra}`);
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 space-y-4 max-w-[1720px] mx-auto">
      
      {/* Top Breadcrumb, Mode Switcher & Dynamic Header */}
      <div className="space-y-2">
        {/* Breadcrumb Row with Multi-View Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200/80 pb-2">
          {/* Official Gov Breadcrumb */}
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <span>NLAMS</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>Requisitioning Body</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button 
              onClick={() => setActiveTab('overview')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'overview' ? 'text-slate-900 font-semibold' : ''}`}
            >
              GIS Spatial Canvas
            </button>
            {activeTab === 'parcel-selection' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold uppercase">PARCEL SELECTION</span>
              </>
            )}
            {activeTab === 'layer-controls' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold uppercase">LAYER &amp; BOUNDARY CONTROLS</span>
              </>
            )}
            {activeTab === 'spatial-validation' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold uppercase">SPATIAL VALIDATION</span>
              </>
            )}
          </div>

          {/* Quick Tab Switcher to switch between the 4 screen modes */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg shadow-2xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              1. Overview Canvas
            </button>

            <button
              onClick={() => setActiveTab('parcel-selection')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeTab === 'parcel-selection'
                  ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              2. Parcel Selection
            </button>

            <button
              onClick={() => setActiveTab('layer-controls')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeTab === 'layer-controls'
                  ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              3. Layer &amp; Boundaries
            </button>

            <button
              onClick={() => setActiveTab('spatial-validation')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeTab === 'spatial-validation'
                  ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              4. Spatial Validation
            </button>
          </div>
        </div>

        {/* Dynamic Title Header Matching each Screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              GIS Spatial Canvas
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              {activeTab === 'overview' && 'View and validate land parcels associated with acquisition proposals.'}
              {activeTab === 'parcel-selection' && 'Inspecting individual cadastral parcel record and ownership status.'}
              {activeTab === 'layer-controls' && 'Configure spatial base layers, administrative boundary overlays, and cadastral filters.'}
              {activeTab === 'spatial-validation' && 'Automated cadastral topology verification and administrative intersection results.'}
            </p>
          </div>

          {/* Header Badges based on active view mode */}
          <div className="flex items-center gap-2">
            {activeTab === 'overview' && (
              <>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  BHUVAN WMS ACTIVE
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                  EPSG: 4326
                </span>
              </>
            )}

            {activeTab === 'parcel-selection' && (
              <>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                  EPSG: 4326 (WGS 84)
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                  Scale 1:2,500
                </span>
              </>
            )}

            {activeTab === 'layer-controls' && (
              <>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                  EPSG: 4326 (WGS 84 / UTM 43N)
                </span>
                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  3 of 6 Layers Rendered
                </span>
              </>
            )}

            {activeTab === 'spatial-validation' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 shadow-2xs">
                <Settings2 className="w-3.5 h-3.5 text-amber-700" />
                <span>NIC-GIS Engine v4.2.8</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area: Left Primary GIS Canvas View, Right Context & Audit Trail */}
      <div className="flex flex-col xl:flex-row gap-4 items-start">
        {/* Main GIS Mode Viewport (Takes remaining width) */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === 'overview' && (
            <GisOverviewView 
              onSelectParcel={handleSelectParcel}
              onOpenLayers={() => setActiveTab('layer-controls')}
              onOpenValidation={() => setActiveTab('spatial-validation')}
            />
          )}

          {activeTab === 'parcel-selection' && (
            <ParcelSelectionView 
              khasraNo={selectedParcelId}
              onBackToOverview={() => setActiveTab('overview')}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'layer-controls' && (
            <LayerControlsView 
              onShowToast={showToast}
            />
          )}

          {activeTab === 'spatial-validation' && (
            <SpatialValidationView 
              onInspectIssue={handleInspectIssue}
              onShowToast={showToast}
            />
          )}
        </div>

        {/* Right 3rd Column: Context & Audit Trail (present in all 4 screenshots) */}
        <ContextAuditTrail />
      </div>

    </div>
  );
}
