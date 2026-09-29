import React, { useState, useMemo } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  FileSpreadsheet, 
  Home, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Download, 
  Send, 
  Calculator, 
  FileText, 
  Layers, 
  CheckSquare, 
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

export default function RRSchemeBuilderPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    secondScheduleRules, 
    thirdScheduleFacilities, 
    setThirdScheduleFacilities,
    setDocumentModal,
    setESignModal,
    addAuditLog,
    emitEvent,
    setActiveMenu
  } = useRRAuthority();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'second-schedule', 'third-schedule', 'validation'
  const [schemeForm, setSchemeForm] = useState({
    schemeTitle: 'Draft R&R Scheme for Western Regional Dedicated Freight Corridor (Petlad Segment)',
    colonyName: 'Petlad Gaothan New Sector-7 Enclave',
    colonyAreaHa: 18.5,
    colonyGpsCoordinates: '22.4890° N, 72.8055° E',
    totalPlotsDemarcated: 120,
    plotStandardSizeSqM: 100,
    housingConstructionAgency: 'Gujarat Rural Housing Board (GRHB)',
    employmentAnnuityOption: 'Direct Monthly Annuity ₹2,500/mo (Adjusted for CPI)',
    draftPublicationDate: '14/09/2026',
    gramSabhaScheduleDate: '12/10/2026'
  });

  const [isSaved, setIsSaved] = useState(false);

  // Financial calculations for Third Schedule
  const totalThirdScheduleCostCr = useMemo(() => {
    const totalLakhs = (thirdScheduleFacilities || []).reduce((sum, f) => sum + (f.estimatedCostLakhs || 0), 0);
    return (totalLakhs / 100).toFixed(2);
  }, [thirdScheduleFacilities]);

  const handleUpdateFacilityStatus = (facilityNumber, newStatus, newProgress) => {
    setThirdScheduleFacilities(prev => (prev || []).map(f => {
      if (f.facilityNumber === facilityNumber) {
        return { ...f, executionStatus: newStatus, physicalProgressPercent: newProgress };
      }
      return f;
    }));
  };

  // Submit Draft Scheme to Commissioner (Sec 18)
  const handleSubmitToCommissioner = () => {
    setESignModal({
      isOpen: true,
      context: {
        title: 'Formulate & Submit Draft R&R Scheme (Section 16(2))',
        actionTitle: 'DRAFT_RR_SCHEME_SUBMITTED_TO_COMMISSIONER',
        entityName: `Project ${selectedProject.code} Form V Scheme`,
        documentName: 'FORM_V_DRAFT_RR_SCHEME_PETLAD.pdf'
      },
      onSignComplete: (signHash) => {
        addAuditLog(
          'DRAFT_SCHEME_SUBMITTED_SECTION_16_2',
          `Draft Scheme: ${schemeForm.schemeTitle}`,
          'Status: Draft under Formulation',
          `Status: Formally Transmitted to R&R Commissioner (Token: ${signHash})`,
          'FORM_V_TRANSMITTAL_LETTER.pdf'
        );

        emitEvent('DRAFT_SCHEME_SUBMITTED', {
          schemeTitle: schemeForm.schemeTitle,
          colony: schemeForm.colonyName,
          budgetCr: selectedProject.budgetAllocatedCr
        });

        alert(`Draft Scheme Form V successfully authenticated with Class-3 DSC and submitted to R&R Commissioner for Section 18 sanction!`);
        setActiveMenu('commissioner-approval');
      }
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Submittal Action */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                Draft R&amp;R Scheme Builder (Section 16(2) &amp; Form V)
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#C5A059]/20 text-[#8c6b22] border border-[#C5A059]/40">
                Statutory Form V Engine
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Comprehensive formulation of Second Schedule family packages and Third Schedule 25 infrastructural amenities.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Draft Form V Rehabilitation & Resettlement Scheme',
                    code: 'FORM-V-DRAFT-2026.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview Form V PDF</span>
            </button>

            <button
              onClick={handleSubmitToCommissioner}
              className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Submit to Commissioner (Sec 18)</span>
            </button>
          </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 pt-2 rounded-t-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>1. Form V Overview &amp; Colony Site</span>
          </button>

          <button
            onClick={() => setActiveTab('second-schedule')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'second-schedule'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>2. Second Schedule Entitlements Matrix (11 Items)</span>
          </button>

          <button
            onClick={() => setActiveTab('third-schedule')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'third-schedule'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3. Third Schedule Amenities (25 Facilities)</span>
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'validation'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>4. Statutory Checklist &amp; Sec 16(2) Sign-off</span>
          </button>
        </div>

        {/* 4. Tab 1: Form V Scheme Overview & Colony Site */}
        {activeTab === 'overview' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#1B365D]" />
                <span className="font-bold text-[#1B365D] text-xs">Section 16(2) Mandatory Particulars</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">Form V Rule 14(1)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title of Rehabilitation Scheme *</label>
                <input
                  type="text"
                  value={schemeForm.schemeTitle}
                  onChange={(e) => setSchemeForm({ ...schemeForm, schemeTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Approved Resettlement Colony Name *</label>
                <input
                  type="text"
                  value={schemeForm.colonyName}
                  onChange={(e) => setSchemeForm({ ...schemeForm, colonyName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Total Resettlement Site Area (Hectares) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={schemeForm.colonyAreaHa}
                  onChange={(e) => setSchemeForm({ ...schemeForm, colonyAreaHa: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Resettlement Site GPS Coordinates *</label>
                <input
                  type="text"
                  value={schemeForm.colonyGpsCoordinates}
                  onChange={(e) => setSchemeForm({ ...schemeForm, colonyGpsCoordinates: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Total Plots Demarcated *</label>
                <input
                  type="number"
                  value={schemeForm.totalPlotsDemarcated}
                  onChange={(e) => setSchemeForm({ ...schemeForm, totalPlotsDemarcated: parseInt(e.target.value, 10) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Housing Construction Agency *</label>
                <input
                  type="text"
                  value={schemeForm.housingConstructionAgency}
                  onChange={(e) => setSchemeForm({ ...schemeForm, housingConstructionAgency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 text-xs">Section 16(4) Bilingual Public Notice Particulars</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                The Draft Scheme will be displayed at the Offices of the Collector, Sub-Divisional Magistrate, Tehsildar, and Offices of the Gram Panchayats in Petlad, Sunav, Nar, and Fangani. A summary will be published in Gujarati and English daily newspapers circulating in the locality.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSaved(true);
                  setTimeout(() => setIsSaved(false), 2000);
                }}
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg cursor-pointer transition-colors"
              >
                {isSaved ? 'Saved Draft Successfully!' : 'Save Scheme Parameters'}
              </button>
            </div>
          </div>
        )}

        {/* 5. Tab 2: Second Schedule Entitlements Matrix */}
        {activeTab === 'second-schedule' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  RFCTLARR Act 2013 — THE SECOND SCHEDULE
                </h3>
                <p className="text-[11px] text-slate-500">
                  Elements of Rehabilitation and Resettlement Entitlements for all Affected Families (Sections 16(2), 31(1) and 38(1))
                </p>
              </div>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                11 Statutory Entitlement Heads
              </span>
            </div>

            <div className="space-y-3">
              {(secondScheduleRules || []).map((rule) => (
                <div key={rule.serialNumber} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1B365D] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {rule.serialNumber}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs">
                        {rule.elementName}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
                      Statutory Formula: {rule.statutoryFormula}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-700 pl-7 leading-relaxed">
                    {rule.provisionDetails}
                  </p>

                  <div className="pl-7 pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 text-[10px] font-mono text-slate-600">
                    <div>
                      Target Group: <strong className="text-slate-900">{rule.targetGroup}</strong>
                    </div>
                    <div className="text-emerald-700 font-bold">
                      Standard Amount / Norm: {rule.fixedAmountInr ? `₹${rule.fixedAmountInr.toLocaleString()}` : rule.norm}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Tab 3: Third Schedule 25 Amenities */}
        {activeTab === 'third-schedule' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  RFCTLARR Act 2013 — THE THIRD SCHEDULE
                </h3>
                <p className="text-[11px] text-slate-500">
                  Provision of 25 Infrastructural Facilities and Basic Minimum Amenities in Resettlement Areas (Sections 32 &amp; 16(2))
                </p>
              </div>

              <div className="font-mono text-right">
                <span className="text-slate-400 text-[10px] block">TOTAL AMENITIES BUDGET</span>
                <strong className="text-emerald-700 text-sm">₹{totalThirdScheduleCostCr} Crores</strong>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-[10px] font-mono text-slate-700 uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Item #</th>
                    <th className="p-2.5">Statutory Amenity Name</th>
                    <th className="p-2.5">Specification &amp; Benchmark</th>
                    <th className="p-2.5">Agency</th>
                    <th className="p-2.5">Est. Cost</th>
                    <th className="p-2.5">Physical Progress</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(thirdScheduleFacilities || []).map((fac) => (
                    <tr key={fac.facilityNumber} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-[#1B365D]">{fac.facilityNumber}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{fac.name}</td>
                      <td className="p-2.5 text-slate-600 text-[11px] max-w-xs">{fac.specification}</td>
                      <td className="p-2.5 text-slate-600 font-mono text-[10px]">{fac.executingAgency}</td>
                      <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">₹{fac.estimatedCostLakhs} L</td>
                      <td className="p-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-1.5 rounded-full" 
                              style={{ width: `${fac.physicalProgressPercent}%` }} 
                            />
                          </div>
                          <span className="font-mono text-[10px] font-bold text-slate-700">{fac.physicalProgressPercent}%</span>
                        </div>
                      </td>
                      <td className="p-2.5 whitespace-nowrap">
                        <select
                          value={fac.executionStatus}
                          onChange={(e) => handleUpdateFacilityStatus(
                            fac.facilityNumber, 
                            e.target.value, 
                            e.target.value === 'Completed' ? 100 : e.target.value === 'In Progress' ? 50 : 0
                          )}
                          className="py-1 px-1.5 bg-slate-50 border border-slate-300 rounded text-[10px] font-semibold text-slate-800"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="Tendering">Tendering</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. Tab 4: Statutory Checklist & Sec 16(2) Sign-off */}
        {activeTab === 'validation' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Section 16(2) Statutory Compliance Audit Checklist
                </h3>
              </div>
              <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                100% Pre-conditions Satisfied
              </span>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Baseline Socio-Economic Survey Complete (Form IV)', desc: '500 affected families certified with ULPIN linkage and RoR cross-verification.', verified: true },
                { title: 'Displaced Families Categorized for Housing Allotment', desc: '142 families losing homestead identified for 50 sq.m constructed house or cash grant.', verified: true },
                { title: 'Section 41 Special SC/ST Safeguards Earmarked', desc: '68 Scheduled families verified; 1/3rd extra compensation grant factored into budget.', verified: true },
                { title: 'Gram Sabha Prior Informed Consent Recorded', desc: 'Resolution GS-RES-SUNAV-14 passed in Scheduled Area Gram Sabha.', verified: true },
                { title: 'Third Schedule 25 Amenities Budgeted', desc: '₹4.24 Crores total works earmarked across 25 amenities in Sector-7 Gaothan.', verified: true },
                { title: '60-Day SLA Window Observed', desc: 'Draft Scheme formulated within 34 days of SIA appraisal approval.', verified: true }
              ].map((chk, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-xs">{chk.title}</div>
                    <div className="text-[11px] text-slate-600">{chk.desc}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>

            {/* Official Transmittal Block */}
            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 text-xs">Ready for Transmission to R&amp;R Commissioner</div>
                <div className="text-[11px] text-slate-600">
                  Transmitting this scheme advances the project to Section 18 Sanction &amp; Section 16(5) Public Hearings.
                </div>
              </div>

              <button
                onClick={handleSubmitToCommissioner}
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Submit Scheme with DSC Sign-off</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
