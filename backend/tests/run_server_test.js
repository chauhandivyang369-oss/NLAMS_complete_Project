const http = require('http');

async function testServerInProcess() {
  // Use tsx to register typescript on the fly
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5099, async () => {
    console.log('Test server listening on port 5099');

    const req = http.request({
      hostname: 'localhost',
      port: 5099,
      path: '/health',
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        console.log('HEALTH STATUS CODE:', res.statusCode);
        console.log('HEALTH RESPONSE BODY:', data);
        const json = JSON.parse(data);
        const passed = (res.statusCode === 200 && json.status === 'HEALTHY' && json.database === 'CONNECTED' && json.postgis);
        
        server.close(async () => {
          await pool.end();
          if (passed) {
            console.log('>>> M001 VERIFICATION PASSED: Express server + PostgreSQL + PostGIS verified!');
            process.exit(0);
          } else {
            console.error('>>> M001 VERIFICATION FAILED');
            process.exit(1);
          }
        });
      });
    });

    req.on('error', (err) => {
      console.error('Request error:', err);
      server.close();
      pool.end();
      process.exit(1);
    });

    req.end();
  });
}

testServerInProcess().catch(err => {
  console.error(err);
  process.exit(1);
});
