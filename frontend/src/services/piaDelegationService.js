/**
 * NLAMS - PIA Delegation & RBAC Service Layer (Abstracted API Client)
 * Compatible with future Node.js + Express backend & RBAC domain services.
 */
import axios from 'axios';

// Authoritative Mock Data for associated PIAs and project configurations
export const MOCK_PROJECT_PIA_CONFIG = {
  'REQ-2025-NHAI-041': {
    projectId: 'REQ-2025-NHAI-041',
    projectTitle: 'Delhi-Amritsar-Katra Expressway (Package 3 - Chainage 84.500 to 142.200)',
    proposalId: 'NLAMS-RB-2026-00124',
    executingAgency: 'National Highways Authority of India (NHAI)',
    division: 'Project Implementation Unit (PIU Ambala / Patiala)',
    piaDifferentFromRB: true, // Form-I D.1 condition
    pias: [
      {
        id: 'PIA-ENT-001',
        name: 'ABC Infrastructure Project Division (SPV Concessionaire)',
        cinGst: 'U45203DL2021PTC384912 / 07AABCA1298P1Z8',
        nodalPerson: 'Er. Rajesh Kumar Malhotra',
        nodalEmail: 'malhotra.r@abcinfra-project.demo',
        phone: '+91 11-4920-8800',
        registeredAddress: 'Concessionaire House, Sector 62, Expressway Zone, Delhi-NCR',
        delegationStatus: 'Active',
        activeUsersCount: 3,
        lastUpdated: '15 Sep 2026',
        associatedUsers: [
          {
            id: 'PIA-USR-101',
            name: 'Rahul Sharma',
            officialEmail: 'rahul.sharma@abcinfra-project.demo',
            mobile: '+91 98711 02931',
            suggestedDesignation: 'Project Engineer',
            assignedDesignation: 'Project Engineer',
            currentAccess: 'Active Sub-User',
            delegationStatus: 'Finalized',
            isNodal: false
          },
          {
            id: 'PIA-USR-102',
            name: 'Vikramaditya Rao',
            officialEmail: 'v.rao@abcinfra-project.demo',
            mobile: '+91 98102 34491',
            suggestedDesignation: 'Project Manager',
            assignedDesignation: 'Project Manager',
            currentAccess: 'Active Sub-User',
            delegationStatus: 'Finalized',
            isNodal: true
          },
          {
            id: 'PIA-USR-103',
            name: 'Pooja Nair',
            officialEmail: 'pooja.nair@abcinfra-project.demo',
            mobile: '+91 99201 88472',
            suggestedDesignation: 'Site Engineer',
            assignedDesignation: 'Site Engineer',
            currentAccess: 'Active Sub-User',
            delegationStatus: 'Finalized',
            isNodal: false
          },
          {
            id: 'PIA-USR-104',
            name: 'Amitabh Sen',
            officialEmail: 'a.sen@abcinfra-project.demo',
            mobile: '+91 97118 40291',
            suggestedDesignation: 'GIS Surveyor / Technical Officer',
            assignedDesignation: 'GIS Surveyor / Technical Officer',
            currentAccess: 'Pending Delegation',
            delegationStatus: 'Pending',
            isNodal: false
          }
        ]
      },
      {
        id: 'PIA-ENT-002',
        name: 'L&T - GMR Strategic Highways Joint Venture',
        cinGst: 'U74999MH2022PTC410298 / 27AAGCL9021N1ZM',
        nodalPerson: 'Shri Devendra Mohan Saxena',
        nodalEmail: 'dm.saxena@ltgmr-jv.demo',
        phone: '+91 22-6890-4100',
        registeredAddress: 'EPC Hub, Powai Infrastructure Complex, Mumbai',
        delegationStatus: 'Pending Finalization',
        activeUsersCount: 1,
        lastUpdated: '12 Sep 2026',
        associatedUsers: [
          {
            id: 'PIA-USR-201',
            name: 'Kavita Sundaram',
            officialEmail: 'kavita.s@ltgmr-jv.demo',
            mobile: '+91 98200 12903',
            suggestedDesignation: 'Senior Resident Engineer',
            assignedDesignation: 'Senior Resident Engineer',
            currentAccess: 'Pending Configuration',
            delegationStatus: 'Draft',
            isNodal: true
          },
          {
            id: 'PIA-USR-202',
            name: 'Mohit Deshmukh',
            officialEmail: 'm.deshmukh@ltgmr-jv.demo',
            mobile: '+91 94220 88129',
            suggestedDesignation: 'Quality & Safety Surveyor',
            assignedDesignation: 'Quality & Safety Surveyor',
            currentAccess: 'No Access',
            delegationStatus: 'Not Delegated',
            isNodal: false
          }
        ]
      }
    ]
  },
  'REQ-2025-DFCC-019': {
    projectId: 'REQ-2025-DFCC-019',
    projectTitle: 'Eastern Dedicated Freight Corridor Multi-Modal Logistics Terminal Hub',
    proposalId: 'NLAMS-RB-2026-00088',
    executingAgency: 'DFCCIL / Ministry of Railways',
    division: 'Chief Project Manager (Kanpur / Prayagraj)',
    piaDifferentFromRB: true,
    pias: [
      {
        id: 'PIA-ENT-003',
        name: 'Rail Vikas Nigam Special Project Vehicle (RVNL-SPV)',
        cinGst: 'U60200DL2020GOI362811 / 07AABCR8841M1ZY',
        nodalPerson: 'Shri Sunil K. Trivedi',
        nodalEmail: 's.trivedi@rvnl-spv.demo',
        phone: '+91 11-2670-5500',
        registeredAddress: 'August Kranti Bhawan, Bhikaji Cama Place, New Delhi',
        delegationStatus: 'Active',
        activeUsersCount: 2,
        lastUpdated: '10 Sep 2026',
        associatedUsers: [
          {
            id: 'PIA-USR-301',
            name: 'Siddharth Bose',
            officialEmail: 's.bose@rvnl-spv.demo',
            mobile: '+91 98300 44910',
            suggestedDesignation: 'Project Director (Civil)',
            assignedDesignation: 'Project Director (Civil)',
            currentAccess: 'Active Sub-User',
            delegationStatus: 'Finalized',
            isNodal: true
          }
        ]
      }
    ]
  },
  'REQ-2024-SECI-082': {
    projectId: 'REQ-2024-SECI-082',
    projectTitle: 'Rewa Ultra Mega Solar Park Phase-II Grid Substation Interconnection',
    proposalId: 'NLAMS-RB-2025-00492',
    executingAgency: 'Solar Energy Corporation of India (SECI)',
    division: 'Grid Interconnection Cell, Bhopal',
    piaDifferentFromRB: false, // Form-I D.1 condition = NO (Demonstrates non-applicable state)
    pias: []
  }
};

const STORAGE_KEY_PIA_CONFIGS = 'NLAMS_PIA_CONFIGS';
const STORAGE_KEY_AUDIT_TRAIL = 'NLAMS_PIA_AUDIT_TRAIL';

function getStoredConfigs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PIA_CONFIGS);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('[PiaDelegationService] Error reading stored PIA configs:', err);
    return {};
  }
}

function saveStoredConfigs(configs) {
  try {
    localStorage.setItem(STORAGE_KEY_PIA_CONFIGS, JSON.stringify(configs));
  } catch (err) {
    console.warn('[PiaDelegationService] Error saving PIA configs:', err);
  }
}

function getStoredAudits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT_TRAIL);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function saveStoredAudits(audits) {
  try {
    localStorage.setItem(STORAGE_KEY_AUDIT_TRAIL, JSON.stringify(audits));
  } catch (err) {
    console.warn('[PiaDelegationService] Error saving audits:', err);
  }
}

/**
 * EXACT 10 REQUISITIONING BODY WORKSPACE MENUS SCHEMA
 * Only legitimate fields backed by the official specification & Form-I schema.
 */
export const RB_WORKSPACE_MENUS_SCHEMA = [
  {
    menuId: 1,
    menuKey: 'executive_dashboard',
    name: 'Executive Dashboard',
    description: 'High-level project milestone, risk surveillance, and SLA tracking',
    defaultAccess: 'No Access',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'summary_kpis', label: 'Summary Metrics (Area, Beneficiaries, Progress)', defaultChecked: false },
      { id: 'sla_gauges', label: 'Statutory Lapse Risk & SLA Deadlines', defaultChecked: false },
      { id: 'district_progress', label: 'District-wise Pipeline Progression', defaultChecked: false },
      { id: 'critical_alerts', label: 'Critical Action Items & Alerts', defaultChecked: false }
    ]
  },
  {
    menuId: 2,
    menuKey: 'master_requisition_hub',
    name: 'Master Requisition Hub',
    description: 'Consolidated proposal registry across multi-district alignments',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'project_overview', label: 'Proposal ID & General Overview', defaultChecked: true },
      { id: 'stage_progression', label: 'Statutory Stage Status (Sec 11, 15, 19, 23)', defaultChecked: true },
      { id: 'area_summary', label: 'Requested vs Acquired Land Extent (Ha)', defaultChecked: true },
      { id: 'nodal_directory', label: 'District Administration Nodal Directory', defaultChecked: false }
    ]
  },
  {
    menuId: 3,
    menuKey: 'form_i_smart_wizard',
    name: 'Form-I Smart Wizard',
    description: 'Statutory requisition dossier submitted under RFCTLARR Section 3(u)',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      // Direct Form-I Specification Sections A to E
      { id: 'b1_project_title', label: 'B.1 Project Title & Proposal Details', defaultChecked: true },
      { id: 'b2_public_purpose', label: 'B.2 Detailed Public Purpose Clause (Sec 2(1))', defaultChecked: true },
      { id: 'b3_gestation_period', label: 'B.3 Estimated Gestation Period & Schedule', defaultChecked: true },
      { id: 'b4_admin_sanction', label: 'B.4 Administrative Approval Reference & Date', defaultChecked: false },
      { id: 'a1_rb_identity', label: 'A.1 Requisitioning Body Name & Ministry', defaultChecked: true },
      { id: 'a2_officer_details', label: 'A.2 Nodal Officer Designation & Official Email', defaultChecked: false },
      { id: 'c1_ownership_type', label: 'C.1 Project Ownership & Urgency Justification (Sec 40)', defaultChecked: false },
      { id: 'd2_pia_details', label: 'D.2 PIA Entity Information & CIN/GST', defaultChecked: true },
      { id: 'e4_area_requested', label: 'E.4 Total Spatial Area Extent Requested', defaultChecked: true }
    ]
  },
  {
    menuId: 4,
    menuKey: 'gis_spatial_canvas',
    name: 'GIS Spatial Canvas',
    description: 'Geo-referenced cadastral parcel viewer and corridor alignment layers',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'e1_ulpin_list', label: 'E.1 14-Digit ULPIN Numbers & Spatial Parcels', defaultChecked: true },
      { id: 'e2_khasra_numbers', label: 'E.2 Khasra / Survey Numbers & Village Geometries', defaultChecked: true },
      { id: 'e3_vector_alignment', label: 'E.3 Corridor Alignment Centerline & RoW Buffers', defaultChecked: true },
      { id: 'e4_spatial_extent', label: 'E.4 Parcel Area Demarcation (Ha)', defaultChecked: true },
      { id: 'ownership_attributes', label: 'Restricted Ownership & Khata Records', defaultChecked: false }
    ]
  },
  {
    menuId: 5,
    menuKey: 'financial_escrow_ledger',
    name: 'Financial Escrow Ledger',
    description: 'Escrow deposit surveillance, administrative charges, and PFMS tracking',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'escrow_summary', label: 'Sanction Outlay & Escrow Deposit Balance', defaultChecked: false },
      { id: 'district_disbursement', label: 'Disbursement Status by District CALA', defaultChecked: true },
      { id: 'pfms_batch_refs', label: 'PFMS Batch Identifiers & UTR Confirmations', defaultChecked: false }
    ]
  },
  {
    menuId: 6,
    menuKey: 'statutory_timeline_tracker',
    name: 'Statutory Timeline Tracker',
    description: 'Mandatory statutory milestones from Section 4 to Section 38',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'statutory_stages', label: 'Statutory Milestone Progression (Sec 4, 11, 15, 19, 23)', defaultChecked: true },
      { id: 'sla_counters', label: 'Remaining Statutory Days & Deadline Dates', defaultChecked: true },
      { id: 'lapse_risk_warnings', label: 'Lapse Risk Warnings & Escalation Memos', defaultChecked: true }
    ]
  },
  {
    menuId: 7,
    menuKey: 'objections_hearings',
    name: 'Objections & Hearings',
    description: 'Surveillance of Section 15 objections and CALA bench proceedings',
    defaultAccess: 'No Access',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'objection_counts', label: 'Objection Counts by Village / District', defaultChecked: false },
      { id: 'hearing_schedules', label: 'Upcoming Hearing Dates & Venues', defaultChecked: false },
      { id: 'dispute_grounds', label: 'Petitioner Form-B Grounds & Speaking Orders', defaultChecked: false }
    ]
  },
  {
    menuId: 8,
    menuKey: 'rnr_oversight_dbt',
    name: 'R&R Oversight & DBT',
    description: 'Affected family census, rehabilitation housing, and DBT credit status',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'paf_pdf_counts', label: 'Affected (PAF) & Displaced (PDF) Family Registers', defaultChecked: true },
      { id: 'housing_allotments', label: 'Housing Allotment & Resettlement Colony Status', defaultChecked: true },
      { id: 'benefit_delivery', label: 'Schedule II Benefit Delivery Status', defaultChecked: true },
      { id: 'dbt_credit_logs', label: 'DBT Credit Status & Bank Receipt Verification', defaultChecked: false }
    ]
  },
  {
    menuId: 9,
    menuKey: 'pia_delegation_rbac',
    name: 'PIA Delegation & RBAC',
    description: 'Sub-user permission configuration (Reserved exclusively for RB)',
    defaultAccess: 'No Access',
    availableAccessOptions: ['No Access'], // PIA sub-users can NEVER access Delegation controls
    fields: [
      { id: 'rbac_controls', label: 'Sub-User Delegation & RBAC Configuration', defaultChecked: false }
    ]
  },
  {
    menuId: 10,
    menuKey: 'document_gazette_vault',
    name: 'Document & Gazette Vault',
    description: 'Central statutory repository of certified gazette and survey dockets',
    defaultAccess: 'View',
    availableAccessOptions: ['No Access', 'View'],
    fields: [
      { id: 'gazette_notifications', label: 'Published Gazette Notifications (Sec 11 & 19)', defaultChecked: true },
      { id: 'form_i_certified_dockets', label: 'Certified Form-I & Survey Memos', defaultChecked: true },
      { id: 'rnr_schemes', label: 'Sanctioned R&R Scheme Documents', defaultChecked: false }
    ]
  }
];

export const MOCK_AUDIT_TRAIL = [
  {
    id: 'AUD-DEL-2026-091',
    timestamp: '15 Sep 2026, 17:30 IST',
    action: 'Delegation Finalized & Credentials Queued',
    entityName: 'ABC Infrastructure Project Division',
    targetUser: 'Rahul Sharma (Project Engineer)',
    actor: 'Er. Rajeshwar Singh (Project Director / RB Manager)',
    details: 'Configured sliced access to Master Hub, Form-I, GIS Spatial Canvas, and R&R Oversight.',
    status: 'Queued for Dispatch'
  },
  {
    id: 'AUD-DEL-2026-088',
    timestamp: '15 Sep 2026, 16:15 IST',
    action: 'Sub-User Permission Matrix Updated',
    entityName: 'ABC Infrastructure Project Division',
    targetUser: 'Vikramaditya Rao (Project Manager)',
    actor: 'Er. Rajeshwar Singh (Project Director / RB Manager)',
    details: 'Added field-level access to E.1 ULPIN and E.3 Vector Alignment files.',
    status: 'Verified'
  },
  {
    id: 'AUD-DEL-2026-074',
    timestamp: '12 Sep 2026, 11:20 IST',
    action: 'PIA Registration Synchronized from Form-I D.2',
    entityName: 'L&T - GMR Strategic Highways Joint Venture',
    targetUser: 'Kavita Sundaram (Nodal Person)',
    actor: 'System Integration / Form-I Ingestion',
    details: 'SPV Concessionaire entity details verified against CIN/GST database.',
    status: 'Registered'
  },
  {
    id: 'AUD-DEL-2026-061',
    timestamp: '08 Sep 2026, 14:00 IST',
    action: 'Site Engineer Sub-User Provisioned',
    entityName: 'ABC Infrastructure Project Division',
    targetUser: 'Pooja Nair (Site Engineer)',
    actor: 'Er. Rajeshwar Singh (Project Director / RB Manager)',
    details: 'View-only access provisioned for alignment inspection & village survey verification.',
    status: 'Dispatched via Email'
  }
];

// Conceptual API Service Interface for future Axios / Express integration
export const PiaDelegationService = {
  getProjectPiaConfig(projectId) {
    const stored = getStoredConfigs();
    if (stored[projectId]) {
      return stored[projectId];
    }
    return MOCK_PROJECT_PIA_CONFIG[projectId] || null;
  },

  getAllProjectPiaConfigs() {
    const stored = getStoredConfigs();
    return { ...MOCK_PROJECT_PIA_CONFIG, ...stored };
  },

  registerSubmittedForm1Pia(formData, receipt) {
    const projectId = receipt?.docketId || `REQ-2026-FORM1-${Math.floor(10000 + Math.random() * 90000)}`;
    const stored = getStoredConfigs();

    const isDifferent = Boolean(formData.isPiaDifferent);
    let mappedPias = [];

    if (isDifferent && Array.isArray(formData.pias) && formData.pias.length > 0) {
      mappedPias = formData.pias.map((p, idx) => {
        const piaId = p.id || `PIA-FORM1-${idx + 1}`;
        const nodalEmail = p.email || 'nodal.officer@spv-concession.gov.in';
        const domain = nodalEmail.includes('@') ? nodalEmail.split('@')[1] : 'agency.gov.in';
        
        return {
          id: piaId,
          name: p.entityName || `Designated Implementing Agency #${idx + 1}`,
          cinGst: p.cinGstin || 'Pending MCA Verification (Form-I D.2)',
          cinVerified: !!p.cinVerified,
          nodalPerson: p.nodalPerson || formData.nodalOfficerName || 'Nodal Representative',
          nodalEmail: nodalEmail,
          phone: p.contact || formData.nodalOfficerPhone || '+91 98251 02944',
          registeredAddress: `${p.entityName || 'PIA Legal Entity'}, Project Operations Unit, ${formData.selectedDistricts?.[0] || 'Anand'}, ${formData.selectedState || 'Gujarat'}`,
          boardResolutionRef: p.boardResolutionRef || 'Submitted under Form-I Section D',
          delegationLetterUploaded: !!p.documentUploaded,
          delegationStatus: 'Pending Delegation',
          activeUsersCount: 1,
          lastUpdated: 'Just now (Form-I Transmitted)',
          isSubmittedFromForm1: true,
          form1DocketId: receipt?.docketId || projectId,
          associatedUsers: [
            {
              id: `USR-${piaId}-01`,
              name: p.nodalPerson || 'Nodal Officer',
              officialEmail: nodalEmail,
              mobile: p.contact || '+91 98251 02944',
              suggestedDesignation: 'Project Director / Nodal Officer (PIA)',
              assignedDesignation: 'Project Director / Nodal Officer (PIA)',
              currentAccess: 'Pending Delegation',
              delegationStatus: 'Pending',
              isNodal: true
            },
            {
              id: `USR-${piaId}-02`,
              name: 'Er. Rajesh V. Trivedi',
              officialEmail: `rajesh.trivedi@${domain}`,
              mobile: '+91 98711 02931',
              suggestedDesignation: 'Project Engineer',
              assignedDesignation: 'Project Engineer',
              currentAccess: 'Pending Delegation',
              delegationStatus: 'Pending',
              isNodal: false
            },
            {
              id: `USR-${piaId}-03`,
              name: 'Shri Vikram Desai',
              officialEmail: `vikram.desai@${domain}`,
              mobile: '+91 98102 34491',
              suggestedDesignation: 'Project Manager',
              assignedDesignation: 'Project Manager',
              currentAccess: 'Pending Delegation',
              delegationStatus: 'Pending',
              isNodal: false
            },
            {
              id: `USR-${piaId}-04`,
              name: 'Smt. Pooja Mehta',
              officialEmail: `pooja.mehta@${domain}`,
              mobile: '+91 99201 88472',
              suggestedDesignation: 'GIS Surveyor / Technical Officer',
              assignedDesignation: 'GIS Surveyor / Technical Officer',
              currentAccess: 'Pending Delegation',
              delegationStatus: 'Pending',
              isNodal: false
            }
          ]
        };
      });
    }

    const newConfig = {
      projectId,
      projectTitle: formData.projectTitle || formData.projectName || 'Petlad-Sunav Bypass & Freight Corridor',
      proposalId: receipt?.docketId || projectId,
      executingAgency: formData.requisitioningBodyName || 'Roads & Buildings Department, Govt of Gujarat',
      division: `${formData.selectedDistricts?.[0] || 'Anand'} Division / Lead CALA Jurisdiction`,
      piaDifferentFromRB: isDifferent,
      submissionTimestamp: receipt?.submittedAt || new Date().toLocaleString('en-IN') + ' IST',
      isFromForm1Submission: true,
      pias: mappedPias
    };

    stored[projectId] = newConfig;
    saveStoredConfigs(stored);

    // Record Audit entry
    const currentAudits = getStoredAudits() || [...MOCK_AUDIT_TRAIL];
    const auditEntry = {
      id: `AUD-FORM1-${Date.now().toString().slice(-4)}`,
      timestamp: newConfig.submissionTimestamp,
      action: isDifferent 
        ? 'PIA Registration Synchronized from Form-I D.2'
        : 'Direct Execution Recorded (Form-I D.1 = NO)',
      entityName: isDifferent ? (mappedPias[0]?.name || 'SPV Agency') : newConfig.executingAgency,
      targetUser: isDifferent ? (mappedPias[0]?.nodalPerson || 'Nodal Representative') : formData.nodalOfficerName,
      actor: `${formData.nodalOfficerName || 'Authorized Officer'} (${formData.nodalOfficerDesignation || 'Officer'})`,
      details: isDifferent
        ? `Registered ${mappedPias.length} Implementing Agency from Form-I Section D. Docket: ${projectId}. Details populated in Menu 9 Associated PIA box for RBAC delegation.`
        : `Form-I Section D declared NO. Requisitioning Body executes directly. No external PIA configured. Docket: ${projectId}.`,
      status: 'Synchronized'
    };
    saveStoredAudits([auditEntry, ...currentAudits]);

    return newConfig;
  },

  addUserToPia(projectId, piaId, newUser) {
    const stored = getStoredConfigs();
    const config = stored[projectId] || MOCK_PROJECT_PIA_CONFIG[projectId];
    if (!config) return null;

    const targetPia = config.pias?.find(p => p.id === piaId);
    if (!targetPia) return null;

    const userWithId = {
      id: `USR-${piaId}-${Date.now().toString().slice(-4)}`,
      suggestedDesignation: 'Project Engineer',
      assignedDesignation: 'Project Engineer',
      currentAccess: 'Pending Delegation',
      delegationStatus: 'Pending',
      isNodal: false,
      ...newUser
    };

    targetPia.associatedUsers = [...(targetPia.associatedUsers || []), userWithId];
    targetPia.activeUsersCount = targetPia.associatedUsers.length;

    stored[projectId] = { ...config };
    saveStoredConfigs(stored);
    return userWithId;
  },

  getRBWorkspacePermissionSchema() {
    return RB_WORKSPACE_MENUS_SCHEMA;
  },

  getAuditTrail(projectId) {
    const stored = getStoredAudits();
    return stored || MOCK_AUDIT_TRAIL;
  },

  finalizeDelegation(payload) {
    const delegationId = `DEL-CONF-${Date.now().toString().slice(-6)}`;
    const stored = getStoredConfigs();
    const config = stored[payload.projectId] || MOCK_PROJECT_PIA_CONFIG[payload.projectId];

    if (config) {
      const targetPia = config.pias?.find(p => p.name === payload.piaEntity || p.id === payload.piaId);
      if (targetPia) {
        targetPia.delegationStatus = 'Active';
        targetPia.lastUpdated = 'Just now (Finalized)';
        if (targetPia.associatedUsers && payload.people) {
          const delegatedUserIds = payload.people.map(p => p.id);
          targetPia.associatedUsers = targetPia.associatedUsers.map(u => {
            if (delegatedUserIds.includes(u.id)) {
              const matchedPerson = payload.people.find(p => p.id === u.id);
              return {
                ...u,
                currentAccess: 'Active Sub-User (RBAC Delegated)',
                delegationStatus: 'Finalized',
                assignedDesignation: matchedPerson?.assignedDesignation || u.assignedDesignation
              };
            }
            return u;
          });
        }
      }
      stored[payload.projectId] = { ...config };
      saveStoredConfigs(stored);
    }

    // Save audit record
    const currentAudits = getStoredAudits() || [...MOCK_AUDIT_TRAIL];
    const newAuditEntry = {
      id: `AUD-DEL-${Date.now().toString().slice(-4)}`,
      timestamp: payload.finalizedAt,
      action: 'Delegation Finalized & Credentials Queued',
      entityName: payload.piaEntity,
      targetUser: payload.people?.map(p => `${p.name} (${p.assignedDesignation})`).join(', '),
      actor: 'Authorized Requisitioning Officer (RB)',
      details: `Configured sliced sub-user access across ${payload.delegatedMenus?.length || 0} RB workspace menus with field-level permissions.`,
      status: 'Queued for Dispatch'
    };
    saveStoredAudits([newAuditEntry, ...currentAudits]);

    // Dispatch to Backend REST API & Nodemailer for user creation and Gmail dispatch
    try {
      const apiPayload = {
        category: 'PIA_DELEGATION',
        subCategory: 'PROJECT_IMPLEMENTING_AGENCY',
        committeeType: payload.piaEntity,
        role: 'PIA_OFFICER',
        department: payload.piaEntity,
        designation: 'PIA Implementing Officer',
        members: (payload.people || []).map(p => ({
          name: p.name,
          email: p.email || p.officialEmail,
          phone: p.mobile || p.phone,
          role: p.assignedDesignation || 'Project Engineer',
          password: `NLAMS#${Math.floor(1000 + Math.random() * 9000)}P`,
          loginId: p.email || p.officialEmail
        })),
        gazetteOrderNo: payload.delegationOrderRef || `PIA-ORD-${Date.now().toString().slice(-4)}`,
        projectId: payload.projectId,
        projectName: payload.projectName || 'National Infrastructure Project',
        grantedMenus: payload.delegatedMenus || []
      };

      axios.post('/api/v1/appropriate-govt/rbac-provision', apiPayload).catch(e => {
        console.warn('[PiaDelegationService] Async backend dispatch failed:', e.message);
      });
    } catch (err) {
      console.warn('[PiaDelegationService] Failed to trigger backend RBAC sync:', err.message);
    }

    return {
      success: true,
      delegationId,
      timestamp: new Date().toISOString(),
      ...payload
    };
  }
};
