import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Building2, 
  Landmark, 
  MapPin, 
  Scale, 
  Briefcase, 
  Users, 
  Settings, 
  ArrowRight,
  KeyRound,
  Smartphone,
  UserPlus
} from 'lucide-react';
import LoginPage from '../auth/LoginPage.jsx';
import SignUpPage from '../auth/SignUpPage.jsx';
import ForgotPasswordModal from '../auth/ForgotPasswordModal.jsx';

export default function OfficerLoginModal({
  isOpen,
  onClose,
  onLaunchWorkspace,
  initialMode = 'login'
}) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'signup' | 'gateway' | 'sso' | 'citizen-otp'
  const [selectedRoleGroup, setSelectedRoleGroup] = useState('district');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState('');

  useEffect(() => {
    if (initialMode) {
      setAuthMode(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const designationsList = [
    {
      group: 'central',
      groupName: 'Role Group 1: Central Appropriate Government',
      designations: [
        { id: 1, name: 'NMC Member', ws: 'central-appropriate-gov' },
        { id: 2, name: 'Nodal Officer', ws: 'central-appropriate-gov' },
        { id: 3, name: 'Finance Director', ws: 'policy-maker' }
      ]
    },
    {
      group: 'state',
      groupName: 'Role Group 2: State Appropriate Government',
      designations: [
        { id: 4, name: 'Principal Secretary / Revenue', ws: 'state-appropriate-gov' },
        { id: 5, name: 'R&R Commissioner', ws: 'rr-authority' },
        { id: 6, name: 'IEG Reviewer / Expert Group Member', ws: 'sia-ieg' }
      ]
    },
    {
      group: 'district',
      groupName: 'Role Group 3: District Collectorate (CALA)',
      designations: [
        { id: 7, name: 'District Collector', ws: 'district-collector' },
        { id: 8, name: 'Special Land Acquisition Officer (SLAO)', ws: 'district-collector' },
        { id: 9, name: 'CALA (Competent Authority)', ws: 'district-collector' },
        { id: 10, name: 'R&R Administrator', ws: 'rr-authority' },
        { id: 11, name: 'SIA Study Officer / SIA Lead', ws: 'sia-ieg' },
        { id: 12, name: 'Revenue Surveyor', ws: 'district-collector' }
      ]
    },
    {
      group: 'requiring-body',
      groupName: 'Role Group 4: Requiring Body (Project Authority)',
      designations: [
        { id: 13, name: 'CPM / Project Director', ws: 'requiring-body' },
        { id: 14, name: 'Project Finance Officer', ws: 'requiring-body' }
      ]
    },
    {
      group: 'citizen',
      groupName: 'Role Group 5: Citizen & Affected Persons',
      designations: [
        { id: 15, name: 'Recorded Landowner / Khatedar', ws: 'citizen' },
        { id: 16, name: 'Agricultural Tenant / Affected Person', ws: 'citizen' }
      ]
    },
    {
      group: 'tribunal',
      groupName: 'Role Group 6: LARR Authority (Tribunal)',
      designations: [
        { id: 17, name: 'Presiding Officer (Judicial Officer)', ws: 'larr-authority' },
        { id: 18, name: 'Tribunal Registrar / Docket Clerk', ws: 'larr-authority' }
      ]
    },
    {
      group: 'admin',
      groupName: 'Role Group 7: Platform Administration',
      designations: [
        { id: 19, name: 'System Administrator / Platform Manager', ws: 'central-appropriate-gov' }
      ]
    }
  ];

  const handleSelectDesignation = (wsKey) => {
    onClose();
    onLaunchWorkspace(wsKey);
  };

  const handleLoginSuccess = (targetWorkspaceKey, userProfile) => {
    onClose();
    onLaunchWorkspace(targetWorkspaceKey);
  };

  const handleRegistrationComplete = (email) => {
    setPrefilledEmail(email);
    setAuthMode('login');
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border-2 border-[#1B365D] max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Top Government Header Bar */}
        <div className="bg-[#1B365D] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#C5A059] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#142642] border border-[#C5A059]/40 flex items-center justify-center text-[#E6CA85] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-mono">
                STATUTORY DIGITAL ACCESS GATEWAY
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                NLAMS Authentication &amp; Account Portal
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs shrink-0">
          <button
            onClick={() => setAuthMode('login')}
            className={`px-3 py-1.5 rounded-md font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Secure Portal Login</span>
          </button>

          <button
            onClick={() => setAuthMode('signup')}
            className={`px-3 py-1.5 rounded-md font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-500" />
            <span>Sign Up / Create Account</span>
          </button>

          <button
            onClick={() => setAuthMode('gateway')}
            className={`px-3 py-1.5 rounded-md font-bold cursor-pointer transition-all ${
              authMode === 'gateway'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            18 Designations Direct Gateway
          </button>

          <button
            onClick={() => setAuthMode('sso')}
            className={`hidden md:inline-flex px-3 py-1.5 rounded-md font-bold cursor-pointer transition-all ${
              authMode === 'sso'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Jan Parichay SSO
          </button>

          <button
            onClick={() => setAuthMode('citizen-otp')}
            className={`hidden md:inline-flex px-3 py-1.5 rounded-md font-bold cursor-pointer transition-all ${
              authMode === 'citizen-otp'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Citizen OTP
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* TAB 1: MASTER LOGIN PAGE (Sections 3 - 9, 61) */}
          {authMode === 'login' && (
            <LoginPage
              initialEmail={prefilledEmail}
              onLoginSuccess={handleLoginSuccess}
              onSwitchToSignUp={() => setAuthMode('signup')}
              onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
              onClose={onClose}
            />
          )}

          {/* TAB 2: MASTER SIGN UP PAGE (Sections 10 - 39, 62) */}
          {authMode === 'signup' && (
            <SignUpPage
              onSwitchToLogin={() => setAuthMode('login')}
              onRegistrationSuccess={handleRegistrationComplete}
            />
          )}

          {/* TAB 3: 18 DESIGNATIONS DIRECT GATEWAY (Preserved) */}
          {authMode === 'gateway' && (
            <div className="space-y-6 max-w-3xl mx-auto py-2">
              <div className="text-xs text-slate-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                <strong className="text-blue-900">Direct Statutory Review Mode:</strong> Select any of the 18 official designations across the 7 statutory role groups below to directly enter and review that specialized workspace.
              </div>

              {/* Role Group Selector */}
              <div className="flex flex-wrap gap-2 text-xs">
                {designationsList.map((g) => (
                  <button
                    key={g.group}
                    onClick={() => setSelectedRoleGroup(g.group)}
                    className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition-all ${
                      selectedRoleGroup === g.group
                        ? 'bg-[#1B365D] text-white border-[#1B365D] font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {g.group.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Designations in Selected Group */}
              {designationsList
                .filter(g => g.group === selectedRoleGroup)
                .map((grp) => (
                  <div key={grp.group} className="space-y-3">
                    <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider font-serif">
                      {grp.groupName}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {grp.designations.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleSelectDesignation(d.ws)}
                          className="p-3 rounded-xl border border-slate-200 hover:border-[#1B365D] bg-white text-left transition-all group cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                              <span>DESIG #{d.id}</span>
                              <span className="text-emerald-700 font-bold group-hover:text-emerald-800">READY</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1B365D]">
                              {d.name}
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-[#1B365D]">
                            <span>Enter Workspace</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* TAB 4: Jan Parichay SSO */}
          {authMode === 'sso' && (
            <div className="space-y-5 max-w-md mx-auto py-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-[#1B365D] mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-serif">
                  MeriPehchaan / Jan Parichay SSO
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  National Single Sign-On Service for Government Officers
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Government Email ID / Parichay User ID:</label>
                  <input
                    type="email"
                    placeholder="officer.name@nic.in"
                    defaultValue="collector.bharuch@nic.in"
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#1B365D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parichay Password:</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue="Password@123"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#1B365D]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectDesignation('district-collector')}
                  className="w-full py-2.5 bg-[#1B365D] text-white font-bold rounded-lg cursor-pointer hover:bg-[#142642] transition-colors"
                >
                  Verify Parichay Credentials &amp; Authenticate
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: Citizen Mobile OTP */}
          {authMode === 'citizen-otp' && (
            <div className="space-y-5 max-w-md mx-auto py-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-700 mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-serif">
                  Citizen Mobile &amp; Aadhaar OTP Login
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Instant secure access to your land acquisition claims and compensation
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number (Aadhaar Linked):</label>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    defaultValue="98251 44819"
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#1B365D]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectDesignation('citizen')}
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold rounded-lg cursor-pointer hover:bg-emerald-800 transition-colors"
                >
                  Send OTP &amp; Open Citizen Portal
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sub-Footer */}
        <div className="bg-slate-100 px-6 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>Protected under Information Technology Act, 2000 &amp; RFCTLARR Act, 2013</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-950 cursor-pointer"
          >
            Cancel / Close
          </button>
        </div>

      </div>

      {/* Forgot Password Modal (Section 52) */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSuccess={(recoveredEmail) => {
          setPrefilledEmail(recoveredEmail);
          setAuthMode('login');
        }}
      />

    </div>
  );
}
