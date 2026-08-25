import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <Link to="/" className="inline-flex items-center gap-3 group">
      {/* Ghada Clay Pot & Shield Metaphor SVG */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 via-bronze/10 to-dark-card border border-gold/40 group-hover:border-gold shadow-gold-sm transition-all duration-300`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4 text-gold drop-shadow"
        >
          {/* Top Rim */}
          <ellipse cx="16" cy="6" rx="6" ry="2" fill="currentColor" opacity="0.9" />
          {/* Neck */}
          <path d="M11 7.5 C11 7.5, 12 10, 10 12 C8 14, 6 17, 6 21 C6 26.5 10.5 30 16 30 C21.5 30 26 26.5 26 21 C26 17 24 14 22 12 C20 10 21 7.5 21 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Inner Shield / Coin motif inside Pot */}
          <circle cx="16" cy="20" r="4.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 17.5 V22.5 M14.5 19 H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight ${textSizes[size]} bg-gradient-to-r from-ivory via-ivory-muted to-gold bg-clip-text text-transparent`}>
          GHADA
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-bronze">
            Safety First
          </span>
        )}
      </div>
    </Link>
  );
};
