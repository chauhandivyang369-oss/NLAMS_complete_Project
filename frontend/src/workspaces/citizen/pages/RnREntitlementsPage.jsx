import React, { useState, useEffect } from 'react';
import {
  Home,
  FileText,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  HelpCircle,
  Building,
  Truck,
  DollarSign,
  HeartHandshake,
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { citizenService } from '../services/citizenService.js';

export default function RnREntitlementsPage() {
  const { activeProject, setActiveDocModal, showToast } = useCitizen();
  const [rnrData, setRnrData] = useState(null);
  const [activeTab, setActiveTab] = useState('entitlements'); // 'entitlements' | 'amenities' | 'award' | 'hearing'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    citizenService.getRnREntitlements(activeProject?.id).then(data => {
      if (mounted) {
        setRnrData(data);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [activeProject]);

  if (isLoading || !rnrData) {
    return (
      <div className="bg-white border border-slate-200 p-8 text-center text-slate-500 rounded shadow-xs">
        <div className="inline-block animate-spin w-8 h-8 border-3 border-[#1B365D] border-t-transparent rounded-full mb-3"></div>
        <p className="text-xs font-semibold text-slate-600">Loading Rehabilitation &amp; Resettlement Scheme Data...</p>
      </div>
    );
  }

  const { personalEntitlementCard, scheduleIIIAmenities, formVIIAward } = rnrData;

  return (
    <div className="space-y-4">
      {/* 1. Header Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              CHAPTER V &amp; SECOND SCHEDULE
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Scheme ID: <strong className="text-slate-800 font-mono">{rnrData.schemeId}</strong>
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Rehabilitation &amp; Resettlement (R&amp;R) Scheme Entitlements
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Transparent digital entitlement card under Form-V Scheme, statutory cash &amp; housing grants, and Schedule III amenities audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveDocModal({
                title: 'Form-V Approved R&R Scheme Dossier',
                docNumber: rnrData.schemeId,
                authority: rnrData.administrator,
                date: rnrData.publicationDate,
                section: 'Form-V Gazette Publication'
              });
            }}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>View Form-V Scheme</span>
          </button>
          <button
            onClick={() => showToast('Downloading Official R&R Entitlement Card (PDF)...')}
            className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Download Entitlement Card</span>
          </button>
        </div>
      </div>

      {/* 2. Quick KPI Stat Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">BENEFICIARY HEAD</div>
          <div className="font-bold text-slate-900 text-sm mt-0.5 truncate">{personalEntitlementCard.familyHeadName}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Verified Family Record</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">SURVEYED FAMILIES</div>
          <div className="font-mono font-bold text-blue-900 text-sm mt-0.5">{rnrData.affectedFamiliesCount} Families</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{rnrData.displacedFamiliesCount} Displaced Homesteads</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">FORM-VII AWARD STATUS</div>
          <div className="font-bold text-emerald-700 text-sm mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Passed ({formVIIAward.awardNo})
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Awarded {formVIIAward.date}</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 rounded shadow-xs">
          <div className="text-[10px] text-slate-500 font-bold uppercase">R&amp;R ADMINISTRATOR</div>
          <div className="font-bold text-slate-800 text-xs mt-0.5 truncate">{rnrData.administrator}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Commissionerate R&amp;R</div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded shadow-xs">
        <div className="border-b border-slate-200 flex space-x-1 px-3 pt-2">
          {[
            { id: 'entitlements', label: 'Personal Entitlements Card', icon: HeartHandshake, count: personalEntitlementCard.entitlements.length },
            { id: 'amenities', label: 'Schedule III Resettlement Amenities', icon: Building, count: scheduleIIIAmenities.length },
            { id: 'award', label: 'Form-VII R&R Award', icon: FileText, badge: 'Approved' },
            { id: 'hearing', label: 'Public Hearing & Gram Sabha', icon: Calendar, badge: 'Completed' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#1B365D] text-[#1B365D] bg-slate-50/80'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${isActive ? 'bg-[#1B365D] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Personal Entitlements Card */}
        {activeTab === 'entitlements' && (
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Statutory Entitlements (Second Schedule Matrix)
                </h3>
                <p className="text-xs text-slate-500">
                  Benefits guaranteed by statute for displaced and affected landless/landowner families.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-300">
                Beneficiary Category: <strong className="text-slate-900">{personalEntitlementCard.familyCategory}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {personalEntitlementCard.entitlements.map(item => {
                const isDisbursed = item.status === 'DISBURSED';
                const isAnnuity = item.status === 'ANNUITY_ACTIVE';
                const isApproved = item.status === 'APPROVED';

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded border border-slate-200 hover:border-[#C5A059] bg-white transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-[#1B365D] border border-slate-200">
                          {item.legalRef}
                        </span>
                        {isDisbursed ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Disbursed via PFMS DBT
                          </span>
                        ) : isAnnuity ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-600" /> Active Monthly Annuity
                          </span>
                        ) : isApproved ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Sanctioned / Approved
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                            {item.status}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                        <strong className="text-slate-800">Statutory Provision:</strong> {item.configuredBenefit}
                      </p>

                      <div className="p-2.5 rounded bg-slate-50 border border-slate-200 mb-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Opted Choice / Sanctioned:</span>
                          <span className="font-bold text-[#1B365D]">{item.optedChoice}</span>
                        </div>
                        {item.utr && (
                          <div className="flex items-center justify-between text-[11px] mt-1 pt-1 border-t border-slate-200/80">
                            <span className="text-slate-500">PFMS UTR:</span>
                            <span className="font-mono font-bold text-emerald-700">{item.utr}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Authority: {item.authority}</span>
                      <button
                        onClick={() => showToast(`Viewing digital sanction order for ${item.title}`)}
                        className="text-[#1B365D] hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Sanction Order</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Schedule III Amenities */}
        {activeTab === 'amenities' && (
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Schedule III: Mandatory 25 Resettlement Infrastructural Amenities
                </h3>
                <p className="text-xs text-slate-500">
                  Statutory provision of 25 basic infrastructural facilities at the resettlement area before physical relocation.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Resettlement Site: Sanand R&amp;R Enclave Plot-4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {scheduleIIIAmenities.map((amenity, idx) => {
                const isAvail = amenity.status === 'AVAILABLE';
                return (
                  <div
                    key={idx}
                    className="p-3 rounded border border-slate-200 bg-white hover:border-[#C5A059] transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400">#{idx + 1}</span>
                        {isAvail ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">{amenity.name}</h4>
                      <p className="text-[11px] text-slate-600">{amenity.compliance}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Audit Status</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Geo-tagged Verified
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Form-VII Award */}
        {activeTab === 'award' && (
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  SECTION 31 &amp; RULE 18(3)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Form-VII: Rehabilitation &amp; Resettlement Award</h3>
                <p className="text-xs text-slate-500">
                  Final authoritative statutory award made by Commissioner Rehabilitation &amp; Resettlement.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveDocModal({
                    title: 'Form-VII R&R Statutory Award',
                    docNumber: formVIIAward.awardNo,
                    authority: formVIIAward.passedBy,
                    date: formVIIAward.date,
                    section: 'Official Statutory Award Dossier'
                  });
                }}
                className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>View Full Award PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Award Number</span>
                <span className="text-sm font-mono font-bold text-slate-900">{formVIIAward.awardNo}</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Date of Pronouncement</span>
                <span className="text-sm font-bold text-slate-900">{formVIIAward.date}</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Passed By</span>
                <span className="text-sm font-semibold text-slate-800">{formVIIAward.passedBy}</span>
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1.5">Award Directives &amp; Statutory Summary:</h4>
              <ul className="text-slate-600 space-y-1.5 list-disc list-inside">
                <li>All compensation and R&amp;R grants to be directly disbursed through PFMS e-payment gateway directly into verified Aadhaar-seeded accounts.</li>
                <li>All amenities specified in the Third Schedule have been audited by the Resettlement Committee.</li>
                <li>Physical possession of homestead land shall be taken only upon handing over completed residential unit or encashment of construction grant.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Public Hearing */}
        {activeTab === 'hearing' && (
          <div className="p-4 space-y-4">
            <h3 className="text-base font-bold text-slate-900">R&amp;R Public Hearing &amp; Gram Sabha Consultations</h3>
            <p className="text-xs text-slate-500">
              Consultations conducted under Section 16(5) of the Act prior to submission of draft R&amp;R scheme.
            </p>

            <div className="p-4 rounded border border-slate-200 bg-slate-50 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Hearing Notice: LAO/RNR/PH/2026/012</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  COMPLETED &amp; RECORDED
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Date &amp; Venue:</span>
                  <span className="font-bold text-slate-900">{rnrData.publicHearingDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Presiding Authority:</span>
                  <span className="font-bold text-slate-900">{rnrData.administrator}</span>
                </div>
              </div>
              <p className="text-slate-600 pt-2 border-t border-slate-200 text-xs leading-relaxed">
                Proceedings were video-recorded and Gram Sabha resolutions in Gujarati &amp; English were uploaded to the state transparency portal.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
