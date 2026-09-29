import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  Home, 
  CreditCard, 
  Building2, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function SCSTPlanBuilderPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    scStPlan, 
    setScStPlan,
    families,
    setDocumentModal,
    setESignModal,
    addAuditLog 
  } = useRRAuthority();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'safeguards', 'beneficiaries', 'resolutions'

  // Filter SC and ST families from the census
  const scStFamilies = (families || []).filter(f => 
    f?.casteCategory?.includes('ST') || f?.casteCategory?.includes('SC')
  );

  const handleSignOffScStPlan = () => {
    setESignModal({
      isOpen: true,
      context: {
        title: 'Certify Section 41 SC / ST Development Plan',
        actionTitle: 'SC_ST_DEVELOPMENT_PLAN_CERTIFIED',
        entityName: `Project ${selectedProject.code} (68 Beneficiary Families)`,
        documentName: 'SC_ST_DEV_PLAN_SEC41_CERTIFIED.pdf'
      },
      onSignComplete: (signHash) => {
        addAuditLog(
          'SC_ST_DEVELOPMENT_PLAN_SANCTIONED',
          'Section 41 Development Plan',
          'Status: Formulation Active',
          `Status: Authenticated with DSC (${signHash})`,
          'SC_ST_DEV_PLAN_SEC41_CERTIFIED.pdf'
        );
        alert(`Section 41 SC / ST Development Plan authenticated and sealed with Digital Signature Certificate (${signHash}).`);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Status */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                SC / ST Specialized Development Plan Builder
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                RFCTLARR Section 41 Statutory Safeguards
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Mandatory protective provisions, Gram Sabha prior informed consent, 1/3rd extra compensation grants, and compact block resettlement.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Section 41 SC / ST Specialized Development Plan',
                    code: 'DOC-SEC41-PLAN-2026.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview Plan PDF</span>
            </button>

            <button
              onClick={handleSignOffScStPlan}
              className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Certify Sec 41 Plan (DSC)</span>
            </button>
          </div>
        </div>

        {/* 3. Section 41 Statutory Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Eligible SC / ST Families</span>
            <div className="text-xl font-bold font-mono text-amber-700">{scStPlan.affectedFamiliesCount} Families</div>
            <div className="text-[10px] text-slate-500 font-sans">Form IV Certified Roster</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Sec 41(4) Extra Grant Earmarked</span>
            <div className="text-xl font-bold font-mono text-emerald-700">₹{scStPlan.totalEarmarkedBudgetCr} Cr</div>
            <div className="text-[10px] text-slate-500 font-sans">Mandatory 33.33% Top-up</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Gram Sabha Consent (Sec 41(3))</span>
            <div className="text-xs font-bold text-emerald-800 leading-tight">Passed &amp; Recorded</div>
            <div className="text-[10px] text-slate-500 font-mono">Sunav Panchayat Res 14</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Compact Block Resettlement</span>
            <div className="text-xs font-bold text-[#1B365D] leading-tight">Sector 7-C Cluster</div>
            <div className="text-[10px] text-slate-500 font-mono">Section 41(6) Compliant</div>
          </div>
        </div>

        {/* 4. Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 pt-2 rounded-t-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>1. Section 41 Statutory Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('beneficiaries')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'beneficiaries'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>2. Beneficiary Family Register ({scStFamilies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resolutions')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'resolutions'
                ? 'border-[#1B365D] text-[#1B365D] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Gram Sabha Resolutions &amp; PESA Vault</span>
          </button>
        </div>

        {/* Tab 1: Section 41 Statutory Matrix */}
        {activeTab === 'overview' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span className="font-bold text-amber-900 text-xs">Section 41 Safeguards Overview</span>
              </div>
              <span className="font-mono text-[10px] text-amber-800">RFCTLARR 2013 Chapter V</span>
            </div>

            <div className="space-y-3">
              {(scStPlan?.safeguards || scStPlan?.mandatorySafeguards || []).map((sf, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1B365D] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {sf.subSection || sf.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs">{sf.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {sf.compliance || sf.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {sf.details || sf.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Beneficiary Family Register */}
        {activeTab === 'beneficiaries' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Section 41 Scheduled Category Entitlement Roll
                </h3>
                <p className="text-[11px] text-slate-500">
                  Every family receives standard Second Schedule grants PLUS the statutory 1/3rd extra compensation.
                </p>
              </div>

              <div className="font-mono text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                100% PFMS Aadhaar Seeded
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-[10px] font-mono text-slate-700 uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Family ID</th>
                    <th className="p-2.5">Head of Family</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">14-Digit ULPIN</th>
                    <th className="p-2.5">Acquired Land</th>
                    <th className="p-2.5">Standard Grant</th>
                    <th className="p-2.5">Sec 41 1/3rd Extra</th>
                    <th className="p-2.5">Total Package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(scStFamilies || []).map((f) => (
                    <tr key={f.familyId} className="hover:bg-slate-50 font-mono">
                      <td className="p-2.5 font-bold text-[#1B365D]">{f.familyId}</td>
                      <td className="p-2.5 font-sans font-semibold text-slate-900">{f.headName}</td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          {f.casteCategory}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600">{f.ulpin}</td>
                      <td className="p-2.5 text-slate-900">{f.agriculturalLandAcquiredHa} Ha</td>
                      <td className="p-2.5 text-slate-700 font-bold">₹5,00,000</td>
                      <td className="p-2.5 text-emerald-700 font-bold">+₹1,66,667</td>
                      <td className="p-2.5 text-indigo-900 font-bold">₹6,66,667</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Gram Sabha Resolutions */}
        {activeTab === 'resolutions' && (
          <div className="bg-white p-5 rounded-b-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                Section 41(3) Gram Sabha Prior Informed Consent Archive
              </h3>
              <p className="text-[11px] text-slate-500">
                Statutory quorum verification, bilingual minutes, audio-video recording hash, and Sarpanch seal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs">
                    Sunav Gram Sabha Resolution (Scheduled Enclave)
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    APPROVED
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <div>Resolution Number: <strong>GS-RES-SUNAV-14</strong></div>
                  <div>Meeting Date: <strong>14/09/2026 at 10:30 AM</strong></div>
                  <div>Quorum Attendance: <strong>184 Voters (62% Women Attendance)</strong></div>
                  <div>Audio-Visual Recording Hash: <span className="font-mono text-[10px]">SHA256:49f2...81a</span></div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setDocumentModal({
                        isOpen: true,
                        doc: {
                          name: 'Gram Sabha Resolution GS-RES-SUNAV-14',
                          code: 'GS-RES-SUNAV-14.pdf'
                        }
                      });
                    }}
                    className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>View Certified Resolution PDF</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs">
                    Petlad Tribal Advisory Council (TAC) Consultation
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    CONSULTED
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <div>Reference No: <strong>TAC-GJ-ANAND-2026-081</strong></div>
                  <div>Consultation Date: <strong>18/09/2026</strong></div>
                  <div>Recommendation: <strong>Compact Block Housing with Community Devsthan</strong></div>
                  <div>Action Taken: <strong>0.5 Ha Community Hall Earmarked in Sector-7C</strong></div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setDocumentModal({
                        isOpen: true,
                        doc: {
                          name: 'Tribal Advisory Council Consultation Minutes',
                          code: 'TAC-GJ-ANAND-2026-081.pdf'
                        }
                      });
                    }}
                    className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>View TAC Report PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
