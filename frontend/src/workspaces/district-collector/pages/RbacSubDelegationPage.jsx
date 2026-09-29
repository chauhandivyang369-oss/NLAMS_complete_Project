import React from 'react';
import { 
  UserPlus, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';

export default function RbacSubDelegationPage() {
  const {
    delegations,
    setIsDelegationModalOpen,
    activeDistrict,
    activeRole
  } = useDistrictCollector();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              STATUTORY POWERS DELEGATION
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Section 3(g) RFCTLARR Act • Sub-Delegation &amp; Officer Onboarding
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            RBAC Sub-Delegation &amp; Officer Onboarding Manager
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            District Collector legally delegating statutory functions to SDMs, Special Land Acquisition Officers (CALA), and Tahsildars with Digital Signature Certificates (DSC).
          </p>
        </div>

        <button
          onClick={() => setIsDelegationModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Delegation Order (Sec 3(g))</span>
        </button>
      </div>

      {/* Statutory Legal Notice Card */}
      <div className="bg-blue-50 border border-blue-200 p-4 text-xs text-blue-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-sm">Section 3(g) RFCTLARR Act Statutory Mandate:</div>
          <p className="text-blue-900 leading-relaxed">
            "Collector" means the Collector of a revenue district, and includes a Deputy Commissioner and any officer
            specially designated by the appropriate Government or Collector to perform all or any of the functions of the Collector under this Act.
            All sub-delegated officers exercise quasi-judicial powers on behalf of the District Collectorate.
          </p>
        </div>
      </div>

      {/* Delegated Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {delegations.map((del) => (
          <div key={del.id} className="bg-white border border-slate-200 shadow-xs p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 font-bold">
                  {del.orderNumber}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {del.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{del.authorizedOfficer}</h3>
                <div className="text-blue-900 font-semibold text-xs">{del.designation}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Assigned Project: <span className="text-slate-800 font-medium">{del.assignedProject}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  DELEGATED STATUTORY POWERS:
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  {del.statutoryScope?.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-mono text-emerald-700 font-bold">DSC Level 3 Verified</span>
              <span>Order Date: {del.dateOfOrder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
