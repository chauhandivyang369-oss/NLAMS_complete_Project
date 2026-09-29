import {
  DEMO_CITIZENS,
  MOCK_PROJECTS,
  MOCK_NOTIFICATIONS,
  MOCK_OBJECTIONS,
  MOCK_SURVEY_VALUATION,
  MOCK_COMPENSATION_CALCULATION,
  MOCK_RNR_ENTITLEMENTS,
  MOCK_PAYMENT_LEDGER,
  MOCK_ANNUITY_PENSION,
  MOCK_LARR_REFERENCE
} from './citizenMockData.js';

class CitizenService {
  constructor() {
    this.currentCitizenId = 'citizenA';
    this.objections = [...MOCK_OBJECTIONS];
    this.notifications = [...MOCK_NOTIFICATIONS];
  }

  setCitizen(citizenKey) {
    if (DEMO_CITIZENS[citizenKey]) {
      this.currentCitizenId = citizenKey;
    }
  }

  getCurrentCitizen() {
    return DEMO_CITIZENS[this.currentCitizenId] || DEMO_CITIZENS.citizenA;
  }

  async getProjects() {
    const citizen = this.getCurrentCitizen();
    return MOCK_PROJECTS.filter(p => citizen.linkedProjectIds.includes(p.id));
  }

  async getProjectById(projectId) {
    return MOCK_PROJECTS.find(p => p.id === projectId) || null;
  }

  async getParcels() {
    const citizen = this.getCurrentCitizen();
    return citizen.linkedParcels;
  }

  async getParcelByUlpin(ulpin) {
    const citizen = this.getCurrentCitizen();
    return citizen.linkedParcels.find(p => p.ulpin === ulpin) || null;
  }

  async getNotifications(filters = {}) {
    let result = [...this.notifications];
    if (filters.projectId) {
      result = result.filter(n => n.projectId === filters.projectId);
    }
    if (filters.type && filters.type !== 'ALL') {
      result = result.filter(n => n.type === filters.type);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.notificationNo.toLowerCase().includes(q) ||
        n.section.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async markNotificationRead(notifId) {
    this.notifications = this.notifications.map(n =>
      n.id === notifId ? { ...n, isUnread: false } : n
    );
    return true;
  }

  async getObjections(projectId = null) {
    if (projectId) {
      return this.objections.filter(o => o.projectId === projectId);
    }
    return this.objections;
  }

  async submitObjection(data) {
    const newId = `OBJ-${new Date().getFullYear()}-ANAND-${Math.floor(10000 + Math.random() * 90000)}`;
    const newObjection = {
      id: newId,
      projectId: data.projectId,
      ulpin: data.ulpin,
      surveyNo: data.surveyNo,
      applicantName: data.applicantName,
      mobile: data.mobile,
      email: data.email,
      submissionDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      grounds: data.grounds || [],
      detailedStatement: data.detailedStatement || '',
      attachedDocuments: data.documents || [],
      status: 'SUBMITTED',
      statusBadge: 'Received by CALA Scrutiny Cell',
      currentStep: 1,
      timeline: [
        {
          step: 1,
          title: 'Objection Submitted Online',
          date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
          authority: 'Citizen Transparency Portal',
          remarks: `Acknowledgement Receipt ${newId} generated`
        },
        {
          step: 2,
          title: 'CALA Inward Registration',
          date: 'Pending Verification',
          authority: 'Collectorate Scrutiny Cell',
          remarks: 'Awaiting SLAO docket verification'
        },
        {
          step: 3,
          title: 'LAO & Revenue Circle Scrutiny',
          date: 'Pending',
          authority: 'Special Land Acquisition Officer (SLAO)',
          remarks: 'Under legal examination under Sec 15(1)'
        },
        {
          step: 4,
          title: 'Statutory Public Hearing Notice',
          date: 'Pending',
          authority: 'District Collector & CALA',
          remarks: 'Date and venue will be intimated via SMS/Email'
        },
        {
          step: 5,
          title: 'Collector Recommendation / Final Order',
          date: 'Pending',
          authority: 'District Collector',
          remarks: 'Final order under Section 15(2)'
        }
      ]
    };
    this.objections = [newObjection, ...this.objections];
    return newObjection;
  }

  async getSurveyValuation(projectId, ulpin) {
    return MOCK_SURVEY_VALUATION;
  }

  async getCompensationDetails(projectId, ulpin) {
    return MOCK_COMPENSATION_CALCULATION;
  }

  async submitClaim(claimData) {
    return {
      success: true,
      claimId: `CLM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString()
    };
  }

  async getRnREntitlements(projectId) {
    return MOCK_RNR_ENTITLEMENTS;
  }

  async getPaymentLedger() {
    return MOCK_PAYMENT_LEDGER;
  }

  async getAnnuityLedger() {
    return MOCK_ANNUITY_PENSION;
  }

  async getLarrReference() {
    return MOCK_LARR_REFERENCE;
  }
}

export const citizenService = new CitizenService();
export default citizenService;
