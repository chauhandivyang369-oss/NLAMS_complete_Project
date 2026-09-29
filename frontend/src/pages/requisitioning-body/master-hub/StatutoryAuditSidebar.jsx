import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function StatutoryAuditSidebar({ onSelectProposal }) {
  const { openAiAssistant, showToast } = useWorkspace();

  return (
    <div className="w-full xl:w-[320px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-4 space-y-4 shrink-0 shadow-xs text-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          <span className="text-[11px] font-bold text-slate-900 tracking-wider uppercase">
            Statutory Audit &amp; Compliance
          </span>
        </div>
        <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>

      {/* RFCTLARR Act 2013 Compliance Box */}
      <div className="bg-slate-50/80 border border-slate-200/90 rounded-lg p-3 text-xs space-y-2">
        <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          RFCTLARR Act 2013 Compliance
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Sec 4 SIA Mandate</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              Complied
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Sec 11 Preliminary Notif.</span>
            <span className="font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              Draft Ready
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Sec 19 Declaration</span>
            <span className="font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
              Pending
            </span>
          </div>
        </div>
      </div>

      {/* Recent Audit Trail Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs space-y-2">
        <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Recent Audit Trail
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="border-b border-slate-100 pb-1.5">
            <div className="font-semibold text-slate-800">ULPIN batch 2291 verified</div>
            <div className="text-[10px] text-slate-500">14:15 IST • Survey Team</div>
          </div>
          <div className="border-b border-slate-100 pb-1.5">
            <div className="font-semibold text-slate-800">Escrow Deposit Ack #9812</div>
            <div className="text-[10px] text-slate-500">11:30 IST • Finance Sec</div>
          </div>
          <div>
            <div className="font-semibold text-slate-800">Objection filed #OBJ-441</div>
            <div className="text-[10px] text-slate-500">09:12 IST • Collectorate</div>
          </div>
        </div>
      </div>

      {/* Action Required Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Action Required</span>
          </div>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            11 Total
          </span>
        </div>

        {/* Breakdown Dots */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="font-bold text-slate-800">3</span> High
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-bold text-slate-800">5</span> Medium
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="font-bold text-slate-800">3</span> Low
          </div>
        </div>

        {/* Action Items List */}
        <div className="space-y-2 pt-1 text-xs">
          {/* Item 1 */}
          <div className="p-2 rounded bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-900 text-[11px]">NLAMS-RB-2026-00138</span>
              <span className="text-[10px] font-bold text-rose-600">Overdue 4d</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Submit SIA Expert...
            </p>
            <button 
              onClick={() => onSelectProposal && onSelectProposal('NLAMS-RB-2026-00138')}
              className="text-[10px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 mt-1"
            >
              <span>Scrutinize</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Item 2 */}
          <div className="p-2 rounded bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-900 text-[11px]">NLAMS-RB-2026-00131</span>
              <span className="text-[10px] font-semibold text-amber-700">Expires in 6d</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Gazette Sec. 11...
            </p>
            <button 
              onClick={() => onSelectProposal && onSelectProposal('NLAMS-RB-2026-00131')}
              className="text-[10px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 mt-1"
            >
              <span>Validate Proof</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Item 3 */}
          <div className="p-2 rounded bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-900 text-[11px]">NLAMS-RB-2026-00155</span>
              <span className="text-[10px] text-slate-500">Hearing 18 Sep</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Joint measurement...
            </p>
            <button 
              onClick={() => onSelectProposal && onSelectProposal('NLAMS-RB-2026-00155')}
              className="text-[10px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 mt-1"
            >
              <span>Upload Registry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Milestone Progress Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Milestone Progress</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Sec 4 to Sec 38</span>
        </div>

        <div className="space-y-2 pt-1 text-xs">
          {[
            { label: '1. Form-I Requisition', val: '100%', count: '(24/24)', color: 'bg-emerald-500', width: '100%' },
            { label: '2. SIA Scrutiny (Sec 4)', val: '83%', count: '(20/24)', color: 'bg-emerald-500', width: '83%' },
            { label: '3. Prelim. Gazette (Sec 11)', val: '62%', count: '(15/24)', color: 'bg-blue-600', width: '62%' },
            { label: '4. Hearing Objections (Sec 15)', val: '41%', count: '(10/24)', color: 'bg-amber-500', width: '41%' },
            { label: '5. Final Declaration (Sec 19)', val: '29%', count: '(7/24)', color: 'bg-slate-400', width: '29%' },
            { label: '6. Award & Pos. (Sec 23/38)', val: '12%', count: '(3/24)', color: 'bg-slate-400', width: '12%' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 truncate max-w-[170px]">{item.label}</span>
                <span className="font-mono font-bold text-slate-800 text-[10px]">
                  {item.val} <span className="text-slate-400 font-normal">{item.count}</span>
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Stream Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit Stream</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <div className="space-y-2.5 text-[11px] pt-1">
          {/* Stream item 1 */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-800">e-Sign Approved: Sec. 19</div>
              <p className="text-[10px] text-slate-600 leading-tight">
                SLAU Madhya Pradesh approved link for NLAMS-RB-2026-00142
              </p>
              <div className="text-[9px] text-slate-400 mt-0.5">14 Sep 2026, 14:15 IST • Collectorate Dhar</div>
            </div>
          </div>

          {/* Stream item 2 */}
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-800">SIA Appraisal Delayed Flag</div>
              <p className="text-[10px] text-slate-600 leading-tight">
                Automated SLA engine tagged NLAMS-RB-2026-00138 as high risk
              </p>
              <div className="text-[9px] text-slate-400 mt-0.5">14 Sep 2026, 11:30 IST • NLAMS System Rule</div>
            </div>
          </div>

          {/* Stream item 3 */}
          <div className="flex items-start gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-800">ULPIN Spatial Bulk Sync</div>
              <p className="text-[10px] text-slate-600 leading-tight">
                1,248 Cadastral polygons linked to Proposal #00124
              </p>
              <div className="text-[9px] text-slate-400 mt-0.5">14 Sep 2026, 09:12 IST • Survey Team GOG</div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => showToast('Connecting to NIC-CERT Sovereign Security Audit Log...')}
          className="w-full text-center text-[10px] font-semibold text-blue-700 hover:text-blue-800 pt-2 border-t border-slate-100 flex items-center justify-center gap-1"
        >
          <span>View Sovereign System Log (NIC-CERT)</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Gov Registry Check */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80 text-xs">
        <span className="font-bold text-emerald-950 text-[11px] tracking-wider uppercase">
          Gov Registry Check
        </span>
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      </div>

    </div>
  );
}
