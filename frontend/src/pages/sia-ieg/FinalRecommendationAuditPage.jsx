import React, { useState } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import ProjectContextBar from '../../components/sia-ieg/common/ProjectContextBar.jsx';
import ContextualActionDrawer from '../../components/sia-ieg/common/ContextualActionDrawer.jsx';

import IegRecommendationSelector from '../../components/sia-ieg/ieg-final/IegRecommendationSelector.jsx';
import IegConditionsRegister from '../../components/sia-ieg/ieg-final/IegConditionsRegister.jsx';
import IegSignaturesPanel from '../../components/sia-ieg/ieg-final/IegSignaturesPanel.jsx';
import IegGovtSubmissionPanel from '../../components/sia-ieg/ieg-final/IegGovtSubmissionPanel.jsx';
import IegAuditTrailTable from '../../components/sia-ieg/ieg-final/IegAuditTrailTable.jsx';

import { 
  Award, 
  Save, 
  Download, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';

import { 
  INITIAL_FINAL_RECOMMENDATION,
  IEG_PROJECT_CONTEXT 
} from '../../services/iegService.js';

export default function FinalRecommendationAuditPage() {
  const { setActiveMenu } = useSiaIeg();

  const [recommendation, setRecommendation] = useState(INITIAL_FINAL_RECOMMENDATION);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState('AUDIT_EVENT');
  const [drawerData, setDrawerData] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectChoice = (choiceId) => {
    setRecommendation(prev => ({
      ...prev,
      recommendationType: choiceId
    }));
    showToast(`Recommendation option updated to Option ${choiceId === 'RECOMMEND' ? 'A' : choiceId === 'CONDITIONS' ? 'B' : choiceId === 'REVISE' ? 'C' : 'D'}.`);
  };

  const handleUpdateData = (field, val) => {
    setRecommendation(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleAddCondition = (cond) => {
    setRecommendation(prev => ({
      ...prev,
      conditions: [...prev.conditions, cond]
    }));
    showToast(`Condition ${cond.conditionNumber} added to binding statutory register.`);
  };

  const handleInspectAuditEvent = (log) => {
    setDrawerType('AUDIT_EVENT');
    setDrawerData(log);
    setDrawerOpen(true);
  };

  const handleMemberSigned = (memberId) => {
    showToast(`Member e-Signature recorded with DSC SHA-256 seal.`);
  };

  const handleSubmitToGovt = () => {
    setIsSubmitted(true);
    showToast('IEG Statutory Recommendation formally submitted to Government of Gujarat under Section 7(5).');
  };

  return (
    <div id="page-final-recommendation" className="w-full h-full min-h-full bg-slate-100 flex-1 flex flex-col font-sans">
      
      {/* 1. Universal Project Context Bar */}
      <ProjectContextBar activeMenuTitle="Final Recommendation & Audit" />

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
            <Award className="w-5 h-5 text-[#1B365D]" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Final Recommendation &amp; Audit
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Formulation, Committee e-Signatures, Submission to Govt &amp; Immutable Audit Trail
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Draft final recommendation saved.')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Report (PDF)</span>
          </button>

          {!isSubmitted && (
            <button
              onClick={() => {
                const el = document.getElementById('govt-submission-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Submit to Govt</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Workspace Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
        
        {/* Recommendation Determination (4 choices + mandatory statements) */}
        <IegRecommendationSelector
          selectedChoice={recommendation.recommendationType}
          onSelectChoice={handleSelectChoice}
          recommendationData={recommendation}
          onUpdateData={handleUpdateData}
        />

        {/* Conditions Register */}
        <IegConditionsRegister
          conditions={recommendation.conditions}
          onAddCondition={handleAddCondition}
        />

        {/* 7 Member Electronic Signatures Panel */}
        <IegSignaturesPanel onMemberSigned={handleMemberSigned} />

        {/* Submission to Appropriate Government Panel */}
        <div id="govt-submission-section">
          <IegGovtSubmissionPanel
            isSubmitted={isSubmitted}
            onSubmitToGovt={handleSubmitToGovt}
          />
        </div>

        {/* Immutable Audit Trail Table */}
        <IegAuditTrailTable onInspectAuditEvent={handleInspectAuditEvent} />

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
