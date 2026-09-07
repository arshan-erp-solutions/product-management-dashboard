export const searchProducts = (products, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return products
  }
  
  const term = searchTerm.toLowerCase().trim()
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  )
}

export const filterByCategory = (products, category) => {
  if (!category || category === 'All') {
    return products
  }
  return products.filter(product => product.category === category)
}

export const filterByStatus = (products, status) => {
  if (!status || status === 'All') {
    return products
  }
  return products.filter(product => product.status === status)
}

export const filterByPrice = (products, minPrice, maxPrice) => {
  let filtered = products
  
  if (minPrice !== null && minPrice !== undefined && minPrice !== '') {
    const min = parseFloat(minPrice)
    if (!isNaN(min)) {
      filtered = filtered.filter(product => product.price >= min)
    }
  }
  
  if (maxPrice !== null && maxPrice !== undefined && maxPrice !== '') {
    const max = parseFloat(maxPrice)
    if (!isNaN(max)) {
      filtered = filtered.filter(product => product.price <= max)
    }
  }
  
  return filtered
}

export const sortProducts = (products, sortOption) => {
  const sorted = [...products]
  
  switch (sortOption) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'stock-asc':
      return sorted.sort((a, b) => a.stock - b.stock)
    case 'stock-desc':
      return sorted.sort((a, b) => b.stock - a.stock)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    default:
      return sorted
  }
}

export const paginate = (products, currentPage, itemsPerPage = 10) => {
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  
  return {
    items: products.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages
  }
}

export const filterProducts = (products, filters) => {
  let result = [...products]
  
  result = searchProducts(result, filters.searchTerm)
  result = filterByCategory(result, filters.category)
  result = filterByStatus(result, filters.status)
  result = filterByPrice(result, filters.minPrice, filters.maxPrice)
  result = sortProducts(result, filters.sortOption)
  
  return result
}

export const getCategories = (products) => {
  const categories = new Set(products.map(p => p.category))
  return Array.from(categories).sort()
}

export const getDashboardStats = (products) => {
  const total = products.length
  const active = products.filter(p => p.status === 'Active').length
  const inactive = products.filter(p => p.status === 'Inactive').length
  const outOfStock = products.filter(p => p.status === 'Out of Stock').length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5 && p.status !== 'Out of Stock').length
  
  return {
    total,
    active,
    inactive,
    outOfStock,
    lowStock
  }
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString))
}

export const getStockStatus = (stock, status) => {
  if (status === 'Out of Stock') return 'Out of Stock'
  if (stock === 0) return 'Out of Stock'
  if (stock <= 5) return 'Low Stock'
  return 'In Stock'
}