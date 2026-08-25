import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
  const { user, saveAmount, currentBalance, t } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(user.savingPreference || 50);
  const [customInput, setCustomInput] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<number>(0);

  const presets = [20, 50, 100, 200];

  const handleSave = () => {
    const amountToSave = customInput ? parseFloat(customInput) : selectedAmount;
    if (isNaN(amountToSave) || amountToSave <= 0) return;

    saveAmount(amountToSave, 'Emergency Fund Contribution');
    setLastSaved(amountToSave);
    setIsSuccess(true);
  };

  const handleDone = () => {
    setIsSuccess(false);
    setCustomInput('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDone}
      title={isSuccess ? 'Nice Work!' : 'Add to Emergency Fund'}
      subtitle={isSuccess ? 'Your financial safety net grew stronger' : 'Small contributions lead to big safety'}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto border border-gold/40 shadow-gold-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="text-3xl font-extrabold text-ivory">
              +₹{lastSaved.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-ivory-dark mt-1">
              added to your emergency fund
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-elevated border border-gold/30">
            <div className="text-xs text-ivory-dark uppercase font-semibold">
              New Emergency Balance
            </div>
            <div className="text-2xl font-bold text-gold mt-1">
              ₹{currentBalance.toLocaleString('en-IN')} / ₹{user.emergencyTarget.toLocaleString('en-IN')}
            </div>
          </div>

          <p className="text-xs text-gold/90 italic">
            "Consistency matters more than the starting amount."
          </p>

          <button
            onClick={handleDone}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-extrabold shadow-gold-sm hover:brightness-110 transition-all"
          >
            Continue Journey
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Suggested Rationale Banner */}
          <div className="p-3 rounded-xl bg-gold/10 border border-gold/25 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-gold">Suggested Contribution: ₹50</span>
              <p className="text-ivory-dark mt-0.5">
                Based on your recent saving pattern and {user.incomePattern.toLowerCase()} income.
              </p>
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark mb-2">
              Select Preset Amount
            </label>
            <div className="grid grid-cols-4 gap-2">
              {presets.map(amount => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomInput('');
                  }}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    selectedAmount === amount && !customInput
                      ? 'bg-gold text-dark-bg border-gold shadow-gold-sm'
                      : 'bg-dark-elevated border-dark-border text-ivory hover:border-gold/40'
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark mb-1">
              Or Enter Custom Amount
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-ivory-dark font-bold">₹</span>
              <input
                type="number"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                placeholder="Custom e.g. 75"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory placeholder-ivory-dark/50 text-sm font-semibold focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="text-[11px] text-ivory-dark flex items-center justify-between border-t border-dark-border pt-3">
            <span>Current Fund: ₹{currentBalance.toLocaleString('en-IN')}</span>
            <span className="text-gold font-medium">Demo Transaction</span>
          </div>

          {/* Submit Action */}
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-sm shadow-gold-glow hover:brightness-110 transition-all"
          >
            Add to Emergency Fund
          </button>
        </div>
      )}
    </Modal>
  );
};
