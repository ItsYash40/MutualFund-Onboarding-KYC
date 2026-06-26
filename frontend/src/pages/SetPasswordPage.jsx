import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="flex-grow flex items-center justify-center pt-12 pb-12 px-6 relative z-10 min-h-[calc(100vh-64px)]">
      {/* Ambient Background Glow */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary-container/30 dark:bg-primary-fixed/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-fixed-dim/20 dark:bg-primary-fixed/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md">
        {/* Context Header */}
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-[36px] text-primary-container dark:text-primary-fixed mb-2 opacity-80">lock_open</span>
          <h1 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold text-primary dark:text-white tracking-tight mb-2">Secure Your Account</h1>
          <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-400">Create a strong password to protect your investments.</p>
        </div>
        
        {/* Card Container */}
        <div className="bg-surface-container-lowest dark:bg-[#070e12]/80 rounded-xl p-8 shadow-[0_8px_30px_rgba(15,110,86,0.04)] border border-primary/10 dark:border-white/5 relative overflow-hidden backdrop-blur-sm transition-colors">
          {/* Form */}
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="space-y-2">
              <label className="font-[Inter] text-[14px] font-medium text-on-surface dark:text-slate-300" htmlFor="new_password">New Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-slate-500">lock</span>
                <input 
                  className="w-full h-[48px] pl-10 pr-10 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface dark:bg-slate-800 text-on-surface dark:text-white focus:border-primary-container dark:focus:border-primary-fixed focus:ring-[3px] focus:ring-primary-container/20 dark:focus:ring-primary-fixed/20 transition-all font-[Inter] tracking-wider outline-none" 
                  id="new_password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 hover:text-primary dark:hover:text-primary-fixed transition-colors focus:outline-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>
            
            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="font-[Inter] text-[14px] font-medium text-on-surface dark:text-slate-300" htmlFor="confirm_password">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-slate-500">lock_reset</span>
                <input 
                  className="w-full h-[48px] pl-10 pr-10 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface dark:bg-slate-800 text-on-surface dark:text-white focus:border-primary-container dark:focus:border-primary-fixed focus:ring-[3px] focus:ring-primary-container/20 dark:focus:ring-primary-fixed/20 transition-all font-[Inter] tracking-wider outline-none" 
                  id="confirm_password" 
                  placeholder="••••••••" 
                  type={showConfirmPassword ? "text" : "password"}
                  required
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 hover:text-primary dark:hover:text-primary-fixed transition-colors focus:outline-none" 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>
            
            {/* Password Requirements Hint */}
            <div className="bg-surface-container-low dark:bg-slate-800/50 p-4 rounded-lg border border-outline-variant/30 dark:border-white/5 mt-2">
              <p className="font-[Inter] text-[14px] text-on-surface-variant dark:text-slate-400 mb-2">Password must contain at least:</p>
              <ul className="space-y-1 font-[Inter] text-[14px] text-outline dark:text-slate-500 flex flex-col">
                <li className={`flex items-center space-x-2 ${hasLength ? 'text-primary dark:text-primary-fixed' : ''}`}>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>8 characters</span>
                </li>
                <li className={`flex items-center space-x-2 ${hasNumber ? 'text-primary dark:text-primary-fixed' : ''}`}>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>One number</span>
                </li>
                <li className={`flex items-center space-x-2 ${hasSpecial ? 'text-primary dark:text-primary-fixed' : ''}`}>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>One special character (!@#$%^&*)</span>
                </li>
              </ul>
            </div>
            
            {/* CTA */}
            <button 
              className="w-full h-[48px] bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed font-[Inter] text-[14px] font-medium rounded-lg hover:opacity-95 hover:shadow-md dark:hover:shadow-none transition-all flex items-center justify-center space-x-2 mt-6 group" 
              type="submit"
            >
              <span>Set Password & Continue</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-[Inter] text-[14px] text-on-surface-variant dark:text-slate-400">
            Need help? <a className="text-primary dark:text-primary-fixed hover:underline font-medium" href="#">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
