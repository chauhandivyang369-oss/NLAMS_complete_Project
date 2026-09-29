/**
 * SIA Survey & Impact Census Service
 * 
 * Provides mock data architecture, entity relationships and data management
 * for Menu 2: Survey & Impact Census in NLAMS SIA & IEG Workspace.
 * 
 * Entities: Project -> Parcel -> Landowner -> Family -> Members -> Livelihood -> Displacement -> Assets -> Evidence -> Responses
 */

import { SEED_CADASTRAL_PARCELS, DEFAULT_CORRIDOR_LINE } from './gisService.js';

// Project Context (Read-Only from Form-I / Requiring Body)
export const PROJECT_CONTEXT = {
  projectId: 'NLAMS-DEMO-2026-001',
  projectName: 'Petlad Railway Bypass Alignment',
  requiringBody: 'Ministry of Railways / Western Railway Zone (Vadodara Division)',
  projectType: 'Linear Infrastructure — Dedicated Railway Freight & Passenger Bypass',
  publicPurpose: 'RFCTLARR Section 2(1)(b) — Infrastructure Projects for Railways & National Logistics Corridor',
  administrativeApprovalNo: 'MOR/INFRA/2025/APP-8492',
  administrativeApprovalDate: '12/11/2025',
  governmentLevel: 'Central Appropriate Government',
  appropriateGovernment: 'Ministry of Railways & Revenue Department, Govt of Gujarat',
  projectDescription: 'Construction of 24.8 km dual-broad-gauge railway bypass avoiding congested Petlad municipal junction, connecting Anand-Khambhat line directly to Vadodara feeder.',
  projectAlignment: 'Petlad Bypass (Ch. 0+000 to Ch. 24+800)',
  state: 'Gujarat',
  district: 'Anand',
  taluka: 'Petlad',
  villages: ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'],
  totalCorridorAreaHa: 1250.40,
  proposedAcquisitionAreaHa: 486.75,
  formISubmissionDate: '14/01/2026',
  siaCommencementDate: '14/01/2026',
  siaStatutoryDeadline: '13/07/2026',
  siaStatus: 'IN PROGRESS',
  appointedSiaAgency: 'Gujarat Institute of Development Research (GIDR), Ahmedabad'
};

// Seed 500 affected families generator (with rich deterministic mock profiles)
export function generateSeedFamilies(count = 500) {
  const villages = ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'];
  const casteCategories = ['General', 'OBC', 'SC', 'ST', 'SEBC'];
  const livelihoods = [
    'Agriculture (Cultivator)',
    'Agricultural Labour',
    'Tenant / Sharecropper',
    'Animal Husbandry & Dairy',
    'Rural Artisan / Carpenter',
    'Small Kirana / Shop Owner',
    'Daily Wage Construction',
    'Transport / Auto Operator'
  ];
  const headNames = [
    'Rameshwar Laljibhai Patel', 'Kalpesh Rameshbhai Patel', 'Maheshbhai Somabhai Patel',
    'Bhikhabhai Revabhai Vankar', 'Jaswantbhai Chaturbhai Parmar', 'Shantaben Somabhai Solanki',
    'Dineshbhai Manilal Rathod', 'Pravinbhai Kanjibhai Rohit', 'Natubhai Shankarbhai Vaghela',
    'Kamleshbhai Gordhanbhai Dave', 'Manjulaben Popatbhai Bharwad', 'Jayantibhai Hirabhai Rabari',
    'Chandrakant Motibhai Chauhan', 'Amrutbhai Dahyabhai Prajapati', 'Haribhai Nathabhai Thakor'
  ];

  const families = [];

  for (let i = 1; i <= count; i++) {
    const padId = String(i).padStart(3, '0');
    const village = villages[(i - 1) % villages.length];
    const headName = `${headNames[(i - 1) % headNames.length]} ${i > 15 ? `(${i})` : ''}`;
    const parcelIndex = ((i - 1) % 15);
    const surveyNo = `${140 + parcelIndex}/${(i % 3 === 0 ? 'B' : 'A')}`;
    const ulpin = `24051234567${String(890 + parcelIndex).slice(-3)}`;
    
    // Status distribution: 463 verified, 37 pending
    const isVerified = i <= 463;
    const isDisplaced = (i % 4 === 1); // Approx 125-130 displaced
    const category = (i % 7 === 0) ? 'SC affected family' : (i % 11 === 0) ? 'ST affected family' : (i % 6 === 0) ? 'Women-headed household' : (i % 5 === 0) ? 'Agricultural Labour' : 'Landowner';
    const livelihood = livelihoods[(i - 1) % livelihoods.length];
    const memberCount = (i % 4) + 3; // 3 to 6 members

    // Generate members
    const members = [
      {
        memberId: `MEM-${padId}-01`,
        name: headName,
        age: 42 + (i % 25),
        gender: category === 'Women-headed household' ? 'Female' : 'Male',
        relation: 'Self (Household Head)',
        education: 'Secondary School (10th)',
        occupation: livelihood,
        disability: 'None',
        isPrimaryEarner: true
      },
      {
        memberId: `MEM-${padId}-02`,
        name: `Smt. ${headName.split(' ')[0]}ben Patel`,
        age: 38 + (i % 22),
        gender: 'Female',
        relation: 'Spouse',
        education: 'Primary School (7th)',
        occupation: 'Home Maker & Dairy',
        disability: 'None',
        isPrimaryEarner: false
      },
      {
        memberId: `MEM-${padId}-03`,
        name: `Chirag ${headName.split(' ')[0]} Patel`,
        age: 19 + (i % 10),
        gender: 'Male',
        relation: 'Son',
        education: 'Higher Secondary (12th)',
        occupation: 'Student / Apprentice',
        disability: (i % 29 === 0) ? 'Locomotor Disability (40%)' : 'None',
        isPrimaryEarner: false
      }
    ];

    if (memberCount >= 4) {
      members.push({
        memberId: `MEM-${padId}-04`,
        name: `Pooja ${headName.split(' ')[0]} Patel`,
        age: 16 + (i % 6),
        gender: 'Female',
        relation: 'Daughter',
        education: 'High School',
        occupation: 'Student',
        disability: 'None',
        isPrimaryEarner: false
      });
    }

    families.push({
      id: `FAM-${padId}`,
      headName,
      village,
      taluka: 'Petlad',
      district: 'Anand',
      surveyNo,
      ulpin,
      affectedCategory: category,
      livelihood,
      monthlyIncome: `₹${(12000 + (i * 350) % 35000).toLocaleString('en-IN')}`,
      isDisplaced,
      displacementReason: isDisplaced ? 'Residential homestead falling inside 50m Right-of-Way' : 'None (Only agricultural parcel affected)',
      preferredRelocation: isDisplaced ? 'Within 3km of Petlad revenue village boundary' : 'N/A',
      membersCount: members.length,
      members,
      verificationStatus: isVerified ? 'Verified' : 'Pending Verification',
      lastUpdated: isVerified ? '18/02/2026' : 'Pending field visit',
      mobileMasked: `98****${String(1000 + i).slice(-4)}`,
      mobileReal: `98792${String(10000 + i).slice(-5)}`,
      rationCard: `NFSA-2405-${padId}`,
      hasConsentRecorded: isVerified,
      evidenceCount: (i % 3) + 1,
      enumerator: i % 2 === 0 ? 'Suresh Joshi (Unit B)' : 'Anita Solanki (Unit A)',
      gpsCaptured: true,
      latitude: Number((22.5395 + (i * 0.0003) % 0.015).toFixed(6)),
      longitude: Number((72.9290 + (i * 0.0004) % 0.018).toFixed(6))
    });
  }

  return families;
}

// 15 Detailed Cadastral Parcels (Linked to SEED_CADASTRAL_PARCELS)
export const PARCELS_DATA = SEED_CADASTRAL_PARCELS.slice(0, 15).map((p, idx) => {
  const statuses = ['Completed', 'Completed', 'Partially Surveyed', 'Issue / Verification Required', 'Completed'];
  const status = statuses[idx % statuses.length];
  
  return {
    parcelId: `PARCEL-${String(idx + 1).padStart(3, '0')}`,
    surveyNo: p.surveyNo || p.survey_no || `${140 + idx}/A`,
    ulpin: p.ulpin,
    village: p.village || 'Petlad',
    taluka: 'Petlad',
    district: 'Anand',
    ownerName: p.owners && p.owners[0] ? p.owners[0].name : 'Verified Khatedar',
    ownershipType: 'Ancestral Agricultural Khata',
    totalAreaHa: p.areaHa || 1.40,
    affectedAreaHa: p.affectedAreaAcre ? Number((p.affectedAreaAcre * 0.404686).toFixed(2)) : 0.85,
    impactPercent: p.impactPct || 65,
    landUse: p.landUse || 'Agricultural (Irrigated)',
    irrigationStatus: 'Canal Irrigated (Mahi Canal Network)',
    surveyStatus: status,
    lastUpdated: '18/02/2026',
    familyCount: (idx % 3) + 1,
    assetCount: (idx % 4 === 0) ? 2 : 1,
    coordinates: p.coordinates
  };
});

// Landowner baseline records vs SIA field observations
export const LANDOWNER_CENSUS_RECORDS = PARCELS_DATA.map((p, idx) => {
  const isMismatch = idx === 3 || idx === 8;
  return {
    ownerId: `OWN-${String(idx + 1).padStart(3, '0')}`,
    ulpin: p.ulpin,
    surveyNo: p.surveyNo,
    khataNo: `${1020 + idx}`,
    sourceOwnerName: p.ownerName,
    siaObservedClaimant: isMismatch ? `${p.ownerName} (Deceased) — Legal heirs in possession: Bharat & Nilesh Patel` : p.ownerName,
    relationship: isMismatch ? 'Sons / Legal Heirs' : 'Recorded Khatedar',
    sharePercent: '100%',
    landholdingHa: p.totalAreaHa,
    affectedAreaHa: p.affectedAreaHa,
    landCategory: p.landUse,
    verificationStatus: isMismatch ? 'Mismatch' : 'Verified',
    mismatchDetails: isMismatch ? 'Mutation entry pending in e-Dhara (Pauti Not Updated)' : null,
    consentRecorded: !isMismatch,
    enumerator: 'S. K. Joshi (Surveyor-02)',
    timestamp: '15/02/2026 14:30'
  };
});

// Housing & Structures Inventory
export const STRUCTURES_INVENTORY = [
  {
    assetId: 'STR-001',
    parcelUlpin: '24051234567890',
    surveyNo: '142/A',
    ownerFamilyId: 'FAM-001',
    ownerName: 'Rameshwar Laljibhai Patel',
    type: 'Pucca Residential House',
    areaSqFt: 1450,
    constructionYear: 2014,
    condition: 'Good (RCC Slab with Brick Masonry)',
    impactStatus: 'Fully Affected',
    estimatedLoss: 'Complete displacement required',
    gps: '22.5410° N, 72.9270° E',
    enumeratorRemarks: 'Contains 4 rooms, boundary wall, overhead syntax water tank.'
  },
  {
    assetId: 'STR-002',
    parcelUlpin: '24051234567891',
    surveyNo: '142/B',
    ownerFamilyId: 'FAM-002',
    ownerName: 'Kalpesh Rameshbhai Patel',
    type: 'Cattle Shed & Fodder Store',
    areaSqFt: 620,
    constructionYear: 2018,
    condition: 'Semi-Pucca (Tin Sheet Roof)',
    impactStatus: 'Partially Affected',
    estimatedLoss: 'Rear 20 feet falls in boundary buffer',
    gps: '22.5410° N, 72.9295° E',
    enumeratorRemarks: 'Houses 6 milch buffaloes. Relocation feasible on remaining parcel.'
  },
  {
    assetId: 'STR-003',
    parcelUlpin: '24051234567893',
    surveyNo: '144',
    ownerFamilyId: 'FAM-005',
    ownerName: 'Jaswantbhai Chaturbhai Parmar',
    type: 'Irrigation Borewell with Pump House',
    areaSqFt: 120,
    constructionYear: 2020,
    condition: 'Active (25 HP Submersible)',
    impactStatus: 'Fully Affected',
    estimatedLoss: 'Sole drinking & irrigation source for 3 adjacent plots',
    gps: '22.5370° N, 72.9295° E',
    enumeratorRemarks: 'High yield borewell (350 ft depth). Re-drilling needed in SIMP.'
  },
  {
    assetId: 'STR-004',
    parcelUlpin: '24051234567894',
    surveyNo: '145/A',
    ownerFamilyId: 'FAM-008',
    ownerName: 'Pravinbhai Kanjibhai Rohit',
    type: 'Kirana Grocery Shop & Residence',
    areaSqFt: 480,
    constructionYear: 2011,
    condition: 'Kutcha-Pucca',
    impactStatus: 'Fully Affected',
    estimatedLoss: 'Livelihood + Housing displacement',
    gps: '22.5350° N, 72.9320° E',
    enumeratorRemarks: 'Local provision store serving 45 families in Rangaipura faliya.'
  }
];

// Community & Public Asset Registry
export const COMMUNITY_ASSETS = [
  {
    assetId: 'COMM-001',
    category: 'Drinking Water',
    name: 'Village Community Tubewell & GLSR Tank',
    village: 'Petlad (Ward 4)',
    location: 'Near Old Railway Gate, Survey 143',
    gps: '22.5392° N, 72.9285° E',
    communityServed: 'Approx 320 households in Rohitvas & Prajapati vas',
    currentCondition: 'Operational (GWRDC Water Network)',
    impactType: 'Full Impact',
    severity: 'High — Water Supply Interruption Risk',
    alternativeAvailability: 'Alternative pipeline interconnection possible from Sunav Road main line',
    evidenceFile: 'comm_tubewell_photo_01.jpg',
    enumeratorRemarks: 'Gram Panchayat resolution submitted requesting relocation prior to project work.'
  },
  {
    assetId: 'COMM-002',
    category: 'Anganwadi',
    name: 'Integrated Child Development Anganwadi No. 3',
    village: 'Sunav',
    location: 'Beside Canal Bund, Survey 146',
    gps: '22.5345° N, 72.9340° E',
    communityServed: '48 infants and 18 lactating mothers',
    currentCondition: 'Good (Govt Building, constructed 2017)',
    impactType: 'Access Impact',
    severity: 'Medium — Direct Road Access Blocked by Railway Embankment',
    alternativeAvailability: 'Underpass ramp required at Ch. 14+200',
    evidenceFile: 'anganwadi_sunav_front.jpg',
    enumeratorRemarks: 'Requires dedicated pedestrian vehicular underpass (PUP/VUP) in railway design.'
  },
  {
    assetId: 'COMM-003',
    category: 'Cremation Ground',
    name: 'Gram Muktidham / Cremation Shed',
    village: 'Nar',
    location: 'Riverbank approach, Survey 148',
    gps: '22.5310° N, 72.9380° E',
    communityServed: 'Entire village population of Nar (approx 2,400)',
    currentCondition: 'Functional with 2 shed platforms',
    impactType: 'Partial Impact',
    severity: 'High Cultural / Social Sensitivity',
    alternativeAvailability: 'Gram Panchayat identified 0.8 acre gaothan land on eastern bank',
    evidenceFile: 'muktidham_nar_site.pdf',
    enumeratorRemarks: 'Special Gram Sabha hearing recommended to record unanimous relocation site.'
  },
  {
    assetId: 'COMM-004',
    category: 'Grazing Land',
    name: 'Village Gauchar (Common Grazing Ground)',
    village: 'Demol',
    location: 'Survey 152 (Government Vested)',
    gps: '22.5280° N, 72.9410° E',
    communityServed: 'Village cattle population (approx 650 cattle head)',
    currentCondition: 'Pasture Land',
    impactType: 'Partial Impact',
    severity: 'Moderate Fodder Loss',
    alternativeAvailability: 'Fodder development corpus in SIMP proposed',
    evidenceFile: 'gauchar_demol_survey.jpg',
    enumeratorRemarks: '3.4 hectares of 18 ha total gauchar will be severed by track.'
  }
];

// Alternative Site Assessment Comparison Matrix
export const ALTERNATIVE_SITES = [
  {
    parameter: 'Total Land Acquisition Area',
    proposedSite: '486.75 ha (Petlad Bypass Alignment Option A)',
    altSite1: '542.10 ha (Alignment Option B — Northern Arc)',
    altSite2: '610.50 ha (Alignment Option C — Via Dharmaj Link)'
  },
  {
    parameter: 'Families Subject to Physical Relocation',
    proposedSite: '186 Families',
    altSite1: '274 Families (Touches dense residential pockets)',
    altSite2: '340 Families (Bisects Dharmaj town extension)'
  },
  {
    parameter: 'Irrigated Multi-Crop Land Affected',
    proposedSite: '312.40 ha',
    altSite1: '418.90 ha',
    altSite2: '495.00 ha'
  },
  {
    parameter: 'Community Assets Impacted',
    proposedSite: '84 Assets (1 Cremation ground, 2 Anganwadis)',
    altSite1: '136 Assets (Including 2 Secondary Schools)',
    altSite2: '162 Assets (Water treatment headworks affected)'
  },
  {
    parameter: 'Technical & Engineering Feasibility',
    proposedSite: 'High (Minimal curvature, standard gradient 1:150)',
    altSite1: 'Medium (Requires major canal crossing overbridge)',
    altSite2: 'Low (Deep cutting required near Dharmaj ridge)'
  },
  {
    parameter: 'SIA Comparative Conclusion',
    proposedSite: 'Selected as Minimum Impact Alignment (Least Displacement)',
    altSite1: 'Rejected — Higher social disruption & greater prime farmland',
    altSite2: 'Rejected — Prohibitive displacement and cost'
  }
];

// Minimum / Bare-Minimum Land Assessment
export const MINIMUM_LAND_ASSESSMENT = {
  requiredProjectArea: '486.75 ha',
  proposedAcquisitionArea: '486.75 ha',
  essentialArea: '462.10 ha (Track formation, ballast, drainage, signalling)',
  potentialBufferArea: '24.65 ha (Statutory 15m safety corridor & green buffer)',
  potentiallyExcessArea: '0.00 ha',
  reductionPossible: 'No further reduction feasible without violating RDSO High-Speed Safety Standards (IRS Track Manual Section 14)',
  alternativeConfiguration: 'Standard 45m ROW adopted instead of standard 60m National Railway Corridor, optimizing slope embankments with reinforced retaining walls',
  supportingEvidence: 'RDSO-WD-2024-TrackGuidelines.pdf and Joint Feasibility Report by Western Railway Engineers & SIA Field Unit',
  siaObservation: 'The proposed acquisition conforms strictly to the bare-minimum land principle stipulated under Section 8(1) of RFCTLARR Act 2013.'
};

// Community Survey Form Definition
export const COMMUNITY_FORM_DEFINITION = {
  formId: 'FORM-SIA-2026-01',
  formTitle: 'Village Household & Livelihood Social Impact Survey',
  description: 'Official survey questionnaire under Section 4 RFCTLARR Act 2013 for Petlad Railway Bypass Alignment project.',
  projectContext: 'NLAMS-DEMO-2026-001 — Petlad Corridor',
  questions: [
    { id: 'q1', type: 'Short Text', text: 'Full Name of Household Head / Respondent', required: true },
    { id: 'q2', type: 'Dropdown', text: 'Revenue Village', options: ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'], required: true },
    { id: 'q3', type: 'Number', text: 'Total Number of Family Members Residing Together', required: true },
    { id: 'q4', type: 'Dropdown', text: 'Primary Source of Household Livelihood', options: ['Agriculture (Owner)', 'Tenant Farmer', 'Agricultural Labour', 'Animal Husbandry', 'Rural Artisan', 'Shop/Trade', 'Daily Wage', 'Other'], required: true },
    { id: 'q5', type: 'Radio', text: 'Does the proposed acquisition affect your residential house?', options: ['Yes — House will be fully demolished', 'Yes — House partially affected', 'No — Only agricultural land affected', 'No structure affected'], required: true },
    { id: 'q6', type: 'Radio', text: 'Will your family be physically displaced and require resettlement?', options: ['Yes', 'No', 'To Be Verified'], required: true },
    { id: 'q7', type: 'Checkbox', text: 'Which common community assets in your village are at risk?', options: ['Drinking water borewell/well', 'Village grazing land (Gauchar)', 'School / Anganwadi access', 'Cremation / Burial ground', 'Irrigation canal / drainage', 'Village approach road'], required: false },
    { id: 'q8', type: 'Long Text', text: 'Specific concerns, suggestions, or preferred rehabilitation assistance', required: false },
    { id: 'q9', type: 'GPS', text: 'GPS Coordinates of Homestead / Field Location', required: false },
    { id: 'q10', type: 'Consent / Acknowledgement', text: 'I acknowledge that the above information has been provided for the official Social Impact Assessment field census.', required: true }
  ]
};

// Response Inbox (25 representative sample responses from the 500-scale response pool)
export const RESPONSE_INBOX_SAMPLE = Array.from({ length: 25 }).map((_, i) => {
  const pad = String(i + 1).padStart(3, '0');
  const isEnumerator = i % 2 === 0;
  const isVerified = i < 18;
  const isDuplicate = i === 4 || i === 12;

  return {
    responseId: `RESP-2026-${pad}`,
    formId: 'FORM-SIA-2026-01',
    respondentName: `Respondent ${pad} (Khatedar)`,
    village: ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'][i % 5],
    linkedFamilyId: `FAM-${pad}`,
    linkedUlpin: `24051234567${String(890 + (i % 15)).slice(-3)}`,
    responseMode: isEnumerator ? 'ENUMERATOR_ASSISTED' : 'SELF',
    submittedAt: `1${(i % 8) + 1}/02/2026 1${i % 9}:30`,
    verificationStatus: isDuplicate ? 'Needs Clarification' : (isVerified ? 'Verified' : 'Under Review'),
    isPotentialDuplicate: isDuplicate,
    duplicateMatchId: isDuplicate ? `RESP-2026-${String(i).padStart(3, '0')}` : null,
    displacementReported: i % 3 === 0 ? 'Yes' : 'No',
    livelihoodImpact: i % 2 === 0 ? 'Agricultural Loss' : 'Business Severance'
  };
});
