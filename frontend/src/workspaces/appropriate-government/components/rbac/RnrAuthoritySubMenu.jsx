import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Key, 
  Mail, 
  Phone, 
  Sliders, 
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function RnrAuthoritySubMenu({
  projects = [],
  selectedProjectId,
  setSelectedProjectId,
  onGrantFinalAccess
}) {
  const [rnrRoleType, setRnrRoleType] = useState('ADMINISTRATOR'); // 'ADMINISTRATOR' | 'COMMISSIONER'

  const selectedProj = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Form states
  const [officerName, setOfficerName] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [officerPhone, setOfficerPhone] = useState('');
  const [cadreService, setCadreService] = useState('IAS');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [postingOrderNo, setPostingOrderNo] = useState(`RNR-ORD-${Date.now().toString().slice(-4)}`);
  const [jurisdictionArea, setJurisdictionArea] = useState('Patiala & Ludhiana Project Alignment');

  // Officers list
  const [rnrOfficers, setRnrOfficers] = useState([
    {
      id: 'RNR-OFF-01',
      roleType: 'ADMINISTRATOR',
      roleTitle: 'Administrator for R&R (Section 43)',
      name: 'Sh. Gurmeet Singh, PCS',
      cadre: 'Punjab Civil Service (Executive)',
      designation: 'Additional Deputy Commissioner (G) & Administrator R&R',
      department: 'Revenue & Rehabilitation Administration, Patiala',
      email: 'rr-admin-patiala@punjab.gov.in',
      phone: '+91 94172 10982',
      serviceId: 'PCS-2012-084',
      orderNo: 'GAZ-PB-RNR-ADM-2024-11',
      jurisdiction: 'Patiala District Corridor Alignment'
    },
    {
      id: 'RNR-OFF-02',
      roleType: 'COMMISSIONER',
      roleTitle: 'Commissioner for R&R (Section 44)',
      name: 'Smt. Anjali Bhawra, IAS',
      cadre: 'Indian Administrative Service (IAS)',
      designation: 'Principal Secretary & State R&R Commissioner',
      department: 'Department of Revenue, Rehabilitation and Disaster Management',
      email: 'rnr-commissioner@punjab.gov.in',
      phone: '+91 98140 22331',
      serviceId: 'IAS-PB-1996-03',
      orderNo: 'GO-RNR-STATE-2024-01',
      jurisdiction: 'State-wide R&R Sanction & Scheme Approval'
    }
  ]);

  // R&R Authority Workspace 10 Menus per specification
  const rnrMenus = [
    { key: 'rnr_1_admin_dashboard', name: '1. R&R ADMINISTRATOR EXECUTIVE DASHBOARD' },
    { key: 'rnr_2_census_survey', name: '2. AFFECTED FAMILIES CENSUS & DIGITAL SURVEY MANAGER (SEC 16(1) & SEC 43 )' },
    { key: 'rnr_3_scheme_builder', name: '3. DRAFT R&R SCHEME BUILDER (SECOND & THIRD SCHEDULE ENTITLEMENTS - SEC 16(2))' },
    { key: 'rnr_4_sc_st_plan', name: '4. SC / ST SPECIALIZED DEVELOPMENT PLAN BUILDER (SECTION 41 )' },
    { key: 'rnr_5_public_hearing', name: '5. SECTION 16(5) PUBLIC HEARING & OBJECTIONS LOG' },
    { key: 'rnr_6_award_execution', name: '6. R&R AWARD EXECUTION & PHYSICAL ALLOTMENT DESK' },
    { key: 'rnr_7_pfms_dbt', name: '7. PFMS DIRECT BANK TRANSFER (DBT) ANNUITY & FINANCIAL DISBURSEMENT DESK' },
    { key: 'rnr_8_commissioner_approval', name: '8. R&R COMMISSIONER MASTER APPROVAL & SANCTION DESK (SECTION 18) [COMMISSIONER ROLE ]' },
    { key: 'rnr_9_monitoring_compliance', name: '9. STATE / CENTRAL R&R MONITORING & COMPLIANCE DASHBOARD [COMMISSIONER ROLE]' },
    { key: 'rnr_10_statutory_audit', name: '10. INTER-AGENCY AUDIT & STATUTORY REPORTING VAULT (NMC / SMC / SEC 45 FEEDS)' }
  ];

  // Default menu access states based on role
  const [menuAccess, setMenuAccess] = useState({
    rnr_1_admin_dashboard: 'VIEW',
    rnr_2_census_survey: 'VIEW',
    rnr_3_scheme_builder: 'VIEW',
    rnr_4_sc_st_plan: 'VIEW',
    rnr_5_public_hearing: 'VIEW',
    rnr_6_award_execution: 'VIEW',
    rnr_7_pfms_dbt: 'VIEW',
    rnr_8_commissioner_approval: 'NOT_ACCESS', // default restricted for Administrator, granted for Commissioner
    rnr_9_monitoring_compliance: 'VIEW',
    rnr_10_statutory_audit: 'VIEW'
  });

  const handleRoleTypeChange = (newType) => {
    setRnrRoleType(newType);
    if (newType === 'COMMISSIONER') {
      setMenuAccess(prev => ({
        ...prev,
        rnr_8_commissioner_approval: 'VIEW',
        rnr_9_monitoring_compliance: 'VIEW'
      }));
    } else {
      setMenuAccess(prev => ({
        ...prev,
        rnr_8_commissioner_approval: 'NOT_ACCESS'
      }));
    }
  };

  const handleMenuRadioChange = (key, val) => {
    setMenuAccess(prev => ({ ...prev, [key]: val }));
  };

  const handleAddOfficer = (e) => {
    e.preventDefault();
    if (!officerName || !officerEmail || !officerPhone) return;

    const newOff = {
      id: `RNR-OFF-${Date.now().toString().slice(-4)}`,
      roleType: rnrRoleType,
      roleTitle: rnrRoleType === 'ADMINISTRATOR' 
        ? 'Administrator for R&R (Section 43)' 
        : 'Commissioner for R&R (Section 44)',
      name: officerName,
      cadre: cadreService,
      designation: designation || (rnrRoleType === 'ADMINISTRATOR' ? 'Administrator R&R' : 'Commissioner R&R'),
      department: department || 'Department of Revenue & Rehabilitation',
      email: officerEmail,
      phone: officerPhone,
      serviceId: serviceId || `SVC-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNo: postingOrderNo,
      jurisdiction: jurisdictionArea || selectedProj?.name
    };

    setRnrOfficers(prev => [...prev, newOff]);
    setOfficerName('');
    setOfficerEmail('');
    setOfficerPhone('');
    setDesignation('');
    setDepartment('');
    setServiceId('');
  };

  const handleDeleteOfficer = (id) => {
    setRnrOfficers(prev => prev.filter(o => o.id !== id));
  };

  const handleFinalAccessClick = () => {
    const grantedMenus = rnrMenus.filter(m => menuAccess[m.key] === 'VIEW');
    onGrantFinalAccess({
      category: 'RNR_AUTHORITY',
      subCategory: rnrRoleType,
      title: rnrRoleType === 'ADMINISTRATOR' 
        ? 'R&R Administrator Statutory Workspace' 
        : 'R&R Commissioner Master Sanction Workspace',
      section: rnrRoleType === 'ADMINISTRATOR' ? 'Section 43' : 'Section 44',
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
      members: rnrOfficers,
      menuAccess: menuAccess,
      grantedMenus: grantedMenus,
      gazetteOrderNo: postingOrderNo
    });
  };

  return (
    <div className="space-y-4">
      {/* 2 Options Selection Cards: (1) R&R Administrator (2) R&R Commissioner */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#C5A059]" />
              Select R&amp;R Statutory Authority Designation
            </h3>
            <p className="text-xs text-slate-500">
              Appoint Administrator (Sec 43) or Commissioner for Rehabilitation and Resettlement (Sec 44)
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
          {/* (1) R&R Administrator - Section 43 */}
          <div
            onClick={() => handleRoleTypeChange('ADMINISTRATOR')}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              rnrRoleType === 'ADMINISTRATOR'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1B365D] text-white">
                SECTION 43
              </span>
              <input
                type="radio"
                name="rnrSelectionRadio"
                checked={rnrRoleType === 'ADMINISTRATOR'}
                onChange={() => handleRoleTypeChange('ADMINISTRATOR')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(1) Administrator for Rehabilitation &amp; Resettlement</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Officer not below rank of Joint Collector / ADC appointed to prepare draft R&amp;R scheme, conduct census, and execute physical allotment.
            </p>
          </div>

          {/* (2) R&R Commissioner - Section 44 */}
          <div
            onClick={() => handleRoleTypeChange('COMMISSIONER')}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              rnrRoleType === 'COMMISSIONER'
                ? 'border-[#1B365D] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#C5A059] text-slate-950">
                SECTION 44
              </span>
              <input
                type="radio"
                name="rnrSelectionRadio"
                checked={rnrRoleType === 'COMMISSIONER'}
                onChange={() => handleRoleTypeChange('COMMISSIONER')}
                className="accent-[#1B365D]"
              />
            </div>
            <h4 className="font-bold text-sm text-[#1B365D] mt-2">(2) Commissioner for Rehabilitation &amp; Resettlement</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Senior officer appointed by State Govt for supervising formulation of R&amp;R schemes, post-implementation audit, and master sanction under Section 18.
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Form */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="pb-3 border-b border-slate-200 mb-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Appoint {rnrRoleType === 'ADMINISTRATOR' ? 'R&R Administrator' : 'R&R Commissioner'}
            </h4>
            <p className="text-xs text-slate-500">
              Mandatory Gmail, phone number, service cadre, and statutory posting order details
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300">
            Order: {postingOrderNo}
          </span>
        </div>

        <form onSubmit={handleAddOfficer} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block pb-1">Officer Name: *</label>
            <input
              type="text"
              value={officerName}
              onChange={e => setOfficerName(e.target.value)}
              placeholder="e.g. Sh. Gurmeet Singh, PCS"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-rose-600" />
              Official Gmail / Email: *
            </label>
            <input
              type="email"
              value={officerEmail}
              onChange={e => setOfficerEmail(e.target.value)}
              placeholder="officer@gmail.com / gov.in"
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
              value={officerPhone}
              onChange={e => setOfficerPhone(e.target.value)}
              placeholder="+91 94172 10982"
              className="w-full p-2 rounded border border-slate-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Service / Cadre:</label>
            <select
              value={cadreService}
              onChange={e => setCadreService(e.target.value)}
              className="w-full p-2 rounded border border-slate-300 bg-white outline-none"
            >
              <option value="IAS">Indian Administrative Service (IAS)</option>
              <option value="PCS/State Civil Service">State Civil Service (PCS/SCS)</option>
              <option value="State Revenue Service">State Revenue Service</option>
              <option value="Judicial / Legal Service">Judicial / Legal Service</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Current Designation:</label>
            <input
              type="text"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              placeholder="e.g. Additional Deputy Commissioner (General)"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Department / Office:</label>
            <input
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              placeholder="e.g. Revenue & Rehabilitation Administration"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block pb-1">Service ID / Employee Code:</label>
            <input
              type="text"
              value={serviceId}
              onChange={e => setServiceId(e.target.value)}
              placeholder="e.g. PCS-2012-084"
              className="w-full p-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-[#C5A059]" />
              Add Appointee to Register
            </button>
          </div>
        </form>
      </div>

      {/* Officers Table */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C5A059]" />
            R&amp;R Statutory Appointees Register ({rnrOfficers.length})
          </h4>
          <span className="text-[11px] text-slate-500">
            Login credentials will be dispatched to each officer's Gmail
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Officer Name</th>
                <th className="py-2.5 px-3">Statutory Designation</th>
                <th className="py-2.5 px-3">Cadre &amp; Service ID</th>
                <th className="py-2.5 px-3">Official Gmail</th>
                <th className="py-2.5 px-3">Mobile No.</th>
                <th className="py-2.5 px-3">Posting Order</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {rnrOfficers.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#1B365D]">{o.name}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      o.roleType === 'COMMISSIONER' ? 'bg-[#C5A059]/30 text-amber-900 border border-[#C5A059]' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {o.roleTitle}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">{o.department}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div>{o.cadre}</div>
                    <div className="font-mono text-[10px] text-slate-500">{o.serviceId}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{o.email}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{o.phone}</td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{o.orderNo}</td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDeleteOfficer(o.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                      title="Remove officer"
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

      {/* R&R Authority Workspace 10 Menus Access Matrix */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              R&amp;R Authority Workspace Menus Access Matrix (10 Statutory Menus)
            </h4>
            <p className="text-xs text-slate-500">
              Configure <strong>[ View ]</strong> or <strong>[ Not Access ]</strong> per officer statutory jurisdiction
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const updated = {};
                rnrMenus.forEach(m => { updated[m.key] = 'VIEW'; });
                setMenuAccess(updated);
              }}
              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold cursor-pointer"
            >
              Grant View to All
            </button>
            <button
              onClick={() => {
                const updated = {};
                rnrMenus.forEach(m => { updated[m.key] = 'NOT_ACCESS'; });
                setMenuAccess(updated);
              }}
              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded text-xs font-semibold cursor-pointer"
            >
              Set All Not Access
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {rnrMenus.map((menu, idx) => {
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
                      name={`rnr-radio-${menu.key}`}
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
                      name={`rnr-radio-${menu.key}`}
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
            disabled={rnrOfficers.length === 0}
            className={`px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm text-white ${
              rnrOfficers.length === 0
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
