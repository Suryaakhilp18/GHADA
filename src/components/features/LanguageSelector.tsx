import React from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useApp();

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-lg p-1">
        <Globe className="w-4 h-4 text-gold ml-1.5" />
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as Language)}
          className="bg-transparent text-xs text-ivory font-medium focus:outline-none cursor-pointer pr-2"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="bg-dark-card text-ivory">
              {lang.nativeName} ({lang.code.toUpperCase()})
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {languages.map(lang => {
        const isSelected = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`p-3 rounded-xl border text-left transition-all ${
              isSelected
                ? 'bg-gold/15 border-gold text-gold font-bold shadow-gold-sm'
                : 'bg-dark-card border-dark-border text-ivory-dark hover:text-ivory hover:border-dark-border/80'
            }`}
          >
            <div className="text-base font-semibold">{lang.nativeName}</div>
            <div className="text-xs opacity-75">{lang.label}</div>
          </button>
        );
      })}
    </div>
  );
};
