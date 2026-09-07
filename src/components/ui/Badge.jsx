const Badge = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'badge-default',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info'
  }

  return (
    <span className={`${variants[variant] || variants.default} ${className}`}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {children}
    </span>
  )
}

export default Badge