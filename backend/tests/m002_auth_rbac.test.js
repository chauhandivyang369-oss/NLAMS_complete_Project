const http = require('http');

async function runM002Tests() {
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5098, async () => {
    console.log('M002 Test Server running on port 5098');

    function makeRequest(method, path, headers = {}, body = null) {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 5098,
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
      // 1. Seed statutory accounts
      console.log('Step 1: Seeding statutory accounts...');
      const seedRes = await makeRequest('POST', '/api/v1/auth/seed');
      console.log('Seed response:', seedRes.status, seedRes.body.message || seedRes.body);
      if (seedRes.status !== 200) throw new Error('Seeding failed');

      // 2. Login as Anand District Collector
      console.log('Step 2: Login as Anand District Collector...');
      const loginRes = await makeRequest('POST', '/api/v1/auth/login', {}, {
        email: 'collector.anand@gov.in',
        password: 'Admin@123'
      });
      console.log('Login status:', loginRes.status, 'User:', loginRes.body.user?.email);
      if (loginRes.status !== 200 || !loginRes.body.token) throw new Error('Collector login failed');

      const collectorToken = loginRes.body.token;

      // 3. Verify /me endpoint
      console.log('Step 3: Checking /me with Bearer token...');
      const meRes = await makeRequest('GET', '/api/v1/auth/me', {
        Authorization: `Bearer ${collectorToken}`
      });
      console.log('/me status:', meRes.status, 'Role:', meRes.body.user?.roleGroup, 'District:', meRes.body.user?.districtName);
      if (meRes.status !== 200 || meRes.body.user?.roleGroup !== 'district-collector') {
        throw new Error('/me verification failed');
      }

      // 4. Test 3D-RBAC Dimension 1: Functional Scope Check
      // Collector should NOT be allowed to access Central Government only endpoint
      console.log('Step 4: Testing 3D-RBAC Dimension 1 (Functional Scope)...');
      const d1Res = await makeRequest('GET', '/api/v1/auth/test-rbac/functional-central-only', {
        Authorization: `Bearer ${collectorToken}`
      });
      console.log('Dimension 1 status (Expected 403):', d1Res.status, d1Res.body.error?.code);
      if (d1Res.status !== 403 || d1Res.body.error?.code !== 'SCOPE_DENIED') {
        throw new Error('3D-RBAC Dimension 1 failed: Collector was not properly blocked from Central Govt scope');
      }

      // 5. Test 3D-RBAC Dimension 2: Jurisdictional Scope Check
      // Collector for District 1 (Anand) should succeed on District 1, but fail on District 99 (Vadodara)
      console.log('Step 5: Testing 3D-RBAC Dimension 2 (Jurisdictional Scope)...');
      const d2Success = await makeRequest('POST', '/api/v1/auth/test-rbac/jurisdiction/1', {
        Authorization: `Bearer ${collectorToken}`
      });
      console.log('District 1 access status (Expected 200):', d2Success.status);
      if (d2Success.status !== 200) throw new Error('Collector failed on authorized District 1');

      const d2Denied = await makeRequest('POST', '/api/v1/auth/test-rbac/jurisdiction/99', {
        Authorization: `Bearer ${collectorToken}`
      });
      console.log('District 99 access status (Expected 403 JURISDICTION_VIOLATION):', d2Denied.status, d2Denied.body.error?.code);
      if (d2Denied.status !== 403 || d2Denied.body.error?.code !== 'JURISDICTION_VIOLATION') {
        throw new Error('3D-RBAC Dimension 2 failed: Collector was not blocked on out-of-jurisdiction District 99');
      }

      console.log('>>> M002 VERIFICATION PASSED: JWT Authentication & 3D-RBAC fully verified!');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    } catch (err) {
      console.error('>>> M002 TEST FAILED:', err.message);
      server.close(async () => {
        await pool.end();
        process.exit(1);
      });
    }
  });
}

runM002Tests();
