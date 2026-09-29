import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Key, 
  Mail, 
  Phone, 
  Sliders, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export default function SiaIegSubMenu({
  projects = [],
  selectedProjectId,
  setSelectedProjectId,
  onGrantFinalAccess
}) {
  const [subType, setSubType] = useState('SIA'); // 'SIA' | 'IEG'

  const selectedProj = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Member form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [designation, setDesignation] = useState('');
  const [accreditationNo, setAccreditationNo] = useState('');
  const [experienceYears, setExperienceYears] = useState('10');
  const [gazetteOrderNo, setGazetteOrderNo] = useState(`SIA-GOI-${Date.now().toString().slice(-4)}`);

  // Members lists
  const [siaMembers, setSiaMembers] = useState([
    {
      id: 'SIA-MEM-01',
      name: 'Dr. Manjit Singh',
      role: 'Lead Social Scientist & Evaluator',
      category: 'Sec 4 Social Impact Assessor',
      affiliation: 'CRISIL Infrastructure Advisory & Panjab University',
      designation: 'Professor & Head of Social Economics',
      email: 'sia-lead@crisil-pu.ac.in',
      phone: '+91 98141 89201',
      accreditationNo: 'NABL/SIA/CENTRAL/2024/091',
      mandate: 'Sections 4, 5, 6 Full Study'
    },
    {
      id: 'SIA-MEM-02',
      name: 'Dr. Kavita Narang',
      role: 'Gender & Vulnerable Groups Specialist',
      category: 'Sec 6 SIMP Builder Specialist',
      affiliation: 'Center for Social Research, Delhi',
      designation: 'Senior Gender Consultant',
      email: 'kavita.narang@csrindia.org',
      phone: '+91 98102 33419',
      accreditationNo: 'SIA-GNDR-2023-44',
      mandate: 'SIMP & Livelihood Restoration'
    }
  ]);

  const [iegMembers, setIegMembers] = useState([
    {
      id: 'IEG-MEM-01',
      name: 'Prof. Ramesh Chandra',
      category: 'Non-official Social Scientist (Sec 7(2)(a))',
      affiliation: 'Delhi School of Economics',
      designation: 'Chairperson, IEG Expert Committee',
      email: 'rchandra@dse.du.ac.in',
      phone: '+91 98110 55672',
      accreditationNo: 'IEG-EXP-DSE-01',
      experienceYears: '22'
    },
    {
      id: 'IEG-MEM-02',
      name: 'Dr. Hemlata Barman',
      category: 'Representative of Scheduled Tribes (Sec 7(2)(d))',
      affiliation: 'Tribal Research Institute',
      designation: 'Senior Tribal Rights Specialist',
      email: 'hemlata.barman@tri.gov.in',
      phone: '+91 94350 91822',
      accreditationNo: 'IEG-ST-NOM-04',
      experienceYears: '18'
    }
  ]);

  // SIA & IEG Evaluation Workspace Menus (9 Menus as specified)
  const siaIegMenus = [
    { key: 'sia_exec_overview', name: 'SIA Executive Overview' },
    { key: 'sia_survey_census', name: 'Survey & Impact Census' },
    { key: 'sia_sec5_hearing', name: 'Section 5 Public Hearing' },
    { key: 'sia_sec6_simp', name: 'Section 6 SIMP Builder' },
    { key: 'sia_final_report', name: 'Final SIA Report & Publication' },
    { key: 'ieg_dashboard', name: 'IEG Appraisal Dashboard' },
    { key: 'ieg_review_evidence', name: 'SIA Review and Evidence' },
    { key: 'ieg_sec7_appraisal', name: 'Section 7 Statutory Appraisal' },
    { key: 'ieg_final_rec', name: 'Final Recommendation & Audit' }
  ];

  // Default menu access states
  const [menuAccess, setMenuAccess] = useState({
    sia_exec_overview: 'VIEW',
    sia_survey_census: 'VIEW',
    sia_sec5_hearing: 'VIEW',
    sia_sec6_simp: 'VIEW',
    sia_final_report: 'VIEW',
    ieg_dashboard: 'VIEW',
    ieg_review_evidence: 'VIEW',
    ieg_sec7_appraisal: 'VIEW',
    ieg_final_rec: 'VIEW'
  });

  const handleMenuRadioChange = (key, val) => {
    setMenuAccess(prev => ({ ...prev, [key]: val }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    if (subType === 'SIA') {
      const newSia = {
        id: `SIA-${Date.now().toString().slice(-4)}`,
        name,
        email,
        phone,
        category: category || 'Social Impact Assessor',
        affiliation: affiliation || 'Empanelled SIA Institution',
        designation: designation || 'Field Specialist',
        accreditationNo: accreditationNo || `SIA-REG-${Math.floor(1000 + Math.random() * 9000)}`,
        mandate: 'Sections 4, 5, 6 Statutory Scope'
      };
      setSiaMembers(prev => [...prev, newSia]);
    } else {
      const newIeg = {
        id: `IEG-${Date.now().toString().slice(-4)}`,
        name,
        email,
        phone,
        category: category || 'Social Scientist (Sec 7(2))',
        affiliation: affiliation || 'Independent Academic Institute',
        designation: designation || 'Expert Member',
        accreditationNo: accreditationNo || `IEG-REG-${Math.floor(1000 + Math.random() * 9000)}`,
        experienceYears: experienceYears || '15'
      };
      setIegMembers(prev => [...prev, newIeg]);
    }

    setName('');
    setEmail('');
    setPhone('');
    setAffiliation('');
    setDesignation('');
    setAccreditationNo('');
  };

  const handleDeleteMember = (id) => {
    if (subType === 'SIA') {
      setSiaMembers(prev => prev.filter(m => m.id !== id));
    } else {
      setIegMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleFinalAccessClick = () => {
    const activeMemberList = subType === 'SIA' ? siaMembers : iegMembers;
    const grantedMenus = siaIegMenus.filter(m => menuAccess[m.key] === 'VIEW');
    onGrantFinalAccess({
      category: 'SIA_IEG',
      subCategory: subType,
      title: subType === 'SIA' 
        ? 'Social Impact Assessment (SIA) Agency Workspace' 
        : 'Independent Expert Group (IEG) Evaluation Workspace',
      section: subType === 'SIA' ? 'Sections 4, 5 & 6' : 'Sections 7, 8 & 9',
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
      members: activeMemberList,
      menuAccess: menuAccess,
      grantedMenus: grantedMenus,
      gazetteOrderNo: gazetteOrderNo
    });
  };

  const currentMembers = subType === 'SIA' ? siaMembers : iegMembers;

  return (
    <div className="space-y-4">
      {/* Selection Cards (a) SIA vs (b) IEG */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#C5A059]" />
              Select SIA Agency or IEG Expert Group
            </h3>
            <p className="text-xs text-slate-500">
              Constitute assessment agency or independent multidisciplinary expert appraisal panel
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* (a) SIA - Sections 4, 5, 6 */}
          <div
            onClick={() => setSubType('SIA')}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              subType === 'SIA'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1B365D] text-white">
                SECTIONS 4, 5, 6
              </span>
              <input
                type="radio"
                name="siaIegRadio"
                checked={subType === 'SIA'}
                onChange={() => setSubType('SIA')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(a) Social Impact Assessment (SIA) Agency</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Empanelled agency or institution mandated for baseline census, family impact surveys, public hearings, and SIMP formulation.
            </p>
          </div>

          {/* (b) IEG - Sections 7, 8, 9 */}
          <div
            onClick={() => setSubType('IEG')}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              subType === 'IEG'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#C5A059] text-slate-950">
                SECTIONS 7, 8, 9
              </span>
              <input
                type="radio"
                name="siaIegRadio"
                checked={subType === 'IEG'}
                onChange={() => setSubType('IEG')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(b) Independent Expert Group (IEG)</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Multi-disciplinary 7-member group evaluating SIA report: Social scientists, R&amp;R experts, technical specialist, and SC/ST representatives.
            </p>
          </div>
        </div>
      </div>

      {/* Member Details Form */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="pb-3 border-b border-slate-200 mb-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add {subType === 'SIA' ? 'SIA Team Member' : 'IEG Expert Member'}
            </h4>
            <p className="text-xs text-slate-500">
              Enter mandatory Gmail, contact number, and statutory specialization
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300">
            Authorization: {gazetteOrderNo}
          </span>
        </div>

        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          <div className="md:col-span-2">
            <label className="font-semibold text-slate-700 block pb-1">
              {subType === 'SIA' ? 'SIA Role / Functional Mandate:' : 'Section 7(2) Statutory Category:'}
            </label>
            {subType === 'SIA' ? (
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
              >
                <option value="">-- Select SIA Specialization --</option>
                <option value="Lead Social Impact Assessor">Lead Social Impact Assessor (Sec 4)</option>
                <option value="Survey & Impact Census Director">Survey &amp; Impact Census Director</option>
                <option value="Public Hearing Facilitator">Public Hearing Facilitator &amp; Gram Sabha Lead (Sec 5)</option>
                <option value="SIMP Formulation Lead">SIMP Formulation &amp; Livelihood Specialist (Sec 6)</option>
                <option value="Gender & Vulnerable Specialist">Gender &amp; Scheduled Area Specialist</option>
                <option value="Agrarian & Valuation Analyst">Agrarian Economist &amp; Valuation Analyst</option>
              </select>
            ) : (
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
              >
                <option value="">-- Select Section 7(2) Statutory Post --</option>
                <option value="Chairperson, Independent Expert Group">Chairperson, Independent Expert Group</option>
                <option value="Non-official Social Scientist (1)">Non-official Social Scientist (Member 1)</option>
                <option value="Non-official Social Scientist (2)">Non-official Social Scientist (Member 2)</option>
                <option value="Expert on Rehabilitation (1)">Expert on Rehabilitation (Member 1)</option>
                <option value="Expert on Rehabilitation (2)">Expert on Rehabilitation (Member 2)</option>
                <option value="Technical Expert on Project Subject">Technical Expert on Project Subject</option>
                <option value="Representative of Scheduled Castes (SC)">Representative of Scheduled Castes (SC)</option>
                <option value="Representative of Scheduled Tribes (ST)">Representative of Scheduled Tribes (ST)</option>
                <option value="Member-Secretary / Convenor">Member-Secretary / Convenor</option>
              </select>
            )}
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Full Name: *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Dr. Ramesh Chandra"
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="officer@gmail.com / nic.in"
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
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Institutional Affiliation / University:</label>
            <input
              type="text"
              value={affiliation}
              onChange={e => setAffiliation(e.target.value)}
              placeholder="e.g. TISS Mumbai / CRISIL / Panjab Univ"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Designation / Cadre:</label>
            <input
              type="text"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              placeholder="e.g. Professor / Senior Consultant"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Empanelment / Accreditation ID:</label>
            <input
              type="text"
              value={accreditationNo}
              onChange={e => setAccreditationNo(e.target.value)}
              placeholder="e.g. SIA-UNIT-2025-09"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add to {subType} Table
            </button>
          </div>
        </form>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C5A059]" />
            Registered {subType} Members ({currentMembers.length})
          </h4>
          <span className="text-[11px] text-slate-500">
            Login credentials will be sent to their Gmail upon final access
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Statutory Category / Role</th>
                <th className="py-2.5 px-3">Institution / Affiliation</th>
                <th className="py-2.5 px-3">Gmail</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Accreditation ID</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {currentMembers.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#1B365D]">{m.name}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{m.category}</td>
                  <td className="py-2.5 px-3">
                    <div>{m.affiliation}</div>
                    <div className="text-[10px] text-slate-500">{m.designation}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{m.email}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{m.phone}</td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{m.accreditationNo}</td>
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

      {/* SIA & IEG Evaluation Workspace Menus Access Matrix */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              SIA and IEG Evaluation Workspace Menus Access Matrix
            </h4>
            <p className="text-xs text-slate-500">
              Select <strong>[ View ]</strong> to grant access or <strong>[ Not Access ]</strong> to restrict
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const updated = {};
                siaIegMenus.forEach(m => { updated[m.key] = 'VIEW'; });
                setMenuAccess(updated);
              }}
              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold cursor-pointer"
            >
              Grant View to All
            </button>
            <button
              onClick={() => {
                const updated = {};
                siaIegMenus.forEach(m => { updated[m.key] = 'NOT_ACCESS'; });
                setMenuAccess(updated);
              }}
              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded text-xs font-semibold cursor-pointer"
            >
              Set All Not Access
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          {siaIegMenus.map((menu, idx) => {
            const currentVal = menuAccess[menu.key] || 'NOT_ACCESS';
            return (
              <div
                key={menu.key}
                className="p-2.5 rounded border border-slate-200 bg-slate-50 flex flex-col justify-between hover:bg-slate-100/70 transition-colors gap-2"
              >
                <div>
                  <span className="font-mono text-[10px] text-slate-400">#{idx + 1}</span>
                  <div className="font-semibold text-slate-800" title={menu.name}>
                    {menu.name}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                  <label className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-slate-200 flex-1 justify-center">
                    <input
                      type="radio"
                      name={`sia-radio-${menu.key}`}
                      value="NOT_ACCESS"
                      checked={currentVal === 'NOT_ACCESS'}
                      onChange={() => handleMenuRadioChange(menu.key, 'NOT_ACCESS')}
                      className="accent-rose-600"
                    />
                    <span className={`text-[10px] font-bold ${currentVal === 'NOT_ACCESS' ? 'text-rose-700' : 'text-slate-500'}`}>
                      Not Access
                    </span>
                  </label>

                  <label className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-slate-200 flex-1 justify-center">
                    <input
                      type="radio"
                      name={`sia-radio-${menu.key}`}
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
            disabled={currentMembers.length === 0}
            className={`px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm text-white ${
              currentMembers.length === 0
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
