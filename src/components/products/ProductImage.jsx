import { ImageOff, Package } from 'lucide-react'
import { useState } from 'react'

const ProductImage = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div className={`product-image-frame grid place-items-center ${className}`}>
        <div className="text-center">
          <ImageOff className="mx-auto h-7 w-7 text-zinc-600" />
          <span className="mt-1 block text-[10px] text-zinc-600">No image</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`product-image-frame ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

export default ProductImage