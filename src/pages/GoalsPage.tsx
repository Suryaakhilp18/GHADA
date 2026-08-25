import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, HeartPulse, Wrench, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const GoalsPage: React.FC = () => {
  const { goals, currentBalance, user } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
          Structured Financial Path
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">Financial Goals</h1>
        <p className="text-xs text-ivory-dark max-w-md mx-auto">
          Save First. Invest Second. Emergency safety comes before long-term wealth goals.
        </p>
      </div>

      {/* Visual Journey Roadmap (01 SAVE -> 02 PROTECT -> 03 INVEST -> 04 BORROW) */}
      <div className="p-6 rounded-3xl bg-dark-card border border-gold/30 space-y-4">
        <h3 className="text-sm font-bold text-ivory uppercase tracking-wider">
          Long-Term Financial Safety Roadmap
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-gold/15 border border-gold text-gold font-bold text-xs text-center space-y-1">
            <div>01 SAVE</div>
            <div className="text-ivory font-extrabold">Emergency Cushion</div>
            <div className="text-[10px] text-gold">ACTIVE TARGET</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-dark-elevated border border-dark-border text-ivory-dark text-xs text-center space-y-1">
            <div>02 PROTECT</div>
            <div className="text-ivory font-bold">Health Reserve</div>
            <div className="text-[10px]">IN PROGRESS</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-dark-elevated border border-dark-border text-ivory-dark text-xs text-center opacity-60 space-y-1">
            <div>03 INVEST</div>
            <div className="text-ivory font-bold">Digital Gold / FD</div>
            <div className="text-[10px] flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Locked
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-dark-elevated border border-dark-border text-ivory-dark text-xs text-center opacity-60 space-y-1">
            <div>04 BORROW</div>
            <div className="text-ivory font-bold">Transparent Credit</div>
            <div className="text-[10px] flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Locked
            </div>
          </div>
        </div>
      </div>

      {/* Goals Cards List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-ivory">Your Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map(goal => {
            const isEmergency = goal.category === 'emergency';
            const progress = isEmergency
              ? Math.min(100, Math.round((currentBalance / goal.target) * 100))
              : Math.min(100, Math.round((goal.current / goal.target) * 100));
            const currentAmt = isEmergency ? currentBalance : goal.current;

            return (
              <div
                key={goal.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isEmergency
                    ? 'bg-gradient-to-br from-gold/15 via-dark-card to-dark-card border-gold shadow-gold-sm'
                    : goal.isLocked
                    ? 'bg-dark-card/60 border-dark-border opacity-80'
                    : 'bg-dark-card border-dark-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isEmergency ? 'bg-gold text-dark-bg' : 'bg-dark-elevated text-gold border border-dark-border'
                      }`}
                    >
                      {isEmergency ? <Shield className="w-5 h-5" /> : <Lock className="w-5 h-5 text-ivory-dark" />}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-ivory">{goal.name}</h4>
                      <span className="text-xs text-ivory-dark capitalize">{goal.category} goal</span>
                    </div>
                  </div>

                  {goal.isLocked ? (
                    <span className="px-2.5 py-1 rounded-full bg-dark-elevated text-ivory-dark border border-dark-border text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-bold">
                      Primary
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-ivory">₹{currentAmt.toLocaleString('en-IN')}</span>
                    <span className="text-ivory-dark">of ₹{goal.target.toLocaleString('en-IN')} ({progress}%)</span>
                  </div>

                  <div className="w-full bg-dark-elevated h-2.5 rounded-full overflow-hidden border border-dark-border">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isEmergency ? 'bg-gold' : 'bg-ivory-dark'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {goal.isLocked && goal.lockReason && (
                  <p className="text-[11px] text-gold/80 italic mt-3 bg-gold/5 p-2.5 rounded-xl border border-gold/20">
                    💡 {goal.lockReason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
