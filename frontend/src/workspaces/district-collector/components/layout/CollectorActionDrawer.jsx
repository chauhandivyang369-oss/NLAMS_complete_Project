import React from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Phone, 
  Coins, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  Scale
} from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../../services/compensationCalculator.js';

export default function CollectorActionDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerType,
    selectedParcel,
    activeProject,
    auditLogs
  } = useDistrictCollector();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col font-sans">
          {/* Drawer Header */}
          <div className="bg-[#142642] text-white p-4 border-b border-[#C5A059] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C5A059]" />
              <h2 className="text-sm font-bold tracking-wide uppercase">
                {drawerType === 'parcel' && 'Cadastral Parcel Dossier'}
                {drawerType === 'project' && 'Infrastructure Corridor Dossier'}
                {drawerType === 'audit' && 'Statutory Audit Record'}
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-700 bg-slate-50">
            {/* PARCEL VIEW */}
            {drawerType === 'parcel' && selectedParcel && (
              <div className="space-y-4">
                {/* Identification Card */}
                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-1.5 py-0.5 font-bold">
                      {selectedParcel.ulpin}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {selectedParcel.statutoryStage}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{selectedParcel.khasraGat}</h3>
                    <div className="text-slate-500 text-[11px]">
                      Village: {selectedParcel.village} • Taluka: {selectedParcel.taluka}
                    </div>
                  </div>
                </div>

                {/* Khatedar Details */}
                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    PRIMARY KHATEDAR &amp; CO-SHARERS
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-800">{selectedParcel.khatedarName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedParcel.mobileNumber}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <span className="font-semibold">Classification:</span> {selectedParcel.landClassification}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <span className="font-semibold">Acquired Area:</span> {selectedParcel.areaHa} Hectares
                  </div>
                </div>

                {/* Section 26-30 Compensation Breakdown */}
                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>STATUTORY COMPENSATION BREAKDOWN</span>
                  </div>

                  <div className="divide-y divide-slate-100 text-[11px]">
                    <div className="py-1.5 flex justify-between">
                      <span className="text-slate-500">Market Value Adopted (Sec 26(1)):</span>
                      <span className="font-mono font-semibold">{formatIndianCurrency(selectedParcel.adoptedMarketRate)}/Ha</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-slate-500">Rural Multiplier Factor (Sec 26(2)):</span>
                      <span className="font-mono font-semibold">{selectedParcel.ruralFactor}x</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-slate-500">Multiplied Land Value:</span>
                      <span className="font-mono font-semibold">{formatIndianCurrency(selectedParcel.multipliedMarketValue)}</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-slate-500">Attached Assets Value (Sec 29):</span>
                      <span className="font-mono font-semibold">{formatIndianCurrency(selectedParcel.assetsValue)}</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-slate-500">100% Solatium (Sec 30(1)):</span>
                      <span className="font-mono font-semibold">{formatIndianCurrency(selectedParcel.solatium)}</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-slate-500">12% Addl Amount (Sec 30(3)):</span>
                      <span className="font-mono font-semibold">{formatIndianCurrency(selectedParcel.interest12Pct)}</span>
                    </div>
                    <div className="py-2 flex justify-between bg-slate-100 px-2 font-bold text-slate-900">
                      <span>Total Compensation:</span>
                      <span className="text-emerald-700 font-mono text-xs">
                        {formatIndianCurrency(selectedParcel.totalCompensation)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Statutory Status Checklist */}
                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    STATUTORY PROGRESSION
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Sec 11(4) Mutation Freeze</span>
                    <span className="font-bold text-emerald-600 font-mono">{selectedParcel.mutationStatus}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Sec 21 Claim Status</span>
                    <span className="font-bold font-mono">
                      {selectedParcel.sec21ClaimFiled ? 'FILED & VERIFIED' : 'PENDING NOTICE'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Sec 38 Possession Status</span>
                    <span className="font-bold font-mono text-blue-700">{selectedParcel.possessionStatus}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Disbursement Status</span>
                    <span className="font-bold font-mono text-amber-700">{selectedParcel.disbursementStatus}</span>
                  </div>
                </div>
              </div>
            )}

            {/* PROJECT VIEW */}
            {drawerType === 'project' && activeProject && (
              <div className="space-y-4">
                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-2">
                  <span className="text-[10px] font-mono bg-[#142642] text-[#C5A059] px-2 py-0.5 font-bold">
                    {activeProject.code}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{activeProject.name}</h3>
                  <div className="text-slate-500 text-[11px]">
                    Requisitioning Body: <span className="font-semibold text-slate-700">{activeProject.requiringBody}</span>
                  </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    STATUTORY TIMELINES &amp; DEADLINES
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Sec 11 Publication:</span>
                      <span className="font-mono font-semibold">{activeProject.sec11Date}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Sec 19 Declaration:</span>
                      <span className="font-mono font-semibold">{activeProject.sec19Date || 'Pending'}</span>
                    </div>
                    <div className="flex justify-between py-1 bg-amber-50 px-2 font-bold text-amber-900">
                      <span>Sec 25 Award Deadline:</span>
                      <span className="font-mono">{activeProject.sec25AwardDeadline}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ASSIGNED REVENUE OFFICIALS
                  </div>
                  <div className="text-[11px] font-semibold text-slate-800">
                    Lead CALA: {activeProject.leadOfficer}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Talukas Covered: {activeProject.talukasCovered?.join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Total Affected Villages: {activeProject.villagesCount} Villages
                  </div>
                </div>
              </div>
            )}

            {/* AUDIT VIEW */}
            {drawerType === 'audit' && (
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  STATUTORY REVENUE AUDIT LOGS (TAMPER-EVIDENT)
                </div>
                {auditLogs.map((log) => (
                  <div key={log.id} className="bg-white p-3 border border-slate-200 shadow-xs space-y-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900 font-mono">{log.sectionRef}</span>
                      <span className="text-slate-400 font-mono text-[9px]">{log.timestamp}</span>
                    </div>
                    <div className="font-bold text-slate-900">{log.action}</div>
                    <div className="text-slate-600">{log.details}</div>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex justify-between">
                      <span>By: {log.officer}</span>
                      <span className="font-mono text-[9px] text-emerald-600">DSC Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
