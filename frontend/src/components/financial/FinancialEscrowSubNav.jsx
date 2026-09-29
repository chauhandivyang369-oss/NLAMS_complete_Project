import React from 'react';
import { 
  LayoutGrid, 
  Landmark, 
  ArrowLeftRight, 
  Banknote, 
  ClipboardCheck 
} from 'lucide-react';

export const ESCROW_TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'escrow-deposits', label: 'Escrow Account & Deposits', icon: Landmark },
  { id: 'transactions-ledger', label: 'Transactions Ledger', icon: ArrowLeftRight },
  { id: 'compensation-disbursement', label: 'Compensation & Disbursement', icon: Banknote },
  { id: 'reconciliation-audit', label: 'Reconciliation & Audit', icon: ClipboardCheck },
];

export default function FinancialEscrowSubNav({ activeTab, setActiveTab, rightExtra }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-white px-4 py-2 rounded-t-lg shadow-2xs">
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        {ESCROW_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0a2540] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {isActive && tab.id !== 'overview' && (
                <span className="text-[10px] opacity-80 font-normal">(Active)</span>
              )}
            </button>
          );
        })}
      </div>

      {rightExtra && (
        <div className="flex items-center gap-2 text-xs">
          {rightExtra}
        </div>
      )}
    </div>
  );
}
