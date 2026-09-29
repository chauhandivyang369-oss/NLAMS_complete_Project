import React, { useState } from 'react';
import { SEED_ATTENDANCE_REGISTRY } from '../../../services/siaHearingService.js';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  UserX, 
  UserCheck, 
  FileCheck, 
  ShieldCheck, 
  Phone, 
  Eye, 
  EyeOff, 
  Download, 
  FileSpreadsheet,
  Building,
  UserPlus
} from 'lucide-react';

export default function HearingAttendanceSection() {
  const [participants, setParticipants] = useState(SEED_ATTENDANCE_REGISTRY);
  const [searchTerm, setSearchTerm] = useState('');
  const [villageFilter, setVillageFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [maskPhones, setMaskPhones] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newParticipant, setNewParticipant] = useState({
    name: '',
    participantCategory: 'Affected Family',
    village: 'Petlad',
    familyId: '',
    ulpin: '',
    mobile: '',
    attendanceStatus: 'Present',
    signatureAck: 'Signed Register Page 6'
  });

  const villages = ['All', 'Petlad', 'Sunav', 'Nar', 'Demol', 'Rangaipura'];
  const categories = [
    'All',
    'Affected Family',
    'Landowner',
    'Tenant',
    'Livelihood Dependent',
    'Village Representative',
    'Community Member',
    'Local Authority',
    'Requiring Body Representative',
    'SIA Representative',
    'Other'
  ];
  const statuses = ['All', 'Present', 'Absent', 'Represented', 'Not Verified'];

  const filtered = participants.filter((p) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      p.participantId.toLowerCase().includes(term) ||
      p.name.toLowerCase().includes(term) ||
      p.familyId.toLowerCase().includes(term) ||
      p.ulpin.toLowerCase().includes(term) ||
      p.mobile.includes(term);

    const matchesVillage = villageFilter === 'All' || p.village.includes(villageFilter);
    const matchesCat = categoryFilter === 'All' || p.participantCategory === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.attendanceStatus === statusFilter;

    return matchesSearch && matchesVillage && matchesCat && matchesStatus;
  });

  const presentCount = participants.filter(p => p.attendanceStatus === 'Present').length;
  const representedCount = participants.filter(p => p.attendanceStatus === 'Represented').length;
  const absentCount = participants.filter(p => p.attendanceStatus === 'Absent').length;

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (!newParticipant.name) return;

    const id = `PART-${String(participants.length + 1).padStart(3, '0')}`;
    setParticipants([
      ...participants,
      {
        participantId: id,
        name: newParticipant.name,
        participantCategory: newParticipant.participantCategory,
        village: newParticipant.village,
        familyId: newParticipant.familyId || 'FAM-PENDING',
        ulpin: newParticipant.ulpin || 'N/A',
        surveyNo: 'Assigned on Verification',
        mobile: newParticipant.mobile || '9825100000',
        signatureAck: newParticipant.signatureAck,
        photoVerified: true,
        attendanceStatus: newParticipant.attendanceStatus,
        seatToken: `T-${String(participants.length + 1).padStart(3, '0')}`,
        entryTime: '10:45 AM'
      }
    ]);

    setNewParticipant({
      name: '',
      participantCategory: 'Affected Family',
      village: 'Petlad',
      familyId: '',
      ulpin: '',
      mobile: '',
      attendanceStatus: 'Present',
      signatureAck: 'Signed Register'
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner Notice & Quorum Pill Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1B365D]" />
              <h3 className="font-mono font-bold text-xs text-slate-900 uppercase tracking-wider">
                Section 5 Public Hearing Attendance Registry
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Official roll of landowners, tenants, livelihood dependents, elected panchayat leaders, and officials
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMaskPhones(!maskPhones)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {maskPhones ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{maskPhones ? 'Reveal Phone' : 'Mask Phone'}</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1 bg-[#1B365D] hover:bg-[#152a48] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Record Attendee</span>
            </button>
          </div>
        </div>

        {/* Attendance Aggregates */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Total Registered Attendees:</span>
            <span className="text-base font-bold font-mono text-[#1B365D]">318 Persons</span>
            <span className="text-[10px] text-emerald-700 block font-medium">Quorum Met (Target 250)</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Present in Hall:</span>
            <span className="text-base font-bold font-mono text-emerald-700">302 Present</span>
            <span className="text-[10px] text-slate-500 block">Physically verified on sign-in</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Duly Represented:</span>
            <span className="text-base font-bold font-mono text-purple-700">12 Represented</span>
            <span className="text-[10px] text-slate-500 block">With valid authorization letter</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 block">Absent Noticees:</span>
            <span className="text-base font-bold font-mono text-amber-700">4 Absent</span>
            <span className="text-[10px] text-slate-500 block">Separate notice served</span>
          </div>
        </div>

        {/* Legal Boundary Notice */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-2.5 text-[11px] text-blue-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
          <div>
            <strong>Statutory Roll Rule: </strong>
            Participant category tags (e.g. Landowner, Tenant, Livelihood Dependent) are descriptive roll classifications 
            recorded at hall entry. They do NOT independently create, determine or reject legal compensation entitlements.
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Participant / Family / ULPIN / Token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={villageFilter}
            onChange={(e) => setVillageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            {villages.map(v => <option key={v} value={v}>Village: {v}</option>)}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            {categories.map(c => <option key={c} value={c}>Category: {c}</option>)}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            {statuses.map(s => <option key={s} value={s}>Status: {s}</option>)}
          </select>
        </div>
      </div>

      {/* Attendance Scalable Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-slate-800">
            ATTENDANCE LOG ({filtered.length} of {participants.length} Records)
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Certified against Physical Sign-in Sheets
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <th className="py-2.5 px-3">Participant ID</th>
                <th className="py-2.5 px-3">Name &amp; Token</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Village</th>
                <th className="py-2.5 px-3">Family ID &amp; ULPIN</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3 text-center">Attendance</th>
                <th className="py-2.5 px-3">Acknowledgement Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((p) => {
                const isPresent = p.attendanceStatus === 'Present';
                const isRepresented = p.attendanceStatus === 'Represented';
                const isAbsent = p.attendanceStatus === 'Absent';

                return (
                  <tr key={p.participantId} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                      {p.participantId}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      <div>{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 font-normal">Token: {p.seatToken} • {p.entryTime}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                        {p.participantCategory}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium">
                      {p.village}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      <div className="font-bold text-[#1B365D]">{p.familyId}</div>
                      <div className="text-[10px] text-slate-500">{p.ulpin}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700 text-[11px]">
                      {maskPhones ? `${p.mobile.slice(0, 2)}****${p.mobile.slice(-4)}` : p.mobile}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        isPresent 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isRepresented
                          ? 'bg-purple-100 text-purple-800 border-purple-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {isPresent ? <UserCheck className="w-3 h-3" /> : isRepresented ? <FileCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        {p.attendanceStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px] max-w-xs truncate" title={p.signatureAck}>
                      {p.signatureAck}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Participant */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Record Public Hearing Attendee</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
            </div>
            <form onSubmit={handleAddParticipant} className="p-4 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Somabhai Manibhai Parmar"
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newParticipant.participantCategory}
                    onChange={(e) => setNewParticipant({ ...newParticipant, participantCategory: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  >
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village</label>
                  <select
                    value={newParticipant.village}
                    onChange={(e) => setNewParticipant({ ...newParticipant, village: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  >
                    {villages.filter(v => v !== 'All').map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Affected Family ID</label>
                  <input
                    type="text"
                    placeholder="e.g. FAM-015"
                    value={newParticipant.familyId}
                    onChange={(e) => setNewParticipant({ ...newParticipant, familyId: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile No.</label>
                  <input
                    type="text"
                    placeholder="10 digits"
                    value={newParticipant.mobile}
                    onChange={(e) => setNewParticipant({ ...newParticipant, mobile: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Attendance Status</label>
                <select
                  value={newParticipant.attendanceStatus}
                  onChange={(e) => setNewParticipant({ ...newParticipant, attendanceStatus: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                >
                  <option value="Present">Present</option>
                  <option value="Represented">Represented</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Signature / Acknowledgement Mode</label>
                <input
                  type="text"
                  placeholder="e.g. Signed Register Page 6 / Thumbprint"
                  value={newParticipant.signatureAck}
                  onChange={(e) => setNewParticipant({ ...newParticipant, signatureAck: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
