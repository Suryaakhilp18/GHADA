import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, AlertTriangle, RotateCcw, ChevronUp, ChevronDown, Sparkles, Layers, ShieldAlert } from 'lucide-react';

export const JudgeDemoBar: React.FC<{ onOpenSaveModal: () => void; onOpenEmergencyModal: () => void }> = ({
  onOpenSaveModal,
  onOpenEmergencyModal,
}) => {
  const { loadDemoUser, resetDemoData, saveAmount, rebuildMode } = useApp();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-5xl mx-auto px-4 pointer-events-auto">
        <div className="bg-dark-card/95 backdrop-blur-xl border-t border-x border-gold/40 rounded-t-2xl shadow-2xl overflow-hidden">
          {/* Header Toggle */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-1.5 bg-gradient-to-r from-gold/20 via-bronze/20 to-gold/20 flex items-center justify-between cursor-pointer border-b border-gold/20 hover:bg-gold/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider">
                ⚡ 2-Minute Judge & Super-App Demo Control Bar
              </span>
              {rebuildMode && (
                <span className="text-[10px] bg-terracotta/40 text-ivory px-2 py-0.5 rounded-full font-bold">
                  REBUILD MODE ACTIVE
                </span>
              )}
            </div>
            <button className="text-gold">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Actions */}
          {isExpanded && (
            <div className="p-3 grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
              <button
                onClick={() => {
                  loadDemoUser();
                  navigate('/dashboard');
                }}
                className="flex items-center justify-center gap-1 p-2 rounded-xl bg-dark-elevated border border-gold/30 text-gold hover:bg-gold/20 transition-all font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                1. Load Raju
              </button>

              <button
                onClick={() => {
                  saveAmount(50, 'Demo Quick Save');
                }}
                className="flex items-center justify-center gap-1 p-2 rounded-xl bg-gold text-dark-bg font-extrabold hover:brightness-110 transition-all shadow-gold-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                2. Deposit ₹50
              </button>

              <button
                onClick={() => {
                  navigate('/budget');
                }}
                className="flex items-center justify-center gap-1 p-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory hover:border-gold/40 transition-all font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                3. AI Budget
              </button>

              <button
                onClick={() => {
                  navigate('/fraud-safety');
                }}
                className="flex items-center justify-center gap-1 p-2 rounded-xl bg-terracotta/20 border border-terracotta/50 text-ivory hover:bg-terracotta/30 transition-all font-semibold"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-terracotta" />
                4. Fraud Safety
              </button>

              <button
                onClick={() => {
                  navigate('/hub');
                }}
                className="flex items-center justify-center gap-1 p-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory hover:border-gold/40 transition-all font-semibold"
              >
                <Layers className="w-3.5 h-3.5 text-gold" />
                5. Super Hub
              </button>

              <button
                onClick={resetDemoData}
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1 p-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory-dark hover:text-ivory transition-all"
              >
                Reset Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
