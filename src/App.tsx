import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
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

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
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

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage onOpenSaveModal={() => setIsSaveModalOpen(true)} />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage
                  onOpenSaveModal={() => setIsSaveModalOpen(true)}
                  onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency-fund"
            element={
              <ProtectedRoute>
                <EmergencyFundPage
                  onOpenSaveModal={() => setIsSaveModalOpen(true)}
                  onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <ActivityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach"
            element={
              <ProtectedRoute>
                <CoachPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <GoalsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Super-App Modules */}
          <Route
            path="/hub"
            element={
              <ProtectedRoute>
                <GhadaHubPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <AIBudgetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpenseTrackerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/debt"
            element={
              <ProtectedRoute>
                <DebtOrganizerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <BillsPlannerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentAnalyzerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/tools" element={<MoneyToolsPage />} />
          <Route path="/fraud-safety" element={<FraudSafetyPage />} />
          <Route
            path="/emergency-mode"
            element={
              <ProtectedRoute>
                <EmergencyModePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/health"
            element={
              <ProtectedRoute>
                <FinancialHealthPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      {isAuthenticated && <BottomNav onOpenSaveModal={() => setIsSaveModalOpen(true)} />}

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
