import { Router } from 'express';
import { CollectorController } from './collector.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const collectorRouter = Router();

// Collector Inward Proposals
collectorRouter.get(
  '/inward-proposals',
  authenticateToken,
  verify3DRBAC('VIEW_INWARD_PROPOSALS', ['district-collector', 'CALA', 'ADMIN']),
  CollectorController.getInwardProposals
);

collectorRouter.post(
  '/verify-proposal/:form1Id',
  authenticateToken,
  verify3DRBAC('VERIFY_PROPOSAL', ['district-collector', 'CALA', 'ADMIN']),
  CollectorController.verifyProposal
);

// Section 15 Objections & Hearings
collectorRouter.get(
  '/sec15-objections/:projectId',
  authenticateToken,
  verify3DRBAC('VIEW_SEC15_OBJECTIONS', ['district-collector', 'CALA', 'ADMIN']),
  CollectorController.getSec15Objections
);

collectorRouter.post(
  '/sec15-hearings',
  authenticateToken,
  verify3DRBAC('SCHEDULE_SEC15_HEARING', ['district-collector', 'CALA', 'ADMIN']),
  CollectorController.scheduleSec15Hearing
);

// Section 23 Awards & Section 38 Possession Handover
collectorRouter.post(
  '/sec23-awards',
  authenticateToken,
  verify3DRBAC('AWARD_SANCTION', ['district-collector', 'CALA', 'ADMIN']),
  CollectorController.calculateSec23Award
);

collectorRouter.post(
  '/sec38-possession',
  authenticateToken,
  verify3DRBAC('PHYSICAL_POSSESSION', ['district-collector', 'CALA', 'ADMIN']),
  CollectorController.executeSec38Possession
);
