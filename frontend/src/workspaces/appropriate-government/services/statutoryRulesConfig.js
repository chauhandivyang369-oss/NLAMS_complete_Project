/**
 * NLAMS - Configurable Statutory Rules Layer
 * Supports RFCTLARR Act 2013 Statutory Rules Configuration
 * Stores: section, rule, jurisdiction, effective date, expiry date,
 * configuration value, source/reference, enabled/disabled, version.
 */

export const STATUTORY_RULES_CONFIG = [
  {
    id: 'RULE-SEC11-PUB-01',
    section: 'Section 11(1)',
    ruleName: 'Mandatory 12-Channel Publication Matrix',
    jurisdiction: 'ALL', // CENTRAL and STATE
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      mandatoryChannelsCount: 12,
      requireEvidenceUpload: true,
      requireTwoLocalNewspapers: true,
      requireRegionalLanguage: true,
      requirePanchayatNotification: true,
      requireWebsitePublication: true
    },
    reference: 'RFCTLARR Act 2013 Section 11(1)(a)-(f) & Central Rules 2014 Rule 12',
    enabled: true,
    version: '2.1'
  },
  {
    id: 'RULE-SEC11-FREEZE-02',
    section: 'Section 11(4)',
    ruleName: 'Statutory Encumbrance & Transaction Freeze Bar',
    jurisdiction: 'ALL',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      autoTriggerSroFreeze: true,
      permitCollectorExemption: true,
      requireWrittenReasonsForExemption: true,
      exemptionVerificationAuthority: 'DISTRICT_COLLECTOR'
    },
    reference: 'RFCTLARR Act 2013 Section 11(4) Bar on Transaction',
    enabled: true,
    version: '1.4'
  },
  {
    id: 'RULE-SEC11-UPDATE-03',
    section: 'Section 11(5)',
    ruleName: 'Two-Month Land Records Updating Limitation',
    jurisdiction: 'ALL',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      timeLimitMonths: 2,
      timeLimitDays: 60,
      scope: ['RoR', 'Mutation', 'ULPIN', 'Bhu-Naksha Cadastral Survey'],
      strictEnforcement: true
    },
    reference: 'RFCTLARR Act 2013 Section 11(5) Updating of Land Records',
    enabled: true,
    version: '1.0'
  },
  {
    id: 'RULE-SEC15-OBJ-04',
    section: 'Section 15(1)',
    ruleName: 'Statutory Objection Window from Section 11 Publication',
    jurisdiction: 'ALL',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      windowDays: 60,
      allowPersonalHearing: true,
      requireCollectorReportWithinDays: 90
    },
    reference: 'RFCTLARR Act 2013 Section 15(1) & (2) Hearing of Objections',
    enabled: true,
    version: '2.0'
  },
  {
    id: 'RULE-SEC19-LAPSING-05',
    section: 'Section 19(7)',
    ruleName: 'Statutory 12-Month Lapsing Timer for Section 19 Declaration',
    jurisdiction: 'ALL',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      maxMonthsFromSec11: 12,
      maxDays: 365,
      allowCourtStayExclusion: true,
      courtStayProviso: 'Section 19(7) First Proviso (Court Injunction Period Excluded)',
      allowGovernmentExtension: true,
      extensionMaxMonths: 12,
      extensionGroundsRequired: true
    },
    reference: 'RFCTLARR Act 2013 Section 19(7) Provisos 1 and 2',
    enabled: true,
    version: '3.0'
  },
  {
    id: 'RULE-SEC19-DEPOSIT-06',
    section: 'Section 19(2)',
    ruleName: 'Requiring Body Cost of Acquisition Deposit Pre-Condition',
    jurisdiction: 'ALL',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      minimumDepositPercent: 100, // or 100% of estimated R&R and Compensation
      acceptedGateways: ['PFMS', 'CNA', 'ESCROW_STATE_TREASURY', 'SBI_E_PAY'],
      strictBlockingGate: true
    },
    reference: 'RFCTLARR Act 2013 Section 19(2) & State Financial Rules',
    enabled: true,
    version: '2.2'
  },
  {
    id: 'RULE-SEC10-FOOD-07',
    section: 'Section 10',
    ruleName: 'Food Security Special Provisions on Multi-Cropped Irrigated Land',
    jurisdiction: 'STATE', // State specific thresholds
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      maxDistrictMultiCropPercent: 1.0, // max 1% of net sown area in district
      maxStateMultiCropPercent: 5.0,    // max 5% of net sown area in state
      requireEquivalentWastelandDevelopment: true,
      exemptLinearProjects: true
    },
    reference: 'RFCTLARR Act 2013 Section 10(1)-(4) Special provisions for food security',
    enabled: true,
    version: '1.2'
  },
  {
    id: 'RULE-SEC101-LANDBANK-08',
    section: 'Section 101',
    ruleName: 'Five-Year Unutilized Land Reversion & Land Bank Protocol',
    jurisdiction: 'STATE',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      unutilizedYearsThreshold: 5,
      returnToOriginalOwners: true,
      transferToStateLandBankIfOwnerDeclined: true,
      annualAuditRequired: true
    },
    reference: 'RFCTLARR Act 2013 Section 101 Return of Unutilized Land',
    enabled: true,
    version: '2.0'
  },
  {
    id: 'RULE-PESA-TRIBAL-09',
    section: 'Section 41 & 42',
    ruleName: 'Special Safeguards for Scheduled Castes / Scheduled Tribes & PESA',
    jurisdiction: 'ALL',
    effectiveFrom: '2014-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      requireGramSabhaConsent: true,
      fifthSixthScheduleApplicability: true,
      scStDevelopmentPlanMandatory: true,
      minimumOneThirdCompensationAdvance: true
    },
    reference: 'RFCTLARR Act 2013 Section 41 & 42, PESA Act 1996',
    enabled: true,
    version: '2.1'
  },
  {
    id: 'RULE-CENTRAL-SPECIAL-10',
    section: 'Section 105 / Fourth Schedule',
    ruleName: 'Special Central Enactment Provisions',
    jurisdiction: 'CENTRAL',
    effectiveFrom: '2015-01-01',
    effectiveTo: '2099-12-31',
    configValue: {
      applicableActs: [
        'National Highways Act 1956',
        'Railways Act 1989',
        'Coal Bearing Areas (Acquisition and Development) Act 1957',
        'Atomic Energy Act 1962',
        'Electricity Act 2003'
      ],
      applyFirstSecondThirdSchedules: true,
      calaAuthorityDesignation: true
    },
    reference: 'RFCTLARR Act 2013 Section 105 & Fourth Schedule Amendment Order 2015',
    enabled: true,
    version: '3.1'
  }
];

export function getStatutoryRules(jurisdiction = 'ALL') {
  return STATUTORY_RULES_CONFIG.filter(
    rule => rule.enabled && (rule.jurisdiction === 'ALL' || rule.jurisdiction === jurisdiction)
  );
}
