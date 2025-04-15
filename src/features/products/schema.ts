import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { timestamps } from '@/db/helper'
import { stores } from '@/db/schema'

export const products = pgTable('products', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  storeId: uuid()
    .notNull()
    .references(() => stores.id, { onDelete: 'cascade' }),
  name: varchar({ length: 256 }).notNull(),
  description: text(),
  categoryId: uuid()
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  publishedAt: timestamp({ mode: 'string' }),
  quantity: integer().notNull(),
  price: integer().notNull(),
  salePrice: integer(),
  image: text().notNull(),
  ...timestamps,
})

export const categories = pgTable('categories', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  description: text(),
  ...timestamps,
})
