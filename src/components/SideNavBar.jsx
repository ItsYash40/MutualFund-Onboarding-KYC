import { useTheme } from '../context/ThemeContext'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/kyc', icon: 'verified_user', label: 'KYC Status' },
  { path: '/funds', icon: 'account_balance_wallet', label: 'Browse Funds' },
  { path: '/learn', icon: 'school', label: 'Learn' },
  { path: '/setup-profile', icon: 'person', label: 'My Profile' },
]

export default function SideNavBar() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <nav className="hidden md:flex flex-col h-screen w-[240px] fixed left-0 top-0 bg-surface dark:bg-[#070e12] shadow-[20px_0_40px_rgba(8,107,83,0.04)] dark:shadow-[20px_0_40px_rgba(0,0,0,0.3)] py-6 z-40 transition-colors">
      {/* Logo */}
      <div className="px-4 mb-6 flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary flex items-center justify-center">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
        </div>
        <div>
          <h1 className="font-[Outfit] text-2xl text-primary dark:text-primary-fixed font-semibold leading-none">FundFirst</h1>
          <p className="font-[Inter] text-xs text-on-surface-variant dark:text-tertiary-fixed-dim opacity-70 tracking-wide font-medium">Investor Portal</p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                isActive
                  ? 'text-primary dark:text-primary-fixed font-bold border-r-4 border-primary dark:border-primary-fixed bg-secondary-container/20 dark:bg-primary-fixed/10'
                  : 'text-on-surface-variant dark:text-tertiary-fixed-dim hover:text-primary dark:hover:text-primary-fixed hover:bg-secondary-container/10 dark:hover:bg-primary-fixed/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-[Inter] text-sm font-medium tracking-wide">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Bottom Actions */}
      <div className="px-4 mt-auto flex flex-col gap-4">

        <Link
          to="/funds"
          className="w-full py-3 px-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-full font-[Inter] text-sm font-medium tracking-wide hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed-dim transition-colors shadow-sm flex justify-center items-center gap-2"
        >
          Start Investment
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>
    </nav>
  )
}
