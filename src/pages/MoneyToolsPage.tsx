import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

export const MoneyToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emi' | 'sip' | 'emergency'>('emergency');

  // Emergency Fund Calculator State
  const [monthlyExpense, setMonthlyExpense] = useState(6000);
  const [monthsCount, setMonthsCount] = useState(3);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenureMonths, setTenureMonths] = useState(12);

  // SIP Calculator State
  const [monthlySip, setMonthlySip] = useState(500);
  const [years, setYears] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(10);

  // Calculations
  const calculatedEmergencyTarget = monthlyExpense * monthsCount;

  // EMI calculation: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const calculatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  // SIP calculation: M = P * ({[1 + i]^n - 1} / i) * (1 + i)
  const sipMonthlyRate = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const calculatedSipMaturity = Math.round(
    monthlySip *
      (((Math.pow(1 + sipMonthlyRate, totalMonths) - 1) / sipMonthlyRate) *
        (1 + sipMonthlyRate))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
          Transparent Money Calculators
        </span>
        <h1 className="text-3xl font-extrabold text-ivory">Ghada Money Tools</h1>
        <p className="text-xs text-ivory-dark max-w-md mx-auto">
          Calculate savings goals, loan EMIs, and wealth accumulation assumptions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-dark-border">
        <div className="flex gap-2 p-1 bg-dark-card rounded-xl border border-dark-border text-xs font-bold">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'emergency' ? 'bg-gold text-dark-bg shadow-gold-sm' : 'text-ivory-dark hover:text-ivory'
            }`}
          >
            Emergency Cushion
          </button>
          <button
            onClick={() => setActiveTab('emi')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'emi' ? 'bg-gold text-dark-bg shadow-gold-sm' : 'text-ivory-dark hover:text-ivory'
            }`}
          >
            Loan EMI Calculator
          </button>
          <button
            onClick={() => setActiveTab('sip')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'sip' ? 'bg-gold text-dark-bg shadow-gold-sm' : 'text-ivory-dark hover:text-ivory'
            }`}
          >
            SIP Education Calculator
          </button>
        </div>
      </div>

      {/* Tab 1: Emergency Fund */}
      {activeTab === 'emergency' && (
        <div className="p-8 rounded-3xl bg-dark-card border border-gold/30 shadow-2xl space-y-6 animate-in fade-in">
          <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <span>Emergency Cushion Target Calculator</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">
                Monthly Basic Expenses (₹)
              </label>
              <input
                type="number"
                value={monthlyExpense}
                onChange={e => setMonthlyExpense(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">
                Desired Cushion Duration (Months)
              </label>
              <select
                value={monthsCount}
                onChange={e => setMonthsCount(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              >
                <option value={1}>1 Month (Essential Buffer)</option>
                <option value={3}>3 Months (Recommended)</option>
                <option value={6}>6 Months (Full Protection)</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/15 to-dark-elevated border border-gold/40 text-center space-y-2">
            <span className="text-xs uppercase font-bold text-ivory-dark">Recommended Target Cushion</span>
            <div className="text-4xl font-extrabold text-gold">
              ₹{calculatedEmergencyTarget.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-ivory-dark">
              Saving ₹50 daily reaches this target in ~{Math.round(calculatedEmergencyTarget / 50 / 30)} months.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: EMI Calculator */}
      {activeTab === 'emi' && (
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl space-y-6 animate-in fade-in">
          <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gold" />
            <span>Transparent Loan EMI Calculator</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">Interest Rate (% p.a.)</label>
              <input
                type="number"
                value={interestRate}
                onChange={e => setInterestRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">Tenure (Months)</label>
              <input
                type="number"
                value={tenureMonths}
                onChange={e => setTenureMonths(parseInt(e.target.value, 10) || 12)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-elevated border border-dark-border text-center space-y-2">
            <span className="text-xs uppercase font-bold text-ivory-dark">Calculated Monthly EMI</span>
            <div className="text-4xl font-extrabold text-gold">₹{calculatedEmi.toLocaleString('en-IN')}</div>
            <p className="text-xs text-ivory-dark">
              Total Interest Payable: ₹{Math.max(0, calculatedEmi * tenureMonths - loanAmount).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: SIP Education Calculator */}
      {activeTab === 'sip' && (
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl space-y-6 animate-in fade-in">
          <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <span>Invest Second — SIP Wealth Education Calculator</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">Monthly SIP (₹)</label>
              <input
                type="number"
                value={monthlySip}
                onChange={e => setMonthlySip(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">Duration (Years)</label>
              <input
                type="number"
                value={years}
                onChange={e => setYears(parseInt(e.target.value, 10) || 1)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ivory-dark uppercase mb-1">Assumed Return (% p.a.)</label>
              <input
                type="number"
                value={expectedReturn}
                onChange={e => setExpectedReturn(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/15 to-dark-card border border-gold/40 text-center space-y-2">
            <span className="text-xs uppercase font-bold text-ivory-dark">Projected Wealth Cushion</span>
            <div className="text-4xl font-extrabold text-gold">₹{calculatedSipMaturity.toLocaleString('en-IN')}</div>
            <p className="text-xs text-ivory-dark">
              Invested: ₹{(monthlySip * years * 12).toLocaleString('en-IN')} • Estimated Gain: ₹{Math.max(0, calculatedSipMaturity - (monthlySip * years * 12)).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
