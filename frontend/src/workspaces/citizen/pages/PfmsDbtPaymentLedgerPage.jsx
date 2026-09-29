import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  Building2,
  FileText,
  TrendingUp,
  Receipt,
  Calendar,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { citizenService } from '../services/citizenService.js';

export default function PfmsDbtPaymentLedgerPage() {
  const { activeCitizen, showToast, setActiveDocModal } = useCitizen();
  const [ledger, setLedger] = useState([]);
  const [annuity, setAnnuity] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'annuity' | 'tax-exemption'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    Promise.all([
      citizenService.getPaymentLedger(),
      citizenService.getAnnuityLedger()
    ]).then(([ledgerData, annuityData]) => {
      if (mounted) {
        setLedger(ledgerData);
        setAnnuity(annuityData);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const totalDisbursed = ledger.reduce((acc, curr) => acc + (curr.netCredited || 0), 0);

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 p-8 text-center text-slate-500 rounded shadow-xs">
        <div className="inline-block animate-spin w-8 h-8 border-3 border-[#1B365D] border-t-transparent rounded-full mb-3"></div>
        <p className="text-xs font-semibold text-slate-600">Loading PFMS DBT &amp; Payment Ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 1. Top Header Banner */}
      <div className="bg-white border-l-4 border-emerald-600 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-emerald-400 font-mono px-2 py-0.5 font-bold uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> PFMS e-PAYMENT &amp; NPCI DBT
            </span>
            <span className="text-xs text-slate-500 font-medium">
              NPCI Aadhaar-Seeded Status: <strong className="text-emerald-700">ACTIVE</strong>
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            PFMS Direct Benefit Transfer (DBT) &amp; Payment Ledger
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time settlement status, central treasury UTR vouchers, Section 96 tax exemption, and 20-year annuity tracker.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-3 rounded text-right">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Disbursed to Date</span>
          <span className="text-xl font-mono font-bold text-emerald-700 block">
            {formatRupees(totalDisbursed)}
          </span>
          <span className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 justify-end mt-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Direct Account Credit
          </span>
        </div>
      </div>

      {/* 2. Bank Account Details Card */}
      <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            <Building2 className="w-5 h-5 text-[#1B365D]" />
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Primary Disbursal Account (Aadhaar Seeded)</span>
            <span className="font-bold text-slate-900 text-sm">
              {activeCitizen.bankName} — A/C {activeCitizen.bankAccountMasked}
            </span>
            <span className="text-slate-500 ml-2 font-mono text-[11px]">({activeCitizen.bankBranch})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300 font-mono text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Beneficiary Code: GJ-ANAND-BEN-00491
          </span>
          <button
            onClick={() => showToast('Refreshed PFMS DBT Ledger from Central Treasury')}
            className="p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors cursor-pointer"
            title="Refresh Transactions"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded shadow-xs">
        <div className="border-b border-slate-200 flex space-x-1 px-3 pt-2">
          {[
            { id: 'transactions', label: 'Official Transaction Ledger', icon: Receipt, count: ledger.length },
            { id: 'annuity', label: '20-Year Monthly Annuity Tracker', icon: Clock, badge: '₹2,000/mo' },
            { id: 'tax-exemption', label: 'Section 96 Tax & Duty Exemption', icon: ShieldCheck, badge: '100% Tax Free' }
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

        {/* Tab 1: Transaction Ledger */}
        {activeTab === 'transactions' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Direct Treasury Disbursal Records</h3>
                <p className="text-xs text-slate-500">All payments processed electronically via PFMS-RBI straight-through processing.</p>
              </div>
              <button
                onClick={() => showToast('Exporting Consolidated Payment Statement (PDF)...')}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#1B365D]" />
                <span>Export Statement</span>
              </button>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded">
              {ledger.map(item => (
                <div key={item.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {item.id}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{item.paymentType}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> CREDITED
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                        <div>
                          <span>Bank UTR: </span>
                          <strong className="text-slate-800 font-mono">{item.utrNumber}</strong>
                        </div>
                        <div>
                          <span>Credited On: </span>
                          <strong className="text-slate-800">{item.creditDate}</strong>
                        </div>
                        <div>
                          <span>Sanction Order: </span>
                          <strong className="text-slate-800 font-mono">{item.sanctionOrderNo}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Net Credited</span>
                        <span className="text-base font-bold text-emerald-700 font-mono">
                          {formatRupees(item.netCredited)}
                        </span>
                        <span className="text-[10px] text-slate-500 block">TDS: ₹0 (Exempt under Sec 96)</span>
                      </div>

                      <button
                        onClick={() => {
                          setActiveDocModal({
                            title: `Official PFMS e-Receipt (${item.id})`,
                            docNumber: item.utrNumber,
                            authority: 'RBI / PFMS Central Treasury Portal',
                            date: item.creditDate,
                            section: 'Official Digital Payment Voucher'
                          });
                        }}
                        className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>e-Receipt</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Monthly Annuity */}
        {activeTab === 'annuity' && annuity && (
          <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  SECOND SCHEDULE, ITEM 4
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">20-Year Monthly Annuity Pension Tracker</h3>
                <p className="text-xs text-slate-500">
                  Opted under Section 31(1) for agricultural livelihood loss. Total entitlement: 240 continuous months with CPI inflation linkage.
                </p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Monthly Entitlement</span>
                <span className="text-lg font-bold text-[#1B365D]">₹ 2,000 / month</span>
                <span className="text-[10px] text-slate-500 block">240 Total Monthly Cycles</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {annuity.disbursedMonths.map(m => {
                const isCredited = m.status === 'CREDITED';
                const isProcessing = m.status === 'PROCESSING';

                return (
                  <div
                    key={m.monthIndex}
                    className={`p-3.5 rounded border transition-all shadow-xs ${
                      isCredited
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : isProcessing
                        ? 'bg-amber-50/60 border-amber-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">Month #{m.monthIndex}</span>
                      {isCredited ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          CREDITED
                        </span>
                      ) : isProcessing ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          PROCESSING
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">
                          UPCOMING
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{m.monthName}</div>
                    <div className="text-base font-mono font-bold text-slate-900 mt-1">₹ {m.amount}</div>
                    <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200/80">
                      {m.utr ? <span>UTR: <strong className="text-slate-800 font-mono">{m.utr}</strong></span> : <span>{m.date}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Annual Indexation Rule:</span>
              <p>The annuity amount is revised every financial year based on the Consumer Price Index for Agricultural Labourers (CPI-AL) published by the Ministry of Labour &amp; Employment.</p>
            </div>
          </div>
        )}

        {/* Tab 3: Section 96 Tax Exemption */}
        {activeTab === 'tax-exemption' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="p-2.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Section 96: Statutory Exemption from Income Tax, Stamp Duty &amp; Fees</h3>
                <p className="text-xs text-slate-500">
                  Authoritative legal protection granted to all landowners under the Right to Fair Compensation Act, 2013.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
              <h4 className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-wider mb-2">
                Statutory Provision: Section 96 of RFCTLARR Act 2013
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed italic bg-white p-3 rounded border border-slate-200">
                &ldquo;No income tax or stamp duty shall be levied on any award or agreement made under this Act, except under section 46 and no person claiming under any such award or agreement shall be liable to pay any fee for a copy of the same.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">0% Income Tax (Section 96)</span>
                <p className="text-slate-600 leading-relaxed">
                  CBDT Circular No. 36/2016 clarifies that compensation received for land acquisition under RFCTLARR Act is non-taxable and exempt from TDS under Section 194LA.
                </p>
              </div>
              <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">0% Stamp Duty &amp; Registration</span>
                <p className="text-slate-600 leading-relaxed">
                  All conveyance deeds, deeds of transfer, and agreements made under the Act are 100% exempt from state stamp duty and registration fees.
                </p>
              </div>
              <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Zero Copy / Portal Charges</span>
                <p className="text-slate-600 leading-relaxed">
                  Citizens are entitled to receive free certified copies of all awards, survey maps, gazette notifications, and valuation charts.
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => showToast('Downloaded Official Section 96 Exemption Certificate (PDF)')}
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>Download Section 96 Tax Exemption Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
