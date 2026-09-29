import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Scale, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Bot
} from 'lucide-react';

export default function BhumiMitraPublicDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am Bhumi Mitra (भूमि मित्र), your digital statutory assistant for the RFCTLARR Act, 2013. How may I assist you with your land acquisition, compensation formula, or R&R entitlements today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    'How is 100% Solatium calculated under Section 30?',
    'What is the deadline for filing Section 15 objections?',
    'Are tenants entitled to R&R housing & subsistence grant?',
    'How do I file a Section 64 reference to the LARR Authority?'
  ];

  const handleSendMessage = (textToSend) => {
    const q = (textToSend || inputText).trim();
    if (!q) return;

    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Pre-calculated statutory answer intelligence
    setTimeout(() => {
      let botReply = '';
      const lower = q.toLowerCase();

      if (lower.includes('solatium') || lower.includes('section 30')) {
        botReply = 'Under Section 30(1) of the RFCTLARR Act 2013, the Collector MUST award 100% Solatium on the total determined value of land plus assets. For example, if your multiplied land value is ₹20 Lakh and trees/well are ₹2 Lakh (Total ₹22 Lakh), you will receive an additional 100% Solatium of ₹22 Lakh, making the subtotal ₹44 Lakh (before 12% annual interest).';
      } else if (lower.includes('objection') || lower.includes('section 15')) {
        botReply = 'Under Section 15(1), any person interested in land has exactly 60 DAYS from the date of publication of the Section 11 Preliminary Notification in the Gazette to submit written objections to the Collector regarding the public purpose, area of land, or suitability.';
      } else if (lower.includes('tenant') || lower.includes('r&r') || lower.includes('subsistence')) {
        botReply = 'Yes! The Second Schedule of RFCTLARR Act 2013 expressly protects agricultural tenants and livelihood-affected families. Even if you do not hold ownership title, you are entitled to: (1) Constructed house or ₹3.5 Lakh, (2) Subsistence grant of ₹3,000/month for 12 months, and (3) ₹50,000 shifting allowance.';
      } else if (lower.includes('reference') || lower.includes('tribunal') || lower.includes('section 64')) {
        botReply = 'If you do not accept the Collector’s award, you may submit a written application to the Collector within 6 WEEKS under Section 64 requiring that the matter be referred to the Land Acquisition, Rehabilitation and Resettlement (LARR) Authority for judicial enhancement of compensation.';
      } else {
        botReply = 'Thank you for your inquiry. Under the RFCTLARR Act 2013, all procedures must adhere strictly to statutory timelines. You can search your ULPIN on the portal or consult your District Collectorate (CALA office) for case-specific docket inspections.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l-2 border-[#1B365D] flex flex-col font-sans select-none animate-in slide-in-from-right duration-200">
      
      {/* Drawer Top Header */}
      <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between border-b-2 border-[#C5A059]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-slate-950 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
              <span>Bhumi Mitra (भूमि मित्र)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                AI SUPPORT
              </span>
            </h3>
            <div className="text-[10px] text-slate-300">
              Statutory Citizen Legal Decision Support
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] text-xs">
        {messages.map((m, idx) => (
          <div 
            key={idx} 
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
              m.sender === 'user'
                ? 'bg-[#1B365D] text-white rounded-br-none shadow-xs'
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Suggested Statutory Inquiries:
        </div>
        <div className="space-y-1">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="w-full text-left p-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 hover:text-[#1B365D] transition-colors cursor-pointer truncate"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question about RFCTLARR 2013..."
          className="flex-1 p-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#1B365D]"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-[#1B365D] text-[#C5A059] hover:bg-[#142642] cursor-pointer transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 text-[9px] text-slate-500 text-center">
        AI Decision Support is informational. Statutory decisions are sealed by the Competent Authority.
      </div>
    </div>
  );
}
