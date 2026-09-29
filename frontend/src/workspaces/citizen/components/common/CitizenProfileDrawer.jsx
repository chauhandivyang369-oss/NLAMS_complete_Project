import React from 'react';
import {
  X,
  User,
  ShieldCheck,
  Phone,
  Mail,
  CreditCard,
  MapPin,
  Building,
  Bell,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export default function CitizenProfileDrawer() {
  const {
    isProfileDrawerOpen,
    setIsProfileDrawerOpen,
    activeCitizen,
    projects,
    language,
    showToast
  } = useCitizen();

  if (!isProfileDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsProfileDrawerOpen(false)}
      />

      <div className="relative w-full sm:w-96 max-w-[90vw] bg-white h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200 flex flex-col text-xs text-slate-800">
        {/* Drawer Header */}
        <div className="p-4 bg-[#1B365D] text-white border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#C5A059] text-[#1B365D] flex items-center justify-center font-bold text-sm shadow">
              {activeCitizen.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="font-bold text-sm text-white">{activeCitizen.name}</div>
              <div className="text-[10px] text-[#E6CA85] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Landowner (Citizen ID: {activeCitizen.id})</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsProfileDrawerOpen(false)}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Identity & Aadhaar e-KYC Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              <span>National Identity Verification</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                e-KYC VERIFIED
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Aadhaar Virtual ID (VID):</span>
                <span className="font-mono font-semibold text-slate-900">{activeCitizen.aadhaarVid}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Masked UIDAI:</span>
                <span className="font-mono text-slate-700">{activeCitizen.aadhaarMasked}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>PAN Number:</span>
                <span className="font-mono text-slate-700">{activeCitizen.panMasked}</span>
              </div>
            </div>
            <div className="pt-1.5 border-t border-slate-200 text-[10px] text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Full Aadhaar digits never stored or shared as per UIDAI norms.</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Contact &amp; Notification Endpoints
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-slate-500">Mobile for Statutory SMS Notices</div>
                  <div className="font-mono font-semibold text-slate-900">{activeCitizen.maskedMobile}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-slate-500">Official Registered Email</div>
                  <div className="font-semibold text-slate-900 truncate">{activeCitizen.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-slate-500">Registered Residential Address</div>
                  <div className="text-slate-800 text-[11px] leading-tight">{activeCitizen.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank DBT Account Mapping */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              <span>PFMS DBT Bank Mapping</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                NPCI ACTIVE
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Bank Name:</span>
                <span className="font-semibold text-slate-900">{activeCitizen.bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Branch &amp; IFSC:</span>
                <span className="font-mono text-slate-800">{activeCitizen.bankBranch}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Masked Account:</span>
                <span className="font-mono font-bold text-slate-900">{activeCitizen.bankAccountMasked}</span>
              </div>
            </div>
          </div>

          {/* Linked Statutory Holdings Summary */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Linked Landholdings &amp; Projects
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Affected Projects</div>
                <div className="font-bold text-blue-900 text-base">{projects.length}</div>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Affected Parcels</div>
                <div className="font-bold text-emerald-800 text-base">{activeCitizen.linkedParcels.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Actions Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 space-y-2">
          <button
            onClick={() => showToast('Contact update OTP initiated to registered Aadhaar mobile.')}
            className="w-full bg-[#1B365D] hover:bg-[#142947] text-white font-semibold py-2 rounded text-xs transition-colors cursor-pointer"
          >
            UPDATE CONTACT / BANK DETAILS
          </button>
          <button
            onClick={() => showToast('Statutory SMS & Email notifications are enabled by default.')}
            className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-1.5 rounded text-xs transition-colors cursor-pointer"
          >
            NOTIFICATION PREFERENCES
          </button>
        </div>
      </div>
    </div>
  );
}
