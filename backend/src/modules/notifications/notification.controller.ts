import { Request, Response } from 'express';
import { NotificationService } from './notification.service';
import { Logger } from '../../utils/logger';

export const NotificationController = {
  async inviteOfficer(req: Request, res: Response) {
    const { email, officerName, roleGroup, designation, projectTitle } = req.body;
    if (!email || !officerName) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_PAYLOAD', message: 'Email and officer name required' } });
    }

    try {
      const result = await NotificationService.sendOfficerInvitation({
        email,
        officerName,
        roleGroup: roleGroup || 'Master District Collector',
        designation: designation || 'District Collector & CALA',
        projectTitle
      });

      return res.json({ success: true, message: 'Officer invitation email dispatched', ...result });
    } catch (err: any) {
      Logger.error('Officer invite dispatch error', err);
      return res.status(500).json({ success: false, error: { code: 'DISPATCH_ERROR', message: err.message } });
    }
  },

  async sendCitizenObjectionAck(req: Request, res: Response) {
    const { email, claimantName, objectionId, ulpin, hearingDate, groundCategory } = req.body;
    if (!email || !claimantName || !ulpin) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_PAYLOAD', message: 'Email, claimant name, and ulpin required' } });
    }

    try {
      const result = await NotificationService.sendCitizenObjectionAck({
        email,
        claimantName,
        objectionId: objectionId || Date.now().toString().slice(-4),
        ulpin,
        hearingDate,
        groundCategory: groundCategory || 'Compensation Rate Discrepancy'
      });

      return res.json({ success: true, message: 'Citizen objection acknowledgement email dispatched', ...result });
    } catch (err: any) {
      Logger.error('Citizen objection ack dispatch error', err);
      return res.status(500).json({ success: false, error: { code: 'DISPATCH_ERROR', message: err.message } });
    }
  },

  async processOutbox(_req: Request, res: Response) {
    try {
      const result = await NotificationService.processOutboxEvents();
      return res.json({ success: true, ...result });
    } catch (err: any) {
      Logger.error('Outbox process error', err);
      return res.status(500).json({ success: false, error: { code: 'OUTBOX_ERROR', message: err.message } });
    }
  },

  async verifySmtp(_req: Request, res: Response) {
    try {
      const isConnected = await NotificationService.verifyConnection();
      return res.json({ success: isConnected, status: isConnected ? 'CONNECTED' : 'DISCONNECTED' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'SMTP_ERROR', message: err.message } });
    }
  }
};
