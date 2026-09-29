const { Client } = require('pg');
require('dotenv').config();

async function checkParcels() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const parcels = await client.query('SELECT ulpin, survey_no, village_name, total_area_acre, land_use, statutory_status, ST_AsGeoJSON(geom) as geom_json FROM nlams.cadastral_parcels LIMIT 3');
  console.log('Parcels:', parcels.rows);
  await client.end();
}

checkParcels();
