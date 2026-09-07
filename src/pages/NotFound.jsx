import { useNavigate } from 'react-router-dom'
import { Home, Package } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center shadow-2xl">
            <Package className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 font-semibold">
          Page not found
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound