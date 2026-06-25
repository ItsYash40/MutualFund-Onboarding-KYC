import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-lowest dark:bg-[#020617] pt-16 pb-8 px-6 border-t border-surface-variant dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 font-[Outfit] text-[28px] text-primary dark:text-primary-fixed font-bold">
            <span className="material-symbols-outlined text-[32px] text-primary dark:text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
            FundFirst
          </Link>
          <p className="text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed pr-4">
            Making wealth creation simple, secure, and accessible for everyone. We believe in transparent, jargon-free investing.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container-low dark:bg-slate-800 flex items-center justify-center text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed hover:bg-primary/5 dark:hover:bg-primary-fixed/10 transition-colors">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container-low dark:bg-slate-800 flex items-center justify-center text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed hover:bg-primary/5 dark:hover:bg-primary-fixed/10 transition-colors">
              <span className="material-symbols-outlined text-[20px]">language</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="font-[Outfit] text-[16px] font-semibold text-on-surface dark:text-white mb-6">Company</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">About Us</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">Careers</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="md:col-span-3">
          <h4 className="font-[Outfit] text-[16px] font-semibold text-on-surface dark:text-white mb-6">Resources</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">Investment Guides</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">SIP Calculator</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">Market Reports</a></li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="md:col-span-3">
          <h4 className="font-[Outfit] text-[16px] font-semibold text-on-surface dark:text-white mb-6">Top FAQs</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors line-clamp-1">How is my Aadhaar data secured?</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors line-clamp-1">What are the charges for investing?</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors line-clamp-1">How long does KYC verification take?</a></li>
            <li><Link to="/learn" className="text-sm font-medium text-primary dark:text-primary-fixed hover:underline mt-2 inline-block">View all FAQs →</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-surface-variant dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-300">
        <div className="flex flex-col gap-2 max-w-3xl text-center md:text-left">
          <p className="text-[11px] leading-relaxed text-on-surface-variant/80 dark:text-slate-500 uppercase tracking-wide">
            Mutual Fund investments are subject to market risks, read all scheme related documents carefully.
          </p>
          <div className="text-[12px] text-on-surface-variant dark:text-slate-400 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            <span>© 2026 FundFirst Technologies. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-primary dark:hover:text-primary-fixed transition-colors">Terms of Service</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-primary dark:hover:text-primary-fixed transition-colors">Privacy Policy</a>
          </div>
        </div>
        
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-300 px-5 py-2.5 rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary-fixed dark:hover:text-slate-900 transition-all group font-medium text-sm shadow-sm"
        >
          Back to Top 
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-y-1 transition-transform">arrow_upward</span>
        </button>
      </div>
    </footer>
  );
}
