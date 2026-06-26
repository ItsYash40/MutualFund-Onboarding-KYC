import { useState } from 'react';

const fundsData = [
  {
    id: 1,
    name: 'SBI Nifty 50 Index Fund',
    type: 'Index',
    risk: 'Very High Risk',
    riskLevel: 'Very High',
    category: 'Index Funds',
    logo: 'S',
    logoBg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800',
    return1Y: '24.5%',
    return3Y: '15.2%',
    minSip: '₹500',
    expenseRatio: '0.20%'
  },
  {
    id: 2,
    name: 'Parag Parikh Flexi Cap',
    type: 'Equity',
    risk: 'High Risk',
    riskLevel: 'High',
    category: 'Equity',
    badge: 'Good for beginners',
    logo: 'P',
    logoBg: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800',
    return1Y: '32.1%',
    return3Y: '21.4%',
    minSip: '₹1000',
    expenseRatio: '0.65%'
  },
  {
    id: 3,
    name: 'Quant Small Cap Fund',
    type: 'Small Cap',
    risk: 'Very High Risk',
    riskLevel: 'Very High',
    category: 'Equity',
    logo: 'Q',
    logoBg: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800',
    return1Y: '68.5%',
    return3Y: '35.8%',
    minSip: '₹1000',
    expenseRatio: '0.77%'
  },
  {
    id: 4,
    name: 'HDFC Balanced Advantage',
    type: 'Hybrid',
    risk: 'Moderate Risk',
    riskLevel: 'Moderate',
    category: 'Hybrid',
    logo: 'H',
    logoBg: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800',
    return1Y: '18.2%',
    return3Y: '14.5%',
    minSip: '₹500',
    expenseRatio: '0.85%'
  },
  {
    id: 5,
    name: 'ICICI Prudential Debt Fund',
    type: 'Debt',
    risk: 'Low Risk',
    riskLevel: 'Low',
    category: 'Debt',
    logo: 'I',
    logoBg: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800',
    return1Y: '7.8%',
    return3Y: '6.5%',
    minSip: '₹500',
    expenseRatio: '0.35%'
  },
  {
    id: 6,
    name: 'Mirae Asset ELSS Tax Saver',
    type: 'ELSS',
    risk: 'High Risk',
    riskLevel: 'High',
    category: 'ELSS',
    logo: 'M',
    logoBg: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800',
    return1Y: '28.4%',
    return3Y: '19.2%',
    minSip: '₹500',
    expenseRatio: '0.70%'
  },
  {
    id: 7,
    name: 'Nippon India Small Cap',
    type: 'Small Cap',
    risk: 'Very High Risk',
    riskLevel: 'Very High',
    category: 'Equity',
    logo: 'N',
    logoBg: 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-800',
    return1Y: '65.2%',
    return3Y: '38.1%',
    minSip: '₹100',
    expenseRatio: '0.82%'
  },
  {
    id: 8,
    name: 'Kotak Equity Arbitrage',
    type: 'Arbitrage',
    risk: 'Low Risk',
    riskLevel: 'Low',
    category: 'Hybrid',
    logo: 'K',
    logoBg: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-800',
    return1Y: '8.1%',
    return3Y: '6.8%',
    minSip: '₹1000',
    expenseRatio: '0.40%'
  }
];

export default function FundDiscoveryPage() {
  const [activeFilter, setActiveFilter] = useState('All Funds');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparedFunds, setComparedFunds] = useState(['Quant Small Cap Fund']);
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [favorites, setFavorites] = useState(['Quant Small Cap Fund']);

  const filters = ['All Funds', 'Equity', 'Debt', 'Hybrid', 'ELSS', 'Index Funds'];

  const toggleCompare = (fundName) => {
    setComparedFunds(prev => {
      let newCompared;
      if (prev.includes(fundName)) {
        newCompared = prev.filter(f => f !== fundName);
      } else {
        if (prev.length >= 3) {
          alert('You can only compare up to 3 funds at a time!');
          return prev;
        }
        newCompared = [...prev, fundName];
      }
      setDrawerVisible(newCompared.length > 0);
      return newCompared;
    });
  };

  const toggleFavorite = (fundName) => {
    setFavorites(prev => 
      prev.includes(fundName) 
        ? prev.filter(f => f !== fundName)
        : [...prev, fundName]
    );
  };

  const clearAll = () => {
    setComparedFunds([]);
    setDrawerVisible(false);
  };

  // Filter logic
  const filteredFunds = fundsData.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          fund.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'All Funds' || fund.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Get full fund objects for comparison
  const comparedFundObjects = comparedFunds.map(fundName => 
    fundsData.find(f => f.name === fundName) || { name: fundName }
  );

  return (
    <div className="w-full relative pb-32 md:pb-8 animate-fade-in">
      {/* Top App Bar / Search Area */}
      <header className="sticky top-0 z-30 bg-surface/80 dark:bg-[#050b0e]/80 backdrop-blur-xl border-b border-surface-variant dark:border-slate-800 px-4 py-4 mb-6 transition-colors duration-300 -mx-6 md:-mx-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 justify-between px-2 md:px-0">
          <div>
            <h2 className="font-[Outfit] text-[28px] md:text-[32px] text-on-surface dark:text-white font-semibold">Discover Funds</h2>
            <p className="text-on-surface-variant dark:text-slate-400 font-[Inter] text-[16px] mt-1">Find the right investment for your goals.</p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:w-96 transition-all duration-300 rounded-lg group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-primary-fixed">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-surface dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700 focus:outline-none focus:border-primary dark:focus:border-primary-fixed focus:ring-[3px] focus:ring-secondary-container/50 dark:focus:ring-primary-fixed/20 text-on-surface dark:text-white placeholder:text-outline-variant dark:placeholder:text-slate-500 font-[Inter] text-[16px] transition-all" 
              placeholder="Search funds, AMC, or categories..." 
              type="text"
            />
          </div>
        </div>
        
        {/* Filter Pills */}
        <div className="max-w-6xl mx-auto mt-6 overflow-x-auto hide-scrollbar px-2 md:px-0">
          <div className="flex items-center gap-2 pb-2 min-w-max">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-[Inter] text-[14px] font-medium border transition-colors ${
                  activeFilter === filter 
                  ? 'bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed border-primary dark:border-primary-container shadow-sm' 
                  : 'bg-surface dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 border-outline-variant dark:border-slate-700 hover:bg-surface-variant dark:hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
            
            <div className="w-px h-6 bg-outline-variant dark:bg-slate-700 mx-2"></div>
            
            <button onClick={() => alert("More filters coming soon!")} className="px-4 py-2 rounded-full bg-surface dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-variant dark:hover:bg-slate-700 font-[Inter] text-[14px] font-medium border border-outline-variant dark:border-slate-700 flex items-center gap-2 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fund List Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        {filteredFunds.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">search_off</span>
            <h3 className="text-xl font-semibold text-white mb-2">No funds found</h3>
            <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button onClick={() => { setSearchQuery(''); setActiveFilter('All Funds'); }} className="mt-6 text-primary-fixed hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="mb-10">
            <h3 className="font-[Outfit] text-[24px] font-medium text-on-surface dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary dark:text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>{activeFilter === 'All Funds' ? 'star' : 'category'}</span>
              {activeFilter === 'All Funds' ? (searchQuery ? 'Search Results' : 'Recommended Funds') : `${activeFilter} Funds`}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFunds.map((fund) => (
                <div key={fund.id} className="bg-surface-container-lowest dark:bg-[#070e12] rounded-2xl p-6 relative flex flex-col h-full border border-surface-variant dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                  {fund.badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary dark:bg-primary-fixed text-on-secondary dark:text-primary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm whitespace-nowrap z-10">
                      {fund.badge}
                    </div>
                  )}
                  
                  <div 
                    onClick={() => toggleFavorite(fund.name)}
                    className={`absolute top-4 right-4 transition-colors cursor-pointer ${favorites.includes(fund.name) ? 'text-error dark:text-red-400' : 'text-outline dark:text-slate-500 hover:text-error dark:hover:text-red-400'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: favorites.includes(fund.name) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-4 pr-8 pt-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border flex-shrink-0 ${fund.logoBg}`}>
                      <span className="font-[Outfit] text-[20px] font-medium">{fund.logo}</span>
                    </div>
                    <div>
                      <h4 className="font-[Inter] text-[16px] font-semibold text-on-surface dark:text-white leading-tight">{fund.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-secondary-container/30 dark:bg-secondary-container/10 text-on-secondary-container dark:text-secondary-fixed-dim">{fund.type}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${fund.risk.includes('Very High') ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : fund.risk.includes('High') ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' : fund.risk.includes('Moderate') ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'}`}>{fund.risk}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-6 text-primary dark:text-primary-fixed">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: fund.riskLevel !== 'Low' ? "'FILL' 1" : "'FILL' 0" }}>circle</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: (fund.riskLevel === 'High' || fund.riskLevel === 'Very High') ? "'FILL' 1" : "'FILL' 0" }}>circle</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: fund.riskLevel === 'Very High' ? "'FILL' 1" : "'FILL' 0" }}>circle</span>
                    <span className="material-symbols-outlined text-outline-variant dark:text-slate-600 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
                    <span className="text-xs text-on-surface-variant dark:text-slate-400 ml-1 font-[Inter] font-medium">Risk Meter</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6 mt-auto">
                    <div>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-1">1Y Return</p>
                      <p className="font-[JetBrains_Mono] text-[16px] font-medium text-secondary dark:text-primary-fixed-dim">{fund.return1Y}</p>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-1">3Y Return</p>
                      <p className="font-[JetBrains_Mono] text-[16px] font-medium text-secondary dark:text-primary-fixed-dim">{fund.return3Y}</p>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-1">Min SIP</p>
                      <p className="font-[JetBrains_Mono] text-[16px] font-medium text-on-surface dark:text-white">{fund.minSip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 dark:border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`relative flex items-center justify-center w-5 h-5 border rounded-sm transition-colors ${comparedFunds.includes(fund.name) ? 'bg-primary/10 dark:bg-primary-fixed/20 border-primary dark:border-primary-fixed' : 'border-outline dark:border-slate-500 group-hover:border-primary dark:group-hover:border-primary-fixed'}`}>
                        <input 
                          className="opacity-0 absolute inset-0 cursor-pointer w-full h-full" 
                          onChange={() => toggleCompare(fund.name)} 
                          checked={comparedFunds.includes(fund.name)}
                          type="checkbox"
                        />
                        <span className={`material-symbols-outlined text-[16px] text-primary dark:text-primary-fixed transition-opacity ${comparedFunds.includes(fund.name) ? 'opacity-100' : 'opacity-0'}`}>check</span>
                      </div>
                      <span className={`font-[Inter] text-[14px] font-medium ${comparedFunds.includes(fund.name) ? 'text-primary dark:text-primary-fixed' : 'text-on-surface-variant dark:text-slate-300'}`}>Compare</span>
                    </label>
                    <button onClick={() => alert(`Redirecting to Invest flow for ${fund.name}`)} className="bg-primary-container dark:bg-primary/30 text-on-primary-container dark:text-primary-fixed border dark:border-primary/50 px-4 py-2 rounded-lg font-[Inter] text-[14px] font-medium hover:bg-primary dark:hover:bg-primary/50 hover:text-on-primary dark:hover:text-primary-fixed transition-colors">
                      Invest Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Compare Button (when drawer is minimized) */}
      {!drawerVisible && comparedFunds.length > 0 && (
        <button 
          onClick={() => setDrawerVisible(true)}
          className="fixed bottom-6 right-6 md:right-10 z-40 bg-primary dark:bg-primary-fixed text-on-primary dark:text-[#0a1217] px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(15,110,86,0.3)] font-[Inter] font-bold text-[15px] flex items-center gap-2 hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-all active:scale-95 animate-fade-in"
        >
          <span className="material-symbols-outlined">compare_arrows</span>
          View Comparison ({comparedFunds.length})
        </button>
      )}

      {/* Bottom Comparison Drawer (Slide-up) */}
      <div 
        className={`fixed bottom-0 md:bottom-0 left-0 md:left-[240px] right-0 bg-surface dark:bg-[#0a1217] border-t border-outline-variant/30 dark:border-slate-800 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-50 rounded-t-3xl md:rounded-t-none transition-transform duration-300 ease-in-out pb-safe ${drawerVisible && comparedFunds.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-full flex justify-center py-2 md:hidden" onClick={() => setDrawerVisible(!drawerVisible)}>
          <div className="w-12 h-1.5 bg-outline-variant dark:bg-slate-700 rounded-full cursor-pointer hover:bg-slate-500 transition-colors"></div>
        </div>
        
        <div className="px-4 md:px-6 py-4 md:py-6 max-w-6xl mx-auto relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-[Outfit] text-[24px] font-medium text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined">compare_arrows</span>
              Compare Funds ({comparedFunds.length}/3)
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setDrawerVisible(false)}
                className="hidden md:flex text-on-surface-variant dark:text-slate-400 hover:text-white transition-colors items-center justify-center p-1 rounded-full hover:bg-slate-800"
                title="Minimize Drawer"
              >
                <span className="material-symbols-outlined text-[24px]">expand_more</span>
              </button>
              <button 
                onClick={clearAll}
                className="text-on-surface-variant dark:text-slate-400 hover:text-error dark:hover:text-red-400 transition-colors font-[Inter] text-[14px] font-medium flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">clear_all</span>
                Clear All
              </button>
            </div>
          </div>
          
          {/* Comparison Table / Grid */}
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-4">
              {/* Labels Column (Desktop Only) */}
              <div className="hidden md:flex flex-col justify-end space-y-4 pb-4 pr-4 border-r border-outline-variant/30 dark:border-slate-800">
                <div className="h-16"></div> {/* Spacer for header */}
                <div className="text-sm font-medium text-on-surface-variant dark:text-slate-400 py-2">Risk</div>
                <div className="text-sm font-medium text-on-surface-variant dark:text-slate-400 py-2">1Y Return</div>
                <div className="text-sm font-medium text-on-surface-variant dark:text-slate-400 py-2">3Y Return</div>
                <div className="text-sm font-medium text-on-surface-variant dark:text-slate-400 py-2">Expense Ratio</div>
              </div>
              
              {/* Selected Funds */}
              {comparedFundObjects.map((fund, index) => (
                <div key={index} className="w-64 md:w-auto bg-surface-container-low dark:bg-slate-800/50 rounded-xl p-4 relative border border-outline-variant/50 dark:border-slate-700">
                  <button 
                    onClick={() => toggleCompare(fund.name)}
                    className="absolute top-2 right-2 text-outline-variant dark:text-slate-500 hover:text-error dark:hover:text-red-400 transition-colors bg-surface dark:bg-slate-800 rounded-full p-1 shadow-sm cursor-pointer z-10"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                  <div className="h-16 mb-4">
                    <h4 className="font-[Inter] text-[16px] font-semibold text-on-surface dark:text-white leading-tight line-clamp-2 pr-6">{fund.name}</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex md:block justify-between items-center py-2 md:py-0 border-b border-outline-variant/20 dark:border-slate-700 md:border-0">
                      <span className="md:hidden text-xs text-on-surface-variant dark:text-slate-400">Risk</span>
                      <span className={`text-sm font-medium ${fund.riskLevel === 'Very High' ? 'text-red-500' : fund.riskLevel === 'High' ? 'text-orange-500' : fund.riskLevel === 'Moderate' ? 'text-yellow-500' : 'text-green-500'}`}>{fund.riskLevel}</span>
                    </div>
                    <div className="flex md:block justify-between items-center py-2 md:py-0 border-b border-outline-variant/20 dark:border-slate-700 md:border-0">
                      <span className="md:hidden text-xs text-on-surface-variant dark:text-slate-400">1Y Return</span>
                      <span className="font-[JetBrains_Mono] text-[16px] font-medium text-secondary dark:text-primary-fixed-dim">{fund.return1Y}</span>
                    </div>
                    <div className="flex md:block justify-between items-center py-2 md:py-0 border-b border-outline-variant/20 dark:border-slate-700 md:border-0">
                      <span className="md:hidden text-xs text-on-surface-variant dark:text-slate-400">3Y Return</span>
                      <span className="font-[JetBrains_Mono] text-[16px] font-medium text-secondary dark:text-primary-fixed-dim">{fund.return3Y}</span>
                    </div>
                    <div className="flex md:block justify-between items-center py-2 md:py-0 border-b border-outline-variant/20 dark:border-slate-700 md:border-0">
                      <span className="md:hidden text-xs text-on-surface-variant dark:text-slate-400">Expense Ratio</span>
                      <span className="font-[JetBrains_Mono] text-[16px] font-medium text-on-surface dark:text-white">{fund.expenseRatio}</span>
                    </div>
                  </div>
                  <button onClick={() => alert(`Redirecting to Invest flow for ${fund.name}`)} className="w-full mt-4 bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed py-2 rounded-lg font-[Inter] text-[14px] font-medium hover:bg-secondary dark:hover:bg-primary/80 transition-colors">
                    Invest Now
                  </button>
                </div>
              ))}
              
              {/* Empty Slots */}
              {[...Array(Math.max(0, 3 - comparedFunds.length))].map((_, i) => (
                <div 
                  key={`empty-${i}`} 
                  onClick={() => setDrawerVisible(false)}
                  className={`group w-64 md:w-auto border-2 border-dashed border-outline-variant/50 dark:border-slate-700 hover:border-primary dark:hover:border-primary-fixed cursor-pointer rounded-xl p-4 flex-col items-center justify-center text-center bg-surface-bright/50 dark:bg-slate-800/20 min-h-[300px] transition-colors ${i > 0 && (3 - comparedFunds.length) > 1 ? 'hidden md:flex' : 'flex'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-surface-variant dark:bg-slate-800 flex items-center justify-center text-on-surface-variant dark:text-slate-500 mb-3 group-hover:bg-primary-fixed group-hover:text-[#0a1217] transition-colors">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <p className="font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-500 group-hover:text-primary-fixed transition-colors">Select fund to compare</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
