import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GhadaOrb } from '../common/GhadaOrb';
import { VoiceInputButton } from '../common/VoiceInputButton';
import { processAIQuery } from '../../services/aiEngine';
import { Paperclip, ArrowRight, Sparkles, Globe } from 'lucide-react';

export const AskGhadaAnything: React.FC = () => {
  const navigate = useNavigate();
  const { user, currentBalance, savingStreak } = useApp();
  const [inputText, setInputText] = useState('');
  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const suggestedPrompts = [
    'How should I manage my ₹12,000 salary?',
    'నాకు నెలకు ₹12,000 వస్తుంది. ఎంత సేవ్ చేయాలి?',
    'Help me create a budget.',
    'I spent ₹250 on fuel today.',
    'Explain SIP in simple words.',
    'Is this OTP message a scam?',
  ];

  const handleSubmit = (query: string) => {
    if (!query.trim()) return;
    setOrbState('thinking');

    setTimeout(() => {
      const response = processAIQuery(query, user, { currentBalance, savingStreak });
      setOrbState('idle');

      if (response.navigationTarget) {
        navigate(response.navigationTarget);
      } else {
        navigate('/coach');
      }
    }, 150);
  };

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-dark-card via-dark-elevated to-dark-card border border-gold/40 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header with Ghada AI Orb */}
      <div className="flex items-center gap-4">
        <GhadaOrb state={orbState} size="md" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-ivory tracking-tight uppercase">
              ASK GHADA ANYTHING
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10px] font-bold">
              Multilingual AI
            </span>
          </div>
          <p className="text-xs text-ivory-dark mt-0.5">
            Your money. Your goals. Your questions. One intelligent companion.
          </p>
        </div>
      </div>

      {/* Main Input Form Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(inputText);
        }}
        className="flex items-center gap-2 p-2 bg-dark-bg border border-gold/30 rounded-2xl shadow-inner focus-within:border-gold transition-colors"
      >
        <VoiceInputButton
          onSpeechResult={text => {
            setInputText(text);
            handleSubmit(text);
          }}
          onListeningStateChange={isL => setOrbState(isL ? 'listening' : 'idle')}
        />

        <button
          type="button"
          onClick={() => navigate('/documents')}
          className="p-3 rounded-2xl bg-dark-elevated border border-dark-border text-ivory-dark hover:text-gold hover:border-gold/40 transition-colors"
          title="Upload Bank Statement or Document"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask anything about your money in English, Telugu, Hindi..."
          className="flex-1 bg-transparent px-3 text-ivory placeholder-ivory-dark/60 text-sm font-semibold focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-extrabold shadow-gold-sm hover:brightness-110 disabled:opacity-40 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Suggested Prompt Pills */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-wider font-extrabold text-gold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-gold" />
          Suggested Questions (Click to Ask)
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(prompt);
                handleSubmit(prompt);
              }}
              className="px-3 py-1.5 rounded-xl bg-dark-elevated border border-dark-border hover:border-gold/40 text-xs font-medium text-ivory transition-all text-left"
            >
              💡 {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
