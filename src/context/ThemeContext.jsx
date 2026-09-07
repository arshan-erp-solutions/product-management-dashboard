import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext(null)

const THEME_STORAGE_KEY = 'producthub-theme'
const VALID_THEMES = ['light', 'dark']

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    if (VALID_THEMES.includes(storedTheme)) {
      return storedTheme
    }

    // The UI is intentionally dark-first, similar to the reference dashboard.
    return 'dark'
  } catch {
    return 'dark'
  }
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    root.style.colorScheme = theme
    body.dataset.theme = theme

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Theme still works for this session if LocalStorage is unavailable.
    }

    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.name = 'theme-color'
      document.head.appendChild(metaThemeColor)
    }

    metaThemeColor.content = theme === 'dark' ? '#09090b' : '#f8fafc'
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (
      currentTheme === 'dark' ? 'light' : 'dark'
    ))
  }, [])

  const setThemeManual = useCallback((nextTheme) => {
    if (VALID_THEMES.includes(nextTheme)) {
      setTheme(nextTheme)
    }
  }, [])

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    setThemeManual
  }), [theme, toggleTheme, setThemeManual])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}