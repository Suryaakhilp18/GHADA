import React from 'react';

interface ProgressRingProps {
  current: number;
  target: number;
  size?: number;
  strokeWidth?: number;
  showDetails?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  current,
  target,
  size = 240,
  strokeWidth = 16,
  showDetails = true,
}) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2A2A2A"
          strokeWidth={strokeWidth}
          className="fill-none"
        />

        {/* Outer Glow Pass */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D4AF6A"
          strokeWidth={strokeWidth + 4}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="fill-none opacity-20 filter blur-sm transition-all duration-1000 ease-out"
        />

        {/* Foreground Animated Gold Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#goldGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="fill-none transition-all duration-1000 ease-out"
        />

        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF6A" />
            <stop offset="50%" stopColor="#E6C88B" />
            <stop offset="100%" stopColor="#9E8050" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner Text Center Content */}
      {showDetails && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-xs uppercase font-semibold tracking-wider text-ivory-dark">
            Emergency Cushion
          </span>
          <span className="text-3xl md:text-4xl font-extrabold text-ivory tracking-tight my-1">
            ₹{current.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gold font-medium bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
            <span>of ₹{target.toLocaleString('en-IN')}</span>
            <span className="font-bold">({percentage}%)</span>
          </div>
        </div>
      )}
    </div>
  );
};
