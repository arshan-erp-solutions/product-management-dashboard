import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Package, Tag, DollarSign, Hash, Calendar } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { formatDate, formatPrice } from '../utils/productUtils.js'
import ProductImage from '../components/products/ProductImage.jsx'
import ProductStatus from '../components/products/ProductStatus.jsx'
import ConfirmModal from '../components/ui/ConfirmModal.jsx'
import Toast from '../components/ui/Toast.jsx'
import Button from '../components/ui/Button.jsx'
import { useState } from 'react'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, deleteProduct } = useProducts()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center shadow-xl">
            <Package className="h-10 w-10 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Product not found
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    deleteProduct(product.id)
    setToast({ message: 'Product deleted successfully', type: 'success' })
    setTimeout(() => {
      navigate('/products')
    }, 1000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate(`/products/${id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
          <Button variant="danger" onClick={() => setDeleteModalOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <ProductImage
                src={product.image}
                alt={product.name}
                className="w-full h-96 rounded-2xl object-cover shadow-2xl relative z-10"
              />
            </div>
          </div>

          {/* Info */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">
                  ID: {product.id}
                </p>
              </div>
              <ProductStatus status={product.status} stock={product.stock} />
            </div>

            <div className="space-y-5">
              <div className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center mr-4 shadow-lg">
                  <Tag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Category</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 flex items-center justify-center mr-4 shadow-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Price</p>
                  <p className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 dark:from-blue-600 dark:to-sky-700 flex items-center justify-center mr-4 shadow-lg">
                  <Hash className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Stock</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {product.stock} {product.stock === 1 ? 'unit' : 'units'}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-700 flex items-center justify-center mr-4 shadow-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Created</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{formatDate(product.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
                Description
              </h3>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default ProductDetails