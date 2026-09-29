import { Router } from 'express';
import { AppropriateGovtController } from './appropriateGovt.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const appropriateGovtRouter = Router();

appropriateGovtRouter.get(
  '/proposals',
  authenticateToken,
  verify3DRBAC('VIEW_GOVT_PROPOSALS', ['central-appropriate-gov', 'state-appropriate-gov', 'ADMIN']),
  AppropriateGovtController.getProposals
);

appropriateGovtRouter.post(
  '/sec11-notification',
  authenticateToken,
  verify3DRBAC('ISSUE_SEC11_NOTIFICATION', ['central-appropriate-gov', 'state-appropriate-gov', 'ADMIN']),
  AppropriateGovtController.issueSec11Notification
);

appropriateGovtRouter.post(
  '/sec19-declaration',
  authenticateToken,
  verify3DRBAC('ISSUE_SEC19_DECLARATION', ['central-appropriate-gov', 'state-appropriate-gov', 'ADMIN']),
  AppropriateGovtController.issueSec19Declaration
);

appropriateGovtRouter.get(
  '/statutory-timers/:projectId',
  authenticateToken,
  AppropriateGovtController.getStatutoryTimers
);

// RBAC Downstream Provisioning & Credentials Dispatch
appropriateGovtRouter.post(
  '/rbac-provision',
  AppropriateGovtController.provisionRbac
);

appropriateGovtRouter.get(
  '/rbac-assignments',
  AppropriateGovtController.getRbacAssignments
);

