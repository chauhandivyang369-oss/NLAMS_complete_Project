import React, { useState } from 'react';
import { ALTERNATIVE_SITES, MINIMUM_LAND_ASSESSMENT } from '../../../services/siaSurveyService.js';
import { 
  Compass, 
  Layers, 
  Leaf, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Table, 
  Users, 
  Scale
} from 'lucide-react';

export default function EnvironmentalAlternativeSection() {
  const [activeSubTab, setActiveSubTab] = useState('minimum-land'); // 'minimum-land' | 'alternative-sites' | 'vulnerable-groups' | 'environmental'

  return (
    <div className="space-y-4">
      {/* Sub Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'minimum-land', label: 'Minimum Land Assessment (Sec 8)', icon: Scale },
          { id: 'alternative-sites', label: 'Alternative Alignment Matrix (Sec 4)', icon: Compass },
          { id: 'vulnerable-groups', label: 'Vulnerable Groups Classification', icon: Users },
          { id: 'environmental', label: 'Environmental & Resource Observations', icon: Leaf }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeSubTab === t.id
                  ? 'bg-[#1B365D] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Minimum Land Assessment */}
      {activeSubTab === 'minimum-land' && (
        <div className="space-y-4">
          <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs flex items-start gap-2">
            <Scale className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
            <div className="text-slate-700 leading-relaxed">
              <strong className="text-blue-950 font-semibold">Section 8(1)(a) Bare-Minimum Land Mandate: </strong>
              The SIA field agency records whether the proposed land requisition is restricted strictly to the absolute minimum 
              required for safe railway bypass operations. This evidence forms the basis of the independent Expert Group appraisal.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <span className="text-[11px] text-slate-500 font-mono">Proposed Acquisition Area:</span>
                <div className="font-mono text-lg font-bold text-[#1B365D] mt-0.5">
                  {MINIMUM_LAND_ASSESSMENT.proposedAcquisitionArea}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <span className="text-[11px] text-slate-500 font-mono">Core Railway Essential Area:</span>
                <div className="font-mono text-lg font-bold text-slate-900 mt-0.5">
                  {MINIMUM_LAND_ASSESSMENT.essentialArea}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <span className="text-[11px] text-slate-500 font-mono">Potentially Excess Area:</span>
                <div className="font-mono text-lg font-bold text-emerald-700 mt-0.5">
                  {MINIMUM_LAND_ASSESSMENT.potentiallyExcessArea}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div>
                <span className="font-bold text-slate-900">Right-of-Way (ROW) Optimization Justification:</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">
                  {MINIMUM_LAND_ASSESSMENT.alternativeConfiguration}
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-900">Technical Standards &amp; Feasibility Constraints:</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">
                  {MINIMUM_LAND_ASSESSMENT.reductionPossible}
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-900">Supporting Engineering Evidentiary Record:</span>
                <p className="font-mono text-slate-800 text-[11px] mt-0.5">
                  {MINIMUM_LAND_ASSESSMENT.supportingEvidence}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900">SIA Ground Truth Conclusion:</span>
                <p className="text-slate-800 mt-0.5 italic">
                  "{MINIMUM_LAND_ASSESSMENT.siaObservation}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Alternative Sites Comparison Matrix */}
      {activeSubTab === 'alternative-sites' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-start gap-2">
            <Compass className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
            <div className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900 font-semibold">Section 4(4)(d) Alternative Alignment Comparison: </strong>
              Comparison of proposed corridor against feasible northern and southern bypass alignments evaluated by Western Railway engineers.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-200">
                  <th className="py-2.5 px-3 w-1/4">Evaluation Parameter</th>
                  <th className="py-2.5 px-3 w-1/4 bg-blue-50 text-blue-900 border-x border-blue-200 font-bold">
                    Proposed Alignment (Option A)
                  </th>
                  <th className="py-2.5 px-3 w-1/4">Alternative Option B (North)</th>
                  <th className="py-2.5 px-3 w-1/4">Alternative Option C (South)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ALTERNATIVE_SITES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800 bg-slate-50/50">
                      {row.parameter}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-blue-950 bg-blue-50/30 border-x border-blue-100">
                      {row.proposedSite}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {row.altSite1}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {row.altSite2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Vulnerable Groups Classification */}
      {activeSubTab === 'vulnerable-groups' && (
        <div className="space-y-3">
          <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
            <strong>Important Survey Classification Boundary: </strong>
            These categories are field-level identification tags. They do NOT independently grant or reject legal entitlements 
            until adjudicated by the Collector / Land Acquisition Officer under Sections 16 &amp; 31.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              { title: 'SC Affected Households', count: '42 Families', basis: 'Scheduled Caste certificate verified in field visit', note: 'Concentrated in Ward 4 Rohitvas and Demol' },
              { title: 'ST Affected Households', count: '18 Families', basis: 'Tadvi & Bhil tribal households recorded in Sunav faliya', note: 'Special Gram Sabha consultation required under Sec 41' },
              { title: 'Women-Headed Households', count: '31 Families', basis: 'Widows / single women holding primary land titles or dwellings', note: 'Prioritized for direct DBT homestead grants' },
              { title: 'Persons with Disabilities (PwD)', count: '14 Individuals', basis: 'UDID disability certificates verified', note: 'Barrier-free access included in relocation housing' },
              { title: 'Landless Agricultural Labourers', count: '94 Families', basis: 'Dependent for >3 years on affected farmland', note: 'Eligible for mandatory livelihood annuity under Second Schedule' },
              { title: 'Forest & Water Resource Dependent', count: '12 Families', basis: 'Fishing & water-chestnut cultivators on common pond', note: 'Alternative water rights mapped in SIMP' }
            ].map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{v.title}</h4>
                  <span className="font-mono font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {v.count}
                  </span>
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-700">Verification Basis: </span>
                  {v.basis}
                </div>
                <div className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded">
                  <span className="font-semibold text-slate-700">Safeguard Note: </span>
                  {v.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Environmental & Resource Observations */}
      {activeSubTab === 'environmental' && (
        <div className="space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
            <div className="font-bold text-slate-900 text-sm">SIA Natural Resource &amp; Environmental Impact Observations</div>
            <p className="text-slate-600 leading-relaxed">
              In accordance with Section 4(4)(b), the field team has surveyed local surface water drainages, common pastures, 
              and natural green buffers intersecting the 24.8 km bypass corridor.
            </p>

            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Mahi Right Bank Canal Minor Branch #4 Severance</span>
                  <span className="text-rose-700 font-mono text-[10px] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">SEVERANCE RISK</span>
                </div>
                <p className="text-slate-600">
                  Railway track at Ch. 11+600 cuts across an unlined agricultural distributary canal supplying water to 180 ha. 
                  Mandatory aqueduct / siphon box culvert must be integrated into railway engineering drawings.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Mature Roadside &amp; Field Bund Trees (Approx 420 Trees)</span>
                  <span className="text-amber-700 font-mono text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">COMPENSATION DUE</span>
                </div>
                <p className="text-slate-600">
                  Includes 140 Neem, 95 Mango, and 60 Babul trees. Joint enumeration with Forest Department completed for valuation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
