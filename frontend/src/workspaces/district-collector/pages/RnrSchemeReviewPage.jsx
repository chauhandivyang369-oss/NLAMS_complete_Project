import React, { useState } from 'react';
import { 
  Users, 
  Home, 
  Coins, 
  CheckCircle2, 
  FileText, 
  Send, 
  ShieldCheck,
  Building,
  HeartHandshake
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';

export default function RnrSchemeReviewPage() {
  const {
    rnrSchemes,
    handleForwardRnrScheme,
    activeProject,
    activeDistrict
  } = useDistrictCollector();

  const [selectedSchemeId, setSelectedSchemeId] = useState(rnrSchemes[0]?.id || null);
  const [recommendation, setRecommendation] = useState('RECOMMENDED_FOR_COMMISSIONER_APPROVAL');

  const selectedScheme = rnrSchemes.find(s => s.id === selectedSchemeId) || rnrSchemes[0];

  const handleForward = async () => {
    if (!selectedScheme) return;
    await handleForwardRnrScheme(selectedScheme.id, recommendation);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              DISTRICT R&amp;R BENCH (DLRRC)
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sections 16 &amp; 17 RFCTLARR Act • Draft Scheme Review &amp; Second Schedule Entitlements
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            R&amp;R Draft Scheme Review &amp; District Committee Coordination Desk
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Review draft rehabilitation schemes prepared by Administrator R&R, verify Gram Sabha resolutions, scrutinize Second Schedule packages, and forward with Collector's approval to Commissioner R&R.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono bg-emerald-50 text-emerald-900 border border-emerald-300 px-3 py-1 font-bold">
            DLRRC Chaired by Collector
          </span>
        </div>
      </div>

      {selectedScheme && (
        <div className="space-y-6">
          {/* Scheme Overview Card */}
          <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">DRAFT SCHEME REF</span>
                <h2 className="font-bold text-slate-900 text-sm">{selectedScheme.id} - {selectedScheme.projectName}</h2>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 font-bold">
                {selectedScheme.status}
              </span>
            </div>

            {/* Affected Families Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">AFFECTED FAMILIES</div>
                <div className="font-bold text-slate-900 font-mono text-base">{selectedScheme.totalAffectedFamilies}</div>
                <div className="text-[10px] text-slate-500">Total Census</div>
              </div>

              <div className="bg-slate-50 p-2.5 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">DISPLACED FAMILIES</div>
                <div className="font-bold text-rose-800 font-mono text-base">{selectedScheme.displacedFamilies}</div>
                <div className="text-[10px] text-slate-500">Need Housing Units</div>
              </div>

              <div className="bg-slate-50 p-2.5 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">SC / ST FAMILIES</div>
                <div className="font-bold text-purple-800 font-mono text-base">
                  {selectedScheme.scheduledCasteFamilies + selectedScheme.scheduledTribeFamilies}
                </div>
                <div className="text-[10px] text-slate-500">Sec 41/42 Special Care</div>
              </div>

              <div className="bg-slate-50 p-2.5 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">LANDLESS LABORERS</div>
                <div className="font-bold text-blue-800 font-mono text-base">{selectedScheme.landlessLaborers}</div>
                <div className="text-[10px] text-slate-500">Livelihood Assistance</div>
              </div>

              <div className="bg-slate-50 p-2.5 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">ADMINISTRATOR R&amp;R</div>
                <div className="font-bold text-slate-900 text-xs truncate">{selectedScheme.administratorName}</div>
                <div className="text-[10px] text-slate-500 font-mono">Sec 43 Officer</div>
              </div>
            </div>
          </div>

          {/* Second Schedule Entitlements Scrutiny */}
          <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#C5A059]" />
                <span>Second Schedule Mandatory Statutory Entitlements Verification</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Section 16(2) Check</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">1. Resettlement Housing Units (Item 1):</div>
                <div className="text-slate-600 font-mono">
                  {selectedScheme.secondScheduleEntitlements?.resettlementHousingUnits} Constructed Units in Resettlement Colony or Cash Grant in lieu.
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">2. Land for Land Allotment (Item 2):</div>
                <div className="text-slate-600 font-mono">
                  {selectedScheme.secondScheduleEntitlements?.landForLandHectares} Hectares identified in Govt Land Bank.
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">3. Subsistence Allowance (Item 5):</div>
                <div className="text-slate-600 font-mono">
                  {selectedScheme.secondScheduleEntitlements?.subsistenceAllowanceAmount}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">4. Transportation &amp; Cattle Shed Grant:</div>
                <div className="text-slate-600 font-mono">
                  {selectedScheme.secondScheduleEntitlements?.oneTimeTransportationGrant} + {selectedScheme.secondScheduleEntitlements?.cattleShedGrant}
                </div>
              </div>
            </div>
          </div>

          {/* Gram Sabha Consultations & Forwarding */}
          <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Gram Sabha Consultations (Sec 16(5)) &amp; Forwarding to Commissioner R&amp;R (Sec 17)
            </div>

            <div className="space-y-2 text-xs">
              {selectedScheme.gramSabhaConsultations?.map((cs, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">Gram Sabha {cs.village} Village</span>
                    <span className="text-slate-400 font-mono ml-2">Date: {cs.date}</span>
                    <div className="text-[11px] text-slate-600 mt-0.5">{cs.resolution}</div>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> QUORUM ATTAINED
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-600">
                DLRRC Meeting Date: <span className="font-bold text-slate-800 font-mono">{selectedScheme.dlrrcReviewDate}</span>
              </div>

              <button
                onClick={handleForward}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Forward Approved Scheme to Commissioner R&amp;R (Sec 17)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
