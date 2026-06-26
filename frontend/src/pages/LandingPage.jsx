import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-surface dark:bg-[#0f172a] transition-colors duration-300">
        {/* Decorative Background Blurs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-container/40 dark:bg-primary-fixed/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-fixed-dim/20 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-[Outfit] text-[48px] md:text-[64px] leading-[1.2] md:leading-[1.1] font-semibold tracking-tight mb-8 max-w-4xl mx-auto text-gradient-teal dark:text-gradient-teal">
            Your first mutual fund, made simple.
          </h1>
          <p className="font-[Inter] text-[18px] leading-[1.65] text-on-surface-variant dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            A safe, guided, and transparent way to start investing. No confusing jargon, just clear steps to secure your financial future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto bg-primary-container dark:bg-primary-fixed text-on-primary dark:text-[#002117] font-[Inter] text-[14px] font-medium px-8 py-4 rounded-full shadow-[0_8px_20px_rgba(15,110,86,0.2)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_24px_rgba(15,110,86,0.3)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-all transform hover:-translate-y-1"
            >
              Start for free
            </button>
            <button className="w-full sm:w-auto bg-surface-container-low dark:bg-transparent border border-primary dark:border-primary-fixed text-primary dark:text-primary-fixed font-[Inter] text-[14px] font-medium px-8 py-4 rounded-full hover:bg-primary/5 dark:hover:bg-primary-fixed/5 transition-colors">
              Learn how it works
            </button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-surface-variant dark:border-slate-800 bg-surface-container-lowest/50 dark:bg-[#070e12]/50 backdrop-blur-sm py-8 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center justify-center gap-3 text-on-surface-variant dark:text-slate-300">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">enhanced_encryption</span>
            <span className="font-[Inter] text-[14px] font-medium">256-bit encryption</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-on-surface-variant dark:text-slate-300">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">verified</span>
            <span className="font-[Inter] text-[14px] font-medium">SEBI registered</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-on-surface-variant dark:text-slate-300">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">groups</span>
            <span className="font-[Inter] text-[14px] font-medium">2 lakh+ investors</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-on-surface-variant dark:text-slate-300">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">security</span>
            <span className="font-[Inter] text-[14px] font-medium">Aadhaar-safe</span>
          </div>
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="py-24 px-6 bg-surface dark:bg-[#0f172a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] font-semibold text-on-background dark:text-white mb-4">How it works</h2>
            <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300">Four simple steps to start your investment journey.</p>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant dark:bg-slate-700 -z-10 -translate-y-1/2"></div>
            
            {/* Step 1 */}
            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-1/4 bg-surface dark:bg-[#0f172a] md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-primary-container dark:bg-primary-fixed text-on-primary dark:text-[#002117] flex items-center justify-center font-[JetBrains_Mono] text-[16px] font-medium shadow-lg border-4 border-surface dark:border-[#0f172a]">
                1
              </div>
              <div className="text-left md:text-center">
                <h3 className="font-[Outfit] text-[18px] md:text-[24px] font-semibold text-on-background dark:text-white">Create Account</h3>
                <p className="font-[Inter] text-[14px] text-on-surface-variant dark:text-slate-400 mt-1">Basic details to get started.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-1/4 bg-surface dark:bg-[#0f172a] md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 flex items-center justify-center font-[JetBrains_Mono] text-[16px] font-medium shadow-sm border-4 border-surface dark:border-[#0f172a]">
                2
              </div>
              <div className="text-left md:text-center">
                <h3 className="font-[Outfit] text-[18px] md:text-[24px] font-semibold text-on-background dark:text-white">Complete KYC</h3>
                <p className="font-[Inter] text-[14px] text-on-surface-variant dark:text-slate-400 mt-1">100% paperless verification.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-1/4 bg-surface dark:bg-[#0f172a] md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 flex items-center justify-center font-[JetBrains_Mono] text-[16px] font-medium shadow-sm border-4 border-surface dark:border-[#0f172a]">
                3
              </div>
              <div className="text-left md:text-center">
                <h3 className="font-[Outfit] text-[18px] md:text-[24px] font-semibold text-on-background dark:text-white">Verify Bank</h3>
                <p className="font-[Inter] text-[14px] text-on-surface-variant dark:text-slate-400 mt-1">Link account securely.</p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-1/4 bg-surface dark:bg-[#0f172a] md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 flex items-center justify-center font-[JetBrains_Mono] text-[16px] font-medium shadow-sm border-4 border-surface dark:border-[#0f172a]">
                4
              </div>
              <div className="text-left md:text-center">
                <h3 className="font-[Outfit] text-[18px] md:text-[24px] font-semibold text-on-background dark:text-white">Start Investing</h3>
                <p className="font-[Inter] text-[14px] text-on-surface-variant dark:text-slate-400 mt-1">Pick a fund and invest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
