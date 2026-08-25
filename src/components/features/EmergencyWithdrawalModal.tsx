import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertTriangle, ArrowRight, HeartPulse, Wrench, Briefcase, Users, HelpCircle } from 'lucide-react';

interface EmergencyWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyWithdrawalModal: React.FC<EmergencyWithdrawalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentBalance, withdrawEmergency } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<number>(500);
  const [isNonEmergencyWarning, setIsNonEmergencyWarning] = useState<boolean>(false);

  const emergencyReasons = [
    { id: 'Medical expense', label: 'Medical / Health Emergency', icon: HeartPulse },
    { id: 'Work disruption', label: 'Work / Income Disruption', icon: Briefcase },
    { id: 'Family emergency', label: 'Urgent Family Emergency', icon: Users },
    { id: 'Essential repair', label: 'Vehicle or Tool Repair', icon: Wrench },
    { id: 'Non-emergency expense', label: 'Other / Shopping (Non-Emergency)', icon: HelpCircle },
  ];

  const handleSelectReason = (reasonId: string) => {
    setSelectedReason(reasonId);
    if (reasonId === 'Non-emergency expense') {
      setIsNonEmergencyWarning(true);
    } else {
      setIsNonEmergencyWarning(false);
    }
  };

  const handleConfirmWithdrawal = () => {
    withdrawEmergency(withdrawAmount, selectedReason || 'Emergency Expense');
    setStep(3); // Success / Rebuild step
  };

  const handleDone = () => {
    setStep(1);
    setSelectedReason('');
    setIsNonEmergencyWarning(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDone}
      title={step === 3 ? 'Emergency Fund Updated' : 'Emergency Fund Access'}
      subtitle={step === 3 ? 'Money withdrawn for genuine need' : 'Behavioral protection shield'}
      maxWidth="md"
    >
      {step === 1 && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-terracotta/15 border border-terracotta/40 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-ivory">Is this for a genuine emergency?</span>
              <p className="text-ivory-dark mt-0.5">
                Your emergency fund is reserved to protect you from high-interest debt when unexpected crises strike.
              </p>
            </div>
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark">
            Select Purpose of Withdrawal
          </label>

          <div className="space-y-2">
            {emergencyReasons.map(r => {
              const Icon = r.icon;
              const isSelected = selectedReason === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectReason(r.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-gold/15 border-gold text-ivory shadow-gold-sm font-semibold'
                      : 'bg-dark-elevated border-dark-border text-ivory-dark hover:text-ivory hover:border-dark-border/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-ivory-dark'}`} />
                    <span className="text-xs">{r.label}</span>
                  </div>
                  {isSelected && <span className="text-gold font-bold">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Behavioral Friction Non-Emergency Warning */}
          {isNonEmergencyWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Consider Keeping Your Cushion
              </div>
              <p className="text-ivory-dark">
                "This money is reserved for emergencies. Are you sure you want to continue?"
              </p>
            </div>
          )}

          {/* Amount Selection */}
          <div className="pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark mb-1">
              Amount to Withdraw (Available: ₹{currentBalance.toLocaleString('en-IN')})
            </label>
            <div className="flex gap-2">
              {[200, 500, 1000].map(amt => (
                <button
                  key={amt}
                  disabled={amt > currentBalance}
                  onClick={() => setWithdrawAmount(amt)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    withdrawAmount === amt
                      ? 'bg-gold text-dark-bg border-gold'
                      : 'bg-dark-elevated border-dark-border text-ivory'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedReason || withdrawAmount > currentBalance}
            onClick={() => setStep(2)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-muted text-ivory font-extrabold text-xs tracking-wider uppercase disabled:opacity-50 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Confirmation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 text-center py-2">
          <div className="w-14 h-14 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mx-auto border border-terracotta/40">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-ivory">Confirm Emergency Access</h4>
            <p className="text-xs text-ivory-dark mt-1">
              Using ₹{withdrawAmount.toLocaleString('en-IN')} for "{selectedReason}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-elevated border border-dark-border space-y-2 text-xs">
            <div className="flex justify-between text-ivory-dark">
              <span>Emergency fund before:</span>
              <span className="font-bold text-ivory">₹{currentBalance.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-terracotta font-semibold">
              <span>Withdrawal:</span>
              <span>-₹{withdrawAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-dark-border pt-2 flex justify-between font-bold text-gold">
              <span>Remaining after withdrawal:</span>
              <span>₹{(currentBalance - withdrawAmount).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold hover:bg-dark-border/40"
            >
              Back
            </button>
            <button
              onClick={handleConfirmWithdrawal}
              className="flex-1 py-3 rounded-xl bg-terracotta text-ivory text-xs font-bold hover:brightness-110 shadow-lg"
            >
              Use ₹{withdrawAmount} For Emergency
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5 text-center py-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-bronze/20 text-gold flex items-center justify-center mx-auto border border-gold/40">
            <ShieldAlert className="w-9 h-9" />
          </div>

          <div>
            <h4 className="text-2xl font-extrabold text-ivory">Emergency Fund Updated</h4>
            <p className="text-xs text-gold mt-1">
              ₹{(currentBalance).toLocaleString('en-IN')} remaining. Your fund protected you today!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-gold/15 to-dark-card border border-gold/40 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gold">
              <span>🔄 LET'S REBUILD SLOWLY</span>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Your next target is to get back to ₹{(currentBalance + withdrawAmount).toLocaleString('en-IN')}. A small contribution of ₹20 or ₹50 today keeps your momentum alive.
            </p>
          </div>

          <button
            onClick={handleDone}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-extrabold text-sm shadow-gold-sm hover:brightness-110 transition-all"
          >
            Start Rebuilding
          </button>
        </div>
      )}
    </Modal>
  );
};
