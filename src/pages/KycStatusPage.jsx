import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function KycStatusPage() {
  const navigate = useNavigate();
  const { kycState, approveKyc } = useAuth();

  // Users can now stay on this page even when verified to see their timeline.

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto pb-12 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-2xl">
        
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold text-white mb-2">Track your KYC Journey</h1>
          <p className="font-[Inter] text-[18px] text-slate-400">Complete your profile to unlock full investment capabilities.</p>
        </div>

        {/* Current Status Hero Card */}
        <div className="bg-[#070e12]/80 backdrop-blur-xl border border-white/5 shadow-sm rounded-[20px] p-8 mb-10 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-fixed/10 rounded-full blur-3xl group-hover:bg-primary-fixed/20 transition-all duration-500"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary-fixed text-3xl">manage_search</span>
              </div>
              <div>
                <h2 className="font-[Outfit] text-[24px] font-medium text-white mb-1">Documents Under Review</h2>
                <p className="font-[Inter] text-[16px] text-slate-400">Our team is currently verifying your submitted documents. This usually takes 1-2 business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline Section */}
        <div className="bg-[#070e12]/60 border border-slate-800 rounded-[20px] p-6 md:p-10 shadow-sm">
          <div className="relative ml-4 md:ml-8">
            <div className="absolute left-3 top-3 bottom-8 w-1 bg-slate-700 rounded-full"></div>
            <div className="absolute left-3 top-3 h-[60%] w-1 bg-primary-fixed rounded-full shadow-[0_0_10px_rgba(160,243,212,0.3)]"></div>

            {/* Step 1: Account Created */}
            <div className="relative mb-12 flex gap-6 items-start group">
              <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center z-10 flex-shrink-0 ring-4 ring-[#070e12]">
                <span className="material-symbols-outlined text-[#002117] text-[16px] font-bold">check</span>
              </div>
              <div className="pt-0.5">
                <h3 className="font-[Inter] text-[18px] text-white font-medium leading-none mb-1">Account created</h3>
              </div>
            </div>

            {/* Step 2: Documents Submitted */}
            <div className="relative mb-12 flex gap-6 items-start group">
              <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center z-10 flex-shrink-0 ring-4 ring-[#070e12]">
                <span className="material-symbols-outlined text-[#002117] text-[16px] font-bold">check</span>
              </div>
              <div className="pt-0.5">
                <h3 className="font-[Inter] text-[18px] text-white font-medium leading-none mb-1">Documents submitted</h3>
              </div>
            </div>

            {/* Step 3: Under Review or Rejected */}
            {kycState.status === 'rejected' ? (
              <div className="relative mb-12 flex gap-6 items-start">
                <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center z-10 flex-shrink-0 ring-4 ring-[#070e12] mt-1">
                  <span className="material-symbols-outlined text-white text-[16px] font-bold">close</span>
                </div>
                
                <div className="pt-1 flex-1">
                  <h3 className="font-[Outfit] text-[24px] font-medium text-red-500 leading-none mb-2">Application Rejected</h3>
                  <p className="font-[Inter] text-[16px] text-slate-400 mb-4">Our compliance team found issues with your submitted documents.</p>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-[Inter] text-[14px] font-bold text-red-500 mb-1 tracking-wide uppercase">Action Required</h4>
                      <p className="font-[Inter] text-[15px] text-slate-300 mb-4">Please ensure images are clear, well-lit, and show original documents. Resubmit to continue.</p>
                      <button onClick={() => navigate('/documents')} className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-[Inter] text-[14px] font-bold shadow-sm hover:bg-red-600 transition-colors">
                        Restart Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : kycState.status === 'verified' ? (
              <div className="relative mb-12 flex gap-6 items-start group">
                <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center z-10 flex-shrink-0 ring-4 ring-[#070e12]">
                  <span className="material-symbols-outlined text-[#002117] text-[16px] font-bold">check</span>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-[Inter] text-[18px] text-white font-medium leading-none mb-1">Documents verified</h3>
                  <p className="font-[Inter] text-[16px] text-slate-400">Your documents passed all compliance checks.</p>
                </div>
              </div>
            ) : (
              <div className="relative mb-12 flex gap-6 items-start">
                <div className="w-7 h-7 rounded-full bg-[#12181b] border-4 border-primary-fixed z-10 flex-shrink-0 ring-4 ring-[#070e12] animate-pulse mt-1"></div>
                
                <div className="pt-1 flex-1">
                  <h3 className="font-[Outfit] text-[24px] font-medium text-primary-fixed leading-none mb-2">Under review</h3>
                  <p className="font-[Inter] text-[16px] text-slate-400 mb-4">Your KYC application is in the queue for manual approval by our compliance team.</p>
                  
                  <div className="bg-slate-800/40 border border-primary-fixed/20 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center flex-shrink-0 text-primary-fixed">
                      <span className="material-symbols-outlined">hourglass_top</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-[Inter] text-[14px] font-bold text-primary-fixed mb-1 tracking-wide uppercase">Review in Progress</h4>
                      <p className="font-[Inter] text-[15px] text-slate-300">Your documents have been securely transmitted to our compliance officers. You will automatically be redirected once a decision is made.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Approved */}
            <div className={`relative mb-12 flex gap-6 items-start ${kycState.status === 'verified' ? '' : 'opacity-50'}`}>
              <div className={`w-7 h-7 rounded-full z-10 flex-shrink-0 ring-4 ring-[#070e12] mt-1 flex items-center justify-center ${kycState.status === 'verified' ? 'bg-primary-fixed' : 'bg-slate-800 border-2 border-slate-600'}`}>
                 {kycState.status === 'verified' && <span className="material-symbols-outlined text-[#002117] text-[16px] font-bold">check</span>}
              </div>
              <div className="pt-1 flex-1">
                <h3 className={`font-[Outfit] text-[24px] font-medium leading-none mb-2 ${kycState.status === 'verified' ? 'text-primary-fixed' : 'text-slate-500 font-[Inter] text-[18px]'}`}>Approved</h3>
                <p className={`font-[Inter] text-[16px] mb-4 ${kycState.status === 'verified' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {kycState.status === 'verified' ? 'Your profile is fully verified and ready.' : 'Awaiting review completion'}
                </p>
                
                {kycState.status === 'verified' && (
                  <button onClick={() => navigate('/dashboard')} className="mt-2 bg-primary-fixed text-[#0f172a] px-6 py-3 rounded-xl font-[Inter] text-[15px] font-bold shadow-[0_0_20px_rgba(15,110,86,0.3)] hover:bg-primary-fixed-dim transition-colors flex items-center gap-2">
                    Go to Dashboard <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
