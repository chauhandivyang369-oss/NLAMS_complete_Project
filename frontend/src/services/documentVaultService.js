/**
 * NLAMS - Document & Gazette Vault Service Layer (Abstracted API Client)
 * Compatible with future Node.js + Express backend, database, and storage.
 * 
 * Source-backed core categories:
 * 1. Form VI / VII Awards (Certified)
 * 2. E-Gazette Notifications (Section 11, Section 19)
 * 3. e-Signed Certificates (Form-I, DSC, Survey dockets)
 */

export const MOCK_VAULT_DOCUMENTS = [
  {
    documentId: 'DOC-00041',
    documentType: 'Form VI / VII Award',
    documentName: 'Certified Statutory Land Award Order under Section 23 & 26 (Package 3 - Rajpura Division)',
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    relatedStage: 'Section 23/26 Award Declaration',
    documentDate: '12 Sep 2026',
    status: 'Certified',
    fileSize: '6.8 MB',
    filePages: 28,
    fileFormat: 'PDF / A-1b (DSC Certified)',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Dr. Harvinder Singh, PCS',
      signerDesignation: 'Competent Authority Land Acquisition (CALA) / SDM Rajpura',
      signatureReference: 'DSC-CCA-GOI-2026-CALA-98124',
      verificationTime: '12 Sep 2026, 14:45:10 IST',
      certificateIssuer: 'e-Mudhra Sub-CA for National Informatics Centre (NIC)',
      validityPeriod: '2024-05-10 to 2027-05-09',
      integrityHash: 'SHA-256: 8f9b4c12d45a9018e62bc10298a002bc4501a9df'
    },
    archiveReference: 'ARCHIVE-REQ-041-AWARDS-VOL1.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'कार्यालय सक्षम प्राधिकारी एवं भूमि अर्जन अधिकारी / उपमंडल मजिस्ट्रेट',
      englishHeader: 'OFFICE OF THE COMPETENT AUTHORITY LAND ACQUISITION (CALA) / SDM',
      subHeading: 'STATUTORY LAND COMPENSATION AWARD UNDER SECTION 23 & 26 OF RFCTLARR ACT 2013',
      awardNumber: 'CALA/RJP/LA-AWARD/2026/041',
      legalNotice: 'Whereas the land described in the Schedule below has been notified under Section 19(1) of the Act for construction of the Delhi-Amritsar-Katra Expressway Corridor (Chainage 84.500 to 142.200), the undersigned, having completed summary enquiry under Section 23, hereby pronounces this Award in Form VII.',
      summaryStats: [
        { label: 'Total Survey Parcels (Khasra)', value: '142 Parcels' },
        { label: 'Total Extent Covered', value: '48.65 Hectares' },
        { label: 'Market Value Determined', value: '₹ 112.40 Crore' },
        { label: '100% Solatium (Sec 30(1))', value: '₹ 112.40 Crore' },
        { label: '12% Additional Interest (Sec 30(3))', value: '₹ 23.80 Crore' },
        { label: 'Total Compensation Awarded', value: '₹ 248.60 Crore' }
      ]
    },
    history: [
      { date: '12 Sep 2026, 14:45 IST', action: 'Award pronounced and certified by CALA Rajpura' },
      { date: '12 Sep 2026, 15:10 IST', action: 'Digital Signature cryptographically verified via CCA root' },
      { date: '13 Sep 2026, 09:30 IST', action: 'Archived into project statutory dossier ZIP' }
    ]
  },
  {
    documentId: 'DOC-00042',
    documentType: 'E-Gazette Notification',
    documentName: 'The Gazette of India: Extraordinary - Section 19(1) Declaration Notification',
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    relatedStage: 'Section 19(1) Declaration',
    documentDate: '10 Sep 2026',
    status: 'Published',
    fileSize: '4.8 MB',
    filePages: 42,
    fileFormat: 'PDF / Gazette Official',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Joint Secretary to the Government of India',
      signerDesignation: 'Ministry of Road Transport and Highways (MoRTH)',
      signatureReference: 'DSC-GOI-EGAZ-2026-904112',
      verificationTime: '10 Sep 2026, 19:20:00 IST',
      certificateIssuer: 'National Informatics Centre Certifying Authority (NIC-CA)',
      validityPeriod: '2023-01-01 to 2028-01-01',
      integrityHash: 'SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4'
    },
    archiveReference: 'ARCHIVE-REQ-041-GAZETTES.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'भारत का राजपत्र : असाधारण',
      englishHeader: 'The Gazette of India : Extraordinary',
      subHeading: 'PUBLISHED BY AUTHORITY / प्राधिकार से प्रकाशित',
      awardNumber: 'CG-DL-E-14082025-248901',
      legalNotice: 'S.O. 2489(E).— In exercise of the powers conferred by sub-section (1) of Section 19 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (30 of 2013), the Central Government hereby declares that the land specified in the Schedule annexed hereto is required for public purpose, namely, for construction of the Delhi-Amritsar-Katra Expressway corridor (Chainage 84.500 to 142.200)...',
      summaryStats: [
        { label: 'Gazette Part & Section', value: 'Part-II Section 3(ii)' },
        { label: 'Villages Gazetted', value: '24 Revenue Villages' },
        { label: 'Total Land Extent', value: '342.85 Hectares' },
        { label: 'Requisitioning Ministry', value: 'MoRTH (Govt of India)' }
      ]
    },
    history: [
      { date: '10 Sep 2026, 18:00 IST', action: 'Published by Directorate of Printing on eGazette Portal' },
      { date: '10 Sep 2026, 19:20 IST', action: 'Digital Signature & Gazette Watermark Verified' },
      { date: '11 Sep 2026, 10:00 IST', action: 'Synchronized into NLAMS Statutory Gazette Vault' }
    ]
  },
  {
    documentId: 'DOC-00043',
    documentType: 'e-Signed Certificate',
    documentName: 'Form-I Statutory Requisition Certificate & Authorized Undertaking under Section 3(u)',
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    relatedStage: 'Form-I Requisition Submission',
    documentDate: '09 Sep 2026',
    status: 'Signed',
    fileSize: '3.4 MB',
    filePages: 16,
    fileFormat: 'PDF / DSC Token Sealed',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Er. Rajeshwar Rao, IRSE',
      signerDesignation: 'General Manager (Land & Technical) / Project Director, NHAI',
      signatureReference: 'DSC-NIC-L3-TOKEN-99481A',
      verificationTime: '09 Sep 2026, 11:34:22 IST',
      certificateIssuer: 'NIC-CA Level-3 Hardware Token Assurance',
      validityPeriod: '2025-03-15 to 2028-03-14',
      integrityHash: 'SHA-256: 7a91bf901c900b21a81284d720b0891a2719ba12'
    },
    archiveReference: 'ARCHIVE-REQ-041-CERTIFICATES.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'भारतीय राष्ट्रीय राजमार्ग प्राधिकरण (सड़क परिवहन और राजमार्ग मंत्रालय)',
      englishHeader: 'NATIONAL HIGHWAYS AUTHORITY OF INDIA (MoRTH)',
      subHeading: 'CERTIFICATE OF REQUISITION UNDER SECTION 3(u) & STATUTORY UNDERTAKING',
      awardNumber: 'NHAI/PIU/PTL/2026/LA-FORM1/082',
      legalNotice: 'I, the undersigned Authorized Nodal Officer of the Requisitioning Body, hereby formally submit and certify Form-I along with geo-referenced vector alignment, ULPIN parcel register, and administrative sanction order RW/NH-12014/33/2024-PB, certifying that required funds have been allocated for deposit into the designated Escrow Account.',
      summaryStats: [
        { label: 'Requisitioning Entity', value: 'NHAI / MoRTH' },
        { label: 'Approved Outlay', value: '₹ 1,450.00 Crore' },
        { label: 'DSC Hardware Token', value: 'DSC-NIC-L3-99481A' },
        { label: 'Statutory Section', value: 'RFCTLARR Sec 3(u)' }
      ]
    },
    history: [
      { date: '09 Sep 2026, 11:30 IST', action: 'Form-I compiled and sealed with Level-3 DSC Hardware Token' },
      { date: '09 Sep 2026, 11:34 IST', action: 'Digital Signature & Statutory Undertaking Verified' }
    ]
  },
  {
    documentId: 'DOC-00044',
    documentType: 'Form VI / VII Award',
    documentName: 'Final Form VII Land & R&R Entitlement Award (Chainage 110.000 to 142.200)',
    projectId: 'REQ-2025-NHAI-041',
    projectName: 'Delhi-Amritsar-Katra Expressway (Pkg 3)',
    relatedStage: 'Section 31 R&R Award',
    documentDate: '05 Sep 2026',
    status: 'Certified',
    fileSize: '5.2 MB',
    filePages: 34,
    fileFormat: 'PDF / A-1b (DSC Certified)',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Shri Vikramaditya Sen, IAS',
      signerDesignation: 'Project Director & District Land Settlement Officer',
      signatureReference: 'DSC-CCA-GOI-2026-SETTLE-8819',
      verificationTime: '05 Sep 2026, 16:10:45 IST',
      certificateIssuer: 'e-Mudhra Sub-CA for NIC',
      validityPeriod: '2024-02-01 to 2027-01-31',
      integrityHash: 'SHA-256: 3b129a008f121e78a4b67c191a7884de65001192'
    },
    archiveReference: 'ARCHIVE-REQ-041-AWARDS-VOL1.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'पुनर्वासन और पुनर्व्यवस्थापन आयुक्त कार्यालय',
      englishHeader: 'OFFICE OF THE COMMISSIONER FOR REHABILITATION & RESETTLEMENT',
      subHeading: 'STATUTORY REHABILITATION & RESETTLEMENT AWARD UNDER SECTION 31 OF RFCTLARR ACT 2013',
      awardNumber: 'RNR-COMM/PB/AWARD-2026/019',
      legalNotice: 'In pursuance of Section 31 read with the Second Schedule of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, the R&R Award for 186 Displaced Families in Rajpura Tehsil is hereby formally sanctioned.',
      summaryStats: [
        { label: 'Project Affected Families (PAFs)', value: '412 Families' },
        { label: 'Displaced Families (PDFs)', value: '186 Families' },
        { label: 'Constructed Housing Allotment', value: '186 Resettlement Units' },
        { label: 'Subsistence Grant Allocation', value: '₹ 66.96 Lakh' }
      ]
    },
    history: [
      { date: '05 Sep 2026, 16:10 IST', action: 'R&R Award declared by Commissioner R&R' },
      { date: '06 Sep 2026, 10:00 IST', action: 'Archived into statutory repository' }
    ]
  },
  {
    documentId: 'DOC-00045',
    documentType: 'E-Gazette Notification',
    documentName: 'The Gazette of India: Section 11(1) Preliminary Notification & Corridor Boundaries',
    projectId: 'REQ-2025-DFCC-019',
    projectName: 'Eastern Dedicated Freight Corridor Multi-Modal Logistics Hub',
    relatedStage: 'Section 11(1) Preliminary Notification',
    documentDate: '21 Jan 2026',
    status: 'Published',
    fileSize: '5.9 MB',
    filePages: 36,
    fileFormat: 'PDF / Gazette Official',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Under Secretary (Infrastructure), Ministry of Railways',
      signerDesignation: 'Ministry of Railways (Railway Board)',
      signatureReference: 'DSC-MOR-EGAZ-2026-1104',
      verificationTime: '21 Jan 2026, 15:40:00 IST',
      certificateIssuer: 'NIC-CA Govt of India',
      validityPeriod: '2023-08-01 to 2028-07-31',
      integrityHash: 'SHA-256: c590a12e8490a0129bcfe1009148b8912301ca52'
    },
    archiveReference: 'ARCHIVE-DFCC-019-ALL-DOCS.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'भारत का राजपत्र : असाधारण',
      englishHeader: 'The Gazette of India : Extraordinary',
      subHeading: 'PUBLISHED BY AUTHORITY / प्राधिकार से प्रकाशित',
      awardNumber: 'CG-UP-E-21012026-904122',
      legalNotice: 'Whereas it appears to the Competent Government that land is likely to be needed in the District of Kanpur Dehat and Fatehpur for public purpose, namely, for Eastern Dedicated Freight Corridor Terminal...',
      summaryStats: [
        { label: 'Gazette Number', value: 'CG-UP-E-21012026-904122' },
        { label: 'Districts Included', value: 'Kanpur Dehat, Fatehpur' },
        { label: 'Total Land Extent', value: '184.20 Hectares' },
        { label: 'Statutory Stage', value: 'Section 11(1)' }
      ]
    },
    history: [
      { date: '21 Jan 2026, 15:40 IST', action: 'Published and validated on e-Gazette repository' }
    ]
  },
  {
    documentId: 'DOC-00046',
    documentType: 'e-Signed Certificate',
    documentName: 'Joint Measurement Survey (JMS) Verified Cadastral Field Docket & RoR Validation',
    projectId: 'REQ-2025-DFCC-019',
    projectName: 'Eastern Dedicated Freight Corridor Multi-Modal Logistics Hub',
    relatedStage: 'Cadastral & Ground Survey',
    documentDate: '18 Jan 2026',
    status: 'Signed',
    fileSize: '14.2 MB',
    filePages: 58,
    fileFormat: 'PDF / GeoTIFF Docket',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Tehsildar Akbarpur & Project Manager DFCCIL',
      signerDesignation: 'Revenue Department Uttar Pradesh & DFCCIL',
      signatureReference: 'DSC-JMS-UP-2026-8812',
      verificationTime: '18 Jan 2026, 12:15:00 IST',
      certificateIssuer: 'NIC-CA Level-2 Survey Authority',
      validityPeriod: '2024-01-01 to 2027-01-01',
      integrityHash: 'SHA-256: 44109b821a0091ef7c0019283ba8912300bca819'
    },
    archiveReference: 'ARCHIVE-DFCC-019-SURVEYS.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'राजस्व विभाग, उत्तर प्रदेश शासन',
      englishHeader: 'DEPARTMENT OF REVENUE, GOVERNMENT OF UTTAR PRADESH',
      subHeading: 'JOINT MEASUREMENT SURVEY (JMS) VERIFICATION CERTIFICATE & FIELD DOCKET',
      awardNumber: 'JMS-EDFC-PILOT-8-REV-02',
      legalNotice: 'Certified that joint cadastral ground survey and boundary pegging for 14 revenue villages in Akbarpur and Bindki tehsils have been conducted jointly by Revenue Patwaris and Railway Survey Engineers.',
      summaryStats: [
        { label: 'Parcels Surveyed', value: '680 Survey Numbers' },
        { label: 'Area Reconciled', value: '184.20 Ha (100% matched)' },
        { label: 'Geo-reference Status', value: 'PostGIS Cadastral Layer Synced' }
      ]
    },
    history: [
      { date: '18 Jan 2026, 12:15 IST', action: 'Joint signature affixed by Tehsildar and Project Manager' }
    ]
  },
  {
    documentId: 'DOC-00047',
    documentType: 'Form VI / VII Award',
    documentName: 'Certified Possession Handover Certificate & Final Award Concluded under Section 38',
    projectId: 'REQ-2024-SECI-082',
    projectName: 'Rewa Ultra Mega Solar Park Phase-II',
    relatedStage: 'Section 38 Possession Handover',
    documentDate: '15 Aug 2026',
    status: 'Certified',
    fileSize: '4.1 MB',
    filePages: 14,
    fileFormat: 'PDF / DSC Certified',
    signatureStatus: 'Verified',
    signatureDetails: {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Collector & District Magistrate, Rewa',
      signerDesignation: 'Appropriate Government Authority, Madhya Pradesh',
      signatureReference: 'DSC-MP-GOV-DM-REWA-9012',
      verificationTime: '15 Aug 2026, 11:00:00 IST',
      certificateIssuer: 'NIC-CA State Administration',
      validityPeriod: '2024-01-01 to 2027-01-01',
      integrityHash: 'SHA-256: 9912048bca10928e183749021983ba019283741a'
    },
    archiveReference: 'ARCHIVE-SECI-082-COMPLETE.zip',
    archiveStatus: 'Archive Available',
    contentPreview: {
      hindiHeader: 'कार्यालय कलेक्टर एवं जिला दंडाधिकारी, जिला रीवा (म.प्र.)',
      englishHeader: 'OFFICE OF THE COLLECTOR & DISTRICT MAGISTRATE, REWA (M.P.)',
      subHeading: 'CERTIFICATE OF LAND POSSESSION HANDOVER UNDER SECTION 38 OF RFCTLARR ACT 2013',
      awardNumber: 'COLL/REWA/LA-SEC38/2026/102',
      legalNotice: 'All compensation monies having been fully deposited in escrow and disbursed into beneficiary Aadhaar-seeded accounts via DBT under Section 77, peaceful possession of 98.40 Hectares is hereby handed over to SECI free from all encumbrances.',
      summaryStats: [
        { label: 'Total Land Handed Over', value: '98.40 Hectares' },
        { label: 'Beneficiaries Paid', value: '412 Beneficiaries' },
        { label: 'Total Disbursed', value: '₹ 138.90 Crore' },
        { label: 'Encumbrance Status', value: 'Free of All Encumbrances' }
      ]
    },
    history: [
      { date: '15 Aug 2026, 11:00 IST', action: 'Possession certificate executed by Collector Rewa' },
      { date: '16 Aug 2026, 14:00 IST', action: 'Permanent archive sealed in central repository' }
    ]
  }
];

// Conceptual API Service Interface for future Axios / Express / Storage integration
export const DocumentVaultService = {
  async getDocuments(filterParams = {}) {
    return Promise.resolve(MOCK_VAULT_DOCUMENTS);
  },

  async getDocumentDetails(documentId) {
    const doc = MOCK_VAULT_DOCUMENTS.find(d => d.documentId === documentId) || MOCK_VAULT_DOCUMENTS[0];
    return Promise.resolve(doc);
  },

  async verifyDigitalSignature(documentId) {
    const doc = MOCK_VAULT_DOCUMENTS.find(d => d.documentId === documentId);
    return Promise.resolve(doc?.signatureDetails || {
      isVerified: true,
      statusLabel: 'Signature Verified',
      signerName: 'Authorized Signatory',
      signerDesignation: 'Competent Authority',
      signatureReference: 'DSC-VERIFIED-DEMO',
      verificationTime: new Date().toLocaleString('en-IN') + ' IST'
    });
  },

  async getArchiveStatus(projectId) {
    return Promise.resolve({
      status: 'Archive Available',
      fileName: `NLAMS-${projectId || 'Corridor'}-Statutory-Archive.zip`,
      fileSize: '34.2 MB',
      totalDocuments: 7,
      lastGenerated: '14 Sep 2026, 18:30 IST'
    });
  }
};
