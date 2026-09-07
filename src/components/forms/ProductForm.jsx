import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Image as ImageIcon,
  Link as LinkIcon,
  PackagePlus,
  Save,
  Upload,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts.js'
import { validateProduct } from '../../utils/validation.js'
import { getCategories } from '../../utils/productUtils.js'
import FormInput from './FormInput.jsx'
import FormSelect from './FormSelect.jsx'
import FormTextarea from './FormTextarea.jsx'
import ProductImage from '../products/ProductImage.jsx'
import Button from '../ui/Button.jsx'

const MAX_IMAGE_SIZE_MB = 5
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

const initialFormData = {
  name: '',
  image: '',
  imageFile: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  status: 'Active'
}

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()

    reader.onload = (event) => {
      image.src = event.target.result
    }

    reader.onerror = () => {
      reject(new Error('Unable to read the selected image.'))
    }

    image.onload = () => {
      const maxDimension = 900
      const scale = Math.min(
        1,
        maxDimension / Math.max(image.width, image.height)
      )

      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))

      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, canvas.width, canvas.height)

      const compressedImage = canvas.toDataURL('image/jpeg', 0.82)
      resolve(compressedImage)
    }

    image.onerror = () => {
      reject(new Error('Selected file is not a valid image.'))
    }

    reader.readAsDataURL(file)
  })
}

const ProductForm = ({
  initialData,
  onSubmit,
  submitLabel = 'Save Product'
}) => {
  const navigate = useNavigate()
  const { products } = useProducts()
  const fileInputRef = useRef(null)

  const categories = useMemo(() => getCategories(products), [products])

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompressingImage, setIsCompressingImage] = useState(false)

  useEffect(() => {
    if (!initialData) {
      return
    }

    setFormData({
      name: initialData.name || '',
      image: initialData.image || '',
      imageFile: '',
      category: initialData.category || '',
      price: initialData.price?.toString() || '',
      stock: initialData.stock?.toString() || '',
      description: initialData.description || '',
      status: initialData.status || 'Active'
    })
  }, [initialData])

  const activeImage = formData.imageFile || formData.image

  const handleChange = (field, value) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [field]: value
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: '',
      image: ''
    }))
  }

  const handleImageUpload = async (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      return
    }

    if (!selectedFile.type.startsWith('image/')) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        image: 'Please choose a valid image file.'
      }))
      event.target.value = ''
      return
    }

    if (selectedFile.size > MAX_IMAGE_SIZE_BYTES) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        image: `Image must be smaller than ${MAX_IMAGE_SIZE_MB} MB.`
      }))
      event.target.value = ''
      return
    }

    try {
      setIsCompressingImage(true)

      const compressedImageDataUrl = await compressImage(selectedFile)

      setFormData((previousFormData) => ({
        ...previousFormData,
        imageFile: compressedImageDataUrl
      }))

      setErrors((previousErrors) => ({
        ...previousErrors,
        image: ''
      }))
    } catch (error) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        image: 'Unable to process this image. Please select another one.'
      }))
    } finally {
      setIsCompressingImage(false)
    }
  }

  const removeUploadedImage = () => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      imageFile: ''
    }))

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validation = validateProduct(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)

    const productData = {
      name: formData.name.trim(),
      image: formData.imageFile || formData.image.trim(),
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock, 10),
      description: formData.description.trim(),
      status: formData.status
    }

    try {
      await onSubmit(productData)
    } catch (error) {
      setErrors({
        form: 'Unable to save this product. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <section className="rounded-2xl border border-white/10 bg-black/10 p-4 dark:bg-black/20 sm:p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-purple-500/20">
            <PackagePlus className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Product information
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
              Add your product name, category, pricing and inventory quantity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            label="Product Name"
            value={formData.name}
            onChange={(event) => handleChange('name', event.target.value)}
            placeholder="For example: Wireless Headphones"
            error={errors.name}
            required
          />

          <FormSelect
            label="Category"
            value={formData.category}
            onChange={(event) => handleChange('category', event.target.value)}
            error={errors.category}
            required
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </FormSelect>

          <FormInput
            label="Price (USD)"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(event) => handleChange('price', event.target.value)}
            placeholder="0.00"
            error={errors.price}
            required
          />

          <FormInput
            label="Stock Quantity"
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            value={formData.stock}
            onChange={(event) => handleChange('stock', event.target.value)}
            placeholder="0"
            error={errors.stock}
            required
          />

          <FormSelect
            label="Status"
            value={formData.status}
            onChange={(event) => handleChange('status', event.target.value)}
            error={errors.status}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
          </FormSelect>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/10 p-4 dark:bg-black/20 sm:p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <ImageIcon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Product image
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
              Upload an image from your PC or add an image URL. Select at least one.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_250px]">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="product-image-upload"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
              >
                Upload Image from PC
              </label>

              <input
                ref={fileInputRef}
                id="product-image-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isCompressingImage}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-400/40 bg-violet-500/[0.06] px-4 py-4 text-sm font-semibold text-violet-700 transition hover:bg-violet-500/[0.12] disabled:cursor-not-allowed disabled:opacity-60 dark:text-violet-300"
              >
                <Upload className="h-4 w-4" />

                {isCompressingImage
                  ? 'Processing image...'
                  : 'Choose image from your PC'
                }
              </button>

              <p className="mt-2 text-xs text-slate-500 dark:text-zinc-600">
                Supported: JPG, JPEG, PNG, WebP. Maximum size: 5 MB.
              </p>

              {formData.imageFile && (
                <button
                  type="button"
                  onClick={removeUploadedImage}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 transition hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove uploaded image
                </button>
              )}
            </div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs font-medium text-slate-500 dark:bg-[#18161d] dark:text-zinc-600">
                  OR
                </span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-violet-600 dark:text-violet-300" />

                <label
                  htmlFor="image-url"
                  className="text-sm font-semibold text-slate-700 dark:text-zinc-300"
                >
                  Image URL
                </label>
              </div>

              <FormInput
                id="image-url"
                type="url"
                value={formData.image}
                onChange={(event) => handleChange('image', event.target.value)}
                placeholder="https://example.com/product-image.jpg"
              />

              <p className="mt-2 text-xs text-slate-500 dark:text-zinc-600">
                If you upload an image and provide a URL, the uploaded image is used.
              </p>
            </div>

            {errors.image && (
              <p
                className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                <span className="grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  !
                </span>
                {errors.image}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Image Preview
            </p>

            <div className="product-image-frame flex h-[230px] items-center justify-center">
              {activeImage ? (
                <ProductImage
                  src={activeImage}
                  alt={formData.name || 'Product preview'}
                  className="h-full w-full"
                />
              ) : (
                <div className="px-5 text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-slate-400 dark:text-zinc-600" />
                  <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-zinc-500">
                    Upload a product image or paste an image URL to preview it here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/10 p-4 dark:bg-black/20 sm:p-5">
        <FormTextarea
          label="Description"
          value={formData.description}
          onChange={(event) => handleChange('description', event.target.value)}
          placeholder="Write a detailed product description of at least 10 characters..."
          error={errors.description}
          required
          rows={6}
          className="min-h-[150px]"
        />
      </section>

      {errors.form && (
        <div
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300"
          role="alert"
        >
          {errors.form}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/products')}
          disabled={isSubmitting || isCompressingImage}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || isCompressingImage}
          className="w-full sm:w-auto"
        >
          <Save className="h-4 w-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm