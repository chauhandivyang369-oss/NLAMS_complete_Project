import React from 'react';
import { Landmark, IndianRupee, ShieldCheck, FileCheck2, AlertCircle } from 'lucide-react';

export default function Step8FinancialCommitmentsEscrow({ formData, updateFormData, errors }) {
  const compBudget = Number(formData.estCompensationBudgetCr) || 0;
  const adminCharge = Number((compBudget * 0.05).toFixed(2));
  const totalCommitment = Number((compBudget + adminCharge).toFixed(2));

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-blue-700" />
          Step 8: Financial Commitments & CALA Statutory Escrow
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Record proposal-stage financial allocation, identify statutory escrow treasury routing, and furnish the mandatory 5% Administrative Cost legal undertaking.
        </p>
      </div>

      {/* Financial Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Estimated Land Compensation
          </span>
          <div className="text-xl font-bold text-slate-900 flex items-center">
            ₹{compBudget.toFixed(2)} Cr
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Sec 26-30 Base + 100% Solatium</span>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            5% Administrative Charge
          </span>
          <div className="text-xl font-bold text-amber-900 flex items-center">
            ₹{adminCharge.toFixed(2)} Cr
          </div>
          <span className="text-[10px] text-amber-700 block mt-0.5">District Establishment & SIA Cost</span>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
            Total Requisition Commitment
          </span>
          <div className="text-xl font-bold text-blue-900 flex items-center">
            ₹{totalCommitment.toFixed(2)} Cr
          </div>
          <span className="text-[10px] text-blue-700 block mt-0.5">Statutory Escrow Obligation</span>
        </div>
      </div>

      {/* Financial Details Form */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Budget Allocation & Source
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Total Compensation Budget (₹ Crores) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.estCompensationBudgetCr}
              onChange={(e) => updateFormData({ estCompensationBudgetCr: Number(e.target.value) })}
              className="w-full text-xs font-bold border border-slate-300 rounded-md p-2"
            />
            {errors?.estCompensationBudgetCr && <p className="text-xs text-red-600 mt-1">{errors.estCompensationBudgetCr}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Statutory Funding Source <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.fundingSource}
              onChange={(e) => updateFormData({ fundingSource: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
            >
              <option value="Central Budgetary Allocation (NHAI Capital Works Programme)">
                Central Budgetary Allocation (National Highways / Rail Works)
              </option>
              <option value="State Budgetary Head (Demand for Grants)">
                State Budgetary Head (Demand for Grants - PWD/Revenue)
              </option>
              <option value="External Multilateral Loan (World Bank / ADB)">
                External Multilateral Loan (World Bank / ADB / JICA)
              </option>
              <option value="PPP Concessionaire Dedicated Escrow Fund">
                PPP Concessionaire Dedicated Escrow Fund
              </option>
            </select>
            {errors?.fundingSource && <p className="text-xs text-red-600 mt-1">{errors.fundingSource}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Financial Sanction Letter / Budget Allocation Ref
            </label>
            <input
              type="text"
              value={formData.fundAllocationRef}
              onChange={(e) => updateFormData({ fundAllocationRef: e.target.value })}
              placeholder="e.g. MORTH-CAP-BUDGET-2025/ITEM-44"
              className="w-full text-xs font-mono border border-slate-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Escrow Treasury Details */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Landmark className="w-4 h-4 text-slate-700" />
          Competent Authority (CALA) Statutory Escrow Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Escrow Bank / Treasury</label>
            <input
              type="text"
              value={formData.escrowBankName}
              onChange={(e) => updateFormData({ escrowBankName: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Escrow Account Number</label>
            <input
              type="text"
              value={formData.escrowAccountNo}
              onChange={(e) => updateFormData({ escrowAccountNo: e.target.value })}
              className="w-full text-xs font-mono border border-slate-300 rounded-md p-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">IFSC Code</label>
            <input
              type="text"
              value={formData.escrowIfsc}
              onChange={(e) => updateFormData({ escrowIfsc: e.target.value })}
              className="w-full text-xs font-mono border border-slate-300 rounded-md p-2 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Statutory Legal Undertaking */}
      <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.hasAdminCostUndertaking}
            onChange={(e) => updateFormData({ hasAdminCostUndertaking: e.target.checked })}
            className="mt-1 w-4 h-4 text-blue-600 rounded"
          />
          <div className="text-xs leading-relaxed text-slate-800">
            <span className="font-bold text-slate-950 block mb-1">
              Mandatory Statutory Undertaking for Land Acquisition & 5% Establishment Cost <span className="text-red-500">*</span>
            </span>
            I hereby formally undertake on behalf of <strong>{formData.requisitioningBodyName}</strong> that the entire expenditure incurred on land acquisition, including market value determined under Section 26, multiplication factor under Section 27, 100% solatium under Section 30, interest under Section 30(3), R&R entitlement package under Second & Third Schedules, and the <strong>mandatory 5% State Administrative & SIA Cost</strong> (₹{adminCharge.toFixed(2)} Cr), will be deposited into the designated CALA Escrow Account as per statutory timelines.
          </div>
        </label>
        {errors?.hasAdminCostUndertaking && (
          <p className="text-xs text-red-600 font-semibold">{errors.hasAdminCostUndertaking}</p>
        )}
      </div>
    </div>
  );
}
