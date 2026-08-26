import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AI_COACH_KNOWLEDGE } from '../data/mockData';
import { Sparkles, Send, Globe, Bot, User, HelpCircle, Shield } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}

export const CoachPage: React.FC = () => {
  const { user, language, setLanguage, currentBalance, t } = useApp();

  const initialCoachGreeting = language === 'te'
    ? `నమస్తే ${user.name}! నేను మీ ఘటా (Ghada) AI ఆర్థిక కోచ్‌ని. మీ వద్ద ప్రస్తుతం ₹${currentBalance.toLocaleString('en-IN')} ఎమర్జెన్సీ ఫండ్ ఉంది. పొదుపు లేదా మీ లక్ష్యాల గురించి ఏమైనా అడగండి.`
    : `Namaste ${user.name}! I am your Ghada AI Financial Coach. You currently have ₹${currentBalance.toLocaleString('en-IN')} in your Emergency Fund. Ask me anything about saving, goals, or financial protection.`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      sender: 'coach',
      text: initialCoachGreeting,
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const suggestedPrompts = [
    { en: 'How much should I save daily?', te: 'నేను రోజూ ఎంత దాచాలి?' },
    { en: 'What is an emergency fund?', te: 'ఎమర్జెన్సీ ఫండ్ అంటే ఏమిటి?' },
    { en: 'How close am I to my goal?', te: 'నా లక్ష్యానికి నేను ఎంత సమీపంలో ఉన్నాను?' },
    { en: 'Can I use my emergency fund?', te: 'నా ఎమర్జెన్సీ ఫండ్‌ను వాడొచ్చా?' },
    { en: 'Explain investing simply', te: 'పెట్టుబడి గురించి సరళంగా వివరించండి' },
  ];

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Simulate AI thinking & matching logic
    setTimeout(() => {
      const matched = AI_COACH_KNOWLEDGE.find(k =>
        k.keywords.some(kw => queryText.toLowerCase().includes(kw.toLowerCase()))
      );

      let responseContent = '';
      if (matched) {
        responseContent = language === 'te' && matched.te ? matched.te : matched.en;
      } else {
        responseContent = language === 'te'
          ? `నమస్తే ${user.name}! ప్రస్తుతం మీ ఎమర్జెన్సీ ఫండ్‌లో ₹${currentBalance.toLocaleString()} ఉన్నాయి (లక్ష్యం ₹${user.emergencyTarget.toLocaleString()}). మీ బడ్జెట్, ఖర్చులు లేదా పొదుపు గురించి మీకు ఏమి తెలుసుకోవాలనుంది?`
          : `Hello ${user.name}! 👋 I hear you! Currently, you have ₹${currentBalance.toLocaleString()} in your Emergency Fund (${Math.round((currentBalance / user.emergencyTarget) * 100)}% of your ₹${user.emergencyTarget.toLocaleString()} goal). How can I assist you specifically with your savings, budget, expenses, or debts today?`;
      }

      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, coachMsg]);
      setIsThinking(false);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-dark-card border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center shadow-gold-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-ivory tracking-tight">
              Ghada AI Financial Coach
            </h1>
            <p className="text-xs text-ivory-dark mt-0.5">
              Personalized guidance in <span className="text-gold font-semibold">English & Telugu (తెలుగు)</span>
            </p>
          </div>
        </div>

        {/* Quick Language Toggle */}
        <div className="flex items-center gap-2 bg-dark-elevated p-1.5 rounded-xl border border-dark-border">
          <Globe className="w-4 h-4 text-gold ml-1" />
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              language === 'en' ? 'bg-gold text-dark-bg' : 'text-ivory-dark'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('te')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              language === 'te' ? 'bg-gold text-dark-bg' : 'text-ivory-dark'
            }`}
          >
            తెలుగు
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ivory-dark flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          Suggested Questions
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p, idx) => {
            const label = language === 'te' ? p.te : p.en;
            return (
              <button
                key={idx}
                onClick={() => handleSendQuery(label)}
                className="px-3.5 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-gold/40 text-xs font-medium text-ivory transition-all text-left"
              >
                💡 {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map(msg => {
          const isCoach = msg.sender === 'coach';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isCoach ? 'justify-start' : 'justify-end'}`}
            >
              {isCoach && (
                <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold border border-gold/40 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-lg p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                  isCoach
                    ? 'bg-dark-elevated border border-gold/20 text-ivory'
                    : 'bg-gold text-dark-bg font-semibold ml-auto'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`text-[10px] text-right ${
                    isCoach ? 'text-ivory-dark' : 'text-dark-bg/80'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {!isCoach && (
                <div className="w-8 h-8 rounded-xl bg-gold text-dark-bg font-bold flex items-center justify-center shrink-0 text-xs mt-1">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-3 text-xs text-gold">
            <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold border border-gold/40 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-dark-elevated border border-gold/20 italic animate-pulse">
              Ghada Coach is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendQuery(inputText);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={
            language === 'te'
              ? 'మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...'
              : 'Ask Ghada AI Coach about your savings...'
          }
          className="flex-1 px-4 py-3.5 rounded-2xl bg-dark-card border border-dark-border text-ivory text-sm placeholder-ivory-dark/60 focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-bold shadow-gold-sm hover:brightness-110 disabled:opacity-40 transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Responsible AI Disclaimer */}
      <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border text-[11px] text-ivory-dark flex items-center gap-2">
        <Shield className="w-4 h-4 text-gold shrink-0" />
        <span>
          Ghada AI Coach provides general financial education. It does not promise investment returns or replace certified legal advice.
        </span>
      </div>
    </div>
  );
};
