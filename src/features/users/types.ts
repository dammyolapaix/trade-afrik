import { profiles, users } from '@/db/schema'
import { OAUTH_PROVIDERS, USER_ROLES } from '@/lib/constants'

export type User = typeof users.$inferSelect

export type InsertProfile = typeof profiles.$inferInsert

export type InsertUser = typeof users.$inferInsert &
  Omit<InsertProfile, 'userId'>

type SingleUserQuery =
  | { id: User['id']; email?: never }
  | { email: User['email']; id?: never }
  | { email?: never; id?: never }

type WithPassword = {
  password?: true
}

export type RetrieveUser = SingleUserQuery &
  WithPassword &
  Omit<Partial<User>, 'id' | 'email' | 'password'>

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number]
export type UserRole = (typeof USER_ROLES)[number]

type OAuthUser = {
  id: string
  email: string
  name: string
}

export type RetrieveOrCreateOAuthUser = OAuthUser & {
  provider: OAuthProvider
  role?: Exclude<UserRole, 'admin'>
}
