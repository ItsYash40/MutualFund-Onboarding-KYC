import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Home' },
  { path: '/funds', icon: 'insights', label: 'Funds' },
  { path: '/kyc', icon: 'fact_check', label: 'KYC' },
  { path: '/setup-profile', icon: 'account_circle', label: 'Profile' },
]

export default function BottomNavBar() {
  const location = useLocation()

  return (
    <nav className="md:hidden flex justify-around items-center px-4 py-2 pb-safe fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-[#070e12] border-t border-outline-variant/10 dark:border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-colors">
      {navItems.map(item => {
        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-transform duration-150 active:bg-primary-container/50 ${
              isActive
                ? 'bg-primary-container dark:bg-primary-fixed/20 text-on-primary-container dark:text-primary-fixed'
                : 'text-on-surface-variant dark:text-tertiary-fixed-dim'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-[Inter] text-[10px] mt-1 font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
