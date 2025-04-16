import { Suspense } from 'react'

import { getUserFromSession } from '@/lib/auth/sessions'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function StoreHomePage({ params }: Props) {
  const { domain } = await params
  const user = await getUserFromSession()

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="container mx-auto mb-10 text-2xl font-bold">
        <div>{decodeURIComponent(domain)}</div>

        <div>User ID: {user?.id}</div>
      </div>
    </Suspense>
  )
}
