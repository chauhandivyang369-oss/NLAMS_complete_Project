import React from 'react';
import { 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  FileText, 
  Users, 
  Megaphone,
  SearchCheck,
  ExternalLink
} from 'lucide-react';

export default function IegClaimEvidenceChain({ 
  onInspectEvidence, 
  onRequestClarification, 
  onFlagDiscrepancy 
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <SearchCheck className="w-4 h-4 text-[#1B365D]" />
          <h3 className="font-bold text-slate-900 text-xs tracking-tight">
            CLAIM ➔ EVIDENCE CROSS-EXAMINATION CHAIN (Section 4 &amp; 5 Audit)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Traceability Engine: Source Record to Field Verification
        </span>
      </div>

      {/* Structured Multi-Tier Horizontal / Vertical Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-stretch text-center font-mono">
        
        {/* Tier 1: SIA Claim */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-blue-700 font-bold uppercase mb-1">1. SIA Report Claim</div>
            <div className="text-slate-900 font-bold text-xs">500 Affected Families</div>
            <div className="text-[10px] text-slate-600 font-sans mt-0.5">Chapter 4 Demographic Census</div>
          </div>
          <span className="text-[9px] text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded mt-2 self-start font-bold">
            STATUTORY CLAIM
          </span>
        </div>

        {/* Tier 2: Field Schedules */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">2. Survey Records</div>
            <div className="text-slate-900 font-bold text-xs">463 Verified / 37 Pending</div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5">500 Form B schedules</div>
          </div>
          <span className="text-[9px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded mt-2 self-start font-bold">
            37 AWAITING TALATI
          </span>
        </div>

        {/* Tier 3: Supporting Evidence */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">3. Field Evidence</div>
            <div className="text-slate-900 font-bold text-xs">Aadhaar &amp; Panchnama</div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5">EV-1021, EV-1032, EV-1098</div>
          </div>
          <button 
            onClick={() => onInspectEvidence('EV-1021')}
            className="text-[9px] text-[#1B365D] hover:underline font-bold mt-2 self-start flex items-center gap-1 cursor-pointer"
          >
            Inspect EV-1021 <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Tier 4: GIS Cross-Check */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">4. GIS Spatial Link</div>
            <div className="text-slate-900 font-bold text-xs">480 Spatial Coordinates</div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5">214 Cadastral parcels</div>
          </div>
          <span className="text-[9px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded mt-2 self-start font-bold">
            96% GEOTAGGED
          </span>
        </div>

        {/* Tier 5: Land Records */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">5. E-Dhara RoR</div>
            <div className="text-slate-900 font-bold text-xs">214 RoR 7/12 Records</div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5">Anand District Registry</div>
          </div>
          <span className="text-[9px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded mt-2 self-start font-bold">
            TITLE MATCHED
          </span>
        </div>

        {/* Tier 6: Public Hearing */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">6. Public Hearing</div>
            <div className="text-slate-900 font-bold text-xs">318 Attendees</div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5">492 families represented</div>
          </div>
          <span className="text-[9px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded mt-2 self-start font-bold">
            MINUTES SEALED
          </span>
        </div>

        {/* Tier 7: IEG Observation Outcome */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] text-amber-800 font-bold uppercase mb-1">7. IEG Status</div>
            <div className="text-amber-900 font-bold text-xs">Needs Clarification</div>
            <div className="text-[10px] text-slate-600 font-sans mt-0.5">37 labourer panchnamas</div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <button
              onClick={() => onRequestClarification('FAM-CENSUS-01')}
              className="px-1.5 py-0.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[9px] font-bold cursor-pointer"
            >
              Clarify
            </button>
            <button
              onClick={() => onFlagDiscrepancy('FAM-001')}
              className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[9px] font-bold cursor-pointer"
            >
              Flag
            </button>
          </div>
        </div>

      </div>

      {/* Explanatory Note */}
      <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 flex items-center justify-between">
        <span>
          <strong>IEG Review Protocol:</strong> Every statutory claim must withstand four independent cross-checks (Survey Schedule, Evidence Media, Cadastral GIS, and Gram Sabha Hearing Register).
        </span>
        <span className="font-mono text-emerald-700 font-bold shrink-0 ml-2">
          ✓ Traceability Active
        </span>
      </div>

    </div>
  );
}
