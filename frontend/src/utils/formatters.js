/**
 * NLAMS - Requisition & Currency Formatters
 */

export function formatINR(number) {
  if (number === undefined || number === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(number);
}

export function formatCrores(amountCr) {
  if (!amountCr) return '₹0.00 Cr';
  return `₹${Number(amountCr).toFixed(2)} Cr`;
}

export function formatHectares(ha) {
  if (!ha) return '0.00 Ha';
  return `${Number(ha).toFixed(2)} Ha`;
}

export function calculateSolatium(marketValue) {
  return marketValue; // 100% under Sec 30(1) RFCTLARR Act 2013
}
