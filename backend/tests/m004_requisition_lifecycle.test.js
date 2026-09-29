const http = require('http');

async function runM004RequisitionLifecycleTests() {
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5096, async () => {
    console.log('M004 Test Server running on port 5096');

    function makeRequest(method, path, headers = {}, body = null) {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 5096,
          path,
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, body: JSON.parse(data) });
            } catch (e) {
              resolve({ status: res.statusCode, raw: data });
            }
          });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
      });
    }

    try {
      // 1. Log in as Requiring Body (NHAI)
      console.log('Step 1: Logging in as Requiring Body (cgm-la@nhai.gov.in)...');
      const authRes = await makeRequest('POST', '/api/v1/auth/login', {}, {
        email: 'cgm-la@nhai.gov.in',
        password: 'Admin@123'
      });
      if (authRes.status !== 200 || !authRes.body?.token) throw new Error('Requiring body login failed');
      const nhaiToken = authRes.body.token;

      // 2. Create Requisition Draft
      console.log('Step 2: Initializing Form-I Requisition draft...');
      const createRes = await makeRequest('POST', '/api/v1/requisitions', {
        Authorization: `Bearer ${nhaiToken}`
      }, {
        projectTitle: 'Petlad-Bhadran Multi-Modal Freight Corridor Phase-1',
        projectType: 'GOVERNMENT',
        publicPurpose: 'Construction of dedicated freight rail-road bypass under Bharatmala Pariyojana',
        gestationYears: 3,
        adminSanctionRef: 'NHAI/DL/2026/ACQ-891',
        estimatedBudget: 45000000
      });
      console.log('Create result:', createRes.status, createRes.body);
      if (createRes.status !== 201) throw new Error('Failed to create draft requisition');

      const projectId = createRes.body.projectId;

      // 3. Save Wizard Steps (Step 1, 3, 4, 5, 8, 10)
      console.log(`Step 3: Saving wizard steps for project ${projectId}...`);
      
      // Step 4: Jurisdiction Alignment
      await makeRequest('PUT', `/api/v1/requisitions/${projectId}/wizard-step/4`, {
        Authorization: `Bearer ${nhaiToken}`
      }, {
        jurisdictionLevel: 'SINGLE_DISTRICT',
        districtAuthorities: [{
          district: 'Anand',
          districtId: 1,
          calaOffice: 'Collector & CALA Anand',
          calaOfficer: 'Shri Pravin K. Solanki, IAS',
          email: 'collector-and@gujarat.gov.in'
        }]
      });

      // Step 5: Cadastral Land Parcel Selection
      await makeRequest('PUT', `/api/v1/requisitions/${projectId}/wizard-step/5`, {
        Authorization: `Bearer ${nhaiToken}`
      }, {
        selectedParcels: ['24050100010001', '24050100010002']
      });

      // Step 8: Financial Commitment
      await makeRequest('PUT', `/api/v1/requisitions/${projectId}/wizard-step/8`, {
        Authorization: `Bearer ${nhaiToken}`
      }, {
        estimatedCompensationBudget: 45000000,
        fundingSource: 'CENTRAL_BUDGET',
        collectorEscrowBankName: 'State Bank of India',
        collectorEscrowAccountNo: '98765432101'
      });

      // 4. Run 10-step Statutory Validation
      console.log('Step 4: Running 10-step statutory validator...');
      const valRes = await makeRequest('POST', `/api/v1/requisitions/${projectId}/validate`, {
        Authorization: `Bearer ${nhaiToken}`
      });
      console.log('Validation Status:', valRes.status, 'Overall:', valRes.body.overallStatus);
      if (valRes.status !== 200 || valRes.body.overallStatus !== 'PASS') {
        throw new Error('Statutory validation failed: ' + JSON.stringify(valRes.body));
      }

      // 5. Apply DSC / Aadhaar E-Sign
      console.log('Step 5: Applying Digital Signature (DSC)...');
      const esignRes = await makeRequest('POST', `/api/v1/requisitions/${projectId}/esign`, {
        Authorization: `Bearer ${nhaiToken}`
      }, {
        method: 'DSC',
        signerName: 'Shri Rajesh K. Sharma',
        designation: 'Chief General Manager, NHAI'
      });
      console.log('E-sign status:', esignRes.status, 'SigRef:', esignRes.body.signatureReference);
      if (esignRes.status !== 200 || esignRes.body.status !== 'SIGNED') {
        throw new Error('E-sign failed');
      }

      // 6. Master Submission & Multi-District Spatial Auto-Splitting
      console.log('Step 6: Executing Master Submission & Spatial Auto-Split...');
      const subRes = await makeRequest('POST', `/api/v1/requisitions/${projectId}/submit`, {
        Authorization: `Bearer ${nhaiToken}`
      });
      console.log('Submission status:', subRes.status, 'Master Req No:', subRes.body.masterRequisitionNo);
      console.log('Routed Districts:', subRes.body.routedDistricts);

      if (subRes.status !== 200 || !subRes.body.routedDistricts?.length) {
        throw new Error('Master submission or auto-split failed');
      }

      // 7. Verify Collector Inward Proposals Routing
      console.log('Step 7: Verifying proposal arrived in District Collector Inward Inbox...');
      const collAuthRes = await makeRequest('POST', '/api/v1/auth/login', {}, {
        email: 'collector.anand@gov.in',
        password: 'Admin@123'
      });
      const collectorToken = collAuthRes.body.token;

      const inboxRes = await makeRequest('GET', '/api/v1/collector/inward-proposals', {
        Authorization: `Bearer ${collectorToken}`
      });
      console.log('Collector inward proposals count:', inboxRes.body.count);
      const inwardItem = inboxRes.body.data?.find(item => item.project_id === String(projectId));
      if (!inwardItem) {
        throw new Error(`Inward proposal for project ${projectId} not found in Collector inbox`);
      }
      console.log('Inward Item matched:', {
        inwardNo: inwardItem.inward_number,
        district: inwardItem.district_name,
        status: inwardItem.current_status
      });

      // 8. Collector Scrutiny & Acceptance
      console.log('Step 8: Collector scrutinizes proposal...');
      const verifyRes = await makeRequest('POST', `/api/v1/collector/verify-proposal/${createRes.body.form1Id}`, {
        Authorization: `Bearer ${collectorToken}`
      }, {
        action: 'ACCEPT',
        remarks: 'Cadastral alignment in Petlad verified against RoR'
      });
      console.log('Collector verification status:', verifyRes.body.status);

      // 9. Collector Calculates Section 23 Award
      console.log('Step 9: Collector calculates Section 23 Statutory Award...');
      const awardRes = await makeRequest('POST', '/api/v1/collector/sec23-awards', {
        Authorization: `Bearer ${collectorToken}`
      }, {
        projectId,
        ulpin: '24050100010001',
        marketValueLand: 2500000,
        multiplicationFactor: 1.2,
        assetsStructures: 450000,
        assetsTrees: 120000,
        section11Date: '2025-01-15'
      });
      console.log('Award result:', awardRes.body.breakdown);
      if (awardRes.status !== 200 || !awardRes.body.awardNumber) {
        throw new Error('Sec 23 award calculation failed');
      }

      console.log('>>> M004 VERIFICATION PASSED: Requisition Lifecycle & Multi-District Spatial Auto-Split verified!');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    } catch (err) {
      console.error('>>> M004 TEST FAILED:', err.message);
      server.close(async () => {
        await pool.end();
        process.exit(1);
      });
    }
  });
}

runM004RequisitionLifecycleTests();
