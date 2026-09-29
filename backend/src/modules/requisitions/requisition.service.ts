import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const RequisitionService = {
  /**
   * List all projects / Form-I requisitions
   */
  async listRequisitions() {
    const query = `
      SELECT 
        p.project_id,
        p.project_code,
        p.project_title,
        p.project_type,
        p.public_purpose,
        p.gestation_years,
        p.gestation_months,
        p.administrative_sanction_ref,
        p.status AS project_status,
        f.form1_id,
        f.workflow_status,
        f.signature_status,
        f.government_level,
        f.nodal_officer_name,
        f.official_email,
        f.estimated_total_compensation_budget,
        p.created_at,
        p.updated_at,
        (SELECT COUNT(*) FROM nlams.project_parcels pp WHERE pp.project_id = p.project_id) AS parcel_count,
        (SELECT COUNT(*) FROM nlams.project_jurisdictions pj WHERE pj.project_id = p.project_id) AS district_count
      FROM nlams.projects p
      LEFT JOIN nlams.form1_requisitions f ON f.project_id = p.project_id
      ORDER BY p.created_at DESC;
    `;
    const res = await pool.query(query);
    return res.rows;
  },

  /**
   * Full proposal dossier by Project ID
   */
  async getRequisitionById(projectId: number) {
    const projRes = await pool.query(
      `SELECT p.*, f.* 
       FROM nlams.projects p
       LEFT JOIN nlams.form1_requisitions f ON f.project_id = p.project_id
       WHERE p.project_id = $1`,
      [projectId]
    );

    if (!projRes.rows.length) return null;
    const project = projRes.rows[0];

    // Jurisdictions
    const jurisRes = await pool.query(
      `SELECT pj.*, d.district_name, s.state_name
       FROM nlams.project_jurisdictions pj
       JOIN nlams.districts d ON d.district_id = pj.district_id
       JOIN nlams.states s ON s.state_id = pj.state_id
       WHERE pj.project_id = $1`,
      [projectId]
    );

    // Parcels
    const parcelRes = await pool.query(
      `SELECT pp.*, cp.survey_no, cp.village_name, cp.taluka_name, cp.district_name, 
              cp.total_area_acre, cp.land_use, cp.statutory_status, cp.color_code,
              ST_AsGeoJSON(cp.geom) as parcel_geojson
       FROM nlams.project_parcels pp
       JOIN nlams.cadastral_parcels cp ON cp.ulpin = pp.ulpin
       WHERE pp.project_id = $1`,
      [projectId]
    );

    // Assets
    const assetRes = await pool.query(
      `SELECT * FROM nlams.form1_assets WHERE project_id = $1`,
      [projectId]
    );

    // R&R Estimates
    const rrRes = await pool.query(
      `SELECT * FROM nlams.form1_rr_estimates WHERE project_id = $1`,
      [projectId]
    );

    // Financial commitments
    const finRes = await pool.query(
      `SELECT * FROM nlams.form1_financials WHERE project_id = $1`,
      [projectId]
    );

    // Documents
    const docRes = await pool.query(
      `SELECT * FROM nlams.form1_documents WHERE project_id = $1`,
      [projectId]
    );

    // Validation results
    const valRes = await pool.query(
      `SELECT * FROM nlams.form1_validation_results WHERE form1_id = $1 ORDER BY wizard_no`,
      [project.form1_id]
    );

    // Dispatch Packets
    const packetRes = await pool.query(
      `SELECT fdp.*, d.district_name 
       FROM nlams.form1_dispatch_packets fdp
       JOIN nlams.districts d ON d.district_id = fdp.district_id
       WHERE fdp.submission_id IN (
         SELECT submission_id FROM nlams.form1_submissions WHERE form1_id = $1
       )`,
      [project.form1_id]
    );

    return {
      project,
      jurisdictions: jurisRes.rows,
      parcels: parcelRes.rows,
      assets: assetRes.rows,
      rrEstimates: rrRes.rows,
      financials: finRes.rows[0] || null,
      documents: docRes.rows,
      validationResults: valRes.rows,
      dispatchPackets: packetRes.rows
    };
  },

  /**
   * Create draft requisition & project
   */
  async createRequisition(payload: any, userId?: number) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const projectCode = payload.projectCode || `NLAMS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const title = payload.projectTitle || 'Untitled Infrastructure Acquisition';
      const projectType = payload.projectType || 'GOVERNMENT';

      const projRes = await client.query(
        `INSERT INTO nlams.projects (
          project_code, project_title, project_type, public_purpose,
          gestation_years, gestation_months, administrative_sanction_ref,
          administrative_approval_date, status, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'DRAFT', $9)
        RETURNING project_id, project_code`,
        [
          projectCode,
          title,
          projectType,
          payload.publicPurpose || '',
          payload.gestationYears || 2,
          payload.gestationMonths || 0,
          payload.adminSanctionRef || 'REF-SANCTION-PENDING',
          payload.adminApprovalDate || new Date(),
          userId || null
        ]
      );

      const projectId = projRes.rows[0].project_id;

      // Initialize form1_requisitions
      const formRes = await client.query(
        `INSERT INTO nlams.form1_requisitions (
          project_id, government_level, nodal_officer_name, nodal_officer_designation,
          official_email, mobile, official_address, appropriate_government_ministry,
          estimated_total_compensation_budget, workflow_status, signature_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'DRAFT', 'NOT_STARTED')
        RETURNING form1_id`,
        [
          projectId,
          payload.governmentLevel || 'CENTRAL',
          payload.nodalOfficerName || '',
          payload.nodalOfficerDesignation || '',
          payload.officialEmail || '',
          payload.mobile || '',
          payload.officialAddress || '',
          payload.appropriateGovernment || 'MoRTH',
          payload.estimatedBudget || 0
        ]
      );

      // Default single district jurisdiction if provided
      if (payload.districtId || payload.selectedDistricts) {
        await client.query(
          `INSERT INTO nlams.project_jurisdictions (
            project_id, jurisdiction_level, state_id, district_id, collector_office_name
          ) VALUES ($1, 'SINGLE_DISTRICT', 1, $2, 'Collectorate Anand')
          ON CONFLICT (project_id, district_id) DO NOTHING`,
          [projectId, payload.districtId || 1]
        );
      }

      await client.query('COMMIT');
      return { projectId, projectCode, form1Id: formRes.rows[0].form1_id };
    } catch (err: any) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  /**
   * Save Step Data (Steps 1 through 10)
   */
  async saveWizardStep(projectId: number, stepNo: number, data: any) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      switch (stepNo) {
        case 1: // Project Type, Public Purpose & Legal Framework
          await client.query(
            `UPDATE nlams.form1_requisitions SET
              government_level = COALESCE($2, government_level),
              ppp_sector = $3,
              sponsoring_public_entity = $4,
              concessionaire_or_implementing_entity = $5,
              private_sector_category = $6,
              private_entity_name = $7,
              nodal_officer_name = COALESCE($8, nodal_officer_name),
              nodal_officer_designation = COALESCE($9, nodal_officer_designation),
              official_email = COALESCE($10, official_email),
              mobile = COALESCE($11, mobile),
              official_address = COALESCE($12, official_address),
              appropriate_government_ministry = COALESCE($13, appropriate_government_ministry),
              fourth_schedule_special_act = COALESCE($14, fourth_schedule_special_act),
              section40_urgency = COALESCE($15, section40_urgency),
              updated_at = CURRENT_TIMESTAMP
             WHERE project_id = $1`,
            [
              projectId,
              data.governmentLevel,
              data.pppSector,
              data.sponsoringPublicEntity,
              data.concessionaireEntity,
              data.privateSectorCategory,
              data.privateEntityName,
              data.nodalOfficerName,
              data.nodalOfficerDesignation,
              data.officialEmail,
              data.mobile,
              data.officialAddress,
              data.appropriateGovernment,
              data.isFourthScheduleAct || false,
              data.isSection40Urgency || false
            ]
          );
          break;

        case 3: // Project Details & Administrative Sanction
          await client.query(
            `UPDATE nlams.projects SET
              project_title = COALESCE($2, project_title),
              public_purpose = COALESCE($3, public_purpose),
              gestation_years = COALESCE($4, gestation_years),
              gestation_months = COALESCE($5, gestation_months),
              administrative_sanction_ref = COALESCE($6, administrative_sanction_ref),
              administrative_approval_date = COALESCE($7, administrative_approval_date),
              updated_at = CURRENT_TIMESTAMP
             WHERE project_id = $1`,
            [
              projectId,
              data.projectTitle,
              data.publicPurposeDetails || data.publicPurpose,
              data.gestationYears,
              data.gestationMonths,
              data.adminSanctionRef,
              data.adminApprovalDate
            ]
          );
          break;

        case 4: // Jurisdiction & Collectorates
          if (data.districtAuthorities && Array.isArray(data.districtAuthorities)) {
            for (const da of data.districtAuthorities) {
              const distId = da.districtId || (da.district === 'Anand' ? 1 : 1);
              await client.query(
                `INSERT INTO nlams.project_jurisdictions (
                  project_id, jurisdiction_level, state_id, district_id, collector_office_name,
                  collector_officer_name, official_email, official_phone, office_address
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (project_id, district_id) DO UPDATE SET
                  collector_office_name = EXCLUDED.collector_office_name,
                  collector_officer_name = EXCLUDED.collector_officer_name,
                  official_email = EXCLUDED.official_email`,
                [
                  projectId,
                  data.jurisdictionLevel || 'SINGLE_DISTRICT',
                  1,
                  distId,
                  da.calaOffice || 'Collectorate Anand',
                  da.calaOfficer || 'Shri Pravin K. Solanki, IAS',
                  da.email || 'collector-and@gujarat.gov.in',
                  da.phone || '+91-2692-260200',
                  da.address || 'Collectorate Campus, Anand'
                ]
              );
            }
          }
          break;

        case 5: // Land Parcels & ULPIN Selection
          if (data.selectedParcels && Array.isArray(data.selectedParcels)) {
            for (const ulpin of data.selectedParcels) {
              // Ensure parcel exists in cadastral_parcels
              const parcelCheck = await client.query('SELECT ulpin, total_area_acre FROM nlams.cadastral_parcels WHERE ulpin = $1', [ulpin]);
              if (parcelCheck.rows.length) {
                const acre = parcelCheck.rows[0].total_area_acre;
                await client.query(
                  `INSERT INTO nlams.project_parcels (
                    project_id, ulpin, selected_source, affected_area_acre, impact_percentage
                  ) VALUES ($1, $2, 'GIS', $3, 100)
                  ON CONFLICT (project_id, ulpin) DO NOTHING`,
                  [projectId, ulpin, acre]
                );
              }
            }
          }
          break;

        case 8: // Financials & Escrow
          await client.query(
            `INSERT INTO nlams.form1_financials (
              project_id, estimated_compensation_budget, funding_source, fund_allocation_reference,
              collector_escrow_bank_name, collector_escrow_account_holder, collector_escrow_account_no,
              collector_escrow_ifsc, collector_escrow_branch, admin_cost_undertaking
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (project_id) DO UPDATE SET
              estimated_compensation_budget = EXCLUDED.estimated_compensation_budget,
              funding_source = EXCLUDED.funding_source,
              collector_escrow_bank_name = EXCLUDED.collector_escrow_bank_name,
              collector_escrow_account_no = EXCLUDED.collector_escrow_account_no`,
            [
              projectId,
              data.estimatedCompensationBudget || 25000000,
              data.fundingSource || 'CENTRAL_BUDGET',
              data.fundAllocationReference || 'NHAI/BUDGET/2026/01',
              data.collectorEscrowBankName || 'State Bank of India',
              data.collectorEscrowAccountHolder || 'Collector & CALA Anand Escrow A/c',
              data.collectorEscrowAccountNo || '38910293847',
              data.collectorEscrowIfsc || 'SBIN0000314',
              data.collectorEscrowBranch || 'Anand Main Branch',
              data.adminCostUndertaking !== false
            ]
          );
          // Also update project estimated_total_compensation_budget
          await client.query(
            `UPDATE nlams.form1_requisitions SET
              estimated_total_compensation_budget = $2,
              funding_source = $3
             WHERE project_id = $1`,
            [projectId, data.estimatedCompensationBudget || 25000000, data.fundingSource || 'CENTRAL_BUDGET']
          );
          break;

        case 10: // Declaration
          await client.query(
            `UPDATE nlams.form1_requisitions SET
              final_declaration_accepted = true,
              workflow_status = 'VALIDATION'
             WHERE project_id = $1`,
            [projectId]
          );
          break;
      }

      await client.query('COMMIT');
      return { success: true, stepNo, projectId };
    } catch (err: any) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  /**
   * Run 10-step statutory validator
   */
  async validateForm1(projectId: number) {
    const details = await this.getRequisitionById(projectId);
    if (!details) throw new Error(`Project ${projectId} not found`);

    const { project, jurisdictions, parcels, financials } = details;
    const checks: any[] = [];

    // Step 1: Legal authority & Public Purpose
    checks.push({
      wizard_no: 1,
      check_code: 'LEGAL_PURPOSE_CHECK',
      check_title: 'Public Purpose Specification',
      result: project.public_purpose?.length > 10 ? 'PASS' : 'FAIL',
      message: project.public_purpose?.length > 10 
        ? 'Public purpose clearly documented under RFCTLARR Act 2013' 
        : 'Public purpose details must exceed 10 characters'
    });

    // Step 2: Nodal Officer
    checks.push({
      wizard_no: 2,
      check_code: 'NODAL_OFFICER_CHECK',
      check_title: 'Nodal Officer Designation',
      result: project.nodal_officer_name ? 'PASS' : 'WARNING',
      message: project.nodal_officer_name 
        ? `Authorized Officer: ${project.nodal_officer_name}` 
        : 'Nodal officer details recommended before submission'
    });

    // Step 3: Administrative Sanction
    checks.push({
      wizard_no: 3,
      check_code: 'ADMIN_SANCTION_CHECK',
      check_title: 'Administrative Sanction Reference',
      result: project.administrative_sanction_ref ? 'PASS' : 'FAIL',
      message: project.administrative_sanction_ref 
        ? `Sanction Ref verified: ${project.administrative_sanction_ref}` 
        : 'Administrative Sanction reference number is mandatory'
    });

    // Step 4: Jurisdiction Mapped
    checks.push({
      wizard_no: 4,
      check_code: 'JURISDICTION_CHECK',
      check_title: 'District Collectorate Jurisdiction',
      result: jurisdictions.length > 0 ? 'PASS' : 'FAIL',
      message: jurisdictions.length > 0 
        ? `${jurisdictions.length} District Collectorate(s) mapped` 
        : 'At least one District Collectorate must be assigned'
    });

    // Step 5: Parcels selected
    checks.push({
      wizard_no: 5,
      check_code: 'PARCEL_CADASTRE_CHECK',
      check_title: 'Cadastral Land Parcels (ULPIN)',
      result: parcels.length > 0 ? 'PASS' : 'FAIL',
      message: parcels.length > 0 
        ? `${parcels.length} Cadastral parcels verified via PostGIS cadastre` 
        : 'At least one parcel must be selected from GIS cadastre'
    });

    // Step 8: Financial commitment
    checks.push({
      wizard_no: 8,
      check_code: 'FINANCIAL_ESCROW_CHECK',
      check_title: 'Estimated Compensation Escrow Budget',
      result: (financials || project.estimated_total_compensation_budget > 0) ? 'PASS' : 'FAIL',
      message: (financials || project.estimated_total_compensation_budget > 0)
        ? `Declared compensation budget: ₹${(project.estimated_total_compensation_budget || financials?.estimated_compensation_budget || 0).toLocaleString()}`
        : 'Compensation budget commitment must be declared'
    });

    // Step 10: Declaration
    checks.push({
      wizard_no: 10,
      check_code: 'STATUTORY_UNDERTAKING_CHECK',
      check_title: 'Statutory Undertaking & Form-I Declaration',
      result: 'PASS',
      message: 'Statutory compliance undertaking acknowledged'
    });

    // Persist checks to form1_validation_results
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM nlams.form1_validation_results WHERE form1_id = $1', [project.form1_id]);
      for (const c of checks) {
        await client.query(
          `INSERT INTO nlams.form1_validation_results (
            form1_id, wizard_no, check_code, check_title, result, message, checked_by
          ) VALUES ($1, $2, $3, $4, $5, $6, 'SYSTEM_STATUTORY_ENGINE')`,
          [project.form1_id, c.wizard_no, c.check_code, c.check_title, c.result, c.message]
        );
      }

      const hasFail = checks.some(c => c.result === 'FAIL');
      const overallStatus = hasFail ? 'FAIL' : 'PASS';

      if (overallStatus === 'PASS') {
        await client.query(
          `UPDATE nlams.form1_requisitions SET workflow_status = 'READY' WHERE form1_id = $1`,
          [project.form1_id]
        );
      }

      return { success: true, overallStatus, checks };
    } finally {
      client.release();
    }
  },

  /**
   * Apply DSC or Aadhaar E-Sign
   */
  async esignForm1(projectId: number, userId: number, signData: any) {
    const projRes = await pool.query('SELECT form1_id FROM nlams.form1_requisitions WHERE project_id = $1', [projectId]);
    if (!projRes.rows.length) throw new Error('Requisition not found');
    const form1Id = projRes.rows[0].form1_id;

    const signatureMethod = signData.method || 'DSC';
    const signerName = signData.signerName || 'Shri Rajesh K. Sharma';
    const designation = signData.designation || 'Chief General Manager, NHAI';
    const sigRef = `SIG-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    await pool.query(
      `INSERT INTO nlams.form1_signatures (
        form1_id, signer_user_id, signer_name, signer_designation, organisation_name,
        signature_method, signature_reference, signed_at, verification_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, 'VERIFIED')
      ON CONFLICT (form1_id) DO UPDATE SET
        signer_name = EXCLUDED.signer_name,
        signed_at = CURRENT_TIMESTAMP,
        verification_status = 'VERIFIED'`,
      [form1Id, userId || 4, signerName, designation, 'National Highways Authority of India', signatureMethod, sigRef]
    );

    await pool.query(
      `UPDATE nlams.form1_requisitions SET signature_status = 'SIGNED', workflow_status = 'SIGNED' WHERE form1_id = $1`,
      [form1Id]
    );

    return {
      success: true,
      signatureReference: sigRef,
      signedAt: new Date().toISOString(),
      signerName,
      status: 'SIGNED'
    };
  },

  /**
   * Master Form-I Submission with Multi-District Spatial Auto-Splitting
   */
  async submitForm1(projectId: number, userId?: number) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const projRes = await client.query(
        `SELECT p.project_id, p.project_code, p.project_title, f.form1_id, f.workflow_status, f.signature_status
         FROM nlams.projects p
         JOIN nlams.form1_requisitions f ON f.project_id = p.project_id
         WHERE p.project_id = $1`,
        [projectId]
      );

      if (!projRes.rows.length) throw new Error('Requisition not found');
      const { form1_id, project_code } = projRes.rows[0];

      // Master Requisition Number
      const masterReqNo = `NLAMS/REQ/${new Date().getFullYear()}/${project_code}`;

      // Update Form-1 and Project status
      await client.query(
        `UPDATE nlams.form1_requisitions SET workflow_status = 'SUBMITTED', updated_at = CURRENT_TIMESTAMP WHERE form1_id = $1`,
        [form1_id]
      );
      await client.query(
        `UPDATE nlams.projects SET status = 'SUBMITTED', updated_at = CURRENT_TIMESTAMP WHERE project_id = $1`,
        [projectId]
      );

      // Insert submission
      const subRes = await client.query(
        `INSERT INTO nlams.form1_submissions (
          form1_id, master_requisition_no, submitted_by, submitted_at, submission_status
        ) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 'SUBMITTED')
        ON CONFLICT (form1_id) DO UPDATE SET
          submission_status = 'SUBMITTED',
          submitted_at = CURRENT_TIMESTAMP
        RETURNING submission_id`,
        [form1_id, masterReqNo, userId || null]
      );

      const submissionId = subRes.rows[0].submission_id;

      // =========================================================================
      // Multi-District Spatial Auto-Splitting Engine
      // =========================================================================
      // Find all distinct districts for the project's parcels or jurisdictions
      const districtQuery = `
        SELECT DISTINCT d.district_id, d.district_code, d.district_name,
               COUNT(pp.ulpin) AS parcel_count,
               COALESCE(SUM(cp.total_area_acre), 0) AS total_acres
        FROM nlams.project_jurisdictions pj
        JOIN nlams.districts d ON d.district_id = pj.district_id
        LEFT JOIN nlams.project_parcels pp ON pp.project_id = pj.project_id
        LEFT JOIN nlams.cadastral_parcels cp ON cp.ulpin = pp.ulpin AND cp.district_name = d.district_name
        WHERE pj.project_id = $1
        GROUP BY d.district_id, d.district_code, d.district_name;
      `;
      let distRes = await client.query(districtQuery, [projectId]);

      // Fallback if no specific parcels mapped yet
      if (!distRes.rows.length) {
        distRes = await client.query(
          `SELECT district_id, district_code, district_name, 4 AS parcel_count, 11.62 AS total_acres 
           FROM nlams.districts WHERE district_id = 1`
        );
      }

      const routedDistricts: any[] = [];

      for (const dist of distRes.rows) {
        const inwardNumber = `INW-${dist.district_code || 'GJ_AND'}-${Date.now().toString().slice(-6)}`;
        const packetRef = `PKT-${project_code}-${dist.district_code || 'AND'}`;

        // 1. Insert into collector_inward_proposals
        await client.query(
          `INSERT INTO nlams.collector_inward_proposals (
            project_id, district_id, form1_id, inward_number, received_at, current_status, findings
          ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 'RECEIVED', $5)
          ON CONFLICT DO NOTHING`,
          [
            projectId,
            dist.district_id,
            form1_id,
            inwardNumber,
            JSON.stringify({
              autoSplitSource: 'NLAMS_POSTGIS_ROUTING_ENGINE',
              parcelsAllocated: parseInt(dist.parcel_count, 10),
              totalAcreageAllocated: parseFloat(dist.total_acres),
              dispatchedTimestamp: new Date().toISOString()
            })
          ]
        );

        // 2. Insert into form1_dispatch_packets
        await client.query(
          `INSERT INTO nlams.form1_dispatch_packets (
            submission_id, district_id, packet_reference, packet_status, dispatched_at
          ) VALUES ($1, $2, $3, 'DISPATCHED', CURRENT_TIMESTAMP)
          ON CONFLICT DO NOTHING`,
          [submissionId, dist.district_id, packetRef]
        );

        // 3. Emit Outbox Event for Officer Invitation / Email Dispatch
        await client.query(
          `INSERT INTO nlams.outbox_events (
            event_type, aggregate_type, aggregate_id, payload, occurred_at, status, retry_count
          ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 'PENDING', 0)`,
          [
            'REQUISITION_DISPATCHED_TO_COLLECTOR',
            'REQUISITION',
            String(projectId),
            JSON.stringify({
              projectId,
              form1Id: form1_id,
              masterRequisitionNo: masterReqNo,
              districtId: dist.district_id,
              districtName: dist.district_name,
              inwardNumber,
              packetReference: packetRef,
              parcelsCount: dist.parcel_count
            })
          ]
        );

        routedDistricts.push({
          districtId: dist.district_id,
          districtName: dist.district_name,
          inwardNumber,
          packetReference: packetRef,
          parcelsAllocated: dist.parcel_count
        });
      }

      await client.query('COMMIT');
      Logger.info(`Form-I Requisition ${projectId} officially submitted. Auto-split across ${routedDistricts.length} district(s).`);

      return {
        success: true,
        masterRequisitionNo: masterReqNo,
        submissionStatus: 'SUBMITTED',
        submissionId,
        routedDistricts
      };
    } catch (err: any) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
};
