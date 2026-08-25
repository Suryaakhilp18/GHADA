import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Sparkles, CheckCircle2, ArrowRight, PieChart } from 'lucide-react';

export const AIBudgetPage: React.FC = () => {
  const { user, createBudget, budgetPlan } = useApp();
  const [monthlyIncome, setMonthlyIncome] = useState<number>(user.monthlyIncome || 12000);
  const [applied, setApplied] = useState(false);

  const essential = Math.round(monthlyIncome * 0.5);
  const flexible = Math.round(monthlyIncome * 0.2);
  const emergencySavings = Math.round(monthlyIncome * 0.15);
  const buffer = monthlyIncome - (essential + flexible + emergencySavings);

  const allocations = [
    { category: 'Rent & Utilities', amount: Math.round(monthlyIncome * 0.28), pct: 28 },
    { category: 'Food & Groceries', amount: Math.round(monthlyIncome * 0.22), pct: 22 },
    { category: 'Emergency Safety Fund', amount: emergencySavings, pct: 15 },
    { category: 'Transport & Work', amount: Math.round(monthlyIncome * 0.12), pct: 12 },
    { category: 'Flexible & Family', amount: flexible, pct: 20 },
    { category: 'Buffer Reserve', amount: buffer, pct: 3 },
  ];

  const handleApply = () => {
    createBudget({
      income: monthlyIncome,
      essential,
      flexible,
      emergencySavings,
      goals: Math.round(monthlyIncome * 0.05),
      buffer,
      allocations: allocations.map(a => ({ category: a.category, amount: a.amount, percentage: a.pct })),
    });
    setApplied(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-card border border-gold/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-ivory">Ghada AI Budget Planner</h1>
            <p className="text-xs text-ivory-dark mt-0.5">
              Adapts to your earning reality • Save First philosophy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-ivory-dark font-semibold">Monthly Income:</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gold font-bold text-xs">₹</span>
            <input
              type="number"
              value={monthlyIncome}
              onChange={e => {
                setMonthlyIncome(parseFloat(e.target.value) || 0);
                setApplied(false);
              }}
              className="w-32 pl-7 pr-3 py-1.5 rounded-xl bg-dark-elevated border border-gold/40 text-ivory text-xs font-bold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {applied && (
        <div className="p-4 rounded-2xl bg-gold/15 border border-gold text-gold text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Custom AI Budget Plan applied to your active Ghada profile!</span>
        </div>
      )}

      {/* 4 Category Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-[10px] uppercase font-bold text-ivory-dark">Essential Expenses (50%)</span>
          <div className="text-2xl font-extrabold text-ivory">₹{essential.toLocaleString('en-IN')}</div>
          <p className="text-[10px] text-ivory-dark">Rent, Food, Utilities</p>
        </div>

        <div className="p-4 rounded-2xl bg-gold/15 border border-gold space-y-1">
          <span className="text-[10px] uppercase font-bold text-gold">Emergency Savings (15%)</span>
          <div className="text-2xl font-extrabold text-gold">₹{emergencySavings.toLocaleString('en-IN')}</div>
          <p className="text-[10px] text-gold/80">Save First Cushion</p>
        </div>

        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-[10px] uppercase font-bold text-ivory-dark">Flexible Expenses (20%)</span>
          <div className="text-2xl font-extrabold text-ivory">₹{flexible.toLocaleString('en-IN')}</div>
          <p className="text-[10px] text-ivory-dark">Personal & Family</p>
        </div>

        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-[10px] uppercase font-bold text-ivory-dark">Buffer Reserve (15%)</span>
          <div className="text-2xl font-extrabold text-ivory">₹{buffer.toLocaleString('en-IN')}</div>
          <p className="text-[10px] text-ivory-dark">Unplanned needs</p>
        </div>
      </div>

      {/* Detailed Allocations Breakdown */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-sm font-bold text-ivory uppercase tracking-wider flex items-center gap-2">
          <PieChart className="w-4 h-4 text-gold" />
          <span>Recommended Category Breakdown</span>
        </h3>

        <div className="space-y-3">
          {allocations.map((a, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-dark-elevated border border-dark-border space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-ivory">{a.category}</span>
                <span className="text-gold">₹{a.amount.toLocaleString('en-IN')} ({a.pct}%)</span>
              </div>
              <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden border border-dark-border">
                <div className="bg-gold h-full" style={{ width: `${a.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleApply}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <span>Apply This Budget Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
