import Select from '../ui/Select.jsx'
import { getCategories } from '../../utils/productUtils.js'

const CategoryFilter = ({ value, onChange, products }) => {
  const categories = getCategories(products)

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
    >
      <option value="All">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  )
}

export default CategoryFilter