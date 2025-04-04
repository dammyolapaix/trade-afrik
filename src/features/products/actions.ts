'use server'

import { redirect } from 'next/navigation'

import crypto from 'crypto'
import { z } from 'zod'

import { env } from '@/env/server'
import { validatedActionWithUser } from '@/lib/auth/middlewares'
import { DASHBOARD_PRODUCTS_ROUTE } from '@/lib/routes'
import s3 from '@/lib/s3'

import {
  createProduct,
  createProductVariant,
  deleteProduct,
  publishProduct,
  retrieveProduct,
  unpublishProduct,
  updateProduct,
} from './services'
import {
  productSchema,
  productVariantSchema,
  publishProductSchema,
  updateProductSchema,
} from './validations'

export const createProductAction = validatedActionWithUser(
  productSchema,
  ['seller'],
  async (state: z.infer<typeof productSchema>, formData, authUser) => {
    // Create the product
    const newProduct = await createProduct({
      ...state,
      storeId: authUser.storeId!,
      userId: authUser.id,
    })

    if (!newProduct) {
      return {
        form: state,
        error: 'Failed to create product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const updateProductAction = validatedActionWithUser(
  updateProductSchema,
  ['seller'],
  async (state: z.infer<typeof updateProductSchema>, formData, authUser) => {
    const productId = formData.get('id') as string

    if (!productId) {
      return {
        form: state,
        error: 'Product ID is required',
      }
    }

    const product = await retrieveProduct({ id: productId })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to update this product',
      }
    }

    const updatedProduct = await updateProduct(productId, {
      name: state.name,
      description: state.description,
    })

    if (!updatedProduct) {
      return {
        form: state,
        error: 'Failed to update product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const deleteProductAction = validatedActionWithUser(
  z.object({ id: z.string() }),
  ['seller'],
  async (state: { id: string }, formData, authUser) => {
    const product = await retrieveProduct({ id: state.id })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to delete this product',
      }
    }

    const deletedProduct = await deleteProduct(state.id)

    if (!deletedProduct) {
      return {
        form: state,
        error: 'Failed to delete product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const publishProductAction = validatedActionWithUser(
  publishProductSchema,
  ['seller'],
  async (state: z.infer<typeof publishProductSchema>, formData, authUser) => {
    const product = await retrieveProduct({ id: state.id })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to publish this product',
      }
    }

    const publishedProduct = await publishProduct(state.id)

    if (!publishedProduct) {
      return {
        form: state,
        error: 'Failed to publish product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const unpublishProductAction = validatedActionWithUser(
  publishProductSchema,
  ['seller'],
  async (state: z.infer<typeof publishProductSchema>, formData, authUser) => {
    const product = await retrieveProduct({ id: state.id })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to unpublish this product',
      }
    }

    const unpublishedProduct = await unpublishProduct(state.id)

    if (!unpublishedProduct) {
      return {
        form: state,
        error: 'Failed to unpublish product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const createProductVariantAction = validatedActionWithUser(
  productVariantSchema,
  ['seller'],
  async (state: z.infer<typeof productVariantSchema>) => {
    const images: string[] = []

    for (const image of state['images[]']) {
      const buffer = await image.arrayBuffer()

      // Generate a unique filename using node crypo random
      const uniqueFilename = `${crypto.randomBytes(16).toString('hex')}-${image.name}`

      const s3Response = await s3.put({
        Key: uniqueFilename,
        Body: buffer,
        ContentType: image.type,
      })

      if (!s3Response) {
        return {
          form: state,
          error: 'Failed to upload image',
        }
      }

      // Generate the s3 url using the bucket name and the unique filename
      const imageUrl = `${env.AWS_BUCKET_NAME}.s3.${env.AWS_BUCKET_REGION}.amazonaws.com/${uniqueFilename}`

      images.push(imageUrl)
    }

    const productVariant = await createProductVariant({ ...state, images })

    if (!productVariant) {
      return {
        form: state,
        error: 'Failed to create product variant',
      }
    }

    return { success: 'Product variant created successfully' }
  }
)
