import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Plus, Sparkles, TrendingUp, Filter } from 'lucide-react';

export const ExpenseTrackerPage: React.FC = () => {
  const { expenses, addExpense } = useApp();

  const [amount, setAmount] = useState<string>('250');
  const [category, setCategory] = useState<any>('Transport');
  const [description, setDescription] = useState<string>('Fuel for work bike');
  const [nlInput, setNlInput] = useState<string>('');

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAdd = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    addExpense({
      amount: amt,
      category,
      description: description || `Expense for ${category}`,
      date: 'Today',
    });

    setDescription('');
  };

  const handleNlParse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlInput.trim()) return;

    // Natural Language Parsing
    const amtMatch = nlInput.match(/₹?\s*(\d+)/);
    const parsedAmt = amtMatch ? parseFloat(amtMatch[1]) : 150;

    let parsedCat: any = 'Other';
    if (/fuel|petrol|cab|auto|bus/i.test(nlInput)) parsedCat = 'Transport';
    else if (/food|lunch|dinner|tea|coffee|biryani|groceries/i.test(nlInput)) parsedCat = 'Food';
    else if (/rent|room/i.test(nlInput)) parsedCat = 'Rent';
    else if (/current|electricity|water|recharge/i.test(nlInput)) parsedCat = 'Utilities';

    addExpense({
      amount: parsedAmt,
      category: parsedCat,
      description: nlInput,
      date: 'Today',
    });

    setNlInput('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-card border border-dark-border">
        <div>
          <h1 className="text-2xl font-extrabold text-ivory tracking-tight">AI Expense Tracker</h1>
          <p className="text-xs text-ivory-dark mt-0.5">
            Log expenses naturally via text or voice
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-gold/10 border border-gold/30 text-gold text-right">
          <div className="text-[10px] uppercase font-bold text-ivory-dark">Total Logged</div>
          <div className="text-xl font-extrabold text-gold">₹{totalSpent.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* AI Natural Language Entry Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gold/10 via-dark-card to-dark-card border border-gold/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gold">
          <Sparkles className="w-4 h-4" />
          <span>Natural Language Quick Entry</span>
        </div>

        <form onSubmit={handleNlParse} className="flex gap-2">
          <input
            type="text"
            value={nlInput}
            onChange={e => setNlInput(e.target.value)}
            placeholder='Type e.g. "I spent ₹250 on fuel today"'
            className="flex-1 px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-ivory text-xs font-semibold focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={!nlInput.trim()}
            className="px-5 py-3 rounded-xl bg-gold text-dark-bg font-extrabold text-xs shadow-gold-sm hover:brightness-110 disabled:opacity-40"
          >
            Add
          </button>
        </form>
      </div>

      {/* Manual Entry Form */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-xs font-bold text-ivory uppercase tracking-wider">Manual Entry</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold focus:outline-none"
            >
              {['Food', 'Transport', 'Rent', 'Utilities', 'Health', 'Education', 'Shopping', 'Other'].map(c => (
                <option key={c} value={c} className="bg-dark-card text-ivory">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-3 rounded-xl bg-dark-elevated border border-gold/40 text-gold font-bold text-xs hover:bg-gold/20 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Expense History List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-ivory">Recent Logged Expenses</h3>

        {expenses.map(e => (
          <div
            key={e.id}
            className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold text-xs">
                {e.category.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-ivory">{e.description}</div>
                <div className="text-[10px] text-ivory-dark mt-0.5">{e.category} • {e.date}</div>
              </div>
            </div>
            <div className="text-sm font-extrabold text-ivory">
              -₹{e.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
