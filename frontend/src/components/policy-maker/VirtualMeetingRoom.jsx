import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MonitorUp, 
  Hand, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Users2, 
  Maximize2, 
  Minimize2, 
  Send, 
  Layers, 
  Radio, 
  Sparkles,
  MapPin,
  FileCheck,
  ChevronRight,
  X,
  Volume2
} from 'lucide-react';

export default function VirtualMeetingRoom({ meeting, onLeaveMeeting, showToast, openProjectIntelligence }) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState('chat'); // 'chat' | 'transcript' | 'docs'
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(1942); // 32m 22s initial
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Anita Roy, IAS',
      role: 'Member Convenor',
      time: '11:02 AM',
      text: 'Quorum under RFCTLARR Section 48 is met. 7 of 8 members are connected on NIC secure bridge.'
    },
    {
      id: 2,
      sender: 'Shri Manoj Joshi, IAS',
      role: 'Chairperson (Secy DoLR)',
      time: '11:05 AM',
      text: 'Taking up Agenda Item #1: Ahmedabad-Dholera Expressway Sec 19(7) lapse countdown.'
    },
    {
      id: 3,
      sender: 'Dr. J. Vyas, IAS',
      role: 'Collector & CALA Anand',
      time: '11:14 AM',
      text: 'CALA reports: 18 village objection hearings complete. Joint inspection with MoEFCC completed for 14.2 Ha mangrove.'
    },
    {
      id: 4,
      sender: 'Shri Rajeev Verma',
      role: 'Member Projects (NHAI)',
      time: '11:21 AM',
      text: 'NHAI has deposited additional ₹180 Cr into the designated CALA Escrow Account on PFMS.'
    }
  ]);

  const [stenographerNotes, setStenographerNotes] = useState([
    {
      time: '11:08:24',
      speaker: 'Chairperson',
      note: 'Examined Section 19(7) statutory deadline falling on 28-Nov-2026 for PRJ-2026-GJ05.',
      tag: 'Statutory Compliance'
    },
    {
      time: '11:18:40',
      speaker: 'CALA Anand',
      note: 'Submitted certified Form-IV Rehabilitation Scheme for 428 project affected families.',
      tag: 'R&R Scheme'
    },
    {
      time: '11:25:12',
      speaker: 'Chairperson',
      note: 'DIRECTIVE: State Revenue Dept to gazette Sec 19 declaration within 14 calendar days.',
      tag: 'Formal Directive'
    }
  ]);

  const [customStenoNote, setCustomStenoNote] = useState('');
  const [resolutionAdopted, setResolutionAdopted] = useState(false);

  // Live Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You (Committee Officer)',
      role: 'Statutory Member',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: chatInput.trim()
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const handleAddStenoNote = (e) => {
    e.preventDefault();
    if (!customStenoNote.trim()) return;

    const newNote = {
      time: new Date().toLocaleTimeString(),
      speaker: 'You (Committee Member)',
      note: customStenoNote.trim(),
      tag: 'Member Intervention'
    };

    setStenographerNotes(prev => [...prev, newNote]);
    setCustomStenoNote('');
    showToast('Deliberation note appended to live draft MoM.');
  };

  const handleToggleHand = () => {
    const nextState = !isHandRaised;
    setIsHandRaised(nextState);
    if (nextState) {
      showToast('Hand raised. Chairperson alerted for your statutory intervention.', 'info');
    }
  };

  const handleAdoptResolution = () => {
    setResolutionAdopted(true);
    showToast('Resolution unanimously adopted. DSC certificate generated.', 'success');
  };

  const meetingTitle = meeting?.committeeName || 'National Monitoring Committee for R&R';
  const meetingId = meeting?.id || 'MTG-2026-NMC-01';

  return (
    <div className="bg-[#0b1325] text-white rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[82vh] min-h-[600px] select-none">
      
      {/* Top Header Bar: Institutional Metadata & Security */}
      <div className="h-14 bg-[#070d1a] border-b border-slate-800 px-4 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                LIVE SEC 48 ROOM
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                {meetingId}
              </span>
              <span className="hidden sm:inline text-xs font-bold text-slate-300 truncate">
                • {meetingTitle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span>Bridge: NIC-VIDYO-TLS1.3</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">7/8 Quorum Present</span>
              <span>•</span>
              <span className="text-amber-300">{formatTimer(secondsElapsed)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* FIPS Encryption Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>GOI FIPS 140-2 LEVEL 3 ENCRYPTED</span>
          </div>

          <button
            onClick={() => setIsSidePanelOpen(prev => !prev)}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isSidePanelOpen ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
            title="Toggle Collaboration Drawer"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Panel</span>
          </button>
        </div>
      </div>

      {/* Main Center Area: Video Stage + Collapsible Collaboration Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* VIDEO STAGE */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col justify-center">
          
          {/* Active Agenda Banner */}
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                ACTIVE AGENDA #1
              </span>
              <span className="text-slate-200 font-medium truncate">
                Ahmedabad-Dholera Expressway: Sec 19(7) Lapsing Countermeasure & MoEFCC Eco-Diversion
              </span>
            </div>
            {meeting?.agendas?.[0]?.projectId && (
              <button
                onClick={() => openProjectIntelligence(meeting.agendas[0].projectId)}
                className="text-[10px] font-mono text-cyan-300 hover:underline shrink-0 ml-2 font-bold"
              >
                Inspect Corridor →
              </button>
            )}
          </div>

          {/* Video Grid */}
          <div className={`grid gap-3 flex-1 ${
            isScreenSharing 
              ? 'grid-cols-1 lg:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            
            {/* TILE 1: CHAIRPERSON (Active Speaker with Visualizer) */}
            <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-[#101b33] border-2 flex flex-col justify-between p-3.5 shadow-lg ${
              !isScreenSharing ? 'border-emerald-500/80 ring-2 ring-emerald-500/30' : 'border-slate-700'
            }`}>
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-emerald-300 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SPEAKING
                </div>
                <div className="p-1 rounded-full bg-black/50 text-emerald-400">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Speaker Visual / Avatar */}
              <div className="my-auto flex flex-col items-center justify-center py-4 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border-2 border-amber-300 flex items-center justify-center text-slate-950 font-bold text-xl sm:text-2xl shadow-xl relative">
                  MJ
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                    <Mic className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Animated Speech Waveform Bars */}
                <div className="flex items-center gap-1 mt-3 h-4">
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_100ms] h-2"></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4"></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_300ms] h-3"></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_150ms] h-4"></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_250ms] h-2"></span>
                </div>
              </div>

              {/* Badge Footer */}
              <div className="bg-black/70 backdrop-blur-xs p-2 rounded-lg border border-slate-800 z-10">
                <div className="font-bold text-xs text-white">Shri Manoj Joshi, IAS</div>
                <div className="text-[10px] text-amber-300 font-mono truncate">
                  Secretary, DoLR & Committee Chairperson
                </div>
              </div>
            </div>

            {/* TILE 2: PRESENTATION SCREEN SHARE (If active) or MEMBER CONVENOR */}
            {isScreenSharing ? (
              <div className="lg:col-span-2 relative rounded-xl overflow-hidden bg-slate-950 border-2 border-cyan-500/80 shadow-xl flex flex-col justify-between p-3">
                <div className="flex items-center justify-between z-10 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                    <MonitorUp className="w-4 h-4 text-cyan-400" />
                    <span>PRESENTER: LIVE STATUTORY GIS CADASTRE OVERLAY</span>
                  </div>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                    PRJ-2026-GJ05 • CHAINAGE 18.2 - 24.5 KM
                  </span>
                </div>

                {/* Simulated GIS Screen Presentation */}
                <div className="my-auto py-3 px-2 flex flex-col items-center justify-center">
                  <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                      <span className="font-mono text-amber-400 font-bold">Section 11 (Prelim) vs Section 19 (Declaration) Alignment</span>
                      <span className="text-[10px] text-emerald-400 font-mono">100% PostGIS Verified</span>
                    </div>

                    {/* Cadastral Polygon Simulation */}
                    <div className="h-36 bg-slate-950 rounded-lg border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="relative z-10 text-center space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Survey Nos. 142/A to 178/B • 14.2 Ha Mangrove Eco-Zone</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Stage 1 Forest Clearance in-principle approved by MoEFCC REC on 12-Sep-2026
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                      <span>Khasra Parcels: 148 Verified</span>
                      <span>Encroachments: 0 Detected via Satellite</span>
                      <span className="text-emerald-300 font-bold">Section 19 Declaration: Ready for Gazette</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 text-right">
                  Broadcasting live to all connected statutory members
                </div>
              </div>
            ) : (
              /* TILE 2 STANDARD: MEMBER CONVENOR */
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-[#101b33] border border-slate-700 flex flex-col justify-between p-3.5 shadow-md">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-black/50 px-2 py-0.5 rounded">
                    CONVENOR
                  </span>
                  <div className="p-1 rounded-full bg-slate-800 text-slate-400">
                    <MicOff className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                </div>

                <div className="my-auto flex flex-col items-center justify-center py-4 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-500 border-2 border-purple-300 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xl">
                    AR
                  </div>
                </div>

                <div className="bg-black/70 backdrop-blur-xs p-2 rounded-lg border border-slate-800 z-10">
                  <div className="font-bold text-xs text-white">Dr. Anita Roy, IAS</div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    Joint Secretary, DoLR & Member Convenor
                  </div>
                </div>
              </div>
            )}

            {/* TILE 3: CALA / DISTRICT COLLECTOR AHMEDABAD */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-[#101b33] border border-slate-700 flex flex-col justify-between p-3.5 shadow-md">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-black/50 px-2 py-0.5 rounded">
                  STATE CALA
                </span>
                <div className="p-1 rounded-full bg-slate-800 text-slate-400">
                  <MicOff className="w-3.5 h-3.5 text-rose-400" />
                </div>
              </div>

              <div className="my-auto flex flex-col items-center justify-center py-4 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-700 to-blue-500 border-2 border-cyan-300 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xl">
                  JV
                </div>
              </div>

              <div className="bg-black/70 backdrop-blur-xs p-2 rounded-lg border border-slate-800 z-10">
                <div className="font-bold text-xs text-white">Dr. J. Vyas, IAS</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  Collector & CALA, Ahmedabad / Anand
                </div>
              </div>
            </div>

            {/* TILE 4: REQUIRING BODY (NHAI) */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-[#101b33] border border-slate-700 flex flex-col justify-between p-3.5 shadow-md">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-black/50 px-2 py-0.5 rounded">
                  REQUIRING BODY
                </span>
                <div className="p-1 rounded-full bg-slate-800 text-slate-400">
                  <MicOff className="w-3.5 h-3.5 text-rose-400" />
                </div>
              </div>

              <div className="my-auto flex flex-col items-center justify-center py-4 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 border-2 border-emerald-300 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xl">
                  RV
                </div>
              </div>

              <div className="bg-black/70 backdrop-blur-xs p-2 rounded-lg border border-slate-800 z-10">
                <div className="font-bold text-xs text-white">Shri Rajeev Verma</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  Member Projects, National Highways Authority
                </div>
              </div>
            </div>

            {/* TILE 5: YOU (THE USER / POLICY MAKER) */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#101e38] to-[#152a50] border-2 border-amber-400/80 ring-2 ring-amber-400/20 flex flex-col justify-between p-3.5 shadow-xl">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                    YOU
                  </span>
                  {isHandRaised && (
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-600/40 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                      <Hand className="w-3 h-3" />
                      HAND RAISED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {isMicMuted ? (
                    <span className="p-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                      <MicOff className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <Mic className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {isCameraOff ? (
                    <span className="p-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                      <VideoOff className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <Video className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* User Tile Visual */}
              <div className="my-auto flex flex-col items-center justify-center py-4 text-center">
                {isCameraOff ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-400 font-bold text-xl sm:text-2xl shadow-xl">
                    <VideoOff className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-2 border-white flex items-center justify-center text-slate-900 font-bold text-xl sm:text-2xl shadow-xl">
                    PM
                  </div>
                )}
              </div>

              <div className="bg-black/70 backdrop-blur-xs p-2 rounded-lg border border-slate-800 z-10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-white">Hon'ble Policy Maker</div>
                  <div className="text-[10px] text-amber-300 font-mono">
                    Statutory Committee Member
                  </div>
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  Verified Token
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLLAPSIBLE PANEL (Chat / Transcript / Documents) */}
        {isSidePanelOpen && (
          <div className="w-80 sm:w-96 bg-[#070d1a] border-l border-slate-800 flex flex-col shrink-0 z-20 animate-in slide-in-from-right duration-200">
            {/* Panel Tabs */}
            <div className="h-11 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveSideTab('chat')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                    activeSideTab === 'chat' 
                      ? 'bg-slate-800 text-white font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Chat ({chatMessages.length})
                </button>
                <button
                  onClick={() => setActiveSideTab('transcript')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                    activeSideTab === 'transcript' 
                      ? 'bg-slate-800 text-white font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Steno / MoM
                </button>
                <button
                  onClick={() => setActiveSideTab('docs')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                    activeSideTab === 'docs' 
                      ? 'bg-slate-800 text-white font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Dossier
                </button>
              </div>

              <button
                onClick={() => setIsSidePanelOpen(false)}
                className="p-1 text-slate-500 hover:text-white rounded transition-colors"
                title="Hide Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TAB CONTENT 1: LIVE CHAT */}
            {activeSideTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => {
                    const isSelf = msg.sender.includes('You');
                    return (
                      <div 
                        key={msg.id} 
                        className={`p-2.5 rounded-xl text-xs space-y-1 ${
                          isSelf 
                            ? 'bg-amber-500/15 border border-amber-500/30 ml-4' 
                            : 'bg-slate-900 border border-slate-800 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className={isSelf ? 'text-amber-300 font-bold' : 'text-slate-300 font-bold'}>
                            {msg.sender}
                          </span>
                          <span className="text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type official message to committee..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-bold transition-colors cursor-pointer"
                    title="Send Message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT 2: LIVE AI STENOGRAPHER & MoM NOTES */}
            {activeSideTab === 'transcript' && (
              <div className="flex-1 flex flex-col overflow-hidden p-3 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Statutory Stenographer</span>
                  </span>
                  <span>Section 48(4) Record</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {stenographerNotes.map((sn, i) => (
                    <div key={i} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">{sn.time} • {sn.speaker}</span>
                        <span className="px-1.5 py-0.2 rounded bg-blue-950 text-cyan-300 font-bold border border-blue-800">
                          {sn.tag}
                        </span>
                      </div>
                      <p className="text-slate-200">{sn.note}</p>
                    </div>
                  ))}
                </div>

                {/* Instant note capture */}
                <form onSubmit={handleAddStenoNote} className="space-y-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={customStenoNote}
                    onChange={(e) => setCustomStenoNote(e.target.value)}
                    placeholder="Dictate / type deliberation point for MoM..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#1B365D] hover:bg-[#132845] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    + Append to Certified MoM
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT 3: STATUTORY DOSSIER */}
            {activeSideTab === 'docs' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block">Agenda Item #1 Dossier</span>
                  <div className="font-bold text-white">Social Impact Assessment (SIA) Certified Report</div>
                  <div className="text-[11px] text-slate-400">Independent Multi-disciplinary Expert Group Report under Sec 7.</div>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>SIA-GJ05-2026.pdf (4.8 MB)</span>
                    <span className="text-emerald-400">Verified</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block">Draft Statutory Gazette</span>
                  <div className="font-bold text-white">Section 19(1) Declaration Draft</div>
                  <div className="text-[11px] text-slate-400">Scheduled for publication in e-Gazette of Gujarat Part-I.</div>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>SEC19-DRAFT-GJ05.pdf</span>
                    <span className="text-amber-400">Pending Signature</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">Financial Proof</span>
                  <div className="font-bold text-white">PFMS Treasury Escrow Receipt</div>
                  <div className="text-[11px] text-slate-400">₹842.50 Cr compensation deposited in CALA Ahmedabad Account.</div>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>PFMS-REC-2026.pdf</span>
                    <span className="text-emerald-400">Reconciled</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Floating Bottom Control Bar: Real-world Video Conference Dock */}
      <div className="h-16 bg-[#070d1a] border-t border-slate-800 px-4 flex items-center justify-between shrink-0">
        
        {/* Left: Quick Meeting Info */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Audio: HD Opus 48kHz</span>
          <span>•</span>
          <span>Camera: 1080p WebRTC</span>
        </div>

        {/* Center: Essential Call Controls */}
        <div className="flex items-center gap-2 sm:gap-3 mx-auto">
          {/* Mute Mic */}
          <button
            onClick={() => setIsMicMuted(prev => !prev)}
            className={`p-3 rounded-full transition-all cursor-pointer shadow-md ${
              isMicMuted 
                ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Camera */}
          <button
            onClick={() => setIsCameraOff(prev => !prev)}
            className={`p-3 rounded-full transition-all cursor-pointer shadow-md ${
              isCameraOff 
                ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
          >
            {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Share Screen (GIS Map / Gazette) */}
          <button
            onClick={() => setIsScreenSharing(prev => !prev)}
            className={`p-3 rounded-full transition-all cursor-pointer shadow-md ${
              isScreenSharing 
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white ring-2 ring-cyan-400/50' 
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={isScreenSharing ? 'Stop Screen Share' : 'Share Statutory GIS Screen'}
          >
            <MonitorUp className="w-5 h-5" />
          </button>

          {/* Raise Hand */}
          <button
            onClick={handleToggleHand}
            className={`p-3 rounded-full transition-all cursor-pointer shadow-md ${
              isHandRaised 
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold' 
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={isHandRaised ? 'Lower Hand' : 'Raise Hand to Intervene'}
          >
            <Hand className="w-5 h-5" />
          </button>

          {/* Adopt Statutory Directive / Resolution */}
          <button
            onClick={handleAdoptResolution}
            disabled={resolutionAdopted}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer shadow-md ${
              resolutionAdopted
                ? 'bg-emerald-800 text-emerald-100 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            title="Adopt Statutory Resolution"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{resolutionAdopted ? 'Resolution Passed' : 'Pass Directive'}</span>
          </button>

          {/* Leave Call */}
          <button
            onClick={onLeaveMeeting}
            className="p-3 sm:px-4 sm:py-2.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            title="Leave Virtual Meeting"
          >
            <PhoneOff className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>

        {/* Right: Resolution status badge */}
        <div className="hidden lg:flex items-center gap-2">
          {resolutionAdopted && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800 font-bold">
              Resolution Certified
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
