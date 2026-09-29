require('tsx/cjs');
const { pool } = require('../src/config/db');

async function inspectObjections() {
  const res = await pool.query(
    `SELECT column_name, data_type 
     FROM information_schema.columns 
     WHERE table_schema = 'nlams' AND table_name = 'objections_sec15'
     ORDER BY ordinal_position`
  );
  console.log('objections_sec15 columns:', res.rows.map(r => `${r.column_name} (${r.data_type})`));
  await pool.end();
}

inspectObjections();
