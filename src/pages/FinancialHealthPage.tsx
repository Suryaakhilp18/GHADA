import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, ShieldCheck, Flame, Target, PieChart, Sparkles } from 'lucide-react';

export const FinancialHealthPage: React.FC = () => {
  const { financialHealth } = useApp();

  const pillars = [
    { name: 'Emergency Cushion', score: financialHealth.emergencyCushionScore, icon: ShieldCheck },
    { name: 'Savings Habit & Streak', score: financialHealth.savingsHabitScore, icon: Flame },
    { name: 'Goal Progress', score: financialHealth.goalProgressScore, icon: Target },
    { name: 'Budget Health', score: financialHealth.budgetHealthScore, icon: PieChart },
    { name: 'Financial Literacy', score: financialHealth.awarenessScore, icon: Sparkles },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold flex items-center justify-center gap-1">
          <Activity className="w-4 h-4" />
          Multi-Pillar Protection Score
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">My Financial Health</h1>
        <p className="text-xs text-ivory-dark max-w-md mx-auto">
          Ghada demo indicators measuring your financial resilience.
        </p>
      </div>

      {/* Main Big Score Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-gold/15 via-dark-card to-dark-card border border-gold/40 shadow-2xl text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-ivory-dark">
          Overall Financial Resilience Score
        </span>
        <div className="text-6xl font-extrabold text-gold tracking-tight">
          {financialHealth.overallScore} <span className="text-xl font-normal text-ivory-dark">/ 100</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold">
          <span>Strong Emergency Preparedness</span>
        </div>
      </div>

      {/* 5 Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-3">
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-gold" />
                <span className="text-xs font-extrabold text-gold">{p.score}%</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-ivory">{p.name}</h4>
                <div className="w-full bg-dark-elevated h-2 rounded-full overflow-hidden mt-2 border border-dark-border">
                  <div className="bg-gold h-full" style={{ width: `${Math.min(100, p.score)}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
