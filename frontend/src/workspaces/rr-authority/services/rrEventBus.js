/**
 * NLAMS R&R Authority — Inter-Workspace Event Bus (Mock)
 * Handles cross-workspace statutory event emissions and broadcasts
 */

class RREventBus {
  constructor() {
    this.listeners = {};
    this.eventsHistory = [
      {
        id: 'EVT-RR-001',
        type: 'RR_CENSUS_COMMENCED',
        projectId: 'NLAMS-PRJ-2026-0042',
        timestamp: '10/09/2026 09:30 IST',
        actor: 'Shri R. K. Solanki (R&R Administrator)',
        payload: { targetVillages: 5, estimatedFamilies: 500 },
        broadcastTargets: ['Appropriate Govt', 'Collector Anand', 'Requiring Body']
      },
      {
        id: 'EVT-RR-002',
        type: 'RR_CENSUS_COMPLETED',
        projectId: 'NLAMS-PRJ-2026-0042',
        timestamp: '16/09/2026 17:00 IST',
        actor: 'Shri R. K. Solanki (R&R Administrator)',
        payload: { certifiedFamilies: 500, displacedFamilies: 84, scStFamilies: 68 },
        broadcastTargets: ['Collector Anand', 'R&R Commissioner', 'Citizen Portal']
      },
      {
        id: 'EVT-RR-003',
        type: 'RR_PUBLIC_HEARING_NOTICE_ISSUED',
        projectId: 'NLAMS-PRJ-2026-0042',
        timestamp: '18/09/2026 11:15 IST',
        actor: 'R&R Administration Desk',
        payload: { hearingDate: '12/10/2026', venue: 'Sunav Village Panchayat Hall', noticeDays: 21 },
        broadcastTargets: ['Citizen Portal', 'District Collector', 'Gram Panchayats']
      }
    ];
  }

  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    return () => {
      this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    };
  }

  publish(eventType, payload) {
    const eventObj = {
      id: `EVT-RR-${String(this.eventsHistory.length + 1).padStart(3, '0')}`,
      type: eventType,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      ...payload
    };
    this.eventsHistory.unshift(eventObj);

    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(cb => {
        try {
          cb(eventObj);
        } catch (e) {
          console.error(`Error in RREventBus listener for ${eventType}:`, e);
        }
      });
    }

    if (this.listeners['*']) {
      this.listeners['*'].forEach(cb => {
        try {
          cb(eventObj);
        } catch (e) {
          console.error('Error in RREventBus wildcard listener:', e);
        }
      });
    }

    return eventObj;
  }

  getRecentEvents(limit = 20) {
    return this.eventsHistory.slice(0, limit);
  }
}

export const rrEventBus = new RREventBus();
