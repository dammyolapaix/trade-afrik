import 'server-only'

import { and, eq } from 'drizzle-orm'

import db from '@/db'
import { profiles, userOAuthAccounts, users } from '@/db/schema'
import { INTERNAL_SERVER_ERROR } from '@/lib/constants'

import { InsertUser, RetrieveOrCreateOAuthUser, RetrieveUser } from './types'

export const registerUser = async (userInfo: InsertUser) => {
  return await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(users)
      .values(userInfo)
      .returning({ id: users.id })

    const [profile] = await tx
      .insert(profiles)
      .values({
        userId: user.id,
        name: userInfo.name,
      })
      .returning({ id: profiles.id })

    if (!user || !profile) throw new Error(INTERNAL_SERVER_ERROR)

    return user
  })
}

/**
 * Get single user by query
 */
export const retrieveUser = async (query: RetrieveUser) =>
  await db.query.users.findFirst({
    where: and(
      query.id
        ? eq(users.id, query.id)
        : query.email
          ? eq(users.email, query.email)
          : undefined
    ),
    columns: query.password === true ? undefined : { password: false },
  })

export const retrieveOrCreateOAuthUser = async ({
  id,
  email,
  name,
  provider,
  role,
}: RetrieveOrCreateOAuthUser) => {
  return await db.transaction(async (tx) => {
    let user = await tx.query.users.findFirst({
      where: eq(users.email, email),
      columns: { id: true, role: true },
    })

    if (user == null) {
      if (!role) throw new Error(INTERNAL_SERVER_ERROR)

      const [newUser] = await tx
        .insert(users)
        .values({
          email: email,
          role,
        })
        .returning({ id: users.id, role: users.role })

      user = newUser

      const [profile] = await tx
        .insert(profiles)
        .values({
          userId: user.id,
          name,
        })
        .returning({ id: profiles.id })

      if (!user || !profile) throw new Error(INTERNAL_SERVER_ERROR)
    }

    await tx
      .insert(userOAuthAccounts)
      .values({
        provider,
        providerAccountId: id,
        userId: user.id,
      })
      .onConflictDoNothing()
      .returning()

    return user
  })
}
