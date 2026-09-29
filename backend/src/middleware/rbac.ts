import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { Logger } from '../utils/logger';

export interface RBAC3DOptions {
  requiredAction: string;
  allowedWorkspaces: string[];
}

export const verify3DRBAC = (requiredAction: string, allowedWorkspaces: string | string[]) => {
  const workspaces = Array.isArray(allowedWorkspaces) ? allowedWorkspaces : [allowedWorkspaces];

  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    const correlationId = (req.headers['x-request-id'] as string) || '';

    // =========================================================================
    // 1. Functional Dimension: Check workspace & role permissions
    // =========================================================================
    const isSuperAdmin = user.roleGroup === 'ADMIN';
    const hasWorkspaceAccess = workspaces.includes(user.roleGroup) || workspaces.includes('*');

    if (!isSuperAdmin && !hasWorkspaceAccess) {
      Logger.warn(`RBAC Functional Scope Denied: User ${user.email} (${user.roleGroup}) attempted access to ${workspaces.join('/')} [${requiredAction}]`, undefined, correlationId);
      return res.status(403).json({
        success: false,
        error: {
          code: 'SCOPE_DENIED',
          message: `Unauthorized workspace access. Requires role in: [${workspaces.join(', ')}]`,
          userRole: user.roleGroup
        }
      });
    }

    // =========================================================================
    // 2. Jurisdictional Dimension: Check District / State Boundaries
    // =========================================================================
    const reqDistrictId = req.params.districtId || req.body.districtId || req.query.districtId;
    if (!isSuperAdmin && reqDistrictId && user.districtId) {
      const parsedReqDistrictId = parseInt(reqDistrictId as string, 10);
      if (parsedReqDistrictId !== user.districtId) {
        Logger.warn(`RBAC Jurisdictional Scope Denied: User ${user.email} (District ${user.districtId}) attempted mutation on District ${parsedReqDistrictId}`, undefined, correlationId);
        return res.status(403).json({
          success: false,
          error: {
            code: 'JURISDICTION_VIOLATION',
            message: `Access denied outside assigned District jurisdiction. Assigned: ${user.districtId}, Requested: ${parsedReqDistrictId}`,
            userDistrictId: user.districtId
          }
        });
      }
    }

    // =========================================================================
    // 3. Temporal Statutory State Lock Dimension (Statutory Prerequisites)
    // =========================================================================
    const projectId = req.params.projectId || req.body.projectId || req.query.projectId;

    if (requiredAction === 'AWARD_SANCTION' && projectId) {
      try {
        const escrowCheck = await pool.query(
          `SELECT current_balance_inr, estimated_compensation_budget 
           FROM nlams.escrow_accounts ea
           JOIN nlams.form1_financials ff ON ff.project_id = ea.project_id
           WHERE ea.project_id = $1`,
          [projectId]
        );
        if (escrowCheck.rows.length) {
          const balance = parseFloat(escrowCheck.rows[0].current_balance_inr || '0');
          const budget = parseFloat(escrowCheck.rows[0].estimated_compensation_budget || '0');
          if (balance < budget) {
            return res.status(409).json({
              success: false,
              error: {
                code: 'TEMPORAL_LOCK_ACTIVE',
                message: 'Section 23 Award locked: 100% Compensation Escrow deposit required prior to award declaration',
                details: { currentBalance: balance, requiredBudget: budget }
              }
            });
          }
        }
      } catch (err: any) {
        Logger.error('Temporal lock verification query failed', err, correlationId);
      }
    }

    if (requiredAction === 'PHYSICAL_POSSESSION' && projectId) {
      try {
        const pendingDbt = await pool.query(
          `SELECT COUNT(*) AS pending_count 
           FROM nlams.escrow_transactions 
           WHERE escrow_id IN (SELECT escrow_id FROM nlams.escrow_accounts WHERE project_id = $1)
             AND txn_type = 'DISBURSEMENT'
             AND dbt_status != 'SUCCESS'`,
          [projectId]
        );
        const pendingCount = parseInt(pendingDbt.rows[0]?.pending_count || '0', 10);
        if (pendingCount > 0) {
          return res.status(409).json({
            success: false,
            error: {
              code: 'TEMPORAL_LOCK_ACTIVE',
              message: 'Section 38 Physical Possession locked: 100% of DBT compensation disbursements must be verified SUCCESS.',
              pendingDisbursements: pendingCount
            }
          });
        }
      } catch (err: any) {
        Logger.error('Temporal possession lock verification query failed', err, correlationId);
      }
    }

    next();
  };
};
