import { Bell, Menu, Moon, Sun } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext.jsx'

const Header = ({ onMenuClick, title }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="app-header sticky top-0 z-30 h-[76px]">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-zinc-300 transition hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <p className="hidden text-[11px] uppercase tracking-[0.18em] text-zinc-600 sm:block">
              Workspace overview
            </p>

            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-[18px] w-[18px]" />
            ) : (
              <Sun className="h-[18px] w-[18px] text-amber-300" />
            )}
          </button>

          <div className="hidden items-center gap-2 border-l border-white/10 pl-3 sm:flex">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-300 via-purple-400 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-purple-500/20">
              A
            </div>

            <div className="hidden xl:block">
              <p className="text-xs font-medium text-zinc-200">
                Admin
              </p>
              <p className="text-[11px] text-zinc-500">
                Workspace owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header