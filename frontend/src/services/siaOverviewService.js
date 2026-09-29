/**
 * SIA Overview Service for NLAMS SIA & IEG Evaluation Workspace
 * 
 * Provides API-ready contracts and mock adapter fallback for:
 * GET /api/v1/sia/projects/:projectId/overview
 * 
 * Compliant with RFCTLARR Act 2013 Section 4 to 6 operational requirements.
 */

import { SEED_CADASTRAL_PARCELS, DEFAULT_CORRIDOR_LINE } from './gisService.js';

// Convert SEED_CADASTRAL_PARCELS to SIA-enriched parcel records
const ENRICHED_SIA_PARCELS = SEED_CADASTRAL_PARCELS.slice(0, 15).map((parcel, idx) => {
  const familyCount = (idx % 3 === 0) ? 3 : (idx % 2 === 0) ? 2 : 1;
  const assetCount = (idx % 4 === 0) ? 2 : (idx % 5 === 0) ? 0 : 1;
  const isSurveyed = idx < 13; // 13 out of 15 surveyed (approx 87-92%)
  const isDisplaced = idx % 3 === 0;

  return {
    id: parcel.id,
    surveyNo: parcel.surveyNo || parcel.survey_no || `${140 + idx}/A`,
    ulpin: parcel.ulpin,
    ownerName: parcel.owners && parcel.owners[0] ? parcel.owners[0].name : 'Verified Khatedar',
    affectedArea: parcel.affectedAreaAcre ? Number((parcel.affectedAreaAcre * 0.404686).toFixed(2)) : 0.85,
    totalAreaHa: parcel.areaHa || 1.25,
    impactPercent: parcel.impactPct || 65,
    landUse: parcel.landUse || 'Agricultural (Irrigated)',
    familyCount,
    assetCount,
    surveyStatus: isSurveyed ? 'Completed' : 'Pending',
    displaced: isDisplaced,
    village: parcel.village || 'Petlad',
    taluka: parcel.taluka || 'Petlad',
    district: parcel.district || 'Anand',
    state: parcel.state || 'Gujarat',
    coordinates: parcel.coordinates
  };
});

export const MOCK_SIA_OVERVIEW_DATA = {
  project: {
    projectName: 'Petlad Railway Bypass Alignment',
    projectId: 'NLAMS-DEMO-2026-001',
    status: 'IN PROGRESS',
    commencementDate: '14/01/2026',
    notifyingAuthority: 'Ministry of Railways / Western Railway Zone',
    district: 'Anand',
    state: 'Gujarat',
    taluka: 'Petlad',
    gazetteNotificationNo: 'WR/NLAMS/SIA/2026/GZ-04',
    appointedAgency: 'Gujarat Institute of Development Research (GIDR) — SIA Unit',
    unitHead: 'Dr. R. K. Trivedi (Chief Evaluator)'
  },

  timeline: {
    commencementDate: '14/01/2026',
    statutoryDeadline: '13/07/2026',
    elapsedDays: 135,
    totalDays: 180,
    remainingDays: 45,
    progressPercentage: 75.0,
    status: 'IN PROGRESS',
    statutorySection: 'Section 4(2) RFCTLARR Act 2013',
    slaThresholdDays: 180
  },

  kpis: {
    totalProjectArea: '1,250.40 ha',
    proposedAcquisitionArea: '486.75 ha',
    affectedParcels: '742',
    ulpins: '701',
    recordedLandowners: '628',
    estimatedAffectedFamilies: '512',
    surveyedFamilies: '475',
    displacedFamilies: '186',
    livelihoodDependentFamilies: '326',
    publicCommunityAssets: '84',
    surveyCompletion: '92.8%',
    publicHearingStatus: 'Scheduled',
    simpStatus: 'In Preparation',
    finalReportStatus: 'Not Submitted'
  },

  corridorLine: DEFAULT_CORRIDOR_LINE,
  parcels: ENRICHED_SIA_PARCELS,

  alerts: [
    {
      id: 'alt-1',
      severity: 'WARNING',
      category: 'Census Verification',
      message: '37 families not surveyed',
      count: 37,
      status: 'Pending Survey',
      actionPrompt: 'Schedule field enumerator visit for pending household verification in Sector 3'
    },
    {
      id: 'alt-2',
      severity: 'WARNING',
      category: 'Land Records',
      message: '8 parcels missing ownership verification',
      count: 8,
      status: 'Action Due',
      actionPrompt: 'Cross-reference with Bhulekh RoR mutation entries for disputed survey numbers'
    },
    {
      id: 'alt-3',
      severity: 'ACTION REQUIRED',
      category: 'Public Infrastructure',
      message: 'Public utility inventory incomplete',
      status: 'Verification Required',
      actionPrompt: 'Gram Panchayat check required for 4 irrigation tubewells and 1 community hall'
    },
    {
      id: 'alt-4',
      severity: 'ACTION REQUIRED',
      category: 'Statutory Notification',
      message: 'Hearing notice pending',
      status: 'Sec 5 Gazette Rule',
      actionPrompt: 'Publish Form-II draft hearing notice in local Gujarati daily at least 21 days in advance'
    },
    {
      id: 'alt-5',
      severity: 'ACTION REQUIRED',
      category: 'SIMP Formulation',
      message: 'SIMP mitigation cost missing',
      status: 'Costing Pending',
      actionPrompt: 'Input alternative livelihood restoration and resettlement site development estimates'
    },
    {
      id: 'alt-6',
      severity: 'DEADLINE',
      category: 'Statutory SLA',
      message: '45 days remaining',
      status: 'Sec 4(2) Statutory SLA',
      actionPrompt: 'Final SIA report and SIMP must be submitted before 13/07/2026 to prevent lapsing'
    }
  ]
};

/**
 * Fetch SIA Overview data for a specific project.
 * Supports simulateState: 'success' | 'loading' | 'empty' | 'error'
 */
export async function fetchSiaOverviewData(projectId = 'NLAMS-DEMO-2026-001', simulateState = 'success') {
  // Simulates network latency for realistic government portal feel
  await new Promise(resolve => setTimeout(resolve, 350));

  if (simulateState === 'error') {
    throw new Error('Unable to load SIA overview data. Server connection timed out.');
  }

  if (simulateState === 'empty') {
    return {
      project: null,
      timeline: null,
      kpis: null,
      parcels: [],
      alerts: []
    };
  }

  return MOCK_SIA_OVERVIEW_DATA;
}
