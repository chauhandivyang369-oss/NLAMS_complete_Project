/**
 * NLAMS - Official Authentication & RBAC Service Layer
 * 
 * Provides production-style authentication, password verification,
 * cascading organization/jurisdiction master data, RBAC resolution,
 * and workspace routing for the 8 Master Workspaces + Citizen Portal.
 */
import axios from 'axios';

const STORAGE_USERS_KEY = 'nlams_registered_users';
const STORAGE_SESSION_KEY = 'nlams_active_session';
const STORAGE_AUDIT_KEY = 'nlams_auth_audit_log';

// 8 Master Workspace Pillars + Citizen Category
export const MASTER_WORKSPACE_CATEGORIES = [
  { id: 'central-appropriate-gov', label: 'Central Appropriate Government', pillarNum: 1 },
  { id: 'state-appropriate-gov', label: 'State Appropriate Government', pillarNum: 2 },
  { id: 'requiring-body', label: 'Requiring Body', pillarNum: 3 },
  { id: 'district-collector', label: 'Master District Collector', pillarNum: 4 },
  { id: 'policy-maker', label: 'Policy Maker / Executive Analytics', pillarNum: 5 },
  { id: 'sia-ieg', label: 'SIA & IEG Evaluation', pillarNum: 6 },
  { id: 'rr-authority', label: 'R&R Authority', pillarNum: 7 },
  { id: 'larr-authority', label: 'LARR Authority / Judicial Tribunal', pillarNum: 8 },
  { id: 'citizen', label: 'Citizen / Affected Landowner', pillarNum: 9 }
];

// Pre-configured official statutory accounts for all 8 workspaces + citizen
export const PRE_SEEDED_ACCOUNTS = [
  {
    id: 'usr_collector_01',
    fullName: 'Shri Rajesh K. Varma, IAS',
    username: 'collector_ahmedabad',
    email: 'collector.ahmedabad@gov.in',
    mobile: '+91 98250 11223',
    passwordHash: 'Admin@123',
    userType: 'Master District Collector',
    workspaces: ['district-collector'],
    primaryWorkspace: 'district-collector',
    role: 'District Collector / DM',
    designationId: 7,
    organization: 'District Collectorate, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_collector_menus']
  },
  {
    id: 'usr_central_01',
    fullName: 'Dr. Sunita Narain',
    username: 'nodal_central_dolr',
    email: 'nodal.central@dolr.gov.in',
    mobile: '+91 98101 44556',
    passwordHash: 'Admin@123',
    userType: 'Central Appropriate Government',
    workspaces: ['central-appropriate-gov'],
    primaryWorkspace: 'central-appropriate-gov',
    role: 'Central Ministry Nodal Officer',
    designationId: 2,
    organization: 'Department of Land Resources (DoLR), MoRD',
    state: 'Delhi (National)',
    district: 'New Delhi',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_central_menus']
  },
  {
    id: 'usr_state_01',
    fullName: 'Shri Manoj Aggarwal, IAS',
    username: 'sec_revenue_guj',
    email: 'sec.revenue@gujarat.gov.in',
    mobile: '+91 97129 33445',
    passwordHash: 'Admin@123',
    userType: 'State Appropriate Government',
    workspaces: ['state-appropriate-gov'],
    primaryWorkspace: 'state-appropriate-gov',
    role: 'Principal Secretary / Revenue',
    designationId: 4,
    organization: 'Revenue & Disaster Management Dept, Govt of Gujarat',
    state: 'Gujarat',
    district: 'Gandhinagar',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_state_menus']
  },
  {
    id: 'usr_req_01',
    fullName: 'Er. Vivek Saxena',
    username: 'pd_wdfc_dfccil',
    email: 'pd.wdfc@dfccil.gov.in',
    mobile: '+91 94140 66778',
    passwordHash: 'Admin@123',
    userType: 'Requiring Body',
    workspaces: ['requiring-body'],
    primaryWorkspace: 'requiring-body',
    role: 'CPM / Project Director',
    designationId: 13,
    organization: 'Dedicated Freight Corridor Corp of India (DFCCIL)',
    project: 'Western Dedicated Freight Corridor (WDFC)',
    state: 'Gujarat',
    district: 'Vadodara',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_requiring_body_menus']
  },
  {
    id: 'usr_policy_01',
    fullName: 'Shri Arunabh Ghosh',
    username: 'finance_director_mord',
    email: 'policy.director@gov.in',
    mobile: '+91 98711 23456',
    passwordHash: 'Admin@123',
    userType: 'Policy Maker / Executive Analytics',
    workspaces: ['policy-maker'],
    primaryWorkspace: 'policy-maker',
    role: 'Finance Director & Apex Advisor',
    designationId: 3,
    organization: 'Niti Aayog Infrastructure & Land Advisory Wing',
    state: 'National',
    district: 'New Delhi',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_policy_menus']
  },
  {
    id: 'usr_sia_01',
    fullName: 'Prof. Arvind K. Joshi',
    username: 'ieg_evaluator_lead',
    email: 'ieg.chairperson@accred.org',
    mobile: '+91 98450 12345',
    passwordHash: 'Admin@123',
    userType: 'SIA & IEG Evaluation',
    workspaces: ['sia-ieg'],
    primaryWorkspace: 'sia-ieg',
    role: 'IEG Reviewer / Expert Group Member',
    designationId: 6,
    organization: 'State Social Impact Assessment Directorate',
    state: 'Gujarat',
    district: 'Statewide Accreditation',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_sia_menus']
  },
  {
    id: 'usr_rnr_01',
    fullName: 'Smt. Ananya Sen, IAS',
    username: 'rnr_commissioner',
    email: 'rnr.commissioner@gov.in',
    mobile: '+91 98300 77889',
    passwordHash: 'Admin@123',
    userType: 'R&R Authority',
    workspaces: ['rr-authority'],
    primaryWorkspace: 'rr-authority',
    role: 'R&R Commissioner',
    designationId: 5,
    organization: 'State Directorate of Rehabilitation & Resettlement',
    state: 'Gujarat',
    district: 'Gandhinagar',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_rr_menus']
  },
  {
    id: 'usr_larr_01',
    fullName: 'Hon. Justice (Retd.) B. N. Patel',
    username: 'larr_presiding_officer',
    email: 'larr.judge@judicial.gov.in',
    mobile: '+91 99090 88990',
    passwordHash: 'Admin@123',
    userType: 'LARR Authority / Judicial Tribunal',
    workspaces: ['larr-authority'],
    primaryWorkspace: 'larr-authority',
    role: 'Presiding Officer (Judicial Officer)',
    designationId: 17,
    organization: 'Land Acquisition, Rehabilitation & Resettlement Authority',
    state: 'Gujarat',
    district: 'Ahmedabad Bench',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['all_larr_menus']
  },
  {
    id: 'usr_citizen_01',
    fullName: 'Ramesh Patel (Recorded Khatedar)',
    username: 'khatedar_ramesh',
    email: 'khatedar.ramesh@gmail.com',
    mobile: '+91 98255 44332',
    passwordHash: 'Admin@123',
    userType: 'Citizen / Affected Landowner',
    workspaces: ['citizen'],
    primaryWorkspace: 'citizen',
    role: 'Recorded Landowner / Khatedar',
    designationId: 15,
    organization: 'Village Vadadla, Bharuch (Khasra 142/A)',
    state: 'Gujarat',
    district: 'Bharuch',
    ulpin: 'GJ-BRD-2024-8842-991A',
    surveyNo: '142/A',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['citizen_all']
  },
  {
    id: 'usr_multi_01',
    fullName: 'Dr. Vikramaditya Rathore, IAS',
    username: 'multi_officer_apex',
    email: 'multi.officer@gov.in',
    mobile: '+91 98111 99887',
    passwordHash: 'Admin@123',
    userType: 'Central Appropriate Government',
    workspaces: ['central-appropriate-gov', 'policy-maker'],
    primaryWorkspace: 'central-appropriate-gov',
    role: 'NMC Member & Policy Advisor',
    designationId: 1,
    organization: 'National Monitoring Committee & MoRD Policy Wing',
    state: 'Delhi (National)',
    district: 'New Delhi',
    status: 'ACTIVE',
    rbacStatus: 'ACTIVE',
    allowedMenus: ['central_all', 'policy_all']
  }
];

// Reference Data for Dependent Dropdowns
export const REFERENCE_CENTRAL_MINISTRIES = [
  { id: 'mord_dolr', name: 'Department of Land Resources (DoLR), MoRD', ministry: 'Ministry of Rural Development' },
  { id: 'morth_nhai', name: 'Ministry of Road Transport & Highways (MoRTH) / NHAI', ministry: 'Ministry of Road Transport & Highways' },
  { id: 'railways_dfccil', name: 'Ministry of Railways / DFCCIL Nodal Cell', ministry: 'Ministry of Railways' },
  { id: 'power_ntpc', name: 'Ministry of Power / NTPC / POWERGRID', ministry: 'Ministry of Power' },
  { id: 'coal_cil', name: 'Ministry of Coal / Coal India Ltd (CIL)', ministry: 'Ministry of Coal' },
  { id: 'defence', name: 'Ministry of Defence (Directorate General Defence Estates)', ministry: 'Ministry of Defence' },
  { id: 'ports_shipping', name: 'Ministry of Ports, Shipping & Waterways', ministry: 'Ministry of Ports, Shipping & Waterways' },
  { id: 'petroleum_gail', name: 'Ministry of Petroleum & Natural Gas / GAIL / IOCL', ministry: 'Ministry of Petroleum & Natural Gas' },
  { id: 'atomic_energy', name: 'Department of Atomic Energy (DAE)', ministry: 'Department of Atomic Energy' }
];

export const REFERENCE_STATES_MAP = {
  'Gujarat': ['Ahmedabad', 'Bharuch', 'Vadodara', 'Surat', 'Gandhinagar', 'Anand', 'Kheda', 'Valsad', 'Mehsana', 'Rajkot'],
  'Maharashtra': ['Mumbai Suburban', 'Thane', 'Palghar', 'Pune', 'Nashik', 'Nagpur', 'Raigad', 'Aurangabad'],
  'Uttar Pradesh': ['Gautam Buddha Nagar', 'Ghaziabad', 'Varanasi', 'Lucknow', 'Mathura', 'Agra', 'Kanpur Nagar', 'Prayagraj'],
  'Rajasthan': ['Jaipur', 'Alwar', 'Ajmer', 'Jodhpur', 'Kota', 'Bhilwara', 'Udaipur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Delhi (National)': ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi']
};

export const REFERENCE_REQUIRING_BODIES = {
  'Government': [
    { id: 'dfccil', name: 'Dedicated Freight Corridor Corp of India (DFCCIL)', assocGov: 'Ministry of Railways' },
    { id: 'nhai', name: 'National Highways Authority of India (NHAI)', assocGov: 'Ministry of Road Transport & Highways' },
    { id: 'nhsrcl', name: 'National High Speed Rail Corp Ltd (NHSRCL)', assocGov: 'Ministry of Railways' },
    { id: 'ntpc', name: 'NTPC Energy Corridors', assocGov: 'Ministry of Power' },
    { id: 'powergrid', name: 'Power Grid Corporation of India Ltd', assocGov: 'Ministry of Power' },
    { id: 'aai', name: 'Airports Authority of India (AAI)', assocGov: 'Ministry of Civil Aviation' }
  ],
  'Private': [
    { id: 'adani_ports', name: 'Special Economic Zone & Port Logistics Pvt Ltd', assocGov: 'State Revenue Department' },
    { id: 'tata_power', name: 'Transmission Lines & Renewable Infra Pvt Ltd', assocGov: 'State Energy Department' },
    { id: 'industrial_park', name: 'Integrated Industrial Township Developers', assocGov: 'State Development Authority' }
  ],
  'PPP': [
    { id: 'dme_spv', name: 'Delhi-Mumbai Expressway SPV (PPP Concession)', assocGov: 'MoRTH' },
    { id: 'jewar_spv', name: 'Noida International Airport Ltd (PPP SPV)', assocGov: 'Govt of Uttar Pradesh' },
    { id: 'metro_ppp', name: 'Metropolitan Urban Rail Transit SPV', assocGov: 'Urban Development Dept' }
  ]
};

// Helper: Get stored users
export function getAllUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(PRE_SEEDED_ACCOUNTS));
      return PRE_SEEDED_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : PRE_SEEDED_ACCOUNTS;
  } catch (err) {
    console.error('Error reading users from storage:', err);
    return PRE_SEEDED_ACCOUNTS;
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving users:', err);
  }
}

export function logAuthAudit(action, metadata = {}) {
  try {
    const raw = localStorage.getItem(STORAGE_AUDIT_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    const event = {
      id: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      ...metadata
    };
    logs.unshift(event);
    if (logs.length > 100) logs.pop();
    localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Error logging audit event:', err);
  }
}

/**
 * Primary Authentication Method
 */
export async function authenticateCredentials(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail || !cleanPassword) {
    return {
      success: false,
      error: 'Please enter both email address and password.'
    };
  }

  // 1. Authenticate with live Backend & PostgreSQL Database
  try {
    const apiRes = await axios.post('/api/v1/auth/login', {
      email: cleanEmail,
      password: cleanPassword
    }, { timeout: 8000 });

    if (apiRes.data?.success && apiRes.data?.user) {
      const u = apiRes.data.user;
      const targetWs = u.primaryWorkspace || ((u.grantedMenus && u.grantedMenus.length) ? 'delegated-workspace' : 'district-collector');
      const allLocalUsers = getAllUsers();
      const localAcc = allLocalUsers.find(lu => lu.email.toLowerCase() === cleanEmail);
      const workspaces = (localAcc && Array.isArray(localAcc.workspaces) && localAcc.workspaces.length > 1)
        ? localAcc.workspaces
        : [targetWs];

      const sessionUser = {
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        mobile: u.mobile,
        userType: u.roleGroup,
        role: u.designation || u.roleGroup,
        category: u.category,
        committeeType: u.committeeType,
        projectName: u.projectName,
        gazetteOrderNo: u.gazetteOrderNo,
        grantedMenus: u.grantedMenus || [],
        allowedMenus: u.grantedMenus || [],
        primaryWorkspace: targetWs,
        workspaces: workspaces,
        token: apiRes.data.token,
        status: 'ACTIVE',
        rbacStatus: 'ACTIVE'
      };

      localStorage.setItem('nlams_jwt_token', apiRes.data.token);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({
        token: apiRes.data.token,
        user: sessionUser,
        loginAt: new Date().toISOString()
      }));

      logAuthAudit('LOGIN_SUCCESS_API', { email: cleanEmail, userId: u.id, roleGroup: u.roleGroup });

      return {
        success: true,
        user: sessionUser,
        token: apiRes.data.token,
        primaryWorkspace: targetWs,
        hasMultipleWorkspaces: workspaces.length > 1
      };
    }
  } catch (apiErr) {
    const allLocalUsers = getAllUsers();
    const hasLocalUser = allLocalUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (!hasLocalUser && apiErr.response?.data?.error?.code === 'AUTH_FAILED') {
      return {
        success: false,
        error: apiErr.response.data.error.message || 'Invalid email or password.'
      };
    }
    console.warn('[authService] API login failed or account fallback needed:', apiErr.message);
  }

  // 2. Offline / Mock fallback
  const allUsers = getAllUsers();
  const user = allUsers.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    logAuthAudit('LOGIN_FAILED', { email: cleanEmail, reason: 'USER_NOT_FOUND' });
    return {
      success: false,
      error: 'Invalid email or password.'
    };
  }

  if (user.passwordHash !== cleanPassword) {
    logAuthAudit('LOGIN_FAILED', { email: cleanEmail, reason: 'PASSWORD_MISMATCH' });
    return {
      success: false,
      error: 'Invalid email or password.'
    };
  }

  if (user.status === 'DISABLED' || user.status === 'SUSPENDED') {
    logAuthAudit('LOGIN_REJECTED', { email: cleanEmail, status: user.status });
    return {
      success: false,
      error: 'Your account is currently inactive. Please contact the appropriate administrator.'
    };
  }

  if (user.rbacStatus === 'PENDING_AUTHORIZATION') {
    return {
      success: false,
      error: 'Your account has been created, but workspace access is pending statutory authorization.',
      isPendingRbac: true,
      user
    };
  }

  if (!user.workspaces || user.workspaces.length === 0) {
    return {
      success: false,
      error: 'Your account is authenticated, but no workspace access has been provisioned.'
    };
  }

  // Session Token
  const sessionToken = `NLAMS-SESS-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const session = {
    userId: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    userType: user.userType,
    role: user.role,
    workspaces: user.workspaces,
    primaryWorkspace: user.primaryWorkspace || user.workspaces[0],
    organization: user.organization,
    state: user.state,
    district: user.district,
    sessionToken,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  logAuthAudit('LOGIN_SUCCESS', { userId: user.id, email: user.email, role: user.role });

  return {
    success: true,
    user,
    session,
    hasMultipleWorkspaces: user.workspaces.length > 1
  };
}

/**
 * Account Registration Method
 */
export async function registerNewAccount(registrationData) {
  await new Promise(r => setTimeout(r, 550));

  const {
    fullName,
    username,
    email,
    mobile,
    password,
    workspaceCategory,
    organization,
    state,
    district,
    role,
    ulpin,
    surveyNo
  } = registrationData;

  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || '').trim().toLowerCase();

  const allUsers = getAllUsers();

  if (allUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
    return {
      success: false,
      error: 'An account is already registered with this email address.'
    };
  }

  if (allUsers.some(u => (u.username || '').toLowerCase() === cleanUsername)) {
    return {
      success: false,
      error: 'This username is already taken. Please choose another username.'
    };
  }

  let mappedWorkspaceKey = 'citizen';
  const isCitizen = workspaceCategory === 'Citizen / Affected Landowner';

  if (workspaceCategory === 'Central Appropriate Government') mappedWorkspaceKey = 'central-appropriate-gov';
  else if (workspaceCategory === 'State Appropriate Government') mappedWorkspaceKey = 'state-appropriate-gov';
  else if (workspaceCategory === 'Master District Collector' || workspaceCategory === 'District Collector') mappedWorkspaceKey = 'district-collector';
  else if (workspaceCategory === 'Requiring Body') mappedWorkspaceKey = 'requiring-body';
  else if (workspaceCategory === 'Policy Maker / Executive Analytics' || workspaceCategory === 'Policy Maker') mappedWorkspaceKey = 'policy-maker';
  else if (workspaceCategory === 'SIA & IEG Evaluation' || workspaceCategory === 'SIA & IEG') mappedWorkspaceKey = 'sia-ieg';
  else if (workspaceCategory === 'R&R Authority') mappedWorkspaceKey = 'rr-authority';
  else if (workspaceCategory === 'LARR Authority / Judicial Tribunal' || workspaceCategory === 'LARR Authority') mappedWorkspaceKey = 'larr-authority';
  else if (isCitizen) mappedWorkspaceKey = 'citizen';

  const isInstitutional = !isCitizen;
  const initialRbacStatus = isInstitutional ? 'PENDING_AUTHORIZATION' : 'ACTIVE';
  const initialStatus = 'ACTIVE';

  const regId = `NLAMS-REG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newUser = {
    id: `usr_${Date.now()}`,
    regId,
    fullName: (fullName || '').trim(),
    username: cleanUsername,
    email: cleanEmail,
    mobile: (mobile || '').trim(),
    passwordHash: password,
    userType: workspaceCategory,
    workspaces: [mappedWorkspaceKey],
    primaryWorkspace: mappedWorkspaceKey,
    role: role || (isCitizen ? 'Recorded Landowner / Khatedar' : 'Requested Officer'),
    organization: organization || 'Government Authority',
    state: state || 'Gujarat',
    district: district || 'All Districts',
    ulpin: ulpin || '',
    surveyNo: surveyNo || '',
    status: initialStatus,
    rbacStatus: initialRbacStatus,
    createdAt: new Date().toISOString(),
    allowedMenus: isCitizen ? ['citizen_all'] : ['pending_authorization']
  };

  allUsers.push(newUser);
  saveUsers(allUsers);

  logAuthAudit('ACCOUNT_CREATED', {
    userId: newUser.id,
    regId,
    email: cleanEmail,
    workspace: workspaceCategory,
    role: newUser.role,
    rbacStatus: initialRbacStatus
  });

  return {
    success: true,
    regId,
    user: newUser,
    isInstitutional,
    message: isInstitutional
      ? 'Your account request has been submitted. Access to institutional workspaces will become available after administrative authorization and RBAC provisioning.'
      : 'Account created successfully! You can now log in to your Citizen Workspace.'
  };
}

export function simulateAdminApproval(userId) {
  const allUsers = getAllUsers();
  const index = allUsers.findIndex(u => u.id === userId);
  if (index !== -1) {
    allUsers[index].rbacStatus = 'ACTIVE';
    allUsers[index].status = 'ACTIVE';
    allUsers[index].allowedMenus = ['all_menus_granted'];
    saveUsers(allUsers);
    logAuthAudit('RBAC_ASSIGNED', { userId, approvedBy: 'SYSTEM_ADMIN' });
    return true;
  }
  return false;
}

export async function resetPassword(email, newPassword) {
  await new Promise(r => setTimeout(r, 400));
  const cleanEmail = (email || '').trim().toLowerCase();
  const allUsers = getAllUsers();
  const index = allUsers.findIndex(u => u.email.toLowerCase() === cleanEmail);

  if (index === -1) {
    return { success: false, error: 'No account found with this email address.' };
  }

  allUsers[index].passwordHash = newPassword;
  saveUsers(allUsers);
  logAuthAudit('PASSWORD_RESET', { email: cleanEmail });

  return { success: true, message: 'Password has been updated successfully.' };
}

// Complete API Abstraction for Section 44
export const authService = {
  login: authenticateCredentials,
  signup: registerNewAccount,
  forgotPassword: async (email) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Recovery instructions dispatched.' };
  },
  resetPassword,
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  getAuthorizedWorkspaces: (user) => user?.workspaces || [],
  getUserPermissions: (user) => user?.allowedMenus || [],
  getOrganizations: (cat) => REFERENCE_CENTRAL_MINISTRIES,
  getStates: () => Object.keys(REFERENCE_STATES_MAP),
  getDistricts: (st) => REFERENCE_STATES_MAP[st] || [],
  getDesignations: (ws) => [],
  getRequiringBodies: (type) => REFERENCE_REQUIRING_BODIES[type] || [],
  getCentralAppropriateGovernments: () => REFERENCE_CENTRAL_MINISTRIES,
  getStateAppropriateGovernments: (st) => ['Revenue & Disaster Management Department', 'Land Resources Directorate'],
  logout: () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }
};
