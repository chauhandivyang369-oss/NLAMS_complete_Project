const http = require('http');

async function runM005NotificationsTest() {
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5095, async () => {
    console.log('M005 Test Server running on port 5095');

    function makeRequest(method, path, headers = {}, body = null) {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 5095,
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
      // 1. Verify SMTP Transporter Connectivity
      console.log('Step 1: Testing Nodemailer SMTP Transport Connectivity...');
      const smtpRes = await makeRequest('GET', '/api/v1/notifications/verify');
      console.log('SMTP status:', smtpRes.body);

      // 2. Log in as Requiring Body (NHAI)
      console.log('Step 2: Authenticating as Requiring Body...');
      const reqLogin = await makeRequest('POST', '/api/v1/auth/login', {}, {
        email: 'cgm-la@nhai.gov.in',
        password: 'Admin@123'
      });
      const nhaiToken = reqLogin.body.token;

      // 3. Dispatch Officer Commissioning Notification Email
      console.log('Step 3: Dispatching Officer Commissioning Email via Ethereal SMTP...');
      const inviteRes = await makeRequest('POST', '/api/v1/notifications/invite-officer', {
        Authorization: `Bearer ${nhaiToken}`
      }, {
        email: 'collector.anand@gov.in',
        officerName: 'Shri Pravin K. Solanki, IAS',
        roleGroup: 'Master District Collector & CALA',
        designation: 'Collector & District Magistrate, Anand',
        projectTitle: 'Petlad Railway Bypass Alignment'
      });

      console.log('Invite Result status:', inviteRes.status);
      console.log('Message ID:', inviteRes.body?.messageId);
      console.log('Ethereal Email Preview URL:', inviteRes.body?.previewUrl);

      if (inviteRes.status !== 200 || !inviteRes.body?.messageId) {
        throw new Error('Officer invitation email failed');
      }

      // 4. Log in as District Collector Anand
      console.log('Step 4: Authenticating as District Collector Anand...');
      const collLogin = await makeRequest('POST', '/api/v1/auth/login', {}, {
        email: 'collector.anand@gov.in',
        password: 'Admin@123'
      });
      const collectorToken = collLogin.body.token;

      // 5. Dispatch Citizen Section 15 Objection Acknowledgement Email
      console.log('Step 5: Dispatching Citizen Section 15 Objection Acknowledgement Email...');
      const ackRes = await makeRequest('POST', '/api/v1/notifications/citizen-objection-ack', {
        Authorization: `Bearer ${collectorToken}`
      }, {
        email: 'rameshwar.patel@farmer.in',
        claimantName: 'Rameshwar Laljibhai Patel',
        objectionId: '1004',
        ulpin: '24050100010001',
        hearingDate: '2026-10-15',
        groundCategory: 'Adequacy of Compensation & Multiplication Factor'
      });

      console.log('Citizen Ack status:', ackRes.status);
      console.log('Message ID:', ackRes.body?.messageId);
      console.log('Citizen Email Preview URL:', ackRes.body?.previewUrl);

      if (ackRes.status !== 200 || !ackRes.body?.messageId) {
        throw new Error('Citizen objection acknowledgement failed');
      }

      // 6. Process Pending Outbox Queue
      console.log('Step 6: Processing pending Outbox Events...');
      const outboxRes = await makeRequest('POST', '/api/v1/notifications/process-outbox', {
        Authorization: `Bearer ${collectorToken}`
      });
      console.log('Outbox Process Result:', outboxRes.body);
      if (outboxRes.status !== 200) {
        throw new Error('Outbox processing failed');
      }

      console.log('>>> M005 VERIFICATION PASSED: Nodemailer & Outbox Notification Engine verified!');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    } catch (err) {
      console.error('>>> M005 TEST FAILED:', err.message);
      server.close(async () => {
        await pool.end();
        process.exit(1);
      });
    }
  });
}

runM005NotificationsTest();
