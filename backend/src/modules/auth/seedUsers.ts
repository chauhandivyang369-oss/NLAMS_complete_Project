import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

export const SEEDED_OFFICIAL_USERS = [
  {
    fullName: 'Shri Pravin K. Solanki, IAS',
    email: 'collector.anand@gov.in',
    mobile: '+91 98250 11223',
    password: 'Admin@123',
    roleGroup: 'district-collector',
    designation: 'District Collector & CALA, Anand',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Dr. Sunita Narain',
    email: 'nodal.central@dolr.gov.in',
    mobile: '+91 98101 44556',
    password: 'Admin@123',
    roleGroup: 'central-appropriate-gov',
    designation: 'Central Ministry Nodal Officer (DoLR)',
    stateId: null,
    districtId: null
  },
  {
    fullName: 'Shri Manoj Aggarwal, IAS',
    email: 'sec.revenue@gujarat.gov.in',
    mobile: '+91 97129 33445',
    password: 'Admin@123',
    roleGroup: 'state-appropriate-gov',
    designation: 'Principal Secretary (Revenue), Govt of Gujarat',
    stateId: 1,
    districtId: null
  },
  {
    fullName: 'Shri Rajesh K. Sharma',
    email: 'cgm-la@nhai.gov.in',
    mobile: '+91 98765 43210',
    password: 'Admin@123',
    roleGroup: 'requiring-body',
    designation: 'Chief General Manager (Land Acquisition), NHAI',
    stateId: null,
    districtId: null
  },
  {
    fullName: 'Prof. Arvind Patel',
    email: 'sia.evaluator@gujarat.gov.in',
    mobile: '+91 94260 55667',
    password: 'Admin@123',
    roleGroup: 'sia-ieg',
    designation: 'Chairperson, SIA & IEG Expert Group',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Smt. Geeta B. Rathwa, GAS',
    email: 'commissioner.rr@gujarat.gov.in',
    mobile: '+91 98240 77889',
    password: 'Admin@123',
    roleGroup: 'rr-authority',
    designation: 'Commissioner, Rehabilitation & Resettlement',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Hon. Justice (Retd.) D. K. Trivedi',
    email: 'registrar.larr@gujarat.gov.in',
    mobile: '+91 98251 99001',
    password: 'Admin@123',
    roleGroup: 'larr-authority',
    designation: 'Presiding Officer, LARR Tribunal',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Dr. Vivek Joshi',
    email: 'advisor.policy@niti.gov.in',
    mobile: '+91 98110 22334',
    password: 'Admin@123',
    roleGroup: 'policy-maker',
    designation: 'Senior Advisor (Infrastructure & Land), NITI Aayog',
    stateId: null,
    districtId: null
  },
  {
    fullName: 'Rameshwar Laljibhai Patel',
    email: 'rameshwar.patel@farmer.in',
    mobile: '+91 98980 12345',
    password: 'Admin@123',
    roleGroup: 'citizen',
    designation: 'Affected Landowner (ULPIN: 24050100010001)',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Shri Rajesh K. Varma, IAS',
    email: 'collector.ahmedabad@gov.in',
    mobile: '+91 98250 11223',
    password: 'Admin@123',
    roleGroup: 'district-collector',
    designation: 'District Collector / DM, Ahmedabad',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Er. Vivek Saxena',
    email: 'pd.wdfc@dfccil.gov.in',
    mobile: '+91 94140 66778',
    password: 'Admin@123',
    roleGroup: 'requiring-body',
    designation: 'CPM / Project Director (DFCCIL)',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Shri Arunabh Ghosh',
    email: 'policy.director@gov.in',
    mobile: '+91 98711 23456',
    password: 'Admin@123',
    roleGroup: 'policy-maker',
    designation: 'Finance Director & Apex Advisor, NITI Aayog',
    stateId: null,
    districtId: null
  },
  {
    fullName: 'Prof. Arvind K. Joshi',
    email: 'ieg.chairperson@accred.org',
    mobile: '+91 98450 12345',
    password: 'Admin@123',
    roleGroup: 'sia-ieg',
    designation: 'IEG Reviewer / Expert Group Member',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Smt. Ananya Sen, IAS',
    email: 'rnr.commissioner@gov.in',
    mobile: '+91 98300 77889',
    password: 'Admin@123',
    roleGroup: 'rr-authority',
    designation: 'R&R Commissioner',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Hon. Justice (Retd.) B. N. Patel',
    email: 'larr.judge@judicial.gov.in',
    mobile: '+91 99090 88990',
    password: 'Admin@123',
    roleGroup: 'larr-authority',
    designation: 'Presiding Officer, LARR Tribunal',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Ramesh Patel (Recorded Khatedar)',
    email: 'khatedar.ramesh@gmail.com',
    mobile: '+91 98255 44332',
    password: 'Admin@123',
    roleGroup: 'citizen',
    designation: 'Recorded Landowner / Khatedar',
    stateId: 1,
    districtId: 1
  },
  {
    fullName: 'Dr. Vikramaditya Rathore, IAS',
    email: 'multi.officer@gov.in',
    mobile: '+91 98111 99887',
    password: 'Admin@123',
    roleGroup: 'central-appropriate-gov',
    designation: 'NMC Member & Policy Advisor',
    stateId: null,
    districtId: null
  },
  {
    fullName: 'System Super Administrator',
    email: 'admin@nlams.gov.in',
    mobile: '+91 99999 99999',
    password: 'Admin@123',
    roleGroup: 'ADMIN',
    designation: 'National Systems Administrator',
    stateId: null,
    districtId: null
  }
];

export async function seedStatutoryUsers(): Promise<void> {
  for (const u of SEEDED_OFFICIAL_USERS) {
    const existing = await pool.query('SELECT user_id FROM nlams.users WHERE email = $1', [u.email]);
    if (!existing.rows.length) {
      const hash = await bcrypt.hash(u.password, 10);
      await pool.query(
        `INSERT INTO nlams.users (full_name, email, mobile, password_hash, role_group, designation, state_id, district_id, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'ACTIVE')`,
        [u.fullName, u.email, u.mobile, hash, u.roleGroup, u.designation, u.stateId, u.districtId]
      );
      Logger.info(`Seeded official statutory user: ${u.email} (${u.roleGroup})`);
    }
  }
}
