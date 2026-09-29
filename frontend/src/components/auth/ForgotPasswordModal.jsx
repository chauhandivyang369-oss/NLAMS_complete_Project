import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { resetPassword } from '../../services/authService.js';

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccess
}) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('884291');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    setIsLoading(false);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setErrorMessage('Please enter the 6-digit OTP sent to your registered address.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border-2 border-[#1B365D] max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between border-b-2 border-[#C5A059]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#142642] border border-[#C5A059]/50 flex items-center justify-center text-[#E6CA85]">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-mono">
                ACCOUNT RECOVERY
              </div>
              <h3 className="text-sm font-bold text-white font-serif">
                Reset Portal Password
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter your registered official email address. A statutory verification code will be dispatched.
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-[#1B365D] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send Recovery OTP</span>}
              </button>
            </form>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter the 6-digit statutory OTP sent to <strong>{email}</strong>:
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold tracking-widest text-center"
                />
                <span className="text-[10px] text-slate-400 mt-1 block text-center">Simulation OTP prefilled: 884291</span>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all"
              >
                Verify &amp; Continue
              </button>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-[#1B365D]"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-[#1B365D]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Update Password</span>}
              </button>
            </form>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-3 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Password Successfully Updated
              </h4>
              <p className="text-xs text-slate-600">
                Your new credentials have been committed. You can now log in to your authorized workspace.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSuccess && onSuccess(email);
                }}
                className="w-full py-2 bg-[#1B365D] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
