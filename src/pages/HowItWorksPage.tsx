import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Plus, RefreshCw, Sparkles, ArrowRight, Lock } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold">Step by Step Guide</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ivory">How Ghada Protects You</h1>
        <p className="text-base text-ivory-muted">
          A financial journey designed specifically for workers with irregular income.
        </p>
      </div>

      <div className="space-y-8">
        {[
          {
            num: '01',
            title: 'Set Your Emergency Safety Goal',
            desc: 'We start by recommending a reachable safety target of ₹5,000. You can adjust this anytime based on your household expenses.',
            icon: ShieldCheck,
          },
          {
            num: '02',
            title: 'Save Small Amounts When You Earn',
            desc: 'Choose preset amounts like ₹20, ₹50, or ₹100. On good workdays, save ₹100. On tight days, save ₹20. If work stops for a few days, skip without penalties or shaming.',
            icon: Plus,
          },
          {
            num: '03',
            title: 'Track Streaks & Milestones',
            desc: 'Watch your progress grow through visual milestones (₹100, ₹500, ₹1,000, ₹3,000, ₹5,000). AI suggestions prompt you when you are close to a milestone.',
            icon: Sparkles,
          },
          {
            num: '04',
            title: 'Use Money For Genuine Emergencies',
            desc: 'When a sudden medical bill or vehicle breakdown happens, access your money instantly. Our behavioral protection friction ensures non-emergency impulse buys are kept at bay.',
            icon: Lock,
          },
          {
            num: '05',
            title: 'Rebuild Slowly & Safely',
            desc: 'After using your emergency fund, Ghada transitions to Rebuild Mode. Gently restore your cushion step-by-step without stress.',
            icon: RefreshCw,
          },
        ].map(step => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-6 rounded-3xl bg-dark-card border border-dark-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center font-extrabold text-xl shrink-0">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-ivory">{step.title}</h3>
                  <p className="text-sm text-ivory-dark leading-relaxed">{step.desc}</p>
                </div>
              </div>
              <div className="shrink-0 text-gold opacity-80 hidden md:block">
                <Icon className="w-8 h-8" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-gold/20 via-dark-card to-dark-card border border-gold/40 text-center space-y-4">
        <h3 className="text-2xl font-bold text-ivory">Ready to build your first safety fund?</h3>
        <p className="text-xs text-ivory-muted">Consistency matters more than the starting amount.</p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gold text-dark-bg font-extrabold text-sm shadow-gold-sm hover:brightness-110 transition-all"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
