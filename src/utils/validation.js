export const validateProduct = (product) => {
  const errors = {}

  const hasImageUpload = Boolean(product.imageFile?.trim())
  const hasImageUrl = Boolean(product.image?.trim())

  if (!product.name || product.name.trim() === '') {
    errors.name = 'Product name is required.'
  } else if (product.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters.'
  } else if (product.name.trim().length > 100) {
    errors.name = 'Product name must not exceed 100 characters.'
  }

  if (!product.category || product.category.trim() === '') {
    errors.category = 'Category is required.'
  }

  if (product.price === '' || product.price === null || product.price === undefined) {
    errors.price = 'Price is required.'
  } else if (Number.isNaN(Number(product.price))) {
    errors.price = 'Price must be a valid number.'
  } else if (Number(product.price) < 0) {
    errors.price = 'Price cannot be negative.'
  }

  if (product.stock === '' || product.stock === null || product.stock === undefined) {
    errors.stock = 'Stock quantity is required.'
  } else if (!Number.isInteger(Number(product.stock))) {
    errors.stock = 'Stock must be a whole number.'
  } else if (Number(product.stock) < 0) {
    errors.stock = 'Stock cannot be negative.'
  }

  if (!product.description || product.description.trim() === '') {
    errors.description = 'Description is required.'
  } else if (product.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.'
  }

  if (!product.status || product.status.trim() === '') {
    errors.status = 'Status is required.'
  }

  if (!hasImageUpload && !hasImageUrl) {
    errors.image = 'Choose an image from your PC or provide an image URL.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}