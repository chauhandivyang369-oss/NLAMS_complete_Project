import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const RnrController = {
  /**
   * GET /api/v1/rnr/affected-families/:projectId
   */
  async getAffectedFamilies(req: Request, res: Response) {
    const projectId = parseInt(req.params.projectId, 10);
    try {
      const estimates = await pool.query(
        `SELECT * FROM nlams.form1_rr_estimates WHERE project_id = $1`,
        [projectId]
      );

      // Synthesize census register from affected parcels & land owners
      const families = await pool.query(
        `SELECT lo.owner_id, lo.ulpin, lo.owner_name, lo.relative_name, lo.relationship_type,
                lo.share_percentage, lo.bank_linked, cp.survey_no, cp.village_name
         FROM nlams.land_owners lo
         JOIN nlams.project_parcels pp ON pp.ulpin = lo.ulpin
         JOIN nlams.cadastral_parcels cp ON cp.ulpin = lo.ulpin
         WHERE pp.project_id = $1`,
        [projectId]
      );

      return res.json({
        success: true,
        projectId,
        summary: estimates.rows[0] || {
          estimatedLandownerFamilies: families.rows.length,
          estimatedLivelihoodFamilies: Math.round(families.rows.length * 1.5),
          scStFamiliesCount: 4,
          displacedFamilies: 2
        },
        families: families.rows
      });
    } catch (err: any) {
      Logger.error('R&R fetch error', err);
      return res.status(500).json({ success: false, error: { code: 'FETCH_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/rnr/scheme-draft
   * Draft R&R scheme under Second Schedule of RFCTLARR Act 2013
   */
  async draftScheme(req: Request, res: Response) {
    const { projectId, schemeTitle, housingUnitsPlanned, subsistenceGrantPerFamily, annuityPerMonth } = req.body;
    try {
      const schemeNo = `RNR-SCHEME-${projectId}-${Date.now().toString().slice(-4)}`;
      return res.json({
        success: true,
        schemeNumber: schemeNo,
        schemeTitle: schemeTitle || 'Comprehensive Rehabilitation & Resettlement Scheme',
        statutorySchedule: 'Second Schedule, RFCTLARR Act 2013',
        entitlements: {
          housingUnitsPlanned: housingUnitsPlanned || 12,
          subsistenceGrantPerFamily: subsistenceGrantPerFamily || 36000,
          annuityPerMonth: annuityPerMonth || 2000,
          transportationAllowance: 50000,
          cattleShedGrant: 25000
        },
        status: 'DRAFT_FORMULATED'
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: { code: 'SCHEME_ERROR', message: err.message } });
    }
  },

  /**
   * POST /api/v1/rnr/commissioner-approval
   */
  async approveScheme(req: Request, res: Response) {
    const { schemeNumber, approvalRemarks } = req.body;
    return res.json({
      success: true,
      schemeNumber,
      approvedBy: 'Smt. Geeta B. Rathwa, GAS (Commissioner R&R)',
      approvalDate: new Date().toISOString(),
      status: 'APPROVED',
      remarks: approvalRemarks || 'Approved in accordance with Section 16 to 18 of RFCTLARR Act 2013'
    });
  },

  /**
   * POST /api/v1/rnr/allotment-entitlements
   */
  async allocateEntitlements(req: Request, res: Response) {
    const { familyId, plotNo, housingUnitNo, dbtPassbookLinked } = req.body;
    return res.json({
      success: true,
      familyId,
      plotNo: plotNo || 'RES-PLOT-42',
      housingUnitNo: housingUnitNo || 'UNIT-B-14',
      dbtPassbookLinked: dbtPassbookLinked !== false,
      status: 'ALLOTTED'
    });
  }
};
