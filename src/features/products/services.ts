import 'server-only'

import { and, eq, isNotNull } from 'drizzle-orm'

import { db } from '@/db'
import { products } from '@/db/schema'
import { INTERNAL_SERVER_ERROR } from '@/lib/constants'

import { InsertProduct, Product, RetrieveProduct } from './types'

export const createProduct = async (product: InsertProduct) => {
  const [newProduct] = await db.insert(products).values(product).returning()
  return newProduct
}

export const retrieveProduct = async (
  query: RetrieveProduct
): Promise<Product | undefined> => {
  return await db.query.products.findFirst({
    where: and(
      query.id ? eq(products.id, query.id) : undefined,
      query.storeId ? eq(products.storeId, query.storeId) : undefined
    ),
  })
}

export const listProducts = async ({
  storeId,
  isPublished,
}: Pick<Product, 'storeId'> & { isPublished?: boolean }) => {
  const dbProducts = await db.query.products.findMany({
    where: and(
      eq(products.storeId, storeId),
      isPublished === true ? isNotNull(products.publishedAt) : undefined
    ),
    with: { category: true },
  })

  if (!dbProducts) throw new Error(INTERNAL_SERVER_ERROR)

  return dbProducts
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const [updatedProduct] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning()

  return updatedProduct
}

export const deleteProduct = async (id: string) => {
  const [deletedProduct] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning()

  return deletedProduct
}

export const publishProduct = async (id: string) => {
  const [publishedProduct] = await db
    .update(products)
    .set({ publishedAt: new Date().toISOString() })
    .where(eq(products.id, id))
    .returning()

  return publishedProduct
}

export const unpublishProduct = async (id: string) => {
  const [unpublishedProduct] = await db
    .update(products)
    .set({ publishedAt: null })
    .where(eq(products.id, id))
    .returning()

  return unpublishedProduct
}

export const listCategories = async () => await db.query.categories.findMany()
