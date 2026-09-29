import nodemailer from 'nodemailer';
import { config } from '../../config/env';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const NotificationService = {
  /**
   * Verify SMTP Transporter Connectivity
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await transporter.verify();
      Logger.info('Nodemailer SMTP transporter connected successfully to ' + config.smtp.host);
      return true;
    } catch (err: any) {
      Logger.warn(`SMTP transporter connection verification warning: ${err.message}`);
      return false;
    }
  },

  /**
   * Send Official Officer Invitation / Onboarding Email
   */
  async sendOfficerInvitation(data: {
    email: string;
    officerName: string;
    roleGroup: string;
    designation: string;
    projectTitle?: string;
  }) {
    const { email, officerName, roleGroup, designation, projectTitle } = data;
    const loginUrl = `${config.frontendUrl}/login`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="background-color: #0f172a; padding: 15px; border-radius: 6px; text-align: center; color: white;">
          <h2 style="margin: 0;">National Land Acquisition & Management System (NLAMS)</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #94a3b8;">Department of Land Resources (DoLR), Government of India</p>
        </div>
        <div style="padding: 20px 0;">
          <p>Dear <strong>${officerName}</strong>,</p>
          <p>You have been officially commissioned onto the NLAMS platform with designated statutory authority:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr><td style="padding: 6px; color: #64748b;">Designation:</td><td style="padding: 6px; font-weight: bold;">${designation}</td></tr>
            <tr><td style="padding: 6px; color: #64748b;">Statutory Role:</td><td style="padding: 6px; font-weight: bold;">${roleGroup}</td></tr>
            ${projectTitle ? `<tr><td style="padding: 6px; color: #64748b;">Assigned Corridor:</td><td style="padding: 6px; font-weight: bold;">${projectTitle}</td></tr>` : ''}
          </table>
          <p>Please access your official statutory workspace to review land acquisition portfolios, cadastral survey maps, and pending inquiries.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${loginUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Access NLAMS Workspace</a>
          </div>
          <p style="font-size: 12px; color: #94a3b8;">This is a system generated statutory communication under the RFCTLARR Act 2013.</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: config.smtp.from,
      to: email,
      subject: `[NLAMS Statutory Notification] Official Commissioning: ${designation}`,
      html
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || null;
    Logger.info(`Officer invitation sent to ${email} (MessageId: ${info.messageId})`);

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      previewUrl
    };
  },

  /**
   * Send RBAC Statutory Credentials & Granted Menus Email
   */
  async sendRbacCredentialsEmail(data: {
    email: string;
    officerName: string;
    roleGroup: string;
    designation: string;
    department?: string;
    temporaryPassword: string;
    loginUsername: string;
    grantedMenus?: string[];
    projectName?: string;
    gazetteOrderNo?: string;
    jurisdictionType?: string;
  }) {
    const { 
      email, 
      officerName, 
      roleGroup, 
      designation, 
      department,
      temporaryPassword, 
      loginUsername, 
      grantedMenus = [], 
      projectName, 
      gazetteOrderNo,
      jurisdictionType = 'CENTRAL'
    } = data;
    const loginUrl = `${config.frontendUrl}/?login=true&email=${encodeURIComponent(loginUsername || email)}`;

    const menuListHtml = grantedMenus.length 
      ? grantedMenus.map(m => `<li style="padding: 3px 0; color: #1e293b; font-size: 13px;">✔ ${m.replace(/-/g, ' ').toUpperCase()}</li>`).join('')
      : '<li style="color: #64748b; font-size: 13px;">Standard Role-Based Access</li>';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 24px; border: 1px solid #cbd5e1; border-radius: 10px; background-color: #ffffff;">
        <div style="background-color: #0b1325; padding: 18px; border-radius: 8px; text-align: center; color: white;">
          <h2 style="margin: 0; color: #f8fafc; font-size: 20px;">National Land Acquisition & Management System (NLAMS)</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #e2e8f0;">
            ${jurisdictionType === 'CENTRAL' ? 'Central Appropriate Government' : 'State Appropriate Government'} • Department of Land Resources (DoLR)
          </p>
        </div>

        <div style="padding: 24px 0;">
          <p style="font-size: 15px; color: #0f172a;">Dear <strong>${officerName}</strong>,</p>
          <p style="font-size: 14px; color: #334155; line-height: 1.5;">
            You have been officially commissioned onto the <strong>NLAMS Statutory Governance Platform</strong> under the provisions of the <strong>RFCTLARR Act, 2013</strong>. Your official workspace access and statutory permissions have been configured:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background-color: #f8fafc; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
            <tr><td style="padding: 10px 14px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Statutory Role / Body:</td><td style="padding: 10px 14px; font-weight: bold; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${roleGroup}</td></tr>
            <tr><td style="padding: 10px 14px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Designation:</td><td style="padding: 10px 14px; font-weight: bold; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${designation}</td></tr>
            ${department ? `<tr><td style="padding: 10px 14px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Department / Ministry:</td><td style="padding: 10px 14px; font-weight: bold; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${department}</td></tr>` : ''}
            ${gazetteOrderNo ? `<tr><td style="padding: 10px 14px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Gazette Notification Order:</td><td style="padding: 10px 14px; font-weight: bold; font-size: 13px; color: #b45309; border-bottom: 1px solid #e2e8f0;">${gazetteOrderNo}</td></tr>` : ''}
            ${projectName ? `<tr><td style="padding: 10px 14px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Assigned Project / Corridor:</td><td style="padding: 10px 14px; font-weight: bold; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${projectName}</td></tr>` : ''}
          </table>

          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 18px 0;">
            <h4 style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">🔐 Official Login Credentials</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 4px 0; color: #475569; font-size: 13px;">Login Username / Email:</td><td style="padding: 4px 0; font-family: monospace; font-weight: bold; font-size: 14px; color: #0f172a;">${loginUsername}</td></tr>
              <tr><td style="padding: 4px 0; color: #475569; font-size: 13px;">Temporary Password:</td><td style="padding: 4px 0; font-family: monospace; font-weight: bold; font-size: 14px; color: #2563eb;">${temporaryPassword}</td></tr>
            </table>
            <p style="margin: 10px 0 0 0; font-size: 11px; color: #64748b;">Please change your password immediately upon first login. Do not share your statutory credentials.</p>
          </div>

          <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
            <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase;">📋 Authorized Statutory Menus & Workspaces</h4>
            <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
              ${menuListHtml}
            </ul>
          </div>

          <div style="text-align: center; margin: 26px 0;">
            <a href="${loginUrl}" style="background-color: #1b365d; color: #ffffff; padding: 13px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              Access NLAMS Official Portal
            </a>
          </div>

          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            This is an official statutory communication issued under Section 3 & Section 15 of RFCTLARR Act, 2013.<br/>
            Government of India • Ministry of Rural Development • NLAMS Portal
          </p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: config.smtp.from,
      to: email,
      subject: `[NLAMS Official Credentials] Statutory Workspace Commissioning: ${designation || roleGroup}`,
      html
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || null;
    Logger.info(`RBAC credentials email sent to ${email} (MessageId: ${info.messageId})`);

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      previewUrl
    };
  },

  /**
   * Send Citizen Section 15 Objection Acknowledgement Email
   */
  async sendCitizenObjectionAck(data: {
    email: string;
    claimantName: string;
    objectionId: string | number;
    ulpin: string;
    hearingDate?: string;
    groundCategory: string;
  }) {
    const { email, claimantName, objectionId, ulpin, hearingDate, groundCategory } = data;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="background-color: #065f46; padding: 15px; border-radius: 6px; text-align: center; color: white;">
          <h2 style="margin: 0;">Collectorate Land Acquisition Office (CALA)</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #a7f3d0;">Section 15 Formal Objection Acknowledgement</p>
        </div>
        <div style="padding: 20px 0;">
          <p>Dear <strong>${claimantName}</strong>,</p>
          <p>Your objection submitted under Section 15(1) of the RFCTLARR Act 2013 has been officially registered:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr><td style="padding: 6px; color: #64748b;">Objection Reference No:</td><td style="padding: 6px; font-weight: bold;">SEC15-OBJ-${objectionId}</td></tr>
            <tr><td style="padding: 6px; color: #64748b;">Affected Parcel ULPIN:</td><td style="padding: 6px; font-weight: bold;">${ulpin}</td></tr>
            <tr><td style="padding: 6px; color: #64748b;">Objection Ground:</td><td style="padding: 6px; font-weight: bold;">${groundCategory}</td></tr>
            ${hearingDate ? `<tr><td style="padding: 6px; color: #64748b;">Scheduled Hearing Date:</td><td style="padding: 6px; font-weight: bold; color: #d97706;">${hearingDate}</td></tr>` : ''}
          </table>
          <p>The District Collector has scheduled your representation for preliminary scrutiny. You may track the statutory status and upload supporting revenue documents on the NLAMS Citizen Portal.</p>
          <p style="font-size: 12px; color: #94a3b8;">Issued under Section 15(2), Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013.</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: config.smtp.from,
      to: email,
      subject: `[CALA Section 15] Formal Objection Acknowledged - Ref: SEC15-OBJ-${objectionId}`,
      html
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || null;
    Logger.info(`Citizen objection ack sent to ${email} (MessageId: ${info.messageId})`);

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      previewUrl
    };
  },

  /**
   * Process Pending Outbox Events and Dispatch Notifications
   */
  async processOutboxEvents() {
    const pendingEvents = await pool.query(
      `SELECT * FROM nlams.outbox_events WHERE status = 'PENDING' ORDER BY occurred_at ASC LIMIT 10`
    );

    const results: any[] = [];

    for (const evt of pendingEvents.rows) {
      try {
        const payload = evt.payload;

        if (evt.event_type === 'REQUISITION_DISPATCHED_TO_COLLECTOR') {
          // Send notification email to District Collector
          const emailRes = await this.sendOfficerInvitation({
            email: 'collector.anand@gov.in',
            officerName: 'Shri Pravin K. Solanki, IAS',
            roleGroup: 'District Collector & CALA',
            designation: `Collectorate Anand (Inward Ref: ${payload.inwardNumber})`,
            projectTitle: `Master Requisition ${payload.masterRequisitionNo} (${payload.parcelsCount} parcels)`
          });

          await pool.query(
            `UPDATE nlams.outbox_events SET
              status = 'PUBLISHED',
              published_at = CURRENT_TIMESTAMP
             WHERE outbox_event_id = $1`,
            [evt.outbox_event_id]
          );

          results.push({
            eventId: evt.outbox_event_id,
            eventType: evt.event_type,
            status: 'PUBLISHED',
            emailMessageId: emailRes.messageId,
            previewUrl: emailRes.previewUrl
          });
        } else {
          // Generic handler
          await pool.query(
            `UPDATE nlams.outbox_events SET status = 'PUBLISHED', published_at = CURRENT_TIMESTAMP WHERE outbox_event_id = $1`,
            [evt.outbox_event_id]
          );
          results.push({ eventId: evt.outbox_event_id, status: 'PUBLISHED' });
        }
      } catch (err: any) {
        Logger.error(`Failed to dispatch outbox event ${evt.outbox_event_id}`, err);
        await pool.query(
          `UPDATE nlams.outbox_events SET retry_count = retry_count + 1 WHERE outbox_event_id = $1`,
          [evt.outbox_event_id]
        );
      }
    }

    return { processedCount: results.length, events: results };
  }
};
