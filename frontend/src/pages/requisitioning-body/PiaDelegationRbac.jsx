import React, { useState, useEffect, useMemo } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Key, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Mail, 
  Phone, 
  Send, 
  FileText, 
  Lock, 
  Layers, 
  Clock, 
  Search, 
  Check, 
  Sparkles,
  Info,
  RefreshCw,
  ExternalLink,
  Shield,
  HelpCircle,
  Plus,
  X
} from 'lucide-react';
import { 
  PiaDelegationService, 
  MOCK_PROJECT_PIA_CONFIG, 
  RB_WORKSPACE_MENUS_SCHEMA, 
  MOCK_AUDIT_TRAIL 
} from '../../services/piaDelegationService.js';

export default function PiaDelegationRbac() {
  const { activeProject, selectedProjectId, setSelectedProjectId, projects, showToast } = useWorkspace();

  // Screen State: 'registry' | 'detail' | 'create' | 'review' | 'success'
  const [currentScreen, setCurrentScreen] = useState('registry');

  // Selected PIA Entity
  const [selectedPiaId, setSelectedPiaId] = useState('PIA-ENT-001');

  // Drawer for Audit / History
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);

  // Add User to PIA Modal
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserMobile, setNewUserMobile] = useState('');
  const [newUserDesignation, setNewUserDesignation] = useState('Project Engineer');

  // Local refresh counter for service updates
  const [refreshKey, setRefreshKey] = useState(0);

  // Configuration for delegation creation
  // Selected user IDs from the active PIA
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  
  // Custom assigned designation per user: { [userId]: designation }
  const [userDesignations, setUserDesignations] = useState({});

  // Menu-level permission dictionary: { [menuKey]: 'No Access' | 'View' }
  const [menuPermissions, setMenuPermissions] = useState({});

  // Field-level permission dictionary: { [menuKey]: { [fieldId]: boolean } }
  const [fieldPermissions, setFieldPermissions] = useState({});

  // Accordion expanded menu keys
  const [expandedMenus, setExpandedMenus] = useState(['form_i_smart_wizard', 'gis_spatial_canvas']);

  // Success summary payload after finalizing
  const [finalizedData, setFinalizedData] = useState(null);

  // Audit list
  const [auditList, setAuditList] = useState(() => PiaDelegationService.getAuditTrail(selectedProjectId));

  // Sync audit list on project change
  useEffect(() => {
    setAuditList(PiaDelegationService.getAuditTrail(selectedProjectId));
  }, [selectedProjectId, refreshKey]);

  // Load project configuration based on selectedProjectId
  const projectConfig = useMemo(() => {
    // 1. First check if stored or dynamically submitted in PiaDelegationService
    const stored = PiaDelegationService.getProjectPiaConfig(selectedProjectId);
    if (stored) return stored;

    // 2. Check if activeProject in WorkspaceContext has PIA details (e.g. from Form-I submission)
    if (activeProject && (activeProject.id === selectedProjectId || !selectedProjectId)) {
      if (activeProject.pias && activeProject.pias.length > 0) {
        return {
          projectId: activeProject.id,
          projectTitle: activeProject.name,
          proposalId: activeProject.id,
          executingAgency: activeProject.executingAgency || 'National Highways Authority of India',
          division: `${activeProject.districts?.[0] || 'District'} Division / CALA Jurisdiction`,
          piaDifferentFromRB: Boolean(activeProject.isPiaDifferent),
          isFromForm1Submission: Boolean(activeProject.isFromForm1Submission),
          pias: activeProject.pias
        };
      }
    }

    // 3. Fallback to mock project PIA configs
    return MOCK_PROJECT_PIA_CONFIG[selectedProjectId] || {
      projectId: activeProject?.id || selectedProjectId,
      projectTitle: activeProject?.name || 'Land Acquisition Corridor Proposal',
      proposalId: activeProject?.id || 'NLAMS-PROP-001',
      executingAgency: activeProject?.executingAgency || 'National Highways Authority of India',
      division: 'Project Implementation Unit (PIU)',
      piaDifferentFromRB: true,
      pias: MOCK_PROJECT_PIA_CONFIG['REQ-2025-NHAI-041']?.pias || []
    };
  }, [selectedProjectId, activeProject, refreshKey]);

  const pias = projectConfig.pias || [];

  // Automatically keep selectedPiaId valid when project changes
  useEffect(() => {
    if (pias.length > 0) {
      if (!pias.some(p => p.id === selectedPiaId)) {
        setSelectedPiaId(pias[0].id);
      }
    }
  }, [pias, selectedPiaId]);

  const selectedPia = useMemo(() => {
    return pias.find(p => p.id === selectedPiaId) || pias[0] || null;
  }, [pias, selectedPiaId]);

  // Initialize permissions when entering "create" screen
  const initDelegationState = (pia) => {
    if (!pia) return;
    // Default select first 2 users
    const defaultUsers = pia.associatedUsers?.slice(0, 2).map(u => u.id) || [];
    setSelectedUserIds(defaultUsers);

    const initialDesigs = {};
    pia.associatedUsers?.forEach(u => {
      initialDesigs[u.id] = u.suggestedDesignation || 'Project Engineer';
    });
    setUserDesignations(initialDesigs);

    // Initial Menu permissions from schema
    const initialMenuPerms = {};
    const initialFieldPerms = {};
    RB_WORKSPACE_MENUS_SCHEMA.forEach(m => {
      initialMenuPerms[m.menuKey] = m.defaultAccess;
      initialFieldPerms[m.menuKey] = {};
      m.fields.forEach(f => {
        initialFieldPerms[m.menuKey][f.id] = f.defaultChecked;
      });
    });
    setMenuPermissions(initialMenuPerms);
    setFieldPermissions(initialFieldPerms);
  };

  const handleOpenPiaDetail = (piaId) => {
    setSelectedPiaId(piaId);
    setCurrentScreen('detail');
  };

  const handleStartCreateDelegation = () => {
    initDelegationState(selectedPia);
    setCurrentScreen('create');
  };

  const toggleUserSelection = (userId) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleDesignationChange = (userId, designation) => {
    setUserDesignations(prev => ({
      ...prev,
      [userId]: designation
    }));
  };

  const handleMenuAccessChange = (menuKey, access) => {
    setMenuPermissions(prev => ({
      ...prev,
      [menuKey]: access
    }));
  };

  const toggleFieldPermission = (menuKey, fieldId) => {
    setFieldPermissions(prev => ({
      ...prev,
      [menuKey]: {
        ...(prev[menuKey] || {}),
        [fieldId]: !prev[menuKey]?.[fieldId]
      }
    }));
  };

  const toggleMenuAccordion = (menuKey) => {
    setExpandedMenus(prev => 
      prev.includes(menuKey) ? prev.filter(k => k !== menuKey) : [...prev, menuKey]
    );
  };

  const handleProceedToReview = () => {
    if (selectedUserIds.length === 0) {
      showToast('Please select at least one PIA person to receive delegated access.', 'error');
      return;
    }
    setCurrentScreen('review');
  };

  const handleFinalizeDelegation = async () => {
    const selectedPeople = selectedPia.associatedUsers.filter(u => selectedUserIds.includes(u.id)).map(u => ({
      id: u.id,
      name: u.name,
      email: u.officialEmail,
      assignedDesignation: userDesignations[u.id] || u.suggestedDesignation
    }));

    const delegatedMenus = RB_WORKSPACE_MENUS_SCHEMA.filter(m => menuPermissions[m.menuKey] === 'View').map(m => {
      const activeFields = m.fields.filter(f => fieldPermissions[m.menuKey]?.[f.id]).map(f => f.label);
      return {
        name: m.name,
        menuKey: m.menuKey,
        access: 'View',
        fields: activeFields
      };
    });

    const payload = {
      delegationId: `DEL-CONF-${Math.floor(100000 + Math.random() * 900000)}`,
      projectId: projectConfig.projectId,
      projectTitle: projectConfig.projectTitle,
      piaEntity: selectedPia.name,
      cinGst: selectedPia.cinGst,
      nodalEmail: selectedPia.nodalEmail,
      people: selectedPeople,
      delegatedMenus,
      finalizedAt: '15 Sep 2026, ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      credentialStatus: 'Queued for Email Dispatch'
    };

    // Persist via service into localStorage
    PiaDelegationService.finalizeDelegation(payload);

    setFinalizedData(payload);

    // Append to audit trail
    const newAuditEntry = {
      id: `AUD-DEL-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: payload.finalizedAt,
      action: 'Delegation Finalized & Credentials Queued',
      entityName: selectedPia.name,
      targetUser: selectedPeople.map(p => `${p.name} (${p.assignedDesignation})`).join(', '),
      actor: 'Er. Rajeshwar Singh (Project Director / RB)',
      details: `Configured sliced sub-user access across ${delegatedMenus.length} RB workspace menus with selected fields.`,
      status: 'Queued for Dispatch'
    };
    setAuditList(prev => [newAuditEntry, ...prev]);
    setRefreshKey(k => k + 1);

    setCurrentScreen('success');
    showToast('Sub-user delegation finalized successfully. Credentials queued for email dispatch.');
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showToast('Please enter both person name and official email.');
      return;
    }

    const newUser = {
      name: newUserName.trim(),
      officialEmail: newUserEmail.trim(),
      mobile: newUserMobile.trim() || '+91 98000 00000',
      suggestedDesignation: newUserDesignation,
      isNodal: false
    };

    PiaDelegationService.addUserToPia(projectConfig.projectId, selectedPia.id, newUser);
    setRefreshKey(k => k + 1);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserMobile('');
    showToast(`Registered ${newUser.name} under ${selectedPia.name}`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6 shadow-sm min-h-[calc(100vh-140px)] font-sans text-slate-800">
      
      {/* 1. Contextual Project Banner with Form-I D.1 Condition Check */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Menu 09 • Sub-User Delegation
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500">{projectConfig.projectId}</span>
              {projectConfig.isFromForm1Submission && (
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-700" /> Transmitted from Form-I Wizard
                </span>
              )}
            </div>
            <h1 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span>PIA Delegation & RBAC</span>
              <span className="text-xs font-medium text-slate-500 font-sans">
                (Manage Project Implementing Agency sub-user access)
              </span>
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              {projectConfig.projectTitle} • <span className="font-semibold text-slate-700">{projectConfig.executingAgency}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Project Proposal Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Proposal:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value);
                  setCurrentScreen('registry');
                }}
                className="text-xs font-semibold text-slate-900 bg-transparent border-none focus:outline-none cursor-pointer max-w-[210px] truncate"
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.isFromForm1Submission ? '★ [Form-I Submitted] ' : ''}{proj.name} ({proj.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Form-I Condition Pill */}
            <div className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 ${
              projectConfig.piaDifferentFromRB 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Form-I D.1:</span>
              <span className="font-semibold">PIA Different from RB?</span>
              <span className={`px-1.5 py-0.2 rounded font-bold text-[11px] ${
                projectConfig.piaDifferentFromRB ? 'bg-emerald-200 text-emerald-950' : 'bg-slate-200 text-slate-800'
              }`}>
                {projectConfig.piaDifferentFromRB ? 'YES' : 'NO'}
              </span>
            </div>

            {/* Audit History Drawer Button */}
            <button
              onClick={() => setIsAuditDrawerOpen(true)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-slate-600" />
              <span>Delegation Audit ({auditList.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CONDITIONAL STATE: If Form-I D.1 == NO */}
      {!projectConfig.piaDifferentFromRB ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-2xl mx-auto my-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              PIA delegation is not applicable for this project.
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              In statutory Form-I (Field D.1), the Requisitioning Body has declared that the executing agency acts directly as both the Proposer and the Implementing Agency (<span className="font-mono font-semibold">PIA Different from RB = NO</span>). No external concessionaire or third-party implementing agency is associated with this land acquisition corridor.
            </p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-left text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Statutory Administrative Rule</span>
            </div>
            <p className="text-[11px] text-amber-800">
              PIA sub-user delegation controls are exclusively activated when a distinct Project Implementing Agency (such as an SPV, EPC concessionaire, or railway development entity) is designated in Section D of the Form-I requisition dossier.
            </p>
          </div>
        </div>
      ) : (
        /* ACTIVE FLOW WHEN Form-I D.1 == YES */
        <div>
          {/* SCREEN 1: PIA REGISTRY / DELEGATION OVERVIEW */}
          {currentScreen === 'registry' && (
            <div className="space-y-5">
              {/* Compact summary counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Associated PIAs</span>
                    <div className="text-xl font-bold text-slate-900 mt-0.5">{pias.length} Entities</div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Active Delegations</span>
                    <div className="text-xl font-bold text-emerald-800 mt-0.5">
                      {pias.filter(p => p.delegationStatus === 'Active').length} Finalized
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Pending Delegations</span>
                    <div className="text-xl font-bold text-amber-700 mt-0.5">
                      {pias.filter(p => p.delegationStatus !== 'Active').length} Draft / Pending
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 text-amber-800 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Table of Associated PIAs */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Associated Project Implementing Agencies (PIAs)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configured from statutory Form-I Section D records for {projectConfig.projectId}
                    </p>
                  </div>
                  <span className="text-xs bg-white border border-slate-300 text-slate-600 px-2.5 py-1 rounded font-medium">
                    Select an agency to inspect sub-users and manage RBAC delegation
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider font-mono">
                      <tr>
                        <th className="p-3.5">PIA Entity Name</th>
                        <th className="p-3.5">CIN / GST</th>
                        <th className="p-3.5">Nodal Person</th>
                        <th className="p-3.5">Nodal Email</th>
                        <th className="p-3.5 text-center">Associated Users</th>
                        <th className="p-3.5 text-center">Access Status</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {pias.map((pia) => (
                        <tr key={pia.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                              <span>{pia.name}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5 font-mono">ID: {pia.id}</div>
                          </td>
                          <td className="p-3.5 font-mono text-[11px] text-slate-700">
                            {pia.cinGst}
                          </td>
                          <td className="p-3.5 font-medium text-slate-900">
                            {pia.nodalPerson}
                          </td>
                          <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                            {pia.nodalEmail}
                          </td>
                          <td className="p-3.5 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold border border-slate-200">
                              {pia.associatedUsers?.length || 0} People
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                              pia.delegationStatus === 'Active'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}>
                              {pia.delegationStatus}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleOpenPiaDetail(pia.id)}
                              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-semibold rounded text-xs inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                            >
                              <span>View Agency</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span className="text-[11px]">
                    <strong>Statutory Boundary:</strong> PIA access is strictly operational and restricted to a slice of the Requisitioning Body workspace. Statutory approvals remain exclusively with the designated RB Officer under Section 3(u).
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Total Agencies: {pias.length}</span>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: PIA DETAIL + ASSOCIATED PEOPLE */}
          {currentScreen === 'detail' && selectedPia && (
            <div className="space-y-5">
              {/* Back to Registry Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentScreen('registry')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to PIA Registry</span>
                </button>
                
                <button
                  onClick={handleStartCreateDelegation}
                  className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs inline-flex items-center gap-2 shadow-sm transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Create Delegation</span>
                </button>
              </div>

              {/* PIA Entity Information Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">
                          {selectedPia.id}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {selectedPia.delegationStatus}
                        </span>
                        {selectedPia.isSubmittedFromForm1 && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-700" /> Transmitted via Form-I Wizard Step 2
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
                        <span>{selectedPia.name}</span>
                      </h2>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-500 block">Form-I Section D Reference</span>
                    <span className="text-xs font-mono font-semibold text-slate-700">
                      {selectedPia.form1DocketId || projectConfig.proposalId} / D.2
                    </span>
                  </div>
                </div>

                {/* Grid of basic PIA fields (Strictly Form-I Fields) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      PIA Entity Name
                    </span>
                    <span className="font-semibold text-slate-900 block truncate">{selectedPia.name}</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      CIN / GST Registration
                    </span>
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-900">
                      <span>{selectedPia.cinGst}</span>
                      {selectedPia.cinVerified && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold border border-emerald-300">
                          MCA Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      Nodal Person & Role
                    </span>
                    <div className="font-semibold text-slate-900">
                      {selectedPia.nodalPerson || 'Designated Representative'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedPia.contact || '+91 98251 22344'}</div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">
                      Nodal Officer Email
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-blue-900 font-semibold truncate">
                      <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="truncate">{selectedPia.nodalEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Form-I Legal References */}
                {(selectedPia.registeredAddress || selectedPia.boardResolutionRef) && (
                  <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-lg text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPia.registeredAddress && (
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">
                          Registered Office Address:
                        </span>
                        <span className="text-slate-800 font-medium">{selectedPia.registeredAddress}</span>
                      </div>
                    )}
                    {selectedPia.boardResolutionRef && (
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">
                          Board Resolution / Concession Ref:
                        </span>
                        <span className="font-mono text-slate-800 font-semibold">{selectedPia.boardResolutionRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Associated PIA Users Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-900" />
                      <span>Associated PIA Users</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Personnel belonging to {selectedPia.name} eligible for delegated operational sub-user access
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAddUserModalOpen(true)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-xs inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add PIA Member</span>
                    </button>
                    <button
                      onClick={handleStartCreateDelegation}
                      className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-semibold rounded text-xs inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Create Delegation for Selected Users</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider font-mono">
                      <tr>
                        <th className="p-3.5">Person Name</th>
                        <th className="p-3.5">Designation (PIA-Side)</th>
                        <th className="p-3.5">Official Email</th>
                        <th className="p-3.5">Contact</th>
                        <th className="p-3.5 text-center">Current Access</th>
                        <th className="p-3.5 text-center">Delegation Status</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {selectedPia.associatedUsers?.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{user.name}</span>
                              {user.isNodal && (
                                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded border border-blue-200">
                                  Nodal
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">{user.id}</div>
                          </td>
                          <td className="p-3.5 font-medium text-slate-800">
                            {user.suggestedDesignation}
                          </td>
                          <td className="p-3.5 font-mono text-[11px] text-slate-600">
                            {user.officialEmail}
                          </td>
                          <td className="p-3.5 font-mono text-[11px] text-slate-500">
                            {user.mobile}
                          </td>
                          <td className="p-3.5 text-center">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200">
                              {user.currentAccess}
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                              user.delegationStatus === 'Finalized'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}>
                              {user.delegationStatus}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                initDelegationState(selectedPia);
                                setSelectedUserIds([user.id]);
                                setCurrentScreen('create');
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded border border-slate-300 text-[11px] transition-colors"
                            >
                              Configure
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>
                    Only personnel registered under this PIA can be selected. Cross-agency delegation is strictly prohibited by RBAC policies.
                  </span>
                  <button
                    onClick={handleStartCreateDelegation}
                    className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <span>Proceed to Delegation Flow</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: CREATE DELEGATION FLOW (The central screen of Menu 09) */}
          {currentScreen === 'create' && selectedPia && (
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentScreen('detail')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to PIA Detail</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Selected: <strong className="text-slate-900">{selectedUserIds.length} users</strong>
                  </span>
                  <button
                    onClick={handleProceedToReview}
                    className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs inline-flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <span>Review Delegation Matrix</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>

              {/* SECTION A — SELECT PIA */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#1B365D] text-white font-bold text-xs flex items-center justify-center font-mono">
                      A
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Selected Project Implementing Agency (PIA)
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('registry')}
                    className="text-xs font-semibold text-blue-900 hover:underline"
                  >
                    Change PIA
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">PIA Entity Name</span>
                    <span className="font-bold text-slate-900 truncate block mt-0.5">{selectedPia.name}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">CIN / GST</span>
                    <span className="font-mono font-semibold text-slate-900 truncate block mt-0.5">{selectedPia.cinGst}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Nodal Person</span>
                    <span className="font-semibold text-slate-900 truncate block mt-0.5">{selectedPia.nodalPerson}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Nodal Email</span>
                    <span className="font-mono text-blue-900 font-semibold truncate block mt-0.5">{selectedPia.nodalEmail}</span>
                  </div>
                </div>
              </div>

              {/* SECTION B — SELECT PEOPLE FROM THAT PIA & ASSIGN DESIGNATION */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#1B365D] text-white font-bold text-xs flex items-center justify-center font-mono">
                      B
                    </span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Select PIA Users & Assign PIA Designation
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Select which personnel belonging to {selectedPia.name} should receive delegated access
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedUserIds.length} of {selectedPia.associatedUsers?.length} Selected
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedPia.associatedUsers?.map((person) => {
                    const isSelected = selectedUserIds.includes(person.id);
                    return (
                      <div 
                        key={person.id}
                        className={`p-3 rounded-lg border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                          isSelected 
                            ? 'bg-blue-50/50 border-blue-300 ring-1 ring-blue-300/50' 
                            : 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {/* Checkbox and user identity */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id={`user-check-${person.id}`}
                            checked={isSelected}
                            onChange={() => toggleUserSelection(person.id)}
                            className="mt-1 w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-800 cursor-pointer"
                          />
                          <div>
                            <label 
                              htmlFor={`user-check-${person.id}`} 
                              className="font-bold text-xs text-slate-900 cursor-pointer flex items-center gap-2"
                            >
                              <span>{person.name}</span>
                              {person.isNodal && (
                                <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">
                                  Nodal Officer
                                </span>
                              )}
                            </label>
                            <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5">
                              <span className="font-mono text-slate-600">{person.officialEmail}</span>
                              <span>•</span>
                              <span>{person.mobile}</span>
                            </div>
                          </div>
                        </div>

                        {/* PIA Designation / Role Selector */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-left">
                            <label className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">
                              PIA-Side Designation
                            </label>
                            <select
                              disabled={!isSelected}
                              value={userDesignations[person.id] || person.suggestedDesignation}
                              onChange={(e) => handleDesignationChange(person.id, e.target.value)}
                              className={`text-xs rounded border p-1.5 font-medium transition-colors ${
                                isSelected 
                                  ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-700' 
                                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              <option value="Project Engineer">Project Engineer</option>
                              <option value="Project Manager">Project Manager</option>
                              <option value="Site Engineer">Site Engineer</option>
                              <option value="GIS Surveyor / Technical Officer">GIS Surveyor / Technical Officer</option>
                              <option value="Quality & Safety Surveyor">Quality & Safety Surveyor</option>
                              <option value="Senior Resident Engineer">Senior Resident Engineer</option>
                            </select>
                          </div>

                          <div className="text-right w-24 shrink-0">
                            <span className="text-[10px] text-slate-400 block">Access Status</span>
                            <span className={`text-[11px] font-bold ${
                              isSelected ? 'text-blue-900' : 'text-slate-400'
                            }`}>
                              {isSelected ? 'Configuring' : 'Excluded'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION C — PERMISSION MATRIX (Central Feature of Menu 09) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#1B365D] text-white font-bold text-xs flex items-center justify-center font-mono">
                      C
                    </span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        RB Workspace Permission Matrix (Menu-Level & Field-Level Access)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Select which existing Requisitioning Body workspace menus and fields these PIA sub-users can view
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
                      Exact 10 RB Workspace Menus
                    </span>
                  </div>
                </div>

                {/* Info Note on Conservative Read-Only Defaults */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-950 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Sub-User Access Principle:</span>
                    <span className="ml-1 text-slate-700">
                      As established by the NLAMS Requisitioning Body specification, PIA permissions are conservative sub-user views (<span className="font-semibold">No Access</span> or <span className="font-semibold">View</span>). PIA sub-users cannot digitally e-sign requisitions, approve escrow, or execute statutory Section 3(u) powers.
                    </span>
                  </div>
                </div>

                {/* The 10 RB Workspace Menus Accordion List */}
                <div className="space-y-2.5">
                  {RB_WORKSPACE_MENUS_SCHEMA.map((menu) => {
                    const currentAccess = menuPermissions[menu.menuKey] || 'No Access';
                    const hasAccess = currentAccess === 'View';
                    const isExpanded = expandedMenus.includes(menu.menuKey);
                    const selectedFieldCount = menu.fields.filter(f => fieldPermissions[menu.menuKey]?.[f.id]).length;
                    const isDelegationMenu = menu.menuKey === 'pia_delegation_rbac';

                    return (
                      <div 
                        key={menu.menuKey}
                        className={`rounded-lg border transition-all overflow-hidden ${
                          hasAccess 
                            ? 'border-slate-300 bg-white shadow-2xs' 
                            : 'border-slate-200 bg-slate-50/50'
                        }`}
                      >
                        {/* Menu-level row */}
                        <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-mono font-bold w-5 h-5 rounded bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                              {menu.menuId < 10 ? `0${menu.menuId}` : menu.menuId}
                            </span>
                            <div>
                              <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                                <span>{menu.name}</span>
                                {isDelegationMenu && (
                                  <span className="text-[9px] bg-rose-100 text-rose-800 border border-rose-200 px-1.5 py-0.2 rounded font-mono font-bold">
                                    RB Only • Strictly Locked
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">{menu.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                            {/* Menu Permission Segmented Control */}
                            <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-300 text-xs">
                              <button
                                type="button"
                                onClick={() => handleMenuAccessChange(menu.menuKey, 'No Access')}
                                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                                  !hasAccess 
                                    ? 'bg-slate-700 text-white shadow-xs' 
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                No Access
                              </button>
                              
                              <button
                                type="button"
                                disabled={isDelegationMenu}
                                onClick={() => handleMenuAccessChange(menu.menuKey, 'View')}
                                className={`px-3 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
                                  hasAccess 
                                    ? 'bg-[#1B365D] text-white shadow-xs' 
                                    : isDelegationMenu
                                      ? 'text-slate-400 cursor-not-allowed'
                                      : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <Eye className="w-3 h-3" />
                                <span>View</span>
                              </button>
                            </div>

                            {/* Expand fields toggle */}
                            {hasAccess && (
                              <button
                                type="button"
                                onClick={() => toggleMenuAccordion(menu.menuKey)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-medium text-slate-700 inline-flex items-center gap-1.5"
                              >
                                <span>Fields ({selectedFieldCount}/{menu.fields.length})</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Field-level access accordion drawer */}
                        {hasAccess && isExpanded && (
                          <div className="bg-slate-50/80 border-t border-slate-200 p-3.5 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1.5 border-b border-slate-200">
                              <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-700">
                                Permitted Information Fields for "{menu.name}"
                              </span>
                              <span>
                                {selectedFieldCount} of {menu.fields.length} fields visible to sub-user
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                              {menu.fields.map((field) => {
                                const isChecked = !!fieldPermissions[menu.menuKey]?.[field.id];
                                return (
                                  <label 
                                    key={field.id} 
                                    className={`p-2 rounded border flex items-start gap-2 cursor-pointer transition-colors ${
                                      isChecked 
                                        ? 'bg-white border-blue-300 text-slate-900' 
                                        : 'bg-slate-100/60 border-slate-200 text-slate-500 hover:bg-white'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleFieldPermission(menu.menuKey, field.id)}
                                      className="mt-0.5 w-3.5 h-3.5 text-blue-900 rounded border-slate-300 focus:ring-blue-800"
                                    />
                                    <div>
                                      <span className="font-medium text-xs block leading-tight">{field.label}</span>
                                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{field.id}</span>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentScreen('detail')}
                  className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel & Return
                </button>
                <button
                  onClick={handleProceedToReview}
                  className="px-5 py-2.5 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs inline-flex items-center gap-2 shadow-sm transition-colors"
                >
                  <span>Review & Finalize Delegation</span>
                  <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4: DELEGATION REVIEW / FINALIZE */}
          {currentScreen === 'review' && selectedPia && (
            <div className="space-y-6">
              {/* Back Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentScreen('create')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back & Edit Configuration</span>
                </button>

                <button
                  onClick={handleFinalizeDelegation}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs inline-flex items-center gap-2 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Finalize Delegation</span>
                </button>
              </div>

              {/* Review Container */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Step 4 of 4 • Confirmation Docket
                  </span>
                  <h2 className="text-base font-bold text-slate-950 mt-1">
                    Review PIA Sub-User Delegation
                  </h2>
                  <p className="text-xs text-slate-500">
                    Verify project details, selected personnel, and permitted RB workspace menus before authorization
                  </p>
                </div>

                {/* Project & PIA Summary Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Project Details</span>
                    <div className="font-bold text-slate-900">{projectConfig.projectTitle}</div>
                    <div className="text-slate-600">ID: <span className="font-mono">{projectConfig.projectId}</span></div>
                    <div className="text-slate-600">Executing Authority: <span className="font-semibold">{projectConfig.executingAgency}</span></div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Project Implementing Agency (PIA)</span>
                    <div className="font-bold text-slate-900">{selectedPia.name}</div>
                    <div className="text-slate-600 font-mono">CIN/GST: {selectedPia.cinGst}</div>
                    <div className="text-blue-900 font-mono">Nodal Email: {selectedPia.nodalEmail}</div>
                  </div>
                </div>

                {/* Selected Users Table */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Selected PIA Sub-Users ({selectedUserIds.length})
                  </h3>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px] font-mono">
                        <tr>
                          <th className="p-2.5">Person Name</th>
                          <th className="p-2.5">Assigned PIA Designation</th>
                          <th className="p-2.5">Official Email</th>
                          <th className="p-2.5 text-right">Delegation Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {selectedPia.associatedUsers.filter(u => selectedUserIds.includes(u.id)).map(person => (
                          <tr key={person.id} className="bg-white">
                            <td className="p-2.5 font-bold text-slate-900">
                              {person.name}
                            </td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-semibold border border-blue-200 text-[11px]">
                                {userDesignations[person.id] || person.suggestedDesignation}
                              </span>
                            </td>
                            <td className="p-2.5 font-mono text-slate-600 text-[11px]">
                              {person.officialEmail}
                            </td>
                            <td className="p-2.5 text-right text-emerald-700 font-bold text-[11px]">
                              To Be Provisioned
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Delegated RB Workspace Access Summary */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Delegated RB Workspace Access
                  </h3>
                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200">
                    {RB_WORKSPACE_MENUS_SCHEMA.filter(m => menuPermissions[m.menuKey] === 'View').map(menu => {
                      const activeFields = menu.fields.filter(f => fieldPermissions[menu.menuKey]?.[f.id]);
                      return (
                        <div key={menu.menuKey} className="p-3 bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="w-64 shrink-0">
                            <span className="font-bold text-xs text-slate-900 block">{menu.name}</span>
                            <span className="text-[10px] text-emerald-800 font-bold uppercase bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block mt-0.5">
                              Access: View
                            </span>
                          </div>

                          <div className="grow">
                            <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                              Permitted Fields ({activeFields.length} of {menu.fields.length}):
                            </span>
                            {activeFields.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {activeFields.map(f => (
                                  <span key={f.id} className="text-[11px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                                    {f.label}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 italic">No specific field restrictions applied (General view)</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Formal Warning & Verification Notice */}
                <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Statutory Authorization Undertaking</span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Finalizing this delegation will apply the configured sub-user access through the RBAC system. Sub-user site credentials will be transmitted via official email to the designated PIA Nodal Officer (<span className="font-mono font-bold">{selectedPia.nodalEmail}</span>). All actions performed by delegated users are cryptographically logged under the statutory accountability of the Requisitioning Body.
                  </p>
                </div>

                {/* Finalize Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <button
                    onClick={() => setCurrentScreen('create')}
                    className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs"
                  >
                    Back & Edit
                  </button>
                  <button
                    onClick={handleFinalizeDelegation}
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs inline-flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Finalize Delegation</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5: AFTER FINALIZE / SUCCESS STATE */}
          {currentScreen === 'success' && finalizedData && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-3xl mx-auto space-y-6 my-4">
              <div className="text-center space-y-2 pb-4 border-b border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Delegation Finalized Successfully
                </h2>
                <p className="text-xs text-slate-500">
                  Sub-user permission matrix applied for <strong className="text-slate-800">{finalizedData.piaEntity}</strong>
                </p>
                <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded text-xs font-mono text-slate-700 mt-1">
                  Delegation Ref: <strong>{finalizedData.delegationId}</strong> • Timestamp: {finalizedData.finalizedAt}
                </div>
              </div>

              {/* Credential Dispatch Notice */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-blue-950 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-800" />
                    <span>Credential Dispatch Status</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 font-bold text-[10px]">
                    {finalizedData.credentialStatus}
                  </span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  Sub-user credentials are queued for email dispatch. The backend credential generation engine will securely transmit one-time cryptographic activation tokens to the configured PIA Nodal Officer at:
                </p>
                <div className="font-mono font-bold text-blue-900 bg-white p-2 rounded border border-blue-200 text-center">
                  {finalizedData.nodalEmail}
                </div>
                <p className="text-[10px] text-slate-500 italic text-center">
                  Notice: In accordance with statutory security mandates, no plaintext passwords are shown or retained on the client interface.
                </p>
              </div>

              {/* Summary of finalized access */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                    Provisioned Sub-Users ({finalizedData.people.length})
                  </span>
                  <ul className="divide-y divide-slate-200">
                    {finalizedData.people.map(p => (
                      <li key={p.id} className="py-1.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">{p.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{p.email}</span>
                        </div>
                        <span className="text-[10px] bg-slate-200 text-slate-800 font-semibold px-1.5 py-0.5 rounded">
                          {p.assignedDesignation}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                    Delegated RB Workspace Menus ({finalizedData.delegatedMenus.length})
                  </span>
                  <ul className="space-y-1.5">
                    {finalizedData.delegatedMenus.map(m => (
                      <li key={m.menuKey} className="text-[11px] flex items-center justify-between">
                        <span className="font-medium text-slate-800">{m.name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                          {m.fields.length} fields permitted
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentScreen('detail')}
                  className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold rounded-lg text-xs transition-colors"
                >
                  Return to PIA Detail
                </button>
                <button
                  onClick={() => setCurrentScreen('registry')}
                  className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  View All Agencies
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* COMPACT AUDIT TRAIL MODAL / DRAWER (Section 19: Audit Trail) */}
      {isAuditDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-300 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-blue-900" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Delegation Audit Trail
                  </h3>
                  <p className="text-[10px] text-slate-500">Immutable chronological delegation records</p>
                </div>
              </div>
              <button
                onClick={() => setIsAuditDrawerOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audit Log Entries */}
            <div className="p-4 overflow-y-auto space-y-3.5 grow text-xs">
              {auditList.map((log) => (
                <div key={log.id} className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-blue-900 font-bold">{log.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{log.action}</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{log.details}</p>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <span>Target: <strong className="text-slate-700">{log.targetUser}</strong></span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium font-mono text-[9px]">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => setIsAuditDrawerOpen(false)}
                className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 rounded text-xs font-semibold text-slate-700 transition-colors"
              >
                Close Audit Area
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add PIA Team Member */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden text-slate-800">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-900" />
                <h3 className="text-sm font-bold text-slate-900">Register New PIA Personnel</h3>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="p-5 space-y-4 text-xs">
              <div className="p-2.5 bg-blue-50/50 border border-blue-200 rounded-lg text-slate-700 text-[11px] leading-relaxed">
                Add an authorized employee or consultant under <strong>{selectedPia.name}</strong>. Once registered, this person will appear in the delegation candidate list to receive sliced RB workspace credentials.
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Vikramaditya Rao"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Official Email (Credentials Recipient) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. v.rao@spv-agency.gov.in"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Contact Mobile
                  </label>
                  <input
                    type="text"
                    value={newUserMobile}
                    onChange={(e) => setNewUserMobile(e.target.value)}
                    placeholder="+91 98251 00000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Designation Role
                  </label>
                  <select
                    value={newUserDesignation}
                    onChange={(e) => setNewUserDesignation(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="Project Engineer">Project Engineer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Site Engineer">Site Engineer</option>
                    <option value="GIS Surveyor / Alignment Specialist">GIS Surveyor</option>
                    <option value="Environmental & R&R Liaison">Environmental & R&R Liaison</option>
                    <option value="Financial & Escrow Analyst">Financial Analyst</option>
                    <option value="Legal Consultant">Legal Consultant</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
