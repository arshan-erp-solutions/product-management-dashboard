import Select from '../ui/Select.jsx'

const StatusFilter = ({ value, onChange }) => {
  const statuses = ['All', 'Active', 'Inactive', 'Out of Stock']

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by status"
    >
      {statuses.map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  )
}

export default StatusFilter