import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import { 
  SEED_SIMP_IMPACTS, 
  SEED_SIMP_MITIGATIONS,
  PROJECT_CONTEXT 
} from '../../services/siaSimpService.js';
import { 
  Layers, 
  ShieldCheck, 
  IndianRupee, 
  Activity, 
  FileText, 
  CheckSquare, 
  ArrowLeft, 
  ArrowRight,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

import SimpImpactRegisterSection from '../../components/sia-ieg/simp/SimpImpactRegisterSection.jsx';
import SimpMitigationSection from '../../components/sia-ieg/simp/SimpMitigationSection.jsx';
import SimpCostTimelineSection from '../../components/sia-ieg/simp/SimpCostTimelineSection.jsx';
import SimpMonitoringSection from '../../components/sia-ieg/simp/SimpMonitoringSection.jsx';
import SimpDraftSection from '../../components/sia-ieg/simp/SimpDraftSection.jsx';
import SimpValidationSection from '../../components/sia-ieg/simp/SimpValidationSection.jsx';

export default function SimpBuilderPage() {
  const { setActiveMenu } = useSiaIeg() || {};
  const [activeTab, setActiveTab] = useState('impacts');
  
  // Master persistent state across SIMP tabs
  const [impacts, setImpacts] = useState(SEED_SIMP_IMPACTS);
  const [mitigations, setMitigations] = useState(SEED_SIMP_MITIGATIONS);
  const [preselectedImpactId, setPreselectedImpactId] = useState(null);

  const totalCost = mitigations.reduce((sum, m) => sum + (Number(m.estimatedCost) || 0), 0);

  const formatINR = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleSelectImpactForMitigation = (impactId) => {
    setPreselectedImpactId(impactId);
    setActiveTab('mitigations');
  };

  const tabs = [
    { id: 'impacts', label: 'Impact Register', icon: Layers, badge: `${impacts.length}` },
    { id: 'mitigations', label: 'Mitigation Measures', icon: ShieldCheck, badge: `${mitigations.length}` },
    { id: 'cost-timeline', label: 'Cost & Timeline', icon: IndianRupee, badge: formatINR(totalCost) },
    { id: 'monitoring', label: 'Monitoring Indicators', icon: Activity, badge: `${mitigations.length}` },
    { id: 'draft', label: 'SIMP Draft Plan', icon: FileText, badge: 'Sec. 6' },
    { id: 'validation', label: 'Validation & Submission', icon: CheckSquare, badge: '10 Rules' },
  ];

  return (
    <div id="page-simp-builder" className="w-full h-full min-h-full bg-slate-100 flex flex-col">
      {/* Top Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1B365D] text-[#C5A059] uppercase tracking-wider">
                Menu 04 • Section 6 RFCTLARR 2013
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs font-mono font-bold text-slate-700">SIMP Ref: SIMP-2026-001</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200">
                Draft v1.2
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
              Section 6 — SIMP Builder
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Social Impact Management Plan (SIMP) Formulation, Mitigation Measures &amp; Escrow Budget Matrix
            </p>
          </div>

          {/* Workflow Transitions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMenu && setActiveMenu('public-hearing')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Menu 03 (Hearing)</span>
            </button>

            <button
              onClick={() => setActiveMenu && setActiveMenu('ieg-dashboard')}
              className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>IEG Appraisal (Menu 06)</span>
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
          {activeTab === 'impacts' && (
            <SimpImpactRegisterSection
              impacts={impacts}
              setImpacts={setImpacts}
              mitigations={mitigations}
              onSelectImpactForMitigation={handleSelectImpactForMitigation}
              onNavigateToHearing={() => setActiveMenu && setActiveMenu('public-hearing')}
            />
          )}

          {activeTab === 'mitigations' && (
            <SimpMitigationSection
              impacts={impacts}
              mitigations={mitigations}
              setMitigations={setMitigations}
              preselectedImpactId={preselectedImpactId}
            />
          )}

          {activeTab === 'cost-timeline' && (
            <SimpCostTimelineSection
              impacts={impacts}
              mitigations={mitigations}
            />
          )}

          {activeTab === 'monitoring' && (
            <SimpMonitoringSection
              mitigations={mitigations}
            />
          )}

          {activeTab === 'draft' && (
            <SimpDraftSection
              impacts={impacts}
              mitigations={mitigations}
            />
          )}

          {activeTab === 'validation' && (
            <SimpValidationSection
              impacts={impacts}
              mitigations={mitigations}
              onNavigateToIeg={() => setActiveMenu && setActiveMenu('ieg-dashboard')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
