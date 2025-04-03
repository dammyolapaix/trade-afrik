import { getAuthUser } from '@/lib/auth/sessions'

import ProductForm from '../_components/product-form'

export default async function page() {
  await getAuthUser('seller')

  return <ProductForm />
}
