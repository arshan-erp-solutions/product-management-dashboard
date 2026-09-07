import { Edit, Eye, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import ProductStatus from './ProductStatus.jsx'
import { formatPrice } from '../../utils/productUtils.js'

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelect
}) => {
  const navigate = useNavigate()

  return (
    <article className="product-card group overflow-hidden">
      <div className="relative p-3">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-48 w-full"
        />

        <button
          type="button"
          onClick={() => onToggleSelect(product.id)}
          className={`
            absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-lg border
            transition
            ${isSelected
              ? 'border-purple-300/40 bg-purple-500 text-white'
              : 'border-white/10 bg-black/55 text-zinc-400 hover:bg-black/75 hover:text-white'
            }
          `}
          aria-label={isSelected ? 'Deselect product' : 'Select product'}
        >
          <span className={`h-3 w-3 rounded-sm border ${
            isSelected ? 'border-white bg-white' : 'border-current'
          }`} />
        </button>
      </div>

      <div className="p-5 pt-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-zinc-500">{product.category}</p>
          </div>

          <ProductStatus status={product.status} stock={product.stock} />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="caption">Price</p>
            <p className="mt-1 text-xl font-semibold text-white">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            {product.stock} in stock
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/products/${product.id}`)}
            className="btn-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold"
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          <button
            type="button"
            onClick={() => onEdit(product.id)}
            className="btn-dark-outline rounded-xl p-2.5"
            aria-label="Edit product"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-2.5 text-rose-300 transition hover:bg-rose-500/20"
            aria-label="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard