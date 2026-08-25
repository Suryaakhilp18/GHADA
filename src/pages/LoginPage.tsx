import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, designerCredit } = useApp();

  const [username, setUsername] = useState('Suryaakhilp');
  const [password, setPassword] = useState('28022023');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password. (Demo: Suryaakhilp / 28022023)');
    }
  };

  const handleQuickDemoLogin = () => {
    login('Suryaakhilp', '28022023');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <Logo size="lg" showTagline={true} />
          <h1 className="text-2xl font-extrabold text-ivory tracking-tight mt-2">
            Welcome to Ghada
          </h1>
          <p className="text-xs text-ivory-dark">
            Your AI-Powered Financial Safety & Life-Assistance Platform
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-dark-card border border-gold/30 shadow-2xl space-y-6">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-terracotta/20 border border-terracotta/40 text-xs text-ivory text-center">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold focus:outline-none focus:border-gold"
                  placeholder="Suryaakhilp"
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold focus:outline-none focus:border-gold"
                  placeholder="••••••••"
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

          {/* Quick Demo Login Button */}
          <div className="pt-2 border-t border-dark-border">
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-3 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-bold hover:bg-gold/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>1-Click Quick Demo Login (Suryaakhilp)</span>
            </button>
          </div>

          <div className="text-[11px] text-ivory-dark text-center flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Demo Authentication • No real money is moved</span>
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
