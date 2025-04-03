import 'server-only'

import { and, eq, or } from 'drizzle-orm'

import { db } from '@/db'
import {
  productSubCategories,
  productVariantImages,
  productVariants,
  products,
} from '@/db/schema'

import {
  InsertProduct,
  InsertProductSubCategory,
  InsertProductVariant,
  InsertProductVariantImage,
  Product,
  ProductWithDetails,
  RetrieveProduct,
} from './types'

export const createProduct = async (product: InsertProduct) => {
  const [newProduct] = await db.insert(products).values(product).returning()
  return newProduct
}

export const createProductVariant = async (variant: InsertProductVariant) => {
  const [newVariant] = await db
    .insert(productVariants)
    .values(variant)
    .returning()
  return newVariant
}

export const createProductVariantImage = async (
  image: InsertProductVariantImage
) => {
  const [newImage] = await db
    .insert(productVariantImages)
    .values(image)
    .returning()
  return newImage
}

export const createProductSubCategory = async (
  productSubCategory: InsertProductSubCategory
) => {
  const [newProductSubCategory] = await db
    .insert(productSubCategories)
    .values(productSubCategory)
    .returning()
  return newProductSubCategory
}

export const retrieveProduct = async (
  query: RetrieveProduct
): Promise<Product | undefined> => {
  return await db.query.products.findFirst({
    where: and(
      query.id ? eq(products.id, query.id) : undefined,
      query.storeId ? eq(products.storeId, query.storeId) : undefined,
      query.userId ? eq(products.userId, query.userId) : undefined
    ),
  })
}

export const retrieveProductWithDetails = async (
  query: RetrieveProduct
): Promise<ProductWithDetails | undefined> => {
  return (await db.query.products.findFirst({
    where: or(
      query.id ? eq(products.id, query.id) : undefined,
      query.storeId ? eq(products.storeId, query.storeId) : undefined,
      query.userId ? eq(products.userId, query.userId) : undefined
    ),
    with: {
      variants: {
        with: {
          images: true,
        },
      },
      subCategories: {
        with: {
          subCategory: {
            with: {
              category: true,
            },
          },
        },
      },
    },
  })) as ProductWithDetails | undefined
}

export const listProducts = async (storeId: string) => {
  return await db.query.products.findMany({
    where: eq(products.storeId, storeId),
    with: {
      variants: {
        with: {
          images: true,
        },
      },
    },
  })
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const [updatedProduct] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning()

  return updatedProduct
}

export const updateProductVariant = async (
  id: string,
  data: Partial<InsertProductVariant>
) => {
  const [updatedVariant] = await db
    .update(productVariants)
    .set(data)
    .where(eq(productVariants.id, id))
    .returning()

  return updatedVariant
}

export const deleteProduct = async (id: string) => {
  const [deletedProduct] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning()

  return deletedProduct
}

export const deleteProductVariant = async (id: string) => {
  const [deletedVariant] = await db
    .delete(productVariants)
    .where(eq(productVariants.id, id))
    .returning()

  return deletedVariant
}

export const deleteProductVariantImage = async (id: string) => {
  const [deletedImage] = await db
    .delete(productVariantImages)
    .where(eq(productVariantImages.id, id))
    .returning()

  return deletedImage
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

export const ListSubCategory = async () =>
  await db.query.subCategories.findMany({ with: { category: true } })
