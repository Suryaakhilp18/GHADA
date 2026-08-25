import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Sparkles, History, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BottomNavProps {
  onOpenSaveModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenSaveModal }) => {
  const location = useLocation();
  const { t } = useApp();

  const isPublic = ['/', '/about', '/how-it-works'].includes(location.pathname);
  if (isPublic) return null;

  return (
    <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 px-4 pb-2">
      <nav className="max-w-md mx-auto bg-dark-card/95 backdrop-blur-lg border border-dark-border/80 rounded-2xl px-3 py-2 flex items-center justify-around shadow-2xl">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            location.pathname === '/dashboard' ? 'text-gold' : 'text-ivory-dark hover:text-ivory'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('dashboard')}</span>
        </Link>

        {/* AI Coach */}
        <Link
          to="/coach"
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            location.pathname === '/coach' ? 'text-gold' : 'text-ivory-dark hover:text-ivory'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('coach')}</span>
        </Link>

        {/* Central Save CTA */}
        <button
          onClick={onOpenSaveModal}
          className="relative -top-5 flex flex-col items-center group"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark p-0.5 shadow-gold-glow group-active:scale-95 transition-transform">
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center border border-gold/40 group-hover:bg-gold/20 transition-colors">
              <PlusCircle className="w-7 h-7 text-gold" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-gold tracking-wide mt-0.5">
            {t('saveNav')}
          </span>
        </button>

        {/* Activity */}
        <Link
          to="/activity"
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            location.pathname === '/activity' ? 'text-gold' : 'text-ivory-dark hover:text-ivory'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('activity')}</span>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 p-1 transition-colors ${
            location.pathname === '/profile' ? 'text-gold' : 'text-ivory-dark hover:text-ivory'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t('profile')}</span>
        </Link>
      </nav>
    </div>
  );
};
