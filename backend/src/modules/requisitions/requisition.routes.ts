import { Router } from 'express';
import { RequisitionController } from './requisition.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const requisitionRouter = Router();

// Public / Authenticated listings
requisitionRouter.get('/', RequisitionController.list);
requisitionRouter.get('/:projectId', RequisitionController.getById);

// Requiring Body mutations protected by 3D-RBAC
requisitionRouter.post(
  '/',
  authenticateToken,
  verify3DRBAC('CREATE_REQUISITION', ['requiring-body', 'ADMIN']),
  RequisitionController.create
);

requisitionRouter.put(
  '/:projectId/wizard-step/:stepNo',
  authenticateToken,
  verify3DRBAC('EDIT_WIZARD_STEP', ['requiring-body', 'ADMIN']),
  RequisitionController.saveStep
);

requisitionRouter.post(
  '/:projectId/validate',
  authenticateToken,
  verify3DRBAC('VALIDATE_FORM1', ['requiring-body', 'ADMIN']),
  RequisitionController.validate
);

requisitionRouter.post(
  '/:projectId/esign',
  authenticateToken,
  verify3DRBAC('ESIGN_FORM1', ['requiring-body', 'ADMIN']),
  RequisitionController.esign
);

requisitionRouter.post(
  '/:projectId/submit',
  authenticateToken,
  verify3DRBAC('SUBMIT_FORM1', ['requiring-body', 'ADMIN']),
  RequisitionController.submit
);
