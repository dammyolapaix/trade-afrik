import { cookies } from 'next/headers'
import { forbidden, unauthorized } from 'next/navigation'

import crypto from 'crypto'
import { z } from 'zod'

import { retrieveStore } from '@/features/stores/services'
import { UserRole } from '@/features/users/types'

import redis from '../redis'

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7
const COOKIE_SESSION_KEY = 'session' as const

const sessionSchema = z.object({
  id: z.string(),
})

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

export const createUserSession = async (
  user: z.infer<typeof sessionSchema>
) => {
  const sessionId = crypto.randomBytes(512).toString('hex').normalize()

  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  })

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_SESSION_KEY, sessionId, {
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })
}

export const getAuthUser = async (role: UserRole) => {
  const user = await getUserFromSession()

  if (!user) return unauthorized()

  if (role === 'seller') {
    const authUserStore = await retrieveStore({ userId: user.id })

    if (!authUserStore || !authUserStore.paystackSubAccountId)
      return forbidden()

    return {
      store: authUserStore,
      user,
    }
  }

  return {
    user,
  }
}
