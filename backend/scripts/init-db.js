const { Client } = require('pg');

async function fixAndCheckDb() {
  const client = new Client({ connectionString: 'postgresql://postgres:postgresql369@localhost:5432/postgres' });
  await client.connect();
  const res = await client.query('SELECT datname FROM pg_database');
  console.log('Current databases:', res.rows.map(r => `"${r.datname}"`));
  const spaceDb = res.rows.find(r => r.datname.trim() === 'NLAMS_Database' && r.datname !== 'NLAMS_Database');
  if (spaceDb) {
    console.log(`Found database "${spaceDb.datname}". Terminating active connections and renaming to "NLAMS_Database"...`);
    await client.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()`, [spaceDb.datname]);
    await client.query(`ALTER DATABASE "${spaceDb.datname}" RENAME TO "NLAMS_Database"`);
    console.log('Rename completed successfully!');
  }
  const hasDb = (await client.query('SELECT datname FROM pg_database')).rows.some(r => r.datname === 'NLAMS_Database');
  if (!hasDb) {
    console.log('Creating database "NLAMS_Database"...');
    await client.query('CREATE DATABASE "NLAMS_Database"');
  }
  await client.end();
  console.log('PostgreSQL database ready.');
}

fixAndCheckDb().catch(err => {
  console.error(err);
  process.exit(1);
});
