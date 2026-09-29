/**
 * NLAMS - Appropriate Government Mock API Service Adapter
 * Clean abstraction layer separating UI components from backend communication
 * Ready for real backend API endpoints (/api/appropriate-gov/*)
 */
import axios from 'axios';
import {
  APPROPRIATE_GOV_PROJECTS,
  MOCK_COLLECTOR_PROPOSALS,
  MOCK_SIA_LAUNCH_RECORDS,
  MOCK_SECTION_11_RECORDS,
  MOCK_OBJECTIONS_AND_RNR,
  MOCK_SECTION_19_DECLARATIONS,
  MOCK_RBAC_ASSIGNMENTS,
  MOCK_GAZETTE_PUBLICATIONS,
  MOCK_STATE_LAND_BANK_RECORDS
} from './appropriateGovMockData.js';
import { MOCK_PARCELS } from '../../../mock/requisitions.js';

// In-memory clone to simulate mutation and state updates
let stateProjects = [...APPROPRIATE_GOV_PROJECTS];
let stateProposals = [...MOCK_COLLECTOR_PROPOSALS];
let stateSiaRecords = [...MOCK_SIA_LAUNCH_RECORDS];
let stateSec11Records = [...MOCK_SECTION_11_RECORDS];
let stateSec19Records = [...MOCK_SECTION_19_DECLARATIONS];
let stateRbacAssignments = [...MOCK_RBAC_ASSIGNMENTS];
let stateGazetteDocs = [...MOCK_GAZETTE_PUBLICATIONS];
let stateAuditLogs = [
  {
    id: 'AUD-001',
    timestamp: '2025-08-14 17:45:10',
    actor: 'Sh. Rajesh Kumar, IAS',
    role: 'Joint Secretary (MoRTH)',
    workspace: 'Central Appropriate Government',
    project: 'REQ-2025-NHAI-041',
    entity: 'SECTION_11_NOTIFICATION',
    entityId: 'SEC11-NHAI-041',
    action: 'SECTION_11_SIGNED_AND_PUBLISHED',
    oldValue: 'DRAFT_UNDER_REVIEW',
    newValue: 'PUBLISHED_ACTIVE',
    eSignStatus: 'DSC_SHA256_VERIFIED',
    reason: 'Statutory approval accorded post IEG Social Impact clearance',
    reference: 'File No. NHAI/LA/PB/2025/110'
  },
  {
    id: 'AUD-002',
    timestamp: '2025-08-15 09:30:00',
    actor: 'System Automated Workflow',
    role: 'Statutory Gateway Engine',
    workspace: 'Central Appropriate Government',
    project: 'REQ-2025-NHAI-041',
    entity: 'LAND_TRANSACTION_FREEZE',
    entityId: 'FRZ-01',
    action: 'SRO_ENCUMBRANCE_FREEZE_DISPATCHED',
    oldValue: 'UNRESTRICTED',
    newValue: 'FROZEN_CONFIRMED',
    eSignStatus: 'SYSTEM_SEALED',
    reason: 'Section 11(4) statutory bar on sale/mortgage triggered',
    reference: 'API_REQ_SRO_PUNJAB_881920'
  },
  {
    id: 'AUD-003',
    timestamp: '2025-11-12 11:20:00',
    actor: 'Smt. Manisha Patankar, IAS',
    role: 'Principal Secretary (PWD)',
    workspace: 'State Appropriate Government',
    project: 'STATE-2025-MSRDC-012',
    entity: 'SECTION_11_NOTIFICATION',
    entityId: 'SEC11-MSRDC-012',
    action: 'STATE_GAZETTE_EXTRAORDINARY_ISSUED',
    oldValue: 'SCRUTINY',
    newValue: 'PUBLISHED_ACTIVE',
    eSignStatus: 'DSC_VERIFIED',
    reason: 'Approved after verification of Tribal Gram Sabha PESA resolutions',
    reference: 'MH-PWD-LARR-2025-8812'
  }
];

export const AppropriateGovApi = {
  // Projects
  async getProjects(jurisdictionType = 'ALL') {
    if (jurisdictionType === 'ALL') return stateProjects;
    return stateProjects.filter(p => p.jurisdictionType === jurisdictionType);
  },

  async getProjectById(id) {
    return stateProjects.find(p => p.id === id) || null;
  },

  // Proposals
  async getProposals(jurisdictionType = 'ALL') {
    if (jurisdictionType === 'ALL') return stateProposals;
    return stateProposals.filter(p => p.jurisdictionType === jurisdictionType);
  },

  async updateProposalStatus(proposalId, newStatus, reason = '') {
    stateProposals = stateProposals.map(p => {
      if (p.proposalId === proposalId) {
        return { ...p, currentStatus: newStatus, lastStatusUpdate: new Date().toISOString() };
      }
      return p;
    });

    stateAuditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Authorized Officer',
      role: 'Statutory Reviewer',
      workspace: 'Appropriate Government',
      project: proposalId,
      entity: 'COLLECTOR_PROPOSAL',
      entityId: proposalId,
      action: `PROPOSAL_STATUS_CHANGED_TO_${newStatus}`,
      oldValue: 'PREVIOUS_STATE',
      newValue: newStatus,
      eSignStatus: 'VERIFIED',
      reason: reason || 'Statutory review completed in Collector Proposal Inbox',
      reference: `ACTION-${Date.now().toString().slice(-6)}`
    });

    return { success: true, proposalId, newStatus };
  },

  // SIA
  async getSiaRecords(jurisdictionType = 'ALL') {
    if (jurisdictionType === 'ALL') return stateSiaRecords;
    return stateSiaRecords.filter(s => s.jurisdictionType === jurisdictionType);
  },

  async issueSiaStartNotification(payload) {
    const newRecord = {
      id: `SIA-LNCH-${Date.now().toString().slice(-4)}`,
      projectId: payload.projectId,
      projectName: payload.projectName,
      jurisdictionType: payload.jurisdictionType,
      siaAgency: payload.siaAgency,
      collectorName: payload.collectorName,
      notificationDate: new Date().toISOString().split('T')[0],
      surveyStartDate: payload.surveyStartDate,
      slaDeadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysRemaining: 180,
      siaStatus: 'SURVEY_COMMENCED',
      broadcastDispatched: true
    };
    stateSiaRecords.unshift(newRecord);

    stateAuditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: payload.officerName || 'Authorized Officer',
      role: 'Appropriate Government Authority',
      workspace: payload.jurisdictionType === 'CENTRAL' ? 'Central Appropriate Government' : 'State Appropriate Government',
      project: payload.projectId,
      entity: 'SIA_NOTIFICATION',
      entityId: newRecord.id,
      action: 'SIA_START_NOTIFICATION_ISSUED',
      oldValue: 'NOT_INITIATED',
      newValue: 'SURVEY_COMMENCED',
      eSignStatus: 'DSC_SIGNED',
      reason: `Statutory 6-Month SIA launched under Section 4(1) with agency ${payload.siaAgency}`,
      reference: `SIA/NOTIF/${Date.now().toString().slice(-4)}`
    });

    return newRecord;
  },

  // Section 11
  async getSection11Records(jurisdictionType = 'ALL') {
    if (jurisdictionType === 'ALL') return stateSec11Records;
    return stateSec11Records.filter(r => r.jurisdictionType === jurisdictionType);
  },

  async verifyPublicationEvidence(notifId, pubId) {
    stateSec11Records = stateSec11Records.map(r => {
      if (r.id === notifId) {
        const updatedMatrix = r.publicationMatrix.map(m => {
          if (m.id === pubId) {
            return { ...m, status: 'VERIFIED', verifiedAt: new Date().toISOString() };
          }
          return m;
        });
        return { ...r, publicationMatrix: updatedMatrix };
      }
      return r;
    });
    return { success: true };
  },

  async grantFreezeExemption(payload) {
    const exemption = {
      id: `EXEMP-${Date.now().toString().slice(-4)}`,
      ownerName: payload.ownerName,
      ulpin: payload.ulpin,
      khasraNo: payload.khasraNo,
      specialCircumstance: payload.specialCircumstance,
      reason: payload.reason,
      collectorDecision: 'APPROVED_WITH_CONDITIONS',
      decisionDate: new Date().toISOString().split('T')[0],
      writtenOrderDoc: payload.writtenOrderDoc || 'Collector_Exemption_Order.pdf'
    };

    stateSec11Records = stateSec11Records.map(r => {
      if (r.id === payload.notifId) {
        return { ...r, exemptionRecords: [...(r.exemptionRecords || []), exemption] };
      }
      return r;
    });

    stateAuditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'District Collector',
      role: 'Collector / CALA',
      workspace: 'Appropriate Government Portal',
      project: payload.projectId,
      entity: 'SECTION_11_FREEZE_EXEMPTION',
      entityId: exemption.id,
      action: 'FREEZE_EXEMPTION_RECORDED',
      oldValue: 'FROZEN',
      newValue: 'SPECIAL_EXEMPTION_GRANTED',
      eSignStatus: 'DSC_VERIFIED',
      reason: payload.reason,
      reference: `EXEMP-ORD-${Date.now().toString().slice(-4)}`
    });

    return exemption;
  },

  // Objections & R&R
  async getObjectionsAndRnR(projectId) {
    return MOCK_OBJECTIONS_AND_RNR.find(o => o.projectId === projectId) || null;
  },

  // Section 19 Declarations
  async getSection19Declarations(jurisdictionType = 'ALL') {
    if (jurisdictionType === 'ALL') return stateSec19Records;
    return stateSec19Records.filter(d => d.jurisdictionType === jurisdictionType);
  },

  async recordCourtStay(payload) {
    const stayRecord = {
      hasActiveStay: true,
      caseNumber: payload.caseNumber,
      court: payload.court,
      stayPeriodStart: payload.stayPeriodStart,
      stayPeriodEnd: payload.stayPeriodEnd,
      excludedDays: payload.excludedDays,
      vacationOrderDoc: payload.vacationOrderDoc,
      verifiedByStatutoryOfficer: true
    };

    stateSec19Records = stateSec19Records.map(d => {
      if (d.id === payload.declarationId) {
        const adjustedDays = (d.statutoryCountdown.stayExclusionDays || 0) + Number(payload.excludedDays);
        return {
          ...d,
          courtStayExclusion: stayRecord,
          statutoryCountdown: {
            ...d.statutoryCountdown,
            stayExclusionDays: adjustedDays,
            daysRemaining: d.statutoryCountdown.daysRemaining + Number(payload.excludedDays),
            status: 'STAY_EXCLUDED'
          }
        };
      }
      return d;
    });

    stateAuditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Authorized Statutory Officer',
      role: 'Appropriate Government Registrar',
      workspace: 'Appropriate Government',
      project: payload.projectId,
      entity: 'SECTION_19_COURT_STAY',
      entityId: payload.caseNumber,
      action: 'COURT_STAY_PERIOD_EXCLUDED',
      oldValue: 'STANDARD_12_MONTHS',
      newValue: `EXCLUDED_+${payload.excludedDays}_DAYS`,
      eSignStatus: 'VERIFIED',
      reason: `Court injunction order ${payload.caseNumber} registered per Section 19(7) First Proviso`,
      reference: payload.vacationOrderDoc
    });

    return { success: true, stayRecord };
  },

  // RBAC Downstream Provisioning
  async getRbacAssignments(jurisdictionType = 'ALL', category = 'ALL') {
    try {
      const res = await axios.get('/api/v1/appropriate-govt/rbac-assignments', {
        params: { jurisdictionType, category },
        timeout: 4000
      });
      if (res.data?.success && Array.isArray(res.data?.data)) {
        const dbItems = res.data.data;
        const dbCodes = new Set(dbItems.map(d => d.id));
        const filteredMocks = stateRbacAssignments.filter(s => !dbCodes.has(s.id));
        return [...dbItems, ...filteredMocks];
      }
    } catch (err) {
      console.warn('[AppropriateGovApi] Backend getRbacAssignments unreachable, using local cache:', err.message);
    }

    let list = stateRbacAssignments;
    if (jurisdictionType !== 'ALL') {
      list = list.filter(r => r.jurisdictionType === jurisdictionType);
    }
    if (category !== 'ALL') {
      list = list.filter(r => r.category === category);
    }
    return list;
  },

  async provisionRbacAssignment(payload) {
    let savedAssignment = null;

    try {
      const res = await axios.post('/api/v1/appropriate-govt/rbac-provision', payload, {
        timeout: 10000
      });

      if (res.data?.success && res.data?.data) {
        const row = res.data.data;
        savedAssignment = {
          id: row.assignment_code || `RBAC-${row.assignment_id}`,
          category: row.category,
          subCategory: row.sub_category,
          committeeType: row.committee_type,
          role: row.role,
          memberName: row.member_name,
          department: row.department,
          designation: row.designation,
          email: row.email,
          mobile: row.mobile,
          members: row.members || payload.members || [],
          gazetteOrderNo: row.gazette_order_no,
          projectId: row.project_id,
          projectName: row.project_name,
          menuAccess: row.menu_access || payload.menuAccess || {},
          grantedMenus: row.granted_menus || payload.grantedMenus || [],
          temporaryPassword: row.temporary_password || payload.temporaryPassword,
          loginUsername: row.login_username || payload.email,
          dispatchStatus: 'DISPATCHED_TO_GMAIL',
          status: 'PROVISIONED',
          provisionedAt: new Date().toISOString().split('T')[0],
          credentialLoginPlaceholder: `http://localhost:3000/login`,
          emailDispatches: res.data.emailDispatches
        };
      }
    } catch (apiErr) {
      console.warn('[AppropriateGovApi] Backend provision API call failed, falling back to local state:', apiErr.message);
    }

    // Fallback if backend was unreachable
    if (!savedAssignment) {
      savedAssignment = {
        id: payload.id || `RBAC-${payload.category || 'ASGN'}-${Date.now().toString().slice(-4)}`,
        category: payload.category,
        subCategory: payload.subCategory || payload.committeeType,
        jurisdictionType: payload.jurisdictionType,
        committeeType: payload.committeeType,
        role: payload.role,
        memberName: payload.memberName || payload.officialName || payload.agencyName || (payload.members && payload.members[0]?.name) || 'Statutory Member Body',
        department: payload.department,
        designation: payload.designation,
        email: payload.email || (payload.members && payload.members[0]?.email),
        mobile: payload.mobile || (payload.members && payload.members[0]?.phone),
        members: payload.members || [],
        gazetteOrderNo: payload.gazetteOrderNo || `GOI-ORD-${Date.now().toString().slice(-4)}`,
        projectId: payload.projectId,
        projectName: payload.projectName,
        menuAccess: payload.menuAccess || {},
        grantedMenus: payload.grantedMenus || [],
        temporaryPassword: payload.temporaryPassword || `NLAMS#${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        loginUsername: payload.loginUsername || payload.email || `officer.${Date.now().toString().slice(-4)}@nlams.gov.in`,
        dispatchStatus: 'DISPATCHED_TO_GMAIL',
        dispatchedAt: new Date().toISOString(),
        status: 'PROVISIONED',
        provisionedAt: new Date().toISOString().split('T')[0],
        credentialLoginPlaceholder: `http://localhost:3000/login`
      };
    }

    stateRbacAssignments.unshift(savedAssignment);

    stateAuditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Authorized Appropriate Government Officer',
      role: 'Delegation Authority',
      workspace: 'Appropriate Government Access Hub',
      project: payload.projectId,
      entity: 'RBAC_DELEGATION',
      entityId: savedAssignment.id,
      action: `PROVISIONED_DOWNSTREAM_${payload.category}_WORKSPACE`,
      oldValue: 'NO_ACCESS',
      newValue: 'VIEW_AUTHORIZED',
      eSignStatus: 'SYSTEM_DISPATCHED',
      reason: `Downstream workspace provisioned for ${savedAssignment.memberName} with ${savedAssignment.grantedMenus.length || Object.keys(savedAssignment.menuAccess).length} designated menus and Gmail credential dispatch`,
      reference: savedAssignment.gazetteOrderNo
    });

    return savedAssignment;
  },

  // Gazette & Vault
  async getGazetteVault(jurisdictionType = 'ALL') {
    if (jurisdictionType === 'ALL') return stateGazetteDocs;
    return stateGazetteDocs.filter(d => d.jurisdictionType === jurisdictionType);
  },

  // Audit
  async getAuditLogs(projectId = null) {
    if (!projectId) return stateAuditLogs;
    return stateAuditLogs.filter(a => a.project === projectId || a.project === 'ALL_CENTRAL_PROJECTS');
  },

  // Master Parcels (Reused)
  async getParcels() {
    return MOCK_PARCELS;
  }
};
