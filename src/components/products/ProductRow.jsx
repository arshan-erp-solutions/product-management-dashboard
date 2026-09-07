import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import ProductStatus from './ProductStatus.jsx'
import ProductActions from './ProductActions.jsx'
import { formatDate, formatPrice } from '../../utils/productUtils.js'

const ProductRow = ({
  product,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelect,
  isDragEnabled = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: product.id,
    disabled: !isDragEnabled
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`
        transition-colors
        ${isDragging
          ? 'bg-purple-500/15'
          : 'hover:bg-purple-500/[0.08]'
        }
      `}
    >
      <td className="w-10 px-2 py-4">
        {isDragEnabled ? (
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/[0.08] hover:text-purple-300 active:cursor-grabbing"
            aria-label={`Drag ${product.name} to reorder`}
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        ) : (
          <span className="block h-7 w-7" aria-hidden="true" />
        )}
      </td>

      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
          className="accent-purple-500"
          aria-label={`Select ${product.name}`}
        />
      </td>

      <td>
        <div className="flex min-w-[230px] items-center gap-3">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="h-11 w-11 shrink-0"
          />

          <div className="min-w-0">
            <p className="truncate font-medium text-white">
              {product.name}
            </p>

            <p className="mt-1 truncate font-mono text-[10px] text-zinc-600">
              {product.id}
            </p>
          </div>
        </div>
      </td>

      <td>
        <span className="text-zinc-400">
          {product.category}
        </span>
      </td>

      <td>
        <span className="font-medium text-white">
          {formatPrice(product.price)}
        </span>
      </td>

      <td>
        <span className="text-zinc-300">
          {product.stock}
        </span>
      </td>

      <td>
        <ProductStatus
          status={product.status}
          stock={product.stock}
        />
      </td>

      <td>
        <span className="text-xs text-zinc-500">
          {formatDate(product.createdAt)}
        </span>
      </td>

      <td>
        <ProductActions
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  )
}

export default ProductRow