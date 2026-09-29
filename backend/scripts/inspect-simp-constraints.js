require('tsx/cjs');
const { pool } = require('../src/config/db');

async function inspectSimpConstraints() {
  const res = await pool.query(
    `SELECT conname, pg_get_constraintdef(c.oid) 
     FROM pg_constraint c 
     JOIN pg_namespace n ON n.oid = c.connamespace 
     WHERE n.nspname = 'nlams' AND conrelid = 'nlams.sia_simp_items'::regclass`
  );
  console.log('sia_simp_items constraints:', res.rows);
  await pool.end();
}

inspectSimpConstraints();
