import React, { useState } from 'react';
import { 
  DEFAULT_SIMP_NARRATIVE,
  PROJECT_CONTEXT 
} from '../../../services/siaSimpService.js';
import { 
  FileText, 
  Download, 
  Save, 
  Edit3, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Calendar, 
  IndianRupee, 
  ShieldCheck, 
  Activity, 
  Printer
} from 'lucide-react';

export default function SimpDraftSection({ impacts, mitigations }) {
  const [narrative, setNarrative] = useState(DEFAULT_SIMP_NARRATIVE);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const totalCost = mitigations.reduce((sum, m) => sum + (Number(m.estimatedCost) || 0), 0);

  const formatINR = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleSaveNarrative = () => {
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePrintDraft = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* 1. Draft Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Statutory Social Impact Management Plan (SIMP) Draft Document
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Prepared under Section 6 of RFCTLARR Act 2013 for submission to the Independent Expert Group (IEG)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Narrative Saved!
            </span>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Narratives'}</span>
          </button>

          {isEditing && (
            <button
              onClick={handleSaveNarrative}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Narrative</span>
            </button>
          )}

          <button
            onClick={handlePrintDraft}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export / Print Draft</span>
          </button>
        </div>
      </div>

      {/* 2. Structured Document Body (Formatted like an official government statutory plan) */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-6 text-slate-800 max-w-4xl mx-auto font-sans">
        {/* Document Header */}
        <div className="text-center border-b-2 border-[#1B365D] pb-6 space-y-2">
          <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
            GOVERNMENT OF GUJARAT • REVENUE DEPARTMENT
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1B365D] tracking-tight">
            SOCIAL IMPACT MANAGEMENT PLAN (SIMP)
          </h1>
          <div className="text-xs font-medium text-slate-600">
            Formulated under Section 6 of The Right to Fair Compensation and Transparency in Land Acquisition, 
            Rehabilitation and Resettlement Act, 2013 (Act 30 of 2013)
          </div>
          <div className="inline-block bg-slate-100 px-3 py-1 rounded text-xs font-mono font-bold text-slate-800 mt-2">
            Project: {PROJECT_CONTEXT.projectName} ({PROJECT_CONTEXT.projectId})
          </div>
        </div>

        {/* Section 1: Project Overview & Statutory Mandate */}
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2 border-b border-slate-200 pb-1 uppercase">
            <span className="font-mono">1.0</span> Project Overview &amp; Justification of Acquisition
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded border border-slate-200 font-mono text-[11px]">
            <div>
              <span className="text-slate-500 text-[10px] block">Requiring Body:</span>
              <strong className="text-slate-900">{PROJECT_CONTEXT.requiringBody}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Total Land:</span>
              <strong className="text-slate-900">{PROJECT_CONTEXT.proposedAcquisitionAreaHa} Ha</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Affected Area:</span>
              <strong className="text-slate-900">5 Revenue Villages</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">SIA Evaluation:</span>
              <strong className="text-slate-900">GIDR, Ahmedabad</strong>
            </div>
          </div>
          <p className="leading-relaxed text-slate-700 text-justify">
            The project involves the construction of a dedicated freight bypass rail alignment traversing Petlad, 
            Sunav, Demol, Nar, and Rangaipura villages in Anand District. In accordance with Section 8(1)(a) of the Act, 
            the acquiring authority has established that the land requested represents the bare minimum necessity 
            and that no unutilized government land was feasible for the technical curvature requirements.
          </p>
        </div>

        {/* Section 2: Identified Social Impacts (Editable Narrative + Summary Table) */}
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2 border-b border-slate-200 pb-1 uppercase">
            <span className="font-mono">2.0</span> Summary of Identified Social Impacts &amp; Disruptions
          </h2>
          {isEditing ? (
            <textarea
              rows={4}
              value={narrative.impactSummary}
              onChange={(e) => setNarrative({ ...narrative, impactSummary: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-900 leading-relaxed font-sans"
            />
          ) : (
            <p className="leading-relaxed text-slate-700 text-justify bg-slate-50/70 p-3 rounded border border-slate-200/70">
              {narrative.impactSummary}
            </p>
          )}

          {/* Table of impacts */}
          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 font-mono text-[10px] uppercase text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2">Impact ID</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Affected Component</th>
                  <th className="p-2">Affected Pop.</th>
                  <th className="p-2">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {impacts.map(i => (
                  <tr key={i.impactId}>
                    <td className="p-2 font-mono font-bold text-[#1B365D]">{i.impactId}</td>
                    <td className="p-2">{i.category}</td>
                    <td className="p-2 font-medium text-slate-900">{i.affectedComponent}</td>
                    <td className="p-2">{i.affectedFamiliesCount} Families</td>
                    <td className="p-2 font-semibold">{i.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Mitigation Measures Matrix */}
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2 border-b border-slate-200 pb-1 uppercase">
            <span className="font-mono">3.0</span> Social Impact Mitigation &amp; R&amp;R Action Matrix
          </h2>
          {isEditing ? (
            <textarea
              rows={4}
              value={narrative.mitigationStrategySummary}
              onChange={(e) => setNarrative({ ...narrative, mitigationStrategySummary: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-900 leading-relaxed font-sans"
            />
          ) : (
            <p className="leading-relaxed text-slate-700 text-justify bg-slate-50/70 p-3 rounded border border-slate-200/70">
              {narrative.mitigationStrategySummary}
            </p>
          )}

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 font-mono text-[10px] uppercase text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2">Measure ID</th>
                  <th className="p-2">Mitigation Description</th>
                  <th className="p-2">Responsible Agency</th>
                  <th className="p-2">Cost (INR)</th>
                  <th className="p-2">Target Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mitigations.map(m => (
                  <tr key={m.mitigationId}>
                    <td className="p-2 font-mono font-bold text-[#1B365D]">{m.mitigationId}</td>
                    <td className="p-2 max-w-xs">{m.measureDescription}</td>
                    <td className="p-2 font-medium">{m.responsibleAgency}</td>
                    <td className="p-2 font-mono font-bold text-slate-900">{formatINR(m.estimatedCost)}</td>
                    <td className="p-2 font-mono">{m.targetCompletionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Consolidated Budget & Project Escrow */}
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2 border-b border-slate-200 pb-1 uppercase">
            <span className="font-mono">4.0</span> Consolidated Estimated Mitigation Budget
          </h2>
          <div className="bg-blue-50/80 p-3 rounded border border-blue-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-blue-950 text-xs block">
                Total Estimated Social Impact Management Plan (SIMP) Outlay:
              </span>
              <span className="text-[11px] text-blue-800">
                To be deposited in full into the dedicated Land Acquisition Escrow Account under Section 19.
              </span>
            </div>
            <span className="text-lg font-bold font-mono text-[#1B365D] shrink-0">
              {formatINR(totalCost)}
            </span>
          </div>
        </div>

        {/* Section 5: Implementation & Monitoring Framework */}
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2 border-b border-slate-200 pb-1 uppercase">
            <span className="font-mono">5.0</span> Administrative Implementation &amp; Monitoring Mechanism
          </h2>
          {isEditing ? (
            <textarea
              rows={4}
              value={narrative.monitoringApproach}
              onChange={(e) => setNarrative({ ...narrative, monitoringApproach: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-900 leading-relaxed font-sans"
            />
          ) : (
            <p className="leading-relaxed text-slate-700 text-justify bg-slate-50/70 p-3 rounded border border-slate-200/70">
              {narrative.monitoringApproach}
            </p>
          )}
        </div>

        {/* Official Signatures Block */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
          <div className="space-y-6">
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1">
              <strong className="block text-slate-900">Dr. Sudhir K. Dave</strong>
              <span className="text-slate-500 text-[11px]">Lead Sociologist &amp; Evaluator, GIDR</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1">
              <strong className="block text-slate-900">Shri M. R. Vaghela, GAS</strong>
              <span className="text-slate-500 text-[11px]">Sub-Divisional Magistrate &amp; CA, Petlad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
