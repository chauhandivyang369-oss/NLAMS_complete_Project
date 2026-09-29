import React, { useState } from 'react';
import { 
  Copy, 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Download, 
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';

export default function StageMilestonesView({ onNavigateTab }) {
  const { showToast } = useWorkspace();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAuthority, setFilterAuthority] = useState('all');
  const [filterPill, setFilterPill] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageId, setSelectedStageId] = useState('05');

  const stagesData = [
    {
      id: '01',
      name: 'Stage 01: Requisition Formulation & Form-I',
      ref: 'RFCTLARR Sec 4(1) / NH Act Sec 3A',
      startDate: '12 May 2026',
      dueDate: '15 Jun 2026',
      completedDate: '12 Jun 2026',
      status: 'completed',
      authority: 'Requisitioning Body',
    },
    {
      id: '02',
      name: 'Stage 02: Administrative Sanction & Scrutiny',
      ref: 'Central Ministry (MoRTH) Guidelines',
      startDate: '14 Jun 2026',
      dueDate: '30 Jun 2026',
      completedDate: '18 Jun 2026',
      status: 'completed',
      authority: 'Appropriate Government',
    },
    {
      id: '03',
      name: 'Stage 03: SIA Exemption / Appraisal Gate',
      ref: 'RFCTLARR Sec 105 / 4th Schedule',
      startDate: '20 Jun 2026',
      dueDate: '30 Jul 2026',
      completedDate: '28 Jul 2026',
      status: 'completed',
      authority: 'Appropriate Government',
    },
    {
      id: '04',
      name: 'Stage 04: Preliminary Notification (Gazette)',
      ref: 'RFCTLARR Sec 11 / NH Act Sec 3A',
      startDate: '01 Aug 2026',
      dueDate: '20 Aug 2026',
      completedDate: '15 Aug 2026',
      status: 'completed',
      authority: 'Appropriate Government / MoRTH',
    },
    {
      id: '05',
      name: 'Stage 05: Objections, Inquiries & Hearings',
      ref: 'RFCTLARR Sec 15 / NH Act Sec 3C',
      startDate: '08 Sep 2026',
      dueDate: '07 Nov 2026',
      completedDate: '—',
      status: 'in-progress',
      authority: 'CALA / District Collectorate',
      isCurrent: true,
      dueHighlight: true,
    },
    {
      id: '06',
      name: 'Stage 06: Declaration of Acquisition',
      ref: 'RFCTLARR Sec 19 / NH Act Sec 3D',
      startDate: 'Scheduled Dec 2026',
      dueDate: '14 Aug 2027 (Max SLA)',
      completedDate: '—',
      status: 'upcoming',
      authority: 'Appropriate Government (State)',
    },
    {
      id: '07',
      name: 'Stage 07: Public Notice & Claims Formulation',
      ref: 'RFCTLARR Sec 21 / NH Act Sec 3E',
      startDate: 'Scheduled Jan 2027',
      dueDate: 'Mar 2027',
      completedDate: '—',
      status: 'upcoming',
      authority: 'CALA / Collectorate',
    },
    {
      id: '08',
      name: 'Stage 08: Enquiry, Valuation & Award',
      ref: 'RFCTLARR Sec 23 & 30 / NH Act Sec 3G',
      startDate: 'Scheduled Apr 2027',
      dueDate: 'Aug 2027',
      completedDate: '—',
      status: 'upcoming',
      authority: 'CALA / SLAO',
    },
    {
      id: '09',
      name: 'Stage 09: Compensation & R&R Payouts',
      ref: 'RFCTLARR Sec 31-38 / 2nd Schedule',
      startDate: 'Scheduled Jun 2027',
      dueDate: 'Dec 2027',
      completedDate: '—',
      status: 'upcoming',
      authority: 'CALA / Escrow Pool',
    },
    {
      id: '10',
      name: 'Stage 10: Physical Possession & RoW Handover',
      ref: 'RFCTLARR Sec 38 / NH Act Sec 3E',
      startDate: 'Scheduled Dec 2027',
      dueDate: 'Mar 2028',
      completedDate: '—',
      status: 'upcoming',
      authority: 'Requisitioning Body & CALA',
    },
  ];

  const filteredStages = stagesData.filter((item) => {
    if (filterPill === 'active-clock' && item.status !== 'in-progress') return false;
    if (filterPill === 'critical-path' && !['04', '05', '06', '08'].includes(item.id)) return false;
    if (filterStatus === 'completed' && item.status !== 'completed') return false;
    if (filterStatus === 'in-progress' && item.status !== 'in-progress') return false;
    if (filterStatus === 'upcoming' && item.status !== 'upcoming') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.ref.toLowerCase().includes(q) ||
        item.authority.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="stage-milestones-view-root" className="space-y-4">
      {/* Top Banner */}
      <div 
        id="milestones-top-banner"
        className="bg-[#0f172a] border border-slate-800 rounded-lg p-3.5 text-white shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs"
      >
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUTORY PROPOSAL ID</div>
          <div className="font-mono font-bold text-white text-sm mt-0.5 flex items-center gap-1.5">
            <span>NLAMS-RB-2026-00124</span>
            <button 
              onClick={() => showToast('Copied Proposal ID NLAMS-RB-2026-00124 to clipboard')} 
              className="text-slate-400 hover:text-white"
              title="Copy ID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DESIGNATED PROJECT</div>
          <div className="font-semibold text-white truncate mt-0.5" title="National Highway Corridor (NH-48 Extn)">
            National Highway Corridor (...
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE STAGE GATE</div>
          <div className="font-semibold text-amber-300 mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Stage 05 — Sec 15 Objections & Inquiry</span>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUTORY AUTHORITY IN CHARGE</div>
          <div className="font-semibold text-white mt-0.5">CALA / District Collectorate</div>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div 
        id="milestones-filter-bar" 
        className="bg-white border border-slate-200/90 rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">STAGE STATUS:</span>
            <select
              id="select-stage-status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">All Stages</option>
              <option value="in-progress">In Progress (1)</option>
              <option value="completed">Completed (4)</option>
              <option value="upcoming">Upcoming (5)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">AUTHORITY TYPE:</span>
            <select
              id="select-authority-type-filter"
              value={filterAuthority}
              onChange={(e) => setFilterAuthority(e.target.value)}
              className="border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">All Authorities</option>
              <option value="cala">CALA / Collectorate</option>
              <option value="rb">Requisitioning Body (NHAI)</option>
              <option value="govt">Appropriate Government</option>
            </select>
          </div>

          {/* Quick pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
            <button
              onClick={() => setFilterPill('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                filterPill === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (10)
            </button>
            <button
              onClick={() => setFilterPill('active-clock')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                filterPill === 'active-clock' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active Clock (1)
            </button>
            <button
              onClick={() => setFilterPill('critical-path')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                filterPill === 'critical-path' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Critical Path
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
            <input
              id="input-search-milestones"
              type="text"
              placeholder="Search milestone, section, or key..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 border border-slate-200 rounded text-xs w-48 sm:w-60 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <button
            id="btn-gazette-schedule"
            onClick={() => showToast('Generated Official Statutory Gazette & Milestone Schedule Report')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Gazette Schedule</span>
          </button>
        </div>
      </div>

      {/* 10-Stage Milestone Registry Table */}
      <div 
        id="milestone-stages-table-wrapper" 
        className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f172a] text-white text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3.5 font-semibold">STAGE # & NAME</th>
                <th className="py-2.5 px-3.5 font-semibold">STATUTORY REFERENCE</th>
                <th className="py-2.5 px-3.5 font-semibold">START DATE</th>
                <th className="py-2.5 px-3.5 font-semibold">STATUTORY DUE</th>
                <th className="py-2.5 px-3.5 font-semibold">COMPLETED</th>
                <th className="py-2.5 px-3.5 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredStages.map((stage) => {
                const isSelected = selectedStageId === stage.id;
                const isCompleted = stage.status === 'completed';
                const isInProgress = stage.status === 'in-progress';

                return (
                  <tr
                    key={stage.id}
                    id={`stage-row-${stage.id}`}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 hover:bg-blue-50'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-2.5 px-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        {isInProgress && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                        )}
                        <span>{stage.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 font-medium">
                      {stage.ref}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-700 font-mono">
                      {stage.startDate}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono">
                      <span className={stage.dueHighlight ? 'font-bold text-rose-600' : 'text-slate-700'}>
                        {stage.dueDate}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-700 font-mono">
                      {stage.completedDate}
                    </td>
                    <td className="py-2.5 px-3.5 text-right">
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          COMPLETED
                        </span>
                      )}
                      {isInProgress && (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          IN PROGRESS
                        </span>
                      )}
                      {stage.status === 'upcoming' && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          UPCOMING
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary Row */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Stages Completed: <strong className="text-slate-800">4/10</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              In Progress: <strong className="text-slate-800">Stage 05</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Upcoming: <strong className="text-slate-800">5 Stages</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Statutory Section 19 Lapse Deadline: <strong>14 Aug 2027</strong> (12 Months from Sec 11)</span>
          </div>
        </div>
      </div>

      {/* Selected Milestone Dossier: Stage 05 — Section 15 Objections & Inquiry */}
      <div 
        id="selected-milestone-dossier-card" 
        className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-3.5 bg-amber-500 rounded-xs"></span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Selected Milestone Dossier: Stage 05 — Section 15 Objections & Inquiry
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive legal parameters, authority statutory deadlines, and requisitioning coordination mandate.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-bold font-mono">
              STATE DISPUTE REGISTER • TEHSIL: BHIWANI
            </span>
            <button
              id="btn-open-hearing-docket"
              onClick={() => onNavigateTab && onNavigateTab('pending-actions')}
              className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Open Hearing Docket</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Card 1 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              APPLICABLE LEGAL PROVISION
            </div>
            <div className="font-bold text-slate-900 text-sm">
              Section 15(1) & 15(2)
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              RFCTLARR Act 2013 read in conjunction with Section 3C of National Highways Act 1956. Governs objection lodging regarding RoW necessity, parcel extent, and public utility validity.
            </p>
            <div className="pt-1 text-[10px] text-blue-700 font-medium flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>Gazette Ref: S.O. 2381(E)</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              STATUTORY 60-DAY CLOCK
            </div>
            <div className="font-bold text-rose-700 text-sm">
              54 Days Remaining in Window
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Triggered upon Gazette publication on <strong>15 Aug 2026</strong>. Public hearing window officially opened <strong>08 Sep 2026</strong> and statutorily closes on <strong>07 Nov 2026</strong>.
            </p>
            <div className="space-y-1 pt-1">
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '10%' }}></div>
              </div>
              <div className="text-[10px] text-slate-500 font-mono text-right">
                6 / 60 Days
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              STATUTORY DEPENDENCY
            </div>
            <div className="font-bold text-slate-900 text-sm">
              Prerequisite for Section 19
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Complete hearing minutes and SLAO inquiry summary report must be submitted to Appropriate Government before Section 19 Declaration of Acquisition can be gazetted.
            </p>
            <div className="pt-1 text-[10px] text-emerald-700 font-medium flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Blocking Gate for Dec 2026</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              RB MANDATE & DUTY
            </div>
            <div className="font-bold text-slate-900 text-sm">
              Rebuttals & Presence
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              RB legal counsel must appear at Tehsil hearings and submit written rejoinders to landowner objections within 15 days of notice issuance.
            </p>
            <div className="pt-1 text-[10px] text-blue-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Legal Retainer Briefed</span>
            </div>
          </div>
        </div>

        {/* Stage 05 Evidentiary Documents & Gazette Records */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              STAGE 05 EVIDENTIARY DOCUMENTS & GAZETTE RECORDS
            </span>
            <span className="text-[10px] text-slate-500">
              3 Records Verified by Collectorate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border border-slate-200 rounded p-2.5 bg-slate-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Gazette Notice #448</div>
                  <div className="text-[10px] text-slate-500">Sec 15 Hearing Notification • 2.4 MB</div>
                </div>
              </div>
              <button 
                onClick={() => showToast('Downloading Gazette Notice #448')}
                className="p-1 text-slate-500 hover:text-slate-800"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="border border-slate-200 rounded p-2.5 bg-slate-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">14 Registered Objections Docket</div>
                  <div className="text-[10px] text-slate-500">Bhiwani Tehsil Batch 1 • 8.1 MB</div>
                </div>
              </div>
              <button 
                onClick={() => showToast('Downloading 14 Registered Objections Docket')}
                className="p-1 text-slate-500 hover:text-slate-800"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="border border-slate-200 rounded p-2.5 bg-slate-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">SLAO Hearing Schedule Memo</div>
                  <div className="text-[10px] text-slate-500">Dated 05 Sep 2026 • 1.2 MB</div>
                </div>
              </div>
              <button 
                onClick={() => showToast('Downloading SLAO Hearing Schedule Memo')}
                className="p-1 text-slate-500 hover:text-slate-800"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
