const http = require('http');

async function runM003GisTests() {
  require('tsx/cjs');
  const { app } = require('../src/app');
  const { pool } = require('../src/config/db');

  const server = app.listen(5097, async () => {
    console.log('M003 Test Server running on port 5097');

    function makeRequest(method, path, headers = {}, body = null, isBinary = false) {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 5097,
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
      // 1. Test Bhuvan WMS Reverse Proxy
      console.log('Step 1: Testing Bhuvan WMS Reverse Proxy...');
      const wmsRes = await makeRequest('GET', '/api/v1/gis/bhuvan-wms-proxy?server=vec2&SERVICE=WMS&REQUEST=GetMap&LAYERS=lulc:GJ_LULC50K_1516&BBOX=72.92,22.53,72.94,22.55&WIDTH=256&HEIGHT=256&FORMAT=image/png', {}, null, true);
      console.log('Bhuvan WMS Status:', wmsRes.status, 'Content-Type:', wmsRes.headers['content-type'], 'Buffer bytes:', wmsRes.buffer.length);
      if (wmsRes.status !== 200 || !wmsRes.headers['content-type']?.includes('image/')) {
        throw new Error('Bhuvan proxy failed to return valid image tile');
      }

      // 2. Test PostGIS Corridor Simulation & Parcel Slicing
      console.log('Step 2: Testing PostGIS Corridor Simulation & Slicing...');
      const simRes = await makeRequest('POST', '/api/v1/gis/simulate-corridor', {}, {
        geometry: {
          type: 'LineString',
          coordinates: [
            [72.9250, 22.5355],
            [72.9320, 22.5355]
          ]
        },
        bufferMeters: 50
      });

      console.log('Corridor simulation status:', simRes.status);
      console.log('Summary:', simRes.body?.summary);
      console.log('Intersected Parcels count:', simRes.body?.parcels?.length);

      if (simRes.status !== 200 || !simRes.body?.success) {
        throw new Error('Corridor simulation returned error');
      }

      if (!simRes.body.parcels || simRes.body.parcels.length === 0) {
        throw new Error('Corridor simulation returned 0 parcels when intersecting known Petlad cadastral data');
      }

      const sampleParcel = simRes.body.parcels[0];
      console.log('Sample sliced parcel:', {
        ulpin: sampleParcel.ulpin,
        surveyNo: sampleParcel.surveyNo,
        affectedAreaAcre: sampleParcel.affectedAreaAcre,
        impactPct: sampleParcel.impactPct,
        ownersCount: sampleParcel.owners?.length
      });

      if (typeof sampleParcel.affectedAreaAcre !== 'number' || typeof sampleParcel.impactPct !== 'number') {
        throw new Error('Invalid calculation values for affectedAreaAcre or impactPct');
      }

      // 3. Test Cadastral Search
      console.log('Step 3: Testing Parcel Search by query "Petlad"...');
      const searchRes = await makeRequest('GET', '/api/v1/gis/parcels/search?q=Petlad');
      console.log('Search status:', searchRes.status, 'Matches:', searchRes.body?.count);
      if (searchRes.status !== 200 || searchRes.body?.count === 0) {
        throw new Error('Parcel search failed');
      }

      // 4. Test Single Parcel Dossier
      console.log('Step 4: Testing Single Parcel Dossier for ULPIN 24050100010001...');
      const dossierRes = await makeRequest('GET', '/api/v1/gis/parcels/24050100010001');
      console.log('Dossier status:', dossierRes.status, 'Survey:', dossierRes.body?.data?.surveyNo, 'Owners:', dossierRes.body?.data?.owners?.length);
      if (dossierRes.status !== 200 || !dossierRes.body?.data) {
        throw new Error('Parcel dossier retrieval failed');
      }

      console.log('>>> M003 VERIFICATION PASSED: GIS Engine & PostGIS Corridor Slicing fully verified!');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    } catch (err) {
      console.error('>>> M003 TEST FAILED:', err.message);
      server.close(async () => {
        await pool.end();
        process.exit(1);
      });
    }
  });
}

runM003GisTests();
