/**
 * NLAMS - Appropriate Government Central & State Configuration Layer
 * Configures jurisdiction-specific behavior, titles, GIS providers,
 * revenue systems, registry integration, finance systems, and committee types.
 */

export const CENTRAL_APPROPRIATE_GOV_CONFIG = {
  jurisdictionType: 'CENTRAL',
  governmentName: 'Government of India',
  ministryHeader: 'Ministry of Road Transport & Highways / Railways / Power / Coal',
  apexAuthorityTitle: 'Central Appropriate Government',
  authoritySubtitle: 'Apex Central Statutory Gateway & Inter-State Corridor Directorate',
  statutoryAct: 'RFCTLARR Act 2013 • Central Enactment Gateway (Section 105 / 4th Schedule)',
  primaryRoles: [
    { id: 'ROLE-CENTRAL-JS', title: 'Joint Secretary to Govt of India', department: 'Ministry of Road Transport & Highways (MoRTH)', level: 'Apex Statutory Authority' },
    { id: 'ROLE-CENTRAL-NMC', title: 'NMC Member Secretary', department: 'Department of Land Resources (DoLR)', level: 'National Monitoring Committee' },
    { id: 'ROLE-CENTRAL-RAIL', title: 'Executive Director (Land Management)', department: 'Railway Board / DFCCIL', level: 'Central Ministry CALA Gateway' },
    { id: 'ROLE-CENTRAL-FIN', title: 'Director (Project Finance & Escrow)', department: 'Ministry of Finance / PFMS Cell', level: 'Central Escrow & CNA Oversight' }
  ],
  gazetteType: 'The Gazette of India (Extraordinary)',
  gazetteAuthority: 'Directorate of Printing, Government of India',
  gisProvider: 'National GIS • ISRO Bhuvan • BharatMaps Spatial Alignment',
  gisScale: 'NATIONAL_MULTI_STATE',
  spatialSegmentationEngine: 'National Multi-State Linear Corridor Segmentation',
  committee: {
    type: 'NMC',
    name: 'National Monitoring Committee (Section 48)',
    chair: 'Secretary, Department of Land Resources (DoLR)',
    mandate: 'National review of R&R schemes and interstate project coordination'
  },
  financeSystems: [
    { name: 'PFMS (Public Financial Management System)', status: 'API READY / MOCK', code: 'PFMS_CENTRAL' },
    { name: 'CNA (Central Nodal Agency Escrow)', status: 'ACTIVE / MOCK', code: 'CNA_ESCROW' },
    { name: 'Central Escrow Sub-Accounts', status: 'SYNCHRONIZED', code: 'ESCROW_CFI' },
    { name: 'Consolidated Fund of India (CFI)', status: 'BUDGET SANCTIONED', code: 'CFI_STATUTORY' }
  ],
  revenueSystems: [
    { name: 'DILRMP Central Cadastral Sync', status: 'MOCK AVAILABLE' },
    { name: 'Central Land Record Exchange', status: 'API READY' }
  ],
  registrySystem: {
    name: 'National Land Registry / Central SRO Adapter',
    status: 'API READY / MOCK'
  },
  specialEngines: {
    multiStateSegmentation: true,
    nmcMonitoring: true,
    specialCentralEnactments: true, // NH Act 1956, Railways Act 1989, Coal Bearing Areas 1957
    utDirectOversight: true,
    stateLandBank: false,
    section10FoodSecurity: false,
    pesaTribalSafeguards: false
  },
  statutoryTimers: {
    siaMonthsLimit: 6,
    sec15ObjectionDays: 60,
    sec19MonthsLimit: 12,
    sec11RoRUpdateDays: 60
  }
};

export const STATE_APPROPRIATE_GOV_CONFIG = {
  jurisdictionType: 'STATE',
  governmentName: 'State Government',
  ministryHeader: 'Revenue & Forest Department • Land Reforms & Acquisition Wing',
  apexAuthorityTitle: 'State Appropriate Government',
  authoritySubtitle: 'State Apex Revenue Gateway & District Collector Orchestration',
  statutoryAct: 'RFCTLARR Act 2013 & State Land Acquisition Rules',
  primaryRoles: [
    { id: 'ROLE-STATE-ACS', title: 'Additional Chief Secretary (Revenue)', department: 'Revenue & Forest Department, State Government', level: 'State Apex Revenue Head' },
    { id: 'ROLE-STATE-PWD', title: 'Principal Secretary (PWD / Urban)', department: 'Public Works & Infrastructure Department', level: 'State Appropriate Authority' },
    { id: 'ROLE-STATE-SMC', title: 'SMC Member Secretary', department: 'State Monitoring Committee for R&R', level: 'State Oversight Bench' },
    { id: 'ROLE-STATE-DIR', title: 'Director of Land Records (DILR)', department: 'Survey, Settlement & Land Records Directorate', level: 'Bhu-Naksha & Cadastre Head' }
  ],
  gazetteType: 'State Government Gazette (Extraordinary e-Gazette)',
  gazetteAuthority: 'State Government Printing & Stationery Press',
  gisProvider: 'State Bhu-Naksha • Cadastral Parcel Map Engine',
  gisScale: 'STATE_MULTI_DISTRICT',
  spatialSegmentationEngine: 'State Multi-District Boundary Segmentation',
  committee: {
    type: 'SMC',
    name: 'State Monitoring Committee (SMC)',
    chair: 'Additional Chief Secretary / Principal Secretary (Revenue)',
    mandate: 'State-wide R&R scheme review, district escalation & social audit'
  },
  financeSystems: [
    { name: 'State Treasury (e-Kuber / BeAMS)', status: 'API READY / MOCK', code: 'STATE_TREASURY' },
    { name: 'PFMS State Adapter', status: 'ACTIVE / MOCK', code: 'PFMS_STATE' },
    { name: 'State Land Acquisition Escrow', status: 'FUNDED', code: 'STATE_ESCROW' }
  ],
  revenueSystems: [
    { name: 'State Jamabandi / RoR Portal', status: 'MOCK AVAILABLE', desc: 'Online Record of Rights & Ownership' },
    { name: 'e-Mutation Engine', status: 'API READY / MOCK', desc: 'Automated 60-day mutation tracking' },
    { name: 'Bhu-Naksha GIS Cadastre', status: 'SYNCHRONIZED', desc: 'Survey parcel polygons & ULPIN mapping' },
    { name: 'State Circle Rate Registry', status: 'ACTIVE / MOCK', desc: 'Guidance values for Section 26 calculation' }
  ],
  registrySystem: {
    name: 'State SRO / NGDRS (National Generic Document Registration System)',
    status: 'API READY / MOCK'
  },
  specialEngines: {
    multiStateSegmentation: false,
    nmcMonitoring: false,
    specialCentralEnactments: false,
    utDirectOversight: false,
    stateLandBank: true, // Section 101 5-year unutilized land reversion
    section10FoodSecurity: true, // Multi-crop irrigated agricultural ceiling
    pesaTribalSafeguards: true // Fifth Schedule Gram Sabha & 1/3rd compensation advance
  },
  statutoryTimers: {
    siaMonthsLimit: 6,
    sec15ObjectionDays: 60,
    sec19MonthsLimit: 12,
    sec11RoRUpdateDays: 60
  }
};

export function getAppropriateGovConfig(jurisdiction = 'CENTRAL') {
  return jurisdiction === 'CENTRAL' ? CENTRAL_APPROPRIATE_GOV_CONFIG : STATE_APPROPRIATE_GOV_CONFIG;
}
