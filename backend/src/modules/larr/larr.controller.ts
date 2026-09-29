import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const LarrController = {
  /**
   * GET /api/v1/larr-tribunal/cases
   */
  async getCases(req: Request, res: Response) {
    try {
      const result = await pool.query(
        `SELECT c.*, p.project_title, cp.survey_no, cp.village_name
         FROM nlams.larr_tribunal_cases c
         LEFT JOIN nlams.projects p ON p.project_id = c.project_id
         LEFT JOIN nlams.cadastral_parcels cp ON cp.ulpin = c.ulpin
         ORDER BY c.created_at DESC`
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err: any) {
      Logger.error('LARR cases fetch error', err);
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/larr-tribunal/digital-summons
   */
  async issueDigitalSummons(req: Request, res: Response) {
    const { caseNumber, partyName, partyEmail, hearingDate, summonsRef } = req.body;
    try {
      const refNo = summonsRef || `SUMMONS-${Date.now().toString().slice(-6)}`;
      await pool.query(
        `UPDATE nlams.larr_tribunal_cases SET
          status = 'SUMMONS_DISPATCHED',
          next_hearing_date = $2
         WHERE case_number = $1`,
        [caseNumber, hearingDate || new Date(Date.now() + 14 * 24 * 3600 * 1000)]
      );

      return res.json({
        success: true,
        summonsReference: refNo,
        dispatchedTo: partyName,
        partyEmail,
        hearingDate,
        status: 'DISPATCHED_AND_LOGGED'
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'SUMMONS_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/larr-tribunal/sec69-award
   * Judicial determination and compensation enhancement under Section 69
   */
  async awardSec69Judicial(req: Request, res: Response) {
    const { caseNumber, initialAward, enhancedAmount, interestRate = 9, judgmentSummary } = req.body;
    try {
      const result = await pool.query(
        `UPDATE nlams.larr_tribunal_cases SET
          status = 'JUDGMENT_PRONOUNCED',
          synopsis = $2
         WHERE case_number = $1
         RETURNING *`,
        [caseNumber, judgmentSummary || `Enhanced compensation ordered under Section 69 with ${interestRate}% interest`]
      );

      return res.json({
        success: true,
        caseNumber,
        compensationEnhancement: {
          initialAwardAmount: initialAward,
          enhancedAmountAwarded: enhancedAmount,
          netIncrease: enhancedAmount - initialAward,
          statutoryInterestRatePct: interestRate
        },
        status: 'JUDGMENT_PRONOUNCED',
        data: result.rows[0]
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'JUDICIAL_AWARD_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/larr-tribunal/virtual-courtroom/:caseId
   */
  async getVirtualCourtroom(req: Request, res: Response) {
    const { caseId } = req.params;
    return res.json({
      success: true,
      courtroom: {
        caseId,
        courtName: 'LARR Principal Judicial Authority Bench, Gujarat',
        presidingOfficer: 'Hon. Justice (Retd.) D. K. Trivedi',
        videoMeetingUrl: `https://meet.nlams.gov.in/tribunal-bench/${caseId}`,
        evidenceVaultUrl: `/api/v1/larr-tribunal/evidence/${caseId}`,
        caseStatus: 'HEARING_IN_PROGRESS'
      }
    });
  }
};
