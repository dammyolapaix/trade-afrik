'use client'

import * as React from 'react'

import { useCart } from '@/features/products/contexts/cart'
import { CartProduct } from '@/features/products/types'

export function useCartItem(product: CartProduct) {
  const { items, addItem, removeItem, updateQuantity } = useCart()

  const cartItem = React.useMemo(
    () => items.find((item) => item.id === product.id),
    [items, product.id]
  )

  const isInCart = Boolean(cartItem)

  const handlers = React.useMemo(
    () => ({
      addToCart: (quantity = 1) => addItem(product, quantity),
      removeFromCart: () => removeItem(product.id),
      updateQuantity: (quantity: number) =>
        updateQuantity(product.id, quantity),
    }),
    [addItem, product, removeItem, updateQuantity]
  )

  return {
    cartItem,
    isInCart,
    ...handlers,
  }
}
