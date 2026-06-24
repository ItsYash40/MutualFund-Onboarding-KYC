import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { adminLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const isDashboard = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#050b0e] transition-colors">
      {/* Admin Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f172a] border-b border-slate-800">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-[Outfit] text-2xl text-primary-fixed font-bold">
            <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            FundFirst Admin
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 relative">
        {!isDashboard && (
          <button 
            onClick={() => navigate('/admin')} 
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-primary-fixed transition-colors font-[Inter] font-medium group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Dashboard
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
}
