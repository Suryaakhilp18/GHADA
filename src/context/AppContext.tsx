import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Transaction,
  Milestone,
  Goal,
  PartnerData,
  Language,
  ExpenseItem,
  BudgetPlan,
  DebtItem,
  BillItem,
  SubscriptionItem,
  FinancialHealthScore,
} from '../types';
import { INITIAL_USER, INITIAL_TRANSACTIONS, INITIAL_MILESTONES, INITIAL_GOALS, PARTNER_DEMO_DATA, TRANSLATIONS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  currentBalance: number;
  savingStreak: number;
  transactions: Transaction[];
  milestones: Milestone[];
  goals: Goal[];
  expenses: ExpenseItem[];
  budgetPlan: BudgetPlan | null;
  debts: DebtItem[];
  bills: BillItem[];
  subscriptions: SubscriptionItem[];
  financialHealth: FinancialHealthScore;
  language: Language;
  rebuildMode: boolean;
  rebuildTarget: number;
  partnerData: PartnerData;
  designerCredit: string;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  saveAmount: (amount: number, description?: string) => void;
  withdrawEmergency: (amount: number, reason: string) => void;
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  createBudget: (budget: BudgetPlan) => void;
  addDebt: (debt: Omit<DebtItem, 'id'>) => void;
  addBill: (bill: Omit<BillItem, 'id'>) => void;
  setLanguage: (lang: Language) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  loadDemoUser: () => void;
  resetDemoData: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ghada_app_state_v2';
const DESIGNER_CREDIT = 'Designed & Developed by Surya Akhil';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ghada_is_authenticated') === 'true';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return { ...INITIAL_USER, ...(JSON.parse(saved).user || {}) };
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  const [currentBalance, setCurrentBalance] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const val = JSON.parse(saved).currentBalance;
        return typeof val === 'number' ? val : 2750;
      } catch (e) {
        return 2750;
      }
    }
    return 2750;
  });

  const [savingStreak, setSavingStreak] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const val = JSON.parse(saved).savingStreak;
        return typeof val === 'number' ? val : 12;
      } catch (e) {
        return 12;
      }
    }
    return 12;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const val = JSON.parse(saved).transactions;
        return Array.isArray(val) ? val : INITIAL_TRANSACTIONS;
      } catch (e) {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const val = JSON.parse(saved).milestones;
        return Array.isArray(val) ? val : INITIAL_MILESTONES;
      } catch (e) {
        return INITIAL_MILESTONES;
      }
    }
    return INITIAL_MILESTONES;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const val = JSON.parse(saved).goals;
        return Array.isArray(val) ? val : INITIAL_GOALS;
      } catch (e) {
        return INITIAL_GOALS;
      }
    }
    return INITIAL_GOALS;
  });

  // Initial Expenses Demo Data
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => [
    { id: 'exp-1', amount: 250, category: 'Transport', description: 'Fuel for work bike', date: 'Today' },
    { id: 'exp-2', amount: 450, category: 'Food', description: 'Weekly groceries', date: 'Yesterday' },
    { id: 'exp-3', amount: 1200, category: 'Utilities', description: 'Electricity Bill', date: 'Aug 20' },
  ]);

  // Initial Budget Plan Demo Data
  const [budgetPlan, setBudgetPlan] = useState<BudgetPlan | null>(() => ({
    income: 12000,
    essential: 6000,
    flexible: 2400,
    emergencySavings: 1800,
    goals: 1200,
    buffer: 600,
    allocations: [
      { category: 'Rent & Utilities', amount: 3500, percentage: 29 },
      { category: 'Food & Groceries', amount: 2500, percentage: 21 },
      { category: 'Emergency Fund', amount: 1800, percentage: 15 },
      { category: 'Transport', amount: 1200, percentage: 10 },
      { category: 'Personal & Flexible', amount: 1200, percentage: 10 },
      { category: 'Buffer', amount: 1800, percentage: 15 },
    ],
  }));

  // Initial Debts Demo Data
  const [debts, setDebts] = useState<DebtItem[]>(() => [
    { id: 'debt-1', loanName: 'Informal Emergency Loan', outstandingAmount: 2000, interestRate: 18, monthlyPayment: 300, category: 'Informal Lender' },
    { id: 'debt-2', loanName: 'Two-Wheeler EMI', outstandingAmount: 15000, interestRate: 11, monthlyPayment: 1200, category: 'Vehicle Loan' },
  ]);

  // Initial Bills & Subscriptions Demo Data
  const [bills, setBills] = useState<BillItem[]>(() => [
    { id: 'bill-1', name: 'Electricity Bill', amount: 650, dueDate: 'In 3 days', category: 'Electricity', isPaid: false },
    { id: 'bill-2', name: 'Mobile Recharge', amount: 299, dueDate: 'Aug 29', category: 'Mobile', isPaid: false },
    { id: 'bill-3', name: 'House Rent', amount: 3000, dueDate: 'Sep 01', category: 'Rent', isPaid: false },
  ]);

  const [subscriptions] = useState<SubscriptionItem[]>(() => [
    { id: 'sub-1', name: 'Mobile Data Pack', monthlyCost: 299, billingCycle: 'Monthly', category: 'Telecom' },
    { id: 'sub-2', name: 'Accident Protection Micro-Cover', monthlyCost: 50, billingCycle: 'Monthly', category: 'Insurance' },
  ]);

  const [language, setLanguageState] = useState<Language>('en');
  const [rebuildMode, setRebuildMode] = useState<boolean>(false);
  const [rebuildTarget, setRebuildTarget] = useState<number>(2750);

  // Calculate Financial Health Score dynamically
  const financialHealth: FinancialHealthScore = {
    overallScore: Math.round(((currentBalance / user.emergencyTarget) * 40) + Math.min(30, savingStreak * 2.5) + 30),
    emergencyCushionScore: Math.round((currentBalance / user.emergencyTarget) * 100),
    savingsHabitScore: Math.min(100, savingStreak * 8),
    goalProgressScore: 55,
    budgetHealthScore: 78,
    awarenessScore: 85,
  };

  const login = (username: string, pass: string): boolean => {
    if (username.trim().toLowerCase() === 'suryaakhilp' && pass === '28022023') {
      setIsAuthenticated(true);
      localStorage.setItem('ghada_is_authenticated', 'true');
      setUser(prev => ({ ...prev, name: 'Surya Akhil' }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ghada_is_authenticated');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setUser(prev => ({ ...prev, preferredLanguage: lang }));
  };

  const saveAmount = (amount: number, description: string = 'Savings contribution') => {
    const newBalance = currentBalance + amount;
    setCurrentBalance(newBalance);
    setSavingStreak(prev => prev + 1);

    if (rebuildMode && newBalance >= rebuildTarget) {
      setRebuildMode(false);
    }

    setGoals(prev => prev.map(g => (g.category === 'emergency' ? { ...g, current: newBalance } : g)));

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      amount,
      description,
      date: 'Just now',
      category: 'Savings',
    };
    setTransactions(prev => [newTx, ...prev]);

    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } catch (e) {}
  };

  const withdrawEmergency = (amount: number, reason: string) => {
    if (amount <= 0 || amount > currentBalance) return;
    const previousPeak = currentBalance;
    const newBalance = currentBalance - amount;

    setCurrentBalance(newBalance);
    setRebuildMode(true);
    setRebuildTarget(previousPeak);

    setGoals(prev => prev.map(g => (g.category === 'emergency' ? { ...g, current: newBalance } : g)));

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'withdrawal',
      amount,
      description: `Emergency: ${reason}`,
      date: 'Just now',
      category: 'Emergency',
      emergencyReason: reason,
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const addExpense = (exp: Omit<ExpenseItem, 'id'>) => {
    const newExp: ExpenseItem = { ...exp, id: `exp-${Date.now()}` };
    setExpenses(prev => [newExp, ...prev]);
  };

  const createBudget = (plan: BudgetPlan) => {
    setBudgetPlan(plan);
  };

  const addDebt = (debt: Omit<DebtItem, 'id'>) => {
    const newDebt: DebtItem = { ...debt, id: `debt-${Date.now()}` };
    setDebts(prev => [newDebt, ...prev]);
  };

  const addBill = (bill: Omit<BillItem, 'id'>) => {
    const newBill: BillItem = { ...bill, id: `bill-${Date.now()}` };
    setBills(prev => [newBill, ...prev]);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }));
  };

  const loadDemoUser = () => {
    setUser(INITIAL_USER);
    setCurrentBalance(2750);
    setSavingStreak(12);
    setTransactions(INITIAL_TRANSACTIONS);
    setMilestones(INITIAL_MILESTONES);
    setGoals(INITIAL_GOALS);
    setRebuildMode(false);
    setRebuildTarget(2750);
    setLanguageState('en');
    setIsAuthenticated(true);
    localStorage.setItem('ghada_is_authenticated', 'true');
  };

  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem('ghada_is_authenticated');
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        currentBalance,
        savingStreak,
        transactions,
        milestones,
        goals,
        expenses,
        budgetPlan,
        debts,
        bills,
        subscriptions,
        financialHealth,
        language,
        rebuildMode,
        rebuildTarget,
        partnerData: PARTNER_DEMO_DATA,
        designerCredit: DESIGNER_CREDIT,
        login,
        logout,
        saveAmount,
        withdrawEmergency,
        addExpense,
        createBudget,
        addDebt,
        addBill,
        setLanguage,
        updateUserProfile,
        loadDemoUser,
        resetDemoData,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
