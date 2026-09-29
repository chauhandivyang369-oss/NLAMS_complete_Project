import React, { useState } from 'react';
import { 
  Compass, 
  Clock, 
  Send, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  AlertTriangle, 
  Building, 
  Users, 
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Eye,
  Radio,
  RefreshCw,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import StatutoryTimerBadge from '../components/common/StatutoryTimerBadge.jsx';

export default function SiaSurveyLaunchHubPage() {
  const {
    siaRecords,
    projects,
    jurisdiction,
    handleIssueSiaStart,
    onSwitchWorkspace,
    activeRole
  } = useAppropriateGovernment();

  const [selectedRecordId, setSelectedRecordId] = useState(siaRecords[0]?.id || 'SIA-LNCH-041');
  const [detailTab, setDetailTab] = useState('summary');
  // 'summary' | 'agency' | 'survey' | 'workspace' | 'stakeholders' | 'sla' | 'documents' | 'broadcast' | 'audit'

  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [selectedProjId, setSelectedProjId] = useState(projects[0]?.id || '');
  const [siaAgency, setSiaAgency] = useState('Punjab State Institute of Public Administration (PSIPA)');
  const [surveyStartDate, setSurveyStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [collectorName, setCollectorName] = useState('Dr. Preeti Yadav, IAS (DC Patiala)');

  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastRetryId, setBroadcastRetryId] = useState(null);

  const isCentral = jurisdiction === 'CENTRAL';

  const selectedRecord = siaRecords.find(r => r.id === selectedRecordId) || siaRecords[0];

  const filteredRecords = siaRecords.filter(r =>
    r.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.siaAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.collectorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLaunchSia = async (e) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === selectedProjId);
    await handleIssueSiaStart({
      projectId: selectedProjId,
      projectName: proj?.name || 'National Highway Project',
      siaAgency,
      surveyStartDate,
      collectorName
    });
    setIsLaunchModalOpen(false);
  };

  const handleRetryBroadcast = (recipientName) => {
    setBroadcastRetryId(recipientName);
    setTimeout(() => setBroadcastRetryId(null), 1200);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1B365D] tracking-tight">
              {isCentral ? 'Central SIA & Survey Launch Hub (Section 4(1))' : 'State SIA & Baseline Survey Launch Hub'}
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 3
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory Social Impact Assessment initiation under Section 4(1); 6-month statutory completion SLA &amp; SIA agency mandate
          </p>
        </div>

        {/* Launch Button & Workspace Link */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
            className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Inspect baseline census and SIMP in existing SIA Workspace"
          >
            <span>Open SIA &amp; IEG Workspace</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setIsLaunchModalOpen(true)}
            className="px-3 py-1.5 rounded bg-[#1B365D] hover:bg-[#142642] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Issue Section 4(1) SIA Notification</span>
          </button>
        </div>
      </div>

      {/* 2. Top Compact Status Band for Selected Record */}
      {selectedRecord && (
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">PROJECT</span>
              <div className="font-bold text-[#1B365D] truncate">{selectedRecord.projectId}</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">SIA REQUIREMENT</span>
              <div className="font-bold text-emerald-700">MANDATORY</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">AGENCY</span>
              <div className="font-semibold text-slate-800 truncate" title={selectedRecord.siaAgency}>{selectedRecord.siaAgency}</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">COLLECTOR</span>
              <div className="font-semibold text-slate-800 truncate">{selectedRecord.collectorName}</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">NOTIF. DATE</span>
              <div className="font-mono text-slate-700">{selectedRecord.notificationDate}</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">START DATE</span>
              <div className="font-mono text-slate-700">{selectedRecord.surveyStartDate}</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">6-MO SLA</span>
              <div className="font-mono font-bold text-amber-800">{selectedRecord.daysRemaining}d Left</div>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">STATUS</span>
              <div className="font-bold text-blue-800 truncate">{selectedRecord.siaStatus}</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Launch Queue Table */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1B365D] uppercase tracking-wide">
              Active Section 4(1) SIA Launch Queue
            </h3>
            <p className="text-[11px] text-slate-500">
              Assigned accredited SIA agencies, District Collector coordination &amp; 6-month statutory SLA clock
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search Agency, Project..."
                className="pl-7 pr-2.5 py-1 rounded border border-slate-300 text-xs outline-none focus:border-[#1B365D]"
              />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              {filteredRecords.length} Records
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 min-w-[850px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Launch ID</th>
                <th className="py-2.5 px-3">Project &amp; Code</th>
                <th className="py-2.5 px-3">Accredited SIA Agency</th>
                <th className="py-2.5 px-3">Collector / CALA</th>
                <th className="py-2.5 px-3 text-center">Commencement</th>
                <th className="py-2.5 px-3 text-center">6-Month SLA</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredRecords.map(rec => {
                const isSelected = rec.id === (selectedRecord?.id);
                return (
                  <tr
                    key={rec.id}
                    onClick={() => setSelectedRecordId(rec.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {rec.id}
                    </td>
                    <td className="py-2.5 px-3 max-w-xs">
                      <div className="font-bold text-[#1B365D] truncate">{rec.projectName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{rec.projectId}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{rec.siaAgency}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{rec.accreditationNo}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {rec.collectorName}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                      {rec.surveyStartDate}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <StatutoryTimerBadge
                        daysRemaining={rec.daysRemaining}
                        daysElapsed={180 - rec.daysRemaining}
                        totalWindowDays={180}
                        compact={true}
                      />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                        {rec.siaStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedRecordId(rec.id);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded font-semibold text-[11px] cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Selected Project Launch Detail In-Page Tabs (9 Tabs) */}
      {selectedRecord && (
        <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 shadow-2xs space-y-3">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-300">
                  {selectedRecord.id}
                </span>
                <h4 className="font-bold text-[#1B365D] text-xs sm:text-sm">
                  {selectedRecord.projectName}
                </h4>
              </div>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                Agency: {selectedRecord.siaAgency} • Collector: {selectedRecord.collectorName}
              </p>
            </div>

            {/* Launch Control Action Bar */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
                className="px-2.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>View SIA Workspace</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>

          {/* 9 In-Page Tabs (NOT sidebar menus) */}
          <div className="flex border-b border-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap">
            {[
              { id: 'summary', label: '1. Launch Summary' },
              { id: 'agency', label: '2. Agency' },
              { id: 'survey', label: '3. Survey Scope' },
              { id: 'workspace', label: '4. SIA Workspace Link' },
              { id: 'stakeholders', label: '5. Stakeholders' },
              { id: 'sla', label: '6. 6-Month SLA' },
              { id: 'documents', label: '7. Documents' },
              { id: 'broadcast', label: '8. Multi-Channel Broadcast' },
              { id: 'audit', label: '9. Audit Trail' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDetailTab(tab.id)}
                className={`py-1.5 px-3 border-b-2 cursor-pointer transition-colors ${
                  detailTab === tab.id
                    ? 'border-[#1B365D] text-[#1B365D] font-bold bg-slate-50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Launch Summary */}
          {detailTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">STATUTORY MANDATE</span>
                <p className="text-slate-700 leading-relaxed font-serif">
                  Section 4(1) Social Impact Assessment notification issued by Appropriate Government.
                </p>
                <div className="text-[11px] text-slate-600 pt-1">
                  <strong>Notification Date:</strong> {selectedRecord.notificationDate}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">AGENCY &amp; COLLECTOR</span>
                <div><strong>SIA Agency:</strong> {selectedRecord.siaAgency}</div>
                <div><strong>Accreditation:</strong> <span className="font-mono text-[11px]">{selectedRecord.accreditationNo}</span></div>
                <div><strong>Assigned Collector:</strong> {selectedRecord.collectorName}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">PROGRESS &amp; STATUS</span>
                <div><strong>Affected Families:</strong> {selectedRecord.affectedFamiliesCount || 186} Families</div>
                <div><strong>Public Hearing:</strong> {selectedRecord.publicHearingConducted ? 'Conducted' : 'Scheduled'}</div>
                <div><strong>Current Stage:</strong> <span className="font-bold text-emerald-700">{selectedRecord.siaStatus}</span></div>
              </div>
            </div>
          )}

          {/* Tab 2: Agency */}
          {detailTab === 'agency' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-[#1B365D]">Accredited Social Impact Assessment Institution</div>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div><strong>Institution Name:</strong> {selectedRecord.siaAgency}</div>
                <div><strong>Accreditation ID:</strong> {selectedRecord.accreditationNo}</div>
                <div><strong>Lead Social Scientist:</strong> Dr. S. P. Bhardwaj, Ph.D.</div>
                <div><strong>Terms of Reference:</strong> Conforming to Central RFCTLARR 2014 Rules</div>
              </div>
            </div>
          )}

          {/* Tab 3: Survey Scope */}
          {detailTab === 'survey' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">Baseline Census &amp; Household Enumeration</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Scope covers 100% digital survey of titleholders, agricultural tenants, agricultural labourers, and landless artisans. 
                Assessment includes livelihood loss, dwelling displacement, and impact on common public property resources.
              </p>
            </div>
          )}

          {/* Tab 4: SIA Workspace Link */}
          {detailTab === 'workspace' && (
            <div className="p-4 bg-blue-50/70 rounded border border-blue-200 text-xs space-y-2">
              <div className="font-bold text-blue-950 flex items-center justify-between">
                <span>Integrated SIA &amp; IEG Evaluation Workspace</span>
                <span className="text-[10px] font-mono font-bold bg-blue-200 px-2 py-0.5 rounded text-blue-900">
                  PILLAR 3
                </span>
              </div>
              <p className="text-blue-900 text-[11px] leading-relaxed">
                Detailed field survey data, household census registers, SIMP formulation and 7-member Multi-Disciplinary Expert Group appraisal are maintained in the dedicated SIA &amp; IEG workspace.
              </p>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('sia-ieg')}
                className="mt-2 px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Jump to Combined SIA &amp; IEG Evaluation Workspace</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          )}

          {/* Tab 5: Stakeholders */}
          {detailTab === 'stakeholders' && (
            <div className="space-y-1.5 text-xs">
              {[
                { name: 'Affected Titleholders & Khatedars', count: '142 Landowners', status: 'Survey Concluded' },
                { name: 'Agricultural Tenants & Sharecroppers', count: '44 Tenant Families', status: 'Enquiry Registered' },
                { name: 'Gram Panchayat Representatives', count: 'Payal & Sultanpur Khurd', status: 'Resolutions Verified' },
                { name: 'Requiring Body Project Directorate', count: 'NHAI PIU Patiala', status: 'Alignment Vetted' }
              ].map((st, i) => (
                <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800">{st.name}</span>
                    <div className="text-[10px] text-slate-500">{st.count}</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 6: 6-Month SLA */}
          {detailTab === 'sla' && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-[#1B365D] flex items-center justify-between">
                <span>Section 4(2) Statutory 6-Month Clock</span>
                <span className="font-mono font-bold text-amber-800">{selectedRecord.daysRemaining} Calendar Days Left</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><strong>Commencement Date:</strong> {selectedRecord.surveyStartDate}</div>
                <div><strong>Statutory Due Date:</strong> {selectedRecord.slaDeadline}</div>
              </div>
              <p className="text-slate-600 text-[11px] italic pt-1 border-t">
                Section 4(2) mandates completion of the SIA study within 6 months. Failure without extension renders notification liable to statutory audit question.
              </p>
            </div>
          )}

          {/* Tab 7: Documents */}
          {detailTab === 'documents' && (
            <div className="space-y-1.5 text-xs">
              {[
                { name: 'Section 4(1) SIA Commencement Gazette.pdf', size: '2.8 MB', date: selectedRecord.notificationDate },
                { name: 'Terms of Reference & Institutional Mandate.pdf', size: '1.4 MB', date: selectedRecord.surveyStartDate },
                { name: 'Multi-Disciplinary Expert Group Appraisal.pdf', size: '4.6 MB', date: selectedRecord.iegAppraisalDate || '2025-04-02' }
              ].map((d, i) => (
                <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-semibold text-slate-800">{d.name}</div>
                      <div className="text-[10px] text-slate-400">{d.size} • Issued {d.date}</div>
                    </div>
                  </div>
                  <button className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] font-medium hover:bg-slate-100 cursor-pointer">
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 8: Multi-Channel Broadcast Checklist */}
          {detailTab === 'broadcast' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>Section 4(1) Multi-Channel Broadcast Distribution Matrix</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">100% Dispatched</span>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded">
                {[
                  { recipient: 'SIA & IEG Workspace', channel: 'In-System Statutory Webhook', status: 'Delivered' },
                  { recipient: 'District Collector / CALA Portal', channel: 'Secure Government API', status: 'Delivered' },
                  { recipient: 'Requiring Body Directorate', channel: 'Project Portal Dispatch', status: 'Delivered' },
                  { recipient: 'Policy Makers Executive Desk', channel: 'Apex Radar Feed', status: 'Delivered' },
                  { recipient: 'Citizen & Affected Person Portal', channel: 'Bhu-Aadhaar ULPIN Broadcast', status: 'Delivered' },
                  { recipient: 'NLAMS Public Landing Gazette Vault', channel: 'Open Data Gazette Feed', status: 'Delivered' }
                ].map((b, i) => (
                  <div key={i} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <div className="font-bold text-slate-900">{b.recipient}</div>
                      <div className="text-[10px] text-slate-500">{b.channel}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-mono">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {b.status}
                      </span>
                      <button
                        onClick={() => handleRetryBroadcast(b.recipient)}
                        className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Ping / Retry delivery"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${broadcastRetryId === b.recipient ? 'animate-spin text-blue-600' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 9: Audit Trail */}
          {detailTab === 'audit' && (
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <div>
                  <span className="font-bold text-slate-900">SIA_NOTIFICATION_ISSUED</span>
                  <div className="text-[10px] text-slate-500 font-sans">Authorized Officer, {jurisdiction} Government</div>
                </div>
                <span className="text-[10px] text-slate-400">{selectedRecord.notificationDate}</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <div>
                  <span className="font-bold text-emerald-800">BROADCAST_DISPATCHED_TO_6_CHANNELS</span>
                  <div className="text-[10px] text-slate-500 font-sans">Automated Gateway Event</div>
                </div>
                <span className="text-[10px] text-slate-400">{selectedRecord.surveyStartDate}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Issue Section 4(1) SIA Notification */}
      {isLaunchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-300 max-w-xl w-full p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                Issue Section 4(1) SIA Start Notification
              </div>
              <button
                onClick={() => setIsLaunchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleLaunchSia} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block pb-1">
                  Select Validated Statutory Project:
                </label>
                <select
                  value={selectedProjId}
                  onChange={e => setSelectedProjId(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white font-medium outline-none focus:border-[#1B365D]"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.id} — {p.name} ({p.executingAgency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block pb-1">
                  Accredited Social Impact Assessment Agency:
                </label>
                <input
                  type="text"
                  value={siaAgency}
                  onChange={e => setSiaAgency(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
                  placeholder="e.g. Tata Institute of Social Sciences / PSIPA"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">
                    Commencement Date:
                  </label>
                  <input
                    type="date"
                    value={surveyStartDate}
                    onChange={e => setSurveyStartDate(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">
                    Assigned District Collector / CALA:
                  </label>
                  <input
                    type="text"
                    value={collectorName}
                    onChange={e => setCollectorName(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 outline-none focus:border-[#1B365D]"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Statutory Automated Broadcast Notice:
                </div>
                <p>
                  Issuing this notification automatically triggers statutory webhooks to:
                  (1) SIA &amp; IEG Workspace, (2) District Collector CALA Portal, (3) Requiring Body Escrow Desk, and (4) Citizen Public Gazette.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsLaunchModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold cursor-pointer"
                >
                  Publish &amp; Broadcast Section 4(1)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
