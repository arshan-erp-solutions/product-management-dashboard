import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import ProductRow from './ProductRow.jsx'
import EmptyProducts from './EmptyProducts.jsx'

const ProductTable = ({
  products,
  selectedProducts,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDelete,
  onDragEnd,
  isDragEnabled = false
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    })
  )

  if (products.length === 0) {
    return (
      <EmptyProducts
        title="No products found"
        message="Try adjusting your search or filters."
      />
    )
  }

  const allVisibleProductsSelected = products.every((product) =>
    selectedProducts.includes(product.id)
  )

  const tableContent = (
    <div className="table-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="dashboard-table min-w-[970px]">
          <thead>
            <tr>
              <th className="w-10 px-2">
                <GripVertical
                  className={`h-4 w-4 ${
                    isDragEnabled
                      ? 'text-purple-300'
                      : 'text-zinc-700'
                  }`}
                  aria-hidden="true"
                />
              </th>

              <th className="w-12">
                <input
                  type="checkbox"
                  checked={allVisibleProductsSelected}
                  onChange={onSelectAll}
                  className="accent-purple-500"
                  aria-label="Select all visible products"
                />
              </th>

              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onToggleSelect={onToggleSelect}
                onEdit={onEdit}
                onDelete={onDelete}
                isDragEnabled={isDragEnabled}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (!isDragEnabled) {
    return tableContent
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={products.map((product) => product.id)}
        strategy={verticalListSortingStrategy}
      >
        {tableContent}
      </SortableContext>
    </DndContext>
  )
}

export default ProductTable