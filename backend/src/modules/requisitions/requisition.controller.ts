import { Request, Response } from 'express';
import { RequisitionService } from './requisition.service';
import { Logger } from '../../utils/logger';

export const RequisitionController = {
  async list(req: Request, res: Response) {
    try {
      const requisitions = await RequisitionService.listRequisitions();
      return res.json({ success: true, count: requisitions.length, data: requisitions });
    } catch (err: any) {
      Logger.error('List requisitions error', err);
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  async getById(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    try {
      const data = await RequisitionService.getRequisitionById(projectId);
      if (!data) {
        return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Project ${projectId} not found` } });
      }
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const result = await RequisitionService.createRequisition(req.body, userId);
      return res.status(201).json({ success: true, message: 'Requisition draft initialized', ...result });
    } catch (err: any) {
      Logger.error('Create requisition error', err);
      return res.status(500).json({ success: false, error: { code: 'CREATE_ERROR', message: err.message } });
    }
  },

  async saveStep(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    const stepNo = parseInt(req.params.stepNo, 10);
    try {
      const result = await RequisitionService.saveWizardStep(projectId, stepNo, req.body);
      return res.json(result);
    } catch (err: any) {
      Logger.error(`Save step ${stepNo} error`, err);
      return res.status(500).json({ success: false, error: { code: 'SAVE_STEP_ERROR', message: err.message } });
    }
  },

  async validate(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    try {
      const result = await RequisitionService.validateForm1(projectId);
      return res.json(result);
    } catch (err: any) {
      Logger.error('Validation error', err);
      return res.status(500).json({ success: false, error: { code: 'VALIDATION_ERROR', message: err.message } });
    }
  },

  async esign(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    const userId = req.user?.userId || 4;
    try {
      const result = await RequisitionService.esignForm1(projectId, userId, req.body);
      return res.json(result);
    } catch (err: any) {
      Logger.error('E-sign error', err);
      return res.status(500).json({ success: false, error: { code: 'ESIGN_ERROR', message: err.message } });
    }
  },

  async submit(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    const userId = req.user?.userId;
    try {
      const result = await RequisitionService.submitForm1(projectId, userId);
      return res.json(result);
    } catch (err: any) {
      Logger.error('Submission error', err);
      return res.status(500).json({ success: false, error: { code: 'SUBMIT_ERROR', message: err.message } });
    }
  }
};
