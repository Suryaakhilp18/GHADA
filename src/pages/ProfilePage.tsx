import React from 'react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from '../components/features/LanguageSelector';
import { User, Shield, Lock, RotateCcw, Bell, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, loadDemoUser, resetDemoData } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* User Header */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-gold/20 text-gold font-extrabold text-2xl flex items-center justify-center border border-gold/40 shadow-gold-sm">
          {user.name.charAt(0)}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-ivory">{user.name}</h1>
          <p className="text-xs text-ivory-dark">
            {user.occupation} Worker • {user.incomeRange} monthly range • {user.incomePattern} income
          </p>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
            <span>Safety Target: ₹{user.emergencyTarget.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-sm font-bold text-ivory uppercase tracking-wider flex items-center gap-2">
          <GlobeIcon className="w-4 h-4 text-gold" />
          <span>App & AI Language Settings</span>
        </h3>
        <LanguageSelector compact={false} />
      </div>

      {/* Privacy & Security UX */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-sm font-bold text-ivory uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-gold" />
          <span>Privacy & Data Security Principles</span>
        </h3>
        <div className="space-y-3 text-xs text-ivory-dark leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>Minimal data collection — only essential goal preferences stored.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>No sharing of personal financial records with third parties or employers.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>Designed with privacy and security principles in mind.</span>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="p-6 rounded-3xl bg-dark-card border border-gold/30 space-y-4">
        <h3 className="text-sm font-bold text-gold uppercase tracking-wider flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Demo Engine & Reset Controls</span>
        </h3>
        <p className="text-xs text-ivory-dark">
          This prototype runs on local state. You can reload your demo profile or clear all custom savings transactions anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={loadDemoUser}
            className="px-5 py-2.5 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-bold hover:bg-gold/25 transition-all"
          >
            Reload Demo Profile
          </button>
          <button
            onClick={resetDemoData}
            className="px-5 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory-dark hover:text-ivory text-xs transition-all"
          >
            Reset All Demo Data
          </button>
        </div>
      </div>
    </div>
  );
};

function GlobeIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}
