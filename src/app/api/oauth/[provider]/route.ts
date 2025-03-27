import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { getOAuthClient, validateState } from '@/features/users/auth/oauth'
import { oauthSchema } from '@/features/users/auth/validations'
import { retrieveOrCreateOAuthUser } from '@/features/users/services'
import { OAuthProvider } from '@/features/users/types'
import { createUserSession } from '@/lib/auth/sessions'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '@/lib/routes'

type Params = {
  params: Promise<{ provider: OAuthProvider }>
}

export async function GET(request: NextRequest, { params }: Params) {
  const { provider } = await params
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  console.log(code, state)

  if (typeof code !== 'string' || typeof state !== 'string') {
    redirect(
      `${REGISTER_ROUTE}?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again.'
      )}`
    )
  }

  const stateData = await validateState(state)
  console.log('stateData', stateData)

  if (!stateData)
    redirect(
      `${REGISTER_ROUTE}?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again.'
      )}`
    )

  const validatedData = oauthSchema.parse({
    provider,
    role: stateData.role,
  })

  const oAuthClient = getOAuthClient(validatedData.provider)

  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state)

    const user = await retrieveOrCreateOAuthUser({
      ...oAuthUser,
      ...validatedData,
    })

    await createUserSession(user)
  } catch (error) {
    console.error(error)
    redirect(
      `${LOGIN_ROUTE}?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again.'
      )}`
    )
  }

  redirect(HOME_ROUTE)
}
