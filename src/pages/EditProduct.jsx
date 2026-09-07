import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import ProductForm from '../components/forms/ProductForm.jsx'
import Toast from '../components/ui/Toast.jsx'
import { useState } from 'react'
import EmptyProducts from '../components/products/EmptyProducts.jsx'
import Button from '../components/ui/Button.jsx'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, updateProduct } = useProducts()
  const [toast, setToast] = useState(null)

  const product = getProductById(id)

  if (!product) {
    return (
      <EmptyProducts
        title="Product not found"
        message="The product you're looking for doesn't exist or has been removed."
        action={
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        }
      />
    )
  }

  const handleSubmit = async (productData) => {
    try {
      updateProduct({ ...productData, id: product.id })
      setToast({ message: 'Product updated successfully', type: 'success' })
      setTimeout(() => {
        navigate('/products')
      }, 1000)
    } catch (error) {
      setToast({ message: 'Error updating product', type: 'error' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Edit Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Update product information and details.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          submitLabel="Update Product"
        />
      </div>

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

export default EditProduct