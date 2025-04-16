import { categories, products } from './schema'

export type Product = typeof products.$inferSelect
export type InsertProduct = typeof products.$inferInsert

export type Category = typeof categories.$inferSelect
export type InsertCategory = typeof categories.$inferInsert

export type RetrieveProduct = {
  id?: string
  storeId?: string
}

export type ProductWithRelationships = Product & {
  category: Category
}
