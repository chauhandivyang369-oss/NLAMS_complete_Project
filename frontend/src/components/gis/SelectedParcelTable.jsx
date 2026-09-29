import React from 'react';
import { X, Eye, MapPin, CheckSquare, Square, Layers, FileText } from 'lucide-react';
import { STATUTORY_COLORS } from '../../services/gisService.js';

export default function SelectedParcelTable({ 
  parcels, 
  selectedIds, 
  onToggleSelect, 
  onSelectAll, 
  onClearAll, 
  onLocateParcel, 
  onViewDetails,
  onClose,
  isFullscreen = false 
}) {
  const allSelected = parcels.length > 0 && selectedIds.length === parcels.length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SIA / Hearing':
        return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'Partially Affected':
        return 'bg-orange-100 text-orange-800 border border-orange-300';
      case 'Acquired':
      case 'Sec 23 Acquired':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
      case 'Under Acquisition':
      case 'Sec 11 Frozen':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border border-slate-300';
    }
  };

  return (
    <div className={`bg-white text-xs select-none z-10 flex flex-col ${
      isFullscreen 
        ? 'w-full h-full border-t border-slate-200 overflow-hidden shadow-none' 
        : 'bg-white border-t border-slate-200 shadow-xl max-h-96'
    }`}>
      {/* Panel Header */}
      <div className={`bg-slate-50 border-b border-slate-200 flex items-center justify-between ${
        isFullscreen ? 'px-3 py-1.5' : 'px-4 py-2'
      }`}>
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-bold text-slate-800 text-xs">
            Selected Parcels ({parcels.filter(p => selectedIds.includes(p.ulpin)).length})
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Total Extent: {parcels.filter(p => selectedIds.includes(p.ulpin)).reduce((acc, p) => acc + (p.totalAreaAcre || 0), 0).toFixed(2)} Acres
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={allSelected ? onClearAll : onSelectAll}
            className="text-[11px] text-blue-700 hover:text-blue-900 font-medium px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-50 cursor-pointer"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer"
            title="Hide table"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto overflow-y-auto flex-1 scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-[11px] sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 w-8 text-center">
                <button type="button" onClick={allSelected ? onClearAll : onSelectAll} className="p-0.5 text-slate-600 hover:text-blue-700 cursor-pointer">
                  {allSelected ? <CheckSquare className="w-3.5 h-3.5 text-blue-600" /> : <Square className="w-3.5 h-3.5" />}
                </button>
              </th>
              <th className="py-2 px-2.5 w-12">Sr. No.</th>
              <th className="py-2 px-2.5">ULPIN</th>
              <th className="py-2 px-2.5">Survey No.</th>
              <th className="py-2 px-2.5">Village</th>
              <th className="py-2 px-2.5">Owner(s)</th>
              <th className="py-2 px-2.5 text-right">Area (Acres)</th>
              <th className="py-2 px-2.5">Land Use</th>
              <th className="py-2 px-2.5">Status</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150">
            {parcels.map((p, idx) => {
              const isChecked = selectedIds.includes(p.ulpin);
              return (
                <tr 
                  key={p.ulpin}
                  className={`hover:bg-blue-50/40 transition-colors ${isChecked ? 'bg-blue-50/20' : ''}`}
                >
                  <td className="py-1.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleSelect(p.ulpin)}
                      className="w-3.5 h-3.5 text-blue-600 rounded cursor-pointer"
                    />
                  </td>
                  <td className="py-1.5 px-2.5 font-medium text-slate-500">{idx + 1}</td>
                  <td className="py-1.5 px-2.5 font-mono font-bold text-slate-800">{p.ulpin}</td>
                  <td className="py-1.5 px-2.5 font-semibold text-blue-900">{p.surveyNo || p.survey_no}</td>
                  <td className="py-1.5 px-2.5 text-slate-700">{p.village || p.village_name}</td>
                  <td className="py-1.5 px-2.5 text-slate-700 max-w-[140px] truncate" title={p.owners?.map(o => o.name).join(', ')}>
                    {p.owners?.[0]?.name || 'N/A'} {p.owners?.length > 1 ? `(+${p.owners.length - 1})` : ''}
                  </td>
                  <td className="py-1.5 px-2.5 text-right font-medium text-slate-800">{p.totalAreaAcre}</td>
                  <td className="py-1.5 px-2.5 text-slate-600">{p.landUse}</td>
                  <td className="py-1.5 px-2.5">
                    <span 
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatusBadge(p.statutoryStatus)}`}
                    >
                      {p.statutoryStatus}
                    </span>
                  </td>
                  <td className="py-1.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(p)}
                        className="p-1 rounded hover:bg-blue-100 text-blue-700 cursor-pointer"
                        title="View details in side drawer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewDetails(p)}
                        className="p-1 rounded hover:bg-slate-200 text-slate-600 hover:text-slate-800 cursor-pointer"
                        title="View Land Records / RoR Dossier"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onLocateParcel(p)}
                        className="p-1 rounded hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 cursor-pointer"
                        title="Locate and zoom on canvas"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
