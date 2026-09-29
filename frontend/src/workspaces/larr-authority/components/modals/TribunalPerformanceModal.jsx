import React from 'react';
import { 
  X, 
  Scale, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ShieldCheck,
  Building2,
  Users,
  Coins
} from 'lucide-react';
import { useLarrAuthority } from '../../context/LarrAuthorityContext.jsx';

export default function TribunalPerformanceModal({ isOpen, onClose }) {
  const { cases, showToast } = useLarrAuthority();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1B365D] text-white p-3.5 flex items-center justify-between border-b-2 border-[#C5A059] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#E6CA85]">
              <Scale className="w-4 h-4 text-[#E6CA85]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#E6CA85] uppercase font-bold tracking-wider">
                Judicial Performance &amp; Statutory SLA Audit
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white">
                Tribunal Performance Snapshot (FY 2025–26)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Exporting Performance Snapshot PDF...', 'info')}
              className="flex items-center gap-1 px-3 py-1 bg-[#C5A059] hover:bg-[#b08d47] text-slate-950 text-xs font-bold rounded-md cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-4 text-xs text-slate-800">
          
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Disposal Rate</div>
              <div className="text-2xl font-mono font-extrabold text-[#1B365D] mt-1">84.2%</div>
              <div className="text-[10px] text-emerald-700 font-medium">48 of 57 references resolved</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Avg Disposal Duration</div>
              <div className="text-2xl font-mono font-extrabold text-emerald-800 mt-1">142 Days</div>
              <div className="text-[10px] text-emerald-700 font-medium">Within 180-day SLA statutory cap</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">High Court Affirmation</div>
              <div className="text-2xl font-mono font-extrabold text-purple-900 mt-1">91.6%</div>
              <div className="text-[10px] text-purple-700 font-medium">Appeals upheld by High Court</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Enhanced Award Differential</div>
              <div className="text-2xl font-mono font-extrabold text-amber-800 mt-1">₹62.4 Cr</div>
              <div className="text-[10px] text-amber-700 font-medium">Adjudicated under Section 69</div>
            </div>
          </div>

          {/* Section 60 SLA Breakdown Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1B365D] text-xs">Section 60 (180-Day Statutory Compliance Status)</span>
              <span className="font-mono text-[10px] text-slate-500 font-bold">Total: {cases.length} References Tracked</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '58%' }} title="Normal (<90d): 58%" />
              <div className="bg-amber-500 h-full" style={{ width: '25%' }} title="Warning (90-150d): 25%" />
              <div className="bg-red-500 h-full" style={{ width: '17%' }} title="Critical (>150d): 17%" />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-slate-600 pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Normal (&lt;90d): 7 Cases (58%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning (90–150d): 3 Cases (25%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical/Breached: 2 Cases (17%)</span>
            </div>
          </div>

          {/* Monthly Reference Inward vs Disposal Trend */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-[#1B365D] text-xs uppercase tracking-wide">
              Monthly Inflow vs. Adjudicated Disposal (Past 6 Months)
            </h4>
            
            <div className="space-y-2 font-mono text-[11px]">
              {[
                { month: 'April 2026', inward: 12, disposed: 14, rate: '116%' },
                { month: 'May 2026', inward: 8, disposed: 10, rate: '125%' },
                { month: 'June 2026', inward: 15, disposed: 12, rate: '80%' },
                { month: 'July 2026', inward: 9, disposed: 11, rate: '122%' },
                { month: 'August 2026', inward: 11, disposed: 9, rate: '82%' },
                { month: 'September 2026 (MTD)', inward: 6, disposed: 7, rate: '116%' }
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800 w-36">{row.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-700">Inward: <strong>{row.inward}</strong></span>
                    <span className="text-emerald-700">Disposed: <strong>{row.disposed}</strong></span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold text-[10px]">
                      Clearance: {row.rate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated by Registrar, Central Gujarat Bench</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold text-xs cursor-pointer transition-colors"
          >
            Close Snapshot
          </button>
        </div>

      </div>
    </div>
  );
}
