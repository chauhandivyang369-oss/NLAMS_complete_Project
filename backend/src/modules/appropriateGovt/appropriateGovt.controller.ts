import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';
import { NotificationService } from '../notifications/notification.service';

export const AppropriateGovtController = {
  /**
   * GET /api/v1/appropriate-govt/proposals
   */
  async getProposals(req: Request, res: Response) {
    try {
      const result = await pool.query(
        `SELECT p.*, f.government_level, f.workflow_status, f.estimated_total_compensation_budget
         FROM nlams.projects p
         JOIN nlams.form1_requisitions f ON f.project_id = p.project_id
         ORDER BY p.updated_at DESC`
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/appropriate-govt/sec11-notification
   * Issue and broadcast Section 11 Preliminary Notification
   */
  async issueSec11Notification(req: Request, res: Response) {
    const { projectId, gazetteNo, issueDate, contentText } = req.body;
    try {
      const gNo = gazetteNo || `GAZ-SEC11-${projectId}-${Date.now().toString().slice(-4)}`;
      const result = await pool.query(
        `INSERT INTO nlams.statutory_gazette_notifications (
          project_id, notification_type, notification_number, section_reference,
          title, summary, issue_date, publication_date, gazette_issue_number,
          public_url, status, created_by
        ) VALUES ($1, 'SECTION_11_PRELIMINARY', $2, 'Section 11(1)', $3, $4, $5, $5, $2, $6, 'PUBLISHED', $7)
        RETURNING *`,
        [
          projectId,
          gNo,
          'Preliminary Notification under Section 11',
          contentText || 'Preliminary notification under Section 11(1) of RFCTLARR Act 2013',
          issueDate || new Date(),
          `https://egazette.gov.in/view/${gNo}`,
          req.user?.userId || null
        ]
      );

      return res.json({ success: true, message: 'Section 11 Preliminary Notification gazetted', data: result.rows[0] });
    } catch (err: any) {
      Logger.error('Sec 11 issue error', err);
      return res.status(500).json({ success: false, error: { code: 'NOTIFY_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/appropriate-govt/sec19-declaration
   * Issue Section 19 Declaration after SIA & R&R
   */
  async issueSec19Declaration(req: Request, res: Response) {
    const { projectId, gazetteNo, contentText } = req.body;
    try {
      const gNo = gazetteNo || `GAZ-SEC19-${projectId}-${Date.now().toString().slice(-4)}`;
      const result = await pool.query(
        `INSERT INTO nlams.statutory_gazette_notifications (
          project_id, notification_type, notification_number, section_reference,
          title, summary, issue_date, publication_date, gazette_issue_number,
          public_url, status, created_by
        ) VALUES ($1, 'SECTION_19_DECLARATION', $2, 'Section 19(1)', $3, $4, CURRENT_DATE, CURRENT_DATE, $2, $5, 'PUBLISHED', $6)
        RETURNING *`,
        [
          projectId,
          gNo,
          'Declaration under Section 19',
          contentText || 'Declaration under Section 19(1) of RFCTLARR Act 2013 post SIA/R&R approval',
          `https://egazette.gov.in/view/${gNo}`,
          req.user?.userId || null
        ]
      );

      return res.json({ success: true, message: 'Section 19 Declaration gazetted', data: result.rows[0] });
    } catch (err: any) {
      Logger.error('Sec 19 declaration error', err);
      return res.status(500).json({ success: false, error: { code: 'DECLARATION_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/appropriate-govt/statutory-timers/:projectId
   */
  async getStatutoryTimers(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    try {
      const notifications = await pool.query(
        `SELECT * FROM nlams.statutory_gazette_notifications WHERE project_id = $1 ORDER BY issue_date ASC`,
        [projectId]
      );

      const sec11 = notifications.rows.find(n => n.notification_type === 'SECTION_11_PRELIMINARY');
      let daysRemainingSec19 = 365;
      if (sec11) {
        const elapsed = (Date.now() - new Date(sec11.issue_date).getTime()) / (1000 * 3600 * 24);
        daysRemainingSec19 = Math.max(0, Math.round(365 - elapsed));
      }

      return res.json({
        success: true,
        projectId,
        statutoryTimers: {
          section11Published: !!sec11,
          section11Date: sec11?.issue_date || null,
          section19StatutoryDeadlineDays: daysRemainingSec19,
          deemedLapseWarning: daysRemainingSec19 < 60
        },
        notifications: notifications.rows
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'TIMER_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/appropriate-govt/rbac-provision
   */
  async provisionRbac(req: Request, res: Response) {
    const payload = req.body;
    const {
      category,
      subCategory,
      committeeType,
      role,
      memberName,
      department,
      designation,
      email,
      mobile,
      members = [],
      gazetteOrderNo,
      projectId,
      projectName,
      menuAccess = {},
      grantedMenus = [],
      jurisdictionType = 'CENTRAL'
    } = payload;

    if (!category) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_PAYLOAD', message: 'Category is required' } });
    }

    try {
      // Normalize grantedMenus to robust array of string keys
      let normalizedGrantedMenus: string[] = [];
      const rawGranted = (Array.isArray(grantedMenus) && grantedMenus.length > 0)
        ? grantedMenus
        : (Array.isArray(payload.allowedMenus) && payload.allowedMenus.length > 0)
          ? payload.allowedMenus
          : [];

      if (rawGranted.length > 0) {
        normalizedGrantedMenus = rawGranted.map((m: any) => typeof m === 'string' ? m : (m?.key || m?.id || String(m)));
      } else if (menuAccess && typeof menuAccess === 'object') {
        normalizedGrantedMenus = Object.entries(menuAccess)
          .filter(([_, val]) => val === 'VIEW' || val === 'EDIT' || val === true)
          .map(([key]) => key);
      }

      const assignmentCode = `RBAC-${category}-${Date.now().toString().slice(-6)}`;
      const memberList = members.length > 0 ? members : [{
        name: memberName || designation || 'Statutory Member',
        email: email || `officer.${Date.now().toString().slice(-4)}@nlams.gov.in`,
        phone: mobile || '0000000000',
        role: role || designation || 'MEMBER',
        loginId: email || `officer.${Date.now().toString().slice(-4)}@nlams.gov.in`,
        password: payload.temporaryPassword || `NLAMS#${Math.floor(1000 + Math.random() * 9000)}X`
      }];

      const processedMembers: any[] = [];
      const emailDispatches: any[] = [];

      for (const m of memberList) {
        const tempPassword = m.password || `NLAMS#${Math.floor(1000 + Math.random() * 9000)}Z`;
        const memberEmail = (m.email || '').toLowerCase().trim();
        const memberName = m.name || designation || 'Statutory Officer';
        const memberPhone = m.phone || mobile || null;
        const memberRoleGroup = role || category || 'COMMITTEE_MEMBER';
        const memberDesignation = designation || m.role || 'Commissioned Officer';

        if (memberEmail) {
          // 1. Hash password & upsert user in nlams.users
          const hash = await bcrypt.hash(tempPassword, 10);
          const userCheck = await pool.query('SELECT user_id FROM nlams.users WHERE LOWER(email) = $1', [memberEmail]);
          let userId: string;

          if (userCheck.rows.length > 0) {
            userId = userCheck.rows[0].user_id;
            await pool.query(
              `UPDATE nlams.users 
               SET password_hash = $1, role_group = $2, designation = $3, status = 'ACTIVE'
               WHERE user_id = $4`,
              [hash, memberRoleGroup, memberDesignation, userId]
            );
          } else {
            const insertUser = await pool.query(
              `INSERT INTO nlams.users (
                full_name, email, mobile, password_hash, role_group, designation, status, username
              ) VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVE', $2)
              RETURNING user_id`,
              [memberName, memberEmail, memberPhone, hash, memberRoleGroup, memberDesignation]
            );
            userId = insertUser.rows[0].user_id;
          }

          // 2. Dispatch credentials to Gmail via Nodemailer
          try {
            const emailResult = await NotificationService.sendRbacCredentialsEmail({
              email: memberEmail,
              officerName: memberName,
              roleGroup: memberRoleGroup,
              designation: memberDesignation,
              department,
              temporaryPassword: tempPassword,
              loginUsername: memberEmail,
              grantedMenus: normalizedGrantedMenus,
              projectName,
              gazetteOrderNo,
              jurisdictionType
            });
            emailDispatches.push({ email: memberEmail, success: true, messageId: emailResult.messageId, previewUrl: emailResult.previewUrl });
          } catch (mailErr: any) {
            Logger.warn(`Failed to dispatch email to ${memberEmail}: ${mailErr.message}`);
            emailDispatches.push({ email: memberEmail, success: false, error: mailErr.message });
          }
        }

        processedMembers.push({
          ...m,
          password: tempPassword,
          loginId: memberEmail,
          provisioned: true
        });
      }

      // 3. Store assignment in nlams.rbac_assignments
      const insertAssignment = await pool.query(
        `INSERT INTO nlams.rbac_assignments (
          assignment_code, category, sub_category, committee_type, role,
          member_name, department, designation, email, mobile,
          members, gazette_order_no, project_id, project_name,
          menu_access, granted_menus, temporary_password, login_username,
          dispatch_status, status, jurisdiction_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING *`,
        [
          assignmentCode,
          category,
          subCategory || null,
          committeeType || null,
          role || null,
          memberName || memberList[0]?.name,
          department || null,
          designation || null,
          email || memberList[0]?.email,
          mobile || memberList[0]?.phone,
          JSON.stringify(processedMembers),
          gazetteOrderNo || null,
          projectId || null,
          projectName || null,
          JSON.stringify(menuAccess),
          JSON.stringify(normalizedGrantedMenus),
          memberList[0]?.password || 'NLAMS#Auto123',
          memberList[0]?.email,
          'DISPATCHED_TO_GMAIL',
          'PROVISIONED',
          jurisdictionType
        ]
      );

      return res.json({
        success: true,
        message: `RBAC access successfully granted and credentials dispatched to ${emailDispatches.length} officer(s)`,
        data: insertAssignment.rows[0],
        emailDispatches
      });
    } catch (err: any) {
      Logger.error('RBAC provision error', err);
      return res.status(500).json({ success: false, error: { code: 'PROVISION_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/appropriate-govt/rbac-assignments
   */
  async getRbacAssignments(req: Request, res: Response) {
    const { jurisdictionType, category } = req.query;
    try {
      let query = `SELECT * FROM nlams.rbac_assignments WHERE 1=1`;
      const params: any[] = [];

      if (jurisdictionType && jurisdictionType !== 'ALL') {
        params.push(jurisdictionType);
        query += ` AND jurisdiction_type = $${params.length}`;
      }
      if (category && category !== 'ALL') {
        params.push(category);
        query += ` AND category = $${params.length}`;
      }

      query += ` ORDER BY created_at DESC`;
      const result = await pool.query(query, params);

      return res.json({
        success: true,
        count: result.rows.length,
        data: result.rows.map(r => ({
          id: r.assignment_code || `RBAC-${r.assignment_id}`,
          assignmentId: r.assignment_id,
          category: r.category,
          subCategory: r.sub_category,
          committeeType: r.committee_type,
          role: r.role,
          memberName: r.member_name,
          department: r.department,
          designation: r.designation,
          email: r.email,
          mobile: r.mobile,
          members: r.members || [],
          gazetteOrderNo: r.gazette_order_no,
          projectId: r.project_id,
          projectName: r.project_name,
          menuAccess: r.menu_access || {},
          grantedMenus: r.granted_menus || [],
          temporaryPassword: r.temporary_password,
          loginUsername: r.login_username,
          dispatchStatus: r.dispatch_status,
          status: r.status,
          provisionedAt: r.created_at ? new Date(r.created_at).toISOString().split('T')[0] : null,
          jurisdictionType: r.jurisdiction_type
        }))
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  }
};
