import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { LanguageSelector } from '../features/LanguageSelector';
import { useApp } from '../../context/AppContext';
import { Layers, Shield, Sparkles, Search, CreditCard, Activity, LogOut } from 'lucide-react';

export const Header: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const location = useLocation();
  const { user, isAuthenticated, logout, t } = useApp();

  const authenticatedLinks = [
    { path: '/hub', label: 'Super-App Hub', icon: Layers },
    { path: '/dashboard', label: t('dashboard'), icon: Shield },
    { path: '/budget', label: 'AI Budget', icon: CreditCard },
    { path: '/expenses', label: 'Expenses', icon: null },
    { path: '/coach', label: t('coach'), icon: Sparkles },
    { path: '/health', label: 'Health', icon: Activity },
  ];

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/learn', label: 'Learn' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-bg/90 backdrop-blur-md border-b border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Logo */}
        <Logo size="md" showTagline={false} />

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {isAuthenticated ? (
            authenticatedLinks.map(link => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gold/15 text-gold border border-gold/30'
                      : 'text-ivory-dark hover:text-ivory hover:bg-dark-card'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-gold" />}
                  {link.label}
                </Link>
              );
            })
          ) : (
            publicLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold/15 text-gold border border-gold/30'
                      : 'text-ivory-dark hover:text-ivory hover:bg-dark-card'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })
          )}
        </nav>

        {/* Right: Search, Language, User/Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ctrl+K Search Launcher */}
          {isAuthenticated && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-card border border-dark-border hover:border-gold/40 text-xs text-ivory-dark hover:text-ivory transition-all"
              title="Open Command Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-gold" />
              <span className="hidden sm:inline font-semibold">Search</span>
              <kbd className="hidden md:inline text-[9px] bg-dark-elevated px-1.5 py-0.5 rounded border border-dark-border font-mono text-gold">
                ⌘K
              </kbd>
            </button>
          )}

          <LanguageSelector compact={true} />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1.5 rounded-xl bg-dark-card border border-dark-border hover:border-gold/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline text-xs font-bold text-ivory pr-1">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory-dark hover:text-terracotta hover:border-terracotta/40 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg text-xs font-extrabold shadow-gold-sm hover:brightness-110"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
