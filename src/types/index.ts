export type Language = 
  | 'en' // English
  | 'te' // Telugu తెలుగు
  | 'hi' // Hindi हिन्दी
  | 'kn' // Kannada ಕನ್ನಡ
  | 'ta' // Tamil தமிழ்
  | 'mr' // Marathi मराठी
  | 'ml' // Malayalam
  | 'bn' // Bengali
  | 'gu' // Gujarati
  | 'pa' // Punjabi
  | 'or' // Odia
  | 'ur'; // Urdu

export type Occupation = 'Construction' | 'Agriculture' | 'Driving' | 'Small Business' | 'Domestic Work' | 'Other';

export type IncomeRange = 'Under ₹10,000' | '₹10,000–₹15,000' | '₹15,000–₹25,000' | '₹25,000+';

export type IncomePattern = 'Mostly regular' | 'Sometimes changes' | 'Highly irregular';

export type TransactionType = 'deposit' | 'withdrawal' | 'milestone';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category?: string;
  emergencyReason?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  occupation: Occupation;
  incomeRange: IncomeRange;
  incomePattern: IncomePattern;
  preferredLanguage: Language;
  emergencyTarget: number;
  savingPreference: number;
  monthlyIncome?: number;
}

export interface Milestone {
  amount: number;
  label: string;
  reached: boolean;
  date?: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  category: 'emergency' | 'health' | 'work' | 'education' | 'vehicle' | 'family';
  isLocked: boolean;
  lockReason?: string;
  iconName: string;
  timelineMonths?: number;
}

export interface PartnerData {
  companyName: string;
  totalEnrolled: number;
  activeSavers: number;
  avgProgressPercent: number;
  firstGoalReachedCount: number;
  monthlyGrowthPercent: number;
  totalSavedByWorkers: number;
}

export interface ExpenseItem {
  id: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Rent' | 'Utilities' | 'Health' | 'Education' | 'Family' | 'Entertainment' | 'Shopping' | 'Other';
  description: string;
  date: string;
}

export interface BudgetCategoryAllocation {
  category: string;
  amount: number;
  percentage: number;
}

export interface BudgetPlan {
  income: number;
  essential: number;
  flexible: number;
  emergencySavings: number;
  goals: number;
  buffer: number;
  allocations: BudgetCategoryAllocation[];
}

export interface DebtItem {
  id: string;
  loanName: string;
  outstandingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  category: 'Informal Lender' | 'Bank Loan' | 'Microfinance' | 'Personal' | 'Vehicle Loan';
}

export interface BillItem {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: 'Rent' | 'Electricity' | 'Mobile' | 'Internet' | 'School Fees' | 'Subscription' | 'Loan Payment';
  isPaid: boolean;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  monthlyCost: number;
  billingCycle: string;
  category: string;
}

export interface FraudAnalysisResult {
  messageSnippet: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  warningSigns: string[];
  recommendation: string;
  detectedLanguage: string;
}

export interface FinancialHealthScore {
  overallScore: number; // 0 - 100
  emergencyCushionScore: number;
  savingsHabitScore: number;
  goalProgressScore: number;
  budgetHealthScore: number;
  awarenessScore: number;
}

export interface AIResponse {
  text: string;
  detectedLanguage: Language;
  isCodeSwitched: boolean;
  structuredCard?: {
    title: string;
    subtitle?: string;
    metrics?: { label: string; value: string }[];
    actionButton?: { label: string; actionType: string; payload?: any };
  };
  navigationTarget?: string;
}
