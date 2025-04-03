import { Suspense } from 'react'

import { ListSubCategory } from '@/features/products/services'
import { getAuthUser } from '@/lib/auth/sessions'

import ProductForm from '../_components/product-form'

export default async function page() {
  await getAuthUser(['seller'])

  const subCategories = await ListSubCategory()

  return (
    <Suspense fallback={<>Loading...</>}>
      <ProductForm subCategories={subCategories} />
    </Suspense>
  )
}
