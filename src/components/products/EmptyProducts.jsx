import { Package } from 'lucide-react'

const EmptyProducts = ({ title, message, action }) => {
  return (
    <div className="text-center py-12">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {message}
      </p>
      {action && (
        <div className="mt-6">{action}</div>
      )}
    </div>
  )
}

export default EmptyProducts