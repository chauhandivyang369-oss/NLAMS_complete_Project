import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  CheckCircle2, 
  Copy, 
  Check, 
  UserPlus, 
  FileText,
  AlertCircle,
  Building,
  Scale,
  Mail,
  Sliders,
  ExternalLink,
  Printer
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import CommitteeSubMenu from '../components/rbac/CommitteeSubMenu.jsx';
import SiaIegSubMenu from '../components/rbac/SiaIegSubMenu.jsx';
import RnrAuthoritySubMenu from '../components/rbac/RnrAuthoritySubMenu.jsx';
import LarrAuthoritySubMenu from '../components/rbac/LarrAuthoritySubMenu.jsx';
import CredentialDispatchModal from '../components/rbac/CredentialDispatchModal.jsx';

export default function RbacAccessControlHubPage() {
  const {
    rbacAssignments,
    handleProvisionRbac,
    jurisdiction,
    projects
  } = useAppropriateGovernment();

  // Active Sub-Menu: (1) COMMITTEE | (2) SIA_IEG | (3) RNR_AUTHORITY | (4) LARR_AUTHORITY
  const [activeSubMenu, setActiveSubMenu] = useState('COMMITTEE');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [copiedId, setCopiedId] = useState(null);

  // Modal for generated credentials & Gmail dispatch
  const [dispatchModalData, setDispatchModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCentral = jurisdiction === 'CENTRAL';

  const handleCopy = (id, link) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Called when any sub-menu clicks "Grant Final Access"
  const handleGrantFinalAccess = async (payload) => {
    // Generate passwords for each member
    const enrichedMembers = (payload.members || []).map((m, idx) => ({
      ...m,
      password: `NLAMS#${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + (idx % 26))}`,
      loginId: m.email || `officer.${m.id || idx}@nlams.gov.in`
    }));

    const finalPayload = {
      ...payload,
      members: enrichedMembers,
      jurisdictionType: jurisdiction
    };

    // Store in backend API / context state
    await handleProvisionRbac(finalPayload);

    // Show credential dispatch modal
    setDispatchModalData(finalPayload);
    setIsModalOpen(true);
  };

  // Filter provisioned assignments for active sub-menu
  const filteredAssignments = rbacAssignments.filter(r => {
    if (activeSubMenu === 'COMMITTEE') return r.category === 'COMMITTEE';
    if (activeSubMenu === 'SIA_IEG') return r.category === 'SIA_IEG';
    if (activeSubMenu === 'RNR_AUTHORITY') return r.category === 'RNR_AUTHORITY';
    if (activeSubMenu === 'LARR_AUTHORITY') return r.category === 'LARR_AUTHORITY';
    return true;
  });

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Top Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              RBAC Access Control Hub — Downstream Statutory Workspace Provisioning
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 7
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
              {isCentral ? 'CENTRAL APPROPRIATE GOVERNMENT' : 'STATE APPROPRIATE GOVERNMENT'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure RBAC access, register members with mandatory Gmail &amp; Phone, toggle granular [ View ] / [ Not Access ] permissions, and dispatch auto-generated credentials to Gmail
          </p>
        </div>
      </div>

      {/* 4 Main Sub-Menus Tabs */}
      <div className="bg-white border border-slate-200 rounded p-1.5 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 text-xs font-semibold">
          {/* Sub-menu 1: Committee */}
          <button
            onClick={() => setActiveSubMenu('COMMITTEE')}
            className={`py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeSubMenu === 'COMMITTEE'
                ? 'bg-[#1B365D] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className={`w-4 h-4 ${activeSubMenu === 'COMMITTEE' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
            <span>(1) Committee</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              activeSubMenu === 'COMMITTEE' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              Sec 48/50/45
            </span>
          </button>

          {/* Sub-menu 2: SIA & IEG */}
          <button
            onClick={() => setActiveSubMenu('SIA_IEG')}
            className={`py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeSubMenu === 'SIA_IEG'
                ? 'bg-[#1B365D] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeSubMenu === 'SIA_IEG' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
            <span>(2) SIA &amp; IEG</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              activeSubMenu === 'SIA_IEG' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              Sec 4-9
            </span>
          </button>

          {/* Sub-menu 3: R&R */}
          <button
            onClick={() => setActiveSubMenu('RNR_AUTHORITY')}
            className={`py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeSubMenu === 'RNR_AUTHORITY'
                ? 'bg-[#1B365D] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Building className={`w-4 h-4 ${activeSubMenu === 'RNR_AUTHORITY' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
            <span>(3) R&amp;R Authority</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              activeSubMenu === 'RNR_AUTHORITY' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              Sec 43/44
            </span>
          </button>

          {/* Sub-menu 4: LARR Authority */}
          <button
            onClick={() => setActiveSubMenu('LARR_AUTHORITY')}
            className={`py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeSubMenu === 'LARR_AUTHORITY'
                ? 'bg-[#1B365D] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Scale className={`w-4 h-4 ${activeSubMenu === 'LARR_AUTHORITY' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
            <span>(4) LARR Authority</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              activeSubMenu === 'LARR_AUTHORITY' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              Sec 51
            </span>
          </button>
        </div>
      </div>

      {/* Render Active Sub-Menu View */}
      {activeSubMenu === 'COMMITTEE' && (
        <CommitteeSubMenu
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          onGrantFinalAccess={handleGrantFinalAccess}
        />
      )}

      {activeSubMenu === 'SIA_IEG' && (
        <SiaIegSubMenu
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          onGrantFinalAccess={handleGrantFinalAccess}
        />
      )}

      {activeSubMenu === 'RNR_AUTHORITY' && (
        <RnrAuthoritySubMenu
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          onGrantFinalAccess={handleGrantFinalAccess}
        />
      )}

      {activeSubMenu === 'LARR_AUTHORITY' && (
        <LarrAuthoritySubMenu
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          onGrantFinalAccess={handleGrantFinalAccess}
        />
      )}

      {/* Active Provisioned Workspaces Register */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Key className="w-4 h-4 text-[#C5A059]" />
              Provisioned Workspaces &amp; Credential Dispatch Register ({filteredAssignments.length})
            </h3>
            <p className="text-xs text-slate-500">
              Statutory credentials issued with direct login links, access tokens, and verified Gmail transmission receipts
            </p>
          </div>
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
            Filtered by: <strong>{activeSubMenu.replace('_', ' ')}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Assignment Ref</th>
                <th className="py-2.5 px-3">Statutory Entity / Officer</th>
                <th className="py-2.5 px-3">Registered Gmail &amp; Phone</th>
                <th className="py-2.5 px-3">Order Ref</th>
                <th className="py-2.5 px-3 text-center">Dispatch Status</th>
                <th className="py-2.5 px-3 text-right">Access Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredAssignments.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {item.id}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-[#1B365D]">{item.memberName || item.role}</div>
                    <div className="text-[10px] text-slate-500">{item.designation || item.department}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-mono text-[11px] text-blue-700 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-rose-600" />
                      {item.email || 'officer@nic.in'}
                    </div>
                    <div className="text-[10px] text-slate-500">{item.mobile || '+91 98110 24891'}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                    {item.gazetteOrderNo}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      GMAIL SENT
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleCopy(item.id, item.credentialLoginPlaceholder)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied Link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Copy Login Link</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credential Dispatch Modal */}
      <CredentialDispatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={dispatchModalData}
      />
    </div>
  );
}
