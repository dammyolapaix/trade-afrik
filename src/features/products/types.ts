import {
  categories,
  productSubCategories,
  productVariantImages,
  productVariants,
  products,
  subCategories,
} from './schema'

export type Product = typeof products.$inferSelect
export type InsertProduct = typeof products.$inferInsert

export type ProductVariant = typeof productVariants.$inferSelect
export type InsertProductVariant = typeof productVariants.$inferInsert

export type ProductVariantImage = typeof productVariantImages.$inferSelect
export type InsertProductVariantImage = typeof productVariantImages.$inferInsert

export type Category = typeof categories.$inferSelect
export type InsertCategory = typeof categories.$inferInsert

export type SubCategory = typeof subCategories.$inferSelect
export type InsertSubCategory = typeof subCategories.$inferInsert

export type ProductSubCategory = typeof productSubCategories.$inferSelect
export type InsertProductSubCategory = typeof productSubCategories.$inferInsert

export type RetrieveProduct = {
  id?: string
  storeId?: string
  userId?: string
}

export type ProductWithDetails = Product & {
  variants: (ProductVariant & {
    images: ProductVariantImage[]
  })[]
  subCategories: (SubCategory & {
    category: Category
  })[]
}
