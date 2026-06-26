import { useTheme } from '../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function TopNavBar({ activePage = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

        {/* Actions & Hamburger */}
        <div className="flex items-center gap-2 md:gap-4 font-[Inter] text-sm font-medium tracking-wide">
          {user ? (
            <>
              <button
                className="hidden md:block text-on-surface-variant dark:text-slate-300 hover:text-error transition-colors scale-95 active:scale-100"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed hover:bg-primary/90 dark:hover:bg-primary-container/90 px-4 py-2 md:px-5 md:py-2.5 rounded-full scale-95 active:scale-100 transition-transform shadow-sm font-medium text-xs md:text-sm"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                className="hidden md:block text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed transition-colors scale-95 active:scale-100"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-primary dark:bg-primary-container text-on-primary dark:text-primary-fixed hover:bg-primary/90 dark:hover:bg-primary-container/90 px-4 py-2 md:px-5 md:py-2.5 rounded-full scale-95 active:scale-100 transition-transform shadow-sm font-medium text-xs md:text-sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}

          {/* Hamburger Icon */}
          <button 
            className="md:hidden text-on-surface-variant dark:text-slate-300 p-2 ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface dark:bg-[#1e293b] border-b border-surface-variant dark:border-slate-800 px-6 py-4 flex flex-col gap-4 font-[Inter] shadow-xl animate-fade-in absolute w-full left-0 top-16">
          <a onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant dark:text-slate-300 py-2 border-b border-slate-800" href="#how-it-works">How it Works</a>
          <a onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant dark:text-slate-300 py-2 border-b border-slate-800" href="#resources">Resources</a>
          <a onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant dark:text-slate-300 py-2 border-b border-slate-800" href="#support">Support</a>
          
          <div className="flex flex-col gap-3 mt-2">
            {user ? (
              <button
                className="w-full text-left text-error py-2 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="w-full text-left text-primary dark:text-primary-fixed py-2 font-medium"
                onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
