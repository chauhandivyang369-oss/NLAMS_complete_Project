import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  CreditCard, 
  User, 
  Scale, 
  ExternalLink, 
  FileText,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';

export default function ParcelDetailsDrawer({ 
  parcel, 
  isSelected = false, 
  onToggleSelect, 
  onClose, 
  onConfirmNext,
  isSidebarMode = false 
}) {
  const [copied, setCopied] = useState(false);

  if (!parcel) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(parcel.ulpin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={
      isSidebarMode
        ? "w-full h-full bg-white flex flex-col overflow-hidden text-xs text-slate-800 select-none"
        : "absolute right-0 top-0 bottom-0 w-full sm:w-80 max-w-full sm:max-w-[85vw] bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl z-30 text-xs text-slate-800 animate-in slide-in-from-right duration-150 select-none"
    }>
      {/* Drawer Header */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-blue-700" />
          <span>Parcel Details</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          title="Close details drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {/* Acquisition Selection Action Banner */}
        <button
          type="button"
          onClick={() => onToggleSelect && onToggleSelect(parcel.ulpin)}
          className={`w-full py-2 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
            isSelected
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Selected for Acquisition (Click to Deselect)</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Select & Include in Acquisition</span>
            </>
          )}
        </button>

        {/* ULPIN Box */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-blue-800 tracking-wider uppercase flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> ULPIN
            </span>
            <button
              onClick={handleCopy}
              className="text-[10px] text-blue-700 font-semibold hover:text-blue-900 flex items-center gap-0.5 bg-blue-100 hover:bg-blue-200 px-1.5 py-0.5 rounded transition-colors"
            >
              {copied ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="font-mono font-bold text-sm text-slate-900 tracking-wider">
            {parcel.ulpin}
          </div>
        </div>

        {/* Key-Value Attributes Grid */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg divide-y divide-slate-200">
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">Survey No.:</span>
            <span className="font-bold text-slate-900">{parcel.surveyNo || parcel.survey_no}</span>
          </div>
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">Village:</span>
            <span className="font-medium text-slate-900">{parcel.village || parcel.village_name}</span>
          </div>
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">Taluka:</span>
            <span className="font-medium text-slate-900">{parcel.taluka}</span>
          </div>
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">District:</span>
            <span className="font-medium text-slate-900">{parcel.district}</span>
          </div>
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">State:</span>
            <span className="font-medium text-slate-900">{parcel.state}</span>
          </div>
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">Land Area:</span>
            <span className="font-bold text-slate-900">{parcel.totalAreaAcre} Acres ({parcel.areaHa} Ha)</span>
          </div>
          <div className="flex justify-between py-1.5 px-2.5">
            <span className="text-slate-500">Land Use:</span>
            <span className="font-medium text-emerald-700">{parcel.landUse}</span>
          </div>
        </div>

        {/* Section: Recorded Owner / Landowner */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" /> Recorded Owner / Landowner
            </span>
            <button className="text-[10px] text-blue-700 hover:text-blue-900 font-medium hover:underline flex items-center gap-0.5">
              View Full RoR <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 space-y-1 text-[11px]">
            {parcel.owners && parcel.owners.length > 0 ? (
              parcel.owners.map((owner, idx) => (
                <div key={idx} className="flex items-start justify-between border-b border-slate-200/60 pb-1 last:border-b-0 last:pb-0">
                  <div>
                    <span className="font-semibold text-slate-800">{idx + 1}. {owner.name}</span>
                    {owner.relation && <div className="text-[10px] text-slate-500">{owner.relation}</div>}
                  </div>
                  <span className="text-slate-600 font-mono text-[10px] bg-white border border-slate-200 px-1 py-0.5 rounded">
                    {owner.share}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-slate-500 italic">No owners listed</div>
            )}
          </div>
        </div>

        {/* Section: Acquisition Details */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-amber-600" /> Acquisition Details
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Affected Area:</span>
              <span className="font-bold text-red-700">
                {parcel.affectedAreaAcre} Acres ({parcel.impactPct}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Acquisition Status:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                {parcel.statutoryStatus}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Compensation Status:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-700 border border-red-200">
                {parcel.compensationStatus}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">R&R Status:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {parcel.rnrStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
        <button
          onClick={() => alert(`Opening official RoR 7/12 & 8-A Dossier for Survey No. ${parcel.surveyNo}`)}
          className="w-full py-1.5 px-3 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors text-center"
        >
          View Parcel Record
        </button>
        <button
          onClick={onConfirmNext}
          className="w-full py-1.5 px-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-1"
        >
          Confirm & Next →
        </button>
      </div>
    </div>
  );
}
