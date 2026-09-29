import React, { useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  FileText,
  Lock,
  Download,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import LeafletGisMap from '../../../components/gis/LeafletGisMap.jsx';

export default function MyLandParcelPage() {
  const {
    activeCitizen,
    activeParcel,
    setActiveParcel,
    setActiveDocModal,
    showToast
  } = useCitizen();

  const [copied, setCopied] = useState(false);

  const selectedParcel = activeParcel || activeCitizen.linkedParcels[0];

  const handleCopyUlpin = (ulpin) => {
    navigator.clipboard?.writeText(ulpin);
    setCopied(true);
    showToast(`ULPIN ${ulpin} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header & Parcel Selector */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>My Land Parcel &amp; Bhu-Aadhaar (ULPIN) Cadastral Records</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized with DILRMP Digital Land Records &amp; State AnyRoR / Jamabandi Stack.
          </p>
        </div>

        {/* Parcel Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0">
            Select Parcel:
          </span>
          {activeCitizen.linkedParcels.map((parcel) => {
            const isSelected = selectedParcel.ulpin === parcel.ulpin;
            return (
              <button
                key={parcel.ulpin}
                onClick={() => setActiveParcel(parcel)}
                className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1B365D] text-[#E6CA85] border-[#C5A059] shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                Survey {parcel.surveyNo} ({parcel.village})
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top Spatial & Textual Overview Card */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-4">
        {/* Parcel Top Key Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
              <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider block">
                14-DIGIT BHU-AADHAAR (ULPIN)
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono font-bold text-slate-900 text-base">
                  {selectedParcel.ulpin}
                </span>
                <button
                  onClick={() => handleCopyUlpin(selectedParcel.ulpin)}
                  className="p-1 hover:bg-blue-100 rounded text-slate-500 hover:text-slate-800 transition-colors"
                  title="Copy ULPIN"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">
                  Survey / Khasra No. {selectedParcel.surveyNo}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
                  Khata: {selectedParcel.khataNo}
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Village {selectedParcel.village}, Taluka {selectedParcel.taluka}, District {selectedParcel.district}, {selectedParcel.state}
              </div>
            </div>
          </div>

          {/* SRO Status Alert */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded text-xs">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase block">
                SRO REGISTRY TRANSACTION STATUS
              </span>
              <span className="font-bold text-amber-950">
                ACTIVE FREEZE under {selectedParcel.sroSection} (since {selectedParcel.freezeDate})
              </span>
            </div>
          </div>
        </div>

        {/* 3. Detailed Data Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Parcel Area</span>
            <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
              {selectedParcel.totalAreaHa} Ha
            </div>
            <div className="text-[10px] text-slate-500 font-mono">{(selectedParcel.totalAreaHa * 10000).toLocaleString()} Sq.m</div>
          </div>

          <div className="p-2.5 bg-amber-50 rounded border border-amber-200">
            <span className="text-[10px] text-amber-800 uppercase font-bold">Proposed Acquisition</span>
            <div className="font-mono font-bold text-amber-900 text-sm mt-0.5">
              {selectedParcel.proposedAreaHa} Ha
            </div>
            <div className="text-[10px] text-amber-700 font-mono">{(selectedParcel.proposedAreaHa * 10000).toLocaleString()} Sq.m</div>
          </div>

          <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200">
            <span className="text-[10px] text-emerald-800 uppercase font-semibold">Remaining Holding</span>
            <div className="font-mono font-bold text-emerald-900 text-sm mt-0.5">
              {selectedParcel.remainingAreaHa} Ha
            </div>
            <div className="text-[10px] text-emerald-700 font-mono">{(selectedParcel.remainingAreaHa * 10000).toLocaleString()} Sq.m</div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Land Classification</span>
            <div className="font-bold text-slate-800 text-xs mt-0.5">
              {selectedParcel.classification}
            </div>
            <div className="text-[10px] text-slate-500">Revenue Code: AG-01</div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Ownership Type</span>
            <div className="font-bold text-slate-800 text-xs mt-0.5">
              {selectedParcel.ownershipType}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">Clear Title Verified</div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Record of Rights (RoR)</span>
            <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DILRMP Synced</span>
            </div>
            <div className="text-[10px] text-slate-500">e-Signed Form 7/12</div>
          </div>
        </div>

        {/* 4. Action Row: RoR & SRO Notification Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDocModal({
                title: `Digitally Signed Record of Rights (RoR 7/12) — Survey ${selectedParcel.surveyNo}`,
                authority: 'Revenue Department, Govt of Gujarat (DILRMP Stack)',
                date: '12/08/2026',
                section: 'DILRMP Section 6 Certified Extract',
                qrVerified: true
              })}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>VIEW RECORD OF RIGHTS (7/12)</span>
            </button>

            <button
              onClick={() => showToast('Downloading certified Record of Rights (RoR)...')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>DOWNLOAD SIGNED ROR</span>
            </button>
          </div>

          <button
            onClick={() => setActiveDocModal({
              title: `Statutory SRO Freeze Order under Section 11(4) — Survey ${selectedParcel.surveyNo}`,
              authority: 'Office of the Sub-Registrar & CALA, Petlad',
              date: selectedParcel.freezeDate,
              section: 'Section 11(4) Transaction Bar',
              qrVerified: true
            })}
            className="text-amber-800 hover:text-amber-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>View SRO Section 11(4) Order Document →</span>
          </button>
        </div>
      </div>

      {/* 5. Embedded Interactive Cadastral Leaflet GIS Studio */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>Cadastral Bhu-Naksha GIS Spatial Demarcation</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live PostGIS vector boundary of your parcel overlaid on High-Resolution Satellite &amp; Project Right-of-Way (RoW) corridor.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-mono font-semibold rounded border border-emerald-200">
              EPSG: 4326 PostGIS
            </span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-800 font-mono font-semibold rounded border border-blue-200">
              Corridor Buffer: 60m
            </span>
          </div>
        </div>

        {/* Unified LeafletGisMap Canvas */}
        <div className="w-full rounded border border-slate-300 overflow-hidden">
          <LeafletGisMap
            height="460px"
            initialSelectedUlpins={[selectedParcel.ulpin]}
            onSelectParcel={(parcel) => {
              showToast(`Inspecting parcel ${parcel.surveyNo} (ULPIN: ${parcel.ulpin})`);
            }}
          />
        </div>

        <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-amber-500/80 border border-amber-700 rounded-xs"></span>
              <span>Your Affected Land ({selectedParcel.proposedAreaHa} Ha)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-blue-600/80 border border-blue-800 rounded-xs"></span>
              <span>Project Corridor Alignment Line</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border border-slate-400 bg-white rounded-xs"></span>
              <span>Surrounding Survey Boundaries</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Source: DILRMP Cadastral Bhu-Naksha Vector Engine
          </span>
        </div>
      </div>
    </div>
  );
}
