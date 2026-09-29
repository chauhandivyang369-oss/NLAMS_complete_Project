import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const CollectorController = {
  /**
   * GET /api/v1/collector/inward-proposals
   * Returns proposals routed to the collector's district
   */
  async getInwardProposals(req: Request, res: Response) {
    const userDistrictId = req.user?.districtId || 1; // Default to district 1 if admin
    try {
      const result = await pool.query(
        `SELECT cip.*, p.project_code, p.project_title, p.project_type, p.public_purpose,
                f.nodal_officer_name, f.official_email, f.estimated_total_compensation_budget,
                d.district_name
         FROM nlams.collector_inward_proposals cip
         JOIN nlams.projects p ON p.project_id = cip.project_id
         LEFT JOIN nlams.form1_requisitions f ON f.form1_id = cip.form1_id
         JOIN nlams.districts d ON d.district_id = cip.district_id
         WHERE cip.district_id = $1 OR $2 = 'ADMIN'
         ORDER BY cip.received_at DESC`,
        [userDistrictId, req.user?.roleGroup || '']
      );

      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err: any) {
      Logger.error('Get inward proposals error', err);
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/collector/verify-proposal/:form1Id
   * Scrutinize and accept/request clarification on inward proposal
   */
  async verifyProposal(req: Request, res: Response) {
    const form1Id = parseInt(req.params.form1Id, 10);
    const { action, remarks } = req.body; // action: 'ACCEPT' | 'REJECT' | 'CLARIFICATION'
    const status = action === 'ACCEPT' ? 'UNDER_INQUIRY' : action === 'REJECT' ? 'REJECTED' : 'CLARIFICATION_REQUESTED';

    try {
      await pool.query(
        `UPDATE nlams.collector_inward_proposals SET
          current_status = $2,
          findings = jsonb_set(findings, '{verificationRemarks}', to_jsonb($3::text), true)
         WHERE form1_id = $1`,
        [form1Id, status, remarks || 'Scrutinized by Collector']
      );

      return res.json({ success: true, status, form1Id, message: `Proposal updated to ${status}` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'VERIFY_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/collector/sec15-objections/:projectId
   */
  async getSec15Objections(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    try {
      const result = await pool.query(
        `SELECT o.*, cp.survey_no, cp.village_name
         FROM nlams.objections_sec15 o
         LEFT JOIN nlams.cadastral_parcels cp ON cp.ulpin = o.ulpin
         WHERE o.project_id = $1
         ORDER BY o.created_at DESC`,
        [projectId]
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/collector/sec15-hearings
   * Schedule hearing date and record Collector's order
   */
  async scheduleSec15Hearing(req: Request, res: Response) {
    const { objectionId, hearingDate, orderStatus, orderText } = req.body;
    try {
      const result = await pool.query(
        `UPDATE nlams.objections_sec15 SET
          status = COALESCE($2, status),
          disposal_reason = $3,
          disposed_at = CURRENT_TIMESTAMP
         WHERE objection_id = $1
         RETURNING *`,
        [objectionId, orderStatus || 'HEARD', orderText || 'Hearing conducted']
      );

      return res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'HEARING_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/collector/sec23-awards
   * Statutory RFCTLARR Compensation Award Calculation (Sec 26-30)
   * Base Market Value * Multiplier + Assets + 100% Solatium + 12% Sec 30 Interest
   */
  async calculateSec23Award(req: Request, res: Response) {
    const {
      projectId,
      ulpin,
      marketValueLand,
      multiplicationFactor = 1.2,
      assetsStructures = 0,
      assetsTrees = 0,
      section11Date,
      awardDate = new Date()
    } = req.body;

    try {
      const landVal = parseFloat(marketValueLand);
      const multFactor = parseFloat(multiplicationFactor);
      const totalBaseLandValue = landVal * multFactor;
      const totalAssets = parseFloat(assetsStructures) + parseFloat(assetsTrees);

      // Solatium: Exactly 100% of (Total Base Land Value + Assets)
      const solatium = totalBaseLandValue + totalAssets;

      // Section 30(3) Additional Interest: 12% per annum from Sec 11 notification to Award
      let sec30Interest = 0;
      if (section11Date) {
        const s11 = new Date(section11Date).getTime();
        const awd = new Date(awardDate).getTime();
        const diffDays = Math.max(0, (awd - s11) / (1000 * 3600 * 24));
        const diffYears = diffDays / 365.25;
        sec30Interest = parseFloat(((totalBaseLandValue) * 0.12 * diffYears).toFixed(2));
      }

      const totalAward = totalBaseLandValue + totalAssets + solatium + sec30Interest;
      const awardNo = `AWD-SEC23-${ulpin}-${Date.now().toString().slice(-4)}`;

      const insertRes = await pool.query(
        `INSERT INTO nlams.awards_sec23 (
          project_id, ulpin, award_number, award_date,
          market_value_inr, assets_compensation_inr, solatium_inr,
          additional_interest_inr, rehabilitation_resettlement_inr,
          total_award_amount_inr, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, $9, 'DECLARED')
        ON CONFLICT (award_number) DO UPDATE SET
          total_award_amount_inr = EXCLUDED.total_award_amount_inr
        RETURNING *`,
        [
          projectId,
          ulpin,
          awardNo,
          awardDate,
          landVal,
          totalAssets,
          solatium,
          sec30Interest,
          totalAward
        ]
      );

      return res.json({
        success: true,
        awardNumber: awardNo,
        breakdown: {
          marketValueLand: landVal,
          multiplicationFactor: multFactor,
          totalBaseLandValue,
          assetsValue: totalAssets,
          solatiumAmount: solatium,
          additionalInterestSec30: sec30Interest,
          totalAwardCompensation: totalAward
        },
        data: insertRes.rows[0]
      });
    } catch (err: any) {
      Logger.error('Sec 23 award error', err);
      return res.status(500).json({ success: false, error: { code: 'AWARD_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/collector/sec38-possession
   * Handover of physical possession post DBT disbursement
   */
  async executeSec38Possession(req: Request, res: Response) {
    const { awardId } = req.body;
    try {
      const result = await pool.query(
        `UPDATE nlams.awards_sec23 SET
          status = 'POSSESSION_TAKEN'
         WHERE award_id = $1
         RETURNING *`,
        [awardId]
      );

      return res.json({
        success: true,
        message: 'Physical possession certificate issued under Section 38',
        data: result.rows[0]
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'POSSESSION_ERROR', message: err.message } });
    }
  }
};
