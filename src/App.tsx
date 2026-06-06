import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import PublicLayout from './layouts/PublicLayout';
import MarketingLayout from './layouts/MarketingLayout';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminStores from './pages/admin/AdminStores';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLeads from './pages/admin/AdminLeads';

// Pages - User
import UserDashboard from './pages/user/UserDashboard';
import StoreBuilder from './pages/user/StoreBuilder';
import Catalog from './pages/user/Catalog';
import Wallet from './pages/user/Wallet';
import Login from './pages/Login';

// Pages - Public
import Storefront from './pages/public/Storefront';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import PublicLanding from './pages/public/PublicLanding';
import Comparisons from './pages/public/Comparisons';
import Pricing from './pages/public/Pricing';
import UseCases from './pages/public/UseCases';
import Docs from './pages/public/Docs';
import FAQ from './pages/public/FAQ';

// Route Guards
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isAdmin } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const RootLayout = () => {
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Auto redirect to store builder if no store attached (for new user onboarding)
  if (userProfile && !userProfile.storeId && location.pathname === '/app') {
     return <Navigate to="/app/store" replace />;
  }

  return <UserLayout />;
};

function AppRoutes() {
  const { currentUser, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Marketing Routes */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={currentUser ? <Navigate to="/app" replace /> : <PublicLanding />} />
        <Route path="/comparisons" element={<Comparisons />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* Auth & Public Interfaces */}
      <Route path="/s/:slug" element={<PublicLayout><Storefront /></PublicLayout>} />
      <Route path="/login" element={currentUser ? <Navigate to="/app" replace /> : <Login isRegister={false} />} />
      <Route path="/register" element={currentUser ? <Navigate to="/app" replace /> : <Login isRegister={true} />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="stores" element={<AdminStores />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="leads" element={<AdminLeads />} />
      </Route>

      {/* App Routes */}
      <Route path="/app" element={<RootLayout />}>
        <Route index element={isAdmin ? <Navigate to="/admin" replace /> : <UserDashboard />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="store" element={<StoreBuilder />} />
        <Route path="wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
