import { forwardRef } from 'react'
import Select from '../ui/Select.jsx'

const FormSelect = forwardRef(({ label, error, children, ...props }, ref) => {
  return (
    <Select
      ref={ref}
      label={label}
      error={error}
      {...props}
    >
      {children}
    </Select>
  )
})

FormSelect.displayName = 'FormSelect'

export default FormSelect