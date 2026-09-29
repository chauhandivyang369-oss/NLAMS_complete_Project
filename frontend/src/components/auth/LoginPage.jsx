import React, { useState, useEffect } from 'react';
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
  KeyRound,
  FileCheck,
  Compass,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { 
  authenticateCredentials, 
  PRE_SEEDED_ACCOUNTS, 
  simulateAdminApproval,
  MASTER_WORKSPACE_CATEGORIES
} from '../../services/authService.js';

export default function LoginPage({
  onLoginSuccess,
  onSwitchToSignUp,
  onOpenForgotPassword,
  onBackToHome,
  initialEmail = ''
}) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  // Multi-workspace selection dialog state (Sections 30, 39 & 54)
  const [multiWorkspaceData, setMultiWorkspaceData] = useState(null);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleKeyDown = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setPendingUser(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await authenticateCredentials(email, password);

      if (!res.success) {
        setErrorMessage(res.error);
        if (res.isPendingRbac && res.user) {
          setPendingUser(res.user);
        }
        setIsLoading(false);
        return;
      }

      // Check for multiple authorized workspaces (Sections 30 & 54)
      if (res.hasMultipleWorkspaces && res.user.workspaces.length > 1) {
        setIsLoading(false);
        setMultiWorkspaceData({
          user: res.user,
          workspaces: res.user.workspaces
        });
        return;
      }

      setIsLoading(false);
      onLoginSuccess(res.user.primaryWorkspace, res.user);

    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An unexpected authentication error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Quick-fill category filter state
  const [quickFillTab, setQuickFillTab] = useState('all'); // 'all' | 'gov' | 'project' | 'social'

  const handleQuickFill = (acc, autoLogin = false) => {
    setEmail(acc.email);
    setPassword(acc.passwordHash);
    setErrorMessage('');
    setPendingUser(null);
    if (autoLogin) {
      setIsLoading(true);
      authenticateCredentials(acc.email, acc.passwordHash).then(res => {
        setIsLoading(false);
        if (res.success) {
          if (res.hasMultipleWorkspaces && res.user.workspaces.length > 1) {
            setMultiWorkspaceData({
              user: res.user,
              workspaces: res.user.workspaces
            });
          } else {
            onLoginSuccess(res.user.primaryWorkspace, res.user);
          }
        } else {
          setErrorMessage(res.error || 'Authentication failed');
        }
      }).catch(() => {
        setIsLoading(false);
        setErrorMessage('Failed to sign in. Please try again.');
      });
    }
  };

  const handleAdminApproveAndLogin = (user) => {
    simulateAdminApproval(user.id);
    setPendingUser(null);
    setErrorMessage('');
    authenticateCredentials(email, password).then(res => {
      if (res.success) {
        onLoginSuccess(res.user.primaryWorkspace, res.user);
      }
    });
  };

  const workspaceLabels = {
    'central-appropriate-gov': 'Central Appropriate Government Workspace',
    'state-appropriate-gov': 'State Appropriate Government Workspace',
    'district-collector': 'Master District Collector Workspace',
    'requiring-body': 'Requiring Body (Project Authority) Workspace',
    'policy-maker': 'Policy Maker / Executive Analytics Workspace',
    'sia-ieg': 'SIA & IEG Evaluation Workspace',
    'rr-authority': 'R&R Authority Workspace',
    'larr-authority': 'LARR Authority / Judicial Tribunal Workspace',
    'citizen': 'Citizen / Affected Landowner Workspace'
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Top Government Strip */}
      <header className="bg-[#0b1728] border-b border-slate-800 text-white px-4 sm:px-8 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          {/* Circular Government Badge */}
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

        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer transition-colors border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Main Container - Desktop 2-Column Exact Layout (Section 3) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        
        {/* MULTIPLE WORKSPACES SELECTION DIALOG (Sections 30, 39 & 54) */}
        {multiWorkspaceData ? (
          <div className="w-full max-w-md bg-white rounded-2xl border-2 border-[#1B365D] shadow-2xl p-6 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#1B365D] text-[#C5A059] flex items-center justify-center mx-auto mb-2 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1B365D] font-serif">
                Select Authorized Workspace
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your account <strong>{multiWorkspaceData.user.fullName}</strong> is authorized for multiple statutory workspaces:
              </p>
            </div>

            <div className="space-y-2.5 mb-5">
              {multiWorkspaceData.workspaces.map((wsKey) => (
                <button
                  key={wsKey}
                  onClick={() => onLoginSuccess(wsKey, multiWorkspaceData.user)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-300 hover:border-[#1B365D] hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1B365D] group-hover:text-blue-900">
                      {workspaceLabels[wsKey] || wsKey}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Statutory delegated access session
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setMultiWorkspaceData(null)}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold text-center cursor-pointer"
            >
              ← Back to Login Credentials
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* LEFT SIDE: Official NLAMS Branding / Government Identity Panel */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] text-xs font-bold">
                <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Department of Land Resources (DoLR) • MoRD</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B365D] tracking-tight uppercase font-serif leading-tight">
                  National Land Acquisition &amp; Management System
                </h1>
                <p className="text-sm text-slate-600 font-sans mt-2 leading-relaxed">
                  Secure access to the National Land Acquisition &amp; Management System under the statutory framework of the RFCTLARR Act, 2013. Integrated with Cadastral GIS, DGPS spatial survey, and PFMS Direct Benefit Transfer.
                </p>
              </div>

              {/* Framed Landscape Visual Card (Using the reference hero image) */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-md group">
                <img
                  src="/land_acquisition_hero_1787591493962.jpg"
                  alt="NLAMS National Land Acquisition Expressway & Railway Corridor"
                  className="w-full h-48 sm:h-56 object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider font-mono">
                      8 Master Workspace Pillars Live
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white font-serif">
                      Central • State • Collector • Requiring Body • R&amp;R • Tribunal • SIA • Citizen
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Pillars Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 font-medium">RFCTLARR Statutory SLA Timers</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-700 font-medium">100% PFMS Direct Benefit Transfer</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: Centered Login Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                
                {/* Card Header */}
                <div className="bg-[#1B365D] text-white p-5 text-center border-b-2 border-[#C5A059] relative">
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md border border-slate-200">
                    <svg viewBox="0 0 100 120" className="w-7 h-7 text-[#1B365D]" fill="currentColor">
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

                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-serif">
                    NLAMS Secure Login
                  </h2>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Enter your registered credentials to access your authorized workspace
                  </p>
                </div>

                {/* Form Body */}
                <div className="p-6">
                  
                  {/* Error Notification Alert */}
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in duration-100">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div>{errorMessage}</div>
                        {pendingUser && (
                          <div className="mt-2 pt-2 border-t border-red-200 flex items-center justify-between">
                            <span className="text-[10px] text-slate-600">Simulate Administrative Approval:</span>
                            <button
                              type="button"
                              onClick={() => handleAdminApproveAndLogin(pendingUser)}
                              className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700 cursor-pointer"
                            >
                              Grant &amp; Login
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* FIELD 1: Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter registered email address"
                        autoComplete="email"
                        disabled={isLoading}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1B365D] focus:bg-white transition-colors"
                      />
                    </div>

                    {/* FIELD 2: Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={onOpenForgotPassword}
                          className="text-[11px] text-[#1B365D] hover:text-[#C5A059] font-medium hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onKeyUp={handleKeyDown}
                          placeholder="Enter password"
                          autoComplete="current-password"
                          disabled={isLoading}
                          className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1B365D] focus:bg-white transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {capsLockActive && (
                        <div className="text-[10px] text-amber-700 font-medium mt-1">
                          ⚠️ Caps Lock is ON
                        </div>
                      )}
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs sm:text-sm rounded-lg cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed border border-amber-300/30"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#C5A059]" />
                          <span>LOGIN</span>
                        </>
                      )}
                    </button>

                  </form>

                  {/* Sign Up Link */}
                  <div className="mt-5 pt-4 border-t border-slate-200 text-center">
                    <span className="text-xs text-slate-600">Don't have an account? </span>
                    <button
                      type="button"
                      onClick={onSwitchToSignUp}
                      className="text-xs font-bold text-[#1B365D] hover:text-[#C5A059] hover:underline cursor-pointer"
                    >
                      Sign Up / Create Account
                    </button>
                  </div>

                  {/* Back to Home Link */}
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer hover:underline"
                    >
                      ← Return to NLAMS Public Portal
                    </button>
                  </div>

                  {/* Quick Official Master Workspace Accounts Picker */}
                  <div className="mt-5 pt-3 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 font-serif">
                        <KeyRound className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Quick-Fill Master Workspace Credentials:</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                        Default Password: Admin@123
                      </span>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 mb-2.5 overflow-x-auto pb-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setQuickFillTab('all')}
                        className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          quickFillTab === 'all'
                            ? 'bg-[#1B365D] text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        All Workspaces (10)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickFillTab('gov')}
                        className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          quickFillTab === 'gov'
                            ? 'bg-[#1B365D] text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        Govt &amp; CALA (3)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickFillTab('project')}
                        className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          quickFillTab === 'project'
                            ? 'bg-[#1B365D] text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        Project &amp; SIA (3)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickFillTab('social')}
                        className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                          quickFillTab === 'social'
                            ? 'bg-[#1B365D] text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        R&amp;R, Tribunal &amp; Citizen (4)
                      </button>
                    </div>

                    {/* Filtered Workspace Accounts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] max-h-56 overflow-y-auto pr-0.5">
                      {PRE_SEEDED_ACCOUNTS.filter(acc => {
                        if (quickFillTab === 'gov') {
                          return ['central-appropriate-gov', 'state-appropriate-gov', 'district-collector'].includes(acc.primaryWorkspace);
                        }
                        if (quickFillTab === 'project') {
                          return ['requiring-body', 'policy-maker', 'sia-ieg'].includes(acc.primaryWorkspace);
                        }
                        if (quickFillTab === 'social') {
                          return ['rr-authority', 'larr-authority', 'citizen'].includes(acc.primaryWorkspace) || acc.id === 'usr_multi_01';
                        }
                        return true;
                      }).map((acc) => {
                        const isMulti = acc.id === 'usr_multi_01';
                        return (
                          <div
                            key={acc.id}
                            className={`p-2 rounded-lg bg-white border transition-all flex flex-col justify-between ${
                              email === acc.email
                                ? 'border-[#1B365D] ring-1 ring-[#1B365D] bg-blue-50/40'
                                : 'border-slate-200 hover:border-[#C5A059]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                  isMulti 
                                    ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                                    : 'bg-slate-100 text-[#1B365D] border border-slate-200'
                                }`}>
                                  {isMulti ? 'Multi-Workspace' : acc.userType}
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono">
                                  {acc.state}
                                </span>
                              </div>
                              <div className="font-bold text-slate-900 text-xs truncate">
                                {acc.role}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono truncate">
                                {acc.email}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => handleQuickFill(acc, false)}
                                className="flex-1 py-1 px-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer text-center"
                              >
                                Fill Form
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickFill(acc, true)}
                                className="py-1 px-2 rounded bg-[#1B365D] hover:bg-[#132742] text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                                title="Instant Login to this Workspace"
                              >
                                <span>⚡ Login</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Government Footer Strip */}
      <footer className="bg-white border-t border-slate-200 text-[11px] text-slate-500 py-3 px-4 text-center shrink-0">
        <div>National Land Acquisition &amp; Management System (NLAMS) • Department of Land Resources (DoLR), Ministry of Rural Development</div>
        <div className="text-[10px] text-slate-400 mt-0.5">Statutory Digital Governance under RFCTLARR Act, 2013 • Protected under IT Act, 2000</div>
      </footer>

    </div>
  );
}
