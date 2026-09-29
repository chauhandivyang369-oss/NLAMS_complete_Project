import React, { useState, useEffect } from 'react';
import { 
  fetchSiaOverviewData 
} from '../../services/siaOverviewService.js';
import SiaOverviewMap from '../../components/sia-ieg/SiaOverviewMap.jsx';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Layers, 
  MapPin, 
  FileText, 
  Users, 
  Building2, 
  RefreshCw,
  Landmark,
  Scale,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

export default function SiaOverviewPage() {
  const [dataState, setDataState] = useState('loading'); // 'loading' | 'success' | 'empty' | 'error'
  const [overviewData, setOverviewData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeKpiHighlight, setActiveKpiHighlight] = useState(null);

  // Load SIA Overview data on mount or retry
  const loadData = async (simState = 'success') => {
    setDataState('loading');
    setErrorMessage('');
    try {
      const data = await fetchSiaOverviewData('NLAMS-DEMO-2026-001', simState);
      if (!data || !data.project) {
        setDataState('empty');
        setOverviewData(null);
      } else {
        setOverviewData(data);
        setDataState('success');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to load SIA overview data. Please try again.');
      setDataState('error');
    }
  };

  useEffect(() => {
    loadData('success');
  }, []);

  // 1. LOADING SKELETON STATE
  if (dataState === 'loading') {
    return (
      <div id="sia-overview-loading-state" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto bg-white">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 animate-pulse">
          <div className="space-y-2">
            <div className="h-6 w-56 bg-slate-200 rounded" />
            <div className="h-4 w-96 bg-slate-100 rounded" />
          </div>
          <div className="h-9 w-64 bg-slate-200 rounded" />
        </div>

        {/* Status Panel Skeleton */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4 animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-10 bg-slate-200 rounded" />
            <div className="h-10 bg-slate-200 rounded" />
            <div className="h-10 bg-slate-200 rounded" />
            <div className="h-10 bg-slate-200 rounded" />
          </div>
          <div className="h-4 bg-slate-200 rounded-full w-full" />
        </div>

        {/* KPI Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 animate-pulse">
          {Array.from({ length: 14 }).map((_, idx) => (
            <div key={idx} className="h-24 bg-slate-100 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-6 w-20 bg-slate-300 rounded" />
              <div className="h-2 w-12 bg-slate-200 rounded" />
            </div>
          ))}
        </div>

        {/* GIS Area Skeleton */}
        <div className="h-[420px] bg-slate-100 border border-slate-200 rounded-xl animate-pulse" />

        {/* Alerts Skeleton */}
        <div className="space-y-2 animate-pulse">
          <div className="h-5 w-40 bg-slate-200 rounded" />
          <div className="h-12 bg-slate-100 border border-slate-200 rounded-lg" />
          <div className="h-12 bg-slate-100 border border-slate-200 rounded-lg" />
        </div>
      </div>
    );
  }

  // 2. ERROR STATE
  if (dataState === 'error') {
    return (
      <div id="sia-overview-error-state" className="p-6 max-w-3xl mx-auto my-12 text-center bg-white border border-rose-200 rounded-xl shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Unable to load SIA overview data.</h2>
        <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
          {errorMessage || 'Please try again or contact the NLAMS administrator.'}
        </p>
        <div className="mt-5">
          <button
            onClick={() => loadData('success')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Overview Data Fetch</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. EMPTY STATE
  if (dataState === 'empty' || !overviewData) {
    return (
      <div id="sia-overview-empty-state" className="p-8 max-w-2xl mx-auto my-16 text-center bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <FileText className="w-7 h-7 text-slate-400" />
        </div>
        <h2 className="text-base font-bold text-slate-900">No SIA Project Assigned</h2>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          No Social Impact Assessment project is currently assigned to this SIA agency.
        </p>
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => loadData('success')}
            className="text-xs font-semibold text-[#1B365D] hover:underline cursor-pointer"
          >
            Switch to Pilot Assigned Project (Petlad Corridor)
          </button>
        </div>
      </div>
    );
  }

  // 4. MAIN OPERATIONAL DASHBOARD (SUCCESS STATE)
  const { project, timeline, kpis, parcels, corridorLine, alerts } = overviewData;

  // Filter parcels on map if a user clicked a parcel KPI
  const filteredParcels = activeKpiHighlight === 'pending'
    ? parcels.filter(p => p.surveyStatus !== 'Completed')
    : activeKpiHighlight === 'completed'
    ? parcels.filter(p => p.surveyStatus === 'Completed')
    : parcels;

  return (
    <div id="sia-executive-overview-page" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto bg-white font-sans">
      
      {/* ========================================================================= */}
      {/* A. PAGE HEADER */}
      {/* ========================================================================= */}
      <header id="sia-overview-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#1B365D]">
              SIA Executive Overview
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-300">
              OPERATIONAL DASHBOARD
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Social Impact Assessment — Project Monitoring &amp; Execution Overview
          </p>
        </div>

        {/* Right Header Context Pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs shrink-0 shadow-2xs">
          <div className="border-r border-slate-200 pr-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Project</div>
            <div className="font-bold text-slate-900 truncate max-w-[180px] sm:max-w-[220px]">
              {project.projectName}
            </div>
          </div>

          <div className="border-r border-slate-200 pr-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Project ID</div>
            <div className="font-mono font-semibold text-slate-700">
              {project.projectId}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">SIA Status</div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
              {project.status}
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* B. PROJECT / SIA STATUS SUMMARY */}
      {/* ========================================================================= */}
      <section id="sia-status-summary-panel" className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pb-4 border-b border-slate-200/80 text-xs">
          
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Project Name
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block truncate" title={project.projectName}>
              {project.projectName}
            </span>
            <span className="text-[10px] text-slate-500">
              {project.taluka}, {project.district} ({project.state})
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Project Identifier
            </span>
            <span className="font-mono font-bold text-[#1B365D] mt-0.5 block">
              {project.projectId}
            </span>
            <span className="text-[10px] text-slate-500">
              Gazette: {project.gazetteNotificationNo}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Commencement Date
            </span>
            <span className="font-mono font-bold text-slate-900 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {timeline.commencementDate}
            </span>
            <span className="text-[10px] text-slate-500">
              Sec 4 Notification Date
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Statutory Deadline
            </span>
            <span className="font-mono font-bold text-slate-900 mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {timeline.statutoryDeadline}
            </span>
            <span className="text-[10px] text-slate-500">
              {timeline.statutorySection}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              SIA Status Badge
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-block">
                ● {timeline.status}
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-700">
                {timeline.remainingDays} Days Left
              </span>
            </div>
          </div>

        </div>

        {/* Horizontal Statutory Timeline Progress Bar */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1B365D] uppercase text-[11px] font-mono">
                Statutory SIA Timeline:
              </span>
              <span className="text-slate-600 text-xs">
                Section 4(2) Mandatory 6-Month (180 Days) SLA Window
              </span>
            </div>
            <div className="font-mono text-xs font-semibold text-slate-700 flex items-center gap-2">
              <span>Elapsed: <strong className="text-slate-900">{timeline.elapsedDays}d</strong> / {timeline.totalDays}d</span>
              <span className="text-slate-300">|</span>
              <span className="text-amber-800 bg-amber-100 px-2 py-0.2 rounded font-bold border border-amber-200">
                {timeline.remainingDays} Days Remaining
              </span>
            </div>
          </div>

          {/* Graphical Progress Bar Indicator */}
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5 border border-slate-300/80">
            <div 
              className="bg-[#1B365D] h-full rounded-full transition-all duration-500 relative"
              style={{ width: `${timeline.progressPercentage}%` }}
              title={`SIA Progress: ${timeline.progressPercentage}% (${timeline.elapsedDays}/${timeline.totalDays} days)`}
            >
              <div className="absolute inset-0 bg-white/15 repeating-linear-gradient" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Commenced: {timeline.commencementDate}</span>
            <span className="font-semibold text-slate-700">75% Timeline Elapsed (In Schedule)</span>
            <span>Deadline: {timeline.statutoryDeadline}</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* C. KPI SUMMARY GRID (EXACTLY 14 CATEGORIES) */}
      {/* ========================================================================= */}
      <section id="sia-kpi-summary-grid">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1B365D] flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>SIA Operational Scope &amp; Impact Indicators</span>
          </h2>
          {activeKpiHighlight && (
            <button
              onClick={() => setActiveKpiHighlight(null)}
              className="text-[10px] text-[#1B365D] hover:underline font-semibold cursor-pointer"
            >
              Clear Filter Highlighting
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          
          {/* KPI 1: Total Project Area */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Total Project Area
            </span>
            <div className="text-base sm:text-lg font-bold text-[#1B365D] mt-1 font-mono tracking-tight">
              {kpis.totalProjectArea}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Corridor Alignment</span>
          </div>

          {/* KPI 2: Proposed Acquisition Area */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Acquisition Area
            </span>
            <div className="text-base sm:text-lg font-bold text-[#1B365D] mt-1 font-mono tracking-tight">
              {kpis.proposedAcquisitionArea}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Direct ROW Impact</span>
          </div>

          {/* KPI 3: Affected Parcels */}
          <div 
            onClick={() => setActiveKpiHighlight(null)}
            className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-[#1B365D]/50 transition-colors cursor-pointer group"
          >
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-[#1B365D]">
              Affected Parcels
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpis.affectedParcels}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium font-mono">Cadastral Linked</span>
          </div>

          {/* KPI 4: ULPINs */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              ULPINs Verified
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpis.ulpins}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Bhu-Naksha Mapped</span>
          </div>

          {/* KPI 5: Recorded Landowners */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Recorded Owners
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpis.recordedLandowners}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">RoR 7/12 Extract</span>
          </div>

          {/* KPI 6: Estimated Affected Families */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Estimated Families
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpis.estimatedAffectedFamilies}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Census Baseline</span>
          </div>

          {/* KPI 7: Surveyed Families */}
          <div 
            onClick={() => setActiveKpiHighlight('completed')}
            className={`p-3 rounded-lg shadow-2xs transition-colors cursor-pointer border ${
              activeKpiHighlight === 'completed' 
                ? 'bg-emerald-50/50 border-emerald-500' 
                : 'bg-white border-slate-200 hover:border-emerald-400'
            }`}
          >
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Surveyed Families
            </span>
            <div className="text-base sm:text-lg font-bold text-emerald-800 mt-1 font-mono tracking-tight">
              {kpis.surveyedFamilies}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">92.8% Verified</span>
          </div>

          {/* KPI 8: Displaced Families */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Displaced Families
            </span>
            <div className="text-base sm:text-lg font-bold text-rose-700 mt-1 font-mono tracking-tight">
              {kpis.displacedFamilies}
            </div>
            <span className="text-[10px] text-rose-600 font-medium">Physical Relocation</span>
          </div>

          {/* KPI 9: Livelihood-Dependent Families */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Livelihood-Dependent
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpis.livelihoodDependentFamilies}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Tenants &amp; Workers</span>
          </div>

          {/* KPI 10: Public / Community Assets */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Public Assets
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono tracking-tight">
              {kpis.publicCommunityAssets}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Wells, Halls &amp; Infra</span>
          </div>

          {/* KPI 11: Survey Completion */}
          <div 
            onClick={() => setActiveKpiHighlight(activeKpiHighlight === 'pending' ? null : 'pending')}
            className={`p-3 rounded-lg shadow-2xs transition-colors cursor-pointer border ${
              activeKpiHighlight === 'pending' 
                ? 'bg-amber-50/60 border-amber-500' 
                : 'bg-white border-slate-200 hover:border-amber-400'
            }`}
            title="Click to highlight pending survey parcels"
          >
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Survey Completion
            </span>
            <div className="text-base sm:text-lg font-bold text-emerald-700 mt-1 font-mono tracking-tight">
              {kpis.surveyCompletion}
            </div>
            <span className="text-[10px] text-amber-700 font-medium">37 Pending</span>
          </div>

          {/* KPI 12: Public Hearing Status */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Public Hearing
            </span>
            <div className="text-xs sm:text-sm font-bold text-amber-900 mt-1 font-mono tracking-tight">
              {kpis.publicHearingStatus}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Section 5 Rule</span>
          </div>

          {/* KPI 13: SIMP Status */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              SIMP Status
            </span>
            <div className="text-xs sm:text-sm font-bold text-[#1B365D] mt-1 font-mono tracking-tight">
              {kpis.simpStatus}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Section 6 Draft</span>
          </div>

          {/* KPI 14: Final Report Status */}
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Final Report
            </span>
            <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1 font-mono tracking-tight">
              {kpis.finalReportStatus}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Pending SIMP</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* D. GIS PROJECT OVERVIEW */}
      {/* ========================================================================= */}
      <section id="sia-gis-project-overview" className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1B365D] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Project Land &amp; Impact Overview</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Interactive cadastral view of affected survey numbers, corridor alignment &amp; household census status
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[10px]">
              Displaying {filteredParcels.length} Cadastral Parcels
            </span>
            {activeKpiHighlight && (
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 text-[10px] font-bold">
                Filtered: {activeKpiHighlight.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Existing Leaflet GIS Map Container */}
        <SiaOverviewMap 
          parcels={filteredParcels}
          corridorLine={corridorLine}
          activeFilter={activeKpiHighlight}
        />
      </section>

      {/* ========================================================================= */}
      {/* E. OPERATIONAL ALERTS */}
      {/* ========================================================================= */}
      <section id="sia-operational-alerts" className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1B365D] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Operational Alerts</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Actionable SIA-related statutory warnings, pending field verifications &amp; timeline obligations
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold">
            {alerts.length} Active Items
          </span>
        </div>

        {/* Compact Alert List */}
        <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
          {alerts.map((alert) => {
            const isWarning = alert.severity === 'WARNING';
            const isAction = alert.severity === 'ACTION REQUIRED';
            const isDeadline = alert.severity === 'DEADLINE';

            return (
              <div 
                key={alert.id}
                className="p-3 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Severity Badge */}
                  <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                    isWarning 
                      ? 'bg-amber-100 text-amber-900 border-amber-300' 
                      : isAction 
                      ? 'bg-blue-100 text-blue-900 border-blue-300' 
                      : 'bg-rose-100 text-rose-900 border-rose-300'
                  }`}>
                    {alert.severity}
                  </span>

                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>{alert.message}</span>
                      {alert.count && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                          Count: {alert.count}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {alert.actionPrompt}
                    </div>
                  </div>
                </div>

                {/* Right Status Badge */}
                <div className="flex items-center gap-2 self-start sm:self-center shrink-0 pl-10 sm:pl-0">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {alert.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
