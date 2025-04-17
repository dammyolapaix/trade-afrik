import { cookies } from 'next/headers'
import { redirect, unauthorized } from 'next/navigation'

import crypto from 'crypto'

import { retrieveStore } from '@/features/stores/services'
import { UserRole } from '@/features/users/types'
import { SessionUser, sessionSchema } from '@/types'

import redis from '../redis'
import {
  ONBOARDING_CREATE_STORE_ROUTE,
  ONBOARDING_PAYMENT_ACCOUNT_ROUTE,
} from '../routes'

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7
const COOKIE_SESSION_KEY = 'session' as const

export const getUserFromSession = async () => {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value
  if (!sessionId) return null

  return await getUserSessionById(sessionId)
}

export const getUserSessionById = async (sessionId: string) => {
  const rawUser = await redis.get(`session:${sessionId}`)

  const { success, data: user } = sessionSchema.safeParse(rawUser)

  return success ? user : null
}

export const createUserSession = async (user: SessionUser) => {
  const sessionId = crypto.randomBytes(512).toString('hex').normalize()

  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  })

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_SESSION_KEY, sessionId, {
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain:
      process.env.NODE_ENV === 'production'
        ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
        : undefined,
  })
}

export const getAuthUser = async (roles: UserRole[]) => {
  const authUser = await getUserFromSession()

  if (!authUser) return unauthorized()

  if (!roles.includes(authUser.role)) return unauthorized()

  if (roles.includes('seller')) {
    const store = await retrieveStore({ userId: authUser.id })

    if (!store) redirect(ONBOARDING_CREATE_STORE_ROUTE)

    if (!store.paystackSubAccountId) redirect(ONBOARDING_PAYMENT_ACCOUNT_ROUTE)

    return {
      ...authUser,
      storeId: store.id,
    }
  }

  return authUser
}
