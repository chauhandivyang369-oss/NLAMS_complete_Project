import React, { useState } from 'react';
import { useLarrAuthority } from '../../context/LarrAuthorityContext.jsx';
import { 
  X, 
  Send, 
  FileText, 
  Gavel, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calculator, 
  PieChart, 
  ShieldCheck, 
  ExternalLink,
  Coins,
  History,
  Info
} from 'lucide-react';

export default function LarrRightPanel() {
  const { 
    isRightPanelOpen, 
    setIsRightPanelOpen, 
    currentRole, 
    activeMenu, 
    setActiveMenu, 
    selectedCase,
    auditLogs,
    showToast,
    registerCase,
    permissions
  } = useLarrAuthority();

  const [activeRightTab, setActiveRightTab] = useState('actions'); // 'actions', 'timeline', 'crosslinks'

  if (!isRightPanelOpen) return null;

  return (
    <>
      {/* Backdrop for Slide-Over Drawer */}
      <div 
        onClick={() => setIsRightPanelOpen(false)}
        className="fixed inset-0 bg-slate-950/60 z-40 backdrop-blur-xs transition-opacity cursor-pointer animate-fadeIn"
        title="Close Judicial Action Drawer"
      />

      <aside className="fixed inset-y-0 right-0 w-full sm:w-96 lg:w-[420px] bg-white border-l border-slate-300 flex flex-col shadow-2xl z-50 animate-slideLeft">
        
        {/* Panel Header */}
      <div className="p-3 bg-[#1B365D] text-white flex items-center justify-between border-b border-[#C5A059]">
        <div>
          <div className="text-[10px] font-mono text-[#E6CA85] uppercase font-bold tracking-wider">
            Judicial Action Panel
          </div>
          <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
            <span>Context:</span>
            <span className="font-mono text-amber-300">{selectedCase?.caseId || 'LARR/2026/001'}</span>
          </div>
        </div>

        <button
          onClick={() => setIsRightPanelOpen(false)}
          className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          title="Close Action Drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs: Role Actions vs Audit Timeline vs Cross-Workspace */}
      <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
        <button
          onClick={() => setActiveRightTab('actions')}
          className={`flex-1 py-2 text-center border-b-2 transition-colors cursor-pointer ${
            activeRightTab === 'actions'
              ? 'border-[#1B365D] text-[#1B365D] bg-white font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Actions
        </button>

        <button
          onClick={() => setActiveRightTab('timeline')}
          className={`flex-1 py-2 text-center border-b-2 transition-colors cursor-pointer ${
            activeRightTab === 'timeline'
              ? 'border-[#1B365D] text-[#1B365D] bg-white font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Audit Log ({auditLogs.length})
        </button>

        <button
          onClick={() => setActiveRightTab('crosslinks')}
          className={`flex-1 py-2 text-center border-b-2 transition-colors cursor-pointer ${
            activeRightTab === 'crosslinks'
              ? 'border-[#1B365D] text-[#1B365D] bg-white font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          NLAMS Links
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        
        {/* TAB 1: DYNAMIC ROLE ACTIONS */}
        {activeRightTab === 'actions' && (
          <div className="space-y-4">
            
            {/* Quick Context Summary Card */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                Current Procedural Stage
              </div>
              <div className="font-bold text-[#1B365D] text-sm">
                {selectedCase?.stage.replace(/_/g, ' ')}
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                {selectedCase?.status}
              </div>
            </div>

            {/* Role-Specific Statutory Actions */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-800 uppercase font-mono flex items-center justify-between">
                <span>Authorized Actions ({currentRole.replace(/_/g, ' ')})</span>
              </div>

              {/* 1. Presiding Officer Actions */}
              {currentRole === 'PRESIDING_OFFICER' && (
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveMenu('award-engine')}
                    className="w-full text-left p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300 text-emerald-950 flex items-center justify-between group cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Section 69 Award Engine</span>
                      </div>
                      <div className="text-[10px] text-emerald-800">
                        Calculate enhancement &amp; e-Sign decree
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700">Open &rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu('courtroom')}
                    className="w-full text-left p-2.5 rounded-lg bg-purple-50 hover:bg-purple-100/90 border border-purple-300 text-purple-950 flex items-center justify-between group cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <Gavel className="w-3.5 h-3.5 text-purple-700" />
                        <span>Virtual Courtroom &amp; Order Sheet</span>
                      </div>
                      <div className="text-[10px] text-purple-800">
                        Record daily proceedings &amp; pass orders
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-700">Open &rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu('escrow')}
                    className="w-full text-left p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100/90 border border-blue-300 text-blue-950 flex items-center justify-between group cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <PieChart className="w-3.5 h-3.5 text-blue-700" />
                        <span>Section 77 Apportionment &amp; Escrow</span>
                      </div>
                      <div className="text-[10px] text-blue-800">
                        Apportion title shares &amp; bank sweeps
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-blue-700">Open &rarr;</span>
                  </button>
                </div>
              )}

              {/* 2. Registrar Actions */}
              {currentRole === 'REGISTRAR' && (
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveMenu('inward')}
                    className="w-full text-left p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-950 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-700" />
                        <span>Scrutinize Reference &amp; Defects</span>
                      </div>
                      <div className="text-[10px] text-blue-800">
                        Form-VIII, Sec 65 Statement, Defect memo
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-blue-700">Open &rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu('summons')}
                    className="w-full text-left p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-amber-700" />
                        <span>Issue Digital Summons</span>
                      </div>
                      <div className="text-[10px] text-amber-800">
                        Multi-party notice &amp; speed post tracking
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-amber-700">Open &rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu('appeal-execution')}
                    className="w-full text-left p-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-950 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                        <span>High Court Appeal &amp; Execution Registry</span>
                      </div>
                      <div className="text-[10px] text-rose-800">
                        Section 74 appeals, stay orders, recovery
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-rose-700">Open &rarr;</span>
                  </button>
                </div>
              )}

              {/* 3. Judicial Clerk Actions */}
              {currentRole === 'JUDICIAL_CLERK' && (
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveMenu('pleadings')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-700" />
                        <span>Index Exhibits &amp; Pleadings</span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        Mark Ex. P/R/C with cryptographic hashes
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-700">Open &rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu('courtroom')}
                    className="w-full text-left p-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-950 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <Gavel className="w-3.5 h-3.5 text-purple-700" />
                        <span>Record Bench Presence &amp; Cause List</span>
                      </div>
                      <div className="text-[10px] text-purple-800">
                        Mark attendance of counsels &amp; officers
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-700">Open &rarr;</span>
                  </button>
                </div>
              )}

              {/* 4. Appropriate Government (Read-Only) */}
              {currentRole === 'APPROPRIATE_GOVERNMENT' && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-2 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Info className="w-4 h-4 text-amber-700" />
                    <span>Judicial Independence Safeguard</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Appropriate Government holds read-only monitoring access to tribunal pendency, SLA disposal, and administrative statistics. Under RFCTLARR Act 2013, executive authorities cannot modify judicial orders or decisions.
                  </p>
                  <button
                    onClick={() => setActiveMenu('sla')}
                    className="w-full py-1.5 px-3 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold rounded text-xs transition-colors cursor-pointer"
                  >
                    View 180-Day SLA Pipeline
                  </button>
                </div>
              )}

            </div>

            {/* Quick Statutory Calculation Preview */}
            {selectedCase?.collectorAward && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono font-bold text-[#1B365D]">
                  <span>COLLECTOR VS CLAIM</span>
                  <span>DIFF: ₹{( (selectedCase.enhancementClaim.claimedTotalAmount - selectedCase.collectorAward.totalCollectorAwardAmount) / 10000000 ).toFixed(2)} Cr</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <div className="text-slate-500 font-mono text-[9px]">COLLECTOR RATE</div>
                    <div className="font-bold text-slate-800">₹{selectedCase.collectorAward.basicLandRatePerSqM}/sq.m</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <div className="text-slate-500 font-mono text-[9px]">CLAIMED RATE</div>
                    <div className="font-bold text-emerald-700">₹{selectedCase.enhancementClaim.claimedMarketRatePerSqM}/sq.m</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMenu('award-engine')}
                  className="w-full py-1 text-center bg-[#1B365D] hover:bg-[#0F2342] text-white font-bold rounded text-[11px] transition-colors cursor-pointer"
                >
                  Open Section 69 Calculator &rarr;
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: IMMUTABLE AUDIT TIMELINE */}
        {activeRightTab === 'timeline' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Cryptographic Audit Trail</span>
              <span className="font-mono text-[10px] text-slate-500">SHA-256</span>
            </div>

            <div className="relative border-l-2 border-slate-300 ml-2 space-y-3">
              {auditLogs.map((log) => (
                <div key={log.auditId} className="ml-3 text-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 -ml-[17px] border-2 border-white ring-1 ring-blue-500" />
                    <span className="font-mono text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <div className="font-bold text-[#1B365D] text-[11px] leading-tight">
                    {log.action.replace(/_/g, ' ')}
                  </div>
                  <div className="text-[11px] text-slate-700 leading-snug">
                    {log.description}
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400">
                    <span>{log.actorName}</span>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{log.dscHash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CROSS-WORKSPACE CONNECTOR (Integration with other 4 NLAMS Workspaces) */}
        {activeRightTab === 'crosslinks' && (
          <div className="space-y-3 text-xs">
            <div className="text-xs font-bold text-slate-800">
              NLAMS Unified Master Links
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              LARR Authority consumes shared master records without duplicate data entry. Click to view linked records in other workspaces:
            </p>

            <div className="space-y-2">
              
              {/* Link 1: Requiring Body Master Record */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">1. Requiring Body Master</span>
                  <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1 rounded">Form-I</span>
                </div>
                <div className="font-mono text-[11px] text-[#1B365D]">Project: {selectedCase?.projectCode}</div>
                <div className="text-[10px] text-slate-500">Agency: {selectedCase?.requiringBody}</div>
                <button
                  onClick={() => showToast(`Navigating to Project ${selectedCase?.projectCode} in Requiring Body Workspace...`, 'info')}
                  className="mt-1 text-[10px] font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Requiring Body Form-I</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Link 2: SIA & IEG Survey Record */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">2. SIA &amp; IEG Impact Study</span>
                  <span className="text-[9px] font-mono bg-purple-100 text-purple-800 px-1 rounded">Sec 7</span>
                </div>
                <div className="font-mono text-[11px] text-[#1B365D]">Survey: {selectedCase?.surveyNumber}</div>
                <div className="text-[10px] text-slate-500">SIMP Appraisal &amp; Public Hearing Record</div>
                <button
                  onClick={() => showToast(`Opening SIA baseline survey for Sy No. ${selectedCase?.surveyNumber}...`, 'info')}
                  className="mt-1 text-[10px] font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open SIA &amp; IEG Record</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Link 3: R&R Authority Scheme Record */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">3. R&amp;R Authority Scheme</span>
                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1 rounded">Sec 16</span>
                </div>
                <div className="font-mono text-[11px] text-[#1B365D]">ULPIN: {selectedCase?.ulpin}</div>
                <div className="text-[10px] text-slate-500">Second &amp; Third Schedule Entitlements</div>
                <button
                  onClick={() => showToast(`Opening R&R Administrator entitlement dossier for ULPIN ${selectedCase?.ulpin}...`, 'info')}
                  className="mt-1 text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open R&amp;R Entitlement Dossier</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Link 4: Policy Maker Governance Link */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">4. Policy Maker Lapsing Radar</span>
                  <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1 rounded">Sec 50</span>
                </div>
                <div className="font-mono text-[11px] text-[#1B365D]">NMC / SMC State Monitoring</div>
                <div className="text-[10px] text-slate-500">Statutory 12-Month Lapsing Tracking</div>
                <button
                  onClick={() => showToast(`Opening Policy Maker Executive Overview for ${selectedCase?.district}...`, 'info')}
                  className="mt-1 text-[10px] font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Policy Maker Radar</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </aside>
    </>
  );
}
