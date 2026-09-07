import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { mockProducts } from '../data/mockProducts.js'

export const ProductContext = createContext(null)

const STORAGE_KEY = 'products'

const readProducts = () => {
  try {
    const storedProducts = window.localStorage.getItem(STORAGE_KEY)

    if (!storedProducts) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts))
      return mockProducts
    }

    const parsedProducts = JSON.parse(storedProducts)

    if (!Array.isArray(parsedProducts)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts))
      return mockProducts
    }

    return parsedProducts
  } catch {
    return mockProducts
  }
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setProducts(readProducts())
    setIsLoading(false)
  }, [])

  const saveToStorage = useCallback((nextProducts) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts))
    } catch (error) {
      console.error('Unable to save products in LocalStorage:', error)
    }
  }, [])

  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString()
    }

    setProducts((previousProducts) => {
      const nextProducts = [newProduct, ...previousProducts]
      saveToStorage(nextProducts)
      return nextProducts
    })

    return newProduct
  }, [saveToStorage])

  const updateProduct = useCallback((updatedProduct) => {
    setProducts((previousProducts) => {
      const nextProducts = previousProducts.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      )

      saveToStorage(nextProducts)
      return nextProducts
    })
  }, [saveToStorage])

  const deleteProduct = useCallback((productId) => {
    setProducts((previousProducts) => {
      const nextProducts = previousProducts.filter(
        (product) => product.id !== productId
      )

      saveToStorage(nextProducts)
      return nextProducts
    })
  }, [saveToStorage])

  const deleteMultipleProducts = useCallback((productIds) => {
    const selectedIds = new Set(productIds)

    setProducts((previousProducts) => {
      const nextProducts = previousProducts.filter(
        (product) => !selectedIds.has(product.id)
      )

      saveToStorage(nextProducts)
      return nextProducts
    })
  }, [saveToStorage])

  const reorderProducts = useCallback((nextProducts) => {
    setProducts(nextProducts)
    saveToStorage(nextProducts)
  }, [saveToStorage])

  const getProductById = useCallback((productId) => {
    return products.find((product) => product.id === productId) || null
  }, [products])

  const value = useMemo(() => ({
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
    reorderProducts,
    getProductById
  }), [
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
    reorderProducts,
    getProductById
  ])

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}