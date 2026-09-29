import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../config/db';
import { config } from '../../config/env';
import { seedStatutoryUsers } from './seedUsers';
import { Logger } from '../../utils/logger';

export const AuthController = {
  async login(req: Request, res: Response) {
    const { email, username, password } = req.body;
    const identifier = (email || username || '').toLowerCase().trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Email/username and password are required' }
      });
    }

    try {
      // Find user by email or by username match in email prefix
      const userRes = await pool.query(
        `SELECT user_id, full_name, email, mobile, password_hash, role_group, designation, state_id, district_id, status
         FROM nlams.users 
         WHERE LOWER(email) = $1 OR LOWER(email) LIKE $2
         LIMIT 1`,
        [identifier, `${identifier}@%`]
      );

      if (!userRes.rows.length) {
        return res.status(401).json({
          success: false,
          error: { code: 'AUTH_FAILED', message: 'Invalid credentials or user not registered' }
        });
      }

      const user = userRes.rows[0];

      if (user.status !== 'ACTIVE') {
        return res.status(403).json({
          success: false,
          error: { code: 'ACCOUNT_INACTIVE', message: `User account status is ${user.status}` }
        });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: { code: 'AUTH_FAILED', message: 'Invalid email or password' }
        });
      }

      // Generate JWT
      const payload = {
        userId: parseInt(user.user_id, 10),
        email: user.email,
        fullName: user.full_name,
        roleGroup: user.role_group,
        designation: user.designation,
        stateId: user.state_id ? parseInt(user.state_id, 10) : null,
        districtId: user.district_id ? parseInt(user.district_id, 10) : null,
      };

      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });

      // Check for delegated RBAC assignment in nlams.rbac_assignments
      const rbacRes = await pool.query(
        `SELECT * FROM nlams.rbac_assignments 
         WHERE LOWER(email) = $1 
            OR members::text ILIKE $2
         ORDER BY created_at DESC 
         LIMIT 1`,
        [user.email.toLowerCase(), `%${user.email.toLowerCase()}%`]
      );

      const rbacRecord = rbacRes.rows[0] || null;
      let grantedMenus: string[] = [];
      let category: string | null = null;
      let committeeType: string | null = null;
      let projectName: string | null = null;
      let gazetteOrderNo: string | null = null;
      let targetWorkspace = 'delegated-workspace';

      if (rbacRecord) {
        category = rbacRecord.category;
        committeeType = rbacRecord.committee_type || rbacRecord.sub_category;
        projectName = rbacRecord.project_name;
        gazetteOrderNo = rbacRecord.gazette_order_no;
        
        if (Array.isArray(rbacRecord.granted_menus) && rbacRecord.granted_menus.length > 0) {
          grantedMenus = rbacRecord.granted_menus;
        } else if (rbacRecord.menu_access && typeof rbacRecord.menu_access === 'object') {
          grantedMenus = Object.keys(rbacRecord.menu_access).filter(k => rbacRecord.menu_access[k]);
        }
      } else {
        // Fallback for pre-seeded statutory accounts
        const rg = (user.role_group || '').toUpperCase();
        if (rg.includes('COLLECTOR') || rg.includes('CALA') || rg.includes('DISTRICT')) {
          targetWorkspace = 'district-collector';
        } else if (rg.includes('CENTRAL')) {
          targetWorkspace = 'central-appropriate-gov';
        } else if (rg.includes('STATE')) {
          targetWorkspace = 'state-appropriate-gov';
        } else if (rg.includes('REQUIRING') || rg.includes('PIA') || rg.includes('DFCCIL') || rg.includes('NHAI')) {
          targetWorkspace = 'requiring-body';
        } else if (rg.includes('SIA') || rg.includes('IEG')) {
          targetWorkspace = 'sia-ieg';
        } else if (rg.includes('LARR') || rg.includes('TRIBUNAL') || rg.includes('JUDICIAL')) {
          targetWorkspace = 'larr-authority';
        } else if (rg.includes('RNR') || rg.includes('RR') || rg.includes('REHABILITATION') || rg.includes('RESETTLEMENT')) {
          targetWorkspace = 'rr-authority';
        } else if (rg.includes('POLICY') || rg.includes('NITI') || rg.includes('EXECUTIVE')) {
          targetWorkspace = 'policy-maker';
        } else {
          targetWorkspace = 'citizen';
        }
      }

      return res.json({
        success: true,
        token,
        user: {
          id: user.user_id,
          fullName: user.full_name,
          email: user.email,
          mobile: user.mobile,
          roleGroup: user.role_group,
          designation: user.designation,
          stateId: user.state_id,
          districtId: user.district_id,
          status: user.status,
          grantedMenus,
          category,
          committeeType,
          projectName,
          gazetteOrderNo,
          primaryWorkspace: rbacRecord ? 'delegated-workspace' : targetWorkspace
        }
      });
    } catch (err: any) {
      Logger.error('Login error', err);
      return res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message }
      });
    }
  },

  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    try {
      const userRes = await pool.query(
        `SELECT u.user_id, u.full_name, u.email, u.mobile, u.role_group, u.designation, 
                u.state_id, s.state_name, u.district_id, d.district_name, u.status
         FROM nlams.users u
         LEFT JOIN nlams.states s ON s.state_id = u.state_id
         LEFT JOIN nlams.districts d ON d.district_id = u.district_id
         WHERE u.user_id = $1`,
        [req.user.userId]
      );

      if (!userRes.rows.length) {
        return res.status(404).json({
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'User record not found' }
        });
      }

      const user = userRes.rows[0];
      return res.json({
        success: true,
        user: {
          id: user.user_id,
          fullName: user.full_name,
          email: user.email,
          mobile: user.mobile,
          roleGroup: user.role_group,
          designation: user.designation,
          stateId: user.state_id,
          stateName: user.state_name,
          districtId: user.district_id,
          districtName: user.district_name,
          status: user.status
        }
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message }
      });
    }
  },

  async seed(_req: Request, res: Response) {
    try {
      await seedStatutoryUsers();
      return res.json({
        success: true,
        message: 'Statutory users successfully seeded for all 8 workspaces and citizen category'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: { code: 'SEED_ERROR', message: err.message }
      });
    }
  }
};
