import Input from '../ui/Input.jsx'

const PriceFilter = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-24">
        <Input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => onMinChange(e.target.value)}
          aria-label="Minimum price"
        />
      </div>
      <span className="text-gray-400">-</span>
      <div className="w-24">
        <Input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => onMaxChange(e.target.value)}
          aria-label="Maximum price"
        />
      </div>
    </div>
  )
}

export default PriceFilter