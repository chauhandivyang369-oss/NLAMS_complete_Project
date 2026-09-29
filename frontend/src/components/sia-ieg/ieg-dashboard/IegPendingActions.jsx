import React from 'react';
import { 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  User, 
  Calendar, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { IEG_PENDING_ACTIONS } from '../../../services/iegService.js';

export default function IegPendingActions({ onSelectAction }) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-900 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <h3 className="font-bold text-slate-900 text-xs">
            Pending Committee Actions &amp; Evidentiary Tasks
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          {IEG_PENDING_ACTIONS.length} Action Items Active
        </span>
      </div>

      <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
        {IEG_PENDING_ACTIONS.map((item) => (
          <div 
            key={item.id}
            className="p-3 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-[#1B365D] text-[11px]">{item.projectId}</span>
                <span className="text-slate-300">|</span>
                <span className={`px-2 py-0.2 rounded text-[10px] font-bold font-mono border ${getPriorityBadge(item.priority)}`}>
                  {item.priority || 'Normal'}
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  {item.category}
                </span>
              </div>

              <div className="font-semibold text-slate-800 text-xs">
                {item.action}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{item.assignedTo}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Due: {item.dueDate}</span>
                </span>
                <span className="font-bold text-slate-700">
                  Status: {item.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectAction && onSelectAction(item)}
              className="self-end sm:self-center px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
