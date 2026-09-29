import React, { useState, useMemo } from 'react';
import { PARCELS_DATA } from '../../../services/siaSurveyService.js';
import SiaOverviewMap from '../SiaOverviewMap.jsx';
import { DEFAULT_CORRIDOR_LINE } from '../../../services/gisService.js';
import { 
  Search, 
  Filter, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserPlus, 
  Plus, 
  FileText, 
  Building2, 
  X, 
  ExternalLink,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';

export default function ParcelSurveySection({ onOpenAddFamily, onOpenAddAsset }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'split' | 'gis'
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [editingSurveyStatus, setEditingSurveyStatus] = useState(null);
  const [surveyNotes, setSurveyNotes] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Local state copy of parcels to allow survey status updating
  const [parcelsList, setParcelsList] = useState(PARCELS_DATA);

  // Filtered parcels
  const filteredParcels = useMemo(() => {
    return parcelsList.filter(p => {
      const matchesSearch = 
        p.surveyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ulpin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesVillage = selectedVillage === 'All' || p.village === selectedVillage;
      const matchesStatus = selectedStatus === 'All' || p.surveyStatus === selectedStatus;

      return matchesSearch && matchesVillage && matchesStatus;
    });
  }, [parcelsList, searchTerm, selectedVillage, selectedStatus]);

  // Handle status update
  const handleSaveObservation = (parcelId) => {
    setParcelsList(prev => prev.map(p => {
      if (p.parcelId === parcelId) {
        return {
          ...p,
          surveyStatus: editingSurveyStatus || p.surveyStatus,
          lastUpdated: 'Today'
        };
      }
      return p;
    }));
    setSaveSuccessMsg(true);
    setTimeout(() => {
      setSaveSuccessMsg(false);
      setSelectedParcel(null);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search, Filters, View Mode Toggle */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left: Search & Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search input */}
          <div className="relative min-w-[240px] flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search Survey No. / ULPIN / Owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Village Filter */}
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All Villages (5)</option>
            <option value="Petlad">Petlad</option>
            <option value="Sunav">Sunav</option>
            <option value="Nar">Nar</option>
            <option value="Demol">Demol</option>
            <option value="Rangaipura">Rangaipura</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All Survey Statuses</option>
            <option value="Completed">Completed (Green)</option>
            <option value="Partially Surveyed">Partially Surveyed (Amber)</option>
            <option value="Issue / Verification Required">Issue / Verification Required (Red)</option>
          </select>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-1.5 self-end lg:self-center">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'split' ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('gis')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'gis' ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              GIS View
            </button>
          </div>
        </div>

      </div>

      {/* Main Content Area based on viewMode */}
      <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* Table Column (Table view or Split view) */}
        {(viewMode === 'table' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'w-full'}`}>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                <div className="text-xs font-mono font-bold text-slate-700">
                  CADASTRAL PARCEL SURVEY REGISTRY ({filteredParcels.length} Parcels)
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Showing 1 to {filteredParcels.length} of 742 Corridor Parcels
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3">Survey No.</th>
                      <th className="py-2.5 px-3">ULPIN</th>
                      <th className="py-2.5 px-3">Village</th>
                      <th className="py-2.5 px-3">Recorded Owner</th>
                      <th className="py-2.5 px-3 text-right">Affected Area</th>
                      <th className="py-2.5 px-3 text-right">Impact %</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredParcels.map((parcel) => {
                      const isCompleted = parcel.surveyStatus === 'Completed';
                      const isPartial = parcel.surveyStatus === 'Partially Surveyed';
                      const isIssue = parcel.surveyStatus.includes('Issue');

                      return (
                        <tr 
                          key={parcel.parcelId}
                          className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                          onClick={() => {
                            setSelectedParcel(parcel);
                            setEditingSurveyStatus(parcel.surveyStatus);
                          }}
                        >
                          <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                            {parcel.surveyNo}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">
                            {parcel.ulpin}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            {parcel.village}
                          </td>
                          <td className="py-2.5 px-3 text-slate-800 truncate max-w-[150px]">
                            {parcel.ownerName}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900">
                            {parcel.affectedAreaHa} ha
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono">
                            <span className={parcel.impactPercent >= 70 ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                              {parcel.impactPercent}%
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                              isCompleted 
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                                : isPartial 
                                ? 'bg-amber-100 text-amber-800 border-amber-300' 
                                : 'bg-rose-100 text-rose-800 border-rose-300'
                            }`}>
                              {parcel.surveyStatus}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setSelectedParcel(parcel);
                                  setEditingSurveyStatus(parcel.surveyStatus);
                                }}
                                className="p-1 rounded text-slate-600 hover:text-[#1B365D] hover:bg-slate-100"
                                title="Open Parcel Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onOpenAddFamily && onOpenAddFamily(parcel)}
                                className="p-1 rounded text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                                title="Add Affected Family"
                              >
                                <UserPlus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span>Showing 15 of 742 parcels in corridor</span>
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <button className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                  <span className="px-2 py-1 bg-[#1B365D] text-white rounded font-bold">1</span>
                  <button className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">2</button>
                  <button className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">3</button>
                  <button className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GIS Column (GIS view or Split view) */}
        {(viewMode === 'gis' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : 'w-full'}`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span className="font-bold uppercase text-[#1B365D]">Spatial Cadastral Overlay</span>
                <span>Corridor Ch. 0+000 to 24+800</span>
              </div>
              <SiaOverviewMap 
                parcels={filteredParcels}
                corridorLine={DEFAULT_CORRIDOR_LINE}
              />
            </div>
          </div>
        )}

      </div>

      {/* Parcel Detail / Survey Update Modal Drawer */}
      {selectedParcel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end p-0">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-300">
            <div>
              {/* Drawer Header */}
              <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#C5A059] uppercase font-bold">
                    SIA Parcel Field Dossier
                  </div>
                  <div className="text-base font-bold flex items-center gap-2 mt-0.5">
                    <span>Survey No. {selectedParcel.surveyNo}</span>
                    <span className="text-xs font-mono text-slate-300">({selectedParcel.ulpin})</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedParcel(null)}
                  className="p-1 rounded hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="p-4 space-y-4 text-xs">
                {saveSuccessMsg && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Survey observations recorded successfully!</span>
                  </div>
                )}

                {/* Land Record Baseline Details */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-mono text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 pb-1">
                    Revenue &amp; RoR Baseline Information
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500">Recorded Owner:</span>
                      <div className="font-bold text-slate-900 mt-0.5">{selectedParcel.ownerName}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Revenue Village:</span>
                      <div className="font-semibold text-slate-800 mt-0.5">{selectedParcel.village}, {selectedParcel.taluka}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Parcel Area:</span>
                      <div className="font-mono font-bold text-slate-900 mt-0.5">{selectedParcel.totalAreaHa} ha</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Acquisition Impact:</span>
                      <div className="font-mono font-bold text-[#1B365D] mt-0.5">
                        {selectedParcel.affectedAreaHa} ha ({selectedParcel.impactPercent}%)
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">Land Classification:</span>
                      <div className="text-slate-800 mt-0.5">{selectedParcel.landUse} • {selectedParcel.irrigationStatus}</div>
                    </div>
                  </div>
                </div>

                {/* SIA Field Verification Form */}
                <div className="space-y-3 pt-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#1B365D]" />
                    <span>SIA Field Survey Status</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-600 font-bold mb-1">
                      Update Survey Verification Status *
                    </label>
                    <select
                      value={editingSurveyStatus}
                      onChange={(e) => setEditingSurveyStatus(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
                    >
                      <option value="Completed">Completed — All households &amp; structures inventoried</option>
                      <option value="Partially Surveyed">Partially Surveyed — Follow-up census visit required</option>
                      <option value="Issue / Verification Required">Issue / Verification Required — RoR mismatch or boundary dispute</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-600 font-bold mb-1">
                      Field Enumerator Observations &amp; Ground Truth Remarks
                    </label>
                    <textarea
                      rows={3}
                      value={surveyNotes}
                      onChange={(e) => setSurveyNotes(e.target.value)}
                      placeholder="e.g. Sub-division of parcel verified on ground; two residential huts located on southern edge of alignment..."
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-slate-700 space-y-1">
                    <div className="font-bold text-blue-900">Linked Census Entities:</div>
                    <div className="flex justify-between">
                      <span>Affected Families mapped:</span>
                      <span className="font-mono font-bold text-blue-950">{selectedParcel.familyCount} Families</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Housing / Built Assets mapped:</span>
                      <span className="font-mono font-bold text-blue-950">{selectedParcel.assetCount} Structures</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedParcel(null)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleSaveObservation(selectedParcel.parcelId)}
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Survey Observation</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
