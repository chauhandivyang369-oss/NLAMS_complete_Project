import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Copy, 
  Check, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import LeafletGisMap from './LeafletGisMap.jsx';

export default function ParcelSelectionView({ onBackToOverview, onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Khasra 142/2');

  const copyUlpin = () => {
    navigator.clipboard?.writeText('24000000012345');
    setCopied(true);
    if (onShowToast) onShowToast('ULPIN 24000000012345 copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3.5">
      {/* Sub-bar Filter & Hierarchy */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">PROPOSAL:</span>
            <span className="font-bold text-slate-900 font-mono">NLAMS-RB-2026-00124</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">District:</span>
            <span className="font-bold text-slate-800">Ahmedabad</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Tehsil:</span>
            <span className="font-bold text-slate-800">Sanand</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Village:</span>
            <span className="font-bold text-slate-800">Sanand Rural (LGD: 474)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Khasra..."
              className="bg-slate-50 border border-slate-300 rounded pl-8 pr-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
            />
          </div>
          <button className="bg-[#0a2540] hover:bg-[#07192c] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Apply Filter</span>
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left 7 Cols: Detailed Cadastral Map Studio */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs flex flex-col justify-between">
          <LeafletGisMap
            onSelectParcel={(parcel) => {
              if (onShowToast) {
                onShowToast(`Selected Parcel Survey ${parcel.surveyNo} (ULPIN: ${parcel.ulpin})`);
              }
            }}
          />
        </div>

        {/* Right 5 Cols: Parcel Particulars Card */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs space-y-3.5">
            {/* Header with SELECTED badge */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                PARCEL PARTICULARS
              </span>
              <span className="bg-[#0a2540] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span>SELECTED</span>
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              </span>
            </div>

            {/* ULPIN (Bhu-Aadhaar) */}
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                ULPIN (BHU-AADHAAR)
              </span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-mono font-bold text-sm text-slate-900 tracking-wider">
                  24000000012345
                </span>
                <button 
                  onClick={copyUlpin}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer" 
                  title="Copy ULPIN"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* 2-Column Grid: Survey No & Cadastral Area */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SURVEY / KHASRA NO.
                </span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">142/2</div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  CADASTRAL AREA
                </span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  2.84 Ha <span className="text-slate-500 font-normal text-xs">(7.01 Ac)</span>
                </div>
              </div>
            </div>

            {/* 3-Column Grid: Village, Taluka, District */}
            <div className="grid grid-cols-3 gap-2 text-xs py-2 border-y border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">VILLAGE</span>
                <div className="font-semibold text-slate-800 truncate mt-0.5" title="Sanand Rural">Sanand...</div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TALUKA</span>
                <div className="font-semibold text-slate-800 truncate mt-0.5" title="Sanand">Sanand...</div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DISTRICT</span>
                <div className="font-semibold text-slate-800 truncate mt-0.5" title="Ahmedabad">Ahmedabad...</div>
              </div>
            </div>

            {/* Land Classification */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                LAND CLASSIFICATION
              </span>
              <div className="font-semibold text-slate-900 text-xs mt-0.5">
                Agricultural (Irrigated Multi-crop)
              </div>
            </div>

            {/* Statuses 2-Col Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ACQUISITION STATUS
                </span>
                <div className="mt-1">
                  <span className="bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                    Under Acquisition
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  OWNERSHIP STATUS
                </span>
                <div className="mt-1">
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Khatedar */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                PRIMARY KHATEDAR (LANDOWNER RECORD)
              </span>
              <div className="font-bold text-slate-900 text-xs mt-0.5">
                Kishorbhai R. Patel & 2 Others
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Joint Khatedar (Account No. 892)
              </div>
            </div>

            {/* Parcel Statutory Validation Checklist */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                PARCEL STATUTORY VALIDATION
              </span>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cadastral Geometry Valid (Zero intersection)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ULPIN 14-digit Bhu-Aadhaar matched</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Admin Boundary matched (LGD Code: 474)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Ownership Deed pending CALA countersign</span>
              </div>
            </div>
          </div>

          {/* Acquisition Docket Overview Box */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              ACQUISITION DOCKET OVERVIEW
            </span>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Corridor Parcels</span>
              <span className="font-bold text-slate-900 font-mono">1,842</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Selected Extent</span>
              <span className="font-bold text-slate-900 font-mono">1 Parcel (2.84 Ha)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Statutory SLA Window</span>
              <span className="font-bold text-rose-600 font-mono">42 Days Remaining</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Authority In-Charge</span>
              <span className="font-semibold text-slate-800">SLAO Sanand / CALA</span>
            </div>
            
            <div className="mt-2 pt-2 border-t border-slate-100 bg-slate-50 rounded p-2 flex items-center gap-2 text-slate-700 text-[11px]">
              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Ready for inquiry review under Section 15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
