/**
 * SIA Public Hearing Service (Section 5 — RFCTLARR Act 2013)
 * 
 * Provides domain data, schemas, and persistence helpers for 
 * Menu 3: Section 5 — Public Hearing in the NLAMS SIA & IEG Evaluation Workspace.
 * 
 * Traceability:
 * Linked to Project: NLAMS-DEMO-2026-001
 * Linked to SIA Survey (Menu 2): Families (FAM-001 to FAM-500), Parcels, ULPINs, Community Assets (COMM-001 to COMM-003).
 */

import { PROJECT_CONTEXT, COMMUNITY_ASSETS } from './siaSurveyService.js';

export { PROJECT_CONTEXT };

// Section 5 Public Hearing Setup Configuration
export const DEFAULT_HEARING_SETUP = {
  hearingId: 'PH-2026-001',
  projectId: PROJECT_CONTEXT.projectId,
  projectName: PROJECT_CONTEXT.projectName,
  siaReference: 'SIA-WR-PETLAD-2026-01',
  district: PROJECT_CONTEXT.district,
  taluka: PROJECT_CONTEXT.taluka,
  village: 'Petlad (Central Hub)',
  coverageVillages: ['Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'],
  affectedAreaHa: PROJECT_CONTEXT.proposedAcquisitionAreaHa,
  scheduledDate: '2026-02-28',
  scheduledTime: '10:30 AM',
  venue: 'Dr. B. R. Ambedkar Community Hall & Town Hall, Station Road, Petlad',
  publicityDate: '2026-02-06', // Min 3 weeks advance as per statutory rule
  noticeLanguage: 'Gujarati (Primary) + English',
  // Allowed statuses: 'Planned', 'Notice Published', 'Scheduled', 'Conducted', 'Record Compilation', 'Completed'
  status: 'Conducted',
  conductingAuthority: 'Sub-Divisional Magistrate (SDM) / Land Acquisition Officer, Petlad',
  siaAgency: 'Gujarat Institute of Development Research (GIDR), Ahmedabad',
  quorumTarget: 250,
  quorumAchieved: 318,
  quorumPercentage: 127.2
};

// Notice & Publicity Evidence Records
export const NOTICE_PUBLICITY_RECORDS = [
  {
    noticeId: 'NOT-PUB-01',
    hearingId: 'PH-2026-001',
    publicationDate: '06/02/2026',
    language: 'Gujarati',
    method: 'Local Public Notice',
    location: 'Gram Panchayat Notice Boards (Petlad, Sunav, Nar, Demol, Rangaipura)',
    documentName: 'Gazette_Notice_Panchayat_Affixed_Gujarati.pdf',
    fileSize: '2.4 MB',
    uploadedBy: 'N. K. Solanki (Deputy Mamlatdar, Land Acquisition)',
    uploadedAt: '06/02/2026 11:15 AM',
    remarks: 'Photographic proof of public affixing on Chavdi and Talati offices verified by Talati-cum-Mantri.'
  },
  {
    noticeId: 'NOT-PUB-02',
    hearingId: 'PH-2026-001',
    publicationDate: '07/02/2026',
    language: 'Gujarati',
    method: 'Village-level Publicity',
    location: 'Dhandhera (Public Tom-Tom / Megaphone Announcement) in all 5 villages',
    documentName: 'Dhandhera_Munadi_Certificate_Anand.pdf',
    fileSize: '1.1 MB',
    uploadedBy: 'J. B. Patel (SIA Field Officer, GIDR)',
    uploadedAt: '08/02/2026 04:30 PM',
    remarks: 'Field kotwal panchnama recorded with signatures of 3 village elders per village.'
  },
  {
    noticeId: 'NOT-PUB-03',
    hearingId: 'PH-2026-001',
    publicationDate: '07/02/2026',
    language: 'Gujarati & English',
    method: 'Digital Publication',
    location: 'District Collectorate Anand Web Portal & NLAMS Public Hearing Gazette Notice Board',
    documentName: 'Anand_Collectorate_Digital_Notice_Copy.pdf',
    fileSize: '850 KB',
    uploadedBy: 'IT Cell, District Collectorate Anand',
    uploadedAt: '07/02/2026 09:45 AM',
    remarks: 'Published under Section 5 notice link with mobile QR code access.'
  }
];

// Hearing Notice Supporting Documents
export const NOTICE_DOCUMENTS = [
  {
    documentId: 'DOC-HN-001',
    documentType: 'Hearing Notice',
    fileName: 'Form_V_Section_5_Statutory_Notice_Signed.pdf',
    language: 'Gujarati & English',
    fileSize: '3.1 MB',
    uploadedBy: 'Collectorate Anand (LA Branch)',
    uploadedAt: '06/02/2026 10:00 AM',
    version: '1.0 (Official Signed)'
  },
  {
    documentId: 'DOC-HN-002',
    documentType: 'Publicity Evidence',
    fileName: 'Affixing_GeoTagged_Photos_5_Villages.zip',
    language: 'Bilingual',
    fileSize: '14.8 MB',
    uploadedBy: 'SIA Survey Team (GIDR)',
    uploadedAt: '08/02/2026 05:20 PM',
    version: '1.0'
  },
  {
    documentId: 'DOC-HN-003',
    documentType: 'Supporting Document',
    fileName: 'Draft_SIA_Summary_Booklet_Distributed.pdf',
    language: 'Gujarati',
    fileSize: '4.6 MB',
    uploadedBy: 'GIDR Research Cell',
    uploadedAt: '10/02/2026 02:15 PM',
    version: '2.1'
  }
];

// Offline Hearing Attendance Registry (Sample of realistic participants linked to SIA Census)
export const SEED_ATTENDANCE_REGISTRY = [
  {
    participantId: 'PART-001',
    name: 'Rameshwar Laljibhai Patel',
    participantCategory: 'Affected Family',
    village: 'Petlad',
    familyId: 'FAM-001',
    ulpin: '24051234567890',
    surveyNo: '142/A',
    mobile: '9825101001',
    signatureAck: 'Physical Thumb Impression / Signature Recorded on Register',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-014',
    entryTime: '10:05 AM'
  },
  {
    participantId: 'PART-002',
    name: 'Kalpesh Rameshbhai Patel',
    participantCategory: 'Landowner',
    village: 'Petlad',
    familyId: 'FAM-002',
    ulpin: '24051234567891',
    surveyNo: '142/B',
    mobile: '9825101002',
    signatureAck: 'Signed Register Page 2',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-015',
    entryTime: '10:08 AM'
  },
  {
    participantId: 'PART-003',
    name: 'Maheshbhai Somabhai Patel',
    participantCategory: 'Landowner',
    village: 'Sunav',
    familyId: 'FAM-003',
    ulpin: '24051234567892',
    surveyNo: '143',
    mobile: '9825101003',
    signatureAck: 'Signed Register Page 2',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-021',
    entryTime: '10:12 AM'
  },
  {
    participantId: 'PART-004',
    name: 'Bhikhabhai Revabhai Vankar',
    participantCategory: 'Livelihood Dependent',
    village: 'Sunav',
    familyId: 'FAM-004',
    ulpin: '24051234567892',
    surveyNo: '143 (Canal Bund)',
    mobile: '9825101004',
    signatureAck: 'Thumb Impression on Sheet #3',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-024',
    entryTime: '10:15 AM'
  },
  {
    participantId: 'PART-005',
    name: 'Jaswantbhai Chaturbhai Parmar',
    participantCategory: 'Affected Family',
    village: 'Nar',
    familyId: 'FAM-005',
    ulpin: '24051234567893',
    surveyNo: '144',
    mobile: '9825101005',
    signatureAck: 'Signed Register Page 3',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-033',
    entryTime: '10:20 AM'
  },
  {
    participantId: 'PART-006',
    name: 'Shantaben Somabhai Solanki',
    participantCategory: 'Affected Family',
    village: 'Nar',
    familyId: 'FAM-006',
    ulpin: '24051234567893',
    surveyNo: '144/B',
    mobile: '9825101006',
    signatureAck: 'Represented by Son (Dinesh Parmar) with Authority Letter',
    photoVerified: true,
    attendanceStatus: 'Represented',
    seatToken: 'T-034',
    entryTime: '10:22 AM'
  },
  {
    participantId: 'PART-007',
    name: 'Dineshbhai Manilal Rathod',
    participantCategory: 'Tenant',
    village: 'Demol',
    familyId: 'FAM-007',
    ulpin: '24051234567894',
    surveyNo: '145',
    mobile: '9825101007',
    signatureAck: 'Signed Register Page 4',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-048',
    entryTime: '10:25 AM'
  },
  {
    participantId: 'PART-008',
    name: 'Pravinbhai Kanjibhai Rohit',
    participantCategory: 'Affected Family',
    village: 'Demol',
    familyId: 'FAM-008',
    ulpin: '24051234567894',
    surveyNo: '145/A',
    mobile: '9825101008',
    signatureAck: 'Signed Register Page 4',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-050',
    entryTime: '10:28 AM'
  },
  {
    participantId: 'PART-009',
    name: 'Sarpanch Smt. Gitaben V. Patel',
    participantCategory: 'Village Representative',
    village: 'Sunav',
    familyId: 'N/A',
    ulpin: 'N/A',
    surveyNo: 'Gram Panchayat Sunav',
    mobile: '9825102001',
    signatureAck: 'Official Seal and Signature on Record Sheet',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'VIP-02',
    entryTime: '09:50 AM'
  },
  {
    participantId: 'PART-010',
    name: 'Sarpanch Shri Dilipbhai Chavda',
    participantCategory: 'Village Representative',
    village: 'Demol',
    familyId: 'N/A',
    ulpin: 'N/A',
    surveyNo: 'Gram Panchayat Demol',
    mobile: '9825102002',
    signatureAck: 'Official Seal and Signature',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'VIP-03',
    entryTime: '09:55 AM'
  },
  {
    participantId: 'PART-011',
    name: 'Shri Arvindbhai M. Bhatt',
    participantCategory: 'Requiring Body Representative',
    village: 'Vadodara / Petlad',
    familyId: 'N/A',
    ulpin: 'N/A',
    surveyNo: 'Western Railway (Construction)',
    mobile: '9724011223',
    signatureAck: 'Official ID Badge Verified & Signed',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'OFFICER-01',
    entryTime: '09:40 AM'
  },
  {
    participantId: 'PART-012',
    name: 'Dr. Sudhir K. Dave (Lead Sociologist)',
    participantCategory: 'SIA Representative',
    village: 'Ahmedabad / GIDR',
    familyId: 'N/A',
    ulpin: 'N/A',
    surveyNo: 'GIDR Research Team',
    mobile: '9426012345',
    signatureAck: 'Signed Conducting Panel Register',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'PANEL-02',
    entryTime: '09:30 AM'
  },
  {
    participantId: 'PART-013',
    name: 'Natubhai Shankarbhai Vaghela',
    participantCategory: 'Landowner',
    village: 'Rangaipura',
    familyId: 'FAM-009',
    ulpin: '24051234567895',
    surveyNo: '146/1',
    mobile: '9825101009',
    signatureAck: 'Signature Pending',
    photoVerified: false,
    attendanceStatus: 'Absent',
    seatToken: 'T-062',
    entryTime: 'N/A'
  },
  {
    participantId: 'PART-014',
    name: 'Kamleshbhai Gordhanbhai Dave',
    participantCategory: 'Community Member',
    village: 'Rangaipura',
    familyId: 'FAM-010',
    ulpin: '24051234567896',
    surveyNo: '147',
    mobile: '9825101010',
    signatureAck: 'Signed Register Page 5',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-065',
    entryTime: '10:35 AM'
  },
  {
    participantId: 'PART-015',
    name: 'Manjulaben Popatbhai Bharwad',
    participantCategory: 'Livelihood Dependent',
    village: 'Petlad',
    familyId: 'FAM-011',
    ulpin: '24051234567897',
    surveyNo: 'Gauchar Land adjacent to 148',
    mobile: '9825101011',
    signatureAck: 'Thumb Impression on Sheet #6',
    photoVerified: true,
    attendanceStatus: 'Present',
    seatToken: 'T-071',
    entryTime: '10:38 AM'
  }
];

// Offline Hearing Media Evidence
export const HEARING_MEDIA_EVIDENCE = [
  {
    mediaId: 'MED-01',
    type: 'Photographs',
    title: 'Hall Attendance & Panchnama View (350+ attendees)',
    fileName: 'PH_2026_001_Hall_Overview_Wide.jpg',
    fileSize: '4.2 MB',
    timestamp: '28/02/2026 10:45 AM',
    uploadedBy: 'GIDR Media Unit',
    description: 'High-resolution wide angle view of the gathering showing presiding officer and villagers.'
  },
  {
    mediaId: 'MED-02',
    type: 'Video',
    title: 'Full Video Recording of Public Hearing (Part 1 - Statements & Speeches)',
    fileName: 'PH_2026_001_Session1_Full_Stream.mp4',
    fileSize: '840 MB',
    timestamp: '28/02/2026 01:15 PM',
    uploadedBy: 'NIC Anand Audio-Visual Cell',
    description: 'Statutory uninterrupted HD video recording with timestamp watermark as mandated by RFCTLARR Rule 11.'
  },
  {
    mediaId: 'MED-03',
    type: 'Video',
    title: 'Full Video Recording of Public Hearing (Part 2 - Objections & Official Responses)',
    fileName: 'PH_2026_001_Session2_Objections.mp4',
    fileSize: '620 MB',
    timestamp: '28/02/2026 04:30 PM',
    uploadedBy: 'NIC Anand Audio-Visual Cell',
    description: 'Detailed objection submissions by representatives of Sunav and Demol Gram Panchayats.'
  },
  {
    mediaId: 'MED-04',
    type: 'Audio',
    title: 'Podium Microphone Audio Tape Track',
    fileName: 'PH_2026_001_Master_Audio_Gujarati.wav',
    fileSize: '180 MB',
    timestamp: '28/02/2026 05:00 PM',
    uploadedBy: 'Sound Engineer, Town Hall Petlad',
    description: 'Clear speech audio track for verbatim transcription into official minutes.'
  },
  {
    mediaId: 'MED-05',
    type: 'Attendance Record',
    title: 'Scanned Physical Sign-in Sheets (87 Pages with Signatures & Thumbprints)',
    fileName: 'Scanned_Physical_Attendance_Register_318_signatures.pdf',
    fileSize: '24.5 MB',
    timestamp: '28/02/2026 06:15 PM',
    uploadedBy: 'SIA Documentation Officer',
    description: 'Certified physical attendance register countersigned by SDM Petlad and GIDR Lead Evaluator.'
  }
];

// Hearing Minutes Record
export const HEARING_MINUTES = {
  meetingDate: '2026-02-28',
  venue: 'Dr. B. R. Ambedkar Community Hall & Town Hall, Station Road, Petlad',
  presidingAuthority: 'Shri M. R. Vaghela, GAS, Sub-Divisional Magistrate & Competent Authority, Petlad',
  siaAgency: 'Gujarat Institute of Development Research (GIDR), Ahmedabad (Lead: Dr. Sudhir K. Dave)',
  requiringBodyRep: 'Shri Arvindbhai M. Bhatt, Executive Engineer (Const.), Western Railway',
  totalAttendeesCount: 318,
  keyIssuesRaised: [
    'Severance of village access roads between Petlad town and agricultural farmlands in Sunav and Demol.',
    'Disruption of irrigation canal minor distributary (Mahi Right Bank Canal Distributary #4) at Ch. 11+600.',
    'Relocation of village community tubewell in Petlad Ward 4 that supplies drinking water to 320 families.',
    'Protection of Muktidham cremation ground on riverbank approach in Nar village.',
    'Demand for commercial/housing compensation matching recent industrial corridor circle rates.'
  ],
  majorSuggestions: [
    'Provide at least 3 Vehicular Underpasses (VUP) with minimum 5.5m vertical clearance for tractors and harvesters.',
    'Incorporate concrete box syphon culvert at Ch. 11+600 so canal flow is uninterrupted before track laying.',
    'Drill and commission replacement high-yield borewell in Petlad Ward 4 before dismantling existing one.',
    'Realign eastern corridor boundary by 18 meters to completely spare the Nar village Muktidham shed.'
  ],
  majorObjections: [
    'Objection by 42 farmers against taking multi-crop irrigated land when fallow land exists 1.2 km south.',
    'Objection against valuation based on 2022 Jantri rates; demand current 2026 market multiplier under Schedule 1.',
    'Objection by 15 landless agricultural labourers who will lose daily farm work without direct land ownership.'
  ],
  officialResponses: [
    'Western Railway confirmed in principle that 4 Vehicular / Pedestrian Underpasses will be incorporated into civil contract.',
    'Executive Engineer committed to construct inverted syphon culvert for Canal Minor #4 during pre-construction dry window.',
    'SDM Petlad clarified that Jantri rates will be multiplied by Rural Factor (1.5x) plus 100% Solatium plus 12% interest as per First Schedule of Act.',
    'GIDR confirmed landless labourers with >3 years dependence are entitled to mandatory annuity / lumpsum under Second Schedule.'
  ],
  resolutions: [
    'Joint inspection by Western Railway and Irrigation Dept scheduled for 05/03/2026 at Ch. 11+600 canal intersection.',
    'Gram Panchayat Nar to submit mutation resolution for alternative Gaothan plot by 10/03/2026.',
    'Detailed Social Impact Management Plan (SIMP) to incorporate ₹8.45 Cr estimated mitigation budget.'
  ],
  minutesDocument: 'Certified_Minutes_Signed_SDM_GIDR_Petlad_28Feb2026.pdf',
  preparedBy: 'Dr. Sudhir K. Dave (Lead Sociologist, GIDR)',
  preparedDate: '2026-03-02',
  status: 'Approved & Signed by SDM'
};

// Statements / Objections / Suggestions Records (Section 5 Inputs)
export const HEARING_STATEMENTS = [
  {
    recordId: 'STMT-001',
    participantId: 'PART-001',
    participant: 'Rameshwar Laljibhai Patel',
    familyId: 'FAM-001',
    village: 'Petlad',
    ulpin: '24051234567890',
    category: 'Objection',
    description: 'Complete residential house (RCC 1450 sq ft) falls directly under proposed railway track. Demands full resettlement in municipal gaothan zone with ready house plus land compensation.',
    evidenceFile: 'property_deed_and_photo_142A.pdf',
    submittedAt: '28/02/2026 11:15 AM',
    responseStatus: 'Recorded in Minutes & Forwarded to SIMP'
  },
  {
    recordId: 'STMT-002',
    participantId: 'PART-004',
    participant: 'Bhikhabhai Revabhai Vankar',
    familyId: 'FAM-004',
    village: 'Sunav',
    ulpin: '24051234567892',
    category: 'Concern',
    description: 'We are landless agricultural labourers harvesting tobacco on Survey 143 for 12 years. If this land is acquired, our family has zero income source. Requests rehabilitation annuity under Section 31.',
    evidenceFile: 'labour_dependence_affidavit_vankar.pdf',
    submittedAt: '28/02/2026 11:40 AM',
    responseStatus: 'Admitted under Second Schedule Livelihood Category'
  },
  {
    recordId: 'STMT-003',
    participantId: 'PART-009',
    participant: 'Sarpanch Smt. Gitaben V. Patel',
    familyId: 'N/A',
    village: 'Sunav',
    ulpin: 'N/A',
    category: 'Suggestion',
    description: 'School children and dairy farmers cross the existing cart road twice daily. Construct a Vehicular Underpass (VUP) at Ch. 13+400 with lighting and drainage so monsoon waterlogging does not trap the village.',
    evidenceFile: 'panchayat_resolution_sunav_vup.pdf',
    submittedAt: '28/02/2026 12:05 PM',
    responseStatus: 'Accepted by Western Railway for Structural Inclusion'
  },
  {
    recordId: 'STMT-004',
    participantId: 'PART-005',
    participant: 'Jaswantbhai Chaturbhai Parmar',
    familyId: 'FAM-005',
    village: 'Nar',
    ulpin: '24051234567893',
    category: 'Objection',
    description: 'The railway alignment cuts through high-yield 350-ft deep irrigation borewell (STR-003). Three adjacent farmland holdings rely on this water. Work cannot start until a replacement tubewell is drilled.',
    evidenceFile: 'borewell_electricity_bills_parmar.pdf',
    submittedAt: '28/02/2026 12:30 PM',
    responseStatus: 'Mapped to SIMP Asset Relocation Program'
  },
  {
    recordId: 'STMT-005',
    participantId: 'PART-010',
    participant: 'Sarpanch Shri Dilipbhai Chavda',
    familyId: 'N/A',
    village: 'Demol',
    ulpin: 'N/A',
    category: 'Statement',
    description: 'Demol Gram Sabha unanimously resolved to support the railway line provided all local youth get training priority in railway logistics jobs and village cattle pond is spared.',
    evidenceFile: 'demol_gram_sabha_resolution_2026.pdf',
    submittedAt: '28/02/2026 02:10 PM',
    responseStatus: 'Recorded in Public Hearing Register'
  }
];

// Supplementary Online / Post-Hearing Citizen Review Records
export const CITIZEN_REVIEWS = [
  {
    submissionId: 'CIT-REV-001',
    citizenName: 'Kiritbhai Dahyabhai Patel',
    village: 'Petlad',
    familyId: 'FAM-014',
    ulpin: '24051234567899',
    surveyNo: '150/1',
    submissionType: 'Concern',
    comment: 'I was unable to speak during the afternoon session due to crowd rush. My banana plantation has standing crop ready for harvest in October 2026. Acquisition notice should grant 6 months harvest window.',
    evidenceFile: 'banana_plantation_khedut_passbook.pdf',
    submissionDate: '01/03/2026 09:20 AM',
    responseStatus: 'Included in SIA',
    reviewRemarks: 'Incorporated into Agriculture Section crop harvest timeline schedule.'
  },
  {
    submissionId: 'CIT-REV-002',
    citizenName: 'Alkeshbhai Shankarbhai Rohit',
    village: 'Demol',
    familyId: 'FAM-022',
    ulpin: '24051234567907',
    surveyNo: '152/2',
    submissionType: 'Comment',
    comment: 'Requesting confirmation that compensation DBT will be credited directly to Aadhaar-linked Bank of Baroda account without middleman commission.',
    evidenceFile: 'bank_passbook_copy.pdf',
    submissionDate: '02/03/2026 03:45 PM',
    responseStatus: 'Included in SIA',
    reviewRemarks: 'Direct Benefit Transfer (DBT) confirmed as standard NLAMS escrow procedure.'
  },
  {
    submissionId: 'CIT-REV-003',
    citizenName: 'Vikramsinh Natubhai Solanki',
    village: 'Sunav',
    familyId: 'N/A',
    ulpin: 'N/A',
    surveyNo: 'Adjacent Plot',
    submissionType: 'Concern',
    comment: 'The track vibration may crack the brick walls of adjacent primary school situated 40m from right of way.',
    evidenceFile: 'school_distance_sketch.jpg',
    submissionDate: '03/03/2026 11:10 AM',
    responseStatus: 'Under Review',
    reviewRemarks: 'Forwarded to Western Railway design cell for acoustic ballast and vibration damper review.'
  },
  {
    submissionId: 'CIT-REV-004',
    citizenName: 'Anonymous Resident',
    village: 'Nar',
    familyId: 'N/A',
    ulpin: 'N/A',
    surveyNo: 'N/A',
    submissionType: 'Comment',
    comment: 'Generic political complaint without reference to specific land holding or public asset.',
    evidenceFile: null,
    submissionDate: '03/03/2026 04:00 PM',
    responseStatus: 'Not Included',
    reviewRemarks: 'Not relevant to SIA scope under Section 5; does not pertain to affected family or parcel.'
  }
];

// Hearing Concern Tracker (Internal Structured Issue Tracker)
export const HEARING_CONCERN_ITEMS = [
  {
    issueId: 'HEAR-0045',
    title: 'Severance of Village Road & Agricultural Cart Tracks',
    citizenOrParticipant: 'Sarpanch Smt. Gitaben V. Patel & 60 Villagers',
    familyId: 'FAM-001, FAM-003, FAM-004',
    village: 'Sunav',
    ulpin: '24051234567892',
    surveyNo: '143 & Cart Track',
    category: 'Roads & Access',
    description: 'Track embankment will divide village from 180 hectares of farmland on western flank, causing 6 km detours for tractors and dairy milk cans.',
    evidenceFile: 'cart_track_severance_map.pdf',
    priority: 'Critical',
    siaResponse: 'Alternative access arrangement proposed: Railway to construct 2-lane Vehicular Underpass (VUP) at Ch. 13+400.',
    action: 'Provision integrated into SIMP Section 4.3; cost ₹2.10 Cr included in project DPR.',
    status: 'Addressed',
    // Data Linkage to SIA Masters (Traceability)
    linkedAssetId: 'COMM-002',
    linkedAssetType: 'Community Asset (Road Access)',
    source: 'Public Hearing (PART-009)'
  },
  {
    issueId: 'HEAR-0046',
    title: 'Disruption of Mahi Right Bank Canal Distributary #4',
    citizenOrParticipant: 'Farmers Irrigation Committee (Demol & Sunav)',
    familyId: 'FAM-005, FAM-007',
    village: 'Demol',
    ulpin: '24051234567894',
    surveyNo: '145',
    category: 'Water & Irrigation',
    description: 'Existing irrigation canal crossing acquisition corridor at Ch. 11+600. Construction might choke water flow to 350 acres of standing crop.',
    evidenceFile: 'canal_choke_inspection_photo.jpg',
    priority: 'Critical',
    siaResponse: 'Mandatory inverted concrete syphon culvert to be constructed prior to track laying during canal maintenance window.',
    action: 'Joint site visit memo signed with Irrigation Dept on 05/03/2026; SIMP water mitigation clause added.',
    status: 'Action Proposed',
    linkedAssetId: 'COMM-001',
    linkedAssetType: 'Community Water Infrastructure',
    source: 'Public Hearing (PART-010)'
  },
  {
    issueId: 'HEAR-0047',
    title: 'Relocation of Ward 4 Community Tubewell & GLSR Tank',
    citizenOrParticipant: 'Rameshwar Patel & Ward 4 Residents',
    familyId: 'FAM-001, FAM-002',
    village: 'Petlad',
    ulpin: '24051234567890',
    surveyNo: '142/A & 143',
    category: 'Drinking Water',
    description: 'Borewell providing drinking water to 320 households falls inside 45m ROW boundary.',
    evidenceFile: 'tubewell_glsr_site.jpg',
    priority: 'High',
    siaResponse: 'Municipality identified new location on adjacent municipal land 90m north; Western Railway to deposit relocation funds with GWRDC.',
    action: 'Escrow deposit of ₹35 Lakh allocated in SIMP Section 6.2; drilling to commence before notice under Section 11.',
    status: 'Action Proposed',
    linkedAssetId: 'COMM-001',
    linkedAssetType: 'Community Asset',
    source: 'Public Hearing (PART-001)'
  },
  {
    issueId: 'HEAR-0048',
    title: 'Rehabilitation of Landless Agricultural Labourers',
    citizenOrParticipant: 'Bhikhabhai Revabhai Vankar',
    familyId: 'FAM-004',
    village: 'Sunav',
    ulpin: '24051234567892',
    surveyNo: '143',
    category: 'Livelihood',
    description: '15 families working as tenant-cultivators and farm hands on acquired parcels have no registered land titles in RoR.',
    evidenceFile: 'labour_union_petition.pdf',
    priority: 'High',
    siaResponse: 'Second Schedule entitlements to be verified through Talati panchnama and wage receipts.',
    action: 'Enumeration completed in Census Section; ₹20,000 one-time resettlement allowance plus mandatory annuity scheduled.',
    status: 'Addressed',
    linkedAssetId: 'LIV-004',
    linkedAssetType: 'Livelihood Record',
    source: 'Public Hearing (PART-004)'
  },
  {
    issueId: 'HEAR-0049',
    title: 'Riverbank Muktidham Cremation Shed Preservation',
    citizenOrParticipant: 'Nar Village Elders Committee',
    familyId: 'FAM-005, FAM-006',
    village: 'Nar',
    ulpin: '24051234567893',
    surveyNo: '144/B',
    category: 'Religious / Cultural',
    description: 'Cremation ground boundary touches the track embankment slope; risk of construction debris falling on sanctified grounds.',
    evidenceFile: 'muktidham_distance_survey.pdf',
    priority: 'Medium',
    siaResponse: 'Railway civil drawings modified to add a 3.0m high reinforced masonry retaining barrier along boundary.',
    action: 'Engineering drawings revised by Vadodara Division; Gram Panchayat given written assurance.',
    status: 'Addressed',
    linkedAssetId: 'COMM-003',
    linkedAssetType: 'Community Cultural Asset',
    source: 'Public Hearing (PART-005)'
  },
  {
    issueId: 'HEAR-0050',
    title: 'Vibration & Dust Impact on Petlad Town Primary School #2',
    citizenOrParticipant: 'Vikramsinh Solanki (Online Citizen Submission)',
    familyId: 'N/A',
    village: 'Petlad',
    ulpin: '24051234567891',
    surveyNo: '142',
    category: 'Education & Environment',
    description: 'Concerns regarding heavy diesel freight train noise and particulate dust during earth filling.',
    evidenceFile: 'school_distance_sketch.jpg',
    priority: 'Low',
    siaResponse: 'Environmental acoustic barrier and tree green belt buffer incorporated into SIMP Section 8.',
    action: 'Forest Department social forestry scheme to plant 500 Neem and Ashoka saplings along boundary.',
    status: 'Open',
    linkedAssetId: 'ENV-002',
    linkedAssetType: 'Environmental Resource',
    source: 'Online Citizen Review (CIT-REV-003)'
  }
];

// Hearing Completion Checklist / Validation Matrix
export const HEARING_COMPLETION_VALIDATION = {
  noticeInformation: {
    status: 'Complete',
    details: 'Statutory 21-day notice published in Gujarati & English across local gazette, 5 panchayats, and digital portal.'
  },
  attendanceRecord: {
    status: 'Complete',
    details: '318 physical attendees registered with verified ID, phone, and sign-in sheets (exceeded 250 quorum).'
  },
  hearingRecord: {
    status: 'Complete',
    details: 'HD statutory video recording, photos, and high-fidelity audio tape archived with SHA-256 digital seals.'
  },
  minutes: {
    status: 'Complete',
    details: 'Comprehensive minutes prepared by GIDR, approved and signed by Presiding SDM Petlad.'
  },
  statementsAndObjections: {
    status: 'Complete',
    details: '5 major formal oral statements and 18 written representations logged with official responses.'
  },
  citizenReview: {
    status: 'Complete',
    details: 'Supplementary digital window concluded with 4 citizen submissions reviewed and adjudicated.'
  },
  concernReview: {
    status: 'Needs Review',
    details: '5 of 6 identified concerns addressed or action proposed; 1 low-priority environmental item open.'
  }
};
