import React, { useState } from 'react';
import { 
  FileCheck2, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building2 
} from 'lucide-react';

export default function IegConditionsRegister({ 
  conditions = [], 
  onAddCondition 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCondition, setNewCondition] = useState({
    category: 'SIMP & Mitigation',
    conditionText: '',
    statutoryJustification: 'Section 7(5) RFCTLARR Act',
    responsibleAgency: 'G-RIDE / Western Railway',
    complianceDeadline: 'Prior to Section 19 declaration',
    verificationMechanism: 'Collector Field Inspection'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!newCondition.conditionText.trim()) return;
    onAddCondition({
      ...newCondition,
      conditionNumber: `COND-00${conditions.length + 1}`,
      status: 'Binding on Requiring Body'
    });
    setNewCondition({
      category: 'SIMP & Mitigation',
      conditionText: '',
      statutoryJustification: 'Section 7(5) RFCTLARR Act',
      responsibleAgency: 'G-RIDE / Western Railway',
      complianceDeadline: 'Prior to Section 19 declaration',
      verificationMechanism: 'Collector Field Inspection'
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#1B365D]" />
          <h3 className="font-bold text-slate-900 text-xs">
            Binding Statutory Conditions &amp; Modifications Register (Section 7(5))
          </h3>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-2.5 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Statutory Condition</span>
        </button>
      </div>

      {/* Add Condition Inline Form */}
      {showAddForm && (
        <form onSubmit={handleSave} className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg space-y-2">
          <div className="font-bold text-slate-900 text-xs">Draft New Binding Condition</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Condition Category</label>
              <select
                value={newCondition.category}
                onChange={(e) => setNewCondition({ ...newCondition, category: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              >
                <option value="SIMP & Mitigation">SIMP &amp; Mitigation</option>
                <option value="Land & Boundary">Land &amp; Boundary</option>
                <option value="R&R & Housing">R&amp;R &amp; Housing</option>
                <option value="Environmental">Environmental &amp; Water</option>
                <option value="Process & Timing">Process &amp; Timing</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Responsible Agency</label>
              <input
                type="text"
                value={newCondition.responsibleAgency}
                onChange={(e) => setNewCondition({ ...newCondition, responsibleAgency: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Condition Text (Mandatory Requirement)</label>
            <textarea
              rows={2}
              value={newCondition.conditionText}
              onChange={(e) => setNewCondition({ ...newCondition, conditionText: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-900"
              placeholder="Specify the exact statutory requirement or restriction..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 bg-slate-200 text-slate-700 rounded font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#1B365D] text-white rounded font-bold cursor-pointer"
            >
              Save Condition
            </button>
          </div>
        </form>
      )}

      {/* Conditions Table */}
      <div className="border border-slate-200 rounded-lg overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
            <tr>
              <th className="p-2.5">Code</th>
              <th className="p-2.5">Category</th>
              <th className="p-2.5">Condition Formulation</th>
              <th className="p-2.5">Responsible Agency</th>
              <th className="p-2.5">Compliance Stage</th>
              <th className="p-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {conditions.map((item, idx) => {
              const c = typeof item === 'string'
                ? {
                    conditionNumber: `COND-00${idx + 1}`,
                    category: 'SIMP & Mitigation',
                    conditionText: item,
                    statutoryJustification: 'Section 7(5) RFCTLARR Act',
                    responsibleAgency: 'Competent Authority / Western Railway',
                    complianceDeadline: 'Prior to Section 19 declaration',
                    verificationMechanism: 'Collector / SDM Certification',
                    status: 'Binding on Requiring Body'
                  }
                : item;

              const conditionKey = c.conditionNumber || c.id || `condition-row-${idx}`;

              return (
                <tr key={conditionKey} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                    {c.conditionNumber || `COND-00${idx + 1}`}
                  </td>

                  <td className="p-2.5 font-mono whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold">
                      {c.category || 'SIMP & Statutory'}
                    </span>
                  </td>

                  <td className="p-2.5 text-slate-800 leading-relaxed max-w-md">
                    <div className="font-semibold text-slate-900">{c.conditionText || item}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Ref: {c.statutoryJustification || 'Section 7(5) RFCTLARR Act'} | Verification: {c.verificationMechanism || 'Joint Panchnama Inspection'}
                    </div>
                  </td>

                  <td className="p-2.5 text-slate-600 font-medium whitespace-nowrap">
                    {c.responsibleAgency || 'G-RIDE / Western Railway'}
                  </td>

                  <td className="p-2.5 font-mono text-slate-600 whitespace-nowrap">
                    {c.complianceDeadline || 'Prior to Section 19 declaration'}
                  </td>

                  <td className="p-2.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {c.status || 'Binding on Requiring Body'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
