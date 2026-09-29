const http = require('http');

async function runM006AiTests() {
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5094, async () => {
    console.log('M006 Test Server running on port 5094');

    function makeRequest(method, path, headers = {}, body = null) {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 5094,
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
      // 1. Test Bhumi Mitra Legal Statutory RAG
      console.log('Step 1: Testing Bhumi Mitra Legal RAG (/api/v1/ai/rag/query)...');
      const ragRes = await makeRequest('POST', '/api/v1/ai/rag/query', {}, {
        query: 'Under Section 19, what is the limitation period for declaration before preliminary notification lapses?'
      });

      console.log('RAG Status:', ragRes.status);
      console.log('Section Cited:', ragRes.body?.section_cited);
      console.log('Statutory Clock:', ragRes.body?.statutory_clock_days, 'days');
      console.log('Confidence Score:', ragRes.body?.confidence_score);
      console.log('Governance Rule:', ragRes.body?.governance_rule);
      console.log('Answer Excerpt:', ragRes.body?.answer?.substring(0, 140) + '...');

      if (
        ragRes.status !== 200 ||
        !ragRes.body?.answer ||
        ragRes.body?.governance_rule !== 'AI Recommends, Authorized Authority Decides' ||
        ragRes.body?.statutory_clock_days !== 365
      ) {
        throw new Error('Bhumi Mitra RAG test failed');
      }

      // 2. Test Form-I Multimodal OCR Extractor
      console.log('Step 2: Testing Form-I Multimodal OCR Extractor (/api/v1/ai/ocr/extract-form-1)...');
      const ocrRes = await makeRequest('POST', '/api/v1/ai/ocr/extract-form-1', {}, {
        rawText: 'Requisition Form-I for Petlad Highway Bypass in Anand District Gujarat'
      });

      console.log('OCR Status:', ocrRes.status);
      console.log('Extracted Fields:', ocrRes.body?.extracted_fields);
      console.log('Verification Status:', ocrRes.body?.verification_status);

      if (
        ocrRes.status !== 200 ||
        !ocrRes.body?.extracted_fields?.project_title ||
        !ocrRes.body?.extracted_fields?.survey_numbers?.length ||
        ocrRes.body?.verification_status !== 'HIGH_CONFIDENCE'
      ) {
        throw new Error('OCR extraction test failed');
      }

      // 3. Test Statutory SLA & Delay Predictor
      console.log('Step 3: Testing Statutory SLA & Bottleneck Predictor (/api/v1/ai/predict/bottleneck)...');
      const slaRes = await makeRequest('GET', '/api/v1/ai/predict/bottleneck?projectId=1');
      console.log('SLA Predictor Status:', slaRes.status);
      console.log('Statutory Risk Level:', slaRes.body?.predictive_analytics?.statutory_risk_level);
      console.log('Milestones count:', slaRes.body?.statutory_milestones?.length);

      if (slaRes.status !== 200 || !slaRes.body?.predictive_analytics?.statutory_risk_level) {
        throw new Error('Statutory SLA predictor test failed');
      }

      console.log('>>> M006 VERIFICATION PASSED: Legal RAG & Multimodal AI Services Engine fully verified!');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    } catch (err) {
      console.error('>>> M006 TEST FAILED:', err.message);
      server.close(async () => {
        await pool.end();
        process.exit(1);
      });
    }
  });
}

runM006AiTests();
