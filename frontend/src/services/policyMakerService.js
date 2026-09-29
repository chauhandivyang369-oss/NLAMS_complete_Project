/**
 * NLAMS - Policy Maker & Executive Oversight Service Layer
 * API-ready service contracts returning simulated responses from the mock data repository.
 * Prepares the frontend for seamless transition to backend REST APIs in future development phases.
 */

import {
  POLICY_MAKER_KPIS,
  POLICY_MAKER_PROJECTS,
  MOCK_SLA_ALERTS,
  MOCK_COMMITTEE_MEETINGS,
  MOCK_DIRECTIVES,
  MOCK_BOTTLENECK,
  MOCK_BOTTLENECKS,
  MOCK_RNR_DATA,
  MOCK_EXECUTIVE_REPORTS
} from '../mock/policyMakerData.js';

export const PolicyMakerService = {
  // 01. Overview & KPIs
  getExecutiveKpis: async (scope = 'NATIONAL', scopeId = null) => {
    // In future: return axios.get(`/api/policy-maker/overview?scope=${scope}&scopeId=${scopeId}`)
    return { ...POLICY_MAKER_KPIS };
  },

  // 02. Projects Pipeline
  getProjects: async (filters = {}) => {
    // In future: return axios.get('/api/policy-maker/projects', { params: filters })
    let projects = [...POLICY_MAKER_PROJECTS];
    if (filters.state && filters.state !== 'ALL') {
      projects = projects.filter(p => p.state.includes(filters.state));
    }
    if (filters.sector && filters.sector !== 'ALL') {
      projects = projects.filter(p => p.sector === filters.sector);
    }
    if (filters.stage && filters.stage !== 'ALL') {
      projects = projects.filter(p => p.currentStage === filters.stage);
    }
    if (filters.risk && filters.risk !== 'ALL') {
      projects = projects.filter(p => p.slaRisk === filters.risk);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      projects = projects.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.districts.some(d => d.toLowerCase().includes(q))
      );
    }
    return projects;
  },

  getProjectById: async (projectId) => {
    const p = POLICY_MAKER_PROJECTS.find(item => item.id === projectId);
    return p || POLICY_MAKER_PROJECTS[0];
  },

  // 03. Lapsing Risk & SLAs
  getSlaAlerts: async () => {
    return [...MOCK_SLA_ALERTS];
  },

  // 04. Committee Meetings & MoM
  getMeetings: async (committeeType = null) => {
    if (!committeeType || committeeType === 'ALL') {
      return [...MOCK_COMMITTEE_MEETINGS];
    }
    return MOCK_COMMITTEE_MEETINGS.filter(m => m.committeeType === committeeType);
  },

  getMeetingById: async (meetingId) => {
    return MOCK_COMMITTEE_MEETINGS.find(m => m.id === meetingId) || MOCK_COMMITTEE_MEETINGS[0];
  },

  getDirectives: async () => {
    return [...MOCK_DIRECTIVES];
  },

  // 05. Bottlenecks
  getBottlenecks: async () => {
    return [...MOCK_BOTTLENECKS];
  },

  // 06. R&R Oversight & Social Audit
  getRnRData: async () => {
    return { ...MOCK_RNR_DATA };
  },

  // 07. Executive Reports
  getExecutiveReports: async () => {
    return [...MOCK_EXECUTIVE_REPORTS];
  }
};
