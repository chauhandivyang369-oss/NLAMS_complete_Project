/**
 * NLAMS - Frontend Service Layer (Abstracted API Client)
 */

import { MOCK_PROJECTS, MOCK_PARCELS, MOCK_OBJECTIONS, MOCK_RNR_FAMILIES } from '../mock/requisitions.js';

export const RequisitionService = {
  async getRequisitions() {
    return Promise.resolve(MOCK_PROJECTS);
  },

  async getParcelsByProject(projectId) {
    return Promise.resolve(MOCK_PARCELS);
  },

  async getObjectionsByProject(projectId) {
    return Promise.resolve(MOCK_OBJECTIONS);
  },

  async getRnrCensus(projectId) {
    return Promise.resolve(MOCK_RNR_FAMILIES);
  }
};
