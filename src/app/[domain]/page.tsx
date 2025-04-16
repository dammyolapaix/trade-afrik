import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { findStoreByDomain } from '@/features/stores/services'

import Products from './_components/products'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function StoreHomePage({ params }: Props) {
  const { domain } = await params

  const storeDomain = decodeURIComponent(domain).split('.')[0]

  const store = await findStoreByDomain(storeDomain)

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="container mx-auto mb-10 text-2xl font-bold">
        <div>{store.name}</div>

        <Products storeId={store.id} />
      </div>
    </Suspense>
  )
}
