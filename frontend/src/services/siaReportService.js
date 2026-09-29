/**
 * Final SIA Report & Publication Service
 * 
 * Aggregates, validates, and references data from:
 * - Menu 1: SIA Overview (MOCK_SIA_OVERVIEW_DATA)
 * - Menu 2: Survey & Impact Census (PROJECT_CONTEXT, SEED_PARCELS, ALTERNATIVE_SITES, MINIMUM_LAND_ASSESSMENT)
 * - Menu 3: Section 5 Public Hearing (HEARING_SETUP, HEARING_CONCERN_ITEMS, HEARING_MINUTES)
 * - Menu 4: Section 6 SIMP Builder (SEED_SIMP_IMPACTS, SEED_SIMP_MITIGATIONS)
 * 
 * Follows RFCTLARR Act 2013 Section 4-7 statutory publication standards.
 */

import { PROJECT_CONTEXT as SURVEY_PROJECT, ALTERNATIVE_SITES, MINIMUM_LAND_ASSESSMENT, COMMUNITY_ASSETS } from './siaSurveyService.js';
import { DEFAULT_HEARING_SETUP, HEARING_CONCERN_ITEMS, HEARING_STATEMENTS, HEARING_MINUTES } from './siaHearingService.js';
import { SEED_SIMP_IMPACTS, SEED_SIMP_MITIGATIONS } from './siaSimpService.js';
import { SEED_CADASTRAL_PARCELS } from './gisService.js';

// Project Master Context Reference (Shared, no duplicate master)
export const REPORT_PROJECT_CONTEXT = {
  ...SURVEY_PROJECT,
  siaReference: 'SIA/WR/2026/GZ-04',
  reportId: 'SIA-RPT-2026-0042',
  currentVersion: 'Generated v1.0',
  publicationStatus: 'Publication Pending',
  reportStatus: 'Generated', // Draft | In Preparation | Validation Required | Ready for Generation | Generated | Ready for Signature | Signed | Submitted | Published
  lastSaved: '19/09/2026 10:45 AM',
  lastGenerated: '19/09/2026 11:15 AM',
  lastSigned: 'Pending',
  lastSubmitted: 'Pending',
  createdBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
  appointedAgency: 'Gujarat Institute of Development Research (GIDR) — SIA Unit'
};

// 22 Statutory Report Sections in exact statutory sequence
export const REPORT_SECTIONS_LIST = [
  { id: 1, number: '01', key: 'exec_summary', name: 'Executive Summary', source: 'All Modules (Aggregated)', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 2, number: '02', key: 'project_description', name: 'Project Description', source: 'Form-I / Menu 1', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 3, number: '03', key: 'public_purpose', name: 'Public Purpose', source: 'Form-I / Section 2(1)(b)', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 4, number: '04', key: 'land_requirement', name: 'Land Requirement', source: 'Menu 2 Cadastral / GIS', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 5, number: '05', key: 'affected_area', name: 'Affected Area', source: 'Menu 2 GIS & Revenue', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 6, number: '06', key: 'affected_families', name: 'Affected Families', source: 'Menu 2 Census (500 Families)', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 7, number: '07', key: 'displacement', name: 'Displacement', source: 'Menu 2 Resettlement Census', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 8, number: '08', key: 'livelihood_impact', name: 'Livelihood Impact', source: 'Menu 2 Economic Census', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 9, number: '09', key: 'landowners', name: 'Landowners', source: 'Menu 2 RoR Land Records', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 10, number: '10', key: 'community_assets', name: 'Community Assets', source: 'Menu 2 Asset Registry', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 11, number: '11', key: 'infrastructure', name: 'Infrastructure', source: 'Menu 2 Utilities Survey', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 12, number: '12', key: 'alternatives', name: 'Alternatives', source: 'Menu 2 Site Comparison', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 13, number: '13', key: 'bare_minimum_assessment', name: 'Bare Minimum Assessment', source: 'Menu 2 Section 8(1)(a)', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 14, number: '14', key: 'public_hearing', name: 'Public Hearing', source: 'Menu 3 Hearing Records', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 15, number: '15', key: 'social_impact_analysis', name: 'Social Impact Analysis', source: 'Integrated Field Assessment', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 16, number: '16', key: 'simp', name: 'Social Impact Management Plan (SIMP)', source: 'Menu 4 Section 6 SIMP', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 17, number: '17', key: 'cost_of_social_impact', name: 'Cost of Social Impact', source: 'Menu 4 Escrow Budget', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 18, number: '18', key: 'benefit_context', name: 'Benefit Context', source: 'Form-I / DPR Framework', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 19, number: '19', key: 'survey_methodology', name: 'Survey Methodology', source: 'GIDR Field Protocol', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 20, number: '20', key: 'evidence_annexures', name: 'Evidence Annexures', source: 'Document Vault / GIS Proofs', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 21, number: '21', key: 'maps', name: 'Maps', source: 'Leaflet PostGIS Layer Engine', status: 'Complete', lastUpdated: '19/09/2026' },
  { id: 22, number: '22', key: 'final_findings', name: 'Final Findings', source: 'Authorized SIA Agency Assessment', status: 'Complete', lastUpdated: '19/09/2026' }
];

// Editable Narratives Baseline (English & Local Language)
export const DEFAULT_REPORT_NARRATIVES = {
  en: {
    executiveSummary: `The Social Impact Assessment (SIA) for the Petlad Railway Bypass Alignment (24.8 km corridor across 5 revenue villages in Anand District) was conducted by the Gujarat Institute of Development Research (GIDR) pursuant to Section 4 of the RFCTLARR Act 2013. The proposed alignment necessitates the acquisition of 486.75 hectares across 742 cadastral parcels affecting 500 census families, comprising 186 residential physical displacements and 94 livelihood-dependent agricultural labour households. The alignment has been evaluated against two northern alternatives and established as the bare-minimum land requirement adhering to RDSO railway geometry standards. The Section 5 Public Hearing was successfully convened at Town Hall, Petlad on 28/02/2026 with 318 participants (127% of statutory quorum), generating 5 principal representations regarding canal disruption, cattle access, and village road severance. A comprehensive Section 6 Social Impact Management Plan (SIMP) totaling ₹42.74 Crore has been formulated, incorporating 1 vehicular underpass (VUP), 2 pedestrian/cattle underpasses (PUPs), an inverted syphon aqueduct for Canal Minor #4, and model R&R gaothan housing. The SIA Unit recommends the project for statutory appraisal under Section 7 by the Independent Expert Group.`,
    
    publicPurposeJustification: `The Petlad Railway Bypass Alignment constitutes an essential public purpose project under Section 2(1)(b) of the RFCTLARR Act 2013. The bypass connects the major Ahmedabad-Vadodara rail freight logistics trunk line without congesting Petlad Municipal Junction, reducing freight transit detention times by 4.2 hours and eliminating 3 dangerous level crossings within municipal limits. The administrative sanction was accorded vide Ministry of Railways Order MOR/INFRA/2025/APP-8492 dated 12/11/2025.`,
    
    socialImpactAnalysisNarrative: `The multi-dimensional assessment establishes that primary social disruptions are concentrated in agricultural land severance and residential displacement within Gaothan extension limits of Petlad and Sunav. Physical displacement impacts 186 families (920 individuals), predominantly residing in semi-pucca structures without clear land title regularisation. Livelihood dependency analysis reveals 312 cultivators and 94 agricultural labourers will experience income reductions ranging between 35% and 60% if unmitigated. Cultural impact includes the necessary relocation of 1 riverside cremation ground at Nar village, which has been resolved through Gram Panchayat gaothan land allotment. Environmental observations confirm zero displacement of scheduled forest land or national sanctuaries, with compensatory afforestation of 3,200 saplings planned along railway embankment boundaries.`,

    benefitContextSummary: `The construction of the dedicated dual-broad-gauge bypass will catalyze regional logistics infrastructure in Central Gujarat. Direct benefits include safe pedestrian segregation, an economic boost to agrarian freight loading at Sunav rural cargo siding, enhanced passenger train punctuality on the Anand-Khambhat branch, and creation of an estimated 1,400 direct civil works construction jobs during the 36-month execution phase.`,

    surveyMethodologyNarrative: `The field enumeration was conducted between 15/01/2026 and 22/02/2026 deploying 12 trained socio-economic investigators from GIDR, using dual data collection modes: 68% enumerator-assisted electronic tablet interviews and 32% self-service digital responses submitted via Village Panchayat e-Gram kiosks. 100% of the 742 affected land parcels were geocoded with Trimble DGPS instruments and cross-validated against Bhuvan WMS cadastral layers and Gujarat Revenue e-Dhara Record of Rights (RoR). Public consultation protocols adhered to statutory 3-week advance publication in regional Gujarati dailies (Gujarat Samachar and Divya Bhaskar).`,

    finalFindingsNarrative: `Based on exhaustive socio-economic enumeration, technical alignment scrutiny, and public representations recorded during statutory hearings, the SIA Agency submits the following conclusive findings: (i) The acquisition of 486.75 ha serves a legitimate public infrastructure purpose; (ii) The land requested represents the bare minimum necessity with zero excess buffer; (iii) No feasible alternative exists with lesser displacement; (iv) The social, housing, and livelihood impacts are substantial but fully mitigable through the formulated ₹42.74 Crore SIMP; (v) Requisitioning Body and Revenue Authorities must ensure upfront escrow deposit of SIMP budgetary components prior to Section 11 preliminary notification.`
  },
  gu: {
    executiveSummary: `પેટલાદ રેલ્વે બાયપાસ સંરેખણ (આણંદ જિલ્લાના ૫ મહેસૂલી ગામોમાં ૨૪.૮ કિમી કોરિડોર) માટે સામાજિક અસર આકારણી (SIA) ગુજરાત ઇન્સ્ટિટ્યૂટ ઓફ ડેવલપમેન્ટ રિસર્ચ (GIDR) દ્વારા RFCTLARR કાયદો ૨૦૧૩ ની કલમ ૪ મુજબ હાથ ધરવામાં આવી છે. સૂચિત સંરેખણ માટે ૭૪૨ સર્વે નંબરોમાં ૪૮૬.૭૫ હેક્ટર જમીન સંપાદન જરૂરી છે, જેનાથી ૫૦૦ પરિવારો પ્રભાવિત થાય છે. તેમાં ૧૮૬ રહેણાંક પરિવારોનું સ્થળાંતર અને ૯૪ ખેતમજૂર પરિવારો સામેલ છે. કલમ ૫ ની જાહેર સુનાવણી ૨૮/૦૨/૨૦૨૬ ના રોજ ટાઉન હોલ પેટલાદ ખાતે ૩૧૮ ગ્રામજનોની ઉપસ્થિતિ સાથે સંપન્ન થઈ હતી. કલમ ૬ હેઠળ ₹૪૨.૭૪ કરોડની સામાજિક અસર વ્યવસ્થાપન યોજના (SIMP) ઘડવામાં આવી છે.`,
    
    publicPurposeJustification: `પેટલાદ રેલ્વે બાયપાસ પ્રોજેક્ટ RFCTLARR કાયદા ૨૦૧૩ ની કલમ ૨(૧)(બી) હેઠળ રેલ્વે જાહેર હેતુનો રાષ્ટ્રીય પ્રોજેક્ટ છે, જે નૂર પરિવહનમાં ૪.૨ કલાકનો સમય ઘટાડશે.`,
    
    socialImpactAnalysisNarrative: `આ પ્રોજેક્ટથી કૃષિ જમીન અને ૧૮૬ પરિવારોના રહેઠાણને અસર થશે. સિંચાઈ કેનાલ માઇનોર #૪ અને નાર ગામના સ્મશાન ગૃહનું પુનઃનિર્માણ SIMP અંતર્ગત મંજૂર કરવામાં આવ્યું છે.`,

    benefitContextSummary: `રેલ્વે બાયપાસથી પ્રાદેશિક માલવાહક પરિવહન ક્ષમતા વધશે અને ૩૬ મહિનાના બાંધકામ ગાળા દરમિયાન ૧,૪૦૦ સ્થાનિક રોજગારીનું સર્જન થશે.`,

    surveyMethodologyNarrative: `GIDR દ્વારા ૧૫/૦૧/૨૦૨૬ થી ૨૨/૦૨/૨૦૨૬ દરમિયાન ૧૨ ફિલ્ડ સંશોધકો દ્વારા ૫૦૦ પરિવારોનું પ્રત્યક્ષ સર્વેક્ષણ અને GPS મેપિંગ કરવામાં આવ્યું છે.`,

    finalFindingsNarrative: `SIA યુનિટના તારણ મુજબ પ્રસ્તાવિત ૪૮૬.૭૫ હેક્ટર જમીન જાહેર હેતુ માટે અનિવાર્ય અને ન્યૂનતમ છે. સામાજિક અસરોના નિવારણ માટે ₹૪૨.૭૪ કરોડની SIMP યોજના સ્વાયત્ત નિષ્ણાત જૂથ (IEG) સમક્ષ કલમ ૭ મુજબ રજૂ કરવા યોગ્ય છે.`
  }
};

// 13 Configurable Statutory Pre-Generation Validation Rules
export const REPORT_VALIDATION_RULES = [
  { id: 'rule-1', code: 'RULE_01', name: 'Cadastral GIS Mapping', description: 'Every project parcel must have verified boundary polygon & GIS reference.', status: 'PASS', module: 'Menu 2', issueCount: 0, details: '742 of 742 parcels mapped on PostGIS canvas.' },
  { id: 'rule-2', code: 'RULE_02', name: 'Ownership Baseline Linkage', description: 'Ownership baseline (RoR e-Dhara) must be linked for affected parcels.', status: 'PASS', module: 'Menu 2', issueCount: 0, details: 'All 742 parcels mapped to verified Khatedars.' },
  { id: 'rule-3', code: 'RULE_03', name: 'Family Census Completion', description: 'Affected family census must have required socio-economic profiles.', status: 'WARNING', module: 'Menu 2', issueCount: 14, details: '14 families have pending verification of ancillary caste certificate.', targetRecord: 'FAM-0042' },
  { id: 'rule-4', code: 'RULE_04', name: 'Displacement Identification', description: 'Displacement status (Displaced / Non-Displaced) must be classified.', status: 'PASS', module: 'Menu 2', issueCount: 0, details: '186 Displaced, 314 Non-Displaced fully categorized.' },
  { id: 'rule-5', code: 'RULE_05', name: 'Livelihood Survey Completion', description: 'Livelihood dependency profiles completed for affected households.', status: 'PASS', module: 'Menu 2', issueCount: 0, details: '100% economic census completed.' },
  { id: 'rule-6', code: 'RULE_06', name: 'Community Asset Geolocation', description: 'Community assets must contain verified coordinates & replacement status.', status: 'WARNING', module: 'Menu 2', issueCount: 3, details: '3 village borewells require DGPS sub-meter point verification.', targetRecord: 'COMM-004' },
  { id: 'rule-7', code: 'RULE_07', name: 'Public Hearing Minutes Attached', description: 'Section 5 hearing record must contain signed minutes and attendance log.', status: 'PASS', module: 'Menu 3', issueCount: 0, details: 'Signed SDM minutes and 318-attendee registry sealed.' },
  { id: 'rule-8', code: 'RULE_08', name: 'Public Hearing Evidence Sealed', description: 'Hearing audio/video and geo-tagged photographic proofs archived.', status: 'PASS', module: 'Menu 3', issueCount: 0, details: '4 hours video, 18 photographs, and newspaper clippings verified.' },
  { id: 'rule-9', code: 'RULE_09', name: 'SIMP Mitigation Completeness', description: 'All High/Critical impacts must have budgeted mitigation measures.', status: 'PASS', module: 'Menu 4', issueCount: 0, details: '8 actionable mitigations mapped to all 7 identified disruptions.' },
  { id: 'rule-10', code: 'RULE_10', name: 'Alternative Site Analysis', description: 'Alternative site comparative assessment matrix must be documented.', status: 'PASS', module: 'Menu 2', issueCount: 0, details: 'Options A, B, and C documented with engineering justifications.' },
  { id: 'rule-11', code: 'RULE_11', name: 'Bare Minimum Land Assessment', description: 'Section 8(1)(a) bare minimum land justification certificate formulated.', status: 'PASS', module: 'Menu 2', issueCount: 0, details: 'RDSO railway corridor width optimization documented.' },
  { id: 'rule-12', code: 'RULE_12', name: 'Report Sections Integrity', description: 'All 22 statutory chapters assembled with approved source lineage.', status: 'PASS', module: 'Menu 5', issueCount: 0, details: 'Chapters 01 to 22 ready for compilation.' },
  { id: 'rule-13', code: 'RULE_13', name: 'Evidence Annexure References', description: 'All cited statutory documents exist in vault index.', status: 'PASS', module: 'Menu 5', issueCount: 0, details: '24 indexed annexures with verifiable document IDs.' }
];

// Validation Issues Breakdown
export const VALIDATION_ISSUES_LIST = [
  {
    issueId: 'ISSUE-01',
    severity: 'Medium',
    module: 'Menu 2: Survey & Census',
    recordId: 'FAM-0042 to FAM-0055',
    description: '14 family profiles in Sunav village have pending caste certificate verification by Taluka Development Officer.',
    actionType: 'Open Record',
    status: 'Open'
  },
  {
    issueId: 'ISSUE-02',
    severity: 'Low',
    module: 'Menu 2: Community Assets',
    recordId: 'COMM-004 / Wells',
    description: '3 drinking water handpump locations require precise sub-meter DGPS coordinates before final cadastral publication.',
    actionType: 'Open Record',
    status: 'Open'
  },
  {
    issueId: 'ISSUE-03',
    severity: 'Low',
    module: 'Menu 3: Public Hearing',
    recordId: 'HEAR-0048',
    description: 'Supplemental written reply to petitioner regarding canal siltation requires formal receipt endorsement copy.',
    actionType: 'Resolve',
    status: 'Pending Verification'
  }
];

// Evidence Annexures Index (Structured, no duplicate files)
export const EVIDENCE_ANNEXURES_LIST = [
  { annexureNo: 'Annexure I', docId: 'DOC-GZ-2026-04', type: 'Gazette Notification', module: 'Menu 1', title: 'Section 4(1) SIA Commencement Gazette Notification in Gujarat Government Gazette', uploader: 'Revenue Department', date: '14/01/2026', size: '2.4 MB' },
  { annexureNo: 'Annexure II', docId: 'DOC-APP-8492', type: 'Administrative Approval', module: 'Menu 1', title: 'Ministry of Railways Administrative Approval Order for Petlad Rail Bypass Alignment', uploader: 'Western Railway', date: '12/11/2025', size: '1.8 MB' },
  { annexureNo: 'Annexure III', docId: 'DOC-CAD-MAP-01', type: 'Cadastral Index Map', module: 'Menu 2', title: 'Geo-referenced PostGIS Cadastral Map showing 742 Affected Parcels across 5 Villages', uploader: 'GIS Unit, GIDR', date: '18/02/2026', size: '14.2 MB' },
  { annexureNo: 'Annexure IV', docId: 'DOC-ALT-EVAL-01', type: 'Technical Evaluation', module: 'Menu 2', title: 'Comparative Alignment Options Analysis & Engineering Curvature Evaluation Report', uploader: 'Western Railway Construction Div', date: '05/02/2026', size: '5.6 MB' },
  { annexureNo: 'Annexure V', docId: 'DOC-HRG-PUB-01', type: 'Public Notice Proof', module: 'Menu 3', title: 'Newspaper Publication Clippings of Hearing Notice in Gujarat Samachar & Divya Bhaskar', uploader: 'Collectorate Anand', date: '06/02/2026', size: '3.1 MB' },
  { annexureNo: 'Annexure VI', docId: 'DOC-HRG-MIN-01', type: 'Hearing Minutes', module: 'Menu 3', title: 'Statutory Section 5 Public Hearing Minutes signed by SDM Petlad & SIA Chief Evaluator', uploader: 'SIA Evaluation Team', date: '28/02/2026', size: '4.8 MB' },
  { annexureNo: 'Annexure VII', docId: 'DOC-HRG-REG-01', type: 'Attendance Register', module: 'Menu 3', title: 'Public Hearing Signed Attendance Roster of 318 Affected Landowners & Villagers', uploader: 'SDM Office, Petlad', date: '28/02/2026', size: '8.2 MB' },
  { annexureNo: 'Annexure VIII', docId: 'DOC-SIMP-CIV-01', type: 'Engineering Estimates', module: 'Menu 4', title: 'Detailed Project Estimates for Vehicular Underpass (VUP) & Inverted Syphon Aqueduct', uploader: 'SSNNL & WR Bridges', date: '04/03/2026', size: '6.5 MB' },
  { annexureNo: 'Annexure IX', docId: 'DOC-RNR-GAO-01', type: 'Gaothan Layout', module: 'Menu 4', title: 'Model R&R Resettlement Colony Layout Plan (Second Schedule) at Sunav Gaothan', uploader: 'Town Planning Dept, Anand', date: '06/03/2026', size: '7.9 MB' }
];

// Report Version History
export const REPORT_VERSIONS = [
  {
    version: 'Draft v0.1',
    language: 'English',
    status: 'Draft',
    createdBy: 'J. B. Patel (Research Associate, GIDR)',
    createdAt: '18/02/2026 03:30 PM',
    summary: 'Preliminary compilation of Census data and parcel baseline.'
  },
  {
    version: 'Draft v0.2',
    language: 'English',
    status: 'Draft',
    createdBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
    createdAt: '02/03/2026 11:15 AM',
    summary: 'Integrated Section 5 Public Hearing minutes and citizen objections.'
  },
  {
    version: 'Generated v1.0',
    language: 'English & Gujarati',
    status: 'Generated',
    createdBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
    createdAt: '19/09/2026 11:15 AM',
    summary: 'Full 22-chapter statutory report assembled with ₹42.74 Cr SIMP and GIS maps.'
  }
];

// Audit Lineage Record
export const REPORT_AUDIT_TRAIL = {
  createdBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
  createdAt: '18/02/2026 03:30 PM',
  modifiedBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
  modifiedAt: '19/09/2026 10:45 AM',
  generatedBy: 'SIA Reporting Engine v2.4 (Automated Assembly)',
  generatedAt: '19/09/2026 11:15 AM',
  signedBy: 'Pending e-Signature by Authorized SIA Agency Head',
  signedAt: 'Not yet signed',
  submittedBy: 'Pending Submission to IEG',
  submittedAt: 'Not yet submitted',
  publishedBy: 'Pending Revenue Department Gazette Notification',
  publishedAt: 'Not yet published'
};

// Publication Channels Config
export const PUBLICATION_CHANNELS = [
  { id: 'gazette', name: 'Gujarat State Government e-Gazette (Part II)', selected: true, status: 'Queued' },
  { id: 'district_portal', name: 'Anand District Collectorate Public Notices Portal', selected: true, status: 'Queued' },
  { id: 'taluka_notice', name: 'Petlad Sub-Divisional Magistrate & Taluka Panchayat Notice Board', selected: true, status: 'Ready' },
  { id: 'gram_panchayat', name: 'Village Gram Panchayat Bulletins (Petlad, Sunav, Nar, Demol, Rangaipura)', selected: true, status: 'Ready' },
  { id: 'public_portal', name: 'NLAMS Public Citizen Information Transparency Portal', selected: true, status: 'Queued' }
];
