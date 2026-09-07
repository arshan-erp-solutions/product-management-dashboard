import Badge from '../ui/Badge.jsx'

const ProductStatus = ({ status, stock }) => {
  const getStatusVariant = () => {
    if (status === 'Out of Stock' || stock === 0) return 'danger'
    if (status === 'Inactive' || stock <= 5) return 'warning'
    return 'success'
  }

  const getStatusText = () => {
    if (status === 'Out of Stock' || stock === 0) return 'Out of Stock'
    if (status === 'Inactive') return 'Inactive'
    if (stock <= 5) return `Low Stock (${stock})`
    return 'Active'
  }

  return (
    <Badge variant={getStatusVariant()}>
      {getStatusText()}
    </Badge>
  )
}

export default ProductStatus