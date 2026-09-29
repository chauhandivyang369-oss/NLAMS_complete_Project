import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  MapPin, 
  Building2, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Coins, 
  PieChart, 
  Landmark, 
  ShieldCheck, 
  Gavel, 
  Layers, 
  Download, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { useLarrAuthority } from '../../context/LarrAuthorityContext.jsx';

export default function CaseDetailModal({ isOpen, onClose, caseItem }) {
  const { setActiveMenu, showToast } = useLarrAuthority();
  const [activeTab, setActiveTab] = useState('summary');

  if (!isOpen || !caseItem) return null;

  const TABS = [
    { id: 'summary', label: '1. Summary' },
    { id: 'parties', label: '2. Parties' },
    { id: 'project', label: '3. Project' },
    { id: 'land', label: '4. Land / ULPIN' },
    { id: 'collector-award', label: '5. Collector Award' },
    { id: 'sec64', label: '6. Sec 64 Ref' },
    { id: 'sec65', label: '7. Sec 65 Stmt' },
    { id: 'pleadings', label: '8. Pleadings' },
    { id: 'evidence', label: '9. Evidence' },
    { id: 'gis', label: '10. GIS Spatial' },
    { id: 'hearings', label: '11. Hearings' },
    { id: 'orders', label: '12. Order Sheets' },
    { id: 'award', label: '13. Sec 69 Award' },
    { id: 'apportionment', label: '14. Apportionment' },
    { id: 'escrow', label: '15. Escrow' },
    { id: 'payment', label: '16. Payment' },
    { id: 'appeal', label: '17. Appeal' },
    { id: 'execution', label: '18. Execution' },
    { id: 'audit', label: '19. Audit Trail' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-5xl w-full flex flex-col h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1B365D] text-white p-3.5 flex items-center justify-between border-b-2 border-[#C5A059] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#E6CA85]">
              <Scale className="w-4 h-4 text-[#E6CA85]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#E6CA85]">{caseItem.caseId}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
                  {caseItem.stage.replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] text-slate-300 hidden sm:inline">
                  • Ref: {caseItem.referenceNumber}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-md sm:max-w-xl">
                {caseItem.claimantName} vs. {caseItem.collectorName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast(`Navigating to full judicial menu for ${caseItem.caseId}`, 'info');
                onClose();
              }}
              className="hidden sm:flex items-center gap-1 px-3 py-1 bg-[#C5A059] hover:bg-[#b08d47] text-slate-950 text-xs font-bold rounded-md cursor-pointer transition-colors shadow-xs"
            >
              <span>Open in Bench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 19 Statutory Navigation Tabs (Horizontally Scrollable) */}
        <div className="flex overflow-x-auto bg-slate-100 border-b border-slate-300 px-2 py-1 gap-1 text-xs shrink-0 select-none scrollbar-thin">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1B365D] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 text-xs text-slate-800">
          
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Claimant</div>
                  <div className="font-bold text-slate-900 text-sm">{caseItem.claimantName}</div>
                  <div className="text-slate-500 text-[11px]">{caseItem.claimantAddress}</div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Acquiring Project</div>
                  <div className="font-bold text-slate-900 text-sm">{caseItem.projectName}</div>
                  <div className="text-slate-500 text-[11px]">Requiring Body: {caseItem.requiringBody}</div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Land Parcel &amp; ULPIN</div>
                  <div className="font-mono font-bold text-blue-700 text-sm">{caseItem.ulpin}</div>
                  <div className="text-slate-500 text-[11px]">Survey No: {caseItem.surveyNumber} • Area: {caseItem.acquiredAreaHectares} Ha ({caseItem.acquiredAreaSqM} sq.m)</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#1B365D] text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
                  Statutory Case Lifecycle Status
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div><span className="text-slate-400 block text-[10px]">CURRENT STAGE:</span> <strong>{caseItem.stage}</strong></div>
                  <div><span className="text-slate-400 block text-[10px]">REFERENCE DATE:</span> <strong>{caseItem.referenceDate}</strong></div>
                  <div><span className="text-slate-400 block text-[10px]">180-DAY SLA:</span> <strong className="text-amber-700">{caseItem.slaDaysElapsed}d elapsed / {caseItem.slaDaysRemaining}d left</strong></div>
                  <div><span className="text-slate-400 block text-[10px]">NEXT HEARING:</span> <strong className="text-purple-700">{caseItem.nextHearingDate || 'Reserved'}</strong></div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-slate-700">
                  <strong>Status Note:</strong> {caseItem.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-xs">Collector Award Baseline</div>
                  <div className="font-mono text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-slate-500">Award Number:</span> <span>{caseItem.collectorAward.awardNumber}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Basic Rate:</span> <span>₹{caseItem.collectorAward.basicLandRatePerSqM}/sq.m</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Total Award:</span> <strong className="text-slate-900">₹{caseItem.collectorAward.totalCollectorAwardAmount?.toLocaleString('en-IN')}</strong></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-xs">Judicial Enhancement Potential</div>
                  {caseItem.enhancedAwardPreview ? (
                    <div className="font-mono text-xs space-y-1 text-emerald-800">
                      <div className="flex justify-between"><span className="text-slate-500">Adjudicated Rate:</span> <span>₹{caseItem.enhancedAwardPreview.adjudicatedMarketRatePerSqM}/sq.m</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Total Judicial Award:</span> <strong>₹{caseItem.enhancedAwardPreview.totalJudicialAwardAmount?.toLocaleString('en-IN')}</strong></div>
                      <div className="flex justify-between"><span className="text-slate-500">Net Enhancement:</span> <strong className="text-emerald-700">₹{caseItem.enhancedAwardPreview.netDifferentialCr} Cr</strong></div>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic py-2">
                      Enhancement calculation will be performed in Menu 06 during Section 69 award determination.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PARTIES */}
          {activeTab === 'parties' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-[#1B365D] text-xs uppercase">Parties &amp; Legal Representatives</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-mono text-[10px] text-blue-700 font-bold">CLAIMANT / LANDOWNER</div>
                  <div className="font-bold text-slate-900 text-sm">{caseItem.claimantName}</div>
                  <div className="text-slate-600 mt-0.5">{caseItem.claimantAddress}</div>
                  <div className="text-slate-700 font-mono text-[11px] mt-1">Learned Counsel: <strong>{caseItem.claimantAdvocate}</strong></div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-mono text-[10px] text-amber-700 font-bold">RESPONDENT NO. 1 (COLLECTOR)</div>
                  <div className="font-bold text-slate-900 text-sm">{caseItem.collectorName}</div>
                  <div className="text-slate-700 font-mono text-[11px] mt-1">Represented by: <strong>Government Pleader / Special Land Acquisition Officer</strong></div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-mono text-[10px] text-indigo-700 font-bold">RESPONDENT NO. 2 (REQUIRING BODY)</div>
                  <div className="font-bold text-slate-900 text-sm">{caseItem.requiringBody}</div>
                  <div className="text-slate-700 font-mono text-[11px] mt-1">Represented by: <strong>Senior Standing Counsel</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECT */}
          {activeTab === 'project' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-[#1B365D] text-xs uppercase">NLAMS Master Project Context</h3>
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div><span className="text-slate-400 block text-[10px]">PROJECT ID:</span> <strong>{caseItem.projectId}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">PROJECT CODE:</span> <strong>{caseItem.projectCode}</strong></div>
                <div className="col-span-2"><span className="text-slate-400 block text-[10px]">PROJECT NAME:</span> <strong>{caseItem.projectName}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">REQUIRING BODY:</span> <span>{caseItem.requiringBody}</span></div>
                <div><span className="text-slate-400 block text-[10px]">APPROPRIATE GOVT:</span> <span>{caseItem.appropriateGovernment}</span></div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900">
                Connected to Requiring Body Form-I and Policy Maker Gazette Notification under Section 11(1) dated {caseItem.sec11Date || '15/03/2024'}.
              </div>
            </div>
          )}

          {/* TAB 4: LAND / ULPIN */}
          {activeTab === 'land' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-[#1B365D] text-xs uppercase">DILRMP Cadastral Parcel Records</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div><span className="text-slate-400 block text-[10px]">ULPIN:</span> <strong className="text-blue-700">{caseItem.ulpin}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">SURVEY NO:</span> <strong>{caseItem.surveyNumber}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">PARCEL ID:</span> <strong>{caseItem.parcelId}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">AREA:</span> <strong>{caseItem.acquiredAreaHectares} Ha ({caseItem.acquiredAreaSqM} sq.m)</strong></div>
                <div><span className="text-slate-400 block text-[10px]">VILLAGE / TALUKA:</span> <strong>{caseItem.village || 'Petlad'} / {caseItem.taluka || 'Petlad'}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">DISTRICT:</span> <strong>{caseItem.district}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">STATE:</span> <strong>{caseItem.state}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">LAND CLASSIFICATION:</span> <strong>{caseItem.landType || 'Perennial Irrigated'}</strong></div>
              </div>
            </div>
          )}

          {/* OTHER TABS SIMULATED RICHLY */}
          {activeTab !== 'summary' && activeTab !== 'parties' && activeTab !== 'project' && activeTab !== 'land' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3">
              <FileText className="w-10 h-10 text-[#1B365D] mx-auto opacity-70" />
              <h3 className="font-bold text-[#1B365D] text-sm uppercase">
                Section: {TABS.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-slate-600 max-w-lg mx-auto">
                Detailed judicial records, statutory forms, and verified cross-workspace artifacts for Case <strong>{caseItem.caseId}</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto text-left font-mono text-[11px] space-y-1">
                <div>• Verified against central NLAMS repository</div>
                <div>• Digital Signature Status: <strong>Class-3 DSC Token Verified</strong></div>
                <div>• Record Integrity: <strong>Immutable under RFCTLARR Act 2013</strong></div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Presiding Officer Bench Custody • Case ID: {caseItem.caseId}</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold text-xs cursor-pointer transition-colors"
          >
            Close Case Detail
          </button>
        </div>

      </div>
    </div>
  );
}
