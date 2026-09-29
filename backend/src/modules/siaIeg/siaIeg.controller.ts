import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const SiaIegController = {
  /**
   * POST /api/v1/sia/launch-survey
   * Commission SIA unit for notified project
   */
  async launchSurvey(req: Request, res: Response) {
    const { projectId, agencyName, startDate, targetCompletionDate } = req.body;
    try {
      const surveyRef = `SIA-${projectId || 1}-${Date.now().toString().slice(-4)}`;
      const result = await pool.query(
        `INSERT INTO nlams.sia_surveys (
          project_id, survey_reference, survey_type, survey_agency_name, start_date, completion_date, status
        ) VALUES ($1, $2, 'STANDARD_SIA', $3, $4, $5, 'IN_PROGRESS')
        RETURNING sia_survey_id AS survey_id, *`,
        [
          projectId || 1,
          surveyRef,
          agencyName || 'Gujarat Institute of Development Research (GIDR)',
          startDate || new Date(),
          targetCompletionDate || new Date(Date.now() + 180 * 24 * 3600 * 1000)
        ]
      );

      return res.status(201).json({ success: true, message: 'SIA Survey unit commissioned', data: result.rows[0] });
    } catch (err: any) {
      Logger.error('SIA launch error', err);
      return res.status(500).json({ success: false, error: { code: 'SIA_LAUNCH_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/sia/survey-data/:surveyId
   */
  async getSurveyData(req: Request, res: Response) {
    const surveyId = parseInt(req.params.surveyId, 10);
    try {
      const surveyRes = await pool.query(`SELECT sia_survey_id AS survey_id, * FROM nlams.sia_surveys WHERE sia_survey_id = $1`, [surveyId]);
      if (!surveyRes.rows.length) {
        return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Survey not found' } });
      }

      const hearingsRes = await pool.query(`SELECT sia_public_hearing_id AS hearing_id, * FROM nlams.sia_public_hearings WHERE sia_survey_id = $1`, [surveyId]);
      const simpRes = await pool.query(`SELECT simp_item_id AS simp_id, * FROM nlams.sia_simp_items WHERE sia_survey_id = $1`, [surveyId]);

      return res.json({
        success: true,
        survey: surveyRes.rows[0],
        hearings: hearingsRes.rows,
        simpItems: simpRes.rows
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/sia/public-hearings
   */
  async scheduleHearing(req: Request, res: Response) {
    const { surveyId, hearingDate, venue } = req.body;
    try {
      const hRef = `HRG-SIA-${Date.now().toString().slice(-4)}`;
      const result = await pool.query(
        `INSERT INTO nlams.sia_public_hearings (
          project_id, sia_survey_id, hearing_reference, hearing_date, venue, status
        ) VALUES (1, $1, $2, $3, $4, 'SCHEDULED')
        RETURNING sia_public_hearing_id AS hearing_id, *`,
        [
          surveyId || 1,
          hRef,
          hearingDate || new Date(),
          venue || 'Panchayat Bhavan, Petlad'
        ]
      );

      return res.status(201).json({ success: true, message: 'SIA public hearing scheduled', data: result.rows[0] });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'HEARING_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/sia/simp-plan
   */
  async createSimpItem(req: Request, res: Response) {
    const { surveyId, impactCategory, impactDescription, mitigationStrategy, responsibleAgency, estimatedCost } = req.body;
    try {
      const itemCode = `SIMP-${Date.now().toString().slice(-4)}`;
      const result = await pool.query(
        `INSERT INTO nlams.sia_simp_items (
          project_id, sia_survey_id, item_code, impact_category, impact_description, mitigation_measure, responsible_agency, estimated_cost_inr, status, created_at
        ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, 'DRAFT', CURRENT_TIMESTAMP)
        RETURNING simp_item_id AS simp_id, *`,
        [
          surveyId || 1,
          itemCode,
          impactCategory || 'AGRICULTURAL_LIVELIHOOD_DISPLACEMENT',
          impactDescription || 'Displacement of agrarian livelihood dependent families',
          mitigationStrategy || 'Skill development and vocational training for agrarian youth',
          responsibleAgency || 'District Livelihoods Mission',
          estimatedCost || 1200000
        ]
      );

      return res.status(201).json({ success: true, message: 'SIMP mitigation measure recorded', data: result.rows[0] });
    } catch (err: any) {
      Logger.error('SIMP insert error', err);
      return res.status(500).json({ success: false, error: { code: 'SIMP_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/sia/ieg/appraisal/:surveyId
   */
  async getIegAppraisal(req: Request, res: Response) {
    const surveyId = parseInt(req.params.surveyId, 10);
    try {
      const result = await pool.query(`SELECT ieg_committee_id AS committee_id, * FROM nlams.ieg_committees WHERE project_id = 1`);
      return res.json({ success: true, count: result.rows.length, data: result.rows[0] || null });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/sia/ieg/submit-recommendation
   */
  async submitIegRecommendation(req: Request, res: Response) {
    const { surveyId, committeeName, consensusPercentage } = req.body;
    try {
      const commRef = `IEG-${Date.now().toString().slice(-4)}`;
      const result = await pool.query(
        `INSERT INTO nlams.ieg_committees (
          project_id, committee_reference, committee_name, constitution_date, status
        ) VALUES (1, $1, $2, CURRENT_DATE, 'RECOMMENDED')
        RETURNING ieg_committee_id AS committee_id, *`,
        [
          commRef,
          committeeName || 'State Independent Expert Group (IEG) Appraisal Committee'
        ]
      );

      if (surveyId) {
        await pool.query(
          `UPDATE nlams.sia_surveys SET status = 'APPROVED' WHERE sia_survey_id = $1`,
          [surveyId]
        );
      }

      return res.json({
        success: true,
        message: 'IEG statutory recommendation submitted',
        consensusPercentage: consensusPercentage || 96.0,
        data: result.rows[0]
      });
    } catch (err: any) {
      Logger.error('IEG submit error', err);
      return res.status(500).json({ success: false, error: { code: 'IEG_ERROR', message: err.message } });
    }
  }
};
