import React, { useState } from 'react';
import { 
  DEFAULT_SIMP_VERSIONS,
  validateSimpIntegrity 
} from '../../../services/siaSimpService.js';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  History, 
  Plus, 
  Save, 
  Send, 
  ArrowRight, 
  FileCheck, 
  CheckSquare,
  Sparkles,
  Lock
} from 'lucide-react';

export default function SimpValidationSection({ 
  impacts, 
  mitigations, 
  onNavigateToIeg 
}) {
  const [validation, setValidation] = useState(() => validateSimpIntegrity(impacts, mitigations));
  const [versions, setVersions] = useState(DEFAULT_SIMP_VERSIONS);
  const [simpStatus, setSimpStatus] = useState('Draft');
  const [actionNotice, setActionNotice] = useState('');
  const [showNewVersionModal, setShowNewVersionModal] = useState(false);
  const [newVersionSummary, setNewVersionSummary] = useState('');

  const handleRunValidation = () => {
    const fresh = validateSimpIntegrity(impacts, mitigations);
    setValidation(fresh);
    setActionNotice('SIMP Pre-submission audit executed: ' + (fresh.isValid ? 'All Rules Passed!' : 'Review Pending Rules'));
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleSaveDraft = () => {
    setActionNotice('SIMP Draft state and version records saved successfully.');
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleSubmitToIeg = () => {
    setSimpStatus('Submitted for IEG Appraisal');
    setActionNotice('SIMP v1.2 formally sealed and forwarded to Menu 6 (IEG Appraisal Dashboard).');
  };

  const handleCreateVersion = (e) => {
    e.preventDefault();
    if (!newVersionSummary) return;

    const nextVer = `Draft v1.${versions.length}`;
    setVersions([
      {
        version: nextVer,
        createdAt: new Date().toISOString().split('T')[0] + ' 11:00 AM',
        createdBy: 'SIA Lead Evaluator',
        summary: newVersionSummary,
        status: 'Draft'
      },
      ...versions
    ]);
    setNewVersionSummary('');
    setShowNewVersionModal(false);
  };

  return (
    <div className="space-y-4">
      {/* 1. Status Banner & Transition Trigger */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              SIMP Statutory Compliance &amp; IEG Submission Portal
            </h3>
          </div>
          <p className="text-[11px] text-slate-500">
            Current Lifecycle State: <strong className="font-mono text-[#1B365D]">{simpStatus}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {simpStatus === 'Submitted for IEG Appraisal' && (
            <button
              onClick={onNavigateToIeg}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs animate-pulse"
            >
              <span>View in Menu 6 (IEG Appraisal)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* 2. 10-Point Mandatory Statutory Validation Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Statutory Pre-Submission Audit Rules (RFCTLARR Sec. 6)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-emerald-700">
              {validation.passedCount} of {validation.totalCount} Passed
            </span>
            <button
              onClick={handleRunValidation}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
            >
              Re-Verify
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-200 text-xs">
          {validation.checks.map((c) => {
            const isPassed = c.status === 'Passed';
            return (
              <div key={c.id} className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50">
                <div className="flex items-start gap-2.5">
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-slate-900">{c.rule}</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">{c.details}</div>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 border ${
                  isPassed 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {c.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SIMP Document Version History */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              SIMP Draft Versioning &amp; Revisions
            </h3>
          </div>
          <button
            onClick={() => setShowNewVersionModal(true)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#1B365D] rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Version</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {versions.map((ver, idx) => (
            <div 
              key={ver.version} 
              className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#1B365D]">{ver.version}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700 font-medium">{ver.summary}</span>
                  {idx === 0 && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Saved on {ver.createdAt} by {ver.createdBy}
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-200 text-slate-700">
                {ver.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500">
          Submitting SIMP will freeze edits and trigger Section 7 IEG Evaluation workflow in Menu 6.
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handleSubmitToIeg}
            className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 text-[#C5A059]" />
            <span>Submit SIMP for IEG Appraisal (Menu 6)</span>
          </button>
        </div>
      </div>

      {/* Modal: Create Version */}
      {showNewVersionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Create New SIMP Version</h3>
              <button onClick={() => setShowNewVersionModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleCreateVersion} className="p-4 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Summary of Modifications *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Updated canal syphon cost and incorporated Demol public hearing representations..."
                  value={newVersionSummary}
                  onChange={(e) => setNewVersionSummary(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewVersionModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Create Snapshot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
