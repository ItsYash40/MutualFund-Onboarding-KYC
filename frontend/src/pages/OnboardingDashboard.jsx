import { useNavigate } from 'react-router-dom';

export default function OnboardingDashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 px-6 overflow-hidden bg-surface dark:bg-[#0f172a] transition-colors duration-300">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-full md:w-2/3 h-full relative">
            <img 
              alt="Couple checking investments" 
              className="w-full h-full object-cover object-right md:object-center opacity-90" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABKUvIMWDJiW1OEU0GBaOTCLlox3r0gXFPyz6NW8nuD83tt_8FN_-gYQjeghSVTQ_0upbulxc5IVcK7AqHF3UpjXmjNr-yhnV8RnneVqxhbd_ChN5-FbeDWHwXzW5zM1lnWhwA5HKDa0_FK-TwbtRigg9IgelQ68x-orI6ABTEN0U3s1Q0u1y38hgUnAmCv3sqs8bxEZ6pRyzp9X0zN7vG_j-4Q2rA95jwHTQvI1NWGLKj9oPj-a9fTnw6_5B_isVME3Lbz_lENw4"
            />
            <div className="absolute inset-0 image-gradient-overlay dark:from-[#0f172a] dark:via-[#0f172a]/80 dark:to-transparent"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 w-full flex">
          <div className="w-full md:w-3/5 lg:w-1/2 glass-card p-10 md:p-14 rounded-3xl">
            <h1 className="font-[Outfit] text-[40px] md:text-[56px] leading-[1.1] mb-6 text-on-background dark:text-white font-bold tracking-tight">
              Your first mutual fund, <span className="text-primary dark:text-primary-fixed">made simple.</span>
            </h1>
            <p className="font-[Inter] text-[18px] text-on-surface-variant dark:text-slate-300 mb-10 max-w-lg leading-relaxed">
              A safe, guided, and transparent way to start investing. No confusing jargon, just clear steps to secure your financial future with absolute trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed font-[Inter] text-[14px] px-8 py-4 rounded-full shadow-[0_8px_20px_rgba(0,84,64,0.2)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_24px_rgba(0,84,64,0.3)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-all transform hover:-translate-y-1 font-medium"
              >
                Start for free
              </button>
              <button className="w-full sm:w-auto bg-surface dark:bg-transparent border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-300 font-[Inter] text-[14px] px-8 py-4 rounded-full hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors font-medium">
                Learn how it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="py-16 px-6 bg-surface-container-lowest/50 dark:bg-[#070e12]/50 border-y border-surface-variant dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-fixed/10 flex items-center justify-center text-primary dark:text-primary-fixed mb-2">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>enhanced_encryption</span>
              </div>
              <h4 className="font-[Outfit] text-[16px] text-on-background dark:text-white font-semibold">Bank-grade Security</h4>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">256-bit encryption</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-fixed/10 flex items-center justify-center text-primary dark:text-primary-fixed mb-2">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h4 className="font-[Outfit] text-[16px] text-on-background dark:text-white font-semibold">SEBI Registered</h4>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">Regulated & compliant</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-fixed/10 flex items-center justify-center text-primary dark:text-primary-fixed mb-2">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <h4 className="font-[Outfit] text-[16px] text-on-background dark:text-white font-semibold">Trusted Community</h4>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">2 lakh+ investors</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-fixed/10 flex items-center justify-center text-primary dark:text-primary-fixed mb-2">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
              </div>
              <h4 className="font-[Outfit] text-[16px] text-on-background dark:text-white font-semibold">Seamless Verification</h4>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">Aadhaar-safe KYC</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center border border-surface-variant dark:border-slate-700/50 bg-surface-container-low/50 dark:bg-slate-800/30">
            <div className="flex justify-center mb-6">
              <div className="flex text-primary dark:text-primary-fixed">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <p className="font-[Outfit] text-[24px] text-on-background dark:text-white italic mb-8 leading-relaxed font-medium">
              "FundFirst made investing feel less like a chore and more like a simple habit. I finally understand where my money is going and watching it grow is incredibly satisfying."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant dark:bg-slate-700 overflow-hidden">
                <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4AXn_w5jmdSzfWDtfDOGNYxc732yuqWu-BgnAyiC-h5T65O4K3rQBW8swDCmQMPknn87OtXAQbFjv3D88xBJctv8wAl0K5oQQE2eKe4QYpWgR-qRd0d2GVubxd7cGnjZgoga1JXinF8YR-CRdX0nNISg22RsFXcJybDskHAxb4xuW23cqvqxDGKYjWrvvYRCP5lrH1gKLn8XHjl5bk8PBeGVCoWfTBWqzlY4JeY77od7JoQ_BPOT56pg6LCIls5fhGuda12P_-eg"/>
              </div>
              <div className="text-left">
                <p className="font-[Inter] text-[16px] text-on-background dark:text-white font-semibold">Priya Sharma</p>
                <p className="text-sm text-on-surface-variant dark:text-slate-400">First-time investor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 px-6 bg-surface dark:bg-[#0f172a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl dark:shadow-none dark:border dark:border-slate-800">
              <img alt="Professional wealth management" className="w-full h-auto object-cover aspect-[4/3]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDexd7psR3f7cWP8u7n4X3hyawqd7DVkXYM8XksZ2y7oou5jvZWWTBgQXLgl1i5GviIYiZMb0F63JXatPsvMB5F5qiO3R_Ja7DKLUbdZyM47mn1W7wwzvNS3nbdayLRoB7JQ4W_ryPlRKHpruDjy0Nc-U9rWzcKu2p8rS4Cd7420tWjZLEkeHc84vy4lR4yTcjkVIwi_LEdBGyC1cz3RwtF5Taeasazy9vNTSiwV0UCYHfQZ-w1aHvO_ROTBgTwEJucsZq9kLTS3nE"/>
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/40 dark:from-[#0f172a]/80 to-transparent"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] text-on-background dark:text-white font-bold mb-6 leading-tight">
              Invest for your future.
            </h2>
            <p className="font-[Inter] text-[18px] text-on-surface-variant dark:text-slate-300 mb-8 leading-relaxed">
              Professional wealth management shouldn't be exclusive to the ultra-rich. We bring institutional-grade investment strategies to everyone, packaged in an experience that is intuitive, transparent, and built entirely around your life goals.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed mt-1">check_circle</span>
                <span className="text-on-background dark:text-slate-200">Curated, high-performing mutual fund portfolios.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed mt-1">check_circle</span>
                <span className="text-on-background dark:text-slate-200">Zero hidden fees or complicated commission structures.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed mt-1">check_circle</span>
                <span className="text-on-background dark:text-slate-200">Automated SIPs to build wealth effortlessly over time.</span>
              </li>
            </ul>
            <a className="inline-flex items-center gap-2 text-primary dark:text-primary-fixed font-[Inter] text-[16px] font-semibold hover:gap-3 transition-all cursor-pointer" onClick={() => navigate('/learn')}>
              Explore our investment approach <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 px-6 bg-surface-container-low dark:bg-[#111827] border-y border-surface-variant dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] text-on-background dark:text-white font-bold mb-6 leading-tight">
              Growth you can track.
            </h2>
            <p className="font-[Inter] text-[18px] text-on-surface-variant dark:text-slate-300 mb-8 leading-relaxed">
              Watch your money work for you with our beautiful, real-time tracking experience. Whether you're checking on your morning commute or reviewing monthly progress, your financial picture is always clear, accessible, and elegantly presented.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-surface dark:bg-slate-800 p-6 rounded-2xl border border-surface-variant dark:border-slate-700">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed mb-3 text-[32px]">monitoring</span>
                <h4 className="font-[Outfit] text-[18px] font-semibold text-on-background dark:text-white mb-2">Real-time Insights</h4>
                <p className="text-sm text-on-surface-variant dark:text-slate-400">Live updates on how your investments are performing in the market.</p>
              </div>
              <div className="bg-surface dark:bg-slate-800 p-6 rounded-2xl border border-surface-variant dark:border-slate-700">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed mb-3 text-[32px]">account_balance_wallet</span>
                <h4 className="font-[Outfit] text-[18px] font-semibold text-on-background dark:text-white mb-2">Unified Dashboard</h4>
                <p className="text-sm text-on-surface-variant dark:text-slate-400">See all your mutual funds, SIPs, and overall net worth in one place.</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,110,86,0.15)] dark:shadow-none dark:border dark:border-slate-800">
              <img alt="Mobile app growth tracking" className="w-full h-auto object-cover aspect-[4/3]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_mSCznyaPWuXPqCIiNH3Gr3BG7N05rKXfTkCmbF__zGpSRjGBsktSl2MvNYVwA5gtG91VyegAUibiPhxURWuR91GHL67aEGLkMf_NBxKFrfpZBhqdtevEsMYI5yBbOrTGAYGjRmnZeadJPFS9YnOXMnZfgGJq-Mg_1LqzBLMN4BP8xbSEg0pQ_qoPd8KbRs0Jl36dclA0F8sPR1O5PINmn7A58mqO9OvYo3f74assJHLDWlqHt1SKNZ1V8GDUnQYXv0-NvLuNsbY"/>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Flow Redesign */}
      <section className="py-32 px-6 bg-surface dark:bg-[#0f172a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] text-on-background dark:text-white font-bold mb-4">How it works</h2>
            <p className="text-on-surface-variant dark:text-slate-300 text-lg max-w-2xl mx-auto">Your journey from sign-up to your first successful investment takes less than 5 minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 dark:from-primary-fixed/20 dark:via-primary-fixed/40 dark:to-primary-fixed/20 -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed flex items-center justify-center font-[Outfit] text-[24px] shadow-[0_0_0_8px_#f9f9f7] dark:shadow-[0_0_0_8px_#0f172a] border border-primary/20 dark:border-primary-fixed/20 mb-6 transition-transform group-hover:scale-110">
                1
              </div>
              <h3 className="font-[Outfit] text-[20px] font-semibold text-on-background dark:text-white mb-3">Create Account</h3>
              <p className="text-base text-on-surface-variant dark:text-slate-400 px-4">Basic details to get started securely.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 flex items-center justify-center font-[Outfit] text-[24px] shadow-[0_0_0_8px_#f9f9f7] dark:shadow-[0_0_0_8px_#0f172a] border border-surface-variant dark:border-slate-700 mb-6 transition-transform group-hover:scale-110 group-hover:bg-primary/10 dark:group-hover:bg-primary-fixed/10 group-hover:text-primary dark:group-hover:text-primary-fixed">
                2
              </div>
              <h3 className="font-[Outfit] text-[20px] font-semibold text-on-background dark:text-white mb-3">Complete KYC</h3>
              <p className="text-base text-on-surface-variant dark:text-slate-400 px-4">100% paperless verification in seconds.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 flex items-center justify-center font-[Outfit] text-[24px] shadow-[0_0_0_8px_#f9f9f7] dark:shadow-[0_0_0_8px_#0f172a] border border-surface-variant dark:border-slate-700 mb-6 transition-transform group-hover:scale-110 group-hover:bg-primary/10 dark:group-hover:bg-primary-fixed/10 group-hover:text-primary dark:group-hover:text-primary-fixed">
                3
              </div>
              <h3 className="font-[Outfit] text-[20px] font-semibold text-on-background dark:text-white mb-3">Verify Bank</h3>
              <p className="text-base text-on-surface-variant dark:text-slate-400 px-4">Link your account seamlessly for auto-pay.</p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 flex items-center justify-center font-[Outfit] text-[24px] shadow-[0_0_0_8px_#f9f9f7] dark:shadow-[0_0_0_8px_#0f172a] border border-surface-variant dark:border-slate-700 mb-6 transition-transform group-hover:scale-110 group-hover:bg-primary/10 dark:group-hover:bg-primary-fixed/10 group-hover:text-primary dark:group-hover:text-primary-fixed">
                4
              </div>
              <h3 className="font-[Outfit] text-[20px] font-semibold text-on-background dark:text-white mb-3">Start Investing</h3>
              <p className="text-base text-on-surface-variant dark:text-slate-400 px-4">Pick a curated fund and watch it grow.</p>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed font-[Inter] text-[16px] px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 font-medium"
            >
              Start your journey today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
