import React from 'react';
import { useApp } from '../context/AppContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { RebuildBanner } from '../components/features/RebuildBanner';
import { StatCard } from '../components/common/StatCard';
import { Flame, ShieldAlert, Sparkles, Plus, ArrowRight, Target, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardPageProps {
  onOpenSaveModal: () => void;
  onOpenEmergencyModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenSaveModal,
  onOpenEmergencyModal,
}) => {
  const { user, currentBalance, savingStreak, rebuildMode, t, saveAmount } = useApp();
  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((currentBalance / user.emergencyTarget) * 100));
  const remainingToGoal = Math.max(0, user.emergencyTarget - currentBalance);

  // Next milestone calculation
  const milestones = [100, 500, 1000, 3000, 5000];
  const nextMilestone = milestones.find(m => m > currentBalance) || 5000;
  const remainingToMilestone = Math.max(0, nextMilestone - currentBalance);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Welcome & Streak Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-card border border-dark-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory tracking-tight">
              Namaste, {user.name} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold font-bold">
              {user.occupation}
            </span>
          </div>
          <p className="text-xs text-ivory-dark mt-1">
            Income pattern: <span className="text-ivory font-semibold">{user.incomePattern}</span> • Daily safety goal
          </p>
        </div>

        {/* Streak Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-gold/15 to-dark-elevated border border-gold/40 shadow-gold-sm">
          <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" />
          <div>
            <div className="text-xs font-semibold text-ivory-dark uppercase">{t('savingStreak')}</div>
            <div className="text-lg font-extrabold text-ivory">{savingStreak} {t('days')}</div>
          </div>
        </div>
      </div>

      {/* Rebuild Mode Active Banner if post-withdrawal */}
      <RebuildBanner onSaveClick={onOpenSaveModal} />

      {/* MAIN EMERGENCY FUND HERO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-3xl bg-gradient-to-br from-dark-card via-dark-elevated to-dark-card border border-gold/30 shadow-2xl relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Left: Progress Ring */}
        <div className="lg:col-span-6 flex justify-center">
          <ProgressRing
            current={currentBalance}
            target={user.emergencyTarget}
            size={250}
            strokeWidth={16}
          />
        </div>

        {/* Right: Actions & Milestone Info */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
              Primary Safety Goal
            </span>
            <h2 className="text-3xl font-extrabold text-ivory">
              ₹{currentBalance.toLocaleString('en-IN')}{' '}
              <span className="text-lg font-normal text-ivory-dark">
                / ₹{user.emergencyTarget.toLocaleString('en-IN')}
              </span>
            </h2>
            <p className="text-xs text-ivory-dark">
              {progressPercent}% complete • ₹{remainingToGoal.toLocaleString('en-IN')} remaining to full cushion
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenSaveModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-sm shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t('saveNow')}</span>
            </button>

            <button
              onClick={onOpenEmergencyModal}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-terracotta/15 border border-terracotta/40 text-ivory hover:bg-terracotta/25 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-terracotta" />
              <span>{t('emergencyWithdrawal')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 STAT CARDS: Today Suggestion, Next Milestone, AI Coach */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Today's Suggestion */}
        <div className="p-6 rounded-3xl bg-dark-card border border-gold/25 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                {t('todaysSuggestion')}
              </span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-extrabold text-ivory">Save ₹50</div>
            <p className="text-xs text-ivory-dark leading-relaxed">
              {t('basedOnPattern')}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => saveAmount(50, "Today's Suggested Save")}
              className="flex-1 py-2.5 rounded-xl bg-gold text-dark-bg font-extrabold text-xs shadow-gold-sm hover:brightness-110"
            >
              Save ₹50
            </button>
            <button
              onClick={() => {}}
              className="px-3 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory-dark text-xs hover:text-ivory"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Card 2: Next Milestone */}
        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ivory-dark">
                {t('nextMilestone')}
              </span>
              <Target className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-extrabold text-gold">
              ₹{nextMilestone.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-ivory-dark">
              ₹{remainingToMilestone.toLocaleString('en-IN')} remaining to unlock milestone badge.
            </p>
          </div>

          <div className="w-full bg-dark-elevated rounded-full h-2 overflow-hidden border border-dark-border">
            <div
              className="bg-gold h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (currentBalance / nextMilestone) * 100)}%` }}
            />
          </div>
        </div>

        {/* Card 3: AI Coach Teaser */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-dark-card to-dark-elevated border border-gold/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Ghada AI Coach
              </span>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed italic">
              "{t('aiCoachTip')}"
            </p>
          </div>

          <button
            onClick={() => navigate('/coach')}
            className="w-full py-2.5 rounded-xl bg-dark-elevated border border-gold/30 text-gold text-xs font-bold hover:bg-gold/15 transition-all flex items-center justify-center gap-1.5"
          >
            <span>{t('askCoach')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
