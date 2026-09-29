/**
 * NLAMS - District Collector Service API Layer
 * Mock asynchronous statutory operations for Collector & CALA operations
 */

import {
  MOCK_DISTRICTS,
  MOCK_COLLECTOR_ROLES,
  MOCK_COLLECTOR_PROJECTS,
  MOCK_COLLECTOR_PARCELS,
  MOCK_FORM_I_INWARDS,
  MOCK_RBAC_DELEGATIONS,
  MOCK_SECTION_12_SURVEYS,
  MOCK_SECTION_15_OBJECTIONS,
  MOCK_RNR_DRAFT_SCHEMES,
  MOCK_SECTION_21_CLAIMS,
  MOCK_SECTION_23_AWARDS,
  MOCK_STATUTORY_AUDIT_LOGS
} from './districtCollectorMockData.js';

let localProjects = [...MOCK_COLLECTOR_PROJECTS];
let localParcels = [...MOCK_COLLECTOR_PARCELS];
let localFormI = [...MOCK_FORM_I_INWARDS];
let localDelegations = [...MOCK_RBAC_DELEGATIONS];
let localSurveys = [...MOCK_SECTION_12_SURVEYS];
let localObjections = [...MOCK_SECTION_15_OBJECTIONS];
let localRnrSchemes = [...MOCK_RNR_DRAFT_SCHEMES];
let localClaims = [...MOCK_SECTION_21_CLAIMS];
let localAwards = [...MOCK_SECTION_23_AWARDS];
let localAudit = [...MOCK_STATUTORY_AUDIT_LOGS];

export const DistrictCollectorApi = {
  getDistricts: async () => {
    return Promise.resolve([...MOCK_DISTRICTS]);
  },

  getCollectorRoles: async () => {
    return Promise.resolve([...MOCK_COLLECTOR_ROLES]);
  },

  getProjects: async (districtId) => {
    if (!districtId) return Promise.resolve(localProjects);
    return Promise.resolve(localProjects.filter(p => p.districtId === districtId));
  },

  getParcels: async (projectId) => {
    if (!projectId) return Promise.resolve(localParcels);
    return Promise.resolve(localParcels.filter(p => p.projectId === projectId));
  },

  getFormIInwards: async (districtId) => {
    if (!districtId) return Promise.resolve(localFormI);
    return Promise.resolve(localFormI.filter(f => f.districtId === districtId));
  },

  getRbacDelegations: async () => {
    return Promise.resolve([...localDelegations]);
  },

  getSection12Surveys: async (projectId) => {
    if (!projectId) return Promise.resolve(localSurveys);
    return Promise.resolve(localSurveys.filter(s => s.projectId === projectId));
  },

  getSection15Objections: async (projectId) => {
    if (!projectId) return Promise.resolve(localObjections);
    return Promise.resolve(localObjections.filter(o => o.projectId === projectId));
  },

  getRnrDraftSchemes: async (projectId) => {
    if (!projectId) return Promise.resolve(localRnrSchemes);
    return Promise.resolve(localRnrSchemes.filter(r => r.projectId === projectId));
  },

  getSection21Claims: async (projectId) => {
    if (!projectId) return Promise.resolve(localClaims);
    return Promise.resolve(localClaims.filter(c => c.projectId === projectId));
  },

  getSection23Awards: async (projectId) => {
    if (!projectId) return Promise.resolve(localAwards);
    return Promise.resolve(localAwards.filter(a => a.projectId === projectId));
  },

  getAuditLogs: async () => {
    return Promise.resolve([...localAudit]);
  },

  updateFormIRecommendation: async (id, recommendation, inquiryNotes, officerName) => {
    localFormI = localFormI.map(item => {
      if (item.id === id) {
        return {
          ...item,
          collectorRecommendation: recommendation,
          status: 'FORWARDED_TO_STATE_APPROPRIATE_GOVT',
          inquiryNotes
        };
      }
      return item;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 4(1) Requisition',
      action: 'Form-I Preliminary Inquiry Forwarded',
      officer: officerName || 'District Collector',
      details: `Form-I ${id} inquiry completed with recommendation: ${recommendation}`,
      ipHash: '10.24.112.5 • SHA-256: d83a99...'
    });

    return Promise.resolve(true);
  },

  createRbacDelegation: async (delegation, officerName) => {
    const newDel = {
      id: `DEL-TH-00${localDelegations.length + 1}`,
      orderNumber: `REV/LAQ/SEC3G/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      dateOfOrder: new Date().toISOString().substring(0, 10),
      status: 'ACTIVE',
      dscVerified: true,
      lastAuditCheck: new Date().toISOString().substring(0, 10),
      ...delegation
    };
    localDelegations.unshift(newDel);

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 3(g)',
      action: 'Sub-Delegation Order Issued under Sec 3(g)',
      officer: officerName || 'District Collector',
      details: `Delegated powers to ${newDel.authorizedOfficer} (${newDel.designation}) for ${newDel.assignedProject}`,
      ipHash: '10.24.112.5 • SHA-256: c98a12...'
    });

    return Promise.resolve(newDel);
  },

  recordSection13DamageTender: async (surveyId, damageItem, officerName) => {
    localSurveys = localSurveys.map(s => {
      if (s.id === surveyId) {
        const damages = [...(s.damagesIncurred || []), damageItem];
        const total = damages.reduce((acc, curr) => acc + (curr.tenderedAmount || 0), 0);
        return {
          ...s,
          damagesIncurred: damages,
          totalSec13TenderPaid: total
        };
      }
      return s;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 13',
      action: 'Damage Tender Assessed & Paid on Spot',
      officer: officerName || 'CALA / Tahsildar',
      details: `Paid ₹${damageItem.tenderedAmount} for ${damageItem.item} on survey parcel ${damageItem.khasra}`,
      ipHash: '10.24.112.18 • SHA-256: e82b54...'
    });

    return Promise.resolve(true);
  },

  recordSection15HearingDecision: async (objectionId, decision, orderSummary, officerName) => {
    localObjections = localObjections.map(obj => {
      if (obj.id === objectionId) {
        return {
          ...obj,
          hearingOutcome: decision,
          orderSummary,
          status: 'RECOMMENDATION_SUBMITTED_TO_GOVT'
        };
      }
      return obj;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 15(2)',
      action: 'Section 15 Hearing Order Passed',
      officer: officerName || 'Presiding Officer',
      details: `Objection ${objectionId} disposed with outcome: ${decision}. Order: ${orderSummary}`,
      ipHash: '10.24.112.18 • SHA-256: 44fa91...'
    });

    return Promise.resolve(true);
  },

  forwardRnrDraftScheme: async (schemeId, recommendation, officerName) => {
    localRnrSchemes = localRnrSchemes.map(sch => {
      if (sch.id === schemeId) {
        return {
          ...sch,
          collectorRecommendation: recommendation,
          status: 'FORWARDED_TO_RNR_COMMISSIONER_SEC17'
        };
      }
      return sch;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 16 / 17',
      action: 'Draft R&R Scheme Forwarded to Commissioner',
      officer: officerName || 'District Collector',
      details: `DLRRC scrutinized Draft Scheme ${schemeId} and forwarded to Commissioner R&R with recommendation: ${recommendation}`,
      ipHash: '10.24.112.5 • SHA-256: 89ab31...'
    });

    return Promise.resolve(true);
  },

  verifySection21Claim: async (claimId, scrutinyStatus, notes, officerName) => {
    localClaims = localClaims.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          scrutinyStatus,
          notes
        };
      }
      return c;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 21 / 22',
      action: 'Section 21 Khatedar Claim Scrutinized',
      officer: officerName || 'CALA / SDO',
      details: `Claim ${claimId} marked as ${scrutinyStatus}. Notes: ${notes}`,
      ipHash: '10.24.112.18 • SHA-256: 31cc22...'
    });

    return Promise.resolve(true);
  },

  enforceSection23Award: async (awardId, officerName) => {
    localAwards = localAwards.map(a => {
      if (a.id === awardId) {
        return {
          ...a,
          status: 'AWARD_ENFORCED',
          formVIIStatus: 'SIGNED_AND_PUBLISHED',
          dateOfAward: new Date().toISOString().substring(0, 10),
          sec37NoticeServedCount: a.totalBeneficiaries,
          sec37NoticePendingCount: 0
        };
      }
      return a;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 23 / 30 / 37',
      action: 'Land Acquisition Award Enforced & Sec 37 Notice Issued',
      officer: officerName || 'District Collector',
      details: `Award ${awardId} signed and published under Form VII. Notices dispatched under Sec 37(2).`,
      ipHash: '10.24.112.5 • SHA-256: aa77ef...'
    });

    return Promise.resolve(true);
  },

  executeSection38Possession: async (parcelId, panchnamaData, officerName) => {
    localParcels = localParcels.map(p => {
      if (p.id === parcelId) {
        return {
          ...p,
          statutoryStage: 'POSSESSION_DELIVERED',
          possessionStatus: 'HOTO_EXECUTED',
          mutationStatus: 'MUTATED_IN_GOVT_FAVOR',
          disbursementStatus: 'PAID_DBT',
          disbursedAmount: p.totalCompensation
        };
      }
      return p;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 38',
      action: 'Section 38 Possession Handover Certificate Issued',
      officer: officerName || 'CALA / Tahsildar',
      details: `Vacant possession handed over for Parcel ${parcelId}. Certificate & Panchnama signed with Requisitioning Body.`,
      ipHash: '10.24.112.18 • SHA-256: ff10ab...'
    });

    return Promise.resolve(true);
  },

  recordSection77AuthorityDeposit: async (parcelId, amount, reason, officerName) => {
    localParcels = localParcels.map(p => {
      if (p.id === parcelId) {
        return {
          ...p,
          statutoryStage: 'SECTION_77_AUTHORITY_DEPOSIT',
          disbursementStatus: 'DEPOSITED_IN_LARR_AUTHORITY',
          depositReason: reason,
          disbursedAmount: amount,
          possessionStatus: 'POSSESSION_TAKEN_SEC38'
        };
      }
      return p;
    });

    localAudit.unshift({
      id: `AUDIT-DC-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sectionRef: 'Section 77(2)',
      action: 'Statutory Deposit into LARR Authority Escrow',
      officer: officerName || 'District Collector',
      details: `Deposited compensation ₹${amount} for parcel ${parcelId} into LARR Authority due to: ${reason}`,
      ipHash: '10.24.112.5 • SHA-256: 77bb21...'
    });

    return Promise.resolve(true);
  }
};
