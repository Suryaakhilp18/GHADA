import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Search, CheckCircle2, Lock, AlertCircle } from 'lucide-react';

export const FraudSafetyPage: React.FC = () => {
  const [susText, setSusText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [riskLevel, setRiskLevel] = useState<'HIGH' | 'MEDIUM' | 'SAFE'>('HIGH');

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!susText.trim()) return;

    if (/otp|pin|lottery|winner|bank account|click link|urgent/i.test(susText)) {
      setRiskLevel('HIGH');
    } else {
      setRiskLevel('MEDIUM');
    }
    setAnalyzed(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-terracotta flex items-center justify-center gap-1">
          <AlertTriangle className="w-4 h-4" />
          Financial Safety Shield
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">Stay Safe from Scams & Fraud</h1>
        <p className="text-xs text-ivory-dark max-w-md mx-auto">
          Paste suspicious SMS, WhatsApp messages, or link text to analyze warning signs.
        </p>
      </div>

      {/* Analyzer Form */}
      <div className="p-6 rounded-3xl bg-dark-card border border-terracotta/40 space-y-4 shadow-xl">
        <label className="block text-xs font-bold text-ivory uppercase tracking-wider">
          Paste Suspicious Message or Text
        </label>
        <form onSubmit={handleAnalyze} className="space-y-3">
          <textarea
            value={susText}
            onChange={e => setSusText(e.target.value)}
            rows={4}
            placeholder='e.g., "Your electricity bill is unpaid. Click this link immediately or power cut will happen. Share OTP to verify."'
            className="w-full p-4 rounded-2xl bg-dark-bg border border-dark-border text-ivory text-xs focus:outline-none focus:border-terracotta"
          />

          <button
            type="submit"
            disabled={!susText.trim()}
            className="w-full py-3.5 rounded-xl bg-terracotta text-ivory font-extrabold text-xs tracking-wider uppercase hover:brightness-110 shadow-lg"
          >
            Analyze Message for Scams
          </button>
        </form>
      </div>

      {analyzed && (
        <div className="p-6 rounded-3xl bg-dark-card border border-terracotta text-left space-y-4 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ivory">Scam Risk Assessment: {riskLevel} RISK</h3>
              <p className="text-xs text-terracotta">Warning signs detected in your message</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-ivory-muted">
            <div className="flex items-start gap-2 text-terracotta font-semibold">
              <span>⚠️ Warning Signs Identified:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-ivory-dark">
              <li>Urgent threat of action (Power cut / account block)</li>
              <li>Unverified link or request for secret OTP / PIN</li>
              <li>Fake customer care impersonation pattern</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-elevated border border-dark-border text-xs text-ivory font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span>Action Recommendation: Never share OTPs or click suspicious links!</span>
          </div>
        </div>
      )}
    </div>
  );
};
