import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Share2, 
  Sparkles, 
  SlidersHorizontal,
  Search,
  Filter,
  Check,
  Building,
  Layers,
  ShieldCheck
} from 'lucide-react';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';

export default function MisReportsPage() {
  const { 
    reports, 
    effectiveScope, 
    currentRoleConfig, 
    showToast,
    activeSubPage,
    setActiveSubPage 
  } = usePolicyMaker();

  const currentTab = activeSubPage || 'report-dashboard';
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom Dossier Form State
  const [builderMinistry, setBuilderMinistry] = useState('ALL');
  const [builderState, setBuilderState] = useState('ALL');
  const [builderYear, setBuilderYear] = useState('2026-27');
  const [builderFormat, setBuilderFormat] = useState('PDF');

  const handleDownloadReport = (reportTitle) => {
    showToast(`Downloading certified dossier: "${reportTitle}"...`);
  };

  const handleGenerateCustomDossier = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('Custom Parliamentary MIS Dossier generated successfully.');
    }, 1200);
  };

  const filteredReports = (reports || []).filter(r => {
    if (selectedCategory !== 'ALL' && r.category !== selectedCategory) return false;
    return true;
  });

  const tabs = [
    { id: 'report-dashboard', label: `Executive Reports (${(reports || []).length})` },
    { id: 'report-builder', label: 'Parliamentary Query Builder' },
    { id: 'report-archive', label: 'Certified Archives' }
  ];

  return (
    <div className="space-y-4">
      
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 08
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
            MIS &amp; Executive Intelligence Reports
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Parliamentary annual submissions, Cabinet Secretariat notes, and statutory compliance dossiers.
          </p>
        </div>

        {/* Tab Controls - Dedicated full-width horizontal bar */}
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

      {/* 2. Sub-page: REPORT DASHBOARD */}
      {currentTab === 'report-dashboard' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-bold text-slate-700 font-mono uppercase">
              Authoritative Dossier Vault
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 focus:outline-hidden font-medium"
              >
                <option value="ALL">All Categories</option>
                <option value="PARLIAMENT">Parliamentary Submissions</option>
                <option value="CABINET">Cabinet Notes</option>
                <option value="CAG">CAG & Statutory Audit</option>
                <option value="QUARTERLY">Quarterly Monitoring</option>
              </select>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white border border-slate-200 rounded p-4 shadow-xs hover:border-[#1B365D] transition-colors flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#1B365D]">{rep.id}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1B365D] border border-blue-200 text-[10px] font-mono font-bold">
                      {rep.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{rep.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{rep.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500 text-[11px]">
                    <span className="font-mono font-semibold text-slate-700">{rep.frequency || 'ANNUAL'}</span> • {rep.lastUpdated}
                  </div>

                  <button
                    onClick={() => handleDownloadReport(rep.title)}
                    className="px-3 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-800 font-bold rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Sub-page: REPORT BUILDER */}
      {currentTab === 'report-builder' && (
        <div className="bg-white border border-slate-200 rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1B365D]" />
                <span>Parliamentary Lok Sabha / Rajya Sabha Query Dossier Generator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate real-time certified reports matching starred/unstarred questions on land acquisition status, compensation outlays, and pending litigations.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#1B365D] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              PARLIAMENT PROTOCOL SECURED
            </span>
          </div>

          <form onSubmit={handleGenerateCustomDossier} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                  Target Ministry / Sector
                </label>
                <select
                  value={builderMinistry}
                  onChange={(e) => setBuilderMinistry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">All Ministries</option>
                  <option value="MoRTH">Ministry of Road Transport & Highways (NHAI)</option>
                  <option value="Railways">Ministry of Railways</option>
                  <option value="Power">Ministry of Power / Renewable Energy</option>
                  <option value="Heavy Industry">Ministry of Heavy Industries</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                  State / Jurisdiction Scope
                </label>
                <select
                  value={builderState}
                  onChange={(e) => setBuilderState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">All States (Pan-India)</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                  Financial Year
                </label>
                <select
                  value={builderYear}
                  onChange={(e) => setBuilderYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden"
                >
                  <option value="2026-27">FY 2026-27 (Current)</option>
                  <option value="2025-26">FY 2025-26</option>
                  <option value="2024-25">FY 2024-25</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                  Output Format & Security
                </label>
                <select
                  value={builderFormat}
                  onChange={(e) => setBuilderFormat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden"
                >
                  <option value="PDF">Certified PDF (Level-3 DSC)</option>
                  <option value="EXCEL">MS Excel (Raw Microdata)</option>
                  <option value="CSV">Open CSV Format</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">
                Include Mandatory Compliance Sections:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#1B365D]" />
                  <span>Section 25 Lapsing Risk Audit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#1B365D]" />
                  <span>PFMS Escrow & Direct Benefit Transfer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#1B365D]" />
                  <span>Third Schedule Civic Amenities Audit</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="px-5 py-2 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>{isGenerating ? 'Compiling Official Dossier...' : 'Generate Certified Parliamentary Dossier'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Sub-page: REPORT ARCHIVE */}
      {currentTab === 'report-archive' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                Certified Reports Vault & Digital Archive
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Permanent records stored with cryptographic SHA-256 hashes and timestamp verifications.
              </p>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-y border-slate-200">
                <tr>
                  <th className="p-3">Dossier ID</th>
                  <th className="p-3">Title & Classification</th>
                  <th className="p-3">Date Archived</th>
                  <th className="p-3">Certification</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {[
                  { id: 'MIS-2026-LOK-09', title: 'Lok Sabha Starred Question #214 — National Land Acquisition Status', date: '21 Sep 2026', cert: 'Level-3 DSC (Secretary, MoRD)' },
                  { id: 'MIS-2026-CAB-04', title: 'Cabinet Secretariat Monthly Summary on Infrastructure Delays', date: '01 Sep 2026', cert: 'Confidential / Level-3 DSC' },
                  { id: 'MIS-2026-CAG-01', title: 'CAG Compliance Audit on Section 77 Escrow Accounts', date: '15 Aug 2026', cert: 'Level-3 DSC (Principal Director)' },
                  { id: 'MIS-2026-ANN-01', title: 'Annual Statistical Handbook on RFCTLARR Act Implementation', date: '31 Mar 2026', cert: 'Public Release Verified' }
                ].map((arc, i) => (
                  <tr key={i} className="hover:bg-slate-50/80">
                    <td className="p-3 font-mono text-[#1B365D] font-bold">{arc.id}</td>
                    <td className="p-3 font-bold text-slate-900">{arc.title}</td>
                    <td className="p-3 text-slate-600 font-mono">{arc.date}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        {arc.cert}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDownloadReport(arc.title)}
                        className="text-xs font-bold text-[#1B365D] hover:underline cursor-pointer flex items-center justify-end gap-1 ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
