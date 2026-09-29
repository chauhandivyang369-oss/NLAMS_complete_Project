/**
 * NLAMS - Appropriate Government Master Mock Data Repository
 * Reuses canonical NLAMS projects, parcels, ULPINs, and adds statutory Appropriate Government layers
 */

import { MOCK_PROJECTS, MOCK_PARCELS } from '../../../mock/requisitions.js';

// Extended Projects with Jurisdiction and Appropriate Government Metadata
export const APPROPRIATE_GOV_PROJECTS = [
  // 1. Central Multi-State Linear Project (MoRTH / NHAI)
  {
    ...MOCK_PROJECTS[0],
    id: 'REQ-2025-NHAI-041',
    jurisdictionType: 'CENTRAL',
    ministryDept: 'Ministry of Road Transport and Highways (MoRTH)',
    centralDepartment: 'National Highways Authority of India (NHAI)',
    specialEnactment: 'National Highways Act 1956 (Sec 3A/3D / RFCTLARR Sched I-III)',
    projectCategory: 'National High-Speed Economic Corridor (Multi-State)',
    states: ['Punjab', 'Haryana'],
    districts: ['Ambala', 'Patiala', 'Ludhiana'],
    stateSegments: [
      { state: 'Punjab', districts: ['Patiala', 'Ludhiana'], totalAreaHa: 218.40, collectorAssigned: 'Deputy Commissioner, Patiala' },
      { state: 'Haryana', districts: ['Ambala'], totalAreaHa: 124.45, collectorAssigned: 'Deputy Commissioner, Ambala' }
    ],
    proposalStatus: 'ACCEPTED_ROUTED',
    sec11Status: 'PUBLISHED',
    sec11Date: '2025-08-14',
    sec11GazetteNo: 'CG-DL-E-14082025-248901',
    sec15Status: 'REPORT_SUBMITTED',
    sec15ObjectionsTotal: 48,
    sec15ObjectionsResolved: 37,
    rrStatus: 'SCHEME_APPROVED_BY_COMMISSIONER',
    sec19Status: 'UNDER_PREPARATION',
    sec19Eligible: true,
    sec19Deadline: '2026-11-20',
    stayExclusionDays: 45, // 45 days excluded due to High Court interim injunction
    extensionDays: 0,
    requiredDepositCr: 540.00,
    depositedAmountCr: 540.00,
    depositVerificationStatus: 'VERIFIED',
    depositGateway: 'PFMS_CNA',
    nmcMonitoringActive: true,
    nmcMeetingDate: '2026-08-10',
    statutoryTimers: {
      sec11PublishedAt: '2025-08-14',
      sec19OriginalDeadline: '2026-08-14',
      sec19AdjustedDeadline: '2026-11-20',
      daysRemaining: 66,
      status: 'WARNING'
    }
  },

  // 2. Central Multi-District Rail Corridor (Ministry of Railways / DFCCIL)
  {
    ...MOCK_PROJECTS[1],
    id: 'REQ-2025-DFCC-019',
    jurisdictionType: 'CENTRAL',
    ministryDept: 'Ministry of Railways',
    centralDepartment: 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
    specialEnactment: 'Railways Act 1989 (Sec 20A/20E / RFCTLARR Sched I-III)',
    projectCategory: 'National Rail Infrastructure (Multi-District)',
    states: ['Uttar Pradesh'],
    districts: ['Kanpur Dehat', 'Fatehpur'],
    stateSegments: [
      { state: 'Uttar Pradesh', districts: ['Kanpur Dehat', 'Fatehpur'], totalAreaHa: 184.20, collectorAssigned: 'District Magistrate, Kanpur Dehat' }
    ],
    proposalStatus: 'ACCEPTED_ROUTED',
    sec11Status: 'PUBLISHED',
    sec11Date: '2026-01-21',
    sec11GazetteNo: 'CG-UP-E-21012026-904122',
    sec15Status: 'HEARINGS_IN_PROGRESS',
    sec15ObjectionsTotal: 31,
    sec15ObjectionsResolved: 12,
    rrStatus: 'DRAFT_SCHEME_UNDER_SCRUTINY',
    sec19Status: 'AWAITING_RR_APPROVAL',
    sec19Eligible: false,
    sec19Deadline: '2027-01-21',
    stayExclusionDays: 0,
    extensionDays: 0,
    requiredDepositCr: 240.00,
    depositedAmountCr: 120.00,
    depositVerificationStatus: 'PARTIALLY_DEPOSITED',
    depositGateway: 'CNA_ESCROW',
    nmcMonitoringActive: true,
    nmcMeetingDate: '2026-07-25',
    statutoryTimers: {
      sec11PublishedAt: '2026-01-21',
      sec19OriginalDeadline: '2027-01-21',
      sec19AdjustedDeadline: '2027-01-21',
      daysRemaining: 120,
      status: 'NORMAL'
    }
  },

  // 3. Central Single-State Green Energy (Ministry of Power / SECI)
  {
    ...MOCK_PROJECTS[2],
    id: 'REQ-2024-SECI-082',
    jurisdictionType: 'CENTRAL',
    ministryDept: 'Ministry of New and Renewable Energy',
    centralDepartment: 'Solar Energy Corporation of India (SECI)',
    specialEnactment: 'RFCTLARR Act 2013 Direct Route',
    projectCategory: 'Strategic Renewable Energy Park',
    states: ['Madhya Pradesh'],
    districts: ['Rewa', 'Satna'],
    stateSegments: [
      { state: 'Madhya Pradesh', districts: ['Rewa', 'Satna'], totalAreaHa: 98.40, collectorAssigned: 'Collector & DM, Rewa' }
    ],
    proposalStatus: 'ACCEPTED_ROUTED',
    sec11Status: 'PUBLISHED',
    sec11Date: '2024-11-05',
    sec11GazetteNo: 'CG-MP-E-05112025-110294',
    sec15Status: 'DISPOSED_100_PERCENT',
    sec15ObjectionsTotal: 19,
    sec15ObjectionsResolved: 19,
    rrStatus: 'RNR_AWARD_CONCLUDED',
    sec19Status: 'PUBLISHED',
    sec19DeclarationNo: 'SEC19-SECI-MP-2025-08',
    sec19Deadline: '2025-11-05',
    stayExclusionDays: 0,
    extensionDays: 0,
    requiredDepositCr: 142.80,
    depositedAmountCr: 142.80,
    depositVerificationStatus: 'VERIFIED',
    depositGateway: 'PFMS',
    nmcMonitoringActive: false,
    statutoryTimers: {
      sec11PublishedAt: '2024-11-05',
      sec19OriginalDeadline: '2025-11-05',
      sec19AdjustedDeadline: '2025-11-05',
      daysRemaining: 0,
      status: 'COMPLETED'
    }
  },

  // 4. State Multi-District Mega Project (Maharashtra PWD / MSRDC)
  {
    id: 'STATE-2025-MSRDC-012',
    code: 'MSRDC-EXPR-FDR',
    name: 'Maharashtra Samruddhi Corridor Phase-II Feeder Spur (Thane-Nashik Connect)',
    jurisdictionType: 'STATE',
    executingAgency: 'Maharashtra State Road Development Corporation (MSRDC)',
    stateDepartment: 'Public Works Department (PWD), Government of Maharashtra',
    state: 'Maharashtra',
    states: ['Maharashtra'],
    districts: ['Thane', 'Nashik'],
    tehsils: ['Shahapur', 'Igatpuri', 'Sinnar'],
    villagesCount: 18,
    totalAreaHa: 245.60,
    acquiredAreaHa: 110.20,
    currentStage: 'sec_11',
    stageLabel: 'Section 11(1) Preliminary Notification',
    statutoryDeadline: '2026-11-30',
    daysRemaining: 68,
    lapseRisk: 'medium',
    financialSanctionCr: 410.00,
    escrowDepositedCr: 410.00,
    disbursedCr: 95.00,
    beneficiariesCount: 890,
    displacedFamiliesCount: 114,
    objectionsTotal: 26,
    objectionsResolved: 18,
    gazetteStatus: 'State e-Gazette Extra-I Published',
    gazetteNo: 'MH-GOV-GAZ-2025-NOV-8812',
    gazetteDate: '12-Nov-2025',
    formIStatus: 'Certified & Approved',
    surveyCadastralStatus: '100% Geo-referenced Bhu-Naksha',
    proposalStatus: 'ACCEPTED_ROUTED',
    sec11Status: 'PUBLISHED',
    sec11Date: '2025-11-12',
    sec11GazetteNo: 'MH-GOV-GAZ-2025-NOV-8812',
    sec15Status: 'OBJECTIONS_HEARING_ACTIVE',
    rrStatus: 'DRAFT_SCHEME_SUBMITTED',
    sec19Status: 'INELIGIBLE_PENDING_RR_APPROVAL',
    sec19Eligible: false,
    sec19Deadline: '2026-11-12',
    stayExclusionDays: 0,
    extensionDays: 0,
    requiredDepositCr: 410.00,
    depositedAmountCr: 410.00,
    depositVerificationStatus: 'VERIFIED',
    depositGateway: 'STATE_TREASURY_ESCROW',
    smcMonitoringActive: true,
    smcMeetingDate: '2026-08-20',
    foodSecurityCheck: {
      irrigatedMultiCropHa: 14.2,
      maxAllowedHa: 38.0,
      status: 'COMPLIANT_WITHIN_LIMIT',
      equivalentWastelandAllotted: 'Yes (Plot 81, Igatpuri Ghats 16.5 Ha)'
    },
    pesaScheduledArea: {
      isTribalArea: true,
      panchayatsInvolved: ['Igatpuri Tribal Gram Sabha', 'Kasara Khurd'],
      gramSabhaResolutionObtained: true,
      resolutionDate: '2025-09-18'
    },
    statutoryTimers: {
      sec11PublishedAt: '2025-11-12',
      sec19OriginalDeadline: '2026-11-12',
      sec19AdjustedDeadline: '2026-11-12',
      daysRemaining: 50,
      status: 'WARNING'
    }
  },

  // 5. State Multi-District Industrial Corridor (Uttar Pradesh PWD / UPSIDA)
  {
    id: 'STATE-2025-UPPWD-034',
    code: 'UP-BUNDEL-FEEDER',
    name: 'Bundelkhand Defence & Industrial Feeder Link Expressway',
    jurisdictionType: 'STATE',
    executingAgency: 'Uttar Pradesh State Industrial Development Authority (UPSIDA)',
    stateDepartment: 'Infrastructure & Industrial Development Department, Govt of UP',
    state: 'Uttar Pradesh',
    states: ['Uttar Pradesh'],
    districts: ['Jhansi', 'Banda'],
    tehsils: ['Garautha', 'Baberu'],
    villagesCount: 22,
    totalAreaHa: 310.80,
    acquiredAreaHa: 48.00,
    currentStage: 'sec_11',
    stageLabel: 'Section 11(1) Scrutiny & Freeze',
    statutoryDeadline: '2026-12-15',
    daysRemaining: 83,
    lapseRisk: 'low',
    financialSanctionCr: 520.00,
    escrowDepositedCr: 520.00,
    disbursedCr: 30.00,
    beneficiariesCount: 1120,
    displacedFamiliesCount: 84,
    objectionsTotal: 42,
    objectionsResolved: 15,
    gazetteStatus: 'UP State e-Gazette Issued',
    gazetteNo: 'UP-GOV-EXTRA-2026-03-4410',
    gazetteDate: '15-Mar-2026',
    formIStatus: 'Verified by Collector Jhansi',
    surveyCadastralStatus: '94% Completed DILRMP',
    proposalStatus: 'ACCEPTED_ROUTED',
    sec11Status: 'PUBLISHED',
    sec11Date: '2026-03-15',
    sec11GazetteNo: 'UP-GOV-EXTRA-2026-03-4410',
    sec15Status: '60_DAY_WINDOW_OPEN',
    rrStatus: 'CENSUS_SURVEY_IN_PROGRESS',
    sec19Status: 'AWAITING_SECTION_15',
    sec19Eligible: false,
    sec19Deadline: '2027-03-15',
    stayExclusionDays: 0,
    extensionDays: 0,
    requiredDepositCr: 520.00,
    depositedAmountCr: 520.00,
    depositVerificationStatus: 'VERIFIED',
    depositGateway: 'UP_TREASURY_PFMS',
    smcMonitoringActive: true,
    foodSecurityCheck: {
      irrigatedMultiCropHa: 8.5,
      maxAllowedHa: 45.0,
      status: 'COMPLIANT_WITHIN_LIMIT'
    },
    pesaScheduledArea: {
      isTribalArea: false
    },
    statutoryTimers: {
      sec11PublishedAt: '2026-03-15',
      sec19OriginalDeadline: '2027-03-15',
      sec19AdjustedDeadline: '2027-03-15',
      daysRemaining: 173,
      status: 'NORMAL'
    }
  },

  // 6. State Single-District Chemical Complex (Gujarat GIDC)
  {
    id: 'STATE-2025-GIDC-089',
    code: 'GIDC-PCPIR-EXP',
    name: 'Dahej PCPIR Petrochemical Mega Manufacturing Hub Expansion Phase-III',
    jurisdictionType: 'STATE',
    executingAgency: 'Gujarat Industrial Development Corporation (GIDC)',
    stateDepartment: 'Industries and Mines Department, Government of Gujarat',
    state: 'Gujarat',
    states: ['Gujarat'],
    districts: ['Bharuch'],
    tehsils: ['Vagra'],
    villagesCount: 7,
    totalAreaHa: 165.40,
    acquiredAreaHa: 165.40,
    currentStage: 'sec_19',
    stageLabel: 'Section 19(1) Staged Declaration Concluded',
    statutoryDeadline: '2026-10-31',
    daysRemaining: 38,
    lapseRisk: 'low',
    financialSanctionCr: 380.00,
    escrowDepositedCr: 380.00,
    disbursedCr: 340.00,
    beneficiariesCount: 540,
    displacedFamiliesCount: 32,
    objectionsTotal: 14,
    objectionsResolved: 14,
    gazetteStatus: 'Gujarat Gazette Extraordinary Part-I(A)',
    gazetteNo: 'GJ-GIDC-GAZ-2025-09-9182',
    gazetteDate: '28-Sep-2025',
    formIStatus: 'Concluded & Handed Over',
    surveyCadastralStatus: '100% Geo-referenced AnyRoR',
    proposalStatus: 'ACCEPTED_ROUTED',
    sec11Status: 'PUBLISHED',
    sec11Date: '2024-10-10',
    sec11GazetteNo: 'GJ-GIDC-GAZ-2024-10-1192',
    sec15Status: 'DISPOSED_100_PERCENT',
    rrStatus: 'RNR_SCHEME_SANCTIONED',
    sec19Status: 'PUBLISHED',
    sec19DeclarationNo: 'SEC19-GJ-GIDC-2025-41',
    sec19Deadline: '2025-10-10',
    stayExclusionDays: 0,
    extensionDays: 0,
    requiredDepositCr: 380.00,
    depositedAmountCr: 380.00,
    depositVerificationStatus: 'VERIFIED',
    depositGateway: 'GUJARAT_CYBER_TREASURY',
    smcMonitoringActive: true,
    foodSecurityCheck: {
      irrigatedMultiCropHa: 2.1,
      maxAllowedHa: 25.0,
      status: 'COMPLIANT_WITHIN_LIMIT'
    },
    pesaScheduledArea: {
      isTribalArea: false
    },
    statutoryTimers: {
      sec11PublishedAt: '2024-10-10',
      sec19OriginalDeadline: '2025-10-10',
      sec19AdjustedDeadline: '2025-10-10',
      daysRemaining: 0,
      status: 'COMPLETED'
    }
  }
];

// Inward Collector Proposals (Menu 2)
export const MOCK_COLLECTOR_PROPOSALS = [
  {
    proposalId: 'PROP-2025-PB-041',
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    jurisdictionType: 'CENTRAL',
    requiringBody: 'National Highways Authority of India (NHAI)',
    centralMinistry: 'Ministry of Road Transport and Highways (MoRTH)',
    state: 'Punjab',
    district: 'Patiala',
    tehsil: 'Rajpura',
    village: 'Sultanpur Khurd',
    surveyNumbers: '142/1, 142/2, 143/4, 144/2, 145/1',
    totalParcelsCount: 24,
    totalAreaHa: 48.60,
    publicPurpose: 'National High-Speed Access Controlled Expressway corridor under Bharatmala Pariyojana',
    formIStatus: 'VALIDATED_BY_COLLECTOR',
    rule4ReportStatus: 'SUBMITTED_SATISFACTORY',
    rule4ReportDate: '2025-07-28',
    rule4Finding: 'Alternative alignments examined. Minimum agricultural land impacted. No historical or religious monument displaced.',
    submissionDate: '2025-08-01',
    currentStatus: 'ACCEPTED',
    assignedCollector: 'Sh. Showkat Ahmad Parray, IAS (Deputy Commissioner, Patiala)',
    documents: [
      { id: 'DOC-F1-041', title: 'Certified Form-I Application', size: '4.8 MB', date: '2025-07-15' },
      { id: 'DOC-R4-041', title: 'Rule 4 Preliminary Enquiry Report', size: '2.4 MB', date: '2025-07-28' },
      { id: 'DOC-KMZ-041', title: 'Geo-referenced Cadastral KML/KMZ Alignment', size: '12.1 MB', date: '2025-07-30' }
    ]
  },
  {
    proposalId: 'PROP-2026-UP-019',
    projectId: 'REQ-2025-DFCC-019',
    projectName: 'EDFC Multi-Modal Logistics Hub',
    jurisdictionType: 'CENTRAL',
    requiringBody: 'DFCCIL / Ministry of Railways',
    centralMinistry: 'Ministry of Railways',
    state: 'Uttar Pradesh',
    district: 'Kanpur Dehat',
    tehsil: 'Akbarpur',
    village: 'Rura Khurd & Malasa',
    surveyNumbers: '88/1, 89, 90/3, 94/1',
    totalParcelsCount: 16,
    totalAreaHa: 38.40,
    publicPurpose: 'Multi-Modal Logistics Freight Transfer Yard connecting EDFC Trunk Corridor',
    formIStatus: 'VALIDATED_BY_COLLECTOR',
    rule4ReportStatus: 'SUBMITTED_SATISFACTORY',
    rule4ReportDate: '2025-12-20',
    rule4Finding: 'Contiguous land adjacent to rail siding selected. Feasibility validated by RITES.',
    submissionDate: '2026-01-05',
    currentStatus: 'ACCEPTED',
    assignedCollector: 'Smt. Neha Jain, IAS (District Magistrate, Kanpur Dehat)',
    documents: [
      { id: 'DOC-F1-019', title: 'Certified Form-I & Feasibility', size: '6.1 MB', date: '2025-12-10' },
      { id: 'DOC-R4-019', title: 'Collector Rule 4 Enquiry Report', size: '3.2 MB', date: '2025-12-20' }
    ]
  },
  {
    proposalId: 'PROP-2026-MH-012',
    projectId: 'STATE-2025-MSRDC-012',
    projectName: 'Maharashtra Samruddhi Corridor Feeder Spur',
    jurisdictionType: 'STATE',
    requiringBody: 'MSRDC',
    stateDepartment: 'Public Works Department (Govt of Maharashtra)',
    state: 'Maharashtra',
    district: 'Thane',
    tehsil: 'Shahapur',
    village: 'Vashind & Asangaon',
    surveyNumbers: '210/1, 211, 214/2, 218/1',
    totalParcelsCount: 32,
    totalAreaHa: 64.20,
    publicPurpose: 'Industrial & agricultural freight spur connecting Samruddhi Expressway to JNPT Port',
    formIStatus: 'UNDER_VALIDATION',
    rule4ReportStatus: 'CLARIFICATION_REQUIRED',
    rule4ReportDate: '2026-02-14',
    rule4Finding: 'Tribal hamlets identified in village Asangaon. Gram Sabha consultation documentation pending.',
    submissionDate: '2026-02-18',
    currentStatus: 'CLARIFICATION_REQUIRED',
    assignedCollector: 'Sh. Ashok Shingare, IAS (Collector, Thane)',
    documents: [
      { id: 'DOC-F1-012', title: 'Draft Form-I MSRDC Submission', size: '5.2 MB', date: '2026-02-05' },
      { id: 'DOC-R4-012', title: 'Preliminary Enquiry Note with Query Memo', size: '1.8 MB', date: '2026-02-14' }
    ]
  },
  {
    proposalId: 'PROP-2026-UP-034',
    projectId: 'STATE-2025-UPPWD-034',
    projectName: 'Bundelkhand Defence & Industrial Feeder Link',
    jurisdictionType: 'STATE',
    requiringBody: 'UPSIDA',
    stateDepartment: 'Infrastructure & Industrial Development Dept, UP',
    state: 'Uttar Pradesh',
    district: 'Jhansi',
    tehsil: 'Garautha',
    village: 'Erich & Gursahaiganj',
    surveyNumbers: '304, 305/1, 308/2, 312',
    totalParcelsCount: 28,
    totalAreaHa: 72.10,
    publicPurpose: 'Expressway link for Defence Industrial Corridor NODE 04',
    formIStatus: 'VALIDATED_BY_COLLECTOR',
    rule4ReportStatus: 'SUBMITTED_SATISFACTORY',
    rule4ReportDate: '2026-02-25',
    rule4Finding: 'Barren and single-crop land predominantly utilized. Compliant with Section 10 food security limits.',
    submissionDate: '2026-03-02',
    currentStatus: 'SIA_READY',
    assignedCollector: 'Sh. Ravindra Kumar, IAS (District Magistrate, Jhansi)',
    documents: [
      { id: 'DOC-F1-034', title: 'Form-I Certified by UPSIDA CE', size: '7.8 MB', date: '2026-02-20' },
      { id: 'DOC-R4-034', title: 'Collector Rule 4 Enquiry Report', size: '3.1 MB', date: '2026-02-25' }
    ]
  }
];

// SIA & Survey Launch Records (Menu 3)
export const MOCK_SIA_LAUNCH_RECORDS = [
  {
    id: 'SIA-LNCH-041',
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    jurisdictionType: 'CENTRAL',
    siaAgency: 'CRISIL Infrastructure Advisory & Panjab University Consortium',
    accreditationNo: 'NABL/SIA/CENTRAL/2024/091',
    collectorName: 'Sh. Showkat Ahmad Parray, IAS (Patiala)',
    notificationDate: '2024-10-15',
    surveyStartDate: '2024-10-25',
    surveyEndDate: '2025-03-10',
    slaDeadline: '2025-04-15', // 6-month statutory limit
    daysRemaining: 0,
    siaStatus: 'COMPLETED_APPROVED_BY_IEG',
    iegAppraisalDate: '2025-04-02',
    iegRecommendation: 'Approved with conditions: Complete alternate livelihood grant for 186 tenant families',
    affectedFamiliesCount: 186,
    publicHearingConducted: true,
    publicHearingDate: '2025-01-20',
    documentsPending: 0,
    broadcastDispatched: true
  },
  {
    id: 'SIA-LNCH-019',
    projectId: 'REQ-2025-DFCC-019',
    projectName: 'EDFC Multi-Modal Logistics Hub',
    jurisdictionType: 'CENTRAL',
    siaAgency: 'Tata Institute of Social Sciences (TISS) Project Unit',
    accreditationNo: 'NABL/SIA/CENTRAL/2023/044',
    collectorName: 'Smt. Neha Jain, IAS (Kanpur Dehat)',
    notificationDate: '2025-06-10',
    surveyStartDate: '2025-06-20',
    surveyEndDate: '2025-11-15',
    slaDeadline: '2025-12-10',
    daysRemaining: 0,
    siaStatus: 'COMPLETED_APPROVED_BY_IEG',
    iegAppraisalDate: '2025-11-28',
    iegRecommendation: 'Approved without alteration. Low displacement density.',
    affectedFamiliesCount: 62,
    publicHearingConducted: true,
    publicHearingDate: '2025-09-14',
    documentsPending: 0,
    broadcastDispatched: true
  },
  {
    id: 'SIA-LNCH-012',
    projectId: 'STATE-2025-MSRDC-012',
    projectName: 'Maharashtra Samruddhi Corridor Feeder Spur',
    jurisdictionType: 'STATE',
    siaAgency: 'Gokhale Institute of Politics and Economics (GIPE), Pune',
    accreditationNo: 'MH-SIA-UNIT-2024-18',
    collectorName: 'Sh. Ashok Shingare, IAS (Thane)',
    notificationDate: '2025-03-01',
    surveyStartDate: '2025-03-12',
    surveyEndDate: '2025-08-15',
    slaDeadline: '2025-09-01',
    daysRemaining: 0,
    siaStatus: 'COMPLETED_APPROVED_BY_IEG',
    iegAppraisalDate: '2025-08-28',
    iegRecommendation: 'Approved. Special Gram Sabha consent confirmed for Kasara tribal hamlets.',
    affectedFamiliesCount: 114,
    publicHearingConducted: true,
    publicHearingDate: '2025-06-18',
    documentsPending: 0,
    broadcastDispatched: true
  },
  {
    id: 'SIA-LNCH-034',
    projectId: 'STATE-2025-UPPWD-034',
    projectName: 'Bundelkhand Defence & Industrial Feeder Link',
    jurisdictionType: 'STATE',
    siaAgency: 'Giri Institute of Development Studies, Lucknow',
    accreditationNo: 'UP-SIA-INST-2025-03',
    collectorName: 'Sh. Ravindra Kumar, IAS (Jhansi)',
    notificationDate: '2026-03-10',
    surveyStartDate: '2026-03-25',
    surveyEndDate: '2026-08-20',
    slaDeadline: '2026-09-10',
    daysRemaining: 98,
    siaStatus: 'FIELD_CENSUS_IN_PROGRESS',
    iegAppraisalDate: null,
    iegRecommendation: 'Pending Field Submission',
    affectedFamiliesCount: 84,
    publicHearingConducted: false,
    publicHearingDate: '2026-05-15 (Scheduled)',
    documentsPending: 2,
    broadcastDispatched: true
  }
];

// Section 11 Notification Records & 12-Channel Publication Matrix (Menu 4)
export const MOCK_SECTION_11_RECORDS = [
  {
    id: 'SEC11-NHAI-041',
    projectId: 'REQ-2025-NHAI-041',
    notificationNumber: 'S.O. 2489(E) / Sec 11(1)',
    jurisdictionType: 'CENTRAL',
    gazetteReference: 'The Gazette of India, Extraordinary, Part II - Section 3(ii), No. 2489',
    notificationDate: '2025-08-14',
    publicPurpose: 'Construction of access-controlled 6-lane Delhi-Amritsar-Katra Expressway (Package 3)',
    displacementReason: 'Linear Greenfield expressway corridor requiring minimum curved radius and level alignment',
    siaSummary: 'SIMP prepared; displacement of 186 families; positive economic IRR exceeding 18.4%; social benefits outweigh negative impacts.',
    rrAdministrator: {
      name: 'Sh. Gurmeet Singh, PCS',
      designation: 'Additional Deputy Commissioner (General) & Administrator R&R, Patiala',
      email: 'rr-admin-patiala@punjab.gov.in',
      phone: '+91 175 2314981'
    },
    totalParcelsCount: 24,
    totalAreaHa: 48.60,
    status: 'PUBLISHED_ACTIVE',
    freezeStatus: 'FROZEN_CONFIRMED',
    landRecordUpdateStatus: 'COMPLETED',
    sec15WindowStatus: 'CLOSED_PROCESSED',
    publicationMatrix: [
      { id: 'PUB-1', channel: '1. Official Gazette of India', authority: 'Directorate of Printing (Govt of India)', language: 'English & Hindi', date: '2025-08-14', refNo: 'CG-DL-E-14082025-248901', status: 'VERIFIED', evidenceDoc: 'Gazette_Notif_SO2489.pdf' },
      { id: 'PUB-2', channel: '2. Daily Local Newspaper (1)', authority: 'The Tribune (Punjab Edition)', language: 'English', date: '2025-08-16', refNo: 'TRB/CHD/2025/1192', status: 'VERIFIED', evidenceDoc: 'Tribune_Clipping_Sec11.pdf' },
      { id: 'PUB-3', channel: '3. Daily Local Newspaper (2)', authority: 'Dainik Bhaskar (Patiala Edition)', language: 'Hindi', date: '2025-08-16', refNo: 'DB/PTL/2025/881', status: 'VERIFIED', evidenceDoc: 'Bhaskar_Clipping_Sec11.pdf' },
      { id: 'PUB-4', channel: '4. Regional Language Newspaper', authority: 'Ajit Daily (Jalandhar & Patiala)', language: 'Punjabi (Gurmukhi)', date: '2025-08-17', refNo: 'AJT/2025/4491', status: 'VERIFIED', evidenceDoc: 'Ajit_Clipping_Sec11.pdf' },
      { id: 'PUB-5', channel: '5. Gram Panchayat Notice Board', authority: 'Gram Panchayat Sultanpur Khurd & Payal', language: 'Punjabi', date: '2025-08-18', refNo: 'GP/SK/NOTICE/2025/12', status: 'VERIFIED', evidenceDoc: 'GP_Notice_Affixture_Photo.pdf' },
      { id: 'PUB-6', channel: '6. Municipality Notice Board', authority: 'Municipal Council Rajpura', language: 'Punjabi & English', date: '2025-08-18', refNo: 'MC/RP/PUB/2025/09', status: 'VERIFIED', evidenceDoc: 'MC_Affixture_Certificate.pdf' },
      { id: 'PUB-7', channel: '7. Municipal Corporation (where appl.)', authority: 'Municipal Corporation Patiala', language: 'Punjabi & English', date: '2025-08-19', refNo: 'MCP/NOTICE/891', status: 'VERIFIED', evidenceDoc: 'MCP_Notice_Board_Proof.pdf' },
      { id: 'PUB-8', channel: '8. District Collector Office Notice Board', authority: 'Deputy Commissioner Court Patiala', language: 'Punjabi, Hindi & English', date: '2025-08-15', refNo: 'DC/PTL/LARR/2025/301', status: 'VERIFIED', evidenceDoc: 'DC_Court_Notice_Certificate.pdf' },
      { id: 'PUB-9', channel: '9. SDM Office Notice Board', authority: 'Sub-Divisional Magistrate Rajpura', language: 'Punjabi', date: '2025-08-16', refNo: 'SDM/RP/NOTICE/2025/44', status: 'VERIFIED', evidenceDoc: 'SDM_Notice_Board_Proof.pdf' },
      { id: 'PUB-10', channel: '10. Tehsil Office Notice Board', authority: 'Tehsildar Rajpura', language: 'Punjabi', date: '2025-08-16', refNo: 'TEH/RP/2025/89', status: 'VERIFIED', evidenceDoc: 'Tehsildar_Notice_Proof.pdf' },
      { id: 'PUB-11', channel: '11. Appropriate Government Website', authority: 'MoRTH & NLAMS National Portal', language: 'English & Hindi', date: '2025-08-14', refNo: 'WEB/MORTH/NLAMS/2025/0814', status: 'VERIFIED', evidenceDoc: 'Website_Upload_Log_Timestamp.pdf' },
      { id: 'PUB-12', channel: '12. Affected Area On-Site Public Announcement', authority: 'Revenue Patwari & Drum Beating (Munadi)', language: 'Punjabi', date: '2025-08-20', refNo: 'MUNADI/PAT/2025/04', status: 'VERIFIED', evidenceDoc: 'Munadi_Panchnama_Signed.pdf' }
    ],
    gramSabhaRecords: [
      { id: 'GS-01', village: 'Sultanpur Khurd', bodyType: 'Panchayat', meetingDate: '2025-08-25', attendanceCount: 84, resolutionPassed: true, resolutionDoc: 'GS_Resolution_SK_2025.pdf', status: 'CONFIRMED' },
      { id: 'GS-02', village: 'Payal Khurd', bodyType: 'Panchayat', meetingDate: '2025-08-26', attendanceCount: 68, resolutionPassed: true, resolutionDoc: 'GS_Resolution_PK_2025.pdf', status: 'CONFIRMED' }
    ],
    freezeRecords: [
      { id: 'FRZ-01', ulpin: '19U28746219801', sroOffice: 'Sub-Registrar Office Rajpura', sroCode: 'SRO-PB-RP-01', freezeTriggerDate: '2025-08-15', apiStatus: 'FROZEN_SUCCESS', apiResponseCode: 'NGDRS_SUCCESS_CODE_200', notes: 'Mutation & Sale Bar active under Sec 11(4)' },
      { id: 'FRZ-02', ulpin: '19U28746219802', sroOffice: 'Sub-Registrar Office Rajpura', sroCode: 'SRO-PB-RP-01', freezeTriggerDate: '2025-08-15', apiStatus: 'FROZEN_SUCCESS', apiResponseCode: 'NGDRS_SUCCESS_CODE_200', notes: 'Encumbrance freeze confirmed' }
    ],
    exemptionRecords: [],
    landRecordUpdates: {
      timerMonths: 2,
      startDate: '2025-08-14',
      completedDate: '2025-10-02',
      status: 'COMPLETED_ON_TIME',
      rorUpdated: true,
      mutationCompleted: true,
      bhuNakshaLinked: true,
      certifiedBy: 'District Revenue Officer, Patiala'
    }
  },
  {
    id: 'SEC11-MSRDC-012',
    projectId: 'STATE-2025-MSRDC-012',
    notificationNumber: 'Notif. PWD/LARR-2025/8812',
    jurisdictionType: 'STATE',
    gazetteReference: 'The Maharashtra Government Gazette, Extraordinary Part I-A, No. 8812',
    notificationDate: '2025-11-12',
    publicPurpose: 'Samruddhi Expressway Feeder Spur connecting Thane-Nashik hinterland',
    displacementReason: 'Heavy industrial freight connectivity requires wide turning radius and hill grade severance',
    siaSummary: 'SIMP cleared by GIPE Pune; 114 families affected; compensatory afforestation earmarked.',
    rrAdministrator: {
      name: 'Smt. Anjali Pawar, IAS',
      designation: 'Sub-Divisional Officer (Shahapur) & Administrator R&R',
      email: 'sdo-shahapur@maharashtra.gov.in',
      phone: '+91 2527 272021'
    },
    totalParcelsCount: 32,
    totalAreaHa: 64.20,
    status: 'PUBLISHED_ACTIVE',
    freezeStatus: 'FROZEN_CONFIRMED',
    landRecordUpdateStatus: 'COMPLETED',
    sec15WindowStatus: 'OPEN',
    publicationMatrix: [
      { id: 'PUB-MH-1', channel: '1. Official State e-Gazette', authority: 'Government Printing Press Mumbai', language: 'Marathi & English', date: '2025-11-12', refNo: 'MH-GAZ-2025-8812', status: 'VERIFIED', evidenceDoc: 'MH_Gazette_8812.pdf' },
      { id: 'PUB-MH-2', channel: '2. Daily Local Newspaper (1)', authority: 'Lokmat (Thane Edition)', language: 'Marathi', date: '2025-11-14', refNo: 'LKM/THN/2025/081', status: 'VERIFIED', evidenceDoc: 'Lokmat_Paper_Clipping.pdf' },
      { id: 'PUB-MH-3', channel: '3. Daily Local Newspaper (2)', authority: 'The Indian Express (Mumbai/Thane)', language: 'English', date: '2025-11-14', refNo: 'IE/MUM/2025/992', status: 'VERIFIED', evidenceDoc: 'Express_Paper_Clipping.pdf' },
      { id: 'PUB-MH-4', channel: '4. Regional Language Newspaper', authority: 'Maharashtra Times (Nashik/Thane)', language: 'Marathi', date: '2025-11-15', refNo: 'MT/2025/319', status: 'VERIFIED', evidenceDoc: 'MT_Paper_Clipping.pdf' },
      { id: 'PUB-MH-5', channel: '5. Gram Panchayat Notice Board', authority: 'Gram Panchayat Vashind & Asangaon', language: 'Marathi', date: '2025-11-16', refNo: 'GP/VSH/2025/44', status: 'VERIFIED', evidenceDoc: 'GP_Notice_Board_Photo.pdf' },
      { id: 'PUB-MH-6', channel: '6. Municipality Notice Board', authority: 'Shahapur Nagar Panchayat', language: 'Marathi', date: '2025-11-16', refNo: 'NP/SHP/2025/10', status: 'VERIFIED', evidenceDoc: 'NP_Affixture_Certificate.pdf' },
      { id: 'PUB-MH-7', channel: '7. Municipal Corporation', authority: 'Thane Municipal Corporation', language: 'Marathi', date: '2025-11-17', refNo: 'TMC/LARR/2025/81', status: 'VERIFIED', evidenceDoc: 'TMC_Notice_Proof.pdf' },
      { id: 'PUB-MH-8', channel: '8. District Collector Office Notice Board', authority: 'Collector Office Thane', language: 'Marathi & English', date: '2025-11-13', refNo: 'COLL/THN/REV/892', status: 'VERIFIED', evidenceDoc: 'Collector_Notice_Proof.pdf' },
      { id: 'PUB-MH-9', channel: '9. SDM Office Notice Board', authority: 'SDM Office Shahapur', language: 'Marathi', date: '2025-11-14', refNo: 'SDM/SHP/NOT/112', status: 'VERIFIED', evidenceDoc: 'SDM_Shahapur_Proof.pdf' },
      { id: 'PUB-MH-10', channel: '10. Tehsil Office Notice Board', authority: 'Tahsil Office Shahapur', language: 'Marathi', date: '2025-11-14', refNo: 'TAH/SHP/2025/901', status: 'VERIFIED', evidenceDoc: 'Tahsil_Shahapur_Proof.pdf' },
      { id: 'PUB-MH-11', channel: '11. Appropriate Government Website', authority: 'Mahabhulekh & PWD Portal', language: 'Marathi & English', date: '2025-11-12', refNo: 'WEB/MH/PWD/2025/11', status: 'VERIFIED', evidenceDoc: 'Mahabhulekh_Upload_Proof.pdf' },
      { id: 'PUB-MH-12', channel: '12. Affected Area Munadi Announcement', authority: 'Talathi & Village Kotwal (Munadi)', language: 'Marathi', date: '2025-11-18', refNo: 'MUNADI/THN/2025/18', status: 'VERIFIED', evidenceDoc: 'Munadi_Panchanama_Signed.pdf' }
    ],
    gramSabhaRecords: [
      { id: 'GS-MH-01', village: 'Asangaon Tribal Area', bodyType: 'Tribal Gram Sabha (PESA)', meetingDate: '2025-11-22', attendanceCount: 112, resolutionPassed: true, resolutionDoc: 'PESA_GramSabha_Resolution.pdf', status: 'CONFIRMED' }
    ],
    freezeRecords: [
      { id: 'FRZ-MH-01', ulpin: '27U91823746101', sroOffice: 'Sub-Registrar Shahapur', sroCode: 'SRO-MH-TH-04', freezeTriggerDate: '2025-11-13', apiStatus: 'FROZEN_SUCCESS', apiResponseCode: 'IGR_MAHARASHTRA_200', notes: 'i-SARITA / NGDRS transaction freeze applied' }
    ],
    exemptionRecords: [
      {
        id: 'EXEMP-01',
        ownerName: 'Shri Dattatray Patil',
        ulpin: '27U91823746101',
        khasraNo: '210/1B',
        specialCircumstance: 'Medical emergency mortgage for critical cancer treatment',
        reason: 'Permitted limited hypothecation to Nationalised Bank without alienation of title',
        collectorDecision: 'APPROVED_WITH_CONDITIONS',
        decisionDate: '2025-12-04',
        writtenOrderDoc: 'Collector_Exemption_Order_Patil.pdf'
      }
    ],
    landRecordUpdates: {
      timerMonths: 2,
      startDate: '2025-11-12',
      completedDate: '2026-01-08',
      status: 'COMPLETED_ON_TIME',
      rorUpdated: true,
      mutationCompleted: true,
      bhuNakshaLinked: true,
      certifiedBy: 'Superintendent of Land Records, Thane'
    }
  }
];

// Section 15 Objections and R&R Review Data (Menu 5)
export const MOCK_OBJECTIONS_AND_RNR = [
  {
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    totalObjectionsReceived: 48,
    objectionsResolved: 37,
    objectionsPending: 11,
    collectorReportStatus: 'SUBMITTED_TO_APPROPRIATE_GOV',
    collectorReportDate: '2025-11-04',
    collectorRecommendationSummary: '37 objections resolved via boundary minor re-alignment. 11 objections for higher valuation forwarded to Collector Award stage under Section 23/26.',
    objectionsList: [
      {
        id: 'OBJ-041-01',
        ulpin: '19U28746219802',
        ownerName: 'Shri Ram Charan Lal S/o Bishan Das',
        ground: 'Public Purpose Alternative Alignment / Severe bisection of ancestral house',
        filingDate: '2025-09-12',
        collectorFinding: 'Re-alignment not technically feasible due to high-speed curve limits. Special R&R house construction grant recommended in resettlement site.',
        evidenceDoc: 'Objection_Hearing_Statement_01.pdf',
        status: 'DISPOSED_WITH_RR_RELIEF'
      },
      {
        id: 'OBJ-041-02',
        ulpin: '19U28746219803',
        ownerName: 'M/s Green Valley Cold Storage Agro Corp',
        ground: 'Disruption of solar-powered cold storage facility feeding 24 villages',
        filingDate: '2025-09-18',
        collectorFinding: 'Asset evaluation by Chief Engineer PWD to include industrial equipment dismantling and re-erection cost under First Schedule item 4.',
        evidenceDoc: 'Valuation_Dispute_Memo.pdf',
        status: 'DISPOSED_FORWARDED_TO_AWARD'
      }
    ],
    rnrSchemeSummary: {
      schemeId: 'RNR-SCHEME-PB-041',
      administratorName: 'Sh. Gurmeet Singh, PCS (Patiala)',
      commissionerName: 'Sh. Diprava Lakra, IAS (Commissioner R&R, Punjab)',
      affectedFamiliesCount: 186,
      displacedFamiliesCount: 42,
      scheduledCastesFamilies: 54,
      scheduledTribesFamilies: 0,
      resettlementAreaLocation: 'Sector 34-B, Urban Estate Phase-III, Rajpura (12.4 Ha)',
      civicAmenitiesProvided: ['Metalled Roads', 'Drainage', 'Primary Health Centre', 'Community Hall', 'Anganwadi', 'Electricity Substation'],
      status: 'APPROVED_BY_COMMISSIONER',
      approvalDate: '2025-10-28',
      approvalOrderNo: 'RNR-COMM-PB-2025-098',
      approvalEvidenceDoc: 'RNR_Commissioner_Sanction_Order.pdf'
    }
  },
  {
    projectId: 'STATE-2025-MSRDC-012',
    projectName: 'Maharashtra Samruddhi Corridor Feeder Spur',
    totalObjectionsReceived: 26,
    objectionsResolved: 18,
    objectionsPending: 8,
    collectorReportStatus: 'INTERIM_REPORT_SUBMITTED',
    collectorReportDate: '2026-01-18',
    collectorRecommendationSummary: 'Hearings conducted for Shahapur taluka. Compensation enhancement requests forwarded to LAO. Tribal consent resolutions verified.',
    objectionsList: [
      {
        id: 'OBJ-012-01',
        ulpin: '27U91823746104',
        ownerName: 'Shri Eknath Bhau Waghe (Tribal Landowner)',
        ground: 'Severance of natural water stream utilized for paddy farming',
        filingDate: '2025-12-10',
        collectorFinding: 'MSRDC Chief Engineer directed to construct 12m box culvert at Chainage km 14+200 to preserve irrigation channel.',
        evidenceDoc: 'Hearing_Order_Culvert_Directed.pdf',
        status: 'RESOLVED_BY_DESIGN_MODIFICATION'
      }
    ],
    rnrSchemeSummary: {
      schemeId: 'RNR-SCHEME-MH-012',
      administratorName: 'Smt. Anjali Pawar, IAS (Shahapur)',
      commissionerName: 'Sh. Radhakrishna Game, IAS (Divisional Commissioner, Konkan)',
      affectedFamiliesCount: 114,
      displacedFamiliesCount: 28,
      scheduledCastesFamilies: 12,
      scheduledTribesFamilies: 46,
      resettlementAreaLocation: 'Village Shenva Khurd, Taluka Shahapur (8.2 Ha)',
      civicAmenitiesProvided: ['Tribal Community Centre', 'Piped Drinking Water', 'Solar Street Lights', 'School Annex'],
      status: 'APPROVED_BY_COMMISSIONER',
      approvalDate: '2026-02-10',
      approvalOrderNo: 'DIV-COMM-KONKAN-RNR-2026-44',
      approvalEvidenceDoc: 'Divisional_Commissioner_RNR_Approval.pdf'
    }
  }
];

// Section 19 Declarations (Menu 6)
export const MOCK_SECTION_19_DECLARATIONS = [
  {
    id: 'SEC19-NHAI-041',
    projectId: 'REQ-2025-NHAI-041',
    declarationNumber: 'S.O. 3891(E) / Sec 19(1)',
    jurisdictionType: 'CENTRAL',
    section11NotificationId: 'SEC11-NHAI-041',
    section11Date: '2025-08-14',
    district: 'Patiala & Ludhiana',
    territorialDivision: 'Patiala Division, State of Punjab',
    publicPurpose: 'Access-controlled 6-lane National Expressway Corridor',
    approximateAreaHa: 48.60,
    parcelsList: ['PARCEL-001', 'PARCEL-002', 'PARCEL-003', 'PARCEL-004'],
    ulpinsList: ['19U28746219801', '19U28746219802', '19U28746219803', '19U28746219804'],
    resettlementArea: 'Sector 34-B, Urban Estate Rajpura',
    planInspectionLocation: 'Office of Deputy Commissioner Patiala & SDM Rajpura',
    requiringBodyDeposit: {
      requiredAmountCr: 540.00,
      depositedAmountCr: 540.00,
      depositDate: '2025-10-15',
      escrowReference: 'ESCROW-NHAI-SBI-009812',
      pfmsReference: 'PFMS/2025/NHAI/TXN-881920',
      cnaReference: 'CNA-MORTH-8841',
      verificationStatus: 'VERIFIED',
      verifiedBy: 'Under Secretary (Finance), MoRTH'
    },
    statutoryCountdown: {
      sec11Date: '2025-08-14',
      original12MonthDeadline: '2026-08-14',
      stayExclusionDays: 45,
      extensionDays: 0,
      adjustedDeadline: '2026-11-20',
      daysElapsed: 299,
      daysRemaining: 66,
      status: 'WARNING'
    },
    courtStayExclusion: {
      hasActiveStay: false,
      caseNumber: 'CWP No. 19284 of 2025',
      court: 'Hon’ble High Court of Punjab & Haryana at Chandigarh',
      stayPeriodStart: '2025-09-01',
      stayPeriodEnd: '2025-10-16',
      excludedDays: 45,
      vacationOrderDoc: 'HighCourt_Vacation_Order_CWP19284.pdf',
      verifiedByStatutoryOfficer: true
    },
    extensionRecord: null,
    stagingType: 'UNIFIED_MULTI_DISTRICT', // or PARCEL_BY_PARCEL, GROUPED
    status: 'READY_FOR_DSC_SIGNING',
    signedBy: null,
    signedAt: null,
    publishedAt: null,
    gazetteReference: null
  },
  {
    id: 'SEC19-SECI-082',
    projectId: 'REQ-2024-SECI-082',
    declarationNumber: 'SEC19-SECI-MP-2025-08',
    jurisdictionType: 'CENTRAL',
    section11NotificationId: 'SEC11-SECI-082',
    section11Date: '2024-11-05',
    district: 'Rewa & Satna',
    territorialDivision: 'Rewa Division, Madhya Pradesh',
    publicPurpose: 'Solar Substation Grid Interconnection & Solar Array Zone',
    approximateAreaHa: 98.40,
    parcelsList: ['PARCEL-SECI-01', 'PARCEL-SECI-02'],
    ulpinsList: ['23U81923847101', '23U81923847102'],
    resettlementArea: 'Gurh Nagar Panchayat Resettlement Colony',
    planInspectionLocation: 'Collector Office Rewa & Tehsil Gurh',
    requiringBodyDeposit: {
      requiredAmountCr: 142.80,
      depositedAmountCr: 142.80,
      depositDate: '2025-03-10',
      escrowReference: 'ESCROW-MP-SECI-1192',
      pfmsReference: 'PFMS/2025/SECI/TXN-1109',
      verificationStatus: 'VERIFIED',
      verifiedBy: 'Finance Controller, SECI'
    },
    statutoryCountdown: {
      sec11Date: '2024-11-05',
      original12MonthDeadline: '2025-11-05',
      stayExclusionDays: 0,
      extensionDays: 0,
      adjustedDeadline: '2025-11-05',
      daysElapsed: 365,
      daysRemaining: 0,
      status: 'COMPLETED'
    },
    courtStayExclusion: null,
    extensionRecord: null,
    stagingType: 'GROUPED_PARCELS',
    status: 'PUBLISHED',
    signedBy: 'Sh. Rajesh Kumar, IAS (Joint Secretary, MNRE)',
    signedAt: '2025-08-20',
    publishedAt: '2025-08-25',
    gazetteReference: 'The Gazette of India, Extraordinary Part II Sec 3(ii), No. 3110'
  }
];

// RBAC Downstream Provisioning Assignments (Menu 7)
// Uses strict [ Not Access ] and [ View ] controls across 4 downstream sections:
// 1. Committee (NMC/SMC)
// 2. SIA & IEG
// 3. R&R Authority
// 4. LARR Authority (Judicial)
export const MOCK_RBAC_ASSIGNMENTS = [
  {
    id: 'RBAC-NMC-01',
    category: 'COMMITTEE',
    committeeType: 'NATIONAL_MONITORING_COMMITTEE',
    jurisdictionType: 'CENTRAL',
    memberName: 'Dr. Vivek Joshi, IAS (Secretary, DoLR)',
    department: 'Department of Land Resources (DoLR), MoRD',
    designation: 'Chairman, National Monitoring Committee (NMC)',
    email: 'sec-dolr@nic.in',
    mobile: '+91 98110 24891',
    gazetteOrderNo: 'ORDER-NMC-GOI-2024-01',
    projectId: 'ALL_CENTRAL_PROJECTS',
    menuAccess: {
      executiveDashboard: 'VIEW',
      collectorProposalInbox: 'VIEW',
      siaSurveyLaunchHub: 'VIEW',
      sec11NotificationHub: 'VIEW',
      rnrReviewObjections: 'VIEW',
      sec19DeclarationEngine: 'VIEW',
      rbacAccessControlHub: 'NOT_ACCESS',
      gazetteBroadcastVault: 'VIEW',
      policyMakerRadar: 'VIEW'
    },
    status: 'PROVISIONED',
    provisionedAt: '2025-01-10',
    credentialLoginPlaceholder: 'https://nlams.gov.in/auth/sso?nmc=sec-dolr'
  },
  {
    id: 'RBAC-SIA-02',
    category: 'SIA_IEG',
    agencyName: 'CRISIL Infrastructure Advisory & Panjab University',
    accreditation: 'NABL/SIA/CENTRAL/2024/091',
    leadEvaluator: 'Dr. Manjit Singh, Professor of Economics',
    email: 'sia-katra@crisil-pu.ac.in',
    mobile: '+91 98141 89201',
    projectId: 'REQ-2025-NHAI-041',
    jurisdictionType: 'CENTRAL',
    menuAccess: {
      baselineCensus: 'VIEW',
      simpBuilder: 'VIEW',
      iegAppraisalDesk: 'VIEW',
      publicHearingLog: 'VIEW',
      executiveOversight: 'NOT_ACCESS',
      gazetteVault: 'NOT_ACCESS'
    },
    status: 'PROVISIONED',
    provisionedAt: '2024-10-18',
    credentialLoginPlaceholder: 'https://nlams.gov.in/sia-portal/login?ref=CRISIL-091'
  },
  {
    id: 'RBAC-RNR-03',
    category: 'RNR_AUTHORITY',
    role: 'RNR_ADMINISTRATOR',
    officialName: 'Sh. Gurmeet Singh, PCS',
    designation: 'Additional Deputy Commissioner & Administrator R&R, Patiala',
    email: 'rr-admin-patiala@punjab.gov.in',
    mobile: '+91 94172 10982',
    gazetteOrderNo: 'GAZ-PB-RNR-ADM-2024-11',
    projectId: 'REQ-2025-NHAI-041',
    jurisdictionType: 'CENTRAL',
    menuAccess: {
      rnrDashboard: 'VIEW',
      affectedFamiliesCensus: 'VIEW',
      draftRnrSchemeBuilder: 'VIEW',
      scStDevelopmentPlan: 'VIEW',
      sec16PublicHearing: 'VIEW',
      rnrAwardExecution: 'VIEW',
      pfmsDbtDisbursement: 'VIEW',
      commissionerApprovalDesk: 'NOT_ACCESS', // reserved for Commissioner
      stateRnrCompliance: 'VIEW',
      auditReportingVault: 'VIEW'
    },
    status: 'PROVISIONED',
    provisionedAt: '2025-02-14',
    credentialLoginPlaceholder: 'https://nlams.gov.in/rr-authority/login?role=adm&id=GS982'
  },
  {
    id: 'RBAC-LARR-04',
    category: 'LARR_AUTHORITY',
    role: 'PRESIDING_OFFICER',
    officialName: 'Hon’ble Justice (Retd.) K. S. Gill',
    designation: 'Presiding Officer, LARR Authority Bench No. 1, Patiala',
    email: 'po-larr-patiala@ecourts.gov.in',
    mobile: '+91 98720 33419',
    gazetteOrderNo: 'GOI-LARR-BENCH-2023-41',
    projectId: 'REQ-2025-NHAI-041',
    jurisdictionType: 'CENTRAL',
    menuAccess: {
      judicialDashboard: 'VIEW',
      sec64ReferenceInward: 'VIEW',
      digitalSummonsDesk: 'VIEW',
      pleadingsEvidenceVault: 'VIEW',
      virtualCourtroom: 'VIEW',
      sec69AwardEngine: 'VIEW',
      sec77EscrowApportionment: 'VIEW',
      slaPipelineMonitor: 'VIEW',
      appealExecutionBench: 'VIEW',
      judicialAuditVault: 'VIEW'
    },
    status: 'PROVISIONED',
    provisionedAt: '2024-08-01',
    credentialLoginPlaceholder: 'https://nlams.gov.in/larr/portal?bench=PB01'
  },
  {
    id: 'RBAC-SMC-05',
    category: 'COMMITTEE',
    committeeType: 'STATE_MONITORING_COMMITTEE',
    jurisdictionType: 'STATE',
    memberName: 'Sh. Nitin Kareer, IAS (Additional Chief Secretary, Revenue)',
    department: 'Revenue and Forest Department, Govt of Maharashtra',
    designation: 'Chairman, State Monitoring Committee for R&R',
    email: 'acs-rev@maharashtra.gov.in',
    mobile: '+91 98200 11928',
    gazetteOrderNo: 'MH-SMC-NOTIF-2024-03',
    projectId: 'STATE-2025-MSRDC-012',
    menuAccess: {
      executiveDashboard: 'VIEW',
      collectorProposalInbox: 'VIEW',
      siaSurveyLaunchHub: 'VIEW',
      sec11NotificationHub: 'VIEW',
      rnrReviewObjections: 'VIEW',
      sec19DeclarationEngine: 'VIEW',
      rbacAccessControlHub: 'NOT_ACCESS',
      gazetteBroadcastVault: 'VIEW'
    },
    status: 'PROVISIONED',
    provisionedAt: '2025-03-01',
    credentialLoginPlaceholder: 'https://nlams.gov.in/state-gov/sso?smc=acs-rev'
  }
];

// Official Gazette and Broadcast Vault (Menu 8)
export const MOCK_GAZETTE_PUBLICATIONS = [
  {
    id: 'GAZ-DOC-001',
    notificationNo: 'S.O. 2489(E)',
    section: 'Section 11(1)',
    projectCode: 'NH-44-PKG3',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    jurisdictionType: 'CENTRAL',
    gazetteType: 'The Gazette of India, Extraordinary, Part II Section 3(ii)',
    publicationDate: '2025-08-14',
    version: 'Version 1 (Original Statutory Issue)',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    eSignStatus: 'DSC_VERIFIED_AUTHENTIC',
    signedBy: 'Sh. Rajesh Kumar, IAS (Joint Secretary to the Govt of India)',
    uploader: 'Directorate of Printing (Govt of India e-Gazette Portal)',
    broadcastEvents: [
      { target: 'Collector Patiala', time: '14-Aug-2025 18:30:12', status: 'ACKNOWLEDGED' },
      { target: 'Requiring Body (NHAI)', time: '14-Aug-2025 18:30:15', status: 'DELIVERED' },
      { target: 'SIA & IEG Workspace', time: '14-Aug-2025 18:30:18', status: 'SYNCED' },
      { target: 'R&R Authority Patiala', time: '14-Aug-2025 18:30:20', status: 'SYNCED' },
      { target: 'Citizen Public Portal', time: '14-Aug-2025 18:31:00', status: 'LIVE_PUBLISHED' }
    ]
  },
  {
    id: 'GAZ-DOC-002',
    notificationNo: 'PWD/LARR-2025/8812',
    section: 'Section 11(1)',
    projectCode: 'MSRDC-EXPR-FDR',
    projectName: 'Maharashtra Samruddhi Corridor Feeder Spur',
    jurisdictionType: 'STATE',
    gazetteType: 'The Maharashtra Government Gazette, Extraordinary Part I-A',
    publicationDate: '2025-11-12',
    version: 'Version 1 (Original)',
    sha256Hash: 'a71829348c10928374a819283019283019283019283019283019283019283019',
    eSignStatus: 'DSC_VERIFIED_AUTHENTIC',
    signedBy: 'Smt. Manisha Patankar, IAS (Principal Secretary PWD, Maharashtra)',
    uploader: 'Government Printing Press, Charni Road, Mumbai',
    broadcastEvents: [
      { target: 'Collector Thane', time: '12-Nov-2025 14:15:00', status: 'ACKNOWLEDGED' },
      { target: 'MSRDC Executive Engineer', time: '12-Nov-2025 14:15:10', status: 'DELIVERED' },
      { target: 'State Monitoring Committee (SMC)', time: '12-Nov-2025 14:15:20', status: 'SYNCED' },
      { target: 'Maharashtra Bhulekh Citizen Portal', time: '12-Nov-2025 14:16:00', status: 'LIVE_PUBLISHED' }
    ]
  },
  {
    id: 'GAZ-DOC-003',
    notificationNo: 'S.O. 3110(E)',
    section: 'Section 19(1)',
    projectCode: 'SOLAR-GRID-04',
    projectName: 'Rewa Ultra Mega Solar Park Phase-II',
    jurisdictionType: 'CENTRAL',
    gazetteType: 'The Gazette of India, Extraordinary Part II Sec 3(ii)',
    publicationDate: '2025-08-25',
    version: 'Version 1 (Final Declaration)',
    sha256Hash: 'bf91029384756102938475610293847561029384756102938475610293847561',
    eSignStatus: 'DSC_VERIFIED_AUTHENTIC',
    signedBy: 'Sh. Amitesh Kumar, Under Secretary (Solar), MNRE',
    uploader: 'Directorate of Printing (Govt of India)',
    broadcastEvents: [
      { target: 'Collector Rewa', time: '25-Aug-2025 11:00:00', status: 'ACKNOWLEDGED' },
      { target: 'SECI Project Director', time: '25-Aug-2025 11:00:15', status: 'DELIVERED' },
      { target: 'LARR Authority Jabalpur Bench', time: '25-Aug-2025 11:00:30', status: 'SYNCED' }
    ]
  }
];

// State Section 101 Land Bank Mock Records (State-Only Engine)
export const MOCK_STATE_LAND_BANK_RECORDS = [
  {
    id: 'LB-MH-2025-001',
    ulpin: '27U91823746199',
    khasraNo: '304/1',
    village: 'Vashind',
    district: 'Thane',
    originalOwner: 'Sh. Bhalchandra Ramdas Mhatre',
    originalAcquisitionProject: 'Thane Industrial Feeder 2018',
    possessionHandoverDate: '2019-06-15',
    areaHa: 4.85,
    utilizationStatus: 'UNUTILIZED_SURPLUS',
    fiveYearTimerExpired: true,
    reversionStatus: 'REVERSION_OFFER_NOTICE_ISSUED',
    reversionNoticeDate: '2025-01-10',
    originalOwnerAcceptedReversion: false, // Owner declined to return compensation
    stateLandBankTransferStatus: 'TRANSFERRED_TO_STATE_LAND_BANK',
    currentCustodian: 'Maharashtra Industrial Land Bank (MIDC Pool)',
    geoCoordinates: [19.4124, 73.2841]
  }
];

// Central Special Enactment Mapping (Central-Only Engine)
export const CENTRAL_SPECIAL_ENACTMENTS = [
  {
    actCode: 'NH_ACT_1956',
    actName: 'National Highways Act, 1956',
    sec11Equivalent: 'Section 3A (Intention to acquire land)',
    sec15Equivalent: 'Section 3C (Hearing of objections before CALA)',
    sec19Equivalent: 'Section 3D (Declaration of acquisition and vesting)',
    calaAuthority: 'Competent Authority for Land Acquisition (CALA) / SDM',
    compensationFramework: 'RFCTLARR Act 2013 First, Second & Third Schedules applicable (per Sec 105 & 2015 Order)'
  },
  {
    actCode: 'RAILWAYS_ACT_1989',
    actName: 'Railways Act, 1989 (as amended 2008)',
    sec11Equivalent: 'Section 20A (Power to acquire land for special railway project)',
    sec15Equivalent: 'Section 20D (Hearing of objections)',
    sec19Equivalent: 'Section 20E (Declaration of acquisition)',
    calaAuthority: 'Competent Authority Land Acquisition (CALA) / District Magistrate',
    compensationFramework: 'RFCTLARR Act 2013 First, Second & Third Schedules'
  },
  {
    actCode: 'COAL_ACT_1957',
    actName: 'Coal Bearing Areas (Acquisition and Development) Act, 1957',
    sec11Equivalent: 'Section 4 (Notice of intention to prospect and acquire)',
    sec15Equivalent: 'Section 8 (Objection to acquisition)',
    sec19Equivalent: 'Section 9 (Declaration of acquisition)',
    calaAuthority: 'Coal Controller / Nominated Central Officer',
    compensationFramework: 'Tribunal determination under Section 14 / RFCTLARR benchmarks'
  }
];
