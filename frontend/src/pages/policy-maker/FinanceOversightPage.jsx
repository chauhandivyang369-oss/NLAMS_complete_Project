import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Coins, 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp,
  Download,
  Building,
  CreditCard,
  Info,
  Clock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';

export default function FinanceOversightPage() {
  const { 
    scopedProjects, 
    kpis, 
    openProjectIntelligence, 
    effectiveScope,
    activeSubPage,
    setActiveSubPage,
    currentRoleConfig
  } = usePolicyMaker();

  const currentTab = activeSubPage || 'financial-dashboard';
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProjects = (scopedProjects || []).filter(p => {
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 04
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SCOPE: {effectiveScope}
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            PFMS &amp; Direct Benefit Transfer (DBT) Financial Oversight
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Executive financial monitoring of compensation escrow deposits in CALA accounts and beneficiary Direct Benefit Transfer (DBT) disbursements.
          </p>
        </div>

        {/* Sub-view switcher - Dedicated full-width horizontal bar */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {[
              { id: 'financial-dashboard', label: 'Financial Dashboard' },
              { id: 'escrow-monitoring', label: 'Escrow Monitoring' },
              { id: 'dbt-status', label: 'DBT Status' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubPage(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currentTab === tab.id
                    ? 'bg-[#1B365D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prominent PFMS Integration Notice (Section 04) */}
      <div className="bg-amber-50/80 border border-amber-300 rounded p-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>PFMS CONNECTOR STATUS:</strong> DEMO / INTEGRATION PENDING — Displaying simulation of statutory escrow balances and Aadhaar DBT transaction streams.
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded shrink-0">
          STAGING GATEWAY
        </span>
      </div>

      {/* 2. Exact 5 Financial KPIs from Section 04 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Total Compensation */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">TOTAL COMPENSATION</span>
            <Coins className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-sans">
            ₹{Number(kpis?.totalOutlayCr || 14250).toLocaleString()} <span className="text-xs font-normal text-slate-500">Cr</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Approved Project Outlays</div>
        </div>

        {/* Escrow Deposited */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">ESCROW DEPOSITED</span>
            <Building className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-xl font-bold text-blue-900 font-sans">
            ₹{Number(kpis?.compensationEscrowCr || 8420).toLocaleString()} <span className="text-xs font-normal text-slate-500">Cr</span>
          </div>
          <div className="text-[10px] text-blue-700 font-bold mt-0.5">59.1% Total Outlay Funded</div>
        </div>

        {/* DBT Acknowledged % */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">DBT ACKNOWLEDGED</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-700 font-sans">
            {kpis?.dbtDisbursedPercent || 78.4}%
          </div>
          <div className="text-[10px] text-emerald-700 font-bold mt-0.5">₹6,602.8 Cr Settled</div>
        </div>

        {/* Pending % */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold">PENDING DISBURSAL</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-amber-800 font-sans">
            21.6%
          </div>
          <div className="text-[10px] text-amber-700 font-bold mt-0.5">₹1,817.7 Cr Under Scrutiny</div>
        </div>

        {/* Disputed Funds */}
        <div className="bg-white border border-slate-200 rounded p-3 shadow-xs col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold text-rose-700">DISPUTED FUNDS</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-800 font-sans">
            ₹240 <span className="text-xs font-normal text-slate-500">Cr</span>
          </div>
          <div className="text-[10px] text-rose-700 font-bold mt-0.5">Section 64/74 Court Escrow</div>
        </div>
      </div>

      {/* 3. Conditional Sub-view Rendering */}
      {currentTab === 'escrow-monitoring' ? (
        /* Escrow Overview Panel */
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">
                CALA Separate Escrow Bank Account Monitoring
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory compliance with Section 77(2) regarding mandatory deposits in separate dedicated interest-bearing accounts.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold font-mono">
              RBI / PFMS TREASURY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Escrow Requirement</span>
              <p className="text-slate-700 leading-relaxed">
                Requisitioning bodies must deposit 100% of estimated compensation plus solatium into the Collector Escrow before possession notice under Section 38.
              </p>
            </div>
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Audit Verification</span>
              <p className="text-slate-700 leading-relaxed">
                All 14 ongoing state projects in Gujarat have verified Bank of Baroda &amp; SBI designated treasury escrow accounts mapped via PFMS.
              </p>
            </div>
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Disputed Escrow Interest</span>
              <p className="text-slate-700 leading-relaxed">
                Disputed amounts referred under Section 64 earn statutory savings interest of 9% p.a. until tribunal pronouncement.
              </p>
            </div>
          </div>
        </div>
      ) : currentTab === 'dbt-status' ? (
        /* DBT Status Overview */
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">
                Aadhaar NPCI Direct Benefit Transfer (DBT) Settlement
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time electronic settlement into verified landowner bank accounts with 0% TDS under Section 96.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              NPCI MAPPER ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2">
              <h4 className="font-bold text-slate-900">Direct Benefit Transfer Directives:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>No cash disbursements or paper bearer cheques are permitted under NLAMS financial guidelines.</li>
                <li>PFMS Straight-Through Processing generates automated electronic receipts and SMS triggers to beneficiaries.</li>
                <li>Section 96 provides statutory exemption from Income Tax, capital gains tax, stamp duty, and registration charges.</li>
              </ul>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="font-bold text-slate-900">Reconciliation KPI:</h4>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between"><span>Transactions Processed:</span><strong className="text-slate-900">28,490 Credits</strong></div>
                <div className="flex justify-between"><span>Failed Transactions:</span><strong className="text-rose-700">142 (Aadhaar Mismatch)</strong></div>
                <div className="flex justify-between"><span>Re-KYC Rectified:</span><strong className="text-emerald-700">128 Completed</strong></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Financial Dashboard Sub-view with Exact Columns from Section 04 */
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
                Project Financial Ledger Matrix ({filteredProjects.length} Projects)
              </h3>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by project or state..."
                  className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#142642] text-white font-bold font-mono text-[10px] uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="p-3">Project</th>
                    <th className="p-3 text-right">Estimated Compensation</th>
                    <th className="p-3 text-right">Escrow Deposited</th>
                    <th className="p-3 text-right">Awarded</th>
                    <th className="p-3 text-right">Paid (DBT)</th>
                    <th className="p-3 text-right">Pending</th>
                    <th className="p-3">DBT Status</th>
                    <th className="p-3">Financial Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredProjects.map((proj) => {
                    const estComp = proj.financialSanctionCr || 1200;
                    const escrow = proj.escrowDepositedCr || 900;
                    const awarded = proj.awardedAmountCr || 700;
                    const paid = proj.disbursedCr || 500;
                    const pending = Math.max(0, awarded - paid);

                    return (
                      <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <div className="font-mono font-bold text-[#1B365D]">{proj.id}</div>
                          <div className="font-semibold text-slate-900 max-w-[180px] truncate" title={proj.name}>
                            {proj.name}
                          </div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                          ₹{estComp.toFixed(2)} Cr
                        </td>
                        <td className="p-3 text-right font-mono text-blue-900 whitespace-nowrap">
                          ₹{escrow.toFixed(2)} Cr
                        </td>
                        <td className="p-3 text-right font-mono text-slate-800 whitespace-nowrap">
                          ₹{awarded.toFixed(2)} Cr
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                          ₹{paid.toFixed(2)} Cr
                        </td>
                        <td className="p-3 text-right font-mono text-amber-800 whitespace-nowrap">
                          ₹{pending.toFixed(2)} Cr
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {proj.dbtStatus ? proj.dbtStatus.slice(0, 18) : 'Active DBT'}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                            {proj.financialStatus ? proj.financialStatus.slice(0, 20) : 'Funded'}
                          </span>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => openProjectIntelligence(proj.id)}
                            className="px-2.5 py-1 bg-[#1B365D] hover:bg-[#142642] text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-xs"
                          >
                            <span>Dossier</span>
                            <ArrowUpRight className="w-3 h-3 text-[#C5A059]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Exceptions Prioritized Table (Section 04) */}
          <div className="bg-white border-l-4 border-amber-500 rounded p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                  Financial Exceptions &amp; Escrow Deficit Alerts
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                Requires Apex Inter-Department Notice
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">PRJ-2026-GJ05 • GIDC Dholera Bypass Package 2</div>
                  <div className="text-[11px] text-amber-800 mt-0.5 font-medium">
                    Escrow deficit of ₹120.00 Cr for Section 23 Award disbursement. GIDC requested revised treasury allocation.
                  </div>
                </div>
                <button
                  onClick={() => openProjectIntelligence('PRJ-2026-GJ05')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[10px] font-bold transition-colors"
                >
                  Review
                </button>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">PRJ-2026-NH04 • NHAI PIU Ambala</div>
                  <div className="text-[11px] text-amber-800 mt-0.5 font-medium">
                    142 farmer bank accounts pending NPCI Aadhaar seeding. CALA Patiala organized village camp.
                  </div>
                </div>
                <button
                  onClick={() => openProjectIntelligence('PRJ-2026-NH04')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[10px] font-bold transition-colors"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
