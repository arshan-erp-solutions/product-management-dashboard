import Select from '../ui/Select.jsx'

const SortSelect = ({ value, onChange }) => {
  const options = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'stock-asc', label: 'Stock: Low to High' },
    { value: 'stock-desc', label: 'Stock: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' }
  ]

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort products"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default SortSelect