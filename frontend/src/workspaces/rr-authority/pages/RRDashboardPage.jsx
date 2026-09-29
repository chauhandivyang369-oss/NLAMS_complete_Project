import React from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import RRResettlementMap from '../components/gis/RRResettlementMap.jsx';
import { 
  Users, 
  Home, 
  CreditCard, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  Layers, 
  Compass, 
  MapPin,
  ExternalLink,
  ShieldAlert,
  Calendar
} from 'lucide-react';

export default function RRDashboardPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    projects, 
    setSelectedProjectId,
    families,
    plots,
    dbtRecords,
    setActiveMenu
  } = useRRAuthority();

  const allottedCount = (plots || []).filter(p => p.status === 'Allotted').length;
  const dbtCreditedCount = (dbtRecords || []).filter(d => d.status === 'CREDITED').length;

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-5">
        
        {/* Page Title & Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                R&amp;R Administrator Executive Command Center
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#C5A059]/20 text-[#8c6b22] border border-[#C5A059]/40">
                RFCTLARR Sec 43
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Statutory ground operations, baseline socio-economic census, scheme formulation and resettlement delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveMenu('affected-families')}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Open Census Register</span>
            </button>

            <button
              onClick={() => setActiveMenu('rr-scheme-builder')}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b08b43] text-slate-950 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Form V Scheme Builder</span>
            </button>
          </div>
        </div>

        {/* 3. Operational KPI Section (12 High-Density Official Metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">1. Total Affected Families</span>
            <div className="text-xl font-bold font-mono text-slate-900">{selectedProject?.totalAffectedFamilies ?? 0}</div>
            <div className="text-[10px] text-slate-500 font-sans">Form IV Baseline Census</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">2. Landowners</span>
            <div className="text-xl font-bold font-mono text-[#1B365D]">{selectedProject?.landownerFamiliesCount ?? 0}</div>
            <div className="text-[10px] text-slate-500 font-sans">Titleholders (RoR Linked)</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">3. Livelihood Dependents</span>
            <div className="text-xl font-bold font-mono text-indigo-700">{selectedProject?.livelihoodDependentFamiliesCount ?? 0}</div>
            <div className="text-[10px] text-slate-500 font-sans">Tenants / Labourers / Artisans</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">4. SC / ST Families</span>
            <div className="text-xl font-bold font-mono text-amber-600">{selectedProject?.scStFamiliesCount ?? 0}</div>
            <div className="text-[10px] text-amber-700 font-bold font-sans">Section 41 Triggered</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">5. Women-Headed</span>
            <div className="text-xl font-bold font-mono text-purple-700">{selectedProject?.womenHeadedFamiliesCount ?? 0}</div>
            <div className="text-[10px] text-slate-500 font-sans">Special Vulnerability</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">6. Displaced Families</span>
            <div className="text-xl font-bold font-mono text-rose-600">{selectedProject?.displacedFamiliesCount ?? 0}</div>
            <div className="text-[10px] text-rose-700 font-bold font-sans">Homestead Loss</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">7. Scheme Status</span>
            <div className="text-xs font-bold text-blue-900 leading-tight">Draft Formulated</div>
            <div className="text-[10px] text-slate-500 font-mono">Sec 16(5) Hearing Active</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">8. R&amp;R Budget Allocated</span>
            <div className="text-xl font-bold font-mono text-emerald-700">₹{selectedProject?.budgetAllocatedCr ?? 0} <span className="text-xs">Cr</span></div>
            <div className="text-[10px] text-slate-500 font-sans">Escrow Ledger Certified</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">9. Budget Disbursed</span>
            <div className="text-xl font-bold font-mono text-emerald-600">₹{selectedProject?.budgetDisbursedCr ?? 0} <span className="text-xs">Cr</span></div>
            <div className="text-[10px] text-emerald-700 font-sans">34.6% Direct Bank Credit</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">10. Pending Entitlements</span>
            <div className="text-xl font-bold font-mono text-slate-700">22</div>
            <div className="text-[10px] text-slate-500 font-sans">Under SDM Verification</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">11. Allotments Issued</span>
            <div className="text-xl font-bold font-mono text-[#1B365D]">{allottedCount}</div>
            <div className="text-[10px] text-slate-500 font-sans">Sector 7 Colony Plots</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">12. DBT Credits Completed</span>
            <div className="text-xl font-bold font-mono text-emerald-700">{dbtCreditedCount}</div>
            <div className="text-[10px] text-slate-500 font-sans">PFMS Aadhaar Validated</div>
          </div>

        </div>

        {/* 4. Interactive Resettlement GIS + Action Required Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* GIS Map Canvas (2 Columns) */}
          <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1B365D]" />
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Bhu-Naksha GIS Overlay: Project Alignment vs Resettlement Colony
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Geo-referenced Cadastral Parcels • Petlad Gaothan Sector 7
              </span>
            </div>

            <RRResettlementMap height="380px" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">CORRIDOR RIGHT-OF-WAY</span>
                <strong>45m Linear Corridor (24.8 km)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">RESETTLEMENT COLONY EXTENT</span>
                <strong className="text-emerald-700">18.5 Hectares (120 Model Plots)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">SURVEY GEO-TAGGING STATUS</span>
                <strong className="text-blue-900">100% Mobile App Geo-Tagged</strong>
              </div>
            </div>
          </div>

          {/* Action Required Panel (1 Column) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Action Required by Administrator
                  </h3>
                </div>
                <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-rose-100 text-rose-800">
                  4 High Priority
                </span>
              </div>

              <div className="space-y-2 mt-3">
                {[
                  {
                    title: '24 Tenant Families Verification Pending',
                    desc: 'Sunav village survey claims tenancy proof under verification with Talati records.',
                    due: '26/09/2026',
                    targetMenu: 'affected-families'
                  },
                  {
                    title: 'Publish Form V Draft Scheme Notice',
                    desc: 'Finalize Schedule II entitlement matrix prior to Gram Sabha hearing.',
                    due: '28/09/2026',
                    targetMenu: 'rr-scheme-builder'
                  },
                  {
                    title: 'Sign 14 Remaining Plot Allotment Orders',
                    desc: 'Sector 7 Gaothan plots demarcation complete; awaiting DSC token sign-off.',
                    due: '30/09/2026',
                    targetMenu: 'rr-allotment'
                  },
                  {
                    title: 'Resolve Irrigation Siphon Objection',
                    desc: 'Western Railway engineering team submitted revised sleeve pipeline drawings.',
                    due: '02/10/2026',
                    targetMenu: 'public-hearing'
                  }
                ].map((act, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors space-y-1">
                    <div className="font-bold text-slate-900 text-xs">{act.title}</div>
                    <p className="text-[11px] text-slate-600 leading-snug">{act.desc}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px] font-mono">
                      <span className="text-rose-700 font-bold">Due: {act.due}</span>
                      <button
                        onClick={() => setActiveMenu(act.targetMenu)}
                        className="text-[#1B365D] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <span>Resolve</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-[11px] text-blue-950 font-sans mt-3">
              <strong>Statutory Note:</strong> Section 16(2) mandates that the Administrator must submit the Draft R&amp;R Scheme along with public hearing findings to the Collector within 60 days of SIA clearance.
            </div>
          </div>

        </div>

        {/* 5. Statutory R&R Process Lifecycle Timeline */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1B365D]" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                RFCTLARR Act R&amp;R Statutory Workflow Lifecycle
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Stages 1 to 9 Sequenced under Section 16, 18, 31, 38 &amp; 41
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-2 text-center text-[10px] font-mono">
            {[
              { stage: '1. SIA Clearance', status: 'Completed', date: '14/08/2026', done: true },
              { stage: '2. Baseline Census', status: 'Completed', date: '08/09/2026', done: true },
              { stage: '3. Draft Scheme', status: 'Formulated', date: '14/09/2026', done: true },
              { stage: '4. Public Notice', status: 'Published', date: '18/09/2026', done: true },
              { stage: '5. Public Hearing', status: 'Scheduled (12/10)', date: 'Active', current: true },
              { stage: '6. Sec 18 Sanction', status: 'Pending Hearing', date: 'Nov 2026' },
              { stage: '7. Sec 31 Award', status: 'Pending Sanction', date: 'Dec 2026' },
              { stage: '8. Plot Allotment', status: 'Ongoing (Batch 1)', date: 'Sep-Dec' },
              { stage: '9. PFMS DBT Credit', status: 'Payroll Active', date: 'Ongoing' }
            ].map((st, i) => (
              <div 
                key={i} 
                className={`p-2 rounded-lg border flex flex-col justify-between ${
                  st.done 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                    : st.current 
                      ? 'bg-blue-50 border-[#1B365D] text-[#1B365D] font-bold shadow-xs ring-1 ring-[#1B365D]' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="font-bold font-sans text-[11px] leading-tight mb-1">{st.stage}</div>
                <div>
                  <span className={`px-1 py-0.2 rounded font-bold text-[9px] ${
                    st.done ? 'bg-emerald-200 text-emerald-950' : st.current ? 'bg-[#1B365D] text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {st.status}
                  </span>
                  <div className="text-[9px] text-slate-400 mt-1">{st.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Assigned Projects Master List Table */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#1B365D]" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Assigned Land Acquisition Projects Under Administrator Charge
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Total 3 Active Projects
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Project ID / Code</th>
                  <th className="p-2.5">Project Title</th>
                  <th className="p-2.5">District / State</th>
                  <th className="p-2.5">Affected Families</th>
                  <th className="p-2.5">Census Progress</th>
                  <th className="p-2.5">R&amp;R Stage</th>
                  <th className="p-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(projects || []).map((p) => (
                  <tr key={p.id} className={`hover:bg-slate-50 ${selectedProject?.id === p.id ? 'bg-blue-50/50' : ''}`}>
                    <td className="p-2.5 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                      {p.code}
                      <div className="text-[10px] text-slate-400 font-normal">{p.id}</div>
                    </td>
                    <td className="p-2.5 font-semibold text-slate-900 max-w-xs truncate" title={p.name}>
                      {p.name}
                      <div className="text-[10px] font-normal text-slate-500">{p.requiringBody}</div>
                    </td>
                    <td className="p-2.5 text-slate-700 whitespace-nowrap">
                      {p.district}, {p.state}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {p.totalAffectedFamilies} <span className="font-normal text-[10px] text-slate-500">({p.displacedFamiliesCount} Displaced)</span>
                    </td>
                    <td className="p-2.5 whitespace-nowrap font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                        </div>
                        <span className="font-bold text-emerald-700">100%</span>
                      </div>
                    </td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-100 text-blue-900 border border-blue-200">
                        {p.rrStatus}
                      </span>
                    </td>
                    <td className="p-2.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedProjectId(p.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          selectedProject.id === p.id 
                            ? 'bg-[#1B365D] text-white' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {selectedProject.id === p.id ? 'Active Project' : 'Select Project'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
