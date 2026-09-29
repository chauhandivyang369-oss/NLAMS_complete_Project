import React from 'react';
import { 
  X, 
  Building, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Coins, 
  ExternalLink, 
  Scale, 
  CheckCircle2, 
  AlertTriangle,
  FolderOpen,
  Calendar,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAppropriateGovernment } from '../../context/AppropriateGovernmentContext.jsx';
import StatutoryTimerBadge from '../common/StatutoryTimerBadge.jsx';

export default function ContextualActionDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerType,
    selectedProject,
    selectedParcel,
    selectedProposal,
    selectedSec11,
    selectedSec19,
    landBankRecords,
    auditLogs,
    jurisdiction,
    onSwitchWorkspace,
    setGazetteModalDoc
  } = useAppropriateGovernment();

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-slate-950/60 z-40 backdrop-blur-xs transition-opacity lg:hidden"
        title="Close Drawer"
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 max-w-full bg-white shadow-2xl border-l border-slate-300 flex flex-col text-slate-800 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
      <div className="p-3.5 bg-[#1B365D] text-white flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-[#C5A059]" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {drawerType === 'project' && 'STATUTORY PROJECT DOSSIER'}
              {drawerType === 'parcel' && 'CADASTRAL PARCEL & ULPIN'}
              {drawerType === 'proposal' && 'COLLECTOR PROPOSAL DOSSIER'}
              {drawerType === 'sec11' && 'SECTION 11 STATUTORY GATE'}
              {drawerType === 'sec19' && 'SECTION 19 STATUTORY GATE'}
              {drawerType === 'landbank' && 'SEC 101 STATE LAND BANK'}
              {drawerType === 'audit' && 'IMMUTABLE AUDIT TRAIL'}
            </h3>
            <p className="text-[10px] text-slate-300">Contextual Action &amp; Evidence Drawer</p>
          </div>
        </div>
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Body (Dynamic per drawerType) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* ================= PROJECT DOSSIER ================= */}
        {drawerType === 'project' && selectedProject && (
          <div className="space-y-3.5">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono text-slate-500">{selectedProject.id}</div>
              <div className="font-bold text-slate-900 text-sm leading-snug">{selectedProject.name}</div>
              <div className="text-[11px] text-slate-600 font-semibold">{selectedProject.executingAgency}</div>
            </div>

            {/* Statutory Stage & Timers */}
            <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Statutory Stage &amp; SLA Radar
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Current Stage:</span>
                <span className="font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px]">
                  {selectedProject.stageLabel}
                </span>
              </div>
              {selectedProject.statutoryTimers && (
                <StatutoryTimerBadge
                  daysRemaining={selectedProject.statutoryTimers.daysRemaining}
                  daysElapsed={299}
                  status={selectedProject.statutoryTimers.status}
                  stayExclusionDays={selectedProject.stayExclusionDays}
                  extensionDays={selectedProject.extensionDays}
                />
              )}
            </div>

            {/* Land Summary */}
            <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Land &amp; Spatial Schedule
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-500">Total Proposed</div>
                  <div className="font-bold font-mono text-slate-800 text-sm">{selectedProject.totalAreaHa} Ha</div>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-500">Acquired / Declared</div>
                  <div className="font-bold font-mono text-emerald-800 text-sm">{selectedProject.acquiredAreaHa} Ha</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-600">
                <strong>States/Districts:</strong> {selectedProject.states?.join(', ')} • {selectedProject.districts?.join(', ')}
              </div>
            </div>

            {/* Financial Overview */}
            <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Financial Escrow &amp; PFMS Status
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Required RB Deposit:</span>
                <span className="font-mono font-bold text-slate-900">₹{selectedProject.requiredDepositCr} Cr</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Deposited Amount:</span>
                <span className="font-mono font-bold text-emerald-700">₹{selectedProject.depositedAmountCr} Cr</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Verification Status:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  {selectedProject.depositVerificationStatus}
                </span>
              </div>
            </div>

            {/* Cross Workspace Deep Links */}
            <div className="p-3 bg-amber-50/60 rounded border border-amber-200 space-y-2">
              <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">
                Inter-Workspace Navigation
              </div>
              <div className="space-y-1.5">
                <button
                  onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
                  className="w-full text-left p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-medium cursor-pointer"
                >
                  <span>Open SIA &amp; IEG Workspace</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => onSwitchWorkspace && onSwitchWorkspace('rr-authority')}
                  className="w-full text-left p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-medium cursor-pointer"
                >
                  <span>Open R&amp;R Authority Workspace</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => onSwitchWorkspace && onSwitchWorkspace('larr-authority')}
                  className="w-full text-left p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-medium cursor-pointer"
                >
                  <span>Open LARR Authority Judicial Bench</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= PARCEL DOSSIER ================= */}
        {drawerType === 'parcel' && selectedParcel && (
          <div className="space-y-3.5">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block">
                ULPIN: {selectedParcel.ulpin}
              </div>
              <div className="font-bold text-slate-900 text-sm pt-1">
                Khasra No. {selectedParcel.khasraNo} • {selectedParcel.village}
              </div>
              <div className="text-[11px] text-slate-600">
                Tehsil: {selectedParcel.tehsil} • District: {selectedParcel.district}
              </div>
            </div>

            <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Landownership &amp; Title Verification
              </div>
              <div>
                <span className="text-slate-500">Primary Titleholder:</span>
                <div className="font-semibold text-slate-900">{selectedParcel.ownerName}</div>
              </div>
              {selectedParcel.coOwners?.length > 0 && (
                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-500">Co-Owners:</span> {selectedParcel.coOwners.join(', ')}
                </div>
              )}
              <div className="flex justify-between items-center text-[11px] pt-1 border-t">
                <span className="text-slate-600">Land Category:</span>
                <span className="font-medium text-slate-800">{selectedParcel.category}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Required Acquisition Area:</span>
                <span className="font-mono font-bold text-slate-900">{selectedParcel.requiredAreaHa} Ha</span>
              </div>
            </div>

            {/* Section 11(4) Transaction Freeze Bar */}
            <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Section 11(4) Transaction Freeze Status
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-300">
                  <Lock className="w-3.5 h-3.5 text-rose-600" />
                  TRANSACTION FROZEN
                </span>
                <span className="text-[10px] font-mono text-slate-500">SRO Registry Synced</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Statutory bar on sale, gift, mortgage or alienation active under Section 11(4) from publication date.
              </p>
            </div>
          </div>
        )}

        {/* ================= PROPOSAL DOSSIER ================= */}
        {drawerType === 'proposal' && selectedProposal && (
          <div className="space-y-3.5">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                {selectedProposal.proposalId}
              </div>
              <div className="font-bold text-slate-900 text-sm pt-1">{selectedProposal.projectName}</div>
              <div className="text-[11px] text-slate-600 font-semibold">{selectedProposal.requiringBody}</div>
            </div>

            <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Collector Scrutiny Status
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Assigned Collector:</span>
                <span className="font-semibold text-slate-900">{selectedProposal.assignedCollector}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Form-I Status:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  {selectedProposal.formIStatus}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Rule 4 Enquiry Report:</span>
                <span className="font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  {selectedProposal.rule4ReportStatus}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded border border-slate-200 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Rule 4 Preliminary Findings
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed italic bg-slate-50 p-2 rounded border border-slate-100">
                &ldquo;{selectedProposal.rule4Finding}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* ================= LAND BANK DOSSIER (STATE ONLY) ================= */}
        {drawerType === 'landbank' && (
          <div className="space-y-3.5">
            <div className="p-3 bg-purple-50 rounded border border-purple-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-purple-900 uppercase">
                SECTION 101 STATE LAND BANK PROTOCOL
              </div>
              <div className="font-bold text-slate-900 text-sm">
                Unutilized Acquired Land Monitoring (5-Year Rule)
              </div>
              <div className="text-[11px] text-slate-600">
                Land acquired for public purpose remaining unutilized for &gt;5 years.
              </div>
            </div>

            {landBankRecords.map(lb => (
              <div key={lb.id} className="p-3 bg-white rounded border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#1B365D]">{lb.ulpin}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-300">
                    5-YR EXPIRED
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Khasra {lb.khasraNo}, {lb.village} ({lb.district})</div>
                  <div className="text-[11px] text-slate-500">Original Owner: {lb.originalOwner}</div>
                  <div className="text-[11px] text-slate-500">Area: {lb.areaHa} Ha</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                  <div>
                    <span className="font-semibold text-slate-700">Reversion Status:</span> {lb.reversionStatus}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Current Custodian:</span> {lb.currentCustodian}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= AUDIT DOSSIER ================= */}
        {drawerType === 'audit' && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              Recent Statutory Events ({auditLogs.length})
            </div>
            {auditLogs.slice(0, 8).map(log => (
              <div key={log.id} className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-[#1B365D]">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <div className="text-slate-700">
                  <span className="font-semibold">{log.actor}</span> ({log.role})
                </div>
                {log.reason && <div className="text-slate-500 italic text-[10px]">{log.reason}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-300 flex justify-end">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-semibold rounded text-xs cursor-pointer"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </>
  );
}
