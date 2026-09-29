import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Calendar,
  Building,
  ShieldCheck,
  CreditCard,
  Camera,
  Layers
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { MOCK_SURVEY_VALUATION } from '../services/citizenMockData.js';

export default function SurveyValuationTrackerPage() {
  const { activeParcel, activeCitizen, setActiveDocModal, showToast } = useCitizen();

  const selectedParcel = activeParcel || activeCitizen.linkedParcels[0];
  const surveyData = MOCK_SURVEY_VALUATION;

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C5A059]" />
            <span>Survey, Valuation &amp; Field Activity Tracker</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Advance notice for preliminary survey under Section 12 &amp; itemized damage assessment under Section 13.
          </p>
        </div>

        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Spot Damage Tender Disbursed</span>
        </span>
      </div>

      {/* 2. Section 12 Field Entry Notice Card */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#1B365D] text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                SECTION 12 STATUTORY NOTICE
              </span>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                Notice #{surveyData.fieldEntryNotice.noticeNo}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Advance Field Entry &amp; Preliminary Survey Demarcation
            </h3>
          </div>

          <button
            onClick={() => setActiveDocModal({
              title: `Section 12 Field Entry & Survey Notice #${surveyData.fieldEntryNotice.noticeNo}`,
              authority: 'Office of SLAO & CALA, Petlad',
              date: surveyData.fieldEntryNotice.issuedDate,
              section: 'Section 12(1) Field Entry',
              qrVerified: true
            })}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span>View Section 12 Notice Doc</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Designated Field Surveyor</span>
            <div className="font-bold text-slate-900 mt-0.5">{surveyData.fieldEntryNotice.surveyorName}</div>
            <div className="text-[10px] text-slate-500 font-mono">Official Emp ID: {surveyData.fieldEntryNotice.officialId}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Survey Date &amp; Timing</span>
            <div className="font-bold text-slate-900 mt-0.5">{surveyData.fieldEntryNotice.surveyDate}</div>
            <div className="text-[10px] text-emerald-700 font-semibold">Survey Inspection Completed</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Target Holding Demarcation</span>
            <div className="font-bold text-blue-900 font-mono mt-0.5">Survey {selectedParcel.surveyNo} • {selectedParcel.village}</div>
            <div className="text-[10px] text-slate-500 font-mono">ULPIN: {selectedParcel.ulpin}</div>
          </div>
        </div>

        {/* Authorized Activities */}
        <div>
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Authorized Statutory Field Activities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {surveyData.fieldEntryNotice.authorizedActivities.map((act, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="text-slate-800">{act}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Section 13 Damage Valuation Register Table */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Section 13 Spot Damage Compensation Register (Tender of Payment)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Assessed by Agricultural Officer and Horticultural Valuer for standing crops, trees, and fencing disrupted during survey.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Assessed Spot Damage</span>
            <span className="font-mono font-bold text-base text-emerald-800">
              ₹ {surveyData.section13DamageValuation.totalDamageAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="w-full text-xs text-left text-slate-800">
            <thead className="bg-[#1B365D] text-white text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-2.5">Damage Category</th>
                <th className="p-2.5">Detailed Description</th>
                <th className="p-2.5">Quantity / Extent</th>
                <th className="p-2.5">Approved Rate</th>
                <th className="p-2.5 text-right">Assessed Amount (INR)</th>
                <th className="p-2.5 text-center">Tender Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {surveyData.section13DamageValuation.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-2.5 font-bold text-slate-900">{item.type}</td>
                  <td className="p-2.5 text-slate-600">{item.description}</td>
                  <td className="p-2.5 font-mono">{item.quantity}</td>
                  <td className="p-2.5 font-mono">{item.unitRate}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                    ₹ {item.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      TENDERED (PAID)
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td colSpan={4} className="p-2.5 text-right text-slate-800 uppercase tracking-wider text-[11px]">
                  Total Damage Tendered under Section 13:
                </td>
                <td className="p-2.5 text-right font-mono text-emerald-900 text-sm">
                  ₹ {surveyData.section13DamageValuation.totalDamageAmount.toLocaleString('en-IN')}
                </td>
                <td className="p-2.5 text-center text-[10px] text-emerald-700">
                  Direct Bank Remittance
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Remittance Summary */}
        <div className="p-3 bg-emerald-50/80 border border-emerald-300 rounded text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Compensation Remitted via Direct Bank Transfer</span>
            </div>
            <div className="text-[11px] text-slate-700">
              Payment UTR: <span className="font-mono font-bold">{surveyData.section13DamageValuation.tenderUTR}</span> • Credited on {surveyData.section13DamageValuation.tenderDate} to Bank of Baroda *******7829.
            </div>
          </div>

          <button
            onClick={() => showToast('Downloading Section 13 Damage Assessment & Payment Tender Receipt...')}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Section 13 Tender Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
