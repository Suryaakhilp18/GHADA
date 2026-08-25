import React from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, ArrowUpRight } from 'lucide-react';

export const RebuildBanner: React.FC<{ onSaveClick: () => void }> = ({ onSaveClick }) => {
  const { rebuildMode, currentBalance, rebuildTarget, t } = useApp();

  if (!rebuildMode) return null;

  const gap = Math.max(0, rebuildTarget - currentBalance);

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-terracotta/20 via-dark-card to-bronze/10 border border-terracotta/40 shadow-lg relative overflow-hidden my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-terracotta/20 text-terracotta border border-terracotta/30 shrink-0">
            <RefreshCw className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Rebuild Mode Active
              </span>
              <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-semibold">
                Target: ₹{rebuildTarget.toLocaleString('en-IN')}
              </span>
            </div>
            <h4 className="text-sm font-bold text-ivory mt-0.5">
              Your emergency fund is ₹{gap.toLocaleString('en-IN')} below its previous cushion.
            </h4>
            <p className="text-xs text-ivory-dark mt-1">
              Using your safety fund is natural. Saving ₹20 or ₹50 today keeps your habit strong with zero pressure.
            </p>
          </div>
        </div>

        <button
          onClick={onSaveClick}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg text-xs font-extrabold shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>Save ₹50 to Rebuild</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
