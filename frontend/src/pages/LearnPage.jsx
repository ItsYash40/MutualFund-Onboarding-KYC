import { useState } from 'react';

export default function LearnPage() {
  const [explainSimply, setExplainSimply] = useState(true);
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = [
    {
      question: explainSimply ? "How much money do I need to start?" : "What is the minimum ticket size for investments?",
      answer: explainSimply 
        ? "You can start with just ₹500 a month using a SIP. If you want to invest all at once, you usually need at least ₹5,000."
        : "Initial investments typically require a minimum corpus of ₹5,000 for lump sum allocations, whereas Systematic Investment Plans (SIPs) can be initiated with a recurring mandate as low as ₹500 per month."
    },
    {
      question: explainSimply ? "Can I take my money out anytime?" : "Are there liquidity constraints on mutual fund redemptions?",
      answer: explainSimply
        ? "Yes! Most funds let you withdraw your money whenever you want. But 'Tax-saving' funds lock your money for 3 years. Also, taking money out too early might cost a tiny fee."
        : "Most open-ended schemes offer high liquidity allowing T+1 or T+2 redemption cycles. However, Equity Linked Savings Schemes (ELSS) carry a statutory 3-year lock-in. Furthermore, redemptions within a specific timeframe (often 1 year) may attract an Exit Load."
    },
    {
      question: explainSimply ? "Is it safe to invest here?" : "What is the risk profile associated with AMCs?",
      answer: explainSimply
        ? "It's much safer than buying single stocks because your money is spread out across many companies. Plus, the government (SEBI) closely watches the mutual fund companies to keep your money safe."
        : "Mutual funds are subject to market risks and alpha generation is not guaranteed. However, systemic risk is mitigated as Asset Management Companies (AMCs) are strictly regulated by the Securities and Exchange Board of India (SEBI)."
    },
    {
      question: explainSimply ? "Do I need a special trading account?" : "Is a Dematerialized (Demat) account mandatory?",
      answer: explainSimply
        ? "Nope! You don't need a special stock market account to buy regular mutual funds. You can do it directly with your bank account."
        : "A Demat account is not a regulatory prerequisite for investing in standard mutual fund folios. It is only required if you intend to transact in Exchange Traded Funds (ETFs)."
    }
  ];

  const glossaryTerms = [
    {
      term: "AUM",
      descTechnical: "Assets Under Management. The aggregate market value of capital managed by the portfolio manager.",
      descSimple: "Assets Under Management. Simply the total amount of money people have given to the fund."
    },
    {
      term: "Debt Fund",
      descTechnical: "A fixed-income mutual fund investing in bonds, treasury bills, and commercial papers, targeting capital preservation over capital appreciation.",
      descSimple: "A fund that lends money to the government or big companies. Very safe but grows slowly."
    },
    {
      term: "Equity Fund",
      descTechnical: "A mutual fund investing predominantly in corporate equities to seek long-term capital appreciation, carrying higher volatility.",
      descSimple: "A fund that buys shares in the stock market. Goes up and down a lot, but makes the most money over a long time."
    },
    {
      term: "Expense Ratio",
      descTechnical: "The annualized fee expressed as a percentage of AUM, levied by the AMC to cover operational, administrative, and management costs.",
      descSimple: "The tiny percentage fee the company charges every year to do all the hard work for you."
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = glossaryTerms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.descSimple.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descTechnical.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToGlossary = (e) => {
    e.preventDefault();
    document.getElementById('glossary')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto pb-32 md:pb-8">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 dark:bg-secondary-container/10 text-primary dark:text-primary-fixed font-[Inter] text-[12px] font-medium mb-4">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Knowledge Base
            </div>
            <h1 className="font-[Outfit] text-[36px] md:text-[48px] font-semibold text-on-background dark:text-white mb-2 leading-tight">Understand before you invest</h1>
            <p className="font-[Inter] text-[18px] text-on-surface-variant dark:text-slate-300 max-w-2xl">Master the fundamentals of mutual funds to make confident, informed financial decisions. Your journey to wealth creation starts here.</p>
          </div>
          
          {/* Explain Simply Toggle */}
          <div className="flex items-center gap-3 bg-surface-container-low dark:bg-slate-800 p-2 rounded-xl border border-outline-variant/30 dark:border-slate-700">
            <span className={`font-[Inter] text-[14px] font-medium ${!explainSimply ? 'text-primary dark:text-primary-fixed font-bold' : 'text-on-surface-variant dark:text-slate-400'}`}>Technical</span>
            <div 
              className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in cursor-pointer"
              onClick={() => setExplainSimply(!explainSimply)}
            >
              <div className={`absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none transition-all duration-300 z-10 ${explainSimply ? 'right-0 border-primary dark:border-primary-fixed' : 'left-0 border-outline-variant/50 dark:border-slate-600'}`}></div>
              <div className={`block overflow-hidden h-6 rounded-full transition-colors duration-300 ${explainSimply ? 'bg-primary dark:bg-primary-container' : 'bg-outline-variant/30 dark:bg-slate-700'}`}></div>
            </div>
            <span className={`font-[Inter] text-[14px] font-medium ${explainSimply ? 'text-primary dark:text-primary-fixed font-bold' : 'text-on-surface-variant dark:text-slate-400'}`}>Explain simply</span>
          </div>
        </header>

        {/* Concept Grid */}
        <section className="mb-10">
          <h2 className="font-[Outfit] text-[24px] font-medium text-on-background dark:text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">grid_view</span>
            Core Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: SIP */}
            <div className="bg-surface-container-lowest dark:bg-[#070e12] rounded-xl p-6 border border-surface-variant dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary-fixed/30 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/40 dark:bg-secondary-container/10 flex items-center justify-center text-primary dark:text-primary-fixed flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                </div>
                <div>
                  <h3 className="font-[Outfit] text-[20px] font-medium text-on-background dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed transition-colors">SIP</h3>
                  <p className="font-[Inter] text-[14px] text-outline dark:text-slate-500">Systematic Investment Plan</p>
                </div>
              </div>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300 mb-4 h-20 overflow-hidden">
                {explainSimply 
                  ? "Investing a fixed small amount regularly (like a monthly subscription) to build wealth slowly without worrying about the market." 
                  : "An investment methodology allowing periodic capital deployment into mutual funds, facilitating rupee cost averaging and mitigating market timing risks."}
              </p>
              <a onClick={scrollToGlossary} className="inline-flex items-center gap-1 font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:text-primary-fixed-dim transition-colors" href="#">
                Learn more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
            
            {/* Card 2: Lump Sum */}
            <div className="bg-surface-container-lowest dark:bg-[#070e12] rounded-xl p-6 border border-surface-variant dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary-fixed/30 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/40 dark:bg-secondary-container/10 flex items-center justify-center text-primary dark:text-primary-fixed flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">payments</span>
                </div>
                <div>
                  <h3 className="font-[Outfit] text-[20px] font-medium text-on-background dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed transition-colors">Lump Sum</h3>
                  <p className="font-[Inter] text-[14px] text-outline dark:text-slate-500">One-time Investment</p>
                </div>
              </div>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300 mb-4 h-20 overflow-hidden">
                {explainSimply
                  ? "Investing a large chunk of money all at once, usually when you get a bonus or a sudden cash influx."
                  : "A single, bulk capital allocation into an asset at a specific point in time, highly sensitive to prevailing market entry valuations."}
              </p>
              <a onClick={scrollToGlossary} className="inline-flex items-center gap-1 font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:text-primary-fixed-dim transition-colors" href="#">
                Learn more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
            
            {/* Card 3: NAV */}
            <div className="bg-surface-container-lowest dark:bg-[#070e12] rounded-xl p-6 border border-surface-variant dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary-fixed/30 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/40 dark:bg-secondary-container/10 flex items-center justify-center text-primary dark:text-primary-fixed flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">tag</span>
                </div>
                <div>
                  <h3 className="font-[Outfit] text-[20px] font-medium text-on-background dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed transition-colors">NAV</h3>
                  <p className="font-[Inter] text-[14px] text-outline dark:text-slate-500">Net Asset Value</p>
                </div>
              </div>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300 mb-4 h-20 overflow-hidden">
                {explainSimply
                  ? "The 'price tag' of one piece of a mutual fund. It changes every day based on how well the fund is doing."
                  : "The per-unit market value of a mutual fund, calculated by dividing the total value of assets minus liabilities by the total number of outstanding units."}
              </p>
              <a onClick={scrollToGlossary} className="inline-flex items-center gap-1 font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:text-primary-fixed-dim transition-colors" href="#">
                Learn more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
            
            {/* Card 4: Folio */}
            <div className="bg-surface-container-lowest dark:bg-[#070e12] rounded-xl p-6 border border-surface-variant dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary-fixed/30 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/40 dark:bg-secondary-container/10 flex items-center justify-center text-primary dark:text-primary-fixed flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">folder_shared</span>
                </div>
                <div>
                  <h3 className="font-[Outfit] text-[20px] font-medium text-on-background dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed transition-colors">Folio Number</h3>
                  <p className="font-[Inter] text-[14px] text-outline dark:text-slate-500">Account Number</p>
                </div>
              </div>
              <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300 mb-4 h-20 overflow-hidden">
                {explainSimply
                  ? "Just like a bank account number, this is your unique ID with a mutual fund company to track your money."
                  : "A unique alphanumeric identifier assigned by an AMC to an investor, consolidating their transaction history and holdings within that specific fund house."}
              </p>
              <a onClick={scrollToGlossary} className="inline-flex items-center gap-1 font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:text-primary-fixed-dim transition-colors" href="#">
                Learn more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Layout: Glossary & FAQ */}
        <div id="glossary" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mini Glossary */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest dark:bg-[#070e12] rounded-xl p-6 h-full border border-surface-variant dark:border-slate-800">
              <h2 className="font-[Outfit] text-[20px] font-medium text-on-background dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed">sort_by_alpha</span>
                Mini Glossary
              </h2>
              <div className="relative mb-4 group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-primary-fixed">search</span>
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low dark:bg-slate-800 border border-outline-variant/30 dark:border-slate-700 focus:border-primary dark:focus:border-primary-fixed focus:ring-1 focus:ring-primary dark:focus:ring-primary-fixed text-on-surface dark:text-white placeholder:text-outline-variant dark:placeholder:text-slate-500 outline-none font-[Inter] text-[14px] transition-colors" 
                  placeholder="Search terms..." 
                  type="text"
                />
              </div>
              <ul className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {filteredGlossary.map((item, i) => (
                  <li key={i} className="border-b border-outline-variant/20 dark:border-slate-700 pb-2">
                    <span className="block font-[Inter] text-[14px] text-on-background dark:text-white font-bold mb-1">{item.term}</span>
                    <span className="block font-[Inter] text-[13px] text-on-surface-variant dark:text-slate-400">
                      {explainSimply ? item.descSimple : item.descTechnical}
                    </span>
                  </li>
                ))}
                {filteredGlossary.length === 0 && (
                  <p className="text-slate-500 text-sm italic">No terms found.</p>
                )}
              </ul>
            </div>
          </div>
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h2 className="font-[Outfit] text-[24px] font-medium text-on-background dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed">help_center</span>
              Common Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-surface-container-lowest dark:bg-[#070e12] rounded-xl border overflow-hidden transition-colors ${openFaq === index ? 'border-primary/30 dark:border-primary-fixed/30 bg-primary/5 dark:bg-primary-fixed/5' : 'border-outline-variant/30 dark:border-slate-700'}`}
                >
                  <button 
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none group"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className={`font-[Inter] text-[14px] font-bold transition-colors ${openFaq === index ? 'text-primary dark:text-primary-fixed' : 'text-on-background dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed'}`}>
                      {faq.question}
                    </span>
                    <span className={`material-symbols-outlined transition-colors ${openFaq === index ? 'text-primary dark:text-primary-fixed' : 'text-outline-variant dark:text-slate-500 group-hover:text-primary dark:group-hover:text-primary-fixed'}`}>
                      {openFaq === index ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 pt-0">
                      <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
