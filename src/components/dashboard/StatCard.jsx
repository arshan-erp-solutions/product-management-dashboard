const StatCard = ({
  title,
  value,
  icon,
  trend,
  color = 'blue'
}) => {
  const accents = {
    blue: 'from-sky-400 to-indigo-500',
    green: 'from-emerald-400 to-teal-500',
    yellow: 'from-amber-300 to-orange-500',
    red: 'from-rose-400 to-pink-600',
    purple: 'from-violet-400 to-fuchsia-500'
  }

  return (
    <article className="stat-card animate-dashboard p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="caption">{title}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>

          {trend !== undefined && (
            <p className={`mt-3 text-xs font-medium ${
              trend >= 0 ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>

        <div className={`stat-icon shrink-0 bg-gradient-to-br ${accents[color]}`}>
          {icon}
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
        <div className={`h-full w-2/3 rounded-full bg-gradient-to-r ${accents[color]}`} />
      </div>
    </article>
  )
}

export default StatCard