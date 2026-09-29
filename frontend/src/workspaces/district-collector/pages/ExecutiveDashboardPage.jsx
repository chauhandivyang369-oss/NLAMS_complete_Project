import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Coins, 
  Users, 
  Layers, 
  Filter, 
  FileText, 
  ArrowUpRight, 
  ExternalLink,
  ShieldAlert,
  Search
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../services/compensationCalculator.js';

export default function ExecutiveDashboardPage() {
  const {
    activeDistrict,
    activeProject,
    projects,
    parcels,
    openParcelDrawer,
    openProjectDrawer,
    setActiveMenuId,
    setNoticeModalData,
    setIsNoticeModalOpen
  } = useDistrictCollector();

  const [talukaFilter, setTalukaFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering parcels
  const filteredParcels = parcels.filter(p => {
    const matchesTaluka = talukaFilter === 'ALL' || p.taluka === talukaFilter;
    const matchesStage = stageFilter === 'ALL' || p.statutoryStage === stageFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      p.khasraGat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.khatedarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ulpin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTaluka && matchesStage && matchesSearch;
  });

  const totalCompensationSum = parcels.reduce((sum, p) => sum + (p.totalCompensation || 0), 0);
  const totalDisbursedSum = parcels.reduce((sum, p) => sum + (p.disbursedAmount || 0), 0);
  const totalAreaSum = parcels.reduce((sum, p) => sum + (p.areaHa || 0), 0);

  return (
    <div className="p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans min-w-0">
      {/* Top Banner with District Collector Seal */}
      <div className="bg-white border-l-4 border-[#C5A059] p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              DISTRICT CALA APEX RADAR
            </span>
            <span className="text-xs text-slate-500 font-medium truncate">
              Statutory Jurisdiction: {activeDistrict?.collectorTitle}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 break-words">
            {activeDistrict?.name} Land Acquisition &amp; Multi-Corridor Matrix
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time cadastral monitoring, Section 25 lapsing clock compliance &amp; escrow disbursement status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <div className="bg-slate-50 p-2 sm:p-2.5 border border-slate-200 text-center min-w-[90px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">SLA COMPLIANCE</div>
            <div className="font-mono font-bold text-emerald-700 text-xs sm:text-sm">{activeDistrict?.slaComplianceRate}</div>
          </div>
          <div className="bg-slate-50 p-2 sm:p-2.5 border border-slate-200 text-center min-w-[90px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">TOTAL ACQUISITION</div>
            <div className="font-mono font-bold text-slate-900 text-xs sm:text-sm">{activeDistrict?.totalAcquisitionHa} Ha</div>
          </div>
          <div className="bg-slate-50 p-2 sm:p-2.5 border border-slate-200 text-center min-w-[90px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">DISBURSED (CR)</div>
            <div className="font-mono font-bold text-blue-900 text-xs sm:text-sm">₹{activeDistrict?.disbursedCrores} Cr</div>
          </div>
        </div>
      </div>

      {/* Section 25 Statutory Lapsing Alert Box (If any project in Warning/Critical) */}
      {activeProject && activeProject.daysRemainingSec25 < 180 && (
        <div className="bg-amber-50 border-l-4 border-amber-600 p-3.5 sm:p-4 shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-amber-100 border border-amber-300 text-amber-900 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-amber-950 text-xs flex flex-wrap items-center gap-2">
                <span>SECTION 25 STATUTORY COUNTDOWN: {activeProject.name}</span>
                <span className="bg-amber-600 text-white font-mono px-1.5 py-0.2 text-[10px] font-bold">
                  {activeProject.daysRemainingSec25} DAYS LEFT
                </span>
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Statutory Mandate: If the Section 23 Award is not passed within 12 months from the date of Section 19 declaration ({activeProject.sec19Date}), 
                the entire acquisition proceeding shall lapse by operation of law.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveMenuId('sec23-award-engine')}
            className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 cursor-pointer w-full sm:w-auto text-center"
          >
            Formulate Award Now
          </button>
        </div>
      )}

      {/* District KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-lg min-w-0">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">ACTIVE CORRIDORS</span>
            <Layers className="w-4 h-4 text-blue-600 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1.5 truncate">
            {projects.length} Projects
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center justify-between gap-1">
            <span className="truncate">Covering {activeProject?.villagesCount} Villages</span>
            <span className="font-bold text-blue-700 font-mono shrink-0">{activeProject?.talukasCovered?.length} Talukas</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-lg min-w-0">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">CADASTRAL PARCELS</span>
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1.5 truncate">
            {activeProject?.totalParcels} Parcels
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center justify-between gap-1">
            <span className="truncate">Area: {totalAreaSum.toFixed(2)} Ha</span>
            <span className="font-bold text-emerald-700 font-mono shrink-0">100% PostGIS Geocoded</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-lg min-w-0">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL KHATEDARS</span>
            <Users className="w-4 h-4 text-purple-600 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1.5 truncate">
            {activeProject?.totalKhatedars} Khatedars
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center justify-between gap-1">
            <span className="truncate">Direct Benefit Transfer</span>
            <span className="font-bold text-purple-700 font-mono shrink-0">PFMS / DBT Active</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-lg min-w-0">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">COMPENSATION POOL</span>
            <Coins className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-800 mt-1.5 truncate" title={formatIndianCurrency(totalCompensationSum)}>
            {formatIndianCurrency(totalCompensationSum)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center justify-between gap-1">
            <span className="truncate">Disbursed: {formatIndianCurrency(totalDisbursedSum)}</span>
            <span className="font-bold text-emerald-700 font-mono shrink-0">
              {totalCompensationSum > 0 ? Math.round((totalDisbursedSum / totalCompensationSum) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Cadastral Parcel Matrix Section */}
      <div className="bg-white border border-slate-200 shadow-xs">
        {/* Table Top Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#C5A059]" />
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
              District Cadastral Parcel Matrix ({activeProject?.code})
            </h2>
            <span className="text-xs bg-slate-200 text-slate-700 font-mono px-2 py-0.5 font-bold">
              {filteredParcels.length} Parcels Listed
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter Khasra / Khatedar / ULPIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-300 pl-8 pr-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#C5A059] w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>

            {/* Taluka Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Taluka:</span>
              <select
                value={talukaFilter}
                onChange={(e) => setTalukaFilter(e.target.value)}
                className="bg-white border border-slate-300 px-2 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="ALL">All Talukas</option>
                {activeProject?.talukasCovered?.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Stage:</span>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="bg-white border border-slate-300 px-2 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="ALL">All Stages</option>
                <option value="AWARD_DRAFTED">Award Drafted</option>
                <option value="POSSESSION_DELIVERED">Possession Delivered</option>
                <option value="SECTION_77_AUTHORITY_DEPOSIT">Sec 77 Deposit</option>
                <option value="NOTICE_SEC21_PUBLISHED">Sec 21 Notice</option>
              </select>
            </div>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="p-3">Khasra / Gat No.</th>
                <th className="p-3">Village &amp; Taluka</th>
                <th className="p-3">Primary Khatedar</th>
                <th className="p-3 text-right">Area (Ha)</th>
                <th className="p-3">Classification</th>
                <th className="p-3 text-right">Total Compensation</th>
                <th className="p-3">Statutory Stage</th>
                <th className="p-3">Disbursement</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    <div>{parcel.khasraGat}</div>
                    <div className="text-[10px] font-mono text-slate-400">{parcel.ulpin}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{parcel.village}</div>
                    <div className="text-[10px] text-slate-500">Tal: {parcel.taluka}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{parcel.khatedarName}</div>
                    <div className="text-[10px] text-slate-500">{parcel.mobileNumber}</div>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-700">
                    {parcel.areaHa}
                  </td>
                  <td className="p-3 text-slate-600">
                    {parcel.landClassification}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-800">
                    {formatIndianCurrency(parcel.totalCompensation)}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200">
                      {parcel.statutoryStage}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 ${
                        parcel.disbursementStatus === 'PAID_DBT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : parcel.disbursementStatus === 'DEPOSITED_IN_LARR_AUTHORITY'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {parcel.disbursementStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => openParcelDrawer(parcel.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
