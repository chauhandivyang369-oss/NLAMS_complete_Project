/**
 * NLAMS - RFCTLARR Act 2013 Statutory Compensation Calculator
 * Computes compensation strictly according to First Schedule & Sections 26, 29, 30 of RFCTLARR Act 2013.
 */

export function calculateRfctlarrCompensation({
  areaHectares = 1.0,
  circleRatePerHa = 4500000,
  salesAvgPerHa = 4800000,
  consentedRatePerHa = 0,
  isRural = true,
  distanceFromUrbanKm = 15,
  structureValue = 850000,
  treesValue = 320000,
  cropsValue = 110000,
  sec11Date = '2025-01-15',
  awardDate = '2026-01-15'
}) {
  // 1. Base Market Value determination under Section 26(1): Highest of Circle Rate, 3-Yr Sales Average, or Consented Rate
  const highestRatePerHa = Math.max(circleRatePerHa, salesAvgPerHa, consentedRatePerHa);
  const baseMarketValue = highestRatePerHa * areaHectares;

  // 2. Multiplier Factor under Section 26(2) (First Schedule, Item 2)
  // Urban: 1.00x; Rural: sliding scale from 1.00x (near city) to 2.00x (>30km or state rules)
  let ruralFactor = 1.0;
  if (isRural) {
    if (distanceFromUrbanKm <= 5) ruralFactor = 1.2;
    else if (distanceFromUrbanKm <= 10) ruralFactor = 1.4;
    else if (distanceFromUrbanKm <= 20) ruralFactor = 1.6;
    else if (distanceFromUrbanKm <= 30) ruralFactor = 1.8;
    else ruralFactor = 2.0;
  }
  const multipliedMarketValue = baseMarketValue * ruralFactor;

  // 3. Value of Assets attached to land under Section 29
  const totalAssetsValue = structureValue + treesValue + cropsValue;

  // 4. Subtotal Land + Assets
  const subtotalLandAndAssets = multipliedMarketValue + totalAssetsValue;

  // 5. 100% Solatium under Section 30(1)
  const solatium = subtotalLandAndAssets * 1.0;

  // 6. 12% per annum Additional Compensation under Section 30(3)
  // Calculated on Base Market Value from Sec 11 date to Award date
  const d1 = new Date(sec11Date);
  const d2 = new Date(awardDate);
  const diffDays = Math.max(0, Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)));
  const diffYears = diffDays / 365.25;
  const additionalInterestRate = 0.12; // 12% p.a.
  const additionalCompensation = baseMarketValue * additionalInterestRate * diffYears;

  // 7. Total Final Statutory Compensation
  const totalCompensation = subtotalLandAndAssets + solatium + additionalCompensation;

  return {
    highestRatePerHa,
    baseMarketValue,
    ruralFactor,
    multipliedMarketValue,
    structureValue,
    treesValue,
    cropsValue,
    totalAssetsValue,
    subtotalLandAndAssets,
    solatium,
    diffDays,
    diffYears: diffYears.toFixed(2),
    additionalCompensation,
    totalCompensation
  };
}

export function formatIndianCurrency(num) {
  if (num === null || num === undefined || isNaN(num)) return '₹0';
  const val = Math.round(num);
  return '₹' + val.toLocaleString('en-IN');
}
