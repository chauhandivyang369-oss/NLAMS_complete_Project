import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Shield, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MapPin, 
  Home, 
  Briefcase, 
  Users, 
  Check, 
  Paperclip
} from 'lucide-react';

export default function FamilyDetailDrawer({ family, onClose, onUpdateFamily }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'members' | 'livelihood' | 'displacement' | 'evidence'
  const [showMaskedData, setShowMaskedData] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  
  // Local member form state
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    gender: 'Male',
    relation: 'Son',
    education: 'Secondary School',
    occupation: 'Student',
    disability: 'None',
    isPrimaryEarner: false
  });

  if (!family) return null;

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name) return;

    const memberId = `MEM-${family.id.replace('FAM-', '')}-${String(family.members.length + 1).padStart(2, '0')}`;
    const updatedMembers = [
      ...family.members,
      {
        ...newMember,
        age: Number(newMember.age) || 20,
        memberId
      }
    ];

    onUpdateFamily({
      ...family,
      membersCount: updatedMembers.length,
      members: updatedMembers
    });

    setNewMember({
      name: '',
      age: '',
      gender: 'Male',
      relation: 'Son',
      education: 'Secondary School',
      occupation: 'Student',
      disability: 'None',
      isPrimaryEarner: false
    });
    setIsAddingMember(false);
  };

  const handleRemoveMember = (memberId) => {
    const updated = family.members.filter(m => m.memberId !== memberId);
    onUpdateFamily({
      ...family,
      membersCount: updated.length,
      members: updated
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end p-0">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-300">
        
        {/* Header */}
        <div>
          <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#C5A059] uppercase font-bold tracking-wider">
                  Affected Household Census Profile
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 border border-emerald-600 font-semibold">
                  {family.verificationStatus}
                </span>
              </div>
              <div className="text-base font-bold flex items-center gap-3 mt-1">
                <span>{family.id}: {family.headName}</span>
                <span className="text-xs font-mono text-slate-300">({family.village})</span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 pt-2">
            {[
              { id: 'profile', label: 'Household Profile', icon: Home },
              { id: 'members', label: `Members (${family.membersCount})`, icon: Users },
              { id: 'livelihood', label: 'Livelihood Census', icon: Briefcase },
              { id: 'displacement', label: 'Displacement', icon: MapPin },
              { id: 'evidence', label: `Evidence (${family.evidenceCount})`, icon: Paperclip }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? 'border-[#1B365D] text-[#1B365D] bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-5 text-xs space-y-4">
            
            {/* 1. Household Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                
                {/* Sensitive Data Notice & Unmask Toggle */}
                <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Shield className="w-4 h-4 text-[#1B365D]" />
                    <span>Sensitive Identity Data is protected under Aadhaar &amp; DPDP compliance.</span>
                  </div>
                  <button
                    onClick={() => setShowMaskedData(!showMaskedData)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#1B365D] hover:underline cursor-pointer bg-white px-2 py-1 rounded border border-slate-300"
                  >
                    {showMaskedData ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showMaskedData ? 'Mask Data' : 'Authorized View'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="text-[11px] text-slate-500 font-mono">Household Head Name:</span>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{family.headName}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="text-[11px] text-slate-500 font-mono">Mobile Contact:</span>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {showMaskedData ? family.mobileReal : family.mobileMasked}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="text-[11px] text-slate-500 font-mono">NFSA / Ration Card:</span>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {showMaskedData ? family.rationCard : 'NFSA-2405-****'}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="text-[11px] text-slate-500 font-mono">Revenue Location:</span>
                    <div className="font-medium text-slate-900 mt-0.5">
                      {family.village}, Taluka: {family.taluka}, Dist: {family.district}
                    </div>
                  </div>
                </div>

                {/* Cadastral & Survey Linkage */}
                <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100 pb-1">
                    Cadastral Parcel Linkage
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 text-[11px]">Survey Number:</span>
                      <div className="font-mono font-bold text-[#1B365D] mt-0.5">{family.surveyNo}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Unique Parcel ULPIN:</span>
                      <div className="font-mono font-bold text-slate-800 mt-0.5">{family.ulpin}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Affected Social Category:</span>
                      <div className="font-semibold text-slate-900 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px]">
                          {family.affectedCategory}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Field Enumerator:</span>
                      <div className="font-medium text-slate-800 mt-0.5">{family.enumerator}</div>
                    </div>
                  </div>
                </div>

                {/* GPS Coordinates */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-slate-800">Field GPS Captured:</span>
                    <span className="font-mono font-bold text-slate-900">{family.latitude}° N, {family.longitude}° E</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    GPS VERIFIED
                  </span>
                </div>

              </div>
            )}

            {/* 2. Family Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Household Members Census</div>
                    <div className="text-[11px] text-slate-500">Every co-residing member recorded for R&amp;R baseline</div>
                  </div>
                  <button
                    onClick={() => setIsAddingMember(true)}
                    className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                </div>

                {/* Add Member Inline Modal */}
                {isAddingMember && (
                  <form onSubmit={handleAddMember} className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-3">
                    <div className="flex items-center justify-between font-bold text-blue-900 text-xs">
                      <span>Add New Household Member</span>
                      <button type="button" onClick={() => setIsAddingMember(false)} className="text-blue-600 hover:text-blue-900">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          placeholder="e.g. Smt. Geetaben Patel"
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Age *</label>
                        <input
                          type="number"
                          required
                          value={newMember.age}
                          onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                          placeholder="Age"
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Gender</label>
                        <select
                          value={newMember.gender}
                          onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Relationship to Head</label>
                        <select
                          value={newMember.relation}
                          onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="Spouse">Spouse</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Daughter-in-Law">Daughter-in-Law</option>
                          <option value="Grandchild">Grandchild</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Occupation</label>
                        <input
                          type="text"
                          value={newMember.occupation}
                          onChange={(e) => setNewMember({ ...newMember, occupation: e.target.value })}
                          placeholder="e.g. Student / Farm Labour"
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsAddingMember(false)}
                        className="px-3 py-1 bg-white border border-slate-300 rounded text-xs text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-[#1B365D] text-white rounded text-xs font-semibold"
                      >
                        Save Member
                      </button>
                    </div>
                  </form>
                )}

                {/* Member Records Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                        <th className="py-2 px-2.5">Member ID</th>
                        <th className="py-2 px-2.5">Name</th>
                        <th className="py-2 px-2.5">Age/Sex</th>
                        <th className="py-2 px-2.5">Relation</th>
                        <th className="py-2 px-2.5">Occupation</th>
                        <th className="py-2 px-2.5">Disability</th>
                        <th className="py-2 px-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {family.members.map((m) => (
                        <tr key={m.memberId} className="hover:bg-slate-50">
                          <td className="py-2 px-2.5 font-mono text-[11px] font-bold text-[#1B365D]">{m.memberId}</td>
                          <td className="py-2 px-2.5 font-semibold text-slate-900">{m.name}</td>
                          <td className="py-2 px-2.5 text-slate-700">{m.age}y / {m.gender}</td>
                          <td className="py-2 px-2.5 text-slate-700">{m.relation}</td>
                          <td className="py-2 px-2.5 text-slate-700">{m.occupation}</td>
                          <td className="py-2 px-2.5">
                            <span className={m.disability !== 'None' ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                              {m.disability}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-center">
                            {m.relation !== 'Self (Household Head)' && (
                              <button
                                onClick={() => handleRemoveMember(m.memberId)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="Remove Member"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. Livelihood Census Tab */}
            {activeTab === 'livelihood' && (
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-sm">Livelihood &amp; Economic Dependency Census</div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 text-[11px]">Primary Livelihood:</span>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{family.livelihood}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Estimated Monthly Income:</span>
                    <div className="font-mono font-bold text-[#1B365D] text-sm mt-0.5">{family.monthlyIncome} / month</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Land-Based Dependency:</span>
                    <div className="text-slate-800 font-medium mt-0.5">High — 100% of household foodgrain and fodder</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Water / Canal Dependency:</span>
                    <div className="text-slate-800 font-medium mt-0.5">Mahi Right Bank Canal Distributary #4</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900 text-xs">
                  <div className="font-bold">Livelihood Impact Assessment Note:</div>
                  <p className="mt-1 leading-relaxed">
                    Loss of agricultural parcel reduces net cultivable land below 1.0 ha, shifting the family into 
                    marginal farmer category. Recommend mandatory skill upgradation &amp; SIMP livelihood assistance grant.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Displacement Census Tab */}
            {activeTab === 'displacement' && (
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-sm">Physical Displacement &amp; Resettlement Census</div>
                
                <div className={`p-3 rounded-lg border flex items-center justify-between ${
                  family.isDisplaced 
                    ? 'bg-rose-50 border-rose-200 text-rose-900' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  <div>
                    <div className="text-[11px] font-mono uppercase font-bold">Physical Displacement Status</div>
                    <div className="font-bold text-base mt-0.5">
                      {family.isDisplaced ? 'YES — Family Subject to Physical Relocation' : 'NO — Land Acquisition Only (Non-Displaced)'}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                    family.isDisplaced ? 'bg-rose-600 text-white border-rose-700' : 'bg-emerald-600 text-white border-emerald-700'
                  }`}>
                    {family.isDisplaced ? 'DISPLACED' : 'AFFECTED ONLY'}
                  </span>
                </div>

                {family.isDisplaced && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                    <div>
                      <span className="text-slate-500">Reason for Displacement:</span>
                      <div className="font-medium text-slate-900 mt-0.5">{family.displacementReason}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Preferred Resettlement Location:</span>
                      <div className="font-medium text-slate-900 mt-0.5">{family.preferredRelocation}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Special Family Requirements:</span>
                      <div className="text-slate-800 mt-0.5">
                        Proximity to primary health sub-centre and community dairy collection cooperative.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Evidence Tab */}
            {activeTab === 'evidence' && (
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-sm">Attached Field Survey Evidence</div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">geo_homestead_survey_{family.id}.jpg</div>
                      <div className="text-[10px] text-slate-500 font-mono">Timestamped: 18/02/2026 • 2.4 MB • GPS Embedded</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">ration_card_copy_{family.id}.pdf</div>
                      <div className="text-[10px] text-slate-500 font-mono">Uploaded by Enumerator Anita Solanki • 1.1 MB</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between sticky bottom-0">
          <div className="text-[11px] text-slate-500 font-mono">
            Dossier ID: {family.id} • Last Updated: {family.lastUpdated}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1B365D] text-white rounded-lg text-xs font-semibold hover:bg-[#152a48] cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
