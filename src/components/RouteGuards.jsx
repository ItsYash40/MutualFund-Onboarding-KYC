import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { user, kycState } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

export function KycRoute({ allowDraft = false }) {
  const { user, kycState } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Users can now view their KYC status and history even when verified

  
  return <Outlet />;
}

export function DashboardRoute() {
  const { user, kycState } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If KYC is not verified, send them to KYC center or status
  if (kycState.status !== 'verified') {
    if (kycState.status === 'pending') {
      return <Navigate to="/kyc/status" replace />;
    }
    return <Navigate to="/kyc" replace />;
  }
  
  return <Outlet />;
}

export function PublicRoute() {
  const { user, kycState } = useAuth();
  
  if (user) {
    if (kycState.status === 'verified') {
      return <Navigate to="/dashboard" replace />;
    } else if (kycState.status === 'pending') {
      return <Navigate to="/kyc/status" replace />;
    } else {
      return <Navigate to="/kyc" replace />;
    }
  }
  
  return <Outlet />;
}

export function AdminRoute() {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
}
