import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function MarketingLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const isAuthPage = ['/login', '/signup', '/signup/otp', '/verify-otp', '/set-password'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <TopNavBar />
      <main className="flex-grow">
        {isAuthPage && (
          <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
            <button 
              onClick={() => { window.history.length > 1 ? navigate(-1) : navigate('/') }} 
              className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors font-[Inter] font-medium group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back
            </button>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
