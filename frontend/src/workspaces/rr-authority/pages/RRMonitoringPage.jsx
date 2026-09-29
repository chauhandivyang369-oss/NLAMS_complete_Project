import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  TrendingUp, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Layers, 
  FileText, 
  Activity,
  Compass,
  CreditCard,
  Users
} from 'lucide-react';

export default function RRMonitoringPage({ onSwitchWorkspace }) {
  const { 
    projects, 
    selectedProject, 
    setSelectedProjectId,
    setDocumentModal,
    addAuditLog 
  } = useRRAuthority();

  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                State / Central R&amp;R Monitoring &amp; Compliance Dashboard
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#1B365D] text-white">
                NMC (Sec 48) &amp; SMC (Sec 50)
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Apex statewide multi-project oversight, infrastructure execution velocity, grievance redressal, and lapsing radar.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'State Level R&R Performance Brief (SMC Quinquennial)',
                    code: 'SMC-ANNUAL-REPORT-2026.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export SMC State Brief</span>
            </button>
          </div>
        </div>

        {/* 3. Statewide Executive Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Active State R&amp;R Schemes</span>
            <div className="text-xl font-bold font-mono text-slate-900">3 Major Projects</div>
            <div className="text-[10px] text-slate-500 font-sans">1,780 Affected Families Total</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Statewide R&amp;R Escrow Pool</span>
            <div className="text-xl font-bold font-mono text-emerald-700">₹64.20 Crores</div>
            <div className="text-[10px] text-emerald-800 font-sans">100% Deposited in Escrow</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">DBT Cumulative Disbursement</span>
            <div className="text-xl font-bold font-mono text-indigo-700">₹32.90 Crores</div>
            <div className="text-[10px] text-slate-500 font-sans">51.2% Overall State Progress</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Statutory Compliance Health</span>
            <div className="text-xl font-bold font-mono text-emerald-600">97.8%</div>
            <div className="text-[10px] text-slate-500 font-sans">Zero Lapsed Sanctions</div>
          </div>
        </div>

        {/* 4. Multi-Project Comparative Execution Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#1B365D]" />
              <span>STATE R&amp;R SCHEMES COMPARATIVE OVERSIGHT LEDGER</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Live PostGIS Synchronization</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-[10px] font-mono text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Project ID</th>
                  <th className="p-2.5">Title &amp; Requiring Agency</th>
                  <th className="p-2.5">District</th>
                  <th className="p-2.5">Affected Families</th>
                  <th className="p-2.5">R&amp;R Budget</th>
                  <th className="p-2.5">Housing Delivery</th>
                  <th className="p-2.5">SLA Lapsing Radar</th>
                  <th className="p-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(projects || []).map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                      {proj.code}
                    </td>

                    <td className="p-2.5 font-semibold text-slate-900">
                      {proj.name}
                      <div className="text-[10px] text-slate-500 font-normal">{proj.requiringBody}</div>
                    </td>

                    <td className="p-2.5 text-slate-700 whitespace-nowrap">
                      {proj.district}, {proj.state}
                    </td>

                    <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {proj.totalAffectedFamilies} <span className="font-normal text-[10px] text-slate-500">({proj.displacedFamiliesCount} Displaced)</span>
                    </td>

                    <td className="p-2.5 font-mono text-slate-900 whitespace-nowrap">
                      <div className="font-bold text-emerald-700">₹{proj.budgetAllocatedCr} Cr</div>
                      <div className="text-[10px] text-slate-500">Disbursed: ₹{proj.budgetDisbursedCr} Cr</div>
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-1.5 rounded-full" 
                            style={{ width: `${proj.progressPercent}%` }} 
                          />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-slate-700">{proj.progressPercent}%</span>
                      </div>
                    </td>

                    <td className="p-2.5 whitespace-nowrap font-mono">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        proj.daysRemaining > 30 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {proj.daysRemaining} Days Left
                      </span>
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedProjectId(proj.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[11px] font-bold cursor-pointer transition-colors"
                      >
                        Inspect Scheme
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Statutory Committees Reporting Feeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="font-bold text-slate-900 text-xs">
                State Monitoring Committee (Section 50) Quarterly Feed
              </div>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 text-emerald-900">
                ACTIVE
              </span>
            </div>

            <div className="text-[11px] text-slate-600 space-y-1">
              <div>Chaired by: <strong>Chief Secretary / Principal Secretary (Revenue)</strong></div>
              <div>Last Review: <strong>14/08/2026</strong></div>
              <div>Directives Issued: <strong>Zero encumbrance handover only after 100% Third Schedule amenities certified.</strong></div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="font-bold text-slate-900 text-xs">
                National Monitoring Committee (Section 48) Central Feed
              </div>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-blue-100 text-blue-900">
                CONNECTED
              </span>
            </div>

            <div className="text-[11px] text-slate-600 space-y-1">
              <div>Department: <strong>Department of Land Resources (DoLR), MoRD</strong></div>
              <div>National Portal Sync: <strong>NLAMS Central Hub (Automated API)</strong></div>
              <div>Inter-State Compliance: <strong>No inter-state boundary disputes detected.</strong></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
