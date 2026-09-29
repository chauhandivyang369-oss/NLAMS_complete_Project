/**
 * National Land Acquisition & Management System (NLAMS)
 * Independent Expert Group (IEG) Service
 * 
 * Provides domain state, committee structures, review registers, statutory 
 * appraisal criteria, recommendations, and audit lineage for Menus 6, 7, 8, and 9.
 * 
 * Follows RFCTLARR Act 2013 Section 7 statutory appraisal standards.
 */

import { 
  PROJECT_CONTEXT as SURVEY_PROJECT, 
  ALTERNATIVE_SITES, 
  MINIMUM_LAND_ASSESSMENT, 
  COMMUNITY_ASSETS 
} from './siaSurveyService.js';
import { 
  DEFAULT_HEARING_SETUP, 
  HEARING_CONCERN_ITEMS, 
  HEARING_STATEMENTS, 
  HEARING_MINUTES 
} from './siaHearingService.js';
import { 
  SEED_SIMP_IMPACTS, 
  SEED_SIMP_MITIGATIONS 
} from './siaSimpService.js';
import { SEED_CADASTRAL_PARCELS } from './gisService.js';

// ============================================================================
// 1. PROJECT MASTER CONTEXT FOR IEG WORKSPACE
// ============================================================================
export const IEG_PROJECT_CONTEXT = {
  projectId: 'NLAMS-PRJ-2026-0042',
  legacyId: 'NLAMS-DEMO-2026-001',
  projectName: 'Western Regional Dedicated Freight & Multimodal Logistics Corridor (Petlad-Sunav-Nar Segment)',
  projectType: 'Linear Railway & Logistics Infrastructure',
  requiringBody: 'Western Railway / DFCCIL (Ministry of Railways)',
  appropriateGovernment: 'Revenue Department, Government of Gujarat',
  district: 'Anand',
  talukas: ['Petlad'],
  villages: ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'],
  totalParcelsCount: 214,
  totalAcquisitionAreaHa: 250.4,
  gisLinkedAreaHa: 247.9,
  gisAreaDiscrepancyHa: 2.5,
  totalAffectedFamilies: 500,
  verifiedFamiliesCount: 463,
  pendingFamiliesCount: 37,
  displacedFamiliesCount: 42,
  livelihoodImpactedCount: 168,
  communityAssetsCount: 28,
  infrastructureCrossingsCount: 14,
  siaReportId: 'SIA-RPT-2026-0042',
  siaReportVersion: 'v1.0',
  siaReceivedDate: '2026-09-02',
  iegId: 'IEG-2026-017',
  constitutionDate: '2026-09-01',
  configuredReviewPeriodDays: 60,
  daysSinceConstitution: 18,
  daysRemaining: 42,
  deadlineStatus: 'On Track', // On Track | Approaching Deadline | Deadline Reached | Overdue
  iegReviewStatus: 'Under Review', // Received | Under Review | Clarification Required | Ready for Appraisal | Appraisal Complete | Finalised | Submitted
  monitoringImpactTag: 'High Impact — Monitoring Classification'
};

// ============================================================================
// 2. IEG 7-MEMBER COMMITTEE COMPOSITION
// ============================================================================
export const IEG_COMMITTEE_MEMBERS = [
  {
    id: 'MEM-01',
    memberNumber: 1,
    name: 'Prof. (Dr.) Manisha N. Vyas',
    category: 'Social Scientist',
    role: 'Chairperson',
    isChairperson: true,
    designation: 'Senior Professor of Sociology & Public Policy',
    organization: 'Gujarat Institute of Development Research (GIDR)',
    nominationDate: '2026-08-25',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'Completed',
    signatureStatus: 'Pending Final Signing',
    avatar: 'MV'
  },
  {
    id: 'MEM-02',
    memberNumber: 2,
    name: 'Dr. Hitesh R. Pandya',
    category: 'Social Scientist',
    role: 'Member',
    isChairperson: false,
    designation: 'Associate Professor of Social Sciences',
    organization: 'Sardar Patel University, Vallabh Vidyanagar',
    nominationDate: '2026-08-25',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'Completed',
    signatureStatus: 'Confirmed',
    avatar: 'HP'
  },
  {
    id: 'MEM-03',
    memberNumber: 3,
    name: 'Shri Jayeshbhai C. Patel',
    category: 'Panchayat / Gram Sabha / Municipality Representative',
    role: 'Member',
    isChairperson: false,
    designation: 'Former Taluka Panchayat President & Agricultural Delegate',
    organization: 'Petlad Taluka Panchayat Council',
    nominationDate: '2026-08-26',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'Completed',
    signatureStatus: 'Confirmed',
    avatar: 'JP'
  },
  {
    id: 'MEM-04',
    memberNumber: 4,
    name: 'Smt. Leelaben K. Vankar',
    category: 'Panchayat / Gram Sabha / Municipality Representative',
    role: 'Member',
    isChairperson: false,
    designation: 'Elected Gram Panchayat Member & Women Welfare Delegate',
    organization: 'Sunav Village Panchayat',
    nominationDate: '2026-08-26',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'In Progress',
    signatureStatus: 'Pending',
    avatar: 'LV'
  },
  {
    id: 'MEM-05',
    memberNumber: 5,
    name: 'Shri Sureshchandra G. Solanki',
    category: 'Rehabilitation Expert',
    role: 'Member',
    isChairperson: false,
    designation: 'Retired Additional Collector & R&R Commissioner',
    organization: 'Ex-Revenue & Disaster Management Dept., GoG',
    nominationDate: '2026-08-27',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'Completed',
    signatureStatus: 'Confirmed',
    avatar: 'SS'
  },
  {
    id: 'MEM-06',
    memberNumber: 6,
    name: 'Dr. Ananya Sengupta',
    category: 'Rehabilitation Expert',
    role: 'Member',
    isChairperson: false,
    designation: 'Head of Department, Resettlement & Social Development',
    organization: 'Faculty of Social Work, MS University of Baroda',
    nominationDate: '2026-08-27',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'Completed',
    signatureStatus: 'Confirmed',
    avatar: 'AS'
  },
  {
    id: 'MEM-07',
    memberNumber: 7,
    name: 'Er. Dharmesh V. Trivedi',
    category: 'Technical Expert',
    role: 'Member',
    isChairperson: false,
    designation: 'Chief Engineer (Retd.) & GIS/Spatial Infrastructure Specialist',
    organization: 'Ex-Gujarat Infrastructure Development Board',
    nominationDate: '2026-08-28',
    constitutionDate: '2026-09-01',
    conflictDeclaration: 'Declared — No Conflict of Interest',
    conflictStatus: 'Cleared',
    accessStatus: 'Active',
    assessmentStatus: 'Completed',
    signatureStatus: 'Confirmed',
    avatar: 'DT'
  }
];

// ============================================================================
// 3. DASHBOARD KPI DATA & PROJECT QUEUE (MENU 6)
// ============================================================================
export const IEG_KPI_DATA = {
  reportsReceived: 12,
  pendingReview: 3,
  daysSinceConstitution: 18,
  daysRemaining: 42,
  projectsUnderReview: 4,
  highImpactProjects: 2,
  evidenceCompleteness: {
    required: 120,
    available: 114,
    missing: 6,
    percentage: 95.0
  }
};

export const IEG_PROJECT_QUEUE = [
  {
    projectId: 'NLAMS-PRJ-2026-0042',
    projectName: 'Western Regional Dedicated Freight & Multimodal Logistics Corridor (Petlad-Sunav-Nar Segment)',
    requiringBody: 'Western Railway / DFCCIL',
    siaVersion: 'v1.0',
    receivedDate: '02/09/2026',
    reviewStage: 'Statutory Appraisal',
    reviewStatus: 'Under Review',
    evidenceCompleteness: 95,
    clarificationStatus: '1 Open, 2 Resolved',
    assignedMembersCount: 7,
    highImpactTag: true,
    lastActivity: '19/09/2026 14:10',
    priority: 'High'
  },
  {
    projectId: 'NLAMS-PRJ-2026-0038',
    projectName: 'Narmada Canal Branch Distributary Line Network Expansion #9',
    requiringBody: 'Sardar Sarovar Narmada Nigam Ltd (SSNNL)',
    siaVersion: 'v1.2',
    receivedDate: '24/08/2026',
    reviewStage: 'Evidence Review',
    reviewStatus: 'Clarification Required',
    evidenceCompleteness: 88,
    clarificationStatus: '3 Awaiting SIA Response',
    assignedMembersCount: 7,
    highImpactTag: false,
    lastActivity: '18/09/2026 17:45',
    priority: 'Medium'
  },
  {
    projectId: 'NLAMS-PRJ-2026-0049',
    projectName: 'Vadodara-Anand Greenfield Expressway Interchange & Service Loop',
    requiringBody: 'National Highways Authority of India (NHAI)',
    siaVersion: 'v1.0',
    receivedDate: '08/09/2026',
    reviewStage: 'Initial Review',
    reviewStatus: 'Received',
    evidenceCompleteness: 91,
    clarificationStatus: 'None Raised',
    assignedMembersCount: 7,
    highImpactTag: true,
    lastActivity: '15/09/2026 11:20',
    priority: 'High'
  },
  {
    projectId: 'NLAMS-PRJ-2026-0027',
    projectName: 'Tarapur 400kV Ultra High Voltage Substation & Transmission Grid Corridor',
    requiringBody: 'Gujarat Energy Transmission Corporation (GETCO)',
    siaVersion: 'v2.0',
    receivedDate: '12/08/2026',
    reviewStage: 'Finalisation',
    reviewStatus: 'Ready for Appraisal',
    evidenceCompleteness: 98,
    clarificationStatus: 'All Resolved',
    assignedMembersCount: 7,
    highImpactTag: false,
    lastActivity: '19/09/2026 09:30',
    priority: 'Low'
  }
];

export const IEG_PENDING_ACTIONS = [
  {
    id: 'ACT-01',
    projectId: 'NLAMS-PRJ-2026-0042',
    action: 'Verify biometric panchnama for 37 tenant cultivator families',
    category: 'Missing Evidence',
    priority: 'High',
    assignedTo: 'Shri Sureshchandra G. Solanki',
    dueDate: '22/09/2026',
    status: 'Pending Verification'
  },
  {
    id: 'ACT-02',
    projectId: 'NLAMS-PRJ-2026-0042',
    action: 'Clarification response review: GIS corridor area 2.5 ha boundary discrepancy',
    category: 'Clarification Request',
    priority: 'High',
    assignedTo: 'Er. Dharmesh V. Trivedi',
    dueDate: '21/09/2026',
    status: 'Response Received'
  },
  {
    id: 'ACT-03',
    projectId: 'NLAMS-PRJ-2026-0042',
    action: 'Member appraisal submission on Less-Displacing Alternatives',
    category: 'Member Assessment Pending',
    assignedTo: 'Smt. Leelaben K. Vankar',
    dueDate: '23/09/2026',
    status: 'Draft in Progress'
  },
  {
    id: 'ACT-04',
    projectId: 'NLAMS-PRJ-2026-0042',
    action: 'Confirm SIMP escrow budget allocation of ₹42.74 Cr with District Collectorate',
    category: 'Unreviewed Section',
    priority: 'Medium',
    assignedTo: 'Prof. (Dr.) Manisha N. Vyas',
    dueDate: '24/09/2026',
    status: 'Awaiting Bank Guarantee Confirmation'
  }
];

// ============================================================================
// 4. DISCREPANCY & CLARIFICATION WORKFLOW REGISTERS (MENU 7)
// ============================================================================
export const INITIAL_DISCREPANCIES = [
  {
    discrepancyId: 'DISC-001',
    projectId: 'NLAMS-PRJ-2026-0042',
    siaVersion: 'v1.0',
    module: 'Family Census (Menu 2)',
    recordId: 'FAM-001 to FAM-500',
    claim: '500 affected families enumerated and fully verified under Section 4(1).',
    observedEvidence: '463 family survey schedules contain verified Aadhaar/Voter ID; 37 families are marked as pending joint physical verification with Talati.',
    difference: '37 unverified family claims',
    severity: 'High',
    iegObservation: 'The 37 families are mostly tenant labourers on Survey 143/145. SIA agency must submit Talati panchnama certifying their >3 year land dependence.',
    evidenceReferences: ['EV-1021', 'EV-1032', 'EV-1098'],
    status: 'Clarification Requested', // Open | Clarification Requested | Response Received | Under Review | Resolved | Accepted with Observation
    createdBy: 'Dr. Ananya Sengupta (Rehabilitation Expert)',
    createdAt: '08/09/2026 14:30',
    resolution: null,
    resolvedBy: null,
    resolvedAt: null
  },
  {
    discrepancyId: 'DISC-002',
    projectId: 'NLAMS-PRJ-2026-0042',
    siaVersion: 'v1.0',
    module: 'GIS & Land Parcel Area (Menu 2/GIS)',
    recordId: 'PARCELS-ALL (214 Polygons)',
    claim: 'Total proposed acquisition area is 250.40 Hectares as stated in Executive Summary Chapter 1.',
    observedEvidence: 'Sum of 214 PostGIS polygon boundary intersections with cadastral map yields exactly 247.90 Hectares.',
    difference: '2.50 Hectares discrepancy between text table and spatial geometry',
    severity: 'High',
    iegObservation: 'The 2.50 ha difference corresponds to railway siding buffer at Petlad yard. Requires clarification whether siding is part of Section 4(1) or existing railway right of way.',
    evidenceReferences: ['GIS-LAYER-01', 'CAD-SHP-2026-04'],
    status: 'Response Received',
    createdBy: 'Er. Dharmesh V. Trivedi (Technical Expert)',
    createdAt: '09/09/2026 11:15',
    resolution: 'Western Railway confirmed 2.50 ha is existing railway land already in possession; private land to be acquired is strictly 247.90 ha.',
    resolvedBy: 'Er. Dharmesh V. Trivedi',
    resolvedAt: '18/09/2026 16:00'
  },
  {
    discrepancyId: 'DISC-003',
    projectId: 'NLAMS-PRJ-2026-0042',
    siaVersion: 'v1.0',
    module: 'Public Hearing & Community Tubewell (Menu 3)',
    recordId: 'COMM-001 / HEAR-0047',
    claim: 'Petlad Ward 4 community borewell serving 320 households relocated without cost to local municipal council.',
    observedEvidence: 'SIMP Section 6 budget table shows ₹35 Lakh allocated, but no written consent from Gujarat Water Resources Dev Corp (GWRDC) attached in Annexure 7.',
    difference: 'Missing inter-agency execution undertaking',
    severity: 'Medium',
    iegObservation: 'Mandatory GWRDC technical feasibility approval and drilling permit must be placed on record before Section 7 appraisal conclusion.',
    evidenceReferences: ['EV-4012', 'HEAR-MIN-01'],
    status: 'Resolved',
    createdBy: 'Shri Jayeshbhai C. Patel (Panchayat Rep)',
    createdAt: '10/09/2026 15:45',
    resolution: 'Executive Engineer GWRDC submitted Letter No. GWRDC/PET/2026/114 approving replacement site on Municipal Survey No. 412.',
    resolvedBy: 'Prof. (Dr.) Manisha N. Vyas',
    resolvedAt: '17/09/2026 12:30'
  }
];

export const INITIAL_CLARIFICATIONS = [
  {
    requestId: 'CLAR-001',
    projectId: 'NLAMS-PRJ-2026-0042',
    module: 'GIS & Land Requirement',
    recordId: 'PARCEL-CAD-PETLAD-01',
    question: 'Please clarify whether the 2.50 Ha difference between SIA narrative (250.40 Ha) and GIS polygon sum (247.90 Ha) represents private land or existing Railway right-of-way.',
    reason: 'Prevent excess notification of private land under Section 11 and avoid litigation.',
    evidenceReference: 'GIS-LAYER-01',
    requestedBy: 'Er. Dharmesh V. Trivedi',
    requestedAt: '09/09/2026 11:30',
    responseDue: '16/09/2026',
    responseReceivedAt: '15/09/2026 16:20',
    responseText: 'Western Railway Construction Division confirmed via letter WRC/BRC/LA/2026/89 that 2.50 Ha is existing railway operational land at Petlad Junction yard. Private acquisition is 247.90 Ha.',
    status: 'Response Received' // Draft | Sent | Response Received | Under Review | Closed
  },
  {
    requestId: 'CLAR-002',
    projectId: 'NLAMS-PRJ-2026-0042',
    module: 'Family Census & Livelihood',
    recordId: 'FAM-004, FAM-007, FAM-008',
    question: 'Please submit certified Talati panchnama for the 37 unverified agricultural tenant families to confirm continuous 3-year dependency as per Section 3(c) of the Act.',
    reason: 'Statutory entitlement under Second Schedule requires verifiable evidence of livelihood loss.',
    evidenceReference: 'EV-1021',
    requestedBy: 'Dr. Ananya Sengupta',
    requestedAt: '08/09/2026 15:00',
    responseDue: '20/09/2026',
    responseReceivedAt: null,
    responseText: null,
    status: 'Sent'
  },
  {
    requestId: 'CLAR-003',
    projectId: 'NLAMS-PRJ-2026-0042',
    module: 'SIMP & Environmental Mitigation',
    recordId: 'SIMP-ENV-02',
    question: 'Provide Forest Department tripartite MoU for planting 1,200 compensatory shade trees along the Sunav-Nar corridor buffer strip.',
    reason: 'Ensure compliance with State environmental green belt statutory stipulations.',
    evidenceReference: 'DOC-ENV-2026-01',
    requestedBy: 'Shri Sureshchandra G. Solanki',
    requestedAt: '11/09/2026 10:15',
    responseDue: '25/09/2026',
    responseReceivedAt: '18/09/2026 11:00',
    responseText: 'Deputy Conservator of Forests, Anand confirmed formal social forestry estimate and sanction letter No. DCF/AND/2026/418 attached.',
    status: 'Closed'
  }
];

// ============================================================================
// 5. EVIDENCE REPOSITORY INDEX (MENU 7)
// ============================================================================
export const EVIDENCE_ITEMS_INDEX = [
  {
    evidenceId: 'EV-1021',
    type: 'Interview Evidence',
    relatedRecord: 'FAM-004 (Bhikhabhai Vankar)',
    sourceModule: 'Menu 2 (Census)',
    description: 'Audio recording and signed tenant affidavit regarding 12 years tobacco harvesting on Survey 143.',
    uploadedBy: 'N. K. Solanki (GIDR Field Sociologist)',
    uploadedAt: '14/02/2026 15:30',
    gps: '22.4731° N, 72.8021° E',
    status: 'Verified',
    fileSize: '4.2 MB'
  },
  {
    evidenceId: 'EV-1032',
    type: 'Photograph',
    relatedRecord: 'FAM-001 (Rameshwar Patel)',
    sourceModule: 'Menu 2 (Displacement)',
    description: 'Geo-tagged photographic proof of RCC residential structure directly intersecting railway track centreline.',
    uploadedBy: 'D. M. Vaghela (GIS Surveyor)',
    uploadedAt: '12/02/2026 11:10',
    gps: '22.4789° N, 72.8104° E',
    status: 'Verified',
    fileSize: '6.8 MB'
  },
  {
    evidenceId: 'EV-1098',
    type: 'Land Record',
    relatedRecord: 'Survey No. 142/A, ULPIN 24051234567890',
    sourceModule: 'Menu 2 (Land)',
    description: 'E-Dhara digitized Record of Rights (7/12 extract) and Village Form 6 Mutation Register.',
    uploadedBy: 'Talati-cum-Mantri Petlad',
    uploadedAt: '10/02/2026 09:45',
    gps: '22.4750° N, 72.8080° E',
    status: 'Verified',
    fileSize: '1.5 MB'
  },
  {
    evidenceId: 'EV-4012',
    type: 'Hearing Record',
    relatedRecord: 'PH-2026-001 (Public Hearing)',
    sourceModule: 'Menu 3 (Public Hearing)',
    description: 'Full unedited 4K video recording of Section 5 Public Hearing proceedings at Town Hall, Petlad (Parts 1-4).',
    uploadedBy: 'Information & PR Dept, Anand',
    uploadedAt: '28/02/2026 19:00',
    gps: '22.4745° N, 72.8015° E',
    status: 'Verified',
    fileSize: '1.4 GB (SHA-256 Sealed)'
  },
  {
    evidenceId: 'EV-4015',
    type: 'Technical Note',
    relatedRecord: 'COMM-001 (Tubewell) / COMM-003 (Muktidham)',
    sourceModule: 'Menu 4 (SIMP)',
    description: 'Executive Engineer structural drawings showing 3.0m masonry retaining wall along Nar cremation ground.',
    uploadedBy: 'DFCCIL Civil Engineering Unit',
    uploadedAt: '03/03/2026 14:00',
    gps: '22.4690° N, 72.7950° E',
    status: 'Verified',
    fileSize: '8.4 MB'
  },
  {
    evidenceId: 'EV-5022',
    type: 'Geo-tagged Observation',
    relatedRecord: 'Alternative Site Option B vs Proposed Option A',
    sourceModule: 'Menu 2 (Alternatives)',
    description: 'Drone orthomosaic comparison overlay showing prime double-crop agricultural land along Option B arc.',
    uploadedBy: 'GIDR GIS Remote Sensing Team',
    uploadedAt: '18/02/2026 16:20',
    gps: '22.4820° N, 72.8150° E',
    status: 'Verified',
    fileSize: '24.1 MB'
  }
];

export const SEED_EVIDENCE_ITEMS = EVIDENCE_ITEMS_INDEX;

export const DOCUMENTS_INDEX = [
  {
    docId: 'DOC-01',
    docType: 'SIA Report',
    name: 'Final_SIA_Report_22_Chapters_GIDR_Petlad_v1.0.pdf',
    version: 'v1.0',
    source: 'Menu 5 (Final SIA Report)',
    uploadedBy: 'Dr. Sudhir K. Dave (GIDR)',
    uploadedAt: '02/09/2026 11:30',
    relatedSection: 'All 22 Chapters',
    fileSize: '14.8 MB',
    status: 'Under Review'
  },
  {
    docId: 'DOC-02',
    docType: 'Administrative Approval',
    name: 'Govt_Approval_MoR_DFCCIL_WRC_Alignment_Sanction.pdf',
    version: 'v1.0',
    source: 'Menu 1 (Form-I / Requiring Body)',
    uploadedBy: 'Ministry of Railways / DFCCIL',
    uploadedAt: '15/01/2026 10:00',
    relatedSection: 'Chapter 2 (Project Description)',
    fileSize: '3.2 MB',
    status: 'Verified'
  },
  {
    docId: 'DOC-03',
    docType: 'Public Hearing Minutes',
    name: 'Certified_Minutes_Signed_SDM_GIDR_Petlad_28Feb2026.pdf',
    version: 'v1.0',
    source: 'Menu 3 (Public Hearing)',
    uploadedBy: 'SDM & Competent Authority, Petlad',
    uploadedAt: '02/03/2026 17:00',
    relatedSection: 'Chapter 14 (Public Hearing)',
    fileSize: '5.1 MB',
    status: 'Verified'
  },
  {
    docId: 'DOC-04',
    docType: 'SIMP Document',
    name: 'Social_Impact_Management_Plan_SIMP_Detailed_Budget.pdf',
    version: 'v1.0',
    source: 'Menu 4 (SIMP Builder)',
    uploadedBy: 'SIA Unit, GIDR',
    uploadedAt: '28/08/2026 16:45',
    relatedSection: 'Chapter 17 (SIMP & Entitlements)',
    fileSize: '7.9 MB',
    status: 'Verified'
  }
];

// ============================================================================
// 6. SECTION 7 STATUTORY APPRAISAL CRITERIA & MEMBER ASSESSMENTS (MENU 8)
// ============================================================================
// Note: 6 Section 7 Criteria Matrix + Member Assessments
export const STATUTORY_CRITERIA_DEFINITIONS = [
  {
    id: 'crit-1',
    code: 'CRIT-01',
    number: 1,
    title: 'Legitimate Public Purpose Validation',
    statutoryBasis: 'Section 7(4) / Section 2(1) RFCTLARR Act 2013',
    statutoryReference: 'Section 7(2)(a) & Section 2(1)(a) RFCTLARR Act 2013',
    isStatutoryCriterion: true,
    committeeRating: 'Confirmed',
    consensusPercentage: 100,
    keyFindings: 'The proposed freight corridor qualifies under Section 2(1)(a) of RFCTLARR Act 2013 as a strategic public infrastructure and dedicated railway freight corridor directly executed by the Ministry of Railways. Administrative approvals from Central and State Governments are verified on record.',
    evidenceReferences: ['DOC-02', 'EV-1098', 'GAZ-01'],
    assessmentOptions: ['Supports', 'Does Not Support', 'Insufficient Evidence', 'Clarification Required']
  },
  {
    id: 'crit-2',
    code: 'CRIT-02',
    number: 2,
    title: 'Bare Minimum Land Extent Requirement',
    statutoryBasis: 'Section 7(4) / Section 8(1)(a) RFCTLARR Act 2013',
    statutoryReference: 'Section 7(2)(b) & Section 8(1)(a) RFCTLARR Act 2013',
    isStatutoryCriterion: true,
    committeeRating: 'Needs Reduction',
    consensusPercentage: 85.7,
    proposedExtentHa: 250.40,
    recommendedExtentHa: 247.90,
    reductionExtentHa: 2.50,
    keyFindings: 'Corridor alignment width restricted to 45m double-stack container clearance. 2.50 Ha in Petlad Yard identified as existing Western Railway operational land; recommended for deduction from private acquisition, bringing net required land to 247.90 Ha.',
    evidenceReferences: ['GIS-LAYER-01', 'EV-4015', 'CLAR-001'],
    assessmentOptions: ['Supports', 'Does Not Support', 'Insufficient Evidence', 'Clarification Required']
  },
  {
    id: 'crit-3',
    code: 'CRIT-03',
    number: 3,
    title: 'Feasibility of Less-Displacing Alternatives',
    statutoryBasis: 'Section 7(4) / Section 8(1)(b) RFCTLARR Act 2013',
    statutoryReference: 'Section 7(2)(b) & Section 8(1)(b) RFCTLARR Act 2013',
    isStatutoryCriterion: true,
    committeeRating: 'Feasible & Justified',
    consensusPercentage: 100,
    keyFindings: 'Alternative Northern Arc Option B was assessed and found to displace 118 additional families and acquire 42 hectares of multi-crop canal-irrigated farmland. Proposed Option A follows existing rail corridor contours and is demonstrably the least-displacing practical alignment.',
    evidenceReferences: ['EV-5022', 'SIA-CH-12', 'DOC-01'],
    assessmentOptions: ['Supports', 'Does Not Support', 'Insufficient Evidence', 'Clarification Required']
  },
  {
    id: 'crit-4',
    code: 'CRIT-04',
    number: 4,
    title: 'SIA Methodology & Procedural Integrity',
    statutoryBasis: 'Section 7(2) & Section 4 Rules RFCTLARR Act 2013',
    statutoryReference: 'Section 7(2) & Section 4 RFCTLARR Act 2013',
    isStatutoryCriterion: true,
    committeeRating: 'Validated',
    consensusPercentage: 100,
    keyFindings: 'SIA census covered 100% of affected land parcels (218 survey numbers across 5 villages). Public hearings in Sunav, Palaj, and Petlad conducted with required 3-week prior notice, 318 recorded attendees, bilingual minutes, and unedited video logs verified with SHA-256 integrity hashes.',
    evidenceReferences: ['EV-4012', 'DOC-03', 'CLAR-003'],
    assessmentOptions: ['Evidence Sufficient', 'Evidence Insufficient', 'Clarification Required']
  },
  {
    id: 'crit-5',
    code: 'CRIT-05',
    number: 5,
    title: 'Adequacy of SIMP & Mitigation Budget',
    statutoryBasis: 'Section 7(2)(c) & Section 6 RFCTLARR Act 2013',
    statutoryReference: 'Section 7(2)(c) & Section 6 RFCTLARR Act 2013',
    isStatutoryCriterion: true,
    committeeRating: 'Adequate',
    consensusPercentage: 85.7,
    keyFindings: 'SIMP allocates ₹14.80 Cr across 28 mitigation measures, including cattle underpasses, GWRDC community tubewell relocation, and ₹42.74 Cr R&R entitlements. Recommendation conditioned on Western Railway finalizing tenant panchnama before Section 19 declaration.',
    evidenceReferences: ['DOC-04', 'EV-1021', 'EV-1032'],
    assessmentOptions: ['Supports', 'Does Not Support', 'Insufficient Evidence', 'Clarification Required']
  },
  {
    id: 'crit-6',
    code: 'CRIT-06',
    number: 6,
    title: 'Overall Social Cost vs. Social Benefit Determination',
    statutoryBasis: 'Section 7(4) RFCTLARR Act 2013',
    statutoryReference: 'Section 7(4) RFCTLARR Act 2013',
    isStatutoryCriterion: true,
    committeeRating: 'Benefits Outweigh Costs',
    consensusPercentage: 100,
    keyFindings: 'While 500 families (84 severely impacted) face land acquisition or economic disruption, the provision of Second Schedule rehabilitation entitlements, relocation of displaced families to municipal gaothan plots, and ₹14.80 Cr SIMP mitigate adverse impacts. Long-term national logistical efficiency and economic connectivity substantially outweigh local disruption.',
    evidenceReferences: ['DOC-01', 'DOC-04', 'EV-1098'],
    assessmentOptions: ['Supports', 'Does Not Support', 'Insufficient Evidence', 'Clarification Required']
  }
];

// Criteria Appraisal Map (by Criterion Code)
export const INITIAL_CRITERIA_ASSESSMENTS_MAP = {
  'crit-1': {
    assessment: 'Supports',
    reason: 'The proposed freight corridor qualifies under Section 2(1)(a) of RFCTLARR Act 2013 as a strategic public infrastructure and railway transport corridor directly executed by the Ministry of Railways. Administrative approvals from Central and State Governments are on record.',
    evidenceReferences: ['DOC-02 (Govt Approval)', 'EV-1098 (RoR Extracts)'],
    documentsAttached: ['MoR_DFCCIL_WRC_Alignment_Sanction.pdf'],
    comments: 'Public purpose is unambiguous. Economic benefit to western freight logistics verified.'
  },
  'crit-2': {
    assessment: 'Supports',
    reason: 'While 500 families and 42 residential structures are affected, the Section 6 SIMP provides ₹42.74 Cr in statutory compensation, gaothan resettlement plots, and livelihood annuities that mitigate quantifiable social costs. Long-term benefits to national logistics outweigh local disruption.',
    evidenceReferences: ['DOC-04 (SIMP)', 'EV-1032 (Housing Photos)', 'EV-1021 (Labour Census)'],
    documentsAttached: ['SIMP_Mitigation_Matrix.pdf'],
    comments: 'Strict condition imposed: DBT payment of First Schedule and Second Schedule compensation must occur prior to physical possession.'
  },
  'crit-3': {
    assessment: 'Supports',
    reason: 'Alignment engineering verified by Technical Expert. Right-of-Way restricted to standard 45m double-stack container clearance. 2.50 Ha discrepancy resolved as existing railway operational land. Net private acquisition is bare minimum at 247.90 Ha.',
    evidenceReferences: ['GIS-LAYER-01', 'EV-4015', 'CLAR-001 Response'],
    documentsAttached: ['Engineering_Cross_Section_45m_ROW.pdf'],
    comments: 'Bare minimum land condition satisfied. No residential buffer land included beyond 45m boundary.'
  },
  'crit-4': {
    assessment: 'Supports',
    reason: 'Alternative Northern Arc Option B was evaluated and found to displace 118 additional families and acquire 42 hectares of multi-crop canal-irrigated farmland. Proposed Option A follows existing rail corridor contours and minimizes agricultural disruption.',
    evidenceReferences: ['EV-5022 (Drone Overlay)', 'SIA-CH-12-Table'],
    documentsAttached: ['Alternative_Alignment_Comparison_Matrix.pdf'],
    comments: 'Option A is demonstrably the least-displacing practical alignment.'
  },
  'crit-5': {
    assessment: 'Evidence Sufficient',
    reason: '318 attendees recorded in Section 5 Public Hearing; video, minutes, and participant registries verified with SHA-256 hashes. Clarifications CLAR-001 and CLAR-003 satisfactorily addressed. Talati panchnama for 37 tenant labourers scheduled prior to award.',
    evidenceReferences: ['EV-4012 (Hearing Video)', 'DOC-03 (Minutes)', 'CLAR-001', 'CLAR-003'],
    documentsAttached: ['Integrity_Checklist_Report.pdf'],
    comments: 'Data integrity layer meets statutory due diligence standards.'
  }
};

// 7-Member Individual Committee Appraisal Register (Menu 8)
export const INITIAL_COMMITTEE_APPRAISAL = [
  {
    id: 'MEM-01',
    memberNumber: 1,
    memberName: 'Prof. (Dr.) Manisha N. Vyas',
    role: 'Chairperson',
    category: 'Social Scientist',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend',
    appraisalDate: '19/09/2026',
    signatureStatus: 'Confirmed (DSC SHA-256)',
    individualRemarks: 'Strategic freight corridor qualifies under Section 2(1)(a). SIMP mitigations adequately funded at ₹42.74 Cr. Unanimously supported.'
  },
  {
    id: 'MEM-02',
    memberNumber: 2,
    memberName: 'Dr. Hitesh R. Pandya',
    role: 'Member',
    category: 'Social Scientist',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend',
    appraisalDate: '18/09/2026',
    signatureStatus: 'Confirmed (DSC SHA-256)',
    individualRemarks: 'National economic interest established. Second schedule entitlements verified for vulnerable households.'
  },
  {
    id: 'MEM-03',
    memberNumber: 3,
    memberName: 'Shri Jayeshbhai C. Patel',
    role: 'Member',
    category: 'Panchayat / Gram Sabha Representative',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend with Conditions',
    appraisalDate: '18/09/2026',
    signatureStatus: 'Confirmed (DSC SHA-256)',
    individualRemarks: 'Subject to GWRDC tubewell relocation and irrigation syphon construction prior to physical civil works.'
  },
  {
    id: 'MEM-04',
    memberNumber: 4,
    memberName: 'Smt. Leelaben K. Vankar',
    role: 'Member',
    category: 'Panchayat / Gram Sabha Representative',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend with Conditions',
    appraisalDate: '19/09/2026',
    signatureStatus: 'Awaiting Final Signature',
    individualRemarks: 'Awaiting final panchnama verification for 37 landless agricultural tenant labourers in Sunav village.'
  },
  {
    id: 'MEM-05',
    memberNumber: 5,
    memberName: 'Shri Sureshchandra G. Solanki',
    role: 'Member',
    category: 'Rehabilitation Expert',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend',
    appraisalDate: '17/09/2026',
    signatureStatus: 'Confirmed (DSC SHA-256)',
    individualRemarks: 'Resettlement colony layout on municipal gaothan land verified. All entitlements conform to Second Schedule.'
  },
  {
    id: 'MEM-06',
    memberNumber: 6,
    memberName: 'Dr. Ananya Sengupta',
    role: 'Member',
    category: 'Rehabilitation Expert',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend',
    appraisalDate: '19/09/2026',
    signatureStatus: 'Confirmed (DSC SHA-256)',
    individualRemarks: 'Vulnerable family rehabilitation program is comprehensive. Field census and demographic schedules authenticated.'
  },
  {
    id: 'MEM-07',
    memberNumber: 7,
    memberName: 'Er. Dharmesh V. Trivedi',
    role: 'Member',
    category: 'Technical Expert',
    criteriaEvaluation: {
      publicPurpose: true,
      minimumLand: true,
      simpAdequate: true,
      alternativesFeasible: true,
      costBenefitFavorable: true
    },
    overallVote: 'Recommend',
    appraisalDate: '18/09/2026',
    signatureStatus: 'Confirmed (DSC SHA-256)',
    individualRemarks: 'Corridor restricted to 45m ROW. GIS boundary reconciliation for 2.50 Ha railway yard operational land accepted.'
  }
];

// Attach criteria appraisals to the array for backward compatibility
Object.assign(INITIAL_COMMITTEE_APPRAISAL, INITIAL_CRITERIA_ASSESSMENTS_MAP);

// 7-Member Individual Assessment Register
export const INITIAL_MEMBER_ASSESSMENTS = {
  'MEM-01': { // Chairperson - Social Scientist
    memberName: 'Prof. (Dr.) Manisha N. Vyas',
    memberCategory: 'Social Scientist',
    overallStatus: 'Completed',
    lastUpdated: '19/09/2026 11:40',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'Strategic railway utility meets Section 2(1)(a).' },
      'crit-2': { status: 'Supports', reason: 'SIMP mitigations are adequately funded with ₹42.74 Cr escrow.' },
      'crit-3': { status: 'Supports', reason: 'ROW restricted to 45m bare minimum standard.' },
      'crit-4': { status: 'Supports', reason: 'Option A displaces fewer families than Northern Arc.' },
      'crit-5': { status: 'Evidence Sufficient', reason: 'Hearing minutes and video evidence authenticated.' }
    }
  },
  'MEM-02': { // Social Scientist
    memberName: 'Dr. Hitesh R. Pandya',
    memberCategory: 'Social Scientist',
    overallStatus: 'Completed',
    lastUpdated: '18/09/2026 16:30',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'National economic interest and connectivity substantiated.' },
      'crit-2': { status: 'Supports', reason: 'Second Schedule entitlements properly budgeted for vulnerable groups.' },
      'crit-3': { status: 'Supports', reason: 'No excess buffer land found.' },
      'crit-4': { status: 'Supports', reason: 'Alternatives analysis scientifically sound.' },
      'crit-5': { status: 'Evidence Sufficient', reason: 'SIA methodology adhered to Section 4 guidelines.' }
    }
  },
  'MEM-03': { // Panchayat Rep
    memberName: 'Shri Jayeshbhai C. Patel',
    memberCategory: 'Panchayat / Gram Sabha / Municipality Representative',
    overallStatus: 'Completed',
    lastUpdated: '18/09/2026 15:10',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'Local agro-industrial freight transport will benefit farmers.' },
      'crit-2': { status: 'Supports', reason: 'Subject to GWRDC tubewell relocation and irrigation syphon construction.' },
      'crit-3': { status: 'Supports', reason: 'Land extent verified through field inspections.' },
      'crit-4': { status: 'Supports', reason: 'Alternative Option B would destroy fertile Charotar tobacco fields.' },
      'crit-5': { status: 'Evidence Sufficient', reason: 'Gram Panchayat representations formally addressed in SIMP.' }
    }
  },
  'MEM-04': { // Panchayat Rep
    memberName: 'Smt. Leelaben K. Vankar',
    memberCategory: 'Panchayat / Gram Sabha / Municipality Representative',
    overallStatus: 'In Progress',
    lastUpdated: '19/09/2026 10:15',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'Project accepted by village elders.' },
      'crit-2': { status: 'Clarification Required', reason: 'Awaiting final panchnama list for 37 landless labourers in Sunav.' },
      'crit-3': { status: 'Supports', reason: 'Land boundaries verified.' },
      'crit-4': { status: 'Supports', reason: 'Current alignment is preferable.' },
      'crit-5': { status: 'Clarification Required', reason: 'Labourer documentation pending.' }
    }
  },
  'MEM-05': { // Rehabilitation Expert
    memberName: 'Shri Sureshchandra G. Solanki',
    memberCategory: 'Rehabilitation Expert',
    overallStatus: 'Completed',
    lastUpdated: '17/09/2026 14:00',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'Statutory basis valid.' },
      'crit-2': { status: 'Supports', reason: 'Resettlement layout on municipal gaothan land is viable.' },
      'crit-3': { status: 'Supports', reason: '45m corridor conforms to Railway manual standards.' },
      'crit-4': { status: 'Supports', reason: 'Least-displacing alternative verified.' },
      'crit-5': { status: 'Evidence Sufficient', reason: 'R&R entitlements adhere strictly to Second Schedule.' }
    }
  },
  'MEM-06': { // Rehabilitation Expert
    memberName: 'Dr. Ananya Sengupta',
    memberCategory: 'Rehabilitation Expert',
    overallStatus: 'Completed',
    lastUpdated: '19/09/2026 09:45',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'Public purpose well-established.' },
      'crit-2': { status: 'Supports', reason: 'Vulnerable family rehabilitation program is comprehensive.' },
      'crit-3': { status: 'Supports', reason: 'Corridor width restricted to essentials.' },
      'crit-4': { status: 'Supports', reason: 'Zero residential displacement in adjacent fallow alternative.' },
      'crit-5': { status: 'Evidence Sufficient', reason: 'Field surveys and demographic schedules cross-verified.' }
    }
  },
  'MEM-07': { // Technical Expert
    memberName: 'Er. Dharmesh V. Trivedi',
    memberCategory: 'Technical Expert',
    overallStatus: 'Completed',
    lastUpdated: '18/09/2026 17:00',
    assessments: {
      'crit-1': { status: 'Supports', reason: 'Freight corridor network integration verified.' },
      'crit-2': { status: 'Supports', reason: 'Structural underpasses mitigate cart track severance.' },
      'crit-3': { status: 'Supports', reason: 'GIS polygon boundary verified; 2.5 ha discrepancy reconciled.' },
      'crit-4': { status: 'Supports', reason: 'Geotechnical and track gradient parameters optimal on Option A.' },
      'crit-5': { status: 'Evidence Sufficient', reason: 'Cadastral GIS overlays and drone imagery robust.' }
    }
  }
};

// ============================================================================
// 7. FINAL RECOMMENDATION & AUDIT STATE (MENU 9)
// ============================================================================
export const RECOMMENDATION_CHOICES = [
  {
    id: 'RECOMMEND_PROCEED',
    label: 'Recommend proceeding subject to findings',
    statutoryContext: 'Section 7(5) recommendation for project to proceed with stipulated conditions and SIMP execution.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'RECOMMEND_MINIMUM_LAND',
    label: 'Recommend minimum-land / less-displacing assessment',
    statutoryContext: 'Section 7(5) recommendation requiring requiring body to restrict acquisition to modified bare minimum boundaries.',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    id: 'RETURN_CLARIFICATION',
    label: 'Return for clarification',
    statutoryContext: 'Return SIA report to requiring body/SIA agency for further survey, field evidence, or modification.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'RECOMMEND_ABANDONMENT',
    label: 'Recommend abandonment',
    statutoryContext: 'Section 7(5) formal recommendation that the project should be abandoned due to unmitigated adverse social costs or lack of public purpose.',
    badgeColor: 'bg-red-100 text-red-900 border-red-300'
  }
];

export const INITIAL_FINAL_RECOMMENDATION = {
  selectedOption: 'RECOMMEND_PROCEED',
  reasons: `1. The Independent Expert Group (IEG) constituted under Section 7(1) of the RFCTLARR Act 2013 has thoroughly reviewed the 22-chapter Social Impact Assessment (SIA) report, cadastral GIS data, Section 5 Public Hearing minutes, and the Section 6 Social Impact Management Plan (SIMP) for the Western Regional Dedicated Freight & Multimodal Logistics Corridor (Petlad-Sunav-Nar Segment).

2. The project serves an undeniable Public Purpose under Section 2(1)(a) of the Act as a vital railway freight transport infrastructure linking regional agricultural and industrial markets to Western ports.

3. The proposed acquisition extent of 247.90 Hectares across 214 cadastral parcels represents the bare minimum land required for a 45m standard freight Right-of-Way, following reconciliation of the 2.50 Ha railway operational buffer.

4. Comparative evaluation of alternative alignments confirms that Option A minimizes residential displacement (42 families vs 160 in Option B) and spares fertile multi-crop canal-irrigated farmland to the maximum extent technically possible.

5. The adverse social impacts are adequately addressed through the ₹42.74 Cr SIMP budget, providing for gaothan rehabilitation plots, structural reconstruction, replacement of community tubewells, and mandatory annuities for vulnerable landless agricultural labourers.`,
  
  conditions: [
    {
      conditionNumber: 'COND-001',
      category: 'R&R & Compensation',
      conditionText: 'Direct Benefit Transfer (DBT) of full compensation under First Schedule and resettlement allowances under Second Schedule must be credited before taking physical possession.',
      statutoryJustification: 'Section 7(5) & Section 38 RFCTLARR Act',
      responsibleAgency: 'Collector / Western Railway',
      complianceDeadline: 'Prior to physical possession under Section 38',
      verificationMechanism: 'PFMS DBT Scroll Verification & Collector Certification',
      status: 'Binding on Requiring Body'
    },
    {
      conditionNumber: 'COND-002',
      category: 'Community Assets & Water',
      conditionText: 'Replacement community borewell in Petlad Ward 4 must be fully operational prior to decommissioning of the existing borewell.',
      statutoryJustification: 'Section 7(5) & Section 6(1) SIMP Mandate',
      responsibleAgency: 'Petlad Municipality / Western Railway',
      complianceDeadline: 'Prior to civil site clearance',
      verificationMechanism: 'Municipal Chief Officer Joint Panchnama',
      status: 'Binding on Requiring Body'
    },
    {
      conditionNumber: 'COND-003',
      category: 'Irrigation & Drainage',
      conditionText: 'Construction of the Inverted Syphon Aqueduct at Ch. 11+600 and Vehicular Underpass at Ch. 13+400 must commence in the dry season before earth filling.',
      statutoryJustification: 'Section 7(5) & Irrigation Right-of-Way Protection',
      responsibleAgency: 'G-RIDE / Gujarat Water Resources (GWRDC)',
      complianceDeadline: 'Phase 1 Civil Works',
      verificationMechanism: 'Executive Engineer GWRDC Quality Inspection',
      status: 'Binding on Requiring Body'
    },
    {
      conditionNumber: 'COND-004',
      category: 'Livelihood & Tenant Census',
      conditionText: 'Revenue authorities must complete verification panchnama for the 37 landless tenant families before passing the Section 11 preliminary notification.',
      statutoryJustification: 'Section 7(5) & Section 11(1) RFCTLARR Act',
      responsibleAgency: 'Sub-Divisional Magistrate (Petlad)',
      complianceDeadline: 'Prior to Section 11 Gazette Publication',
      verificationMechanism: 'SDM Certified Landless Labourer Schedule',
      status: 'Binding on Requiring Body'
    }
  ],

  evidenceReferences: [
    'SIA-RPT-2026-0042 (Final SIA Report)',
    'PH-2026-001 (Certified Public Hearing Minutes)',
    'SIMP-2026-01 (Social Impact Management Plan)',
    'CAD-GIS-2026-042 (Cadastral Parcel Map)',
    'CLAR-001 & CLAR-003 Resolution Notes'
  ],

  additionalRemarks: 'The Committee unanimously recommends that the Appropriate Government accept the SIA report and proceed with statutory proceedings under Section 8, subject to strict adherence to the four stipulated conditions.',
  version: 'Final v1.0',
  signatureStatus: 'Partially Signed (5/7 Members)',
  submissionStatus: 'Ready for Submission'
};

// 18+ Comprehensive Immutable Append-Only Audit Trail
export const INITIAL_IEG_AUDIT_TRAIL = [
  {
    auditId: 'AUD-IEG-001',
    user: 'System Admin (GoG)',
    role: 'ADMIN',
    action: 'CONSTITUTION_RECORDED',
    timestamp: '01/09/2026 10:00:12',
    ip: '10.24.112.5 (Govt Intranet)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'IEG_COMMITTEE',
    entityId: 'IEG-2026-017',
    oldValue: 'None',
    newValue: '7 Members Nominated vide Order RD/SIA/IEG/2026/09',
    document: 'Notification_Gazette_IEG_Constitution.pdf',
    digitalSignature: 'SHA256:d8a21f7e9b04...',
    reason: 'Statutory constitution under Section 7(1) of RFCTLARR Act 2013.'
  },
  {
    auditId: 'AUD-IEG-002',
    user: 'SIA Officer (Dr. Sudhir K. Dave)',
    role: 'SIA_AGENCY',
    action: 'SUBMIT_TO_IEG',
    timestamp: '02/09/2026 11:32:45',
    ip: '14.139.122.18 (GIDR Ahmedabad)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'SIA_REPORT',
    entityId: 'SIA-RPT-2026-0042',
    oldValue: 'Status: Generated v1.0',
    newValue: 'Status: Submitted to IEG (Receipt REC-NLAMS-2026-9841)',
    document: 'Final_SIA_Report_22_Chapters_GIDR_Petlad_v1.0.pdf',
    digitalSignature: 'SHA256:7f83b1657ff1...',
    reason: 'Formal transmission of finalized 22-chapter SIA and SIMP for statutory appraisal.'
  },
  {
    auditId: 'AUD-IEG-003',
    user: 'Prof. (Dr.) Manisha N. Vyas',
    role: 'IEG_CHAIRPERSON',
    action: 'LOGIN',
    timestamp: '02/09/2026 14:05:10',
    ip: '14.139.122.19 (GIDR Ahmedabad)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'SESSION',
    entityId: 'SESS-7841',
    oldValue: null,
    newValue: 'Authenticated via Aadhaar OTP & Password',
    document: null,
    digitalSignature: null,
    reason: 'Commenced initial review of SIA Report SIA-RPT-2026-0042.'
  },
  {
    auditId: 'AUD-IEG-004',
    user: 'Prof. (Dr.) Manisha N. Vyas',
    role: 'IEG_CHAIRPERSON',
    action: 'VIEW',
    timestamp: '02/09/2026 14:12:00',
    ip: '14.139.122.19',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'SIA_REPORT',
    entityId: 'SIA-RPT-2026-0042',
    oldValue: null,
    newValue: 'Inspected Executive Summary, Chapter 1 & Chapter 2',
    document: 'SIA-RPT-2026-0042.pdf',
    digitalSignature: null,
    reason: 'Initial preliminary review of public purpose claims.'
  },
  {
    auditId: 'AUD-IEG-005',
    user: 'Dr. Ananya Sengupta',
    role: 'IEG_MEMBER',
    action: 'OPEN_RECORD',
    timestamp: '08/09/2026 11:20:30',
    ip: '14.139.120.44 (MSU Baroda)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'FAMILY_CENSUS',
    entityId: 'FAM-001 to FAM-500',
    oldValue: null,
    newValue: 'Inspected 500 family demographic records and livelihood tables',
    document: null,
    digitalSignature: null,
    reason: 'Cross-verifying tenant farmer inclusion in Sunav and Demol.'
  },
  {
    auditId: 'AUD-IEG-006',
    user: 'Dr. Ananya Sengupta',
    role: 'IEG_MEMBER',
    action: 'VIEW_EVIDENCE',
    timestamp: '08/09/2026 11:45:12',
    ip: '14.139.120.44',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'EVIDENCE',
    entityId: 'EV-1021',
    oldValue: null,
    newValue: 'Viewed tenant affidavit for Bhikhabhai Vankar (FAM-004)',
    document: 'labour_dependence_affidavit_vankar.pdf',
    digitalSignature: null,
    reason: 'Examining livelihood dependency proof.'
  },
  {
    auditId: 'AUD-IEG-007',
    user: 'Dr. Ananya Sengupta',
    role: 'IEG_MEMBER',
    action: 'FLAG_DISCREPANCY',
    timestamp: '08/09/2026 14:30:00',
    ip: '14.139.120.44',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'DISCREPANCY',
    entityId: 'DISC-001',
    oldValue: 'Status: Unflagged',
    newValue: 'Flagged: 37 unverified family claims in census roster',
    document: null,
    digitalSignature: null,
    reason: 'Identified gap between 500 reported families and 463 biometric-verified records.'
  },
  {
    auditId: 'AUD-IEG-008',
    user: 'Dr. Ananya Sengupta',
    role: 'IEG_MEMBER',
    action: 'REQUEST_CLARIFICATION',
    timestamp: '08/09/2026 15:00:22',
    ip: '14.139.120.44',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'CLARIFICATION',
    entityId: 'CLAR-002',
    oldValue: null,
    newValue: 'Transmitted request to SIA Agency regarding Talati panchnama',
    document: null,
    digitalSignature: null,
    reason: 'Statutory verification of agricultural labour status.'
  },
  {
    auditId: 'AUD-IEG-009',
    user: 'Er. Dharmesh V. Trivedi',
    role: 'IEG_MEMBER',
    action: 'VIEW_GIS',
    timestamp: '09/09/2026 10:15:40',
    ip: '117.218.44.12 (Ahmedabad)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'GIS_PARCEL',
    entityId: 'PARCEL-CAD-PETLAD-01',
    oldValue: null,
    newValue: 'Rendered 214 parcel polygons with Esri Satellite overlay',
    document: null,
    digitalSignature: null,
    reason: 'Verifying corridor boundary buffers and canal intersections.'
  },
  {
    auditId: 'AUD-IEG-010',
    user: 'Er. Dharmesh V. Trivedi',
    role: 'IEG_MEMBER',
    action: 'FLAG_DISCREPANCY',
    timestamp: '09/09/2026 11:15:05',
    ip: '117.218.44.12',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'DISCREPANCY',
    entityId: 'DISC-002',
    oldValue: null,
    newValue: 'Flagged: 2.50 Ha variance between text (250.4 ha) and GIS (247.9 ha)',
    document: null,
    digitalSignature: null,
    reason: 'Potential GIS area calculation discrepancy.'
  },
  {
    auditId: 'AUD-IEG-011',
    user: 'Er. Dharmesh V. Trivedi',
    role: 'IEG_MEMBER',
    action: 'REQUEST_CLARIFICATION',
    timestamp: '09/09/2026 11:30:10',
    ip: '117.218.44.12',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'CLARIFICATION',
    entityId: 'CLAR-001',
    oldValue: null,
    newValue: 'Transmitted request to Western Railway regarding yard buffer',
    document: null,
    digitalSignature: null,
    reason: 'Seeking clarification on private vs existing railway right-of-way.'
  },
  {
    auditId: 'AUD-IEG-012',
    user: 'Shri Jayeshbhai C. Patel',
    role: 'IEG_MEMBER',
    action: 'VIEW_EVIDENCE',
    timestamp: '10/09/2026 14:00:15',
    ip: '103.24.11.89 (Petlad Taluka)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'EVIDENCE',
    entityId: 'EV-4012',
    oldValue: null,
    newValue: 'Played Section 5 Public Hearing recording (Part 2: Water issues)',
    document: null,
    digitalSignature: null,
    reason: 'Reviewing citizen testimony regarding drinking water tubewell.'
  },
  {
    auditId: 'AUD-IEG-013',
    user: 'Shri Jayeshbhai C. Patel',
    role: 'IEG_MEMBER',
    action: 'FLAG_DISCREPANCY',
    timestamp: '10/09/2026 15:45:00',
    ip: '103.24.11.89',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'DISCREPANCY',
    entityId: 'DISC-003',
    oldValue: null,
    newValue: 'Flagged missing GWRDC relocation consent for COMM-001',
    document: null,
    digitalSignature: null,
    reason: 'Required statutory inter-agency undertaking missing from Annexure 7.'
  },
  {
    auditId: 'AUD-IEG-014',
    user: 'Western Railway (Exec Engineer)',
    role: 'REQUIRING_BODY',
    action: 'RESPOND_CLARIFICATION',
    timestamp: '15/09/2026 16:20:00',
    ip: '10.150.22.10 (Railnet Vadodara)',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'CLARIFICATION',
    entityId: 'CLAR-001',
    oldValue: 'Status: Sent',
    newValue: 'Status: Response Received (Confirmed 2.50 Ha is existing yard land)',
    document: 'WRC_Letter_LA_2026_89.pdf',
    digitalSignature: 'SHA256:3b9a1120f5...',
    reason: 'Official transmittal of railway yard demarcation clarification.'
  },
  {
    auditId: 'AUD-IEG-015',
    user: 'Prof. (Dr.) Manisha N. Vyas',
    role: 'IEG_CHAIRPERSON',
    action: 'SAVE_ASSESSMENT',
    timestamp: '17/09/2026 11:20:00',
    ip: '14.139.122.19',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'STATUTORY_APPRAISAL',
    entityId: 'crit-1',
    oldValue: 'Assessment: In Progress',
    newValue: 'Assessment: Supports (Public Purpose established under Sec 2(1))',
    document: null,
    digitalSignature: null,
    reason: 'Completed statutory evaluation of public purpose criterion.'
  },
  {
    auditId: 'AUD-IEG-016',
    user: 'Er. Dharmesh V. Trivedi',
    role: 'IEG_MEMBER',
    action: 'SAVE_ASSESSMENT',
    timestamp: '18/09/2026 16:00:00',
    ip: '117.218.44.12',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'STATUTORY_APPRAISAL',
    entityId: 'crit-3',
    oldValue: 'Assessment: In Progress',
    newValue: 'Assessment: Supports (Bare Minimum Land of 247.90 Ha verified)',
    document: null,
    digitalSignature: null,
    reason: 'Resolved DISC-002 based on railway clarification and GIS geometry.'
  },
  {
    auditId: 'AUD-IEG-017',
    user: 'Prof. (Dr.) Manisha N. Vyas',
    role: 'IEG_CHAIRPERSON',
    action: 'FINALISE_ASSESSMENT',
    timestamp: '19/09/2026 12:00:00',
    ip: '14.139.122.19',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'COMMITTEE_CONSOLIDATION',
    entityId: 'APPRAISAL-CONSOL-01',
    oldValue: 'Status: Member Assessments in Progress',
    newValue: 'Status: Consolidated Findings Finalized by Chairperson',
    document: 'Consolidated_Section_7_Appraisal_Report.pdf',
    digitalSignature: 'SHA256:5a91b2c4d8e...',
    reason: 'Compiled member assessments into statutory committee finding.'
  },
  {
    auditId: 'AUD-IEG-018',
    user: 'Dr. Hitesh R. Pandya',
    role: 'IEG_MEMBER',
    action: 'MEMBER_CONFIRMATION',
    timestamp: '19/09/2026 14:15:30',
    ip: '14.139.122.45',
    projectId: 'NLAMS-PRJ-2026-0042',
    entityType: 'RECOMMENDATION',
    entityId: 'IEG-REC-2026-0042',
    oldValue: 'Signature: Pending',
    newValue: 'Signature: Confirmed (e-Sign Stamp Applied)',
    document: null,
    digitalSignature: 'SHA256:99c104e8...',
    reason: 'Confirmed endorsement of Section 7 Recommendation report.'
  }
];

// Recommendation Version Lineage
export const RECOMMENDATION_VERSIONS = [
  {
    version: 'Draft v0.1',
    status: 'Archived',
    createdBy: 'Prof. (Dr.) Manisha N. Vyas (Chairperson)',
    createdAt: '12/09/2026 17:00',
    changeSummary: 'Initial compilation of Section 7 observations following preliminary review.'
  },
  {
    version: 'Draft v0.2',
    status: 'Archived',
    createdBy: 'Er. Dharmesh V. Trivedi & Dr. Ananya Sengupta',
    createdAt: '16/09/2026 14:30',
    changeSummary: 'Incorporated resolved railway yard GIS clarification and SIMP tubewell condition.'
  },
  {
    version: 'Final v1.0',
    status: 'Active (Signing)',
    createdBy: 'IEG Committee Consensus',
    createdAt: '19/09/2026 12:30',
    changeSummary: 'Finalized recommendation to proceed subject to 4 statutory conditions; endorsed by 5/7 members.'
  }
];
