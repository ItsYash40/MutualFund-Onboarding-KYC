import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Use a mock user ID for now
    login({ id: 'user_123', name: 'Test User' });
    navigate('/kyc');
  };

  return (
    <div className="flex-grow flex items-center justify-center px-6 pt-12 pb-12 relative z-10 min-h-[calc(100vh-64px)]">
      {/* Ambient Glassmorphism Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[400px] bg-secondary-container/40 dark:bg-primary-fixed/10 rounded-[100px] blur-[80px] -z-10 pointer-events-none"></div>
      
      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-surface-container-lowest dark:bg-[#070e12] rounded-[20px] shadow-[0_24px_60px_rgba(15,110,86,0.06)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-primary/5 dark:border-white/5 p-10 relative overflow-hidden transition-colors">
        {/* Subtle internal highlight line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-80"></div>
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-surface-container dark:bg-slate-800 rounded-2xl mx-auto mb-6 flex items-center justify-center text-primary dark:text-primary-fixed shadow-sm border border-white dark:border-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[32px]">login</span>
          </div>
          <h1 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold text-on-surface dark:text-white mb-2 leading-tight tracking-tight">Welcome Back</h1>
          <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-400">Secure access to your investment portfolio</p>
        </div>
        
        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Input Group: Email/Mobile */}
          <div className="space-y-2">
            <label className="block font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-300 ml-1" htmlFor="identifier">Email or Mobile Number</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-primary-fixed transition-colors">person</span>
              <input 
                className="w-full h-[52px] pl-12 pr-4 bg-surface dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-600 text-on-surface dark:text-white placeholder:text-outline/60 dark:placeholder:text-slate-500 focus:border-primary dark:focus:border-primary-fixed focus:ring-[3px] focus:ring-secondary-container/50 dark:focus:ring-primary-fixed/20 outline-none transition-all font-[Inter] text-[16px]" 
                id="identifier" 
                placeholder="Enter your registered details" 
                type="text"
                required
              />
            </div>
          </div>
          
          {/* Input Group: Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="block font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-300" htmlFor="password">Password</label>
              <a className="font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:text-secondary dark:hover:text-primary-fixed-dim transition-colors" href="#">Forgot password?</a>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-primary-fixed transition-colors">lock</span>
              <input 
                className="w-full h-[52px] pl-12 pr-12 bg-surface dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-600 text-on-surface dark:text-white placeholder:text-outline/60 dark:placeholder:text-slate-500 focus:border-primary dark:focus:border-primary-fixed focus:ring-[3px] focus:ring-secondary-container/50 dark:focus:ring-primary-fixed/20 outline-none transition-all font-[Inter] text-[16px] tracking-widest" 
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                required
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 hover:text-on-surface dark:hover:text-slate-300 transition-colors flex items-center justify-center" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-2">
            <button 
              className="w-full h-[52px] bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed rounded-xl font-[Inter] text-[14px] font-medium shadow-md shadow-primary/20 dark:shadow-none hover:bg-secondary dark:hover:bg-primary-container/80 hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all flex items-center justify-center gap-2 group" 
              type="submit"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </form>
        
        {/* Footer Divider */}
        <div className="mt-10 pt-6 border-t border-outline-variant/30 dark:border-slate-700/50 text-center">
          <Link to="/signup" className="inline-flex items-center gap-1 font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors group">
            <span>New to FundFirst? Start your journey</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">east</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
