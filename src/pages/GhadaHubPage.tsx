import React from 'react';
import { Link } from 'react-router-dom';
import { AskGhadaAnything } from '../components/features/AskGhadaAnything';
import {
  CreditCard,
  FileText,
  Shield,
  AlertTriangle,
  BookOpen,
  Calculator,
  Building2,
  Calendar,
  Sparkles,
  HeartPulse,
  Lock,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
} from 'lucide-react';

export const GhadaHubPage: React.FC = () => {
  const sections = [
    {
      title: 'MONEY & SAVINGS',
      color: 'text-gold',
      items: [
        { title: 'AI Budget Planner', desc: 'Custom income & expense allocation', path: '/budget', icon: CreditCard },
        { title: 'Expense Tracker', desc: 'Natural language spending logger', path: '/expenses', icon: FileText },
        { title: 'Emergency Safety Cushion', desc: 'Primary protection fund', path: '/emergency-fund', icon: Shield },
        { title: 'Financial Goals', desc: 'Family & work equipment targets', path: '/goals', icon: TrendingUp },
      ],
    },
    {
      title: 'PROTECTION & SAFETY',
      color: 'text-terracotta',
      items: [
        { title: 'Stay Safe (Fraud Checker)', desc: 'OTP & suspicious message analyzer', path: '/fraud-safety', icon: AlertTriangle },
        { title: 'Emergency Crisis Mode', desc: 'High-contrast quick fund access', path: '/emergency-mode', icon: Shield },
        { title: 'Insurance Education', desc: 'Micro-cover & health safety', path: '/learn', icon: HeartPulse },
      ],
    },
    {
      title: 'PLAN & UNDERSTAND',
      color: 'text-amber-400',
      items: [
        { title: 'Bills & Subscriptions', desc: 'Upcoming payments & calendar alerts', path: '/bills', icon: Calendar },
        { title: 'Document Analyzer', desc: 'Upload statement/bill for instant breakdown', path: '/documents', icon: FileText },
        { title: 'Money Calculators', desc: 'EMI, SIP, Emergency fund calculators', path: '/tools', icon: Calculator },
        { title: 'Financial Health Score', desc: '5-pillar safety metrics', path: '/health', icon: Activity },
      ],
    },
    {
      title: 'GROW & BORROW WISELY',
      color: 'text-ivory',
      items: [
        { title: 'Debt Organizer', desc: 'Loan tracker & repayment priority planner', path: '/debt', icon: Lock },
        { title: 'Investing Education', desc: 'Save First, Invest Second principles', path: '/learn', icon: BookOpen },
        { title: 'B2B2C Partner Portal', desc: 'Enterprise workforce analytics', path: '/partner', icon: Building2 },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top Hero Search */}
      <AskGhadaAnything />

      {/* Title */}
      <div className="flex items-center justify-between border-b border-dark-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-gold" />
            <span>GHADA SUPER-APP HUB</span>
          </h1>
          <p className="text-xs text-ivory-dark mt-0.5">
            One-stop directory for all your financial safety, planning, and educational tools
          </p>
        </div>
      </div>

      {/* Categorized Directory Sections */}
      <div className="space-y-8">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h3 className={`text-xs font-extrabold uppercase tracking-widest ${sec.color}`}>
              {sec.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {sec.items.map((item, iIdx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={iIdx}
                    to={item.path}
                    className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/40 hover:bg-gold/5 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="p-2.5 rounded-xl bg-dark-elevated border border-dark-border text-gold group-hover:border-gold group-hover:bg-gold/10 w-fit transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-ivory group-hover:text-gold transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-ivory-dark mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Open Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
