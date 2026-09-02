import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';

import { DemoRoleBar } from './components/common/DemoRoleBar';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { CropRegistrationPage } from './pages/farmer/CropRegistrationPage';
import { TokenDetailsPage } from './pages/farmer/TokenDetailsPage';
import { CropJourneyPage } from './pages/farmer/CropJourneyPage';
import { PaymentStatusPage } from './pages/farmer/PaymentStatusPage';
import { CentresPage } from './pages/farmer/CentresPage';
import { DocumentsPage } from './pages/farmer/DocumentsPage';
import { NotificationsPage } from './pages/farmer/NotificationsPage';
import { GrievancePage } from './pages/farmer/GrievancePage';
import { ProfilePage } from './pages/farmer/ProfilePage';

import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

import { ProtectedRoute, RoleRoute } from './components/common/ProtectedRoutes';

const MainLayout = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <DemoRoleBar />
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      {role === 'FARMER' && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              {/* Public Landing & Login */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Main Authenticated Layout */}
              <Route element={<MainLayout />}>
                
                {/* Farmer Routes */}
                <Route element={<RoleRoute role="FARMER" />}>
                  <Route path="/farmer" element={<FarmerDashboard />} />
                  <Route path="/farmer/register-crop" element={<CropRegistrationPage />} />
                  <Route path="/farmer/token" element={<TokenDetailsPage />} />
                  <Route path="/farmer/journey" element={<CropJourneyPage />} />
                  <Route path="/farmer/payments" element={<PaymentStatusPage />} />
                  <Route path="/farmer/centres" element={<CentresPage />} />
                  <Route path="/farmer/documents" element={<DocumentsPage />} />
                  <Route path="/farmer/notifications" element={<NotificationsPage />} />
                  <Route path="/farmer/grievances" element={<GrievancePage />} />
                  <Route path="/farmer/profile" element={<ProfilePage />} />
                </Route>

                {/* Officer Routes */}
                <Route element={<RoleRoute role="OFFICER" />}>
                  <Route path="/officer" element={<OfficerDashboard />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<RoleRoute role="ADMIN" />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Route>

              {/* Catch all redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
