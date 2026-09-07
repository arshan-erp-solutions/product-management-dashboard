import { Package, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { getDashboardStats, formatDate } from '../utils/productUtils.js'
import StatCard from '../components/dashboard/StatCard.jsx'
import ProductImage from '../components/products/ProductImage.jsx'
import { formatPrice } from '../utils/productUtils.js'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const stats = getDashboardStats(products)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your products.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.total}
          icon={<Package className="h-6 w-6 text-white" />}
          color="blue"
        />
        <StatCard
          title="Active Products"
          value={stats.active}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="green"
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="yellow"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          icon={<XCircle className="h-6 w-6 text-white" />}
          color="red"
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Recent Products
          </h2>
          <Link
            to="/products"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-700">
              {recentProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg mr-3"
                      />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                      ${product.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : product.status === 'Inactive'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }
                    `}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(product.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard