import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  UserPlus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Key, 
  Mail, 
  Phone,
  Shield,
  Sliders,
  Check
} from 'lucide-react';

export default function CommitteeSubMenu({
  projects = [],
  selectedProjectId,
  setSelectedProjectId,
  onGrantFinalAccess
}) {
  const [committeeType, setCommitteeType] = useState('NMC'); // 'NMC' | 'SMC' | 'PROJECT_RNR'
  
  // Selected project details & 100-acre check
  const selectedProj = projects.find(p => p.id === selectedProjectId) || projects[0];
  const projectAreaAcres = selectedProj?.totalAreaHa 
    ? Math.round(selectedProj.totalAreaHa * 2.471 * 10) / 10 
    : (selectedProj?.area || 145);
  const isLandOver100Acres = projectAreaAcres >= 100;

  // Member form state
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [repCategory, setRepCategory] = useState('');
  const [deptOrOrg, setDeptOrOrg] = useState('');
  const [designation, setDesignation] = useState('');
  const [expertise, setExpertise] = useState('');
  const [officialId, setOfficialId] = useState('');
  const [committeeRole, setCommitteeRole] = useState('Member');
  const [gazetteOrderNo, setGazetteOrderNo] = useState(`GOI-NMC-${Date.now().toString().slice(-4)}`);

  // Members list
  const [members, setMembers] = useState([
    {
      id: 'MEM-NMC-01',
      name: 'Dr. Vivek Joshi, IAS',
      category: 'Central Ministry Representative',
      dept: 'Department of Land Resources (DoLR), MoRD',
      designation: 'Secretary to Government of India',
      email: 'sec-dolr@nic.in',
      phone: '+91 98110 24891',
      expertise: 'Land Governance & RFCTLARR Administration',
      officialId: 'IAS-GOI-1989-72',
      role: 'Chairman'
    },
    {
      id: 'MEM-NMC-02',
      name: 'Prof. Anupama Sharma',
      category: 'Eminent Expert from Relevant Field',
      dept: 'Tata Institute of Social Sciences (TISS)',
      designation: 'Chair, Center for Resettlement & Tribal Studies',
      email: 'anupama.sharma@tiss.edu',
      phone: '+91 98201 44521',
      expertise: 'R&R Social Audit & Livelihood Restoration',
      officialId: 'EXP-TISS-2023-11',
      role: 'Expert Member'
    }
  ]);

  // Policy Makers + Appropriate Gov Menus (16 menus per specification)
  const committeeMenus = [
    { key: 'pm_exec_gis', name: 'Executive Overview & GIS', workspace: 'Policy Makers' },
    { key: 'pm_pipeline', name: 'National/State Pipeline', workspace: 'Policy Makers' },
    { key: 'pm_lapsing_risk', name: 'Lapsing Risk Engine', workspace: 'Policy Makers' },
    { key: 'pm_pfms_dbt', name: 'PFMS & DBT Oversight', workspace: 'Policy Makers' },
    { key: 'pm_meetings_mom', name: 'NMC/SMC Meetings & MoM', workspace: 'Policy Makers' },
    { key: 'pm_bottleneck', name: 'Bottleneck Resolver', workspace: 'Policy Makers' },
    { key: 'pm_rnr_audit', name: 'R&R & Social Audit Review', workspace: 'Policy Makers' },
    { key: 'pm_mis_reports', name: 'MIS & Cabinet Reports', workspace: 'Policy Makers' },
    { key: 'app_dashboard', name: 'Executive Dashboard', workspace: 'Appropriate Gov' },
    { key: 'app_proposal_inbox', name: 'Collector Proposal Inbox', workspace: 'Appropriate Gov' },
    { key: 'app_sia_launch', name: 'SIA & Survey Launch Hub', workspace: 'Appropriate Gov' },
    { key: 'app_sec11_notif', name: 'Section 11 Notification Hub', workspace: 'Appropriate Gov' },
    { key: 'app_rnr_portal', name: 'R&R Review & Objection Portal', workspace: 'Appropriate Gov' },
    { key: 'app_sec19_engine', name: 'Section 19 Declaration Statutory Engine', workspace: 'Appropriate Gov' },
    { key: 'app_rbac_hub', name: 'RBAC Access Control Hub', workspace: 'Appropriate Gov' },
    { key: 'app_gazette_vault', name: 'Gazette & Broadcast Vault', workspace: 'Appropriate Gov' }
  ];

  // Default menu access states: 'VIEW' or 'NOT_ACCESS'
  const [menuAccess, setMenuAccess] = useState({
    pm_exec_gis: 'VIEW',
    pm_pipeline: 'VIEW',
    pm_lapsing_risk: 'VIEW',
    pm_pfms_dbt: 'VIEW',
    pm_meetings_mom: 'VIEW',
    pm_bottleneck: 'NOT_ACCESS',
    pm_rnr_audit: 'VIEW',
    pm_mis_reports: 'VIEW',
    app_dashboard: 'VIEW',
    app_proposal_inbox: 'NOT_ACCESS',
    app_sia_launch: 'NOT_ACCESS',
    app_sec11_notif: 'VIEW',
    app_rnr_portal: 'VIEW',
    app_sec19_engine: 'VIEW',
    app_rbac_hub: 'NOT_ACCESS',
    app_gazette_vault: 'VIEW'
  });

  const handleMenuRadioChange = (key, val) => {
    setMenuAccess(prev => ({ ...prev, [key]: val }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberName || !memberEmail || !memberPhone) return;

    const newMem = {
      id: `MEM-${Date.now().toString().slice(-4)}`,
      name: memberName,
      category: repCategory || (committeeType === 'PROJECT_RNR' ? 'Panchayat Representative' : 'Ministry Representative'),
      dept: deptOrOrg || 'Concerned Department',
      designation: designation || 'Member',
      email: memberEmail,
      phone: memberPhone,
      expertise: expertise || 'Rehabilitation & Resettlement',
      officialId: officialId || `ID-${Math.floor(1000 + Math.random() * 9000)}`,
      role: committeeRole
    };

    setMembers(prev => [...prev, newMem]);
    setMemberName('');
    setMemberEmail('');
    setMemberPhone('');
    setDeptOrOrg('');
    setDesignation('');
    setExpertise('');
    setOfficialId('');
  };

  const handleDeleteMember = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const setAllAccess = (accessVal) => {
    const updated = {};
    committeeMenus.forEach(m => {
      updated[m.key] = accessVal;
    });
    setMenuAccess(updated);
  };

  const handleFinalAccessClick = () => {
    const grantedMenus = committeeMenus.filter(m => menuAccess[m.key] === 'VIEW');
    onGrantFinalAccess({
      category: 'COMMITTEE',
      subCategory: committeeType,
      title: committeeType === 'NMC' 
        ? 'National Monitoring Committee (NMC)' 
        : committeeType === 'SMC' 
        ? 'State Monitoring Committee (SMC)' 
        : 'Project-Level R&R Committee',
      section: committeeType === 'NMC' ? 'Section 48' : committeeType === 'SMC' ? 'Section 50' : 'Section 45',
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
      members: members,
      menuAccess: menuAccess,
      grantedMenus: grantedMenus,
      gazetteOrderNo: gazetteOrderNo
    });
  };

  return (
    <div className="space-y-4">
      {/* 3 Committee Selection Cards */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#C5A059]" />
              Select Committee Constitution Type
            </h3>
            <p className="text-xs text-slate-500">
              Constitute statutory monitoring committees per RFCTLARR Act 2013 provisions
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">Project Alignment:</span>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="px-2.5 py-1 rounded border border-slate-300 bg-white font-medium text-slate-800 outline-none"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* (a) NMC - Section 48 */}
          <div
            onClick={() => setCommitteeType('NMC')}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              committeeType === 'NMC'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1B365D] text-white">
                SECTION 48
              </span>
              <input
                type="radio"
                name="committeeTypeRadio"
                checked={committeeType === 'NMC'}
                onChange={() => setCommitteeType('NMC')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(a) National Monitoring Committee (NMC)</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Constituted by Central Government for national or inter-State projects to review &amp; monitor R&amp;R schemes.
            </p>
          </div>

          {/* (b) SMC - Section 50 */}
          <div
            onClick={() => setCommitteeType('SMC')}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              committeeType === 'SMC'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#C5A059] text-slate-950">
                SECTION 50
              </span>
              <input
                type="radio"
                name="committeeTypeRadio"
                checked={committeeType === 'SMC'}
                onChange={() => setCommitteeType('SMC')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(b) State Monitoring Committee (SMC)</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Constituted by State Government for reviewing and monitoring R&amp;R implementation across State projects.
            </p>
          </div>

          {/* (c) Project R&R Committee - Section 45 */}
          <div
            onClick={() => {
              if (isLandOver100Acres) setCommitteeType('PROJECT_RNR');
            }}
            className={`p-3 rounded border-2 transition-all ${
              !isLandOver100Acres
                ? 'opacity-60 bg-slate-50 border-slate-200 cursor-not-allowed'
                : committeeType === 'PROJECT_RNR'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs cursor-pointer'
                : 'border-slate-200 hover:border-slate-300 bg-white cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-700 text-white">
                SECTION 45
              </span>
              <input
                type="radio"
                name="committeeTypeRadio"
                disabled={!isLandOver100Acres}
                checked={committeeType === 'PROJECT_RNR'}
                onChange={() => isLandOver100Acres && setCommitteeType('PROJECT_RNR')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(c) Project-Level R&amp;R Committee</h4>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isLandOver100Acres ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {isLandOver100Acres ? `✓ ${projectAreaAcres} Acres (≥100 Ac)` : `✗ ${projectAreaAcres} Acres (<100 Ac)`}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Under Collector chairmanship. Eligible strictly where land proposed to be acquired is equal to or more than 100 acres.
            </p>
          </div>
        </div>

        {!isLandOver100Acres && (
          <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded flex items-center gap-2 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Section 45(1) Statutory Condition:</strong> Project R&amp;R Committee is only enabled when land acquired is equal to or more than 100 acres. Selected project currently has <strong>{projectAreaAcres} acres</strong>. Choose a 100+ acre project to activate Option (c).
            </span>
          </div>
        )}
      </div>

      {/* Member Details Form */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="pb-3 border-b border-slate-200 mb-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add Committee Member per {committeeType === 'NMC' ? 'Section 48' : committeeType === 'SMC' ? 'Section 50' : 'Section 45(2)'}
            </h4>
            <p className="text-xs text-slate-500">
              Provide mandatory official Gmail, Phone, and statutory cadre representation
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300">
            Order Ref: {gazetteOrderNo}
          </span>
        </div>

        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {/* Statutory Category Dropdown */}
          <div className="md:col-span-2">
            <label className="font-semibold text-slate-700 block pb-1">Statutory Representation / Category:</label>
            {committeeType === 'NMC' ? (
              <select
                value={repCategory}
                onChange={e => setRepCategory(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
              >
                <option value="">-- Select Section 48 Representation --</option>
                <option value="Central Ministry Representative">Central Ministry / Department Representative</option>
                <option value="State Government Representative">Concerned State Government Representative</option>
                <option value="Eminent Expert from Relevant Field">Eminent Expert from Relevant Field (Sociology / Economics)</option>
                <option value="Central Secretariat Officer">Central Government Appointed Officer / Employee (Sec 48(4))</option>
                <option value="Member Secretary">Member Secretary / Nodal Administrator</option>
              </select>
            ) : committeeType === 'SMC' ? (
              <select
                value={repCategory}
                onChange={e => setRepCategory(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
              >
                <option value="">-- Select Section 50 Representation --</option>
                <option value="State Department Representative">Concerned State Ministry / Department Representative</option>
                <option value="Eminent Expert from Relevant Field">Eminent Expert from Relevant Field</option>
                <option value="State Secretariat Officer">State Government Provided Officer (Sec 50(4))</option>
                <option value="R&R Commissioner Nominee">R&amp;R Commissioner Nominee / Member Convenor</option>
              </select>
            ) : (
              <select
                value={repCategory}
                onChange={e => setRepCategory(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
              >
                <option value="">-- Select Section 45(2) Statutory Member --</option>
                <option value="Collector (Chairman)">Chairman: District Collector (Ex-Officio)</option>
                <option value="Women Representative">(a) Representative of women residing in affected area</option>
                <option value="SC Representative">(b) Representative of Scheduled Castes (SC) in affected area</option>
                <option value="ST Representative">(b) Representative of Scheduled Tribes (ST) in affected area</option>
                <option value="Voluntary NGO Representative">(c) Representative of Voluntary Organisation (NGO) in the area</option>
                <option value="Nationalised Bank Representative">(d) Representative of a Nationalised Bank</option>
                <option value="Land Acquisition Officer (LAO)">(e) Land Acquisition Officer of the project</option>
                <option value="Panchayat / Municipality Chairperson">(f) Chairperson of Panchayats / Municipalities in area</option>
                <option value="District Planning Committee Chair">(g) Chairperson of District Planning Committee or nominee</option>
                <option value="MP / MLA Nominee">(h) Member of Parliament (MP) / MLA of concerned area</option>
                <option value="Requiring Body Representative">(i) Representative of Requiring Body</option>
                <option value="R&R Administrator (Member-Convenor)">(j) Administrator for R&amp;R (Member-Convenor)</option>
              </select>
            )}
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Member Full Name: *</label>
            <input
              type="text"
              value={memberName}
              onChange={e => setMemberName(e.target.value)}
              placeholder="e.g. Smt. Sunita Devi / Sh. R. K. Verma"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-rose-600" />
              Gmail / Official Email: *
            </label>
            <input
              type="email"
              value={memberEmail}
              onChange={e => setMemberEmail(e.target.value)}
              placeholder="member@gmail.com / nic.in"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Mobile / Phone Number: *
            </label>
            <input
              type="tel"
              value={memberPhone}
              onChange={e => setMemberPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Ministry / Dept / Gram Panchayat / Org:</label>
            <input
              type="text"
              value={deptOrOrg}
              onChange={e => setDeptOrOrg(e.target.value)}
              placeholder="e.g. MoRD / Gram Panchayat Sultanpur"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Designation / Public Office:</label>
            <input
              type="text"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              placeholder="e.g. Sarpanch / Joint Secretary / Lead NGO"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Field of Expertise / Specialization:</label>
            <input
              type="text"
              value={expertise}
              onChange={e => setExpertise(e.target.value)}
              placeholder="e.g. Resettlement / Social Audit / Agrarian"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Committee Role:</label>
            <select
              value={committeeRole}
              onChange={e => setCommitteeRole(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
            >
              <option value="Chairman">Chairman</option>
              <option value="Member">Member</option>
              <option value="Expert Member">Expert Member</option>
              <option value="Member Secretary">Member Secretary / Convenor</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add Member to Table
            </button>
          </div>
        </form>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C5A059]" />
            Constituted {committeeType} Members Register ({members.length})
          </h4>
          <span className="text-[11px] text-slate-500">
            Login credentials will be dispatched to each member's Gmail upon final access grant
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Member Name &amp; Role</th>
                <th className="py-2.5 px-3">Statutory Category</th>
                <th className="py-2.5 px-3">Ministry / Dept / Body</th>
                <th className="py-2.5 px-3">Official Gmail</th>
                <th className="py-2.5 px-3">Phone No.</th>
                <th className="py-2.5 px-3">Expertise</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-[#1B365D]">{m.name}</div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                      {m.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{m.category}</td>
                  <td className="py-2.5 px-3">
                    <div>{m.dept}</div>
                    <div className="text-[10px] text-slate-500">{m.designation}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{m.email}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{m.phone}</td>
                  <td className="py-2.5 px-3 text-slate-600">{m.expertise}</td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDeleteMember(m.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Menus Access Matrix (Policy Makers + Appropriate Gov Menus) */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              Policy Makers &amp; Appropriate Government Workspace Menus Access Matrix
            </h4>
            <p className="text-xs text-slate-500">
              Configure exact granular menu visibility: select <strong>[ View ]</strong> to grant access or <strong>[ Not Access ]</strong> to restrict
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAllAccess('VIEW')}
              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold cursor-pointer"
            >
              Grant View to All
            </button>
            <button
              onClick={() => setAllAccess('NOT_ACCESS')}
              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded text-xs font-semibold cursor-pointer"
            >
              Set All Not Access
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {committeeMenus.map((menu, idx) => {
            const currentVal = menuAccess[menu.key] || 'NOT_ACCESS';
            return (
              <div
                key={menu.key}
                className="p-2.5 rounded border border-slate-200 bg-slate-50 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
              >
                <div className="pr-2 truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-slate-400">#{idx + 1}</span>
                    <span className="font-semibold text-slate-800 truncate" title={menu.name}>
                      {menu.name}
                    </span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    menu.workspace === 'Policy Makers' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {menu.workspace}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-slate-200">
                    <input
                      type="radio"
                      name={`committee-radio-${menu.key}`}
                      value="NOT_ACCESS"
                      checked={currentVal === 'NOT_ACCESS'}
                      onChange={() => handleMenuRadioChange(menu.key, 'NOT_ACCESS')}
                      className="accent-rose-600"
                    />
                    <span className={`text-[10px] font-bold ${currentVal === 'NOT_ACCESS' ? 'text-rose-700' : 'text-slate-500'}`}>
                      Not Access
                    </span>
                  </label>

                  <label className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-slate-200">
                    <input
                      type="radio"
                      name={`committee-radio-${menu.key}`}
                      value="VIEW"
                      checked={currentVal === 'VIEW'}
                      onChange={() => handleMenuRadioChange(menu.key, 'VIEW')}
                      className="accent-emerald-600"
                    />
                    <span className={`text-[10px] font-bold ${currentVal === 'VIEW' ? 'text-emerald-700' : 'text-slate-500'}`}>
                      View
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Access Action Bar */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Granted: <strong className="text-emerald-700 font-bold">{Object.values(menuAccess).filter(v => v === 'VIEW').length}</strong> menus
            &nbsp;|&nbsp; Restricted: <strong className="text-rose-700 font-bold">{Object.values(menuAccess).filter(v => v === 'NOT_ACCESS').length}</strong> menus
          </div>

          <button
            onClick={handleFinalAccessClick}
            disabled={members.length === 0}
            className={`px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm text-white ${
              members.length === 0
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-[#1B365D] hover:bg-[#142642]'
            }`}
          >
            <Key className="w-4 h-4 text-[#C5A059]" />
            <span>Grant Final Access &amp; Dispatch Login Credentials to Gmail</span>
          </button>
        </div>
      </div>
    </div>
  );
}
