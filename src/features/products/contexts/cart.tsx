'use client'

import * as React from 'react'

import { CartProduct } from '../types'

export type CartItem = {
  id: string
  quantity: number
  product: CartProduct
}

type CartState = {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartContextType = CartState & {
  addItem: (product: CartProduct, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

const removeItemUtils = (cartItems: CartItem[], productId: string) => {
  const items = cartItems.filter((item) => item.id !== productId)
  const total = items.reduce(
    (sum, item) =>
      sum + (item.product.salePrice ?? item.product.price) * item.quantity,
    0
  )
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return { items, total, itemCount }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return { items: [], total: 0, itemCount: 0 }
  })

  // Save to localStorage whenever cart changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }, [state])

  const addItem = React.useCallback(
    (product: CartProduct, quantity: number = 1) => {
      setState((current) => {
        const existingItem = current.items.find(
          (item) => item.id === product.id
        )

        const items = existingItem
          ? current.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          : [...current.items, { id: product.id, quantity, product }]

        const total = items.reduce(
          (sum, item) =>
            sum +
            (item.product.salePrice ?? item.product.price) * item.quantity,
          0
        )

        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

        return { items, total, itemCount }
      })
    },
    []
  )

  const removeItem = React.useCallback((productId: string) => {
    setState((current) => removeItemUtils(current.items, productId))
  }, [])

  const updateQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      setState((current) => {
        // Remove item if quantity is 0 or less
        if (quantity <= 0) return removeItemUtils(current.items, productId)

        // Update quantity if greater than 0
        const items = current.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        const total = items.reduce(
          (sum, item) =>
            sum +
            (item.product.salePrice ?? item.product.price) * item.quantity,
          0
        )
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

        return { items, total, itemCount }
      })
    },
    []
  )

  const clearCart = React.useCallback(() => {
    setState({ items: [], total: 0, itemCount: 0 })
  }, [])

  const value = React.useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state, addItem, removeItem, updateQuantity, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
