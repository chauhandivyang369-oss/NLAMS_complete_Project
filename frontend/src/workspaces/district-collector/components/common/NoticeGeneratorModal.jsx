import React from 'react';
import { X, Printer, Send, ShieldCheck, FileCheck } from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function NoticeGeneratorModal() {
  const {
    isNoticeModalOpen,
    setIsNoticeModalOpen,
    noticeModalData,
    activeDistrict,
    activeRole
  } = useDistrictCollector();

  if (!isNoticeModalOpen || !noticeModalData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white w-full max-w-2xl shadow-2xl border border-slate-300 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#142642] text-white p-3 border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#C5A059]" />
            <h3 className="font-serif font-bold text-sm tracking-wide">
              {noticeModalData.title || 'STATUTORY NOTICE UNDER RFCTLARR ACT, 2013'}
            </h3>
          </div>
          <button
            onClick={() => setIsNoticeModalOpen(false)}
            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Notice */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-800 font-serif text-xs bg-[#FCFCF9] border m-3 border-slate-300 shadow-inner">
          <div className="text-center space-y-1 pb-3 border-b border-slate-400">
            <div className="text-lg">🏛️</div>
            <div className="font-bold text-xs uppercase">
              OFFICE OF THE DISTRICT COLLECTOR &amp; DISTRICT MAGISTRATE
            </div>
            <div className="text-[11px] text-slate-700">
              DISTRICT {activeDistrict?.name?.toUpperCase()} • {activeDistrict?.state?.toUpperCase()}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Notice Ref: {noticeModalData.refNo || `REV/LAQ/NOTICE/${Date.now().toString().slice(-6)}`}
            </div>
          </div>

          <div className="font-sans text-[11px] space-y-3 leading-relaxed">
            <div className="flex justify-between text-[11px] border-b border-slate-200 pb-2">
              <div>
                <span className="font-bold">To:</span> {noticeModalData.recipient || 'All Interested Persons / Khatedars'}
              </div>
              <div>
                <span className="font-bold">Date:</span> {new Date().toISOString().substring(0, 10)}
              </div>
            </div>

            <div className="font-bold text-xs text-slate-900 underline">
              SUBJECT: {noticeModalData.subject}
            </div>

            <div className="text-slate-700 space-y-2">
              <p>{noticeModalData.bodyText}</p>
              {noticeModalData.statutoryClause && (
                <div className="p-2 bg-slate-100 border-l-2 border-[#C5A059] text-[10px] font-mono">
                  {noticeModalData.statutoryClause}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-between items-end border-t border-slate-300">
              <div className="text-[10px] text-slate-500">
                <div>Channel: Registered Post AD + Chavadi + Portal</div>
                <div>Status: Generated &amp; Counter-signed</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xs">{activeRole?.officerName}</div>
                <div className="text-[10px] text-slate-600">{activeRole?.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-3 border-t border-slate-300 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Notice</span>
          </button>

          <button
            onClick={() => setIsNoticeModalOpen(false)}
            className="px-4 py-1.5 bg-[#142642] hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
