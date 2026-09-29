import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Landmark, 
  MapPin, 
  Briefcase, 
  Users, 
  Scale, 
  Settings, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Compass,
  FileText,
  KeyRound,
  FileCheck,
  TrendingUp,
  Layers,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function RbacRoleDirectorySection({
  onLaunchWorkspace
}) {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'gov' | 'project' | 'social-rnr' | 'judicial-citizen'
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('requiring-body');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'matrix'

  // Official Master Workspaces under current NLAMS architecture
  const masterWorkspaces = [
    {
      id: 'requiring-body',
      pillarNum: 3,
      name: 'Requisitioning Body Workspace',
      shortTitle: 'Requiring Body',
      authority: 'Infrastructure Agency / Project Authority',
      category: 'project',
      actSection: 'Section 3(zb), Form-I Requisition, Escrow',
      icon: Briefcase,
      color: 'border-purple-600 bg-purple-50/40 text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      tag: 'Pillar 3 • Project Authority',
      dscLevel: 'Class-III DSC Token',
      description: 'Centralized workspace for infrastructure project authorities (NHAI, DFCCIL, Railways, State PWD, NTPC). Manages formal Form-I requisitions, GIS corridor alignment uploads, 100% compensation escrow maintenance, and joint physical possession takeover.',
      targetWorkspace: 'requiring-body',
      primaryRoles: [
        'CPM / Project Director',
        'Project Finance & Escrow Officer',
        'Cadastral GIS Alignment Lead'
      ],
      keyModules: [
        'Executive Dashboard & Metrics',
        'Master Requisition Hub',
        'Form-I Smart Wizard (6 Steps)',
        'GIS Spatial Canvas & Buffers',
        'Financial Escrow Ledger & PFMS',
        'Statutory Timeline Tracker',
        'Objections & Hearings Redressal',
        'R&R Oversight & Direct DBT',
        'PIA Delegation & RBAC Matrix',
        'Document & Gazette Vault'
      ],
      statutoryPowers: 'Statutory Form-I filing, GIS alignment freezing, escrow allocation, joint possession acceptance.'
    },
    {
      id: 'district-collector',
      pillarNum: 4,
      name: 'Master District Collector & CALA Workspace',
      shortTitle: 'District Collector',
      authority: 'District Collectorate & Competent Authority (CALA)',
      category: 'gov',
      actSection: 'Sections 11(1), 12, 15, 19, 21, 23, 26-30, 31, 38',
      icon: MapPin,
      color: 'border-amber-600 bg-amber-50/40 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      tag: 'Pillar 4 • Ground Adjudication & Award',
      dscLevel: 'Class-III DSC Token (e-Sign)',
      description: 'Ground-level statutory execution engine for District Magistrates, CALA, and Special Land Acquisition Officers (SLAO). Adjudicates Section 15 objections, verifies RoR land records, computes First Schedule compensation with mandatory 100% Solatium, and seals statutory awards under Section 23.',
      targetWorkspace: 'district-collector',
      primaryRoles: [
        'District Magistrate & Collector',
        'Competent Authority Land Acquisition (CALA)',
        'Special Land Acquisition Officer (SLAO)'
      ],
      keyModules: [
        'Collector Proposal Inboxes & Scrutiny',
        'Form-11 Compensation Engine',
        'Section 15 Hearing Dockets',
        '3D Cadastral Intersect & DGPS Survey',
        'Section 23 Award Sealing Engine',
        'Section 38 Physical Possession Tracker'
      ],
      statutoryPowers: 'Section 15 objection orders, statutory award sealing, summary possession (Sec 38), circle rate multiplication.'
    },
    {
      id: 'central-appropriate-gov',
      pillarNum: 1,
      name: 'Central Appropriate Government Workspace',
      shortTitle: 'Central Government',
      authority: 'Ministry of Rural Development (DoLR) & Central Ministries',
      category: 'gov',
      actSection: 'Section 3(e)(i), Section 8, Section 11(1), Section 19(1), Section 48',
      icon: Landmark,
      color: 'border-blue-600 bg-blue-50/40 text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      tag: 'Pillar 1 • Central Sanctioning Authority',
      dscLevel: 'Class-III Apex DSC Token',
      description: 'Apex national governance workspace for the Department of Land Resources (DoLR), MoRD, and Central Infrastructure Ministries. Authorizes Section 11 Preliminary and Section 19 Declarations for multi-state linear corridors and monitors national R&R implementation under Section 48.',
      targetWorkspace: 'central-appropriate-gov',
      primaryRoles: [
        'Central Ministry Nodal Officer',
        'Joint Secretary (Land Resources)',
        'National Monitoring Committee (NMC) Member'
      ],
      keyModules: [
        'National Land Radar & Pipeline',
        'Multi-State Project Sanctions',
        'The Gazette of India Dispatch',
        'NMC Statutory Review Dockets',
        'Statutory Lapsing Countdown Watch'
      ],
      statutoryPowers: 'Section 11/19 central gazette sanctions, inter-state corridor approval, National Monitoring Committee reviews.'
    },
    {
      id: 'state-appropriate-gov',
      pillarNum: 2,
      name: 'State Appropriate Government Workspace',
      shortTitle: 'State Government',
      authority: 'Revenue & Disaster Management Department (State)',
      category: 'gov',
      actSection: 'Section 3(e)(ii), Section 10 Exceptions, State Rules, Section 43/44',
      icon: Building2,
      color: 'border-emerald-600 bg-emerald-50/40 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      tag: 'Pillar 2 • State Statutory Authority',
      dscLevel: 'Class-III State DSC Token',
      description: 'State-level apex administrative portal for Principal Secretaries (Revenue) and State Revenue Secretariats. Manages Extraordinary State Gazette notifications, designates District Collector jurisdictions, and scrutinizes Section 10 multi-crop food security exemptions.',
      targetWorkspace: 'state-appropriate-gov',
      primaryRoles: [
        'Principal Secretary (Revenue)',
        'Secretary (Disaster Management & Relief)',
        'State Nodal Land Officer'
      ],
      keyModules: [
        'State Acquisition Pipeline & Inbox',
        'State Gazette Issuance Engine',
        'District Collector Delegation Matrix',
        'Section 10 Food Security Exceptions',
        'SLA Statutory Compliance Radar'
      ],
      statutoryPowers: 'State Gazette notification issue, Collector jurisdiction delegation, Section 10 food security sanctions.'
    },
    {
      id: 'sia-ieg',
      pillarNum: 6,
      name: 'Social Impact Assessment & IEG Workspace',
      shortTitle: 'SIA & IEG Evaluation',
      authority: 'Accredited SIA Institutional Units & Independent Expert Group',
      category: 'social-rnr',
      actSection: 'Sections 4, 5, 6 (SIA Study & Census) & Section 7 (IEG Appraisal)',
      icon: Compass,
      color: 'border-cyan-600 bg-cyan-50/40 text-cyan-900',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      tag: 'Pillar 6 • Social Impact & Appraisal',
      dscLevel: 'Class-II / Class-III DSC Token',
      description: 'Independent evaluation portal for Social Impact Assessment teams and multidisciplinary Independent Expert Groups. Manages mandatory household census, audio-visual public hearing logs, and prepares statutory Section 7 appraisal recommendations on public purpose.',
      targetWorkspace: 'sia-ieg',
      primaryRoles: [
        'IEG Chairperson / Lead Reviewer',
        'Independent Expert Group Member',
        'SIA Study Director / Lead Investigator'
      ],
      keyModules: [
        'Baseline Socio-Economic Census',
        'Video-Recorded Public Hearing Logs',
        'Social Impact Management Plan (SIMP)',
        'Section 7 Independent Appraisal Engine',
        'Public Purpose Evaluation Reports'
      ],
      statutoryPowers: 'Section 7 independent appraisal recommendations, public purpose certification, displacement minimization scrutiny.'
    },
    {
      id: 'rr-authority',
      pillarNum: 7,
      name: 'Rehabilitation & Resettlement Authority Workspace',
      shortTitle: 'R&R Authority',
      authority: 'Directorate of Rehabilitation & Resettlement',
      category: 'social-rnr',
      actSection: 'Sections 31, 43, 44, 45, Second & Third Schedules',
      icon: Award,
      color: 'border-indigo-600 bg-indigo-50/40 text-indigo-900',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      tag: 'Pillar 7 • R&R Oversight & Passbook',
      dscLevel: 'Class-III DSC Token',
      description: 'Specialized oversight workspace for the Commissioner of R&R and Administrator for R&R. Formulates Section 31 R&R schemes, tracks delivery of 25 mandatory civic infrastructure amenities in resettlement colonies, and audits direct PFMS DBT subsistence grants.',
      targetWorkspace: 'rr-authority',
      primaryRoles: [
        'Commissioner of Rehabilitation & Resettlement',
        'Administrator for R&R (Sec 43)',
        'R&R Project Coordinator'
      ],
      keyModules: [
        'Baseline Census Family Registry',
        'Resettlement Colony Amenity Tracker (25 Amenities)',
        'Second Schedule Entitlements Calculator',
        'Subsistence Grant DBT Ledger (₹3,000/mo)',
        'Digital Citizen R&R Passbook Validation'
      ],
      statutoryPowers: 'Section 45 scheme sanction, resettlement colony amenity sign-off, DBT passbook authorization.'
    },
    {
      id: 'larr-authority',
      pillarNum: 8,
      name: 'LARR Authority (Judicial Tribunal) Workspace',
      shortTitle: 'LARR Tribunal',
      authority: 'Land Acquisition, Rehabilitation & Resettlement Authority',
      category: 'judicial-citizen',
      actSection: 'Sections 51 to 74 (LARR Authority & Adjudication)',
      icon: Scale,
      color: 'border-rose-600 bg-rose-50/40 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      tag: 'Pillar 8 • Statutory Judicial Tribunal',
      dscLevel: 'Class-III Judicial Token',
      description: 'Statutory quasi-judicial tribunal established under Section 51 with District Judge rank presiding officers. Adjudicates Section 64 reference petitions on compensation disputes, title apportionments, and decrees 9% to 15% penal interest against defaulting bodies.',
      targetWorkspace: 'larr-authority',
      primaryRoles: [
        'Presiding Officer (District Judge Rank)',
        'Tribunal Registrar / Docket Clerk',
        'Judicial Reader / Case Scrutinizer'
      ],
      keyModules: [
        'Section 64 Reference Case Dockets',
        'Digital Daily Cause List Publication',
        'Digital Summons & Gazette Notices',
        'Section 69 Enhancement Decree Engine',
        'Penal Interest & Recovery Warrant Registry'
      ],
      statutoryPowers: 'Statutory case decrees, compensation enhancement orders (Sec 69), 9-15% interest execution, revenue recovery certificates.'
    },
    {
      id: 'policy-maker',
      pillarNum: 5,
      name: 'Policy Maker & Executive Analytics Workspace',
      shortTitle: 'Policy Maker & Analytics',
      authority: 'National Monitoring Committee & Apex Infrastructure Wing',
      category: 'project',
      actSection: 'Section 48, National Linear Infrastructure Policy',
      icon: TrendingUp,
      color: 'border-violet-600 bg-violet-50/40 text-violet-900',
      badgeColor: 'bg-violet-100 text-violet-900 border-violet-300',
      tag: 'Pillar 5 • Strategic Oversight',
      dscLevel: 'Class-III DSC Token',
      description: 'High-level macro dashboard for Cabinet Secretariat, Niti Aayog, and National Monitoring Committee members. Provides predictive AI analytics on statutory lapsing risks, inter-state corridor escrow balances, and inter-ministerial video conference rooms.',
      targetWorkspace: 'policy-maker',
      primaryRoles: [
        'Finance Director & Apex Advisor',
        'Cabinet Secretariat Infrastructure Reviewer',
        'National Policy Advisor'
      ],
      keyModules: [
        'National Acquisition Radar & Heatmap',
        'Statutory Lapsing Predictive Watch',
        'Multi-Project Escrow Treasury View',
        'Inter-Ministerial Conclave Video Hub',
        'Macro Executive Policy Analytics'
      ],
      statutoryPowers: 'Statutory lapsing intervention, escrow release reviews, national policy advisory recommendations.'
    },
    {
      id: 'citizen',
      pillarNum: 9,
      name: 'Citizen & Landowner Transparency Portal',
      shortTitle: 'Citizen & Landowner',
      authority: 'Recorded Khatedars & Project Affected Families',
      category: 'judicial-citizen',
      actSection: 'Sections 15, 21, 26-30, 31, 38 & Second Schedule',
      icon: Users,
      color: 'border-teal-600 bg-teal-50/40 text-teal-900',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      tag: 'Pillar 9 • Public Transparency & Redressal',
      dscLevel: 'Citizen e-KYC / OTP / Password',
      description: 'Public-facing transparency and empowerment portal for landowners, tenant farmers, and affected citizens. Allows tracking land acquisition status using 14-digit ULPIN, calculating statutory compensation (Market Value + 100% Solatium), and filing Section 15 objections online.',
      targetWorkspace: 'citizen',
      primaryRoles: [
        'Recorded Landowner / Khatedar',
        'Tenant Farmer / Livelihood Affected Person',
        'Authorized Claimant / Nominee'
      ],
      keyModules: [
        'Track My Land via 14-Digit ULPIN',
        'Statutory Compensation Explainer Calculator',
        'Citizen Digital R&R Passbook',
        'Online Section 15 Objection Filing',
        'Public e-Gazette Vault Search'
      ],
      statutoryPowers: 'Section 15 objection lodging, compensation calculation audit, direct bank transfer verification.'
    }
  ];

  // RBAC Permission Matrix Rows
  const rbacMatrix = [
    {
      action: 'Form-I Requisition Submission',
      section: 'Section 3(zb)',
      requiringBody: 'Full Submit',
      collector: 'Scrutinize',
      centralGov: 'Review',
      stateGov: 'Review',
      siaIeg: 'No Access',
      rrAuth: 'View Only',
      tribunal: 'No Access',
      citizen: 'No Access'
    },
    {
      action: 'Cadastral GIS Upload & Freezing',
      section: 'NIC DILRMP Sync',
      requiringBody: 'Upload/Freeze',
      collector: 'DGPS Verify',
      centralGov: 'View GIS',
      stateGov: 'View GIS',
      siaIeg: 'Survey Read',
      rrAuth: 'Spatial Overlay',
      tribunal: 'View GIS',
      citizen: 'Public View'
    },
    {
      action: 'SIA Study & Public Hearing Logs',
      section: 'Section 4, 5, 6',
      requiringBody: 'Cooperate',
      collector: 'Facilitate',
      centralGov: 'Audit Log',
      stateGov: 'Mandate',
      siaIeg: 'Execute/Seal',
      rrAuth: 'Census Input',
      tribunal: 'Reference',
      citizen: 'Participate'
    },
    {
      action: 'Section 7 Independent Appraisal',
      section: 'Section 7(1)-(5)',
      requiringBody: 'No Access',
      collector: 'Receive',
      centralGov: 'Approve',
      stateGov: 'Approve',
      siaIeg: 'Appraise/Sign',
      rrAuth: 'View',
      tribunal: 'Reference',
      citizen: 'Read Summary'
    },
    {
      action: 'Section 11 Preliminary Notification',
      section: 'Section 11(1)',
      requiringBody: 'Track',
      collector: 'Draft/Publish',
      centralGov: 'Sanction',
      stateGov: 'Sanction',
      siaIeg: 'No Access',
      rrAuth: 'No Access',
      tribunal: 'No Access',
      citizen: 'Receive Notice'
    },
    {
      action: 'Section 15 Objection Adjudication',
      section: 'Section 15(1)-(3)',
      requiringBody: 'Hearing Party',
      collector: 'Hear & Seal',
      centralGov: 'Report Read',
      stateGov: 'Report Read',
      siaIeg: 'No Access',
      rrAuth: 'No Access',
      tribunal: 'Sec 64 Appeal',
      citizen: 'File Objection'
    },
    {
      action: 'Section 19 Declaration Publication',
      section: 'Section 19(1)',
      requiringBody: 'Escrow Lock',
      collector: 'Draft Gazette',
      centralGov: 'Central Gazette',
      stateGov: 'State Gazette',
      siaIeg: 'No Access',
      rrAuth: 'Approve Scheme',
      tribunal: 'No Access',
      citizen: 'Public Notice'
    },
    {
      action: 'Section 23 Award & Solatium Sealing',
      section: 'Sec 23, 26-30',
      requiringBody: 'Fund Escrow',
      collector: 'Compute & Seal',
      centralGov: 'PFMS Monitor',
      stateGov: 'Treasury Audit',
      siaIeg: 'No Access',
      rrAuth: 'Disburse DBT',
      tribunal: 'Enhance (Sec 69)',
      citizen: 'Receive DBT'
    },
    {
      action: 'Section 38 Physical Possession Taking',
      section: 'Section 38(1)-(2)',
      requiringBody: 'Takeover',
      collector: 'Execute/Seal',
      centralGov: 'Track',
      stateGov: 'Track',
      siaIeg: 'No Access',
      rrAuth: 'R&R Clear',
      tribunal: 'Stay/Decree',
      citizen: 'Surrender/Appeal'
    }
  ];

  const filteredWorkspaces = activeCategory === 'all'
    ? masterWorkspaces
    : masterWorkspaces.filter(ws => ws.category === activeCategory);

  const selectedWorkspace = masterWorkspaces.find(ws => ws.id === activeWorkspaceId) || masterWorkspaces[0];

  return (
    <section id="rbac-directory" className="py-12 lg:py-16 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>NLAMS Master Architecture • Unified Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] font-serif mt-1">
            National Master Workspaces &amp; RBAC Access Matrix
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Statutory governance under the RFCTLARR Act 2013 is organized into dedicated institutional Master Workspaces, each secured with multi-factor authentication, Class-III Digital Signature Certificates (DSC), and granular RBAC authorization rules.
          </p>

          {/* View Mode Toggle: Cards vs RBAC Matrix */}
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-300 rounded-xl shadow-xs mt-5">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#1B365D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Master Workspaces Explorer
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#1B365D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Statutory RBAC Permission Matrix
            </button>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <>
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#1B365D] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Master Workspaces (9)
              </button>
              <button
                onClick={() => setActiveCategory('gov')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'gov'
                    ? 'bg-[#1B365D] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Government &amp; CALA (Central, State, District)
              </button>
              <button
                onClick={() => setActiveCategory('project')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'project'
                    ? 'bg-[#1B365D] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Project Authority &amp; Policy Maker
              </button>
              <button
                onClick={() => setActiveCategory('social-rnr')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'social-rnr'
                    ? 'bg-[#1B365D] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Social Impact &amp; R&amp;R Authority
              </button>
              <button
                onClick={() => setActiveCategory('judicial-citizen')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'judicial-citizen'
                    ? 'bg-[#1B365D] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Judicial Tribunal &amp; Citizen Portal
              </button>
            </div>

            {/* Workspaces Horizontal Picker Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 mb-6">
              {masterWorkspaces.map((ws) => {
                const isSelected = activeWorkspaceId === ws.id;
                const Icon = ws.icon;
                return (
                  <button
                    key={ws.id}
                    onClick={() => setActiveWorkspaceId(ws.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1B365D] text-white border-[#C5A059] shadow-md ring-2 ring-[#C5A059]/40'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/10 text-amber-300' : 'bg-slate-100 text-[#1B365D]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-black/30 text-amber-300' : 'bg-slate-100 text-slate-500'
                      }`}>
                        Pillar {ws.pillarNum}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-[11px] font-bold leading-tight line-clamp-2">
                        {ws.shortTitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Selected Workspace Detail Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${selectedWorkspace.badgeColor}`}>
                      {selectedWorkspace.tag}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-semibold text-slate-700 font-mono">
                      Security: {selectedWorkspace.dscLevel}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1B365D] font-serif">
                    {selectedWorkspace.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
                    {selectedWorkspace.description}
                  </p>

                  <div className="text-xs font-medium text-slate-500 flex flex-wrap items-center gap-4 pt-1">
                    <span><strong>Statutory Authority:</strong> {selectedWorkspace.authority}</span>
                    <span><strong>Legal Mandate:</strong> <span className="font-mono text-[#1B365D]">{selectedWorkspace.actSection}</span></span>
                  </div>
                </div>

                {/* Direct Action Button to Launch Workspace */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
                  <button
                    onClick={() => onLaunchWorkspace(selectedWorkspace.targetWorkspace)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1B365D] hover:bg-[#132742] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md hover:shadow-lg transition-all border border-[#C5A059]"
                  >
                    <span>Launch {selectedWorkspace.shortTitle}</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono text-center">
                    Authorized RBAC Session Token
                  </span>
                </div>
              </div>

              {/* 2-Column Specs: Key Roles & Authorized Modules */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                
                {/* Left: Authorized Roles & Statutory Powers */}
                <div className="md:col-span-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider font-serif mb-2.5 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Primary Authorized Designations</span>
                    </h4>
                    <div className="space-y-1.5">
                      {selectedWorkspace.primaryRoles.map((roleName, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{roleName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                    <span className="font-bold block mb-1">Statutory Delegated Authority:</span>
                    <p className="text-[11px] leading-relaxed text-amber-900/90">
                      {selectedWorkspace.statutoryPowers}
                    </p>
                  </div>
                </div>

                {/* Right: Key Modules & Sub-systems */}
                <div className="md:col-span-7">
                  <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider font-serif mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Active System Modules &amp; Governance Tools</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedWorkspace.keyModules.map((modName, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{modName}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : (
          /* RBAC Permission Matrix View */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="p-4 bg-[#1B365D] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#C5A059]">
              <div>
                <h3 className="text-base font-bold font-serif uppercase tracking-tight">
                  Statutory Role-Based Access Control (RBAC) Matrix
                </h3>
                <p className="text-[11px] text-slate-300">
                  Strict legal separation of powers enforced across all 8 Master Workspaces under RFCTLARR Act 2013
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-black/20 px-3 py-1 rounded border border-white/10 shrink-0 self-start sm:self-auto">
                Level-3 DSC Signing Enforced
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3.5 font-bold">Statutory Action / Lifecycle Milestone</th>
                    <th className="py-3 px-2 text-center text-purple-900 bg-purple-50/60">Requiring Body</th>
                    <th className="py-3 px-2 text-center text-amber-900 bg-amber-50/60">Dist. Collector</th>
                    <th className="py-3 px-2 text-center text-blue-900 bg-blue-50/60">Central Govt</th>
                    <th className="py-3 px-2 text-center text-emerald-900 bg-emerald-50/60">State Govt</th>
                    <th className="py-3 px-2 text-center text-cyan-900 bg-cyan-50/60">SIA / IEG</th>
                    <th className="py-3 px-2 text-center text-indigo-900 bg-indigo-50/60">R&amp;R Authority</th>
                    <th className="py-3 px-2 text-center text-rose-900 bg-rose-50/60">LARR Tribunal</th>
                    <th className="py-3 px-2 text-center text-teal-900 bg-teal-50/60">Citizen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rbacMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3.5 font-medium text-slate-900">
                        <div className="font-bold">{row.action}</div>
                        <div className="text-[10px] font-mono text-slate-500">{row.section}</div>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.requiringBody.includes('Full') || row.requiringBody.includes('Freeze')
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.requiringBody}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.collector.includes('Seal') || row.collector.includes('Execute')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.collector}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.centralGov.includes('Sanction') || row.centralGov.includes('Approve') || row.centralGov.includes('Gazette')
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.centralGov}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.stateGov.includes('Sanction') || row.stateGov.includes('Approve') || row.stateGov.includes('Gazette')
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.stateGov}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.siaIeg.includes('Seal') || row.siaIeg.includes('Sign')
                            ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.siaIeg}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.rrAuth.includes('DBT') || row.rrAuth.includes('Approve')
                            ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.rrAuth}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.tribunal.includes('Decree') || row.tribunal.includes('Enhance') || row.tribunal.includes('Appeal')
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.tribunal}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          row.citizen.includes('File') || row.citizen.includes('Receive')
                            ? 'bg-teal-100 text-teal-900 border border-teal-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.citizen}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-slate-500">
                Audit Trail: Every approval is logged in immutable SHA-256 audit ledger.
              </span>
              <button
                onClick={() => setViewMode('cards')}
                className="text-xs font-bold text-[#1B365D] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>← Back to Master Workspaces Explorer</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
