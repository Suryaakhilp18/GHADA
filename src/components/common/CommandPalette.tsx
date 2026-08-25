import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, X, Shield, Calculator, FileText, AlertTriangle, Building2, Home, CreditCard } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { title: 'Ask Ghada AI Anything', path: '/coach', icon: Sparkles, cat: 'AI' },
    { title: 'Ghada Hub & Directory', path: '/hub', icon: Home, cat: 'Hub' },
    { title: 'AI Budget Planner', path: '/budget', icon: CreditCard, cat: 'Money' },
    { title: 'Expense Tracker', path: '/expenses', icon: FileText, cat: 'Money' },
    { title: 'Emergency Safety Cushion', path: '/emergency-fund', icon: Shield, cat: 'Protection' },
    { title: 'Money Calculators', path: '/tools', icon: Calculator, cat: 'Tools' },
    { title: 'Fraud & Scam Safety', path: '/fraud-safety', icon: AlertTriangle, cat: 'Protection' },
    { title: 'B2B2C Partner Portal', path: '/partner', icon: Building2, cat: 'Enterprise' },
  ];

  const filtered = actions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) || a.cat.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Palette Box */}
      <div className="relative w-full max-w-xl bg-dark-card border border-gold/40 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-dark-border bg-dark-elevated/50">
          <Search className="w-5 h-5 text-gold shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask Ghada or search features... (e.g. Budget, Emergency, Fraud)"
            className="flex-1 bg-transparent text-ivory placeholder-ivory-dark/60 text-sm font-semibold focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-ivory-dark hover:text-ivory">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-ivory-dark">
              No matching features. Try searching "Budget" or "Emergency".
            </div>
          ) : (
            filtered.map(act => {
              const Icon = act.icon;
              return (
                <button
                  key={act.path}
                  onClick={() => handleSelect(act.path)}
                  className="w-full p-3 rounded-xl flex items-center justify-between text-left hover:bg-gold/10 border border-transparent hover:border-gold/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-dark-elevated border border-dark-border text-gold group-hover:border-gold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ivory group-hover:text-gold">
                        {act.title}
                      </div>
                      <div className="text-[10px] text-ivory-dark">{act.cat}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gold font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Open →
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
