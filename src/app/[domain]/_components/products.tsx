import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { listProducts } from '@/features/products/services'
import { ProductWithRelationships } from '@/features/products/types'

import { ProductCard } from './product-card'

type Props = {
  storeId: string
}

function ProductsGrid({ products }: { products: ProductWithRelationships[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default async function Products({ storeId }: Props) {
  const products = await listProducts({ storeId })

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsGrid products={products as ProductWithRelationships[]} />
      </Suspense>
    </div>
  )
}
