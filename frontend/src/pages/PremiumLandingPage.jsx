import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import SipCalculatorModal from '../components/SipCalculatorModal';
import heroImage from '../assets/hero-image.jpg';
import narrativeImage from '../assets/narrative-image.jpg';
import featureImage from '../assets/feature-image.jpg';

export default function PremiumLandingPage() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const reviews = [
    {
      name: "Priya Sharma",
      role: "First-time investor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
      text: "FundFirst made investing feel less like a chore and more like a simple habit. I finally understand where my money is going and watching it grow is incredibly satisfying."
    },
    {
      name: "Rahul Verma",
      role: "IT Professional",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop",
      text: "The KYC process was incredibly smooth. I was set up and made my first mutual fund investment within 10 minutes. The dashboard is clean and tracks everything perfectly."
    },
    {
      name: "Sneha Patel",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
      text: "I love the zero hidden fees aspect. Transparency is so rare in financial apps these days, but FundFirst delivers exactly what they promise. Highly recommended!"
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);
  const [isSipModalOpen, setIsSipModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 px-6 overflow-hidden bg-[#0f172a] transition-colors duration-300">
        <div className="absolute inset-0 z-0 flex justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full md:w-2/3 h-full relative"
          >
            <img 
              alt="Couple checking investments" 
              className="w-full h-full object-cover object-right md:object-center opacity-80" 
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
              src={heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full flex">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-full md:w-3/5 lg:w-1/2 bg-[#1e293b]/70 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-3xl"
          >
            <motion.h1 variants={fadeIn} className="font-[Outfit] text-[40px] md:text-[56px] leading-[1.1] mb-6 text-white font-bold tracking-tight">
              Your first mutual fund, <span className="text-primary-fixed">made simple.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="font-[Inter] text-[18px] text-slate-300 mb-10 max-w-lg leading-relaxed">
              A safe, guided, and transparent way to start investing. No confusing jargon, just clear steps to secure your financial future with absolute trust.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-primary-container text-primary-fixed font-[Inter] text-[14px] px-8 py-4 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-all transform hover:-translate-y-1 font-medium"
              >
                Start for free
              </button>
              <button 
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-transparent border border-slate-700 text-slate-300 font-[Inter] text-[14px] px-8 py-4 rounded-full hover:bg-slate-800 transition-colors font-medium"
              >
                Learn how it works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="py-16 px-6 bg-[#070e12] border-y border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: 'enhanced_encryption', title: 'Bank-grade Security', sub: '256-bit encryption' },
              { icon: 'verified', title: 'SEBI Registered', sub: 'Regulated & compliant' },
              { icon: 'groups', title: 'Trusted Community', sub: '2 lakh+ investors' },
              { icon: 'fingerprint', title: 'Seamless Verification', sub: 'Aadhaar-safe KYC' }
            ].map((feature, i) => (
              <motion.div variants={fadeIn} key={i} className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center text-primary-fixed mb-2">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{feature.icon}</span>
                </div>
                <h4 className="font-[Outfit] text-[16px] text-white font-semibold">{feature.title}</h4>
                <p className="text-sm text-slate-400">{feature.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-[#1e293b]/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 md:p-12 text-center min-h-[300px] flex flex-col justify-center relative overflow-hidden"
          >
            <div className="flex justify-center mb-6">
              <div className="flex text-primary-fixed">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
            
            <div className="relative h-[120px] md:h-[100px] mb-8 w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentReview}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="font-[Outfit] text-[20px] md:text-[24px] text-white italic leading-relaxed font-medium absolute w-full"
                >
                  "{reviews[currentReview].text}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 relative z-10 h-[50px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentReview}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="flex items-center gap-4 absolute"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden shrink-0">
                    <img alt="User avatar" className="w-full h-full object-cover" src={reviews[currentReview].avatar}/>
                  </div>
                  <div className="text-left">
                    <p className="font-[Inter] text-[16px] text-white font-semibold">{reviews[currentReview].name}</p>
                    <p className="text-sm text-slate-400">{reviews[currentReview].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentReview(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentReview ? 'bg-primary-fixed w-6' : 'bg-slate-600 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 px-6 bg-[#0f172a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img alt="Professional wealth management" className="w-full h-auto object-cover aspect-[4/3]" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = ''; e.target.style.background = 'linear-gradient(135deg, #1e293b, #0f172a)'; e.target.style.minHeight = '300px'; }} src={narrativeImage}/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent"></div>
            </div>
          </motion.div>
          <motion.div 
            initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-1/2"
          >
            <motion.h2 variants={fadeIn} className="font-[Outfit] text-[32px] md:text-[40px] text-white font-bold mb-6 leading-tight">
              Invest for your future.
            </motion.h2>
            <motion.p variants={fadeIn} className="font-[Inter] text-[18px] text-slate-300 mb-8 leading-relaxed">
              Professional wealth management shouldn't be exclusive to the ultra-rich. We bring institutional-grade investment strategies to everyone, packaged in an experience that is intuitive, transparent, and built entirely around your life goals.
            </motion.p>
            <motion.ul variants={staggerContainer} className="space-y-4 mb-10">
              {[
                "Curated, high-performing mutual fund portfolios.",
                "Zero hidden fees or complicated commission structures.",
                "Automated SIPs to build wealth effortlessly over time."
              ].map((item, i) => (
                <motion.li variants={fadeIn} key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed mt-1">check_circle</span>
                  <span className="text-slate-200">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.a variants={fadeIn} className="inline-flex items-center gap-2 text-primary-fixed font-[Inter] text-[16px] font-semibold hover:gap-3 transition-all cursor-pointer" onClick={() => navigate('/learn')}>
              Explore our investment approach <span className="material-symbols-outlined">arrow_forward</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 px-6 bg-[#111827] transition-colors duration-300 border-y border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
          <motion.div 
            initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}
            className="w-full md:w-1/2"
          >
            <motion.h2 variants={fadeIn} className="font-[Outfit] text-[32px] md:text-[40px] text-white font-bold mb-6 leading-tight">
              Growth you can track.
            </motion.h2>
            <motion.p variants={fadeIn} className="font-[Inter] text-[18px] text-slate-300 mb-8 leading-relaxed">
              Watch your money work for you with our beautiful, real-time tracking experience. Whether you're checking on your morning commute or reviewing monthly progress, your financial picture is always clear, accessible, and elegantly presented.
            </motion.p>
            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <motion.div variants={fadeIn} className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700">
                <span className="material-symbols-outlined text-primary-fixed mb-3 text-[32px]">monitoring</span>
                <h4 className="font-[Outfit] text-[18px] font-semibold text-white mb-2">Real-time Insights</h4>
                <p className="text-sm text-slate-400">Live updates on how your investments are performing in the market.</p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700">
                <span className="material-symbols-outlined text-primary-fixed mb-3 text-[32px]">account_balance_wallet</span>
                <h4 className="font-[Outfit] text-[18px] font-semibold text-white mb-2">Unified Dashboard</h4>
                <p className="text-sm text-slate-400">See all your mutual funds, SIPs, and overall net worth in one place.</p>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <img alt="Mobile app growth tracking" className="w-full h-auto object-cover aspect-[4/3]" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = ''; e.target.style.background = 'linear-gradient(135deg, #1e293b, #111827)'; e.target.style.minHeight = '300px'; }} src={featureImage}/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Flow Redesign */}
      <section id="how-it-works" className="py-32 px-6 bg-[#0f172a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] text-white font-bold mb-4">How it works</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Your journey from sign-up to your first successful investment takes less than 5 minutes. We've optimized every step to get you investing faster.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-primary-fixed/20 via-primary-fixed/40 to-primary-fixed/20 -z-10"></div>
            
            {[
              { num: 1, title: 'Create Account', desc: 'Basic details to get started securely. We only ask for what is legally required.' },
              { num: 2, title: 'Complete KYC', desc: '100% paperless verification using Aadhaar. Approved in minutes, not days.' },
              { num: 3, title: 'Verify Bank', desc: 'Link your account seamlessly for safe, automated SIP deductions via e-mandate.' },
              { num: 4, title: 'Start Investing', desc: 'Pick a curated fund or build your own portfolio. Watch your wealth grow in real-time.' }
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={step.num} className="flex flex-col items-center text-center group mt-8 md:mt-0"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-[Outfit] text-[24px] shadow-[0_0_0_8px_#0f172a] mb-6 transition-transform group-hover:scale-110 ${step.num === 1 ? 'bg-primary-container text-primary-fixed border border-primary-fixed/20' : 'bg-slate-800 text-slate-300 border border-slate-700 group-hover:bg-primary-fixed/10 group-hover:text-primary-fixed'}`}>
                  {step.num}
                </div>
                <h3 className="font-[Outfit] text-[20px] font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-base text-slate-400 px-4 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button 
              onClick={() => navigate('/signup')}
              className="bg-primary-container text-primary-fixed font-[Inter] text-[16px] px-10 py-4 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(160,243,212,0.3)] transition-all transform hover:-translate-y-1 font-medium"
            >
              Start your journey today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 px-6 bg-[#111827] border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] text-white font-bold mb-4">Investor Resources</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Everything you need to make informed financial decisions. Built for beginners, powerful enough for experts.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0f172a] border border-slate-700 p-8 rounded-2xl group cursor-pointer"
              onClick={() => navigate('/learn')}
            >
              <span className="material-symbols-outlined text-primary-fixed text-4xl mb-4">school</span>
              <h3 className="font-[Outfit] text-2xl font-semibold text-white mb-3">Beginner's Guide</h3>
              <p className="text-slate-400 mb-6">Master the basics of mutual funds, SIPs, and compounding interest through our interactive courses.</p>
              <div className="text-primary-fixed font-medium group-hover:underline flex items-center gap-1">Read Guides <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0f172a] border border-slate-700 p-8 rounded-2xl group cursor-pointer"
              onClick={() => setIsSipModalOpen(true)}
            >
              <span className="material-symbols-outlined text-primary-fixed text-4xl mb-4">calculate</span>
              <h3 className="font-[Outfit] text-2xl font-semibold text-white mb-3">SIP Calculator</h3>
              <p className="text-slate-400 mb-6">Plan your goals precisely. See how small monthly investments can grow into significant wealth over time.</p>
              <div className="text-primary-fixed font-medium group-hover:underline flex items-center gap-1">Calculate Now <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0f172a] border border-slate-700 p-8 rounded-2xl group cursor-pointer"
              onClick={() => navigate('/funds')}
            >
              <span className="material-symbols-outlined text-primary-fixed text-4xl mb-4">analytics</span>
              <h3 className="font-[Outfit] text-2xl font-semibold text-white mb-3">Market Reports</h3>
              <p className="text-slate-400 mb-6">Stay ahead with daily fund performance updates and expert analyses on where the market is heading.</p>
              <div className="text-primary-fixed font-medium group-hover:underline flex items-center gap-1">View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-24 px-6 bg-[#0f172a] border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-fixed/5 rounded-full blur-3xl"></div>
            
            <h2 className="font-[Outfit] text-[32px] md:text-[40px] text-white font-bold mb-4 relative z-10">We're here to help</h2>
            <p className="text-slate-300 text-lg mb-10 relative z-10 max-w-2xl mx-auto">Have questions about your KYC, stuck on a step, or need investment advice? Our SEBI-certified support team is available 24/7.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="bg-[#0f172a]/80 backdrop-blur border border-slate-700 rounded-xl p-6 flex flex-col items-center hover:border-primary-fixed transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-primary-fixed text-3xl mb-2">chat</span>
                <h4 className="text-white font-semibold mb-1">Live Chat</h4>
                <p className="text-slate-400 text-sm">Average response time: 2 mins</p>
              </div>
              <div className="bg-[#0f172a]/80 backdrop-blur border border-slate-700 rounded-xl p-6 flex flex-col items-center hover:border-primary-fixed transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-primary-fixed text-3xl mb-2">mail</span>
                <h4 className="text-white font-semibold mb-1">Email Support</h4>
                <p className="text-slate-400 text-sm">support@fundfirst.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIP Calculator Modal */}
      <SipCalculatorModal 
        isOpen={isSipModalOpen} 
        onClose={() => setIsSipModalOpen(false)} 
      />
    </div>
  );
}
