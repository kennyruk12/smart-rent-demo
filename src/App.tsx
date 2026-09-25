import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Layout & Views
import { PublicLayout } from './views/public/PublicLayout';
import { HomePage } from './views/public/HomePage';
import { ExplorePage } from './views/public/ExplorePage';
import { PropertyDetailsPage } from './views/public/PropertyDetailsPage';
import { LocationsView } from './views/public/LocationsView';
import { HowItWorksView } from './views/HowItWorksView';
import { ForLandlordsView } from './views/ForLandlordsView';
import { AboutView } from './views/public/AboutView';
import { ContactView } from './views/public/ContactView';
import { HelpView } from './views/public/HelpView';
import { PrivacyView } from './views/public/PrivacyView';
import { TermsView } from './views/public/TermsView';

// Auth Views
import { LoginView } from './views/auth/LoginView';
import { SignupChoiceView } from './views/auth/SignupChoiceView';
import { SignupTenantView } from './views/auth/SignupTenantView';
import { SignupLandlordView } from './views/auth/SignupLandlordView';
import { ForgotPasswordView } from './views/auth/ForgotPasswordView';
import { ResetPasswordView } from './views/auth/ResetPasswordView';
import { VerifyEmailView } from './views/auth/VerifyEmailView';

// Tenant Layout & Views
import { TenantLayout } from './views/tenant/TenantLayout';
import { TenantDashboardView } from './views/tenant/TenantDashboardView';
import { TenantSavedView } from './views/tenant/TenantSavedView';
import { TenantRequestsView } from './views/tenant/TenantRequestsView';
import { TenantRequestDetailView } from './views/tenant/TenantRequestDetailView';
import { TenantNewRequestView } from './views/tenant/TenantNewRequestView';
import { TenantMessagesView } from './views/tenant/TenantMessagesView';
import { TenantNotificationsView } from './views/tenant/TenantNotificationsView';
import { TenantProfileView } from './views/tenant/TenantProfileView';
import { TenantSettingsView } from './views/tenant/TenantSettingsView';

// Landlord Layout & Views
import { LandlordLayout } from './views/landlord/LandlordLayout';
import { LandlordDashboardView } from './views/landlord/LandlordDashboardView';
import { LandlordPropertiesView } from './views/landlord/LandlordPropertiesView';
import { LandlordCreatePropertyWizard } from './views/landlord/LandlordCreatePropertyWizard';
import { LandlordManagePropertyView } from './views/landlord/LandlordManagePropertyView';
import { LandlordEditPropertyView } from './views/landlord/LandlordEditPropertyView';
import { LandlordPreviewPropertyView } from './views/landlord/LandlordPreviewPropertyView';
import { LandlordRequestsView } from './views/landlord/LandlordRequestsView';
import { LandlordRequestDetailView } from './views/landlord/LandlordRequestDetailView';
import { LandlordMessagesView } from './views/landlord/LandlordMessagesView';
import { LandlordNotificationsView } from './views/landlord/LandlordNotificationsView';
import { LandlordProfileView } from './views/landlord/LandlordProfileView';
import { LandlordSettingsView } from './views/landlord/LandlordSettingsView';

// Admin Layout & Views
import { AdminLayout } from './views/admin/AdminLayout';
import { AdminDashboardOverview } from './views/admin/AdminDashboardOverview';
import { AdminUsersView } from './views/admin/AdminUsersView';
import { AdminUserDetailView } from './views/admin/AdminUserDetailView';
import { AdminTenantsView } from './views/admin/AdminTenantsView';
import { AdminLandlordsView } from './views/admin/AdminLandlordsView';
import { AdminPropertiesView } from './views/admin/AdminPropertiesView';
import { AdminPendingPropertiesView } from './views/admin/AdminPendingPropertiesView';
import { AdminPropertyDetailView } from './views/admin/AdminPropertyDetailView';
import { AdminRequestsView } from './views/admin/AdminRequestsView';
import { AdminReportsView } from './views/admin/AdminReportsView';
import { AdminReportDetailView } from './views/admin/AdminReportDetailView';
import { AdminMessagesView } from './views/admin/AdminMessagesView';
import { AdminNotificationsView } from './views/admin/AdminNotificationsView';
import { AdminProfileView } from './views/admin/AdminProfileView';
import { AdminSettingsView } from './views/admin/AdminSettingsView';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* ============================================================== */}
              {/* 1. PUBLIC / VISITOR — NO ACCOUNT REQUIRED                      */}
              {/* ============================================================== */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/properties" element={<ExplorePage />} />
                <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                <Route path="/locations" element={<LocationsView />} />
                <Route path="/locations/:location" element={<LocationsView />} />
                <Route path="/how-it-works" element={<HowItWorksView />} />
                <Route path="/for-landlords" element={<ForLandlordsView />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="/contact" element={<ContactView />} />
                <Route path="/help" element={<HelpView />} />
                <Route path="/privacy" element={<PrivacyView />} />
                <Route path="/terms" element={<TermsView />} />
              </Route>

              {/* ============================================================== */}
              {/* 2. AUTHENTICATION ROUTES                                       */}
              {/* ============================================================== */}
              <Route path="/login" element={<LoginView />} />
              <Route path="/signup" element={<SignupChoiceView />} />
              <Route path="/signup/tenant" element={<SignupTenantView />} />
              <Route path="/signup/landlord" element={<SignupLandlordView />} />
              <Route path="/forgot-password" element={<ForgotPasswordView />} />
              <Route path="/reset-password" element={<ResetPasswordView />} />
              <Route path="/verify-email" element={<VerifyEmailView />} />

              {/* ============================================================== */}
              {/* 3. TENANT PORTAL — ROLE-PROTECTED (TENANT ONLY)               */}
              {/* ============================================================== */}
              <Route
                path="/tenant"
                element={
                  <ProtectedRoute allowedRoles={['tenant']}>
                    <TenantLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/tenant/dashboard" replace />} />
                <Route path="dashboard" element={<TenantDashboardView />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="saved" element={<TenantSavedView />} />
                <Route path="requests" element={<TenantRequestsView />} />
                <Route path="requests/:id" element={<TenantRequestDetailView />} />
                <Route path="requests/new" element={<TenantNewRequestView />} />
                <Route path="messages" element={<TenantMessagesView />} />
                <Route path="messages/:conversationId" element={<TenantMessagesView />} />
                <Route path="notifications" element={<TenantNotificationsView />} />
                <Route path="profile" element={<TenantProfileView />} />
                <Route path="settings" element={<TenantSettingsView />} />
              </Route>

              {/* ============================================================== */}
              {/* 4. LANDLORD PORTAL — ROLE-PROTECTED (LANDLORD ONLY)           */}
              {/* ============================================================== */}
              <Route
                path="/landlord"
                element={
                  <ProtectedRoute allowedRoles={['landlord']}>
                    <LandlordLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/landlord/dashboard" replace />} />
                <Route path="dashboard" element={<LandlordDashboardView />} />
                <Route path="properties" element={<LandlordPropertiesView />} />
                <Route path="properties/new" element={<Navigate to="/landlord/properties/new/basic" replace />} />
                <Route path="properties/new/:step" element={<LandlordCreatePropertyWizard />} />
                <Route path="properties/:id" element={<LandlordManagePropertyView />} />
                <Route path="properties/:id/edit" element={<LandlordEditPropertyView />} />
                <Route path="properties/:id/preview" element={<LandlordPreviewPropertyView />} />
                <Route path="requests" element={<LandlordRequestsView />} />
                <Route path="requests/:id" element={<LandlordRequestDetailView />} />
                <Route path="messages" element={<LandlordMessagesView />} />
                <Route path="messages/:conversationId" element={<LandlordMessagesView />} />
                <Route path="notifications" element={<LandlordNotificationsView />} />
                <Route path="profile" element={<LandlordProfileView />} />
                <Route path="settings" element={<LandlordSettingsView />} />
              </Route>

              {/* ============================================================== */}
              {/* 5. ADMIN PORTAL — ROLE-PROTECTED (ADMIN ONLY)                 */}
              {/* ============================================================== */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardOverview />} />
                <Route path="users" element={<AdminUsersView />} />
                <Route path="users/:id" element={<AdminUserDetailView />} />
                <Route path="tenants" element={<AdminTenantsView />} />
                <Route path="landlords" element={<AdminLandlordsView />} />
                <Route path="properties" element={<AdminPropertiesView />} />
                <Route path="properties/pending" element={<AdminPendingPropertiesView />} />
                <Route path="properties/:id" element={<AdminPropertyDetailView />} />
                <Route path="requests" element={<AdminRequestsView />} />
                <Route path="reports" element={<AdminReportsView />} />
                <Route path="reports/:id" element={<AdminReportDetailView />} />
                <Route path="messages" element={<AdminMessagesView />} />
                <Route path="notifications" element={<AdminNotificationsView />} />
                <Route path="profile" element={<AdminProfileView />} />
                <Route path="settings" element={<AdminSettingsView />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
