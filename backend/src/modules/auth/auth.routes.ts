import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.get('/me', authenticateToken, AuthController.me);
authRouter.post('/seed', AuthController.seed);

// 3D-RBAC Verification Test Endpoints
authRouter.get(
  '/test-rbac/functional-central-only',
  authenticateToken,
  verify3DRBAC('CENTRAL_NOTIFY', 'central-appropriate-gov'),
  (req, res) => {
    res.json({ success: true, message: 'Functional dimension verified: Central Govt access granted' });
  }
);

authRouter.post(
  '/test-rbac/jurisdiction/:districtId',
  authenticateToken,
  verify3DRBAC('COLLECTOR_MUTATE', ['district-collector', 'CALA']),
  (req, res) => {
    res.json({ success: true, message: `Jurisdictional dimension verified: District ${req.params.districtId} access granted` });
  }
);

authRouter.post(
  '/test-rbac/temporal-award/:projectId',
  authenticateToken,
  verify3DRBAC('AWARD_SANCTION', ['district-collector', 'ADMIN']),
  (req, res) => {
    res.json({ success: true, message: `Temporal dimension passed: Award sanction unlocked for project ${req.params.projectId}` });
  }
);
