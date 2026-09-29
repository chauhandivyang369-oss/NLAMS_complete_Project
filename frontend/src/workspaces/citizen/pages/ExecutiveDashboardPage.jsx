import React from 'react';
import {
  MapPin,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Layers,
  FileText,
  Calendar,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Activity
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';

export default function ExecutiveDashboardPage() {
  const {
    activeCitizen,
    projects,
    openProjectWorkspace,
    navigateToAction,
    setActiveDocModal,
    activeProject
  } = useCitizen();

  // Aggregate metrics
  const totalParcelsCount = activeCitizen.linkedParcels.length;
  const totalAreaHa = activeCitizen.linkedParcels.reduce((sum, p) => sum + p.proposedAreaHa, 0);
  const totalAreaSqm = (totalAreaHa * 10000).toLocaleString();
  const totalDisbursed = '₹ 1,48,50,420';

  return (
    <div className="space-y-4">
      {/* 1. WELCOME GREETING HEADER */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#1B365D]">
              Welcome, {activeCitizen.name}
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              e-KYC VERIFIED
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            You have <span className="font-bold text-slate-900">{projects.length} active land acquisition projects</span> and{' '}
            <span className="font-bold text-slate-900">{totalParcelsCount} affected land parcels</span> linked to your Bhu-Aadhaar (ULPIN).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateToAction('02')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>View All Parcels ({totalParcelsCount})</span>
          </button>
        </div>
      </div>

      {/* 2. EXACTLY 5 MAJOR KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* KPI 1: TOTAL LAND NOTIFIED */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            1. TOTAL LAND NOTIFIED
          </div>
          <div className="mt-1 font-mono font-bold text-slate-900 text-lg sm:text-xl">
            {totalAreaHa.toFixed(2)} Ha
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            {totalAreaSqm} Sq.m across holdings
          </div>
        </div>

        {/* KPI 2: AFFECTED PARCELS */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            2. AFFECTED PARCELS
          </div>
          <div className="mt-1 font-mono font-bold text-blue-900 text-lg sm:text-xl">
            {totalParcelsCount} Parcels
          </div>
          <div className="text-[10px] text-blue-700 font-semibold mt-0.5">
            {totalParcelsCount} Verified ULPINs
          </div>
        </div>

        {/* KPI 3: OVERALL LIFECYCLE PROGRESS */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            3. LIFECYCLE PROGRESS
          </div>
          <div className="mt-1 font-mono font-bold text-emerald-700 text-lg sm:text-xl">
            58% Avg
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '58%' }}></div>
          </div>
        </div>

        {/* KPI 4: PENDING CITIZEN ACTIONS */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span>4. PENDING ACTIONS</span>
          </div>
          <div className="mt-1 font-bold text-amber-900 text-sm">
            1 Statutory Notice
          </div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
            Sec 15 Objection: 42d Left
          </div>
        </div>

        {/* KPI 5: COMPENSATION DISBURSED */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs col-span-2 md:col-span-1">
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <CreditCard className="w-3 h-3 text-emerald-600" />
            <span>5. COMPENSATION</span>
          </div>
          <div className="mt-1 font-mono font-bold text-slate-900 text-sm sm:text-base">
            {totalDisbursed}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
            PFMS DBT Credited
          </div>
        </div>
      </div>

      {/* 3. MULTI-PROJECT CONTAINER CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
              Your Land Acquisition Project Containers
            </h3>
            <p className="text-xs text-slate-500">
              Each project container isolates your affected parcels, statutory notices, and payment ledgers.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {projects.length} Projects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {projects.map((proj) => {
            const projectParcels = activeCitizen.linkedParcels.filter(p => p.projectId === proj.id);

            return (
              <div
                key={proj.id}
                className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs hover:border-[#C5A059] transition-all space-y-3"
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded border border-slate-200">
                        {proj.id}
                      </span>
                      <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-300">
                        {proj.currentStageName}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 hover:text-blue-900">
                      {proj.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700">{proj.requiringBody}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{proj.districts?.join(', ')}, {proj.state}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openProjectWorkspace(proj)}
                    className="self-start sm:self-center px-4 py-2 bg-[#1B365D] hover:bg-[#142947] text-white font-bold text-xs rounded flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>OPEN PROJECT WORKSPACE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>

                {/* Metrics 4-col Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-1">
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">My Affected Parcels</span>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">
                      {projectParcels.length} Parcels ({projectParcels.reduce((s, p) => s + p.proposedAreaHa, 0).toFixed(2)} Ha)
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Linked ULPINs</span>
                    <div className="font-mono font-bold text-blue-900 text-xs mt-0.5 truncate" title={projectParcels.map(p => p.ulpin).join(', ')}>
                      {projectParcels.map(p => p.ulpin).join(', ')}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Project Stage Progress</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-bold text-emerald-800">{proj.progressPercent}%</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${proj.progressPercent}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Last System Update</span>
                    <div className="font-mono text-slate-700 text-xs mt-0.5">
                      {proj.lastUpdated}
                    </div>
                  </div>
                </div>

                {/* Pending Action & Next Event Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                        Action Required from Citizen:
                      </span>
                      <span className="text-slate-800 font-medium">
                        {proj.pendingAction}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                        Next Important Event:
                      </span>
                      <span className="text-slate-800 font-medium">
                        {proj.nextEvent}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. VISUAL STATUTORY LIFECYCLE TRACKER */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-1">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C5A059]" />
              <span>RFCTLARR Act 2013 Statutory Lifecycle Progression</span>
            </h3>
            <p className="text-xs text-slate-500">
              Track statutory events from Form-I requisition to physical possession under Section 38.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-700">
            Current Active: <span className="text-[#C5A059] font-bold">{activeProject?.name}</span>
          </span>
        </div>

        {/* 12 Stages Horizontal Lifecycle Pipeline */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
          <div className="min-w-[900px] flex items-center justify-between relative py-4">
            {/* Connecting Baseline */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

            {activeProject?.lifecycleStages?.map((stage, idx) => {
              const isCompleted = stage.status === 'COMPLETED';
              const isCurrent = stage.status === 'CURRENT';
              const isUpcoming = stage.status === 'UPCOMING';

              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    const menuMapping = {
                      form1: '01',
                      sia: '04',
                      ieg: '04',
                      sec11: '03',
                      sec15: '05',
                      sec12_13: '06',
                      rnr: '08',
                      sec19: '03',
                      sec21_22: '07',
                      award: '07',
                      dbt: '09',
                      possession: '01'
                    };
                    if (menuMapping[stage.id]) {
                      navigateToAction(menuMapping[stage.id], activeProject.id);
                    }
                  }}
                  className="flex flex-col items-center relative z-10 cursor-pointer group max-w-[70px] text-center"
                  title={`${stage.label} • ${stage.status} • Click to open details`}
                >
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-110 shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isCurrent ? (
                      <span className="font-extrabold text-xs">●</span>
                    ) : (
                      <span className="font-mono text-xs">{idx + 1}</span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <div className="mt-2 text-[10px] font-bold text-slate-800 leading-tight">
                    {stage.label}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                    {stage.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-end gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[9px]">✓</span>
            <span>Completed Statutory Stage</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-300"></span>
            <span>Current Active Stage</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300"></span>
            <span>Upcoming Stage</span>
          </span>
        </div>
      </div>
    </div>
  );
}
