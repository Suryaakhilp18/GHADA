import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, HeartHandshake, ArrowRight, CheckCircle2, AlertCircle, Coins, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC<{ onOpenSaveModal?: () => void }> = () => {
  const { t } = useApp();

  return (
    <div className="space-y-24 pb-12">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-bronze/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Emergency-First Financial Safety Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold text-ivory tracking-tight leading-[1.1]">
                Save First. <br />
                <span className="bg-gradient-to-r from-gold via-gold-light to-bronze bg-clip-text text-transparent">
                  Invest Second.
                </span> <br />
                <span className="text-ivory-dark font-semibold">Borrow Last.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-ivory-muted max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Ghada helps you build a financial safety net around the way you actually earn and save. <span className="text-gold font-semibold">₹20 today can be the beginning of ₹5,000 tomorrow.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-base shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Build My Safety Fund</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/40 text-ivory font-bold text-base transition-all text-center"
                >
                  See How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ivory-dark border-t border-dark-border/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>No Minimum Savings Requirement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Bilingual AI Coach (English & Telugu)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Behavioral Protection Lock</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Digital Pot Concept */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="aspect-square rounded-3xl bg-gradient-to-b from-dark-elevated/80 to-dark-card border border-gold/30 p-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />

                  {/* Animated Digital Clay Pot Metaphor SVG */}
                  <div className="relative z-10 w-36 h-36 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gold/10 animate-ping opacity-25" />
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gold drop-shadow-xl">
                      {/* Pot Neck & Rim */}
                      <ellipse cx="50" cy="20" rx="22" ry="7" fill="#D4AF6A" opacity="0.9" />
                      <ellipse cx="50" cy="20" rx="16" ry="4" fill="#0D0D0D" />
                      {/* Pot Body */}
                      <path
                        d="M 32,24 C 32,24 20,42 20,62 C 20,80 33,90 50,90 C 67,90 80,80 80,62 C 80,42 68,24 68,24"
                        fill="url(#potGradient)"
                        stroke="#D4AF6A"
                        strokeWidth="3"
                      />
                      {/* Gold Coins Inside */}
                      <circle cx="50" cy="58" r="14" fill="#E6C88B" stroke="#B38F48" strokeWidth="2" />
                      <text x="50" y="63" textAnchor="middle" fill="#0D0D0D" fontSize="14" fontWeight="bold">₹</text>

                      <defs>
                        <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#171717" />
                          <stop offset="50%" stopColor="#222222" />
                          <stop offset="100%" stopColor="#9E8050" opacity="0.4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <span className="text-xs uppercase tracking-widest font-bold text-gold">
                      The Digital Ghada
                    </span>
                    <h3 className="text-2xl font-bold text-ivory">₹10 • ₹20 • ₹50</h3>
                    <p className="text-xs text-ivory-dark max-w-xs">
                      Small regular drops build an unbreakable financial cushion over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-card via-dark-elevated to-dark-card border border-gold/30 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
              Core Product Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight">
              Small savings. Stronger safety.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-dark-bg/80 border border-gold/40 text-center space-y-1">
                <div className="text-gold font-extrabold text-sm">01 SAVE</div>
                <div className="text-ivory font-bold text-xs">Emergency Cushion</div>
                <p className="text-[11px] text-ivory-dark">₹20–₹50 daily</p>
              </div>
              <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border text-center space-y-1">
                <div className="text-gold-light font-extrabold text-sm">02 PROTECT</div>
                <div className="text-ivory font-bold text-xs">Insurance Literacy</div>
                <p className="text-[11px] text-ivory-dark">Health & work safety</p>
              </div>
              <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border text-center space-y-1">
                <div className="text-ivory-dark font-extrabold text-sm">03 INVEST</div>
                <div className="text-ivory font-bold text-xs">Digital Gold / FD</div>
                <p className="text-[11px] text-ivory-dark">After ₹5,000 safety</p>
              </div>
              <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border text-center space-y-1">
                <div className="text-ivory-dark font-extrabold text-sm">04 BORROW</div>
                <div className="text-ivory font-bold text-xs">Transparent Credit</div>
                <p className="text-[11px] text-ivory-dark">Only when essential</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="p-8 rounded-3xl bg-dark-card border border-terracotta/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-terracotta/15 text-terracotta flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-ivory">The Challenge for Irregular Income</h3>
            <p className="text-sm text-ivory-dark leading-relaxed">
              When income varies month to month, traditional banks demand high fixed savings minimums. A sudden ₹500 medical bill or vehicle breakdown forces workers into predatory informal loans with crippling interest.
            </p>
          </div>

          {/* Solution */}
          <div className="p-8 rounded-3xl bg-dark-card border border-gold/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-ivory">The Ghada Solution</h3>
            <p className="text-sm text-ivory-dark leading-relaxed">
              Ghada removes fixed pressure. Save ₹20 when work is tight, or ₹100 when earnings are good. Built-in behavioral protection ensures your cushion is there when a true crisis hits.
            </p>
          </div>
        </div>
      </section>

      {/* 5-STEP JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-gold">Simple 5-Step Cycle</span>
          <h2 className="text-3xl font-extrabold text-ivory">How Ghada Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { step: '1', title: 'Set Goal', desc: 'Default ₹5,000 safety cushion' },
            { step: '2', title: 'Save Small', desc: 'Flexible ₹20, ₹50, ₹100 deposits' },
            { step: '3', title: 'Build Cushion', desc: 'Track progress & milestones' },
            { step: '4', title: 'Use in Need', desc: 'Behavioral emergency access' },
            { step: '5', title: 'Rebuild', desc: 'Gentle step-by-step restoration' },
          ].map((item, idx) => (
            <div key={item.step} className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2 text-center relative">
              <div className="w-8 h-8 rounded-full bg-gold/20 text-gold font-bold text-xs flex items-center justify-center mx-auto border border-gold/30">
                {item.step}
              </div>
              <h4 className="text-sm font-bold text-ivory">{item.title}</h4>
              <p className="text-xs text-ivory-dark">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
