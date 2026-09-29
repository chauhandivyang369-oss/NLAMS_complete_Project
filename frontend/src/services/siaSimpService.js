/**
 * Social Impact Management Plan (SIMP) Service (Section 6 — RFCTLARR Act 2013)
 * 
 * Provides structured data models, mitigation workflows, costs, monitoring indicators,
 * narrative drafts, versioning, and validation for Menu 4: Section 6 — SIMP Builder.
 * 
 * Traceability & Cross-Linking:
 * - Direct intake from SIA Survey (Menu 2): Community Assets (COMM-001..3), Structures (STR-001..4), Families (FAM-001..500)
 * - Direct intake from Section 5 Public Hearing (Menu 3): Hearing Concerns (HEAR-0045..50)
 */

import { PROJECT_CONTEXT, COMMUNITY_ASSETS, STRUCTURES_INVENTORY } from './siaSurveyService.js';
import { HEARING_CONCERN_ITEMS } from './siaHearingService.js';

export { PROJECT_CONTEXT };

// Allowed SIMP Categories as per statutory guidance
export const SIMP_CATEGORIES = [
  'Livelihood',
  'Housing',
  'Agriculture',
  'Water',
  'Roads',
  'Transport',
  'Drainage',
  'Sanitation',
  'Health',
  'Education',
  'Community Assets',
  'Religious / Cultural Assets',
  'Grazing',
  'Forest / Common Resources',
  'Vulnerable Groups',
  'Displacement',
  'Employment',
  'Other'
];

export const SEVERITY_LEVELS = ['Critical', 'High', 'Medium', 'Low'];

export const MITIGATION_STATUSES = ['Planned', 'In Progress', 'Completed', 'Delayed', 'Overdue'];

export const SIMP_STATUSES = [
  'Not Started',
  'In Preparation',
  'Draft',
  'Under Review',
  'Ready for Submission',
  'Submitted'
];

// Initial Master SIMP State
export const INITIAL_SIMP_META = {
  simpId: 'SIMP-PETLAD-2026-V1',
  projectId: PROJECT_CONTEXT.projectId,
  projectName: PROJECT_CONTEXT.projectName,
  requiringBody: PROJECT_CONTEXT.requiringBody,
  appropriateGovernment: PROJECT_CONTEXT.appropriateGovernment,
  preparedBy: 'Gujarat Institute of Development Research (GIDR), Ahmedabad',
  leadEvaluator: 'Dr. Sudhir K. Dave (Lead Sociologist & Environmental Planner)',
  status: 'In Preparation',
  currentVersion: 'Draft v2',
  createdDate: '2026-03-01',
  lastUpdated: '2026-03-04',
  statutorySubmissionDeadline: '2026-04-15'
};

// Seed Structured Impact Register (Core of SIMP)
export const SEED_SIMP_IMPACTS = [
  {
    impactId: 'IMP-001',
    category: 'Roads',
    affectedComponent: 'Village Access Roads & Farm Connectivity',
    affectedPopulation: 'Villagers of Sunav, Demol & Petlad',
    affectedFamiliesCount: 240,
    affectedVillages: ['Sunav', 'Demol'],
    linkedParcelOrUlpin: '24051234567892 (Survey 143/Canal Bund)',
    severity: 'Critical',
    description: 'High railway track embankment permanently severs 4 agricultural cart roads and daily tractor routes between settlements and western agricultural fields.',
    evidence: 'cart_track_severance_map.pdf',
    source: 'Public Hearing (HEAR-0045) + SIA Field Survey',
    linkedHearingIssueId: 'HEAR-0045',
    linkedAssetId: 'COMM-002',
    status: 'Mitigation Defined'
  },
  {
    impactId: 'IMP-002',
    category: 'Water',
    affectedComponent: 'Canal Irrigation & Distributary Flow',
    affectedPopulation: 'Farmers in Sunav, Demol & Petlad Tail-end',
    affectedFamiliesCount: 180,
    affectedVillages: ['Sunav', 'Demol', 'Petlad'],
    linkedParcelOrUlpin: '24051234567894 (Ch. 11+600)',
    severity: 'Critical',
    description: 'Bypass corridor crosses Mahi Right Bank Canal Distributary #4. Construction could block irrigation water during Kharif and Rabi crop seasons.',
    evidence: 'canal_choke_inspection_photo.jpg',
    source: 'Public Hearing (HEAR-0046) + Irrigation Dept Memo',
    linkedHearingIssueId: 'HEAR-0046',
    linkedAssetId: 'COMM-001',
    status: 'Mitigation Defined'
  },
  {
    impactId: 'IMP-003',
    category: 'Water',
    affectedComponent: 'Municipal Tubewell & Drinking Water Network',
    affectedPopulation: 'Rohitvas and Prajapati Faliya Residents (Ward 4)',
    affectedFamiliesCount: 320,
    affectedVillages: ['Petlad'],
    linkedParcelOrUlpin: '24051234567890 (Survey 142/A)',
    severity: 'High',
    description: 'Existing high-yield community tubewell, pump-room, and GLSR reservoir fall directly within the 45m railway right-of-way.',
    evidence: 'comm_tubewell_photo_01.jpg',
    source: 'SIA Survey (COMM-001) + Public Hearing (HEAR-0047)',
    linkedHearingIssueId: 'HEAR-0047',
    linkedAssetId: 'COMM-001',
    status: 'Mitigation Defined'
  },
  {
    impactId: 'IMP-004',
    category: 'Housing',
    affectedComponent: 'Residential Dwellings & Homestead Displacement',
    affectedPopulation: 'Directly Displaced Families',
    affectedFamiliesCount: 186,
    affectedVillages: ['Petlad', 'Demol', 'Nar'],
    linkedParcelOrUlpin: 'Multiple (142/A, 144, 145/A)',
    severity: 'Critical',
    description: 'Physical demolition of 86 pucca/semi-pucca dwellings and displacement of 186 families requiring planned resettlement colonies with basic civic amenities.',
    evidence: 'STR-001_deed_and_photos.pdf',
    source: 'SIA Survey (Structures & Census)',
    linkedHearingIssueId: 'HEAR-0047',
    linkedAssetId: 'STR-001',
    status: 'Mitigation Defined'
  },
  {
    impactId: 'IMP-005',
    category: 'Livelihood',
    affectedComponent: 'Landless Agricultural Labour & Sharecroppers',
    affectedPopulation: 'Dependent Tenant & Daily-Wage Labour Households',
    affectedFamiliesCount: 94,
    affectedVillages: ['Sunav', 'Demol', 'Nar'],
    linkedParcelOrUlpin: 'Agricultural Parcels (143, 144, 145)',
    severity: 'High',
    description: 'Loss of sustained farm labour employment on 486 ha of acquired fertile land with no registered land title for compensation.',
    evidence: 'labour_dependence_affidavit_vankar.pdf',
    source: 'Public Hearing (HEAR-0048) + Census Vulnerability Matrix',
    linkedHearingIssueId: 'HEAR-0048',
    linkedAssetId: 'LIV-004',
    status: 'Mitigation Defined'
  },
  {
    impactId: 'IMP-006',
    category: 'Religious / Cultural Assets',
    affectedComponent: 'Cremation Ground (Muktidham) & Riverbank Approach',
    affectedPopulation: 'Entire Population of Nar Village (approx 2,400)',
    affectedFamiliesCount: 420,
    affectedVillages: ['Nar'],
    linkedParcelOrUlpin: '24051234567893 (Survey 148)',
    severity: 'Medium',
    description: 'Corridor boundary touches Muktidham cremation compound wall; debris risk and ritual access severance during construction.',
    evidence: 'muktidham_distance_survey.pdf',
    source: 'Public Hearing (HEAR-0049) + Gram Sabha Resolution',
    linkedHearingIssueId: 'HEAR-0049',
    linkedAssetId: 'COMM-003',
    status: 'Mitigation Defined'
  },
  {
    impactId: 'IMP-007',
    category: 'Forest / Common Resources',
    affectedComponent: 'Field Bund Trees & Agro-forestry Buffer',
    affectedPopulation: 'Local Eco-system & Fruit Harvesters',
    affectedFamiliesCount: 55,
    affectedVillages: ['Petlad', 'Sunav', 'Demol', 'Nar', 'Rangaipura'],
    linkedParcelOrUlpin: 'Corridor-wide (Ch. 0+000 to 24+800)',
    severity: 'Low',
    description: 'Felling of approximately 420 mature roadside and bund trees (Neem, Mango, Babul, Jamun) along the alignment.',
    evidence: 'forest_dept_joint_enumeration.pdf',
    source: 'Environmental Section Survey',
    linkedHearingIssueId: null,
    linkedAssetId: 'ENV-001',
    status: 'Mitigation Defined'
  }
];

// Seed Mitigation Measures (1 to Many relationship with Impacts)
export const SEED_SIMP_MITIGATIONS = [
  {
    mitigationId: 'MIT-001',
    impactId: 'IMP-001',
    measureDescription: 'Construction of 2-Lane Vehicular Underpass (VUP) at Ch. 13+400 with 5.5m vertical clearance, street lighting, and automatic sump pump drainage.',
    responsibleAgency: 'Western Railway (Construction Organization)',
    department: 'Civil Engineering / Bridges Division',
    officerOrContact: 'Shri A. M. Bhatt, Executive Engineer (Const.), Vadodara',
    supportingAgency: 'Roads & Buildings (R&B) Department, Govt of Gujarat',
    responsibilityDescription: 'Incorporate VUP structural design in tender package; execute box pushing prior to track ballast laying.',
    estimatedCost: 21000000, // ₹2.10 Cr
    costBasis: 'Railway Schedule of Rates (SOR) for standard 12m x 5.5m precast RCC twin box underpass.',
    startDate: '2026-09-01',
    targetCompletionDate: '2027-04-30',
    milestone: 'RCC Box Pushing & Approach Road Tie-in',
    status: 'Planned',
    evidenceFile: 'railway_vup_general_arrangement_drawing.pdf',
    monitoringIndicator: {
      indicator: 'Uninterrupted Agricultural Tractor & Vehicular Access',
      baseline: 'Direct cart road access (0 min detour)',
      target: 'Continuous paved 2-lane underpass with <2 min transit delay; zero monsoon waterlogging',
      measurementMethod: 'Bi-monthly site traffic flow observation and Gram Panchayat feedback log',
      frequency: 'Quarterly',
      responsibleAgency: 'Independent Monitoring Consultant & GIDR',
      evidence: 'site_access_monitoring_log.xlsx'
    },
    remarks: 'Approved in principle during Section 5 Public Hearing on 28/02/2026.'
  },
  {
    mitigationId: 'MIT-002',
    impactId: 'IMP-001',
    measureDescription: 'Construction of 2 Light Pedestrian & Cattle Underpasses (PUP) at Ch. 7+200 (Petlad Outskirts) and Ch. 18+900 (Nar Boundary).',
    responsibleAgency: 'Western Railway (Vadodara Division)',
    department: 'Engineering Division',
    officerOrContact: 'Deputy Chief Engineer (Track & Bridges)',
    supportingAgency: 'Petlad Taluka Panchayat',
    responsibilityDescription: 'Provide safe under-embankment passage for school children and grazing herds with anti-skid concrete ramps.',
    estimatedCost: 8500000, // ₹85 Lakh
    costBasis: 'PWD Minor Bridges SOR (2 numbers @ ₹42.5 Lakh each)',
    startDate: '2026-10-15',
    targetCompletionDate: '2027-03-31',
    milestone: 'Sub-structure & ramp paving completion',
    status: 'Planned',
    evidenceFile: 'pup_drawing_petlad_nar.pdf',
    monitoringIndicator: {
      indicator: 'Safe Pedestrian & Cattle Movement',
      baseline: 'Surface crossing',
      target: 'Zero surface track trespassing accidents; 100% livestock transit through designated PUP',
      measurementMethod: 'Village survey and safety audit register',
      frequency: 'Half-Yearly',
      responsibleAgency: 'Railway Safety Commissioner & Taluka Development Officer',
      evidence: 'pup_safety_audit_report.pdf'
    },
    remarks: 'Mitigates cattle severance raised by Bharwad community.'
  },
  {
    mitigationId: 'MIT-003',
    impactId: 'IMP-002',
    measureDescription: 'Construction of Inverted Reinforced Concrete Syphon Aqueduct under Railway Track at Ch. 11+600 for Canal Minor #4.',
    responsibleAgency: 'Sardar Sarovar Narmada Nigam Ltd (SSNNL) & Western Railway',
    department: 'Irrigation & Canal Works Sub-Division, Anand',
    officerOrContact: 'Executive Engineer (Irrigation), Anand Sub-Division',
    supportingAgency: 'Western Railway Construction Division',
    responsibilityDescription: 'Design twin barrel siphon with inlet/outlet transition basins during May-June pre-monsoon dry closure.',
    estimatedCost: 14500000, // ₹1.45 Cr
    costBasis: 'SSNNL Canal Crossing Standard Estimate 2025-26',
    startDate: '2026-06-01',
    targetCompletionDate: '2026-09-30',
    milestone: 'Hydraulic testing and water flow commissioning',
    status: 'In Progress',
    evidenceFile: 'canal_syphon_hydraulic_approval.pdf',
    monitoringIndicator: {
      indicator: 'Canal Water Discharge Continuity',
      baseline: '42 Cusecs design discharge to 350 acres command area',
      target: 'Full 42 Cusecs flow restored with zero head loss during Kharif irrigation rotation',
      measurementMethod: 'Hydraulic gauge reading at inlet and tail distributary regulator',
      frequency: 'Weekly during irrigation cycles',
      responsibleAgency: 'Water Users Association (Pani Samiti) & Irrigation Inspector',
      evidence: 'canal_flow_meter_logs.pdf'
    },
    remarks: 'Joint site inspection completed on 05/03/2026; SSNNL deposit estimate submitted to Railway.'
  },
  {
    mitigationId: 'MIT-004',
    impactId: 'IMP-003',
    measureDescription: 'Replacement Deep Tubewell Drilling, 1 Lakh Litre Elevated RCC Storage Reservoir, and Water Distribution Pipeline Relocation in Petlad Ward 4.',
    responsibleAgency: 'Gujarat Water Resources Development Corp (GWRDC) & Petlad Municipality',
    department: 'Water Supply Engineering Cell',
    officerOrContact: 'Chief Officer, Petlad Nagarpalika & Executive Engineer, GWRDC Anand',
    supportingAgency: 'Western Railway (Funding Escrow)',
    responsibilityDescription: 'Commission replacement borewell and interconnect to municipal distribution grid BEFORE dismantling existing tubewell.',
    estimatedCost: 4800000, // ₹48 Lakh
    costBasis: 'GWRDC Schedule of Rates for 400 ft deep 250mm casing borewell + RCC sump + piping.',
    startDate: '2026-05-01',
    targetCompletionDate: '2026-08-31',
    milestone: 'Water quality certification and continuous supply commissioning',
    status: 'Planned',
    evidenceFile: 'gwrdc_tubewell_site_estimate_petlad.pdf',
    monitoringIndicator: {
      indicator: 'Potable Drinking Water Supply to Ward 4 Households',
      baseline: 'Daily 70 Litres per capita per day (LPCD) from existing well',
      target: 'Minimum 70 LPCD uninterrupted drinking water supply without dry-run outage',
      measurementMethod: 'Flow meter logs at consumer distribution manifolds and ward consumer register',
      frequency: 'Monthly',
      responsibleAgency: 'Petlad Nagarpalika Water Works Department',
      evidence: 'ward4_water_supply_daily_logs.pdf'
    },
    remarks: 'Municipal Council passed Resolution No. 44/2026 allotting alternative plot on 18/02/2026.'
  },
  {
    mitigationId: 'MIT-005',
    impactId: 'IMP-004',
    measureDescription: 'Development of Modern Resettlement & Rehabilitation Model Colony on Gaothan Land with Pucca RCC Houses, Internal Paver Roads, Solar Streetlights, and Sanitation.',
    responsibleAgency: 'Collectorate Anand (R&R Branch) & Gujarat Housing Board',
    department: 'Resettlement & Rehabilitation Directorate',
    officerOrContact: 'Administrator (R&R) / Deputy Collector, Anand',
    supportingAgency: 'Western Railway (100% Capital Funding via Project Escrow)',
    responsibilityDescription: 'Construct 186 housing units (minimum 50 sq m plinth) under Second Schedule guidelines; distribute title deeds with joint spousal ownership.',
    estimatedCost: 372000000, // ₹37.20 Cr (186 houses @ ₹20 Lakh avg incl infrastructure)
    costBasis: 'Pradhan Mantri Awas Yojana (PMAY-G) + State Urban Infrastructure Schedule (₹20 Lakh/unit all-inclusive).',
    startDate: '2026-07-01',
    targetCompletionDate: '2027-06-30',
    milestone: 'House allotment draw and handover of possession certificates',
    status: 'Planned',
    evidenceFile: 'rnr_model_colony_site_master_plan.pdf',
    monitoringIndicator: {
      indicator: 'Displaced Family Relocation & Living Condition Standard',
      baseline: 'Dwellings in acquisition Right-of-Way',
      target: '100% displaced families relocated into completed pucca homes with individual tap water and sanitation',
      measurementMethod: 'Individual family handover verification and biometric registration',
      frequency: 'Bi-monthly during construction; Quarterly post-possession',
      responsibleAgency: 'R&R Committee appointed under Section 45',
      evidence: 'possession_handover_certificates_bundle.zip'
    },
    remarks: 'Formulated in strict adherence to Second Schedule Paragraph 1 (Provision of housing units).'
  },
  {
    mitigationId: 'MIT-006',
    impactId: 'IMP-005',
    measureDescription: 'Comprehensive Livelihood Restoration Grant & Skill Development Program for 94 Landless Farm Labourers and Artisans.',
    responsibleAgency: 'District Industries Centre (DIC) Anand & R&R Directorate',
    department: 'Skill Development & Entrepreneurship Cell',
    officerOrContact: 'General Manager, DIC Anand & Lead Sociologist, GIDR',
    supportingAgency: 'Railway Skills Academy, Vadodara',
    responsibilityDescription: 'Disbursement of ₹20,000 one-time resettlement allowance + mandatory monthly subsistence annuity for 12 months + certified vocational training.',
    estimatedCost: 11280000, // ₹1.128 Cr (94 families * [₹20k allowance + ₹3,000/mo * 12 mos + ₹15k training])
    costBasis: 'RFCTLARR Second Schedule Clauses 4, 5 & 10 mandatory statutory allowances.',
    startDate: '2026-06-15',
    targetCompletionDate: '2027-06-14',
    milestone: 'DBT disbursement of subsistence allowance and skill certification',
    status: 'Planned',
    evidenceFile: 'dic_skill_course_curriculum_railway_logistics.pdf',
    monitoringIndicator: {
      indicator: 'Household Income Restoration Level',
      baseline: '₹8,500/month average pre-acquisition agricultural daily wage',
      target: 'Equal or higher sustainable monthly income (>= ₹10,500/month) within 12 months post-training',
      measurementMethod: 'Post-intervention economic census of 94 households',
      frequency: 'Half-yearly for 2 years',
      responsibleAgency: 'GIDR Research Evaluation Unit',
      evidence: 'livelihood_income_restoration_survey.xlsx'
    },
    remarks: '50 local youths shortlisted for railway cargo handling & forklift operator certification.'
  },
  {
    mitigationId: 'MIT-007',
    impactId: 'IMP-006',
    measureDescription: 'Construction of 3.0m High Reinforced Acoustic & Stone Masonry Retaining Boundary Wall around Nar Village Muktidham Compound.',
    responsibleAgency: 'Western Railway (Construction Organization)',
    department: 'Bridges & Structural Works, Vadodara Division',
    officerOrContact: 'Assistant Executive Engineer (Bridges), Petlad',
    supportingAgency: 'Gram Panchayat Nar',
    responsibilityDescription: 'Construct decorative architectural boundary wall with separate ingress gate before track formation earthwork begins.',
    estimatedCost: 2800000, // ₹28 Lakh
    costBasis: 'Railway SOR for 280 running meters stone masonry with coping and gate.',
    startDate: '2026-08-01',
    targetCompletionDate: '2026-11-30',
    milestone: 'Wall structural completion and site landscaping',
    status: 'Planned',
    evidenceFile: 'muktidham_retaining_wall_drawing.pdf',
    monitoringIndicator: {
      indicator: 'Preservation of Cremation Ground Sanctity & Safe Access',
      baseline: 'Unprotected compound perimeter touching corridor boundary',
      target: 'Zero physical encroachment or construction debris intrusion into Muktidham sanctum',
      measurementMethod: 'Joint site inspection protocol with Nar Gram Panchayat elders',
      frequency: 'Monthly during construction',
      responsibleAgency: 'Talati-cum-Mantri Nar & Western Railway Field Engineer',
      evidence: 'muktidham_site_inspection_memo.pdf'
    },
    remarks: 'Panchayat provided unanimous clearance during Gram Sabha hearing on 02/03/2026.'
  },
  {
    mitigationId: 'MIT-008',
    impactId: 'IMP-007',
    measureDescription: 'Compensatory Afforestation & Green Belt Bio-Shield Plantation (1:3 Ratio — 1,260 Indigenous Tree Saplings).',
    responsibleAgency: 'Gujarat State Forest Department (Social Forestry Wing)',
    department: 'Deputy Conservator of Forests (Social Forestry), Anand',
    officerOrContact: 'Range Forest Officer, Petlad Range',
    supportingAgency: 'Western Railway (Project Escrow Deposit)',
    responsibilityDescription: 'Plant Neem, Banyan, Peepal, Jamun, and Gulmohar saplings along right-of-way boundary and school buffers; 3-year maintenance mandate.',
    estimatedCost: 3150000, // ₹31.5 Lakh
    costBasis: 'Forest Department Social Forestry Schedule: ₹2,500 per tree including 3-year watering and tree-guards.',
    startDate: '2026-07-01',
    targetCompletionDate: '2029-06-30',
    milestone: 'Monsoon plantation drives (Year 1, Year 2, Year 3 survival count)',
    status: 'Planned',
    evidenceFile: 'social_forestry_anand_plantation_scheme.pdf',
    monitoringIndicator: {
      indicator: 'Sapling Survival Rate',
      baseline: '0 planted saplings',
      target: 'Minimum 85% sapling survival at 36 months audit',
      measurementMethod: 'Geo-tagged tree census using Forest Dept mobile application',
      frequency: 'Bi-annual survival count',
      responsibleAgency: 'Social Forestry Anand & Independent Environmental Auditor',
      evidence: 'tree_survival_audit_certificate.pdf'
    },
    remarks: 'Funds to be deposited in CAMPA / State Compensatory Forestry account.'
  }
];

// Editable Narrative Draft Sections (Primary source remains structured tables)
export const DEFAULT_SIMP_NARRATIVE = {
  impactSummary: `The proposed Petlad Railway Bypass Alignment (24.8 km) intersects 742 parcels across 5 revenue villages in Anand District. While the project serves a critical national logistics purpose by decongesting the Anand-Vadodara rail feeder, the SIA survey and Section 5 Public Hearing identified substantial socio-economic disruptions. The primary impacts comprise: (i) physical displacement of 186 residential households, (ii) severance of essential agricultural cart roads across 4 village hamlets, (iii) risk to public water supply and irrigation channels, and (iv) loss of seasonal employment for 94 landless farm labourers. The bare-minimum land requirement of 486.75 hectares has been rigorously justified under Section 8(1)(a).`,

  mitigationStrategySummary: `The Social Impact Management Plan (SIMP) establishes an integrated mitigation matrix structured around three core pillars: Structural Engineering Safeguards, Comprehensive Resettlement & Rehabilitation (R&R), and Community Asset Replacement. Western Railway has formally agreed to incorporate major underpass structures (1 VUP and 2 PUPs) and an inverted syphon culvert directly into its civil construction contracts. Displaced families are provided with modern pucca housing units in planned gaothan clusters under Second Schedule norms, while community water networks are guaranteed to be replaced prior to any decommissioning of existing infrastructure.`,

  implementationNotes: `Execution of the SIMP shall be coordinated by the Anand District Collectorate Resettlement Cell in close coordination with Western Railway Construction Organization, GWRDC, and the respective Gram Panchayats. A dedicated Project Escrow Account shall hold the estimated ₹42.74 Crore mitigation outlay. No physical demolition of dwellings or excavation of farmland shall take place until replacement housing and alternative irrigation connections are fully functional on the ground.`,

  monitoringApproach: `An independent Project Monitoring & Evaluation Committee (PMEC) chaired by the Sub-Divisional Magistrate, Petlad, with representation from GIDR, Western Railway, and elected village representatives, shall convene bi-monthly. Quantitative monitoring indicators established for each mitigation measure—including traffic flow continuity, potable water LPCD delivery, and household income restoration—shall be tracked against established baselines and published on the NLAMS public portal.`,

  additionalRemarks: `Special safeguards have been incorporated for vulnerable groups, specifically 42 Scheduled Caste families in Petlad Ward 4 and 18 Scheduled Tribe households in Sunav faliya, ensuring barrier-free housing, direct benefit transfer (DBT) without intermediaries, and prioritized livelihood training.`
};

// SIMP Version History
export const SIMP_VERSIONS = [
  {
    version: 'Draft v1',
    createdBy: 'Dr. Sudhir K. Dave (GIDR)',
    createdAt: '2026-02-15 11:30 AM',
    changeSummary: 'Initial SIMP draft generated from preliminary survey data of 742 parcels and 500 census families.'
  },
  {
    version: 'Draft v2',
    createdBy: 'J. B. Patel (Research Associate, GIDR)',
    createdAt: '2026-03-03 04:45 PM',
    changeSummary: 'Updated with Section 5 Public Hearing inputs (HEAR-0045 to HEAR-0049), added VUP at Ch. 13+400 and canal inverted syphon.'
  }
];
export const DEFAULT_SIMP_VERSIONS = SIMP_VERSIONS;


// Pre-Submission Validation Checklist
export const SIMP_VALIDATION_CHECKLIST = [
  {
    id: 'val-1',
    rule: 'Every identified impact has a recognized statutory category',
    status: 'Complete',
    details: 'All 7 impacts classified within official SIMP categories.'
  },
  {
    id: 'val-2',
    rule: 'Every identified impact has a detailed descriptive scope',
    status: 'Complete',
    details: 'Comprehensive impact narratives and affected components recorded.'
  },
  {
    id: 'val-3',
    rule: 'Affected population and family counts are quantified',
    status: 'Complete',
    details: 'Quantified across all 5 villages with 186 displaced and 94 labour families identified.'
  },
  {
    id: 'val-4',
    rule: 'Severity level is assessed for each impact item',
    status: 'Complete',
    details: '3 Critical, 2 High, 1 Medium, and 1 Low severity items categorized.'
  },
  {
    id: 'val-5',
    rule: 'At least one actionable mitigation measure exists for every critical/high impact',
    status: 'Complete',
    details: '8 active mitigation measures mapped across all 7 impact items.'
  },
  {
    id: 'val-6',
    rule: 'Responsible government / requiring body agency is specifically identified',
    status: 'Complete',
    details: 'Western Railway, SSNNL, GWRDC, and Collectorate Anand assigned clear departmental duties.'
  },
  {
    id: 'val-7',
    rule: 'Financial mitigation cost is budgeted with cost basis',
    status: 'Complete',
    details: 'Total estimated mitigation budget calculated at ₹42,74,30,000 (₹42.74 Cr).'
  },
  {
    id: 'val-8',
    rule: 'Implementation timeline, start and target completion dates are scheduled',
    status: 'Complete',
    details: 'All milestones mapped across 2026-2029 project civil works horizon.'
  },
  {
    id: 'val-9',
    rule: 'Verifiable quantitative monitoring indicator defined for each measure',
    status: 'Complete',
    details: 'Baselines, targets, measurement frequencies, and auditing agencies specified.'
  },
  {
    id: 'val-10',
    rule: 'Supporting engineering / administrative evidence files are linked',
    status: 'Complete',
    details: 'All 8 mitigation measures have attached drawings, estimates, or resolutions.'
  }
];

export function validateSimpIntegrity(impacts = [], mitigations = []) {
  const checks = SIMP_VALIDATION_CHECKLIST.map(c => {
    let isPassed = true;
    let detail = c.details;

    if (c.id === 'val-1') {
      isPassed = impacts.every(i => Boolean(i.category));
    } else if (c.id === 'val-2') {
      isPassed = impacts.every(i => i.description && i.description.length > 10);
    } else if (c.id === 'val-3') {
      isPassed = impacts.every(i => i.affectedFamiliesCount > 0);
    } else if (c.id === 'val-4') {
      isPassed = impacts.every(i => Boolean(i.severity));
    } else if (c.id === 'val-5') {
      const highImpacts = impacts.filter(i => i.severity === 'Critical' || i.severity === 'High');
      isPassed = highImpacts.every(hi => mitigations.some(m => m.impactId === hi.impactId));
      if (!isPassed) detail = 'Some Critical or High severity impacts lack assigned mitigation measures.';
    } else if (c.id === 'val-6') {
      isPassed = mitigations.every(m => Boolean(m.responsibleAgency));
    } else if (c.id === 'val-7') {
      isPassed = mitigations.every(m => m.estimatedCost >= 0);
    } else if (c.id === 'val-8') {
      isPassed = mitigations.every(m => Boolean(m.targetCompletionDate));
    } else if (c.id === 'val-9') {
      isPassed = mitigations.every(m => Boolean(m.monitoringIndicator?.indicator));
    }

    return {
      ...c,
      status: isPassed ? 'Passed' : 'Needs Review',
      details: detail
    };
  });

  const passedCount = checks.filter(c => c.status === 'Passed').length;
  return {
    isValid: passedCount === checks.length,
    passedCount,
    totalCount: checks.length,
    checks
  };
}

