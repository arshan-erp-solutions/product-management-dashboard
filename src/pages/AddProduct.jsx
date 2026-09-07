import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import ProductForm from '../components/forms/ProductForm.jsx'
import Toast from '../components/ui/Toast.jsx'

const AddProduct = () => {
  const navigate = useNavigate()
  const { addProduct } = useProducts()
  const [toast, setToast] = useState(null)

  const handleSubmit = async (productData) => {
    try {
      addProduct(productData)

      setToast({
        message: 'Product added successfully.',
        type: 'success'
      })

      setTimeout(() => {
        navigate('/products')
      }, 800)
    } catch (error) {
      setToast({
        message: 'Unable to add product. Please try again.',
        type: 'error'
      })
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <div className="animate-dashboard">
        <p className="caption">Inventory workspace</p>

        <h1 className="gradient-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Add Product
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Create a product and add an image from your PC or with an image URL.
        </p>
      </div>

      <div className="glass-panel animate-dashboard animate-dashboard-delay-1 rounded-2xl p-4 sm:p-6 lg:p-8">
        <ProductForm
          onSubmit={handleSubmit}
          submitLabel="Add Product"
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

export default AddProduct