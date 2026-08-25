import React from 'react';
import { BookOpen, Shield, HeartPulse, Coins, HelpCircle, CheckCircle2 } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const articles = [
    {
      title: 'What is an emergency fund?',
      category: 'Basics',
      icon: Shield,
      summary: 'An emergency fund is money set aside exclusively for unplanned events like sudden hospital expenses, job disruption, or urgent vehicle repairs. It protects your family from predatory debt.',
    },
    {
      title: 'Why save before investing?',
      category: 'Philosophy',
      icon: Coins,
      summary: 'Investing money into stocks or gold comes with price ups and downs. If an emergency occurs while market prices are down, you might lose money. Building a cash cushion first guarantees safety.',
    },
    {
      title: 'How much should I keep for emergencies?',
      category: 'Planning',
      icon: HelpCircle,
      summary: 'For irregular income workers, keeping ₹5,000 to ₹10,000 provides peace of mind. Start small with ₹20 or ₹50 contributions until your first ₹5,000 milestone is reached.',
    },
    {
      title: 'What is financial protection & insurance?',
      category: 'Protection',
      icon: HeartPulse,
      summary: 'Government health schemes (like Ayushman Bharat) and micro-insurance cost very little per year and protect your savings from huge hospital bills.',
    },
    {
      title: 'What is responsible borrowing?',
      category: 'Credit',
      icon: BookOpen,
      summary: 'Avoid local money lenders charging 36%+ annual interest. Borrow only from transparent micro-credit sources when genuine income expansion or emergencies arise.',
    },
    {
      title: 'How investing works simply',
      category: 'Future Wealth',
      icon: CheckCircle2,
      summary: 'Once your emergency fund is built, small automated deposits into sovereign digital gold or fixed deposits allow your money to earn steady interest above inflation.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
          Financial Education
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">Learn → Understand → Decide</h1>
        <p className="text-xs text-ivory-dark max-w-md mx-auto">
          Simple financial wisdom without complex bank jargon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art, idx) => {
          const Icon = art.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-dark-card border border-dark-border hover:border-gold/30 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                  {art.category}
                </span>
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-ivory">{art.title}</h3>
              <p className="text-xs text-ivory-dark leading-relaxed">{art.summary}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
