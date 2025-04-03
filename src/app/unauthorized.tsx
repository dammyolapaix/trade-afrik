import Link from 'next/link'

import { LOGIN_ROUTE } from '@/lib/routes'

export default function UnauthorizedPage() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Link href={LOGIN_ROUTE}>Login</Link>
    </main>
  )
}
