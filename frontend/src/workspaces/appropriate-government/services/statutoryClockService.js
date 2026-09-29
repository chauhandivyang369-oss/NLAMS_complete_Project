/**
 * NLAMS - Statutory Clock Service
 * API-ready calculation engine for all statutory timers under RFCTLARR Act 2013
 */

export class StatutoryClockService {
  /**
   * Calculate Section 19 12-month statutory lapsing status
   * Section 19(7): Declaration must be made within 12 months from the date of Section 11 publication
   * First Proviso: In computing period, any period during which acquisition is stayed by court order is excluded.
   * Second Proviso: Appropriate Government can extend for another period not exceeding 12 months for reasons recorded in writing.
   */
  static calculateSection19Clock(sec11PubDate, stayExclusionDays = 0, extensionDays = 0, currentDate = new Date()) {
    if (!sec11PubDate) {
      return {
        status: 'PENDING',
        startDate: null,
        originalDeadline: null,
        adjustedDeadline: null,
        daysElapsed: 0,
        daysRemaining: 365,
        totalWindowDays: 365,
        stayExclusionDays: 0,
        extensionDays: 0,
        percentageElapsed: 0,
        label: 'Section 11 Not Published'
      };
    }

    const start = new Date(sec11PubDate);
    const curr = new Date(currentDate);

    // Standard statutory 12-month window (365 days)
    const baseWindowDays = 365;
    const totalAllowedDays = baseWindowDays + (stayExclusionDays || 0) + (extensionDays || 0);

    const originalDeadline = new Date(start);
    originalDeadline.setDate(originalDeadline.getDate() + baseWindowDays);

    const adjustedDeadline = new Date(start);
    adjustedDeadline.setDate(adjustedDeadline.getDate() + totalAllowedDays);

    // Days elapsed
    const diffTime = curr.getTime() - start.getTime();
    const daysElapsed = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.floor((adjustedDeadline.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));

    let status = 'NORMAL';
    let label = `${daysRemaining} days remaining`;

    if (daysRemaining <= 0) {
      status = 'EXPIRED';
      label = `Lapsed by ${Math.abs(daysRemaining)} days`;
    } else if (stayExclusionDays > 0 && daysElapsed < totalAllowedDays) {
      status = 'STAY_EXCLUDED';
      label = `Stay Excluded (+${stayExclusionDays}d), ${daysRemaining}d left`;
    } else if (extensionDays > 0) {
      status = 'EXTENDED';
      label = `Extended (+${extensionDays}d), ${daysRemaining}d left`;
    } else if (daysRemaining <= 30) {
      status = 'CRITICAL';
      label = `Critical: ${daysRemaining} days remaining`;
    } else if (daysRemaining <= 90) {
      status = 'WARNING';
      label = `Approaching Deadline: ${daysRemaining} days`;
    }

    const percentageElapsed = Math.min(100, Math.max(0, Math.round((daysElapsed / totalAllowedDays) * 100)));

    return {
      status,
      startDate: start.toISOString().split('T')[0],
      originalDeadline: originalDeadline.toISOString().split('T')[0],
      adjustedDeadline: adjustedDeadline.toISOString().split('T')[0],
      daysElapsed,
      daysRemaining,
      totalWindowDays: totalAllowedDays,
      stayExclusionDays,
      extensionDays,
      percentageElapsed,
      label
    };
  }

  /**
   * Calculate Section 15 60-day objection window countdown
   */
  static calculateSection15Window(sec11PubDate, windowDays = 60, currentDate = new Date()) {
    if (!sec11PubDate) return { active: false, daysRemaining: windowDays, status: 'NOT_STARTED' };

    const start = new Date(sec11PubDate);
    const curr = new Date(currentDate);
    const deadline = new Date(start);
    deadline.setDate(deadline.getDate() + windowDays);

    const daysRemaining = Math.floor((deadline.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
    const active = daysRemaining >= 0;

    return {
      startDate: start.toISOString().split('T')[0],
      deadline: deadline.toISOString().split('T')[0],
      daysRemaining: Math.max(0, daysRemaining),
      active,
      status: active ? (daysRemaining <= 10 ? 'CLOSING_SOON' : 'OPEN') : 'CLOSED'
    };
  }

  /**
   * Calculate Section 11(5) 2-month land record updating countdown
   */
  static calculateLandRecordUpdateClock(sec11PubDate, windowMonths = 2, currentDate = new Date()) {
    if (!sec11PubDate) return { completed: false, daysRemaining: 60, status: 'PENDING' };

    const start = new Date(sec11PubDate);
    const curr = new Date(currentDate);
    const deadline = new Date(start);
    deadline.setMonth(deadline.getMonth() + windowMonths);

    const daysRemaining = Math.floor((deadline.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));

    return {
      startDate: start.toISOString().split('T')[0],
      deadline: deadline.toISOString().split('T')[0],
      daysRemaining: Math.max(0, daysRemaining),
      isOverdue: daysRemaining < 0,
      status: daysRemaining < 0 ? 'OVERDUE' : (daysRemaining <= 15 ? 'EXPIRING' : 'ON_TRACK')
    };
  }

  /**
   * Calculate Section 101 5-year unutilized land reversion clock
   */
  static calculateSection101LandBankClock(possessionDate, thresholdYears = 5, currentDate = new Date()) {
    if (!possessionDate) return null;

    const start = new Date(possessionDate);
    const curr = new Date(currentDate);
    const expiry = new Date(start);
    expiry.setFullYear(expiry.getFullYear() + thresholdYears);

    const daysElapsed = Math.floor((curr.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.floor((expiry.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
    const isExceeded = daysRemaining <= 0;

    return {
      possessionDate: start.toISOString().split('T')[0],
      reversionThresholdDate: expiry.toISOString().split('T')[0],
      daysElapsed,
      daysRemaining: Math.max(0, daysRemaining),
      isExceeded,
      status: isExceeded ? 'UNUTILIZED_REVERSION_DUE' : 'MONITORING'
    };
  }
}
