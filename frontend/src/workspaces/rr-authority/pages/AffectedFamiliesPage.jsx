import React, { useState, useMemo } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Home, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Eye, 
  X,
  CreditCard,
  Edit3
} from 'lucide-react';

export default function AffectedFamiliesPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    families, 
    setFamilies, 
    executeUlpinSearch, 
    setDocumentModal,
    addAuditLog,
    setESignModal
  } = useRRAuthority();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [selectedDisplacement, setSelectedDisplacement] = useState('ALL');
  const [selectedCaste, setSelectedCaste] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Selected family for detailed drawer
  const [activeFamily, setActiveFamily] = useState(null);

  // Add Family Modal state
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [newFamilyForm, setNewFamilyForm] = useState({
    headName: '',
    gender: 'Male',
    age: 45,
    casteCategory: 'General',
    familyCategory: 'Landowner (Titleholder)',
    village: 'Petlad',
    taluka: 'Petlad',
    district: 'Anand',
    surveyNumber: '109/2-P',
    ulpin: 'GJ24ANDPET010999',
    agriculturalLandAcquiredHa: 0.50,
    homesteadLost: true,
    residentialStructurePlinthSqM: 65,
    totalMembers: 4,
    displacementStatus: 'Physically Displaced',
    aadhaarMasked: 'XXXX-XXXX-9999',
    voterId: 'GJ/08/042/999999',
    bankName: 'State Bank of India',
    accountMasked: 'XXXXXX9999',
    ifsc: 'SBIN0000452'
  });

  // Filtered families list
  const filteredFamilies = useMemo(() => {
    return families.filter(f => {
      const matchesSearch = 
        !searchTerm ||
        f.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.familyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.ulpin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVillage = selectedVillage === 'ALL' || f.village === selectedVillage;
      const matchesDisplacement = selectedDisplacement === 'ALL' || f.displacementStatus === selectedDisplacement;
      const matchesCaste = selectedCaste === 'ALL' || f.casteCategory === selectedCaste;
      const matchesCategory = selectedCategory === 'ALL' || f.familyCategory.includes(selectedCategory);

      return matchesSearch && matchesVillage && matchesDisplacement && matchesCaste && matchesCategory;
    });
  }, [families, searchTerm, selectedVillage, selectedDisplacement, selectedCaste, selectedCategory]);

  const handleAddFamilySubmit = (e) => {
    e.preventDefault();
    const newId = `FAM-RR-2026-${String(families.length + 1).padStart(3, '0')}`;
    const createdFamily = {
      ...newFamilyForm,
      familyId: newId,
      verificationStatus: 'Under Verification',
      verificationOfficer: 'R. K. Trivedi, Dy. Collector (R&R)',
      verificationDate: new Date().toLocaleDateString('en-GB'),
      gpsCoordinates: '22.4862° N, 72.8105° E',
      entitlementPackage: {
        houseAllotment: newFamilyForm.homesteadLost ? 'Constructed House (50 sq.m Plinth)' : 'Not Eligible (No House Loss)',
        annuityOption: 'Lump Sum One-Time Grant ₹5,00,000',
        resettlementAllowance: 50000,
        transportGrant: 50000,
        cattleShedGrant: 25000,
        oneTimeSubsidyArtisans: 25000
      },
      allotment: {
        allotmentStatus: 'Pending Allotment',
        colonyName: selectedProject.resettlementColony,
        plotNumber: 'Unassigned',
        orderNumber: 'Pending'
      },
      bankDetails: {
        bankName: newFamilyForm.bankName,
        accountMasked: newFamilyForm.accountMasked,
        ifsc: newFamilyForm.ifsc,
        dbtStatus: 'NPCI Seed Verification Pending'
      }
    };

    setFamilies(prev => [createdFamily, ...prev]);
    setIsAddFamilyModalOpen(false);

    addAuditLog(
      'NEW_AFFECTED_FAMILY_ENROLLED',
      `Family: ${newId} (${createdFamily.headName})`,
      'Non-Existent',
      `Enrolled under Village ${createdFamily.village} with ULPIN ${createdFamily.ulpin}`,
      'Form_IV_Census_Master.pdf'
    );
  };

  // Publish Form IV Gazette Notice
  const handlePublishFormIV = () => {
    setESignModal({
      isOpen: true,
      context: {
        title: 'Certify & Publish Form IV Statutory Census Register',
        actionTitle: 'FORM_IV_CENSUS_REGISTER_CERTIFIED',
        entityName: `Project ${selectedProject.code} (500 Families)`,
        documentName: 'FORM_IV_GAZETTE_CERTIFIED_REGISTER.pdf'
      },
      onSignComplete: (signHash) => {
        alert(`Form IV Census Register has been e-Signed successfully (${signHash}). Published to Gazette and Taluka Notice Boards.`);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Body */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Actions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                Affected Families Census &amp; Digital Survey Manager
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                Section 16(1) &amp; Form IV
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Comprehensive baseline survey, RoR titleholder validation, landless livelihood dependents, and vulnerable household registers.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAddFamilyModalOpen(true)}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Affected Family</span>
            </button>

            <button
              onClick={handlePublishFormIV}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b08b43] text-slate-950 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Publish Form IV Gazette Register</span>
            </button>
          </div>
        </div>

        {/* 3. Search & Multi-Criteria Filtering Controls */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Head / ULPIN / Survey..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:border-[#1B365D]"
              />
            </div>

            {/* Village Filter */}
            <div>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="ALL">All Affected Villages (4)</option>
                {(selectedProject?.villages || []).map(v => (
                  <option key={v} value={v}>Village {v}</option>
                ))}
              </select>
            </div>

            {/* Displacement Status Filter */}
            <div>
              <select
                value={selectedDisplacement}
                onChange={(e) => setSelectedDisplacement(e.target.value)}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="ALL">All Displacement Statuses</option>
                <option value="Physically Displaced">Physically Displaced (House Lost)</option>
                <option value="Economically Displaced">Economically Displaced (Land Only)</option>
              </select>
            </div>

            {/* Caste / Sec 41 Filter */}
            <div>
              <select
                value={selectedCaste}
                onChange={(e) => setSelectedCaste(e.target.value)}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="ALL">All Social Categories</option>
                <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST - Sec 41)</option>
                <option value="Scheduled Caste (SC)">Scheduled Caste (SC - Sec 41)</option>
                <option value="OBC">OBC</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Family Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="ALL">All Livelihood Types</option>
                <option value="Landowner">Landowner (Titleholder)</option>
                <option value="Tenant">Agricultural Tenant</option>
                <option value="Labourer">Agricultural Labourer</option>
                <option value="Artisan">Rural Artisan / Craftsman</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100">
            <span>Showing {filteredFamilies.length} of {families.length} families enrolled in Form IV</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Field Geo-Tagging: 100%</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-900 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>RoR Synced via AnyRoR / Bhulekh</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4. Form IV Statutory Bilingual Census Register Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#1B365D]" />
              <span>FORM IV: STATUTORY REGISTER OF AFFECTED FAMILIES (नमूना - ४ विस्थापित परिवारों की सूची)</span>
            </div>

            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Form IV Statutory Bilingual Census Register',
                    code: 'DOC-F4-REGISTER-PETLAD-2026.pdf'
                  }
                });
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded border border-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Export Form IV (PDF / CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-[10px] font-mono text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Family ID</th>
                  <th className="p-2.5">Head of Household &amp; Category</th>
                  <th className="p-2.5">14-Digit ULPIN / Parcel</th>
                  <th className="p-2.5">Village &amp; Taluka</th>
                  <th className="p-2.5">Livelihood Status</th>
                  <th className="p-2.5">Acq. Land / House Loss</th>
                  <th className="p-2.5">Verification</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(filteredFamilies || []).map((f) => (
                  <tr key={f.familyId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-mono whitespace-nowrap">
                      <div className="font-bold text-[#1B365D]">{f.familyId}</div>
                      <div className="text-[10px] text-slate-400">{f.totalMembers} Members</div>
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{f.headName}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold ${
                          f.casteCategory.includes('ST') || f.casteCategory.includes('SC')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {f.casteCategory}
                        </span>
                        <span>{f.gender}, {f.age} yrs</span>
                      </div>
                    </td>

                    <td className="p-2.5 font-mono whitespace-nowrap">
                      <button
                        onClick={() => executeUlpinSearch(f.ulpin)}
                        className="text-[#1B365D] hover:underline font-bold text-[11px] block"
                        title="Click to search global ULPIN hub"
                      >
                        {f.ulpin}
                      </button>
                      <div className="text-[10px] text-slate-500">Survey No: {f.surveyNumber}</div>
                    </td>

                    <td className="p-2.5 text-slate-700 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">Village {f.village}</div>
                      <div className="text-[10px] text-slate-500">Taluka {f.taluka}</div>
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{f.familyCategory}</div>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold mt-0.5 inline-block ${
                        f.displacementStatus.includes('Physical') 
                          ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {f.displacementStatus}
                      </span>
                    </td>

                    <td className="p-2.5 whitespace-nowrap font-mono">
                      <div className="font-bold text-slate-900">{f.agriculturalLandAcquiredHa} Ha</div>
                      <div className={`text-[10px] ${f.homesteadLost ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                        {f.homesteadLost ? `House Lost (${f.residentialStructurePlinthSqM} m²)` : 'No House Loss'}
                      </div>
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{f.verificationStatus}</span>
                      </span>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{f.verificationDate}</div>
                    </td>

                    <td className="p-2.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveFamily(f)}
                          className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-700 rounded font-bold transition-colors cursor-pointer"
                        >
                          View Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 5. Family Details Side Drawer */}
      {activeFamily && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-300 flex flex-col text-slate-800 text-xs animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between border-b border-slate-700">
              <div>
                <h3 className="font-bold text-sm">{activeFamily.headName}</h3>
                <p className="text-[10px] font-mono text-[#E6CA85]">
                  Family ID: {activeFamily.familyId} • ULPIN: {activeFamily.ulpin}
                </p>
              </div>

              <button
                onClick={() => setActiveFamily(null)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Category & Status Alert */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Socio-Economic Classification</span>
                  <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    {activeFamily.casteCategory}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div>Livelihood: <strong>{activeFamily.familyCategory}</strong></div>
                  <div>Displacement: <strong className="text-rose-600">{activeFamily.displacementStatus}</strong></div>
                  <div>Age / Gender: <strong>{activeFamily.age} yrs / {activeFamily.gender}</strong></div>
                  <div>Family Size: <strong>{activeFamily.totalMembers} Members</strong></div>
                </div>
              </div>

              {/* Cadastral & Geographic Coordinates */}
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Land &amp; Structure Parameters</span>
                  <span className="font-mono text-blue-900">Survey No: {activeFamily.surveyNumber}</span>
                </div>
                <div>Acquired Agriculture Land: <strong>{activeFamily.agriculturalLandAcquiredHa} Hectares</strong></div>
                <div>Homestead Lost: <strong>{activeFamily.homesteadLost ? `Yes (${activeFamily.residentialStructurePlinthSqM} m²)` : 'No'}</strong></div>
                <div>Field Coordinates: <span className="font-mono">{activeFamily.gpsCoordinates}</span></div>
              </div>

              {/* Second Schedule Entitlements Assigned */}
              <div className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>Second Schedule Statutory Package</span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">Sec 16(2) Formula</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500 text-[10px] block">HOUSING ENTITLEMENT</span>
                    <strong>{activeFamily.entitlementPackage.houseAllotment}</strong>
                  </div>

                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500 text-[10px] block">EMPLOYMENT / ANNUITY</span>
                    <strong>{activeFamily.entitlementPackage.annuityOption}</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                      Resettlement: <strong>₹{activeFamily.entitlementPackage.resettlementAllowance.toLocaleString()}</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                      Transport: <strong>₹{activeFamily.entitlementPackage.transportGrant.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank & Aadhaar Validation */}
              <div className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1 flex items-center justify-between">
                  <span>Direct Bank Transfer (DBT) Credentials</span>
                  <span className="font-mono text-[10px] text-blue-900">PFMS Ready</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>Bank: <strong>{activeFamily.bankDetails.bankName}</strong></div>
                  <div>Account: <strong>{activeFamily.bankDetails.accountMasked}</strong></div>
                  <div>IFSC: <strong>{activeFamily.bankDetails.ifsc}</strong></div>
                  <div>Aadhaar: <strong>{activeFamily.aadhaarMasked}</strong></div>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setActiveFamily(null)}
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. Enroll New Family Modal */}
      {isAddFamilyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-2xl overflow-hidden text-slate-800 text-xs">
            
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-bold text-sm">Enroll New Affected Family (Form IV Baseline)</h3>
              </div>
              <button
                onClick={() => setIsAddFamilyModalOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFamilySubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Head of Household Name *</label>
                  <input
                    type="text"
                    required
                    value={newFamilyForm.headName}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, headName: e.target.value })}
                    placeholder="Full Name as per Aadhaar / RoR"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Social Category (Sec 41 Trigger) *</label>
                  <select
                    value={newFamilyForm.casteCategory}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, casteCategory: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>
                    <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Affected Village *</label>
                  <select
                    value={newFamilyForm.village}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, village: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  >
                    {selectedProject.villages.map(v => (
                      <option key={v} value={v}>Village {v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Livelihood &amp; Tenure Classification *</label>
                  <select
                    value={newFamilyForm.familyCategory}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, familyCategory: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  >
                    <option value="Landowner (Titleholder)">Landowner (Titleholder)</option>
                    <option value="Agricultural Tenant">Agricultural Tenant</option>
                    <option value="Agricultural Labourer">Agricultural Labourer</option>
                    <option value="Rural Artisan / Craftsman">Rural Artisan / Craftsman</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">14-Digit ULPIN *</label>
                  <input
                    type="text"
                    required
                    value={newFamilyForm.ulpin}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, ulpin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cadastral Survey / Khasra No *</label>
                  <input
                    type="text"
                    required
                    value={newFamilyForm.surveyNumber}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, surveyNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Acquired Land (Hectares) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newFamilyForm.agriculturalLandAcquiredHa}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, agriculturalLandAcquiredHa: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Total Family Members *</label>
                  <input
                    type="number"
                    required
                    value={newFamilyForm.totalMembers}
                    onChange={(e) => setNewFamilyForm({ ...newFamilyForm, totalMembers: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

              {/* Displacement Checkbox */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900">
                  <input
                    type="checkbox"
                    checked={newFamilyForm.homesteadLost}
                    onChange={(e) => setNewFamilyForm({ 
                      ...newFamilyForm, 
                      homesteadLost: e.target.checked,
                      displacementStatus: e.target.checked ? 'Physically Displaced' : 'Economically Displaced'
                    })}
                    className="w-4 h-4 text-[#1B365D] rounded"
                  />
                  <span>Residential Homestead / House Structure Lost (Physical Displacement)</span>
                </label>

                {newFamilyForm.homesteadLost && (
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Existing Residential Plinth Area (sq. meters)
                    </label>
                    <input
                      type="number"
                      value={newFamilyForm.residentialStructurePlinthSqM}
                      onChange={(e) => setNewFamilyForm({ ...newFamilyForm, residentialStructurePlinthSqM: parseFloat(e.target.value) || 0 })}
                      className="w-48 bg-white border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-900"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddFamilyModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Save &amp; Enroll Family
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
