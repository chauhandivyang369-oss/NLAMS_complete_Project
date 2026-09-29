/**
 * NLAMS - Master District Collector Mock Dataset
 * Real-world statutory data for District Collector / CALA administration under RFCTLARR Act 2013.
 */

export const MOCK_DISTRICTS = [
  {
    id: 'DIST-THANE',
    name: 'Thane District',
    state: 'Maharashtra',
    collectorName: 'Shri Ashok Shinde, IAS',
    collectorTitle: 'District Collector & District Magistrate, Thane',
    hq: 'Collectorate Complex, Court Naka, Thane (W) - 400601',
    talukas: ['Bhiwandi', 'Kalyan', 'Thane', 'Shahapur', 'Murbad'],
    activeProjectsCount: 4,
    totalAcquisitionHa: 486.42,
    disbursedCrores: 342.80,
    slaComplianceRate: '94.2%'
  },
  {
    id: 'DIST-VARANASI',
    name: 'Varanasi District',
    state: 'Uttar Pradesh',
    collectorName: 'Shri S. Rajalingam, IAS',
    collectorTitle: 'District Magistrate & Collector, Varanasi',
    hq: 'Collectorate Compound, Kutchery, Varanasi - 221002',
    talukas: ['Pindra', 'Rajatalab', 'Varanasi Sadar'],
    activeProjectsCount: 3,
    totalAcquisitionHa: 312.18,
    disbursedCrores: 218.45,
    slaComplianceRate: '96.5%'
  },
  {
    id: 'DIST-KOLAR',
    name: 'Kolar District',
    state: 'Karnataka',
    collectorName: 'Smt. Akram Pasha, IAS',
    collectorTitle: 'Deputy Commissioner & District Magistrate, Kolar',
    hq: 'DC Office Complex, Bangarapet Road, Kolar - 563101',
    talukas: ['Kolar', 'Bangarapet', 'Mulbagal', 'Malur', 'Srinivaspur'],
    activeProjectsCount: 2,
    totalAcquisitionHa: 275.60,
    disbursedCrores: 184.20,
    slaComplianceRate: '91.8%'
  },
  {
    id: 'DIST-PUNE',
    name: 'Pune District',
    state: 'Maharashtra',
    collectorName: 'Dr. Suhas Diwase, IAS',
    collectorTitle: 'Collector & District Magistrate, Pune',
    hq: 'Collectorate, Station Road, Pune - 411001',
    talukas: ['Haveli', 'Mulshi', 'Maval', 'Khed', 'Shirur', 'Daund'],
    activeProjectsCount: 5,
    totalAcquisitionHa: 680.15,
    disbursedCrores: 512.60,
    slaComplianceRate: '93.0%'
  }
];

export const MOCK_COLLECTOR_ROLES = [
  {
    id: 'ROLE-DC-DM',
    title: 'District Collector & District Magistrate (DC/DM)',
    officerName: 'Shri Ashok Shinde, IAS',
    designation: 'Principal Statutory Authority (Sec 3(g))',
    jurisdictionLevel: 'District Apex Jurisdiction',
    powers: 'Full Statutory Powers: Awards, Section 38 Possession, Reference, Sub-Delegation',
    dscStatus: 'Active • Class-3 Legal DSC',
    badgeColor: 'bg-[#C5A059] text-slate-950'
  },
  {
    id: 'ROLE-SLO-CALA',
    title: 'Special Land Acquisition Officer (SLO / CALA)',
    officerName: 'Smt. Archana Jadhav, Dy. Collector',
    designation: 'Competent Authority Land Acquisition (CALA)',
    jurisdictionLevel: 'Linear Infrastructure Division No. 1',
    powers: 'Section 12 Surveys, Section 15 Hearing Officer, Section 21 Claims Inward, Award Formulation',
    dscStatus: 'Active • Class-3 Legal DSC',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'ROLE-SDM-RDO',
    title: 'Sub-Divisional Magistrate (SDM / SDO)',
    officerName: 'Shri Nilesh Gawande, SDO',
    designation: 'Sub-Divisional Presiding Officer',
    jurisdictionLevel: 'Bhiwandi Sub-Division',
    powers: 'Section 12 Entry Authorization, Damage Assessment (Sec 13), Gram Sabha Hearing Witness',
    dscStatus: 'Active • Class-2 DSC',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'ROLE-TAHSILDAR-RO',
    title: 'Tahsildar & Executive Magistrate',
    officerName: 'Shri Sachin Patil, Tehsildar',
    designation: 'Field Revenue Officer',
    jurisdictionLevel: 'Bhiwandi Taluka',
    powers: 'Notice Serving (Sec 12/21), 7/12 RoR Mutation Entry, Spot Panchnama, Boundary Pillar Geo-tag',
    dscStatus: 'Active • Govt e-Sign',
    badgeColor: 'bg-purple-600 text-white'
  }
];

export const MOCK_COLLECTOR_PROJECTS = [
  {
    id: 'PROJ-MAHSR-001',
    districtId: 'DIST-THANE',
    code: 'MAHSR-PKG-C2',
    name: 'Mumbai-Ahmedabad High Speed Rail (Bullet Train) - Thane Section',
    requiringBody: 'National High Speed Rail Corporation Ltd (NHSRCL)',
    statutoryStage: 'SECTION_23_AWARD_STAGE',
    currentStageLabel: 'Sec 23 Award Formulation & Sec 37 Notice',
    totalAreaHa: 138.45,
    acquiredAreaHa: 98.20,
    totalParcels: 312,
    totalKhatedars: 645,
    talukasCovered: ['Bhiwandi', 'Kalyan'],
    villagesCount: 14,
    escrowDepositedCrores: 485.00,
    disbursedCrores: 312.40,
    sec11Date: '2024-04-10',
    sec19Date: '2025-01-18',
    sec25AwardDeadline: '2026-01-18',
    daysRemainingSec25: 116,
    sec25Status: 'WARNING', // OK, WARNING, CRITICAL
    statutoryCountdownDays: 116,
    activeObjectionsCount: 3,
    pendingClaimsCount: 14,
    possessionPanchnamaPending: 28,
    leadOfficer: 'Smt. Archana Jadhav, Dy. Collector (SLO)',
    geoCenter: [19.2952, 73.0635]
  },
  {
    id: 'PROJ-VME-002',
    districtId: 'DIST-THANE',
    code: 'NHAI-VME-SPUR',
    name: 'Vadodara-Mumbai Expressway Spur (Package XVIII) - Shahapur & Bhiwandi',
    requiringBody: 'National Highways Authority of India (NHAI)',
    statutoryStage: 'SECTION_15_HEARING_STAGE',
    currentStageLabel: 'Sec 15 Objections Hearing & Spot Inquiry',
    totalAreaHa: 194.80,
    acquiredAreaHa: 0.0,
    totalParcels: 428,
    totalKhatedars: 890,
    talukasCovered: ['Shahapur', 'Bhiwandi'],
    villagesCount: 18,
    escrowDepositedCrores: 240.00,
    disbursedCrores: 0.0,
    sec11Date: '2025-08-05',
    sec19Date: null,
    sec25AwardDeadline: 'Pending Sec 19',
    daysRemainingSec25: 365,
    sec25Status: 'OK',
    statutoryCountdownDays: 24, // 60-day Sec 15 window
    activeObjectionsCount: 19,
    pendingClaimsCount: 0,
    possessionPanchnamaPending: 0,
    leadOfficer: 'Shri Nilesh Gawande, SDO',
    geoCenter: [19.3400, 73.1200]
  },
  {
    id: 'PROJ-DVHSR-003',
    districtId: 'DIST-VARANASI',
    code: 'DVHSR-PKG-V1',
    name: 'Delhi-Varanasi High Speed Rail Corridor - Terminal & Maintenance Depot',
    requiringBody: 'Ministry of Railways / NHSRCL',
    statutoryStage: 'SECTION_21_CLAIMS_STAGE',
    currentStageLabel: 'Sec 21 Public Notice & Claims Scrutiny',
    totalAreaHa: 185.30,
    acquiredAreaHa: 42.10,
    totalParcels: 280,
    totalKhatedars: 512,
    talukasCovered: ['Pindra', 'Rajatalab'],
    villagesCount: 9,
    escrowDepositedCrores: 360.00,
    disbursedCrores: 88.50,
    sec11Date: '2024-09-12',
    sec19Date: '2025-03-10',
    sec25AwardDeadline: '2026-03-10',
    daysRemainingSec25: 167,
    sec25Status: 'OK',
    statutoryCountdownDays: 18, // 30-day claims window
    activeObjectionsCount: 1,
    pendingClaimsCount: 42,
    possessionPanchnamaPending: 65,
    leadOfficer: 'Shri S. Rajalingam, IAS',
    geoCenter: [25.3176, 82.9739]
  },
  {
    id: 'PROJ-BCE-004',
    districtId: 'DIST-KOLAR',
    code: 'NHAI-BCE-EXP-4',
    name: 'Bengaluru-Chennai Expressway (Phase II) - Mulbagal & Bangarapet Section',
    requiringBody: 'National Highways Authority of India (NHAI)',
    statutoryStage: 'SECTION_38_POSSESSION_STAGE',
    currentStageLabel: 'Sec 38 Possession Handover & Escrow Disbursement',
    totalAreaHa: 275.60,
    acquiredAreaHa: 260.40,
    totalParcels: 395,
    totalKhatedars: 740,
    talukasCovered: ['Mulbagal', 'Bangarapet'],
    villagesCount: 16,
    escrowDepositedCrores: 210.00,
    disbursedCrores: 184.20,
    sec11Date: '2023-11-20',
    sec19Date: '2024-06-15',
    sec25AwardDeadline: '2025-06-15',
    daysRemainingSec25: 0,
    sec25Status: 'OK',
    statutoryCountdownDays: 8,
    activeObjectionsCount: 0,
    pendingClaimsCount: 6,
    possessionPanchnamaPending: 12,
    leadOfficer: 'Smt. Akram Pasha, IAS',
    geoCenter: [13.1367, 78.1291]
  }
];

export const MOCK_COLLECTOR_PARCELS = [
  {
    id: 'PARCEL-TH-001',
    projectId: 'PROJ-MAHSR-001',
    taluka: 'Bhiwandi',
    village: 'Anjur',
    surveyNumber: '142/1A',
    khasraGat: 'Gat No. 142/1A',
    ulpin: 'ULPIN-27-021-00142-01A',
    areaHa: 0.85,
    landClassification: 'Semi-Irrigated Agricultural',
    khatedarName: 'Dattatray Mahadev Patil & 2 Co-Sharers',
    mobileNumber: '+91 98234 11204',
    baseCircleRatePerHa: 4200000,
    salesAvgPerHa: 4650000,
    adoptedMarketRate: 4650000,
    ruralFactor: 1.6,
    multipliedMarketValue: 6324000,
    assetsValue: 940000, // 1 Borewell + 18 Mango Trees + Pump shed
    solatium: 7264000,
    interest12Pct: 871680,
    totalCompensation: 15400000,
    statutoryStage: 'AWARD_DRAFTED',
    sec21ClaimFiled: true,
    sec15ObjectionFiled: false,
    disbursementStatus: 'ESCROW_READY',
    disbursedAmount: 0,
    possessionStatus: 'PENDING_PAYMENT',
    mutationStatus: 'FREEZE_ACTIVE',
    geoBoundary: [[19.288, 73.055], [19.291, 73.058], [19.289, 73.061], [19.286, 73.057]]
  },
  {
    id: 'PARCEL-TH-002',
    projectId: 'PROJ-MAHSR-001',
    taluka: 'Bhiwandi',
    village: 'Anjur',
    surveyNumber: '144/3',
    khasraGat: 'Gat No. 144/3',
    ulpin: 'ULPIN-27-021-00144-03',
    areaHa: 1.40,
    landClassification: 'Commercial Roadside Land',
    khatedarName: 'Rameshbhai G. Thakkar',
    mobileNumber: '+91 94220 89120',
    baseCircleRatePerHa: 6800000,
    salesAvgPerHa: 7100000,
    adoptedMarketRate: 7100000,
    ruralFactor: 1.2,
    multipliedMarketValue: 11928000,
    assetsValue: 2450000, // RCC Warehouse wall + Office structure
    solatium: 14378000,
    interest12Pct: 1725360,
    totalCompensation: 30481000,
    statutoryStage: 'POSSESSION_DELIVERED',
    sec21ClaimFiled: true,
    sec15ObjectionFiled: true,
    sec15Outcome: 'OVERRULED_WITH_ADDITIONAL_STRUCTURE_COST',
    disbursementStatus: 'PAID_DBT',
    disbursedAmount: 30481000,
    possessionStatus: 'HOTO_EXECUTED',
    mutationStatus: 'MUTATED_IN_GOVT_FAVOR',
    geoBoundary: [[19.292, 73.060], [19.295, 73.064], [19.293, 73.067], [19.290, 73.063]]
  },
  {
    id: 'PARCEL-TH-003',
    projectId: 'PROJ-MAHSR-001',
    taluka: 'Kalyan',
    village: 'Kambe',
    surveyNumber: '88/2',
    khasraGat: 'Gat No. 88/2',
    ulpin: 'ULPIN-27-022-00088-02',
    areaHa: 0.60,
    landClassification: 'Irrigated Multi-crop',
    khatedarName: 'Savitribai Ramdas Gharat',
    mobileNumber: '+91 99302 44190',
    baseCircleRatePerHa: 5000000,
    salesAvgPerHa: 5200000,
    adoptedMarketRate: 5200000,
    ruralFactor: 1.6,
    multipliedMarketValue: 4992000,
    assetsValue: 560000, // 32 Chikoo trees
    solatium: 5552000,
    interest12Pct: 666240,
    totalCompensation: 11770000,
    statutoryStage: 'SECTION_77_AUTHORITY_DEPOSIT',
    sec21ClaimFiled: true,
    sec15ObjectionFiled: false,
    disbursementStatus: 'DEPOSITED_IN_LARR_AUTHORITY',
    depositReason: 'Title Dispute between Brothers pending in Civil Court (Sec 77(2))',
    disbursedAmount: 11770000,
    possessionStatus: 'POSSESSION_TAKEN_SEC38',
    mutationStatus: 'MUTATED_IN_GOVT_FAVOR',
    geoBoundary: [[19.278, 73.080], [19.281, 73.083], [19.279, 73.086], [19.276, 73.082]]
  },
  {
    id: 'PARCEL-TH-004',
    projectId: 'PROJ-MAHSR-001',
    taluka: 'Bhiwandi',
    village: 'Val',
    surveyNumber: '210/5',
    khasraGat: 'Gat No. 210/5',
    ulpin: 'ULPIN-27-021-00210-05',
    areaHa: 1.15,
    landClassification: 'Dry Crop Agricultural',
    khatedarName: 'Balu Pandurang Mhatre',
    mobileNumber: '+91 98205 77134',
    baseCircleRatePerHa: 3800000,
    salesAvgPerHa: 4100000,
    adoptedMarketRate: 4100000,
    ruralFactor: 1.6,
    multipliedMarketValue: 7544000,
    assetsValue: 320000,
    solatium: 7864000,
    interest12Pct: 943680,
    totalCompensation: 16671680,
    statutoryStage: 'NOTICE_SEC21_PUBLISHED',
    sec21ClaimFiled: false,
    sec15ObjectionFiled: false,
    disbursementStatus: 'PENDING_CLAIM_SCRUTINY',
    disbursedAmount: 0,
    possessionStatus: 'PENDING',
    mutationStatus: 'FREEZE_ACTIVE',
    geoBoundary: [[19.300, 73.070], [19.303, 73.074], [19.301, 73.078], [19.298, 73.073]]
  }
];

export const MOCK_FORM_I_INWARDS = [
  {
    id: 'FORM-I-2025-089',
    districtId: 'DIST-THANE',
    proposalTitle: 'Widening of National Highway 848 (Thane-Nashik Spur) 4 to 6 Lane',
    requiringBody: 'Maharashtra State Road Development Corporation (MSRDC)',
    submissionDate: '2025-08-14',
    totalRequiredHa: 42.60,
    talukasCovered: ['Shahapur', 'Bhiwandi'],
    villagesCount: 7,
    tentativeKhatedars: 235,
    publicPurposeCategory: 'Linear Infrastructure Corridor',
    feasibilityCheckStatus: 'INSPECTION_COMPLETED',
    inquiryOfficer: 'Shri Nilesh Gawande, SDO Bhiwandi',
    findings: {
      minimumLandAssessed: true,
      nonAgriFeasibilityExamined: true,
      noTribalScheduledAreaViolated: true,
      irrigationCommandCutMinimized: true
    },
    collectorRecommendation: 'RECOMMENDED_FOR_SEC4_SIA',
    status: 'FORWARDED_TO_STATE_APPROPRIATE_GOVT',
    slaTimerDays: 14
  },
  {
    id: 'FORM-I-2025-104',
    districtId: 'DIST-THANE',
    proposalTitle: 'Multi-Modal Logistics Park (MMLP) Bhiwandi Rail Siding Link',
    requiringBody: 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
    submissionDate: '2025-09-02',
    totalRequiredHa: 28.30,
    talukasCovered: ['Bhiwandi'],
    villagesCount: 3,
    tentativeKhatedars: 112,
    publicPurposeCategory: 'Railway / Freight Logistics',
    feasibilityCheckStatus: 'UNDER_JOINT_FIELD_VERIFICATION',
    inquiryOfficer: 'Shri Sachin Patil, Tehsildar Bhiwandi',
    findings: {
      minimumLandAssessed: true,
      nonAgriFeasibilityExamined: false,
      noTribalScheduledAreaViolated: true,
      irrigationCommandCutMinimized: false
    },
    collectorRecommendation: 'UNDER_INQUIRY',
    status: 'INQUIRY_IN_PROGRESS',
    slaTimerDays: 6
  }
];

export const MOCK_RBAC_DELEGATIONS = [
  {
    id: 'DEL-TH-001',
    orderNumber: 'REV/LAQ/SEC3G/2024/782',
    dateOfOrder: '2024-03-01',
    authorizedOfficer: 'Smt. Archana Jadhav',
    designation: 'Special Land Acquisition Officer (SLO / CALA)',
    assignedProject: 'Mumbai-Ahmedabad High Speed Rail (MAHSR-PKG-C2)',
    talukasAssigned: ['Bhiwandi', 'Kalyan'],
    statutoryScope: [
      'Section 12 Entry, Survey & Soil Soundings',
      'Section 13 Spot Damage Valuation Tender',
      'Section 15 Personal Hearing Recording',
      'Section 21 Public Notice Issuance',
      'Section 23 Award Formulation',
      'Section 38 Taking Possession of Land'
    ],
    status: 'ACTIVE',
    dscVerified: true,
    lastAuditCheck: '2025-09-18'
  },
  {
    id: 'DEL-TH-002',
    orderNumber: 'REV/LAQ/SEC3G/2024/844',
    dateOfOrder: '2024-05-15',
    authorizedOfficer: 'Shri Nilesh Gawande',
    designation: 'Sub-Divisional Magistrate (SDM), Bhiwandi',
    assignedProject: 'Vadodara-Mumbai Expressway Spur (NHAI-VME-SPUR)',
    talukasAssigned: ['Bhiwandi', 'Shahapur'],
    statutoryScope: [
      'Section 12 Survey Oversight & Panchnama',
      'Section 15 Objections Hearing Officer',
      'Panchayat & Gram Sabha Consultation',
      'Revenue Record Mutation Endorsement'
    ],
    status: 'ACTIVE',
    dscVerified: true,
    lastAuditCheck: '2025-09-20'
  },
  {
    id: 'DEL-TH-003',
    orderNumber: 'REV/LAQ/SEC3G/2024/912',
    dateOfOrder: '2024-06-10',
    authorizedOfficer: 'Shri Sachin Patil',
    designation: 'Tahsildar & Executive Magistrate, Bhiwandi',
    assignedProject: 'All Infrastructure Projects in Bhiwandi Taluka',
    talukasAssigned: ['Bhiwandi'],
    statutoryScope: [
      'Notice Serving (Sec 12, 21, 37)',
      'RoR / 7/12 Section 11(4) Mutation Freeze',
      'Spot Panchnama & Tree/Structure Count',
      'Handing Over / Taking Over (HOTO) Witness'
    ],
    status: 'ACTIVE',
    dscVerified: true,
    lastAuditCheck: '2025-09-22'
  }
];

export const MOCK_SECTION_12_SURVEYS = [
  {
    id: 'SURV-SEC12-001',
    projectId: 'PROJ-MAHSR-001',
    village: 'Anjur',
    taluka: 'Bhiwandi',
    khasraList: ['142/1A', '142/1B', '143', '144/1', '144/2', '144/3'],
    surveyTeamLead: 'Shri Sachin Patil, Tahsildar with DILR Surveyor',
    surveyDate: '2024-06-15',
    notice7DayServedDate: '2024-06-04',
    sevenDayNoticeProof: 'SERVED_AND_ACKNOWLEDGED',
    droneInspectionDone: true,
    soilBoringCompleted: true,
    boundaryPillarsErected: 16,
    damagesIncurred: [
      {
        item: 'Damage to standing okra crop and drip lateral tubes',
        khasra: '142/1A',
        owner: 'Dattatray Mahadev Patil',
        tenderedAmount: 28500,
        paidOnSpot: true,
        receiptNo: 'RCPT-SEC13-0091'
      },
      {
        item: 'Cutting of 3 sub-branches of teak tree & boundary wire mesh cut',
        khasra: '144/3',
        owner: 'Rameshbhai G. Thakkar',
        tenderedAmount: 14000,
        paidOnSpot: true,
        receiptNo: 'RCPT-SEC13-0092'
      }
    ],
    totalSec13TenderPaid: 42500,
    disputeRaised: false,
    completionCertificateIssued: true,
    certificateRef: 'SLO/THN/SURV/CERT/2024/119'
  }
];

export const MOCK_SECTION_15_OBJECTIONS = [
  {
    id: 'OBJ-SEC15-081',
    projectId: 'PROJ-MAHSR-001',
    village: 'Anjur',
    khasra: 'Gat No. 142/1A',
    objectorName: 'Dattatray Mahadev Patil',
    dateOfFiling: '2024-05-18', // Within 60 days of Sec 11 (2024-04-10)
    daysFromSec11: 38,
    isWithin60Days: true,
    groundsCategory: 'AREA_AND_RESIDUAL_VIABILITY',
    objectionSummary: 'Acquisition splits agricultural plot into two narrow unusable non-viable strips. Requests acquisition of entire survey parcel or realigning viaduct pillar 12 meters eastward.',
    hearingDateScheduled: '2024-06-28',
    presidingOfficer: 'Smt. Archana Jadhav, Dy. Collector (SLO)',
    requiringBodyPresent: 'Shri V. K. Sharma, Chief Project Manager NHSRCL',
    hearingOutcome: 'PARTIALLY_ACCEPTED',
    orderSummary: 'Spot inspection confirmed residual 0.12 Ha parcel is economically unviable. Ordered acquisition of unviable residual strip under Section 94(1) of RFCTLARR Act and revised Area Schedule.',
    status: 'RECOMMENDATION_SUBMITTED_TO_GOVT'
  },
  {
    id: 'OBJ-SEC15-082',
    projectId: 'PROJ-MAHSR-001',
    village: 'Anjur',
    khasra: 'Gat No. 144/3',
    objectorName: 'Rameshbhai G. Thakkar',
    dateOfFiling: '2024-05-25',
    daysFromSec11: 45,
    isWithin60Days: true,
    groundsCategory: 'COMMERCIAL_CLASSIFICATION',
    objectionSummary: 'Contends land is registered NA (Non-Agricultural) Commercial since 2018; circle rate applied in preliminary schedule is agricultural rate.',
    hearingDateScheduled: '2024-06-28',
    presidingOfficer: 'Smt. Archana Jadhav, Dy. Collector (SLO)',
    requiringBodyPresent: 'Shri V. K. Sharma, NHSRCL',
    hearingOutcome: 'ACCEPTED_LAND_CLASS_CORRECTED',
    orderSummary: 'Verified Collector NA Order No. 2018/NA/771. Land classification updated to Commercial Roadside with corresponding ready reckoner valuation rate.',
    status: 'RECOMMENDATION_SUBMITTED_TO_GOVT'
  },
  {
    id: 'OBJ-SEC15-083',
    projectId: 'PROJ-VME-002',
    village: 'Asangaon',
    khasra: 'Gat No. 312',
    objectorName: 'Kashinath Baban Waghe',
    dateOfFiling: '2025-09-10',
    daysFromSec11: 36,
    isWithin60Days: true,
    groundsCategory: 'MULTI_CROP_IRRIGATED_LAND',
    objectionSummary: 'Claims land is perennial canal-irrigated multi-crop land protected under Section 10(2) of RFCTLARR Act; demands alternative alignment over adjacent barren scrubland.',
    hearingDateScheduled: '2025-09-29',
    presidingOfficer: 'Shri Nilesh Gawande, SDO Bhiwandi',
    requiringBodyPresent: 'Project Director NHAI PIU Thane',
    hearingOutcome: 'HEARING_PENDING',
    orderSummary: 'Awaiting joint field verification with Irrigation Dept Executive Engineer.',
    status: 'SCHEDULED_FOR_HEARING'
  }
];

export const MOCK_RNR_DRAFT_SCHEMES = [
  {
    id: 'RNR-SCHEME-001',
    projectId: 'PROJ-MAHSR-001',
    projectName: 'Mumbai-Ahmedabad High Speed Rail (Thane Section)',
    administratorName: 'Shri M. K. Kulkarni, Dy. Collector (R&R)',
    submissionDate: '2024-11-10',
    totalAffectedFamilies: 142,
    displacedFamilies: 38,
    scheduledCasteFamilies: 14,
    scheduledTribeFamilies: 26,
    landlessLaborers: 45,
    secondScheduleEntitlements: {
      resettlementHousingUnits: 38,
      landForLandHectares: 12.5,
      subsistenceAllowanceAmount: '₹3,000/month for 12 months per family',
      oneTimeTransportationGrant: '₹50,000 per displaced family',
      cattleShedGrant: '₹25,000 per rural family with livestock',
      artisanGrant: '₹25,000 per family'
    },
    gramSabhaConsultations: [
      { village: 'Anjur', date: '2024-10-12', quorumAchieved: true, resolution: 'Unanimously approved with choice of annuity' },
      { village: 'Kambe', date: '2024-10-15', quorumAchieved: true, resolution: 'Approved with request for skill development center' }
    ],
    dlrrcReviewDate: '2024-11-28',
    dlrrcChairedBy: 'Shri Ashok Shinde, IAS (District Collector)',
    collectorRecommendation: 'RECOMMENDED_FOR_COMMISSIONER_APPROVAL',
    status: 'FORWARDED_TO_RNR_COMMISSIONER_SEC17'
  }
];

export const MOCK_SECTION_21_CLAIMS = [
  {
    id: 'CLAIM-SEC21-001',
    projectId: 'PROJ-MAHSR-001',
    village: 'Anjur',
    surveyNumber: '142/1A',
    khatedarName: 'Dattatray Mahadev Patil',
    claimDate: '2025-02-14',
    claimedAreaHa: 0.85,
    tenureType: 'Occupant Class-1 (Bhumiswami)',
    assetsClaimed: {
      openWell: '1 RCC lined open well (depth 45 ft, pump 7.5 HP)',
      trees: '18 Alphonso Mango trees (bearing fruit 12 yrs)',
      shed: 'GI sheet equipment shed 300 sq.ft'
    },
    documentsFurnished: ['7/12 RoR extract', 'Mutation Entry No. 1290', 'Non-Encumbrance 30-Yr Search Report', 'Aadhaar & Bank Passbook'],
    sec22RequisitionServed: true,
    mortgageeOrTenantClaim: 'None (Self Cultivated)',
    scrutinyStatus: 'VERIFIED_OK',
    slaClaimsWindowDays: 45
  },
  {
    id: 'CLAIM-SEC21-002',
    projectId: 'PROJ-MAHSR-001',
    village: 'Anjur',
    surveyNumber: '144/3',
    khatedarName: 'Rameshbhai G. Thakkar',
    claimDate: '2025-02-20',
    claimedAreaHa: 1.40,
    tenureType: 'Freehold Commercial Non-Agricultural',
    assetsClaimed: {
      structure: 'Commercial godown (Plinth 4500 sq.ft) with boundary wall',
      machinery: 'Weighbridge 50 MT'
    },
    documentsFurnished: ['Collector NA Order 2018', 'Approved Gram Panchayat Building Plan', 'Chartered Engineer Valuation', 'ITR Returns 3 Years'],
    sec22RequisitionServed: true,
    mortgageeOrTenantClaim: 'HDFC Bank Ltd (Commercial Mortgage hypothecated ₹80 Lakhs)',
    scrutinyStatus: 'BANK_NOC_REQUIRED_BEFORE_DISBURSEMENT',
    slaClaimsWindowDays: 45
  }
];

export const MOCK_SECTION_23_AWARDS = [
  {
    id: 'AWARD-MAHSR-THN-01',
    projectId: 'PROJ-MAHSR-001',
    awardNumber: 'LAQ/AWARD/2025/MAHSR/01',
    village: 'Anjur',
    taluka: 'Bhiwandi',
    dateOfAward: '2025-07-25',
    sec19DeclarationDate: '2025-01-18',
    sec25DeadlineDate: '2026-01-18',
    passedWithin12Months: true,
    totalAcquiredHa: 22.40,
    totalBeneficiaries: 52,
    totalCompensationAmount: 89450000,
    solatium100PctAmount: 42100000,
    additionalInterest12PctAmount: 5250000,
    awardingOfficer: 'Shri Ashok Shinde, IAS (District Collector)',
    formVIIStatus: 'SIGNED_AND_PUBLISHED',
    sec37NoticeServedCount: 52,
    sec37NoticePendingCount: 0,
    possessionHandoverStatus: 'IN_PROGRESS',
    status: 'AWARD_ENFORCED'
  },
  {
    id: 'AWARD-MAHSR-THN-02',
    projectId: 'PROJ-MAHSR-001',
    awardNumber: 'LAQ/AWARD/2025/MAHSR/02',
    village: 'Kambe & Val',
    taluka: 'Kalyan & Bhiwandi',
    dateOfAward: '2025-09-12',
    sec19DeclarationDate: '2025-01-18',
    sec25DeadlineDate: '2026-01-18',
    passedWithin12Months: true,
    totalAcquiredHa: 18.15,
    totalBeneficiaries: 38,
    totalCompensationAmount: 74200000,
    solatium100PctAmount: 34900000,
    additionalInterest12PctAmount: 4400000,
    awardingOfficer: 'Smt. Archana Jadhav (SLO CALA)',
    formVIIStatus: 'DRAFT_READY_FOR_COLLECTOR_APPROVAL',
    sec37NoticeServedCount: 0,
    sec37NoticePendingCount: 38,
    possessionHandoverStatus: 'AWAITING_PAYMENT',
    status: 'AWAITING_COLLECTOR_SIGNATURE'
  }
];

export const MOCK_STATUTORY_AUDIT_LOGS = [
  {
    id: 'AUDIT-DC-101',
    timestamp: '2025-09-24 09:42:15',
    sectionRef: 'Section 23 / 30',
    action: 'Form VII Land Acquisition Award Enforced',
    officer: 'Shri Ashok Shinde, IAS (Collector)',
    details: 'Enforced final statutory award for Village Anjur (52 Khatedars, ₹8,94,50,000 total compensation). Digital DSC applied.',
    ipHash: '10.24.112.5 • SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'AUDIT-DC-102',
    timestamp: '2025-09-22 14:18:30',
    sectionRef: 'Section 38',
    action: 'Section 38 Possession Certificate & Panchnama Executed',
    officer: 'Smt. Archana Jadhav, Dy. Collector (SLO)',
    details: 'Delivered vacant possession of 1.40 Ha (Gat 144/3) to NHSRCL after verifying 100% DBT compensation credit.',
    ipHash: '10.24.112.18 • SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'AUDIT-DC-103',
    timestamp: '2025-09-18 11:05:12',
    sectionRef: 'Section 77(2)',
    action: 'Statutory Authority Escrow Deposit Ref to LARR',
    officer: 'Shri Ashok Shinde, IAS (Collector)',
    details: 'Deposited ₹1,17,70,000 into LARR Authority Escrow for Gat No. 88/2 due to pending civil title dispute.',
    ipHash: '10.24.112.5 • SHA-256: c59275d8d06d4e82b79a5fa98e3b3a2761895a0dc0c13e4fb0ad58c67c5e73ef'
  },
  {
    id: 'AUDIT-DC-104',
    timestamp: '2025-09-15 16:30:00',
    sectionRef: 'Section 15(2)',
    action: 'Section 15 Objections Hearing Minutes Signed',
    officer: 'Smt. Archana Jadhav, Dy. Collector (SLO)',
    details: 'Conducted quasi-judicial hearing for 19 objections in Project MAHSR-PKG-C2; submitted statutory recommendation report to Govt.',
    ipHash: '10.24.112.18 • SHA-256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'AUDIT-DC-105',
    timestamp: '2025-09-10 10:15:45',
    sectionRef: 'Section 3(g)',
    action: 'Sub-Delegation Order Re-validated with DSC',
    officer: 'Shri Ashok Shinde, IAS (Collector)',
    details: 'Re-validated statutory powers under Section 3(g) to SDM Bhiwandi and SLO No. 1 Thane with 2-Factor DSC authentication.',
    ipHash: '10.24.112.5 • SHA-256: 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
  }
];
