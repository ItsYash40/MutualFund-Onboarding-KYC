import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MarketingLayout from './layouts/MarketingLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'
import { PublicRoute, ProtectedRoute, KycRoute, DashboardRoute, AdminRoute } from './components/RouteGuards'

// Lazy-load pages for code splitting
const PremiumLandingPage = lazy(() => import('./pages/PremiumLandingPage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const OnboardingDashboard = lazy(() => import('./pages/OnboardingDashboard'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const SignUpOtpPage = lazy(() => import('./pages/SignUpOtpPage'))
const OtpVerificationPage = lazy(() => import('./pages/OtpVerificationPage'))
const SetPasswordPage = lazy(() => import('./pages/SetPasswordPage'))
const ProfileSetupPage = lazy(() => import('./pages/ProfileSetupPage'))
const InvestorDashboard = lazy(() => import('./pages/InvestorDashboard'))
const KycCenterPage = lazy(() => import('./pages/KycCenterPage'))
const KycStatusPage = lazy(() => import('./pages/KycStatusPage'))
const BankVerificationPage = lazy(() => import('./pages/BankVerificationPage'))
const DocumentUploadPage = lazy(() => import('./pages/DocumentUploadPage'))
const FundDiscoveryPage = lazy(() => import('./pages/FundDiscoveryPage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-[#0f172a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-container animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
        </div>
        <p className="font-[Inter] text-sm text-on-surface-variant dark:text-slate-400 tracking-wide">Loading...</p>
      </div>
    </div>
  )
}

function SuspenseWrap({ children }) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
}

const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: '/', element: <SuspenseWrap><PremiumLandingPage /></SuspenseWrap> },
      { path: '/landing', element: <SuspenseWrap><LandingPage /></SuspenseWrap> },
      { path: '/learn', element: <SuspenseWrap><LearnPage /></SuspenseWrap> },
      { 
        element: <PublicRoute />, 
        children: [
          { path: '/login', element: <SuspenseWrap><LoginPage /></SuspenseWrap> },
          { path: '/signup', element: <SuspenseWrap><SignUpPage /></SuspenseWrap> },
          { path: '/signup/otp', element: <SuspenseWrap><SignUpOtpPage /></SuspenseWrap> },
          { path: '/verify-otp', element: <SuspenseWrap><OtpVerificationPage /></SuspenseWrap> },
          { path: '/set-password', element: <SuspenseWrap><SetPasswordPage /></SuspenseWrap> },
        ]
      }
    ],
  },
  {
    path: '/admin/login',
    element: <SuspenseWrap><AdminLogin /></SuspenseWrap>
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <SuspenseWrap><AdminDashboard /></SuspenseWrap> }
        ]
      }
    ]
  },
  {
    element: <DashboardLayout />,
    children: [
      { 
        element: <DashboardRoute />, 
        children: [
          { path: '/dashboard', element: <SuspenseWrap><InvestorDashboard /></SuspenseWrap> },
          { path: '/funds', element: <SuspenseWrap><FundDiscoveryPage /></SuspenseWrap> },
          { path: '/bank-verification', element: <SuspenseWrap><BankVerificationPage /></SuspenseWrap> },
        ]
      },
      { 
        element: <KycRoute />, 
        children: [
          { path: '/onboarding', element: <SuspenseWrap><OnboardingDashboard /></SuspenseWrap> },
          { path: '/kyc', element: <SuspenseWrap><KycCenterPage /></SuspenseWrap> },
          { path: '/kyc/status', element: <SuspenseWrap><KycStatusPage /></SuspenseWrap> },
          { path: '/documents', element: <SuspenseWrap><DocumentUploadPage /></SuspenseWrap> }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/notifications', element: <SuspenseWrap><NotificationsPage /></SuspenseWrap> },
          { path: '/setup-profile', element: <SuspenseWrap><ProfileSetupPage /></SuspenseWrap> },
        ]
      }
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
