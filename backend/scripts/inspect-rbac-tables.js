const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:postgresql369@localhost:5432/NLAMS_Database',
  options: '-c search_path=nlams,public'
});

async function run() {
  const r = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='nlams' AND (table_name LIKE '%role%' OR table_name LIKE '%rbac%' OR table_name LIKE '%delegat%' OR table_name LIKE '%user%' OR table_name LIKE '%assign%')"
  );
  console.log(r.rows);
  await pool.end();
}
run().catch(console.error);
