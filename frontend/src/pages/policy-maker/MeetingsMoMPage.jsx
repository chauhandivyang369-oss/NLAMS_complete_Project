import React, { useState } from 'react';
import { usePolicyMaker } from '../../contexts/PolicyMakerContext.jsx';
import { 
  Users2, 
  Calendar, 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Download, 
  Key, 
  Eye, 
  Plus, 
  AlertCircle, 
  FolderArchive, 
  Video, 
  Radio, 
  FileText, 
  Layers, 
  Check, 
  Search, 
  ExternalLink, 
  Paperclip, 
  Shield 
} from 'lucide-react';
import DemoDataBadge from '../../components/policy-maker/DemoDataBadge.jsx';
import VirtualMeetingRoom from '../../components/policy-maker/VirtualMeetingRoom.jsx';

export default function MeetingsMoMPage() {
  const { 
    meetings, 
    selectedMeeting, 
    setSelectedMeetingId, 
    directives, 
    effectiveScope, 
    currentRoleConfig, 
    showToast, 
    openProjectIntelligence,
    activeSubPage,
    setActiveSubPage 
  } = usePolicyMaker();

  // Active sub-page tab
  const currentTab = activeSubPage || 'meetings';
  const [isSigningMoM, setIsSigningMoM] = useState(false);
  const [momSigned, setMomSigned] = useState(false);

  const meeting = selectedMeeting || (meetings && meetings[0]) || {};

  const handleSignMoM = () => {
    setIsSigningMoM(true);
    setTimeout(() => {
      setIsSigningMoM(false);
      setMomSigned(true);
      showToast('MoM successfully certified with Level-3 DSC Cryptographic Stamp.');
    }, 1200);
  };

  const tabs = [
    { id: 'meetings', label: 'Meetings Roster' },
    { id: 'agenda', label: 'Agendas' },
    { id: 'attendance', label: 'Attendance & Quorum' },
    { id: 'minutes', label: 'Minutes of Meeting (MoM)' },
    { id: 'directives', label: `Directives (${(directives || []).length})` },
    { id: 'documents', label: 'Certified Documents' },
    { id: 'archive', label: 'Archive' },
    { id: 'live-video', label: 'Live Video Conference', isLive: true }
  ];

  return (
    <div className="space-y-4">
      
      {/* 1. Institutional Apex Header & Full-Width Tab Bar */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs rounded space-y-3">
        
        {/* Full-width Title & Description Block */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-[#C5A059]">
              MODULE 05
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${(currentRoleConfig && currentRoleConfig.badgeColor) || 'bg-purple-100 text-purple-900 border-purple-200'}`}>
              {(currentRoleConfig && currentRoleConfig.badgeText) || 'APEX EXECUTIVE'}
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SCOPE: {effectiveScope}
            </span>
            <DemoDataBadge />
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            NMC, SMC &amp; Project R&amp;R Committee Meetings &amp; MoM
          </h1>

          <p className="text-xs text-slate-600 mt-0.5 max-w-4xl leading-relaxed">
            Statutory committee deliberations under RFCTLARR Act 2013 Sections 45, 48 &amp; 50 with live video conferencing &amp; Level-3 DSC signed MoMs.
          </p>

          {/* Quick Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2.5">
            <button
              onClick={() => setActiveSubPage('live-video')}
              className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Video className="w-4 h-4 text-[#C5A059]" />
              <span>Join Live Video Room</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-0.5" />
            </button>

            <button
              onClick={() => setActiveSubPage('minutes')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              <FileCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>MoM Sign Vault</span>
            </button>
          </div>
        </div>

        {/* Full-Width Horizontal Tabs Bar (Dedicated Row) */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded border border-slate-200 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubPage(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : tab.isLive
                        ? 'text-purple-700 hover:bg-purple-100/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.isLive && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. Sub-page: LIVE VIDEO MEETING ROOM */}
      {currentTab === 'live-video' && (
        <VirtualMeetingRoom 
          meeting={meeting}
          onLeaveMeeting={() => setActiveSubPage('meetings')}
          showToast={showToast}
          openProjectIntelligence={openProjectIntelligence}
        />
      )}

      {/* 3. Sub-page: MEETINGS ROSTER */}
      {currentTab === 'meetings' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          
          {/* Left: Meetings List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 font-mono uppercase">
              <span>Scheduled &amp; Past Meetings</span>
              <span className="text-slate-500">{(meetings || []).length} Recorded</span>
            </div>

            <div className="space-y-2">
              {(meetings || []).map((m) => {
                const isSelected = meeting?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMeetingId(m.id)}
                    className={`p-3 rounded border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#1B365D] ring-1 ring-[#1B365D]'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="font-bold text-[#1B365D]">{m.meetingNo}</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 font-bold">
                        {m.committeeType}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{m.committeeName}</h4>
                    <div className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
                      <span>Date: {m.date}</span>
                      <span className="font-semibold text-emerald-700">{m.status}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">{m.time}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMeetingId(m.id);
                          setActiveSubPage('live-video');
                        }}
                        className="px-2 py-0.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Video className="w-3 h-3 text-purple-700" />
                        <span>Join Video</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Meeting Details */}
          <div className="lg:col-span-2 space-y-4">
            {meeting?.id ? (
              <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-[#1B365D] border border-blue-200">
                        {meeting.meetingNo}
                      </span>
                      <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {meeting.statutorySection || 'RFCTLARR Sec 48'}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900 mt-1">
                      {meeting.committeeName}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    <button
                      onClick={() => setActiveSubPage('live-video')}
                      className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Video className="w-4 h-4 text-[#C5A059]" />
                      <span>Join Live Video Room</span>
                    </button>

                    <button
                      onClick={() => setActiveSubPage('minutes')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded transition-colors cursor-pointer border border-slate-200"
                    >
                      View / Sign MoM →
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">Date &amp; Time</span>
                    <div className="font-bold text-slate-900">{meeting.date}</div>
                    <div className="text-slate-600 mt-0.5">{meeting.time}</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">Chairperson</span>
                    <div className="font-bold text-slate-900">{meeting.chairperson}</div>
                    <div className="text-slate-600 mt-0.5">{meeting.venue || meeting.mode}</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block mb-1">Quorum &amp; MoM</span>
                    <div className="font-bold text-emerald-700">{meeting.quorumStatus || 'Quorum Formed (7/8 Members Present)'}</div>
                    <div className="text-[#1B365D] mt-0.5 font-mono">{meeting.momStatus}</div>
                  </div>
                </div>

                {/* Agendas Covered */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 text-[#1B365D]">
                    Meeting Agendas &amp; Decisions
                  </h4>
                  <div className="space-y-2 text-xs">
                    {meeting.agendas?.map((ag, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#1B365D]">Agenda item #{i + 1}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {ag.status || 'DELIBERATED'}
                          </span>
                        </div>
                        <div className="font-bold text-slate-900">{ag.title}</div>
                        <div className="text-slate-600 text-[11px]">{ag.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendees list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 text-[#1B365D]">
                    Committee Members &amp; Special Invitees
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {meeting.attendees?.map((att, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{att.name}</div>
                          <div className="text-[10px] text-slate-500">{att.designation}</div>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          att.present ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {att.present ? 'PRESENT' : 'EXCUSED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded p-8 text-center text-slate-500">
                Please select a meeting to inspect details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Sub-page: AGENDAS */}
      {currentTab === 'agenda' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                Statutory Committee Agenda Dossier
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Meeting: {meeting.meetingNo} — {meeting.committeeName}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#1B365D] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              RFCTLARR Sec 48(2)
            </span>
          </div>

          <div className="space-y-3">
            {meeting.agendas?.map((ag, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1B365D]">ITEM {i + 1}.0</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    APPROVED FOR DELIBERATION
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{ag.title}</h4>
                <p className="text-xs text-slate-600">{ag.description}</p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Sponsored by: Joint Secretary (Land Resources)</span>
                  <span className="font-mono text-slate-700 font-semibold">Ref: PRJ-2026-GJ05</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Sub-page: ATTENDANCE & QUORUM */}
      {currentTab === 'attendance' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                Committee Roll &amp; Quorum Verification
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory quorum verification under RFCTLARR Section 48 &amp; Central Rules
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              QUORUM VALIDATED (88%)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-y border-slate-200">
                <tr>
                  <th className="p-3">Member Name</th>
                  <th className="p-3">Designation / Role</th>
                  <th className="p-3">Organization</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3 text-right">Digital Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {meeting.attendees?.map((att, i) => (
                  <tr key={i} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{att.name}</td>
                    <td className="p-3 text-slate-600">{att.designation}</td>
                    <td className="p-3 text-slate-600">{att.organization || 'Govt of India / State Govt'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        att.present ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {att.present ? 'PRESENT (IN PERSON / VC)' : 'LEAVE OF ABSENCE'}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-[11px] text-slate-500">
                      {att.present ? 'Aadhaar e-Sign Verified' : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Sub-page: MINUTES OF MEETING (MoM) */}
      {currentTab === 'minutes' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#1B365D]" />
                <span>Statutory Minutes of Meeting (MoM)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {meeting.meetingNo} — {meeting.committeeName} • Held on {meeting.date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Downloading certified MoM PDF...')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Download Certified PDF</span>
              </button>

              <button
                disabled={momSigned || isSigningMoM}
                onClick={handleSignMoM}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                  momSigned
                    ? 'bg-emerald-700 text-white cursor-default'
                    : 'bg-[#1B365D] hover:bg-[#142642] text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{momSigned ? 'Certified with Level-3 DSC' : isSigningMoM ? 'Affixing Digital Seal...' : 'Sign with Level-3 DSC'}</span>
              </button>
            </div>
          </div>

          {/* MoM Preview Document Card */}
          <div className="p-6 bg-slate-50 border border-slate-300 rounded font-serif text-slate-800 space-y-4 text-xs leading-relaxed max-w-4xl mx-auto shadow-inner">
            <div className="text-center space-y-1 font-sans border-b border-slate-300 pb-3">
              <div className="text-[11px] uppercase tracking-widest font-mono font-bold text-slate-600">
                GOVERNMENT OF INDIA • MINISTRY OF RURAL DEVELOPMENT
              </div>
              <div className="text-sm font-bold text-slate-900 uppercase">
                {meeting.committeeName}
              </div>
              <div className="text-xs font-mono text-slate-500">
                MEETING RECORD NO: {meeting.meetingNo} • DATE: {meeting.date}
              </div>
            </div>

            <div>
              <h5 className="font-sans font-bold text-xs text-slate-900 uppercase mb-1">1. Opening Remarks by Chair</h5>
              <p>
                The Chairperson, {meeting.chairperson}, welcomed all members and special invitees to the review meeting convened under statutory provisions of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013. Quorum was verified and confirmed.
              </p>
            </div>

            <div>
              <h5 className="font-sans font-bold text-xs text-slate-900 uppercase mb-1">2. Deliberations on Section 19 Declarations &amp; Lapsing Risks</h5>
              <p>
                The Committee reviewed the statutory progress of national pipeline projects. Special attention was accorded to <strong>{meeting.projectName || 'Ahmedabad Industrial Corridor (PRJ-2026-GJ05)'}</strong> regarding pending Section 19 declarations and inter-ministerial forest NOCs.
              </p>
            </div>

            <div>
              <h5 className="font-sans font-bold text-xs text-slate-900 uppercase mb-1">3. Directives Issued</h5>
              <p>
                The District Collector and Principal Secretary (Revenue) were directed to expedite the Section 23 award formulation within 14 calendar days to prevent statutory lapsing under Section 25.
              </p>
            </div>

            {/* Cryptographic Stamp Card */}
            <div className="pt-4 border-t border-slate-300 flex items-center justify-between font-sans">
              <div className="text-[10px] text-slate-500 font-mono">
                <div>AUTHENTICATION: SHA-256 HMAC SECURED</div>
                <div>DOC REF: NLAMS-MOM-2026-{meeting.id}</div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{momSigned ? 'Level-3 DSC e-Signed' : 'Digitally Certified Record'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Sub-page: DIRECTIVES TRACKER */}
      {currentTab === 'directives' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <Send className="w-4 h-4 text-[#1B365D]" />
                <span>Statutory Committee Directives &amp; Action Taken Reports (ATR)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Binding executive directions issued under Section 48 &amp; 50 to District Collectors and Requiring Bodies.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#1B365D] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              {(directives || []).length} Active Directives
            </span>
          </div>

          <div className="space-y-3">
            {(directives || []).map((dir) => (
              <div key={dir.id} className="p-3.5 border border-slate-200 rounded bg-slate-50/50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#1B365D]">{dir.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono font-bold text-purple-900 text-xs">{dir.projectId}</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 text-[10px] font-bold">
                      {dir.committeeType}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    dir.status === 'DISPATCHED' 
                      ? 'bg-amber-50 text-amber-800 border-amber-300' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  }`}>
                    STATUS: {dir.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900">{dir.issue}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2.5 rounded border border-slate-200">
                  <div>
                    <strong className="text-slate-800">Assigned Authority:</strong> {dir.assignedAuthority}
                  </div>
                  <div className="text-right sm:text-left">
                    <strong className="text-slate-800">Compliance Deadline:</strong> {dir.targetDate}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-500 font-mono">Issued via: {dir.meetingId}</span>
                  <button
                    onClick={() => showToast(`Requested ATR submission dossier for ${dir.id}`)}
                    className="text-xs text-[#1B365D] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Request ATR Submission</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Sub-page: DOCUMENTS & ARCHIVE */}
      {(currentTab === 'documents' || currentTab === 'archive') && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                {currentTab === 'documents' ? 'Certified Meeting Attachments & Dossiers' : 'Historical Committee Meetings Archive'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Permanent records repository preserved under National Archives of India compliance standards.
              </p>
            </div>
            <FolderArchive className="w-5 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: 'NMC 14th Review Dossier - Complete Proceedings.pdf', size: '14.2 MB', date: '24 Sep 2026', cert: 'Level-3 DSC' },
              { title: 'SMC Gujarat State Pipeline Clearance Minutes.pdf', size: '8.4 MB', date: '18 Aug 2026', cert: 'Level-3 DSC' },
              { title: 'Inter-State Alignment NOC Packet - Vadodara.pdf', size: '22.1 MB', date: '02 Jul 2026', cert: 'Level-3 DSC' },
              { title: 'Third Schedule R&R Colony Inspection Record.pdf', size: '6.7 MB', date: '15 May 2026', cert: 'Level-3 DSC' }
            ].map((doc, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-blue-100 text-[#1B365D] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{doc.title}</div>
                    <div className="text-[10px] text-slate-500">{doc.size} • {doc.date} • {doc.cert}</div>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Downloading: ${doc.title}`)}
                  className="p-1.5 rounded hover:bg-slate-200 text-slate-700 cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
