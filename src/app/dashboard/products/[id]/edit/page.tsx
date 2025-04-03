import { forbidden } from 'next/navigation'
import { Suspense } from 'react'

import { retrieveProduct } from '@/features/products/services'
import { getAuthUser } from '@/lib/auth/sessions'
import { AuthSeller } from '@/types'

import ProductVariantForm from '../../_components/product-variant-form'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
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
      <div className="container mx-auto mb-10 text-2xl font-bold">
        {product.name}
      </div>
      <ProductVariantForm productId={product.id} />
    </Suspense>
  )
}
