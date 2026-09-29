import React, { useState } from 'react';
import { 
  KeyRound, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  Mail,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { resetPassword } from '../../services/authService.js';

export default function ForgotPasswordPage({
  onBackToLogin,
  onResetSuccess,
  onBackToHome
}) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('884291');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 450));
    setIsLoading(false);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    const res = await resetPassword(email, newPassword);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error);
      return;
    }

    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Top Bar */}
      <header className="bg-[#0b1728] border-b border-slate-800 text-white px-4 sm:px-8 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
            <svg viewBox="0 0 100 120" className="w-6 h-6 text-[#1B365D]" fill="currentColor">
              <circle cx="50" cy="28" r="14" fill="#C5A059" />
              <path d="M42 20 C42 16, 58 16, 58 20 C64 22, 64 32, 58 35 C36 32, 36 22, 42 20 Z" fill="#996E25" />
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
            onClick={onBackToLogin}
            className="px-3 py-1.5 rounded-md bg-[#C5A059] hover:bg-[#b58f45] text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-xs"
          >
            Login
          </button>
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </div>
      </header>

      {/* Main 2-Column Layout */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Side */}
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Statutory Credential Recovery</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1B365D] tracking-tight uppercase font-serif leading-tight">
              Reset Portal Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              If an official account is associated with your email address, you can verify your identity and commit a new password under the statutory security protocols.
            </p>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs text-slate-600">
              <div className="font-bold text-[#1B365D] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Password Security Guidelines:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500">
                <li>Minimum 6 characters long</li>
                <li>Combination of letters, numbers, and special characters</li>
                <li>Passwords are never transmitted or stored in plain text</li>
              </ul>
            </div>
          </div>

          {/* Right Side Form Card */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              
              <div className="bg-[#1B365D] text-white p-5 text-center border-b-2 border-[#C5A059]">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-[#C5A059]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white font-serif">
                  Credential Recovery Gateway
                </h2>
                <p className="text-[11px] text-slate-300">
                  Step {step} of 4 • Identity Verification
                </p>
              </div>

              <div className="p-6">
                
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Step 1: Email Address */}
                {step === 1 && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <p className="text-xs text-slate-600">
                      Enter your registered email address to receive recovery verification:
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Registered Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. collector.ahmedabad@gov.in"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#1B365D] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 border border-amber-300/40"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" /> : <span>Send Recovery OTP</span>}
                    </button>
                  </form>
                )}

                {/* Step 2: OTP */}
                {step === 2 && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <p className="text-xs text-slate-600">
                      Enter the 6-digit statutory OTP dispatched to <strong>{email}</strong>:
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        6-Digit OTP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="884291"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold tracking-widest text-center"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block text-center font-mono">Demo OTP prefilled: 884291</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all border border-amber-300/40"
                    >
                      Verify &amp; Continue
                    </button>
                  </form>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:bg-white focus:border-[#1B365D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:bg-white focus:border-[#1B365D]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 border border-amber-300/40"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" /> : <span>Update Password</span>}
                    </button>
                  </form>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="text-center py-4 space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-serif">
                      Password Successfully Updated
                    </h4>
                    <p className="text-xs text-slate-600">
                      Your new credentials have been committed. You can now log in to your authorized workspace.
                    </p>
                    <button
                      type="button"
                      onClick={() => onResetSuccess && onResetSuccess(email)}
                      className="w-full py-2.5 bg-[#1B365D] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer border border-amber-300/40"
                    >
                      Return to Login
                    </button>
                  </div>
                )}

                {/* Return link */}
                <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                  <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    ← Back to Login
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
