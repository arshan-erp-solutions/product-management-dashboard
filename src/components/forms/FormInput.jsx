import { forwardRef } from 'react'
import Input from '../ui/Input.jsx'

const FormInput = forwardRef(({ label, error, type = 'text', ...props }, ref) => {
  return (
    <Input
      ref={ref}
      label={label}
      type={type}
      error={error}
      {...props}
    />
  )
})

FormInput.displayName = 'FormInput'

export default FormInput