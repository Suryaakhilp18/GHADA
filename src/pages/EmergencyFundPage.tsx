import React from 'react';
import { useApp } from '../context/AppContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { ShieldCheck, Plus, ShieldAlert, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface EmergencyFundPageProps {
  onOpenSaveModal: () => void;
  onOpenEmergencyModal: () => void;
}

export const EmergencyFundPage: React.FC<EmergencyFundPageProps> = ({
  onOpenSaveModal,
  onOpenEmergencyModal,
}) => {
  const { currentBalance, user, milestones, t } = useApp();

  const progressPercent = Math.min(100, Math.round((currentBalance / user.emergencyTarget) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
          Dedicated Protection Account
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ivory tracking-tight">
          Your Emergency Safety Fund
        </h1>
        <p className="text-xs sm:text-sm text-ivory-dark max-w-lg mx-auto">
          Reserved strictly for unexpected illness, work disruptions, or urgent repairs.
        </p>
      </div>

      {/* Main Card */}
      <div className="p-8 rounded-3xl bg-dark-card border border-gold/30 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 flex justify-center">
          <ProgressRing
            current={currentBalance}
            target={user.emergencyTarget}
            size={260}
            strokeWidth={18}
          />
        </div>

        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="text-xs text-ivory-dark uppercase font-semibold">Current Fund</span>
            <div className="text-4xl font-extrabold text-ivory mt-1">
              ₹{currentBalance.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-normal text-ivory-dark">
                / ₹{user.emergencyTarget.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-gold mt-1">
              {progressPercent}% Complete • ₹{(user.emergencyTarget - currentBalance).toLocaleString('en-IN')} remaining
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onOpenSaveModal}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-xs shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Save Money</span>
            </button>

            <button
              onClick={onOpenEmergencyModal}
              className="flex-1 py-3.5 rounded-xl bg-terracotta/15 border border-terracotta/40 text-ivory font-bold text-xs hover:bg-terracotta/25 flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-terracotta" />
              <span>Emergency Withdrawal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Milestone Ladder Progression */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          <span>Safety Milestones</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {milestones.map((ms, idx) => {
            const isReached = currentBalance >= ms.amount;
            return (
              <div
                key={ms.amount}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  isReached
                    ? 'bg-gradient-to-b from-gold/15 to-dark-card border-gold text-ivory shadow-gold-sm'
                    : 'bg-dark-card border-dark-border text-ivory-dark'
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold border">
                  {isReached ? (
                    <span className="text-gold">✓</span>
                  ) : (
                    <span className="text-ivory-dark">{idx + 1}</span>
                  )}
                </div>
                <div className="text-base font-extrabold">₹{ms.amount.toLocaleString('en-IN')}</div>
                <div className="text-xs font-semibold">{ms.label}</div>
                {isReached && ms.date && (
                  <div className="text-[10px] text-gold font-medium">{ms.date}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Behavioral Lock Explanation Card */}
      <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-3">
        <div className="flex items-center gap-2 text-gold font-bold text-sm">
          <Lock className="w-4 h-4" />
          <span>Behavioral Lock & Friction</span>
        </div>
        <p className="text-xs text-ivory-dark leading-relaxed">
          Ghada keeps your emergency funds separate from everyday spending. When you request a withdrawal, our behavioral friction prompt asks for a genuine emergency verification. This prevents impulse shopping while ensuring legitimate emergency access is always available.
        </p>
      </div>
    </div>
  );
};
