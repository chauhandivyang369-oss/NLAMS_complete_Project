import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { IEG_PROJECT_QUEUE } from '../../../services/iegService.js';
import { useSiaIeg } from '../../../contexts/SiaIegContext.jsx';

export default function IegProjectQueueTable({ onNavigateWithProject }) {
  const { setActiveMenu } = useSiaIeg();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredProjects = IEG_PROJECT_QUEUE.filter(p => {
    const matchesSearch = p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.requiringBody.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.reviewStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Clarification Required':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Ready for Appraisal':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Received':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      
      {/* Table Header & Search/Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            SIA Reports Assigned for Independent Appraisal
          </h3>
          <p className="text-[11px] text-slate-500 font-mono">
            Direct statutory review workload assigned to this Expert Group
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by project or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1 text-xs text-slate-900 w-48 lg:w-60 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Received">Received</option>
            <option value="Under Review">Under Review</option>
            <option value="Clarification Required">Clarification Required</option>
            <option value="Ready for Appraisal">Ready for Appraisal</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="border border-slate-200 rounded-lg overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
            <tr>
              <th className="p-3">Project Details</th>
              <th className="p-3">Requiring Body</th>
              <th className="p-3">SIA Ver.</th>
              <th className="p-3">Received</th>
              <th className="p-3">Review Stage</th>
              <th className="p-3">Evidence Audit</th>
              <th className="p-3">Clarifications</th>
              <th className="p-3">IEG Status</th>
              <th className="p-3 text-right">Statutory Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map((proj) => (
              <tr key={proj.projectId} className="hover:bg-slate-50/80 transition-colors">
                
                {/* Project Details */}
                <td className="p-3 max-w-xs">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-mono font-bold text-[#1B365D] text-xs">
                      {proj.projectId}
                    </span>
                    {proj.highImpactTag && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-rose-100 text-rose-900 border border-rose-200">
                        High Impact
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-slate-800 text-xs line-clamp-2" title={proj.projectName}>
                    {proj.projectName}
                  </div>
                </td>

                <td className="p-3 text-slate-600 font-medium whitespace-nowrap">
                  {proj.requiringBody}
                </td>

                <td className="p-3 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                  {proj.siaVersion}
                </td>

                <td className="p-3 font-mono text-slate-600 whitespace-nowrap">
                  {proj.receivedDate}
                </td>

                <td className="p-3 font-semibold text-slate-800 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {proj.reviewStage}
                  </span>
                </td>

                {/* Evidence Completeness Progress */}
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          proj.evidenceCompleteness >= 95 ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${proj.evidenceCompleteness}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-slate-900">{proj.evidenceCompleteness}%</span>
                  </div>
                </td>

                <td className="p-3 text-slate-600 font-mono text-[10px] whitespace-nowrap">
                  {proj.clarificationStatus}
                </td>

                {/* IEG Status */}
                <td className="p-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getStatusBadge(proj.reviewStatus)}`}>
                    {proj.reviewStatus}
                  </span>
                </td>

                {/* Actions that route to Menus 7, 8, and 9 */}
                <td className="p-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1 font-bold text-[10px]">
                    <button
                      onClick={() => setActiveMenu('sia-review')}
                      title="Menu 7: Inspect SIA Data & Source Records"
                      className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-700 rounded transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => setActiveMenu('sia-review')}
                      title="Menu 7: View Evidence & GIS"
                      className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-700 rounded transition-colors cursor-pointer"
                    >
                      Evidence
                    </button>
                    <button
                      onClick={() => setActiveMenu('statutory-appraisal')}
                      title="Menu 8: Conduct Statutory Appraisal"
                      className="px-2 py-1 bg-purple-50 hover:bg-purple-700 hover:text-white text-purple-900 border border-purple-200 rounded transition-colors cursor-pointer"
                    >
                      Appraisal
                    </button>
                    <button
                      onClick={() => setActiveMenu('final-recommendation')}
                      title="Menu 9: Compile Final Recommendation"
                      className="px-2 py-1 bg-[#1B365D] hover:bg-[#152a48] text-white rounded transition-colors cursor-pointer"
                    >
                      Recommendation
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
