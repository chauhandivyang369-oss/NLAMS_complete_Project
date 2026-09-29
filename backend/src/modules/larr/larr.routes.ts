import { Router } from 'express';
import { LarrController } from './larr.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const larrRouter = Router();

larrRouter.get('/cases', authenticateToken, LarrController.getCases);

larrRouter.post(
  '/digital-summons',
  authenticateToken,
  verify3DRBAC('ISSUE_SUMMONS', ['larr-authority', 'ADMIN']),
  LarrController.issueDigitalSummons
);

larrRouter.post(
  '/sec69-award',
  authenticateToken,
  verify3DRBAC('PRONOUNCE_JUDGMENT', ['larr-authority', 'ADMIN']),
  LarrController.awardSec69Judicial
);

larrRouter.get('/virtual-courtroom/:caseId', authenticateToken, LarrController.getVirtualCourtroom);
