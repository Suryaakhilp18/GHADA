import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionType } from '../types';
import { ArrowDownLeft, ArrowUpRight, Award, History, Filter } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'milestone'>('all');

  const filtered = transactions.filter(tx => (filter === 'all' ? true : tx.type === filter));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory tracking-tight">
            Savings Activity
          </h1>
          <p className="text-xs text-ivory-dark mt-1">
            Complete history of your emergency savings & withdrawals
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-dark-card border border-dark-border rounded-xl text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'deposit', label: 'Savings' },
            { id: 'withdrawal', label: 'Withdrawals' },
            { id: 'milestone', label: 'Milestones' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                filter === f.id
                  ? 'bg-gold text-dark-bg font-bold shadow-gold-sm'
                  : 'text-ivory-dark hover:text-ivory'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-dark-card border border-dark-border rounded-3xl space-y-2">
            <History className="w-8 h-8 text-ivory-dark mx-auto" />
            <h3 className="text-base font-bold text-ivory">No transactions found</h3>
            <p className="text-xs text-ivory-dark">Your savings journey starts here.</p>
          </div>
        ) : (
          filtered.map(tx => {
            const isDeposit = tx.type === 'deposit';
            const isWithdrawal = tx.type === 'withdrawal';
            const isMilestone = tx.type === 'milestone';

            return (
              <div
                key={tx.id}
                className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-dark-border/80 flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                      isDeposit
                        ? 'bg-gold/15 text-gold border border-gold/30'
                        : isWithdrawal
                        ? 'bg-terracotta/15 text-terracotta border border-terracotta/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {isDeposit && <ArrowDownLeft className="w-5 h-5" />}
                    {isWithdrawal && <ArrowUpRight className="w-5 h-5" />}
                    {isMilestone && <Award className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-ivory">{tx.description}</div>
                    <div className="text-xs text-ivory-dark mt-0.5 flex items-center gap-2">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="capitalize">{tx.category || tx.type}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-base font-extrabold ${
                      isDeposit
                        ? 'text-gold'
                        : isWithdrawal
                        ? 'text-terracotta'
                        : 'text-amber-400'
                    }`}
                  >
                    {isWithdrawal ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                  </div>
                  {tx.emergencyReason && (
                    <div className="text-[10px] text-terracotta font-medium mt-0.5">
                      {tx.emergencyReason}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
