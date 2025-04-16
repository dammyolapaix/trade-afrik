'use server'

import { forbidden, redirect } from 'next/navigation'

import { File } from 'buffer'
import crypto from 'crypto'
import { z } from 'zod'

import { env } from '@/env/server'
import { validatedActionWithUser } from '@/lib/auth/middlewares'
import { DASHBOARD_PRODUCTS_ROUTE } from '@/lib/routes'
import s3 from '@/lib/s3'

import {
  createProduct,
  deleteProduct,
  publishProduct,
  retrieveProduct,
  unpublishProduct,
  updateProduct,
} from './services'
import { Product } from './types'
import {
  productSchema,
  publishProductSchema,
  updateProductSchema,
} from './validations'

const uploadImage = async (image: File) => {
  const buffer = await image.arrayBuffer()

  // Generate a unique filename using node crypo random
  const uniqueFilename = `${crypto.randomBytes(16).toString('hex')}-${image.name}`

  const s3Response = await s3.put({
    Key: uniqueFilename,
    Body: buffer,
    ContentType: image.type,
  })

  if (!s3Response) {
    return null
  }

  // Generate the s3 url using the bucket name and the unique filename
  const imageUrl = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_BUCKET_REGION}.amazonaws.com/${uniqueFilename}`

  return imageUrl
}

export const createProductAction = validatedActionWithUser(
  productSchema,
  ['seller'],
  async (state: z.infer<typeof productSchema>, formData, authUser) => {
    const image = await uploadImage(state['image[]'][0])

    if (!image) {
      return {
        form: state,
        error: 'Failed to upload image',
      }
    }

    // Create the product
    const newProduct = await createProduct({
      ...state,
      image,
      storeId: authUser.storeId!,
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
    const product = await retrieveProduct({
      id: state.id,
      storeId: authUser.storeId!,
    })

    if (!product || product.storeId !== authUser.storeId) forbidden()

    const { 'image[]': image, ...productInfo } = state

    const productData: Partial<Product> = {
      ...productInfo,
    }

    if (image) {
      const imageUrl = await uploadImage(image[0])

      if (!imageUrl) {
        return {
          form: state,
          error: 'Failed to upload image',
        }
      }

      productData.image = imageUrl
    }

    const updatedProduct = await updateProduct(product.id, productData)

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
    const product = await retrieveProduct({
      id: state.id,
      storeId: authUser.storeId!,
    })

    if (!product || product.storeId !== authUser.storeId) forbidden()

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
    const product = await retrieveProduct({
      id: state.id,
      storeId: authUser.storeId!,
    })

    if (!product || product.storeId !== authUser.storeId) forbidden()

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
    const product = await retrieveProduct({
      id: state.id,
      storeId: authUser.storeId!,
    })

    if (!product || product.storeId !== authUser.storeId) forbidden()

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
