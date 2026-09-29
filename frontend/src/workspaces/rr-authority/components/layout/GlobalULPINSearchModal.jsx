import React from 'react';
import { useRRAuthority } from '../../context/RRAuthorityContext.jsx';
import { 
  X, 
  Search, 
  MapPin, 
  Building2, 
  Users, 
  Home, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  ExternalLink,
  QrCode
} from 'lucide-react';

export default function GlobalULPINSearchModal({ onSwitchWorkspace }) {
  const { 
    isUlpinSearchModalOpen, 
    setIsUlpinSearchModalOpen, 
    searchedUlpinResult,
    searchUlpinQuery 
  } = useRRAuthority();

  if (!isUlpinSearchModalOpen || !searchedUlpinResult) return null;

  const { family, project, plot, dbtRecords } = searchedUlpinResult;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800 text-xs">
        
        {/* Modal Top Header */}
        <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white font-sans">
                  NLAMS Global ULPIN Cross-Workspace Record
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono text-[10px] font-bold">
                  Bhu-Aadhaar Verified
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#E6CA85]">
                14-Digit ULPIN: {family.ulpin} • Survey Parcel: {family.surveyNumber}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUlpinSearchModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Section 1: Cadastral & Project Hierarchy */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Project Identity</span>
              <div className="font-bold text-slate-900 text-xs mt-0.5">{project.name}</div>
              <div className="font-mono text-[10px] text-[#1B365D]">{project.code}</div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Revenue Jurisdiction</span>
              <div className="font-bold text-slate-900 text-xs mt-0.5">Village {family.village}, Taluka {family.taluka}</div>
              <div className="text-[11px] text-slate-600">District {family.district}, {project.state}</div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">GIS Coordinates</span>
              <div className="font-mono text-slate-900 text-xs mt-0.5 font-bold">{family.gpsCoordinates}</div>
              <div className="text-[10px] text-emerald-700 font-semibold">Cadastral Boundary Geo-Referenced</div>
            </div>
          </div>

          {/* Section 2: Affected Family Profile & Titleholder Baseline */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1B365D]" />
                <span className="font-bold text-slate-900 text-xs">Family Baseline &amp; Socio-Economic Census</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">Family ID: {family.familyId}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span className="text-slate-500 block">Head of Household:</span>
                <strong className="text-slate-900">{family.headName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Category / Caste:</span>
                <strong className="text-slate-900">{family.familyCategory} ({family.casteCategory})</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Displacement Status:</span>
                <span className="font-bold text-rose-700">{family.displacementStatus}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Land Acquired:</span>
                <strong className="font-mono text-slate-900">{family.agriculturalLandAcquiredHa} Ha</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Homestead Lost:</span>
                <strong className={family.homesteadLost ? 'text-rose-600' : 'text-slate-900'}>
                  {family.homesteadLost ? `Yes (${family.residentialStructurePlinthSqM} sq.m plinth)` : 'No (Homestead Intact)'}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Total Family Members:</span>
                <strong className="text-slate-900">{family.totalMembers} Persons</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Aadhaar (Masked):</span>
                <span className="font-mono text-slate-700">{family.aadhaarMasked}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Voter ID:</span>
                <span className="font-mono text-slate-700">{family.voterId}</span>
              </div>
            </div>
          </div>

          {/* Section 3: R&R Second Schedule Entitlements */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-blue-50/30">
            <div className="flex items-center justify-between border-b border-blue-200 pb-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-[#1B365D]" />
                <span className="font-bold text-slate-900 text-xs">Second Schedule Statutory Entitlements &amp; Resettlement</span>
              </div>
              <span className="font-mono text-[10px] text-blue-900 font-bold">Sec 16(2) Formula</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium text-[10px] uppercase font-mono">Housing Allotment</span>
                <div className="font-bold text-slate-900">{family.entitlementPackage.houseAllotment}</div>
                <div className="text-[10px] text-slate-600">
                  Status: <strong>{family.allotment.allotmentStatus}</strong>
                  {plot && ` (${plot.plotId} in ${plot.sector})`}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium text-[10px] uppercase font-mono">Employment / Annuity Grant</span>
                <div className="font-bold text-slate-900">{family.entitlementPackage.annuityOption}</div>
                <div className="text-[10px] text-slate-600">
                  Direct monthly recurring PFMS credit for 20 years.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
              <span className="bg-white px-2 py-1 rounded border border-slate-200">
                Resettlement Allowance: <strong>₹{family.entitlementPackage.resettlementAllowance.toLocaleString()}</strong>
              </span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">
                Transport Grant: <strong>₹{family.entitlementPackage.transportGrant.toLocaleString()}</strong>
              </span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">
                Cattle Shed / Petty Shop: <strong>₹{family.entitlementPackage.cattleShedGrant.toLocaleString()}</strong>
              </span>
            </div>
          </div>

          {/* Section 4: PFMS Direct Bank Transfer (DBT) Status */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-slate-900 text-xs">PFMS / Aadhaar Payment Bridge (APB) Ledger</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-700 font-bold">
                Bank: {family?.bankDetails?.bankName || 'Direct Account'} ({family?.bankDetails?.accountMasked || 'N/A'})
              </span>
            </div>

            {dbtRecords && dbtRecords.length > 0 ? (
              <div className="divide-y divide-slate-100 font-mono text-[11px]">
                {(dbtRecords || []).map((dbt, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 font-sans">{dbt.grantCategory}</div>
                      <div className="text-[10px] text-slate-500">
                        Txn: {dbt.transactionId} • UTR: {dbt.utrNumber}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-700">₹{dbt.amountInr.toLocaleString()}</div>
                      <span className="px-1.5 py-0.2 rounded font-bold text-[9px] bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {dbt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-slate-500 font-mono text-[11px] bg-slate-50 rounded-lg">
                No active DBT transactions recorded for this family yet.
              </div>
            )}
          </div>

          {/* Section 5: Cross-Workspace Verification & Actions */}
          <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Record Verified by: {family.verificationOfficer} on {family.verificationDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsUlpinSearchModalOpen(false);
                  if (onSwitchWorkspace) onSwitchWorkspace('sia-ieg');
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-200 rounded text-[11px] font-bold text-[#1B365D] border border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View in SIA Workspace</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsUlpinSearchModalOpen(false)}
            className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg cursor-pointer"
          >
            Close Record
          </button>
        </div>

      </div>
    </div>
  );
}
