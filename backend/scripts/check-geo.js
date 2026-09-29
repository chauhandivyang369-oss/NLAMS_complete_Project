const { Client } = require('pg');
require('dotenv').config();

async function checkGeo() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const states = await client.query('SELECT * FROM nlams.states');
  console.log('States:', states.rows);
  const districts = await client.query('SELECT * FROM nlams.districts');
  console.log('Districts:', districts.rows);
  const projects = await client.query('SELECT project_id, project_code, project_title FROM nlams.projects');
  console.log('Projects:', projects.rows);
  await client.end();
}

checkGeo();
