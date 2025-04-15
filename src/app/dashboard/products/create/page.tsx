import { Suspense } from 'react'

import { listCategories } from '@/features/products/services'
import { getAuthUser } from '@/lib/auth/sessions'

import ProductForm from '../_components/product-form'

export default async function page() {
  await getAuthUser(['seller'])

  const categories = await listCategories()

  return (
    <Suspense fallback={<>Loading...</>}>
      <ProductForm categories={categories} />
    </Suspense>
  )
}
