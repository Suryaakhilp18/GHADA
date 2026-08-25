import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, HeartPulse, Wrench, Briefcase, PlusCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmergencyModePage: React.FC = () => {
  const { currentBalance, user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] bg-black text-ivory p-4 sm:p-8 space-y-8 flex flex-col justify-between">
      {/* High Contrast Banner */}
      <div className="p-6 rounded-3xl bg-terracotta/20 border-2 border-terracotta space-y-3 text-center">
        <div className="w-14 h-14 rounded-full bg-terracotta text-ivory flex items-center justify-center mx-auto shadow-lg animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-widest font-extrabold text-terracotta">
          EMERGENCY CRISIS MODE ACTIVE
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">Ghada Protection Access</h1>
        <p className="text-xs text-ivory-muted">
          High-contrast simplified controls for urgent access during crisis.
        </p>
      </div>

      {/* Big Balance Box */}
      <div className="p-8 rounded-3xl bg-dark-card border border-gold/40 text-center space-y-2">
        <span className="text-xs font-bold text-ivory-dark uppercase">Available Emergency Funds</span>
        <div className="text-5xl font-extrabold text-gold">
          ₹{currentBalance.toLocaleString('en-IN')}
        </div>
        <p className="text-xs text-ivory-dark">
          Target: ₹{user.emergencyTarget.toLocaleString('en-IN')} • Instant Access Enabled
        </p>
      </div>

      {/* Quick Action Emergency Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/emergency-fund')}
          className="p-6 rounded-2xl bg-terracotta text-ivory font-extrabold text-sm space-y-2 text-center shadow-lg hover:brightness-110"
        >
          <HeartPulse className="w-8 h-8 mx-auto" />
          <div>Medical Emergency Access</div>
        </button>

        <button
          onClick={() => navigate('/emergency-fund')}
          className="p-6 rounded-2xl bg-terracotta/80 text-ivory font-extrabold text-sm space-y-2 text-center shadow-lg hover:brightness-110"
        >
          <Briefcase className="w-8 h-8 mx-auto" />
          <div>Work / Income Disruption</div>
        </button>

        <button
          onClick={() => navigate('/emergency-fund')}
          className="p-6 rounded-2xl bg-terracotta/80 text-ivory font-extrabold text-sm space-y-2 text-center shadow-lg hover:brightness-110"
        >
          <Wrench className="w-8 h-8 mx-auto" />
          <div>Essential Tool / Vehicle Repair</div>
        </button>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 rounded-xl bg-dark-card border border-dark-border text-ivory text-xs font-bold hover:bg-dark-border"
        >
          Exit Emergency Mode → Back to Standard Dashboard
        </button>
      </div>
    </div>
  );
};
