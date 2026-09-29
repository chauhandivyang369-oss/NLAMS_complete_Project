// Configuration for Statutory Timers and RFCTLARR Act 2013 Rules
export const STATUTORY_RULES_CONFIG = {
  section15: {
    section: 'Section 15(1)',
    act: 'RFCTLARR Act, 2013',
    title: 'Objections to Preliminary Notification',
    statutoryDurationDays: 60,
    authority: 'District Collector / CALA',
    description: 'Any person interested in any land which has been notified under sub-section (1) of section 11 may within sixty days from the date of publication of the preliminary notification object to the acquisition.'
  },
  section21: {
    section: 'Section 21(2)',
    act: 'RFCTLARR Act, 2013',
    title: 'Public Notice Inviting Claims',
    statutoryDurationDays: 30,
    authority: 'District Collector',
    description: 'Public notice requiring all persons interested in the land to appear personally or by agent before the Collector to state the nature of their respective interests and the amount and particulars of their claims to compensation.'
  },
  section25: {
    section: 'Section 25',
    act: 'RFCTLARR Act, 2013',
    title: 'Period within which Award shall be made',
    statutoryDurationDays: 365,
    authority: 'District Collector',
    description: 'The Collector shall make an award within a period of twelve months from the date of publication of the declaration under section 19.'
  },
  section64: {
    section: 'Section 64(2)',
    act: 'RFCTLARR Act, 2013',
    title: 'Reference to LARR Authority',
    statutoryDurationDays: 42,
    authority: 'Land Acquisition, Rehabilitation & Resettlement Authority',
    description: 'Reference application to the Collector requiring that the matter be referred by the Collector for the determination of the Authority within six weeks of award or receipt of notice.'
  }
};

export const DEMO_CITIZENS = {
  citizenA: {
    id: 'CITIZEN-001',
    name: 'Rameshchandra Mohanlal Patel',
    maskedMobile: '+91 98*** **421',
    fullMobile: '+91 98790 44421',
    email: 'r.patel.landowner@demo.nic.in',
    aadhaarMasked: 'XXXX-XXXX-7721',
    aadhaarStatus: 'VERIFIED',
    aadhaarVid: '9182-XXXX-7721',
    panMasked: 'ABC*****7F',
    bankAccountMasked: '*******7829',
    bankName: 'Bank of Baroda',
    bankBranch: 'Petlad Branch (IFSC: BARB0PETLAD)',
    address: 'Survey 142, Village Petlad Rural, Taluka Petlad, District Anand, Gujarat - 388450',
    preferredLanguage: 'English',
    linkedProjectIds: ['NLAMS-2026-NHAI-0089', 'NLAMS-2025-DFCCIL-0042'],
    linkedParcels: [
      {
        ulpin: '24051234567890',
        surveyNo: '142/1',
        projectId: 'NLAMS-2026-NHAI-0089',
        village: 'Petlad Rural',
        taluka: 'Petlad',
        district: 'Anand',
        state: 'Gujarat',
        khataNo: 'KH-412/A',
        totalAreaHa: 1.80,
        proposedAreaHa: 1.10,
        remainingAreaHa: 0.70,
        classification: 'Irrigated Multi-Crop',
        ownershipType: 'Khatedar (Individual Title)',
        sroStatus: 'ACTIVE_FREEZE',
        sroSection: 'Section 11(4)',
        freezeDate: '12/08/2026',
        rorStatus: 'VERIFIED_DILRMP',
        coordinates: [
          [22.5398, 72.9288],
          [22.5412, 72.9305],
          [22.5401, 72.9322],
          [22.5385, 72.9302]
        ]
      },
      {
        ulpin: '24051234567891',
        surveyNo: '142/2',
        projectId: 'NLAMS-2026-NHAI-0089',
        village: 'Petlad Rural',
        taluka: 'Petlad',
        district: 'Anand',
        state: 'Gujarat',
        khataNo: 'KH-412/B',
        totalAreaHa: 2.00,
        proposedAreaHa: 1.04,
        remainingAreaHa: 0.96,
        classification: 'Irrigated Multi-Crop',
        ownershipType: 'Joint Khatedar (Share: 50%)',
        sroStatus: 'ACTIVE_FREEZE',
        sroSection: 'Section 11(4)',
        freezeDate: '12/08/2026',
        rorStatus: 'VERIFIED_DILRMP',
        coordinates: [
          [22.5401, 72.9322],
          [22.5415, 72.9340],
          [22.5399, 72.9355],
          [22.5386, 72.9338]
        ]
      },
      {
        ulpin: '24051234567892',
        surveyNo: '88/4',
        projectId: 'NLAMS-2025-DFCCIL-0042',
        village: 'Sanand Rural',
        taluka: 'Sanand',
        district: 'Ahmedabad',
        state: 'Gujarat',
        khataNo: 'KH-198',
        totalAreaHa: 0.85,
        proposedAreaHa: 0.85,
        remainingAreaHa: 0.00,
        classification: 'Agricultural (Single-Crop)',
        ownershipType: 'Sole Proprietor',
        sroStatus: 'POSSESSION_TRANSFERRED',
        sroSection: 'Section 38',
        freezeDate: '15/01/2025',
        rorStatus: 'MUTATION_REGISTERED',
        coordinates: [
          [22.9868, 72.3812],
          [22.9882, 72.3828],
          [22.9870, 72.3845],
          [22.9855, 72.3829]
        ]
      }
    ]
  },
  citizenB: {
    id: 'CITIZEN-002',
    name: 'Smt. Sunita Devi Sharma',
    maskedMobile: '+91 94*** **810',
    fullMobile: '+91 94280 11810',
    email: 'sunita.sharma@demo.nic.in',
    aadhaarMasked: 'XXXX-XXXX-4410',
    aadhaarStatus: 'VERIFIED',
    aadhaarVid: '8219-XXXX-4410',
    panMasked: 'DEF*****9K',
    bankAccountMasked: '*******5102',
    bankName: 'State Bank of India',
    bankBranch: 'Hansot Branch (IFSC: SBIN0001824)',
    address: 'Village Hansot, Taluka Hansot, District Bharuch, Gujarat - 393030',
    preferredLanguage: 'Hindi',
    linkedProjectIds: ['NLAMS-2026-NTPC-0112'],
    linkedParcels: [
      {
        ulpin: '24051234567893',
        surveyNo: '204/1',
        projectId: 'NLAMS-2026-NTPC-0112',
        village: 'Hansot',
        taluka: 'Hansot',
        district: 'Bharuch',
        state: 'Gujarat',
        khataNo: 'KH-77',
        totalAreaHa: 1.50,
        proposedAreaHa: 1.20,
        remainingAreaHa: 0.30,
        classification: 'Unirrigated Agricultural',
        ownershipType: 'Sole Khatedar',
        sroStatus: 'SIA_NOTIFICATION_ACTIVE',
        sroSection: 'Section 4',
        freezeDate: '10/06/2026',
        rorStatus: 'VERIFIED_DILRMP',
        coordinates: [
          [21.5830, 72.8020],
          [21.5845, 72.8040],
          [21.5835, 72.8060],
          [21.5818, 72.8040]
        ]
      }
    ]
  }
};

export const MOCK_PROJECTS = [
  {
    id: 'NLAMS-2026-NHAI-0089',
    code: 'NHAI-EXP-2026',
    name: 'Vadodara-Mumbai Expressway Phase-II (Anand-Kheda Bypass Alignment)',
    requiringBody: 'National Highways Authority of India (NHAI), MoRTH',
    state: 'Gujarat',
    districts: ['Anand', 'Kheda'],
    villagesAffected: 14,
    totalLandHa: 324.50,
    totalParcelsCount: 1842,
    currentStage: 'SECTION_15_OBJECTIONS',
    currentStageName: 'Section 15 Statutory Objections & Hearing',
    progressPercent: 45,
    pendingAction: 'Section 15 objection window closes in 42 days (File written submission)',
    nextEvent: 'District Collector Public Hearing on Objections: 18 Oct 2026 at Prant Office, Anand',
    lastUpdated: '24-09-2026 10:30 IST',
    authorityInCharge: 'Office of the District Collector & CALA, Anand',
    statutoryTimers: [
      {
        id: 'TMR-SEC15-001',
        section: 'Section 15(1)',
        title: 'Statutory Objection Filing Window',
        openedDate: '12/08/2026',
        closesDate: '11/10/2026',
        totalDays: 60,
        remainingDays: 42,
        progress: 30,
        status: 'ACTIVE',
        authority: 'District Collector & CALA Anand'
      }
    ],
    lifecycleStages: [
      { id: 'form1', label: 'Form-I Requisition', status: 'COMPLETED', date: '15/02/2026', authority: 'NHAI / MoRTH', doc: 'Form-I Dossier' },
      { id: 'sia', label: 'Section 4 SIA Launch', status: 'COMPLETED', date: '10/03/2026', authority: 'Appropriate Govt (Revenue Dept)', doc: 'Sec 4 Gazette Notification' },
      { id: 'ieg', label: 'IEG Evaluation & SIMP', status: 'COMPLETED', date: '28/05/2026', authority: 'Independent Expert Group', doc: 'IEG Appraisal Report' },
      { id: 'sec11', label: 'Section 11 Preliminary Notification', status: 'COMPLETED', date: '12/08/2026', authority: 'Govt Gazette (E-Gazette)', doc: 'E-Gazette No. 492' },
      { id: 'sec15', label: 'Section 15 Objections', status: 'CURRENT', date: '12/08/2026 - 11/10/2026', authority: 'District Collector & CALA', doc: 'Public Notice Form-III' },
      { id: 'sec12_13', label: 'Section 12/13 Survey & Valuation', status: 'UPCOMING', date: 'Expected Nov 2026', authority: 'SLAO Anand Field Team', doc: null },
      { id: 'rnr', label: 'Draft R&R Scheme (Form-V)', status: 'UPCOMING', date: 'Expected Dec 2026', authority: 'R&R Administrator', doc: null },
      { id: 'sec19', label: 'Section 19 Declaration', status: 'UPCOMING', date: 'Expected Jan 2027', authority: 'Appropriate Government', doc: null },
      { id: 'sec21_22', label: 'Section 21/22 Claims Notice', status: 'UPCOMING', date: 'Expected Feb 2027', authority: 'Collector / CALA', doc: null },
      { id: 'award', label: 'Form-VI Statutory Award', status: 'UPCOMING', date: 'Expected Mar 2027', authority: 'Collector / CALA', doc: null },
      { id: 'dbt', label: 'PFMS DBT Disbursement', status: 'UPCOMING', date: 'Expected Apr 2027', authority: 'PFMS / Treasury', doc: null },
      { id: 'possession', label: 'Section 38 Physical Possession', status: 'UPCOMING', date: 'Expected May 2027', authority: 'CALA / NHAI', doc: null }
    ]
  },
  {
    id: 'NLAMS-2025-DFCCIL-0042',
    code: 'DFCCIL-WDFC-2025',
    name: 'Western Dedicated Freight Corridor (Sanand-Viramgam Railway Spur)',
    requiringBody: 'Dedicated Freight Corridor Corporation of India (DFCCIL), Ministry of Railways',
    state: 'Gujarat',
    districts: ['Ahmedabad'],
    villagesAffected: 6,
    totalLandHa: 142.10,
    totalParcelsCount: 680,
    currentStage: 'AWARD_PASSED_DBT',
    currentStageName: 'Form-VI Award & PFMS DBT Disbursement',
    progressPercent: 88,
    pendingAction: 'Verify PFMS Bank Account Credit of Solatium and Download Digitally Signed Form-VI Award',
    nextEvent: 'Joint Possession Handing-Over Verification: 05 Nov 2026',
    lastUpdated: '22-09-2026 16:45 IST',
    authorityInCharge: 'Office of the District Magistrate & CALA, Ahmedabad',
    statutoryTimers: [
      {
        id: 'TMR-SEC64-002',
        section: 'Section 64',
        title: 'Tribunal Reference Application Window',
        openedDate: '10/09/2026',
        closesDate: '22/10/2026',
        totalDays: 42,
        remainingDays: 28,
        progress: 33,
        status: 'ACTIVE',
        authority: 'Collector Ahmedabad'
      }
    ],
    lifecycleStages: [
      { id: 'form1', label: 'Form-I Requisition', status: 'COMPLETED', date: '10/01/2025', authority: 'DFCCIL / Railways', doc: 'Form-I Proposal' },
      { id: 'sia', label: 'Section 4 SIA Launch', status: 'COMPLETED', date: '15/03/2025', authority: 'Revenue Dept Gujarat', doc: 'Sec 4 Gazette Notification' },
      { id: 'ieg', label: 'IEG Evaluation & SIMP', status: 'COMPLETED', date: '20/06/2025', authority: 'IEG Committee', doc: 'SIMP Document' },
      { id: 'sec11', label: 'Section 11 Preliminary Notification', status: 'COMPLETED', date: '14/08/2025', authority: 'Govt E-Gazette', doc: 'Gazette 219' },
      { id: 'sec15', label: 'Section 15 Objections', status: 'COMPLETED', date: '15/10/2025', authority: 'District Collector Ahmedabad', doc: 'Sec 15 Hearing Minutes' },
      { id: 'sec12_13', label: 'Section 12/13 Survey & Valuation', status: 'COMPLETED', date: '05/12/2025', authority: 'SLAO Ahmedabad', doc: 'Spot Damage Form' },
      { id: 'rnr', label: 'Draft R&R Scheme (Form-V)', status: 'COMPLETED', date: '18/01/2026', authority: 'R&R Administrator', doc: 'Approved R&R Scheme' },
      { id: 'sec19', label: 'Section 19 Declaration', status: 'COMPLETED', date: '12/03/2026', authority: 'Appropriate Government', doc: 'Sec 19 Declaration No. 881' },
      { id: 'sec21_22', label: 'Section 21/22 Claims Notice', status: 'COMPLETED', date: '10/05/2026', authority: 'Collector Ahmedabad', doc: 'Public Claims Register' },
      { id: 'award', label: 'Form-VI Statutory Award', status: 'COMPLETED', date: '10/09/2026', authority: 'Collector Ahmedabad', doc: 'Form-VI Award Doc' },
      { id: 'dbt', label: 'PFMS DBT Disbursement', status: 'CURRENT', date: '18/09/2026', authority: 'PFMS / Treasury', doc: 'PFMS Transaction Ledger' },
      { id: 'possession', label: 'Section 38 Physical Possession', status: 'UPCOMING', date: '05/11/2026', authority: 'CALA / DFCCIL', doc: null }
    ]
  },
  {
    id: 'NLAMS-2026-NTPC-0112',
    code: 'NTPC-SOLAR-2026',
    name: 'Green Energy Ultra-Mega Solar Power & Transmission Substation Project',
    requiringBody: 'NTPC Renewable Energy Ltd / Ministry of Power',
    state: 'Gujarat',
    districts: ['Bharuch'],
    villagesAffected: 8,
    totalLandHa: 510.00,
    totalParcelsCount: 940,
    currentStage: 'SIA_PUBLIC_HEARING',
    currentStageName: 'Social Impact Assessment & Gram Sabha Public Hearing',
    progressPercent: 25,
    pendingAction: 'RSVP for SIA Public Hearing on 15 Oct 2026 & Submit Pre-Hearing Representation',
    nextEvent: 'SIA Gram Sabha Public Hearing at Hansot Panchayat Hall: 15 Oct 2026 at 10:30 AM',
    lastUpdated: '23-09-2026 14:15 IST',
    authorityInCharge: 'Office of District Collector, Bharuch & SIA Unit',
    statutoryTimers: [],
    lifecycleStages: [
      { id: 'form1', label: 'Form-I Requisition', status: 'COMPLETED', date: '12/04/2026', authority: 'NTPC Renewable Ltd', doc: 'Form-I Dossier' },
      { id: 'sia', label: 'Section 4 SIA Launch', status: 'CURRENT', date: '10/06/2026', authority: 'State Govt (Revenue Dept)', doc: 'Sec 4 Notification No. 104' },
      { id: 'ieg', label: 'IEG Evaluation & SIMP', status: 'UPCOMING', date: 'Nov 2026', authority: 'Independent Expert Group', doc: null },
      { id: 'sec11', label: 'Section 11 Preliminary Notification', status: 'UPCOMING', date: 'Dec 2026', authority: 'Govt E-Gazette', doc: null },
      { id: 'sec15', label: 'Section 15 Objections', status: 'UPCOMING', date: 'Jan 2027', authority: 'Collector Bharuch', doc: null },
      { id: 'sec12_13', label: 'Section 12/13 Survey & Valuation', status: 'UPCOMING', date: 'Feb 2027', authority: 'SLAO Bharuch', doc: null },
      { id: 'rnr', label: 'Draft R&R Scheme (Form-V)', status: 'UPCOMING', date: 'Mar 2027', authority: 'R&R Authority', doc: null },
      { id: 'sec19', label: 'Section 19 Declaration', status: 'UPCOMING', date: 'Apr 2027', authority: 'Appropriate Government', doc: null },
      { id: 'sec21_22', label: 'Section 21/22 Claims Notice', status: 'UPCOMING', date: 'May 2027', authority: 'Collector Bharuch', doc: null },
      { id: 'award', label: 'Form-VI Statutory Award', status: 'UPCOMING', date: 'Jun 2027', authority: 'Collector Bharuch', doc: null },
      { id: 'dbt', label: 'PFMS DBT Disbursement', status: 'UPCOMING', date: 'Jul 2027', authority: 'Treasury / PFMS', doc: null },
      { id: 'possession', label: 'Section 38 Physical Possession', status: 'UPCOMING', date: 'Aug 2027', authority: 'CALA / NTPC', doc: null }
    ]
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    projectId: 'NLAMS-2026-NHAI-0089',
    type: 'SECTION_11_PRELIMINARY',
    section: 'Section 11(1)',
    gazetteNo: 'E-Gazette Part-II Sec-3(ii) No. 492',
    notificationNo: 'REV/LAQ/NHAI/2026/492',
    issuingAuthority: 'Revenue Department, Government of Gujarat',
    publishedDate: '12/08/2026',
    title: 'Preliminary Notification under Section 11(1) of RFCTLARR Act 2013 for NHAI Expressway Alignment',
    summary: 'Preliminary declaration notifying acquisition of land in 14 villages of Petlad & Borsad Talukas, Anand District. Section 11(4) transaction bar is activated.',
    language: 'English / Gujarati',
    qrVerified: true,
    fileSize: '2.4 MB',
    pdfUrl: '#',
    isUnread: false
  },
  {
    id: 'NOTIF-002',
    projectId: 'NLAMS-2026-NHAI-0089',
    type: 'SECTION_15_HEARING_NOTICE',
    section: 'Section 15(2)',
    gazetteNo: 'Collector Public Notice No. 89/2026',
    notificationNo: 'COLL/LAQ/PETLAD/SEC15/089',
    issuingAuthority: 'Office of the District Collector & CALA, Anand',
    publishedDate: '15/09/2026',
    title: 'Notice for Public Hearing on Written Objections filed under Section 15(1)',
    summary: 'All landholders and interested persons who have submitted objections are hereby summoned for statutory inquiry and oral hearing before the CALA on 18 Oct 2026.',
    language: 'Gujarati / English',
    qrVerified: true,
    fileSize: '1.1 MB',
    pdfUrl: '#',
    isUnread: true
  },
  {
    id: 'NOTIF-003',
    projectId: 'NLAMS-2026-NHAI-0089',
    type: 'SIA_COMMENCEMENT',
    section: 'Section 4(1)',
    gazetteNo: 'E-Gazette Extraordinary No. 182',
    notificationNo: 'SIA/EXP/2026/0182',
    issuingAuthority: 'Appropriate Government (Revenue Dept)',
    publishedDate: '10/03/2026',
    title: 'Notification for Commencement of Social Impact Assessment under Section 4',
    summary: 'Authorizing Center for Social Impact & Rural Research to conduct mandatory SIA study and prepare Social Impact Management Plan (SIMP).',
    language: 'English',
    qrVerified: true,
    fileSize: '1.8 MB',
    pdfUrl: '#',
    isUnread: false
  },
  {
    id: 'NOTIF-004',
    projectId: 'NLAMS-2025-DFCCIL-0042',
    type: 'SECTION_19_DECLARATION',
    section: 'Section 19(1)',
    gazetteNo: 'E-Gazette Official No. 881',
    notificationNo: 'REV/DFCCIL/DEC/2026/881',
    issuingAuthority: 'Appropriate Government (State Revenue Dept)',
    publishedDate: '12/03/2026',
    title: 'Declaration under Section 19(1) of RFCTLARR Act 2013 for Railway Corridor',
    summary: 'Final declaration of public purpose and statutory declaration that identified land parcels in Sanand Rural are required for public purpose.',
    language: 'English / Gujarati',
    qrVerified: true,
    fileSize: '3.1 MB',
    pdfUrl: '#',
    isUnread: false
  },
  {
    id: 'NOTIF-005',
    projectId: 'NLAMS-2025-DFCCIL-0042',
    type: 'AWARD_FORM_VI',
    section: 'Section 23 / 30',
    gazetteNo: 'Collector Award Proceeding No. 42/2026',
    notificationNo: 'CALA/AHD/AWD/2026/042',
    issuingAuthority: 'District Magistrate & CALA, Ahmedabad',
    publishedDate: '10/09/2026',
    title: 'Form-VI Statutory Land Acquisition Award under Section 23 of RFCTLARR Act 2013',
    summary: 'Final Award determining true market value, 1.50x rural multiplication factor, 100% solatium and 12% statutory additional interest under Section 30.',
    language: 'English',
    qrVerified: true,
    fileSize: '4.2 MB',
    pdfUrl: '#',
    isUnread: true
  }
];

export const MOCK_OBJECTIONS = [
  {
    id: 'OBJ-2026-ANAND-00124',
    projectId: 'NLAMS-2026-NHAI-0089',
    ulpin: '24051234567890',
    surveyNo: '142/1',
    applicantName: 'Rameshchandra Mohanlal Patel',
    mobile: '+91 98790 44421',
    email: 'r.patel.landowner@demo.nic.in',
    submissionDate: '20-08-2026 11:24 IST',
    grounds: [
      'Multi-Crop Protection Concern (Section 10)',
      'Feasible Alternate Land Available (Govt Gamtal Wasteland adjacent)',
      'Severe Severance of Remaining 0.70 Ha holding making farming unviable'
    ],
    detailedStatement: 'The acquisition of 1.10 Ha out of Survey 142/1 cuts diagonally across the prime perennial canal-irrigated plot, leaving a narrow wedge of 0.70 Ha with severed water channel access. There is an adjacent unutilized Government Gamtal wasteland (Survey 141) that can easily accommodate the highway alignment curve with minimal farmer displacement.',
    attachedDocuments: [
      { name: 'RoR_7_12_Extract_DigitallySigned.pdf', size: '1.2 MB', verified: true },
      { name: 'Canal_Water_Passbook_IrrigationDept.pdf', size: '890 KB', verified: true },
      { name: 'Ground_Severance_Topography_Photo.jpg', size: '2.4 MB', verified: true }
    ],
    status: 'HEARING_SCHEDULED',
    statusBadge: 'Hearing Scheduled (18 Oct 2026)',
    currentStep: 4,
    timeline: [
      { step: 1, title: 'Objection Submitted Online', date: '20-08-2026 11:24 IST', authority: 'Citizen Portal', remarks: 'Acknowledgement Receipt OBJ-2026-ANAND-00124 generated' },
      { step: 2, title: 'Received & Registered in CALA Registry', date: '22-08-2026 10:15 IST', authority: 'Office of District Collector, Anand', remarks: 'Entered in Statutory Sec 15 Register' },
      { step: 3, title: 'LAO & Revenue Circle Scrutiny', date: '04-09-2026 15:30 IST', authority: 'Special Land Acquisition Officer (SLAO), Petlad', remarks: 'Field verification recommended for severance claim' },
      { step: 4, title: 'Summons Issued for Public Hearing', date: '15-09-2026 09:00 IST', authority: 'District Magistrate / CALA Anand', remarks: 'Hearing scheduled on 18-10-2026 at 11:00 AM in Prant Office, Anand' },
      { step: 5, title: 'Collector Recommendation / Final Order', date: 'Pending Hearing', authority: 'District Collector Anand', remarks: 'Order under Section 15(2) to be passed post hearing' }
    ]
  }
];

export const MOCK_SURVEY_VALUATION = {
  projectId: 'NLAMS-2026-NHAI-0089',
  ulpin: '24051234567890',
  surveyNo: '142/1',
  fieldEntryNotice: {
    noticeNo: 'SLAO/PETLAD/SEC12/2026/041',
    issuedDate: '15/07/2026',
    surveyDate: '24/07/2026 09:30 IST',
    surveyorName: 'Shri D.K. Varma (Survey Inspector)',
    officialId: 'SURV-GUJ-7712',
    authorizedActivities: [
      'Boundary Pegging & DGPS Staking',
      'Geotagged Level Cross-Section Measurement',
      'Standing Crop & Timber Enumeration',
      'Irrigation Borewell & Electrical Cable Demarcation'
    ]
  },
  fieldActivityLog: [
    {
      date: '24/07/2026 10:15 IST',
      activity: 'Ground DGPS Survey Completed',
      coordinatesRecorded: '12 Geotagged control points locked with RTK GNSS receiver',
      evidencePhotos: ['field_peg_142_1.jpg', 'canal_culvert_marking.jpg'],
      status: 'VERIFIED'
    }
  ],
  section13DamageValuation: {
    assessedDate: '30/07/2026',
    assessingOfficer: 'District Agricultural Officer & SLAO Valuer',
    items: [
      { id: 1, type: 'Standing Cotton Crop', description: '0.45 Ha irrigated hybrid cotton at flowering stage', quantity: '0.45 Ha', unitRate: '₹ 42,000 / Ha', amount: 18900, status: 'TENDERED' },
      { id: 2, type: 'Horticulture Fruit Trees', description: '8 mature Kesar Mango trees & 6 Teak trees along bund', quantity: '14 Trees', unitRate: '₹ 6,000 / Tree avg', amount: 84000, status: 'TENDERED' },
      { id: 3, type: 'Boundary Fencing & Stone Bund', description: 'Barbed wire with reinforced stone pillars along northern edge', quantity: '210 Meters', unitRate: '₹ 350 / Meter', amount: 73500, status: 'TENDERED' },
      { id: 4, type: 'Irrigation Borewell & Pump Cabin', description: 'Submersible 7.5 HP motor with RCC enclosure & HDPE pipeline', quantity: '1 Unit', unitRate: 'Itemized valuation', amount: 125000, status: 'TENDERED' }
    ],
    totalDamageAmount: 301400,
    tenderStatus: 'SPOT_TENDERED_TO_BANK',
    tenderDate: '05/08/2026',
    tenderUTR: 'RBI050826991044',
    receiptDoc: 'Sec13_Damage_Tender_Receipt.pdf'
  }
};

export const MOCK_COMPENSATION_CALCULATION = {
  projectId: 'NLAMS-2025-DFCCIL-0042',
  ulpin: '24051234567892',
  surveyNo: '88/4',
  khataNo: 'KH-198',
  village: 'Sanand Rural',
  areaAcquiredHa: 0.85,
  ruleVersion: 'RFCTLARR Act 2013 First Schedule (Gujarat Rules 2017)',
  effectiveDate: '01/01/2025',
  breakdown: {
    baseMarketValuePerHa: 5294117.65, // Rate derived from circle rate & 3-yr sale average
    totalBaseMarketValue: 4500000, // For 0.85 Ha
    multiplicationFactor: 1.50, // Rural Area Factor (1.0 to 2.0 based on distance from urban area)
    marketValueAfterMultiplier: 6750000,
    assetsValuation: {
      structures: 250000, // Pump shed
      trees: 180000, // Nilgiri / Neem trees
      otherAssets: 50000, // Compound wall
      totalAssets: 480000
    },
    totalLandAndAssets: 7230000, // 6,750,000 + 480,000
    solatiumPercent: 100, // 100% mandatory under Section 30(1)
    solatiumAmount: 7230000,
    additionalStatutoryInterest: {
      ratePercent: 12, // 12% per annum under Section 30(3)
      periodFrom: '14/08/2025', // Date of Sec 11 Notification
      periodTo: '10/09/2026', // Date of Award
      durationDays: 392,
      calculatedAmount: 390420
    },
    totalAssessedCompensation: 14850420
  },
  awardDetails: {
    awardNo: 'FORM-VI-AHD-2026-042',
    awardDate: '10/09/2026',
    passedBy: 'Shri B.K. Parmar, IAS, District Magistrate & CALA Ahmedabad',
    signedDoc: 'Signed_Form_VI_Award_DFCCIL_88_4.pdf',
    possessionNoticeDate: '05/11/2026'
  }
};

export const MOCK_RNR_ENTITLEMENTS = {
  projectId: 'NLAMS-2025-DFCCIL-0042',
  schemeId: 'FORM-V-RNR-2026-018',
  schemeTitle: 'Rehabilitation & Resettlement Scheme for WDFC Corridor, Sanand',
  administrator: 'Additional Collector (R&R), Ahmedabad',
  affectedFamiliesCount: 142,
  displacedFamiliesCount: 48,
  publicationDate: '18/01/2026',
  publicHearingDate: '24/02/2026 at Sanand Prant Office',
  personalEntitlementCard: {
    familyHeadName: 'Rameshchandra Mohanlal Patel',
    familyCategory: 'Landowner Affected (Loss of >75% holding)',
    entitlements: [
      {
        id: 'ENT-01',
        title: 'Constructed House or Housing Grant',
        legalRef: 'Second Schedule, Item 1',
        eligibility: 'Loss of residential/homestead structure in rural area',
        configuredBenefit: 'PMAY-Gramin standard house (minimum 50 sq.m carpet area) OR lump-sum grant of ₹ 2,50,000',
        optedChoice: 'Financial Grant (₹ 2,50,000)',
        status: 'APPROVED',
        authority: 'Commissioner R&R',
        lastUpdated: '15/04/2026'
      },
      {
        id: 'ENT-02',
        title: 'One-Time Resettlement Subsistence Allowance',
        legalRef: 'Second Schedule, Item 5',
        eligibility: 'Displaced / severely affected rural family',
        configuredBenefit: '₹ 50,000 one-time direct bank transfer for temporary resettlement disruption',
        optedChoice: 'DBT Payment',
        status: 'DISBURSED',
        authority: 'R&R Administrator',
        disbursedDate: '12/05/2026',
        utr: 'PFMS202605128821',
        lastUpdated: '12/05/2026'
      },
      {
        id: 'ENT-03',
        title: 'Transportation Allowance for Shifting',
        legalRef: 'Second Schedule, Item 7',
        eligibility: 'All displaced and severely affected families',
        configuredBenefit: '₹ 50,000 one-time transport grant for shifting belongings and cattle',
        optedChoice: 'DBT Payment',
        status: 'APPROVED',
        authority: 'R&R Administrator',
        lastUpdated: '15/04/2026'
      },
      {
        id: 'ENT-04',
        title: 'Monthly Annuity / Employment Option',
        legalRef: 'Second Schedule, Item 4',
        eligibility: 'Families whose agricultural land is fully acquired with loss of primary livelihood',
        configuredBenefit: 'Monthly pension of ₹ 2,000 per month for 20 years with annual CPI inflation linkage OR ₹ 5,00,000 one-time grant',
        optedChoice: 'Monthly Annuity (₹ 2,000/mo for 240 months)',
        status: 'ANNUITY_ACTIVE',
        authority: 'Govt Treasury / PFMS',
        lastUpdated: '18/09/2026'
      }
    ]
  },
  scheduleIIIAmenities: [
    { name: 'All-Weather Bitumen Blacktop Roads', status: 'AVAILABLE', compliance: '100% Complete' },
    { name: 'Piped Potable Drinking Water Supply', status: 'AVAILABLE', compliance: 'Nal Se Jal Scheme Connected' },
    { name: '24x7 Domestic Electricity & Street Lights', status: 'AVAILABLE', compliance: 'UGVCL Grid Energized' },
    { name: 'Primary Health Centre (PHC)', status: 'UNDER_DEVELOPMENT', compliance: '70% Civil Works Completed' },
    { name: 'Primary School & Anganwadi Centre', status: 'AVAILABLE', compliance: 'Operational since July 2026' },
    { name: 'Community Hall & Panchayati Chavadi', status: 'AVAILABLE', compliance: 'Fully Furnished' },
    { name: 'Cremation Ground & Boundary Wall', status: 'AVAILABLE', compliance: 'Dedicated land demarcated' },
    { name: 'Children Play Park & Tree Plantation Belt', status: 'UNDER_DEVELOPMENT', compliance: 'Horticulture sapling plantation underway' }
  ],
  formVIIAward: {
    awardNo: 'FORM-VII-RNR-2026-018',
    date: '28/04/2026',
    passedBy: 'Commissioner Rehabilitation & Resettlement, Gujarat',
    signedDoc: 'Form_VII_RNR_Award_Patel_Family.pdf'
  }
};

export const MOCK_PAYMENT_LEDGER = [
  {
    id: 'TXN-PFMS-001',
    projectId: 'NLAMS-2025-DFCCIL-0042',
    utrNumber: 'PFMS20260918883901',
    paymentType: 'Land Market Value & Solatium (Form-VI Award)',
    grossAmount: 14850420,
    tdsDeducted: 0, // Exempt under Sec 96 of RFCTLARR Act
    netCredited: 14850420,
    creditDate: '18-09-2026 14:22 IST',
    status: 'CREDITED',
    bankAccountMasked: '*******7829',
    bankName: 'Bank of Baroda',
    ifsc: 'BARB0PETLAD',
    sanctionOrderNo: 'CALA/AHD/FIN/2026/091',
    receiptPdf: 'PFMS_Digital_Receipt_TXN001.pdf'
  },
  {
    id: 'TXN-PFMS-002',
    projectId: 'NLAMS-2025-DFCCIL-0042',
    utrNumber: 'PFMS20260512882104',
    paymentType: 'R&R One-Time Resettlement Subsistence Allowance',
    grossAmount: 50000,
    tdsDeducted: 0,
    netCredited: 50000,
    creditDate: '12-05-2026 11:05 IST',
    status: 'CREDITED',
    bankAccountMasked: '*******7829',
    bankName: 'Bank of Baroda',
    ifsc: 'BARB0PETLAD',
    sanctionOrderNo: 'RNR/AHD/FIN/2026/012',
    receiptPdf: 'PFMS_Digital_Receipt_TXN002.pdf'
  },
  {
    id: 'TXN-PFMS-003',
    projectId: 'NLAMS-2026-NHAI-0089',
    utrNumber: 'RBI050826991044',
    paymentType: 'Section 13 Survey Spot Damage Compensation Tender',
    grossAmount: 301400,
    tdsDeducted: 0,
    netCredited: 301400,
    creditDate: '05-08-2026 16:30 IST',
    status: 'CREDITED',
    bankAccountMasked: '*******7829',
    bankName: 'Bank of Baroda',
    ifsc: 'BARB0PETLAD',
    sanctionOrderNo: 'SLAO/PETLAD/SEC13/2026/008',
    receiptPdf: 'PFMS_Digital_Receipt_TXN003.pdf'
  }
];

export const MOCK_ANNUITY_PENSION = {
  monthlyRate: 2000,
  totalMonths: 240, // 20 years
  optedDate: '18/09/2026',
  disbursedMonths: [
    { monthIndex: 1, monthName: 'September 2026', amount: 2000, status: 'CREDITED', utr: 'PFMS2026092001', date: '20-09-2026' },
    { monthIndex: 2, monthName: 'October 2026', amount: 2000, status: 'PROCESSING', utr: 'PFMS2026102002', date: 'Due 20-10-2026' },
    { monthIndex: 3, monthName: 'November 2026', amount: 2000, status: 'UPCOMING', utr: null, date: 'Due 20-11-2026' },
    { monthIndex: 4, monthName: 'December 2026', amount: 2000, status: 'UPCOMING', utr: null, date: 'Due 20-12-2026' }
  ]
};

export const MOCK_LARR_REFERENCE = {
  referenceId: 'REF/SEC64/2026/ANAND/0014',
  projectId: 'NLAMS-2025-DFCCIL-0042',
  ulpin: '24051234567892',
  surveyNo: '88/4',
  applicantName: 'Rameshchandra Mohanlal Patel',
  collectorRefDate: '18/09/2026',
  statute: 'Section 64 of RFCTLARR Act 2013',
  groundsSummary: 'Dispute regarding determination of circle rate and multiplication factor; applicant claimed urban peri-development factor of 2.0x instead of 1.50x applied by CALA.',
  status: 'FORWARDED_TO_TRIBUNAL',
  statusBadge: 'Forwarded to LARR Authority (Under Scrutiny)',
  larrCase: {
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority, Ahmedabad Bench',
    presidingJudge: 'Hon\'ble Principal District & Sessions Judge (Retd.) K.N. Shukla',
    registrationNo: 'LARR-AHD-2026-REF-0048',
    causeListDate: '12-10-2026',
    hearingDate: '24-10-2026 at 11:30 AM',
    courtroom: 'Courtroom No. 2, Old High Court Complex, Ahmedabad',
    digitalSummonsNo: 'SUMMONS/LARR/2026/184',
    pleadingsFiled: true,
    stayGranted: false,
    documents: [
      { name: 'Section_64_Reference_Dossier_Indexed.pdf', size: '3.4 MB', date: '18/09/2026' },
      { name: 'CALA_Sanctioned_Award_Record.pdf', size: '2.8 MB', date: '20/09/2026' },
      { name: 'Digital_Summons_Notice_LARR.pdf', size: '750 KB', date: '22/09/2026' }
    ]
  },
  highCourtAppeal: {
    appealApplicable: true,
    section: 'Section 74 of RFCTLARR Act 2013 (Appeal to High Court within 60 days of Tribunal Award)',
    status: 'TRIBUNAL_STAGE_ACTIVE',
    info: 'Citizen may prefer an appeal to the Hon\'ble High Court of Gujarat within 60 days from the date of the award of the LARR Authority if aggrieved.'
  }
};
