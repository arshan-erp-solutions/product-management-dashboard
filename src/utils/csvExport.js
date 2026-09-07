export const exportToCSV = (products, filename = 'products.csv') => {
  const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Status', 'Description', 'Created At']
  
  const rows = products.map(product => [
    product.id,
    `"${product.name.replace(/"/g, '""')}"`,
    product.category,
    product.price.toFixed(2),
    product.stock,
    product.status,
    `"${product.description.replace(/"/g, '""')}"`,
    new Date(product.createdAt).toISOString()
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}