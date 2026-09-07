import { DndContext, useSensor, useSensors, pointer, keyboard } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import ProductRow from './ProductRow.jsx'
import EmptyProducts from './EmptyProducts.jsx'
import { useProducts } from '../../hooks/useProducts.js'

const SortableProductTable = ({
  products,
  selectedProducts,
  onToggleSelect,
  onEdit,
  onDelete
}) => {
  const { reorderProducts } = useProducts()
  
  const sensors = useSensors(
    useSensor(pointer, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(keyboard, {
      activationConstraint: {
        code: 'Space',
      },
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex(p => p.id === active.id)
      const newIndex = products.findIndex(p => p.id === over.id)
      const newOrder = arrayMove(products, oldIndex, newIndex)
      reorderProducts(newOrder)
    }
  }

  if (products.length === 0) {
    return (
      <EmptyProducts
        title="No products found"
        message="Try adjusting your search or filters to find what you're looking for."
      />
    )
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ⇅ Drag
                </th>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={products.length > 0 && selectedProducts.length === products.length}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all products"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map(product => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isSelected={selectedProducts.includes(product.id)}
                  onToggleSelect={onToggleSelect}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDraggable={true}
                />
              ))}
            </tbody>
          </table>
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default SortableProductTable