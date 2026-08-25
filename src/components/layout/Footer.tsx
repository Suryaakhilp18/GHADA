import React from 'react';
import { Logo } from '../common/Logo';
import { Link } from 'react-router-dom';
import { Lock, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { designerCredit } = useApp();

  return (
    <footer className="w-full bg-dark-card border-t border-dark-border/80 mt-16 pb-24 lg:pb-12 text-ivory-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-sm leading-relaxed max-w-md text-ivory-muted">
              Ghada is an AI-powered financial safety platform designed for users with low or irregular income.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-bg border border-gold/30 text-xs text-gold font-bold">
              <span>SAVE FIRST</span>
              <span>•</span>
              <span>INVEST SECOND</span>
              <span>•</span>
              <span>BORROW LAST</span>
            </div>
          </div>

          {/* Col 2: Hub Directory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ivory mb-4">
              Super-App Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/hub" className="hover:text-gold transition-colors font-semibold text-gold">Ghada Hub & Directory</Link></li>
              <li><Link to="/budget" className="hover:text-gold transition-colors">AI Budget Planner</Link></li>
              <li><Link to="/expenses" className="hover:text-gold transition-colors">Expense Tracker</Link></li>
              <li><Link to="/debt" className="hover:text-gold transition-colors">Debt Organizer</Link></li>
              <li><Link to="/bills" className="hover:text-gold transition-colors">Bills & Subscriptions</Link></li>
              <li><Link to="/documents" className="hover:text-gold transition-colors">Document Analyzer</Link></li>
              <li><Link to="/tools" className="hover:text-gold transition-colors">Money Calculators</Link></li>
            </ul>
          </div>

          {/* Col 3: Protection & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ivory mb-4">
              Protection & Credit
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/emergency-fund" className="hover:text-gold transition-colors">Emergency Cushion</Link></li>
              <li><Link to="/fraud-safety" className="hover:text-gold transition-colors text-terracotta font-semibold">Stay Safe (Fraud Checker)</Link></li>
              <li><Link to="/emergency-mode" className="hover:text-gold transition-colors">Emergency Crisis Mode</Link></li>
              <li><Link to="/health" className="hover:text-gold transition-colors">Financial Health Score</Link></li>
              <li><Link to="/partner" className="hover:text-gold transition-colors">B2B2C Partner Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Designer Credit */}
        <div className="pt-8 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span>Designed with privacy and security principles in mind. Demo Prototype.</span>
          </div>

          <div className="flex items-center gap-1.5 text-gold font-bold bg-gold/10 px-3 py-1.5 rounded-full border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{designerCredit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
