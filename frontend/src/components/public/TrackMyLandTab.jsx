import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Download, 
  ExternalLink, 
  Layers, 
  IndianRupee, 
  ShieldCheck, 
  User, 
  Building2,
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function TrackMyLandTab({ onSwitchToCalculator }) {
  const [searchQuery, setSearchQuery] = useState('GJ-BRD-2024-8842-991A');
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [selectedDistrict, setSelectedDistrict] = useState('Bharuch');
  const [selectedVillage, setSelectedVillage] = useState('Vadadla');
  const [selectedParcel, setSelectedParcel] = useState({
    ulpin: 'GJ-BRD-2024-8842-991A',
    surveyNo: '142/A',
    khasraSubdiv: '142/A/1',
    village: 'Vadadla',
    tehsil: 'Bharuch',
    district: 'Bharuch',
    state: 'Gujarat',
    khatedarName: 'Rameshbhai Somabhai Patel & 2 Others',
    khatedarAadhaarMasked: 'XXXX-XXXX-4819',
    landType: 'Agricultural (Irrigated Multi-Crop)',
    totalAreaHa: '0.4200 Ha (1.038 Acres / 4,200 Sq.m)',
    acquiredAreaHa: '0.4200 Ha (Full Parcel Acquired)',
    project: 'Western Dedicated Freight Corridor (WDFC) - Phase II',
    requiringBody: 'Dedicated Freight Corridor Corporation of India Ltd. (DFCCIL)',
    currentStage: 'Sec 23 Collector Award Sealed & DBT Disbursed',
    statusCategory: 'COMPLETED_DBT',
    gazetteRef: 'SEC11-GUJ-VAD-2024-089',
    sec11Date: '14 Jan 2024',
    sec19Date: '22 Aug 2024',
    awardDate: '10 Feb 2025',
    possessionDate: 'Scheduled 15 Apr 2025',
    calculatedCompensation: {
      baseMarketValue: '₹18,90,000',
      multiplier: '1.25x (Rural Distance Factor)',
      adjustedMarketValue: '₹23,62,500',
      assetsOnLand: '₹2,40,000 (Tube Well + 14 Fruit Trees)',
      subTotal: '₹26,02,500',
      solatium100: '₹26,02,500 (100% Solatium Sec 30(1))',
      additionalInterest12: '₹3,25,000 (12% p.a. Sec 30(3) - 392 Days)',
      totalAwardPackage: '₹55,30,000',
      dbtDisbursed: '₹55,30,000',
      utrNumber: 'PFMS2025021200984123',
      paymentDate: '12 Feb 2025'
    },
    rnrEntitlements: {
      passbookNo: 'RNR-GJ-BHR-2025-042',
      subsistenceGrant: '₹36,000 (₹3,000/month for 12 months - Active)',
      resettlementShiftingAllowance: '₹50,000 (One-time lump sum credited)',
      cattleShedGrant: '₹25,000 (Disbursed)',
      resettlementColonyPlot: 'Plot #B-14, Vadadla Model Resettlement Colony'
    }
  });

  const stages = [
    {
      step: 1,
      title: 'Section 4 SIA Mandate',
      legalSection: 'Section 4(1) & 5',
      date: '12 Oct 2023',
      status: 'completed',
      detail: 'Social Impact Assessment conducted by SIA Unit; public hearing held at Vadadla Gram Panchayat with 94.2% quorum.'
    },
    {
      step: 2,
      title: 'Section 7 IEG Appraisal',
      legalSection: 'Section 7(4)',
      date: '28 Nov 2023',
      status: 'completed',
      detail: 'Independent Expert Group approved project public purpose; recommended avoidance of adjacent residential hamlet.'
    },
    {
      step: 3,
      title: 'Section 11 Preliminary Notification',
      legalSection: 'Section 11(1)',
      date: '14 Jan 2024',
      status: 'completed',
      detail: 'Published in Gujarat State Extra-Ordinary Gazette No. 89 and two leading vernacular daily newspapers.'
    },
    {
      step: 4,
      title: 'Section 15 Objections Adjudicated',
      legalSection: 'Section 15(2)',
      date: '18 Mar 2024',
      status: 'completed',
      detail: '60-day objection window completed. 4 objections heard by CALA; boundary adjustments made without delaying corridor.'
    },
    {
      step: 5,
      title: 'Section 19 Declaration of Acquisition',
      legalSection: 'Section 19(1)',
      date: '22 Aug 2024',
      status: 'completed',
      detail: 'Final declaration published within statutory 12-month SLA. Land effectively earmarked for Central Rail Corridor.'
    },
    {
      step: 6,
      title: 'Section 23 Collector Award Sealed',
      legalSection: 'Section 23, 26–30',
      date: '10 Feb 2025',
      status: 'completed',
      detail: 'Award sealed at ₹55,30,000 including 100% Solatium and 12% additional compensation. Digital DSC signature verified.'
    },
    {
      step: 7,
      title: 'Section 31 DBT Payment Disbursed',
      legalSection: 'Section 31 & PFMS',
      date: '12 Feb 2025',
      status: 'completed',
      detail: '₹55,30,000 directly transferred to Khatedar Aadhaar-linked bank account via PFMS DBT. UTR: PFMS2025021200984123.'
    },
    {
      step: 8,
      title: 'Section 38 Physical Possession',
      legalSection: 'Section 38(1)',
      date: '15 Apr 2025',
      status: 'in-progress',
      detail: 'Notice issued for voluntary handover of unencumbered land. Formal panchnama scheduled with Circle Revenue Inspector.'
    }
  ];

  return (
    <div className="py-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B365D] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Statutory Land Record &amp; Acquisition Lifecycle Tracker</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1B365D] font-serif mt-1">
                Track My Land Parcel (ULPIN)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Verify the exact statutory status of your land parcel from SIA notification to final DBT compensation under RFCTLARR Act 2013.
              </p>
            </div>

            {/* Quick Demo Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Sample Records:</span>
              <button
                onClick={() => setSearchQuery('GJ-BRD-2024-8842-991A')}
                className="px-2.5 py-1 rounded bg-[#1B365D] text-amber-300 text-xs font-mono font-bold cursor-pointer hover:bg-[#142642]"
              >
                Bharuch WDFC
              </button>
              <button
                onClick={() => setSearchQuery('MH-THN-2024-3312-004B')}
                className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-mono font-bold cursor-pointer hover:bg-slate-200"
              >
                Thane Bullet Train
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter 14-digit ULPIN or Khasra No (e.g. GJ-BRD-2024-8842-991A)..."
                className="w-full bg-[#FAF8F5] border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1B365D]"
              />
            </div>
            <button
              onClick={() => {}}
              className="px-6 py-2.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs sm:text-sm rounded-lg cursor-pointer transition-colors shadow-sm shrink-0 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#C5A059]" />
              <span>Fetch Statutory Docket</span>
            </button>
          </div>
        </div>

        {/* Selected Parcel Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Land & Landowner Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Land Ownership Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Cadastral Land Dossier</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  ULPIN VERIFIED
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">Unique Land Parcel ID (ULPIN)</div>
                  <div className="font-mono font-bold text-[#1B365D] text-sm">{selectedParcel.ulpin}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-slate-400 text-[10px]">Khasra / Survey No.</div>
                    <div className="font-bold text-slate-800">{selectedParcel.surveyNo}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Sub-Division</div>
                    <div className="font-bold text-slate-800">{selectedParcel.khasraSubdiv}</div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[10px]">Recorded Khatedar (Titleholder)</div>
                  <div className="font-bold text-slate-900">{selectedParcel.khatedarName}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Aadhaar: {selectedParcel.khatedarAadhaarMasked}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-slate-400 text-[10px]">Village / Tehsil</div>
                    <div className="font-semibold text-slate-800">{selectedParcel.village}, {selectedParcel.tehsil}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">District &amp; State</div>
                    <div className="font-semibold text-slate-800">{selectedParcel.district}, {selectedParcel.state}</div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[10px]">Land Classification</div>
                  <div className="font-semibold text-emerald-800">{selectedParcel.landType}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div>
                    <div className="text-slate-400 text-[10px]">Total Plot Area</div>
                    <div className="font-bold text-slate-900">{selectedParcel.totalAreaHa}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Acquired Area</div>
                    <div className="font-bold text-amber-700">{selectedParcel.acquiredAreaHa}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-slate-400 text-[10px]">Infrastructure Project</div>
                  <div className="font-bold text-[#1B365D]">{selectedParcel.project}</div>
                  <div className="text-[10px] text-slate-500">{selectedParcel.requiringBody}</div>
                </div>
              </div>

              {/* Official Download Links */}
              <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 11 Gazette Copy (PDF)</span>
                  </span>
                  <Download className="w-3 h-3 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-between p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Collector's Award Summary (Form-11)</span>
                  </span>
                  <Download className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Statutory Compensation Card */}
            <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-3">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Compensation Award (Sec 26-30)</span>
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  DISBURSED
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Market Value (Sec 26):</span>
                  <span className="font-semibold text-slate-900">{selectedParcel.calculatedCompensation.baseMarketValue}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Rural Multiplier Factor:</span>
                  <span className="font-semibold text-slate-900">{selectedParcel.calculatedCompensation.multiplier}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Adjusted Land Value:</span>
                  <span className="font-semibold text-slate-900">{selectedParcel.calculatedCompensation.adjustedMarketValue}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Assets / Trees (Sec 29):</span>
                  <span className="font-semibold text-slate-900">{selectedParcel.calculatedCompensation.assetsOnLand}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-semibold border-t border-slate-100 pt-1">
                  <span>Sub-Total:</span>
                  <span className="text-slate-900">{selectedParcel.calculatedCompensation.subTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>100% Solatium (Sec 30(1)):</span>
                  <span>+{selectedParcel.calculatedCompensation.solatium100}</span>
                </div>
                <div className="flex justify-between text-amber-700 font-semibold">
                  <span>12% Addl. Compensation (Sec 30(3)):</span>
                  <span>+{selectedParcel.calculatedCompensation.additionalInterest12}</span>
                </div>
                
                {/* Total Grand Award */}
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 font-semibold uppercase">Total Fair Compensation Package</div>
                  <div className="text-xl font-black text-emerald-900 font-serif">
                    {selectedParcel.calculatedCompensation.totalAwardPackage}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-1">
                    PFMS DBT UTR: <span className="font-mono font-bold">{selectedParcel.calculatedCompensation.utrNumber}</span> ({selectedParcel.calculatedCompensation.paymentDate})
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 8-Stage Statutory Timeline Stepper (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1B365D] font-serif">
                  Statutory Acquisition Lifecycle Timeline
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time SLA clock tracking under RFCTLARR Act 2013 statutory limits
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-emerald-800">SLA Compliant (Zero Breach)</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:z-0">
              {stages.map((stg) => {
                const isCompleted = stg.status === 'completed';
                const isInProgress = stg.status === 'in-progress';
                return (
                  <div key={stg.step} className="relative z-10 flex items-start gap-4">
                    {/* Step Icon Badge */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-bold text-xs ${
                      isCompleted 
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
                        : isInProgress
                        ? 'bg-amber-500 border-amber-300 text-slate-950 animate-pulse shadow-sm'
                        : 'bg-slate-100 border-slate-300 text-slate-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stg.step}
                    </div>

                    {/* Step Body */}
                    <div className={`flex-1 p-4 rounded-xl border ${
                      isInProgress 
                        ? 'bg-amber-50/60 border-amber-300 shadow-xs' 
                        : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1B365D] font-serif">{stg.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                              {stg.legalSection}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 text-[11px] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {stg.date}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {stg.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Second Schedule R&R Scheme Passbook Summary */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-[#1B365D] font-serif flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Second Schedule Rehabilitation &amp; Resettlement Entitlement Passbook</span>
                </h4>
                <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedParcel.rnrEntitlements.passbookNo}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700">Subsistence Allowance (12 Months):</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedParcel.rnrEntitlements.subsistenceGrant}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700">Transportation &amp; Resettlement Grant:</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedParcel.rnrEntitlements.resettlementShiftingAllowance}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700">Cattle Shed / Petty Shop Grant:</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedParcel.rnrEntitlements.cattleShedGrant}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700">Resettlement Colony Allotment:</div>
                  <div className="font-bold text-blue-800 mt-0.5">{selectedParcel.rnrEntitlements.resettlementColonyPlot}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
