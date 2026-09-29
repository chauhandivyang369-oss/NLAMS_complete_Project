import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import ProjectContextBar from '../../components/sia-ieg/common/ProjectContextBar.jsx';
import ContextualActionDrawer from '../../components/sia-ieg/common/ContextualActionDrawer.jsx';

import IegConsensusMeter from '../../components/sia-ieg/ieg-appraisal/IegConsensusMeter.jsx';
import IegCriteriaCard from '../../components/sia-ieg/ieg-appraisal/IegCriteriaCard.jsx';
import IegMemberRegisterTable from '../../components/sia-ieg/ieg-appraisal/IegMemberRegisterTable.jsx';

import { 
  Scale, 
  Save, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  AlertCircle 
} from 'lucide-react';

import { 
  STATUTORY_CRITERIA_DEFINITIONS, 
  INITIAL_COMMITTEE_APPRAISAL,
  IEG_PROJECT_CONTEXT 
} from '../../services/iegService.js';

export default function StatutoryAppraisalPage() {
  const { setActiveMenu } = useSiaIeg();

  const [criteria, setCriteria] = useState(STATUTORY_CRITERIA_DEFINITIONS);
  const [members, setMembers] = useState(INITIAL_COMMITTEE_APPRAISAL);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('MEMBER');
  const [drawerData, setDrawerData] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInspectMember = (member) => {
    setDrawerType('MEMBER');
    setDrawerData({
      memberNumber: member.memberNumber,
      name: member.memberName,
      role: member.role,
      category: member.category,
      overallVote: member.overallVote,
      appraisalDate: member.appraisalDate,
      signatureStatus: member.signatureStatus,
      criteriaEvaluation: member.criteriaEvaluation,
      individualRemarks: member.individualRemarks
    });
    setDrawerOpen(true);
  };

  const handleViewEvidence = (evId) => {
    setDrawerType('EVIDENCE');
    setDrawerData({
      evidenceId: evId,
      type: 'Statutory Verification Evidence',
      sourceModule: 'Section 7 Statutory Audit',
      relatedRecord: 'CRIT-EVIDENCE',
      description: `Primary evidence document referenced in Section 7 criteria appraisal.`,
      uploadedBy: 'IEG Secretariat',
      uploadedAt: '15/09/2026',
      gps: '22.4812° N, 72.8091° E'
    });
    setDrawerOpen(true);
  };

  const handleConsolidate = () => {
    showToast('Consolidation complete: 7/7 Member Assessments recorded with zero minority dissent.');
  };

  return (
    <div id="page-statutory-appraisal" className="w-full h-full min-h-full bg-slate-100 flex-1 flex flex-col font-sans">
      
      {/* 1. Universal Project Context Bar */}
      <ProjectContextBar activeMenuTitle="Statutory Appraisal (Section 7)" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-800 text-white px-6 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* 2. Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#1B365D]" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Statutory Appraisal (Section 7)
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Section 7 RFCTLARR Act Appraisal &amp; Independent Committee Evaluation
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Draft Section 7 appraisal recorded in session cache.')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handleConsolidate}
            className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Consolidate Assessments</span>
          </button>

          <button
            onClick={() => setActiveMenu('final-recommendation')}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <span>Proceed to Recommendation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>
      </div>

      {/* 3. Main Appraisal Workspace Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
        
        {/* Consensus Meter */}
        <IegConsensusMeter members={members} />

        {/* 6 Statutory Criteria Cards (Section 7(2) & 7(4)) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              Statutory Appraisal Criteria Matrix (Section 7 RFCTLARR Act 2013)
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              Mandatory Statutory Evaluation Benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criteria.map((c) => (
              <IegCriteriaCard
                key={c.code}
                criterion={c}
                onViewEvidence={handleViewEvidence}
                onUpdateStatus={(crit) => showToast(`Editing appraisal parameters for ${crit.code}`)}
              />
            ))}
          </div>
        </div>

        {/* Individual 7 Members Appraisal Register */}
        <IegMemberRegisterTable
          members={members}
          onInspectMember={handleInspectMember}
        />

      </div>

      {/* 4. Contextual Action Drawer */}
      <ContextualActionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerType={drawerType}
        data={drawerData}
      />

    </div>
  );
}
