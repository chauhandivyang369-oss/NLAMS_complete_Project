import { Router } from 'express';
import { RnrController } from './rnr.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const rnrRouter = Router();

rnrRouter.get('/affected-families/:projectId', authenticateToken, RnrController.getAffectedFamilies);

rnrRouter.post(
  '/scheme-draft',
  authenticateToken,
  verify3DRBAC('DRAFT_RNR_SCHEME', ['rr-authority', 'ADMIN']),
  RnrController.draftScheme
);

rnrRouter.post(
  '/commissioner-approval',
  authenticateToken,
  verify3DRBAC('APPROVE_RNR_SCHEME', ['rr-authority', 'ADMIN']),
  RnrController.approveScheme
);

rnrRouter.post(
  '/allotment-entitlements',
  authenticateToken,
  verify3DRBAC('ALLOCATE_ENTITLEMENTS', ['rr-authority', 'ADMIN']),
  RnrController.allocateEntitlements
);
