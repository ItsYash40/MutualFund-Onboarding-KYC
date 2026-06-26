import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SipCalculatorModal({ isOpen, onClose }) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estReturns, setEstReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // SIP Calculation Formula
    // M = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const P = Number(monthlyInvestment);
    const i = Number(expectedReturnRate) / 12 / 100;
    const n = Number(timePeriod) * 12;

    const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    
    const invested = P * n;
    const returns = M - invested;

    setInvestedAmount(invested);
    setEstReturns(returns);
    setTotalValue(M);
  }, [monthlyInvestment, expectedReturnRate, timePeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#050b0e]/80 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/10 flex items-center justify-center text-primary-fixed">
                <span className="material-symbols-outlined">calculate</span>
              </div>
              <h2 className="text-2xl font-[Outfit] text-white font-bold">SIP Calculator</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sliders Area */}
            <div className="space-y-8">
              {/* Monthly Investment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Monthly Investment</label>
                  <span className="text-primary-fixed font-semibold bg-primary-fixed/10 px-2 py-0.5 rounded text-sm">
                    {formatCurrency(monthlyInvestment)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="500" max="100000" step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-fixed"
                />
              </div>

              {/* Expected Return Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Expected Return Rate (p.a)</label>
                  <span className="text-primary-fixed font-semibold bg-primary-fixed/10 px-2 py-0.5 rounded text-sm">
                    {expectedReturnRate}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" max="30" step="1"
                  value={expectedReturnRate}
                  onChange={(e) => setExpectedReturnRate(e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-fixed"
                />
              </div>

              {/* Time Period */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Time Period</label>
                  <span className="text-primary-fixed font-semibold bg-primary-fixed/10 px-2 py-0.5 rounded text-sm">
                    {timePeriod} Years
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" max="40" step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-fixed"
                />
              </div>
            </div>

            {/* Results Area */}
            <div className="bg-[#1e293b]/50 rounded-2xl p-6 border border-slate-700/50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400 font-medium">Invested Amount</span>
                  <span className="text-white font-semibold">{formatCurrency(investedAmount)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400 font-medium">Est. Returns</span>
                  <span className="text-secondary-fixed font-semibold">{formatCurrency(estReturns)}</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-slate-400 text-sm font-medium mb-1">Total Value</p>
                <p className="text-4xl font-[Outfit] text-primary-fixed font-bold">{formatCurrency(totalValue)}</p>
              </div>
              
              <button 
                onClick={onClose}
                className="w-full mt-8 py-3 bg-primary-fixed text-[#0f172a] font-semibold rounded-xl hover:bg-primary-fixed-dim transition-colors"
              >
                Start Investing Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
