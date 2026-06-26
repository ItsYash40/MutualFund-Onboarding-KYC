import { createContext, useContext, useState, useEffect } from 'react';
import { authService, kycService, adminService } from '../api/services';
import { setTokens } from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [kycState, setKycState] = useState({
    status: 'draft',
    pan: 'pending',
    aadhaar: 'pending',
    photo: 'pending',
    signature: 'pending',
    bank: 'pending',
    panImage: null,
    aadhaarFrontImage: null,
    aadhaarBackImage: null,
    photoImage: null,
    signatureImage: null
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Check if admin (simple mock check for now, backend might handle this via roles)
        const storedIsAdmin = localStorage.getItem('fundfirst-admin') === 'true';
        if (storedIsAdmin) {
          setIsAdmin(true);
          setLoading(false);
          return;
        }

        // Fetch User
        const userRes = await authService.getMe();
        setUser(userRes.data);

        // Fetch KYC Status
        try {
          const kycRes = await kycService.getKycStatus();
          setKycState(prev => ({ ...prev, ...kycRes.data }));
        } catch (kycErr) {
          console.warn("Could not fetch KYC status", kycErr);
        }
        
      } catch (err) {
        console.error("Session initialization failed", err);
        // If 401, axios interceptor handles refresh. If it still fails, user is logged out.
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      setTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
      
      // Fetch KYC status after login
      try {
        const kycRes = await kycService.getKycStatus();
        setKycState(prev => ({ ...prev, ...kycRes.data }));
      } catch (e) { console.warn("No KYC status found yet"); }
      
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      // Backend might return tokens on register or require login
      if (res.data.accessToken) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const adminLogin = () => {
    // In a real scenario, this hits the admin login endpoint
    localStorage.setItem('fundfirst-admin', 'true');
    setIsAdmin(true);
  };

  const adminLogout = () => {
    localStorage.removeItem('fundfirst-admin');
    setIsAdmin(false);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) { console.error("Logout API failed", e); }
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAdmin(false);
    setKycState({
      status: 'draft',
      pan: 'pending',
      aadhaar: 'pending',
      photo: 'pending',
      signature: 'pending',
      bank: 'pending'
    });
  };

  // Local state update for UI progress
  const updateKyc = (field, value) => {
    setKycState(prev => ({ ...prev, [field]: value }));
  };

  // Final submission to backend
  const submitKyc = async () => {
    try {
      await kycService.submitKyc();
      setKycState(prev => ({ ...prev, status: 'pending' }));
    } catch (err) {
      console.error("KYC Submission failed", err);
      throw err;
    }
  };
  
  const approveKyc = async (kycId) => {
    try {
      await adminService.approveKyc(kycId);
      // Admin doesn't update their own KYC state, but for local simulation if needed:
    } catch (err) {
      throw err;
    }
  };

  const rejectKyc = async (kycId, reason) => {
    try {
      await adminService.rejectKyc(kycId, { reason });
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, kycState, isAdmin, loading,
      login, register, logout, adminLogin, adminLogout, 
      updateKyc, submitKyc, approveKyc, rejectKyc 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
