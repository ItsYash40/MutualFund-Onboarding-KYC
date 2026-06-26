import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function BankVerificationPage() {
  const navigate = useNavigate();
  const { user, kycState, updateKyc } = useAuth();
  const [bankFile, setBankFile] = useState(null);
  
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccount, setConfirmAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [ifscVerified, setIfscVerified] = useState(false);
  const [error, setError] = useState('');
  
  const handleVerifyIfsc = () => {
    if (ifscCode.length > 4) {
      setIfscVerified(true);
    }
  };

  const handleSubmit = () => {
    if (!bankName || !accountNumber || !confirmAccount || !ifscCode) {
      setError('Please fill out all fields');
      return;
    }
    if (accountNumber !== confirmAccount) {
      setError('Account numbers do not match');
      return;
    }
    if (!bankFile) {
      setError('Please upload a cancelled cheque');
      return;
    }
    
    // Save to context
    updateKyc('bank', 'verified');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 relative">
      {/* Atmospheric Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-secondary-container/20 dark:bg-primary-fixed/5 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-surface-tint/5 dark:bg-primary/5 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-2 text-primary-container dark:text-primary-fixed mb-2">
          <span className="font-[Inter] text-[14px] font-medium tracking-widest uppercase">Step 3 of 4</span>
          <div className="h-[4px] w-32 bg-surface-variant dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary-container dark:bg-primary-fixed w-[75%] rounded-full shadow-[0_0_10px_rgba(15,110,86,0.5)]"></div>
          </div>
        </div>
        <h2 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold text-on-surface dark:text-white">Bank Account Verification</h2>
        <p className="font-[Inter] text-[18px] text-on-surface-variant dark:text-slate-400 max-w-2xl">Securely link your bank account to start investing. Your details are encrypted and stored safely.</p>
      </div>

      {/* Status Banners */}
      <div className="flex flex-col gap-3 mb-8 z-10 relative">
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
            <div>
              <h4 className="font-[Inter] text-[14px] font-medium text-red-500 mb-1">Validation Error</h4>
              <p className="font-[Inter] text-[16px] text-red-400 text-sm">{error}</p>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFAF0] dark:bg-amber-500/10 border border-[#F6E0B5] dark:border-amber-500/20 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <span className="material-symbols-outlined text-[#B77B00] dark:text-amber-400 mt-0.5">info</span>
            <div>
              <h4 className="font-[Inter] text-[14px] font-medium text-[#8F6000] dark:text-amber-400 mb-1">Verification Required</h4>
              <p className="font-[Inter] text-[16px] text-[#8F6000]/80 dark:text-amber-400/80 text-sm">Please provide your bank details to complete your profile.</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Form Card (Bento style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 z-10 relative">
        
        {/* Form Inputs Area */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 dark:bg-[#070e12]/60 dark:border-white/10">
            <div className="flex flex-col gap-6">
              
              {/* Name Field (Pre-filled, disabled styling) */}
              <div className="flex flex-col gap-2">
                <label className="font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400 flex justify-between">
                  <span>Account Holder Name</span>
                  <span className="text-xs text-primary-container dark:text-primary-fixed bg-primary-container/10 dark:bg-primary-fixed/10 px-2 py-0.5 rounded-full">From KYC</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50 dark:text-slate-500">person</span>
                  <input className="w-full h-12 pl-12 pr-4 rounded-lg border border-outline-variant/50 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800/50 text-on-surface dark:text-white font-[Inter] cursor-not-allowed opacity-80" disabled type="text" value={kycState?.extractedName || user?.name || "Investor"} />
                </div>
              </div>

              {/* Bank Autocomplete */}
              <div className="flex flex-col gap-2">
                <label className="font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400">Bank Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-500">account_balance</span>
                  <input className="w-full h-12 pl-12 pr-10 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-[#12181b] text-on-surface dark:text-white font-[Inter] transition-all duration-200 outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/20 dark:focus:border-primary-fixed dark:focus:ring-primary-fixed/20" placeholder="e.g. HDFC Bank Ltd." type="text" value={bankName} onChange={e => setBankName(e.target.value)} />
                  {bankName && (
                    <button onClick={() => setBankName('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-500 hover:text-primary dark:hover:text-primary-fixed">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400">Account Number</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-[#12181b] text-on-surface dark:text-white font-[JetBrains_Mono] tracking-wider transition-all duration-200 outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/20 dark:focus:border-primary-fixed dark:focus:ring-primary-fixed/20" placeholder="Enter A/c Number" type="password" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                </div>
                
                {/* Confirm Account */}
                <div className="flex flex-col gap-2">
                  <label className="font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400">Confirm Account Number</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-[#12181b] text-on-surface dark:text-white font-[JetBrains_Mono] tracking-wider transition-all duration-200 outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/20 dark:focus:border-primary-fixed dark:focus:ring-primary-fixed/20" placeholder="Re-enter A/c Number" type="text" value={confirmAccount} onChange={e => setConfirmAccount(e.target.value)} />
                </div>
              </div>

              {/* IFSC Code & Branch Info */}
              <div className="flex flex-col gap-2">
                <label className="font-[Inter] text-[14px] font-medium text-on-surface-variant dark:text-slate-400">IFSC Code</label>
                <div className="relative">
                  <input className="w-full h-12 px-4 rounded-lg border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-[#12181b] text-on-surface dark:text-white font-[JetBrains_Mono] uppercase transition-all duration-200 outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/20 dark:focus:border-primary-fixed dark:focus:ring-primary-fixed/20" placeholder="e.g. HDFC0001234" type="text" value={ifscCode} onChange={e => { setIfscCode(e.target.value); setIfscVerified(false); }} />
                  <button onClick={handleVerifyIfsc} type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-container dark:text-primary-fixed text-xs font-[Inter] font-medium hover:underline px-2">Verify</button>
                </div>
                
                {/* Branch Auto-fill Result */}
                {ifscVerified && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-on-surface-variant dark:text-slate-400 bg-surface-container-low dark:bg-slate-800/50 p-3 rounded-lg border border-outline-variant/30 dark:border-slate-700 animate-fade-in">
                    <span className="material-symbols-outlined text-[18px] text-primary-container dark:text-primary-fixed mt-0.5">location_on</span>
                    <div>
                      <span className="font-[Inter] text-[14px] font-medium text-primary-container dark:text-primary-fixed block mb-0.5">{bankName || 'Verified'} Branch</span>
                      <span className="font-[Inter] text-[16px] text-xs">IFSC Validated</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Document Upload Area */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col dark:bg-[#070e12]/60 dark:border-white/10">
            <div className="mb-4">
              <h3 className="font-[Inter] text-[14px] font-semibold text-on-surface dark:text-white mb-1">Verify with Document</h3>
              <p className="font-[Inter] text-[16px] text-sm text-on-surface-variant dark:text-slate-400">Upload a cancelled cheque to speed up verification.</p>
            </div>
            
            {/* Upload Dropzone */}
            {bankFile ? (
              <div className="flex-1 border-2 border-solid border-primary-fixed/50 rounded-xl bg-primary-fixed/10 flex flex-col items-center justify-center p-6 text-center min-h-[200px]">
                <div className="w-16 h-16 rounded-full bg-primary-fixed/20 text-primary-fixed flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <span className="font-[Inter] text-[16px] font-bold text-white mb-1">Document Uploaded</span>
                <span className="font-[Inter] text-[14px] text-primary-fixed">{bankFile.name}</span>
                <button onClick={() => setBankFile(null)} className="mt-6 px-4 py-2 border border-slate-600 rounded text-slate-300 text-sm hover:bg-slate-800 transition-colors">
                  Remove & Upload Different File
                </button>
              </div>
            ) : (
              <label className="flex-1 border-2 border-dashed border-primary-container/30 dark:border-primary-fixed/30 rounded-xl bg-primary-container/5 dark:bg-primary-fixed/5 hover:bg-primary-container/10 dark:hover:bg-primary-fixed/10 transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[200px] block w-full relative">
                <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setBankFile(e.target.files[0]);
                  }
                }} />
                <div className="w-12 h-12 rounded-full bg-surface dark:bg-slate-800 shadow-sm flex items-center justify-center mb-4 text-primary-container dark:text-primary-fixed">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
                <span className="font-[Inter] text-[14px] font-medium text-primary-container dark:text-primary-fixed mb-1">Click to upload or drag & drop</span>
                <span className="font-[Inter] text-[16px] text-xs text-on-surface-variant dark:text-slate-500">JPG, PNG or PDF (Max. 5MB)</span>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant dark:text-slate-400 bg-surface dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-outline-variant/20 dark:border-slate-700">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  <span>Name and A/c No. must be clearly visible</span>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-4 z-10 relative pt-6 border-t border-outline-variant/20 dark:border-slate-700">
        <button className="w-full md:w-auto h-12 px-6 rounded-lg border border-primary-container bg-primary-container/5 text-primary-container dark:border-primary-fixed dark:bg-primary-fixed/5 dark:text-primary-fixed font-[Inter] text-[14px] font-medium transition-all duration-200 hover:bg-primary-container/10 dark:hover:bg-primary-fixed/10 active:scale-[0.98] flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back
        </button>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto h-12 px-6 rounded-lg border border-primary-container bg-primary-container/5 text-primary-container dark:border-primary-fixed dark:bg-primary-fixed/5 dark:text-primary-fixed font-[Inter] text-[14px] font-medium transition-all duration-200 hover:bg-primary-container/10 dark:hover:bg-primary-fixed/10 active:scale-[0.98] flex items-center justify-center gap-2">
            Verify Later
          </button>
          <button 
            onClick={handleSubmit}
            className="w-full sm:w-auto h-12 px-6 rounded-lg bg-primary-container dark:bg-primary-fixed text-on-primary dark:text-[#002117] font-[Inter] text-[14px] font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group"
          >
            Confirm & Continue
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
