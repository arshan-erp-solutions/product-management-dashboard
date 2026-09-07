import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ProductRow from './ProductRow.jsx'

const DraggableProductRow = ({ product, onEdit, onDelete, isSelected, onToggleSelect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-move"
    >
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={`Select ${product.name}`}
        />
      </td>
      <td className="px-4 py-4">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-12 w-12 rounded-lg"
        />
      </td>
      <td className="px-4 py-4">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {product.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ID: {product.id}
          </p>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {product.category}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {formatPrice(product.price)}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {product.stock}
        </span>
      </td>
      <td className="px-4 py-4">
        <ProductStatus status={product.status} stock={product.stock} />
      </td>
      <td className="px-4 py-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(product.createdAt)}
        </span>
      </td>
      <td className="px-4 py-4">
        <ProductActions
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  )
}

export default DraggableProductRow