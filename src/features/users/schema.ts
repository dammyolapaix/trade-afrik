import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { oAuthProviderEnum, userRoleEnum } from '@/db/enums'
import { timestamps } from '@/db/helper'

const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  email: varchar({ length: 320 }).notNull().unique(),
  emailVerified: timestamp({ mode: 'string' }),
  role: userRoleEnum().notNull(),
  password: varchar({ length: 256 }),
  salt: text(),
  ...timestamps,
})

export const profiles = pgTable('profiles', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar({ length: 256 }),
  ...timestamps,
})

export const userOAuthAccounts = pgTable(
  'user_oauth_accounts',
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
)

export default users
