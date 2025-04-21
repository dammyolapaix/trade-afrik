'use client'

import { IconShoppingCart, IconTrash } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { CartProduct } from '@/features/products/types'
import { useCartItem } from '@/hooks/use-cart-item'

type AddToCartButtonProps = {
  product: CartProduct
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { isInCart, cartItem, addToCart, removeFromCart, updateQuantity } =
    useCartItem(product)

  if (!isInCart) {
    return (
      <Button onClick={() => addToCart(1)}>
        <IconShoppingCart className="h-4 w-4" /> Add to Cart
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateQuantity((cartItem?.quantity ?? 0) - 1)}
      >
        -
      </Button>
      <span className="text-sm">{cartItem?.quantity}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateQuantity((cartItem?.quantity ?? 0) + 1)}
      >
        +
      </Button>
      <Button variant="destructive" size="sm" onClick={removeFromCart}>
        <IconTrash className="h-4 w-4" /> Remove
      </Button>
    </div>
  )
}
