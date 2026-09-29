import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import ContextAuditTrail from '../../components/gis/ContextAuditTrail.jsx';
import EscrowOverviewView from '../../components/financial/EscrowOverviewView.jsx';
import EscrowAccountDepositsView from '../../components/financial/EscrowAccountDepositsView.jsx';
import TransactionsLedgerView from '../../components/financial/TransactionsLedgerView.jsx';
import CompensationDisbursementView from '../../components/financial/CompensationDisbursementView.jsx';
import ReconciliationAuditView from '../../components/financial/ReconciliationAuditView.jsx';
import { 
  ChevronRight, 
  Landmark, 
  Layers, 
  ArrowLeftRight, 
  Banknote, 
  ClipboardCheck, 
  LayoutGrid
} from 'lucide-react';

export default function FinancialEscrowLedger() {
  const { showToast } = useWorkspace();
  
  // 5 Sub-tab Views corresponding directly to the 5 official financial screenshots:
  // 1: 'overview' (Image 1: Financial Escrow Ledger — Overview)
  // 2: 'escrow-deposits' (Image 2: Escrow Account & Deposit Particulars)
  // 3: 'transactions-ledger' (Image 3: Financial Transactions / Payment Ledger)
  // 4: 'compensation-disbursement' (Image 4: Compensation & Disbursement Monitoring)
  // 5: 'reconciliation-audit' (Image 5: Financial Reconciliation & Statutory Verification)
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const tabLabels = {
      'overview': 'Financial Escrow Ledger Overview',
      'escrow-deposits': 'Escrow Account & Deposit Particulars',
      'transactions-ledger': 'Financial Transactions Ledger',
      'compensation-disbursement': 'Compensation & Disbursement Monitoring',
      'reconciliation-audit': 'Financial Reconciliation & Statutory Verification'
    };
    showToast(`Switched to: ${tabLabels[tabId] || tabId}`);
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 space-y-4 max-w-[1720px] mx-auto">
      
      {/* Top Breadcrumb Row with Multi-View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200/80 pb-2">
        {/* Official Gov Breadcrumb */}
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <span>NLAMS</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Requisitioning Body</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button 
            onClick={() => setActiveTab('overview')}
            className={`hover:text-slate-900 transition-colors ${activeTab === 'overview' ? 'text-slate-900 font-semibold' : ''}`}
          >
            Financial Escrow Ledger
          </button>
          {activeTab === 'escrow-deposits' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold uppercase">ESCROW DEPOSITS</span>
            </>
          )}
          {activeTab === 'transactions-ledger' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold uppercase">TRANSACTIONS LEDGER</span>
            </>
          )}
          {activeTab === 'compensation-disbursement' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold uppercase">COMPENSATION &amp; DBT</span>
            </>
          )}
          {activeTab === 'reconciliation-audit' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold uppercase">RECONCILIATION &amp; AUDIT</span>
            </>
          )}
        </div>

        {/* Quick Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg shadow-2xs">
          <button
            onClick={() => handleTabChange('overview')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            1. Overview
          </button>

          <button
            onClick={() => handleTabChange('escrow-deposits')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'escrow-deposits'
                ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            2. Escrow Deposits
          </button>

          <button
            onClick={() => handleTabChange('transactions-ledger')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'transactions-ledger'
                ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            3. Transactions Ledger
          </button>

          <button
            onClick={() => handleTabChange('compensation-disbursement')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'compensation-disbursement'
                ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            4. Compensation &amp; DBT
          </button>

          <button
            onClick={() => handleTabChange('reconciliation-audit')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'reconciliation-audit'
                ? 'bg-[#0a2540] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            5. Reconciliation &amp; Audit
          </button>
        </div>
      </div>

      {/* Main Content Area: Left Primary Financial Workspace, Right Context & Audit Trail */}
      <div className="flex flex-col xl:flex-row gap-4 items-start">
        {/* Main Financial Viewport (Center workspace taking primary width) */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === 'overview' && (
            <EscrowOverviewView 
              onNavigateTab={handleTabChange}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'escrow-deposits' && (
            <EscrowAccountDepositsView 
              onNavigateTab={handleTabChange}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'transactions-ledger' && (
            <TransactionsLedgerView 
              onNavigateTab={handleTabChange}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'compensation-disbursement' && (
            <CompensationDisbursementView 
              onNavigateTab={handleTabChange}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'reconciliation-audit' && (
            <ReconciliationAuditView 
              onNavigateTab={handleTabChange}
              onShowToast={showToast}
            />
          )}
        </div>

        {/* Right 3rd Column: Context & Audit Trail */}
        <ContextAuditTrail />
      </div>

    </div>
  );
}
