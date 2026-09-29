import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';
import { MOCK_NOTIFICATIONS } from '../../services/citizenMockData.js';

export default function NotificationDrawer() {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    navigateToAction,
    setActiveDocModal,
    showToast
  } = useCitizen();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      <div className="relative w-full sm:w-96 max-w-[90vw] bg-white h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200 flex flex-col text-xs text-slate-800">
        {/* Drawer Header */}
        <div className="p-3.5 bg-[#1B365D] text-white border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C5A059]" />
            <div>
              <div className="font-bold text-sm text-white">Statutory Notification Center</div>
              <div className="text-[10px] text-[#E6CA85]">Gazette Publications, SMS &amp; Portal Alerts</div>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <span>{MOCK_NOTIFICATIONS.length} Total Alerts</span>
          <button
            onClick={() => showToast('All notifications marked as read.')}
            className="text-blue-700 hover:text-blue-900 font-semibold cursor-pointer"
          >
            Mark all read
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded border transition-all ${
                notif.isUnread
                  ? 'bg-blue-50/70 border-blue-300 shadow-2xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-1.5 py-0.2 rounded font-mono">
                  {notif.section}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {notif.publishedDate}
                </span>
              </div>

              <div className="font-bold text-slate-900 text-xs mt-1 leading-snug">
                {notif.title}
              </div>

              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {notif.summary}
              </p>

              <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 truncate max-w-[170px]" title={notif.issuingAuthority}>
                  {notif.issuingAuthority}
                </span>

                <button
                  onClick={() => {
                    setIsNotificationDrawerOpen(false);
                    setActiveDocModal({
                      title: notif.title,
                      authority: notif.issuingAuthority,
                      date: notif.publishedDate,
                      section: notif.section,
                      qrVerified: notif.qrVerified
                    });
                  }}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Notice</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500">
          Official statutory service compliant with Section 11, 15 &amp; 19 notifications.
        </div>
      </div>
    </div>
  );
}
