import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  highlight = false,
}) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${
        highlight
          ? 'bg-gradient-to-br from-gold/15 via-dark-card to-dark-card border-gold/40 shadow-gold-sm'
          : 'bg-dark-card border-dark-border hover:border-dark-border/80'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-ivory-dark">
          {label}
        </span>
        {icon && <div className="text-gold opacity-90">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-ivory tracking-tight">{value}</span>
      </div>
      {subtext && <p className="text-xs text-ivory-dark mt-1">{subtext}</p>}
    </div>
  );
};
