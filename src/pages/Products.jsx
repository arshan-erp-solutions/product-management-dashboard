import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { arrayMove } from '@dnd-kit/sortable'
import {
  Download,
  GripVertical,
  Plus,
  SlidersHorizontal,
  Trash2,
  X
} from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { filterProducts, paginate } from '../utils/productUtils.js'
import { exportToCSV } from '../utils/csvExport.js'
import SearchBar from '../components/filters/SearchBar.jsx'
import CategoryFilter from '../components/filters/CategoryFilter.jsx'
import StatusFilter from '../components/filters/StatusFilter.jsx'
import PriceFilter from '../components/filters/PriceFilter.jsx'
import SortSelect from '../components/filters/SortSelect.jsx'
import ProductTable from '../components/products/ProductTable.jsx'
import ProductCard from '../components/products/ProductCard.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import ConfirmModal from '../components/ui/ConfirmModal.jsx'
import Toast from '../components/ui/Toast.jsx'
import Button from '../components/ui/Button.jsx'
import Badge from '../components/ui/Badge.jsx'

const PRODUCTS_PER_PAGE = 10

const Products = () => {
  const navigate = useNavigate()

  const {
    products,
    deleteProduct,
    deleteMultipleProducts,
    reorderProducts
  } = useProducts()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [toast, setToast] = useState(null)

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    mode: null,
    product: null
  })

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      searchTerm: debouncedSearchTerm,
      category: selectedCategory,
      status: selectedStatus,
      minPrice,
      maxPrice,
      sortOption
    })
  }, [
    products,
    debouncedSearchTerm,
    selectedCategory,
    selectedStatus,
    minPrice,
    maxPrice,
    sortOption
  ])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    const validProductIds = new Set(products.map((product) => product.id))

    setSelectedProducts((previousSelectedProducts) =>
      previousSelectedProducts.filter((productId) =>
        validProductIds.has(productId)
      )
    )
  }, [products])

  const paginatedData = useMemo(() => {
    return paginate(filteredProducts, currentPage, PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const activeFiltersCount = useMemo(() => {
    return [
      searchTerm.trim() !== '',
      selectedCategory !== 'All',
      selectedStatus !== 'All',
      minPrice !== '',
      maxPrice !== '',
      sortOption !== 'default'
    ].filter(Boolean).length
  }, [
    searchTerm,
    selectedCategory,
    selectedStatus,
    minPrice,
    maxPrice,
    sortOption
  ])

  const isDragEnabled =
    sortOption === 'default' &&
    selectedCategory === 'All' &&
    selectedStatus === 'All' &&
    minPrice === '' &&
    maxPrice === '' &&
    debouncedSearchTerm.trim() === ''

  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    setMinPrice('')
    setMaxPrice('')
    setSortOption('default')
    setCurrentPage(1)
  }

  const toggleProductSelection = useCallback((productId) => {
    setSelectedProducts((previousSelectedProducts) => {
      if (previousSelectedProducts.includes(productId)) {
        return previousSelectedProducts.filter(
          (selectedProductId) => selectedProductId !== productId
        )
      }

      return [...previousSelectedProducts, productId]
    })
  }, [])

  const handleSelectAllVisible = useCallback(() => {
    const visibleProductIds = paginatedData.items.map(
      (product) => product.id
    )

    const everyVisibleProductSelected = visibleProductIds.every(
      (productId) => selectedProducts.includes(productId)
    )

    setSelectedProducts((previousSelectedProducts) => {
      if (everyVisibleProductSelected) {
        return previousSelectedProducts.filter(
          (productId) => !visibleProductIds.includes(productId)
        )
      }

      return Array.from(
        new Set([
          ...previousSelectedProducts,
          ...visibleProductIds
        ])
      )
    })
  }, [paginatedData.items, selectedProducts])

  const handleEdit = useCallback((productId) => {
    navigate(`/products/${productId}/edit`)
  }, [navigate])

  const handleDelete = useCallback((product) => {
    setDeleteModal({
      isOpen: true,
      mode: 'single',
      product
    })
  }, [])

  const handleBulkDelete = useCallback(() => {
    if (selectedProducts.length === 0) {
      return
    }

    setDeleteModal({
      isOpen: true,
      mode: 'bulk',
      product: null
    })
  }, [selectedProducts.length])

  const handleConfirmDelete = useCallback(() => {
    if (deleteModal.mode === 'bulk') {
      const deletedCount = selectedProducts.length

      deleteMultipleProducts(selectedProducts)
      setSelectedProducts([])

      setToast({
        message: `${deletedCount} product${deletedCount === 1 ? '' : 's'} deleted successfully.`,
        type: 'success'
      })

      return
    }

    if (deleteModal.mode === 'single' && deleteModal.product) {
      deleteProduct(deleteModal.product.id)

      setSelectedProducts((previousSelectedProducts) =>
        previousSelectedProducts.filter(
          (productId) => productId !== deleteModal.product.id
        )
      )

      setToast({
        message: 'Product deleted successfully.',
        type: 'success'
      })
    }
  }, [
    deleteModal.mode,
    deleteModal.product,
    deleteMultipleProducts,
    deleteProduct,
    selectedProducts
  ])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const activeIndex = products.findIndex(
      (product) => product.id === active.id
    )

    const overIndex = products.findIndex(
      (product) => product.id === over.id
    )

    if (activeIndex === -1 || overIndex === -1) {
      return
    }

    const reorderedProducts = arrayMove(
      products,
      activeIndex,
      overIndex
    )

    reorderProducts(reorderedProducts)

    setToast({
      message: 'Product order updated and saved.',
      type: 'success'
    })
  }, [products, reorderProducts])

  const handleExportCSV = useCallback(() => {
    if (filteredProducts.length === 0) {
      setToast({
        message: 'There are no filtered products to export.',
        type: 'warning'
      })
      return
    }

    exportToCSV(filteredProducts, 'producthub-products.csv')

    setToast({
      message: `${filteredProducts.length} filtered product${filteredProducts.length === 1 ? '' : 's'} exported to CSV.`,
      type: 'success'
    })
  }, [filteredProducts])

  const deleteMessage =
    deleteModal.mode === 'bulk'
      ? `Are you sure you want to permanently delete ${selectedProducts.length} selected product${selectedProducts.length === 1 ? '' : 's'}? This action cannot be undone.`
      : `Are you sure you want to permanently delete "${deleteModal.product?.name || ''}"? This action cannot be undone.`

  return (
    <div className="space-y-6 pb-8">
      <section className="animate-dashboard flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="caption">Inventory workspace</p>

          <h1 className="gradient-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Products
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Manage your products, inventory levels, categories, pricing and status
            from one workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedProducts.length > 0 && (
            <>
              <Badge variant="info">
                {selectedProducts.length} selected
              </Badge>

              <Button
                variant="danger"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>

          <Button
            size="sm"
            onClick={() => navigate('/products/add')}
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </section>

      <section className="glass-panel-soft animate-dashboard animate-dashboard-delay-1 rounded-2xl p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg border border-purple-300/15 bg-purple-500/10 text-purple-300">
              <SlidersHorizontal className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Search and filters
              </p>
              <p className="text-xs text-zinc-500">
                Refine the product inventory view
              </p>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              Clear {activeFiltersCount} filter{activeFiltersCount === 1 ? '' : 's'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <SearchBar
              value={searchTerm}
              onChange={(value) => handleFilterChange(setSearchTerm, value)}
              placeholder="Search products, categories or descriptions"
            />
          </div>

          <CategoryFilter
            value={selectedCategory}
            onChange={(value) => handleFilterChange(setSelectedCategory, value)}
            products={products}
          />

          <StatusFilter
            value={selectedStatus}
            onChange={(value) => handleFilterChange(setSelectedStatus, value)}
          />

          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinChange={(value) => handleFilterChange(setMinPrice, value)}
            onMaxChange={(value) => handleFilterChange(setMaxPrice, value)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.08] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-56">
            <SortSelect
              value={sortOption}
              onChange={(value) => handleFilterChange(setSortOption, value)}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.9)]" />

            <span>
              Showing{' '}
              <span className="font-semibold text-white">
                {paginatedData.items.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-white">
                {filteredProducts.length}
              </span>{' '}
              product{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
          <GripVertical className="h-4 w-4" />

          <span>
            {isDragEnabled
              ? 'Drag product rows by the grip icon to reorder and save the default inventory order.'
              : 'Drag ordering is available only when search, filters and sorting are set to Default.'
            }
          </span>
        </div>
      </section>

      <section className="animate-dashboard animate-dashboard-delay-2">
        <div className="hidden lg:block">
          <ProductTable
            products={paginatedData.items}
            selectedProducts={selectedProducts}
            onToggleSelect={toggleProductSelection}
            onSelectAll={handleSelectAllVisible}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDragEnd={handleDragEnd}
            isDragEnabled={isDragEnabled}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {paginatedData.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={toggleProductSelection}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {paginatedData.items.length === 0 && (
          <div className="empty-state p-10 text-center sm:p-14">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-purple-300/15 bg-purple-500/10 text-purple-300">
              <SlidersHorizontal className="h-5 w-5" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-white">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
              Try changing your search terms or clearing the selected filters.
            </p>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn-gradient mt-5 rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </section>

      {filteredProducts.length > PRODUCTS_PER_PAGE && (
        <div className="animate-dashboard animate-dashboard-delay-3 pt-1">
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({
          isOpen: false,
          mode: null,
          product: null
        })}
        onConfirm={handleConfirmDelete}
        title={
          deleteModal.mode === 'bulk'
            ? 'Delete selected products?'
            : 'Delete product?'
        }
        message={deleteMessage}
        confirmText="Delete permanently"
      />

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

export default Products