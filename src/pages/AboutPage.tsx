import React from 'react';
import { Logo } from '../components/common/Logo';
import { HeartHandshake, Shield, Sparkles, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ivory tracking-tight">
          Financial Dignity for Irregular Earnings
        </h1>
        <p className="text-base text-ivory-muted leading-relaxed">
          Ghada was created on a simple truth: high finance was built for people with monthly salaries, leaving India's construction workers, drivers, small vendors, and domestic workers vulnerable to emergencies.
        </p>
      </div>

      {/* Clay Pot Metaphor Story */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-dark-card to-dark-elevated border border-gold/30 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-ivory">The Ancient Clay Pot Metaphor</h2>
          <p className="text-sm text-ivory-dark leading-relaxed">
            In Indian households, a traditional clay Ghada pot does not demand thousands of rupees at once. It welcomes small coins—a ₹10 coin today, ₹20 tomorrow, ₹50 after a good workday.
          </p>
          <p className="text-sm text-ivory-dark leading-relaxed">
            Eventually, those humble daily coins accumulate into a formidable safety shield when a family emergency or health crisis strikes. Ghada digitizes this wisdom with modern security and AI guidance.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-40 h-40 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center shadow-gold-glow">
            <Logo size="lg" showTagline={true} />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-3">
          <Shield className="w-8 h-8 text-gold" />
          <h3 className="text-lg font-bold text-ivory">Dignity + Simplicity</h3>
          <p className="text-xs text-ivory-dark leading-relaxed">
            No shaming for small amounts. Every ₹20 saved is celebrated as a step toward financial control.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-3">
          <HeartHandshake className="w-8 h-8 text-gold" />
          <h3 className="text-lg font-bold text-ivory">Bilingual AI Coach</h3>
          <p className="text-xs text-ivory-dark leading-relaxed">
            Local language financial education in Telugu & English without jargon or aggressive upselling.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-3">
          <Target className="w-8 h-8 text-gold" />
          <h3 className="text-lg font-bold text-ivory">Save First Philosophy</h3>
          <p className="text-xs text-ivory-dark leading-relaxed">
            We introduce investments only after basic emergency safety cushion (₹5,000) is fully established.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/signup"
          className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-extrabold text-sm shadow-gold-glow hover:brightness-110 transition-all"
        >
          Start Building Your Safety Fund
        </Link>
      </div>
    </div>
  );
};
