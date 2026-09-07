import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 rounded-xl font-semibold
    transition-all duration-200 focus:outline-none focus-visible:ring-2
    focus-visible:ring-purple-400 disabled:cursor-not-allowed
    disabled:opacity-50
  `

  const variants = {
    primary: 'btn-gradient',
    secondary: 'btn-dark-outline',
    danger: 'rounded-xl border border-rose-400/25 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25',
    ghost: 'text-zinc-400 hover:bg-white/[0.07] hover:text-white',
    outline: 'btn-dark-outline'
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm'
  }

  return (
    <button
      ref={ref}
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button