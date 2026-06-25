import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  
  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/signup/otp');
  };

  return (
    <div className="flex-grow flex items-center justify-center pt-12 pb-12 px-6 relative z-10 min-h-[calc(100vh-64px)]">
      {/* Ambient Background Glow */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary-container/30 dark:bg-primary-fixed/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-fixed-dim/20 dark:bg-primary-fixed/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      
      {/* Sign Up Card Container */}
      <div className="glass-panel dark:bg-[#070e12]/80 w-full max-w-[520px] rounded-2xl p-8 md:p-10 relative overflow-hidden transition-colors">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold text-on-surface dark:text-white mb-2 leading-tight tracking-tight">Create your account</h1>
          <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-400">Join FundFirst to start your investment journey.</p>
        </div>
        
        {/* Form Flow Container */}
        <div className="relative transition-all duration-300">
          {/* Step 1: Basic Details */}
          <form className="flex flex-col gap-6" onSubmit={handleContinue}>
            {/* Full Name */}
            <div>
              <label className="block font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-300 mb-2" htmlFor="fullName">Full Name (as per PAN)</label>
              <div className="relative">
                <input 
                  className={`input-field w-full h-[48px] px-4 rounded-lg border ${fullName.length > 3 ? 'border-primary bg-primary/5 dark:bg-primary-fixed/5 dark:border-primary-fixed' : 'border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800'} text-on-surface dark:text-white font-[Inter] text-[16px] focus:border-primary dark:focus:border-primary-fixed outline-none`} 
                  id="fullName" 
                  placeholder="e.g. Jane Doe" 
                  required 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {fullName.length > 3 && (
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary dark:text-primary-fixed">check_circle</span>
                )}
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label className="block font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-300 mb-2" htmlFor="email">Email Address</label>
              <input 
                className="input-field w-full h-[48px] px-4 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-white font-[Inter] text-[16px] focus:border-primary dark:focus:border-primary-fixed outline-none" 
                id="email" 
                placeholder="name@example.com" 
                required 
                type="email"
              />
            </div>
            
            {/* Mobile */}
            <div>
              <label className="block font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-300 mb-2" htmlFor="mobile">Mobile Number</label>
              <div className="flex gap-2">
                <div className="flex items-center justify-center w-16 h-[48px] rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-[Inter] text-[16px]">
                  +91
                </div>
                <input 
                  className="input-field flex-grow h-[48px] px-4 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-white font-[Inter] text-[16px] focus:border-primary dark:focus:border-primary-fixed outline-none" 
                  id="mobile" 
                  pattern="[0-9]{10}" 
                  placeholder="98765 43210" 
                  required 
                  type="tel"
                />
              </div>
              <div className="mt-2 flex items-center gap-1 text-primary dark:text-primary-fixed">
                <span className="material-symbols-outlined text-[14px]">info</span>
                <span className="text-[12px] font-medium tracking-wide">Why we need your mobile number</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-primary/10 dark:border-white/5">
              <button 
                className="w-full h-[48px] bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed font-[Inter] text-[14px] font-medium rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
                type="submit"
              >
                Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Trust Line */}
        <div className="mt-10 pt-6 border-t border-primary/10 dark:border-white/5 flex items-center justify-center gap-2 text-on-surface-variant dark:text-slate-400 opacity-80">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span className="text-[12px] font-medium tracking-wide">Your data is encrypted and never shared.</span>
        </div>
        <div className="mt-4 text-center">
            <Link to="/login" className="font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:underline">
              Already have an account? Log in
            </Link>
        </div>
      </div>
    </div>
  );
}
