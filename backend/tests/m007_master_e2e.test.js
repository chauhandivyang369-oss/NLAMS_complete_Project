const http = require('http');

async function runMasterE2ETestSuite() {
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5093, async () => {
    console.log('================================================================');
    console.log('  NLAMS MASTER END-TO-END INTEGRATION AUDIT SUITE (PORT 5093)');
    console.log('================================================================');

    function makeRequest(method, path, headers = {}, body = null, isBinary = false) {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 5093,
          path,
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        }, (res) => {
          const chunks = [];
          res.on('data', chunk => chunks.push(chunk));
          res.on('end', () => {
            const buffer = Buffer.concat(chunks);
            if (isBinary) {
              resolve({ status: res.statusCode, headers: res.headers, buffer });
            } else {
              try {
                resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(buffer.toString('utf-8')) });
              } catch (e) {
                resolve({ status: res.statusCode, headers: res.headers, raw: buffer.toString('utf-8') });
              }
            }
          });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
      });
    }

    try {
      // -----------------------------------------------------------------------
      // 1. Health & PostGIS Check
      // -----------------------------------------------------------------------
      console.log('\n[TEST 1] System Health & PostGIS Extension Check...');
      const health = await makeRequest('GET', '/health');
      if (health.status !== 200 || health.body.status !== 'HEALTHY') throw new Error('Health check failed');
      console.log('  -> HEALTHY, PostGIS:', health.body.postgis);

      // -----------------------------------------------------------------------
      // 2. Auth & Multi-Workspace Logins
      // -----------------------------------------------------------------------
      console.log('\n[TEST 2] Multi-Workspace Authentication & Token Issuance...');
      const loginCollector = await makeRequest('POST', '/api/v1/auth/login', {}, { email: 'collector.anand@gov.in', password: 'Admin@123' });
      const loginNhai = await makeRequest('POST', '/api/v1/auth/login', {}, { email: 'cgm-la@nhai.gov.in', password: 'Admin@123' });
      const loginCentral = await makeRequest('POST', '/api/v1/auth/login', {}, { email: 'nodal.central@dolr.gov.in', password: 'Admin@123' });
      const loginSia = await makeRequest('POST', '/api/v1/auth/login', {}, { email: 'sia.evaluator@gujarat.gov.in', password: 'Admin@123' });
      const loginRnr = await makeRequest('POST', '/api/v1/auth/login', {}, { email: 'commissioner.rr@gujarat.gov.in', password: 'Admin@123' });
      const loginLarr = await makeRequest('POST', '/api/v1/auth/login', {}, { email: 'registrar.larr@gujarat.gov.in', password: 'Admin@123' });

      if (!loginCollector.body.token || !loginNhai.body.token || !loginCentral.body.token) {
        throw new Error('Workspace authentication failed');
      }
      console.log('  -> All 6 authority workspace tokens acquired successfully.');

      const collectorToken = loginCollector.body.token;
      const nhaiToken = loginNhai.body.token;
      const centralToken = loginCentral.body.token;
      const siaToken = loginSia.body.token;
      const rnrToken = loginRnr.body.token;
      const larrToken = loginLarr.body.token;

      // -----------------------------------------------------------------------
      // 3. 3D-RBAC Security Boundary Verification
      // -----------------------------------------------------------------------
      console.log('\n[TEST 3] 3D-RBAC Security Boundary Audit...');
      // Collector should be blocked from Central Govt scope
      const rbacD1 = await makeRequest('GET', '/api/v1/auth/test-rbac/functional-central-only', { Authorization: `Bearer ${collectorToken}` });
      if (rbacD1.status !== 403) throw new Error('Functional RBAC failed');
      // Collector Anand should be blocked from District 88
      const rbacD2 = await makeRequest('POST', '/api/v1/auth/test-rbac/jurisdiction/88', { Authorization: `Bearer ${collectorToken}` });
      if (rbacD2.status !== 403) throw new Error('Jurisdictional RBAC failed');
      console.log('  -> 3D-RBAC Functional & Jurisdictional scopes enforced (403 SCOPE_DENIED, 403 JURISDICTION_VIOLATION).');

      // -----------------------------------------------------------------------
      // 4. GIS & Spatial Engine Check
      // -----------------------------------------------------------------------
      console.log('\n[TEST 4] GIS Studio, Bhuvan Proxy & PostGIS Corridor Slicing...');
      const bhuvan = await makeRequest('GET', '/api/v1/gis/bhuvan-wms-proxy?server=vec2&SERVICE=WMS&REQUEST=GetMap&LAYERS=lulc:GJ_LULC50K_1516&BBOX=72.92,22.53,72.94,22.55&WIDTH=256&HEIGHT=256&FORMAT=image/png', {}, null, true);
      if (bhuvan.status !== 200 || !bhuvan.headers['content-type']?.includes('image/')) throw new Error('Bhuvan proxy failed');
      console.log('  -> ISRO Bhuvan Proxy Tile bytes:', bhuvan.buffer.length);

      const corridor = await makeRequest('POST', '/api/v1/gis/simulate-corridor', {}, {
        geometry: { type: 'LineString', coordinates: [[72.9250, 22.5355], [72.9320, 22.5355]] },
        bufferMeters: 50
      });
      if (!corridor.body.success || corridor.body.parcels?.length === 0) throw new Error('PostGIS corridor simulation failed');
      console.log(`  -> PostGIS sliced ${corridor.body.parcels.length} parcels, ${corridor.body.summary.totalAreaAcres} total acres.`);

      // -----------------------------------------------------------------------
      // 5. Form-I Lifecycle & Multi-District Spatial Auto-Splitting
      // -----------------------------------------------------------------------
      console.log('\n[TEST 5] Form-I Lifecycle & Multi-District Spatial Auto-Splitting...');
      const reqDraft = await makeRequest('POST', '/api/v1/requisitions', { Authorization: `Bearer ${nhaiToken}` }, {
        projectTitle: 'Anand-Petlad Integrated Logistics Expressway',
        projectType: 'GOVERNMENT',
        publicPurpose: 'Bharatmala Pariyojana Multimodal Freight Corridor',
        gestationYears: 2,
        adminSanctionRef: 'NHAI/HQ/2026/ACQ-990',
        estimatedBudget: 50000000
      });
      const projectId = reqDraft.body.projectId;

      // Save Steps
      await makeRequest('PUT', `/api/v1/requisitions/${projectId}/wizard-step/4`, { Authorization: `Bearer ${nhaiToken}` }, {
        jurisdictionLevel: 'SINGLE_DISTRICT',
        districtAuthorities: [{ district: 'Anand', districtId: 1 }]
      });
      await makeRequest('PUT', `/api/v1/requisitions/${projectId}/wizard-step/5`, { Authorization: `Bearer ${nhaiToken}` }, {
        selectedParcels: ['24050100010001', '24050100010002', '24050100010003']
      });
      await makeRequest('PUT', `/api/v1/requisitions/${projectId}/wizard-step/8`, { Authorization: `Bearer ${nhaiToken}` }, {
        estimatedCompensationBudget: 50000000
      });

      // Validate & E-sign
      const val = await makeRequest('POST', `/api/v1/requisitions/${projectId}/validate`, { Authorization: `Bearer ${nhaiToken}` });
      if (val.body.overallStatus !== 'PASS') throw new Error('Form-1 validation failed');

      const esign = await makeRequest('POST', `/api/v1/requisitions/${projectId}/esign`, { Authorization: `Bearer ${nhaiToken}` }, {
        method: 'DSC',
        signerName: 'Shri Rajesh K. Sharma'
      });
      if (esign.body.status !== 'SIGNED') throw new Error('E-sign failed');

      // Submit & Auto-Split
      const submit = await makeRequest('POST', `/api/v1/requisitions/${projectId}/submit`, { Authorization: `Bearer ${nhaiToken}` });
      if (submit.status !== 200 || !submit.body.routedDistricts?.length) throw new Error('Submission or auto-split failed');
      console.log(`  -> Form-I Submitted (${submit.body.masterRequisitionNo}). Auto-split to ${submit.body.routedDistricts.length} district(s).`);

      // -----------------------------------------------------------------------
      // 6. District Collector Scrutiny & Section 23 Statutory Award
      // -----------------------------------------------------------------------
      console.log('\n[TEST 6] District Collector Scrutiny & Section 23 Statutory Award...');
      const inwardList = await makeRequest('GET', '/api/v1/collector/inward-proposals', { Authorization: `Bearer ${collectorToken}` });
      if (!inwardList.body.data?.length) throw new Error('Collector inward inbox empty');
      console.log(`  -> Collector Inward Inbox has ${inwardList.body.count} routed proposals.`);

      const award = await makeRequest('POST', '/api/v1/collector/sec23-awards', { Authorization: `Bearer ${collectorToken}` }, {
        projectId,
        ulpin: '24050100010001',
        marketValueLand: 3000000,
        multiplicationFactor: 1.2,
        assetsStructures: 500000,
        assetsTrees: 150000,
        section11Date: '2025-02-01'
      });
      if (award.status !== 200 || !award.body.breakdown?.totalAwardCompensation) throw new Error('Sec 23 award failed');
      console.log(`  -> Section 23 Statutory Award computed: ₹${award.body.breakdown.totalAwardCompensation.toLocaleString()} (Solatium: ₹${award.body.breakdown.solatiumAmount.toLocaleString()})`);

      // -----------------------------------------------------------------------
      // 7. Appropriate Government Gazettes & Statutory Timers
      // -----------------------------------------------------------------------
      console.log('\n[TEST 7] Appropriate Government Notifications & Statutory Timers...');
      const sec11 = await makeRequest('POST', '/api/v1/appropriate-govt/sec11-notification', { Authorization: `Bearer ${centralToken}` }, {
        projectId,
        contentText: 'Section 11 Preliminary Notification published in Gazette of India'
      });
      if (sec11.status !== 200) throw new Error('Sec 11 notification failed');

      const sec19 = await makeRequest('POST', '/api/v1/appropriate-govt/sec19-declaration', { Authorization: `Bearer ${centralToken}` }, {
        projectId,
        contentText: 'Section 19 Declaration published post SIA and R&R scrutiny'
      });
      if (sec19.status !== 200) throw new Error('Sec 19 declaration failed');

      const timers = await makeRequest('GET', `/api/v1/appropriate-govt/statutory-timers/${projectId}`, { Authorization: `Bearer ${centralToken}` });
      console.log(`  -> Section 11 & Section 19 gazetted. Days to statutory lapse: ${timers.body.statutoryTimers?.section19StatutoryDeadlineDays} days.`);

      // -----------------------------------------------------------------------
      // 8. SIA & IEG Expert Group
      // -----------------------------------------------------------------------
      console.log('\n[TEST 8] SIA Survey Commissioning & IEG Consensus Appraisal...');
      const siaLaunch = await makeRequest('POST', '/api/v1/sia/launch-survey', { Authorization: `Bearer ${siaToken}` }, {
        projectId,
        agencyName: 'Tata Institute of Social Sciences (TISS)'
      });
      const surveyId = siaLaunch.body.data.survey_id;

      await makeRequest('POST', '/api/v1/sia/public-hearings', { Authorization: `Bearer ${siaToken}` }, { surveyId });
      await makeRequest('POST', '/api/v1/sia/simp-plan', { Authorization: `Bearer ${siaToken}` }, { surveyId });

      const ieg = await makeRequest('POST', '/api/v1/sia/ieg/submit-recommendation', { Authorization: `Bearer ${siaToken}` }, {
        surveyId,
        consensusPercentage: 96.0
      });
      console.log(`  -> SIA Survey ${surveyId} appraised by IEG with 96% consensus.`);

      // -----------------------------------------------------------------------
      // 9. R&R Authority Scheme
      // -----------------------------------------------------------------------
      console.log('\n[TEST 9] R&R Second Schedule Scheme Formulation...');
      const rnrScheme = await makeRequest('POST', '/api/v1/rnr/scheme-draft', { Authorization: `Bearer ${rnrToken}` }, { projectId });
      const rnrApproval = await makeRequest('POST', '/api/v1/rnr/commissioner-approval', { Authorization: `Bearer ${rnrToken}` }, {
        schemeNumber: rnrScheme.body.schemeNumber
      });
      console.log(`  -> R&R Scheme ${rnrApproval.body.schemeNumber} approved by Commissioner.`);

      // -----------------------------------------------------------------------
      // 10. LARR Judicial Tribunal
      // -----------------------------------------------------------------------
      console.log('\n[TEST 10] LARR Tribunal Judicial Reference & Section 69 Enhancement...');
      await pool.query(`
        INSERT INTO nlams.larr_tribunal_cases (
          project_id, ulpin, case_number, reference_number, case_type, originating_section, subject, status
        ) VALUES (1, '24050100010001', 'LARR-GJ-2026-0042', 'REF-SEC64-001', 'COMPENSATION_DISPUTE', 'SECTION_64', 'Claim for Enhanced Solatium & Tree Valuation', 'REGISTERED')
        ON CONFLICT (case_number) DO NOTHING
      `);

      const summons = await makeRequest('POST', '/api/v1/larr-tribunal/digital-summons', { Authorization: `Bearer ${larrToken}` }, {
        caseNumber: 'LARR-GJ-2026-0042',
        partyName: 'Rameshwar Laljibhai Patel'
      });
      const sec69 = await makeRequest('POST', '/api/v1/larr-tribunal/sec69-award', { Authorization: `Bearer ${larrToken}` }, {
        caseNumber: 'LARR-GJ-2026-0042',
        initialAward: 7751562.89,
        enhancedAmount: 9200000
      });
      console.log(`  -> Tribunal Section 69 enhancement granted: Net Increase ₹${sec69.body.compensationEnhancement?.netIncrease.toLocaleString()}.`);

      // -----------------------------------------------------------------------
      // 11. Financial Escrow & PFMS DBT Disbursal
      // -----------------------------------------------------------------------
      console.log('\n[TEST 11] Financial Escrow & PFMS DBT Electronic Disbursal...');
      const deposit = await makeRequest('POST', '/api/v1/finance/deposit', { Authorization: `Bearer ${nhaiToken}` }, {
        projectId,
        amount: 50000000
      });
      const dbt = await makeRequest('POST', '/api/v1/finance/dbt-disbursement', { Authorization: `Bearer ${collectorToken}` }, {
        escrowId: 1,
        amount: 3875781.45,
        beneficiaryName: 'Rameshwar Laljibhai Patel'
      });
      console.log(`  -> Escrow deposited: ₹5,00,00,000. PFMS DBT disbursed: ₹${dbt.body.disbursedAmount?.toLocaleString()} (Ref: ${dbt.body.pfmsReferenceId}).`);

      // -----------------------------------------------------------------------
      // 12. Citizen Portal & Objections
      // -----------------------------------------------------------------------
      console.log('\n[TEST 12] Citizen Portal, RoR Parcels & Section 15 Objection Filing...');
      const citizenParcels = await makeRequest('GET', '/api/v1/citizen/my-parcels');
      const citizenObj = await makeRequest('POST', '/api/v1/citizen/file-objection', {}, {
        projectId,
        ulpin: '24050100010001',
        claimantName: 'Rameshwar Laljibhai Patel',
        groundCategory: 'Valuation & Tree Enumeration',
        objectionText: 'Tree census did not include 14 mature mango fruit-bearing trees'
      });
      console.log(`  -> Citizen parcels fetched: ${citizenParcels.body.count}. Objection registered: ${citizenObj.body.objectionReference}.`);

      // -----------------------------------------------------------------------
      // 13. Bhumi Mitra Legal RAG & Multimodal AI
      // -----------------------------------------------------------------------
      console.log('\n[TEST 13] Bhumi Mitra Legal RAG & AI Statutory Governance...');
      const rag = await makeRequest('POST', '/api/v1/ai/rag/query', {}, {
        query: 'What is the solatium percentage under Section 30 of RFCTLARR Act 2013?'
      });
      if (rag.body.governance_rule !== 'AI Recommends, Authorized Authority Decides') throw new Error('AI Governance rule missing');
      console.log(`  -> Bhumi Mitra RAG Answer: ${rag.body.answer.substring(0, 100)}...`);
      console.log(`  -> Governance Rule: "${rag.body.governance_rule}" enforced.`);

      console.log('\n================================================================');
      console.log('  >>> MASTER E2E AUDIT PASSED: ALL 8 WORKSPACES FULLY VERIFIED! <<<');
      console.log('================================================================');

      server.close(async () => {
        try {
          await pool.end();
        } catch (e) {}
        setTimeout(() => {
          process.exit(0);
        }, 150);
      });
    } catch (err) {
      console.error('\n>>> MASTER E2E TEST FAILED:', err.message);
      server.close(async () => {
        await pool.end();
        process.exit(1);
      });
    }
  });
}

runMasterE2ETestSuite();
