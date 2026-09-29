import React, { useState } from 'react';
import { 
  Users, 
  Home, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Search, 
  ShieldCheck, 
  Building2, 
  ExternalLink,
  PieChart,
  FileSpreadsheet,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalRnrTab() {
  const { showToast, setActiveModule } = useWorkspace();
  const [beneficiaryFilter, setBeneficiaryFilter] = useState('All Beneficiary Classes');
  const [dbtFilter, setDbtFilter] = useState('All DBT Statuses');
  const [searchTerm, setSearchTerm] = useState('');

  const families = [
    {
      id: 'FAM-GJ-2026-0491',
      name: 'Kishorbhai R. Patel',
      ulpin: 'GJ-AMD-042-88192',
      village: 'Sanand Rural',
      category: 'Titleholder',
      displacement: 'Physically Displaced',
      benefits: '₹50,000 + Annuity (₹2.5k/mo)',
      dbtStatus: 'DISBURSED ₹50K',
      housing: 'Allotted: Unit B-104 (Sanand Colony)',
      isPending: false
    },
    {
      id: 'FAM-GJ-2026-0492',
      name: 'Manjula Solanki',
      ulpin: 'GJ-AMD-042-88193',
      village: 'Sanand Rural',
      category: 'SC Category',
      displacement: 'Physically Displaced',
      benefits: '₹50,000 + SC Special Ex-Gratia',
      dbtStatus: 'PENDING AADHAAR KYC',
      housing: 'Allotted: Unit A-012 (Priority Ground Fl.)',
      isPending: true
    },
    {
      id: 'FAM-GJ-2026-0498',
      name: 'Devendra M. Vankar',
      ulpin: 'GJ-AMD-019-45012',
      village: 'Bavla Gamtal',
      category: 'Agri Laborer',
      displacement: 'Affected Only',
      benefits: '₹25,000 Livelihood Grant',
      dbtStatus: 'DISBURSED ₹25K',
      housing: 'Not Applicable (Non-Displaced)',
      isPending: false
    },
    {
      id: 'FAM-GJ-2026-0504',
      name: 'Hasmukhbhai Prajapati',
      ulpin: 'GJ-MEH-108-98214',
      village: 'Kadi West',
      category: 'Artisan / Potter',
      displacement: 'Physically Displaced',
      benefits: '₹50,000 + Shed Grant (₹25k)',
      dbtStatus: 'DISBURSED ₹75K',
      housing: 'In Construction (Phase 2 Padra)',
      isPending: false
    },
    {
      id: 'FAM-GJ-2026-0511',
      name: 'Rathwa Somabhai',
      ulpin: 'GJ-MEH-108-99215',
      village: 'Kadi West',
      category: 'ST Category',
      displacement: 'Physically Displaced',
      benefits: '₹50,000 + 1-Acre Alt Land',
      dbtStatus: 'DISBURSED ₹50K',
      housing: 'ST Allotment: Unit ST-04',
      isPending: false
    },
    {
      id: 'FAM-GJ-2026-0518',
      name: 'Arvindbhai K. Baria',
      ulpin: 'GJ-AMD-077-11209',
      village: 'Detroj Ext.',
      category: 'Titleholder',
      displacement: 'Physically Displaced',
      benefits: '₹50,000 + Cash in lieu of House',
      dbtStatus: 'BANK IFSC VERIF',
      housing: 'Cash Opted (₹12.50 Lakh)',
      isPending: true
    }
  ];

  return (
    <div className="p-5 space-y-5">
      
      {/* Statutory Governance Notice Banner */}
      <div className="bg-[#0b1b36] text-white p-3.5 rounded-lg shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              REQUISITIONING BODY STATUTORY GOVERNANCE NOTICE: Mandate RFCTLARR Act 2013 Chapter V (Sec 16-31)
            </h3>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Monitoring Resettlement Infrastructure Development, Scheduled Castes / Scheduled Tribes Entitlements, Annuity &amp; DBT Benefits.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
          <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
            R&amp;R Administrator: SLAO Mehsana / Ahmedabad
          </span>
          <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
            Model: Sanand Township #3
          </span>
        </div>
      </div>

      {/* 7 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        
        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">AFFECTED FAMILIES</div>
          <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">8,412</div>
          <div className="text-[10px] text-slate-500">Census surveyed</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">DISPLACED FAMILIES</div>
          <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">2,184</div>
          <div className="text-[10px] text-slate-500">Physical relocation</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">AWARDS SANCTIONED</div>
          <div className="text-xl font-bold text-emerald-700 font-sans mt-0.5">1,940</div>
          <div className="text-[10px] text-emerald-600 font-medium">88.8% Passed</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">DBT COMPLETED</div>
          <div className="text-xl font-bold text-emerald-700 font-sans mt-0.5">1,721</div>
          <div className="text-[10px] text-slate-500">₹8.60 Cr Direct</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-rose-700 uppercase tracking-wider">DBT PENDING</div>
          <div className="text-xl font-bold text-rose-600 font-sans mt-0.5">219</div>
          <div className="text-[10px] text-rose-600 font-medium">Bank/KYC mismatch</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">HOUSING REQUIRED</div>
          <div className="text-xl font-bold text-slate-900 font-sans mt-0.5">482</div>
          <div className="text-[10px] text-slate-500">Resettlement units</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-xs">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">HOUSING HANDOVER</div>
          <div className="text-xl font-bold text-blue-700 font-sans mt-0.5">361</div>
          <div className="text-[10px] text-blue-600 font-medium">74.9% Allotted</div>
        </div>

      </div>

      {/* Middle Section: Milestones & Demographics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Statutory R&R Milestone Progression (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Statutory R&amp;R Milestone Progression (SEC 16-19 AUDITED)
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Statutory Compliance High
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-[11px]">1. Socio-Economic Survey &amp; Baseline Census</div>
                <div className="text-[10px] text-slate-500 mt-0.5">8,412 families surveyed across 17 villages</div>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded">
                COMPLETE
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-[11px]">2. Draft R&amp;R Scheme Formulation (Sec 16)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Published in State Gazette Ext. #241; Gram Sabha consultations executed</div>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded">
                GAZETTE SEALED
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-[11px]">3. R&amp;R Award Declarations (Sec 31)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">1,940 of 2,184 awards passed by R&amp;R Collectorate</div>
              </div>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[10px] px-2 py-0.5 rounded">
                IN PROGRESS (88.8%)
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-[11px]">4. Benefit &amp; Solatium Disbursement (DBT)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">1,721 paid, 219 under Aadhaar seeding &amp; NPCI validation</div>
              </div>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[10px] px-2 py-0.5 rounded">
                IN PROGRESS (88.7%)
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-[11px]">5. Resettlement Colony Infrastructure &amp; Housing</div>
                <div className="text-[10px] text-slate-500 mt-0.5">361 units handed over at Sanand Model Township; roads &amp; power energized</div>
              </div>
              <span className="bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px] px-2 py-0.5 rounded">
                IN PROGRESS (74.9%)
              </span>
            </div>
          </div>
        </div>

        {/* Beneficiary Demographics & Colony Card (1 col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Beneficiary Demographics
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">8,412 Total</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-1.5 rounded hover:bg-slate-50">
              <span className="text-slate-700">Titleholders / Landowners</span>
              <span className="font-bold text-slate-900">5,420 (64.4%)</span>
            </div>
            <div className="flex justify-between items-center p-1.5 rounded hover:bg-slate-50">
              <span className="text-slate-700">Agricultural Laborers &amp; Tenants</span>
              <span className="font-bold text-slate-900">1,812 (21.5%)</span>
            </div>
            <div className="flex justify-between items-center p-1.5 rounded hover:bg-slate-50">
              <span className="text-slate-700">Artisans &amp; Commercial Losers</span>
              <span className="font-bold text-slate-900">496 (5.9%)</span>
            </div>
            <div className="flex justify-between items-center p-1.5 rounded hover:bg-slate-50 bg-amber-50/50">
              <span className="text-slate-800 font-medium">Scheduled Caste (SC) Beneficiaries</span>
              <span className="font-bold text-amber-900">384 (4.6%)</span>
            </div>
            <div className="flex justify-between items-center p-1.5 rounded hover:bg-slate-50 bg-amber-50/50">
              <span className="text-slate-800 font-medium">Scheduled Tribe (ST) Beneficiaries</span>
              <span className="font-bold text-amber-900">300 (3.6%)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 bg-slate-50 p-2.5 rounded-md text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 text-[11px]">Resettlement Site #03: Sanand</span>
              <span className="text-[10px] font-bold text-emerald-700">482 Total Capacity</span>
            </div>
            <p className="text-[10px] text-slate-600">
              Model township with school, PHC, community center, and piped drinking water.
            </p>
            <button 
              onClick={() => showToast('Opening Sanand Resettlement Township live telemetry inspection')}
              className="text-blue-700 hover:text-blue-800 font-semibold text-[10px] flex items-center gap-1 mt-1"
            >
              <span>Inspect Live Construction Telemetry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Family Benefit & Resettlement Register Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        
        {/* Header Controls */}
        <div className="p-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Family Benefit &amp; Resettlement Register
            </h3>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              8,412 Families
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Family / ULPIN"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded pl-7 pr-2 py-1 text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <select 
              value={beneficiaryFilter}
              onChange={(e) => setBeneficiaryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
            >
              <option>All Beneficiary Classes</option>
              <option>Titleholder</option>
              <option>SC Category</option>
              <option>ST Category</option>
              <option>Agri Laborer</option>
              <option>Artisan / Potter</option>
            </select>

            <select 
              value={dbtFilter}
              onChange={(e) => setDbtFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
            >
              <option>All DBT Statuses</option>
              <option>Disbursed</option>
              <option>Pending KYC</option>
              <option>Bank IFSC Verif</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1b36] text-white text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4 font-mono">FAMILY HEAD ID</th>
                <th className="py-2.5 px-4">ULPIN / VILLAGE</th>
                <th className="py-2.5 px-4">CATEGORY</th>
                <th className="py-2.5 px-4">DISPLACEMENT</th>
                <th className="py-2.5 px-4">ENTITLED BENEFITS</th>
                <th className="py-2.5 px-4">DBT STATUS</th>
                <th className="py-2.5 px-4">HOUSING ALLOTMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {families.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                    <div>{f.id}</div>
                    <div className="text-[11px] font-sans font-medium text-slate-600">{f.name}</div>
                  </td>
                  <td className="py-2.5 px-4 text-slate-700">
                    <div className="font-mono text-[11px]">{f.ulpin}</div>
                    <div className="text-[10px] text-slate-500">{f.village}</div>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                      {f.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{f.displacement}</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">{f.benefits}</td>
                  <td className="py-2.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      f.isPending
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {f.dbtStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-700 font-medium">{f.housing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveModule('rnr-dbt')}
              className="bg-[#0b1b36] hover:bg-[#182d52] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>View Complete R&amp;R Benefit Ledger</span>
            </button>

            <button 
              onClick={() => showToast('Exporting DBT Audit Report (CSV)...')}
              className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download DBT Audit Report</span>
            </button>
          </div>

          <button 
            onClick={() => showToast('Connecting to R&R Administrator Desk (Mehsana / Ahmedabad)...')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Raise Inquiry with R&amp;R Administrator</span>
          </button>
        </div>

      </div>

    </div>
  );
}
