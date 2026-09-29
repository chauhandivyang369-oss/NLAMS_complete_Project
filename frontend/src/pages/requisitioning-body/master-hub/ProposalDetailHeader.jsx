import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  History, 
  Edit3, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  UserCheck, 
  FileCheck2,
  Layers,
  IndianRupee,
  Users,
  FolderLock,
  GitBranch
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function ProposalDetailHeader({ 
  proposalId = 'NLAMS-RB-2026-00124', 
  activeTab, 
  setActiveTab, 
  onBack 
}) {
  const { showToast } = useWorkspace();

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: Layers, badge: null },
    { id: 'cadastre', label: 'LAND CADASTRE', icon: MapPin, badge: '324.5 Ha' },
    { id: 'financial', label: 'FINANCIAL & ESCROW', icon: IndianRupee, badge: '₹186.4 Cr' },
    { id: 'rnr', label: 'R&R OVERVIEW', icon: Users, badge: '8,412' },
    { id: 'documents', label: 'DOCUMENTS & GAZETTE', icon: FolderLock, badge: '42' },
    { id: 'workflow', label: 'WORKFLOW & APPROVALS', icon: GitBranch, badge: null }
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      
      {/* Top Meta Bar */}
      <div className="px-5 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 font-medium text-slate-500">
          <button 
            onClick={onBack}
            className="hover:text-blue-700 flex items-center gap-1 font-semibold text-slate-700"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Master Requisition Hub</span>
          </button>
          <span>/</span>
          <span>Proposal</span>
          <span>/</span>
          <span className="font-mono font-bold text-slate-800">{proposalId}</span>
          <span>/</span>
          <span className="font-bold text-blue-700 uppercase">
            {tabs.find(t => t.id === activeTab)?.label || 'OVERVIEW'}
          </span>
        </div>

        {/* Right Compliance Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>GIGW &amp; RFCTLARR v2.4 Compliant</span>
          </span>
          <span className="bg-slate-200 text-slate-700 font-mono px-2 py-0.5 rounded font-medium">
            GEO-HASH: IN-GJ-AHM-04A
          </span>
          <span className="bg-slate-200 text-slate-700 font-mono px-2 py-0.5 rounded font-medium">
            NIC MeitY Sync: ACK-77291
          </span>
        </div>
      </div>

      {/* Main Proposal Header Info */}
      <div className="p-5 space-y-4">
        
        {/* Row 1: ID, Badges and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xl font-bold font-mono text-slate-900 tracking-tight">
                {proposalId}
              </span>
              
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>IN PROGRESS</span>
              </span>

              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-700" />
                <span>SLA: 42 DAYS REMAINING</span>
              </span>

              <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded">
                GUJARAT (4 DISTRICTS)
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              National Highway Corridor Expansion — Section IV (NH-48 Extn)
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={onBack}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>&lt; Back to Hub</span>
            </button>

            <button 
              onClick={() => showToast('Exporting official proposal dossier (PDF)...')}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export PDF</span>
            </button>

            <button 
              onClick={() => showToast('Displaying cryptographic sovereign audit log...')}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <History className="w-3.5 h-3.5 text-slate-600" />
              <span>View Audit</span>
            </button>

            <button 
              onClick={() => showToast('Opening Form-I proposal editor')}
              className="bg-[#0b1b36] hover:bg-[#182d52] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Draft</span>
            </button>
          </div>

        </div>

        {/* Row 2: 4-Column Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          
          {/* Col 1: Requisitioning Body */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-md p-2.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>REQUISITIONING BODY</span>
            </div>
            <div className="font-bold text-slate-900 mt-1">
              NHAI / Project Division
            </div>
            <div className="text-[11px] text-slate-500">
              Zonal Unit: Western Corridor IV
            </div>
          </div>

          {/* Col 2: Submission Date */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-md p-2.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>SUBMISSION DATE</span>
            </div>
            <div className="font-bold text-slate-900 mt-1">
              04 Jun 2026
            </div>
            <div className="text-[11px] text-slate-500">
              Validated via NIC e-Gov
            </div>
          </div>

          {/* Col 3: Current Authority */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-md p-2.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-slate-400" />
              <span>CURRENT AUTHORITY</span>
            </div>
            <div className="font-bold text-slate-900 mt-1">
              Collectorate &amp; SLAO
            </div>
            <div className="text-[11px] text-slate-500">
              Joint CALA Bench (Mehsana)
            </div>
          </div>

          {/* Col 4: Last Audit Sync */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-md p-2.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <FileCheck2 className="w-3 h-3 text-slate-400" />
              <span>LAST AUDIT SYNC</span>
            </div>
            <div className="font-bold text-slate-900 mt-1">
              14 Sep 2026, 14:32 IST
            </div>
            <div className="text-[11px] text-slate-500">
              Ledger Block #881290
            </div>
          </div>

        </div>

      </div>

      {/* Multi-Tier Tab Navigation Strip */}
      <div className="px-5 border-t border-slate-200 bg-white overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-bold tracking-wide uppercase border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#0b1b36] text-[#0b1b36] bg-slate-50/60'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0b1b36]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    isActive 
                      ? 'bg-[#0b1b36] text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
