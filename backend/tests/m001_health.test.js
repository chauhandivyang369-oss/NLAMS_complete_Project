const http = require('http');

function checkHealth() {
  const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/health',
    method: 'GET'
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('HEALTH STATUS CODE:', res.statusCode);
      console.log('HEALTH RESPONSE BODY:', data);
      try {
        const json = JSON.parse(data);
        if (res.statusCode === 200 && json.status === 'HEALTHY' && json.database === 'CONNECTED') {
          console.log('>>> M001 VERIFICATION PASSED: Health endpoint working, database & PostGIS connected.');
          process.exit(0);
        } else {
          console.error('>>> M001 VERIFICATION FAILED: Health response unexpected.');
          process.exit(1);
        }
      } catch (e) {
        console.error('>>> M001 JSON PARSE ERROR:', e.message);
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.error('HTTP REQUEST ERROR:', err.message);
    process.exit(1);
  });

  req.end();
}

checkHealth();
