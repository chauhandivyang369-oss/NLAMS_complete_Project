require('tsx/cjs');
const { pool } = require('../src/config/db');

async function inspectTables() {
  const tables = ['collector_inward_proposals', 'form1_submissions', 'form1_dispatch_packets', 'outbox_events'];
  for (const t of tables) {
    const res = await pool.query(
      `SELECT column_name, data_type, is_nullable 
       FROM information_schema.columns 
       WHERE table_schema = 'nlams' AND table_name = $1
       ORDER BY ordinal_position`,
      [t]
    );
    console.log(`\n=== Table: ${t} ===`);
    res.rows.forEach(r => console.log(`  ${r.column_name}: ${r.data_type} (nullable: ${r.is_nullable})`));
  }
  await pool.end();
}

inspectTables();
