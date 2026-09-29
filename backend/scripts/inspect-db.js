const { Client } = require('pg');
require('dotenv').config();

async function inspectDb() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  console.log('Connected to:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@'));
  const res = await client.query(`
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_schema IN ('public', 'nlams')
    ORDER BY table_schema, table_name;
  `);
  console.log(`Found ${res.rows.length} tables:`);
  res.rows.forEach(r => console.log(` - ${r.table_schema}.${r.table_name}`));

  // Check PostGIS
  try {
    const gisRes = await client.query('SELECT PostGIS_Version()');
    console.log('PostGIS Version:', gisRes.rows[0].postgis_version);
  } catch (e) {
    console.log('PostGIS not detected or error:', e.message);
  }

  await client.end();
}

inspectDb().catch(e => {
  console.error(e);
  process.exit(1);
});
