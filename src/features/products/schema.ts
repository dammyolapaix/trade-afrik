import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { productVariantColorEnum, productVariantSizeEnum } from '@/db/enums'
import { timestamps } from '@/db/helper'
import { stores, users } from '@/db/schema'

export const products = pgTable('products', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  storeId: uuid()
    .notNull()
    .references(() => stores.id, { onDelete: 'cascade' }),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar({ length: 256 }).notNull(),
  description: text(),
  publishedAt: timestamp({ mode: 'string' }),
  ...timestamps,
})

export const productVariants = pgTable('product_variants', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  productId: uuid()
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  sku: varchar({ length: 256 }).notNull(),
  quantity: integer().notNull(),
  size: productVariantSizeEnum().notNull(),
  color: productVariantColorEnum().notNull(),
  weight: integer().notNull(),
  price: integer().notNull(),
  salePrice: integer(),
  ...timestamps,
})

export const productVariantImages = pgTable('product_variant_images', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  imageUrl: text().notNull(),
  productVariantId: uuid()
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
  position: integer().notNull().default(0),
  ...timestamps,
})

export const categories = pgTable('categories', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  description: text(),
  ...timestamps,
})

export const subCategories = pgTable('sub_categories', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 256 }).notNull(),
  description: text(),
  categoryId: uuid()
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  ...timestamps,
})

export const productSubCategories = pgTable(
  'product_sub_categories',
  {
    productId: uuid()
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    subCategoryId: uuid()
      .notNull()
      .references(() => subCategories.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.productId, table.subCategoryId] }),
    }
  }
)
