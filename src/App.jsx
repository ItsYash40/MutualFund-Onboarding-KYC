import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register      from './pages/Register';
import Login         from './pages/Login';
import KycForm       from './pages/KycForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/register" element={<Register />} />
          <Route path="/login"    element={<Login />} />

          {/* Investor routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><UserDashboard /></ProtectedRoute>
          } />
          <Route path="/kyc-form" element={
            <ProtectedRoute><KycForm /></ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
          } />

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
