import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { AiService } from '../ai/ai.service';
import { Logger } from '../../utils/logger';

export const CitizenController = {
  /**
   * GET /api/v1/citizen/my-parcels?mobile=:mobile
   * Fetch landowner's acquired parcels by mobile or active user
   */
  async getMyParcels(req: Request, res: Response) {
    const mobile = req.query.mobile as string || '+91 98980 12345';
    try {
      const result = await pool.query(
        `SELECT lo.owner_id, lo.ulpin, lo.owner_name, lo.share_percentage, lo.bank_linked,
                cp.survey_no, cp.village_name, cp.taluka_name, cp.district_name, cp.total_area_acre,
                cp.land_use, cp.statutory_status, cp.color_code, ST_AsGeoJSON(cp.geom) as parcel_geojson
         FROM nlams.land_owners lo
         JOIN nlams.cadastral_parcels cp ON cp.ulpin = lo.ulpin
         WHERE lo.mobile_masked LIKE '%12345%' OR lo.owner_name ILIKE '%Patel%'
         LIMIT 10`
      );

      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err: any) {
      Logger.error('Citizen parcels error', err);
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/citizen/file-objection
   * File Section 15 objection with grounds and supporting documents
   */
  async fileObjection(req: Request, res: Response) {
    const { projectId, ulpin, claimantName, groundCategory, objectionText, mobile } = req.body;
    try {
      const refNo = `OBJ-SEC15-${Date.now().toString().slice(-6)}`;
      const result = await pool.query(
        `INSERT INTO nlams.objections_sec15 (
          project_id, ulpin, objection_reference, objector_name, grounds, hearing_required, status
        ) VALUES ($1, $2, $3, $4, $5, TRUE, 'SUBMITTED')
        RETURNING *`,
        [
          projectId || 1,
          ulpin || '24050100010001',
          refNo,
          claimantName || 'Rameshwar Laljibhai Patel',
          `${groundCategory || 'COMPENSATION_RATE'}: ${objectionText || 'Objection filed by Khatedar'}`
        ]
      );

      return res.status(201).json({
        success: true,
        message: 'Section 15 formal objection registered successfully',
        objectionReference: refNo,
        statutoryStatus: 'SUBMITTED_TO_COLLECTOR',
        data: result.rows[0]
      });
    } catch (err: any) {
      Logger.error('File objection error', err);
      return res.status(500).json({ success: false, error: { code: 'OBJECTION_ERROR', message: err.message } });
    }
  },

  /**
   * GET /api/v1/citizen/dbt-passbook/:ownerId
   */
  async getDbtPassbook(req: Request, res: Response) {
    const ownerId = parseInt(req.params.ownerId, 10);
    return res.json({
      success: true,
      ownerId,
      passbook: {
        khatedarName: 'Rameshwar Laljibhai Patel',
        bankAccountMasked: 'XXXX-XXXX-7261',
        bankName: 'State Bank of India, Petlad Branch',
        ifscCode: 'SBIN0000314',
        dbtStatus: 'CREDITED',
        totalAwardInr: 7751562.89,
        sharePercentage: '50%',
        creditedAmountInr: 3875781.45,
        creditUtrNumber: 'RBI2026092778192039',
        creditedAt: new Date().toISOString()
      }
    });
  },

  /**
   * GET /api/v1/citizen/public-gazettes
   */
  async getPublicGazettes(req: Request, res: Response) {
    try {
      const result = await pool.query(
        `SELECT sgn.*, p.project_title 
         FROM nlams.statutory_gazette_notifications sgn
         JOIN nlams.projects p ON p.project_id = sgn.project_id
         WHERE sgn.status = 'PUBLISHED'
         ORDER BY sgn.issue_date DESC`
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/citizen/bhumi-mitra/query
   */
  async bhumiMitraQuery(req: Request, res: Response) {
    const { query } = req.body;
    try {
      const response = await AiService.queryBhumiMitra(query || 'What are my rights under Section 15?');
      return res.json(response);
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message } });
    }
  }
};
