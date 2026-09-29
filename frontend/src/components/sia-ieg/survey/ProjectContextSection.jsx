import React from 'react';
import { PROJECT_CONTEXT } from '../../../services/siaSurveyService.js';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Calendar, 
  Layers, 
  Landmark, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function ProjectContextSection() {
  const p = PROJECT_CONTEXT;

  return (
    <div className="space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3 text-xs flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-amber-900 font-semibold">Authoritative Baseline Notice: </strong>
          Project metadata and alignment boundaries are pre-populated from the verified Requiring Body 
          <strong> Form-I Submission (e-Gazette Ref: WR/NLAMS/SIA/2026/GZ-04)</strong>. SIA field units cannot 
          alter source administrative boundaries without Appropriate Government gazette amendment.
        </div>
      </div>

      {/* Grid of Read-Only Baseline Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        
        {/* Card 1: Project Identity */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#1B365D]" />
              Project Identity
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              Form-I Verified
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 text-[11px]">Project Name:</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{p.projectName}</div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Unique Project Identifier:</span>
              <div className="font-mono font-bold text-[#1B365D] mt-0.5">{p.projectId}</div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Requiring Body:</span>
              <div className="font-semibold text-slate-800 mt-0.5">{p.requiringBody}</div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Project Classification:</span>
              <div className="text-slate-700 mt-0.5">{p.projectType}</div>
            </div>
          </div>
        </div>

        {/* Card 2: Statutory Approvals */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#1B365D]" />
              Statutory Approvals
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-300">
              Section 2(1)
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 text-[11px]">Public Purpose Definition:</span>
              <div className="font-medium text-slate-800 mt-0.5 leading-snug">{p.publicPurpose}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-500 text-[10px]">Admin Approval:</span>
                <div className="font-mono font-semibold text-slate-900">{p.administrativeApprovalNo}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Approval Date:</span>
                <div className="font-mono text-slate-800">{p.administrativeApprovalDate}</div>
              </div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Appropriate Government:</span>
              <div className="font-semibold text-slate-800 mt-0.5">{p.appropriateGovernment}</div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">SIA Agency Commissioned:</span>
              <div className="font-semibold text-[#1B365D] mt-0.5">{p.appointedSiaAgency}</div>
            </div>
          </div>
        </div>

        {/* Card 3: Spatial Alignment & Scope */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1B365D]" />
              Spatial Scope &amp; Villages
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">
              5 Villages
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 text-[11px]">Total Corridor:</span>
                <div className="font-mono font-bold text-slate-900 mt-0.5">{p.totalCorridorAreaHa} ha</div>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Acquisition Area:</span>
                <div className="font-mono font-bold text-[#1B365D] mt-0.5">{p.proposedAcquisitionAreaHa} ha</div>
              </div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Alignment Chainage:</span>
              <div className="font-mono text-slate-800 mt-0.5">{p.projectAlignment}</div>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Affected Revenue Villages:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.villages.map((v, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px] font-medium border border-slate-200">
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Statutory Window:</span>
              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                14/01/2026 to 13/07/2026
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Corridor Description Footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
        <div className="font-semibold text-slate-900 mb-1">Executive Alignment Description:</div>
        <p className="text-slate-600 leading-relaxed">
          {p.projectDescription} The Right-of-Way (ROW) intersects fertile multi-cropped agricultural land, 
          necessitating focused Section 4(4) inquiries regarding agricultural displacement, irrigation canal severances, 
          and alternative access ramps for gaothan populations.
        </p>
      </div>
    </div>
  );
}
