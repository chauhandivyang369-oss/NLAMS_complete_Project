import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Download, 
  Send, 
  Plus, 
  Trash2, 
  FileText, 
  RotateCcw, 
  XCircle,
  ExternalLink,
  Award
} from 'lucide-react';

export default function CommissionerApprovalPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    approvalPackage, 
    setApprovalPackage, 
    setDocumentModal,
    setESignModal,
    addAuditLog,
    emitEvent,
    setActiveMenu 
  } = useRRAuthority();

  const [conditions, setConditions] = useState(approvalPackage?.conditions || approvalPackage?.commissionerConditions || []);
  const [newConditionText, setNewConditionText] = useState('');
  const [sanctionStatus, setSanctionStatus] = useState(approvalPackage?.sanctionStatus || approvalPackage?.reviewDecisionState || 'PENDING_SANCTION');
  const [commissionerRemarks, setCommissionerRemarks] = useState(
    'The Draft R&R Scheme formulated under Section 16(2) has been scrutinized in accordance with the provisions of RFCTLARR Act, 2013. The 11 elements of the Second Schedule and 25 infrastructural amenities of the Third Schedule are satisfactorily planned. Sanction is accorded subject to strict compliance with the appended statutory conditions.'
  );

  const handleAddCondition = (e) => {
    e.preventDefault();
    if (!newConditionText.trim()) return;
    setConditions(prev => [...prev, newConditionText.trim()]);
    setNewConditionText('');
  };

  const handleRemoveCondition = (index) => {
    setConditions(prev => prev.filter((_, idx) => idx !== index));
  };

  // Execute Section 18 Sanction Order
  const handleExecuteSanction = () => {
    setESignModal({
      isOpen: true,
      context: {
        title: 'Issue Statutory Section 18 Sanction Order',
        actionTitle: 'SECTION_18_SCHEME_SANCTIONED_BY_COMMISSIONER',
        entityName: `Project ${selectedProject.code} R&R Scheme`,
        documentName: 'SECTION_18_FINAL_SANCTION_ORDER.pdf'
      },
      onSignComplete: (signHash) => {
        setSanctionStatus('SANCTIONED');
        setApprovalPackage(prev => ({
          ...prev,
          sanctionStatus: 'SANCTIONED',
          sanctionOrderNumber: `SEC18-SANCTION-2026-081`,
          sanctionDate: new Date().toLocaleDateString('en-GB')
        }));

        addAuditLog(
          'SECTION_18_SANCTION_ORDER_ISSUED',
          `R&R Scheme: ${selectedProject.name}`,
          'Status: Under Review by Commissioner',
          `Status: SANCTIONED with ${conditions.length} Conditions (Token: ${signHash})`,
          'SECTION_18_FINAL_SANCTION_ORDER.pdf'
        );

        emitEvent('SECTION_18_SCHEME_SANCTIONED', {
          orderNumber: 'SEC18-SANCTION-2026-081',
          conditionsCount: conditions.length,
          budgetCr: selectedProject.budgetAllocatedCr
        });

        alert('Section 18 Sanction Order issued and published to Gazette! Cross-workspace sync event dispatched.');
      }
    });
  };

  // Return for Revision
  const handleReturnForRevision = () => {
    const reason = prompt('Enter specific statutory deficiencies and directions for the Administrator:');
    if (!reason) return;

    setSanctionStatus('RETURNED_FOR_REVISION');
    addAuditLog(
      'SCHEME_RETURNED_FOR_REVISION_SECTION_18',
      `R&R Scheme: ${selectedProject.name}`,
      'Status: Under Review by Commissioner',
      `Status: Returned for Modification (${reason})`,
      'Commissioner_Deficiency_Memo.pdf'
    );
    alert('Scheme returned to Administrator with modification instructions.');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Actions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                R&amp;R Commissioner Master Approval &amp; Sanction Desk
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#1B365D] text-white">
                RFCTLARR Section 18 &amp; Section 44
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Apex statutory review, conditions formulation, and official Section 18 sanction order issuance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Section 18 Statutory Sanction Order (Form VI Draft)',
                    code: 'SECTION_18_SANCTION_ORDER_DRAFT.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview Sanction Order</span>
            </button>

            {sanctionStatus === 'SANCTIONED' ? (
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 font-bold rounded-lg flex items-center gap-1.5 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sanction Order Issued (SEC18-081)</span>
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReturnForRevision}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-rose-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return for Revision</span>
                </button>

                <button
                  onClick={handleExecuteSanction}
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Issue Sec 18 Sanction Order</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Package Transmittal Dossier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Transmitted by Administrator</span>
            <div className="font-bold text-slate-900 text-xs">{approvalPackage.submittedBy}</div>
            <div className="text-[10px] text-slate-500 font-mono">Date: {approvalPackage.submissionDate}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Affected Families Package</span>
            <div className="text-xl font-bold font-mono text-slate-900">{approvalPackage.totalFamiliesCovered} Families</div>
            <div className="text-[10px] text-emerald-700 font-semibold font-sans">Form IV Baseline Certified</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Total R&amp;R Sanction Budget</span>
            <div className="text-xl font-bold font-mono text-emerald-700">₹{approvalPackage.totalBudgetCr} Cr</div>
            <div className="text-[10px] text-slate-500 font-sans">Escrow Verified</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Current Sanction State</span>
            <div className={`text-xs font-bold font-mono ${sanctionStatus === 'SANCTIONED' ? 'text-emerald-700' : 'text-blue-900'}`}>
              {sanctionStatus === 'SANCTIONED' ? 'SANCTIONED & PUBLISHED' : 'UNDER APEX SCRUTINY'}
            </div>
            <div className="text-[10px] text-slate-500 font-sans">Section 18 Window</div>
          </div>
        </div>

        {/* 4. Statutory Appraisal Checklist (6 Cardinal Tests) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Commissioner's Statutory Appraisal Checklist (RFCTLARR 2013)
              </h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
              6 of 6 Verified by Commissioner Secretariat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {[
              { rule: 'Baseline Socio-Economic Survey Validity', text: 'Census covers 500 families with 100% geo-tagging, RoR title verification, and Form IV gazetting.' },
              { rule: 'Second Schedule Entitlement Adequacy', text: 'All 11 elements including 50 sq.m housing, annuity, subsistence, and transport grants fully budgeted.' },
              { rule: 'Third Schedule 25 Amenities Budgeting', text: '₹4.24 Crores earmarked for 25 mandatory public facilities in Sector 7 Petlad Gaothan.' },
              { rule: 'Section 16(5) Public Hearing Dispositions', text: 'All 3 registered objections disposed with reasoned speaking orders; irrigation siphon accommodated.' },
              { rule: 'Section 41 SC / ST Protective Compliance', text: '68 Scheduled families granted 1/3rd additional grant; Gram Sabha consent resolution GS-RES-14 verified.' },
              { rule: 'Financial Escrow Deposit Under Section 42', text: '₹14.50 Crores deposited in escrow ledger by Western Railway; PFMS integration confirmed.' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">{item.rule}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Statutory Conditions Register & Live Condition Builder */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Binding Statutory Conditions Imposed on Scheme Sanction
              </h3>
              <p className="text-[11px] text-slate-500">
                These conditions form an integral part of the Gazette Notification under Section 18(1).
              </p>
            </div>
            <span className="font-mono text-slate-700 font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              {(conditions || []).length} Conditions Imposed
            </span>
          </div>

          <div className="space-y-2">
            {(conditions || []).map((cond, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1B365D] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-[11px] text-slate-800 leading-relaxed font-sans">{cond}</p>
                </div>

                {sanctionStatus !== 'SANCTIONED' && (
                  <button
                    onClick={() => handleRemoveCondition(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors shrink-0"
                    title="Remove condition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Condition Input */}
          {sanctionStatus !== 'SANCTIONED' && (
            <form onSubmit={handleAddCondition} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={newConditionText}
                onChange={(e) => setNewConditionText(e.target.value)}
                placeholder="Enter additional statutory condition for Administrator and Requiring Body..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#1B365D]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Condition</span>
              </button>
            </form>
          )}

          {/* Commissioner Formal Speaking Order */}
          <div className="pt-2 space-y-1.5">
            <label className="font-bold text-slate-700 block text-xs">
              Commissioner's Speaking Order &amp; Sanction Findings:
            </label>
            <textarea
              rows={3}
              value={commissionerRemarks}
              onChange={(e) => setCommissionerRemarks(e.target.value)}
              disabled={sanctionStatus === 'SANCTIONED'}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-serif leading-relaxed disabled:opacity-80"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
