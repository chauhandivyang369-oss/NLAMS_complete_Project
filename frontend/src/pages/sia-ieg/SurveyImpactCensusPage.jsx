import React, { useState } from 'react';
import { PROJECT_CONTEXT } from '../../services/siaSurveyService.js';
import ProjectContextSection from '../../components/sia-ieg/survey/ProjectContextSection.jsx';
import ParcelSurveySection from '../../components/sia-ieg/survey/ParcelSurveySection.jsx';
import LandownerCensusSection from '../../components/sia-ieg/survey/LandownerCensusSection.jsx';
import FamilyCensusSection from '../../components/sia-ieg/survey/FamilyCensusSection.jsx';
import StructuresSection from '../../components/sia-ieg/survey/StructuresSection.jsx';
import AgricultureSection from '../../components/sia-ieg/survey/AgricultureSection.jsx';
import CommunityAssetsSection from '../../components/sia-ieg/survey/CommunityAssetsSection.jsx';
import EnvironmentalAlternativeSection from '../../components/sia-ieg/survey/EnvironmentalAlternativeSection.jsx';
import CommunityFormBuilderSection from '../../components/sia-ieg/survey/CommunityFormBuilderSection.jsx';
import ResponseInboxSection from '../../components/sia-ieg/survey/ResponseInboxSection.jsx';
import SurveyValidationSection from '../../components/sia-ieg/survey/SurveyValidationSection.jsx';
import { 
  Building2, 
  MapPin, 
  Users, 
  Home, 
  Sprout, 
  Landmark, 
  FileText, 
  Inbox, 
  ShieldCheck, 
  Layers, 
  Compass, 
  QrCode,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function SurveyImpactCensusPage() {
  const p = PROJECT_CONTEXT;
  const [activeTab, setActiveTab] = useState('families'); // default to families or parcels

  const tabs = [
    { id: 'project-context', label: 'Project Context', icon: Building2 },
    { id: 'parcels', label: 'Parcels & GIS Survey', icon: Layers, badge: '742' },
    { id: 'landowners', label: 'Landowner Census', icon: Landmark, badge: '628' },
    { id: 'families', label: 'Affected Families', icon: Users, badge: '500' },
    { id: 'structures', label: 'Housing & Structures', icon: Home, badge: '142' },
    { id: 'agriculture', label: 'Agriculture & Land Use', icon: Sprout },
    { id: 'community-assets', label: 'Community Assets', icon: Landmark, badge: '84' },
    { id: 'environmental', label: 'Environmental & Minimum Land', icon: Compass },
    { id: 'forms', label: 'Community Forms & QR', icon: QrCode },
    { id: 'inbox', label: 'Response Inbox', icon: Inbox, badge: '486' },
    { id: 'validation', label: 'Validation & Submission', icon: ShieldCheck, alert: true }
  ];

  return (
    <div id="page-survey-impact-census" className="w-full h-full bg-[#f8fafc] flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-4">
        
        {/* Section 4: Survey Workspace Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Title and Project Context */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  SIA OPERATIONS • MENU 2
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                  {p.siaStatus}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Ref: <strong className="text-slate-800">{p.projectId}</strong>
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Survey &amp; Impact Census
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured field survey, affected-family census and social impact data collection — {p.projectName}
              </p>
            </div>

            {/* Compact Metric Summary Pills */}
            <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Survey Completion</div>
                <div className="font-mono text-sm font-bold text-emerald-700">92.8%</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Affected Families</div>
                <div className="font-mono text-sm font-bold text-[#1B365D]">500</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Verified Families</div>
                <div className="font-mono text-sm font-bold text-emerald-700">463</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Pending Verification</div>
                <div className="font-mono text-sm font-bold text-amber-700">37</div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Internal Horizontal Survey Navigation Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.alert && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Content Work Area */}
        <div>
          {activeTab === 'project-context' && <ProjectContextSection />}
          {activeTab === 'parcels' && <ParcelSurveySection onOpenAddFamily={() => setActiveTab('families')} />}
          {activeTab === 'landowners' && <LandownerCensusSection />}
          {activeTab === 'families' && <FamilyCensusSection />}
          {activeTab === 'structures' && <StructuresSection />}
          {activeTab === 'agriculture' && <AgricultureSection />}
          {activeTab === 'community-assets' && <CommunityAssetsSection />}
          {activeTab === 'environmental' && <EnvironmentalAlternativeSection />}
          {activeTab === 'forms' && <CommunityFormBuilderSection />}
          {activeTab === 'inbox' && <ResponseInboxSection />}
          {activeTab === 'validation' && <SurveyValidationSection />}
        </div>

      </div>
    </div>
  );
}
