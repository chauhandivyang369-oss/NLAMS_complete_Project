import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import { 
  Users, 
  Calendar, 
  FileText, 
  Globe, 
  AlertOctagon, 
  CheckSquare, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

import HearingSetupSection from '../../components/sia-ieg/hearing/HearingSetupSection.jsx';
import HearingAttendanceSection from '../../components/sia-ieg/hearing/HearingAttendanceSection.jsx';
import HearingRecordSection from '../../components/sia-ieg/hearing/HearingRecordSection.jsx';
import CitizenReviewSection from '../../components/sia-ieg/hearing/CitizenReviewSection.jsx';
import ConcernTrackerSection from '../../components/sia-ieg/hearing/ConcernTrackerSection.jsx';
import HearingSubmissionSection from '../../components/sia-ieg/hearing/HearingSubmissionSection.jsx';

export default function PublicHearingPage() {
  const { setActiveMenu } = useSiaIeg() || {};
  const [activeTab, setActiveTab] = useState('setup');

  const tabs = [
    { id: 'setup', label: 'Hearing Setup', icon: Calendar, badge: 'PH-2026-001' },
    { id: 'attendance', label: 'Attendance', icon: Users, badge: '318' },
    { id: 'records', label: 'Hearing Record', icon: FileText, badge: 'Signed' },
    { id: 'citizen-review', label: 'Citizen Review', icon: Globe, badge: '4' },
    { id: 'concern-tracker', label: 'Concern Tracker', icon: AlertOctagon, badge: '6' },
    { id: 'submission', label: 'Hearing Submission', icon: CheckSquare, badge: 'Review' },
  ];

  return (
    <div id="page-public-hearing" className="w-full h-full min-h-full bg-slate-100 flex flex-col">
      {/* Top Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1B365D] text-[#C5A059] uppercase tracking-wider">
                Menu 03 • Section 5 RFCTLARR 2013
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs font-mono font-bold text-slate-700">Hearing ID: PH-2026-001</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
              Section 5 — Public Hearing
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Public Hearing Management, Participation &amp; Issue Tracking • Petlad Bypass Rail Link (486.75 Ha)
            </p>
          </div>

          {/* Cross-Link Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMenu && setActiveMenu('simp-builder')}
              className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Go to SIMP Builder (Section 6)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 overflow-x-auto mt-4 pt-1 border-t border-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1B365D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Canvas */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'setup' && <HearingSetupSection />}
          {activeTab === 'attendance' && <HearingAttendanceSection />}
          {activeTab === 'records' && <HearingRecordSection />}
          {activeTab === 'citizen-review' && <CitizenReviewSection />}
          {activeTab === 'concern-tracker' && (
            <ConcernTrackerSection onNavigateToSimp={() => setActiveMenu && setActiveMenu('simp-builder')} />
          )}
          {activeTab === 'submission' && (
            <HearingSubmissionSection onNavigateToSimp={() => setActiveMenu && setActiveMenu('simp-builder')} />
          )}
        </div>
      </div>
    </div>
  );
}
