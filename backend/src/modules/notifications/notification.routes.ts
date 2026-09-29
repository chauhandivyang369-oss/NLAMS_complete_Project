import { Router } from 'express';
import { NotificationController } from './notification.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const notificationRouter = Router();

// Test SMTP verification
notificationRouter.get('/verify', NotificationController.verifySmtp);

// Dispatch officer invitation
notificationRouter.post(
  '/invite-officer',
  authenticateToken,
  verify3DRBAC('DISPATCH_NOTIFICATION', ['requiring-body', 'ADMIN', 'central-appropriate-gov']),
  NotificationController.inviteOfficer
);

// Dispatch citizen objection acknowledgement
notificationRouter.post(
  '/citizen-objection-ack',
  authenticateToken,
  verify3DRBAC('ACK_OBJECTION', ['district-collector', 'CALA', 'ADMIN']),
  NotificationController.sendCitizenObjectionAck
);

// Process pending outbox queue
notificationRouter.post(
  '/process-outbox',
  authenticateToken,
  verify3DRBAC('PROCESS_OUTBOX', ['ADMIN', 'requiring-body', 'district-collector']),
  NotificationController.processOutbox
);
