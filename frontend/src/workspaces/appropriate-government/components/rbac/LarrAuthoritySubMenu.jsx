import React, { useState } from 'react';
import { 
  Scale, 
  UserPlus, 
  Trash2, 
  Key, 
  Mail, 
  Phone, 
  Sliders, 
  Users,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function LarrAuthoritySubMenu({
  projects = [],
  selectedProjectId,
  setSelectedProjectId,
  onGrantFinalAccess
}) {
  const [tribunalRole, setTribunalRole] = useState('PRESIDING_OFFICER'); // 'PRESIDING_OFFICER' | 'REGISTRAR' | 'BENCH_READER' | 'RECOVERY_OFFICER'

  const selectedProj = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [benchAssignment, setBenchAssignment] = useState('LARR Authority Bench No. 1, Patiala Division');
  const [designation, setDesignation] = useState('District & Sessions Judge (Retd.) / Presiding Officer');
  const [judicialId, setJudicialId] = useState('');
  const [appointmentOrderNo, setAppointmentOrderNo] = useState(`HC-LARR-BENCH-${Date.now().toString().slice(-4)}`);

  // Tribunal members list
  const [tribunalMembers, setTribunalMembers] = useState([
    {
      id: 'LARR-JUD-01',
      name: 'Hon’ble Justice (Retd.) K. S. Gill',
      role: 'Presiding Officer (Sec 53 Qualified)',
      bench: 'LARR Authority Principal Bench, Patiala',
      designation: 'Former Principal District & Sessions Judge',
      email: 'po-larr-patiala@ecourts.gov.in',
      phone: '+91 98720 33419',
      judicialId: 'P&H-JUD-1988-14',
      orderNo: 'GOI-LARR-BENCH-2023-41'
    },
    {
      id: 'LARR-REG-02',
      name: 'Sh. Amarjit Singh Dhillon',
      role: 'Tribunal Registrar & Docket Clerk',
      bench: 'LARR Authority Principal Bench, Patiala',
      designation: 'Registrar (Judicial Administration)',
      email: 'registrar-larr.patiala@nic.in',
      phone: '+91 94170 88219',
      judicialId: 'REG-LARR-PB-2024-02',
      orderNo: 'PB-GO-REG-2024-19'
    }
  ]);

  // LARR Authority Workspace 10 Menus per specification
  const larrMenus = [
    { key: 'larr_1_judicial_dashboard', name: '1. Judicial Dashboard & Cause List Overview' },
    { key: 'larr_2_sec64_reference', name: '2. Section 64 Reference Inward & e-Filing' },
    { key: 'larr_3_summons_notice', name: '3. Digital Summons & Multi-Party Notice Desk' },
    { key: 'larr_4_pleadings_evidence', name: '4. Pleadings & Spatial Evidence Vault' },
    { key: 'larr_5_cause_list_courtroom', name: '5. Digital Cause List & Virtual Courtroom' },
    { key: 'larr_6_sec69_award', name: '6. Section 69 Enhanced Award Engine' },
    { key: 'larr_7_sec77_escrow', name: '7. Section 77 Escrow & Apportionment Desk' },
    { key: 'larr_8_sla_pipeline', name: '8. Statutory 180-Day SLA & Pipeline Monitor' },
    { key: 'larr_9_hc_appeal', name: '9. Section 74 High Court Appeal & Execution' },
    { key: 'larr_10_audit_vault', name: '10. Judicial Audit & Performance Vault' }
  ];

  // Default menu access states
  const [menuAccess, setMenuAccess] = useState({
    larr_1_judicial_dashboard: 'VIEW',
    larr_2_sec64_reference: 'VIEW',
    larr_3_summons_notice: 'VIEW',
    larr_4_pleadings_evidence: 'VIEW',
    larr_5_cause_list_courtroom: 'VIEW',
    larr_6_sec69_award: 'VIEW',
    larr_7_sec77_escrow: 'VIEW',
    larr_8_sla_pipeline: 'VIEW',
    larr_9_hc_appeal: 'VIEW',
    larr_10_audit_vault: 'VIEW'
  });

  const handleMenuRadioChange = (key, val) => {
    setMenuAccess(prev => ({ ...prev, [key]: val }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const newJudicial = {
      id: `LARR-${Date.now().toString().slice(-4)}`,
      name,
      role: tribunalRole === 'PRESIDING_OFFICER' 
        ? 'Presiding Officer (Sec 53 Qualified)' 
        : tribunalRole === 'REGISTRAR' 
        ? 'Tribunal Registrar & Docket Clerk' 
        : tribunalRole === 'BENCH_READER' 
        ? 'Bench Reader & Court Master' 
        : 'Judicial Recovery Officer (RRC Execution)',
      bench: benchAssignment || 'Principal Judicial Bench',
      designation: designation || 'Judicial Officer',
      email,
      phone,
      judicialId: judicialId || `JUD-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNo: appointmentOrderNo
    };

    setTribunalMembers(prev => [...prev, newJudicial]);
    setName('');
    setEmail('');
    setPhone('');
    setJudicialId('');
  };

  const handleDeleteMember = (id) => {
    setTribunalMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleFinalAccessClick = () => {
    const grantedMenus = larrMenus.filter(m => menuAccess[m.key] === 'VIEW');
    onGrantFinalAccess({
      category: 'LARR_AUTHORITY',
      subCategory: tribunalRole,
      title: 'LARR Authority Judicial Tribunal Workspace',
      section: 'Section 51 & Section 53',
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
      members: tribunalMembers,
      menuAccess: menuAccess,
      grantedMenus: grantedMenus,
      gazetteOrderNo: appointmentOrderNo
    });
  };

  return (
    <div className="space-y-4">
      {/* Statutory Section 51 Header Card */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#C5A059]" />
              LARR Authority Judicial Tribunal Provisioning (Section 51)
            </h3>
            <p className="text-xs text-slate-500">
              Establish Land Acquisition, Rehabilitation and Resettlement Authority Bench and authorize judicial officers
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
          {[
            { id: 'PRESIDING_OFFICER', title: 'Presiding Officer', subtitle: 'District Judge qualified (Sec 53)', icon: Scale },
            { id: 'REGISTRAR', title: 'Tribunal Registrar', subtitle: 'Docket Clerk & Inward Gate', icon: ShieldCheck },
            { id: 'BENCH_READER', title: 'Bench Reader', subtitle: 'Court Master & Daily Cause List', icon: Users },
            { id: 'RECOVERY_OFFICER', title: 'Recovery Officer', subtitle: 'Section 74 RRC Execution', icon: Key }
          ].map(r => (
            <div
              key={r.id}
              onClick={() => {
                setTribunalRole(r.id);
                if (r.id === 'PRESIDING_OFFICER') {
                  setDesignation('District & Sessions Judge (Retd.) / Presiding Officer');
                } else if (r.id === 'REGISTRAR') {
                  setDesignation('Registrar (Judicial Administration)');
                } else if (r.id === 'BENCH_READER') {
                  setDesignation('Bench Reader & Hearing Master');
                } else {
                  setDesignation('Judicial Recovery Officer / Tehsildar (LARR)');
                }
              }}
              className={`p-3 rounded border-2 transition-all cursor-pointer ${
                tribunalRole === r.id
                  ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <r.icon className="w-4 h-4 text-[#C5A059]" />
                <input
                  type="radio"
                  name="larrRoleRadio"
                  checked={tribunalRole === r.id}
                  onChange={() => setTribunalRole(r.id)}
                  className="accent-[#1B365D]"
                />
              </div>
              <h4 className="font-bold text-xs text-[#1B365D] mt-2">{r.title}</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">{r.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Form */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="pb-3 border-b border-slate-200 mb-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add Judicial Officer / Bench Member
            </h4>
            <p className="text-xs text-slate-500">
              Provide official Gmail, phone number, judicial bar/service registration, and High Court notification
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300">
            Notification: {appointmentOrderNo}
          </span>
        </div>

        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block pb-1">Judicial Officer Name: *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Hon’ble Justice (Retd.) K. S. Gill"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-rose-600" />
              Official Gmail / e-Courts Email: *
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="judge@ecourts.gov.in / gmail.com"
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
              placeholder="+91 98720 33419"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Bench Assignment / Jurisdiction:</label>
            <input
              type="text"
              value={benchAssignment}
              onChange={e => setBenchAssignment(e.target.value)}
              placeholder="e.g. LARR Authority Bench No. 1, Patiala"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Official Judicial Designation:</label>
            <input
              type="text"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              placeholder="e.g. Presiding Officer (Section 53)"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Judicial Service / Bar Reg ID:</label>
            <input
              type="text"
              value={judicialId}
              onChange={e => setJudicialId(e.target.value)}
              placeholder="e.g. P&amp;H-JUD-1988-14"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add Judicial Member
            </button>
          </div>
        </form>
      </div>

      {/* Tribunal Members Table */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C5A059]" />
            LARR Authority Constituted Bench Members ({tribunalMembers.length})
          </h4>
          <span className="text-[11px] text-slate-500">
            Login credentials will be dispatched to each member's Gmail upon final access
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Judicial Officer Name</th>
                <th className="py-2.5 px-3">Statutory Judicial Role</th>
                <th className="py-2.5 px-3">Bench &amp; Jurisdiction</th>
                <th className="py-2.5 px-3">Official Gmail</th>
                <th className="py-2.5 px-3">Phone No.</th>
                <th className="py-2.5 px-3">Judicial Service ID</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {tribunalMembers.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#1B365D]">{m.name}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                      {m.role}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">{m.designation}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-800">{m.bench}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{m.email}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{m.phone}</td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{m.judicialId}</td>
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

      {/* LARR Authority Workspace 10 Menus Access Matrix */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              LARR Authority Workspace Menus Access Matrix (10 Statutory Judicial Menus)
            </h4>
            <p className="text-xs text-slate-500">
              Select <strong>[ View ]</strong> to grant access or <strong>[ Not Access ]</strong> to restrict
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const updated = {};
                larrMenus.forEach(m => { updated[m.key] = 'VIEW'; });
                setMenuAccess(updated);
              }}
              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold cursor-pointer"
            >
              Grant View to All
            </button>
            <button
              onClick={() => {
                const updated = {};
                larrMenus.forEach(m => { updated[m.key] = 'NOT_ACCESS'; });
                setMenuAccess(updated);
              }}
              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded text-xs font-semibold cursor-pointer"
            >
              Set All Not Access
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {larrMenus.map((menu, idx) => {
            const currentVal = menuAccess[menu.key] || 'NOT_ACCESS';
            return (
              <div
                key={menu.key}
                className="p-2.5 rounded border border-slate-200 bg-slate-50 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
              >
                <div className="pr-2 truncate">
                  <span className="font-semibold text-slate-800 truncate" title={menu.name}>
                    {menu.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-slate-200">
                    <input
                      type="radio"
                      name={`larr-radio-${menu.key}`}
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
                      name={`larr-radio-${menu.key}`}
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
            disabled={tribunalMembers.length === 0}
            className={`px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm text-white ${
              tribunalMembers.length === 0
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
