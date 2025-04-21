'use client'

import { CartProvider } from '@/features/products/contexts/cart'

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
