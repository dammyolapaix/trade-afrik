import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { findStoreByDomain } from '@/features/stores/services'
import { getSubDomainName } from '@/lib/utils'

import SellerInfo from './_components/seller-info'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function StoreHomePage({ params }: Props) {
  const { domain } = await params

  const storeDomain = getSubDomainName(domain)

  const store = await findStoreByDomain(storeDomain)

  return (
    <Suspense fallback={<Skeleton />}>
      <SellerInfo storeId={store.id} />
    </Suspense>
  )
}
