import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Plus, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const BillsPlannerPage: React.FC = () => {
  const { bills, addBill, subscriptions } = useApp();

  const [name, setName] = useState('DTH Recharge');
  const [amount, setAmount] = useState('350');
  const [dueDate, setDueDate] = useState('In 5 days');
  const [category, setCategory] = useState<any>('Subscription');

  const handleAddBill = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    addBill({
      name,
      amount: amt,
      dueDate: dueDate || 'Upcoming',
      category,
      isPaid: false,
    });
  };

  const totalUpcoming = bills.filter(b => !b.isPaid).reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-card border border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-ivory">Bills & Subscriptions Planner</h1>
            <p className="text-xs text-ivory-dark mt-0.5">
              Never miss a payment or get surprised by sudden dues
            </p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-gold/10 border border-gold/30 text-gold text-right">
          <span className="text-[10px] uppercase font-bold text-ivory-dark">Upcoming Total</span>
          <div className="text-xl font-extrabold text-gold">₹{totalUpcoming.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Subscriptions Awareness Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gold/10 via-dark-card to-dark-card border border-gold/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gold">
          <Sparkles className="w-4 h-4" />
          <span>Subscription Awareness Audit</span>
        </div>
        <p className="text-xs text-ivory-dark leading-relaxed">
          You have {subscriptions.length} active recurring subscriptions totaling ₹{subscriptions.reduce((s, x) => s + x.monthlyCost, 0)}/month.
        </p>
        <div className="flex flex-wrap gap-2">
          {subscriptions.map(s => (
            <span key={s.id} className="px-3 py-1 rounded-xl bg-dark-elevated border border-dark-border text-xs text-ivory font-semibold">
              {s.name} (₹{s.monthlyCost}/mo)
            </span>
          ))}
        </div>
      </div>

      {/* Add Bill Form */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-xs font-bold text-ivory uppercase tracking-wider">Add Upcoming Bill</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Bill Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Due Date</label>
            <input
              type="text"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAddBill}
          className="w-full py-3 rounded-xl bg-gold text-dark-bg font-extrabold text-xs shadow-gold-sm hover:brightness-110 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bill Reminder</span>
        </button>
      </div>

      {/* Upcoming Bills List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-ivory">Upcoming Payment Obligations</h3>

        {bills.map(b => (
          <div
            key={b.id}
            className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-ivory">{b.name}</div>
                <div className="text-xs text-ivory-dark mt-0.5">Due: {b.dueDate} • {b.category}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-base font-extrabold text-gold">₹{b.amount.toLocaleString('en-IN')}</div>
              <button
                onClick={() => {}}
                className="text-[10px] text-ivory-dark hover:text-gold font-semibold underline mt-0.5"
              >
                Mark Paid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
