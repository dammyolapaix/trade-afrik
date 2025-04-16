import { forbidden } from 'next/navigation'
import { Suspense } from 'react'

import { retrieveProduct } from '@/features/products/services'
import { getAuthUser } from '@/lib/auth/sessions'
import { AuthSeller } from '@/types'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const [{ id }, authUser] = await Promise.all([
    params,
    getAuthUser(['seller']),
  ])

  const product = await retrieveProduct({
    id,
    storeId: (authUser as AuthSeller).storeId,
  })

  if (!product) forbidden()

  return (
    <Suspense fallback={<>Loading...</>}>
      <>{JSON.stringify(product)}</>
    </Suspense>
  )
}
