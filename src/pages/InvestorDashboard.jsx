import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const { kycState } = useAuth();

  const isKycVerified = kycState?.status === 'verified';
  const isKycPending = kycState?.status === 'pending';
  const isBankVerified = kycState?.bank === 'verified';
  const completedSteps = isBankVerified ? 4 : (isKycVerified ? 3 : (isKycPending ? 2 : 1));
  const progressPercent = isBankVerified ? '80%' : (isKycVerified ? '60%' : (isKycPending ? '40%' : '20%'));

  return (
    <div className="w-full animate-fade-in">
      {/* Header & Greeting Card Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        {/* Greeting Card */}
        <div className="glass-panel soft-shadow rounded-[24px] p-8 col-span-1 lg:col-span-2 relative overflow-hidden flex flex-col justify-between">
          {/* Abstract background decoration */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-container dark:bg-primary-fixed rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 dark:opacity-20"></div>
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-primary-fixed dark:bg-secondary-container rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-30 dark:opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="font-[Outfit] text-[28px] md:text-[32px] text-primary dark:text-primary-fixed font-semibold mb-2">Welcome back! 👋</h2>
            <p className="font-[Inter] text-[18px] text-on-surface-variant dark:text-surface-container-highest max-w-md">Let's get your account ready for your first investment. You're making great progress.</p>
          </div>
          
          <div className="relative z-10 mt-8 flex items-center gap-6 bg-surface-container-low/50 dark:bg-black/30 p-4 rounded-xl border border-outline-variant/30 dark:border-white/10 w-max">
            <div className="w-16 h-16 relative">
              <svg className="circular-chart text-primary dark:text-primary-fixed w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="circle-bg text-surface-variant dark:text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" stroke="currentColor"></path>
                <path className="circle text-primary dark:text-primary-fixed" strokeDasharray={`${completedSteps * 20}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" stroke="currentColor" strokeLinecap="round"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">{completedSteps * 20}%</div>
            </div>
            <div>
              <div className="font-[Inter] text-[14px] text-primary dark:text-primary-fixed font-bold uppercase tracking-wider mb-1">Onboarding Status</div>
              <div className="font-[Inter] text-[16px] text-on-surface-variant dark:text-tertiary-fixed-dim">{completedSteps} of 5 steps completed</div>
            </div>
          </div>
        </div>

        {/* Notification Preview */}
        <div className="glass-panel soft-shadow rounded-[24px] p-6 col-span-1 flex flex-col bg-surface-container-lowest/80 dark:bg-[#070e12]/80">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-[Outfit] text-[20px] text-on-surface dark:text-surface-bright font-semibold">Recent Activity</h3>
            <button 
              onClick={() => navigate('/notifications')}
              className="text-primary dark:text-primary-fixed hover:bg-secondary-container/20 dark:hover:bg-white/5 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 flex-1 justify-center">
            {isKycVerified ? (
              <div className="flex gap-4 p-3 hover:bg-surface-container-low dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-white mb-1">KYC Approved!</p>
                  <p className="font-[Inter] text-[12px] text-slate-400">Just now</p>
                </div>
              </div>
            ) : isKycPending ? (
              <div className="flex gap-4 p-3 hover:bg-surface-container-low dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-secondary-container/30 text-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">hourglass_empty</span>
                </div>
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-white mb-1">Documents Under Review</p>
                  <p className="font-[Inter] text-[12px] text-slate-400">Pending Admin Approval</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 p-3 hover:bg-surface-container-low dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-error/20 text-error flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                </div>
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-white mb-1">Action Required</p>
                  <p className="font-[Inter] text-[12px] text-slate-400">Please complete KYC</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Tracker (Pill Row) */}
      <div className="mb-10 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex items-center min-w-max gap-2 relative">
          {/* Track Line background */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant dark:bg-white/10 -z-10 translate-y-[-50%]"></div>
          {/* Track Line active */}
          <div className="absolute top-1/2 left-0 h-[2px] bg-primary dark:bg-primary-fixed -z-10 translate-y-[-50%] transition-all duration-1000" style={{ width: progressPercent }}></div>
          
          {/* Step 1: Profile (Always Done) */}
          <div className="flex flex-col items-center gap-2 w-32">
            <div className="w-8 h-8 rounded-full bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed flex items-center justify-center border-4 border-surface dark:border-[#050b0e] shadow-sm">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <span className="font-[Inter] text-[12px] text-primary dark:text-primary-fixed font-bold">Profile</span>
          </div>
          
          {/* Step 2: KYC */}
          <div className="flex flex-col items-center gap-2 w-32">
            {isKycVerified ? (
              <div className="w-8 h-8 rounded-full bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed flex items-center justify-center border-4 border-surface dark:border-[#050b0e] shadow-sm">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            ) : isKycPending ? (
              <div className="w-8 h-8 rounded-full bg-secondary-container/50 border-2 border-secondary text-secondary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-surface dark:bg-[#050b0e] border-2 border-primary dark:border-primary-fixed text-primary dark:text-primary-fixed flex items-center justify-center relative shadow-sm">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-fixed"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary dark:border-primary-fixed animate-ping opacity-20 dark:opacity-40"></div>
              </div>
            )}
            <span className={`font-[Inter] text-[12px] font-bold ${isKycVerified ? 'text-primary dark:text-primary-fixed' : (isKycPending ? 'text-secondary dark:text-secondary-fixed' : 'text-on-surface dark:text-surface-bright')}`}>
              {isKycVerified ? 'KYC Verified' : isKycPending ? 'KYC Pending' : 'KYC Docs'}
            </span>
          </div>
          
          {/* Step 3: Bank */}
          <div className="flex flex-col items-center gap-2 w-32">
            {isBankVerified ? (
              <div className="w-8 h-8 rounded-full bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed flex items-center justify-center border-4 border-surface dark:border-[#050b0e] shadow-sm">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            ) : isKycVerified ? (
              <div className="w-8 h-8 rounded-full bg-surface dark:bg-[#050b0e] border-2 border-primary dark:border-primary-fixed text-primary dark:text-primary-fixed flex items-center justify-center relative shadow-sm">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-fixed"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary dark:border-primary-fixed animate-ping opacity-20 dark:opacity-40"></div>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-surface dark:bg-[#050b0e] border-2 border-surface-variant dark:border-white/20 text-surface-variant dark:text-white/40 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[16px]">account_balance</span>
              </div>
            )}
            <span className={`font-[Inter] text-[12px] ${isBankVerified || isKycVerified ? 'text-on-surface dark:text-surface-bright font-bold' : 'text-on-surface-variant dark:text-white/40'}`}>Bank</span>
          </div>
          
          {/* Step 4: Ready */}
          <div className="flex flex-col items-center gap-2 w-32">
            {isBankVerified ? (
              <div className="w-8 h-8 rounded-full bg-surface dark:bg-[#050b0e] border-2 border-primary dark:border-primary-fixed text-primary dark:text-primary-fixed flex items-center justify-center relative shadow-sm">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-fixed"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary dark:border-primary-fixed animate-ping opacity-20 dark:opacity-40"></div>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-surface dark:bg-[#050b0e] border-2 border-surface-variant dark:border-white/20 text-surface-variant dark:text-white/40 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[16px]">flag</span>
              </div>
            )}
            <span className={`font-[Inter] text-[12px] ${isBankVerified ? 'text-on-surface dark:text-surface-bright font-bold' : 'text-on-surface-variant dark:text-white/40'}`}>Ready</span>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Card 1: Profile (Done) */}
        <div className="glass-panel bg-surface-container-lowest dark:bg-transparent rounded-2xl p-5 border border-outline-variant/20 dark:border-white/5 opacity-60 pointer-events-none">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-surface-variant dark:bg-white/10 flex items-center justify-center text-on-surface-variant dark:text-surface-container-highest">
              <span className="material-symbols-outlined">person</span>
            </div>
            <span className="bg-primary/20 text-primary-fixed px-2 py-1 rounded text-[10px] font-[Inter] font-medium uppercase tracking-wide">Complete</span>
          </div>
          <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">Complete Profile</h4>
          <div className="w-full bg-surface-variant dark:bg-white/10 rounded-full h-1.5 mb-2">
            <div className="bg-primary dark:bg-primary-fixed h-1.5 rounded-full w-full"></div>
          </div>
          <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim">Basic information provided.</p>
        </div>
        
        {/* Card 2: Documents (Dynamic) */}
        {isKycVerified ? (
          <div className="glass-panel bg-surface-container-lowest dark:bg-transparent rounded-2xl p-5 border border-outline-variant/20 dark:border-white/5 opacity-60 pointer-events-none">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant dark:bg-white/10 flex items-center justify-center text-on-surface-variant dark:text-surface-container-highest">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <span className="bg-primary/20 text-primary-fixed px-2 py-1 rounded text-[10px] font-[Inter] font-medium uppercase tracking-wide">Complete</span>
            </div>
            <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">KYC Verified</h4>
            <div className="w-full bg-surface-variant dark:bg-white/10 rounded-full h-1.5 mb-2">
              <div className="bg-primary dark:bg-primary-fixed h-1.5 rounded-full w-full"></div>
            </div>
            <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim">You are fully verified.</p>
          </div>
        ) : isKycPending ? (
          <div className="glass-panel bg-surface-container-lowest dark:bg-black/20 rounded-2xl p-5 border border-secondary/40 dark:border-secondary-fixed/30 shadow-md relative overflow-hidden cursor-pointer" onClick={() => navigate('/kyc/status')}>
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary dark:bg-secondary-fixed"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container dark:bg-secondary-fixed/20 text-secondary dark:text-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined">hourglass_empty</span>
              </div>
              <span className="bg-secondary-container dark:bg-secondary/30 text-secondary dark:text-secondary-fixed px-2 py-1 rounded text-[10px] font-[Inter] font-medium uppercase tracking-wide">Under Review</span>
            </div>
            <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">KYC Pending</h4>
            <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim mb-4">We are reviewing your submitted documents.</p>
            <button className="w-full py-2 bg-secondary/10 dark:bg-secondary-fixed/10 text-secondary dark:text-secondary-fixed rounded-lg font-[Inter] font-medium text-[13px] hover:bg-secondary/20 transition-colors">
              Check Status
            </button>
          </div>
        ) : (
          <div className="glass-panel bg-surface-container-lowest dark:bg-black/20 rounded-2xl p-5 border border-primary/40 dark:border-primary-fixed/30 shadow-[0_8px_24px_rgba(15,110,86,0.08)] relative overflow-hidden transform hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/documents')}>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary dark:bg-primary-fixed"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container dark:bg-primary-fixed/20 text-on-primary-container dark:text-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="bg-error-container dark:bg-error/30 text-error dark:text-error-container px-2 py-1 rounded text-[10px] font-[Inter] font-medium uppercase tracking-wide animate-pulse">Action Needed</span>
            </div>
            <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">Upload Documents</h4>
            <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim mb-4">PAN and Aadhar required for verification.</p>
            <button className="w-full py-2 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-lg font-[Inter] font-medium text-[13px] hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-colors">
              Upload Now
            </button>
          </div>
        )}
        
        {/* Card 3: Bank (Dynamic) */}
        {isBankVerified ? (
          <div className="glass-panel bg-surface-container-lowest dark:bg-transparent rounded-2xl p-5 border border-outline-variant/20 dark:border-white/5 opacity-60 pointer-events-none">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant dark:bg-white/10 flex items-center justify-center text-on-surface-variant dark:text-surface-container-highest">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <span className="bg-primary/20 text-primary-fixed px-2 py-1 rounded text-[10px] font-[Inter] font-medium uppercase tracking-wide">Complete</span>
            </div>
            <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">Bank Linked</h4>
            <div className="w-full bg-surface-variant dark:bg-white/10 rounded-full h-1.5 mb-2">
              <div className="bg-primary dark:bg-primary-fixed h-1.5 rounded-full w-full"></div>
            </div>
            <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim">Account is ready for transactions.</p>
          </div>
        ) : isKycVerified ? (
          <div className="glass-panel bg-surface-container-lowest dark:bg-black/20 rounded-2xl p-5 border border-primary/40 dark:border-primary-fixed/30 shadow-[0_8px_24px_rgba(15,110,86,0.08)] relative overflow-hidden transform hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/bank-verification')}>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary dark:bg-primary-fixed"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container dark:bg-primary-fixed/20 text-on-primary-container dark:text-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <span className="bg-error-container dark:bg-error/30 text-error dark:text-error-container px-2 py-1 rounded text-[10px] font-[Inter] font-medium uppercase tracking-wide animate-pulse">Action Needed</span>
            </div>
            <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">Verify Bank</h4>
            <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim mb-4">Link your bank account to start investing.</p>
            <button className="w-full py-2 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-lg font-[Inter] font-medium text-[13px] hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-colors">
              Link Bank
            </button>
          </div>
        ) : (
          <div className="glass-panel bg-surface-container-lowest dark:bg-transparent rounded-2xl p-5 border border-outline-variant/20 dark:border-white/5 opacity-50 grayscale pointer-events-none">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant dark:bg-white/10 flex items-center justify-center text-on-surface-variant dark:text-white/40">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <span className="material-symbols-outlined text-surface-variant dark:text-white/40">lock</span>
            </div>
            <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">Verify Bank</h4>
            <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim">Link account for transactions.</p>
          </div>
        )}
        
        {/* Card 4: Learn */}
        <div 
          className="glass-panel bg-surface-container-lowest dark:bg-transparent rounded-2xl p-5 border border-outline-variant/20 dark:border-white/5 hover:shadow-md transition-all cursor-pointer group"
          onClick={() => navigate('/learn')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container/30 dark:bg-primary-fixed/10 text-primary dark:text-primary-fixed flex items-center justify-center group-hover:bg-primary-container dark:group-hover:bg-primary-fixed/30 group-hover:text-on-primary-container dark:group-hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
          </div>
          <h4 className="font-[Outfit] text-[18px] text-on-surface dark:text-surface-bright font-semibold mb-2">New to Investing?</h4>
          <p className="font-[Inter] text-[13px] text-on-surface-variant dark:text-tertiary-fixed-dim mb-4">Read our 5-minute guide to mutual funds.</p>
          <div className="flex items-center text-primary dark:text-primary-fixed font-[Inter] font-medium text-[13px] group-hover:underline">
            Read guide <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Next Step Banner */}
      {isBankVerified ? (
        <div className="bg-primary-fixed-dim/20 dark:bg-primary-fixed/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20 dark:border-primary-fixed/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">savings</span>
            </div>
            <div>
              <h3 className="font-[Outfit] text-[20px] text-on-surface dark:text-surface-bright font-bold mb-1">You're all set! Start Investing</h3>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-tertiary-fixed-dim max-w-lg">Your account is fully verified and linked to your bank. You can now browse our funds and make your first investment.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/funds')}
            className="w-full md:w-auto px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-xl font-[Inter] text-[14px] font-medium hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined">trending_up</span>
            Browse Funds
          </button>
        </div>
      ) : isKycVerified ? (
        <div className="bg-primary-fixed-dim/20 dark:bg-primary-fixed/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20 dark:border-primary-fixed/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div>
              <h3 className="font-[Outfit] text-[20px] text-on-surface dark:text-surface-bright font-bold mb-1">Your next step: Link Bank Account</h3>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-tertiary-fixed-dim max-w-lg">Add your primary bank account securely to enable fast deposits and withdrawals for your investments.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/bank-verification')}
            className="w-full md:w-auto px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-xl font-[Inter] text-[14px] font-medium hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined">account_balance</span>
            Link Bank Account
          </button>
        </div>
      ) : isKycPending ? (
        <div className="bg-secondary-fixed-dim/20 dark:bg-secondary-fixed/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-secondary/20 dark:border-secondary-fixed/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary dark:bg-secondary-fixed text-on-secondary flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">hourglass_empty</span>
            </div>
            <div>
              <h3 className="font-[Outfit] text-[20px] text-on-surface dark:text-surface-bright font-bold mb-1">KYC Under Review</h3>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-tertiary-fixed-dim max-w-lg">Our admin team is reviewing your documents. You will be notified via email once approved.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/kyc/status')}
            className="w-full md:w-auto px-8 py-4 bg-surface-variant text-white rounded-xl font-[Inter] text-[14px] font-medium hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined">sync</span>
            View Status
          </button>
        </div>
      ) : (
        <div className="bg-primary-fixed-dim/20 dark:bg-primary-fixed/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20 dark:border-primary-fixed/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">priority_high</span>
            </div>
            <div>
              <h3 className="font-[Outfit] text-[20px] text-on-surface dark:text-surface-bright font-bold mb-1">Your next step: PAN Verification</h3>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-tertiary-fixed-dim max-w-lg">We need a clear photo of your PAN card to comply with regulatory requirements. This usually takes less than 2 minutes.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/documents')}
            className="w-full md:w-auto px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-xl font-[Inter] text-[14px] font-medium hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined">photo_camera</span>
            Scan PAN Card
          </button>
        </div>
      )}
    </div>
  );
}
