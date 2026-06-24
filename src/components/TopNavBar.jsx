import { useTheme } from '../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function TopNavBar({ activePage = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-surface-variant dark:border-slate-800 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-[Outfit] text-2xl text-primary dark:text-primary-fixed font-bold hover:opacity-80 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
          FundFirst
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-[Inter] text-sm font-medium tracking-wide">
          <a className={`${activePage === 'how-it-works' ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors'} hover:opacity-80`} href="#how-it-works">How it Works</a>
          <a className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors hover:opacity-80" href="#resources">Resources</a>
          <a className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors hover:opacity-80" href="#support">Support</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 font-[Inter] text-sm font-medium tracking-wide">
          {user ? (
            <>
              <button
                className="text-on-surface-variant dark:text-slate-300 hover:text-error transition-colors scale-95 active:scale-100"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed hover:bg-primary/90 dark:hover:bg-primary-container/90 px-5 py-2.5 rounded-full scale-95 active:scale-100 transition-transform shadow-sm font-medium"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                className="text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed transition-colors scale-95 active:scale-100"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed hover:bg-primary/90 dark:hover:bg-primary-container/90 px-5 py-2.5 rounded-full scale-95 active:scale-100 transition-transform shadow-sm font-medium"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
