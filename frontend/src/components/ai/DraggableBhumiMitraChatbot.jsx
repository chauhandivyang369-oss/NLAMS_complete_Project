import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Scale, 
  Minimize2, 
  Maximize2, 
  Move, 
  Sparkles,
  RefreshCw,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function DraggableBhumiMitraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Position state for dragging (default bottom right)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialPosX: 0, initialPosY: 0 });
  const chatWindowRef = useRef(null);

  // Chat conversation state
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am Bhumi Mitra (भूमि मित्र) 🤖, your national AI statutory assistant for the RFCTLARR Act 2013 & Land Acquisition. How can I assist you with your land compensation, Section 15 objections, R&R entitlements, or survey status today?',
      citations: ['RFCTLARR Act 2013', 'BhoomiRashi / NLAMS Protocol']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // Set default initial position on screen mount (Bottom Right with safe margins)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialRight = 24;
      const initialBottom = 24;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setPosition({
        x: Math.max(20, windowWidth - 90),
        y: Math.max(20, windowHeight - 90)
      });
    }
  }, []);

  // Dragging event handlers (supports both mouse and touch for mobile)
  const handlePointerDown = (e) => {
    // Only drag from the drag handle or floating button
    if (e.target.closest('.no-drag')) return;

    setIsDragging(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialPosX: position.x,
      initialPosY: position.y
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    const deltaX = clientX - dragStartRef.current.startX;
    const deltaY = clientY - dragStartRef.current.startY;

    // Detect if actual drag motion occurred
    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      setHasMoved(true);
    }

    const newX = Math.min(Math.max(10, dragStartRef.current.initialPosX + deltaX), window.innerWidth - 70);
    const newY = Math.min(Math.max(10, dragStartRef.current.initialPosY + deltaY), window.innerHeight - 70);

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  const toggleOpen = () => {
    if (hasMoved) {
      setHasMoved(false);
      return; // Prevent opening on drag release
    }
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const quickPrompts = [
    'How is 100% Solatium calculated under Section 30?',
    'What is the 60-day limitation for Section 15 objections?',
    'Are agricultural tenants entitled to R&R housing?',
    'What is the formula for rural multiplication factor (1.0 to 2.0)?',
    'How do I file a Section 64 reference to LARR Authority?'
  ];

  const handleSendMessage = (text) => {
    const q = (text || inputText).trim();
    if (!q) return;

    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      let citations = [];
      const lower = q.toLowerCase();

      if (lower.includes('solatium') || lower.includes('section 30')) {
        botReply = 'Under Section 30(1) of RFCTLARR Act 2013, the Collector MUST award 100% Solatium on the total determined value of land plus assets. For example, if land value is ₹25 Lakh and trees/well are ₹5 Lakh (Total ₹30 Lakh), the Collector adds exactly ₹30 Lakh as Solatium, making the subtotal ₹60 Lakh before 12% statutory annual interest.';
        citations = ['Section 30(1) RFCTLARR Act 2013', 'First Schedule, Clause 2'];
      } else if (lower.includes('objection') || lower.includes('section 15') || lower.includes('60-day')) {
        botReply = 'Under Section 15(1), any person interested in land has exactly 60 DAYS from the date of publication of the Section 11 Preliminary Notification in the Official Gazette to submit written objections to the Collector regarding public purpose, area of land, or suitability. The Collector must conduct a personal hearing under Section 15(2).';
        citations = ['Section 15(1) & (2) RFCTLARR Act 2013'];
      } else if (lower.includes('tenant') || lower.includes('r&r') || lower.includes('housing')) {
        botReply = 'Yes! The Second Schedule of RFCTLARR Act 2013 mandates that affected agricultural tenants, sharecroppers, and landless artisans receive: (1) Mandatory housing unit or ₹3.50 Lakh financial grant, (2) Monthly subsistence allowance of ₹3,000 for 12 continuous months, and (3) Shifting allowance of ₹50,000.';
        citations = ['Second Schedule (R&R Package)', 'Section 31 & 32'];
      } else if (lower.includes('rural') || lower.includes('multiplication') || lower.includes('factor')) {
        botReply = 'Under Section 26(2) and First Schedule, the market value of rural land is multiplied by a statutory factor based on distance from nearest urban limits: (a) 0 to 10 km = 1.2, (b) 10 to 20 km = 1.5, (c) Beyond 20 km = 2.0 (or State-notified scale). Urban acquisitions use a multiplication factor of 1.0.';
        citations = ['Section 26(2)', 'Ministry of Rural Development Guidelines'];
      } else if (lower.includes('reference') || lower.includes('section 64') || lower.includes('tribunal') || lower.includes('larr authority')) {
        botReply = 'If you do not accept the Collector’s award regarding measurement, compensation, or apportionment, you can submit a written application to the Collector within 6 WEEKS under Section 64, mandating reference to the presiding Judicial Officer of the LARR Authority.';
        citations = ['Section 64 & 69 RFCTLARR Act 2013'];
      } else {
        botReply = `Regarding "${q}": Under the statutory framework of RFCTLARR Act 2013, all procedures (SIA notification, Section 11 preliminary notification, Section 19 declaration, and Section 23 awards) must follow strict time-bound statutory clocks. You can inspect parcel dockets using your ULPIN or consult your District Collectorate.`;
        citations = ['Statutory Rulebook RFCTLARR 2013', 'NLAMS Land Policy Engine'];
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply, citations }]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <>
      {/* 1. FLOATING DRAGGABLE ROBOT ICON / BUTTON */}
      {!isOpen && (
        <div 
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999,
            touchAction: 'none'
          }}
          onPointerDown={handlePointerDown}
          className={`cursor-grab active:cursor-grabbing select-none transition-transform duration-100 ${
            isDragging ? 'scale-110' : 'hover:scale-105'
          }`}
          title="Drag anywhere or Click to open Bhumi Mitra AI"
        >
          <div 
            onClick={toggleOpen}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0F1E36] via-[#1B365D] to-[#2A4D82] text-amber-300 border-2 border-amber-400 shadow-[0_8px_30px_rgb(0,0,0,0.45)] hover:shadow-amber-500/30 group"
          >
            {/* Robot Head Icon */}
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-amber-300 group-hover:text-amber-200 transition-colors animate-pulse" />
              {/* Glowing Antenna Indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900"></span>
              </span>
            </div>

            {/* Drag Hint Tooltip */}
            <div className="absolute -top-7 px-2 py-0.5 bg-slate-900/90 text-amber-300 text-[10px] font-semibold rounded-md border border-amber-500/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
              🤖 Bhumi Mitra (Drag me)
            </div>
          </div>
        </div>
      )}

      {/* 2. CHATBOT WINDOW (DRAGGABLE & RESIZABLE/MINIMIZABLE) */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          style={{
            position: 'fixed',
            left: `${Math.min(Math.max(10, position.x - 340), window.innerWidth - 400)}px`,
            top: `${Math.min(Math.max(10, position.y - (isMinimized ? 60 : 540)), window.innerHeight - (isMinimized ? 70 : 560))}px`,
            zIndex: 9999,
            width: '380px',
            maxWidth: 'calc(100vw - 20px)'
          }}
          className="bg-slate-900 border-2 border-amber-500/70 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col font-sans backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header Bar - Draggable */}
          <div 
            onPointerDown={handlePointerDown}
            className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0F1E36] via-[#1B365D] to-[#122846] text-white border-b border-amber-500/40 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-wide">Bhumi Mitra AI</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-semibold rounded-full border border-emerald-500/40">
                    RFCTLARR 2013
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1">
                  <Move className="w-2.5 h-2.5 text-amber-400" /> Drag to reposition
                </div>
              </div>
            </div>

            {/* Window Controls (No Drag) */}
            <div className="flex items-center gap-1 no-drag">
              <button
                onClick={() => setIsMinimized(prev => !prev)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Close Bhumi Mitra"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          {!isMinimized && (
            <>
              {/* Statutory Disclaimer Banner */}
              <div className="px-3 py-1.5 bg-amber-950/40 border-b border-amber-600/30 flex items-center justify-between text-[11px] text-amber-200">
                <span className="flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  Statutory AI Advisory • RFCTLARR Compliant
                </span>
                <span className="text-[10px] text-amber-300/80">Sec 26-30 / Sec 15</span>
              </div>

              {/* Chat Message Stream */}
              <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-950/95 scrollbar-thin scrollbar-thumb-slate-700">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-800/90 text-slate-100 border border-slate-700 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                      
                      {/* Statutory Citations Badge */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2 pt-1.5 border-t border-slate-700/60 flex flex-wrap gap-1">
                          {msg.citations.map((cite, cIdx) => (
                            <span 
                              key={cIdx} 
                              className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/30"
                            >
                              § {cite}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs px-2 py-1">
                    <Bot className="w-4 h-4 text-amber-400 animate-spin" />
                    <span>Bhumi Mitra is reading RFCTLARR provisions...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none no-drag">
                {quickPrompts.slice(0, 3).map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-amber-400/50 transition-colors cursor-pointer text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Message Input Box (No Drag) */}
              <div className="p-3 bg-slate-900/95 border-t border-slate-800 no-drag">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about Solatium, Objections, Awards..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-all cursor-pointer shadow-md"
                    title="Send Question"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
