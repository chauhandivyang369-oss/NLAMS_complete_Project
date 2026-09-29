import React from 'react';
import { 
  FileText, 
  Clock, 
  Calendar, 
  Hourglass, 
  FolderKanban, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { IEG_KPI_DATA } from '../../../services/iegService.js';

export default function IegKpiGrid({ 
  onOpenProjectList,
  onOpenMissingEvidence 
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-xs">
      
      {/* 1. SIA Reports Received */}
      <div 
        onClick={onOpenProjectList}
        className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:border-[#1B365D] hover:shadow-xs transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">Reports Received</span>
          <FileText className="w-4 h-4 text-[#1B365D] group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-xl font-bold font-mono text-slate-900">
          {IEG_KPI_DATA.reportsReceived}
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center justify-between">
          <span>Assigned to IEG</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#1B365D]" />
        </div>
      </div>

      {/* 2. Pending Review */}
      <div 
        onClick={onOpenProjectList}
        className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">Pending Review</span>
          <Clock className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-xl font-bold font-mono text-amber-700">
          {IEG_KPI_DATA.pendingReview}
        </div>
        <div className="text-[10px] text-amber-700 font-mono mt-1">
          Awaiting Initial Action
        </div>
      </div>

      {/* 3. Days Since Constitution */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">Days Constituted</span>
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xl font-bold font-mono text-slate-900">
          {IEG_KPI_DATA.daysSinceConstitution} <span className="text-xs font-normal text-slate-500">days</span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-1">
          Since 01 Sep 2026
        </div>
      </div>

      {/* 4. Days Remaining */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">Days Remaining</span>
          <Hourglass className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xl font-bold font-mono text-emerald-700">
          {IEG_KPI_DATA.daysRemaining} <span className="text-xs font-normal text-slate-500">days</span>
        </div>
        <div className="text-[10px] text-emerald-700 font-mono mt-1 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status: On Track</span>
        </div>
      </div>

      {/* 5. Projects Under Review */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">Under Review</span>
          <FolderKanban className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-xl font-bold font-mono text-purple-800">
          {IEG_KPI_DATA.projectsUnderReview}
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-1">
          Active In-Committee
        </div>
      </div>

      {/* 6. High Impact Projects */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">High Impact</span>
          <AlertTriangle className="w-4 h-4 text-rose-600" />
        </div>
        <div className="text-xl font-bold font-mono text-rose-700">
          {IEG_KPI_DATA.highImpactProjects}
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-1 truncate" title="Monitoring Classification (Non-Legal)">
          Monitoring Classification
        </div>
      </div>

      {/* 7. Evidence Completeness */}
      <div 
        onClick={onOpenMissingEvidence}
        className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-medium">Evidence Audit</span>
          <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-xl font-bold font-mono text-[#1B365D]">
          {IEG_KPI_DATA.evidenceCompleteness.percentage}%
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center justify-between">
          <span>{IEG_KPI_DATA.evidenceCompleteness.missing} missing of {IEG_KPI_DATA.evidenceCompleteness.required}</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
        </div>
      </div>

    </div>
  );
}
