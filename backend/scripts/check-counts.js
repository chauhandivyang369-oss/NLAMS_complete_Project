const { Client } = require('pg');
require('dotenv').config();

async function checkCounts() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const tables = ['states', 'districts', 'talukas', 'villages', 'users', 'cadastral_parcels', 'projects', 'form1_requisitions'];
  for (const t of tables) {
    try {
      const res = await client.query(`SELECT count(*) FROM nlams.${t}`);
      console.log(`nlams.${t}: ${res.rows[0].count} rows`);
    } catch (e) {
      console.log(`nlams.${t}: error ${e.message}`);
    }
  }
  await client.end();
}

checkCounts();
