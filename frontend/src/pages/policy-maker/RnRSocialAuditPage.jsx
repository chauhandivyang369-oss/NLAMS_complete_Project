import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  HeartHandshake, 
  Home, 
  Building, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  FileText, 
  Eye, 
  ShieldCheck, 
  TrendingUp, 
  Droplets, 
  Lightbulb, 
  GraduationCap, 
  Layers, 
  Hospital, 
  Trees 
} from 'lucide-react';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';

export default function RnRSocialAuditPage() {
  const { 
    rnrData, 
    scopedProjects, 
    effectiveScope, 
    currentRoleConfig, 
    openProjectIntelligence,
    activeSubPage,
    setActiveSubPage,
    showToast
  } = usePolicyMaker();

  const currentTab = activeSubPage || 'rnr-dashboard';

  const tabs = [
    { id: 'rnr-dashboard', label: 'R&R Entitlement Overview' },
    { id: 'resettlement', label: 'Resettlement Colonies' },
    { id: 'infrastructure', label: 'Third Schedule Amenities (25 Mandates)' },
    { id: 'social-audit', label: 'Sec 44 Social Audit' }
  ];

  return (
    <div className="space-y-4">
      
      {/* 1. Institutional Apex Header */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 07
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${currentRoleConfig.badgeColor}`}>
              {currentRoleConfig.badgeText}
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SCOPE: {effectiveScope}
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            R&amp;R Oversight &amp; Social Audit Review
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Statutory tracking of Second Schedule entitlements, Third Schedule colony infrastructure, and Section 44 social audits.
          </p>
        </div>

        {/* Tab Switcher - Dedicated full-width horizontal bar */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubPage(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. 4 R&R Aggregate Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
            Total Affected Families
          </span>
          <div className="text-2xl font-bold text-slate-900 font-sans">
            {Number(rnrData?.totalAffectedFamilies || 32480).toLocaleString()}
          </div>
          <span className="text-[11px] text-purple-700 font-semibold block mt-1">
            {Number(rnrData?.displacedFamilies || 2480).toLocaleString()} Displaced from Habitation
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
            SC / ST Displaced Families
          </span>
          <div className="text-2xl font-bold text-emerald-800 font-sans">
            {Number(rnrData?.scStFamilies || 8420).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Protected under Section 41 & 42
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
            Approved R&R Scheme
          </span>
          <div className="text-2xl font-bold text-[#1B365D] font-sans">
            {rnrData?.approvedSchemes || 118} / {rnrData?.totalProjects || 128}
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Sanctioned under Section 31
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
            Resettlement Colonies
          </span>
          <div className="text-2xl font-bold text-blue-900 font-sans">
            {rnrData?.resettlementColonies || 42} Built
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            88% Amenities Commissioned
          </span>
        </div>
      </div>

      {/* 3. Sub-page: R&R ENTITLEMENT OVERVIEW */}
      {currentTab === 'rnr-dashboard' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#C5A059]" />
              <span>Second Schedule Statutory Entitlements Matrix</span>
            </h3>
            <span className="text-xs font-mono font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              RFCTLARR ACT 2013 SCHED II
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              {
                title: 'Provision of Housing Units',
                sub: 'Rural: 50 sq.m / Urban: 50 sq.m or ₹1.5 Lakhs (IAY/PMAY)',
                status: '89% Disbursed',
                color: 'text-emerald-700'
              },
              {
                title: 'Land for Land Allotment',
                sub: 'Irrigation projects: min 1 acre irrigated / 2.5 acres unirrigated',
                status: '76% Allotted',
                color: 'text-blue-700'
              },
              {
                title: 'One-Time Resettlement Allowance',
                sub: '₹50,000 per displaced family via PFMS DBT',
                status: '98% Completed',
                color: 'text-emerald-700'
              },
              {
                title: 'Subsistence Grant',
                sub: '₹3,000/month for 12 months (₹36,000 total)',
                status: '92% On Track',
                color: 'text-emerald-700'
              },
              {
                title: 'Cattle Shed / Petty Shop Grant',
                sub: '₹25,000 for artisans, small traders, and cattle owners',
                status: '84% Delivered',
                color: 'text-blue-700'
              },
              {
                title: 'Mandatory Employment / ₹5 Lakh Annuity',
                sub: '1 job per affected family or ₹5,00,000 one-time grant',
                status: '68% Claimed',
                color: 'text-amber-700'
              }
            ].map((ent, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{ent.title}</span>
                  <span className={`text-[10px] font-mono font-bold ${ent.color}`}>{ent.status}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">{ent.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Sub-page: RESETTLEMENT COLONIES */}
      {currentTab === 'resettlement' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <Home className="w-4 h-4 text-[#1B365D]" />
                <span>Statutory Resettlement Colonies Roster</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Model habitation clusters planned and developed under Section 31 & 32.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              42 Colonies Operational
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-y border-slate-200">
                <tr>
                  <th className="p-3">Colony Name & Location</th>
                  <th className="p-3">Project Link</th>
                  <th className="p-3">Plots / Homes Built</th>
                  <th className="p-3">Families Relocated</th>
                  <th className="p-3">Completion Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {[
                  { name: 'Sardar Patel Model Colony', loc: 'Sanand, Gujarat', proj: 'PRJ-2026-GJ05', homes: '450 / 450', fam: '412 Families', status: 'COMPLETED', rate: '100%' },
                  { name: 'Kisan Vikas Habitation', loc: 'Anand, Gujarat', proj: 'PRJ-2026-GJ05', homes: '320 / 350', fam: '280 Families', status: 'CIVIC WORK PENDING', rate: '91%' },
                  { name: 'Dholera Industrial Resettlement Zone', loc: 'Dholera, Gujarat', proj: 'PRJ-2026-GJ08', homes: '600 / 600', fam: '540 Families', status: 'COMPLETED', rate: '100%' },
                  { name: 'Narmada Green Hamlet', loc: 'Bharuch, Gujarat', proj: 'PRJ-2026-GJ12', homes: '280 / 300', fam: '210 Families', status: 'IN PROGRESS', rate: '82%' }
                ].map((col, i) => (
                  <tr key={i} className="hover:bg-slate-50/80">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{col.name}</div>
                      <div className="text-[10px] text-slate-500">{col.loc}</div>
                    </td>
                    <td className="p-3 font-mono text-[#1B365D] font-bold">{col.proj}</td>
                    <td className="p-3 font-bold text-slate-800">{col.homes}</td>
                    <td className="p-3 text-slate-600">{col.fam}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        col.rate === '100%' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {col.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => openProjectIntelligence(col.proj)}
                        className="text-xs font-bold text-[#1B365D] hover:underline cursor-pointer"
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Sub-page: THIRD SCHEDULE AMENITIES (25 MANDATES) */}
      {currentTab === 'infrastructure' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-[#1B365D]" />
                <span>Third Schedule Mandatory Civic Infrastructure (25 Items)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every resettlement area must mandatorily provide all 25 basic infrastructural facilities under RFCTLARR Act 2013 Third Schedule.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              22/25 Provisioned
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {[
              { id: '01', name: 'Roads with pucca drainage', icon: Droplets, status: '100% Commissioned' },
              { id: '02', name: 'Safe potable drinking water points', icon: Droplets, status: '100% Commissioned' },
              { id: '03', name: 'Electricity connection & street lighting', icon: Lightbulb, status: '98% Commissioned' },
              { id: '04', name: 'Primary school building', icon: GraduationCap, status: '100% Commissioned' },
              { id: '05', name: 'Primary Health Centre / Sub-centre', icon: Hospital, status: '94% Commissioned' },
              { id: '06', name: 'Community hall / Mandap', icon: Home, status: '90% Commissioned' },
              { id: '07', name: 'Panchayat Ghar / Administrative Office', icon: Building, status: '100% Commissioned' },
              { id: '08', name: 'Anganwadi centres for children', icon: Users, status: '100% Commissioned' },
              { id: '09', name: 'Playground and recreation park', icon: Trees, status: '85% Commissioned' },
              { id: '10', name: 'Pucca burial / cremation ground', icon: MapPin, status: '100% Commissioned' },
              { id: '11', name: 'Sanitation facilities & latrines', icon: Droplets, status: '96% Commissioned' },
              { id: '12', name: 'Transport facility / Bus stop', icon: Building, status: '88% Commissioned' }
            ].map((infra) => {
              const Icon = infra.icon;
              return (
                <div key={infra.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400 font-bold">#{infra.id}</span>
                    <Icon className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span className="font-medium text-slate-800">{infra.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {infra.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Sub-page: SECTION 44 SOCIAL AUDIT */}
      {currentTab === 'social-audit' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Section 44 Mandatory Social Audit of R&R Schemes</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Independent social impact review and public hearing reports required before formal handover.
              </p>
            </div>
            <button
              onClick={() => showToast('Order for Section 44 Annual Social Audit Dispatched to Gram Sabhas.')}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded cursor-pointer"
            >
              Order Social Audit Round
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                unit: 'Ahmedabad Phase-1 Corridor Resettlement Audit',
                agency: 'Institute of Economic Growth / TISS',
                findings: '94% of displaced families confirmed receipt of First Year Subsistence allowance. 6 families reported delayed house allotment.',
                date: 'Completed 12 Aug 2026',
                status: 'AUDIT PASSED'
              },
              {
                unit: 'Vadodara Semi-High Speed Alignment Audit',
                agency: 'Gujarat Institute of Development Research (GIDR)',
                findings: 'School building and PHC fully functional. Gram Sabha passed unanimous resolution of satisfaction.',
                date: 'Completed 28 Jul 2026',
                status: 'AUDIT PASSED'
              }
            ].map((sa, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{sa.unit}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] font-mono">
                    {sa.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong>Independent Auditor:</strong> {sa.agency} • <strong>Date:</strong> {sa.date}
                </div>
                <p className="text-xs text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                  {sa.findings}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
