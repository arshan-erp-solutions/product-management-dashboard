import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const getPageTitle = () => {
    const path = location.pathname

    if (path === '/') return 'Dashboard'
    if (path === '/products') return 'Products'
    if (path === '/products/add') return 'Add Product'
    if (path.endsWith('/edit')) return 'Edit Product'
    if (path.startsWith('/products/')) return 'Product Details'

    return 'ProductHub'
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-content flex min-w-0 flex-1 flex-col">
        <Header
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px] animate-dashboard">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout