import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Permanently forcing dark mode per user request
  const [isDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.classList.remove('light')
  }, [])

  const toggleTheme = () => {
    // Disabled as per user request to force dark mode
    console.warn("Light mode is disabled for now.")
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
