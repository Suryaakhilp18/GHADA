import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Plus, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DebtOrganizerPage: React.FC = () => {
  const { debts, addDebt } = useApp();

  const [loanName, setLoanName] = useState('Personal Hand Loan');
  const [amount, setAmount] = useState('3000');
  const [interestRate, setInterestRate] = useState('15');
  const [monthlyPayment, setMonthlyPayment] = useState('400');
  const [category, setCategory] = useState<any>('Informal Lender');

  const totalOutstanding = debts.reduce((sum, d) => sum + d.outstandingAmount, 0);
  const totalMonthlyPayment = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);

  const handleAddDebt = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const pay = parseFloat(monthlyPayment);
    if (isNaN(amt) || amt <= 0) return;

    addDebt({
      loanName,
      outstandingAmount: amt,
      interestRate: rate || 12,
      monthlyPayment: pay || 300,
      category,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-card border border-dark-border">
        <div>
          <h1 className="text-2xl font-extrabold text-ivory tracking-tight">Debt Organizer & Repayment Planner</h1>
          <p className="text-xs text-ivory-dark mt-0.5">
            Borrow Last • Organize obligations & prioritize high-interest debt repayment
          </p>
        </div>

        <div className="flex gap-3">
          <div className="p-3 rounded-2xl bg-dark-elevated border border-dark-border text-right">
            <span className="text-[10px] uppercase font-bold text-ivory-dark">Total Outstanding</span>
            <div className="text-xl font-extrabold text-terracotta">₹{totalOutstanding.toLocaleString('en-IN')}</div>
          </div>
          <div className="p-3 rounded-2xl bg-dark-elevated border border-dark-border text-right">
            <span className="text-[10px] uppercase font-bold text-ivory-dark">Monthly Obligations</span>
            <div className="text-xl font-extrabold text-gold">₹{totalMonthlyPayment.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Add Debt Form */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-xs font-bold text-ivory uppercase tracking-wider">Add Debt / Loan Obligation</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Loan Name</label>
            <input
              type="text"
              value={loanName}
              onChange={e => setLoanName(e.target.value)}
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
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={e => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ivory-dark uppercase mb-1">Monthly Payment (₹)</label>
            <input
              type="number"
              value={monthlyPayment}
              onChange={e => setMonthlyPayment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAddDebt}
          className="w-full py-3 rounded-xl bg-gold text-dark-bg font-extrabold text-xs shadow-gold-sm hover:brightness-110 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Debt Item</span>
        </button>
      </div>

      {/* Debt List & AI Priority Analysis */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-ivory">Your Active Loans & Priorities</h3>

        <div className="space-y-3">
          {debts.map(d => (
            <div
              key={d.id}
              className="p-5 rounded-2xl bg-dark-card border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-ivory">{d.loanName}</h4>
                  <span className="text-[10px] bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full font-bold">
                    {d.interestRate}% Interest
                  </span>
                </div>
                <p className="text-xs text-ivory-dark">{d.category} • Monthly EMI: ₹{d.monthlyPayment}</p>
              </div>

              <div className="text-right">
                <div className="text-lg font-extrabold text-ivory">₹{d.outstandingAmount.toLocaleString('en-IN')}</div>
                <span className="text-[10px] text-gold font-semibold">Priority #1 for payoff</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
