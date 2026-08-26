import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { Lock, User, ArrowRight, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, designerCredit } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both Username and Password.');
      return;
    }

    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use Username: Suryaakhilp | Password: 28022023');
    }
  };

  const handleFillDemoCredentials = () => {
    setUsername('Suryaakhilp');
    setPassword('28022023');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Logo size="lg" showTagline={true} />
          <h1 className="text-2xl font-extrabold text-ivory tracking-tight mt-3">
            Sign In to Ghada
          </h1>
          <p className="text-xs text-ivory-dark">
            Your Multilingual AI Financial Safety Companion
          </p>
        </div>

        {/* Demo Credentials Hint Banner */}
        <div className="p-3.5 rounded-2xl bg-gold/10 border border-gold/30 text-xs text-gold flex items-center justify-between gap-2 shadow-gold-sm">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-gold shrink-0" />
            <div>
              <span className="font-bold">Demo Login Credentials</span>
              <div className="text-[11px] text-ivory-muted font-mono">
                User: <span className="text-gold font-bold">Suryaakhilp</span> | Pass: <span className="text-gold font-bold">28022023</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleFillDemoCredentials}
            className="px-2.5 py-1 rounded-lg bg-gold text-dark-bg text-[10px] font-extrabold hover:brightness-110 shrink-0"
          >
            Auto-Fill
          </button>
        </div>

        {/* Login Form Card */}
        <div className="p-8 rounded-3xl bg-dark-card border border-gold/30 shadow-2xl space-y-5">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-terracotta/20 border border-terracotta/40 text-xs text-ivory text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark mb-1">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gold absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold placeholder-ivory-dark/40 focus:outline-none focus:border-gold"
                  placeholder="Enter username (e.g. Suryaakhilp)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold placeholder-ivory-dark/40 focus:outline-none focus:border-gold"
                  placeholder="Enter password (e.g. 28022023)"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-[11px] text-ivory-dark text-center flex items-center justify-center gap-1.5 pt-2 border-t border-dark-border">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Protected Demo Environment • Save First. Invest Second. Borrow Last.</span>
          </div>
        </div>

        {/* Designer Credit */}
        <div className="text-center text-xs text-gold/80 font-medium">
          {designerCredit}
        </div>
      </div>
    </div>
  );
};
