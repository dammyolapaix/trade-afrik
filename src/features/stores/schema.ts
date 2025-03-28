import { bigint, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { timestamps } from '@/db/helper'
import { users } from '@/db/schema'

const stores = pgTable('stores', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull().unique(),
  slug: varchar({ length: 256 }).notNull().unique(),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  paystackSubAccountId: bigint({ mode: 'number' }),
  ...timestamps,
})

export default stores
