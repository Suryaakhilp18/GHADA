import React from 'react';

interface GhadaOrbProps {
  state?: 'idle' | 'listening' | 'thinking' | 'speaking';
  size?: 'sm' | 'md' | 'lg';
}

export const GhadaOrb: React.FC<GhadaOrbProps> = ({ state = 'idle', size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  }[size];

  return (
    <div className={`relative ${dimensions} flex items-center justify-center`}>
      {/* Outer Pulse Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-gold via-gold-light to-bronze opacity-40 filter blur-md transition-all duration-700 ${
          state === 'listening'
            ? 'animate-ping opacity-75'
            : state === 'thinking'
            ? 'animate-spin-slow opacity-60'
            : state === 'speaking'
            ? 'animate-pulse opacity-90'
            : 'animate-pulse opacity-30'
        }`}
      />

      {/* Core Orb Center */}
      <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-gold/30 via-dark-card to-bronze/20 border border-gold/50 flex items-center justify-center shadow-gold-glow overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold p-2">
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="url(#orbGradient)"
            className={state === 'thinking' ? 'animate-spin' : ''}
          />
          <path
            d="M 35,50 Q 50,30 65,50 Q 50,70 35,50"
            fill="none"
            stroke="#F6F1E8"
            strokeWidth="2"
            opacity="0.8"
          />
          <defs>
            <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E6C88B" />
              <stop offset="60%" stopColor="#D4AF6A" />
              <stop offset="100%" stopColor="#9E8050" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
