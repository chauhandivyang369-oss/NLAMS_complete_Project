/**
 * NLAMS — R&R Authority Master Data & Service Layer
 * RFCTLARR Act 2013 | Section 43 (Administrator) & Section 44 (Commissioner)
 * 
 * Reuses existing NLAMS master data hierarchy:
 * Project -> Jurisdiction -> Parcel -> ULPIN -> Landowner -> Family -> Members -> Livelihood -> Displacement -> Assets
 */

// ============================================================================
// 1. MASTER PROJECTS
// ============================================================================
export const RR_MASTER_PROJECTS = [
  {
    id: 'NLAMS-PRJ-2026-0042',
    code: 'WRC-PETLAD-042',
    name: 'Western Regional Dedicated Freight & Multimodal Logistics Corridor (Petlad-Sunav-Nar Segment)',
    requiringBody: 'Ministry of Railways / Western Railway (Vadodara Division)',
    appropriateGovernment: 'Ministry of Railways & Revenue Department, Govt of Gujarat',
    governmentLevel: 'Central Appropriate Government',
    state: 'Gujarat',
    district: 'Anand',
    taluka: 'Petlad',
    villages: ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'],
    totalCorridorAreaHa: 1250.40,
    proposedAcquisitionAreaHa: 247.90,
    totalParcelsCount: 218,
    totalUlpinCount: 218,
    totalAffectedFamilies: 500,
    displacedFamiliesCount: 84,
    scStFamiliesCount: 68,
    womenHeadedFamiliesCount: 39,
    livelihoodDependentFamiliesCount: 164,
    landownerFamiliesCount: 336,
    rrStatus: 'Draft Scheme Formulated (Under Sec 16(5) Hearing)',
    currentStageCode: 'SEC_16_SCHEME',
    statutoryDeadline: '15/11/2026',
    daysRemaining: 53,
    budgetAllocatedCr: 42.74,
    budgetDisbursedCr: 14.80,
    administratorName: 'Shri Sureshchandra G. Solanki, GAS',
    commissionerName: 'Smt. Purnima R. Trivedi, IAS',
    resettlementColony: 'Petlad Gaothan New Sector-7 Resettlement Enclave (18.5 Ha)'
  },
  {
    id: 'REQ-2025-NHAI-041',
    code: 'NH-44-PKG3',
    name: 'Delhi-Amritsar-Katra Expressway (Package 3 - Chainage 84.500 to 142.200)',
    requiringBody: 'National Highways Authority of India (NHAI)',
    appropriateGovernment: 'MoRTH & Revenue Dept, Govt of Punjab',
    governmentLevel: 'Central Appropriate Government',
    state: 'Punjab',
    district: 'Ambala / Patiala',
    taluka: 'Rajpura',
    villages: ['Rajpura', 'Kheri', 'Ghanour', 'Manakpur'],
    totalCorridorAreaHa: 890.00,
    proposedAcquisitionAreaHa: 268.40,
    totalParcelsCount: 312,
    totalUlpinCount: 312,
    totalAffectedFamilies: 680,
    displacedFamiliesCount: 112,
    scStFamiliesCount: 94,
    womenHeadedFamiliesCount: 48,
    livelihoodDependentFamiliesCount: 240,
    landownerFamiliesCount: 440,
    rrStatus: 'Section 18 Sanctioned (Allotment Ongoing)',
    currentStageCode: 'SEC_18_SANCTIONED',
    statutoryDeadline: '30/12/2026',
    daysRemaining: 98,
    budgetAllocatedCr: 68.50,
    budgetDisbursedCr: 45.20,
    administratorName: 'Dr. Paramjit S. Dhillon, PCS',
    commissionerName: 'Shri Amarinder S. Brar, IAS',
    resettlementColony: 'Rajpura Green Habitat Smart Resettlement Township'
  },
  {
    id: 'REQ-2025-DFCC-019',
    code: 'EDFC-PILOT-8',
    name: 'Eastern Dedicated Freight Corridor Multi-Modal Logistics Terminal Hub',
    requiringBody: 'DFCCIL / Ministry of Railways',
    appropriateGovernment: 'Ministry of Railways & Govt of Uttar Pradesh',
    governmentLevel: 'Central Appropriate Government',
    state: 'Uttar Pradesh',
    district: 'Prayagraj',
    taluka: 'Karchana',
    villages: ['Chhatnag', 'Bara', 'Dharwara'],
    totalCorridorAreaHa: 640.50,
    proposedAcquisitionAreaHa: 195.20,
    totalParcelsCount: 184,
    totalUlpinCount: 184,
    totalAffectedFamilies: 420,
    displacedFamiliesCount: 65,
    scStFamiliesCount: 82,
    womenHeadedFamiliesCount: 31,
    livelihoodDependentFamiliesCount: 155,
    landownerFamiliesCount: 265,
    rrStatus: 'Draft Scheme in Preparation',
    currentStageCode: 'SEC_16_DRAFTING',
    statutoryDeadline: '20/11/2026',
    daysRemaining: 58,
    budgetAllocatedCr: 36.80,
    budgetDisbursedCr: 8.40,
    administratorName: 'Shri Vikramaditya Rai, PCS',
    commissionerName: 'Shri Alok K. Tandon, IAS',
    resettlementColony: 'Karchana Model Resettlement Scheme'
  }
];

// ============================================================================
// 2. AFFECTED FAMILIES MASTER CENSUS (REUSED ACROSS ALL 10 MENUS)
// ============================================================================
export const SEED_AFFECTED_FAMILIES = [
  {
    familyId: 'FAM-2026-0001',
    headName: 'Rameshwar Laljibhai Patel',
    guardian: 'Laljibhai Govindbhai Patel',
    ulpin: 'GJ24ANDPET010189',
    surveyNumber: '108/1-P',
    village: 'Petlad',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX8491',
    aadhaarMasked: 'XXXX-XXXX-4819',
    voterId: 'GJ/14/082/194012',
    familyCategory: 'Titleholder Landowner',
    casteCategory: 'General',
    displacementStatus: 'Physically & Economically Displaced',
    homesteadLost: true,
    agriculturalLandAcquiredHa: 0.85,
    residentialStructurePlinthSqM: 110,
    commercialLoss: false,
    femaleHeaded: false,
    differentlyAbledMembersCount: 0,
    vulnerabilityFlag: 'Homestead Loss',
    totalMembers: 5,
    annualIncomeInr: 280000,
    bankDetails: {
      accountMasked: 'XXXXXX4812',
      bankName: 'State Bank of India',
      ifsc: 'SBIN0000452',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'PM Awas / Rural Model House (55 sq.m)',
      resettlementAllowance: 50000,
      transportGrant: 50000,
      annuityOption: 'Monthly Annuity ₹2,500/mo for 20 Yrs (CPI Indexed)',
      lumpSumGrant: 0,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.285
    },
    allotment: {
      allotmentStatus: 'Allotted',
      plotNumber: 'PLOT-SEC7-014',
      colonyName: 'Petlad Gaothan Resettlement Colony',
      areaSqM: 100,
      allotmentDate: '14/09/2026',
      certificateNumber: 'RR-ALLOT-GJ-2026-0014',
      possessionStatus: 'Handover Scheduled'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '08/09/2026',
    gpsCoordinates: '22.4741° N, 72.8012° E',
    evidenceDocs: ['DOC-RoR-108.pdf', 'PHOTO-HOUSE-001.jpg', 'PANCHNAMA-01.pdf']
  },
  {
    familyId: 'FAM-2026-0002',
    headName: 'Bhikhabhai Revabhai Vankar',
    guardian: 'Revabhai Somabhai Vankar',
    ulpin: 'GJ24ANDPET010192',
    surveyNumber: '112/3',
    village: 'Sunav',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX3124',
    aadhaarMasked: 'XXXX-XXXX-9921',
    voterId: 'GJ/14/082/201488',
    familyCategory: 'Agricultural Tenant / Labourer',
    casteCategory: 'SC',
    displacementStatus: 'Economically Displaced',
    homesteadLost: false,
    agriculturalLandAcquiredHa: 0.00,
    residentialStructurePlinthSqM: 0,
    commercialLoss: false,
    femaleHeaded: false,
    differentlyAbledMembersCount: 1,
    vulnerabilityFlag: 'SC Vulnerable + Landless Labourer',
    totalMembers: 6,
    annualIncomeInr: 96000,
    bankDetails: {
      accountMasked: 'XXXXXX9102',
      bankName: 'Bank of Baroda',
      ifsc: 'BARB0SUNAVX',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'Not Applicable (Homestead Intact)',
      resettlementAllowance: 50000,
      transportGrant: 0,
      annuityOption: 'Monthly Annuity ₹2,500/mo for 20 Yrs (CPI Indexed)',
      lumpSumGrant: 0,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.075
    },
    allotment: {
      allotmentStatus: 'Skill Training Assigned',
      plotNumber: 'N/A',
      colonyName: 'N/A',
      areaSqM: 0,
      allotmentDate: '15/09/2026',
      certificateNumber: 'RR-SKILL-GJ-2026-0038',
      possessionStatus: 'N/A'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '09/09/2026',
    gpsCoordinates: '22.4820° N, 72.8214° E',
    evidenceDocs: ['TENANCY-AFFIDAVIT-112.pdf', 'SC-CERT-8841.pdf']
  },
  {
    familyId: 'FAM-2026-0003',
    headName: 'Shantaben Somabhai Solanki',
    guardian: 'Late Somabhai Shankarbhai Solanki',
    ulpin: 'GJ24ANDPET010198',
    surveyNumber: '118/2',
    village: 'Sunav',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX5819',
    aadhaarMasked: 'XXXX-XXXX-1044',
    voterId: 'GJ/14/082/009121',
    familyCategory: 'Titleholder Landowner',
    casteCategory: 'OBC',
    displacementStatus: 'Physically & Economically Displaced',
    homesteadLost: true,
    agriculturalLandAcquiredHa: 0.42,
    residentialStructurePlinthSqM: 85,
    commercialLoss: false,
    femaleHeaded: true,
    differentlyAbledMembersCount: 0,
    vulnerabilityFlag: 'Female Headed Household + Widow',
    totalMembers: 4,
    annualIncomeInr: 120000,
    bankDetails: {
      accountMasked: 'XXXXXX7741',
      bankName: 'State Bank of India',
      ifsc: 'SBIN0000452',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'PM Awas / Rural Model House (55 sq.m)',
      resettlementAllowance: 50000,
      transportGrant: 50000,
      annuityOption: 'Monthly Annuity ₹2,500/mo for 20 Yrs (CPI Indexed)',
      lumpSumGrant: 0,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.215
    },
    allotment: {
      allotmentStatus: 'Allotted',
      plotNumber: 'PLOT-SEC7-019',
      colonyName: 'Petlad Gaothan Resettlement Colony',
      areaSqM: 100,
      allotmentDate: '14/09/2026',
      certificateNumber: 'RR-ALLOT-GJ-2026-0019',
      possessionStatus: 'Possession Confirmed'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '09/09/2026',
    gpsCoordinates: '22.4835° N, 72.8251° E',
    evidenceDocs: ['DOC-RoR-118.pdf', 'WIDOW-PENSION-PROOF.pdf']
  },
  {
    familyId: 'FAM-2026-0004',
    headName: 'Dineshbhai Manilal Rathod',
    guardian: 'Manilal Chhaganbhai Rathod',
    ulpin: 'GJ24ANDPET010204',
    surveyNumber: '124/1',
    village: 'Nar',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX2918',
    aadhaarMasked: 'XXXX-XXXX-6632',
    voterId: 'GJ/14/082/401923',
    familyCategory: 'Small Business / Rural Artisan',
    casteCategory: 'SC',
    displacementStatus: 'Commercial & Livelihood Displaced',
    homesteadLost: false,
    agriculturalLandAcquiredHa: 0.00,
    residentialStructurePlinthSqM: 0,
    commercialLoss: true,
    femaleHeaded: false,
    differentlyAbledMembersCount: 0,
    vulnerabilityFlag: 'SC Artisan / Commercial Kiosk Loss',
    totalMembers: 5,
    annualIncomeInr: 180000,
    bankDetails: {
      accountMasked: 'XXXXXX3821',
      bankName: 'Canara Bank',
      ifsc: 'CNRB0001842',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'Not Applicable',
      resettlementAllowance: 50000,
      transportGrant: 25000,
      annuityOption: 'One-Time Lump Sum in lieu of Employment (₹5.00 Lakhs)',
      lumpSumGrant: 500000,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.060
    },
    allotment: {
      allotmentStatus: 'Shop Kiosk Allotted',
      plotNumber: 'KIOSK-COMM-004',
      colonyName: 'Petlad Gaothan Resettlement Colony',
      areaSqM: 20,
      allotmentDate: '16/09/2026',
      certificateNumber: 'RR-KIOSK-GJ-2026-0004',
      possessionStatus: 'Key Handed Over'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '10/09/2026',
    gpsCoordinates: '22.4905° N, 72.8410° E',
    evidenceDocs: ['GUMASTA-REG-NAR.pdf', 'COMM-ASSET-INVENTORY.jpg']
  },
  {
    familyId: 'FAM-2026-0005',
    headName: 'Smt. Leelaben K. Vankar',
    guardian: 'Kanjibhai Somabhai Vankar',
    ulpin: 'GJ24ANDPET010210',
    surveyNumber: '129/2',
    village: 'Sunav',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX4481',
    aadhaarMasked: 'XXXX-XXXX-8411',
    voterId: 'GJ/14/082/100412',
    familyCategory: 'Titleholder Landowner',
    casteCategory: 'SC',
    displacementStatus: 'Physically Displaced',
    homesteadLost: true,
    agriculturalLandAcquiredHa: 0.35,
    residentialStructurePlinthSqM: 92,
    commercialLoss: false,
    femaleHeaded: false,
    differentlyAbledMembersCount: 0,
    vulnerabilityFlag: 'SC Family (Sec 41 Mandate)',
    totalMembers: 4,
    annualIncomeInr: 145000,
    bankDetails: {
      accountMasked: 'XXXXXX5019',
      bankName: 'Bank of Baroda',
      ifsc: 'BARB0SUNAVX',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'PM Awas / Rural Model House (55 sq.m)',
      resettlementAllowance: 50000,
      transportGrant: 50000,
      annuityOption: 'Monthly Annuity ₹2,500/mo for 20 Yrs (CPI Indexed)',
      lumpSumGrant: 0,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.245
    },
    allotment: {
      allotmentStatus: 'Allotted',
      plotNumber: 'PLOT-SEC7-022',
      colonyName: 'Petlad Gaothan Resettlement Colony',
      areaSqM: 100,
      allotmentDate: '17/09/2026',
      certificateNumber: 'RR-ALLOT-GJ-2026-0022',
      possessionStatus: 'Handover Scheduled'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '11/09/2026',
    gpsCoordinates: '22.4841° N, 72.8260° E',
    evidenceDocs: ['SC-CERT-9921.pdf', 'PANCHNAMA-HOUSE-22.pdf']
  },
  {
    familyId: 'FAM-2026-0006',
    headName: 'Natubhai Shankarbhai Vaghela',
    guardian: 'Shankarbhai Motibhai Vaghela',
    ulpin: 'GJ24ANDPET010215',
    surveyNumber: '134/1-A',
    village: 'Demol',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX9823',
    aadhaarMasked: 'XXXX-XXXX-3891',
    voterId: 'GJ/14/082/301289',
    familyCategory: 'Sharecropper / Tenant Farmer',
    casteCategory: 'OBC',
    displacementStatus: 'Livelihood Displaced (Agricultural)',
    homesteadLost: false,
    agriculturalLandAcquiredHa: 0.00,
    residentialStructurePlinthSqM: 0,
    commercialLoss: false,
    femaleHeaded: false,
    differentlyAbledMembersCount: 0,
    vulnerabilityFlag: 'Vulnerable Agricultural Tenant',
    totalMembers: 6,
    annualIncomeInr: 110000,
    bankDetails: {
      accountMasked: 'XXXXXX6641',
      bankName: 'State Bank of India',
      ifsc: 'SBIN0000452',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'Not Applicable',
      resettlementAllowance: 50000,
      transportGrant: 0,
      annuityOption: 'Monthly Annuity ₹2,500/mo for 20 Yrs (CPI Indexed)',
      lumpSumGrant: 0,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.075
    },
    allotment: {
      allotmentStatus: 'Skill Training Assigned',
      plotNumber: 'N/A',
      colonyName: 'N/A',
      areaSqM: 0,
      allotmentDate: '15/09/2026',
      certificateNumber: 'RR-SKILL-GJ-2026-0044',
      possessionStatus: 'N/A'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '12/09/2026',
    gpsCoordinates: '22.4980° N, 72.8520° E',
    evidenceDocs: ['SHARECROP-PANCHNAMA.pdf']
  },
  {
    familyId: 'FAM-2026-0007',
    headName: 'Jaswantbhai Chaturbhai Parmar',
    guardian: 'Chaturbhai Revabhai Parmar',
    ulpin: 'GJ24ANDPET010222',
    surveyNumber: '142/2',
    village: 'Rangaipura',
    taluka: 'Petlad',
    district: 'Anand',
    mobileMasked: 'XXXXXX1982',
    aadhaarMasked: 'XXXX-XXXX-7721',
    voterId: 'GJ/14/082/501923',
    familyCategory: 'Titleholder Landowner',
    casteCategory: 'OBC',
    displacementStatus: 'Physically Displaced',
    homesteadLost: true,
    agriculturalLandAcquiredHa: 0.65,
    residentialStructurePlinthSqM: 105,
    commercialLoss: false,
    femaleHeaded: false,
    differentlyAbledMembersCount: 1,
    vulnerabilityFlag: 'Homestead Loss + Disabled Member',
    totalMembers: 5,
    annualIncomeInr: 195000,
    bankDetails: {
      accountMasked: 'XXXXXX8812',
      bankName: 'Bank of India',
      ifsc: 'BKID0002019',
      aadhaarSeeded: true,
      npciStatus: 'Active'
    },
    entitlementPackage: {
      houseAllotment: 'PM Awas / Rural Model House (55 sq.m)',
      resettlementAllowance: 50000,
      transportGrant: 50000,
      annuityOption: 'Monthly Annuity ₹2,500/mo for 20 Yrs (CPI Indexed)',
      lumpSumGrant: 0,
      cattleShedGrant: 25000,
      totalCompensationCr: 0.260
    },
    allotment: {
      allotmentStatus: 'Allotted',
      plotNumber: 'PLOT-SEC7-028',
      colonyName: 'Petlad Gaothan Resettlement Colony',
      areaSqM: 100,
      allotmentDate: '17/09/2026',
      certificateNumber: 'RR-ALLOT-GJ-2026-0028',
      possessionStatus: 'Handover Scheduled'
    },
    surveyStatus: 'Certified',
    verificationOfficer: 'Dy. Collector / R&R Administrator (Petlad)',
    verificationDate: '13/09/2026',
    gpsCoordinates: '22.5041° N, 72.8610° E',
    evidenceDocs: ['DOC-RoR-142.pdf', 'DISABILITY-CERT-81.pdf']
  }
];

// ============================================================================
// 3. SECOND SCHEDULE STATUTORY ENTITLEMENT RULES (CONFIGURABLE)
// ============================================================================
export const SECOND_SCHEDULE_RULES = [
  {
    id: 'SCH2-01',
    category: 'Provision of Housing Units in case of Displacement',
    statutoryCitation: 'RFCTLARR Act 2013 — Second Schedule Item 1',
    applicability: 'Families whose residential house has been acquired in rural or urban area',
    standardRule: 'Constructed PM Awas / IAY equivalent house in rural area or min 50 sq.m carpet area in urban area; OR one-time lump-sum grant of ₹1,50,000 for rural / ₹2,00,000 for urban.',
    amountOrNorm: 'Rural: House (min 50 sq.m) or ₹1.50 Lakhs | Urban: Min 50 sq.m or ₹2.00 Lakhs',
    responsibleAgency: 'R&R Administrator / Gujarat Housing Board / Requiring Body',
    complianceMilestone: 'Prior to physical possession under Section 38'
  },
  {
    id: 'SCH2-02',
    category: 'Land for Land Allotment in Irrigation / Agricultural Projects',
    statutoryCitation: 'RFCTLARR Act 2013 — Second Schedule Item 2',
    applicability: 'Agricultural landholders losing land in irrigation project; SC/ST agricultural families',
    standardRule: 'Minimum 1 acre of irrigated land or 2 acres of unirrigated land in the command area or designated zone.',
    amountOrNorm: 'Min 1 Acre Irrigated / 2 Acres Unirrigated',
    responsibleAgency: 'District Collector & Revenue Authorities',
    complianceMilestone: 'Within 6 months of Section 19 declaration'
  },
  {
    id: 'SCH2-03',
    category: 'Offer for Employment / Annuity Allowance / Lump-sum',
    statutoryCitation: 'RFCTLARR Act 2013 — Second Schedule Item 4',
    applicability: 'Every affected family having an adult member whose livelihood is impacted',
    standardRule: 'Where jobs cannot be provided: Mandatory annuity of ₹2,000/month per family (indexed to CPI, currently ₹2,500/mo) for 20 years; OR a one-time lump sum grant of ₹5,00,000 per family.',
    amountOrNorm: 'Option A: Direct Job | Option B: ₹2,500/mo for 20 Yrs | Option C: ₹5.00 Lakhs Lump-sum',
    responsibleAgency: 'Western Railway / Requiring Body & PFMS DBT Escrow',
    complianceMilestone: 'Monthly recurring payroll on 1st of every calendar month'
  },
  {
    id: 'SCH2-04',
    category: 'Subsidiary Grant: One-Time Resettlement Allowance',
    statutoryCitation: 'RFCTLARR Act 2013 — Second Schedule Item 5',
    applicability: 'All affected families physically displaced from dwelling house or shop',
    standardRule: 'One-time resettlement allowance of ₹50,000 per family.',
    amountOrNorm: '₹50,000 One-time Cash Grant',
    responsibleAgency: 'PFMS DBT Escrow / R&R Administrator',
    complianceMilestone: 'Within 15 days of physical vacation of premises'
  },
  {
    id: 'SCH2-05',
    category: 'Subsidiary Grant: Transport Cost Allowance',
    statutoryCitation: 'RFCTLARR Act 2013 — Second Schedule Item 6',
    applicability: 'All displaced families shifting personal belongings, cattle, and building material',
    standardRule: 'A lump sum of ₹50,000 for transportation of building materials, household goods and cattle.',
    amountOrNorm: '₹50,000 One-time Cash Grant',
    responsibleAgency: 'PFMS DBT Escrow / R&R Administrator',
    complianceMilestone: 'Prior to shifting to new resettlement colony'
  },
  {
    id: 'SCH2-06',
    category: 'Subsidiary Grant: Cattle Shed / Artisan Grant',
    statutoryCitation: 'RFCTLARR Act 2013 — Second Schedule Item 7',
    applicability: 'Displaced rural families owning cattle or practicing village crafts/artisans',
    standardRule: 'One-time financial assistance of ₹25,000 for construction of cattle shed or petty shop.',
    amountOrNorm: '₹25,000 One-time Grant',
    responsibleAgency: 'PFMS DBT Escrow / R&R Administrator',
    complianceMilestone: 'Along with resettlement plot handover'
  }
];

// ============================================================================
// 4. THIRD SCHEDULE 25 MANDATORY BASIC AMENITIES CHECKLIST
// ============================================================================
export const THIRD_SCHEDULE_FACILITIES = [
  { id: 'FAC-01', number: 1, name: 'Internal & Approach Roads with Street Lighting', required: true, planned: '4.8 km Blacktop + LED', completionPercent: 92, responsibleAgency: 'Roads & Buildings Dept (R&B)', status: 'On Track', targetDate: '30/10/2026' },
  { id: 'FAC-02', number: 2, name: 'Storm Water Drainage System', required: true, planned: 'RCC Pucca Drains (5.2 km)', completionPercent: 88, responsibleAgency: 'Petlad Taluka Panchayat', status: 'On Track', targetDate: '15/11/2026' },
  { id: 'FAC-03', number: 3, name: 'Piped Safe Drinking Water Supply', required: true, planned: 'Overhead Tank 2.5 Lakh Litres + Household Taps', completionPercent: 100, responsibleAgency: 'Gujarat Water Supply & Sewerage Board', status: 'Completed', targetDate: '31/08/2026' },
  { id: 'FAC-04', number: 4, name: 'Pond / Water Reservoir for Cattle', required: true, planned: '1.2 Ha Deepened Community Pond with Inlet Channel', completionPercent: 95, responsibleAgency: 'GWRDC / Minor Irrigation', status: 'On Track', targetDate: '15/10/2026' },
  { id: 'FAC-05', number: 5, name: 'Cattle Grazing Common Land (Gauchar)', required: true, planned: '2.5 Ha Dedicated Gaothan Grazing Reserve', completionPercent: 100, responsibleAgency: 'District Collector Anand', status: 'Completed', targetDate: '01/09/2026' },
  { id: 'FAC-06', number: 6, name: 'Fair Price Shop (PDS Center)', required: true, planned: '1 Pucca PDS Shop with E-POS Integration', completionPercent: 85, responsibleAgency: 'Civil Supplies Department', status: 'On Track', targetDate: '15/11/2026' },
  { id: 'FAC-07', number: 7, name: 'Post Office / Sub-Post Facility', required: true, planned: 'Branch Post Office in Community Center', completionPercent: 70, responsibleAgency: 'Department of Posts, GoI', status: 'Needs Review', targetDate: '30/11/2026' },
  { id: 'FAC-08', number: 8, name: 'Community Center / Panchayat Ghar', required: true, planned: '350-Capacity Multipurpose Hall with Solar Power', completionPercent: 90, responsibleAgency: 'R&R Administrator / Panchayat', status: 'On Track', targetDate: '20/10/2026' },
  { id: 'FAC-09', number: 9, name: 'Primary School & Anganwadi Center', required: true, planned: '8-Classroom Smart Primary School + 2 Anganwadis', completionPercent: 80, responsibleAgency: 'Sarva Shiksha Abhiyan / District Education', status: 'On Track', targetDate: '15/11/2026' },
  { id: 'FAC-10', number: 10, name: 'Primary Health Center (PHC / Sub-Center)', required: true, planned: 'Sub-Health Center with Resident ANM & Ambulance Bay', completionPercent: 75, responsibleAgency: 'Chief District Health Officer (CDHO)', status: 'On Track', targetDate: '30/11/2026' },
  { id: 'FAC-11', number: 11, name: 'Veterinary Care Sub-Clinic', required: true, planned: 'Artificial Insemination & Mobile Vet Center', completionPercent: 65, responsibleAgency: 'Animal Husbandry Dept', status: 'Pending Funds', targetDate: '15/12/2026' },
  { id: 'FAC-12', number: 12, name: 'Electricity Sub-Station & 100% Household Metering', required: true, planned: '11 kV Feeder Line + 2 Transformers (MGVCL)', completionPercent: 100, responsibleAgency: 'Madhya Gujarat Vij Company Ltd', status: 'Completed', targetDate: '25/08/2026' },
  { id: 'FAC-13', number: 13, name: 'Burial / Cremation Ground (Shamshan Ghat)', required: true, planned: 'Gas & Wood-fired Crematorium with Waiting Shed', completionPercent: 90, responsibleAgency: 'Petlad Taluka Panchayat', status: 'On Track', targetDate: '25/10/2026' },
  { id: 'FAC-14', number: 14, name: 'Children Playground & Green Parks', required: true, planned: '1.0 Ha Green Buffer with Play Equipment & Tree Belt', completionPercent: 85, responsibleAgency: 'Social Forestry Division', status: 'On Track', targetDate: '30/10/2026' },
  { id: 'FAC-15', number: 15, name: 'Public Transport Bus Shelter / Bay', required: true, planned: 'GSRTC Connected Bus Bay with Covered Seating', completionPercent: 80, responsibleAgency: 'Gujarat State Road Transport Corp', status: 'On Track', targetDate: '10/11/2026' },
  { id: 'FAC-16', number: 16, name: 'Individual Sanitation Latrines (ISL) / Community Toilets', required: true, planned: '100% Individual Latrines in allotted houses + 2 Public Blocks', completionPercent: 95, responsibleAgency: 'Swachh Bharat Mission (Grameen)', status: 'On Track', targetDate: '15/10/2026' },
  { id: 'FAC-17', number: 17, name: 'Self-Help Group (SHG) & Skill Work Shed', required: true, planned: 'Covered Artisan & Agro-processing Work Shed (400 sq.m)', completionPercent: 60, responsibleAgency: 'Gujarat Livelihood Promotion Co (GLPC)', status: 'Needs Review', targetDate: '30/11/2026' },
  { id: 'FAC-18', number: 18, name: 'Community Library / Digital Seva Kendra', required: true, planned: 'E-Gram Center with 5 Computers & Internet Access', completionPercent: 75, responsibleAgency: 'Dept of Science & Technology (GoG)', status: 'On Track', targetDate: '15/11/2026' },
  { id: 'FAC-19', number: 19, name: 'Police Outpost / Security Booth', required: true, planned: 'Outpost under Petlad Rural Police Station', completionPercent: 70, responsibleAgency: 'District Superintendent of Police', status: 'On Track', targetDate: '30/11/2026' },
  { id: 'FAC-20', number: 20, name: 'Public Sector Bank Branch / ATM Kiosk', required: true, planned: 'SBI Kiosk Banking & Cash Deposit Machine', completionPercent: 65, responsibleAgency: 'State Bank of India (Lead Bank)', status: 'Pending Review', targetDate: '15/12/2026' },
  { id: 'FAC-21', number: 21, name: 'Solid Waste Management & Segregation Yard', required: true, planned: 'Compost Pit + Segregation Bins & Door-to-Door Tractor', completionPercent: 80, responsibleAgency: 'Swachh Bharat Mission', status: 'On Track', targetDate: '10/11/2026' },
  { id: 'FAC-22', number: 22, name: 'Religious / Community Places of Worship', required: true, planned: 'Sites demarcated matching original cultural shrines', completionPercent: 90, responsibleAgency: 'Community Trust / Collector', status: 'On Track', targetDate: '25/10/2026' },
  { id: 'FAC-23', number: 23, name: 'Tree Plantation & Green Belt Buffer', required: true, planned: '5,000 Shade & Fruit Trees along colony perimeter', completionPercent: 85, responsibleAgency: 'Social Forestry Dept', status: 'On Track', targetDate: '30/10/2026' },
  { id: 'FAC-24', number: 24, name: 'Rainwater Harvesting Recharge Wells', required: true, planned: '8 Deep Bore Recharge Wells in catchment zones', completionPercent: 90, responsibleAgency: 'GWRDC Hydrology Cell', status: 'On Track', targetDate: '20/10/2026' },
  { id: 'FAC-25', number: 25, name: 'Youth Vocational & ITI Training Linkage', required: true, planned: 'Dedicated Batch at Petlad Govt ITI for 45 youth', completionPercent: 70, responsibleAgency: 'Directorate of Employment & Training', status: 'On Track', targetDate: '15/11/2026' }
];

// ============================================================================
// 5. SC / ST SPECIALIZED DEVELOPMENT PLAN (SECTION 41 MANDATE)
// ============================================================================
export const SC_ST_DEVELOPMENT_PLAN_DATA = {
  triggerStatus: 'TRIGGERED (Section 41 Applicable)',
  scFamiliesCount: 48,
  stFamiliesCount: 20,
  scheduledAreaStatus: 'Fifth Schedule Sub-Plan Cluster (Contiguous)',
  gramSabhaConsultationStatus: 'Certified by Sunav & Petlad Gram Sabhas',
  resolutionNo: 'GS/SUNAV/2026/RES-14',
  resolutionDate: '18/08/2026',
  safeguards: [
    {
      subSection: 'Section 41(3)',
      title: 'Mandatory Land-for-Land Clause in Tribal Enclave',
      statutoryCitation: 'Section 41(3) RFCTLARR Act 2013',
      compliance: 'Enforced in Draft Scheme',
      details: 'In case of acquisition of land belonging to Scheduled Castes or Scheduled Tribes, alternative land of minimum 2.5 acres shall be allotted in irrigation/command zone.',
      targetBeneficiaries: '20 ST & 48 SC Agricultural Families'
    },
    {
      subSection: 'Section 41(6)',
      title: 'One-Third Additional Compensation Payout',
      statutoryCitation: 'Section 41(6) RFCTLARR Act 2013',
      compliance: 'Escrow Allocated (₹4.82 Cr Extra Grant)',
      details: 'ST/SC affected families shall be entitled to an additional 33.33% financial compensation grant over and above the standard First Schedule award.',
      targetBeneficiaries: '68 SC/ST Families'
    },
    {
      subSection: 'Section 41(5)',
      title: 'Customary & Minor Forest Produce (MFP) Access Rights',
      statutoryCitation: 'Section 41(5) RFCTLARR Act 2013',
      compliance: 'Demarcated in Resettlement Gaothan GIS',
      details: 'Preservation of community fishing rights, access to fuel wood, grazing land, and traditional village crafts access corridors.',
      targetBeneficiaries: 'All 68 Scheduled Category Households'
    },
    {
      subSection: 'Section 41(1) & (2)',
      title: 'Gram Sabha Prior Informed Consent / Consultation Record',
      statutoryCitation: 'Section 41(1) & (2) RFCTLARR Act 2013',
      compliance: 'Formally Authenticated by SDM Petlad',
      details: 'Mandatory Gram Sabha consultation proceedings held with video recording and 80%+ quorum in Scheduled Areas.',
      targetBeneficiaries: 'Sunav & Petlad Gram Sabhas'
    },
    {
      subSection: 'Section 41(11)',
      title: 'Language, Cultural Heritage & Sacred Grove Preservation Grant',
      statutoryCitation: 'Section 41(11) RFCTLARR Act 2013',
      compliance: 'Sanctioned under SIMP Schedule II',
      details: 'Special corpus fund allocation of ₹25.00 Lakhs for tribal community heritage center and cultural shrine preservation.',
      targetBeneficiaries: 'Local Tribal Welfare Committee'
    }
  ],
  mandatorySafeguards: [
    {
      code: 'SEC41-01',
      subSection: 'Section 41(3)',
      title: 'Mandatory Land-for-Land Clause in Tribal Enclave',
      statutoryCitation: 'Section 41(3) RFCTLARR Act 2013',
      compliance: 'Enforced in Draft Scheme',
      details: 'In case of acquisition of land belonging to Scheduled Castes or Scheduled Tribes, alternative land of minimum 2.5 acres shall be allotted in irrigation/command zone.',
      description: 'In case of acquisition of land belonging to Scheduled Castes or Scheduled Tribes, alternative land of minimum 2.5 acres shall be allotted in irrigation/command zone.',
      status: 'Enforced in Draft Scheme',
      targetBeneficiaries: '20 ST & 48 SC Agricultural Families'
    },
    {
      code: 'SEC41-02',
      subSection: 'Section 41(6)',
      title: 'One-Third Additional Compensation Payout',
      statutoryCitation: 'Section 41(6) RFCTLARR Act 2013',
      compliance: 'Escrow Allocated (₹4.82 Cr Extra Grant)',
      details: 'ST/SC affected families shall be entitled to an additional 33.33% financial compensation grant over and above the standard First Schedule award.',
      description: 'ST/SC affected families shall be entitled to an additional 33.33% financial compensation grant over and above the standard First Schedule award.',
      status: 'Escrow Allocated (₹4.82 Cr Extra Grant)',
      targetBeneficiaries: '68 SC/ST Families'
    },
    {
      code: 'SEC41-03',
      subSection: 'Section 41(5)',
      title: 'Customary & Minor Forest Produce (MFP) Access Rights',
      statutoryCitation: 'Section 41(5) RFCTLARR Act 2013',
      compliance: 'Demarcated in Resettlement Gaothan GIS',
      details: 'Preservation of community fishing rights, access to fuel wood, grazing land, and traditional village crafts access corridors.',
      description: 'Preservation of community fishing rights, access to fuel wood, grazing land, and traditional village crafts access corridors.',
      status: 'Demarcated in Resettlement Gaothan GIS',
      targetBeneficiaries: 'All 68 Scheduled Category Households'
    },
    {
      code: 'SEC41-04',
      subSection: 'Section 41(1) & (2)',
      title: 'Gram Sabha Prior Informed Consent / Consultation Record',
      statutoryCitation: 'Section 41(1) & (2) RFCTLARR Act 2013',
      compliance: 'Formally Authenticated by SDM Petlad',
      details: 'Mandatory Gram Sabha consultation proceedings held with video recording and 80%+ quorum in Scheduled Areas.',
      description: 'Mandatory Gram Sabha consultation proceedings held with video recording and 80%+ quorum in Scheduled Areas.',
      status: 'Formally Authenticated by SDM Petlad',
      targetBeneficiaries: 'Sunav & Petlad Gram Sabhas'
    },
    {
      code: 'SEC41-05',
      subSection: 'Section 41(11)',
      title: 'Language, Cultural Heritage & Sacred Grove Preservation Grant',
      statutoryCitation: 'Section 41(11) RFCTLARR Act 2013',
      compliance: 'Sanctioned under SIMP Schedule II',
      details: 'Special corpus fund allocation of ₹25.00 Lakhs for tribal community heritage center and cultural shrine preservation.',
      description: 'Special corpus fund allocation of ₹25.00 Lakhs for tribal community heritage center and cultural shrine preservation.',
      status: 'Sanctioned under SIMP Schedule II',
      targetBeneficiaries: 'Local Tribal Welfare Committee'
    }
  ]
};

// ============================================================================
// 6. SECTION 16(5) PUBLIC HEARING & OBJECTIONS LOG
// ============================================================================
export const SECTION_16_5_PUBLIC_HEARING = {
  hearingId: 'PH-RR-2026-0042',
  date: '12/10/2026',
  scheduledHearingDate: '12/10/2026',
  time: '10:30 AM to 04:30 PM IST',
  venue: 'Sunav Community Panchayat Hall, Taluka Petlad, District Anand',
  noticePublishedDate: '18/09/2026',
  noticePublicationDate: '18/09/2026',
  advanceNoticeDays: 24, // > 21 days statutory requirement
  languages: ['English', 'Gujarati (State Official Language)'],
  presidingOfficer: 'Shri Sureshchandra G. Solanki, GAS (R&R Administrator)',
  attendingOfficers: [
    'Sub-Divisional Magistrate (Petlad)',
    'Executive Engineer, Western Railway (Vadodara)',
    'Taluka Development Officer (TDO Petlad)',
    'Social Impact Specialist, GIDR'
  ],
  totalAttendeesLogged: 342,
  noticeDocument: 'RR_Sec16_5_Public_Notice_Bilingual_Gazetted.pdf',
  proceedingsVideo: 'R_and_R_Hearing_Full_Unedited_Video_Hash.mp4',
  proceedingsHash: 'SHA256:7f89d023b1...881a',
  objectionsTotal: 18,
  objectionsResolved: 16,
  objectionsPendingCommissionerReview: 2,
  hearingSessions: [
    {
      sessionId: 'PH-SES-001',
      village: 'Petlad (Gaothan)',
      date: '12/10/2026',
      time: '10:30 AM to 01:30 PM',
      venue: 'Taluka Panchayat Community Hall, Petlad',
      presidingOfficer: 'Shri Sureshchandra G. Solanki, GAS (Administrator)',
      status: 'Scheduled (Confirmed)',
      attendeesExpected: 220,
      gramPanchayatQuorum: '92% Verified'
    },
    {
      sessionId: 'PH-SES-002',
      village: 'Sunav (Tribal Enclave)',
      date: '14/10/2026',
      time: '11:00 AM to 03:00 PM',
      venue: 'Sunav Gram Sabha Bhavan',
      presidingOfficer: 'Shri Sureshchandra G. Solanki, GAS (Administrator)',
      status: 'Scheduled (Confirmed)',
      attendeesExpected: 180,
      gramPanchayatQuorum: '88% PESA Verified'
    }
  ],
  registeredObjections: [
    {
      objectionId: 'OBJ-RR-001',
      objectorName: 'Rameshwar Laljibhai Patel',
      familyId: 'FAM-2026-0001',
      village: 'Petlad',
      ulpin: 'GJ24ANDPET010189',
      category: 'Plot Location & Sizing',
      substance: 'Demanded allotment of plot adjoining existing family farm rather than rear corner of Sector-7.',
      disposition: 'Upheld / Scheme Modified',
      administratorRemarks: 'Accepted. Reallocated to Plot #PLOT-SEC7-014 facing 12m internal road.'
    },
    {
      objectionId: 'OBJ-RR-002',
      objectorName: 'Bhikhabhai Revabhai Vankar',
      familyId: 'FAM-2026-0002',
      village: 'Petlad',
      ulpin: 'GJ24ANDPET010190',
      category: 'Omission of Agricultural Labour Annuity',
      substance: 'Claimed 8 years of continuous landless tenancy on Survey 112/3; requested inclusion in Second Schedule Item 4 annuity.',
      disposition: 'Upheld / Scheme Modified',
      administratorRemarks: 'Talati revenue verification confirmed 7 years continuous tenancy. Approved for ₹2,500/mo annuity for 20 years.'
    },
    {
      objectionId: 'OBJ-RR-003',
      objectorName: 'Panchayat Council, Sunav',
      familyId: 'COMMUNITY',
      village: 'Sunav',
      ulpin: 'COMMUNITY-PARCEL-14',
      category: 'Tubewell Severance & Irrigation Pipeline',
      substance: 'Rail embankment severs underground PVC irrigation conduit supplying 18 hectares of tobacco fields.',
      disposition: 'Upheld / Engineering Approved',
      administratorRemarks: 'Western Railway chief engineer accepted to construct dedicated 450mm steel sleeve pipe casing under track at Ch. 12+100.'
    },
    {
      objectionId: 'OBJ-RR-004',
      objectorName: 'Dineshbhai Manilal Rathod',
      familyId: 'FAM-2026-0004',
      village: 'Petlad',
      ulpin: 'GJ24ANDPET010192',
      category: 'Commercial Kiosk Replacement',
      substance: 'Tea stall and kirana shop on Petlad station road demolished; requested permanent shop kiosk in new resettlement market.',
      disposition: 'Upheld / Scheme Modified',
      administratorRemarks: 'Allotted Commercial Kiosk #KIOSK-COMM-004 on 99-year lease at nominal ₹1/yr token rent.'
    },
    {
      objectionId: 'OBJ-RR-005',
      objectorName: 'Sunav Youth Delegate (Jayesh Vaghela)',
      familyId: 'COMMUNITY',
      village: 'Sunav',
      ulpin: 'COMMUNITY-PARCEL-15',
      category: 'Youth Skill Training & Local Employment Preference',
      substance: 'Requested mandatory inclusion of 35 local youth in railway freight terminal handling operations.',
      disposition: 'Under Implementation',
      administratorRemarks: 'Referred to Western Railway contractor policy; 45 candidates enrolled in Skill Development batch starting Nov 2026.'
    }
  ],
  claimsList: [
    {
      id: 'OBJ-RR-001',
      claimantName: 'Rameshwar Laljibhai Patel',
      familyId: 'FAM-2026-0001',
      category: 'Plot Location & Sizing',
      description: 'Demanded allotment of plot adjoining existing family farm rather than rear corner of Sector-7.',
      administratorResolution: 'Accepted. Reallocated to Plot #PLOT-SEC7-014 facing 12m internal road.',
      status: 'Resolved & Incorporated',
      date: '12/10/2026'
    },
    {
      id: 'OBJ-RR-002',
      claimantName: 'Bhikhabhai Revabhai Vankar',
      familyId: 'FAM-2026-0002',
      category: 'Omission of Agricultural Labour Annuity',
      description: 'Claimed 8 years of continuous landless tenancy on Survey 112/3; requested inclusion in Second Schedule Item 4 annuity.',
      administratorResolution: 'Talati revenue verification confirmed 7 years continuous tenancy. Approved for ₹2,500/mo annuity for 20 years.',
      status: 'Resolved & Incorporated',
      date: '12/10/2026'
    },
    {
      id: 'OBJ-RR-003',
      claimantName: 'Panchayat Council, Sunav',
      familyId: 'COMMUNITY',
      category: 'Tubewell Severance & Irrigation Pipeline',
      description: 'Rail embankment severs underground PVC irrigation conduit supplying 18 hectares of tobacco fields.',
      administratorResolution: 'Western Railway chief engineer accepted to construct dedicated 450mm steel sleeve pipe casing under track at Ch. 12+100.',
      status: 'Resolved & Engineering Approved',
      date: '12/10/2026'
    },
    {
      id: 'OBJ-RR-004',
      claimantName: 'Dineshbhai Manilal Rathod',
      familyId: 'FAM-2026-0004',
      category: 'Commercial Kiosk Replacement',
      description: 'Tea stall and kirana shop on Petlad station road demolished; requested permanent shop kiosk in new resettlement market.',
      administratorResolution: 'Allotted Commercial Kiosk #KIOSK-COMM-004 on 99-year lease at nominal ₹1/yr token rent.',
      status: 'Resolved & Incorporated',
      date: '12/10/2026'
    },
    {
      id: 'OBJ-RR-005',
      claimantName: 'Sunav Youth Delegate (Jayesh Vaghela)',
      familyId: 'COMMUNITY',
      category: 'Youth Skill Training & Local Employment Preference',
      description: 'Requested mandatory inclusion of 35 local youth in railway freight terminal handling operations.',
      administratorResolution: 'Referred to Western Railway contractor policy; 45 candidates enrolled in Skill Development batch starting Nov 2026.',
      status: 'Under Implementation',
      date: '12/10/2026'
    }
  ]
};

// ============================================================================
// 7. RESETTLEMENT COLONY CAD/GIS PLOT ALLOCATION (MENU 6)
// ============================================================================
export const RESETTLEMENT_PLOTS_MASTER = [
  { plotId: 'PLOT-SEC7-001', areaSqM: 100, sector: 'Sector 7-A', type: 'Residential Model House', status: 'Allotted', allottedFamilyId: 'FAM-2026-0001', beneficiary: 'Rameshwar Laljibhai Patel', possessionDate: '14/09/2026', certHash: 'SHA256:d891...01f' },
  { plotId: 'PLOT-SEC7-002', areaSqM: 100, sector: 'Sector 7-A', type: 'Residential Model House', status: 'Reserved', allottedFamilyId: 'FAM-2026-0003', beneficiary: 'Shantaben Somabhai Solanki', possessionDate: '14/09/2026', certHash: 'SHA256:4b12...88a' },
  { plotId: 'PLOT-SEC7-003', areaSqM: 100, sector: 'Sector 7-A', type: 'Residential Model House', status: 'Allotted', allottedFamilyId: 'FAM-2026-0005', beneficiary: 'Smt. Leelaben K. Vankar', possessionDate: '17/09/2026', certHash: 'SHA256:77f1...99e' },
  { plotId: 'PLOT-SEC7-004', areaSqM: 100, sector: 'Sector 7-A', type: 'Residential Model House', status: 'Allotted', allottedFamilyId: 'FAM-2026-0007', beneficiary: 'Jaswantbhai Chaturbhai Parmar', possessionDate: '17/09/2026', certHash: 'SHA256:99c2...41d' },
  { plotId: 'PLOT-SEC7-005', areaSqM: 120, sector: 'Sector 7-B', type: 'Corner Residential', status: 'Available', allottedFamilyId: null, beneficiary: 'Unallocated Gaothan Pool', possessionDate: null, certHash: null },
  { plotId: 'PLOT-SEC7-006', areaSqM: 100, sector: 'Sector 7-B', type: 'Residential Model House', status: 'Available', allottedFamilyId: null, beneficiary: 'Unallocated Gaothan Pool', possessionDate: null, certHash: null },
  { plotId: 'PLOT-SEC7-007', areaSqM: 100, sector: 'Sector 7-B', type: 'Residential Model House', status: 'Available', allottedFamilyId: null, beneficiary: 'Unallocated Gaothan Pool', possessionDate: null, certHash: null },
  { plotId: 'PLOT-SEC7-008', areaSqM: 100, sector: 'Sector 7-B', type: 'Residential Model House', status: 'Available', allottedFamilyId: null, beneficiary: 'Unallocated Gaothan Pool', possessionDate: null, certHash: null },
  { plotId: 'KIOSK-COMM-001', areaSqM: 20, sector: 'Market Plaza', type: 'Commercial Pucca Kiosk', status: 'Available', allottedFamilyId: null, beneficiary: 'Panchayat Commercial Pool', possessionDate: null, certHash: null },
  { plotId: 'KIOSK-COMM-004', areaSqM: 20, sector: 'Market Plaza', type: 'Commercial Pucca Kiosk', status: 'Allotted', allottedFamilyId: 'FAM-2026-0004', beneficiary: 'Dineshbhai Manilal Rathod', possessionDate: '16/09/2026', certHash: 'SHA256:66e1...42a' }
];

// ============================================================================
// 8. PFMS DIRECT BANK TRANSFER (DBT) DISBURSEMENTS (MENU 7)
// ============================================================================
export const DBT_DISBURSEMENT_RECORDS = [
  {
    transactionId: 'PFMS-RR-88410291',
    familyId: 'FAM-2026-0001',
    beneficiaryName: 'Rameshwar Laljibhai Patel',
    grantCategory: 'One-Time Resettlement Allowance (Sec Sched Item 5)',
    amountInr: 50000,
    disbursementDate: '18/09/2026',
    status: 'CREDITED',
    utrNumber: 'SBIN926258102914',
    bankAccountMasked: 'XXXXXX4812',
    ifsc: 'SBIN0000452',
    paymentMode: 'PFMS-APB (Aadhaar Payment Bridge)',
    receiptNumber: 'RCPT-DBT-2026-0091'
  },
  {
    transactionId: 'PFMS-RR-88410292',
    familyId: 'FAM-2026-0001',
    beneficiaryName: 'Rameshwar Laljibhai Patel',
    grantCategory: 'Transport Assistance Allowance (Sec Sched Item 6)',
    amountInr: 50000,
    disbursementDate: '18/09/2026',
    status: 'CREDITED',
    utrNumber: 'SBIN926258102915',
    bankAccountMasked: 'XXXXXX4812',
    ifsc: 'SBIN0000452',
    paymentMode: 'PFMS-APB',
    receiptNumber: 'RCPT-DBT-2026-0092'
  },
  {
    transactionId: 'PFMS-RR-88410293',
    familyId: 'FAM-2026-0003',
    beneficiaryName: 'Shantaben Somabhai Solanki',
    grantCategory: 'One-Time Resettlement Allowance (Sec Sched Item 5)',
    amountInr: 50000,
    disbursementDate: '19/09/2026',
    status: 'CREDITED',
    utrNumber: 'SBIN926269201411',
    bankAccountMasked: 'XXXXXX7741',
    ifsc: 'SBIN0000452',
    paymentMode: 'PFMS-APB',
    receiptNumber: 'RCPT-DBT-2026-0093'
  },
  {
    transactionId: 'PFMS-RR-88410294',
    familyId: 'FAM-2026-0002',
    beneficiaryName: 'Bhikhabhai Revabhai Vankar',
    grantCategory: 'First Schedule 20-Yr Annuity Month 1 (Sep 2026)',
    amountInr: 2500,
    disbursementDate: '20/09/2026',
    status: 'CREDITED',
    utrNumber: 'BARB926270192844',
    bankAccountMasked: 'XXXXXX9102',
    ifsc: 'BARB0SUNAVX',
    paymentMode: 'PFMS-NACH / APB',
    receiptNumber: 'RCPT-DBT-2026-0094'
  },
  {
    transactionId: 'PFMS-RR-88410295',
    familyId: 'FAM-2026-0004',
    beneficiaryName: 'Dineshbhai Manilal Rathod',
    grantCategory: 'Lump Sum Employment Alternative (Sec Sched Item 4)',
    amountInr: 500000,
    disbursementDate: '21/09/2026',
    status: 'CREDITED',
    utrNumber: 'CNRB926281092831',
    bankAccountMasked: 'XXXXXX3821',
    ifsc: 'CNRB0001842',
    paymentMode: 'PFMS-RTGS',
    receiptNumber: 'RCPT-DBT-2026-0095'
  },
  {
    transactionId: 'PFMS-RR-88410296',
    familyId: 'FAM-2026-0005',
    beneficiaryName: 'Smt. Leelaben K. Vankar',
    grantCategory: 'Section 41(6) SC/ST Extra Compensation Payout (1/3rd)',
    amountInr: 125000,
    disbursementDate: '22/09/2026',
    status: 'PROCESSING',
    utrNumber: 'Pending Bank Confirmation',
    bankAccountMasked: 'XXXXXX5019',
    ifsc: 'BARB0SUNAVX',
    paymentMode: 'PFMS-APB',
    receiptNumber: 'RCPT-DBT-2026-0096'
  }
];

// ============================================================================
// 9. SECTION 18 COMMISSIONER MASTER APPROVAL PACKAGE (MENU 8)
// ============================================================================
export const SECTION_18_APPROVAL_PACKAGE = {
  packageId: 'SANCTION-SEC18-2026-0042',
  projectId: 'NLAMS-PRJ-2026-0042',
  draftSchemeVersion: 'Draft R&R Scheme Form V (v1.2)',
  submissionDate: '20/09/2026',
  administratorName: 'Shri Sureshchandra G. Solanki, GAS',
  sanctionStatus: 'PENDING_SANCTION',
  reviewDecisionState: 'READY_FOR_SANCTION', // Options: UNDER_REVIEW, CLARIFICATION_REQUIRED, RETURNED, READY_FOR_SANCTION, SANCTIONED
  conditions: [
    'Direct Benefit Transfer of full Second Schedule transport and resettlement grants must be credited before Collector issues physical possession notice under Section 38.',
    'Western Railway must execute dedicated Irrigation Pipe Crossing at Ch. 12+100 before launching civil embankment filling.',
    'Replacement Gaothan Primary School and Anganwadi in Sector-7 must be completed and handed over before the 2027 academic session.'
  ],
  commissionerConditions: [
    'Direct Benefit Transfer of full Second Schedule transport and resettlement grants must be credited before Collector issues physical possession notice under Section 38.',
    'Western Railway must execute dedicated Irrigation Pipe Crossing at Ch. 12+100 before launching civil embankment filling.',
    'Replacement Gaothan Primary School and Anganwadi in Sector-7 must be completed and handed over before the 2027 academic session.'
  ],
  collectorRecommendation: {
    collectorName: 'District Collector & DM, Anand',
    recommendationDate: '15/09/2026',
    endorsement: 'Recommended for unconditional Section 18 sanction. Resettlement colony site in Petlad Gaothan is unencumbered government revenue land free from all legal disputes.',
    budgetVerifiedCr: 42.74
  },
  complianceAudit: {
    familyCensusCoverage: '100% Certified (500 Families)',
    secondScheduleEntitlements: 'Compliant with Statutory Minimums',
    thirdScheduleFacilities: '25 Mandatory Facilities Budgeted',
    section41TribalSafeguards: 'Fully Satisfied with Gram Sabha Resolution',
    publicHearingConducted: 'Verified (24 Days Advance Notice)',
    pfmsDbtReadiness: 'Validated via NPCI Mapper'
  },
  gazetteNotification: {
    notificationNo: 'REV/LARR/RR/SEC18/2026/0942',
    gazetteDate: '23/09/2026',
    digitalSignatureHash: 'SHA256:d8a21e49b801a7c29e...991a',
    signatory: 'Smt. Purnima R. Trivedi, IAS (R&R Commissioner)'
  }
};

// ============================================================================
// 10. IMMUTABLE INTER-AGENCY AUDIT TRAIL (MENU 10)
// ============================================================================
export const RR_IMMUTABLE_AUDIT_LOGS = [
  {
    auditId: 'AUD-RR-001',
    user: 'Shri Sureshchandra G. Solanki',
    role: 'R&R Administrator',
    action: 'CENSUS_FIELD_SURVEY_CERTIFIED',
    timestamp: '08/09/2026 11:20:14',
    ip: '10.24.88.12 (Govt WAN)',
    entity: 'FAM-2026-0001 (Rameshwar Patel)',
    oldValue: 'Status: Draft Survey',
    newValue: 'Status: Certified & Form IV Generated',
    document: 'Form_IV_Certified_Record.pdf',
    signatureStatus: 'e-Signed (DSC Token SHA256:8891...)'
  },
  {
    auditId: 'AUD-RR-002',
    user: 'Shri Sureshchandra G. Solanki',
    role: 'R&R Administrator',
    action: 'DRAFT_SCHEME_FORMULATED',
    timestamp: '14/09/2026 16:45:00',
    ip: '10.24.88.12 (Govt WAN)',
    entity: 'DRAFT_SCHEME_V1.0',
    oldValue: 'Status: In Preparation',
    newValue: 'Status: Form V Draft Scheme Formulated (42.74 Cr)',
    document: 'Draft_RR_Scheme_Form_V_Signed.pdf',
    signatureStatus: 'e-Signed (DSC Token SHA256:44b1...)'
  },
  {
    auditId: 'AUD-RR-003',
    user: 'Public Hearing Administration Desk',
    role: 'Hearing Officer',
    action: 'SECTION_16_5_HEARING_NOTICE_PUBLISHED',
    timestamp: '18/09/2026 10:00:22',
    ip: '10.24.88.18 (Petlad Collectorate)',
    entity: 'PH-RR-2026-0042',
    oldValue: 'Status: Notice Scheduled',
    newValue: 'Status: Published in State Gazette & 2 Local Dailies (24 Days Advance Notice)',
    document: 'Public_Notice_Bilingual_Gazette.pdf',
    signatureStatus: 'Digitally Authenticated'
  },
  {
    auditId: 'AUD-RR-004',
    user: 'Shri Sureshchandra G. Solanki',
    role: 'R&R Administrator',
    action: 'PUBLIC_HEARING_PROCEEDINGS_SEALED',
    timestamp: '12/10/2026 17:30:10',
    ip: '10.24.88.12 (Govt WAN)',
    entity: 'PH-RR-2026-0042',
    oldValue: 'Status: Hearing Open',
    newValue: 'Status: Hearing Completed, 18 Claims Recorded, Video Vault Sealed',
    document: 'Certified_Public_Hearing_Minutes_Bilingual.pdf',
    signatureStatus: 'e-Signed (DSC Token SHA256:99c2...)'
  },
  {
    auditId: 'AUD-RR-005',
    user: 'Shri Sureshchandra G. Solanki',
    role: 'R&R Administrator',
    action: 'ALLOTMENT_ORDER_ISSUED',
    timestamp: '14/09/2026 15:10:45',
    ip: '10.24.88.12 (Govt WAN)',
    entity: 'PLOT-SEC7-014 (FAM-2026-0001)',
    oldValue: 'Plot Status: Available',
    newValue: 'Plot Status: Allotted with QR Verification Link',
    document: 'Allotment_Order_RR_ALLOT_0014.pdf',
    signatureStatus: 'e-Signed (DSC Token SHA256:77a1...)'
  },
  {
    auditId: 'AUD-RR-006',
    user: 'PFMS DBT Disbursing Officer',
    role: 'Financial Authority',
    action: 'DBT_GRANT_CREDITED',
    timestamp: '18/09/2026 11:42:18',
    ip: '14.139.112.5 (PFMS Gateway)',
    entity: 'PFMS-RR-88410291 (Rameshwar Patel)',
    oldValue: 'Payment Status: Initiated',
    newValue: 'Payment Status: Credited UTR SBIN926258102914 (₹50,000)',
    document: 'PFMS_Credit_Scroll_Receipt.pdf',
    signatureStatus: 'PFMS Digitally Signed Ack'
  },
  {
    auditId: 'AUD-RR-007',
    user: 'Smt. Purnima R. Trivedi, IAS',
    role: 'R&R Commissioner',
    action: 'SECTION_18_SCHEME_SANCTION_CONFIRMED',
    timestamp: '23/09/2026 14:15:30',
    ip: '10.20.10.4 (State Secretariat Gandhinagar)',
    entity: 'SANCTION-SEC18-2026-0042',
    oldValue: 'Scheme Status: Ready for Sanction',
    newValue: 'Scheme Status: Officially Sanctioned & Gazetted under Section 18',
    document: 'Final_Gazette_Section_18_Notification.pdf',
    signatureStatus: 'e-Signed (Aadhaar DSC SHA256:d8a2...)'
  }
];

// Helper methods
export const rrAuthorityService = {
  getProjects: () => RR_MASTER_PROJECTS,
  getProjectById: (id) => RR_MASTER_PROJECTS.find(p => p.id === id) || RR_MASTER_PROJECTS[0],
  getAffectedFamilies: () => SEED_AFFECTED_FAMILIES,
  getFamilyById: (id) => SEED_AFFECTED_FAMILIES.find(f => f.familyId === id),
  getSecondScheduleRules: () => SECOND_SCHEDULE_RULES,
  getThirdScheduleFacilities: () => THIRD_SCHEDULE_FACILITIES,
  getScStDevelopmentPlan: () => SC_ST_DEVELOPMENT_PLAN_DATA,
  getPublicHearingData: () => SECTION_16_5_PUBLIC_HEARING,
  getResettlementPlots: () => RESETTLEMENT_PLOTS_MASTER,
  getDbtDisbursements: () => DBT_DISBURSEMENT_RECORDS,
  getSection18ApprovalPackage: () => SECTION_18_APPROVAL_PACKAGE,
  getAuditLogs: () => RR_IMMUTABLE_AUDIT_LOGS
};
