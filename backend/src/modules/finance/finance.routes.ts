import { Router } from 'express';
import { FinanceController } from './finance.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const financeRouter = Router();

financeRouter.get('/escrow-summary/:projectId', authenticateToken, FinanceController.getEscrowSummary);
financeRouter.get('/transactions/:escrowId', authenticateToken, FinanceController.getTransactions);

financeRouter.post(
  '/deposit',
  authenticateToken,
  verify3DRBAC('DEPOSIT_ESCROW', ['requiring-body', 'ADMIN']),
  FinanceController.depositFunds
);

financeRouter.post(
  '/dbt-disbursement',
  authenticateToken,
  verify3DRBAC('DISBURSE_DBT', ['district-collector', 'CALA', 'ADMIN']),
  FinanceController.disburseDbt
);

financeRouter.get('/reconciliation-report/:projectId', authenticateToken, FinanceController.getReconciliationReport);
