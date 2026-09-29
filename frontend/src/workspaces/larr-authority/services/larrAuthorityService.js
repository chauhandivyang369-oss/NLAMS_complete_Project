// ============================================================================
// LARR AUTHORITY MASTER DATA & STATUTORY RULES SERVICE
// RFCTLARR Act 2013 • Sections 51 to 74 Judicial Tribunal Architecture
// ============================================================================

import { RR_MASTER_PROJECTS } from '../../rr-authority/services/rrAuthorityService.js';

// ----------------------------------------------------------------------------
// 1. CONFIGURABLE STATUTORY RULE ENGINE (Section 69, 72, 73/80, 74, 180-Day SLA)
// ----------------------------------------------------------------------------
export const STATUTORY_RULE_CONFIG = {
  ruleVersion: 'RFCTLARR-2013-CENTRAL-v2.4',
  effectiveDate: '01/01/2014',
  statutoryBase: 'Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (Act No. 30 of 2013)',
  
  // Section 69 Market Value Determination Rule
  section69: {
    ruleCode: 'RULE-SEC69-MV-FORMULA',
    title: 'Determination of Market Value by Authority',
    applicableFormula: 'M = MAX(Circle_Rate * Multiplier, Registered_Sale_Deeds_Average, Agreed_PPP_Valuation)',
    statutoryMultiplierRange: {
      urbanMin: 1.0,
      urbanMax: 1.0,
      ruralMin: 1.25,
      ruralMax: 2.0
    },
    defaultRuralMultiplier: 1.5,
    defaultUrbanMultiplier: 1.0,
    solatiumPercent: 100, // Section 69(2) & First Schedule
    additionalInterestPerAnnumPercent: 12.0, // Section 69(1) - 12% p.a. on market value
    additionalInterestStartEvent: 'Section 11(1) Preliminary Notification Date',
    additionalInterestEndEvent: 'Date of Collector Award or Physical Possession (whichever earlier)'
  },

  // Section 72 / 80 Excess Payment Interest Rules
  section72Interest: {
    ruleCode: 'RULE-SEC72-EXCESS-INTEREST',
    title: 'Interest on Excess Compensation Awarded by Authority',
    yearOneRatePercent: 9.0, // 9% for first year from date of taking possession
    subsequentYearsRatePercent: 15.0, // 15% thereafter till date of actual deposit in court
    gracePeriodDays: 365
  },

  // Section 74 High Court Limitation Rules
  section74Appeal: {
    ruleCode: 'RULE-SEC74-HC-LIMITATION',
    title: 'Appeal to the High Court',
    limitationPeriodDays: 60, // Section 74(1) - 60 days from award date
    condonationPeriodDays: 60, // Proviso to Sec 74(1) - maximum 60 days extension on sufficient cause
    forum: 'Hon\'ble High Court of the Respective State'
  },

  // Section 77 Escrow & Apportionment Rules
  section77Apportionment: {
    ruleCode: 'RULE-SEC77-APPORTIONMENT',
    title: 'Dispute as to Apportionment or Title',
    escrowInterestRatePercent: 6.85, // Current SBI Court Deposit Sweep FD Yield
    minimumDisputedFraction: '1/1'
  },

  // Statutory Disposal Timeline
  slaTimeline: {
    ruleCode: 'RULE-SEC60-180DAY-SLA',
    title: 'Statutory 180-Day Disposal Deadline',
    statutoryDisposalDays: 180,
    warningThresholdDays: 90,
    criticalThresholdDays: 150,
    escalationAuthority: 'Hon\'ble Inspecting High Court Judge & Chief Secretary (Monitoring)'
  }
};

// ----------------------------------------------------------------------------
// 2. MASTER LARR CASES (12 Realistic Judicial Cases across Stages)
// ----------------------------------------------------------------------------
export const MASTER_LARR_CASES = [
  {
    caseId: 'LARR/2026/GJ/001',
    caseNumber: 'LARR Ref. No. 01 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0042',
    referenceDate: '15/04/2026',
    registrationDate: '22/04/2026',
    receivedDate: '18/04/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand, Kheda & Vadodara',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla (Retd. Principal District & Sessions Judge)',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    
    // Project & Land Context
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight & Multimodal Logistics Corridor (Petlad-Sunav Segment)',
    requiringBody: 'Ministry of Railways / Western Railway (Vadodara Division)',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector & District Magistrate, Anand (Land Acquisition Branch)',
    collectorAwardNumber: 'LA/AWARD/2025/PETLAD-09',
    collectorAwardDate: '10/01/2026',
    depositDate: '28/01/2026',
    possessionDate: '15/02/2026',
    sec11Date: '15/03/2024',
    
    // Claimant Context
    claimantName: 'Rameshwar Laljibhai Patel & 3 Ors',
    claimantCategory: 'Agricultural Landowners (Perennial Irrigated Tobacco/Banana)',
    claimantAddress: 'Station Road, At & Post Petlad, Taluka Petlad, District Anand - 388450',
    claimantAdvocate: 'Adv. Hiren K. Brahmbhatt (Bar Council of Gujarat G/1429/1998)',
    respondentAdvocates: [
      { party: 'Collector Anand', advocate: 'Government Pleader (Shri P.C. Trivedi)' },
      { party: 'Western Railway', advocate: 'Senior Standing Railway Counsel (Adv. Rajiv Mehta)' }
    ],
    ulpin: 'GJ24ANDPET010189',
    surveyNumber: '108/1-P',
    parcelId: 'PARCEL-GJ-ANAND-0189',
    acquiredAreaHectares: 0.8500,
    acquiredAreaSqM: 8500,
    landType: 'Perennially Irrigated Jirayat Agricultural with Tube-well Conduit',
    village: 'Petlad',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',

    // Financials
    collectorAward: {
      basicLandRatePerSqM: 1400,
      totalBasicLandValue: 11900000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 17850000,
      immovableAssetsValue: 850000, // Irrigation tubewell + pump house + 45 fruit trees
      solatiumAmount: 18700000, // 100%
      additionalInterest12Percent: 4114000, // From Sec 11 (15/03/2024) to Award (10/01/2026)
      totalCollectorAwardAmount: 41514000,
      amountDepositedInEscrow: 41514000,
      amountDisbursedToDate: 41514000
    },

    // Claimed vs Adjudicated Values
    enhancementClaim: {
      claimedMarketRatePerSqM: 3200,
      claimBasis: 'NH-64 frontage commercial zone + registered sale deed of adjoining survey 109/2 dated 04/02/2024 @ ₹3,150/sq.m',
      claimedTotalAmount: 94800000,
      groundsOfObjection: 'Collector erred by ignoring bona fide sale exemplar Doc No. 1422/2024 of adjoining parcel; applied circle rate of dry crop land instead of command-zone irrigated parcel with live tubewell.',
      sec64Prayer: 'Enhancement of market rate from ₹1,400 to ₹3,200 per sq.m with statutory 100% solatium, 12% additional interest, and 9%/15% excess interest.'
    },

    // Judicial Workflow Status
    stage: 'HEARING_COMPLETED', // Stages: RECEIVED, SCRUTINY, REGISTERED, SUMMONS, PLEADINGS, EVIDENCE, HEARING, AWARD_DRAFT, AWARD_SIGNED, APPORTIONMENT, APPEAL, EXECUTION, DISPOSED
    status: 'Hearing Concluded - Judgment Reserved',
    referenceType: 'Section 64 Reference (Compensation & Valuation)',
    slaDaysElapsed: 161,
    slaDaysRemaining: 19,
    slaStatus: 'CRITICAL', // NORMAL (<90), WARNING (90-150), CRITICAL (>150), BREACHED (>180)
    adjournmentCount: 3,
    lastHearingDate: '18/09/2026',
    nextHearingDate: '26/09/2026',
    nextListingPurpose: 'Pronouncement of Section 69 Award Decree',
    benchType: 'Single Bench (Presiding Officer)',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-GUJ-01-ROOM4',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-anand-001',

    // Calculated Enhanced Award (Draft / Under Pronouncement)
    enhancedAwardPreview: {
      adjudicatedMarketRatePerSqM: 2650,
      adjudicatedBasicLandValue: 22525000,
      ruralMultiplier: 1.5,
      adjudicatedMultipliedLandValue: 33787500,
      adjudicatedAssetsValue: 1250000, // Revalued including severance of irrigation duct
      adjudicatedSolatium: 35037500, // 100%
      additionalInterest12Percent: 7708250,
      excessInterest9PercentYr1: 3121000,
      totalJudicialAwardAmount: 80904250,
      collectorAwardDeduction: 41514000,
      netDifferentialPayableCr: 3.939,
      netDifferentialPayableExact: 39390250,
      paymentDeadlineDays: 90
    }
  },
  {
    caseId: 'LARR/2026/GJ/002',
    caseNumber: 'LARR Ref. No. 02 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0043',
    referenceDate: '10/05/2026',
    registrationDate: '18/05/2026',
    receivedDate: '14/05/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight Corridor (Petlad-Sunav Segment)',
    requiringBody: 'Ministry of Railways / Western Railway',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector Anand',
    collectorAwardNumber: 'LA/AWARD/2025/PETLAD-10',
    collectorAwardDate: '18/01/2026',
    depositDate: '02/02/2026',
    possessionDate: '20/02/2026',
    sec11Date: '15/03/2024',
    claimantName: 'Bhikhabhai Revabhai Vankar & Co-Sharers',
    claimantCategory: 'Scheduled Caste Agricultural Tenancy Claimants',
    claimantAddress: 'Vankarvas, Sunav, Taluka Petlad, Anand - 388450',
    claimantAdvocate: 'Adv. Nitin R. Solanki (Legal Aid Counsel)',
    respondentAdvocates: [
      { party: 'Collector Anand', advocate: 'Assistant Govt Pleader (Ms. S.K. Joshi)' }
    ],
    ulpin: 'GJ24ANDPET010190',
    surveyNumber: '112/3-B',
    parcelId: 'PARCEL-GJ-ANAND-0190',
    acquiredAreaHectares: 0.4200,
    acquiredAreaSqM: 4200,
    landType: 'Jirayat Agricultural',
    village: 'Sunav',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',
    collectorAward: {
      basicLandRatePerSqM: 1150,
      totalBasicLandValue: 4830000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 7245000,
      immovableAssetsValue: 120000,
      solatiumAmount: 7365000,
      additionalInterest12Percent: 1620300,
      totalCollectorAwardAmount: 16350300,
      amountDepositedInEscrow: 16350300,
      amountDisbursedToDate: 0 // In escrow due to title partition contest
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 2100,
      claimBasis: 'Tribal Sub-Plan Area Safeguard under Section 41(6) additional one-third compensation omitted',
      claimedTotalAmount: 38500000,
      groundsOfObjection: 'Collector ignored statutory mandate of Section 41(6) for Scheduled Castes / Scheduled Tribes community land, awarding plain general rate without mandatory 33.3% additional grant.',
      sec64Prayer: 'Grant of statutory 33.33% additional compensation under Section 41(6) along with enhancement of basic land value.'
    },
    stage: 'EVIDENCE_RECORDING',
    status: 'Claimant Evidence Concluded; Cross-Examination of Dy. Collector Scheduled',
    referenceType: 'Section 64 Reference & Section 77 Apportionment Contest',
    slaDaysElapsed: 136,
    slaDaysRemaining: 44,
    slaStatus: 'WARNING',
    adjournmentCount: 2,
    lastHearingDate: '12/09/2026',
    nextHearingDate: '29/09/2026',
    nextListingPurpose: 'Cross-Examination of Special Land Acquisition Officer',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-GUJ-01-ROOM2',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-anand-002',
    enhancedAwardPreview: null
  },
  {
    caseId: 'LARR/2026/GJ/003',
    caseNumber: 'LARR Ref. No. 03 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0044',
    referenceDate: '02/06/2026',
    registrationDate: '08/06/2026',
    receivedDate: '04/06/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight Corridor (Petlad Segment)',
    requiringBody: 'Ministry of Railways / Western Railway',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector Anand',
    collectorAwardNumber: 'LA/AWARD/2025/PETLAD-11',
    collectorAwardDate: '22/01/2026',
    depositDate: '05/02/2026',
    possessionDate: '25/02/2026',
    sec11Date: '15/03/2024',
    claimantName: 'Legal Heirs of Late Manilal Purushottamdas Rathod (Dispute inter-se)',
    claimantCategory: 'Partition & Title Contest under Section 77',
    claimantAddress: 'Kasar Bazar, Petlad, Anand - 388450',
    claimantAdvocate: 'Adv. D.M. Parekh & Adv. J.B. Vaghela (Competing Counsels)',
    respondentAdvocates: [
      { party: 'Collector Anand', advocate: 'AGP Shri P.C. Trivedi' }
    ],
    ulpin: 'GJ24ANDPET010192',
    surveyNumber: '115/1+2',
    parcelId: 'PARCEL-GJ-ANAND-0192',
    acquiredAreaHectares: 0.6500,
    acquiredAreaSqM: 6500,
    landType: 'Commercial Non-Agricultural (Godown & Saw-mill)',
    village: 'Petlad',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',
    collectorAward: {
      basicLandRatePerSqM: 2800,
      totalBasicLandValue: 18200000,
      ruralMultiplier: 1.0, // Urban classification applied
      multipliedLandValue: 18200000,
      immovableAssetsValue: 3450000,
      solatiumAmount: 21650000,
      additionalInterest12Percent: 4763000,
      totalCollectorAwardAmount: 48063000,
      amountDepositedInEscrow: 48063000, // Deposited in SBI Treasury Escrow pursuant to Sec 77
      amountDisbursedToDate: 0
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 4500,
      claimBasis: 'Section 77 inter-se title partition among 4 branches + commercial valuation of sawmill structure',
      claimedTotalAmount: 76000000,
      groundsOfObjection: 'Branch A claims 50% under registered will 2012; Branch B challenges will as forged and seeks 1/4th equal ancestral devolution; compensation withheld by Collector under Sec 77.',
      sec64Prayer: 'Adjudication of lawful title shares under Section 77 and disbursement from court escrow with accrued bank interest.'
    },
    stage: 'APPORTIONMENT_ADJUDICATION',
    status: 'Section 77 Share Split Matrix Under Scrutiny; Compromise Terms Filed',
    referenceType: 'Section 77 Apportionment & Title Adjudication',
    slaDaysElapsed: 113,
    slaDaysRemaining: 67,
    slaStatus: 'WARNING',
    adjournmentCount: 1,
    lastHearingDate: '15/09/2026',
    nextHearingDate: '03/10/2026',
    nextListingPurpose: 'Recording of Statements on Consent Terms & Share Apportionment',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-GUJ-01-ROOM3',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-anand-003',
    enhancedAwardPreview: null
  },
  {
    caseId: 'LARR/2026/GJ/004',
    caseNumber: 'LARR Ref. No. 04 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0045',
    referenceDate: '20/06/2026',
    registrationDate: '26/06/2026',
    receivedDate: '22/06/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight Corridor (Petlad Segment)',
    requiringBody: 'Western Railway',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector Anand',
    collectorAwardNumber: 'LA/AWARD/2025/PETLAD-12',
    collectorAwardDate: '28/01/2026',
    depositDate: '10/02/2026',
    possessionDate: '01/03/2026',
    sec11Date: '15/03/2024',
    claimantName: 'Sunav Gram Panchayat & 14 Village Farmers',
    claimantCategory: 'Community Pasture & Irrigation Pipeline Severance Claimants',
    claimantAddress: 'Gram Panchayat Bhavan, Sunav, Petlad, Anand - 388450',
    claimantAdvocate: 'Adv. Kalpesh S. Barot',
    respondentAdvocates: [
      { party: 'Collector Anand', advocate: 'AGP Shri P.C. Trivedi' },
      { party: 'Western Railway', advocate: 'Adv. Rajiv Mehta' }
    ],
    ulpin: 'GJ24ANDPET010195',
    surveyNumber: '94/Gao-P',
    parcelId: 'PARCEL-GJ-ANAND-0195',
    acquiredAreaHectares: 1.2000,
    acquiredAreaSqM: 12000,
    landType: 'Gaothan / Village Common Land & Feeder Canal Corridor',
    village: 'Sunav',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',
    collectorAward: {
      basicLandRatePerSqM: 950,
      totalBasicLandValue: 11400000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 17100000,
      immovableAssetsValue: 420000,
      solatiumAmount: 17520000,
      additionalInterest12Percent: 3854400,
      totalCollectorAwardAmount: 38894400,
      amountDepositedInEscrow: 38894400,
      amountDisbursedToDate: 38894400
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 1800,
      claimBasis: 'Damage to unacquired contiguous land under Section 69(1) clause fourthly (severance of irrigation pipeline)',
      claimedTotalAmount: 62000000,
      groundsOfObjection: 'Rail high embankment bisects village conduit supplying 18 Ha fields, rendering remaining land sterile; compensation for severance and drainage under Section 69(1) Fourthly not granted.',
      sec64Prayer: 'Severance compensation and direction to Railway to construct dedicated pipe crossing under Section 69 award decree.'
    },
    stage: 'PLEADINGS_COMPLETED',
    status: 'Written Statements Filed by WR; Issues Framed by Authority',
    referenceType: 'Section 64 Reference (Severance & Injuriously Affecting Remaining Land)',
    slaDaysElapsed: 95,
    slaDaysRemaining: 85,
    slaStatus: 'WARNING',
    adjournmentCount: 0,
    lastHearingDate: '10/09/2026',
    nextHearingDate: '08/10/2026',
    nextListingPurpose: 'Examination of Court Commissioner (Executive Engineer, Irrigation)',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-GUJ-01-ROOM1',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-anand-001',
    enhancedAwardPreview: null
  },
  {
    caseId: 'LARR/2026/PB/005',
    caseNumber: 'LARR Ref. No. 14 of 2026',
    referenceNumber: 'REF-PATIALA-SEC64-2026-0012',
    referenceDate: '12/07/2026',
    registrationDate: '20/07/2026',
    receivedDate: '15/07/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Patiala & Fatehgarh Sahib Bench',
    jurisdiction: 'District Patiala & Fatehgarh Sahib',
    location: 'Judicial Court Complex, Patiala, Punjab',
    presidingOfficer: 'Hon\'ble Smt. Justice Harpreet Kaur Sandhu (Retd. District Judge)',
    registrar: 'Shri Gurpreet Singh Kang, PCS (Judicial)',
    judicialClerk: 'Shri Navjot Singh Brar',
    projectId: 'REQ-2025-NHAI-041',
    projectCode: 'NH-44-PKG3',
    projectName: 'Delhi-Amritsar-Katra Expressway (Package 3 - Rajpura Bypass)',
    requiringBody: 'National Highways Authority of India (NHAI)',
    appropriateGovernment: 'MoRTH & Revenue Dept, Govt of Punjab',
    collectorName: 'Competent Authority for Land Acquisition (CALA) / SDM Rajpura',
    collectorAwardNumber: 'CALA/NHAI/2025/RAJ-44',
    collectorAwardDate: '05/02/2026',
    depositDate: '20/02/2026',
    possessionDate: '15/03/2026',
    sec11Date: '20/04/2024',
    claimantName: 'Sardar Baldev Singh Dhillon & Brothers',
    claimantCategory: 'Highway Commercial-Potential Agricultural Landowners',
    claimantAddress: 'Village Kheri Gurna, GT Road, Tehsil Rajpura, Patiala - 140401',
    claimantAdvocate: 'Adv. Manjit Singh Sekhon (Punjab & Haryana High Court Bar)',
    respondentAdvocates: [
      { party: 'CALA Rajpura', advocate: 'District Attorney Patiala' },
      { party: 'NHAI Project Director', advocate: 'Adv. Sandeep Suri' }
    ],
    ulpin: 'PB08PATRAJ020312',
    surveyNumber: '142//15/2',
    parcelId: 'PARCEL-PB-PAT-0312',
    acquiredAreaHectares: 1.1500,
    acquiredAreaSqM: 11500,
    landType: 'Chahi (Irrigated) with Commercial Toll/Fuel-station Potential',
    village: 'Kheri Gurna',
    taluka: 'Rajpura',
    district: 'Patiala',
    state: 'Punjab',
    collectorAward: {
      basicLandRatePerSqM: 1850,
      totalBasicLandValue: 21275000,
      ruralMultiplier: 1.25,
      multipliedLandValue: 26593750,
      immovableAssetsValue: 1800000,
      solatiumAmount: 28393750,
      additionalInterest12Percent: 5849000,
      totalCollectorAwardAmount: 62636500,
      amountDepositedInEscrow: 62636500,
      amountDisbursedToDate: 62636500
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 4200,
      claimBasis: 'National Highway frontage exemplar sale deeds of commercial showroom sites adjoining Shambhu Barrier',
      claimedTotalAmount: 135000000,
      groundsOfObjection: 'Collector mechanically applied agricultural circle rate without considering 120-meter direct National Highway frontage and recent commercial sales @ ₹4,500/sq.m.',
      sec64Prayer: 'Award enhancement to ₹4,200/sq.m with full statutory benefits and interest.'
    },
    stage: 'SUMMONS_DISPATCHED',
    status: 'Summons Served on NHAI Project Director Ambala; Written Statement Awaited',
    referenceType: 'Section 64 Reference (Highway Commercial Potential)',
    slaDaysElapsed: 73,
    slaDaysRemaining: 107,
    slaStatus: 'NORMAL',
    adjournmentCount: 0,
    lastHearingDate: '05/09/2026',
    nextHearingDate: '12/10/2026',
    nextListingPurpose: 'Filing of Written Statement by NHAI',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-PB-02-ROOM1',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-patiala-001',
    enhancedAwardPreview: null
  },
  {
    caseId: 'LARR/2026/MH/006',
    caseNumber: 'LARR Ref. No. 08 of 2026',
    referenceNumber: 'REF-PUNE-SEC64-2026-0089',
    referenceDate: '10/01/2026',
    registrationDate: '18/01/2026',
    receivedDate: '12/01/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Pune Division Bench',
    jurisdiction: 'District Pune & Satara',
    location: 'Shivajinagar District Court Annex, Pune, Maharashtra',
    presidingOfficer: 'Hon\'ble Shri Justice Vinayak S. Kulkarni (Retd. District Judge)',
    registrar: 'Shri Sachin P. Deshmukh, MJS',
    judicialClerk: 'Shri Prasad R. Kadam',
    projectId: 'NLAMS-PRJ-2025-0108',
    projectCode: 'MAHA-RING-PKG2',
    projectName: 'Pune Ring Road Eastern Alignment (Maval-Haveli Sector)',
    requiringBody: 'Maharashtra State Road Development Corporation (MSRDC)',
    appropriateGovernment: 'Urban Development & Revenue Dept, Govt of Maharashtra',
    collectorName: 'Collector Pune (SLAO Metro Projects)',
    collectorAwardNumber: 'SLAO/MSRDC/AWARD/2025/88',
    collectorAwardDate: '15/10/2025',
    depositDate: '01/11/2025',
    possessionDate: '15/12/2025',
    sec11Date: '10/01/2024',
    claimantName: 'Kailash Baburao Tapkir & 6 Others',
    claimantCategory: 'Peri-Urban Industrial Zone Landowners',
    claimantAddress: 'Wadgaon Shinde, Haveli, Pune - 412207',
    claimantAdvocate: 'Adv. Shreerang V. Joshi',
    respondentAdvocates: [
      { party: 'Collector Pune', advocate: 'District Govt Pleader' },
      { party: 'MSRDC', advocate: 'Adv. Milind Sathe & Associates' }
    ],
    ulpin: 'MH26PUNHAV030114',
    surveyNumber: '88/2-A',
    parcelId: 'PARCEL-MH-PUN-0114',
    acquiredAreaHectares: 0.9200,
    acquiredAreaSqM: 9200,
    landType: 'Non-Agricultural Industrial Ready (PMRDA Sanctioned)',
    village: 'Wadgaon Shinde',
    taluka: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    collectorAward: {
      basicLandRatePerSqM: 4200,
      totalBasicLandValue: 38640000,
      ruralMultiplier: 1.0,
      multipliedLandValue: 38640000,
      immovableAssetsValue: 2400000,
      solatiumAmount: 41040000,
      additionalInterest12Percent: 8820000,
      totalCollectorAwardAmount: 88500000,
      amountDepositedInEscrow: 88500000,
      amountDisbursedToDate: 88500000
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 8500,
      claimBasis: 'MIDC Chakan-Markal corridor logistics hub sale deeds @ ₹9,200/sq.m',
      claimedTotalAmount: 182000000,
      groundsOfObjection: 'Land already rezoned to Industrial Logistics by PMRDA; Collector applied old semi-urban residential ready reckoner rates arbitrarily.',
      sec64Prayer: 'Award enhancement to ₹8,500/sq.m with statutory multiplier and solatium.'
    },
    stage: 'SECTION_74_APPEAL_PENDING',
    status: 'Award Pronounced; High Court Appeal First Appeal No. 441/2026 Filed by MSRDC',
    referenceType: 'Section 64 Award Enhanced & Appealed under Section 74',
    slaDaysElapsed: 256,
    slaDaysRemaining: 0,
    slaStatus: 'BREACHED', // Disposed in Authority on Day 174, currently in Sec 74 Appeal
    adjournmentCount: 4,
    lastHearingDate: '15/07/2026',
    nextHearingDate: '18/10/2026',
    nextListingPurpose: 'High Court Record Transmission & Stay Verification',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-MH-01-ROOM1',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-pune-001',
    enhancedAwardPreview: {
      adjudicatedMarketRatePerSqM: 6800,
      adjudicatedBasicLandValue: 62560000,
      ruralMultiplier: 1.0,
      adjudicatedMultipliedLandValue: 62560000,
      adjudicatedAssetsValue: 3100000,
      adjudicatedSolatium: 65660000,
      additionalInterest12Percent: 14112000,
      excessInterest9PercentYr1: 5210000,
      totalJudicialAwardAmount: 147532000,
      collectorAwardDeduction: 88500000,
      netDifferentialPayableCr: 5.903,
      netDifferentialPayableExact: 59032000,
      paymentDeadlineDays: 90
    },
    highCourtAppealDetails: {
      appealNumber: 'FA/441/2026',
      highCourt: 'Hon\'ble High Court of Judicature at Bombay (Civil Appellate Jurisdiction)',
      appellant: 'Managing Director, MSRDC, Mumbai',
      respondent: 'Kailash Baburao Tapkir & Others',
      filingDate: '14/08/2026',
      limitationExpired: false,
      stayApplicationNo: 'IA/882/2026',
      stayStatus: 'CONDITIONAL_STAY_GRANTED',
      stayCondition: 'Stay granted subject to 50% deposit of enhanced amount (₹2.95 Cr) in High Court Registry within 6 weeks',
      nextHighCourtDate: '24/11/2026'
    }
  },
  {
    caseId: 'LARR/2026/KA/007',
    caseNumber: 'LARR Ref. No. 19 of 2026',
    referenceNumber: 'REF-BENGALURU-SEC64-2026-0033',
    referenceDate: '01/03/2026',
    registrationDate: '09/03/2026',
    receivedDate: '05/03/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Bengaluru Urban & Rural Bench',
    jurisdiction: 'Bengaluru Urban & Rural',
    location: 'City Civil Court Complex, Bengaluru, Karnataka',
    presidingOfficer: 'Hon\'ble Shri Justice B.S. Chennabasappa',
    registrar: 'Smt. Roopa K. Gowda, KJS',
    judicialClerk: 'Shri Manjunath H.',
    projectId: 'NLAMS-PRJ-2025-0219',
    projectCode: 'BMRCL-PH3-ORR',
    projectName: 'Bengaluru Metro Rail Phase 3 (Outer Ring Road West Line)',
    requiringBody: 'Bangalore Metro Rail Corporation Limited (BMRCL)',
    appropriateGovernment: 'Urban Development Dept, Govt of Karnataka',
    collectorName: 'Special Land Acquisition Officer, BMRCL Project',
    collectorAwardNumber: 'SLAO/BMRCL/PH3/2025/19',
    collectorAwardDate: '20/11/2025',
    depositDate: '08/12/2025',
    possessionDate: '10/01/2026',
    sec11Date: '14/02/2024',
    claimantName: 'M/s Golden Steels Rolling Mills Pvt Ltd',
    claimantCategory: 'Commercial Industrial Unit Displaced Claimant',
    claimantAddress: 'Sy No 42, Hebbal Outer Ring Road, Bengaluru - 560024',
    claimantAdvocate: 'Adv. Sajan Poovayya Associates',
    respondentAdvocates: [
      { party: 'BMRCL', advocate: 'Adv. Harish Kumar N.' }
    ],
    ulpin: 'KA18BLRURB040188',
    surveyNumber: '42/1-B',
    parcelId: 'PARCEL-KA-BLR-0188',
    acquiredAreaHectares: 0.3500,
    acquiredAreaSqM: 3500,
    landType: 'Commercial Main Road Frontage',
    village: 'Hebbal',
    taluka: 'Bengaluru North',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    collectorAward: {
      basicLandRatePerSqM: 9500,
      totalBasicLandValue: 33250000,
      ruralMultiplier: 1.0,
      multipliedLandValue: 33250000,
      immovableAssetsValue: 14500000, // Factory shed, 5-ton EOT crane gantry, sub-station
      solatiumAmount: 47750000,
      additionalInterest12Percent: 10450000,
      totalCollectorAwardAmount: 105950000,
      amountDepositedInEscrow: 105950000,
      amountDisbursedToDate: 105950000
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 18500,
      claimBasis: 'BMRCL commercial corridor guidancerate and business dislocation under Sec 69(1) Sixthly',
      claimedTotalAmount: 245000000,
      groundsOfObjection: 'Factory fully shuttered; SLAO refused loss of business earnings and dismantling/shifting charges under Sec 69(1) fifthly and sixthly.',
      sec64Prayer: 'Award enhancement for land, commercial dislocation damages, and crane re-erection costs.'
    },
    stage: 'EXECUTION_RECOVERY',
    status: 'Award Pronounced; Execution Petition EP No. 12/2026 Filed by Decree Holder',
    referenceType: 'Section 69 Award Execution under CPC Order XXI',
    slaDaysElapsed: 206,
    slaDaysRemaining: 0,
    slaStatus: 'BREACHED',
    adjournmentCount: 2,
    lastHearingDate: '14/09/2026',
    nextHearingDate: '06/10/2026',
    nextListingPurpose: 'Garnishee Order Hearing on BMRCL Bank Accounts for Recovery',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-KA-01-ROOM2',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-blr-001',
    enhancedAwardPreview: {
      adjudicatedMarketRatePerSqM: 14200,
      adjudicatedBasicLandValue: 49700000,
      ruralMultiplier: 1.0,
      adjudicatedMultipliedLandValue: 49700000,
      adjudicatedAssetsValue: 22800000,
      adjudicatedSolatium: 72500000,
      additionalInterest12Percent: 15870000,
      excessInterest9PercentYr1: 5820000,
      totalJudicialAwardAmount: 166690000,
      collectorAwardDeduction: 105950000,
      netDifferentialPayableCr: 6.074,
      netDifferentialPayableExact: 60740000,
      paymentDeadlineDays: 60
    },
    executionDetails: {
      epNumber: 'EP/12/2026',
      decreeDate: '12/06/2026',
      executionApplicant: 'M/s Golden Steels Rolling Mills Pvt Ltd',
      judgmentDebtor: 'Managing Director, BMRCL, BMTC Shanthinagar Complex',
      decreeAmountCr: 6.074,
      amountRecoveredCr: 0,
      outstandingAmountCr: 6.074,
      warrantIssued: 'Treasury Warrant / Attachment of Commercial Account under Sec 70',
      warrantStatus: 'WARRANT_ACTIVE'
    }
  },
  {
    caseId: 'LARR/2026/GJ/008',
    caseNumber: 'LARR Ref. No. 22 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0051',
    referenceDate: '28/08/2026',
    registrationDate: null,
    receivedDate: '02/09/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight Corridor (Nar Segment)',
    requiringBody: 'Ministry of Railways / Western Railway',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector Anand',
    collectorAwardNumber: 'LA/AWARD/2026/PETLAD-18',
    collectorAwardDate: '14/06/2026',
    depositDate: '05/07/2026',
    possessionDate: '20/07/2026',
    sec11Date: '15/03/2024',
    claimantName: 'Jagdishbhai Shankarbhai Parmar',
    claimantCategory: 'Agricultural Landowner',
    claimantAddress: 'Gam Nar, Taluka Petlad, Anand - 388450',
    claimantAdvocate: 'Adv. M.S. Chavda',
    respondentAdvocates: [],
    ulpin: 'GJ24ANDPET010198',
    surveyNumber: '148/2',
    parcelId: 'PARCEL-GJ-ANAND-0198',
    acquiredAreaHectares: 0.5200,
    acquiredAreaSqM: 5200,
    landType: 'Jirayat Dry Crop Land',
    village: 'Nar',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',
    collectorAward: {
      basicLandRatePerSqM: 880,
      totalBasicLandValue: 4576000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 6864000,
      immovableAssetsValue: 180000,
      solatiumAmount: 7044000,
      additionalInterest12Percent: 1549680,
      totalCollectorAwardAmount: 15637680,
      amountDepositedInEscrow: 15637680,
      amountDisbursedToDate: 15637680
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 1650,
      claimBasis: 'State Highway 188 connectivity and recent residential NA conversion in vicinity',
      claimedTotalAmount: 29500000,
      groundsOfObjection: 'Valuation flawed; neglected proximate residential plots.',
      sec64Prayer: 'Enhance to ₹1,650/sq.m with full solatium.'
    },
    stage: 'UNDER_SCRUTINY',
    status: 'Scrutiny by Filing Section - Defect Memo Raised',
    referenceType: 'Section 64 Inward Reference',
    slaDaysElapsed: 26,
    slaDaysRemaining: 154,
    slaStatus: 'NORMAL',
    adjournmentCount: 0,
    lastHearingDate: null,
    nextHearingDate: null,
    nextListingPurpose: 'Curing of Scrutiny Defects by Collector Anand',
    benchType: 'Registry Scrutiny Desk',
    virtualCourtroomAvailable: false,
    virtualMeetingId: null,
    virtualMeetingLink: null,
    enhancedAwardPreview: null,
    defectMemo: {
      memoNumber: 'DEF-LARR-GJ-2026-0018',
      memoDate: '08/09/2026',
      defects: [
        'Form-VIII Section 64 Reference statement lacks Collector official seal and signature on page 4.',
        'Section 65 Schedule of interested persons does not tally with Jamabandi 7/12 extract dated within 3 months.',
        'ULPIN spatial boundary GIS shapefile not appended with the digital submission package.'
      ],
      complianceDeadlineDays: 14,
      status: 'AWAITING_RECTIFICATION'
    }
  },
  {
    caseId: 'LARR/2026/GJ/009',
    caseNumber: 'LARR Ref. No. 25 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0056',
    referenceDate: '15/09/2026',
    registrationDate: null,
    receivedDate: '20/09/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight Corridor (Demol Segment)',
    requiringBody: 'Western Railway',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector Anand',
    collectorAwardNumber: 'LA/AWARD/2026/PETLAD-21',
    collectorAwardDate: '22/07/2026',
    depositDate: '15/08/2026',
    possessionDate: '01/09/2026',
    sec11Date: '15/03/2024',
    claimantName: 'Kantilal Somabhai Prajapati & 2 Ors',
    claimantCategory: 'Artisans & Pottery Kiln Operators',
    claimantAddress: 'Kumbhar Vas, Village Demol, Taluka Petlad - 388450',
    claimantAdvocate: 'Adv. R.P. Solanki',
    respondentAdvocates: [],
    ulpin: 'GJ24ANDPET010202',
    surveyNumber: '61/1',
    parcelId: 'PARCEL-GJ-ANAND-0202',
    acquiredAreaHectares: 0.2800,
    acquiredAreaSqM: 2800,
    landType: 'Village Abadi / Artisan Kiln Ground',
    village: 'Demol',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',
    collectorAward: {
      basicLandRatePerSqM: 750,
      totalBasicLandValue: 2100000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 3150000,
      immovableAssetsValue: 350000, // Two traditional kiln furnaces
      solatiumAmount: 3500000,
      additionalInterest12Percent: 770000,
      totalCollectorAwardAmount: 7770000,
      amountDepositedInEscrow: 7770000,
      amountDisbursedToDate: 7770000
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 1400,
      claimBasis: 'Loss of pottery livelihood and specialized clay pit severance',
      claimedTotalAmount: 18500000,
      groundsOfObjection: 'Inadequate valuation of industrial pottery structures and kiln equipment.',
      sec64Prayer: 'Enhance land and artisan equipment compensation.'
    },
    stage: 'REFERENCE_RECEIVED',
    status: 'Fresh Inward Reference Received from Collector Anand; Queued for Registrar Scrutiny',
    referenceType: 'Section 64 Inward Reference',
    slaDaysElapsed: 8,
    slaDaysRemaining: 172,
    slaStatus: 'NORMAL',
    adjournmentCount: 0,
    lastHearingDate: null,
    nextHearingDate: null,
    nextListingPurpose: 'Preliminary Registry Scrutiny',
    benchType: 'Registry Inward Desk',
    virtualCourtroomAvailable: false,
    virtualMeetingId: null,
    virtualMeetingLink: null,
    enhancedAwardPreview: null
  },
  {
    caseId: 'LARR/2026/UP/010',
    caseNumber: 'LARR Ref. No. 42 of 2026',
    referenceNumber: 'REF-NOIDA-SEC64-2026-0091',
    referenceDate: '10/02/2026',
    registrationDate: '18/02/2026',
    receivedDate: '14/02/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Meerut & Gautam Buddha Nagar Bench',
    jurisdiction: 'Gautam Buddha Nagar & Meerut',
    location: 'Collectorate Judicial Complex, Greater Noida, UP',
    presidingOfficer: 'Hon\'ble Shri Justice Anand Prakash Tiwari',
    registrar: 'Shri Manoj Kumar Sharma, UPJS',
    judicialClerk: 'Shri Rakesh Verma',
    projectId: 'NLAMS-PRJ-2025-0310',
    projectCode: 'NIA-JEWAR-PH2',
    projectName: 'Noida International Airport (Jewar Phase 2 Multimodal Transport Terminal)',
    requiringBody: 'Noida International Airport Limited (NIAL) / YIAPL',
    appropriateGovernment: 'Civil Aviation & Revenue Dept, Govt of Uttar Pradesh',
    collectorName: 'Collector / ADM (Land Acquisition), Gautam Buddha Nagar',
    collectorAwardNumber: 'ADM/LA/JEWAR/2025/104',
    collectorAwardDate: '10/12/2025',
    depositDate: '28/12/2025',
    possessionDate: '15/01/2026',
    sec11Date: '20/02/2024',
    claimantName: 'Chaudhary Surendra Singh & 12 Co-Farmers',
    claimantCategory: 'Airport Buffer Zone Agricultural Landowners',
    claimantAddress: 'Village Ranhera, Jewar, Gautam Buddha Nagar - 203135',
    claimantAdvocate: 'Adv. Ajay Pratap Singh',
    respondentAdvocates: [
      { party: 'Collector GB Nagar', advocate: 'Chief Standing Counsel' },
      { party: 'NIAL', advocate: 'Adv. Pradeep Rai' }
    ],
    ulpin: 'UP09GBNJEW010411',
    surveyNumber: '210/1',
    parcelId: 'PARCEL-UP-GBN-0411',
    acquiredAreaHectares: 2.4500,
    acquiredAreaSqM: 24500,
    landType: 'Command Zone Agricultural / Multi-crop',
    village: 'Ranhera',
    taluka: 'Jewar',
    district: 'Gautam Buddha Nagar',
    state: 'Uttar Pradesh',
    collectorAward: {
      basicLandRatePerSqM: 2300,
      totalBasicLandValue: 56350000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 84525000,
      immovableAssetsValue: 3200000,
      solatiumAmount: 87725000,
      additionalInterest12Percent: 19299500,
      totalCollectorAwardAmount: 194749500,
      amountDepositedInEscrow: 194749500,
      amountDisbursedToDate: 194749500
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 5500,
      claimBasis: 'Yamuna Expressway Industrial Development Authority (YEIDA) commercial master plan sector rate',
      claimedTotalAmount: 460000000,
      groundsOfObjection: 'Land situated adjacent to Cargo Terminal gate; Collector applied base village agricultural rate ignoring YEIDA planned aerocity valuation.',
      sec64Prayer: 'Enhance market value to ₹5,500/sq.m with all statutory benefits.'
    },
    stage: 'EVIDENCE_RECORDING',
    status: 'Expert Valuation Witness (Govt Approved Valuer) Cross-Examination in Progress',
    referenceType: 'Section 64 Reference (Airport Corridor Aerocity Land)',
    slaDaysElapsed: 154,
    slaDaysRemaining: 26,
    slaStatus: 'CRITICAL',
    adjournmentCount: 3,
    lastHearingDate: '19/09/2026',
    nextHearingDate: '30/09/2026',
    nextListingPurpose: 'Cross-examination of Expert Valuer by NIAL Counsel',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-UP-01-ROOM3',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-noida-001',
    enhancedAwardPreview: null
  },
  {
    caseId: 'LARR/2026/TN/011',
    caseNumber: 'LARR Ref. No. 31 of 2026',
    referenceNumber: 'REF-CHENNAI-SEC64-2026-0048',
    referenceDate: '05/04/2026',
    registrationDate: '14/04/2026',
    receivedDate: '09/04/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Chennai & Kanchipuram Bench',
    jurisdiction: 'Chennai & Kanchipuram',
    location: 'High Court Campus Annex, Chennai, Tamil Nadu',
    presidingOfficer: 'Hon\'ble Shri Justice S. Ramalingam (Retd. District Judge)',
    registrar: 'Thiru K. Anbalagan, TNSJS',
    judicialClerk: 'Selvi M. Revathi',
    projectId: 'NLAMS-PRJ-2025-0402',
    projectCode: 'CMRL-PH2-C4',
    projectName: 'Chennai Metro Rail Phase 2 (Corridor 4 - Lighthouse to Poonamallee Bypass)',
    requiringBody: 'Chennai Metro Rail Limited (CMRL)',
    appropriateGovernment: 'Special Project & Revenue Dept, Govt of Tamil Nadu',
    collectorName: 'Special District Revenue Officer (LA), CMRL',
    collectorAwardNumber: 'DRO/CMRL/AWARD/2025/31',
    collectorAwardDate: '15/01/2026',
    depositDate: '02/02/2026',
    possessionDate: '20/02/2026',
    sec11Date: '10/03/2024',
    claimantName: 'Dr. V. Swaminathan & Smt. Radha Swaminathan',
    claimantCategory: 'Urban Institutional / Medical Clinic Property Owners',
    claimantAddress: '14, Arcot Road, Porur, Chennai - 600116',
    claimantAdvocate: 'Adv. T. Mohan & Associates',
    respondentAdvocates: [
      { party: 'CMRL', advocate: 'Senior Advocate Shri Jayesh Dolia' }
    ],
    ulpin: 'TN02CHNAMB050221',
    surveyNumber: '84/3-A',
    parcelId: 'PARCEL-TN-CHN-0221',
    acquiredAreaHectares: 0.1200,
    acquiredAreaSqM: 1200,
    landType: 'Prime Urban Commercial Road Frontage (3-Storey Clinic)',
    village: 'Porur',
    taluka: 'Maduravoyal',
    district: 'Chennai',
    state: 'Tamil Nadu',
    collectorAward: {
      basicLandRatePerSqM: 38000,
      totalBasicLandValue: 45600000,
      ruralMultiplier: 1.0,
      multipliedLandValue: 45600000,
      immovableAssetsValue: 18500000, // Demolished clinic structure + specialized diagnostic rooms
      solatiumAmount: 64100000,
      additionalInterest12Percent: 14102000,
      totalCollectorAwardAmount: 142302000,
      amountDepositedInEscrow: 142302000,
      amountDisbursedToDate: 142302000
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 65000,
      claimBasis: 'Guideline market value revision and registered sale deeds of Porur Junction commercial retail @ ₹70,000/sq.m',
      claimedTotalAmount: 260000000,
      groundsOfObjection: 'Clinic structure severely undervalued; PWD schedule rates failed to account for modern earthquake-resistant medical construction.',
      sec64Prayer: 'Enhance land to ₹65,000/sq.m and structural damages under Section 69(1) thirdly.'
    },
    stage: 'AWARD_DRAFTING',
    status: 'Final Arguments Concluded; Draft Award Decree under Scrutiny by Presiding Officer',
    referenceType: 'Section 64 Reference (Metro Urban Commercial Clinic Property)',
    slaDaysElapsed: 171,
    slaDaysRemaining: 9,
    slaStatus: 'CRITICAL',
    adjournmentCount: 2,
    lastHearingDate: '16/09/2026',
    nextHearingDate: '28/09/2026',
    nextListingPurpose: 'Signing and Pronouncement of Final Award Decree',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-TN-01-ROOM1',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-chennai-001',
    enhancedAwardPreview: {
      adjudicatedMarketRatePerSqM: 52000,
      adjudicatedBasicLandValue: 62400000,
      ruralMultiplier: 1.0,
      adjudicatedMultipliedLandValue: 62400000,
      adjudicatedAssetsValue: 26000000,
      adjudicatedSolatium: 88400000,
      additionalInterest12Percent: 19448000,
      excessInterest9PercentYr1: 7110000,
      totalJudicialAwardAmount: 203358000,
      collectorAwardDeduction: 142302000,
      netDifferentialPayableCr: 6.105,
      netDifferentialPayableExact: 61056000,
      paymentDeadlineDays: 60
    }
  },
  {
    caseId: 'LARR/2026/GJ/012',
    caseNumber: 'LARR Ref. No. 34 of 2026',
    referenceNumber: 'REF-ANAND-SEC64-2026-0062',
    referenceDate: '10/08/2026',
    registrationDate: '16/08/2026',
    receivedDate: '12/08/2026',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Central Gujarat Bench',
    jurisdiction: 'District Anand',
    location: 'District Court Complex, Anand, Gujarat',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    registrar: 'Shri Arvind K. Vyas, GJS',
    judicialClerk: 'Smt. Hemali N. Joshi',
    projectId: 'NLAMS-PRJ-2026-0042',
    projectCode: 'WRC-PETLAD-042',
    projectName: 'Western Regional Dedicated Freight Corridor (Petlad Segment)',
    requiringBody: 'Ministry of Railways / Western Railway',
    appropriateGovernment: 'Ministry of Railways & Revenue Dept, Govt of Gujarat',
    collectorName: 'Collector Anand',
    collectorAwardNumber: 'LA/AWARD/2026/PETLAD-24',
    collectorAwardDate: '20/06/2026',
    depositDate: '10/07/2026',
    possessionDate: '25/07/2026',
    sec11Date: '15/03/2024',
    claimantName: 'Smt. Shantaben Dahyabhai Vaghela',
    claimantCategory: 'Widow / Woman-Headed Agricultural Household (Vulnerable)',
    claimantAddress: 'Station Road, Petlad, Anand - 388450',
    claimantAdvocate: 'Adv. Nitin R. Solanki (District Legal Services Authority)',
    respondentAdvocates: [
      { party: 'Collector Anand', advocate: 'AGP Shri P.C. Trivedi' }
    ],
    ulpin: 'GJ24ANDPET010193',
    surveyNumber: '113/2',
    parcelId: 'PARCEL-GJ-ANAND-0193',
    acquiredAreaHectares: 0.3800,
    acquiredAreaSqM: 3800,
    landType: 'Jirayat Irrigated (Tobacco/Bajara)',
    village: 'Petlad',
    taluka: 'Petlad',
    district: 'Anand',
    state: 'Gujarat',
    collectorAward: {
      basicLandRatePerSqM: 1350,
      totalBasicLandValue: 5130000,
      ruralMultiplier: 1.5,
      multipliedLandValue: 7695000,
      immovableAssetsValue: 210000,
      solatiumAmount: 7905000,
      additionalInterest12Percent: 1739100,
      totalCollectorAwardAmount: 17549100,
      amountDepositedInEscrow: 17549100,
      amountDisbursedToDate: 17549100
    },
    enhancementClaim: {
      claimedMarketRatePerSqM: 2500,
      claimBasis: 'Parity with adjoining Award Enhancement in LARR/2026/GJ/001',
      claimedTotalAmount: 34000000,
      groundsOfObjection: 'Identical soil quality and proximity to town as Parcel 0189; differential treatment by Collector violates equality.',
      sec64Prayer: 'Award enhancement at par with adjoining Parcel 0189 with full statutory benefits.'
    },
    stage: 'PLEADINGS_PENDING',
    status: 'Summons Served; Requiring Body Written Statement Scheduled',
    referenceType: 'Section 64 Reference',
    slaDaysElapsed: 44,
    slaDaysRemaining: 136,
    slaStatus: 'NORMAL',
    adjournmentCount: 0,
    lastHearingDate: '15/09/2026',
    nextHearingDate: '14/10/2026',
    nextListingPurpose: 'Filing of Written Statement by Western Railway',
    benchType: 'Single Bench',
    virtualCourtroomAvailable: true,
    virtualMeetingId: 'LARR-VCOURT-GUJ-01-ROOM2',
    virtualMeetingLink: 'https://vcourt.gov.in/meet/larr-anand-002',
    enhancedAwardPreview: null
  }
];

// ----------------------------------------------------------------------------
// 3. MASTER CAUSE LIST FOR TODAY (23/09/2026)
// ----------------------------------------------------------------------------
export const MASTER_CAUSE_LIST_TODAY = [
  {
    serialNo: 1,
    caseId: 'LARR/2026/GJ/001',
    caseNumber: 'LARR Ref. No. 01 of 2026',
    parties: 'Rameshwar Laljibhai Patel & Ors vs. Collector Anand & Western Railway',
    project: 'Western Dedicated Freight Corridor (Petlad-Sunav)',
    district: 'Anand',
    ulpin: 'GJ24ANDPET010189',
    referenceDate: '15/04/2026',
    hearingTime: '10:30 AM',
    stage: 'Pronouncement of Award',
    bench: 'Court Hall No. 1 (Hon\'ble Presiding Officer)',
    counsels: 'Adv. Hiren Brahmbhatt / AGP P.C. Trivedi / Adv. Rajiv Mehta',
    status: 'LISTED_TODAY',
    virtualLink: 'https://vcourt.gov.in/meet/larr-anand-001'
  },
  {
    serialNo: 2,
    caseId: 'LARR/2026/GJ/002',
    caseNumber: 'LARR Ref. No. 02 of 2026',
    parties: 'Bhikhabhai Revabhai Vankar vs. Collector Anand',
    project: 'Western Dedicated Freight Corridor (Sunav)',
    district: 'Anand',
    ulpin: 'GJ24ANDPET010190',
    referenceDate: '10/05/2026',
    hearingTime: '11:45 AM',
    stage: 'Evidence Recording (Cross-Examination)',
    bench: 'Court Hall No. 1 (Hon\'ble Presiding Officer)',
    counsels: 'Adv. Nitin R. Solanki / AGP S.K. Joshi',
    status: 'LISTED_TODAY',
    virtualLink: 'https://vcourt.gov.in/meet/larr-anand-002'
  },
  {
    serialNo: 3,
    caseId: 'LARR/2026/GJ/003',
    caseNumber: 'LARR Ref. No. 03 of 2026',
    parties: 'Legal Heirs of Late Manilal Rathod (Inter-se Dispute)',
    project: 'Western Dedicated Freight Corridor (Petlad)',
    district: 'Anand',
    ulpin: 'GJ24ANDPET010192',
    referenceDate: '02/06/2026',
    hearingTime: '02:00 PM',
    stage: 'Section 77 Apportionment Compromise Terms',
    bench: 'Court Hall No. 1 (Hon\'ble Presiding Officer)',
    counsels: 'Adv. D.M. Parekh / Adv. J.B. Vaghela',
    status: 'LISTED_TODAY',
    virtualLink: 'https://vcourt.gov.in/meet/larr-anand-003'
  },
  {
    serialNo: 4,
    caseId: 'LARR/2026/GJ/004',
    caseNumber: 'LARR Ref. No. 04 of 2026',
    parties: 'Sunav Gram Panchayat & Farmers vs. WR & Collector',
    project: 'Western Dedicated Freight Corridor (Sunav)',
    district: 'Anand',
    ulpin: 'GJ24ANDPET010195',
    referenceDate: '20/06/2026',
    hearingTime: '03:15 PM',
    stage: 'Court Commissioner Report (Irrigation Severance)',
    bench: 'Court Hall No. 1 (Hon\'ble Presiding Officer)',
    counsels: 'Adv. K.S. Barot / Adv. Rajiv Mehta',
    status: 'LISTED_TODAY',
    virtualLink: 'https://vcourt.gov.in/meet/larr-anand-001'
  }
];

// ----------------------------------------------------------------------------
// 4. PLEADINGS & EXHIBITS MASTER REPOSITORY
// ----------------------------------------------------------------------------
export const MASTER_EXHIBITS = [
  {
    exhibitNo: 'Ex. P-1',
    caseId: 'LARR/2026/GJ/001',
    documentId: 'DOC-EX-001',
    title: 'Certified Registered Sale Deed No. 1422/2024 dated 04/02/2024 (Survey 109/2)',
    documentType: 'Registered Sale Deed (Market Exemplar)',
    submittedBy: 'Claimant Rameshwar Patel',
    dateSubmitted: '15/06/2026',
    verificationStatus: 'Verified with Sub-Registrar Petlad',
    pageCount: 14,
    digitalSignature: 'Signed by Adv. Hiren Brahmbhatt (DSC: 2026-06-15 11:22 IST)',
    hash: 'SHA256: 4f981e3a9c72e21b...',
    relevance: 'Demonstrates arm\'s length open-market transactional rate of ₹3,150/sq.m for adjacent irrigated parcel prior to Section 11 notification.'
  },
  {
    exhibitNo: 'Ex. P-2',
    caseId: 'LARR/2026/GJ/001',
    documentId: 'DOC-EX-002',
    title: 'Government Approved Valuer Report on Agricultural Tubewell & 45 Fruit-bearing Trees',
    documentType: 'Expert Valuation Report',
    submittedBy: 'Claimant Rameshwar Patel',
    dateSubmitted: '22/06/2026',
    verificationStatus: 'Verified by Court Valuer',
    pageCount: 22,
    digitalSignature: 'Signed by Er. K.M. Shah, F.I.V. (Reg. Valuer CCIT Vadodara)',
    hash: 'SHA256: 82bc31f90e21a8d4...',
    relevance: 'Quantifies capital loss of 400-ft deep borehole, PVC piping layout, and 45 mature Mango/Chikoo trees valued at ₹12.50 Lakhs.'
  },
  {
    exhibitNo: 'Ex. R-1',
    caseId: 'LARR/2026/GJ/001',
    documentId: 'DOC-EX-003',
    title: 'Official Jantar (ASR) Circle Rate Notification for Taluka Petlad (Effective 2023-2026)',
    documentType: 'Government Gazette / Jantar Ready Reckoner',
    submittedBy: 'Collector Anand (Respondent No. 1)',
    dateSubmitted: '02/07/2026',
    verificationStatus: 'Official State Publication',
    pageCount: 6,
    digitalSignature: 'Signed by AGP P.C. Trivedi',
    hash: 'SHA256: c3982e01df34891b...',
    relevance: 'Relied upon by SLAO to justify base rate of ₹1,400/sq.m for agricultural category in Village Petlad.'
  },
  {
    exhibitNo: 'Ex. R-2',
    caseId: 'LARR/2026/GJ/001',
    documentId: 'DOC-EX-004',
    title: 'Joint Measurement Survey (JMS) & Village Cadastral Map 108/1-P',
    documentType: 'Cadastral GIS Verification Sheet',
    submittedBy: 'Western Railway (Respondent No. 2)',
    dateSubmitted: '10/07/2026',
    verificationStatus: 'Verified by DILRMP Portal',
    pageCount: 4,
    digitalSignature: 'Signed by Dy. CE (Con) Western Railway',
    hash: 'SHA256: 99ea410d7821ef9a...',
    relevance: 'Shows track alignment cutting diagonally across parcel 108/1-P, confirming severance of borehole conduit.'
  },
  {
    exhibitNo: 'Ex. C-1',
    caseId: 'LARR/2026/GJ/001',
    documentId: 'DOC-EX-005',
    title: 'Court Commissioner Inspection Report on Well Severance & Standing Crops',
    documentType: 'Judicial Commissioner Report',
    submittedBy: 'Court Commissioner (Adv. B.K. Patel)',
    dateSubmitted: '05/08/2026',
    verificationStatus: 'Court Order Dated 20/07/2026 Complied',
    pageCount: 18,
    digitalSignature: 'Signed by Adv. B.K. Patel (Court Commissioner)',
    hash: 'SHA256: 77a192bbec0012ef...',
    relevance: 'Independent spot inspection confirming 45 trees, operating tubewell, and physical bisection of land into two unusable fragments.'
  }
];

// ----------------------------------------------------------------------------
// 5. DIGITAL ORDER SHEETS MASTER
// ----------------------------------------------------------------------------
export const MASTER_ORDER_SHEETS = [
  {
    orderId: 'ORD-LARR-GJ-2026-001',
    caseId: 'LARR/2026/GJ/001',
    hearingDate: '18/09/2026',
    orderType: 'Final Hearing Order / Judgment Reserved',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    presence: 'Adv. Hiren Brahmbhatt for Claimants; AGP P.C. Trivedi for Collector Anand; Adv. Rajiv Mehta for Western Railway.',
    proceedingsSummary: 'Final arguments advanced by learned counsels for all parties concluded. Adv. Brahmbhatt cited Hon\'ble Supreme Court ruling in Ali Mohammad Beigh vs. State of J&K (2017) 4 SCC 717 on exemplar sale deeds of adjoining survey numbers. AGP defended Collector Award. Written notes of arguments placed on record.',
    directions: 'Heard learned counsels at length. Records examined. Judgment reserved. List for pronouncement of Award on 26/09/2026 at 10:30 AM.',
    nextHearingDate: '26/09/2026',
    isSigned: true,
    signedBy: 'Justice M.D. Shukla, Presiding Officer',
    signedTimestamp: '18/09/2026 16:45 IST',
    signatureHash: 'DSC-GOV-IN-LARR-GJ-2026-9812-OK',
    status: 'FINAL_IMMUTABLE'
  },
  {
    orderId: 'ORD-LARR-GJ-2026-002',
    caseId: 'LARR/2026/GJ/001',
    hearingDate: '28/08/2026',
    orderType: 'Evidence Conclusion & Hearing Order',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    presence: 'Adv. Hiren Brahmbhatt for Claimants; AGP P.C. Trivedi for Collector Anand; Adv. Rajiv Mehta for Western Railway.',
    proceedingsSummary: 'Court Commissioner Adv. B.K. Patel examined as CW-1. Cross-examined by Western Railway counsel. Claimant evidence closed. Respondent counsels state no oral witness to be examined; rely on documentary record.',
    directions: 'Evidence of both sides closed. Matter posted for final arguments on 18/09/2026.',
    nextHearingDate: '18/09/2026',
    isSigned: true,
    signedBy: 'Justice M.D. Shukla, Presiding Officer',
    signedTimestamp: '28/08/2026 15:30 IST',
    signatureHash: 'DSC-GOV-IN-LARR-GJ-2026-8841-OK',
    status: 'FINAL_IMMUTABLE'
  },
  {
    orderId: 'ORD-LARR-GJ-2026-003',
    caseId: 'LARR/2026/GJ/001',
    hearingDate: '20/07/2026',
    orderType: 'Interlocutory Order / Appointment of Court Commissioner',
    presidingOfficer: 'Hon\'ble Shri Justice Mahendra D. Shukla',
    presence: 'Adv. Hiren Brahmbhatt for Claimants; AGP P.C. Trivedi for Collector Anand.',
    proceedingsSummary: 'Application IA No. 02/2026 filed by claimants for local inspection of tube-well and tree severance under Order XXVI Rule 9 CPC taken up. Heard.',
    directions: 'Application allowed. Adv. B.K. Patel appointed as Court Commissioner to inspect Survey 108/1-P, verify standing trees and severance of irrigation duct. Commissioner fee of ₹15,000 to be deposited by claimants. Report to be submitted within 3 weeks.',
    nextHearingDate: '28/08/2026',
    isSigned: true,
    signedBy: 'Justice M.D. Shukla, Presiding Officer',
    signedTimestamp: '20/07/2026 14:15 IST',
    signatureHash: 'DSC-GOV-IN-LARR-GJ-2026-7612-OK',
    status: 'FINAL_IMMUTABLE'
  }
];

// ----------------------------------------------------------------------------
// 6. ESCROW & APPORTIONMENT REPOSITORY (Section 77)
// ----------------------------------------------------------------------------
export const MASTER_ESCROW_ACCOUNTS = [
  {
    escrowId: 'ESC-ANAND-2026-001',
    caseId: 'LARR/2026/GJ/003',
    courtDepositRef: 'CD-ANAND-CIVIL-2026-441',
    bankName: 'State Bank of India',
    branch: 'Treasury Branch, Petlad Road, Anand',
    accountNumberMasked: 'XXXXXX9842',
    ifsc: 'SBIN0000311',
    depositDate: '05/02/2026',
    depositor: 'Special Land Acquisition Officer, Anand',
    originalPrincipalInr: 48063000, // ₹4.806 Cr
    currentBalanceInr: 50130678, // With accrued interest
    annualInterestRatePercent: 6.85,
    accruedInterestInr: 2067678,
    status: 'ACTIVE_DEPOSIT',
    apportionmentBasis: 'Disputed Title inter-se Legal Heirs of Late Manilal Rathod (Survey 115/1+2)',
    claimantsShares: [
      {
        claimantName: 'Dineshbhai Manilal Rathod (Branch A)',
        relationship: 'Eldest Son',
        claimedShareFraction: '1/2 (50%)',
        claimedSharePercent: 50,
        tentativeAwardShareInr: 25065339,
        status: 'CONTESTED_WILL',
        panMasked: 'XXXXX4812K',
        bankAccountMasked: 'XXXXXX1190'
      },
      {
        claimantName: 'Kamleshbhai Manilal Rathod (Branch B)',
        relationship: 'Second Son',
        claimedShareFraction: '1/4 (25%)',
        claimedSharePercent: 25,
        tentativeAwardShareInr: 12532669,
        status: 'ANCESTRAL_COPARCENER',
        panMasked: 'XXXXX9102L',
        bankAccountMasked: 'XXXXXX4481'
      },
      {
        claimantName: 'Smt. Taraben Manilal Rathod (Branch C)',
        relationship: 'Daughter',
        claimedShareFraction: '1/4 (25%)',
        claimedSharePercent: 25,
        tentativeAwardShareInr: 12532670,
        status: 'ANCESTRAL_COPARCENER (Hindu Succession Sec 6)',
        panMasked: 'XXXXX6721M',
        bankAccountMasked: 'XXXXXX8823'
      }
    ]
  },
  {
    escrowId: 'ESC-ANAND-2026-002',
    caseId: 'LARR/2026/GJ/002',
    courtDepositRef: 'CD-ANAND-CIVIL-2026-442',
    bankName: 'Bank of Baroda',
    branch: 'Petlad Main Branch, Anand',
    accountNumberMasked: 'XXXXXX4128',
    ifsc: 'BARB0PETLAD',
    depositDate: '02/02/2026',
    depositor: 'Special Land Acquisition Officer, Anand',
    originalPrincipalInr: 16350300,
    currentBalanceInr: 17053528,
    annualInterestRatePercent: 6.85,
    accruedInterestInr: 703228,
    status: 'ACTIVE_DEPOSIT',
    apportionmentBasis: 'Tenancy & Title Partition under Sec 77 (Survey 112/3-B)',
    claimantsShares: [
      {
        claimantName: 'Bhikhabhai Revabhai Vankar',
        relationship: 'Registered Titleholder',
        claimedShareFraction: '2/3 (66.67%)',
        claimedSharePercent: 66.67,
        tentativeAwardShareInr: 11369587,
        status: 'VERIFIED',
        panMasked: 'XXXXX1123P',
        bankAccountMasked: 'XXXXXX9821'
      },
      {
        claimantName: 'Jivabhai Revabhai Vankar (Deceased by LRs)',
        relationship: 'Co-Tenure Holder',
        claimedShareFraction: '1/3 (33.33%)',
        claimedSharePercent: 33.33,
        tentativeAwardShareInr: 5683941,
        status: 'HEIRSHIP_INQUIRY',
        panMasked: 'XXXXX8841Q',
        bankAccountMasked: 'XXXXXX3312'
      }
    ]
  }
];

// ----------------------------------------------------------------------------
// 7. IMMUTABLE JUDICIAL AUDIT LOGS
// ----------------------------------------------------------------------------
export const MASTER_LARR_AUDIT_LOGS = [
  {
    auditId: 'AUD-LARR-2026-0091',
    caseId: 'LARR/2026/GJ/001',
    timestamp: '18/09/2026 16:48:12 IST',
    actorName: 'Hon\'ble Justice M.D. Shukla',
    role: 'PRESIDING_OFFICER',
    action: 'ORDER_PASSED_RESERVED',
    entityType: 'ORDER_SHEET',
    entityId: 'ORD-LARR-GJ-2026-001',
    description: 'Final arguments concluded. Order sheet e-signed and judgment reserved for pronouncement on 26/09/2026.',
    oldValue: 'STAGE: EVIDENCE_RECORDING',
    newValue: 'STAGE: HEARING_COMPLETED (ORDER_RESERVED)',
    dscHash: 'SHA256: 4f981e3a9c72e21b88e1a...',
    ipAddress: '10.14.88.22 (Judicial Chambers Anand)'
  },
  {
    auditId: 'AUD-LARR-2026-0084',
    caseId: 'LARR/2026/GJ/001',
    timestamp: '05/08/2026 11:30:45 IST',
    actorName: 'Shri Arvind K. Vyas',
    role: 'REGISTRAR',
    action: 'EXHIBIT_INDEXED',
    entityType: 'COURT_RECORD',
    entityId: 'DOC-EX-005',
    description: 'Court Commissioner Report by Adv. B.K. Patel taken on record and marked as Exhibit C-1 with verified digital hash.',
    oldValue: null,
    newValue: 'EXHIBIT_NUMBER: Ex. C-1',
    dscHash: 'SHA256: 77a192bbec0012ef...',
    ipAddress: '10.14.88.19 (Registry Court-1)'
  },
  {
    auditId: 'AUD-LARR-2026-0072',
    caseId: 'LARR/2026/GJ/001',
    timestamp: '22/04/2026 14:10:00 IST',
    actorName: 'Shri Arvind K. Vyas',
    role: 'REGISTRAR',
    action: 'CASE_REGISTERED',
    entityType: 'LARR_CASE',
    entityId: 'LARR/2026/GJ/001',
    description: 'Section 64 Reference inward from Collector Anand scrutinized. Defects cured. Official Case ID LARR/2026/GJ/001 registered on National Judicial Ledger.',
    oldValue: 'STAGE: UNDER_SCRUTINY',
    newValue: 'STAGE: REGISTERED',
    dscHash: 'SHA256: c3982e01df34891b...',
    ipAddress: '10.14.88.19 (Registry Filing Section)'
  },
  {
    auditId: 'AUD-LARR-2026-0065',
    caseId: 'LARR/2026/GJ/008',
    timestamp: '08/09/2026 15:20:18 IST',
    actorName: 'Shri Arvind K. Vyas',
    role: 'REGISTRAR',
    action: 'DEFECT_MEMO_ISSUED',
    entityType: 'DEFECT_MEMO',
    entityId: 'DEF-LARR-GJ-2026-0018',
    description: 'Defect memo issued to Collector Anand regarding missing Form-VIII official seal and Jamabandi discrepancies. 14 days compliance period granted.',
    oldValue: 'STAGE: REFERENCE_RECEIVED',
    newValue: 'STAGE: UNDER_SCRUTINY (DEFECT_RAISED)',
    dscHash: 'SHA256: 99ea410d7821ef9a...',
    ipAddress: '10.14.88.19 (Registry Filing Section)'
  }
];

// ----------------------------------------------------------------------------
// 8. SERVICE HELPER ABSTRACTION (API-Ready Interface)
// ----------------------------------------------------------------------------
export const larrAuthorityService = {
  // Config & Rules
  getStatutoryRuleConfig: () => STATUTORY_RULE_CONFIG,

  // Cases
  getAllCases: () => MASTER_LARR_CASES,
  getCaseById: (caseId) => MASTER_LARR_CASES.find(c => c.caseId === caseId) || null,
  getCauseListToday: () => MASTER_CAUSE_LIST_TODAY,
  
  // Exhibits & Pleadings
  getExhibitsForCase: (caseId) => MASTER_EXHIBITS.filter(e => e.caseId === caseId),
  
  // Order Sheets
  getOrderSheetsForCase: (caseId) => MASTER_ORDER_SHEETS.filter(o => o.caseId === caseId),

  // Escrow & Apportionment
  getEscrowAccounts: () => MASTER_ESCROW_ACCOUNTS,
  getEscrowForCase: (caseId) => MASTER_ESCROW_ACCOUNTS.find(e => e.caseId === caseId) || null,

  // Audit
  getAuditLogs: (caseId = null) => {
    if (!caseId) return MASTER_LARR_AUDIT_LOGS;
    return MASTER_LARR_AUDIT_LOGS.filter(a => a.caseId === caseId);
  },

  // Calculate Enhanced Award (Section 69 Configurable Engine)
  calculateSection69Award: (inputs) => {
    const {
      basicLandRatePerSqM = 1400,
      acquiredAreaSqM = 8500,
      ruralMultiplier = 1.5,
      immovableAssetsValue = 850000,
      solatiumRatePercent = 100,
      additionalInterestRatePercent = 12,
      interestDays = 666, // 15/03/2024 to 10/01/2026
      excessInterestYearOnePercent = 9,
      excessInterestSubsequentPercent = 15,
      collectorAwardTotal = 41514000
    } = inputs;

    // 1. Basic Market Value
    const baseLandValue = basicLandRatePerSqM * acquiredAreaSqM;
    
    // 2. Multiplied Land Value (First Schedule / Section 69)
    const multipliedLandValue = baseLandValue * ruralMultiplier;
    
    // 3. Immovable Assets Value (Trees, Buildings, Wells)
    const totalAssetsValue = Number(immovableAssetsValue) || 0;
    
    // 4. Combined Market Value for Solatium
    const totalMarketValueForSolatium = multipliedLandValue + totalAssetsValue;
    
    // 5. 100% Solatium
    const solatiumAmount = (totalMarketValueForSolatium * solatiumRatePercent) / 100;
    
    // 6. Section 69(1) Additional Interest 12% p.a.
    const additionalInterest = (multipliedLandValue * (additionalInterestRatePercent / 100) * (interestDays / 365));
    
    // 7. Sub-Total Judicial Award
    const subTotalAward = totalMarketValueForSolatium + solatiumAmount + additionalInterest;
    
    // 8. Net Differential Payable over Collector Award
    const differentialPrincipal = Math.max(0, subTotalAward - collectorAwardTotal);
    
    // 9. Excess Interest 9% for first year
    const excessInterestYr1 = differentialPrincipal * (excessInterestYearOnePercent / 100);

    const grandTotalAward = subTotalAward + excessInterestYr1;
    const netDifferentialPayable = grandTotalAward - collectorAwardTotal;

    return {
      baseLandValue: Math.round(baseLandValue),
      multipliedLandValue: Math.round(multipliedLandValue),
      totalAssetsValue: Math.round(totalAssetsValue),
      solatiumAmount: Math.round(solatiumAmount),
      additionalInterest: Math.round(additionalInterest),
      excessInterestYr1: Math.round(excessInterestYr1),
      grandTotalAward: Math.round(grandTotalAward),
      collectorAwardTotal: Math.round(collectorAwardTotal),
      netDifferentialPayable: Math.round(netDifferentialPayable),
      netDifferentialCr: (netDifferentialPayable / 10000000).toFixed(3)
    };
  }
};
