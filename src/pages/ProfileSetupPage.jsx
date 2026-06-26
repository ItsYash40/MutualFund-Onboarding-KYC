import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetupPage() {
  const { user, logout, kycState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Header Profile Section */}
      <div className="bg-[#1e293b] rounded-3xl p-8 mb-8 border border-slate-700 relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-[48px] text-primary-fixed font-bold border-4 border-[#0f172a] shadow-xl overflow-hidden">
              {(kycState?.extractedName || user?.name) ? (kycState?.extractedName || user?.name).charAt(0).toUpperCase() : 'U'}
            </div>
            {kycState.status === 'verified' && (
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center border-2 border-[#1e293b] text-[#0f172a]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-[Outfit] text-white font-bold mb-2">{kycState?.extractedName || user?.name || 'Investor Name'}</h1>
            <p className="text-slate-400 font-[Inter] mb-4">{user?.email || 'investor@example.com'} • {user?.phone || '+91 98765 43210'}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {kycState.status === 'verified' ? (
                <span className="px-4 py-1.5 bg-primary-fixed/20 text-primary-fixed text-sm font-medium rounded-full border border-primary-fixed/20 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  KYC Verified
                </span>
              ) : (
                <span className="px-4 py-1.5 bg-secondary-fixed/20 text-secondary-fixed text-sm font-medium rounded-full border border-secondary-fixed/20 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">pending</span>
                  KYC Pending
                </span>
              )}
              {kycState.bank === 'verified' ? (
                <span className="px-4 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-full border border-slate-700 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>
                  Bank Linked
                </span>
              ) : (
                <span className="px-4 py-1.5 bg-error/10 text-error text-sm font-medium rounded-full border border-error/20 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>
                  Bank Not Linked
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Settings Grid */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed text-[24px]">manage_accounts</span>
              <h2 className="text-xl font-[Outfit] text-white font-semibold">Account Settings</h2>
            </div>
            <div className="divide-y divide-slate-800/50">
              <button onClick={() => alert("Personal Details editing is coming soon!")} className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-0.5">Personal Details</h3>
                    <p className="text-sm text-slate-500">Update your address, nominee, and basic info</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">chevron_right</span>
              </button>

              <button onClick={() => alert("Bank Account management is coming soon!")} className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-0.5">Bank Accounts</h3>
                    <p className="text-sm text-slate-500">Manage your linked accounts and mandates</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">chevron_right</span>
              </button>

              <button onClick={() => alert("Statements & Reports are coming soon!")} className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-0.5">Statements & Reports</h3>
                    <p className="text-sm text-slate-500">Download your capital gains and tax reports</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">chevron_right</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column - Actions & Info */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-[Outfit] text-white font-semibold mb-4">Security</h3>
            <button onClick={() => alert("Change Password is coming soon!")} className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors text-sm mb-3 text-left flex items-center justify-between">
              Change Password
              <span className="material-symbols-outlined text-[18px] text-slate-400">lock</span>
            </button>
            <button onClick={() => alert("Two-Factor Auth management is coming soon!")} className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors text-sm text-left flex items-center justify-between">
              Two-Factor Auth
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-fixed bg-primary-fixed/10 px-2 py-0.5 rounded">Enabled</span>
                <span className="material-symbols-outlined text-[18px] text-slate-400">security</span>
              </div>
            </button>
          </div>

          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-[Outfit] text-white font-semibold mb-4">Support</h3>
            <button onClick={() => alert("Help Center is coming soon!")} className="w-full py-3 px-4 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium rounded-xl transition-colors text-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Help Center & FAQs
            </button>
            <button onClick={() => alert("Contact Support is coming soon!")} className="w-full py-3 px-4 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium rounded-xl transition-colors text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Contact Support
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-error/10 hover:bg-error/20 text-error font-medium rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">logout</span>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
