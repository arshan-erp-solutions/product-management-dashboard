import { Edit, Trash2, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button.jsx'

const ProductActions = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/products/${product.id}`)}
        aria-label="View product"
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(product.id)}
        aria-label="Edit product"
      >
        <Edit className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(product)}
        aria-label="Delete product"
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  )
}

export default ProductActions