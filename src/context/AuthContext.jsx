import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Try to load from localStorage, otherwise default state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fundfirst-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [kycState, setKycState] = useState(() => {
    const saved = localStorage.getItem('fundfirst-kyc');
    return saved ? JSON.parse(saved) : {
      status: 'draft', // 'draft', 'pending', 'verified', 'rejected'
      pan: 'pending', // 'pending', 'uploaded', 'verified'
      aadhaar: 'pending',
      photo: 'pending',
      signature: 'pending',
      bank: 'pending',
      panImage: null,
      aadhaarFrontImage: null,
      aadhaarBackImage: null,
      photoImage: null,
      signatureImage: null
    };
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('fundfirst-admin') === 'true';
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('fundfirst-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fundfirst-user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fundfirst-kyc', JSON.stringify(kycState));
  }, [kycState]);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('fundfirst-admin', 'true');
    } else {
      localStorage.removeItem('fundfirst-admin');
    }
  }, [isAdmin]);

  const login = (userData) => {
    setUser(userData);
  };

  const adminLogin = () => {
    setIsAdmin(true);
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    // Optional: reset KYC state on logout for testing purposes
    setKycState({
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
  };

  const updateKyc = (field, value) => {
    setKycState(prev => {
      const newState = { ...prev, [field]: value };
      
      // Auto-update overall status based on document statuses
      const allDocsUploaded = 
        newState.pan !== 'pending' && 
        newState.aadhaar !== 'pending' && 
        newState.photo !== 'pending' && 
        newState.signature !== 'pending';
        
      if (allDocsUploaded && newState.status === 'draft') {
        newState.status = 'pending'; // Changed to pending review
      }
      
      return newState;
    });
  };

  const submitKyc = () => {
    setKycState(prev => ({ ...prev, status: 'pending' }));
  };
  
  const approveKyc = () => {
    setKycState(prev => ({ 
      ...prev, 
      status: 'verified',
      pan: 'verified',
      aadhaar: 'verified',
      photo: 'verified',
      signature: 'verified'
    }));
  };

  const rejectKyc = () => {
    setKycState(prev => ({ 
      ...prev, 
      status: 'rejected',
      pan: 'pending',
      aadhaar: 'pending',
      photo: 'pending',
      signature: 'pending',
      panImage: null,
      aadhaarFrontImage: null,
      aadhaarBackImage: null,
      photoImage: null,
      signatureImage: null
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, kycState, isAdmin, 
      login, logout, adminLogin, adminLogout, 
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
