import { relations } from 'drizzle-orm'
import {
  bigint,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { timestamps } from '@/db/helper'
import { products, stores, users } from '@/db/schema'

export const orders = pgTable('orders', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  storeId: uuid()
    .notNull()
    .references(() => stores.id, { onDelete: 'cascade' }),
  totalAmount: integer().notNull(),
  paidAt: timestamp({ mode: 'string' }),
  paystackReference: varchar({ length: 320 }).notNull().unique(),
  paystackTransactionId: bigint({ mode: 'number' }),
  paymentLink: varchar({ length: 320 }).notNull().unique(),
  ...timestamps,
})

export const orderItems = pgTable('order_items', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  orderId: uuid()
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid()
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer().notNull().default(1),
  ...timestamps,
})

export const orderRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}))

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))
