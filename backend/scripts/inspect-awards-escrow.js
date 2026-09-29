require('tsx/cjs');
const { pool } = require('../src/config/db');

async function inspectAwardAndEscrow() {
  const tables = ['awards_sec23', 'escrow_accounts'];
  for (const t of tables) {
    const res = await pool.query(
      `SELECT column_name, data_type 
       FROM information_schema.columns 
       WHERE table_schema = 'nlams' AND table_name = $1
       ORDER BY ordinal_position`,
      [t]
    );
    console.log(`\n=== Table: ${t} ===`);
    res.rows.forEach(r => console.log(`  ${r.column_name}: ${r.data_type}`));
  }
  await pool.end();
}

inspectAwardAndEscrow();
