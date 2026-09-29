/**
 * NLAMS - Constants and Statutory Definitions
 * RFCTLARR Act 2013 (Right to Fair Compensation and Transparency in Land Acquisition,
 * Rehabilitation and Resettlement Act, 2013)
 */

export const REQUISITIONING_BODY_MODULES = [
  {
    id: 'dashboard',
    number: '01',
    title: 'Executive Dashboard',
    shortName: 'Dashboard',
    iconName: 'LayoutDashboard',
    description: 'High-level KPI surveillance, multi-district progress, SLA risk alerts, and statutory stage metrics',
    badge: 'Live',
    badgeType: 'success'
  },
  {
    id: 'master-hub',
    number: '02',
    title: 'Master Requisition Hub',
    shortName: 'Requisition Hub',
    iconName: 'FolderKanban',
    description: 'Portfolio of all institutional land requisitions across national highways, rail corridors, and energy grids',
    badge: '12 Projects',
    badgeType: 'neutral'
  },
  {
    id: 'form-i-wizard',
    number: '03',
    title: 'Form-I Smart Wizard',
    shortName: 'Form-I Wizard',
    iconName: 'FileSpreadsheet',
    description: 'Statutory Form-I drafting engine with cadastral alignment validation, public purpose justification & SIA check',
    badge: 'Statutory',
    badgeType: 'primary'
  },
  {
    id: 'gis-canvas',
    number: '04',
    title: 'GIS Spatial Canvas',
    shortName: 'GIS Canvas',
    iconName: 'MapPinned',
    description: 'Interactive Cadastral Khasra GIS layer with ULPIN linkage, chainage tracking, eco-buffer and encroachment detection',
    badge: 'PostGIS / WebGIS',
    badgeType: 'accent'
  },
  {
    id: 'escrow-ledger',
    number: '05',
    title: 'Financial Escrow Ledger',
    shortName: 'Escrow Ledger',
    iconName: 'Landmark',
    description: 'Treasury & PFMS escrow accounting, Section 30 solatium (100%), interest accruals, and DBT compensation disbursement',
    badge: '₹482.40 Cr',
    badgeType: 'warning'
  },
  {
    id: 'timeline-tracker',
    number: '06',
    title: 'Statutory Timeline Tracker',
    shortName: 'Timeline Tracker',
    iconName: 'Clock',
    description: 'Critical Section 19(7) and Section 25 lapse prevention monitoring with strict 12-month statutory SLA countdowns',
    badge: 'Lapse Monitor',
    badgeType: 'danger'
  },
  {
    id: 'objections-hearings',
    number: '07',
    title: 'Objections & Hearings',
    shortName: 'Objections',
    iconName: 'Gavel',
    description: 'Section 15 dispute registry, CALA hearing calendar, AI claim classification, and speaking order repository',
    badge: '48 Cases',
    badgeType: 'neutral'
  },
  {
    id: 'rnr-dbt',
    number: '08',
    title: 'R&R Oversight & DBT',
    shortName: 'R&R & DBT',
    iconName: 'UsersRound',
    description: 'Second & Third Schedule entitlements, PAFs/PDFs census, housing allotment, and Aadhaar-seeded DBT disbursement',
    badge: '894 Families',
    badgeType: 'success'
  },
  {
    id: 'pia-rbac',
    number: '09',
    title: 'PIA Delegation & RBAC',
    shortName: 'PIA & RBAC',
    iconName: 'ShieldCheck',
    description: 'Project Implementation Agency officer appointments, delegated statutory authorizations, and cryptographic audit log',
    badge: '6 Designations',
    badgeType: 'neutral'
  },
  {
    id: 'document-vault',
    number: '10',
    title: 'Document & Gazette Vault',
    shortName: 'Document Vault',
    iconName: 'Archive',
    description: 'Extraordinary e-Gazette repository, Section 11/19 orders, verified RoR khatians, and AI OCR signature verification',
    badge: 'Digitally Certified',
    badgeType: 'primary'
  }
];

export const STATUTORY_STAGES = [
  {
    id: 'sec_4',
    section: 'Section 4(1)',
    title: 'Social Impact Assessment (SIA)',
    statutoryWindowDays: 180,
    description: 'Preliminary public notification & consultation for SIA study preparation and public hearing'
  },
  {
    id: 'sec_7',
    section: 'Section 7(5)',
    title: 'Expert Group Appraisal',
    statutoryWindowDays: 60,
    description: 'Independent multidisciplinary expert group evaluates SIA report for public purpose validity'
  },
  {
    id: 'sec_11',
    section: 'Section 11(1)',
    title: 'Preliminary Notification',
    statutoryWindowDays: 60,
    description: 'Formal publication in Official Gazette specifying details of proposed land and cadastral survey'
  },
  {
    id: 'sec_15',
    section: 'Section 15',
    title: 'Hearing of Objections',
    statutoryWindowDays: 60,
    description: 'Mandatory 60-day window for affected persons to file objections on area, ownership, or public purpose'
  },
  {
    id: 'sec_19',
    section: 'Section 19(1)',
    title: 'Statutory Declaration',
    statutoryWindowDays: 365,
    description: 'Final declaration of acquisition with summary R&R scheme. Must be made within 12 months of Sec 11 or proposal lapses!'
  },
  {
    id: 'sec_23',
    section: 'Section 23 & 26',
    title: 'Land Award Determination',
    statutoryWindowDays: 365,
    description: 'CALA enquiry and award of compensation + 100% Solatium + 12% additional market value interest'
  },
  {
    id: 'sec_31',
    section: 'Section 31 & 38',
    title: 'R&R Award & Possession',
    statutoryWindowDays: 90,
    description: 'Full monetary settlement deposited in Escrow, R&R benefits handed over before physical possession'
  }
];

export const USER_OFFICER_PROFILE = {
  name: 'Er. Rajeshwar Rao, IRSE',
  designation: 'General Manager (Land & Liaison)',
  agency: 'National Highways Authority of India (NHAI)',
  division: 'Northern Corridor Regional Office - New Delhi',
  authorizedCadre: 'Senior Administrative Grade (SAG)',
  employeeId: 'NHAI-HQ-2021-0892',
  securityClearance: 'Level-3 Statutory Requisition Signatory',
  currentOffice: 'PIU Ambala - Kurukshetra Expressway Division'
};
