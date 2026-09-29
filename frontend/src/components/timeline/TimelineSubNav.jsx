import React from 'react';
import { 
  Calendar, 
  GitFork, 
  AlertOctagon, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export const TIMELINE_TABS = [
  { id: 'overview', label: '1. Overview', icon: Calendar },
  { id: 'milestones', label: '2. Stage-wise Milestones', icon: GitFork },
  { id: 'pending-actions', label: '3. Pending Actions & SLA', icon: AlertOctagon, badge: '2', badgeColor: 'bg-rose-600 text-white' },
  { id: 'stage-details', label: '4. Stage Details', icon: Layers },
  { id: 'documents-audit', label: '5. Documents & Audit', icon: ShieldCheck },
];

export default function TimelineSubNav({ activeTab, setActiveTab, rightExtra }) {
  return (
    <div 
      id="timeline-sub-navigation-bar" 
      className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 rounded-t-lg shadow-2xs"
    >
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" id="timeline-tab-buttons-container">
        {TIMELINE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`timeline-tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all select-none ${
                isActive
                  ? 'bg-[#0f172a] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {rightExtra && (
        <div className="flex items-center gap-2 text-xs" id="timeline-nav-right-extra">
          {rightExtra}
        </div>
      )}
    </div>
  );
}
