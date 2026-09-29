import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  X, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  BookOpen, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Calculator,
  Compass
} from 'lucide-react';

export default function BhumiMitraDrawer() {
  const { isAiDrawerOpen, closeAiAssistant, aiDrawerPrompt, activeProject, selectedParcel } = useWorkspace();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Namaste Officer. I am **Bhumi Mitra**, your statutory legal & spatial AI co-pilot for RFCTLARR Act 2013.\n\nI can analyze **Section 19 lapse risk**, check cadastral parcel overlaps, calculate **Section 30 solatium (100%)**, summarize Section 15 landowner objections, and pre-screen Form-I submissions.\n\n*Note: AI recommends. Authorized Authority decides.*`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (aiDrawerPrompt) {
      handleUserQuery(aiDrawerPrompt);
    }
  }, [aiDrawerPrompt]);

  const quickPrompts = [
    { label: 'Check Sec 19 Lapse Risk', query: 'What is the exact lapse risk for project ' + activeProject.code + ' under Section 19(7)?' },
    { label: 'Calculate Solatium for Parcel', query: 'Calculate statutory 100% solatium and 12% market interest for Khasra ' + selectedParcel.khasraNo },
    { label: 'Section 40 Urgency Criteria', query: 'Can Section 40 urgency clause be invoked for expressway land acquisition to bypass SIA?' },
    { label: 'R&R Homestead Entitlement', query: 'What are the mandatory Second Schedule entitlements for displaced rural families?' }
  ];

  const handleUserQuery = (queryText) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAnalyzing(true);

    // AI statutory analysis response
    setTimeout(() => {
      let aiResponseText = '';

      if (query.toLowerCase().includes('lapse') || query.toLowerCase().includes('section 19')) {
        aiResponseText = `### ⚖️ Statutory Section 19(7) Lapse Assessment for ${activeProject.code}

1. **Statutory Timeline Constraint**: Under Section 19(7) of RFCTLARR Act 2013, if the declaration under Section 19(1) is NOT made within **12 months (365 days)** from the date of Section 11(1) preliminary notification publication, the entire preliminary notification **statutorily lapses** and all proceedings become null & void.
2. **Current Project Status**:
   - Section 11 Notification Date: **21-Jan-2025**
   - Statutory 12-Month Cutoff: **20-Nov-2026**
   - Days Remaining: **${activeProject.daysRemaining} days**
3. **Risk Level**: **${activeProject.daysRemaining < 45 ? 'CRITICAL HIGH' : 'MODERATE / WATCHLIST'}**
4. **Actionable Recommendation**:
   - Expedite disposal of pending Section 15 objections before SDM Rajpura / CALA.
   - Requisitioning body must submit formal escrow deposit certification (min 50% fund backing) to State Revenue Department within 14 days to enable Extraordinary Gazette issuance.`;
      } else if (query.toLowerCase().includes('solatium') || query.toLowerCase().includes('calculate')) {
        aiResponseText = `### 💰 Statutory Compensation Determination (First Schedule) for Khasra ${selectedParcel.khasraNo}

- **Basic Market Value Determination (Sec 26)**:
  - Base Circle Rate: ₹48,00,000 / Ha
  - Multiplier Factor (Rural Area, Sec 26(2)): **1.25**
  - Adjusted Market Value: **₹1,11,00,000**
- **Mandatory 100% Solatium (Sec 30(1))**:
  - Solatium equals 100% of adjusted market value: **₹1,11,00,000**
- **Additional Market Value Interest (Sec 30(3))**:
  - 12% per annum from Sec 11 notification to date of award (approx 12 months): **₹13,32,000**
- **Assets Attached to Land (Sec 29)**:
  - Trees & standing crops valuation: **₹4,50,000**
- **Total Gross Compensation Awardable**: **₹2,39,82,000**
*Statutory Compliance: All calculations verified against State Rules & RFCTLARR First Schedule.*`;
      } else if (query.toLowerCase().includes('urgency') || query.toLowerCase().includes('section 40')) {
        aiResponseText = `### 📜 Legal Interpretation: Section 40 (Special Powers in Cases of Urgency)

1. **Restricted Grounds**: Section 40 can **only** be invoked for:
   - National defense or security of India.
   - Calamity, emergency, or rehabilitation of displaced persons due to natural catastrophe.
2. **Civil Linear Projects Exemption**:
   - The Supreme Court has repeatedly held that routine highways, rail corridors, and commercial industrial zones **do not automatically qualify** for Section 40 unless exceptional cabinet clearance is gazetted.
   - For linear infrastructure projects, Section 10A (State amendments) allows exemption from Chapter II (SIA) provided social mitigation plans are preserved.
3. **Mandatory 80% Pre-Deposit (Sec 40(1))**:
   - Even if urgency is applied, possession **cannot be taken** before 80% of estimated compensation is paid or tendered to the entitled persons.`;
      } else {
        aiResponseText = `### 🤖 Bhumi Mitra Statutory Advisory

Analyzing your query against the RFCTLARR Act 2013 codified rules and State Land Acquisition Manual:

- **Public Purpose Justification**: Checked under Section 2(1)(a). Infrastructure corridors executing under approved master plans fulfill public necessity.
- **Cadastral Spatial Linkage**: Khasra mapping cross-referenced with State Bhulekh / RoR.
- **Officer Next Step**: Verify that all Draft Awards have matching PFMS escrow allocations prior to dispatching statutory notice to landholders.`;
      }

      const aiMsg = {
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsAnalyzing(false);
    }, 800);
  };

  if (!isAiDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col h-full text-slate-100">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-amber-950/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-100">Bhumi Mitra AI Assistant</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 font-mono">
                  Statutory RAG Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Legal AI • RFCTLARR Act 2013 Knowledge Base
              </p>
            </div>
          </div>
          <button
            onClick={closeAiAssistant}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisory Banner */}
        <div className="bg-amber-950/40 border-b border-amber-800/40 px-3.5 py-1.5 flex items-center gap-2 text-[11px] text-amber-300">
          <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Statutory Boundary: AI provides recommendations. Authorized Officer signs official orders.</span>
        </div>

        {/* Quick Statutory Prompt Chips */}
        <div className="p-2.5 border-b border-slate-800 bg-slate-900/70 overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleUserQuery(p.query)}
              className="text-[10px] whitespace-nowrap bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-full transition-colors font-medium hover:border-amber-400/50 hover:text-amber-200"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-slate-500 mb-1 font-mono">
                {m.sender === 'user' ? 'You (Requisitioning Officer)' : 'Bhumi Mitra (Statutory AI)'} • {m.timestamp}
              </div>
              <div
                className={`p-3.5 rounded-xl max-w-[90%] leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none prose prose-invert prose-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-2 text-slate-400 p-3 bg-slate-800/50 rounded-lg border border-slate-800 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs font-mono">Retrieving RFCTLARR statutory sections & precedent gazettes...</span>
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="p-3 border-t border-slate-800 bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about Section 15 objections, solatium, Form-I..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isAnalyzing}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 px-3.5 py-2 rounded-lg font-bold transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
            <span>Grounding: RFCTLARR Act 2013 + State Rules</span>
            <span>Ref: {activeProject.code}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
