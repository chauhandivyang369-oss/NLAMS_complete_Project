import React from 'react';
import { Bell, X, AlertTriangle, Clock, CheckCircle2, FileText, ArrowRight, ShieldAlert } from 'lucide-react';

export default function NotificationCenterDrawer({ isOpen, onClose, onNavigateMenu }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'NOTIF-01',
      category: 'STATUTORY_DEADLINE',
      title: 'Section 19 Statutory Lapsing Alert: 66 Days Remaining',
      project: 'REQ-2025-NHAI-041 (Delhi-Amritsar-Katra)',
      description: 'Section 11 was published on 14-Aug-2025. Total 45 days excluded under High Court stay. Final declaration must be signed by 20-Nov-2026.',
      priority: 'HIGH',
      timestamp: 'Today, 09:30 AM',
      targetMenu: 'sec19-declaration'
    },
    {
      id: 'NOTIF-02',
      category: 'DEPOSIT',
      title: 'Requiring Body Escrow Deposit Pending: EDFC Hub',
      project: 'REQ-2025-DFCC-019 (EDFC Multi-Modal Hub)',
      description: 'Section 19 Declaration blocked. Requiring Body has deposited ₹120.00 Cr against mandatory prerequisite ₹240.00 Cr.',
      priority: 'CRITICAL',
      timestamp: 'Yesterday, 16:45 PM',
      targetMenu: 'sec19-declaration'
    },
    {
      id: 'NOTIF-03',
      category: 'SECTION_11_PUBLICATION',
      title: 'Section 11 Publication Evidence Verified',
      project: 'STATE-2025-MSRDC-012 (Samruddhi Spur)',
      description: 'Munadi public announcement panchnama and Gram Sabha resolution verified for all 18 villages.',
      priority: 'NORMAL',
      timestamp: '22-Sep-2026',
      targetMenu: 'sec11-notification'
    },
    {
      id: 'NOTIF-04',
      category: 'COLLECTOR_PROPOSAL',
      title: 'New Collector Proposal Received: Jhansi Defence Node',
      project: 'STATE-2025-UPPWD-034',
      description: 'District Magistrate Jhansi submitted Form-I and Rule 4 preliminary enquiry report for 72.10 Ha.',
      priority: 'MEDIUM',
      timestamp: '20-Sep-2026',
      targetMenu: 'collector-proposal-inbox'
    },
    {
      id: 'NOTIF-05',
      category: 'GAZETTE',
      title: 'Central e-Gazette S.O. 2489(E) Dispatched',
      project: 'REQ-2025-NHAI-041',
      description: 'Official notification broadcasted to Collector Patiala, SIA Unit, and Public Portal.',
      priority: 'NORMAL',
      timestamp: '15-Aug-2025',
      targetMenu: 'gazette-vault'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-300 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-bold text-sm tracking-wide">STATUTORY NOTIFICATION CENTER</h3>
              <p className="text-[11px] text-slate-300">Statutory alerts, deadlines &amp; publication events</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {notifications.map(item => {
            const isCritical = item.priority === 'CRITICAL';
            const isHigh = item.priority === 'HIGH';

            return (
              <div key={item.id} className="pt-3 first:pt-0 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : isHigh
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{item.timestamp}</span>
                </div>

                <div className="font-bold text-slate-900">{item.title}</div>
                <div className="text-[11px] font-mono text-[#1B365D] font-semibold">{item.project}</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">{item.description}</div>

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => {
                      if (onNavigateMenu) onNavigateMenu(item.targetMenu);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B365D] hover:underline cursor-pointer"
                  >
                    <span>View Statutory Gate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-300 text-center text-xs text-slate-500">
          Integrated with Statutory Clock Engine &amp; Gateway Dispatchers
        </div>
      </div>
    </div>
  );
}
