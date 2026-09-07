import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  className = '',
  type = 'text',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`
          input-field
          w-full rounded-xl px-4 py-3
          text-slate-900 placeholder:text-slate-400
          dark:text-zinc-100 dark:placeholder:text-zinc-600
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/15'
            : ''
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <svg
            className="h-4 w-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>

          <span>{error}</span>
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input