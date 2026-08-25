import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { JudgeDemoBar } from './components/layout/JudgeDemoBar';
import { CommandPalette } from './components/common/CommandPalette';

import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmergencyFundPage } from './pages/EmergencyFundPage';
import { ActivityPage } from './pages/ActivityPage';
import { CoachPage } from './pages/CoachPage';
import { GoalsPage } from './pages/GoalsPage';
import { LearnPage } from './pages/LearnPage';
import { PartnerPage } from './pages/PartnerPage';
import { ProfilePage } from './pages/ProfilePage';

import { GhadaHubPage } from './pages/GhadaHubPage';
import { AIBudgetPage } from './pages/AIBudgetPage';
import { ExpenseTrackerPage } from './pages/ExpenseTrackerPage';
import { DebtOrganizerPage } from './pages/DebtOrganizerPage';
import { BillsPlannerPage } from './pages/BillsPlannerPage';
import { DocumentAnalyzerPage } from './pages/DocumentAnalyzerPage';
import { MoneyToolsPage } from './pages/MoneyToolsPage';
import { FraudSafetyPage } from './pages/FraudSafetyPage';
import { EmergencyModePage } from './pages/EmergencyModePage';
import { FinancialHealthPage } from './pages/FinancialHealthPage';

import { SaveModal } from './components/features/SaveModal';
import { EmergencyWithdrawalModal } from './components/features/EmergencyWithdrawalModal';

export const AppContent: React.FC = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-ivory">
      {/* Top Header */}
      <Header onOpenSearch={() => setIsCommandPaletteOpen(true)} />

      {/* Main Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage onOpenSaveModal={() => setIsSaveModalOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/signup" element={<OnboardingPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                onOpenSaveModal={() => setIsSaveModalOpen(true)}
                onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
              />
            }
          />
          <Route
            path="/emergency-fund"
            element={
              <EmergencyFundPage
                onOpenSaveModal={() => setIsSaveModalOpen(true)}
                onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
              />
            }
          />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Super-App Modules */}
          <Route path="/hub" element={<GhadaHubPage />} />
          <Route path="/budget" element={<AIBudgetPage />} />
          <Route path="/expenses" element={<ExpenseTrackerPage />} />
          <Route path="/debt" element={<DebtOrganizerPage />} />
          <Route path="/bills" element={<BillsPlannerPage />} />
          <Route path="/documents" element={<DocumentAnalyzerPage />} />
          <Route path="/tools" element={<MoneyToolsPage />} />
          <Route path="/fraud-safety" element={<FraudSafetyPage />} />
          <Route path="/emergency-mode" element={<EmergencyModePage />} />
          <Route path="/health" element={<FinancialHealthPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav onOpenSaveModal={() => setIsSaveModalOpen(true)} />

      {/* 2-Minute Judge & Demo Control Bar */}
      <JudgeDemoBar
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Modals */}
      <SaveModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} />
      <EmergencyWithdrawalModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}
