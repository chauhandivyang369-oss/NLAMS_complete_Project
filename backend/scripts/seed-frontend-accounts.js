const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgresql369@localhost:5432/NLAMS_Database',
  options: '-c search_path=nlams,public'
});

const users = [
  { fullName: 'Shri Rajesh K. Varma, IAS', email: 'collector.ahmedabad@gov.in', mobile: '+91 98250 11223', roleGroup: 'district-collector', designation: 'District Collector / DM, Ahmedabad' },
  { fullName: 'Dr. Sunita Narain', email: 'nodal.central@dolr.gov.in', mobile: '+91 98101 44556', roleGroup: 'central-appropriate-gov', designation: 'Central Ministry Nodal Officer (DoLR)' },
  { fullName: 'Shri Manoj Aggarwal, IAS', email: 'sec.revenue@gujarat.gov.in', mobile: '+91 97129 33445', roleGroup: 'state-appropriate-gov', designation: 'Principal Secretary (Revenue)' },
  { fullName: 'Er. Vivek Saxena', email: 'pd.wdfc@dfccil.gov.in', mobile: '+91 94140 66778', roleGroup: 'requiring-body', designation: 'CPM / Project Director (DFCCIL)' },
  { fullName: 'Shri Arunabh Ghosh', email: 'policy.director@gov.in', mobile: '+91 98711 23456', roleGroup: 'policy-maker', designation: 'Finance Director & Apex Advisor' },
  { fullName: 'Prof. Arvind K. Joshi', email: 'ieg.chairperson@accred.org', mobile: '+91 98450 12345', roleGroup: 'sia-ieg', designation: 'IEG Reviewer / Expert Group Member' },
  { fullName: 'Smt. Ananya Sen, IAS', email: 'rnr.commissioner@gov.in', mobile: '+91 98300 77889', roleGroup: 'rr-authority', designation: 'R&R Commissioner' },
  { fullName: 'Hon. Justice (Retd.) B. N. Patel', email: 'larr.judge@judicial.gov.in', mobile: '+91 99090 88990', roleGroup: 'larr-authority', designation: 'Presiding Officer, LARR Tribunal' },
  { fullName: 'Ramesh Patel (Recorded Khatedar)', email: 'khatedar.ramesh@gmail.com', mobile: '+91 98255 44332', roleGroup: 'citizen', designation: 'Recorded Landowner / Khatedar' },
  { fullName: 'Dr. Vikramaditya Rathore, IAS', email: 'multi.officer@gov.in', mobile: '+91 98111 99887', roleGroup: 'central-appropriate-gov', designation: 'NMC Member & Policy Advisor' }
];

async function seed() {
  const hash = await bcrypt.hash('Admin@123', 10);
  console.log('Password hash generated.');

  for (const u of users) {
    const existing = await pool.query('SELECT user_id FROM nlams.users WHERE LOWER(email) = $1', [u.email.toLowerCase()]);
    if (existing.rows.length === 0) {
      await pool.query(
        'INSERT INTO nlams.users (full_name, email, mobile, password_hash, role_group, designation, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [u.fullName, u.email.toLowerCase(), u.mobile, hash, u.roleGroup, u.designation, 'ACTIVE']
      );
      console.log('Inserted:', u.email, '->', u.roleGroup);
    } else {
      await pool.query(
        'UPDATE nlams.users SET password_hash = $1, role_group = $2, designation = $3, status = $4 WHERE user_id = $5',
        [hash, u.roleGroup, u.designation, 'ACTIVE', existing.rows[0].user_id]
      );
      console.log('Updated:', u.email, '->', u.roleGroup);
    }
  }

  console.log('All statutory accounts seeded successfully into nlams.users.');
  await pool.end();
}

seed().catch(err => {
  console.error('Seed error:', err);
  pool.end();
});
