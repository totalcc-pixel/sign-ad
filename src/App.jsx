import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import CategoryPortfolio from '@/pages/CategoryPortfolio';
import Quote from '@/pages/Quote';
import AdminPortfolio from '@/pages/AdminPortfolio';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import MyDesign from '@/pages/MyDesign';
// Add page imports here

const LoginRedirect = () => {
  const { navigateToLogin } = useAuth();
  useEffect(() => {
    navigateToLogin();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white/70">
      Redirecting to login…
    </div>
  );
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/vehicle-graphics" element={<CategoryPortfolio category="Vehicle Graphic" />} />
        <Route path="/portfolio/building-signs" element={<CategoryPortfolio category="Building Sign" />} />
        <Route path="/quote" element={<Quote />} />
        <Route element={<ProtectedRoute unauthenticatedElement={<LoginRedirect />} />}>
          <Route path="/my-design" element={<MyDesign />} />
          <Route path="/admin" element={<AdminPortfolio />} />
        </Route>
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App