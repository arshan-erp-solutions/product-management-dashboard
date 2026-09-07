import { NavLink } from 'react-router-dom'
import {
  ChevronRight,
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const primaryLinks = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      end: true
    },
    {
      to: '/products',
      label: 'Products',
      icon: Package,
      end: true
    },
    {
      to: '/products/add',
      label: 'Add Product',
      icon: Plus,
      end: true
    }
  ]

  const renderLink = ({ to, label, icon: Icon, end = false }) => (
    <NavLink
      key={`${to}-${label}`}
      to={to}
      end={end}
      onClick={onClose}
      className={({ isActive }) =>
        `group sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
      }
    >
      <Icon
        className="h-[18px] w-[18px] shrink-0"
        strokeWidth={1.8}
      />

      <span className="truncate">{label}</span>

      <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </NavLink>
  )

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          sidebar fixed inset-y-0 left-0 z-50 flex w-[270px] shrink-0 flex-col
          transition-transform duration-300 lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <div className="mb-8 flex items-center justify-between px-2">
            <div className="flex min-w-0 items-center gap-3">
              <div className="sidebar-logo-mark grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                <Package
                  className="h-5 w-5 text-white"
                  strokeWidth={2.2}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-wide text-white">
                  ProductHub
                </p>

                <p className="truncate text-[11px] text-zinc-500">
                  Inventory workspace
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
            Workspace
          </div>

          <nav className="space-y-1" aria-label="Primary navigation">
            {primaryLinks.map(renderLink)}
          </nav>

          <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
            <button
              type="button"
              className="sidebar-link w-full text-left"
              aria-label="Open settings"
            >
              <Settings
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
              <span>Settings</span>
            </button>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs font-medium text-zinc-300">
                Local workspace
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Your product data is saved safely in this browser.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar