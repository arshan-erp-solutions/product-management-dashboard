import { forwardRef } from 'react'

const Select = forwardRef(({
  label,
  error,
  className = '',
  id,
  children,
  ...props
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`
            select-field
            w-full appearance-none rounded-xl px-4 py-3 pr-10
            text-slate-900 dark:text-zinc-100
            disabled:cursor-not-allowed disabled:opacity-50
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/15'
              : ''
            }
            ${className}
          `}
          {...props}
        >
          {children}
        </select>

        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </div>

      {error && (
        <p
          className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
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

Select.displayName = 'Select'

export default Select