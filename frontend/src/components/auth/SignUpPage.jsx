import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ArrowLeft,
  Building2, 
  Landmark, 
  UserCheck, 
  Briefcase, 
  Scale, 
  Users, 
  MapPin,
  Check,
  FileCheck,
  Search,
  KeyRound,
  Info
} from 'lucide-react';
import { 
  registerNewAccount, 
  MASTER_WORKSPACE_CATEGORIES,
  REFERENCE_CENTRAL_MINISTRIES,
  REFERENCE_STATES_MAP,
  REFERENCE_REQUIRING_BODIES
} from '../../services/authService.js';

export default function SignUpPage({
  onSwitchToLogin,
  onRegistrationSuccess,
  onBackToHome
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Section 6: Personal Information
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Section 7: Access Category (Workspace)
  const [workspaceCategory, setWorkspaceCategory] = useState('Citizen / Affected Landowner');

  // Sections 8-17: Cascading Dependent Fields
  // Central
  const [centralMinistry, setCentralMinistry] = useState(REFERENCE_CENTRAL_MINISTRIES[0].name);
  // State
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [selectedDistrict, setSelectedDistrict] = useState('Ahmedabad');
  const [stateDepartment, setStateDepartment] = useState('Revenue & Disaster Management Department');
  // Requiring Body
  const [requiringBodyType, setRequiringBodyType] = useState('Government');
  const [requiringBodyOrg, setRequiringBodyOrg] = useState(REFERENCE_REQUIRING_BODIES['Government'][0].name);
  const [requiringBodyProject, setRequiringBodyProject] = useState('Western Dedicated Freight Corridor (WDFC)');
  // Policy Maker
  const [policyApexBody, setPolicyApexBody] = useState('Niti Aayog Infrastructure & Land Advisory Wing');
  // SIA & IEG
  const [siaUserType, setSiaUserType] = useState('IEG Member');
  const [siaAgencyName, setSiaAgencyName] = useState('State Independent SIA Directorate');
  // R&R
  const [rnrDesignation, setRnrDesignation] = useState('R&R Commissioner');
  // LARR
  const [larrTribunal, setLarrTribunal] = useState('LARR Authority State Principal Bench');
  const [larrDesignation, setLarrDesignation] = useState('Presiding Officer (Judicial Officer)');
  // Citizen
  const [citizenType, setCitizenType] = useState('Recorded Landowner / Khatedar');
  const [village, setVillage] = useState('Vadadla');
  const [ulpin, setUlpin] = useState('GJ-BRD-2024-8842-991A');
  const [surveyNo, setSurveyNo] = useState('142/A');

  // Generic Designation Field
  const [customDesignation, setCustomDesignation] = useState('');

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { level: 'none', label: '', width: '0%', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 'weak', label: 'Weak', width: '33%', color: 'bg-red-500' };
    if (score <= 4) return { level: 'moderate', label: 'Moderate', width: '66%', color: 'bg-amber-500' };
    return { level: 'strong', label: 'Strong (Government Security Standard)', width: '100%', color: 'bg-emerald-600' };
  };

  // Derive associated Appropriate Government for Requiring Body (Section 11)
  const getAssociatedGov = () => {
    const list = REFERENCE_REQUIRING_BODIES[requiringBodyType] || [];
    const found = list.find(item => item.name === requiringBodyOrg);
    return found ? found.assocGov : 'Central Ministry of Road Transport & Highways';
  };

  // Resolve Final Designation based on category
  const getEffectiveDesignation = () => {
    if (workspaceCategory === 'Citizen / Affected Landowner') return citizenType;
    if (workspaceCategory === 'R&R Authority') return rnrDesignation;
    if (workspaceCategory === 'LARR Authority / Judicial Tribunal') return larrDesignation;
    if (workspaceCategory === 'SIA & IEG Evaluation') {
      return siaUserType === 'IEG Member' ? 'IEG Reviewer / Expert Group Member' : 'SIA Study Lead / Investigator';
    }
    if (workspaceCategory === 'District Collector' || workspaceCategory === 'Master District Collector') {
      return customDesignation || 'District Collector / DM / Deputy Commissioner';
    }
    if (workspaceCategory === 'Central Appropriate Government') {
      return customDesignation || 'Central Ministry Nodal Officer';
    }
    if (workspaceCategory === 'State Appropriate Government') {
      return customDesignation || 'Principal Secretary / Revenue';
    }
    if (workspaceCategory === 'Requiring Body') {
      return customDesignation || 'CPM / Project Director';
    }
    if (workspaceCategory === 'Policy Maker / Executive Analytics') {
      return customDesignation || 'Finance Director & Apex Advisor';
    }
    return customDesignation || 'Authorized Officer';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!username.trim() || username.length < 3) {
      setErrorMessage('Username is required and must be at least 3 characters.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid official or personal email address.');
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match.');
      return;
    }

    setIsLoading(true);

    try {
      // Organization resolver
      let organizationResolved = 'Government Authority';
      if (workspaceCategory === 'Central Appropriate Government') organizationResolved = centralMinistry;
      else if (workspaceCategory === 'State Appropriate Government') organizationResolved = `${selectedState} - ${stateDepartment}`;
      else if (workspaceCategory === 'District Collector' || workspaceCategory === 'Master District Collector') organizationResolved = `District Collectorate of ${selectedDistrict}, ${selectedState}`;
      else if (workspaceCategory === 'Requiring Body') organizationResolved = `${requiringBodyOrg} (${getAssociatedGov()})`;
      else if (workspaceCategory === 'Policy Maker / Executive Analytics') organizationResolved = policyApexBody;
      else if (workspaceCategory === 'SIA & IEG Evaluation') organizationResolved = siaAgencyName;
      else if (workspaceCategory === 'R&R Authority') organizationResolved = `Directorate of R&R, Govt of ${selectedState}`;
      else if (workspaceCategory === 'LARR Authority / Judicial Tribunal') organizationResolved = larrTribunal;
      else if (workspaceCategory === 'Citizen / Affected Landowner') organizationResolved = `Village ${village}, District ${selectedDistrict}, ${selectedState}`;

      const res = await registerNewAccount({
        fullName: fullName || username,
        username,
        email,
        mobile: `+91 ${mobile.replace(/^\+91/, '').trim()}`,
        password,
        workspaceCategory,
        organization: organizationResolved,
        state: selectedState,
        district: selectedDistrict,
        role: getEffectiveDesignation(),
        ulpin: workspaceCategory === 'Citizen / Affected Landowner' ? ulpin : '',
        surveyNo: workspaceCategory === 'Citizen / Affected Landowner' ? surveyNo : ''
      });

      if (!res.success) {
        setErrorMessage(res.error);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsSuccess(true);
      setSuccessData(res);

    } catch (err) {
      console.error('Registration submission error:', err);
      setErrorMessage('Failed to submit registration. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Top Government Bar */}
      <header className="bg-[#0b1728] border-b border-slate-800 text-white px-4 sm:px-8 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
            <svg viewBox="0 0 100 120" className="w-6 h-6 text-[#1B365D]" fill="currentColor">
              <circle cx="50" cy="28" r="14" fill="#C5A059" />
              <path d="M42 20 C42 16, 58 16, 58 20 C64 22, 64 32, 58 35 C58 40, 42 40, 42 35 C36 32, 36 22, 42 20 Z" fill="#996E25" />
              <rect x="25" y="46" width="50" height="12" rx="2" fill="#C5A059" />
              <circle cx="50" cy="52" r="5" fill="#1B365D" />
              <circle cx="50" cy="52" r="4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
              <path d="M20 62 L80 62 L74 74 L26 74 Z" fill="#996E25" />
              <rect x="18" y="78" width="64" height="14" rx="2" fill="#142642" stroke="#C5A059" strokeWidth="1" />
              <text x="50" y="88" fontSize="7.5" fill="#FAF5E6" fontWeight="bold" textAnchor="middle" fontFamily="serif">सत्यमेव जयते</text>
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-[#C5A059] font-bold tracking-widest uppercase leading-tight">
              GOVERNMENT OF INDIA • MINISTRY OF RURAL DEVELOPMENT
            </div>
            <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight font-serif leading-tight">
              National Land Acquisition &amp; Management System (NLAMS)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToLogin}
            className="px-3 py-1.5 rounded-md bg-[#C5A059] hover:bg-[#b58f45] text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-xs"
          >
            Login
          </button>
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
      </header>

      {/* Main 2-Column Desktop Layout (Section 5) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        
        {/* SUCCESS STATE CARD */}
        {isSuccess && successData ? (
          <div className="w-full max-w-xl bg-white rounded-2xl border-2 border-[#1B365D] shadow-2xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-xl font-bold text-[#1B365D] font-serif">
              Registration Successfully Submitted
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              {successData.message}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2.5 my-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Registration Docket ID:</span>
                <span className="font-mono font-bold text-[#1B365D]">{successData.regId}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Registered Email:</span>
                <span className="font-semibold text-slate-800">{successData.user.email}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Requested Workspace:</span>
                <span className="font-bold text-[#1B365D]">{successData.user.userType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Initial RBAC Access Status:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                  successData.user.rbacStatus === 'ACTIVE'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {successData.user.rbacStatus}
                </span>
              </div>
            </div>

            <button
              onClick={() => onRegistrationSuccess(successData.user.email)}
              className="px-6 py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all inline-flex items-center gap-2 border border-amber-300/40"
            >
              <span>PROCEED TO LOGIN</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start my-4">
            
            {/* LEFT SIDE: NLAMS Branding & 8 Workspace Pillars Architecture (Section 5) */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] text-xs font-bold">
                <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Statutory Account Registration Portal</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1B365D] tracking-tight uppercase font-serif leading-tight">
                  Create NLAMS Account
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1.5 leading-relaxed">
                  Register for authorized access to the National Land Acquisition &amp; Management System.
                </p>
              </div>

              {/* CRITICAL SECURITY NOTICE (Section 2 & 18) */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 space-y-1 shadow-2xs">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Statutory Security Notice</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900/90">
                  Workspace access is subject to role, organization, territorial jurisdiction and official RBAC authorization. A public user cannot self-grant privileged government permissions merely by selecting a designation.
                </p>
              </div>

              {/* 8 MASTER WORKSPACE PILLARS SUMMARY */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                  8 Master Workspace Pillars Governed:
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span className="font-medium">Central Appropriate Government (DoLR / Central Ministries)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span className="font-medium">State Appropriate Government (State Revenue Depts)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span className="font-medium">Requiring Body (NHAI, DFCCIL, NTPC, etc.)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                    <span className="font-medium">Master District Collector / CALA / SLAO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
                    <span className="font-medium">Policy Maker &amp; Executive Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">6</span>
                    <span className="font-medium">SIA &amp; IEG Evaluation Workspace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">7</span>
                    <span className="font-medium">R&amp;R Authority (Administrator &amp; Commissioner)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">8</span>
                    <span className="font-medium">LARR Authority / Judicial Tribunal (Sec 51)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: Complete Registration Form (Section 6-17) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                
                {/* Form Header */}
                <div className="bg-[#1B365D] text-white p-5 border-b-2 border-[#C5A059] flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white font-serif uppercase tracking-tight">
                      Account Registration &amp; Role Request
                    </h2>
                    <p className="text-[11px] text-slate-300">
                      Fill all mandatory statutory details marked with an asterisk (<span className="text-red-400">*</span>)
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-black/20 px-2.5 py-1 rounded border border-white/10">
                    RFCTLARR Act, 2013
                  </span>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                  
                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2 animate-in fade-in duration-100">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* SECTION 1: PERSONAL INFORMATION (Section 6) */}
                  <div>
                    <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                      <span>1. Personal &amp; Contact Credentials</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                          placeholder="e.g. collector_ahmedabad"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name / Official Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Shri Rajesh Varma, IAS"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="official.name@gov.in or email@domain.com"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number (+91) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-mono">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                            placeholder="98250 11223"
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-r-lg text-xs font-mono text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {password && (
                          <div className="mt-1">
                            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full ${getPasswordStrength().color}`} style={{ width: getPasswordStrength().width }}></div>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              Strength: {getPasswordStrength().label}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: ACCESS CATEGORY / WORKSPACE SELECTION (Section 7) */}
                  <div>
                    <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                      <span>2. Access Category (Workspace Pillar)</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Select Access Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={workspaceCategory}
                        onChange={(e) => setWorkspaceCategory(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-bold text-[#1B365D] focus:bg-white focus:border-[#1B365D] focus:outline-none cursor-pointer"
                      >
                        {MASTER_WORKSPACE_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.label}>
                            Pillar {cat.pillarNum}: {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* SECTION 3: DEPENDENT CASCADING SELECTION (Sections 8 to 17) */}
                  <div>
                    <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                      <span>3. Organization &amp; Territorial Jurisdiction</span>
                    </h3>

                    {/* Central Appropriate Government Flow (Section 9) */}
                    {workspaceCategory === 'Central Appropriate Government' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Select Central Appropriate Government / Ministry / Department <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={centralMinistry}
                            onChange={(e) => setCentralMinistry(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:border-[#1B365D]"
                          >
                            {REFERENCE_CENTRAL_MINISTRIES.map(min => (
                              <option key={min.id} value={min.name}>{min.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500 block">Territorial Jurisdiction:</span>
                            <span className="font-semibold text-slate-800">All India (National Mandate)</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Statutory Role Scope:</span>
                            <span className="font-semibold text-slate-800">Section 11/19 Approvals &amp; NMC</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* State Appropriate Government Flow (Section 10) */}
                    {workspaceCategory === 'State Appropriate Government' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select State <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={selectedState}
                              onChange={(e) => {
                                setSelectedState(e.target.value);
                                setSelectedDistrict(REFERENCE_STATES_MAP[e.target.value]?.[0] || '');
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                            >
                              {Object.keys(REFERENCE_STATES_MAP).map(st => (
                                <option key={st}>{st}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select State Appropriate Government / Department <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={stateDepartment}
                              onChange={(e) => setStateDepartment(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                            >
                              <option>Revenue &amp; Disaster Management Department</option>
                              <option>Land Resources &amp; Survey Settlement Directorate</option>
                              <option>State Urban Development Authority</option>
                              <option>State Infrastructure &amp; Expressway Authority</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Requiring Body Flow (Section 11) */}
                    {workspaceCategory === 'Requiring Body' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select Requiring Body Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={requiringBodyType}
                              onChange={(e) => {
                                setRequiringBodyType(e.target.value);
                                setRequiringBodyOrg(REFERENCE_REQUIRING_BODIES[e.target.value]?.[0]?.name || '');
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            >
                              <option value="Government">1. Government Agency / PSU</option>
                              <option value="Private">2. Private Entity</option>
                              <option value="PPP">3. Public-Private Partnership (PPP)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select Requiring Body / Agency <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={requiringBodyOrg}
                              onChange={(e) => setRequiringBodyOrg(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                            >
                              {(REFERENCE_REQUIRING_BODIES[requiringBodyType] || []).map(org => (
                                <option key={org.id} value={org.name}>{org.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Read-only Derived Associated Appropriate Government (Section 11) */}
                        <div className="p-2.5 bg-blue-50 rounded-lg text-xs text-blue-900 border border-blue-200 flex items-center justify-between">
                          <span className="font-medium text-slate-600">Associated Appropriate Government:</span>
                          <span className="font-bold text-[#1B365D]">{getAssociatedGov()}</span>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Associated Project Scope
                          </label>
                          <input
                            type="text"
                            value={requiringBodyProject}
                            onChange={(e) => setRequiringBodyProject(e.target.value)}
                            placeholder="e.g. Western Dedicated Freight Corridor (WDFC)"
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {/* District Collector Flow (Section 12) */}
                    {(workspaceCategory === 'Master District Collector' || workspaceCategory === 'District Collector') && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select State <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={selectedState}
                              onChange={(e) => {
                                setSelectedState(e.target.value);
                                setSelectedDistrict(REFERENCE_STATES_MAP[e.target.value]?.[0] || '');
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            >
                              {Object.keys(REFERENCE_STATES_MAP).map(st => (
                                <option key={st}>{st}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select District (Territorial Scope) <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={selectedDistrict}
                              onChange={(e) => setSelectedDistrict(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#1B365D]"
                            >
                              {(REFERENCE_STATES_MAP[selectedState] || []).map(dt => (
                                <option key={dt}>{dt}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="p-2.5 bg-amber-50 rounded-lg text-xs text-amber-900 border border-amber-200">
                          District Collector Office Scope: <strong>District Magistrate &amp; Collectorate of {selectedDistrict}, {selectedState}</strong>
                        </div>
                      </div>
                    )}

                    {/* Policy Maker Flow (Section 13) */}
                    {workspaceCategory === 'Policy Maker / Executive Analytics' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Select Organization / Apex Body <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={policyApexBody}
                            onChange={(e) => setPolicyApexBody(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                          >
                            <option>Niti Aayog Infrastructure &amp; Land Advisory Wing</option>
                            <option>Department of Land Resources (DoLR) Apex Cell</option>
                            <option>Cabinet Secretariat Infrastructure Review Unit</option>
                            <option>National Monitoring Committee (Sec 48)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* SIA & IEG Evaluation Flow (Section 14) */}
                    {workspaceCategory === 'SIA & IEG Evaluation' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select User Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={siaUserType}
                              onChange={(e) => setSiaUserType(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            >
                              <option>IEG Member (Independent Expert Group)</option>
                              <option>SIA Agency (Accredited Institution)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Accredited Agency / Directorate <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={siaAgencyName}
                              onChange={(e) => setSiaAgencyName(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* R&R Authority Flow (Section 15) */}
                    {workspaceCategory === 'R&R Authority' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select Designation <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={rnrDesignation}
                              onChange={(e) => setRnrDesignation(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#1B365D]"
                            >
                              <option>R&amp;R Commissioner</option>
                              <option>R&amp;R Administrator</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              State / Jurisdiction <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            >
                              {Object.keys(REFERENCE_STATES_MAP).map(st => (
                                <option key={st}>{st}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* LARR Authority Flow (Section 16) */}
                    {workspaceCategory === 'LARR Authority / Judicial Tribunal' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select Tribunal / Authority Bench <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={larrTribunal}
                              onChange={(e) => setLarrTribunal(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            >
                              <option>LARR Authority State Principal Bench</option>
                              <option>LARR Authority District Adjudication Bench</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select Judicial Designation <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={larrDesignation}
                              onChange={(e) => setLarrDesignation(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#1B365D]"
                            >
                              <option>Presiding Officer (Judicial Officer)</option>
                              <option>Tribunal Registrar / Docket Clerk</option>
                              <option>Judicial Clerk / Reader</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Citizen Flow (Section 17) */}
                    {workspaceCategory === 'Citizen / Affected Landowner' && (
                      <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Citizen Type</label>
                            <select
                              value={citizenType}
                              onChange={(e) => setCitizenType(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            >
                              <option>Recorded Landowner / Khatedar</option>
                              <option>Tenant Farmer / Sharecropper</option>
                              <option>Affected Family / Displaced Family</option>
                              <option>Authorized Claimant / Nominee</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Village Name</label>
                            <input
                              type="text"
                              value={village}
                              onChange={(e) => setVillage(e.target.value)}
                              placeholder="e.g. Vadadla"
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">14-Digit ULPIN / Khasra</label>
                            <input
                              type="text"
                              value={ulpin}
                              onChange={(e) => setUlpin(e.target.value)}
                              placeholder="GJ-BRD-2024-8842-991A"
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* SECTION 4: DESIGNATION CONFIRMATION */}
                  <div>
                    <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center gap-1.5">
                      <span>4. Designation &amp; Access Summary</span>
                    </h3>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Effective Statutory Designation:</span>
                        <span className="font-bold text-[#1B365D]">{getEffectiveDesignation()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Access Status upon Registration:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          workspaceCategory === 'Citizen / Affected Landowner'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {workspaceCategory === 'Citizen / Affected Landowner' ? 'ACTIVE' : 'PENDING AUTHORIZATION'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON (Section 33) */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs sm:text-sm rounded-lg cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed border border-amber-300/30"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                        <span>CREATE ACCOUNT</span>
                      </>
                    )}
                  </button>

                  {/* Switch to Login */}
                  <div className="pt-2 text-center text-xs text-slate-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="font-bold text-[#1B365D] hover:text-[#C5A059] hover:underline cursor-pointer"
                    >
                      Login to NLAMS
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-[11px] text-slate-500 py-3 px-4 text-center shrink-0">
        <div>National Land Acquisition &amp; Management System (NLAMS) • Department of Land Resources (DoLR), Ministry of Rural Development</div>
        <div className="text-[10px] text-slate-400 mt-0.5">Statutory Digital Governance under RFCTLARR Act, 2013 • Protected under IT Act, 2000</div>
      </footer>

    </div>
  );
}
