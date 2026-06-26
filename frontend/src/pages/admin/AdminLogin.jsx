import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate admin login
    if (email === 'admin@fundfirst.com' && password === 'admin') {
      adminLogin();
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. (Hint: admin@fundfirst.com / admin)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070e12]">
      <div className="w-full max-w-md p-8 bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-fixed/10 text-primary-fixed flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>
          <h1 className="font-[Outfit] text-2xl text-white font-bold">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Authorized personnel only.</p>
        </div>

        {error && (
          <div className="bg-error/10 text-error px-4 py-3 rounded-lg mb-6 text-sm font-medium border border-error/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-fixed transition-colors"
              placeholder="admin@fundfirst.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-fixed transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-fixed text-[#0f172a] font-semibold py-3 rounded-lg mt-2 hover:bg-primary-fixed-dim transition-colors"
          >
            Access Portal
          </button>
        </form>
      </div>
    </div>
  );
}
