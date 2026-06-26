import SideNavBar from '../components/SideNavBar'
import BottomNavBar from '../components/BottomNavBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isRootPage = ['/dashboard', '/kyc', '/funds', '/learn', '/setup-profile'].includes(location.pathname);

  return (
    <div className="min-h-screen flex dark:bg-[#050b0e] transition-colors">
      <SideNavBar />

      {/* Mobile Top Header (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-[#0f172a]/90 backdrop-blur border-b border-slate-800 flex items-center h-16 px-4">
        {!isRootPage ? (
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center text-primary-fixed">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
          </div>
        )}
        <h1 className="ml-3 font-[Outfit] text-lg font-semibold text-white">
          {location.pathname === '/dashboard' ? 'Dashboard' :
           location.pathname === '/kyc' ? 'KYC Center' :
           location.pathname === '/funds' ? 'Funds' :
           location.pathname === '/learn' ? 'Learn' :
           location.pathname === '/setup-profile' ? 'Profile' : 'FundFirst'}
        </h1>
      </div>

      <main className="flex-1 w-full md:ml-[240px] px-6 py-10 pt-24 md:pt-10 max-w-7xl mx-auto pb-[100px] md:pb-10 relative">
        {/* Desktop Back Button */}
        <div className="hidden md:block">
          {!isRootPage && (
            <button 
              onClick={() => navigate(-1)} 
              className="mb-6 flex items-center gap-2 text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors font-[Inter] font-medium group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back
            </button>
          )}
        </div>
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  )
}
